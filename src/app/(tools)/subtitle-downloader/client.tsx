'use client';

import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { useToolApi } from '@/hooks/use-tool-api';
import { downloadFile } from '@/lib/utils/download';
import { Download } from 'lucide-react';

interface Segment {
  text: string;
  duration: number;
  offset: number;
}

interface TranscriptResponse {
  videoId: string;
  language: string;
  segments: Segment[];
  fullText: string;
}

/** Seconds -> SRT time "HH:MM:SS,mmm". */
function srtTime(totalSeconds: number): string {
  const ms = Math.round(totalSeconds * 1000);
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  const millis = ms % 1000;
  const pad = (n: number, w = 2) => String(n).padStart(w, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(millis, 3)}`;
}

/** Seconds -> WebVTT time "HH:MM:SS.mmm". */
function vttTime(totalSeconds: number): string {
  return srtTime(totalSeconds).replace(',', '.');
}

function toSrt(segments: Segment[]): string {
  return segments
    .map((seg, i) => {
      const end = seg.offset + (seg.duration || 2);
      return `${i + 1}\n${srtTime(seg.offset)} --> ${srtTime(end)}\n${seg.text}\n`;
    })
    .join('\n');
}

function toVtt(segments: Segment[]): string {
  const body = segments
    .map((seg) => {
      const end = seg.offset + (seg.duration || 2);
      return `${vttTime(seg.offset)} --> ${vttTime(end)}\n${seg.text}\n`;
    })
    .join('\n');
  return `WEBVTT\n\n${body}`;
}

function toTxt(segments: Segment[]): string {
  return segments.map((s) => s.text).join('\n');
}

export function SubtitleDownloaderClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<TranscriptResponse>();

  const handleValidUrl = (videoId: string) => {
    execute(`/api/youtube/transcript?v=${videoId}`);
  };

  const download = (format: 'srt' | 'vtt' | 'txt') => {
    if (!data) return;
    const map = {
      srt: { content: toSrt(data.segments), mime: 'text/plain', ext: 'srt' },
      vtt: { content: toVtt(data.segments), mime: 'text/vtt', ext: 'vtt' },
      txt: { content: toTxt(data.segments), mime: 'text/plain', ext: 'txt' },
    } as const;
    const { content, mime, ext } = map[format];
    downloadFile(content, `${data.videoId}-subtitles.${ext}`, mime);
  };

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={handleValidUrl}
        placeholder="Paste YouTube video URL..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
        submitLabel="Get subtitles"
      />

      {isLoading && <ToolLoading variant="text-block" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title="Subtitles ready">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {data.segments.length} caption line{data.segments.length !== 1 ? 's' : ''} · language:{' '}
              {data.language.toUpperCase()}
            </p>

            <div className="grid grid-cols-3 gap-2">
              {(['srt', 'vtt', 'txt'] as const).map((fmt) => (
                <Button key={fmt} variant="outline" onClick={() => download(fmt)} className="flex-col h-auto py-3">
                  <Download className="size-4 mb-1" />
                  <span className="text-xs uppercase">.{fmt}</span>
                </Button>
              ))}
            </div>

            <div className="max-h-80 overflow-y-auto rounded-lg border p-4 bg-muted/30 text-sm space-y-2">
              {data.segments.slice(0, 200).map((seg, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs text-muted-foreground shrink-0 pt-0.5 tabular-nums w-16 text-right font-mono">
                    {srtTime(seg.offset).slice(0, 8)}
                  </span>
                  <p className="text-sm leading-relaxed">{seg.text}</p>
                </div>
              ))}
              {data.segments.length > 200 && (
                <p className="text-xs text-muted-foreground pt-2">
                  Preview shows the first 200 lines. Downloads include all {data.segments.length}.
                </p>
              )}
            </div>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="subtitle-downloader" />
    </div>
  );
}
