'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { useToolApi } from '@/hooks/use-tool-api';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Link2 } from 'lucide-react';

interface BrandingResponse {
  id: string;
  title: string;
  customUrl: string;
  thumbnail: string;
}

export function ChannelIdFinderClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<BrandingResponse>();
  const { copy } = useCopyToClipboard();
  const [input, setInput] = useState(initialUrl ?? '');
  const autoRan = useRef(false);

  const lookup = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    execute(`/api/youtube/channel-branding?c=${encodeURIComponent(trimmed)}`);
  };

  useEffect(() => {
    if (initialUrl && !autoRan.current) {
      autoRan.current = true;
      lookup(initialUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUrl]);

  const rssUrl = data ? `https://www.youtube.com/feeds/videos.xml?channel_id=${data.id}` : '';

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && lookup(input)}
            placeholder="Paste channel URL, @handle, or UC… ID"
            className="pl-10 h-12 text-base rounded-xl md:text-base"
            disabled={isLoading}
          />
        </div>
        <Button
          onClick={() => lookup(input)}
          disabled={isLoading || !input.trim()}
          className="h-12 px-5 rounded-xl bg-[#FF3B30] hover:bg-[#E0352B] text-white shrink-0"
        >
          Find ID
        </Button>
      </div>

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={data.title}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {data.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.thumbnail} alt={data.title} className="size-14 rounded-full" />
              )}
              {data.customUrl && <p className="text-sm text-muted-foreground">{data.customUrl}</p>}
            </div>

            <div className="rounded-xl border bg-muted/20 p-4">
              <p className="text-xs text-muted-foreground mb-1">Channel ID</p>
              <button
                onClick={() => copy(data.id, 'Channel ID')}
                className="font-mono text-base font-semibold break-all text-left hover:text-primary transition-colors"
                title="Click to copy"
              >
                {data.id}
              </button>
            </div>

            <div className="rounded-xl border p-4">
              <p className="text-xs text-muted-foreground mb-1">RSS feed URL</p>
              <button
                onClick={() => copy(rssUrl, 'RSS feed URL')}
                className="font-mono text-xs break-all text-left hover:text-primary transition-colors"
                title="Click to copy"
              >
                {rssUrl}
              </button>
            </div>

            <OutputActions copyText={data.id} copyLabel="Channel ID" />
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="channel-id-finder" />
    </div>
  );
}
