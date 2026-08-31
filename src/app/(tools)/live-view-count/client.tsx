'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { useToolApi } from '@/hooks/use-tool-api';
import { useAnimatedNumber } from '@/hooks/use-animated-number';
import { formatNumber } from '@/lib/utils/format';
import { Link2, ThumbsUp, MessageCircle } from 'lucide-react';

interface LiveViewsResponse {
  id: string;
  title: string;
  thumbnail: string;
  channelTitle: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  fetchedAt: number;
  livePaused?: boolean;
}

const POLL_MS = 60_000;

export function LiveViewCountClient({ initialVideo }: { initialVideo?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<LiveViewsResponse>();
  const [input, setInput] = useState(initialVideo ?? '');
  const [tracking, setTracking] = useState(false);
  const activeRef = useRef<string | null>(null);

  const fetchCount = useCallback(
    (video: string) => {
      activeRef.current = video;
      execute(`/api/youtube/live-views?v=${encodeURIComponent(video)}`);
    },
    [execute],
  );

  const start = (video: string) => {
    const trimmed = video.trim();
    if (!trimmed) return;
    setTracking(true);
    fetchCount(trimmed);
  };

  useEffect(() => {
    if (!tracking || !activeRef.current) return;
    const id = setInterval(() => {
      if (activeRef.current) fetchCount(activeRef.current);
    }, POLL_MS);
    return () => clearInterval(id);
  }, [tracking, fetchCount]);

  const autoRan = useRef(false);
  useEffect(() => {
    if (initialVideo && !autoRan.current) {
      autoRan.current = true;
      start(initialVideo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialVideo]);

  const animatedViews = useAnimatedNumber(data?.viewCount ?? 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && start(input)}
            placeholder="Paste video URL or 11-char video ID"
            className="pl-10 h-12 text-base rounded-xl md:text-base"
          />
        </div>
        <Button
          onClick={() => start(input)}
          disabled={!input.trim()}
          className="h-12 px-5 rounded-xl bg-[#FF3B30] hover:bg-[#E0352B] text-white shrink-0"
        >
          Track live
        </Button>
      </div>

      {isLoading && !data && <ToolLoading variant="card" />}
      {error && !data && <ToolError message={error} onRetry={() => reset()} />}

      {data && (
        <ToolOutput title={data.title}>
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              {data.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.thumbnail} alt={data.title} className="w-24 rounded-lg" />
              )}
              {data.channelTitle && (
                <p className="text-sm text-muted-foreground">{data.channelTitle}</p>
              )}
            </div>

            <div className="rounded-2xl border bg-muted/20 p-8 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className={`size-2 rounded-full ${data.livePaused ? 'bg-muted-foreground' : 'bg-[#FF3B30] animate-pulse'}`} />
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  {data.livePaused ? 'Live paused' : 'Live views'}
                </span>
              </div>
              <p className="text-5xl md:text-6xl font-bold tracking-tight tabular-nums">
                {animatedViews.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                Updated every {POLL_MS / 1000}s · YouTube&apos;s public view count can update in bursts
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg border p-3">
                <ThumbsUp className="size-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Likes</p>
                <p className="font-semibold">{formatNumber(data.likeCount)}</p>
              </div>
              <div className="rounded-lg border p-3">
                <MessageCircle className="size-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Comments</p>
                <p className="font-semibold">{formatNumber(data.commentCount)}</p>
              </div>
            </div>

            {data.livePaused && (
              <p className="text-xs text-muted-foreground">
                Live updates are paused to stay within the daily API budget. The number above is the most
                recent snapshot.
              </p>
            )}
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="live-view-count" />
    </div>
  );
}
