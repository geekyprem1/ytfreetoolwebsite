import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockRedis, mockGetRedis, mockCheckRateLimit, quotaValues } = vi.hoisted(() => {
  const quotaValues = new Map<string, number>();
  const mockRedis = {
    get: vi.fn(async () => null as unknown),
    set: vi.fn(async () => 'OK'),
    incrby: vi.fn(async (key: string, by: number) => {
      const value = (quotaValues.get(key) ?? 0) + by;
      quotaValues.set(key, value);
      return value;
    }),
    expire: vi.fn(async () => 1),
  };
  return {
    mockRedis,
    mockGetRedis: vi.fn(() => mockRedis),
    mockCheckRateLimit: vi.fn(async () => ({ allowed: true, remaining: 79, reset: 0 })),
    quotaValues,
  };
});

vi.mock('@/lib/cache/redis', () => ({ getRedis: mockGetRedis }));
vi.mock('@/lib/rate-limit/limiter', () => ({ checkRateLimit: mockCheckRateLimit }));

import { getReturnYoutubeDislikeEstimate } from './return-youtube-dislike';

describe('Return YouTube Dislike provider boundary', () => {
  beforeEach(() => {
    quotaValues.clear();
    vi.clearAllMocks();
    mockGetRedis.mockReturnValue(mockRedis);
    mockRedis.get.mockResolvedValue(null);
    mockRedis.set.mockResolvedValue('OK');
    mockRedis.incrby.mockImplementation(async (key: string, by: number) => {
      const value = (quotaValues.get(key) ?? 0) + by;
      quotaValues.set(key, value);
      return value;
    });
    mockCheckRateLimit.mockResolvedValue({ allowed: true, remaining: 79, reset: 0 });
    vi.stubGlobal('fetch', vi.fn());
  });

  it('uses a cached estimate without calling the provider and keeps its original retrieval time', async () => {
    const cached = {
      videoId: 'dQw4w9WgXcQ',
      estimatedDislikes: 12,
      providerLikes: 30,
      providerViews: 100,
      retrievedAt: 1_700_000_000_000,
      source: 'Return YouTube Dislike' as const,
    };
    mockRedis.get.mockResolvedValue(cached);

    await expect(getReturnYoutubeDislikeEstimate(cached.videoId)).resolves.toEqual(cached);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('maps a missing provider record to unavailable instead of a zero count', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 404 }));

    await expect(getReturnYoutubeDislikeEstimate('dQw4w9WgXcQ')).rejects.toMatchObject({
      code: 'DISLIKE_ESTIMATE_UNAVAILABLE',
      status: 404,
    });
  });

  it('applies an app-level daily provider cap and does not send the blocked request', async () => {
    mockRedis.incrby.mockResolvedValue(8_001);

    await expect(getReturnYoutubeDislikeEstimate('dQw4w9WgXcQ')).rejects.toMatchObject({
      code: 'DISLIKE_PROVIDER_RATE_LIMITED',
      status: 503,
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  it('backs off when the upstream provider rate-limits the service', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 429 }));

    await expect(getReturnYoutubeDislikeEstimate('dQw4w9WgXcQ')).rejects.toMatchObject({
      code: 'DISLIKE_PROVIDER_RATE_LIMITED',
      status: 503,
    });
  });

  it('maps provider timeouts or network failures to a retryable upstream error', async () => {
    vi.mocked(fetch).mockRejectedValue(new Error('timeout'));

    await expect(getReturnYoutubeDislikeEstimate('dQw4w9WgXcQ')).rejects.toMatchObject({
      code: 'DISLIKE_PROVIDER_UNAVAILABLE',
      status: 502,
    });
  });

  it('caches valid estimates for six hours and preserves provider response values', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(JSON.stringify({
      id: 'dQw4w9WgXcQ', dislikes: 12, likes: 30, viewCount: 100,
    }), { status: 200, headers: { 'Content-Type': 'application/json' } }));

    const estimate = await getReturnYoutubeDislikeEstimate('dQw4w9WgXcQ');

    expect(estimate).toMatchObject({ videoId: 'dQw4w9WgXcQ', estimatedDislikes: 12, providerLikes: 30, providerViews: 100 });
    expect(estimate.source).toBe('Return YouTube Dislike');
    expect(mockRedis.set).toHaveBeenCalledWith(
      'provider:ryd:estimate:dQw4w9WgXcQ',
      estimate,
      { ex: 60 * 60 * 6 },
    );
  });
});
