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
  thumbnail: string;
  thumbnailHigh: string;
}

const SIZES = [800, 240, 176, 88];

/** YouTube avatar URLs carry a =sNNN size segment; swap it to request a specific resolution. */
function avatarAtSize(url: string, size: number): string {
  if (!url) return url;
  return url.replace(/=s\d+(-c)?/, `=s${size}-c`).replace(/=w\d+-h\d+/, `=s${size}-c`);
}

export function ProfilePictureDownloaderClient({ initialUrl }: { initialUrl?: string }) {
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

  const base = data?.thumbnailHigh || data?.thumbnail || '';

  const handleDownload = async (size: number) => {
    if (!base) return;
    setBusy(true);
    try {
      await downloadImageFromUrl(avatarAtSize(base, size), `${data?.customUrl || data?.id}-pfp-${size}.jpg`);
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
          Get avatar
        </Button>
      </div>

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && base && (
        <ToolOutput title={data.title}>
          <div className="space-y-5">
            <div className="flex flex-col items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarAtSize(base, 800)}
                alt={`${data.title} profile picture`}
                className="size-40 rounded-full border shadow-sm object-cover"
              />
              {data.customUrl && <p className="text-sm text-muted-foreground">{data.customUrl}</p>}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SIZES.map((size) => (
                <Button
                  key={size}
                  variant="outline"
                  size="sm"
                  disabled={busy}
                  onClick={() => handleDownload(size)}
                  className="flex-col h-auto py-2.5"
                >
                  <Download className="size-3.5 mb-1" />
                  <span className="text-xs">
                    {size}×{size}
                  </span>
                </Button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Images belong to their respective creators. Download for research, commentary, or fan use
              in line with the creator&apos;s rights and YouTube&apos;s terms.
            </p>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-profile-picture-downloader" />
    </div>
  );
}
