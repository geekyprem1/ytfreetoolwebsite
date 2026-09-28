'use client';

import Link from 'next/link';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { useToolApi } from '@/hooks/use-tool-api';
import { analyzeTitleLength, TITLE_MAX } from '@/lib/youtube/title-text';
import { cn } from '@/lib/utils';

interface VideoResponse {
  id: string;
  title: string;
  channelTitle: string;
}

export function TitleExtractorClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<VideoResponse>();

  const handleValidUrl = (videoId: string) => execute(`/api/youtube/video-stats?v=${videoId}`);

  const info = data ? analyzeTitleLength(data.title) : null;

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={handleValidUrl}
        placeholder="Paste YouTube video URL..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
        submitLabel="Extract"
      />

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && info && !isLoading && (
        <ToolOutput title="Video title">
          <div className="space-y-4">
            <p className="text-lg font-medium leading-snug break-words">{data.title}</p>
            <p className="text-sm text-muted-foreground">{data.channelTitle}</p>
            <p className={cn('text-sm tabular-nums', info.overLimit ? 'text-destructive' : 'text-muted-foreground')}>
              {info.characters}/{TITLE_MAX} characters · {info.words} words
            </p>
            <OutputActions copyText={data.title} copyLabel="Title" />
          </div>
        </ToolOutput>
      )}

      <div className="tool-prose">
        <p className="text-sm text-muted-foreground">
          Check the length against YouTube&apos;s limit with the{' '}
          <Link href="/youtube-title-length-checker">Title Length Checker</Link>, or grab the full description with
          the <Link href="/youtube-description-extractor">Description Extractor</Link>.
        </p>
      </div>

      <RelatedTools currentSlug="youtube-title-extractor" />
    </div>
  );
}
