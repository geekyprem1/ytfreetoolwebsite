import { describe, expect, it } from 'vitest';
import { calculateRemainingWatchTimePlan } from './watch-time';

describe('calculateRemainingWatchTimePlan', () => {
  it('calculates remaining views and a date from daily views', () => {
    expect(calculateRemainingWatchTimePlan({
      targetWatchHours: 4000,
      currentQualifiedWatchHours: 1000,
      averageViewDurationMinutes: 5,
      averageDailyViews: 1000,
      referenceDate: new Date('2026-09-19T12:00:00Z'),
    })).toEqual({ remainingWatchHours: 3000, remainingViews: 36000, completionDate: '2026-10-25' });
  });

  it('returns no date when the target is complete or no daily views are provided', () => {
    expect(calculateRemainingWatchTimePlan({ targetWatchHours: 4000, currentQualifiedWatchHours: 4000, averageViewDurationMinutes: 5, averageDailyViews: 1000 }).completionDate).toBeNull();
    expect(calculateRemainingWatchTimePlan({ targetWatchHours: 4000, currentQualifiedWatchHours: 0, averageViewDurationMinutes: 5, averageDailyViews: 0 }).completionDate).toBeNull();
  });
});
