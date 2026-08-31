import { NextRequest } from 'next/server';
import { getChannelDetails } from '@/lib/youtube/client';
import { normalizeChannelInput } from '@/lib/youtube/url-parser';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';

/**
 * Resolves any channel URL, @handle, or UC… ID to core identity + branding
 * (channel ID, @handle, avatar, banner). Powers Channel ID Finder,
 * Profile Picture Downloader, and Banner Downloader.
 */
async function fetchBranding(input: string) {
  const channel = await getChannelDetails(input);
  return {
    id: channel.id,
    title: channel.title,
    customUrl: channel.customUrl,
    thumbnail: channel.thumbnail,
    thumbnailHigh: channel.thumbnailHigh,
    bannerUrl: channel.bannerUrl,
    subscriberCount: channel.subscriberCount,
  };
}

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get('c');
    if (!raw) {
      return apiErrorResponse(
        new AppError('MISSING_CHANNEL_ID', ErrorCodes.MISSING_CHANNEL_ID.message, 400),
      );
    }

    // Accept a full URL/@handle, or a bare UC… ID / handle string.
    const input = normalizeChannelInput(raw) ?? raw.trim().replace(/^@/, '');
    if (!input) {
      return apiErrorResponse(
        new AppError('MISSING_CHANNEL_ID', ErrorCodes.MISSING_CHANNEL_ID.message, 400),
      );
    }

    const isChannelId = input.startsWith('UC') && input.length >= 24;
    const fetcher = () => fetchBranding(input);

    const result = isChannelId
      ? await getCachedOrFetch(cacheKeys.channelBranding(input), TTL.channelBranding, fetcher)
      : await fetcher();

    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
