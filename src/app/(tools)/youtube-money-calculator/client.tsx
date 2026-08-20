'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeMoneyCalculatorClient() {
  const [views, setViews] = useState('100000');
  const [cpm, setCpm] = useState('4');
  const [monetizedRate, setMonetizedRate] = useState('55');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const v = parseFloat(views) || 0;
    const c = parseFloat(cpm) || 0;
    const m = parseFloat(monetizedRate) || 0;
    const monetizedViews = v * (m / 100);
    const earnings = (monetizedViews / 1000) * c;
    const low = earnings * 0.7;
    const high = earnings * 1.3;
    return { monetizedViews, earnings, low, high };
  }, [views, cpm, monetizedRate]);

  const isValid = parseFloat(views) > 0 && parseFloat(cpm) > 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToolInput label="Total Views" required description="Total video / channel views">
          <Input type="number" value={views} onChange={(e) => setViews(e.target.value)} placeholder="100000" min="0" />
        </ToolInput>
        <ToolInput label="CPM ($)" required description="Cost per 1000 monetized views">
          <Input type="number" value={cpm} onChange={(e) => setCpm(e.target.value)} placeholder="4.00" min="0" step="0.1" />
        </ToolInput>
        <ToolInput label="Monetized Play Rate (%)" description="Typically 45-65% for long-form">
          <Input type="number" value={monetizedRate} onChange={(e) => setMonetizedRate(e.target.value)} placeholder="55" min="0" max="100" step="1" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate Earnings
      </Button>

      {showResult && isValid && (
        <ToolOutput title="Estimated Earnings">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Estimated Revenue</p>
              <p className="text-3xl font-bold tracking-tight">${result.earnings.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Range: ${result.low.toLocaleString('en-US', { maximumFractionDigits: 2 })} – ${result.high.toLocaleString('en-US', { maximumFractionDigits: 2 })} (±30% variance)
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Monetized views: {Math.round(result.monetizedViews).toLocaleString()} / {parseInt(views).toLocaleString()}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Per 1K views</p>
                <p className="font-semibold">${((result.earnings / (parseFloat(views) || 1)) * 1000).toFixed(2)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Per 1M views</p>
                <p className="font-semibold">${((result.earnings / (parseFloat(views) || 1)) * 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">CPM used</p>
                <p className="font-semibold">${parseFloat(cpm).toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Estimate only — actual YouTube revenue depends on niche, geography, season, ad inventory and YouTube&apos;s 45% cut. Use with Analytics RPM for accuracy.
            </p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-money-calculator" />
    </div>
  );
}
