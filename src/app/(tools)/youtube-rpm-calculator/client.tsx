'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeRpmCalculatorClient() {
  const [revenue, setRevenue] = useState('500');
  const [views, setViews] = useState('100000');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const r = parseFloat(revenue) || 0;
    const v = parseFloat(views) || 0;
    const rpm = v > 0 ? (r / v) * 1000 : 0;
    const perView = v > 0 ? r / v : 0;
    return { rpm, perView };
  }, [revenue, views]);

  const isValid = parseFloat(revenue) >= 0 && parseFloat(views) > 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Total Revenue ($)" required description="From YouTube Analytics — estimated revenue">
          <Input type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="500" min="0" step="0.01" />
        </ToolInput>
        <ToolInput label="Total Views" required description="Same period as revenue">
          <Input type="number" value={views} onChange={(e) => setViews(e.target.value)} placeholder="100000" min="0" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate RPM
      </Button>

      {showResult && isValid && (
        <ToolOutput title="RPM Result">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Revenue Per Mille (RPM)</p>
              <p className="text-3xl font-bold tracking-tight">${result.rpm.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">Per 1,000 views — after YouTube&apos;s cut</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Per view</p>
                <p className="font-semibold">${result.perView.toFixed(4)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Per 1M views</p>
                <p className="font-semibold">${(result.rpm * 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">CPM preview</p>
                <p className="font-semibold">~${(result.rpm / 0.55).toFixed(2)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              RPM = (Revenue ÷ Views) × 1000. CPM is typically RPM ÷ 0.55 (creator keeps ~55%). Use RPM for channel planning, CPM for advertiser view.
            </p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-rpm-calculator" />
    </div>
  );
}
