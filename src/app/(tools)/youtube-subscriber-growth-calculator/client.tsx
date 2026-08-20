'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeSubscriberGrowthCalculatorClient() {
  const [startSubs, setStartSubs] = useState('10000');
  const [endSubs, setEndSubs] = useState('12500');
  const [days, setDays] = useState('30');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const s = parseFloat(startSubs) || 0;
    const e = parseFloat(endSubs) || 0;
    const d = parseFloat(days) || 1;
    const gain = e - s;
    const growthRate = s > 0 ? (gain / s) * 100 : 0;
    const perDay = gain / d;
    const perMonth = perDay * 30;
    const projectedYear = e + perDay * 365;
    const daysTo100k = perDay > 0 ? Math.ceil((100000 - e) / perDay) : null;
    return { gain, growthRate, perDay, perMonth, projectedYear, daysTo100k };
  }, [startSubs, endSubs, days]);

  const isValid = parseFloat(days) > 0 && parseFloat(endSubs) >= 0 && parseFloat(startSubs) >= 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToolInput label="Starting Subscribers" required>
          <Input type="number" value={startSubs} onChange={(e) => setStartSubs(e.target.value)} placeholder="10000" min="0" />
        </ToolInput>
        <ToolInput label="Current Subscribers" required>
          <Input type="number" value={endSubs} onChange={(e) => setEndSubs(e.target.value)} placeholder="12500" min="0" />
        </ToolInput>
        <ToolInput label="Days Period" required>
          <Input type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="30" min="1" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate Growth
      </Button>

      {showResult && isValid && (
        <ToolOutput title="Growth Result">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Growth in {days} days</p>
              <p className="text-3xl font-bold tracking-tight">{result.gain >= 0 ? '+' : ''}{result.gain.toLocaleString()} subs</p>
              <p className={`text-sm font-medium ${result.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>{result.growthRate >= 0 ? '+' : ''}{result.growthRate.toFixed(2)}% growth</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Per day</p>
                <p className="font-semibold">{result.perDay >= 0 ? '+' : ''}{result.perDay.toFixed(1)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Per month (30d)</p>
                <p className="font-semibold">{result.perMonth >= 0 ? '+' : ''}{Math.round(result.perMonth).toLocaleString()}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Est. in 1 year</p>
                <p className="font-semibold">{Math.round(result.projectedYear).toLocaleString()}</p>
              </div>
            </div>
            {result.daysTo100k !== null && result.daysTo100k > 0 && (
              <p className="text-xs text-muted-foreground text-center">At this pace, 100K in ~{result.daysTo100k} days ({(result.daysTo100k/30).toFixed(1)} months)</p>
            )}
            <p className="text-xs text-muted-foreground">Growth Rate = (Gain ÷ Start) ×100. Linear projection — real growth is compounding with viral hits.</p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-subscriber-growth-calculator" />
    </div>
  );
}
