'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeShortsEarningsCalculatorClient() {
  const [views, setViews] = useState('1000000');
  const [rpm, setRpm] = useState('0.02');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const v = parseFloat(views) || 0;
    const r = parseFloat(rpm) || 0;
    const earnings = (v / 1000) * r;
    const perMillion = (1000000 / 1000) * r;
    const lowRpm = 0.01, highRpm = 0.05;
    const low = (v / 1000) * lowRpm;
    const high = (v / 1000) * highRpm;
    return { earnings, perMillion, low, high };
  }, [views, rpm]);

  const isValid = parseFloat(views) > 0 && parseFloat(rpm) >= 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Shorts Views" required>
          <Input type="number" value={views} onChange={(e) => setViews(e.target.value)} placeholder="1000000" min="0" />
        </ToolInput>
        <ToolInput label="Shorts RPM ($)" required description="Typical 0.01 - 0.08, from Analytics">
          <Input type="number" value={rpm} onChange={(e) => setRpm(e.target.value)} placeholder="0.02" min="0" step="0.01" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate Shorts Earnings
      </Button>

      {showResult && isValid && (
        <ToolOutput title="Shorts Earnings Estimate">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Estimated Shorts Revenue</p>
              <p className="text-3xl font-bold tracking-tight">${result.earnings.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              <p className="text-xs text-muted-foreground mt-2">Range (pool model): ${result.low.toFixed(2)} – ${result.high.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-1">Per 1M views: ${result.perMillion.toFixed(2)}</p>
            </div>
            <div className="rounded-lg border p-3 bg-yellow-500/5">
              <p className="text-xs font-medium">Why so low vs long-form?</p>
              <p className="text-xs text-muted-foreground">Shorts monetization uses a pooled fund + music splits. RPM is 50-100× lower than long-form. Views alone don&apos;t pay like Watch Hours.</p>
            </div>
            <p className="text-xs text-muted-foreground">Shorts RPM varies by country, music usage, and Creator Pool share. Check Analytics → Revenue → Shorts Feed for your real RPM.</p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-shorts-earnings-calculator" />
    </div>
  );
}
