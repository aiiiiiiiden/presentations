/**
 * Scheduler entry — runs `claude -p` headlessly and pushes the result to Telegram.
 *
 * Invoked from cron (or any external trigger). Prompt is taken from argv; if absent,
 * a default daily-report prompt is used. Exits non-zero on failure so cron logs the
 * error.
 *
 * Run manually:
 *   npm run scheduler -- "SKT 종목 일일 리포트를 만들어줘"
 *
 * Run from cron (see scheduler/crontab.example for full setup):
 *   0 7 * * * cd /path/to/07-agent && /path/to/scheduler/daily.sh
 */

import "dotenv/config";
import { runClaude, shortenToolNames } from "./claude.js";
import { sendToTelegram } from "./telegram.js";

const DEFAULT_PROMPT =
  "SKT(종목코드 017670) 종목 분석에 필요한 KIS Open API를 찾아서 호출 예시 코드까지 정리해줘. 결과는 분석 설계서 형식으로.";

async function main(): Promise<void> {
  const prompt = process.argv.slice(2).join(" ").trim() || DEFAULT_PROMPT;
  const startedAt = new Date();
  const tsKST = startedAt.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    dateStyle: "medium",
    timeStyle: "short",
  });

  console.log(`[scheduler] ${startedAt.toISOString()}`);
  console.log(`[scheduler] prompt=${JSON.stringify(prompt)}`);

  try {
    const result = await runClaude(prompt);
    const tools = shortenToolNames(result.tools);
    const toolsLine = tools.length ? `🛠 ${tools.join(", ")}\n\n` : "";
    const header = `📅 *자동 리포트 — ${tsKST} (KST)*\n\n`;
    const body = result.text || "_(빈 응답)_";
    const message = header + toolsLine + body;

    await sendToTelegram(message);
    console.log(
      `[scheduler] done. ms=${result.durationMs} text_len=${result.text.length} tools=${result.tools.length}`,
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[scheduler] error: ${msg}`);
    try {
      await sendToTelegram(`❌ 자동 리포트 실패 (${tsKST})\n\n${msg}`, {
        parseMode: null,
      });
    } catch (sendErr) {
      console.error(
        `[scheduler] failed to send error notice: ${sendErr instanceof Error ? sendErr.message : sendErr}`,
      );
    }
    process.exit(1);
  }
}

await main();
