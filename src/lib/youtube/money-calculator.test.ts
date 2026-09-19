import { describe, expect, it } from 'vitest';
import { calculateViewsForTargetEarnings } from './money-calculator';

describe('calculateViewsForTargetEarnings', () => {
  it('calculates views needed from target revenue, CPM and monetized rate', () => {
    expect(calculateViewsForTargetEarnings({ targetEarnings: 1000, cpm: 4, monetizedRate: 50 })).toBe(500000);
  });

  it('returns zero when revenue inputs cannot produce an estimate', () => {
    expect(calculateViewsForTargetEarnings({ targetEarnings: 1000, cpm: 0, monetizedRate: 50 })).toBe(0);
  });
});
