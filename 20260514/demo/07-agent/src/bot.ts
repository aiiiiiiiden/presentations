/**
 * Telegram bot — relays user messages to headless `claude -p`, sends responses back.
 *
 * Per-message subprocess invocation. Streams parsed events to capture tool-use names
 * and the final assistant text. Posts a "processing" placeholder, then edits it with
 * the result (long messages split into chunks).
 *
 * Also handles *alarm intents* (register / list / cancel) via natural-language parsing
 * before falling through to Claude. Alarms persist to data/alarms.json and fire via
 * an in-process scheduler.
 *
 * Run:
 *   cp .env.example .env       # fill in TELEGRAM_BOT_TOKEN, ALLOWED_CHAT_IDS
 *   npm install
 *   npm run bot
 */

import "dotenv/config";
import { Bot, type Context, GrammyError, HttpError } from "grammy";
import { runClaude, shortenToolNames } from "./claude.js";
import {
  addAlarm,
  cancelAlarm,
  getStorePath,
  listForChat,
} from "./alarms/store.js";
import { parseAlarm, parseIntent } from "./alarms/parser.js";
import { startAlarmScheduler } from "./alarms/scheduler.js";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN?.trim();
if (!TOKEN) {
  throw new Error(
    "TELEGRAM_BOT_TOKEN missing. Copy .env.example to .env and fill it in.",
  );
}

const ALLOWED_CHAT_IDS = new Set(
  (process.env.ALLOWED_CHAT_IDS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => Number(s)),
);

const TELEGRAM_CHUNK = 4000;

function chunk(text: string, size = TELEGRAM_CHUNK): string[] {
  const out: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    out.push(text.slice(i, i + size));
  }
  return out.length ? out : [""];
}

function fmtKST(epochMs: number): string {
  return new Date(epochMs).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    dateStyle: "short",
    timeStyle: "medium",
  });
}

function remainingLabel(scheduledAt: number): string {
  const ms = scheduledAt - Date.now();
  if (ms <= 0) return "곧";
  const totalSec = Math.ceil(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h}시간`);
  if (m) parts.push(`${m}분`);
  if (!h && s) parts.push(`${s}초`);
  return `${parts.join(" ")} 남음`;
}

const bot = new Bot(TOKEN);

bot.on("message:text", async (ctx) => {
  const chatId = ctx.chat.id;
  const text = ctx.message.text.trim();
  if (!text) return;

  if (ALLOWED_CHAT_IDS.size > 0 && !ALLOWED_CHAT_IDS.has(chatId)) {
    console.log(
      `[reject] chat_id=${chatId} (allowed=${[...ALLOWED_CHAT_IDS].join(",")})`,
    );
    await ctx.reply(
      `⛔ 인증되지 않은 채팅 ID: ${chatId}\n.env의 ALLOWED_CHAT_IDS에 추가하면 사용 가능.`,
    );
    return;
  }

  // 1) Try alarm intents first (list / cancel / help)
  const intent = parseIntent(text);
  if (intent) {
    await handleIntent(ctx, intent);
    return;
  }

  // 2) Try natural-language alarm registration
  const parsedAlarm = parseAlarm(text);
  if (parsedAlarm) {
    await handleRegister(ctx, parsedAlarm);
    return;
  }

  // 3) Fallback to direct Claude relay (the original Phase 1 behavior)
  await handleClaude(ctx, text);
});

async function handleIntent(
  ctx: Context,
  intent: NonNullable<ReturnType<typeof parseIntent>>,
): Promise<void> {
  const chatId = ctx.chat!.id;

  if (intent.kind === "help") {
    await ctx.reply(HELP_TEXT, { parse_mode: "Markdown" });
    return;
  }

  if (intent.kind === "list") {
    const alarms = listForChat(chatId, ["pending"]);
    if (alarms.length === 0) {
      await ctx.reply("📋 예약된 알람이 없습니다.");
      return;
    }
    const lines = alarms.map((a) => {
      const time = fmtKST(a.scheduledAt);
      const remain = remainingLabel(a.scheduledAt);
      const task = a.prompt || "_(알람만)_";
      return `\`${a.id}\` — ${time}\n  ⏳ ${remain}\n  📝 ${task}`;
    });
    const head = `📋 예약 알람 ${alarms.length}건:\n\n`;
    try {
      await ctx.reply(head + lines.join("\n\n"), {
        parse_mode: "Markdown",
      });
    } catch {
      await ctx.reply(head + lines.join("\n\n"));
    }
    return;
  }

  if (intent.kind === "cancel") {
    const a = await cancelAlarm(intent.id);
    if (a && a.chatId === chatId) {
      try {
        await ctx.reply(`🗑 알람 \`${a.id}\` 취소됨.`, {
          parse_mode: "Markdown",
        });
      } catch {
        await ctx.reply(`🗑 알람 ${a.id} 취소됨.`);
      }
      console.log(`[alarms] cancelled id=${a.id} chat=${chatId}`);
    } else {
      await ctx.reply(
        `❌ '${intent.id}' 를 찾을 수 없거나 이미 처리된 알람입니다.`,
      );
    }
    return;
  }
}

async function handleRegister(
  ctx: Context,
  p: NonNullable<ReturnType<typeof parseAlarm>>,
): Promise<void> {
  const chatId = ctx.chat!.id;
  const scheduledAt = Date.now() + p.delayMs;
  const a = await addAlarm({
    chatId,
    scheduledAt,
    prompt: p.prompt,
    label: p.label,
  });

  const taskLine = p.prompt ? `📝 ${p.prompt}` : `📝 (알람만 울림)`;
  const msg =
    `✅ 알람 등록\n` +
    `\`${a.id}\`\n` +
    `⏰ ${fmtKST(scheduledAt)} (${p.label})\n` +
    `${taskLine}\n\n` +
    `취소: \`알람 삭제 ${a.id}\` 또는 \`/cancel ${a.id}\``;

  try {
    await ctx.reply(msg, { parse_mode: "Markdown" });
  } catch {
    await ctx.reply(msg);
  }
  console.log(
    `[alarms] registered id=${a.id} chat=${chatId} delay=${p.delayMs}ms prompt=${JSON.stringify(p.prompt)}`,
  );
}

async function handleClaude(ctx: Context, text: string): Promise<void> {
  const chatId = ctx.chat!.id;
  console.log(`[recv] chat=${chatId} prompt=${JSON.stringify(text)}`);
  const status = await ctx.reply("⏳ 한투 자료실 뒤지는 중... (3~10초)");

  try {
    const result = await runClaude(text);
    const tools = shortenToolNames(result.tools);
    const header = tools.length
      ? `🛠 KIS 매뉴얼 조회: \`${tools.join(", ")}\`\n\n`
      : "";
    const body = result.text || "_(빈 응답)_";
    const response = header + body;
    const parts = chunk(response);

    const tryEdit = async (firstChunk: string) => {
      try {
        await ctx.api.editMessageText(chatId, status.message_id, firstChunk, {
          parse_mode: "Markdown",
        });
      } catch {
        await ctx.api.editMessageText(chatId, status.message_id, firstChunk);
      }
    };

    await tryEdit(parts[0]!);
    for (const c of parts.slice(1)) {
      try {
        await ctx.reply(c, { parse_mode: "Markdown" });
      } catch {
        await ctx.reply(c);
      }
    }

    console.log(
      `[done] chat=${chatId} tools=${result.tools.length} text_len=${result.text.length} ms=${result.durationMs}`,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[error] chat=${chatId} ${msg}`);
    try {
      await ctx.api.editMessageText(
        chatId,
        status.message_id,
        `❌ 에러: ${msg}`,
      );
    } catch {
      await ctx.reply(`❌ 에러: ${msg}`);
    }
  }
}

const HELP_TEXT = `*에이전트 봇 사용법*

\`평문 메시지\` → Claude가 KIS 통로로 분석/응답
\`5분 뒤 SKT 분석해줘\` → 5분 후 자동으로 분석 실행 + 결과 발송
\`1시간 30분 뒤 점심시간 알림\` → 시각만 알람
\`30초 뒤 hi\` → 빠른 테스트

알람 관리:
\`알람 목록\` 또는 \`/alarms\` → 예약된 알람 보기
\`알람 삭제 <id>\` 또는 \`/cancel <id>\` → 취소
\`/help\` 또는 \`도움말\` → 이 도움말`;

bot.catch((err) => {
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("[grammy] api error:", e.description);
  } else if (e instanceof HttpError) {
    console.error("[grammy] network error:", e);
  } else {
    console.error("[grammy] unknown error:", e);
  }
});

const me = await bot.api.getMe();
console.log(`[ready] bot=@${me.username} cwd=${process.cwd()}`);
console.log(`[ready] alarms store: ${getStorePath()}`);
if (ALLOWED_CHAT_IDS.size === 0) {
  console.log("[ready] ⚠ ALLOWED_CHAT_IDS empty — bot will respond to anyone");
} else {
  console.log(`[ready] allowed chat ids: ${[...ALLOWED_CHAT_IDS].join(",")}`);
}

const scheduler = startAlarmScheduler();

const shutdown = (signal: string) => {
  console.log(`[shutdown] ${signal} received, stopping...`);
  scheduler.stop();
  void bot.stop();
};
process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

await bot.start();
