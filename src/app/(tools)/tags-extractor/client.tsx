'use client';

import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { Badge } from '@/components/ui/badge';
import { useToolApi } from '@/hooks/use-tool-api';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

interface TagsResponse {
  videoId: string;
  videoTitle: string;
  tags: string[];
  tagCount: number;
  formatted: string;
}

export function TagsExtractorClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<TagsResponse>();
  const { copy } = useCopyToClipboard();

  const handleValidUrl = (videoId: string) => {
    execute(`/api/youtube/tags?v=${videoId}`);
  };

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={handleValidUrl}
        placeholder="Paste YouTube video URL..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
      />

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={data.videoTitle}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {data.tagCount} tag{data.tagCount !== 1 ? 's' : ''} found
              </span>
              <OutputActions
                copyText={data.formatted}
                copyLabel="All tags"
                downloadContent={data.formatted}
                downloadFilename={`${data.videoId}-tags.txt`}
              />
            </div>

            {data.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80 transition-colors"
                    onClick={() => copy(tag, tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">This video has no tags.</p>
            )}
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="tags-extractor" />
    </div>
  );
}
