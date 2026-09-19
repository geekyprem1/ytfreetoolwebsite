export interface WatchTimePlan {
  remainingWatchHours: number;
  remainingViews: number;
  completionDate: string | null;
}

export function calculateRemainingWatchTimePlan({
  targetWatchHours,
  currentQualifiedWatchHours,
  averageViewDurationMinutes,
  averageDailyViews,
  referenceDate = new Date(),
}: {
  targetWatchHours: number;
  currentQualifiedWatchHours: number;
  averageViewDurationMinutes: number;
  averageDailyViews: number;
  referenceDate?: Date;
}): WatchTimePlan {
  const target = Math.max(Number.isFinite(targetWatchHours) ? targetWatchHours : 0, 0);
  const current = Math.max(Number.isFinite(currentQualifiedWatchHours) ? currentQualifiedWatchHours : 0, 0);
  const avd = Math.max(Number.isFinite(averageViewDurationMinutes) ? averageViewDurationMinutes : 0, 0);
  const dailyViews = Math.max(Number.isFinite(averageDailyViews) ? averageDailyViews : 0, 0);
  const remainingWatchHours = Math.max(target - current, 0);
  const remainingViews = avd > 0 ? Math.ceil((remainingWatchHours * 60) / avd) : 0;

  if (remainingViews === 0) return { remainingWatchHours, remainingViews, completionDate: null };
  if (dailyViews <= 0) return { remainingWatchHours, remainingViews, completionDate: null };

  const days = Math.ceil(remainingViews / dailyViews);
  const completion = new Date(referenceDate);
  completion.setUTCHours(0, 0, 0, 0);
  completion.setUTCDate(completion.getUTCDate() + days);
  return { remainingWatchHours, remainingViews, completionDate: completion.toISOString().slice(0, 10) };
}
