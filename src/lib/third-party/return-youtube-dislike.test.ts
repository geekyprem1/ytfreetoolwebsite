import { describe, expect, it } from 'vitest';
import { parseReturnYoutubeDislikeResponse } from './return-youtube-dislike';

describe('Return YouTube Dislike response validation', () => {
  it('keeps the provider number explicitly labeled as an estimate', () => {
    expect(parseReturnYoutubeDislikeResponse({
      id: 'dQw4w9WgXcQ',
      dislikes: 1234,
      likes: 5678,
      viewCount: 98765,
    }, 'dQw4w9WgXcQ', 1_800_000_000_000)).toEqual({
      videoId: 'dQw4w9WgXcQ',
      estimatedDislikes: 1234,
      providerLikes: 5678,
      providerViews: 98765,
      retrievedAt: 1_800_000_000_000,
      source: 'Return YouTube Dislike',
    });
  });

  it('rejects mismatched IDs and invalid counts', () => {
    expect(() => parseReturnYoutubeDislikeResponse({
      id: 'aaaaaaaaaaa',
      dislikes: 1,
      likes: 2,
    }, 'dQw4w9WgXcQ')).toThrow('invalid response');

    expect(() => parseReturnYoutubeDislikeResponse({
      id: 'dQw4w9WgXcQ',
      dislikes: -1,
      likes: 2,
    }, 'dQw4w9WgXcQ')).toThrow('invalid response');
  });
});
