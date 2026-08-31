import { getRedis } from '@/lib/cache/redis';
import { cacheKeys } from '@/lib/cache/cache-keys';

/**
 * Best-effort daily YouTube Data API quota tracking.
 *
 * The default project quota is 10,000 units/day. Live counters poll continuously,
 * so we count units in Redis and stop live polling before we exhaust the budget,
 * leaving headroom for the rest of the site's tools.
 *
 * This is advisory, not exact: it fails open when Redis is unavailable (so tools
 * keep working locally) and does not try to be perfectly atomic. Its job is to
 * prevent runaway live-polling loops from burning the whole daily quota.
 */

/** Total daily budget. */
export const DAILY_QUOTA = 10_000;

/** Stop *live polling* here, keeping the rest for normal on-demand tools. */
export const LIVE_POLL_SOFT_LIMIT = 8_000;

function todayKey(): string {
  return cacheKeys.quotaDay(new Date().toISOString().slice(0, 10));
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
 * Whether live polling is still allowed under the soft limit.
 * Fails open (true) when Redis is unavailable.
 */
export async function isLivePollAllowed(): Promise<boolean> {
  const redis = getRedis();
  if (!redis) return true;
  const used = await getQuotaUsed();
  return used < LIVE_POLL_SOFT_LIMIT;
}
