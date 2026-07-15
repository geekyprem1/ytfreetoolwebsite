import { getRedis } from '@/lib/cache/redis';
import { cacheKeys } from '@/lib/cache/cache-keys';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const FREE_TIER: Record<string, RateLimitConfig> = {
  youtube: { windowMs: 60_000, maxRequests: 60 },
  ai: { windowMs: 60_000, maxRequests: 20 },
  compute: { windowMs: 60_000, maxRequests: 120 },
  resolve: { windowMs: 60_000, maxRequests: 60 },
};

type RateLimitTier = keyof typeof FREE_TIER;

/** Per-isolate sliding window when Redis is unavailable (fail-closed locally). */
const memoryWindows = new Map<string, number[]>();

function checkMemoryRateLimit(
  key: string,
  config: RateLimitConfig,
): { allowed: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const windowStart = now - config.windowMs;
  const timestamps = (memoryWindows.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= config.maxRequests) {
    const oldest = timestamps[0] ?? now;
    const reset = Math.max(1, Math.ceil((oldest + config.windowMs - now) / 1000));
    memoryWindows.set(key, timestamps);
    return { allowed: false, remaining: 0, reset };
  }

  timestamps.push(now);
  memoryWindows.set(key, timestamps);
  return {
    allowed: true,
    remaining: config.maxRequests - timestamps.length,
    reset: 0,
  };
}

export async function checkRateLimit(
  identifier: string,
  tier: RateLimitTier,
): Promise<{ allowed: boolean; remaining: number; reset: number }> {
  const config: RateLimitConfig | undefined = FREE_TIER[tier];
  if (!config) {
    return { allowed: true, remaining: 0, reset: 0 };
  }

  const key = cacheKeys.rateLimit(tier, identifier);
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const redis = getRedis();
  if (!redis) {
    return checkMemoryRateLimit(key, config);
  }

  try {
    await redis.zremrangebyscore(key, 0, windowStart);
    const count = await redis.zcard(key);

    if (count >= config.maxRequests) {
      const oldest = await redis.zrange(key, 0, 0, { withScores: true });
      // Upstash returns flat [member, score] for withScores
      const oldestScore =
        typeof oldest?.[1] === 'number'
          ? oldest[1]
          : typeof oldest?.[0] === 'object' && oldest[0] !== null && 'score' in oldest[0]
            ? Number((oldest[0] as { score: number }).score)
            : now;
      const reset = Math.max(1, Math.ceil((oldestScore + config.windowMs - now) / 1000));
      return { allowed: false, remaining: 0, reset };
    }

    await redis.zadd(key, { score: now, member: `${now}-${Math.random()}` });
    await redis.expire(key, Math.ceil(config.windowMs / 1000) + 1);

    return {
      allowed: true,
      remaining: config.maxRequests - count - 1,
      reset: 0,
    };
  } catch {
    return checkMemoryRateLimit(key, config);
  }
}

export function getRateLimitMax(tier: RateLimitTier): number {
  return FREE_TIER[tier]?.maxRequests ?? 60;
}
