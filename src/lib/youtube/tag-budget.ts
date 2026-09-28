/**
 * YouTube Studio tag helpers (pure; safe on server and client).
 *
 * The Tags field allows 500 characters in total. YouTube's counter adds the
 * commas between tags, and a tag that contains a space is counted as if it
 * were wrapped in quotes (+2). This mirrors that behaviour closely enough to
 * warn before Studio rejects the list; treat it as an estimate.
 */

export const YOUTUBE_TAG_CHAR_LIMIT = 500;
export const MAX_TAG_LENGTH = 100;

export type TagType = 'primary' | 'related' | 'long-tail';

export interface GeneratedTag {
  tag: string;
  type: TagType;
}

/** Strip characters YouTube rejects or that do not belong in Studio tags. */
export function sanitizeTag(raw: string): string {
  return raw
    .replace(/[<>"#]/g, '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, '')
    .replace(/\s+/g, ' ')
    .replace(/^[\s,]+|[\s,]+$/g, '')
    .slice(0, MAX_TAG_LENGTH);
}

/** Characters one tag uses in YouTube's counter. */
export function tagCost(tag: string): number {
  return tag.length + (tag.includes(' ') ? 2 : 0);
}

/** Total characters a tag list uses, including separating commas. */
export function tagListLength(tags: string[]): number {
  if (tags.length === 0) return 0;
  return tags.reduce((sum, t) => sum + tagCost(t), 0) + (tags.length - 1);
}

/** Comma-separated list ready to paste into the Studio Tags field. */
export function formatTagsForStudio(tags: string[]): string {
  return tags.join(', ');
}

const TAG_TYPES: TagType[] = ['primary', 'related', 'long-tail'];

/** Group keys the prompt asks for → internal tag types. */
const GROUP_KEYS: [string, TagType][] = [
  ['primary', 'primary'],
  ['related', 'related'],
  ['longTail', 'long-tail'],
];

/**
 * Normalise untrusted AI output: sanitize, drop empties, dedupe
 * case-insensitively, coerce unknown types to "related".
 *
 * Accepts the grouped shape `{ primary: [], related: [], longTail: [] }`
 * (what the prompt requests) or a flat `{ tags: [{ tag, type }] }` list.
 */
export function normalizeGeneratedTags(input: unknown, limit = 40): GeneratedTag[] {
  const obj = (input ?? {}) as Record<string, unknown>;
  let list: unknown[] = [];
  if (Array.isArray(obj.tags)) {
    list = obj.tags;
  } else {
    for (const [key, type] of GROUP_KEYS) {
      const group = obj[key];
      if (Array.isArray(group)) list.push(...group.map((tag) => ({ tag, type })));
    }
  }
  if (list.length === 0) return [];

  const seen = new Set<string>();
  const out: GeneratedTag[] = [];
  for (const item of list) {
    const rawTag = typeof item === 'string' ? item : (item as { tag?: unknown })?.tag;
    if (typeof rawTag !== 'string') continue;
    const tag = sanitizeTag(rawTag);
    const key = tag.toLowerCase();
    if (!tag || seen.has(key)) continue;
    seen.add(key);
    const rawType = typeof item === 'object' && item ? (item as { type?: unknown }).type : undefined;
    const type = TAG_TYPES.includes(rawType as TagType) ? (rawType as TagType) : 'related';
    out.push({ tag, type });
    if (out.length >= limit) break;
  }
  return out;
}

/**
 * Recover complete tag strings from AI output that is not valid JSON
 * (e.g. cut off mid-array by a token limit). Returns the grouped shape.
 */
export function salvageTagGroups(text: string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const [key] of GROUP_KEYS) {
    const start = text.search(new RegExp(`"${key}"\\s*:\\s*\\[`));
    if (start === -1) continue;
    const body = text.slice(text.indexOf('[', start) + 1);
    const end = body.indexOf(']');
    const segment = end === -1 ? body : body.slice(0, end);
    // Only fully quoted strings; a string cut off at the end has no closing quote.
    out[key] = [...segment.matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]!.replace(/\\"/g, '"'));
  }
  return out;
}

/** Greedily keep tags in order until the character budget is used. */
export function fitTagsToLimit(tags: string[], limit = YOUTUBE_TAG_CHAR_LIMIT): string[] {
  const kept: string[] = [];
  for (const t of tags) {
    if (tagListLength([...kept, t]) <= limit) kept.push(t);
  }
  return kept;
}
