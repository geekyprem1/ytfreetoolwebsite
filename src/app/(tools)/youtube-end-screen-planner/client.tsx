'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Clock3,
  Download,
  Grid3X3,
  Image as ImageIcon,
  Magnet,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RelatedTools } from '@/components/tools/related-tools';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import {
  MAX_STANDARD_16_BY_9_END_SCREEN_ELEMENTS,
  clamp,
  formatTimelineTime,
  getEndScreenWindow,
  snapToGrid,
} from '@/lib/youtube/end-screen-planner';

type ElementKind = 'video' | 'playlist' | 'subscribe' | 'channel' | 'link';

interface LayoutElement {
  id: string;
  kind: ElementKind;
  x: number;
  y: number;
}

interface DragState {
  id: string;
  offsetX: number;
  offsetY: number;
}

const GRID_STEP = 5;

const elementSpecs: Record<ElementKind, { label: string; width: number; height: number; color: string }> = {
  video: { label: 'Video', width: 28, height: 32, color: '#e84d3c' },
  playlist: { label: 'Playlist', width: 28, height: 32, color: '#f0873e' },
  subscribe: { label: 'Subscribe', width: 18, height: 18, color: '#7b6cf6' },
  channel: { label: 'Channel', width: 20, height: 20, color: '#2e9db2' },
  link: { label: 'Link', width: 24, height: 18, color: '#4a9d65' },
};

const defaultElements: LayoutElement[] = [
  { id: 'video', kind: 'video', x: 8, y: 30 },
  { id: 'playlist', kind: 'playlist', x: 40, y: 30 },
  { id: 'subscribe', kind: 'subscribe', x: 76, y: 39 },
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function drawImageCover(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
) {
  const imageRatio = image.width / image.height;
  const canvasRatio = canvasWidth / canvasHeight;
  let drawWidth = canvasWidth;
  let drawHeight = canvasHeight;
  let offsetX = 0;
  let offsetY = 0;

  if (imageRatio > canvasRatio) {
    drawWidth = canvasHeight * imageRatio;
    offsetX = (canvasWidth - drawWidth) / 2;
  } else {
    drawHeight = canvasWidth / imageRatio;
    offsetY = (canvasHeight - drawHeight) / 2;
  }

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('The selected image could not be prepared for export.'));
    image.src = url;
  });
}

export function YouTubeEndScreenPlannerClient() {
  const [elements, setElements] = useState<LayoutElement[]>(defaultElements);
  const [videoDuration, setVideoDuration] = useState('120');
  const [endScreenDuration, setEndScreenDuration] = useState('20');
  const [showGrid, setShowGrid] = useState(true);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState<string | null>(null);
  const [backgroundImageName, setBackgroundImageName] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<DragState | null>(null);

  useEffect(() => {
    return () => {
      if (backgroundImageUrl) URL.revokeObjectURL(backgroundImageUrl);
    };
  }, [backgroundImageUrl]);

  const durationValue = Number(videoDuration) || 0;
  const requestedEndScreenDuration = Number(endScreenDuration) || 5;
  const timing = useMemo(
    () => getEndScreenWindow(durationValue, requestedEndScreenDuration),
    [durationValue, requestedEndScreenDuration],
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type && !file.type.startsWith('image/')) {
      setImageError('Choose an image file for the final frame.');
      return;
    }

    setImageError(null);
    setBackgroundImageUrl(URL.createObjectURL(file));
    setBackgroundImageName(`${file.name} · ${formatFileSize(file.size)}`);
    event.target.value = '';
  };

  const addElement = (kind: ElementKind) => {
    if (elements.length >= MAX_STANDARD_16_BY_9_END_SCREEN_ELEMENTS) return;
    if (elements.some((element) => element.kind === kind)) return;

    const spec = elementSpecs[kind];
    const offset = elements.length * 7;
    setElements((current) => [
      ...current,
      {
        id: kind,
        kind,
        x: clamp(8 + offset, 0, 100 - spec.width),
        y: clamp(10 + offset, 0, 100 - spec.height),
      },
    ]);
  };

  const removeElement = (id: string) => {
    setElements((current) => current.filter((element) => element.id !== id));
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>, element: LayoutElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const pointerX = ((event.clientX - rect.left) / rect.width) * 100;
    const pointerY = ((event.clientY - rect.top) / rect.height) * 100;
    dragState.current = { id: element.id, offsetX: pointerX - element.x, offsetY: pointerY - element.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const activeDrag = dragState.current;
    const canvas = canvasRef.current;
    if (!activeDrag || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const pointerX = ((event.clientX - rect.left) / rect.width) * 100;
    const pointerY = ((event.clientY - rect.top) / rect.height) * 100;

    setElements((current) => current.map((element) => {
      if (element.id !== activeDrag.id) return element;

      const spec = elementSpecs[element.kind];
      const rawX = clamp(pointerX - activeDrag.offsetX, 0, 100 - spec.width);
      const rawY = clamp(pointerY - activeDrag.offsetY, 0, 100 - spec.height);
      const x = snapEnabled ? clamp(snapToGrid(rawX, GRID_STEP), 0, 100 - spec.width) : rawX;
      const y = snapEnabled ? clamp(snapToGrid(rawY, GRID_STEP), 0, 100 - spec.height) : rawY;

      return { ...element, x, y };
    }));
  };

  const stopDrag = () => {
    dragState.current = null;
  };

  const resetLayout = () => {
    setElements(defaultElements);
    setShowGrid(true);
    setSnapEnabled(true);
  };

  const exportLayout = async () => {
    setExportError(null);
    setIsExporting(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Your browser could not create the PNG export.');

      const backgroundGradient = context.createLinearGradient(0, 0, 1280, 720);
      backgroundGradient.addColorStop(0, '#172032');
      backgroundGradient.addColorStop(0.56, '#0a0f1a');
      backgroundGradient.addColorStop(1, '#1b1130');
      context.fillStyle = backgroundGradient;
      context.fillRect(0, 0, 1280, 720);

      if (backgroundImageUrl) {
        const image = await loadImage(backgroundImageUrl);
        drawImageCover(context, image, canvas.width, canvas.height);
        context.fillStyle = 'rgba(6, 10, 17, 0.38)';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.strokeStyle = 'rgba(255, 255, 255, 0.26)';
      context.lineWidth = 1;
      for (let percent = GRID_STEP; percent < 100; percent += GRID_STEP) {
        const x = (canvas.width * percent) / 100;
        const y = (canvas.height * percent) / 100;
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }

      context.fillStyle = 'rgba(8, 12, 20, 0.86)';
      context.fillRect(32, 28, 380, 54);
      context.fillStyle = '#f8fafc';
      context.font = '600 20px Arial, sans-serif';
      context.fillText('END SCREEN LAYOUT GUIDE', 52, 61);
      context.fillStyle = 'rgba(248, 250, 252, 0.74)';
      context.font = '15px Arial, sans-serif';
      context.fillText('16:9 reference • recreate in YouTube Studio', 52, 104);

      elements.forEach((element) => {
        const spec = elementSpecs[element.kind];
        const x = (element.x / 100) * canvas.width;
        const y = (element.y / 100) * canvas.height;
        const width = (spec.width / 100) * canvas.width;
        const height = (spec.height / 100) * canvas.height;

        context.fillStyle = `${spec.color}24`;
        context.fillRect(x, y, width, height);
        context.setLineDash([10, 8]);
        context.lineWidth = 4;
        context.strokeStyle = spec.color;
        context.strokeRect(x + 2, y + 2, width - 4, height - 4);
        context.setLineDash([]);
        context.fillStyle = spec.color;
        context.fillRect(x + 14, y + 14, Math.min(width - 28, 124), 34);
        context.fillStyle = '#ffffff';
        context.font = '600 17px Arial, sans-serif';
        context.fillText(spec.label.toUpperCase(), x + 24, y + 37);
      });

      context.fillStyle = 'rgba(8, 12, 20, 0.86)';
      context.fillRect(32, 652, 670, 40);
      context.fillStyle = '#f8fafc';
      context.font = '15px Arial, sans-serif';
      context.fillText(
        `End screen: ${formatTimelineTime(timing.startsAtSeconds)}–${formatTimelineTime(timing.endsAtSeconds)} · ${elements.length}/${MAX_STANDARD_16_BY_9_END_SCREEN_ELEMENTS} elements`,
        52,
        678,
      );

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
      if (!blob) throw new Error('The PNG export was empty. Please try again.');

      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = 'youtube-end-screen-layout-guide.png';
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
    } catch (error) {
      setExportError(error instanceof Error ? error.message : 'The PNG export could not be created.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-2">
        <ToolInput label="Full video duration" required description="The complete video length, not just the end screen">
          <Input
            type="number"
            min="0"
            step="1"
            value={videoDuration}
            onChange={(event) => setVideoDuration(event.target.value)}
            inputMode="decimal"
            aria-label="Full video duration in seconds"
          />
        </ToolInput>
        <ToolInput label="End screen duration" required description="YouTube allows an end screen in the final 5–20 seconds">
          <div className="flex items-center gap-3">
            <Input
              type="range"
              min="5"
              max="20"
              step="1"
              value={endScreenDuration}
              onChange={(event) => setEndScreenDuration(event.target.value)}
              className="flex-1"
              aria-label="End screen duration in seconds"
            />
            <span className="w-14 rounded-md border px-2 py-1 text-center text-sm font-medium">{timing.endScreenSeconds}s</span>
          </div>
        </ToolInput>
      </section>

      <section className={`rounded-xl border p-4 sm:p-5 ${timing.videoIsEligible ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-amber-500/40 bg-amber-500/5'}`}>
        <div className="flex gap-3">
          <Clock3 className={`mt-0.5 size-5 shrink-0 ${timing.videoIsEligible ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`} aria-hidden="true" />
          <div>
            <h2 className="font-semibold">
              {timing.videoIsEligible ? `Plan the final ${timing.endScreenSeconds} seconds` : 'This video is too short for an end screen'}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {timing.videoIsEligible
                ? `Place elements from ${formatTimelineTime(timing.startsAtSeconds)} to ${formatTimelineTime(timing.endsAtSeconds)}. YouTube requires the complete video to be at least 25 seconds long.`
                : 'YouTube requires a video to be at least 25 seconds long before an end screen can be added. You can still plan the visual layout below.'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <ToolInput
            label="Final-frame image (optional)"
            description="Stays on your device and appears only as this planner's local background"
            error={imageError}
            className="w-full sm:max-w-md"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full cursor-pointer rounded-lg border border-input bg-transparent px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground hover:file:bg-primary/90"
            />
          </ToolInput>
          {backgroundImageUrl && (
            <Button variant="outline" size="sm" onClick={() => { setBackgroundImageUrl(null); setBackgroundImageName(null); }}>
              <Trash2 className="size-4" aria-hidden="true" />
              Clear image
            </Button>
          )}
        </div>
        {backgroundImageName && <p className="mt-3 text-xs text-muted-foreground">Using locally: {backgroundImageName}</p>}
      </section>

      <section className="rounded-xl border p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Layout elements</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {elements.length}/{MAX_STANDARD_16_BY_9_END_SCREEN_ELEMENTS} elements planned for a standard 16:9 video. Other aspect ratios may allow fewer.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetLayout}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset layout
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(Object.keys(elementSpecs) as ElementKind[]).map((kind) => {
            const alreadyAdded = elements.some((element) => element.kind === kind);
            return (
              <Button
                key={kind}
                variant="outline"
                size="sm"
                onClick={() => addElement(kind)}
                disabled={alreadyAdded || elements.length >= MAX_STANDARD_16_BY_9_END_SCREEN_ELEMENTS}
              >
                <Plus className="size-4" aria-hidden="true" />
                {alreadyAdded ? `${elementSpecs[kind].label} added` : `Add ${elementSpecs[kind].label}`}
              </Button>
            );
          })}
        </div>
      </section>

      <section>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" checked={showGrid} onChange={(event) => setShowGrid(event.target.checked)} />
              <Grid3X3 className="size-4 text-muted-foreground" aria-hidden="true" />
              Show 5% grid
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input type="checkbox" checked={snapEnabled} onChange={(event) => setSnapEnabled(event.target.checked)} />
              <Magnet className="size-4 text-muted-foreground" aria-hidden="true" />
              Snap to grid
            </label>
          </div>
          <span className="text-xs text-muted-foreground">Drag the boxes to reserve visual space</span>
        </div>

        <div
          ref={canvasRef}
          onPointerMove={moveDrag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
          className="relative aspect-video touch-none overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-[0_24px_65px_-35px_rgba(7,12,22,0.9)]"
          style={backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})`, backgroundPosition: 'center', backgroundSize: 'cover' } : undefined}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(12,19,33,0.8),rgba(10,15,25,0.38),rgba(35,19,52,0.74))]" />
          {showGrid && (
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.22) 1px, transparent 1px)',
                backgroundSize: `${GRID_STEP}% ${GRID_STEP}%`,
              }}
            />
          )}
          <div className="pointer-events-none absolute left-[2.5%] top-[4%] rounded-md bg-slate-950/80 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-white sm:text-xs">
            16:9 · END SCREEN LAYOUT GUIDE
          </div>
          <div className="pointer-events-none absolute bottom-[3%] left-[2.5%] rounded-md bg-slate-950/80 px-2.5 py-1.5 text-[10px] text-slate-200 sm:text-xs">
            {formatTimelineTime(timing.startsAtSeconds)}–{formatTimelineTime(timing.endsAtSeconds)} · {elements.length}/{MAX_STANDARD_16_BY_9_END_SCREEN_ELEMENTS} elements
          </div>

          {elements.map((element) => {
            const spec = elementSpecs[element.kind];
            return (
              <div
                key={element.id}
                role="group"
                aria-label={`${spec.label} layout placeholder`}
                onPointerDown={(event) => startDrag(event, element)}
                style={{ left: `${element.x}%`, top: `${element.y}%`, width: `${spec.width}%`, height: `${spec.height}%`, borderColor: spec.color, backgroundColor: `${spec.color}2b` }}
                className="absolute cursor-grab select-none rounded-lg border-2 border-dashed shadow-lg transition-shadow active:cursor-grabbing active:shadow-xl"
              >
                <div className="flex h-full flex-col items-center justify-center gap-1 px-2 text-center text-white">
                  <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold tracking-wide sm:text-xs" style={{ backgroundColor: spec.color }}>
                    {spec.label.toUpperCase()}
                  </span>
                  <span className="hidden text-[10px] text-white/80 sm:inline">Drag to position</span>
                </div>
                <button
                  type="button"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={() => removeElement(element.id)}
                  className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full border border-white/40 bg-slate-950 text-xs text-white shadow-sm hover:bg-slate-800"
                  aria-label={`Remove ${spec.label} placeholder`}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border bg-muted/20 p-4 sm:p-5">
        <div className="flex gap-3">
          <ImageIcon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
          <div>
            <h2 className="font-semibold">Export a production reference, not fake YouTube UI</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The PNG retains your local background (if added) and draws labeled placeholders, grid guides, and the selected end-screen timing. Recreate the plan manually in YouTube Studio.
            </p>
            {exportError && <p className="mt-2 text-sm text-destructive">{exportError}</p>}
            <Button className="mt-4" onClick={exportLayout} disabled={isExporting}>
              <Download className="size-4" aria-hidden="true" />
              {isExporting ? 'Preparing PNG…' : 'Export 1280×720 PNG guide'}
            </Button>
          </div>
        </div>
      </section>

      <RelatedTools currentSlug="youtube-end-screen-planner" />
    </div>
  );
}
