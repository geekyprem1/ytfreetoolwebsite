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
    return { allowed: true, remaining: config.maxRequests, reset: 0 };
  }

  try {
    await redis.zremrangebyscore(key, 0, windowStart);
    const count = await redis.zcard(key);

    if (count >= config.maxRequests) {
      const oldest = (await redis.zrange(key, 0, 0, { withScores: true })) as unknown as [string, number][];
      const reset = oldest.length > 0 ? Math.ceil((oldest[0]![1] + config.windowMs - now) / 1000) : 60;
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
    return { allowed: true, remaining: config.maxRequests, reset: 0 };
  }
}
