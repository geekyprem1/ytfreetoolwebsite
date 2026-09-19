'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { calculateViewsForTargetEarnings } from '@/lib/youtube/money-calculator';

export function YoutubeMoneyCalculatorClient() {
  const [views, setViews] = useState('100000');
  const [cpm, setCpm] = useState('4');
  const [monetizedRate, setMonetizedRate] = useState('55');
  const [mode, setMode] = useState<'earnings' | 'target'>('earnings');
  const [targetEarnings, setTargetEarnings] = useState('1000');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const v = parseFloat(views) || 0;
    const c = parseFloat(cpm) || 0;
    const m = parseFloat(monetizedRate) || 0;
    const monetizedViews = v * (m / 100);
    const earnings = (monetizedViews / 1000) * c;
    const low = earnings * 0.7;
    const high = earnings * 1.3;
    const requiredViews = calculateViewsForTargetEarnings({ targetEarnings: parseFloat(targetEarnings) || 0, cpm: c, monetizedRate: m });
    return { monetizedViews, earnings, low, high, requiredViews };
  }, [views, cpm, monetizedRate, targetEarnings]);

  const isValid = parseFloat(cpm) > 0 && (mode === 'target' ? parseFloat(targetEarnings) > 0 : parseFloat(views) > 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ToolInput label="Calculator mode">
          <Select
            value={mode}
            onChange={(e) => setMode(e.target.value as 'earnings' | 'target')}
            options={[{ value: 'earnings', label: 'Views → earnings' }, { value: 'target', label: 'Target earnings → views' }]}
          />
        </ToolInput>
        <ToolInput label="Total Views" required={mode === 'earnings'} description={mode === 'target' ? 'Optional example view count' : 'Total video / channel views'}>
          <Input type="number" value={views} onChange={(e) => setViews(e.target.value)} placeholder="100000" min="0" />
        </ToolInput>
        <ToolInput label="CPM ($)" required description="Cost per 1000 monetized views">
          <Input type="number" value={cpm} onChange={(e) => setCpm(e.target.value)} placeholder="4.00" min="0" step="0.1" />
        </ToolInput>
        <ToolInput label="Monetized Play Rate (%)" description="Typically 45-65% for long-form">
          <Input type="number" value={monetizedRate} onChange={(e) => setMonetizedRate(e.target.value)} placeholder="55" min="0" max="100" step="1" />
        </ToolInput>
        {mode === 'target' && (
          <ToolInput label="Target Earnings ($)" required description="How much revenue you want to model">
            <Input type="number" value={targetEarnings} onChange={(e) => setTargetEarnings(e.target.value)} placeholder="1000" min="0" step="10" />
          </ToolInput>
        )}
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid || (mode === 'target' && parseFloat(targetEarnings) <= 0)} className="w-full">
        {mode === 'target' ? 'Calculate Views Needed' : 'Calculate Earnings'}
      </Button>

      {showResult && isValid && (
        <ToolOutput title={mode === 'target' ? 'Views Needed for Target Earnings' : 'Estimated Earnings'}>
          <div className="space-y-4">
            {mode === 'target' && (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
                <p className="text-sm text-muted-foreground mb-1">Estimated views for ${parseFloat(targetEarnings).toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
                <p className="text-3xl font-bold tracking-tight">{result.requiredViews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-2">At ${parseFloat(cpm).toFixed(2)} CPM and {parseFloat(monetizedRate)}% monetized play rate</p>
              </div>
            )}
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">{mode === 'target' ? 'Example revenue from entered views' : 'Estimated Revenue'}</p>
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
