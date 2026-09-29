'use client';

import { useState } from 'react';
import Link from 'next/link';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToolApi } from '@/hooks/use-tool-api';
import { copyToClipboard } from '@/lib/utils/clipboard';
import { downloadFile } from '@/lib/utils/download';
import { ThumbsUp, MessageCircle, Eye, Clock, Calendar, Film, Copy, Download, ExternalLink } from 'lucide-react';

interface VideoStatsResponse {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  channelId: string;
  publishedAt: string;
  duration: string;
  /** YouTube's numeric video category ID. */
  category: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  tags: string[];
  viewCountAvailable: boolean;
  likeCountAvailable: boolean;
  commentCountAvailable: boolean;
}

type CopyField = 'publishedAt' | 'videoId' | 'channelId';

function formatCount(num: number): string {
  return num.toLocaleString();
}

function getTimestampLabels(value: string) {
  const date = new Date(value);
  if (!value || !Number.isFinite(date.getTime())) return null;

  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  return {
    date,
    local: new Intl.DateTimeFormat(undefined, dateTimeOptions).format(date),
    utc: new Intl.DateTimeFormat('en-GB', { ...dateTimeOptions, timeZone: 'UTC' }).format(date),
    localTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

export function VideoStatisticsClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<VideoStatsResponse>();
  const [copyState, setCopyState] = useState<{ field: CopyField; success: boolean } | null>(null);

  const handleValidUrl = (videoId: string) => {
    setCopyState(null);
    execute(`/api/youtube/video-stats?v=${videoId}`);
  };

  async function copyValue(field: CopyField, value: string) {
    const success = await copyToClipboard(value);
    setCopyState({ field, success });
  }

  return (
    <div className="space-y-4">
      <YouTubeUrlInput onValidUrl={handleValidUrl} placeholder="Paste YouTube video URL..." disabled={isLoading} initialUrl={initialUrl} autoSubmit />
      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <div className="space-y-4">
          <ToolOutput title={data.title}>
            <div className="space-y-5">
              {data.thumbnail ? (
                <a
                  href={`https://www.youtube.com/watch?v=${encodeURIComponent(data.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-video overflow-hidden rounded-lg border bg-muted/50"
                  aria-label={`Open ${data.title} on YouTube`}
                >
                  <img src={data.thumbnail} alt={`Thumbnail for ${data.title}`} className="h-full w-full object-cover" />
                  <span className="absolute bottom-3 right-3 rounded-md bg-background/95 px-2.5 py-1.5 text-xs font-medium opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    Open on YouTube <ExternalLink className="ml-1 inline size-3" />
                  </span>
                </a>
              ) : (
                <p className="rounded-lg border p-4 text-sm text-muted-foreground">No public thumbnail was returned.</p>
              )}

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <StatCard icon={Eye} label="Views" value={data.viewCountAvailable ? formatCount(data.viewCount) : 'Unavailable'} note={!data.viewCountAvailable ? 'No public count returned.' : undefined} />
                <StatCard icon={ThumbsUp} label="Likes" value={data.likeCountAvailable ? formatCount(data.likeCount) : 'Unavailable'} note={!data.likeCountAvailable ? 'Hidden or not returned publicly.' : undefined} />
                <StatCard icon={MessageCircle} label="Comments" value={data.commentCountAvailable ? formatCount(data.commentCount) : 'Unavailable'} note={!data.commentCountAvailable ? 'Disabled or not returned publicly.' : undefined} />
                <StatCard icon={Clock} label="Duration" value={data.duration || 'Unavailable'} />
                <StatCard icon={Film} label="Category ID" value={data.category || 'Unavailable'} note={data.category ? 'YouTube category ID.' : undefined} />
              </div>

              <section className="space-y-3 rounded-lg border p-4" aria-labelledby="video-published-time-title">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Calendar className="size-4 text-muted-foreground" />
                  <h3 id="video-published-time-title">Public publication time</h3>
                </div>
                {(() => {
                  const labels = getTimestampLabels(data.publishedAt);
                  if (!labels) return <p className="text-sm text-muted-foreground">YouTube did not return a valid publication timestamp.</p>;

                  return (
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Your local time:</span> <time dateTime={data.publishedAt}>{labels.local}</time></p>
                      <p><span className="text-muted-foreground">UTC:</span> <time dateTime={data.publishedAt}>{labels.utc}</time></p>
                      <p className="break-all font-mono text-xs text-muted-foreground">ISO 8601: {data.publishedAt}</p>
                      {labels.localTimeZone && <p className="text-xs text-muted-foreground">Local timezone: {labels.localTimeZone}</p>}
                      <Button type="button" variant="outline" size="sm" onClick={() => void copyValue('publishedAt', data.publishedAt)}>
                        <Copy />
                        {copyState?.field === 'publishedAt' && copyState.success ? 'Copied ISO timestamp' : 'Copy exact timestamp'}
                      </Button>
                      {copyState?.field === 'publishedAt' && !copyState.success && <span role="status" className="ml-2 text-xs text-destructive">Could not copy timestamp.</span>}
                    </div>
                  );
                })()}
                <p className="text-xs leading-relaxed text-muted-foreground">
                  This is YouTube’s public publication timestamp. It can differ from the original upload time, such as when a private video is later made public.
                </p>
              </section>

              <Separator />

              <section className="space-y-3" aria-labelledby="video-identifiers-title">
                <h3 id="video-identifiers-title" className="text-sm font-semibold">Video and channel</h3>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <span className="font-medium">Channel:</span>
                  {data.channelId ? (
                    <Link
                      href={`/channel-statistics?url=${encodeURIComponent(`https://www.youtube.com/channel/${data.channelId}`)}`}
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {data.channelTitle || 'Open channel statistics'}
                    </Link>
                  ) : <span className="text-muted-foreground">Unavailable</span>}
                </div>
                <IdentifierRow label="Video ID" value={data.id} copied={copyState?.field === 'videoId' && copyState.success} onCopy={() => void copyValue('videoId', data.id)} />
                <IdentifierRow label="Channel ID" value={data.channelId} copied={copyState?.field === 'channelId' && copyState.success} onCopy={() => void copyValue('channelId', data.channelId)} />
                {copyState && copyState.field !== 'publishedAt' && !copyState.success && (
                  <p role="status" className="text-xs text-destructive">Could not copy {copyState.field === 'videoId' ? 'video' : 'channel'} ID.</p>
                )}
              </section>

              <section className="space-y-2" aria-labelledby="video-tags-title">
                <h3 id="video-tags-title" className="text-sm font-semibold">Public tags</h3>
                {data.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {data.tags.map((tag, index) => <Badge key={`${tag}-${index}`} variant="secondary" className="text-xs">{tag}</Badge>)}
                  </div>
                ) : <p className="text-sm text-muted-foreground">No public tags were returned for this video.</p>}
              </section>

              <details className="rounded-lg border p-4">
                <summary className="cursor-pointer text-sm font-semibold">Video description</summary>
                <p className="mt-3 whitespace-pre-wrap break-words text-sm text-muted-foreground">
                  {data.description || 'No public description was returned for this video.'}
                </p>
              </details>

              <div className="flex flex-wrap items-center gap-3 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => downloadFile(JSON.stringify(data, null, 2), `${data.id}-video-metadata.json`, 'application/json')}
                >
                  <Download />
                  Export JSON
                </Button>
                <p className="text-xs text-muted-foreground">Exports the fields returned by this public lookup, including raw counts, IDs, tags and the ISO publication timestamp.</p>
              </div>
            </div>
          </ToolOutput>
        </div>
      )}

      <RelatedTools currentSlug="video-statistics" />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, note }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; note?: string }) {
  return (
    <div className="min-w-0 rounded-lg border p-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5 shrink-0" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-1 break-words text-sm font-semibold tabular-nums">{value}</p>
      {note && <p className="mt-1 text-xs leading-snug text-muted-foreground">{note}</p>}
    </div>
  );
}

function IdentifierRow({ label, value, copied, onCopy }: { label: string; value: string; copied: boolean; onCopy: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="font-medium">{label}:</span>
      {value ? <code className="break-all text-xs text-muted-foreground">{value}</code> : <span className="text-muted-foreground">Unavailable</span>}
      {value && (
        <Button type="button" variant="ghost" size="xs" onClick={onCopy} aria-label={`Copy ${label}`}>
          <Copy />
          {copied ? 'Copied' : 'Copy'}
        </Button>
      )}
    </div>
  );
}
