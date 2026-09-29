import { z } from 'zod';
import { getRedis } from '@/lib/cache/redis';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { checkRateLimit } from '@/lib/rate-limit/limiter';
import { AppError } from '@/lib/errors';

const DAILY_PROVIDER_BUDGET = 8_000;
const PROVIDER_BASE_URL = 'https://returnyoutubedislikeapi.com';

const providerResponseSchema = z.object({
  id: z.string().length(11),
  dislikes: z.number().finite().nonnegative(),
  likes: z.number().finite().nonnegative(),
  viewCount: z.number().finite().nonnegative().optional(),
});

export interface ReturnYoutubeDislikeEstimate {
  videoId: string;
  estimatedDislikes: number;
  providerLikes: number;
  providerViews: number | null;
  retrievedAt: number;
  source: 'Return YouTube Dislike';
}

/** Validate the third-party response before it reaches the public API. */
export function parseReturnYoutubeDislikeResponse(
  raw: unknown,
  expectedVideoId: string,
  retrievedAt = Date.now(),
): ReturnYoutubeDislikeEstimate {
  const result = providerResponseSchema.safeParse(raw);
  if (!result.success || result.data.id !== expectedVideoId) {
    throw new AppError('DISLIKE_PROVIDER_INVALID_RESPONSE', 'The estimate provider returned an invalid response.', 502);
  }

  return {
    videoId: result.data.id,
    estimatedDislikes: result.data.dislikes,
    providerLikes: result.data.likes,
    providerViews: result.data.viewCount ?? null,
    retrievedAt,
    source: 'Return YouTube Dislike',
  };
}

function utcDateKey(date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

async function reserveProviderRequest(): Promise<boolean> {
  // Keep below the provider's documented 100 requests/minute and 10,000/day.
  const minute = await checkRateLimit('yt-toolkit-return-dislike-provider', 'external');
  if (!minute.allowed) return false;

  const redis = getRedis();
  if (!redis) return true;
  const key = cacheKeys.returnDislikeQuotaDay(utcDateKey());
  try {
    const requests = await redis.incrby(key, 1);
    if (requests === 1) await redis.expire(key, 60 * 60 * 48);
    return requests <= DAILY_PROVIDER_BUDGET;
  } catch {
    // The provider's own limiter remains the fallback if shared Redis is down.
    return true;
  }
}

export async function getReturnYoutubeDislikeEstimate(videoId: string): Promise<ReturnYoutubeDislikeEstimate> {
  const redis = getRedis();
  const cacheKey = cacheKeys.returnDislikeEstimate(videoId);

  if (redis) {
    try {
      const cached = await redis.get<ReturnYoutubeDislikeEstimate>(cacheKey);
      if (cached) return cached;
    } catch {
      // Continue with a provider request when cache reads fail.
    }
  }

  if (!(await reserveProviderRequest())) {
    throw new AppError('DISLIKE_PROVIDER_RATE_LIMITED', 'This estimate lookup is temporarily limited. Try again later.', 503);
  }

  let response: Response;
  try {
    const url = new URL('/votes', PROVIDER_BASE_URL);
    url.searchParams.set('videoId', videoId);
    response = await fetch(url, { signal: AbortSignal.timeout(8_000), cache: 'no-store' });
  } catch {
    throw new AppError('DISLIKE_PROVIDER_UNAVAILABLE', 'The estimate provider is temporarily unavailable.', 502);
  }

  if (response.status === 404) {
    throw new AppError('DISLIKE_ESTIMATE_UNAVAILABLE', 'No estimate is available from this provider for that video.', 404);
  }
  if (response.status === 429) {
    throw new AppError('DISLIKE_PROVIDER_RATE_LIMITED', 'The estimate provider is rate-limiting requests. Try again later.', 503);
  }
  if (!response.ok) {
    throw new AppError('DISLIKE_PROVIDER_UNAVAILABLE', 'The estimate provider is temporarily unavailable.', 502);
  }

  let estimate: ReturnYoutubeDislikeEstimate;
  try {
    estimate = parseReturnYoutubeDislikeResponse(await response.json(), videoId);
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError('DISLIKE_PROVIDER_INVALID_RESPONSE', 'The estimate provider returned an invalid response.', 502);
  }

  if (redis) {
    try {
      await redis.set(cacheKey, estimate, { ex: TTL.returnDislikeEstimate });
    } catch {
      // A successful estimate remains usable even when the cache write fails.
    }
  }

  return estimate;
}
