import { describe, expect, it } from 'vitest';
import {
  CURRENT_YPP_REQUIREMENTS,
  YPP_2027_REQUIREMENTS,
  formatYppEffectiveDate,
  getYppRequirementsForDate,
  getYppWatchHoursProgress,
} from './ypp-requirements';

describe('YPP requirements', () => {
  it('uses the current thresholds before 1 February 2027', () => {
    expect(getYppRequirementsForDate(new Date('2027-01-31T23:59:59.000Z'))).toBe(
      CURRENT_YPP_REQUIREMENTS,
    );
  });

  it('uses the announced thresholds on and after 1 February 2027', () => {
    expect(getYppRequirementsForDate(new Date('2027-02-01T00:00:00.000Z'))).toBe(
      YPP_2027_REQUIREMENTS,
    );
  });

  it('calculates watch-hour progress without producing invalid values', () => {
    expect(getYppWatchHoursProgress(2_000, CURRENT_YPP_REQUIREMENTS)).toBe(50);
    expect(getYppWatchHoursProgress(2_000, YPP_2027_REQUIREMENTS)).toBe(25);
    expect(getYppWatchHoursProgress(0, CURRENT_YPP_REQUIREMENTS)).toBe(0);
    expect(getYppWatchHoursProgress(Number.NaN, CURRENT_YPP_REQUIREMENTS)).toBe(0);
  });

  it('formats the effective date consistently', () => {
    expect(formatYppEffectiveDate()).toBe('February 1, 2027');
  });
});
