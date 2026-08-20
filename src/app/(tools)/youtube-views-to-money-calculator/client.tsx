'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeViewsToMoneyCalculatorClient() {
  const [views, setViews] = useState('1000000');
  const [rpm, setRpm] = useState('2.5');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const v = parseFloat(views) || 0;
    const r = parseFloat(rpm) || 0;
    const earnings = (v / 1000) * r;
    const per100k = (100000 / 1000) * r;
    const per1k = r;
    const viewsTo100 = r > 0 ? (100 / r) * 1000 : 0;
    const viewsTo1000 = r > 0 ? (1000 / r) * 1000 : 0;
    return { earnings, per100k, per1k, viewsTo100, viewsTo1000 };
  }, [views, rpm]);

  const isValid = parseFloat(views) > 0 && parseFloat(rpm) >= 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Views" required description="Any view count you want to convert">
          <Input type="number" value={views} onChange={(e) => setViews(e.target.value)} placeholder="1000000" min="0" />
        </ToolInput>
        <ToolInput label="Your RPM ($)" required description="From YouTube Analytics > Revenue">
          <Input type="number" value={rpm} onChange={(e) => setRpm(e.target.value)} placeholder="2.5" min="0" step="0.1" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Convert Views to Money
      </Button>

      {showResult && isValid && (
        <ToolOutput title="Conversion Result">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">{parseInt(views).toLocaleString()} views ≈</p>
              <p className="text-3xl font-bold tracking-tight">${result.earnings.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>
              <p className="text-xs text-muted-foreground mt-1">at ${parseFloat(rpm).toFixed(2)} RPM</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">1K views</p>
                <p className="font-semibold">${result.per1k.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">100K views</p>
                <p className="font-semibold">${result.per100k.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">For $100</p>
                <p className="font-semibold">{Math.round(result.viewsTo100).toLocaleString()} views</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">For $1,000</p>
                <p className="font-semibold">{Math.round(result.viewsTo1000).toLocaleString()} views</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Formula: Earnings = (Views ÷ 1000) × RPM. Plug your real RPM from Analytics for accurate planning — niche matters more than views.</p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-views-to-money-calculator" />
    </div>
  );
}
