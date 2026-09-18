/**
 * YouTube Partner Program thresholds are policy data, not timeless constants.
 * Sources verified 18 September 2026:
 * - https://support.google.com/youtube/answer/72857?hl=en
 * - https://support.google.com/youtube/answer/12843009?hl=en
 */

export const YPP_2027_EFFECTIVE_DATE = '2027-02-01';

export type FullYppRequirements = {
  subscribers: number;
  qualifiedWatchHours: number;
  watchHoursWindowDays: number;
  qualifiedShortsViews: number;
  shortsViewsWindowDays: number;
};

export type EarlyAccessYppRequirements = {
  subscribers: number;
  publicUploadsInLast90Days: number;
  qualifiedWatchHours: number;
  watchHoursWindowDays: number;
  qualifiedShortsViews: number;
  shortsViewsWindowDays: number;
};

export type YppRequirementSet = {
  id: 'current' | '2027';
  label: string;
  effectiveFrom: string | null;
  fullProgram: FullYppRequirements;
  earlyAccessProgram: EarlyAccessYppRequirements;
  sourceUrl: string;
  lastVerified: string;
};

const EARLY_ACCESS_REQUIREMENTS: EarlyAccessYppRequirements = {
  subscribers: 500,
  publicUploadsInLast90Days: 3,
  qualifiedWatchHours: 3_000,
  watchHoursWindowDays: 365,
  qualifiedShortsViews: 3_000_000,
  shortsViewsWindowDays: 90,
};

export const CURRENT_YPP_REQUIREMENTS: YppRequirementSet = {
  id: 'current',
  label: 'Current requirements through 31 January 2027',
  effectiveFrom: null,
  fullProgram: {
    subscribers: 1_000,
    qualifiedWatchHours: 4_000,
    watchHoursWindowDays: 365,
    qualifiedShortsViews: 10_000_000,
    shortsViewsWindowDays: 90,
  },
  earlyAccessProgram: EARLY_ACCESS_REQUIREMENTS,
  sourceUrl: 'https://support.google.com/youtube/answer/72857?hl=en',
  lastVerified: '2026-09-18',
};

export const YPP_2027_REQUIREMENTS: YppRequirementSet = {
  id: '2027',
  label: 'Requirements for new applicants from 1 February 2027',
  effectiveFrom: YPP_2027_EFFECTIVE_DATE,
  fullProgram: {
    subscribers: 1_000,
    qualifiedWatchHours: 8_000,
    watchHoursWindowDays: 365,
    qualifiedShortsViews: 20_000_000,
    shortsViewsWindowDays: 90,
  },
  earlyAccessProgram: EARLY_ACCESS_REQUIREMENTS,
  sourceUrl: 'https://support.google.com/youtube/answer/12843009?hl=en',
  lastVerified: '2026-09-18',
};

export function getYppRequirementsForDate(referenceDate = new Date()): YppRequirementSet {
  const effectiveAt = new Date(`${YPP_2027_EFFECTIVE_DATE}T00:00:00.000Z`);
  return referenceDate >= effectiveAt ? YPP_2027_REQUIREMENTS : CURRENT_YPP_REQUIREMENTS;
}

export function getYppWatchHoursProgress(
  qualifiedWatchHours: number,
  requirements: YppRequirementSet = getYppRequirementsForDate(),
): number {
  if (!Number.isFinite(qualifiedWatchHours) || qualifiedWatchHours <= 0) return 0;
  return (qualifiedWatchHours / requirements.fullProgram.qualifiedWatchHours) * 100;
}

export function formatYppEffectiveDate(locale = 'en-US'): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${YPP_2027_EFFECTIVE_DATE}T00:00:00.000Z`));
}
