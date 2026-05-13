/**
 * Headless `claude -p` subprocess wrapper.
 *
 * Spawns Claude Code in the demo project's cwd so `.mcp.json` + `.claude/settings.json`
 * are auto-loaded. Parses NDJSON stream-json output, separating tool-use events from
 * the final assistant text. Returns both so callers can surface tool calls to the user
 * (e.g. as a header in Telegram).
 */

import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const DEMO_ROOT = resolve(__dirname, "..");

const FIRST_CALL_TIMEOUT_MS = 180_000;

export interface ClaudeResult {
  text: string;
  tools: string[];
  durationMs: number;
  exitCode: number | null;
}

interface StreamEvent {
  type?: string;
  subtype?: string;
  result?: string;
  message?: {
    content?: Array<{
      type?: string;
      text?: string;
      name?: string;
    }>;
  };
}

/**
 * Run `claude -p` headlessly. Returns the final assistant text + the list of tool
 * names called (in order). If a `result` event is present, its `result` field is
 * authoritative; otherwise we fall back to concatenated assistant text blocks.
 */
export function runClaude(prompt: string): Promise<ClaudeResult> {
  return new Promise((resolveResult, rejectResult) => {
    const startedAt = Date.now();
    const child = spawn(
      "claude",
      [
        "-p",
        prompt,
        "--setting-sources",
        "project",
        "--output-format",
        "stream-json",
        "--verbose",
      ],
      { cwd: DEMO_ROOT },
    );

    let buffer = "";
    let resultText: string | null = null;
    const assistantTexts: string[] = [];
    const tools: string[] = [];

    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
      rejectResult(
        new Error(`claude -p timeout after ${FIRST_CALL_TIMEOUT_MS}ms`),
      );
    }, FIRST_CALL_TIMEOUT_MS);

    child.stdout.on("data", (chunk: Buffer) => {
      buffer += chunk.toString("utf-8");
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        let event: StreamEvent;
        try {
          event = JSON.parse(trimmed) as StreamEvent;
        } catch {
          continue;
        }
        absorbEvent(event, assistantTexts, tools, (r) => {
          resultText = r;
        });
      }
    });

    let stderr = "";
    child.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString("utf-8");
    });

    child.on("error", (err) => {
      clearTimeout(timeout);
      rejectResult(err);
    });

    child.on("close", (code) => {
      clearTimeout(timeout);
      const text = resultText ?? assistantTexts.join("\n");
      if (!text && stderr) {
        rejectResult(
          new Error(`claude -p exited ${code} with empty output. stderr:\n${stderr.slice(0, 500)}`),
        );
        return;
      }
      resolveResult({
        text: text.trim(),
        tools,
        durationMs: Date.now() - startedAt,
        exitCode: code,
      });
    });
  });
}

function absorbEvent(
  event: StreamEvent,
  assistantTexts: string[],
  tools: string[],
  setResult: (r: string) => void,
): void {
  if (event.type === "result" && typeof event.result === "string") {
    setResult(event.result);
    return;
  }
  if (event.type === "assistant" && event.message?.content) {
    for (const block of event.message.content) {
      if (block.type === "text" && block.text) {
        assistantTexts.push(block.text);
      } else if (block.type === "tool_use" && block.name) {
        tools.push(block.name);
      }
    }
  }
}

/** Strip the kis-code-assistant-mcp prefix for compact display. */
export function shortenToolNames(tools: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of tools) {
    const short = t.replace(/^mcp__kis-code-assistant-mcp__/, "");
    if (!seen.has(short)) {
      seen.add(short);
      out.push(short);
    }
  }
  return out;
}
