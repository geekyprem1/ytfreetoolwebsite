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
import { AlertCircle } from 'lucide-react';

interface ChannelTagsResponse {
  channelId: string; channelTitle: string; inferredTags: string[];
  videoCount: number; disclaimer: string;
}

export function ChannelTagsClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<ChannelTagsResponse>();
  const { copy } = useCopyToClipboard();

  const handleValidUrl = (channelId: string) => {
    execute(`/api/youtube/channel-tags?c=${channelId}`);
  };

  const tagString = data ? data.inferredTags.join(', ') : '';

  return (
    <div className="space-y-4">
      <YouTubeUrlInput onValidUrl={handleValidUrl} placeholder="Paste YouTube channel URL..." disabled={isLoading} initialUrl={initialUrl} autoSubmit />
      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={data.channelTitle}>
          <div className="space-y-4">
            <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
              <AlertCircle className="size-4 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-yellow-700 dark:text-yellow-400">{data.disclaimer}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {data.inferredTags.length} tags from {data.videoCount} videos
              </span>
              <OutputActions copyText={tagString} copyLabel="All tags"
                downloadContent={tagString} downloadFilename={`${data.channelId}-tags.txt`} />
            </div>

            <div className="flex flex-wrap gap-2">
              {data.inferredTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => copy(tag, tag)}>{tag}</Badge>
              ))}
            </div>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="channel-tags" />
    </div>
  );
}
