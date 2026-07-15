'use client';

import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { ThumbnailPreview } from '@/components/thumbnail-downloader/thumbnail-preview';
import { useToolApi } from '@/hooks/use-tool-api';

interface ThumbnailResponse {
  videoId: string;
  videoTitle: string;
  thumbnails: Record<string, { url: string; width: number; height: number; quality: string }>;
}

export function ThumbnailDownloaderClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<ThumbnailResponse>();

  const thumbnailUrls = data
    ? Object.fromEntries(Object.entries(data.thumbnails).map(([k, v]) => [k, v.url]))
    : undefined;

  const handleValidUrl = (videoId: string) => {
    execute(`/api/youtube/thumbnail?v=${videoId}`);
  };

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={handleValidUrl}
        placeholder="Paste YouTube video URL..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
        submitLabel="Download"
      />

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && thumbnailUrls && (
        <ToolOutput title={data.videoTitle}>
          <ThumbnailPreview
            thumbnails={thumbnailUrls}
            videoTitle={data.videoTitle}
            videoId={data.videoId}
          />
        </ToolOutput>
      )}

      <RelatedTools currentSlug="thumbnail-downloader" />
    </div>
  );
}
