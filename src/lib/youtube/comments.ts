import { getRedis } from '@/lib/cache/redis';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { getComments, getVideoDetails } from '@/lib/youtube/client';
import type { YouTubeCommentsResult } from '@/lib/youtube/types';

export interface CachedYouTubeComments extends YouTubeCommentsResult {
  fetchedAt: number;
}

/** Shared, size-aware comment retrieval for the exporter and bounded analyses. */
export async function getCachedComments(videoId: string, limit: number): Promise<CachedYouTubeComments> {
  const key = cacheKeys.comments(videoId, limit);
  const redis = getRedis();

  if (redis) {
    try {
      const cached = await redis.get<CachedYouTubeComments>(key);
      if (cached) {
        return {
          ...cached,
          // Older comment cache entries predate fetchedAt.
          fetchedAt: typeof cached.fetchedAt === 'number' ? cached.fetchedAt : Date.now(),
        };
      }
    } catch {
      // A cache read failure should not prevent a fresh YouTube request.
    }
  }

  const comments = await getComments(videoId, limit);
  let videoTitle = comments.videoTitle;
  if (!videoTitle) {
    try {
      const detail = await getVideoDetails(videoId);
      videoTitle = detail.title;
    } catch {
      videoTitle = '';
    }
  }

  const result: CachedYouTubeComments = { ...comments, videoTitle, fetchedAt: Date.now() };
  if (redis) {
    try {
      await redis.set(key, result, { ex: TTL.comments });
    } catch {
      // Keep the successful response even if the optional cache write fails.
    }
  }
  return result;
}
