/**
 * WatchManager — glues the watches store, the KIS WebSocket client, and
 * Telegram together. One subscription per (assetKind, ticker) is shared
 * across all active watches that target it; tick evaluation fans out in
 * memory.
 *
 * Lifecycle of a watch:
 *   1. `register()` — persist + subscribe (subscribe is a no-op if another
 *      active watch already holds the same tr_id/tr_key).
 *   2. tick arrives → manager evaluates every active watch on that
 *      (assetKind, ticker). Matches flip to `triggered` and emit a Telegram
 *      notice.
 *   3. After triggering, if no other active watch still wants the
 *      (assetKind, ticker), the manager unsubscribes — the
 *      "조건 만족 → 모니터 종료" the demo asks for.
 *
 * Boot: `start()` re-subscribes to every persisted `watching` row so a bot
 * restart doesn't lose in-flight monitors.
 */

import { sendToTelegram } from "../telegram.js";
import {
  type AssetKind,
  type Watch,
  addWatch,
  cancelWatch,
  getWatch,
  gc,
  listActive,
  listForChat,
  updateWatch,
} from "./store.js";
import { getKisWs, type SupportedTrId, type Tick } from "./kis-ws.js";

const GC_INTERVAL_MS = 60 * 60 * 1000;
const GC_RETENTION_DAYS = 7;

export interface WatchManagerHandle {
  stop: () => void;
}

export interface RegisterInit {
  chatId: number;
  assetKind: AssetKind;
  ticker: string;
  tickerName: string;
  conditionKind: "abs" | "pct-of-open";
  op: "<=" | ">=";
  threshold: number;
}

function trIdFor(assetKind: AssetKind): SupportedTrId {
  return assetKind === "index" ? "H0UPCNT0" : "H0STCNT0";
}

function assetKindFromTick(t: Tick): AssetKind {
  return t.trId === "H0UPCNT0" ? "index" : "stock";
}

function computePct(price: number, open: number): number {
  return ((price - open) / open) * 100;
}

/**
 * Returns null when the condition can't be evaluated yet (e.g. pct-of-open
 * but the tick has no `open` field). Otherwise true/false.
 */
function evaluate(w: Watch, tick: Tick): boolean | null {
  if (w.conditionKind === "abs") {
    return w.op === "<=" ? tick.price <= w.threshold : tick.price >= w.threshold;
  }
  const open = tick.open;
  if (!open || open === 0) return null;
  const pct = computePct(tick.price, open);
  return w.op === "<=" ? pct <= w.threshold : pct >= w.threshold;
}

function fmtKrw(n: number): string {
  return n.toLocaleString("ko-KR");
}

function fmtPct(n: number): string {
  return `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`;
}

function buildTriggerMessage(w: Watch, tick: Tick): string {
  if (w.conditionKind === "pct-of-open") {
    const open = tick.open ?? w.triggeredOpen ?? 0;
    const pct = open ? computePct(tick.price, open) : 0;
    const opLabel = w.op === "<=" ? "≤" : "≥";
    return (
      `🚨 *감시 조건 만족*\n` +
      `${w.tickerName} (${w.ticker})\n` +
      `현재값 *${fmtKrw(tick.price)}* (시초가 ${fmtKrw(open)} 대비 *${fmtPct(pct)}*)\n` +
      `조건: 시초가 대비 ${opLabel} ${fmtPct(w.threshold)}\n` +
      `감시 id: \`${w.id}\` — 자동 종료됨`
    );
  }
  const opLabel = w.op === "<=" ? "이하" : "이상";
  return (
    `🚨 *감시 조건 만족*\n` +
    `${w.tickerName} (${w.ticker})\n` +
    `현재가 *${fmtKrw(tick.price)}원* (${tick.changePercent.toFixed(2)}%) ${opLabel}\n` +
    `조건: ${opLabel} ${fmtKrw(w.threshold)}원\n` +
    `감시 id: \`${w.id}\` — 자동 종료됨`
  );
}

export class WatchManager {
  private gcTimer: NodeJS.Timeout | null = null;
  private started = false;

  async start(): Promise<void> {
    if (this.started) return;
    this.started = true;

    const ws = getKisWs();
    ws.on("tick", (t) => void this.onTick(t));
    ws.on("error", (err) => {
      console.error(`[watches] kis-ws error: ${err.message}`);
    });

    const active = listActive();
    if (active.length === 0) {
      console.log("[watches] no active watches on boot");
    } else {
      console.log(`[watches] resubscribing ${active.length} watch(es) on boot`);
    }
    // Unique (trId, trKey) pairs
    const uniqueSubs = new Map<string, { trId: SupportedTrId; trKey: string }>();
    for (const w of active) {
      const trId = trIdFor(w.assetKind);
      uniqueSubs.set(`${trId}|${w.ticker}`, { trId, trKey: w.ticker });
    }
    for (const sub of uniqueSubs.values()) {
      try {
        await ws.subscribe(sub.trId, sub.trKey);
      } catch (err) {
        console.error(
          `[watches] failed to resubscribe ${sub.trId}/${sub.trKey}: ${err instanceof Error ? err.message : err}`,
        );
      }
    }

    this.gcTimer = setInterval(
      () =>
        void gc(GC_RETENTION_DAYS).catch((err) =>
          console.error(`[watches] gc error: ${err}`),
        ),
      GC_INTERVAL_MS,
    );
  }

  stop(): void {
    if (this.gcTimer) {
      clearInterval(this.gcTimer);
      this.gcTimer = null;
    }
  }

  async register(init: RegisterInit): Promise<Watch> {
    const w = await addWatch(init);
    try {
      await getKisWs().subscribe(trIdFor(init.assetKind), init.ticker);
    } catch (err) {
      await updateWatch(w.id, {
        status: "failed",
        error: err instanceof Error ? err.message : String(err),
      });
      throw err;
    }
    return w;
  }

  async cancel(id: string, chatId: number): Promise<Watch | undefined> {
    const existing = getWatch(id);
    if (!existing || existing.chatId !== chatId) return undefined;
    const cancelled = await cancelWatch(id);
    if (cancelled) {
      await this.maybeUnsubscribe(cancelled.assetKind, cancelled.ticker);
    }
    return cancelled;
  }

  list(chatId: number): Watch[] {
    return listForChat(chatId, ["watching"]);
  }

  private async onTick(tick: Tick): Promise<void> {
    const kind = assetKindFromTick(tick);
    const candidates = listActive().filter(
      (w) => w.assetKind === kind && w.ticker === tick.ticker,
    );
    if (candidates.length === 0) return;

    const matched: Watch[] = [];
    for (const w of candidates) {
      const verdict = evaluate(w, tick);
      if (verdict !== true) continue;
      const open = tick.open;
      const pct =
        w.conditionKind === "pct-of-open" && open
          ? computePct(tick.price, open)
          : undefined;
      const claimed = await updateWatch(w.id, {
        status: "triggered",
        triggeredAt: Date.now(),
        triggeredPrice: tick.price,
        triggeredOpen: open,
        triggeredPct: pct,
      });
      if (claimed) matched.push(claimed);
    }
    if (matched.length === 0) return;

    for (const w of matched) {
      const msg = buildTriggerMessage(w, tick);
      try {
        await sendToTelegram(msg, { chatId: String(w.chatId) });
      } catch (err) {
        console.error(
          `[watches] notify failed id=${w.id}: ${err instanceof Error ? err.message : err}`,
        );
      }
      const detail =
        w.conditionKind === "pct-of-open"
          ? `pct-of-open op=${w.op} threshold=${w.threshold} open=${tick.open} pct=${tick.open ? computePct(tick.price, tick.open).toFixed(3) : "n/a"}`
          : `abs op=${w.op} threshold=${w.threshold}`;
      console.log(
        `[watches] triggered id=${w.id} ${w.assetKind}/${w.ticker} price=${tick.price} ${detail}`,
      );
    }

    await this.maybeUnsubscribe(kind, tick.ticker);
  }

  private async maybeUnsubscribe(
    assetKind: AssetKind,
    ticker: string,
  ): Promise<void> {
    const stillActive = listActive().some(
      (w) => w.assetKind === assetKind && w.ticker === ticker,
    );
    if (stillActive) return;
    try {
      await getKisWs().unsubscribe(trIdFor(assetKind), ticker);
    } catch (err) {
      console.error(
        `[watches] unsubscribe failed ${assetKind}/${ticker}: ${err instanceof Error ? err.message : err}`,
      );
    }
  }
}

let singleton: WatchManager | null = null;

export function getWatchManager(): WatchManager {
  if (!singleton) singleton = new WatchManager();
  return singleton;
}
