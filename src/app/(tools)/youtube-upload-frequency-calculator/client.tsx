'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeUploadFrequencyCalculatorClient() {
  const [totalVideos, setTotalVideos] = useState('50');
  const [days, setDays] = useState('90');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const v = parseFloat(totalVideos) || 0;
    const d = parseFloat(days) || 1;
    const perDay = v / d;
    const perWeek = perDay * 7;
    const perMonth = perDay * 30;
    const intervalDays = v > 0 ? d / v : 0;
    let consistency = 'Low';
    if (perWeek >= 3) consistency = 'High — daily-ish';
    else if (perWeek >= 1) consistency = 'Good — weekly';
    else if (perWeek >= 0.5) consistency = 'Moderate — bi-weekly';
    else consistency = 'Low — monthly+';
    return { perDay, perWeek, perMonth, intervalDays, consistency };
  }, [totalVideos, days]);

  const isValid = parseFloat(totalVideos) >= 0 && parseFloat(days) > 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Total Videos Uploaded" required>
          <Input type="number" value={totalVideos} onChange={(e) => setTotalVideos(e.target.value)} placeholder="50" min="0" />
        </ToolInput>
        <ToolInput label="Period (days)" required description="e.g., 30, 90, 365">
          <Input type="number" value={days} onChange={(e) => setDays(e.target.value)} placeholder="90" min="1" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate Frequency
      </Button>

      {showResult && isValid && (
        <ToolOutput title="Upload Frequency">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Upload Rate</p>
              <p className="text-3xl font-bold tracking-tight">{result.perWeek.toFixed(2)} / week</p>
              <p className="text-sm font-medium mt-1 text-primary">{result.consistency}</p>
              <p className="text-xs text-muted-foreground mt-1">Every {result.intervalDays.toFixed(1)} days on average</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Per day</p>
                <p className="font-semibold">{result.perDay.toFixed(2)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Per month</p>
                <p className="font-semibold">{result.perMonth.toFixed(1)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Per year</p>
                <p className="font-semibold">{(result.perDay * 365).toFixed(0)}</p>
              </div>
            </div>
            <div className="rounded-lg border p-3 bg-muted/20">
              <p className="text-xs font-medium">Suggested for growth</p>
              <p className="text-xs text-muted-foreground">1-2/week is sustainable for most niches. Daily only if quality holds. Consistency beats volume for algorithm + audience.</p>
            </div>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-upload-frequency-calculator" />
    </div>
  );
}
