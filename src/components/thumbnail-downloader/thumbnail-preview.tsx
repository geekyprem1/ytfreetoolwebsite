'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const QUALITIES = [
  { value: 'max', label: 'Max (1280×720)', width: 1280, height: 720 },
  { value: 'hd', label: 'HD (1280×720)', width: 1280, height: 720 },
  { value: 'sd', label: 'SD (640×480)', width: 640, height: 480 },
  { value: 'hq', label: 'HQ (480×360)', width: 480, height: 360 },
  { value: 'mq', label: 'MQ (320×180)', width: 320, height: 180 },
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
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {QUALITIES.map((q) => (
          <Button
            key={q.value}
            variant={selected === q.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelected(q.value)}
            disabled={!thumbnails[q.value]}
          >
            {q.label.split(' ')[0]}
          </Button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden border bg-muted/50">
        {currentUrl ? (
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <Image
              src={currentUrl}
              alt={videoTitle || 'YouTube thumbnail'}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center text-muted-foreground">
            No thumbnail available
          </div>
        )}
      </div>

      {currentQuality && (
        <p className="text-xs text-muted-foreground text-center">
          {currentQuality.label} • {currentQuality.width}×{currentQuality.height}
        </p>
      )}

      <div className="flex justify-center">
        <Button onClick={handleDownload} disabled={!currentUrl}>
          Download {selected.toUpperCase()}
        </Button>
      </div>
    </div>
  );
}
