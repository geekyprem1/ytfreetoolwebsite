export function calculateViewsForTargetEarnings({
  targetEarnings,
  cpm,
  monetizedRate,
}: {
  targetEarnings: number;
  cpm: number;
  monetizedRate: number;
}): number {
  const target = Math.max(Number.isFinite(targetEarnings) ? targetEarnings : 0, 0);
  const rate = Math.min(Math.max(Number.isFinite(monetizedRate) ? monetizedRate : 0, 0), 100);
  const revenuePerView = (Math.max(Number.isFinite(cpm) ? cpm : 0, 0) / 1000) * (rate / 100);
  return revenuePerView > 0 ? Math.ceil(target / revenuePerView) : 0;
}
