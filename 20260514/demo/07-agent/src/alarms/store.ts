/**
 * Alarm persistence store.
 *
 * Alarms live in `data/alarms.json` (path overridable via env ALARMS_FILE) so they
 * survive bot restarts. Reads are cached in memory; writes go through a serialized
 * queue + atomic rename to avoid corruption when multiple alarms fire at once.
 *
 * Schema is intentionally tiny — a single JSON array of alarm records.
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

export type AlarmStatus = "pending" | "fired" | "failed" | "cancelled";

export interface Alarm {
  id: string;
  chatId: number;
  scheduledAt: number; // epoch ms
  createdAt: number;
  prompt: string; // empty = beep-only
  label: string; // e.g., "5분 뒤"
  status: AlarmStatus;
  firedAt?: number;
  error?: string;
}

const STORE_FILE =
  process.env.ALARMS_FILE ?? join(DEMO_ROOT, "data", "alarms.json");

let cache: Alarm[] | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function ensureDir(filePath: string): void {
  mkdirSync(dirname(filePath), { recursive: true });
}

function load(): Alarm[] {
  if (cache !== null) return cache;
  if (!existsSync(STORE_FILE)) {
    cache = [];
    return cache;
  }
  try {
    const raw = readFileSync(STORE_FILE, "utf-8");
    const parsed = JSON.parse(raw) as Alarm[];
    cache = Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error(
      `[alarms] failed to parse ${STORE_FILE}: ${err instanceof Error ? err.message : err}. Starting empty.`,
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

// --- Public API ------------------------------------------------------------

export function getStorePath(): string {
  return STORE_FILE;
}

export async function addAlarm(
  init: Omit<Alarm, "id" | "createdAt" | "status">,
): Promise<Alarm> {
  const all = load();
  const a: Alarm = {
    id: shortId(),
    createdAt: Date.now(),
    status: "pending",
    ...init,
  };
  all.push(a);
  await persist();
  return a;
}

export async function updateAlarm(
  id: string,
  patch: Partial<Alarm>,
): Promise<Alarm | undefined> {
  const all = load();
  const a = all.find((x) => x.id === id);
  if (!a) return undefined;
  Object.assign(a, patch);
  await persist();
  return a;
}

export async function cancelAlarm(id: string): Promise<Alarm | undefined> {
  const all = load();
  const a = all.find((x) => x.id === id);
  if (!a || a.status !== "pending") return undefined;
  a.status = "cancelled";
  await persist();
  return a;
}

/** Alarms that are still pending and (optionally) belong to a given chat. */
export function listPending(chatId?: number): Alarm[] {
  return load()
    .filter(
      (a) =>
        a.status === "pending" &&
        (chatId === undefined || a.chatId === chatId),
    )
    .sort((a, b) => a.scheduledAt - b.scheduledAt);
}

/** All alarms for a chat, filtered by status set. */
export function listForChat(
  chatId: number,
  statuses: AlarmStatus[] = ["pending"],
): Alarm[] {
  return load()
    .filter((a) => a.chatId === chatId && statuses.includes(a.status))
    .sort((a, b) => a.scheduledAt - b.scheduledAt);
}

/** Drop fired/failed/cancelled records older than N days. Keeps the file lean. */
export async function gc(retentionDays = 7): Promise<number> {
  const cutoff = Date.now() - retentionDays * 24 * 3600 * 1000;
  const all = load();
  const before = all.length;
  cache = all.filter(
    (a) =>
      a.status === "pending" ||
      (a.firedAt ?? a.createdAt) > cutoff,
  );
  if (cache.length !== before) {
    await persist();
  }
  return before - cache.length;
}
