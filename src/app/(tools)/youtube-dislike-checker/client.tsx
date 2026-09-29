'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ThumbsDown } from 'lucide-react';
import { ToolError } from '@/components/tools/tool-error';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolOutput } from '@/components/tools/tool-output';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { RelatedTools } from '@/components/tools/related-tools';
import { useToolApi } from '@/hooks/use-tool-api';

interface DislikeEstimate {
  videoId: string;
  estimatedDislikes: number;
  providerLikes: number;
  providerViews: number | null;
  retrievedAt: number;
  source: 'Return YouTube Dislike';
}

function formatCount(value: number): string {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(value);
}

export function YouTubeDislikeCheckerClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<DislikeEstimate>();
  const [lastVideoId, setLastVideoId] = useState('');
  const [inputError, setInputError] = useState('');

  const lookup = (videoId: string) => {
    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      reset();
      setInputError('Paste a YouTube video URL. Channel URLs are not supported.');
      return;
    }
    setInputError('');
    setLastVideoId(videoId);
    reset();
    void execute(`/api/youtube/dislike-estimate?v=${encodeURIComponent(videoId)}`);
  };

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={lookup}
        placeholder="Paste YouTube video URL..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
        submitLabel="Check estimate"
      />
      <p className="text-xs text-muted-foreground">Video URLs only. The result is an estimate from a separate community project, not an official YouTube dislike count.</p>
      {inputError && <p role="alert" className="text-sm text-destructive">{inputError}</p>}

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => lastVideoId && lookup(lastVideoId)} />}

      {data && !isLoading && (
        <ToolOutput title="Third-party dislike estimate">
          <div className="space-y-4">
            <div className="rounded-xl border border-border/70 p-5">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ThumbsDown className="size-4" /> Estimated dislikes
              </div>
              <p className="mt-2 text-3xl font-semibold tabular-nums">{formatCount(data.estimatedDislikes)}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Provider response first retrieved {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(data.retrievedAt)}.
                {' '}That timestamp does not mean the underlying estimate is live.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border p-3"><span className="text-muted-foreground">Provider likes</span><p className="mt-1 font-medium tabular-nums">{formatCount(data.providerLikes)}</p></div>
              {data.providerViews !== null && (
                <div className="rounded-lg border p-3"><span className="text-muted-foreground">Provider views</span><p className="mt-1 font-medium tabular-nums">{formatCount(data.providerViews)}</p></div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Estimates and coverage depend on {data.source}. Its data can include archived values and estimates based on extension-user votes; the provider says updates may be around 2–3 days apart.{' '}
              <a href="https://returnyoutubedislike.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-foreground">Read about the provider</a>.
            </p>
            <p className="text-xs text-muted-foreground">Video ID: <code>{data.videoId}</code></p>
          </div>
        </ToolOutput>
      )}

      <p className="text-sm text-muted-foreground">
        Need official public video fields? Use <Link href="/video-statistics" className="text-primary hover:underline">Video Statistics</Link>.
        {' '}For channel-level public data, see <Link href="/channel-statistics" className="text-primary hover:underline">Channel Statistics</Link>.
      </p>
      <RelatedTools currentSlug="youtube-dislike-checker" />
    </div>
  );
}
