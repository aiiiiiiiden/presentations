/**
 * KIS Open API WebSocket client — singleton.
 *
 * Two-step bring-up:
 *   1. Fetch an `approval_key` via POST /oauth2/Approval (HTTPS, REST).
 *   2. Open a ws connection to ops.koreainvestment.com (port 21000 real /
 *      31000 vts) and send JSON subscribe/unsubscribe messages keyed on that
 *      approval_key.
 *
 * Data path: KIS streams pipe-delimited frames `0|<tr_id>|<count>|<csv-body>`
 * where the body fields are caret-separated.
 *
 *   tr_id = H0STCNT0  (실시간 종목 체결가)
 *     [0]  MKSC_SHRN_ISCD  단축종목코드
 *     [1]  STCK_CNTG_HOUR  체결시간(HHMMSS)
 *     [2]  STCK_PRPR       현재가(KRW)
 *     [5]  PRDY_CTRT       전일대비율
 *
 *   tr_id = H0UPCNT0  (실시간 지수 체결가; KOSPI/KOSDAQ/KOSPI200)
 *     [0]  BSTP_CLS_CODE   업종코드(=tr_key)
 *     [1]  BSOP_HOUR       영업시간(HHMMSS)
 *     [2]  PRPR_NMIX       현재가지수
 *     [5]  PRDY_CTRT       전일대비율
 *     [10] OPRC_NMIX       시가지수  ← session open, per-tick
 *
 * The index frame's first occurrence is logged verbatim so the presenter can
 * confirm field indices against KIS docs before relying on them.
 *
 * Control path: KIS sends JSON frames for subscribe acks, PINGPONG, and
 * errors. PINGPONG is echoed back to keep the socket alive (~30s heartbeat).
 *
 * Reconnect: bounded exponential backoff (1s → 30s). On every reconnect the
 * client re-issues every subscription in `subscriptions`, so callers stay
 * subscribed across drops without manual intervention.
 */

import { EventEmitter } from "node:events";
import WebSocket from "ws";

const APPROVAL_REAL = "https://openapi.koreainvestment.com:9443/oauth2/Approval";
const APPROVAL_VTS = "https://openapivts.koreainvestment.com:29443/oauth2/Approval";
const WS_REAL = "ws://ops.koreainvestment.com:21000";
const WS_VTS = "ws://ops.koreainvestment.com:31000";
const RECONNECT_MIN_MS = 1_000;
const RECONNECT_MAX_MS = 30_000;
const APPROVAL_TTL_MS = 23 * 3600 * 1000; // approval keys are valid for ~24h

export type SupportedTrId = "H0STCNT0" | "H0UPCNT0";

export interface Tick {
  trId: SupportedTrId;
  ticker: string;
  price: number;
  changePercent: number;
  /** Session open. Present for index ticks (H0UPCNT0). */
  open?: number;
  time: string; // HHMMSS as reported by KIS
  receivedAt: number;
}

export interface KisWsEvents {
  open: () => void;
  close: () => void;
  tick: (t: Tick) => void;
  error: (err: Error) => void;
}

export declare interface KisWebSocketClient {
  on<K extends keyof KisWsEvents>(event: K, listener: KisWsEvents[K]): this;
  emit<K extends keyof KisWsEvents>(
    event: K,
    ...args: Parameters<KisWsEvents[K]>
  ): boolean;
}

interface Subscription {
  trId: SupportedTrId;
  trKey: string;
}

function envFlag(): "real" | "vts" {
  return (process.env.KIS_ENV ?? "vts").toLowerCase() === "real"
    ? "real"
    : "vts";
}

function approvalUrl(): string {
  return envFlag() === "real" ? APPROVAL_REAL : APPROVAL_VTS;
}

function wsUrl(): string {
  return envFlag() === "real" ? WS_REAL : WS_VTS;
}

export class KisWebSocketClient extends EventEmitter {
  private ws: WebSocket | null = null;
  private approvalKey: string | null = null;
  private approvalKeyAt = 0;
  private reconnectMs = RECONNECT_MIN_MS;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private connecting = false;
  private destroyed = false;
  private subscriptions = new Map<string, Subscription>(); // key: `${trId}|${trKey}`
  // log first frame per tr_id so we can verify field indices against KIS docs
  private firstFrameLogged: Set<SupportedTrId> = new Set();

  async subscribe(trId: SupportedTrId, trKey: string): Promise<void> {
    const sub: Subscription = { trId, trKey };
    this.subscriptions.set(this.subKey(sub), sub);
    await this.ensureConnection();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send(sub, "1");
    }
  }

  async unsubscribe(trId: SupportedTrId, trKey: string): Promise<void> {
    const sub: Subscription = { trId, trKey };
    const k = this.subKey(sub);
    if (!this.subscriptions.has(k)) return;
    this.subscriptions.delete(k);
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.send(sub, "2");
    }
  }

  /** Convenience wrappers preserved for backward compatibility. */
  async subscribeTick(ticker: string): Promise<void> {
    return this.subscribe("H0STCNT0", ticker);
  }
  async unsubscribeTick(ticker: string): Promise<void> {
    return this.unsubscribe("H0STCNT0", ticker);
  }

  destroy(): void {
    this.destroyed = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    if (this.ws) {
      try {
        this.ws.close();
      } catch {
        /* ignore */
      }
      this.ws = null;
    }
  }

  private subKey(s: Subscription): string {
    return `${s.trId}|${s.trKey}`;
  }

  private async ensureConnection(): Promise<void> {
    if (this.destroyed) return;
    if (this.ws && this.ws.readyState === WebSocket.OPEN) return;
    if (this.connecting) return;
    await this.connect();
  }

  private async getApprovalKey(): Promise<string> {
    if (
      this.approvalKey &&
      Date.now() - this.approvalKeyAt < APPROVAL_TTL_MS
    ) {
      return this.approvalKey;
    }
    const appkey = process.env.KIS_APP_KEY?.trim();
    const secretkey = process.env.KIS_APP_SECRET?.trim();
    if (!appkey || !secretkey) {
      throw new Error(
        "KIS_APP_KEY / KIS_APP_SECRET missing — set them in .env",
      );
    }
    const resp = await fetch(approvalUrl(), {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        appkey,
        // KIS quirk: REST token uses `appsecret`, but Approval uses `secretkey`.
        secretkey,
      }),
    });
    if (!resp.ok) {
      throw new Error(
        `approval failed: ${resp.status} ${(await resp.text()).slice(0, 300)}`,
      );
    }
    const data = (await resp.json()) as { approval_key?: string };
    if (!data.approval_key) {
      throw new Error("approval response missing approval_key");
    }
    this.approvalKey = data.approval_key;
    this.approvalKeyAt = Date.now();
    return data.approval_key;
  }

  private connect(): Promise<void> {
    return new Promise<void>(async (resolve) => {
      this.connecting = true;
      let approval: string;
      try {
        approval = await this.getApprovalKey();
      } catch (err) {
        this.connecting = false;
        this.emit(
          "error",
          err instanceof Error ? err : new Error(String(err)),
        );
        this.scheduleReconnect();
        resolve();
        return;
      }

      const url = wsUrl();
      console.log(`[kis-ws] connecting ${url} (env=${envFlag()})`);
      const ws = new WebSocket(url);
      this.ws = ws;

      const finalize = () => {
        this.connecting = false;
        resolve();
      };

      ws.on("open", () => {
        console.log("[kis-ws] open");
        this.reconnectMs = RECONNECT_MIN_MS;
        for (const sub of this.subscriptions.values()) {
          this.send(sub, "1", approval);
        }
        this.emit("open");
        finalize();
      });

      ws.on("message", (raw: WebSocket.RawData) => {
        const text = raw.toString("utf-8");
        if (text.startsWith("{")) {
          this.handleControlFrame(text);
          return;
        }
        // data frame: `0|<tr_id>|<count>|<body>`
        const head = text[0];
        if (head !== "0" && head !== "1") return;
        const parts = text.split("|");
        if (parts.length < 4) return;
        const trId = parts[1] as string;
        const body = parts[3] ?? "";
        if (trId === "H0STCNT0") {
          this.handleStockFrame(text, body);
        } else if (trId === "H0UPCNT0") {
          this.handleIndexFrame(text, body);
        }
      });

      ws.on("error", (err) => {
        this.emit("error", err instanceof Error ? err : new Error(String(err)));
      });

      ws.on("close", (code, reason) => {
        const r = reason?.toString();
        console.log(
          `[kis-ws] close code=${code}${r ? ` reason=${r}` : ""}`,
        );
        this.ws = null;
        this.emit("close");
        this.scheduleReconnect();
        finalize();
      });
    });
  }

  private handleStockFrame(rawLine: string, body: string): void {
    if (!this.firstFrameLogged.has("H0STCNT0")) {
      console.log(`[kis-ws] H0STCNT0 first frame: ${rawLine}`);
      this.firstFrameLogged.add("H0STCNT0");
    }
    const fields = body.split("^");
    if (fields.length < 6) return;
    const ticker = fields[0] ?? "";
    const time = fields[1] ?? "";
    const price = Number(fields[2]);
    const changePercent = Number(fields[5]);
    if (!ticker || !Number.isFinite(price)) return;
    this.emit("tick", {
      trId: "H0STCNT0",
      ticker,
      price,
      changePercent: Number.isFinite(changePercent) ? changePercent : 0,
      time,
      receivedAt: Date.now(),
    });
  }

  private handleIndexFrame(rawLine: string, body: string): void {
    if (!this.firstFrameLogged.has("H0UPCNT0")) {
      console.log(`[kis-ws] H0UPCNT0 first frame: ${rawLine}`);
      this.firstFrameLogged.add("H0UPCNT0");
    }
    const fields = body.split("^");
    // Need at least up to index 10 (OPRC_NMIX).
    if (fields.length < 11) return;
    const ticker = fields[0] ?? "";
    const time = fields[1] ?? "";
    const price = Number(fields[2]);
    const changePercent = Number(fields[5]);
    const openRaw = Number(fields[10]);
    if (!ticker || !Number.isFinite(price)) return;
    this.emit("tick", {
      trId: "H0UPCNT0",
      ticker,
      price,
      changePercent: Number.isFinite(changePercent) ? changePercent : 0,
      open: Number.isFinite(openRaw) && openRaw > 0 ? openRaw : undefined,
      time,
      receivedAt: Date.now(),
    });
  }

  private handleControlFrame(text: string): void {
    let parsed: {
      header?: { tr_id?: string; tr_key?: string };
      body?: { rt_cd?: string; msg_cd?: string; msg1?: string; output?: unknown };
    };
    try {
      parsed = JSON.parse(text) as typeof parsed;
    } catch {
      return;
    }
    const trId = parsed.header?.tr_id;
    if (trId === "PINGPONG") {
      // echo back to keep the connection alive
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(text);
      }
      return;
    }
    const rtCd = parsed.body?.rt_cd;
    const msg = parsed.body?.msg1 ?? "";
    if (rtCd === "0") {
      console.log(`[kis-ws] subscribe ok tr_id=${trId} msg=${msg}`);
    } else if (rtCd !== undefined) {
      console.warn(`[kis-ws] subscribe err tr_id=${trId} rt_cd=${rtCd} msg=${msg}`);
    }
  }

  private send(sub: Subscription, trType: "1" | "2", overrideKey?: string): void {
    const approval_key = overrideKey ?? this.approvalKey;
    if (!approval_key) return;
    const payload = {
      header: {
        approval_key,
        custtype: "P",
        tr_type: trType,
        "content-type": "utf-8",
      },
      body: {
        input: { tr_id: sub.trId, tr_key: sub.trKey },
      },
    };
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;
    this.ws.send(JSON.stringify(payload));
    console.log(
      `[kis-ws] send tr_type=${trType} tr_id=${sub.trId} tr_key=${sub.trKey}`,
    );
  }

  private scheduleReconnect(): void {
    if (this.destroyed) return;
    if (this.subscriptions.size === 0) return; // nothing to reconnect for
    if (this.reconnectTimer) return;
    const delay = this.reconnectMs;
    this.reconnectMs = Math.min(this.reconnectMs * 2, RECONNECT_MAX_MS);
    console.log(`[kis-ws] reconnect in ${delay}ms`);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      void this.connect();
    }, delay);
  }
}

let singleton: KisWebSocketClient | null = null;

export function getKisWs(): KisWebSocketClient {
  if (!singleton) singleton = new KisWebSocketClient();
  return singleton;
}

export function destroyKisWs(): void {
  if (singleton) {
    singleton.destroy();
    singleton = null;
  }
}
