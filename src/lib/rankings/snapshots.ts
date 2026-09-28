/**
 * Daily subscriber snapshots for the "Fastest Growing" ranking.
 *
 * One Redis hash per UTC day: yt:rankings:snap:YYYY-MM-DD → { channelId: subscribers }.
 * Each hash expires after TTL.rankingsSnapshot (29 days) so we never keep
 * YouTube API data longer than the 30 days the API policies allow.
 *
 * Growth compares live counts against the oldest snapshot still available
 * (up to GROWTH_WINDOW_DAYS back). Until enough history exists the page shows
 * a shorter window and says so.
 */

import { getRedis } from '@/lib/cache/redis';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';

export const GROWTH_WINDOW_DAYS = 28;

export function utcDay(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function daysAgo(n: number, from: Date = new Date()): string {
  const d = new Date(from);
  d.setUTCDate(d.getUTCDate() - n);
  return utcDay(d);
}

/** Write today's snapshot once. Safe to call on every render; no-op without Redis. */
export async function recordDailySnapshot(
  channels: { id: string; subscribers: number }[],
  now: Date = new Date(),
): Promise<boolean> {
  const redis = getRedis();
  if (!redis || channels.length === 0) return false;
  const key = cacheKeys.rankingsSnapshot(utcDay(now));
  try {
    if (await redis.exists(key)) return false;
    const map: Record<string, number> = {};
    for (const c of channels) map[c.id] = c.subscribers;
    await redis.hset(key, map);
    await redis.expire(key, TTL.rankingsSnapshot);
    return true;
  } catch (err) {
    console.error('[rankings] snapshot write failed', err);
    return false;
  }
}

export interface Baseline {
  date: string;
  /** Whole days between the baseline and `now`. */
  days: number;
  subscribers: Map<string, number>;
}

export interface GrowthHistory {
  /** Oldest snapshot at least 1 day old within the window, or null. */
  baseline: Baseline | null;
  /** Oldest snapshot date we hold, including today (for "tracking since" copy). */
  since: string | null;
}

/**
 * One EXISTS pipeline over days 28…0 (29 commands) answers both questions —
 * where the baseline is and when tracking started — then one HGETALL.
 */
export async function loadGrowthHistory(now: Date = new Date()): Promise<GrowthHistory> {
  const redis = getRedis();
  if (!redis) return { baseline: null, since: null };
  try {
    const offsets = Array.from({ length: GROWTH_WINDOW_DAYS + 1 }, (_, i) => GROWTH_WINDOW_DAYS - i); // 28 … 0
    const pipe = redis.pipeline();
    for (const d of offsets) pipe.exists(cacheKeys.rankingsSnapshot(daysAgo(d, now)));
    const exists = ((await pipe.exec()) as unknown[]).map((e) => Number(e) > 0);

    const firstIdx = exists.findIndex(Boolean);
    const since = firstIdx === -1 ? null : daysAgo(offsets[firstIdx]!, now);

    // Baseline must be at least 1 day old, so ignore the last offset (today).
    const baseIdx = exists.slice(0, -1).findIndex(Boolean);
    if (baseIdx === -1) return { baseline: null, since };

    const days = offsets[baseIdx]!;
    const date = daysAgo(days, now);
    const raw = await redis.hgetall<Record<string, number | string>>(cacheKeys.rankingsSnapshot(date));

    const subscribers = new Map<string, number>();
    for (const [id, v] of Object.entries(raw ?? {})) {
      const n = Number(v);
      if (Number.isFinite(n) && n > 0) subscribers.set(id, n);
    }
    return { baseline: subscribers.size ? { date, days, subscribers } : null, since };
  } catch (err) {
    console.error('[rankings] growth history read failed', err);
    return { baseline: null, since: null };
  }
}

export interface GrowthRow<T> {
  channel: T;
  baseline: number;
  gain: number;
  /** Gain as a percentage of the baseline count. */
  percent: number;
}

/**
 * Rank channels by absolute subscriber gain since the baseline.
 * Channels without a baseline value, or with no measurable gain, are skipped
 * (YouTube rounds public counts, so small channels often show 0 change).
 */
export function computeGrowth<T extends { id: string; subscribers: number }>(
  channels: T[],
  baseline: Map<string, number>,
  limit = 100,
): GrowthRow<T>[] {
  const rows: GrowthRow<T>[] = [];
  for (const c of channels) {
    const base = baseline.get(c.id);
    if (!base) continue;
    const gain = c.subscribers - base;
    if (gain <= 0) continue;
    rows.push({ channel: c, baseline: base, gain, percent: (gain / base) * 100 });
  }
  rows.sort((a, b) => b.gain - a.gain || b.percent - a.percent);
  return rows.slice(0, limit);
}
