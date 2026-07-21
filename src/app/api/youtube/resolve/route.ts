import { NextRequest } from 'next/server';
import { resolveUrl } from '@/lib/youtube/client';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';

const toolSuggestions = {
  video: [
    { slug: 'thumbnail-downloader', name: 'Thumbnail Downloader' },
    { slug: 'tags-extractor', name: 'Tags Extractor' },
    { slug: 'transcript-extractor', name: 'Transcript Extractor' },
    { slug: 'video-statistics', name: 'Video Statistics' },
  ],
  channel: [
    { slug: 'channel-statistics', name: 'Channel Statistics' },
    { slug: 'channel-tags', name: 'Channel Tags' },
    { slug: 'monetization-checker', name: 'YouTube Monetization Checker' },
  ],
};

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    if (!url) {
      return apiErrorResponse(new AppError('INVALID_YOUTUBE_URL', ErrorCodes.INVALID_YOUTUBE_URL.message, 400));
    }

    const parsed = parseYouTubeUrl(url);
    if (!parsed) {
      return apiErrorResponse(new AppError('INVALID_YOUTUBE_URL', ErrorCodes.INVALID_YOUTUBE_URL.message, 400));
    }

    const result = await getCachedOrFetch(cacheKeys.resolve(url), TTL.resolve, () =>
      resolveUrl(url),
    );

    return apiSuccessResponse({
      type: parsed.type,
      id: parsed.id,
      title: result.title,
      suggestedTools: toolSuggestions[parsed.type],
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
