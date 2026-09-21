'use client';

import { useMemo, useState } from 'react';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToolApi } from '@/hooks/use-tool-api';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { downloadFile } from '@/lib/utils/download';

interface TagsResponse {
  videoId: string;
  videoTitle: string;
  tags: string[];
  tagCount: number;
  formatted: string;
  duration?: string;
  isShorts?: boolean;
}

function isShortsRelatedTag(tag: string): boolean {
  return /\bshorts?\b|#shorts|ytshorts|shortform|short form/i.test(tag);
}

function tagsToCsv(tags: string[]): string {
  const header = 'tag,is_shorts_related';
  const rows = tags.map((tag) => {
    const escaped = `"${tag.replace(/"/g, '""')}"`;
    return `${escaped},${isShortsRelatedTag(tag) ? 'yes' : 'no'}`;
  });
  return [header, ...rows].join('\n');
}

export function TagsExtractorClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<TagsResponse>();
  const { copy } = useCopyToClipboard();
  const [shortsOnly, setShortsOnly] = useState(false);

  const handleValidUrl = (videoId: string) => {
    setShortsOnly(false);
    execute(`/api/youtube/tags?v=${videoId}`);
  };

  const visibleTags = useMemo(() => {
    if (!data) return [];
    if (!shortsOnly) return data.tags;
    return data.tags.filter(isShortsRelatedTag);
  }, [data, shortsOnly]);

  const formattedVisible = visibleTags.join(', ');

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-sm text-muted-foreground">
                  {data.tagCount} tag{data.tagCount !== 1 ? 's' : ''} found
                  {data.isShorts ? ' · Detected as YouTube Short (≤60s)' : ''}
                  {shortsOnly ? ` · Showing ${visibleTags.length} Shorts-related` : ''}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant={shortsOnly ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setShortsOnly((v) => !v)}
                  disabled={data.tags.length === 0}
                >
                  Shorts tags
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={data.tags.length === 0}
                  onClick={() =>
                    downloadFile(tagsToCsv(data.tags), `${data.videoId}-tags.csv`, 'text/csv')
                  }
                >
                  Export CSV
                </Button>
                <OutputActions
                  copyText={formattedVisible || data.formatted}
                  copyLabel="All tags"
                  downloadContent={data.formatted}
                  downloadFilename={`${data.videoId}-tags.txt`}
                />
              </div>
            </div>

            {visibleTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {visibleTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={isShortsRelatedTag(tag) ? 'default' : 'secondary'}
                    className="cursor-pointer hover:opacity-90 transition-colors"
                    onClick={() => copy(tag, tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {shortsOnly
                  ? 'No Shorts-related tags found in this list. Turn off the Shorts filter to see all video tags.'
                  : 'This video has no tags.'}
              </p>
            )}
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="tags-extractor" />
    </div>
  );
}
