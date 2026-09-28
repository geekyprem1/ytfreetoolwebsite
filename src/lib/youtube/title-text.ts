/** Title case + length helpers (pure; safe on server and client). */

/** YouTube hard limit for a video title. */
export const TITLE_MAX = 100;
/** Roughly where desktop search/related truncates a title. */
export const TITLE_DESKTOP_TRUNCATE = 60;
/** Roughly where mobile app titles truncate. */
export const TITLE_MOBILE_TRUNCATE = 40;

export type CaseStyle = 'title' | 'sentence' | 'upper' | 'lower';

/** Small words kept lowercase in Title Case unless first or last. */
const MINOR_WORDS = new Set([
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'if', 'in', 'nor', 'of',
  'off', 'on', 'or', 'per', 'so', 'the', 'to', 'up', 'via', 'vs', 'yet',
]);

function capitalizeWord(w: string): string {
  // Capitalise the first letter, keep the rest as typed (preserves iPhone, McDonald's mid-word).
  const i = w.search(/[a-z]/i);
  if (i === -1) return w;
  return w.slice(0, i) + w[i]!.toUpperCase() + w.slice(i + 1);
}

/** True for words like "iPhone", "macOS", "GoPro" — a capital after a lowercase letter. */
function hasIntentionalCase(word: string): boolean {
  return /[a-z][A-Z]/.test(word);
}

export function toTitleCase(input: string): string {
  const tokens = input.split(/(\s+)/); // keep original case + whitespace tokens
  const wordIdx: number[] = [];
  tokens.forEach((t, i) => {
    if (t.trim()) wordIdx.push(i);
  });
  const first = wordIdx[0];
  const last = wordIdx[wordIdx.length - 1];

  return tokens
    .map((tok, i) => {
      if (!tok.trim()) return tok;
      // Preserve deliberate brand casing (iPhone, macOS) rather than flattening it.
      if (hasIntentionalCase(tok)) return tok;
      const lower = tok.toLowerCase();
      const bare = lower.replace(/[^a-z0-9]/gi, '');
      const isMinor = MINOR_WORDS.has(bare);
      if (isMinor && i !== first && i !== last) return lower;
      return capitalizeWord(lower);
    })
    .join('');
}

export function toSentenceCase(input: string): string {
  const lower = input.toLowerCase();
  // Capitalise the first letter of each sentence.
  return lower.replace(/(^\s*|[.!?]\s+)([a-z])/g, (_m, lead: string, ch: string) => lead + ch.toUpperCase());
}

export function applyCase(input: string, style: CaseStyle): string {
  switch (style) {
    case 'upper':
      return input.toUpperCase();
    case 'lower':
      return input.toLowerCase();
    case 'sentence':
      return toSentenceCase(input);
    case 'title':
      return toTitleCase(input);
  }
}

export interface TitleLengthInfo {
  characters: number;
  words: number;
  overLimit: boolean;
  remaining: number;
  truncatedDesktop: boolean;
  truncatedMobile: boolean;
}

export function analyzeTitleLength(title: string): TitleLengthInfo {
  const characters = [...title].length; // count code points, so emoji count as 1
  const words = title.trim() ? title.trim().split(/\s+/).length : 0;
  return {
    characters,
    words,
    overLimit: characters > TITLE_MAX,
    remaining: TITLE_MAX - characters,
    truncatedDesktop: characters > TITLE_DESKTOP_TRUNCATE,
    truncatedMobile: characters > TITLE_MOBILE_TRUNCATE,
  };
}

/** First `limit` characters with an ellipsis when the title is longer. */
export function truncateTitle(title: string, limit: number): string {
  const chars = [...title];
  return chars.length <= limit ? title : chars.slice(0, limit).join('').trimEnd() + '…';
}
