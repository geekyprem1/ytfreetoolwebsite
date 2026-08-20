'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeWatchTimeCalculatorClient() {
  const [views, setViews] = useState('50000');
  const [avgMinutes, setAvgMinutes] = useState('4.5');
  const [avgSeconds, setAvgSeconds] = useState('0');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const v = parseFloat(views) || 0;
    const m = parseFloat(avgMinutes) || 0;
    const s = parseFloat(avgSeconds) || 0;
    const totalMinutes = v * (m + s / 60);
    const hours = totalMinutes / 60;
    const days = hours / 24;
    const yppProgress = (hours / 4000) * 100;
    return { totalMinutes, hours, days, yppProgress };
  }, [views, avgMinutes, avgSeconds]);

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
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">YPP 4,000h progress</p>
                <p className="font-semibold">{result.yppProgress.toFixed(1)}%</p>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-1">
                  <div className="h-full bg-primary" style={{ width: `${Math.min(result.yppProgress, 100)}%` }} />
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Views needed for 4K hrs</p>
                <p className="font-semibold">{(() => { const avd = (parseFloat(avgMinutes) || 0) + (parseFloat(avgSeconds) || 0)/60; return avd>0 ? Math.ceil((4000*60)/avd).toLocaleString() : '-'; })()}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Watch Hours = Views × AVD. YouTube Partner Program requires 4,000 public watch hours in 12 months.</p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-watch-time-calculator" />
    </div>
  );
}
