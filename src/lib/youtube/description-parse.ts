/** Parse a YouTube description into links, hashtags and chapter timestamps (pure). */

export interface ParsedDescription {
  links: string[];
  hashtags: string[];
  timestamps: { time: string; label: string }[];
  lineCount: number;
  characters: number;
}

const URL_RE = /https?:\/\/[^\s<>()]+[^\s<>().,;:!?'"]/gi;
const HASHTAG_RE = /(?:^|\s)(#[\p{L}\p{N}_]+)/gu;
/** "0:00 Intro", "1:02:33 - Chapter" at the start of a line. */
const TIMESTAMP_RE = /^\s*(?:[-•]\s*)?(\d{1,2}:(?:\d{1,2}:)?\d{2})\s*[-–—:)\]]?\s*(.*)$/;

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

export function parseDescription(description: string): ParsedDescription {
  const text = description ?? '';
  const lines = text.split(/\r?\n/);

  const links = unique(text.match(URL_RE) ?? []);
  const hashtags = unique([...text.matchAll(HASHTAG_RE)].map((m) => m[1]!));

  const timestamps: { time: string; label: string }[] = [];
  for (const line of lines) {
    const m = line.match(TIMESTAMP_RE);
    if (m) timestamps.push({ time: m[1]!, label: m[2]!.trim() });
  }

  return {
    links,
    hashtags,
    timestamps,
    lineCount: lines.length,
    characters: text.length,
  };
}

/** Convert "H:MM:SS" / "M:SS" to total seconds (for building timestamp links). */
export function timestampToSeconds(time: string): number {
  const parts = time.split(':').map(Number);
  if (parts.some((n) => Number.isNaN(n))) return 0;
  return parts.reduce((acc, n) => acc * 60 + n, 0);
}
