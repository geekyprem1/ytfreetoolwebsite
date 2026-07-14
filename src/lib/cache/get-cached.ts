import { getRedis } from '@/lib/cache/redis';

export async function getCachedOrFetch<T>(
  key: string,
  ttl: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  if (ttl === 0) {
    return fetcher();
  }

  const redis = getRedis();
  if (!redis) {
    return fetcher();
  }

  try {
    const cached = await redis.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const data = await fetcher();
    await redis.set(key, JSON.parse(JSON.stringify(data)), { ex: ttl });
    return data;
  } catch {
    return fetcher();
  }
}
