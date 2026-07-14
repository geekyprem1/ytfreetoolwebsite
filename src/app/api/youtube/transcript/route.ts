import { NextRequest } from 'next/server';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    const videoId = request.nextUrl.searchParams.get('v');
    const lang = request.nextUrl.searchParams.get('lang') || 'en';

    if (!videoId) {
      return apiErrorResponse(
        new AppError('TRANSCRIPT_UNAVAILABLE', ErrorCodes.TRANSCRIPT_UNAVAILABLE.message, 404),
      );
    }

    const result = await getCachedOrFetch(cacheKeys.transcript(videoId, lang), TTL.transcript, async () => {
      const { YoutubeTranscript } = await import('youtube-transcript');
      try {
        const segments = await YoutubeTranscript.fetchTranscript(videoId!, { lang });
        return {
          videoId,
          language: lang,
          segments,
          fullText: segments.map((s: { text: string }) => s.text).join(' '),
        };
      } catch (e) {
        const msg = e instanceof Error ? e.message : '';
        if (msg.includes('disabled')) {
          throw new AppError('TRANSCRIPT_DISABLED', ErrorCodes.TRANSCRIPT_DISABLED.message, 404);
        }
        throw new AppError('TRANSCRIPT_UNAVAILABLE', ErrorCodes.TRANSCRIPT_UNAVAILABLE.message, 404);
      }
    });

    return apiSuccessResponse(result);
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
