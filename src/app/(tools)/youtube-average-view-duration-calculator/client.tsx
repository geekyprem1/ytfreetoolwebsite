'use client';

import { useState, useMemo } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function YoutubeAverageViewDurationCalculatorClient() {
  const [watchHours, setWatchHours] = useState('4000');
  const [views, setViews] = useState('100000');
  const [videoLengthMin, setVideoLengthMin] = useState('10');
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const wh = parseFloat(watchHours) || 0;
    const v = parseFloat(views) || 0;
    const len = parseFloat(videoLengthMin) || 0;
    const totalMinutes = wh * 60;
    const avdMinutes = v > 0 ? totalMinutes / v : 0;
    const avdSeconds = (avdMinutes % 1) * 60;
    const retention = len > 0 ? (avdMinutes / len) * 100 : 0;
    let label = 'Low';
    if (retention >= 50) label = 'Excellent';
    else if (retention >= 40) label = 'Good';
    else if (retention >= 30) label = 'Average';
    return { avdMinutes, avdSeconds, retention, label };
  }, [watchHours, views, videoLengthMin]);

  const isValid = parseFloat(watchHours) >= 0 && parseFloat(views) > 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToolInput label="Watch Hours" required description="Total watch time in hours">
          <Input type="number" value={watchHours} onChange={(e) => setWatchHours(e.target.value)} placeholder="4000" min="0" step="0.1" />
        </ToolInput>
        <ToolInput label="Total Views" required>
          <Input type="number" value={views} onChange={(e) => setViews(e.target.value)} placeholder="100000" min="0" />
        </ToolInput>
        <ToolInput label="Video Length (min)" description="For retention %">
          <Input type="number" value={videoLengthMin} onChange={(e) => setVideoLengthMin(e.target.value)} placeholder="10" min="0" step="0.5" />
        </ToolInput>
      </div>

      <Button onClick={() => setShowResult(true)} disabled={!isValid} className="w-full">
        Calculate AVD
      </Button>

      {showResult && isValid && (
        <ToolOutput title="Average View Duration">
          <div className="space-y-4">
            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Average View Duration</p>
              <p className="text-3xl font-bold tracking-tight">
                {Math.floor(result.avdMinutes)}:{String(Math.round(result.avdSeconds)).padStart(2, '0')}
              </p>
              <p className="text-sm text-muted-foreground">{result.avdMinutes.toFixed(2)} minutes</p>
              {parseFloat(videoLengthMin) > 0 && (
                <p className={`text-sm font-medium mt-2 ${result.label === 'Excellent' ? 'text-green-600' : result.label === 'Good' ? 'text-blue-600' : result.label === 'Average' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {result.retention.toFixed(1)}% retention — {result.label}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Retention benchmark</p>
                <p className="text-xs font-medium">40-60% great for 8-12m</p>
              </div>
              <div className="rounded-lg border p-3">
                <p className="text-xs text-muted-foreground">Formula</p>
                <p className="text-xs font-medium">AVD = Watch Minutes ÷ Views</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">AVD drives ranking. Longer AVD + higher retention = more suggested. Compare to video length for true retention.</p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-average-view-duration-calculator" />
    </div>
  );
}
