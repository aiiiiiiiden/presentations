/**
 * Monitor — polls market state, triggers Claude when a condition is met.
 *
 * Two trigger paths:
 *   1. Auto: simulated KOSPI change exceeds threshold (env MONITOR_THRESHOLD_PCT, default -3).
 *   2. Manual: presenter creates `monitor.trigger` file → fires immediately (forces a drop).
 *
 * On trigger:
 *   - sends a 🚨 placeholder to Telegram
 *   - runs `claude -p` with a market-state prompt
 *   - sends the analysis as a follow-up message
 *
 * A cooldown (default 30 min) prevents repeated firings inside one event.
 *
 * Run:
 *   npm run monitor                      # foreground loop
 *   npm run monitor:fire                 # in another terminal: fire trigger now
 *
 * Env knobs:
 *   MONITOR_POLL_MS         polling interval (ms, default 60000)
 *   MONITOR_THRESHOLD_PCT   trigger when change% <= this (default -3)
 *   MONITOR_COOLDOWN_MS     min ms between auto fires (default 1800000 = 30 min)
 */

import "dotenv/config";
import { existsSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { runClaude, shortenToolNames, DEMO_ROOT } from "./claude.js";
import { sendToTelegram } from "./telegram.js";

const TRIGGER_FILE = join(DEMO_ROOT, "monitor.trigger");
const POLL_INTERVAL_MS = numEnv("MONITOR_POLL_MS", 60_000);
const TRIGGER_THRESHOLD = numEnv("MONITOR_THRESHOLD_PCT", -3);
const COOLDOWN_MS = numEnv("MONITOR_COOLDOWN_MS", 30 * 60 * 1000);

let lastTriggeredAt = 0;
let isProcessing = false;

interface MarketTick {
  indexValue: number;
  changePercent: number;
  timestamp: Date;
  source: "simulated" | "manual";
}

function numEnv(key: string, fallback: number): number {
  const raw = process.env[key];
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

/**
 * For the demo we simulate the KOSPI tick. In production, swap this for a real
 * data fetch (KIS API, naver finance, etc.) and keep the same shape.
 */
function readMarket(): MarketTick {
  if (existsSync(TRIGGER_FILE)) {
    try {
      unlinkSync(TRIGGER_FILE);
    } catch {
      /* race: another reader consumed it */
    }
    return {
      indexValue: 2475.32,
      changePercent: -3.27,
      timestamp: new Date(),
      source: "manual",
    };
  }
  // tiny random walk around ±0.5%
  const change = (Math.random() - 0.5) * 1;
  return {
    indexValue: 2550 + change * 20,
    changePercent: change,
    timestamp: new Date(),
    source: "simulated",
  };
}

function fmtKST(d: Date): string {
  return d.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    dateStyle: "medium",
    timeStyle: "medium",
  });
}

async function fireTrigger(tick: MarketTick): Promise<void> {
  if (isProcessing) {
    console.log("[monitor] previous trigger still running, skip.");
    return;
  }
  isProcessing = true;
  lastTriggeredAt = Date.now();

  const ts = fmtKST(tick.timestamp);
  const reason =
    tick.source === "manual" ? "(수동 트리거)" : "(자동 감지)";
  const placeholder =
    `🚨 *시장 경보 — KOSPI 급락 감지* ${reason}\n` +
    `시각: ${ts} (KST)\n` +
    `지수: ${tick.indexValue.toFixed(2)} (${tick.changePercent.toFixed(2)}%)\n\n` +
    `통신 3사 점검을 위한 분석 매뉴얼을 한투 자료실에서 가져옵니다...`;

  try {
    await sendToTelegram(placeholder);
  } catch (err) {
    console.error(
      `[monitor] failed to send placeholder: ${err instanceof Error ? err.message : err}`,
    );
  }

  const prompt =
    `KOSPI가 ${tick.changePercent.toFixed(2)}% 하락했습니다 (지수 ${tick.indexValue.toFixed(2)}). ` +
    `통신 3사(SKT 017670, KT 030200, LG U+ 032640)의 *현재가·외국인 수급·최근 거래량* 을 즉시 확인하기 위해 ` +
    `KIS Open API 중 어떤 호출이 필요한지 정리하고 종목별 호출 예시 코드를 함께 알려줘. 결과는 *경보 보고서* 형식.`;

  try {
    const result = await runClaude(prompt);
    const tools = shortenToolNames(result.tools);
    const toolsLine = tools.length ? `🛠 ${tools.join(", ")}\n\n` : "";
    const header = `📋 *분석 결과 — ${ts} (KST)*\n\n`;
    const body = result.text || "_(빈 응답)_";
    await sendToTelegram(header + toolsLine + body);
    console.log(
      `[monitor] trigger handled. ms=${result.durationMs} tools=${result.tools.length}`,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[monitor] analysis error: ${msg}`);
    try {
      await sendToTelegram(`❌ 분석 실패: ${msg}`, { parseMode: null });
    } catch {
      /* swallow */
    }
  } finally {
    isProcessing = false;
  }
}

async function tick(): Promise<void> {
  const m = readMarket();
  const ts = fmtKST(m.timestamp);
  console.log(
    `[monitor] ${ts} KOSPI≈${m.indexValue.toFixed(2)} change=${m.changePercent.toFixed(2)}% src=${m.source}`,
  );

  const shouldFire =
    m.source === "manual" || m.changePercent <= TRIGGER_THRESHOLD;
  if (!shouldFire) return;

  if (
    m.source === "simulated" &&
    Date.now() - lastTriggeredAt < COOLDOWN_MS
  ) {
    console.log("[monitor] threshold hit but in cooldown.");
    return;
  }

  void fireTrigger(m);
}

async function main(): Promise<void> {
  console.log(`[monitor] cwd=${DEMO_ROOT}`);
  console.log(
    `[monitor] poll=${POLL_INTERVAL_MS}ms threshold=${TRIGGER_THRESHOLD}% cooldown=${COOLDOWN_MS}ms`,
  );
  console.log(`[monitor] trigger file: ${TRIGGER_FILE}`);
  console.log("[monitor] manual fire: `npm run monitor:fire`");

  await tick();
  setInterval(() => {
    void tick();
  }, POLL_INTERVAL_MS);

  // keep process alive forever
  await new Promise<void>(() => {});
}

await main();
