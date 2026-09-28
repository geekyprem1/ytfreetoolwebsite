import { NextRequest } from 'next/server';
import { getCachedOrFetch } from '@/lib/cache/get-cached';
import { cacheKeys } from '@/lib/cache/cache-keys';
import { TTL } from '@/lib/cache/cache-policies';
import { apiSuccessResponse, apiErrorResponse, handleApiError, AppError, ErrorCodes } from '@/lib/errors';
import { pickTranscriptLanguage } from '@/lib/youtube/transcript-format';

type Segment = { text: string; duration: number; offset: number; lang?: string };

const VIDEO_ID_RE = /^[a-zA-Z0-9_-]{11}$/;
/** BCP-47-ish caption codes: "en", "pt-BR", "zh-Hans". */
const LANG_RE = /^[a-zA-Z]{2,3}(?:-[a-zA-Z0-9]{2,8})*$/;
/** A code no video has — asking for it makes the library list the real tracks. */
const PROBE_LANG = 'zz-probe';

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

function mapLibraryError(e: unknown): AppError {
  const msg = e instanceof Error ? e.message : '';
  if (/disabled/i.test(msg)) {
    return new AppError('TRANSCRIPT_DISABLED', ErrorCodes.TRANSCRIPT_DISABLED.message, 404);
  }
  return new AppError('TRANSCRIPT_UNAVAILABLE', ErrorCodes.TRANSCRIPT_UNAVAILABLE.message, 404);
}

/**
 * Caption languages available on a video. youtube-transcript has no list API,
 * but requesting a language that does not exist throws an error that names
 * every available track — so we probe once and cache the answer.
 */
async function fetchLanguages(videoId: string): Promise<string[]> {
  const { YoutubeTranscript } = await import('youtube-transcript');
  try {
    await YoutubeTranscript.fetchTranscript(videoId, { lang: PROBE_LANG });
    return [];
  } catch (e) {
    const msg = e instanceof Error ? e.message : '';
    const match = msg.match(/Available languages:\s*(.*)$/);
    if (!match) throw mapLibraryError(e);
    return [...new Set(match[1]!.split(',').map((s) => s.trim()).filter((s) => LANG_RE.test(s)))];
  }
}

async function fetchSegments(videoId: string, lang: string | null) {
  const { YoutubeTranscript } = await import('youtube-transcript');
  try {
    const raw = await YoutubeTranscript.fetchTranscript(videoId, lang ? { lang } : undefined);
    const segments = normalizeSegments(raw as Segment[]);
    return {
      videoId,
      language: lang ?? (raw as Segment[])[0]?.lang ?? 'unknown',
      segments,
      fullText: segments.map((s) => s.text).join(' '),
    };
  } catch (e) {
    throw mapLibraryError(e);
  }
}

export async function GET(request: NextRequest) {
  try {
    const videoId = request.nextUrl.searchParams.get('v') ?? '';
    const langParam = request.nextUrl.searchParams.get('lang');
    const requested = langParam && LANG_RE.test(langParam) ? langParam : null;

    if (!VIDEO_ID_RE.test(videoId)) {
      return apiErrorResponse(new AppError('MISSING_VIDEO_ID', ErrorCodes.MISSING_VIDEO_ID.message, 400));
    }

    const availableLanguages = await getCachedOrFetch(cacheKeys.transcriptLangs(videoId), TTL.transcript, () =>
      fetchLanguages(videoId),
    );
    // Empty list (unexpected library behaviour) → let the library pick its default track.
    const lang = availableLanguages.length ? pickTranscriptLanguage(availableLanguages, requested) : null;

    const result = await getCachedOrFetch(cacheKeys.transcript(videoId, lang ?? 'default'), TTL.transcript, () =>
      fetchSegments(videoId, lang),
    );

    // Re-normalize cached payloads that may still be in ms from before the fix
    const cached = result as { videoId: string; language: string; segments: Segment[]; fullText: string };
    const segments = normalizeSegments(cached.segments ?? []);

    return apiSuccessResponse({
      ...cached,
      availableLanguages,
      segments,
      fullText: segments.map((s) => s.text).join(' ') || cached.fullText,
    });
  } catch (err) {
    return apiErrorResponse(handleApiError(err));
  }
}
