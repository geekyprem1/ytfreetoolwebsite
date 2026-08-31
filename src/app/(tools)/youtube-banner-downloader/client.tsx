'use client';

import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { useToolApi } from '@/hooks/use-tool-api';
import { downloadImageFromUrl } from '@/lib/utils/download-image';
import { Link2, Download } from 'lucide-react';

interface BrandingResponse {
  id: string;
  title: string;
  customUrl: string;
  bannerUrl: string;
}

/** bannerExternalUrl accepts a size suffix; request the widest common desktop/TV crop. */
function bannerAtWidth(url: string, width: number): string {
  if (!url) return url;
  // URLs look like https://yt3.googleusercontent.com/...  — append a size directive.
  return `${url}=w${width}-fcrop64=1,00000000ffffffff-k-c0xffffffff-no-nd-rj`;
}

export function BannerDownloaderClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<BrandingResponse>();
  const [input, setInput] = useState(initialUrl ?? '');
  const [busy, setBusy] = useState(false);
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

  const banner = data?.bannerUrl || '';

  const handleDownload = async (width: number) => {
    if (!banner) return;
    setBusy(true);
    try {
      await downloadImageFromUrl(bannerAtWidth(banner, width), `${data?.customUrl || data?.id}-banner-${width}.jpg`);
    } finally {
      setBusy(false);
    }
  };

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
          Get banner
        </Button>
      </div>

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={data.title}>
          {banner ? (
            <div className="space-y-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bannerAtWidth(banner, 2048)}
                alt={`${data.title} channel banner`}
                className="w-full rounded-xl border object-cover"
              />

              <div className="grid grid-cols-3 gap-2">
                {[2560, 2048, 1280].map((w) => (
                  <Button
                    key={w}
                    variant="outline"
                    size="sm"
                    disabled={busy}
                    onClick={() => handleDownload(w)}
                    className="flex-col h-auto py-2.5"
                  >
                    <Download className="size-3.5 mb-1" />
                    <span className="text-xs">{w}px wide</span>
                  </Button>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                Banner belongs to the creator. Use for research, commentary, or fan work in line with
                their rights and YouTube&apos;s terms.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              This channel has not set a banner (channel art), so there is nothing to download.
            </p>
          )}
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-banner-downloader" />
    </div>
  );
}
