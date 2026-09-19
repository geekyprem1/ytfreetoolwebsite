import { describe, expect, it } from 'vitest';
import { countKeywordOccurrences, formatPlaylistExport, getPlaylistKeywordStats } from './playlist-content';

describe('playlist content helpers', () => {
  it('counts case-insensitive phrases and normalizes whitespace', () => {
    expect(countKeywordOccurrences('YouTube SEO tips\nfor YouTube SEO creators', 'youtube   seo')).toBe(2);
    expect(countKeywordOccurrences('one keyword keyword', 'keyword')).toBe(2);
    expect(countKeywordOccurrences('anything', '')).toBe(0);
  });

  it('returns character and keyword coverage stats', () => {
    expect(getPlaylistKeywordStats({ title: 'YouTube SEO', description: 'Learn YouTube SEO.' }, 'youtube seo')).toEqual({
      titleLength: 11,
      descriptionLength: 18,
      titleKeywordCount: 1,
      descriptionKeywordCount: 1,
    });
  });

  it('formats a copy/download-friendly export', () => {
    expect(formatPlaylistExport([{ title: 'Starter', description: 'A path.' }])).toBe(
      'PLAYLIST 1\nTitle: Starter\nDescription:\nA path.',
    );
  });
});
