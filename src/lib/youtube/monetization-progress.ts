import type { YppRequirementSet } from './ypp-requirements';

const AVERAGE_DAYS_PER_MONTH = 30.4375;

export type MonetizationProgressInput = {
  subscribers: number;
  qualifiedWatchHours: number;
  qualifiedShortsViews: number;
  publicUploadsInLast90Days: number;
  monthlySubscriberGain?: number;
  monthlyQualifiedWatchHours?: number;
  dailyQualifiedShortsViews?: number;
  targetDate?: string;
};

export type MetricProgress = {
  current: number;
  target: number;
  remaining: number;
  percentage: number;
  complete: boolean;
};

export type EligibilityProgress = {
  subscribers: MetricProgress;
  qualifiedWatchHours: MetricProgress;
  qualifiedShortsViews: MetricProgress;
  publicUploadsInLast90Days: MetricProgress;
  qualifiesViaLongForm: boolean;
  qualifiesViaShorts: boolean;
  qualifiesForFullProgram: boolean;
  qualifiesForEarlyAccess: boolean;
};

export type TargetDatePlan = {
  daysRemaining: number;
  requiredDailySubscribers: number;
  requiredDailyWatchHours: number;
  requiredDailyShortsViews: number;
};

export type MonetizationForecast = {
  fullProgramViaLongForm: Date | null;
  fullProgramViaShorts: Date | null;
};

function finiteNonNegative(value: number | undefined): number {
  return Number.isFinite(value) && (value ?? 0) > 0 ? (value as number) : 0;
}

export function calculateMetricProgress(currentValue: number, targetValue: number): MetricProgress {
  const current = finiteNonNegative(currentValue);
  const target = finiteNonNegative(targetValue);
  const remaining = Math.max(target - current, 0);

  return {
    current,
    target,
    remaining,
    percentage: target === 0 ? 0 : Math.min((current / target) * 100, 100),
    complete: target > 0 && current >= target,
  };
}

export function calculateEligibilityProgress(
  input: MonetizationProgressInput,
  requirements: YppRequirementSet,
): EligibilityProgress {
  const subscribers = calculateMetricProgress(input.subscribers, requirements.fullProgram.subscribers);
  const qualifiedWatchHours = calculateMetricProgress(
    input.qualifiedWatchHours,
    requirements.fullProgram.qualifiedWatchHours,
  );
  const qualifiedShortsViews = calculateMetricProgress(
    input.qualifiedShortsViews,
    requirements.fullProgram.qualifiedShortsViews,
  );
  const publicUploadsInLast90Days = calculateMetricProgress(
    input.publicUploadsInLast90Days,
    requirements.earlyAccessProgram.publicUploadsInLast90Days,
  );

  const earlySubscribers = calculateMetricProgress(
    input.subscribers,
    requirements.earlyAccessProgram.subscribers,
  );
  const earlyWatchHours = calculateMetricProgress(
    input.qualifiedWatchHours,
    requirements.earlyAccessProgram.qualifiedWatchHours,
  );
  const earlyShortsViews = calculateMetricProgress(
    input.qualifiedShortsViews,
    requirements.earlyAccessProgram.qualifiedShortsViews,
  );

  const qualifiesViaLongForm = subscribers.complete && qualifiedWatchHours.complete;
  const qualifiesViaShorts = subscribers.complete && qualifiedShortsViews.complete;

  return {
    subscribers,
    qualifiedWatchHours,
    qualifiedShortsViews,
    publicUploadsInLast90Days,
    qualifiesViaLongForm,
    qualifiesViaShorts,
    qualifiesForFullProgram: qualifiesViaLongForm || qualifiesViaShorts,
    qualifiesForEarlyAccess:
      earlySubscribers.complete &&
      publicUploadsInLast90Days.complete &&
      (earlyWatchHours.complete || earlyShortsViews.complete),
  };
}

function parseFutureTargetDate(targetDate: string | undefined, referenceDate: Date): Date | null {
  if (!targetDate) return null;

  const date = new Date(`${targetDate}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime())) return null;

  const startOfReferenceDay = new Date(
    Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth(), referenceDate.getUTCDate()),
  );
  return date > startOfReferenceDay ? date : null;
}

export function calculateTargetDatePlan(
  input: MonetizationProgressInput,
  requirements: YppRequirementSet,
  referenceDate = new Date(),
): TargetDatePlan | null {
  const targetDate = parseFutureTargetDate(input.targetDate, referenceDate);
  if (!targetDate) return null;

  const startOfReferenceDay = new Date(
    Date.UTC(referenceDate.getUTCFullYear(), referenceDate.getUTCMonth(), referenceDate.getUTCDate()),
  );
  const daysRemaining = Math.ceil((targetDate.getTime() - startOfReferenceDay.getTime()) / 86_400_000);

  return {
    daysRemaining,
    requiredDailySubscribers:
      calculateMetricProgress(input.subscribers, requirements.fullProgram.subscribers).remaining / daysRemaining,
    requiredDailyWatchHours:
      calculateMetricProgress(input.qualifiedWatchHours, requirements.fullProgram.qualifiedWatchHours).remaining /
      daysRemaining,
    requiredDailyShortsViews:
      calculateMetricProgress(input.qualifiedShortsViews, requirements.fullProgram.qualifiedShortsViews).remaining /
      daysRemaining,
  };
}

function projectedCompletionDate(
  metrics: Array<{ current: number; target: number; dailyRate: number }>,
  referenceDate: Date,
): Date | null {
  const daysToComplete = metrics.map(({ current, target, dailyRate }) => {
    const remaining = Math.max(target - finiteNonNegative(current), 0);
    if (remaining === 0) return 0;
    if (finiteNonNegative(dailyRate) === 0) return null;
    return Math.ceil(remaining / dailyRate);
  });

  if (daysToComplete.some((days) => days === null)) return null;
  const slowestRequirement = Math.max(...(daysToComplete as number[]));
  const date = new Date(referenceDate);
  date.setUTCDate(date.getUTCDate() + slowestRequirement);
  return date;
}

export function calculateMonetizationForecast(
  input: MonetizationProgressInput,
  requirements: YppRequirementSet,
  referenceDate = new Date(),
): MonetizationForecast {
  const subscriberDailyRate = finiteNonNegative(input.monthlySubscriberGain) / AVERAGE_DAYS_PER_MONTH;
  const watchHoursDailyRate = finiteNonNegative(input.monthlyQualifiedWatchHours) / AVERAGE_DAYS_PER_MONTH;
  const shortsViewsDailyRate = finiteNonNegative(input.dailyQualifiedShortsViews);

  return {
    fullProgramViaLongForm: projectedCompletionDate(
      [
        {
          current: input.subscribers,
          target: requirements.fullProgram.subscribers,
          dailyRate: subscriberDailyRate,
        },
        {
          current: input.qualifiedWatchHours,
          target: requirements.fullProgram.qualifiedWatchHours,
          dailyRate: watchHoursDailyRate,
        },
      ],
      referenceDate,
    ),
    fullProgramViaShorts: projectedCompletionDate(
      [
        {
          current: input.subscribers,
          target: requirements.fullProgram.subscribers,
          dailyRate: subscriberDailyRate,
        },
        {
          current: input.qualifiedShortsViews,
          target: requirements.fullProgram.qualifiedShortsViews,
          dailyRate: shortsViewsDailyRate,
        },
      ],
      referenceDate,
    ),
  };
}
