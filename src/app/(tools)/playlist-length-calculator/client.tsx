'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { useToolApi } from '@/hooks/use-tool-api';
import { ListVideo, Clock, Film } from 'lucide-react';

interface PlaylistResponse {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  videoCount: number;
  totalSeconds: number;
  countedVideos: number;
  truncated: boolean;
}

const SPEEDS = [1, 1.25, 1.5, 1.75, 2] as const;

function formatLong(totalSeconds: number): string {
  const s = Math.round(totalSeconds);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  parts.push(`${sec}s`);
  return parts.join(' ');
}

export function PlaylistLengthCalculatorClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<PlaylistResponse>();
  const [input, setInput] = useState(initialUrl ?? '');
  const autoRan = useRef(false);

  const lookup = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    execute(`/api/youtube/playlist?list=${encodeURIComponent(trimmed)}`);
  };

  useEffect(() => {
    if (initialUrl && !autoRan.current) {
      autoRan.current = true;
      lookup(initialUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUrl]);

  const avgSeconds = data && data.countedVideos > 0 ? data.totalSeconds / data.countedVideos : 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && lookup(input)}
          placeholder="Paste playlist URL (…?list=PL…) or playlist ID"
          className="h-12 text-base rounded-xl md:text-base flex-1"
          disabled={isLoading}
        />
        <Button
          onClick={() => lookup(input)}
          disabled={isLoading || !input.trim()}
          className="h-12 px-5 rounded-xl bg-[#FF3B30] hover:bg-[#E0352B] text-white shrink-0"
        >
          Calculate
        </Button>
      </div>

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={data.title}>
          <div className="space-y-5">
            {data.channelTitle && (
              <p className="text-sm text-muted-foreground">by {data.channelTitle}</p>
            )}

            <div className="rounded-xl border bg-muted/20 p-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total length</p>
              <p className="text-3xl font-bold tracking-tight">{formatLong(data.totalSeconds)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {(data.totalSeconds / 3600).toFixed(1)} hours across {data.countedVideos} video
                {data.countedVideos !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg border p-3 text-center">
                <Film className="size-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Videos</p>
                <p className="font-semibold">{data.videoCount}</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <Clock className="size-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Average</p>
                <p className="font-semibold">{formatLong(avgSeconds)}</p>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <ListVideo className="size-4 mx-auto text-muted-foreground mb-1" />
                <p className="text-xs text-muted-foreground">Measured</p>
                <p className="font-semibold">{data.countedVideos}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Watch time at faster speeds</h4>
              <div className="space-y-1.5">
                {SPEEDS.map((speed) => (
                  <div key={speed} className="flex items-center justify-between rounded-lg border px-3 py-2">
                    <span className="text-sm font-medium">{speed}×</span>
                    <span className="text-sm font-mono">{formatLong(data.totalSeconds / speed)}</span>
                  </div>
                ))}
              </div>
            </div>

            {data.truncated && (
              <p className="text-xs text-muted-foreground">
                This playlist is very large. Results cover the first {data.countedVideos} videos to stay
                within API limits, so the true total is longer.
              </p>
            )}
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="playlist-length-calculator" />
    </div>
  );
}
