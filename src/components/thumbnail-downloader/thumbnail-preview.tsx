'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const QUALITIES = [
  { value: 'max', label: 'Max', detail: '1280×720' },
  { value: 'hd', label: 'HD', detail: '1280×720' },
  { value: 'sd', label: 'SD', detail: '640×480' },
  { value: 'hq', label: 'HQ', detail: '480×360' },
  { value: 'mq', label: 'MQ', detail: '320×180' },
];

interface ThumbnailPreviewProps {
  thumbnails: Record<string, string>;
  videoTitle: string;
  videoId: string;
}

export function ThumbnailPreview({ thumbnails, videoTitle, videoId }: ThumbnailPreviewProps) {
  const [selected, setSelected] = useState('max');
  const currentUrl = thumbnails[selected] || Object.values(thumbnails)[0] || '';
  const currentQuality = QUALITIES.find((q) => q.value === selected);

  const handleDownload = async () => {
    if (!currentUrl) return;
    try {
      const res = await fetch(currentUrl);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${videoId}-${selected}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      if (currentUrl) window.open(currentUrl, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/30">
        {currentUrl ? (
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <Image
              src={currentUrl}
              alt={videoTitle || 'YouTube thumbnail'}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center text-muted-foreground text-sm">
            No thumbnail available
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {QUALITIES.map((q) => (
          <button
            key={q.value}
            type="button"
            onClick={() => setSelected(q.value)}
            disabled={!thumbnails[q.value]}
            className={cn(
              'px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors border',
              selected === q.value
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent text-muted-foreground border-border/80 hover:border-foreground/30 hover:text-foreground',
              !thumbnails[q.value] && 'opacity-40 cursor-not-allowed',
            )}
          >
            {q.label}
          </button>
        ))}
      </div>

      {currentQuality && (
        <p className="text-sm text-muted-foreground">
          {currentQuality.label} · {currentQuality.detail}
        </p>
      )}

      <Button
        onClick={handleDownload}
        disabled={!currentUrl}
        className="h-11 px-6 rounded-xl bg-[#FF3B30] hover:bg-[#E0352B] text-white"
      >
        Download {selected.toUpperCase()}
      </Button>
    </div>
  );
}
