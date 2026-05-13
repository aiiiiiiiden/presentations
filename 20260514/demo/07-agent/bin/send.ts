#!/usr/bin/env tsx
/**
 * CLI: push text to Telegram from any shell pipeline.
 *
 * Usage:
 *   npm run send -- "hello"                # send as argv
 *   echo "hello" | npm run send -- -       # send from stdin
 *   npm run send -- --chat 12345678 "hi"   # override chat_id
 *
 * Reads TELEGRAM_BOT_TOKEN + TELEGRAM_DEFAULT_CHAT_ID from .env.
 */

import "dotenv/config";
import { readFileSync } from "node:fs";
import { sendToTelegram } from "../src/telegram.js";

function usage(): never {
  console.error(
    [
      "Usage:",
      "  npm run send -- <message>",
      '  echo "..." | npm run send -- -',
      "  npm run send -- --chat <chat_id> <message>",
    ].join("\n"),
  );
  process.exit(2);
}

let chatId: string | undefined;
const args = process.argv.slice(2);
const positional: string[] = [];
for (let i = 0; i < args.length; i++) {
  const a = args[i]!;
  if (a === "--chat" || a === "-c") {
    chatId = args[++i];
    if (!chatId) usage();
  } else if (a === "--help" || a === "-h") {
    usage();
  } else {
    positional.push(a);
  }
}

let text: string;
if (positional.length === 0 || positional[0] === "-") {
  text = readFileSync(0, "utf-8").trim();
} else {
  text = positional.join(" ");
}

if (!text) usage();

try {
  await sendToTelegram(text, chatId ? { chatId } : {});
  console.log("[send] ok");
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err);
  console.error(`[send] error: ${msg}`);
  process.exit(1);
}
