/**
 * Natural-language alarm parser.
 *
 * Matches Korean phrasings at the START of the message:
 *
 *   "5분 뒤 SKT 분석해줘"        → delay 5min,  prompt "SKT 분석해줘"
 *   "10분 후에 회의 알람"         → delay 10min, prompt "회의 알람"
 *   "1시간 뒤"                    → delay 1h,    prompt "" (beep only)
 *   "2시간 30분 후 시장 동향 정리"  → delay 2:30,  prompt "시장 동향 정리"
 *   "30초 뒤 hi"                  → delay 30s,   prompt "hi" (handy for testing)
 *
 * Does NOT match if the time fragment isn't at the start (e.g. "SKT 5분 차트" — the
 * "5분" is part of the analysis target, not a delay).
 */

export interface ParsedAlarm {
  delayMs: number;
  label: string;
  prompt: string;
}

// Capture optional hours/minutes/seconds, followed by 뒤|후 (with optional 에),
// then the rest as the prompt.
const PATTERN =
  /^\s*(?:(\d+)\s*시간)?\s*(?:(\d+)\s*분)?\s*(?:(\d+)\s*초)?\s*(뒤|후)(?:에)?\s*(.*)$/u;

export function parseAlarm(text: string): ParsedAlarm | null {
  const trimmed = text.trim();
  const m = trimmed.match(PATTERN);
  if (!m) return null;

  const h = Number(m[1] ?? 0);
  const min = Number(m[2] ?? 0);
  const sec = Number(m[3] ?? 0);
  // Require at least one time component AND the matched 뒤/후 marker.
  if (!h && !min && !sec) return null;

  const totalMs = (h * 3600 + min * 60 + sec) * 1000;
  if (totalMs <= 0) return null;

  const labelParts: string[] = [];
  if (h) labelParts.push(`${h}시간`);
  if (min) labelParts.push(`${min}분`);
  if (sec) labelParts.push(`${sec}초`);
  const label = `${labelParts.join(" ")} 뒤`;

  const prompt = (m[5] ?? "").trim();
  return { delayMs: totalMs, label, prompt };
}

// --- intent detection for list/cancel (also natural language friendly) ----

export type AlarmIntent =
  | { kind: "list" }
  | { kind: "cancel"; id: string }
  | { kind: "help" }
  | null;

export function parseIntent(text: string): AlarmIntent {
  const t = text.trim();

  if (/^\/(?:alarms|list)\b$/i.test(t)) return { kind: "list" };
  if (/^(?:알람\s*(?:목록|리스트|확인|보여줘|보여주세요))\s*\??$/u.test(t)) {
    return { kind: "list" };
  }

  const slashCancel = t.match(/^\/cancel\s+(\S+)\s*$/i);
  if (slashCancel) return { kind: "cancel", id: slashCancel[1]! };

  const krCancel = t.match(/^알람\s*(?:삭제|취소)\s+(\S+)\s*$/u);
  if (krCancel) return { kind: "cancel", id: krCancel[1]! };

  if (/^\/(?:help|alarm)\b$/i.test(t) || /^(도움말|알람\s*도움)$/u.test(t)) {
    return { kind: "help" };
  }

  return null;
}
