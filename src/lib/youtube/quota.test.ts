import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockRedis, mockGetRedis, values } = vi.hoisted(() => {
  const values = new Map<string, number>();
  const mockRedis = {
    incrby: vi.fn(async (key: string, by: number) => {
      const value = (values.get(key) ?? 0) + by;
      values.set(key, value);
      return value;
    }),
    expire: vi.fn(async () => 1),
    get: vi.fn(async (key: string) => values.get(key) ?? null),
  };
  return { mockRedis, mockGetRedis: vi.fn(() => mockRedis), values };
});

vi.mock('@/lib/cache/redis', () => ({ getRedis: mockGetRedis }));

import { getSearchListCallsUsed, reserveSearchListCall, SEARCH_LIST_DAILY_LIMIT, youtubeQuotaDateKey } from './quota';

describe('YouTube search quota', () => {
  beforeEach(() => {
    values.clear();
    vi.clearAllMocks();
    mockGetRedis.mockReturnValue(mockRedis);
  });

  it('uses YouTube’s Pacific-time quota day boundary', () => {
    expect(youtubeQuotaDateKey(new Date('2026-09-30T06:59:00.000Z'))).toBe('2026-09-29');
    expect(youtubeQuotaDateKey(new Date('2026-09-30T07:00:00.000Z'))).toBe('2026-09-30');
  });

  it('reserves calls up to the configured project limit and blocks the next one', async () => {
    for (let call = 0; call < SEARCH_LIST_DAILY_LIMIT; call += 1) {
      expect(await reserveSearchListCall()).toBe(true);
    }

    expect(await reserveSearchListCall()).toBe(false);
    expect(await getSearchListCallsUsed()).toBe(SEARCH_LIST_DAILY_LIMIT + 1);
    expect(mockRedis.expire).toHaveBeenCalledTimes(1);
  });
});
