import { NextRequest } from 'next/server';
import { getChannelDetails, getChannelUploadsPage } from '@/lib/youtube/client';
import { inspectYouTubeInput } from '@/lib/youtube/url-parser';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const raw = request.nextUrl.searchParams.get('c')?.trim() ?? '';
    const page = Number(request.nextUrl.searchParams.get('page') ?? '0');
    const pageToken = request.nextUrl.searchParams.get('pageToken') ?? '';
    const inspected = inspectYouTubeInput(raw);
    const channelInput = inspected?.type === 'channel' && ['channel ID', 'handle'].includes(inspected.identifierKind) ? inspected.id : null;
    if (!channelInput || !Number.isInteger(page) || page < 0 || page > 3 || pageToken.length > 512 || (page === 0 && pageToken) || (page > 0 && !pageToken)) {
      throw new AppError('INVALID_TOOL_INPUT', 'Enter a channel ID or @handle. Up to four pages are available.', 400);
    }
    const channel = await getChannelDetails(inspected?.identifierKind === 'handle' ? `@${channelInput}` : channelInput);
    if (!channel.uploadsPlaylistId) {
      throw new AppError('CHANNEL_NOT_FOUND', 'This channel has no accessible uploads playlist.', 404);
    }
    const result = await getChannelUploadsPage(channel.uploadsPlaylistId, pageToken || undefined);
    return apiSuccessResponse({
      channelId: channel.id,
      channelTitle: channel.title,
      page,
      videos: result.videos,
      nextPageToken: page < 3 ? result.nextPageToken : null,
      capped: page === 3 && Boolean(result.nextPageToken),
    });
  } catch (error) {
    return apiErrorResponse(handleApiError(error));
  }
}
