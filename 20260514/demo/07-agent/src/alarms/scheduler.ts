/**
 * Alarm scheduler — polls the store every `tickMs`, fires due alarms.
 *
 * Each fire is dispatched as a background task (`void fire(...)`) so a long-running
 * Claude invocation does not block subsequent ticks. We mark the alarm as `fired`
 * BEFORE invoking Claude so a crash mid-fire doesn't cause a double-send on restart.
 */

import { runClaude, shortenToolNames } from "../claude.js";
import { sendToTelegram } from "../telegram.js";
import {
  listPending,
  updateAlarm,
  gc,
  type Alarm,
} from "./store.js";

export interface SchedulerHandle {
  stop: () => void;
}

const DEFAULT_TICK_MS = 5_000;
const GC_INTERVAL_MS = 60 * 60 * 1000; // 1h
const GC_RETENTION_DAYS = 7;

export function startAlarmScheduler(
  tickMs: number = DEFAULT_TICK_MS,
): SchedulerHandle {
  const tickId = setInterval(() => void tick(), tickMs);
  const gcId = setInterval(
    () =>
      void gc(GC_RETENTION_DAYS).catch((err) =>
        console.error(`[alarms] gc error: ${err}`),
      ),
    GC_INTERVAL_MS,
  );

  console.log(`[alarms] scheduler started (tick=${tickMs}ms)`);
  void tick(); // immediate sweep on boot — fires any alarm overdue while we were down

  return {
    stop: () => {
      clearInterval(tickId);
      clearInterval(gcId);
    },
  };
}

async function tick(): Promise<void> {
  const now = Date.now();
  const due = listPending().filter((a) => a.scheduledAt <= now);
  for (const a of due) {
    // Claim the alarm atomically by flipping status; if updateAlarm returns
    // undefined the alarm vanished (cancelled in another tick).
    const claimed = await updateAlarm(a.id, {
      status: "fired",
      firedAt: now,
    });
    if (!claimed) continue;
    void fire(claimed);
  }
}

async function fire(a: Alarm): Promise<void> {
  console.log(
    `[alarms] firing id=${a.id} chat=${a.chatId} label=${JSON.stringify(a.label)} prompt=${JSON.stringify(a.prompt)}`,
  );

  const chatId = String(a.chatId);
  const banner = a.prompt
    ? `⏰ *예약 알람* — ${a.label}\n작업: ${a.prompt}\n\n_분석 중..._`
    : `⏰ *예약 알람* — ${a.label}`;

  try {
    await sendToTelegram(banner, { chatId });
  } catch (err) {
    console.error(
      `[alarms] banner send failed id=${a.id}: ${err instanceof Error ? err.message : err}`,
    );
  }

  if (!a.prompt) return; // beep-only alarm

  try {
    const result = await runClaude(a.prompt);
    const tools = shortenToolNames(result.tools);
    const header = tools.length ? `🛠 ${tools.join(", ")}\n\n` : "";
    const body = result.text || "_(빈 응답)_";
    await sendToTelegram(header + body, { chatId });
    console.log(
      `[alarms] done id=${a.id} ms=${result.durationMs} text_len=${result.text.length}`,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[alarms] error id=${a.id}: ${msg}`);
    await updateAlarm(a.id, { status: "failed", error: msg });
    try {
      await sendToTelegram(`❌ 알람 실행 실패: ${msg}`, {
        chatId,
        parseMode: null,
      });
    } catch {
      /* swallow */
    }
  }
}
