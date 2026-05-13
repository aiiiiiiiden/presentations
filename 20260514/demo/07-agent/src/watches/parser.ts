/**
 * Natural-language watch parser.
 *
 * Two forms:
 *
 *   A. Absolute price ("종목 + 원화"):
 *      "감시 SKT 50000 이하"
 *      "SKT 5만원 이하 감시"
 *      "/watch 017670 >= 60000"
 *
 *   B. Percent-of-open ("종목 또는 지수 + 시초가 대비 N%"):
 *      "코스피가 시초가 대비 2% 빠지면 알려줘"
 *      "코스피 -2% 이하"
 *      "코스피 +1% 이상"
 *      "KOSDAQ 2% 오르면 알림"
 *      "SKT 3% 빠지면 알림"     (종목도 percent 사용 가능)
 *
 * Output:
 *   { assetKind, ticker, tickerName, conditionKind, op, threshold }
 *
 * Anything that doesn't match returns null so the bot can fall through to
 * alarms / Claude relay.
 */

interface TickerEntry {
  code: string;
  name: string;
  kind: "stock" | "index";
}

const TICKER_ALIASES: Record<string, TickerEntry> = {
  // ── 통신 3사 (telecom-analyst 데모와 결이 맞음)
  skt: { code: "017670", name: "SK텔레콤", kind: "stock" },
  sktelecom: { code: "017670", name: "SK텔레콤", kind: "stock" },
  sk텔레콤: { code: "017670", name: "SK텔레콤", kind: "stock" },
  kt: { code: "030200", name: "KT", kind: "stock" },
  lgu: { code: "032640", name: "LG유플러스", kind: "stock" },
  "lgu+": { code: "032640", name: "LG유플러스", kind: "stock" },
  lg유플러스: { code: "032640", name: "LG유플러스", kind: "stock" },
  // ── 반도체 (06-mcp 데모와 연결)
  삼성전자: { code: "005930", name: "삼성전자", kind: "stock" },
  samsung: { code: "005930", name: "삼성전자", kind: "stock" },
  sk하이닉스: { code: "000660", name: "SK하이닉스", kind: "stock" },
  하이닉스: { code: "000660", name: "SK하이닉스", kind: "stock" },
  hynix: { code: "000660", name: "SK하이닉스", kind: "stock" },
  // ── 지수 (KIS H0UPCNT0 tr_key)
  코스피: { code: "0001", name: "KOSPI", kind: "index" },
  kospi: { code: "0001", name: "KOSPI", kind: "index" },
  코스닥: { code: "1001", name: "KOSDAQ", kind: "index" },
  kosdaq: { code: "1001", name: "KOSDAQ", kind: "index" },
  코스피200: { code: "2001", name: "KOSPI200", kind: "index" },
  kospi200: { code: "2001", name: "KOSPI200", kind: "index" },
};

export interface ParsedWatch {
  assetKind: "stock" | "index";
  ticker: string; // 4-digit (index) or 6-digit (stock)
  tickerName: string;
  conditionKind: "abs" | "pct-of-open";
  op: "<=" | ">=";
  /** abs: KRW. pct-of-open: percent (e.g. -2 means -2%). */
  threshold: number;
}

export type WatchIntent =
  | { kind: "list" }
  | { kind: "cancel"; id: string }
  | { kind: "help" }
  | null;

// ─────────────────────────────────────────────────────────────────────────
// Ticker resolution

function resolveTickerToken(token: string): TickerEntry | null {
  const t = token.trim();
  // 6-digit ticker (stock) or 4-digit (index)
  if (/^\d{4}$/.test(t)) return { code: t, name: t, kind: "index" };
  if (/^\d{6}$/.test(t)) return { code: t, name: t, kind: "stock" };
  const lower = t.toLowerCase().replace(/\s+/g, "");
  return TICKER_ALIASES[lower] ?? null;
}

/**
 * Find the first known ticker mentioned anywhere in `text`. Matches by alias
 * (longest-first to prefer "SK하이닉스" over "KT") then by a standalone 4/6-digit
 * code. Used by the percent-form parser, which needs to find the asset
 * inside an arbitrary natural-language sentence.
 */
// Korean particles that may legitimately attach to a ticker alias
// ("코스피가", "하이닉스를", "SKT의"). Allowing them in the trailing
// lookahead is what lets us match these without absorbing the particle
// into the alias.
const KOREAN_PARTICLES = "은는이가을를의에로도만과와";

function findTickerInText(text: string): TickerEntry | null {
  const lower = text.toLowerCase();
  const keys = Object.keys(TICKER_ALIASES).sort((a, b) => b.length - a.length);
  for (const k of keys) {
    // Leading boundary: start-of-string or non-alnum/non-한글.
    // Trailing boundary: end / non-alnum-non-한글 / a Korean particle.
    const re = new RegExp(
      `(?:^|[^a-z0-9가-힣])${escapeRegex(k)}(?=$|[^a-z0-9가-힣]|[${KOREAN_PARTICLES}])`,
      "iu",
    );
    if (re.test(lower)) {
      return TICKER_ALIASES[k]!;
    }
  }
  const m = text.match(/(?:^|\D)(\d{4}|\d{6})(?:$|\D)/);
  if (m) {
    const code = m[1]!;
    return code.length === 4
      ? { code, name: code, kind: "index" }
      : { code, name: code, kind: "stock" };
  }
  return null;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ─────────────────────────────────────────────────────────────────────────
// Numeric helpers

/** "5만원" / "50000원" / "50,000" → 50000. NaN on garbage. */
function parseKrw(raw: string): number {
  const s = raw.trim().replace(/[,\s]/g, "").replace(/원$/u, "");
  const manMatch = s.match(/^([0-9]+(?:\.[0-9]+)?)만$/u);
  if (manMatch) return Math.round(Number(manMatch[1]) * 10_000);
  const eokMatch = s.match(/^([0-9]+(?:\.[0-9]+)?)억$/u);
  if (eokMatch) return Math.round(Number(eokMatch[1]) * 100_000_000);
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

function normalizeOp(raw: string): "<=" | ">=" | null {
  const s = raw.trim();
  if (s === "<=" || s === "≤" || s === "이하") return "<=";
  if (s === ">=" || s === "≥" || s === "이상") return ">=";
  return null;
}

// ─────────────────────────────────────────────────────────────────────────
// Form B — percent-of-open

const DOWN_VERB = /(?:빠지|떨어지|하락|내리)/u;
const UP_VERB = /(?:상승|오르|올라)/u;

/**
 * Parse "코스피 2% 빠지면 알림" / "코스피 -2% 이하" / "코스피 +1% 이상".
 * Returns null if the sentence has no percent figure or no recognizable
 * direction (verb / explicit op).
 */
function parsePercentForm(text: string): ParsedWatch | null {
  const tk = findTickerInText(text);
  if (!tk) return null;

  const pctMatch = text.match(/([+\-]?[0-9]+(?:\.[0-9]+)?)\s*%/u);
  if (!pctMatch) return null;
  const numRaw = pctMatch[1]!;
  const num = Number(numRaw);
  if (!Number.isFinite(num)) return null;
  const hasSign = numRaw.startsWith("+") || numRaw.startsWith("-");

  const isDown = DOWN_VERB.test(text);
  const isUp = UP_VERB.test(text);
  const explicitBelow = /이하|<=|≤/u.test(text);
  const explicitAbove = /이상|>=|≥/u.test(text);

  let op: "<=" | ">=";
  let threshold: number;

  if (isDown || explicitBelow) {
    // "2% 빠지면" → -2 / "-2% 이하" → -2 / "이하" 단독이면 부호 그대로
    op = "<=";
    threshold = hasSign ? num : isDown ? -num : num;
  } else if (isUp || explicitAbove) {
    op = ">=";
    threshold = hasSign ? num : isUp ? +num : num;
  } else {
    return null;
  }

  return {
    assetKind: tk.kind,
    ticker: tk.code,
    tickerName: tk.name,
    conditionKind: "pct-of-open",
    op,
    threshold,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Form A — absolute price (original behavior)

const TRIGGER_HEAD =
  /^(?:\/watch|watch|감시|모니터(?:링)?|알림\s*감시)\s+/iu;
const TRAIL_HINT = /(?:\s*(?:해줘|해라|알림|알려줘|감시))?$/u;

function parseAbsoluteForm(text: string): ParsedWatch | null {
  const original = text.trim();
  if (!original) return null;
  let body = original.replace(TRIGGER_HEAD, "");
  body = body.replace(TRAIL_HINT, "");
  const hadTrigger = body !== original;

  const opRe = "(?:<=|>=|≤|≥|이상|이하)";
  const numRe = "(?:[0-9][0-9,\\.]*\\s*(?:만|억)?원?)";

  const formA = body.match(
    new RegExp(`^(\\S+)\\s+(${opRe})\\s+(${numRe})$`, "u"),
  );
  const formB = body.match(
    new RegExp(`^(\\S+)\\s+(${numRe})\\s+(${opRe})$`, "u"),
  );

  let tickerTok: string;
  let opTok: string;
  let priceTok: string;
  if (formA) {
    tickerTok = formA[1]!;
    opTok = formA[2]!;
    priceTok = formA[3]!;
  } else if (formB) {
    tickerTok = formB[1]!;
    priceTok = formB[2]!;
    opTok = formB[3]!;
  } else {
    return null;
  }

  const op = normalizeOp(opTok);
  if (!op) return null;
  if (!hadTrigger && !/이상|이하|<=|>=|≤|≥/u.test(opTok)) return null;

  const tk = resolveTickerToken(tickerTok);
  if (!tk) return null;

  const threshold = parseKrw(priceTok);
  if (!Number.isFinite(threshold) || threshold <= 0) return null;

  return {
    assetKind: tk.kind,
    ticker: tk.code,
    tickerName: tk.name,
    conditionKind: "abs",
    op,
    threshold,
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Public entry points

export function parseWatch(text: string): ParsedWatch | null {
  // Try percent first — its surface form is wider (natural sentence with verb).
  // Absolute form is stricter and only matches a tight token layout.
  return parsePercentForm(text) ?? parseAbsoluteForm(text);
}

export function parseWatchIntent(text: string): WatchIntent {
  const t = text.trim();

  if (/^\/watches\b$/i.test(t) || /^감시\s*(?:목록|리스트|확인)\s*\??$/u.test(t)) {
    return { kind: "list" };
  }
  const slashCancel = t.match(/^\/unwatch\s+(\S+)\s*$/i);
  if (slashCancel) return { kind: "cancel", id: slashCancel[1]! };
  const krCancel = t.match(/^감시\s*(?:삭제|취소|중지|해제)\s+(\S+)\s*$/u);
  if (krCancel) return { kind: "cancel", id: krCancel[1]! };
  if (/^\/watchhelp\b$/i.test(t) || /^감시\s*도움$/u.test(t)) {
    return { kind: "help" };
  }
  return null;
}
