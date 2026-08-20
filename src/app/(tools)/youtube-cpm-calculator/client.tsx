'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeCpmCalculatorClient() {
  const [adRevenue, setAdRevenue] = useState('1000');
  const [monetizedViews, setMonetizedViews] = useState('200000');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const r = parseFloat(adRevenue) || 0;
    const v = parseFloat(monetizedViews) || 0;
    const cpm = v > 0 ? (r / v) * 1000 : 0;
    const rpm = cpm * 0.55;
    return { cpm, rpm };
  }, [adRevenue, monetizedViews]);

  const isValid = parseFloat(adRevenue) >= 0 && parseFloat(monetizedViews) > 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Total Ad Revenue ($)" required description="Gross ad revenue before YouTube cut">
          <Input type="number" value={adRevenue} onChange={(e) => setAdRevenue(e.target.value)} placeholder="1000" min="0" step="0.01" />
        </ToolInput>
        <ToolInput label="Monetized Playbacks" required description="Monetized views (not total views)">
          <Input type="number" value={monetizedViews} onChange={(e) => setMonetizedViews(e.target.value)} placeholder="200000" min="0" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate CPM
      </Button>

      {showResult && isValid && (
        <ToolOutput title="CPM Result">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Cost Per Mille (CPM)</p>
              <p className="text-3xl font-bold tracking-tight">${result.cpm.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground mt-2">Advertiser cost per 1,000 monetized views</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Creator RPM (55%)</p>
                <p className="font-semibold">${result.rpm.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Per monetized view</p>
                <p className="font-semibold">${(result.cpm / 1000).toFixed(4)}</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">CPM = (Revenue ÷ Monetized Views) × 1000. Creators receive ~55% → RPM. Higher CPM = finance, lower = gaming/memes.</p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-cpm-calculator" />
    </div>
  );
}
