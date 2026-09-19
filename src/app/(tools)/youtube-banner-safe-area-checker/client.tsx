'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, Image as ImageIcon, ShieldCheck, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedTools } from '@/components/tools/related-tools';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import {
  BANNER_CROP_WINDOWS,
  YOUTUBE_BANNER_RECOMMENDED,
  formatAspectRatio,
  getBannerDimensionStatus,
  getSafeAreaRect,
  type BannerCropWindow,
} from '@/lib/youtube/banner-safe-area';

interface BannerImage {
  name: string;
  size: number;
  width: number;
  height: number;
  url: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function cropAspectRatio(crop: BannerCropWindow): string {
  return `${(crop.width * 16).toFixed(4)} / ${(crop.height * 9).toFixed(4)}`;
}

function safeRectStyle(crop: BannerCropWindow) {
  const safe = getSafeAreaRect();
  return {
    left: `${((safe.x - crop.x) / crop.width) * 100}%`,
    top: `${((safe.y - crop.y) / crop.height) * 100}%`,
    width: `${(safe.width / crop.width) * 100}%`,
    height: `${(safe.height / crop.height) * 100}%`,
  };
}

function drawImageContain(context: CanvasRenderingContext2D, image: HTMLImageElement, width: number, height: number) {
  const imageRatio = image.width / image.height;
  const canvasRatio = width / height;
  let drawWidth = width;
  let drawHeight = height;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawHeight = width / imageRatio;
    offsetY = (height - drawHeight) / 2;
  } else {
    drawWidth = height * imageRatio;
    offsetX = (width - drawWidth) / 2;
  }

  context.fillStyle = '#0b1220';
  context.fillRect(0, 0, width, height);
  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('The banner image could not be prepared for export.'));
    image.src = url;
  });
}

export function YouTubeBannerSafeAreaCheckerClient() {
  const [banner, setBanner] = useState<BannerImage | null>(null);
  const [showSafeArea, setShowSafeArea] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    return () => {
      if (banner?.url) URL.revokeObjectURL(banner.url);
    };
  }, [banner?.url]);

  const dimensionStatus = useMemo(
    () => banner ? getBannerDimensionStatus(banner.width, banner.height) : null,
    [banner],
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type && !file.type.startsWith('image/')) {
      setError('Choose a JPG, PNG, WebP, or another image file for the banner.');
      return;
    }

    const url = URL.createObjectURL(file);
    const image = new window.Image();
    image.onload = () => {
      setBanner({ name: file.name, size: file.size, width: image.naturalWidth, height: image.naturalHeight, url });
      setError(null);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      setBanner(null);
      setError('Your browser could not read this image. Try a JPG or PNG.');
    };
    image.src = url;
    event.target.value = '';
  };

  const clearBanner = () => {
    setBanner(null);
    setError(null);
    setExportError(null);
  };

  const exportGuide = async () => {
    if (!banner) return;

    setIsExporting(true);
    setExportError(null);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = YOUTUBE_BANNER_RECOMMENDED.width;
      canvas.height = YOUTUBE_BANNER_RECOMMENDED.height;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Your browser could not create the PNG guide.');

      const image = await loadImage(banner.url);
      drawImageContain(context, image, canvas.width, canvas.height);
      const safe = getSafeAreaRect(canvas.width, canvas.height);

      if (showSafeArea) {
        context.fillStyle = 'rgba(245, 158, 11, 0.18)';
        context.fillRect(0, 0, canvas.width, safe.y);
        context.fillRect(0, safe.y + safe.height, canvas.width, canvas.height - safe.y - safe.height);
        context.fillRect(0, safe.y, safe.x, safe.height);
        context.fillRect(safe.x + safe.width, safe.y, canvas.width - safe.x - safe.width, safe.height);
        context.strokeStyle = '#fbbf24';
        context.lineWidth = 6;
        context.setLineDash([18, 12]);
        context.strokeRect(safe.x, safe.y, safe.width, safe.height);
        context.setLineDash([]);
      }

      context.fillStyle = 'rgba(8, 12, 20, 0.86)';
      context.fillRect(48, 48, 520, 82);
      context.fillStyle = '#ffffff';
      context.font = '600 26px Arial, sans-serif';
      context.fillText('YOUTUBE BANNER GUIDE', 76, 83);
      context.font = '16px Arial, sans-serif';
      context.fillStyle = 'rgba(255,255,255,.76)';
      context.fillText('2560×1440 reference · keep text and logos inside the amber box', 76, 110);

      context.fillStyle = 'rgba(8, 12, 20, 0.86)';
      context.fillRect(48, 1342, 540, 46);
      context.fillStyle = '#ffffff';
      context.font = '16px Arial, sans-serif';
      context.fillText(`Source: ${banner.width}×${banner.height} · ${formatAspectRatio(banner.width, banner.height)}`, 72, 1372);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('The PNG guide was empty. Please try again.');

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'youtube-banner-safe-area-guide.png';
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
    } catch (exportFailure) {
      setExportError(exportFailure instanceof Error ? exportFailure.message : 'The PNG guide could not be created.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border bg-muted/20 p-4 sm:p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h2 className="font-semibold">Local banner preview</h2>
            <p className="mt-1 text-sm text-muted-foreground">Your image stays in the browser. The checker reads dimensions, shows crop windows, and creates a new guide image without changing the source file.</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border p-4 sm:p-5">
        <ToolInput label="Upload channel banner" required description="JPG, PNG, WebP, or another image format your browser can read" error={error}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full cursor-pointer rounded-lg border border-input bg-transparent px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
            />
            {banner && <Button variant="outline" size="sm" onClick={clearBanner}><Trash2 className="size-4" aria-hidden="true" /> Clear</Button>}
          </div>
        </ToolInput>
      </section>

      {banner && dimensionStatus && (
        <ToolOutput title="Banner dimensions">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Image size</p><p className="mt-1 font-semibold">{banner.width} × {banner.height}</p><p className="mt-1 text-xs text-muted-foreground">{formatAspectRatio(banner.width, banner.height)}</p></div>
            <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Recommended</p><p className={`mt-1 font-semibold ${dimensionStatus.meetsRecommended ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>{dimensionStatus.meetsRecommended ? '2560×1440 met' : '2560×1440 recommended'}</p><p className="mt-1 text-xs text-muted-foreground">Especially for TV</p></div>
            <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Minimum</p><p className={`mt-1 font-semibold ${dimensionStatus.meetsMinimum ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>{dimensionStatus.meetsMinimum ? 'Minimum met' : 'Below minimum'}</p><p className="mt-1 text-xs text-muted-foreground">2048×1152 baseline</p></div>
            <div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Aspect ratio</p><p className={`mt-1 font-semibold ${dimensionStatus.is16By9 ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'}`}>{dimensionStatus.is16By9 ? '16:9' : 'Not 16:9'}</p><p className="mt-1 text-xs text-muted-foreground">{formatFileSize(banner.size)}</p></div>
          </div>
          {!dimensionStatus.is16By9 && <p className="mt-4 rounded-lg border border-amber-500/40 bg-amber-500/5 p-3 text-sm text-amber-800 dark:text-amber-200">This preview assumes a 16:9 banner canvas. Export a 16:9 image to avoid additional cropping in YouTube Studio.</p>}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">TV canvas and safe area</h2>
              <p className="mt-1 text-sm text-muted-foreground">Amber shading marks the region where text and logos may be cropped. The tool cannot identify text pixels automatically.</p>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm"><input type="checkbox" checked={showSafeArea} onChange={(event) => setShowSafeArea(event.target.checked)} /> Show safe-area guide</label>
          </div>

          <div className="relative mt-4 aspect-video overflow-hidden rounded-xl border border-slate-700 bg-slate-950">
            <img src={banner.url} alt="Uploaded YouTube channel banner" className="absolute inset-0 size-full object-cover" />
            {showSafeArea && <div className="pointer-events-none absolute inset-0 grid place-items-center bg-amber-500/10"><div className="absolute inset-x-[19.85%] inset-y-[35.3%] rounded border-2 border-dashed border-amber-300 shadow-[0_0_0_9999px_rgba(245,158,11,0.14)]"><span className="absolute left-2 top-2 rounded bg-slate-950/80 px-2 py-1 text-[10px] font-semibold tracking-wide text-amber-100 sm:text-xs">TEXT + LOGO SAFE AREA</span></div></div>}
            <div className="pointer-events-none absolute bottom-3 left-3 rounded bg-slate-950/80 px-2.5 py-1.5 text-xs text-white">TV · 2560×1440 reference</div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {BANNER_CROP_WINDOWS.slice(1).map((crop) => (
              <div key={crop.label} className="rounded-xl border p-3">
                <div className="mb-3 flex items-center justify-between gap-2"><div><h3 className="font-semibold">{crop.label}</h3><p className="text-xs text-muted-foreground">Centered crop preview</p></div><span className="text-xs text-muted-foreground">{crop.label === 'Mobile' ? 'safe-first' : 'wide crop'}</span></div>
                <div className="relative w-full overflow-hidden rounded-lg border border-slate-700 bg-slate-950" style={{ aspectRatio: cropAspectRatio(crop) }}>
                  <img src={banner.url} alt={`${crop.label} crop preview`} className="absolute max-w-none" style={{ left: `${(-crop.x / crop.width) * 100}%`, top: `${(-crop.y / crop.height) * 100}%`, width: `${(1 / crop.width) * 100}%`, height: `${(1 / crop.height) * 100}%` }} />
                  {showSafeArea && <div className="pointer-events-none absolute rounded border border-dashed border-amber-300" style={safeRectStyle(crop)} />}
                  <span className="pointer-events-none absolute bottom-2 left-2 rounded bg-slate-950/80 px-2 py-1 text-[10px] font-semibold tracking-wide text-white">{crop.label.toUpperCase()} CROP</span>
                </div>
              </div>
            ))}
          </div>

          <section className="mt-6 rounded-xl border bg-muted/20 p-4">
            <div className="flex gap-3"><ImageIcon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" /><div><h3 className="font-semibold">Keep important artwork centered</h3><p className="mt-1 text-sm text-muted-foreground">The amber guide is a visual safe-area warning, not an automatic text/logo detector. Inspect your channel name, face, logo, and schedule manually inside the box.</p></div></div>
            {exportError && <p className="mt-3 text-sm text-destructive">{exportError}</p>}
            <Button className="mt-4" onClick={exportGuide} disabled={isExporting}><Download className="size-4" aria-hidden="true" />{isExporting ? 'Preparing guide…' : 'Export PNG guide'}</Button>
          </section>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-banner-safe-area-checker" />
    </div>
  );
}
