'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RelatedTools } from '@/components/tools/related-tools';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import {
  calculateEligibilityProgress,
  calculateMonetizationForecast,
  calculateTargetDatePlan,
  type MetricProgress,
} from '@/lib/youtube/monetization-progress';
import {
  CURRENT_YPP_REQUIREMENTS,
  YPP_2027_REQUIREMENTS,
  formatYppEffectiveDate,
} from '@/lib/youtube/ypp-requirements';

function numberFromInput(value: string): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

function formatNumber(value: number, maximumFractionDigits = 0): string {
  return value.toLocaleString('en-US', { maximumFractionDigits });
}

function formatDate(date: Date | null): string | null {
  if (!date) return null;
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

function MetricCard({ label, progress, suffix = '' }: { label: string; progress: MetricProgress; suffix?: string }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="flex items-baseline justify-between gap-2 text-xs text-muted-foreground">
        <span>{label}</span>
        <span>{progress.percentage.toFixed(1)}%</span>
      </div>
      <p className="mt-1 text-lg font-semibold tracking-tight">
        {formatNumber(progress.current)}{suffix}
        <span className="text-muted-foreground"> / {formatNumber(progress.target)}{suffix}</span>
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-primary" style={{ width: `${progress.percentage}%` }} />
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        {progress.complete ? 'Target met' : `${formatNumber(progress.remaining)}${suffix} remaining`}
      </p>
    </div>
  );
}

function ProgramSummary({
  title,
  requirementsLabel,
  progress,
}: {
  title: string;
  requirementsLabel: string;
  progress: ReturnType<typeof calculateEligibilityProgress>;
}) {
  const status = progress.qualifiesForFullProgram
    ? 'Numbers met — YouTube policy review still applies.'
    : 'Keep building toward one of the two full-program routes.';

  return (
    <section className="rounded-xl border bg-muted/20 p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{requirementsLabel}</p>
        </div>
        <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${progress.qualifiesForFullProgram ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'}`}>
          {progress.qualifiesForFullProgram ? 'Threshold met' : 'In progress'}
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <MetricCard label="Subscribers" progress={progress.subscribers} />
        <MetricCard label="Long-form watch hours" progress={progress.qualifiedWatchHours} />
        <MetricCard label="Shorts views" progress={progress.qualifiedShortsViews} />
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{status}</p>
    </section>
  );
}

export function YoutubeMonetizationProgressCalculatorClient() {
  const [subscribers, setSubscribers] = useState('620');
  const [qualifiedWatchHours, setQualifiedWatchHours] = useState('1250');
  const [qualifiedShortsViews, setQualifiedShortsViews] = useState('350000');
  const [publicUploads, setPublicUploads] = useState('5');
  const [monthlySubscriberGain, setMonthlySubscriberGain] = useState('75');
  const [monthlyWatchHours, setMonthlyWatchHours] = useState('320');
  const [dailyShortsViews, setDailyShortsViews] = useState('4500');
  const [targetDate, setTargetDate] = useState('');
  const [showResult, setShowResult] = useState(false);

  const input = useMemo(
    () => ({
      subscribers: numberFromInput(subscribers),
      qualifiedWatchHours: numberFromInput(qualifiedWatchHours),
      qualifiedShortsViews: numberFromInput(qualifiedShortsViews),
      publicUploadsInLast90Days: numberFromInput(publicUploads),
      monthlySubscriberGain: numberFromInput(monthlySubscriberGain),
      monthlyQualifiedWatchHours: numberFromInput(monthlyWatchHours),
      dailyQualifiedShortsViews: numberFromInput(dailyShortsViews),
      targetDate,
    }),
    [dailyShortsViews, monthlySubscriberGain, monthlyWatchHours, publicUploads, qualifiedShortsViews, qualifiedWatchHours, subscribers, targetDate],
  );

  const result = useMemo(() => {
    const current = calculateEligibilityProgress(input, CURRENT_YPP_REQUIREMENTS);
    const upcoming = calculateEligibilityProgress(input, YPP_2027_REQUIREMENTS);

    return {
      current,
      upcoming,
      currentPlan: calculateTargetDatePlan(input, CURRENT_YPP_REQUIREMENTS),
      upcomingPlan: calculateTargetDatePlan(input, YPP_2027_REQUIREMENTS),
      currentForecast: calculateMonetizationForecast(input, CURRENT_YPP_REQUIREMENTS),
      upcomingForecast: calculateMonetizationForecast(input, YPP_2027_REQUIREMENTS),
    };
  }, [input]);

  const hasForecastRates = input.monthlySubscriberGain > 0 && (input.monthlyQualifiedWatchHours > 0 || input.dailyQualifiedShortsViews > 0);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="mb-3 text-base font-semibold">Your qualified YouTube Studio progress</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ToolInput label="Subscribers" required description="Your current channel subscriber count">
            <Input type="number" value={subscribers} onChange={(event) => setSubscribers(event.target.value)} min="0" inputMode="numeric" />
          </ToolInput>
          <ToolInput label="Qualified long-form watch hours" required description="Past 365 days; use the Earn tab in Studio">
            <Input type="number" value={qualifiedWatchHours} onChange={(event) => setQualifiedWatchHours(event.target.value)} min="0" inputMode="decimal" />
          </ToolInput>
          <ToolInput label="Qualified Shorts views" required description="Past 90 days; not total channel views">
            <Input type="number" value={qualifiedShortsViews} onChange={(event) => setQualifiedShortsViews(event.target.value)} min="0" inputMode="numeric" />
          </ToolInput>
          <ToolInput label="Public uploads in the last 90 days" required description="Used for the earlier-access tier">
            <Input type="number" value={publicUploads} onChange={(event) => setPublicUploads(event.target.value)} min="0" inputMode="numeric" />
          </ToolInput>
        </div>
      </section>

      <section>
        <h2 className="mb-1 text-base font-semibold">Optional planning inputs</h2>
        <p className="mb-3 text-sm text-muted-foreground">Add your pace to estimate dates, or a deadline to calculate the daily pace required.</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ToolInput label="Average subscriber gain / month">
            <Input type="number" value={monthlySubscriberGain} onChange={(event) => setMonthlySubscriberGain(event.target.value)} min="0" inputMode="decimal" />
          </ToolInput>
          <ToolInput label="Qualified watch hours / month">
            <Input type="number" value={monthlyWatchHours} onChange={(event) => setMonthlyWatchHours(event.target.value)} min="0" inputMode="decimal" />
          </ToolInput>
          <ToolInput label="Qualified Shorts views / day">
            <Input type="number" value={dailyShortsViews} onChange={(event) => setDailyShortsViews(event.target.value)} min="0" inputMode="decimal" />
          </ToolInput>
          <ToolInput label="Target date" description="Optional future deadline">
            <Input type="date" value={targetDate} onChange={(event) => setTargetDate(event.target.value)} />
          </ToolInput>
        </div>
      </section>

      <Button className="w-full" onClick={() => setShowResult(true)}>
        Calculate YPP Progress
      </Button>

      {showResult && (
        <ToolOutput title="YouTube Monetization Progress">
          <div className="space-y-5">
            <ProgramSummary
              title="Full YPP entry — through 31 January 2027"
              requirementsLabel={`${CURRENT_YPP_REQUIREMENTS.fullProgram.subscribers.toLocaleString()} subscribers + either ${CURRENT_YPP_REQUIREMENTS.fullProgram.qualifiedWatchHours.toLocaleString()} qualified watch hours in ${CURRENT_YPP_REQUIREMENTS.fullProgram.watchHoursWindowDays} days or ${CURRENT_YPP_REQUIREMENTS.fullProgram.qualifiedShortsViews.toLocaleString()} qualified Shorts views in ${CURRENT_YPP_REQUIREMENTS.fullProgram.shortsViewsWindowDays} days.`}
              progress={result.current}
            />
            <ProgramSummary
              title={`Full YPP entry — from ${formatYppEffectiveDate()}`}
              requirementsLabel={`${YPP_2027_REQUIREMENTS.fullProgram.subscribers.toLocaleString()} subscribers + either ${YPP_2027_REQUIREMENTS.fullProgram.qualifiedWatchHours.toLocaleString()} qualified watch hours in ${YPP_2027_REQUIREMENTS.fullProgram.watchHoursWindowDays} days or ${YPP_2027_REQUIREMENTS.fullProgram.qualifiedShortsViews.toLocaleString()} qualified Shorts views in ${YPP_2027_REQUIREMENTS.fullProgram.shortsViewsWindowDays} days for new applicants.`}
              progress={result.upcoming}
            />

            <section className="rounded-xl border p-4 sm:p-5">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold">Earlier-access YPP tier</h3>
                  <p className="text-sm text-muted-foreground">
                    {CURRENT_YPP_REQUIREMENTS.earlyAccessProgram.subscribers.toLocaleString()} subscribers, {CURRENT_YPP_REQUIREMENTS.earlyAccessProgram.publicUploadsInLast90Days} public uploads in 90 days, plus either {CURRENT_YPP_REQUIREMENTS.earlyAccessProgram.qualifiedWatchHours.toLocaleString()} watch hours or {CURRENT_YPP_REQUIREMENTS.earlyAccessProgram.qualifiedShortsViews.toLocaleString()} Shorts views.
                  </p>
                </div>
                <span className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${result.current.qualifiesForEarlyAccess ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300' : 'bg-amber-500/15 text-amber-700 dark:text-amber-300'}`}>
                  {result.current.qualifiesForEarlyAccess ? 'Threshold met' : 'In progress'}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <MetricCard label="Subscribers" progress={calculateEligibilityProgress(input, {
                  ...CURRENT_YPP_REQUIREMENTS,
                  fullProgram: { ...CURRENT_YPP_REQUIREMENTS.fullProgram, subscribers: CURRENT_YPP_REQUIREMENTS.earlyAccessProgram.subscribers },
                }).subscribers} />
                <MetricCard label="Public uploads in 90 days" progress={result.current.publicUploadsInLast90Days} />
              </div>
            </section>

            {result.currentPlan && result.upcomingPlan && (
              <section className="rounded-xl border p-4 sm:p-5">
                <h3 className="font-semibold">Daily pace needed by {targetDate}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{result.currentPlan.daysRemaining} days remaining. These are separate daily targets for each route, not guarantees.</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Subscribers / day</p>
                    <p className="text-lg font-semibold">{result.currentPlan.requiredDailySubscribers.toFixed(1)} now</p>
                    <p className="text-xs text-muted-foreground">{(result.currentPlan.requiredDailySubscribers * 7).toFixed(1)} / week now</p>
                    <p className="mt-1 text-xs text-muted-foreground">{result.upcomingPlan.requiredDailySubscribers.toFixed(1)} / day from 2027</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Watch hours / day</p>
                    <p className="text-lg font-semibold">{result.currentPlan.requiredDailyWatchHours.toFixed(1)} now</p>
                    <p className="text-xs text-muted-foreground">{(result.currentPlan.requiredDailyWatchHours * 7).toFixed(1)} / week now</p>
                    <p className="mt-1 text-xs text-muted-foreground">{result.upcomingPlan.requiredDailyWatchHours.toFixed(1)} / day from 2027</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Shorts views / day</p>
                    <p className="text-lg font-semibold">{formatNumber(result.currentPlan.requiredDailyShortsViews)} now</p>
                    <p className="text-xs text-muted-foreground">{formatNumber(result.currentPlan.requiredDailyShortsViews * 7)} / week now</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatNumber(result.upcomingPlan.requiredDailyShortsViews)} / day from 2027</p>
                  </div>
                </div>
              </section>
            )}

            <section className="rounded-xl border p-4 sm:p-5">
              <h3 className="font-semibold">Estimated completion at your entered pace</h3>
              {hasForecastRates ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Current long-form route</p>
                    <p className="text-lg font-semibold">{formatDate(result.currentForecast.fullProgramViaLongForm) ?? 'Add a subscriber and watch-hour pace'}</p>
                    <p className="text-xs text-muted-foreground">Current Shorts route: {formatDate(result.currentForecast.fullProgramViaShorts) ?? 'Add a Shorts-view pace'}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">2027 long-form route</p>
                    <p className="text-lg font-semibold">{formatDate(result.upcomingForecast.fullProgramViaLongForm) ?? 'Add a subscriber and watch-hour pace'}</p>
                    <p className="text-xs text-muted-foreground">2027 Shorts route: {formatDate(result.upcomingForecast.fullProgramViaShorts) ?? 'Add a Shorts-view pace'}</p>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">Add average subscriber growth plus a watch-hour or Shorts-view pace to see a forecast.</p>
              )}
            </section>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Planning estimate only. YouTube uses rolling windows, only qualified public activity counts, and eligibility numbers do not guarantee acceptance into YPP. Confirm your live status and country availability in YouTube Studio → Earn.
            </p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-monetization-progress-calculator" />
    </div>
  );
}
