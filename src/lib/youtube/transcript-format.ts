/**
 * Transcript formatters shared by the Transcript Extractor and Subtitle
 * Downloader (pure; safe on server and client). Times are in seconds.
 */

export interface TranscriptSegment {
  text: string;
  /** Seconds. */
  duration: number;
  /** Seconds from the start of the video. */
  offset: number;
}

export type TranscriptFormat = 'txt' | 'srt' | 'vtt' | 'json';

/** Fallback cue length when a segment has no duration. */
const DEFAULT_CUE_SECONDS = 2;

const pad = (n: number, w = 2) => String(n).padStart(w, '0');

/** Seconds → "HH:MM:SS,mmm" (SRT). */
export function srtTime(totalSeconds: number): string {
  const ms = Math.max(0, Math.round(totalSeconds * 1000));
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms % 1000, 3)}`;
}

/** Seconds → "HH:MM:SS.mmm" (WebVTT). */
export function vttTime(totalSeconds: number): string {
  return srtTime(totalSeconds).replace(',', '.');
}

/** Seconds → "4:05" or "1:02:09" for display and TXT timestamps. */
export function clockTime(totalSeconds: number): string {
  const t = Math.max(0, Math.floor(totalSeconds));
  const h = Math.floor(t / 3600);
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** One-line cue text; also neutralises "-->" which would break SRT/VTT parsing. */
function cueText(text: string): string {
  return text.replace(/\s*\n\s*/g, ' ').replace(/-->/g, '->').trim();
}

function cueEnd(seg: TranscriptSegment): number {
  return seg.offset + (seg.duration > 0 ? seg.duration : DEFAULT_CUE_SECONDS);
}

export function toSrt(segments: TranscriptSegment[]): string {
  return segments
    .map((seg, i) => `${i + 1}\n${srtTime(seg.offset)} --> ${srtTime(cueEnd(seg))}\n${cueText(seg.text)}\n`)
    .join('\n');
}

export function toVtt(segments: TranscriptSegment[]): string {
  const body = segments
    .map((seg) => `${vttTime(seg.offset)} --> ${vttTime(cueEnd(seg))}\n${cueText(seg.text)}\n`)
    .join('\n');
  return `WEBVTT\n\n${body}`;
}

/**
 * Plain text. With timestamps: one "[m:ss] text" line per segment.
 * Without: flowing text, with a paragraph break after pauses of 4s+ so long
 * transcripts stay readable.
 */
export function toPlainText(segments: TranscriptSegment[], { timestamps }: { timestamps: boolean }): string {
  if (timestamps) {
    return segments.map((s) => `[${clockTime(s.offset)}] ${cueText(s.text)}`).join('\n');
  }
  const paragraphs: string[] = [];
  let current: string[] = [];
  segments.forEach((seg, i) => {
    const text = cueText(seg.text);
    if (text) current.push(text);
    const next = segments[i + 1];
    if (next && next.offset - cueEnd(seg) >= 4 && current.length) {
      paragraphs.push(current.join(' '));
      current = [];
    }
  });
  if (current.length) paragraphs.push(current.join(' '));
  return paragraphs.join('\n\n');
}

/** Structured JSON for developers (start/end/duration in seconds, 3 decimals). */
export function toJson(
  segments: TranscriptSegment[],
  meta: { videoId: string; language: string },
): string {
  const round = (n: number) => Math.round(n * 1000) / 1000;
  return JSON.stringify(
    {
      videoId: meta.videoId,
      language: meta.language,
      url: `https://www.youtube.com/watch?v=${meta.videoId}`,
      segments: segments.map((s) => ({
        start: round(s.offset),
        end: round(cueEnd(s)),
        duration: round(s.duration),
        text: cueText(s.text),
      })),
    },
    null,
    2,
  );
}

export const formatMeta: Record<TranscriptFormat, { ext: string; mime: string; label: string }> = {
  txt: { ext: 'txt', mime: 'text/plain', label: 'TXT' },
  srt: { ext: 'srt', mime: 'application/x-subrip', label: 'SRT' },
  vtt: { ext: 'vtt', mime: 'text/vtt', label: 'VTT' },
  json: { ext: 'json', mime: 'application/json', label: 'JSON' },
};

export function formatTranscript(
  format: TranscriptFormat,
  segments: TranscriptSegment[],
  meta: { videoId: string; language: string; timestamps?: boolean },
): string {
  switch (format) {
    case 'srt':
      return toSrt(segments);
    case 'vtt':
      return toVtt(segments);
    case 'json':
      return toJson(segments, meta);
    case 'txt':
      return toPlainText(segments, { timestamps: meta.timestamps ?? false });
  }
}

export interface TranscriptStats {
  words: number;
  characters: number;
  /** Minutes at ~238 words per minute (average adult silent reading). */
  readingMinutes: number;
  /** End of the last caption, in seconds. */
  coveredSeconds: number;
}

export function transcriptStats(segments: TranscriptSegment[]): TranscriptStats {
  const text = segments.map((s) => cueText(s.text)).join(' ');
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const last = segments[segments.length - 1];
  return {
    words,
    characters: text.length,
    readingMinutes: words / 238,
    coveredSeconds: last ? cueEnd(last) : 0,
  };
}

/** Human language name for a caption code ("en" → "English", "pt-BR" → "Portuguese (Brazil)"). */
export function languageName(code: string): string {
  try {
    return new Intl.DisplayNames(['en'], { type: 'language' }).of(code) ?? code;
  } catch {
    return code;
  }
}

/**
 * Choose which caption track to fetch: the requested code if the video has it,
 * otherwise English, otherwise any English variant (en-GB…), otherwise the first track.
 */
export function pickTranscriptLanguage(available: string[], requested: string | null): string {
  if (requested) {
    if (available.includes(requested)) return requested;
    // "de" should find "de-DE" (and "pt-PT" should fall back to "pt"): match on the base language.
    const base = requested.toLowerCase().split('-')[0];
    const sameBase = available.find((c) => c.toLowerCase().split('-')[0] === base);
    if (sameBase) return sameBase;
  }
  if (available.includes('en')) return 'en';
  return available.find((c) => c.toLowerCase().startsWith('en')) ?? available[0]!;
}
