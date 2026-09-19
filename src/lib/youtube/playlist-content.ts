export interface PlaylistDraft {
  title: string;
  description: string;
}

function normalizeForSearch(value: string): string {
  return value.trim().replace(/\s+/g, ' ').toLocaleLowerCase();
}

/** Count non-overlapping, case-insensitive occurrences after whitespace normalization. */
export function countKeywordOccurrences(text: string, keyword: string): number {
  const haystack = normalizeForSearch(text);
  const needle = normalizeForSearch(keyword);
  if (!haystack || !needle) return 0;

  let count = 0;
  let start = 0;
  while (start <= haystack.length - needle.length) {
    const index = haystack.indexOf(needle, start);
    if (index === -1) break;
    count += 1;
    start = index + needle.length;
  }
  return count;
}

export function getPlaylistKeywordStats(draft: PlaylistDraft, keyword: string) {
  return {
    titleLength: draft.title.length,
    descriptionLength: draft.description.length,
    titleKeywordCount: countKeywordOccurrences(draft.title, keyword),
    descriptionKeywordCount: countKeywordOccurrences(draft.description, keyword),
  };
}

export function formatPlaylistExport(drafts: PlaylistDraft[]): string {
  return drafts
    .map(
      (draft, index) =>
        `PLAYLIST ${index + 1}\nTitle: ${draft.title.trim()}\nDescription:\n${draft.description.trim()}`,
    )
    .join('\n\n------------------------------\n\n');
}
