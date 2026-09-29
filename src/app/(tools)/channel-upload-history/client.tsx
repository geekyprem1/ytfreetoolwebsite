'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { RelatedTools } from '@/components/tools/related-tools';
import { useToolApi } from '@/hooks/use-tool-api';
import { inspectYouTubeInput } from '@/lib/youtube/url-parser';

interface UploadPage {
  channelId: string;
  channelTitle: string;
  page: number;
  videos: { videoId: string; title: string; thumbnail: string; publishedAt: string }[];
  nextPageToken: string | null;
  capped: boolean;
}

export function ChannelUploadHistoryClient() {
  const [input, setInput] = useState('');
  const [pages, setPages] = useState<UploadPage[]>([]);
  const { isLoading, error, execute } = useToolApi<UploadPage>();
  const inspected = inspectYouTubeInput(input);
  const validChannel = inspected?.type === 'channel' && ['channel ID', 'handle'].includes(inspected.identifierKind);
  const load = async (page: number, pageToken?: string) => {
    const query = new URLSearchParams({ c: input.trim(), page: String(page) });
    if (pageToken) query.set('pageToken', pageToken);
    if (page === 0) setPages([]);
    const result = await execute(`/api/youtube/channel-upload-history?${query.toString()}`);
    if (result) setPages((current) => page === 0 ? [result] : [...current, result]);
  };
  const last = pages.at(-1);
  const videos = pages.flatMap((page) => page.videos);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input aria-label="Channel ID or handle" value={input} onChange={(event) => { setInput(event.target.value); setPages([]); }} onKeyDown={(event) => { if (event.key === 'Enter' && validChannel) void load(0); }} placeholder="@handle or UC… channel ID" className="h-12" />
        <Button onClick={() => void load(0)} disabled={!validChannel || isLoading} className="h-12">Show uploads</Button>
      </div>
      {input.trim() && !validChannel && <p className="text-sm text-muted-foreground">Use a channel ID or @handle. Legacy custom URLs cannot be resolved here.</p>}
      {isLoading && pages.length === 0 && <ToolLoading variant="card" />}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      {last && (
        <ToolOutput title={`${last.channelTitle} · ${videos.length} uploads shown`}>
          <ol className="divide-y rounded-xl border px-4">
            {videos.map((video, index) => <li key={`${video.videoId}-${index}`} className="flex items-start gap-3 py-3">
              {video.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={video.thumbnail} alt="" className="w-24 rounded" />
              )}
              <div className="min-w-0"><a href={`https://www.youtube.com/watch?v=${video.videoId}`} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary">{video.title}</a><p className="text-xs text-muted-foreground">{video.publishedAt ? new Date(video.publishedAt).toLocaleDateString() : 'Date unavailable'}</p></div>
            </li>)}
          </ol>
          {last.nextPageToken && <Button className="mt-4" variant="outline" disabled={isLoading} onClick={() => void load(last.page + 1, last.nextPageToken ?? undefined)}>{isLoading ? 'Loading…' : 'Load 25 more'}</Button>}
          {last.capped && <p className="mt-3 text-xs text-muted-foreground">Reached this tool&apos;s 100-entry limit.</p>}
          {!last.nextPageToken && !last.capped && <p className="mt-3 text-xs text-muted-foreground">No more accessible uploads in this list.</p>}
        </ToolOutput>
      )}
      <RelatedTools currentSlug="channel-upload-history" />
    </div>
  );
}
