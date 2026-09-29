'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RelatedTools } from '@/components/tools/related-tools';
import { addTempoTap, bpmFromTaps } from '@/lib/youtube/tap-tempo';

export function TapTempoClient() {
  const [taps, setTaps] = useState<number[]>([]);
  const bpm = bpmFromTaps(taps);
  const tap = useCallback(() => setTaps((current) => addTempoTap(current, performance.now())), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code !== 'Space' || event.repeat || event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLButtonElement) return;
      event.preventDefault();
      tap();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [tap]);

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border bg-muted/20 p-6 text-center">
        <p className="text-sm text-muted-foreground">Estimated tempo</p>
        <p aria-live="polite" className="mt-2 text-5xl font-bold tabular-nums">{bpm ?? '—'} <span className="text-lg font-medium">BPM</span></p>
        <p className="mt-2 text-xs text-muted-foreground">{taps.length < 2 ? 'Tap at least twice to start.' : `Based on ${taps.length - 1} recent intervals.`}</p>
        <Button className="mt-6 h-20 w-full max-w-sm text-xl" onClick={tap}>Tap beat</Button>
        <p className="mt-3 text-xs text-muted-foreground">You can also press Space when the page is focused.</p>
      </div>
      <Button variant="outline" onClick={() => setTaps([])} disabled={taps.length === 0}>Reset taps</Button>
      <p className="text-sm text-muted-foreground">After a pause of more than two seconds, the next tap starts a new estimate. For half-time or double-time rhythms, tap the pulse you want to edit against.</p>
      <RelatedTools currentSlug="youtube-tap-tempo" />
    </div>
  );
}
