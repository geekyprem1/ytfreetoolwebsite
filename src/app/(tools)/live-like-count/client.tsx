'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { useToolApi } from '@/hooks/use-tool-api';

interface LikeSnapshot {
  title: string;
  channelTitle: string;
  likeCount: number;
  likeCountAvailable: boolean;
  fetchedAt: number;
  livePaused?: boolean;
}

export function LiveLikeCountClient({ initialVideo }: { initialVideo?: string }) {
  const [input, setInput] = useState(initialVideo ?? '');
  const [tracking, setTracking] = useState(Boolean(initialVideo));
  const active = useRef(initialVideo ?? '');
  const { data, isLoading, error, execute, reset } = useToolApi<LikeSnapshot>();
  const fetchLikes = useCallback((value: string) => {
    void execute(`/api/youtube/live-views?v=${encodeURIComponent(value)}`);
  }, [execute]);
  const start = useCallback((value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    reset();
    active.current = trimmed;
    setTracking(true);
    fetchLikes(trimmed);
  }, [fetchLikes, reset]);

  useEffect(() => {
    if (initialVideo) fetchLikes(initialVideo);
  }, [initialVideo, fetchLikes]);
  useEffect(() => {
    if (!tracking) return;
    const timer = window.setInterval(() => { if (active.current) fetchLikes(active.current); }, 60_000);
    return () => window.clearInterval(timer);
  }, [tracking, fetchLikes]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input aria-label="YouTube video URL or ID" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') start(input); }} placeholder="Video URL or 11-character ID" className="h-12" />
        <Button onClick={() => start(input)} disabled={!input.trim()} className="h-12">Track likes</Button>
      </div>
      {isLoading && !data && <ToolLoading variant="card" />}
      {error && !data && <ToolError message={error} onRetry={reset} />}
      {data && (
        <ToolOutput title={data.title}>
          <div className="rounded-2xl border bg-muted/20 p-7 text-center">
            <p className="text-sm text-muted-foreground">{data.channelTitle}</p>
            <p aria-live="polite" className="mt-3 text-5xl font-bold tabular-nums">{data.likeCountAvailable ? data.likeCount.toLocaleString() : 'Unavailable'}</p>
            <p className="mt-3 text-xs text-muted-foreground">{data.livePaused ? 'Updates paused to protect API quota' : 'Checks about every 60 seconds'} · Snapshot fetched {new Date(data.fetchedAt).toLocaleTimeString()}</p>
          </div>
          {error && <p role="alert" className="mt-3 text-sm text-destructive">Refresh failed: {error}. Showing the previous snapshot.</p>}
        </ToolOutput>
      )}
      <RelatedTools currentSlug="live-like-count" />
    </div>
  );
}
