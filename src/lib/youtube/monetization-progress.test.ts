import { describe, expect, it } from 'vitest';
import { CURRENT_YPP_REQUIREMENTS, YPP_2027_REQUIREMENTS } from './ypp-requirements';
import {
  calculateEligibilityProgress,
  calculateMonetizationForecast,
  calculateTargetDatePlan,
} from './monetization-progress';

const completeCurrentInput = {
  subscribers: 1_000,
  qualifiedWatchHours: 4_000,
  qualifiedShortsViews: 0,
  publicUploadsInLast90Days: 3,
};

describe('monetization progress', () => {
  it('recognizes the long-form route at the current threshold only', () => {
    expect(calculateEligibilityProgress(completeCurrentInput, CURRENT_YPP_REQUIREMENTS).qualifiesViaLongForm).toBe(true);
    expect(calculateEligibilityProgress(completeCurrentInput, YPP_2027_REQUIREMENTS).qualifiesForFullProgram).toBe(false);
  });

  it('recognizes the earlier-access tier independently of full ads eligibility', () => {
    const progress = calculateEligibilityProgress(
      {
        subscribers: 500,
        qualifiedWatchHours: 3_000,
        qualifiedShortsViews: 0,
        publicUploadsInLast90Days: 3,
      },
      CURRENT_YPP_REQUIREMENTS,
    );

    expect(progress.qualifiesForEarlyAccess).toBe(true);
    expect(progress.qualifiesForFullProgram).toBe(false);
  });

  it('calculates a per-day plan from a future target date', () => {
    const plan = calculateTargetDatePlan(
      {
        subscribers: 500,
        qualifiedWatchHours: 2_000,
        qualifiedShortsViews: 5_000_000,
        publicUploadsInLast90Days: 3,
        targetDate: '2026-10-18',
      },
      CURRENT_YPP_REQUIREMENTS,
      new Date('2026-09-18T00:00:00.000Z'),
    );

    expect(plan).toEqual({
      daysRemaining: 30,
      requiredDailySubscribers: 500 / 30,
      requiredDailyWatchHours: 2_000 / 30,
      requiredDailyShortsViews: 5_000_000 / 30,
    });
  });

  it('returns the slower requirement as the forecasted long-form date', () => {
    const forecast = calculateMonetizationForecast(
      {
        subscribers: 900,
        qualifiedWatchHours: 3_500,
        qualifiedShortsViews: 0,
        publicUploadsInLast90Days: 3,
        monthlySubscriberGain: 100,
        monthlyQualifiedWatchHours: 1_000,
      },
      CURRENT_YPP_REQUIREMENTS,
      new Date('2026-09-18T00:00:00.000Z'),
    );

    expect(forecast.fullProgramViaLongForm?.toISOString().slice(0, 10)).toBe('2026-10-19');
    expect(forecast.fullProgramViaShorts).toBeNull();
  });
});
