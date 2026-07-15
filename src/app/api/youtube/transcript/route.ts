import { NextRequest } from 'next/server';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';

type Segment = { text: string; duration: number; offset: number; lang?: string };

/**
 * youtube-transcript srv3 path returns ms; classic XML returns seconds.
 * Segment spoken duration is almost never >= 100s, so that detects ms.
 */
function normalizeSegments(segments: Segment[]): Segment[] {
  const usedMs = segments.some((s) => s.duration >= 100 || s.offset >= 100_000);
  if (!usedMs) return segments;
  return segments.map((s) => ({
    ...s,
    offset: s.offset / 1000,
    duration: s.duration / 1000,
  }));
}

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
        const raw = await YoutubeTranscript.fetchTranscript(videoId!, { lang });
        const segments = normalizeSegments(raw as Segment[]);

        return {
          videoId,
          language: lang,
          segments,
          fullText: segments.map((s) => s.text).join(' '),
        };
      } catch (e) {
        const msg = e instanceof Error ? e.message : '';
        if (msg.includes('disabled')) {
          throw new AppError('TRANSCRIPT_DISABLED', ErrorCodes.TRANSCRIPT_DISABLED.message, 404);
        }
        throw new AppError('TRANSCRIPT_UNAVAILABLE', ErrorCodes.TRANSCRIPT_UNAVAILABLE.message, 404);
      }
    });

    // Re-normalize cached payloads that may still be in ms from before the fix
    const cached = result as { videoId: string; language: string; segments: Segment[]; fullText: string };
    const segments = normalizeSegments(cached.segments ?? []);

    return apiSuccessResponse({
      ...cached,
      segments,
      fullText: segments.map((s) => s.text).join(' ') || cached.fullText,
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
