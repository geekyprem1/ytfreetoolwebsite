'use client';

import { useState, useRef, useEffect } from 'react';
import { ToolOutput } from '@/components/tools/tool-output';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import { analyzeThumbnailText, contrastGuidance, estimateContrastRatio, type ThumbnailTextColor } from '@/lib/youtube/thumbnail-readability';

type Layout = 'grid' | 'sidebar' | 'search' | 'mobile';

const LAYOUTS: { id: Layout; label: string }[] = [
  { id: 'grid', label: 'Home grid' },
  { id: 'sidebar', label: 'Sidebar' },
  { id: 'search', label: 'Search' },
  { id: 'mobile', label: 'Mobile' },
];

function useThumbnailSlot() {
  const [src, setSrc] = useState<string | null>(null);
  const [title, setTitle] = useState('Your video title goes right here');
  const [averageLuminance, setAverageLuminance] = useState(0.5);
  const objectUrl = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    };
  }, []);

  const setFile = (file: File) => {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    const url = URL.createObjectURL(file);
    objectUrl.current = url;
    setSrc(url);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 18;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let luminance = 0;
      for (let i = 0; i < pixels.length; i += 4) {
        luminance += (0.2126 * pixels[i]! + 0.7152 * pixels[i + 1]! + 0.0722 * pixels[i + 2]!) / 255;
      }
      setAverageLuminance(luminance / (pixels.length / 4));
    };
    image.src = url;
  };

  const clear = () => {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = null;
    setSrc(null);
    setAverageLuminance(0.5);
  };

  return { src, setFile, clear, title, setTitle, averageLuminance };
}

function Dropzone({ onFile, hasImage }: { onFile: (f: File) => void; hasImage: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f && f.type.startsWith('image/')) onFile(f);
      }}
      className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 cursor-pointer hover:bg-muted/40 transition-colors text-center"
    >
      <Upload className="size-5 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">
        {hasImage ? 'Replace image' : 'Click or drop a thumbnail (16:9 JPG/PNG)'}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
    </div>
  );
}

function Thumb({ src, className }: { src: string | null; className?: string }) {
  return (
    <div className={`relative bg-muted rounded-lg overflow-hidden ${className ?? ''}`} style={{ aspectRatio: '16 / 9' }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="thumbnail preview" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">
          No image
        </div>
      )}
    </div>
  );
}

function LayoutPreview({
  layout,
  src,
  title,
}: {
  layout: Layout;
  src: string | null;
  title: string;
}) {
  if (layout === 'sidebar' || layout === 'search') {
    return (
      <div className="flex gap-3">
        <Thumb src={src} className="w-40 shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium line-clamp-2">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">Channel Name</p>
          <p className="text-xs text-muted-foreground">120K views · 2 days ago</p>
        </div>
      </div>
    );
  }
  // grid + mobile: stacked card
  return (
    <div className={layout === 'mobile' ? 'max-w-xs mx-auto' : ''}>
      <Thumb src={src} />
      <div className="flex gap-2.5 mt-2.5">
        <div className="size-9 rounded-full bg-muted shrink-0" />
        <div className="min-w-0">
          <p className="text-sm font-medium line-clamp-2">{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Channel Name</p>
          <p className="text-xs text-muted-foreground">120K views · 2 days ago</p>
        </div>
      </div>
    </div>
  );
}

export function ThumbnailPreviewTesterClient() {
  const a = useThumbnailSlot();
  const b = useThumbnailSlot();
  const [compare, setCompare] = useState(false);
  const [layout, setLayout] = useState<Layout>('grid');
  const [dark, setDark] = useState(false);
  const [thumbnailText, setThumbnailText] = useState('Grow on YouTube');
  const [textColor, setTextColor] = useState<ThumbnailTextColor>('light');
  const textCheck = analyzeThumbnailText(thumbnailText);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">{compare ? 'Thumbnail A' : 'Thumbnail'}</p>
          <Dropzone onFile={a.setFile} hasImage={!!a.src} />
          <Input value={a.title} onChange={(e) => a.setTitle(e.target.value)} placeholder="Video title" className="h-9 text-sm" />
          {a.src && (
            <Button variant="ghost" size="sm" onClick={a.clear} className="text-xs">
              <X className="size-3.5 mr-1" /> Clear
            </Button>
          )}
        </div>
        {compare && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Thumbnail B</p>
            <Dropzone onFile={b.setFile} hasImage={!!b.src} />
            <Input value={b.title} onChange={(e) => b.setTitle(e.target.value)} placeholder="Video title" className="h-9 text-sm" />
            {b.src && (
              <Button variant="ghost" size="sm" onClick={b.clear} className="text-xs">
                <X className="size-3.5 mr-1" /> Clear
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant={compare ? 'default' : 'outline'} size="sm" onClick={() => setCompare((v) => !v)}>
          {compare ? 'A/B mode on' : 'Compare two (A/B)'}
        </Button>
        <div className="flex gap-1">
          {LAYOUTS.map((l) => (
            <Button key={l.id} variant={layout === l.id ? 'default' : 'outline'} size="sm" onClick={() => setLayout(l.id)}>
              {l.label}
            </Button>
          ))}
        </div>
        <Button variant={dark ? 'default' : 'outline'} size="sm" onClick={() => setDark((v) => !v)}>
          {dark ? 'Dark' : 'Light'}
        </Button>
      </div>

      {a.src && (
        <>
          <ToolOutput title={`${LAYOUTS.find((l) => l.id === layout)?.label} preview`}>
            <div className={`rounded-xl p-5 ${dark ? 'bg-neutral-900 text-neutral-100' : 'bg-white text-neutral-900'}`}>
              <div className={compare ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : ''}>
                <LayoutPreview layout={layout} src={a.src} title={a.title} />
                {compare && <LayoutPreview layout={layout} src={b.src} title={b.title} />}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Previews are mockups of YouTube surfaces for visual comparison. Your images stay in your
              browser and are never uploaded to a server.
            </p>
          </ToolOutput>
          <ToolOutput title="Readability checks">
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input value={thumbnailText} onChange={(e) => setThumbnailText(e.target.value)} placeholder="Text shown on the thumbnail" aria-label="Thumbnail text" />
                <Select value={textColor} onChange={(e) => setTextColor(e.target.value as ThumbnailTextColor)} options={[{ value: 'light', label: 'Light thumbnail text' }, { value: 'dark', label: 'Dark thumbnail text' }]} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Words</p><p className="font-semibold">{textCheck.wordCount}</p><p className="text-xs text-muted-foreground mt-1">{textCheck.wordGuidance}</p></div>
                <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Characters</p><p className="font-semibold">{textCheck.characterCount}</p><p className="text-xs text-muted-foreground mt-1">Keep the promise readable, not crowded.</p></div>
                <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Estimated contrast</p><p className="font-semibold">{estimateContrastRatio(a.averageLuminance, textColor).toFixed(1)}:1</p><p className="text-xs text-muted-foreground mt-1">{contrastGuidance(a.averageLuminance, textColor)}</p></div>
              </div>
              <p className="text-xs text-muted-foreground">Contrast uses the image&apos;s average brightness, not OCR or pixel-perfect text detection. Zoom the preview down to a phone-sized card before publishing. These checks describe legibility; they do not predict CTR.</p>
            </div>
          </ToolOutput>
        </>
      )}

      <RelatedTools currentSlug="thumbnail-preview-tester" />
    </div>
  );
}
