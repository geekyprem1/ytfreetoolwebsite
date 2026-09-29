import { describe, expect, it } from 'vitest';
import { calculateLiveEarnings } from './live-earnings';

describe('calculateLiveEarnings', () => {
  it('uses the creator share of gross Super Chats in both breakdown and total', () => {
    expect(calculateLiveEarnings({ views: 1000, cpm: 10, grossSuperChats: 100, newMembers: 2 })).toEqual({
      adRevenue: 5.5,
      superChatRevenue: 70,
      membershipRevenue: 7,
      total: 82.5,
    });
  });

  it('handles zero and decimal money inputs with a reconciling total', () => {
    expect(calculateLiveEarnings({ views: 0, cpm: 0, grossSuperChats: 0, newMembers: 0 })).toEqual({
      adRevenue: 0,
      superChatRevenue: 0,
      membershipRevenue: 0,
      total: 0,
    });
    const result = calculateLiveEarnings({ views: 1100, cpm: 6.25, grossSuperChats: 0.33, newMembers: 1 });
    expect(result).toEqual({ adRevenue: 3.78, superChatRevenue: 0.23, membershipRevenue: 3.5, total: 7.51 });
    expect(result!.total).toBeCloseTo(result!.adRevenue + result!.superChatRevenue + result!.membershipRevenue, 2);
  });

  it.each([
    { views: -1, cpm: 10, grossSuperChats: 100, newMembers: 2 },
    { views: 1.5, cpm: 10, grossSuperChats: 100, newMembers: 2 },
    { views: 1000, cpm: -1, grossSuperChats: 100, newMembers: 2 },
    { views: 1000, cpm: 10, grossSuperChats: Number.NaN, newMembers: 2 },
    { views: 1000, cpm: 10, grossSuperChats: 100, newMembers: 0.5 },
  ])('rejects invalid or fractional count inputs: %j', (inputs) => {
    expect(calculateLiveEarnings(inputs)).toBeNull();
  });
});
