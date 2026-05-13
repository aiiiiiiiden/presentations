/**
 * Watch persistence store.
 *
 * Watches survive bot restarts in `data/watches.json` (override via env
 * WATCHES_FILE). Mirrors the alarms store: in-memory cache + serialized
 * atomic writes via tmp + rename.
 */

import { randomUUID } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DEMO_ROOT = join(__dirname, "..", "..");

export type WatchStatus = "watching" | "triggered" | "cancelled" | "failed";
export type AssetKind = "stock" | "index";
export type ConditionKind = "abs" | "pct-of-open";

export interface Watch {
  id: string;
  chatId: number;
  assetKind: AssetKind;      // stock → H0STCNT0, index → H0UPCNT0
  ticker: string;            // 6-digit (stock) or 4-digit (index)
  tickerName: string;        // display name (e.g. "SK텔레콤", "KOSPI")
  conditionKind: ConditionKind;
  op: "<=" | ">=";
  /** abs → KRW. pct-of-open → percent (e.g. -2 means -2%). */
  threshold: number;
  createdAt: number;
  status: WatchStatus;
  triggeredAt?: number;
  /** Tick price at trigger. */
  triggeredPrice?: number;
  /** Session open at trigger (pct-of-open only). */
  triggeredOpen?: number;
  /** Computed percent at trigger (pct-of-open only). */
  triggeredPct?: number;
  error?: string;
}

const STORE_FILE =
  process.env.WATCHES_FILE ?? join(DEMO_ROOT, "data", "watches.json");

let cache: Watch[] | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function ensureDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

function load(): Watch[] {
  if (cache !== null) return cache;
  if (!existsSync(STORE_FILE)) {
    cache = [];
    return cache;
  }
  try {
    const raw = readFileSync(STORE_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Partial<Watch>[];
    // Backward-compat: pre-v2 records had no assetKind/conditionKind. They
    // were always 6-digit stocks with absolute-price thresholds.
    cache = Array.isArray(parsed)
      ? parsed.map((w) => ({
          assetKind: "stock",
          conditionKind: "abs",
          ...w,
        }) as Watch)
      : [];
  } catch (err) {
    console.error(
      `[watches] failed to parse ${STORE_FILE}: ${err instanceof Error ? err.message : err}. Starting empty.`,
    );
    cache = [];
  }
  return cache;
}

function persist(): Promise<void> {
  writeQueue = writeQueue.then(() => {
    ensureDir(STORE_FILE);
    const tmp = `${STORE_FILE}.tmp`;
    writeFileSync(tmp, JSON.stringify(cache ?? [], null, 2), "utf-8");
    renameSync(tmp, STORE_FILE);
  });
  return writeQueue;
}

function shortId(): string {
  return randomUUID().slice(0, 8);
}

export function getWatchesPath(): string {
  return STORE_FILE;
}

export async function addWatch(
  init: Omit<Watch, "id" | "createdAt" | "status">,
): Promise<Watch> {
  const all = load();
  const w: Watch = {
    id: shortId(),
    createdAt: Date.now(),
    status: "watching",
    ...init,
  };
  all.push(w);
  await persist();
  return w;
}

export async function updateWatch(
  id: string,
  patch: Partial<Watch>,
): Promise<Watch | undefined> {
  const all = load();
  const w = all.find((x) => x.id === id);
  if (!w) return undefined;
  Object.assign(w, patch);
  await persist();
  return w;
}

export async function cancelWatch(id: string): Promise<Watch | undefined> {
  const all = load();
  const w = all.find((x) => x.id === id);
  if (!w || w.status !== "watching") return undefined;
  w.status = "cancelled";
  await persist();
  return w;
}

/** All actively-watching records (across chats). Used by the manager to
 *  reconcile subscriptions on boot + after every state change. */
export function listActive(): Watch[] {
  return load().filter((w) => w.status === "watching");
}

export function listForChat(
  chatId: number,
  statuses: WatchStatus[] = ["watching"],
): Watch[] {
  return load()
    .filter((w) => w.chatId === chatId && statuses.includes(w.status))
    .sort((a, b) => a.createdAt - b.createdAt);
}

export function getWatch(id: string): Watch | undefined {
  return load().find((w) => w.id === id);
}

/** Drop terminal records older than N days. */
export async function gc(retentionDays = 7): Promise<number> {
  const cutoff = Date.now() - retentionDays * 24 * 3600 * 1000;
  const all = load();
  const before = all.length;
  cache = all.filter(
    (w) => w.status === "watching" || (w.triggeredAt ?? w.createdAt) > cutoff,
  );
  if (cache.length !== before) {
    await persist();
  }
  return before - cache.length;
}
