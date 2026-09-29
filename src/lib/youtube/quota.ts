import { getRedis } from '@/lib/cache/redis';
import { cacheKeys } from '@/lib/cache/cache-keys';

/**
 * Best-effort daily YouTube Data API quota tracking.
 *
 * YouTube separates search.list into its own daily calls bucket (100 by default);
 * other read methods share a 10,000-unit daily bucket. The general counter is
 * best-effort and only includes requests explicitly instrumented in this repo.
 * Live counters stop polling before the tracked general bucket reaches its soft
 * limit. Search.list calls are reserved in a separate Redis counter below.
 *
 * This is advisory, not exact: it fails open when Redis is unavailable (so tools
 * keep working locally) and does not try to be perfectly atomic. Its job is to
 * prevent runaway live-polling loops from burning the whole daily quota.
 */

/** Default daily budget for YouTube Data API methods other than search.list. */
export const DAILY_QUOTA = 10_000;

const configuredSearchLimit = Number(process.env.YOUTUBE_SEARCH_LIST_DAILY_LIMIT);
/** Google Cloud's documented default; override only to match the project's granted quota. */
export const SEARCH_LIST_DAILY_LIMIT =
  Number.isSafeInteger(configuredSearchLimit) && configuredSearchLimit > 0
    ? configuredSearchLimit
    : 100;

/** Stop *live polling* here, keeping the rest for normal on-demand tools. */
export const LIVE_POLL_SOFT_LIMIT = 8_000;

export function youtubeQuotaDateKey(date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) => parts.find((item) => item.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

function todayKey(): string {
  return cacheKeys.quotaDay(youtubeQuotaDateKey());
}

function todaySearchKey(): string {
  return cacheKeys.searchQuotaDay(youtubeQuotaDateKey());
}

/** Add `units` to today's counter. Returns the new total (or -1 if untracked). */
export async function trackQuota(units: number): Promise<number> {
  const redis = getRedis();
  if (!redis) return -1;
  try {
    const total = await redis.incrby(todayKey(), units);
    // Expire ~2 days out so the key self-cleans; refresh on first write of the day.
    if (total === units) {
      await redis.expire(todayKey(), 60 * 60 * 48);
    }
    return total;
  } catch {
    return -1;
  }
}

/** Current units used today (0 when untracked). */
export async function getQuotaUsed(): Promise<number> {
  const redis = getRedis();
  if (!redis) return 0;
  try {
    const used = await redis.get<number>(todayKey());
    return typeof used === 'number' ? used : 0;
  } catch {
    return 0;
  }
}

/**
 * Reserve one search.list call before sending it, because failed API requests
 * can still consume quota. Returns false once this app reaches its configured
 * daily limit. Redis outages fail open and leave Google's own quota as fallback.
 */
export async function reserveSearchListCall(): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return true;
  const key = todaySearchKey();
  try {
    const calls = await redis.incrby(key, 1);
    if (calls === 1) await redis.expire(key, 60 * 60 * 48);
    return calls <= SEARCH_LIST_DAILY_LIMIT;
  } catch {
    return true;
  }
}

export async function getSearchListCallsUsed(): Promise<number> {
  const redis = getRedis();
  if (!redis) return 0;
  try {
    const calls = await redis.get<number>(todaySearchKey());
    return typeof calls === 'number' ? calls : 0;
  } catch {
    return 0;
  }
}

/**
 * Whether live polling is still allowed under the soft limit.
 * Fails open (true) when Redis is unavailable.
 */
export async function isLivePollAllowed(): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return true;
  const used = await getQuotaUsed();
  return used < LIVE_POLL_SOFT_LIMIT;
}
