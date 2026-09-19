'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import {
  CURRENT_YPP_REQUIREMENTS,
  YPP_2027_REQUIREMENTS,
  formatYppEffectiveDate,
  getYppWatchHoursProgress,
} from '@/lib/youtube/ypp-requirements';
import { calculateRemainingWatchTimePlan } from '@/lib/youtube/watch-time';

export function YoutubeWatchTimeCalculatorClient() {
  const [views, setViews] = useState('50000');
  const [avgMinutes, setAvgMinutes] = useState('4.5');
  const [avgSeconds, setAvgSeconds] = useState('0');
  const [qualifiedHours, setQualifiedHours] = useState('0');
  const [dailyViews, setDailyViews] = useState('1000');
  const [target, setTarget] = useState<'current' | '2027'>('current');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const v = parseFloat(views) || 0;
    const m = parseFloat(avgMinutes) || 0;
    const s = parseFloat(avgSeconds) || 0;
    const totalMinutes = v * (m + s / 60);
    const hours = totalMinutes / 60;
    const days = hours / 24;
    const averageViewDurationMinutes = m + s / 60;
    const targetRequirements = target === 'current' ? CURRENT_YPP_REQUIREMENTS : YPP_2027_REQUIREMENTS;
    const plan = calculateRemainingWatchTimePlan({
      targetWatchHours: targetRequirements.fullProgram.qualifiedWatchHours,
      currentQualifiedWatchHours: parseFloat(qualifiedHours) || 0,
      averageViewDurationMinutes,
      averageDailyViews: parseFloat(dailyViews) || 0,
    });
    const currentYppProgress = getYppWatchHoursProgress(hours, CURRENT_YPP_REQUIREMENTS);
    const upcomingYppProgress = getYppWatchHoursProgress(hours, YPP_2027_REQUIREMENTS);
    return { totalMinutes, hours, days, currentYppProgress, upcomingYppProgress, plan, targetRequirements };
  }, [views, avgMinutes, avgSeconds, qualifiedHours, dailyViews, target]);

  const isValid = parseFloat(views) > 0 && (parseFloat(avgMinutes) > 0 || parseFloat(avgSeconds) > 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToolInput label="Total Views" required>
          <Input type="number" value={views} onChange={(e) => setViews(e.target.value)} placeholder="50000" min="0" />
        </ToolInput>
        <ToolInput label="Avg View Duration (min)" required>
          <Input type="number" value={avgMinutes} onChange={(e) => setAvgMinutes(e.target.value)} placeholder="4" min="0" step="0.1" />
        </ToolInput>
        <ToolInput label="+ Seconds" description="Optional extra seconds">
          <Input type="number" value={avgSeconds} onChange={(e) => setAvgSeconds(e.target.value)} placeholder="0" min="0" max="59" step="1" />
        </ToolInput>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToolInput label="Qualified watch hours so far" description="From YouTube Studio, last 365 days">
          <Input type="number" value={qualifiedHours} onChange={(e) => setQualifiedHours(e.target.value)} placeholder="0" min="0" step="1" />
        </ToolInput>
        <ToolInput label="Average daily views" description="Used only for the completion-date estimate">
          <Input type="number" value={dailyViews} onChange={(e) => setDailyViews(e.target.value)} placeholder="1000" min="0" step="100" />
        </ToolInput>
        <ToolInput label="YPP target">
          <Select
            value={target}
            onChange={(e) => setTarget(e.target.value as 'current' | '2027')}
            options={[
              { value: 'current', label: `Current: ${CURRENT_YPP_REQUIREMENTS.fullProgram.qualifiedWatchHours.toLocaleString()} hours` },
              { value: '2027', label: `From Feb 2027: ${YPP_2027_REQUIREMENTS.fullProgram.qualifiedWatchHours.toLocaleString()} hours` },
            ]}
          />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate Watch Time
      </Button>

      {showResult && isValid && (
        <ToolOutput title="Watch Time Result">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Watch Time</p>
              <p className="text-3xl font-bold tracking-tight">{result.hours.toLocaleString('en-US', { maximumFractionDigits: 1 })} hours</p>
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round(result.totalMinutes).toLocaleString()} minutes • {result.days.toFixed(2)} days continuous
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">
                  Current YPP {CURRENT_YPP_REQUIREMENTS.fullProgram.qualifiedWatchHours.toLocaleString()}h progress
                </p>
                <p className="font-semibold">{result.currentYppProgress.toFixed(1)}%</p>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-primary" style={{ width: `${Math.min(result.currentYppProgress, 100)}%` }} />
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">
                  {YPP_2027_REQUIREMENTS.fullProgram.qualifiedWatchHours.toLocaleString()}h progress from {formatYppEffectiveDate()}
                </p>
                <p className="font-semibold">{result.upcomingYppProgress.toFixed(1)}%</p>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-primary/60" style={{ width: `${Math.min(result.upcomingYppProgress, 100)}%` }} />
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
              <p className="text-sm font-medium">Remaining views for the {result.targetRequirements.fullProgram.qualifiedWatchHours.toLocaleString()}-hour target</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 text-center">
                <div><p className="text-xs text-muted-foreground">Watch hours left</p><p className="font-semibold">{result.plan.remainingWatchHours.toLocaleString('en-US', { maximumFractionDigits: 1 })}</p></div>
                <div><p className="text-xs text-muted-foreground">Views at this AVD</p><p className="font-semibold">{result.plan.remainingViews.toLocaleString()}</p></div>
                <div><p className="text-xs text-muted-foreground">Estimated completion</p><p className="font-semibold">{result.plan.completionDate ?? (result.plan.remainingViews === 0 ? 'Target reached' : 'Add daily views')}</p></div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">The date is a simple pace estimate, not a YouTube forecast. It assumes your average daily views and average view duration stay constant.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">
                  Views needed for {CURRENT_YPP_REQUIREMENTS.fullProgram.qualifiedWatchHours.toLocaleString()}h
                </p>
                <p className="font-semibold">{(() => { const avd = (parseFloat(avgMinutes) || 0) + (parseFloat(avgSeconds) || 0) / 60; return avd > 0 ? Math.ceil((CURRENT_YPP_REQUIREMENTS.fullProgram.qualifiedWatchHours * 60) / avd).toLocaleString() : '-'; })()}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">
                  Views needed for {YPP_2027_REQUIREMENTS.fullProgram.qualifiedWatchHours.toLocaleString()}h
                </p>
                <p className="font-semibold">{(() => { const avd = (parseFloat(avgMinutes) || 0) + (parseFloat(avgSeconds) || 0) / 60; return avd > 0 ? Math.ceil((YPP_2027_REQUIREMENTS.fullProgram.qualifiedWatchHours * 60) / avd).toLocaleString() : '-'; })()}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Watch Hours = Views × AVD. Through 31 January 2027, full YPP entry requires {CURRENT_YPP_REQUIREMENTS.fullProgram.qualifiedWatchHours.toLocaleString()} qualified watch hours or {CURRENT_YPP_REQUIREMENTS.fullProgram.qualifiedShortsViews.toLocaleString()} qualified Shorts views, plus {CURRENT_YPP_REQUIREMENTS.fullProgram.subscribers.toLocaleString()} subscribers. New applicants face the {YPP_2027_REQUIREMENTS.fullProgram.qualifiedWatchHours.toLocaleString()}h / {YPP_2027_REQUIREMENTS.fullProgram.qualifiedShortsViews.toLocaleString()}-view thresholds from {formatYppEffectiveDate()}.
            </p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-watch-time-calculator" />
    </div>
  );
}
