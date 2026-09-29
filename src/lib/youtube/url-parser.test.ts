import { describe, expect, it } from 'vitest';
import { inspectYouTubeInput, parseYouTubePlaylistId, parseYouTubeUrl } from './url-parser';

describe('YouTube URL inspection', () => {
  it('accepts supported video formats and removes tracking parameters', () => {
    expect(inspectYouTubeInput('https://youtu.be/dQw4w9WgXcQ?si=tracking')).toEqual({
      type: 'video', id: 'dQw4w9WgXcQ', identifierKind: 'video ID',
      normalizedUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    });
    expect(parseYouTubeUrl('https://www.youtube.com/shorts/dQw4w9WgXcQ')).toEqual({ type: 'video', id: 'dQw4w9WgXcQ' });
  });

  it('keeps playlist context from a watch URL', () => {
    expect(inspectYouTubeInput('youtube.com/watch?v=dQw4w9WgXcQ&list=PL1234567890abcd')?.playlistId).toBe('PL1234567890abcd');
    expect(inspectYouTubeInput('https://www.youtube.com/playlist?list=PL1234567890abcd')?.type).toBe('playlist');
  });

  it('distinguishes handles and legacy segments from channel IDs', () => {
    expect(inspectYouTubeInput('https://www.youtube.com/@Creator')?.identifierKind).toBe('handle');
    expect(inspectYouTubeInput('@UC1234567890123456789012')?.identifierKind).toBe('handle');
    expect(inspectYouTubeInput('https://www.youtube.com/c/Creator')?.identifierKind).toBe('custom name');
    expect(inspectYouTubeInput('https://www.youtube.com/c/UC1234567890123456789012')?.identifierKind).toBe('custom name');
    expect(inspectYouTubeInput('UC1234567890123456789012')?.identifierKind).toBe('channel ID');
  });

  it('rejects lookalike hosts and injected playlist parameters', () => {
    expect(parseYouTubeUrl('https://evil.test/youtube.com/watch?v=dQw4w9WgXcQ')).toBeNull();
    expect(parseYouTubeUrl('https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ')).toBeNull();
    expect(parseYouTubePlaylistId('https://evil.test/playlist?list=PL1234567890abcd')).toBeNull();
    expect(parseYouTubeUrl('javascript:youtube.com/watch?v=dQw4w9WgXcQ')).toBeNull();
  });
});
