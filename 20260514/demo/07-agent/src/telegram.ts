/**
 * Telegram push helper — uses Bot API directly via fetch.
 *
 * Used by scheduler/monitor (and `bin/send.ts`) to push messages without
 * spinning up a grammY bot instance. Auto-chunks long messages to fit
 * Telegram's 4096-char limit; falls back from Markdown to plain text on
 * parse errors (so a stray * in Claude's output doesn't kill the send).
 */

const TELEGRAM_API = "https://api.telegram.org";
const TELEGRAM_CHUNK = 4000;

export interface SendOptions {
  chatId?: string;
  parseMode?: "Markdown" | "HTML" | null;
  silent?: boolean;
}

export async function sendToTelegram(
  text: string,
  opts: SendOptions = {},
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN missing (set in .env)");
  }
  const chatId = (opts.chatId ?? process.env.TELEGRAM_DEFAULT_CHAT_ID ?? "").trim();
  if (!chatId) {
    throw new Error(
      "chatId missing: pass opts.chatId or set TELEGRAM_DEFAULT_CHAT_ID in .env",
    );
  }

  const parts = chunk(text, TELEGRAM_CHUNK);
  for (const part of parts) {
    await postOne(token, chatId, part, opts.parseMode ?? "Markdown", opts.silent ?? false);
  }
}

async function postOne(
  token: string,
  chatId: string,
  text: string,
  parseMode: "Markdown" | "HTML" | null,
  silent: boolean,
): Promise<void> {
  const url = `${TELEGRAM_API}/bot${token}/sendMessage`;
  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text,
    disable_notification: silent,
  };
  if (parseMode) payload.parse_mode = parseMode;

  const resp = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (resp.ok) return;

  // parse error? retry without parse_mode
  if (parseMode) {
    const r2 = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_notification: silent }),
    });
    if (r2.ok) return;
    throw new Error(
      `telegram send failed: ${r2.status} ${(await r2.text()).slice(0, 300)}`,
    );
  }
  throw new Error(
    `telegram send failed: ${resp.status} ${(await resp.text()).slice(0, 300)}`,
  );
}

function chunk(s: string, n: number): string[] {
  if (s.length === 0) return [""];
  const out: string[] = [];
  for (let i = 0; i < s.length; i += n) {
    out.push(s.slice(i, i + n));
  }
  return out;
}
