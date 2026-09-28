'use client';

import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { useToolApi } from '@/hooks/use-tool-api';
import { downloadFile } from '@/lib/utils/download';
import {
  clockTime,
  formatMeta,
  formatTranscript,
  languageName,
  type TranscriptFormat,
  type TranscriptSegment,
} from '@/lib/youtube/transcript-format';
import { Download } from 'lucide-react';

interface TranscriptResponse {
  videoId: string;
  language: string;
  availableLanguages?: string[];
  segments: TranscriptSegment[];
  fullText: string;
}

const FORMATS: TranscriptFormat[] = ['srt', 'vtt', 'txt', 'json'];

export function SubtitleDownloaderClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<TranscriptResponse>();

  const handleValidUrl = (videoId: string) => {
    execute(`/api/youtube/transcript?v=${videoId}`);
  };

  const download = (format: TranscriptFormat) => {
    if (!data) return;
    const { ext, mime } = formatMeta[format];
    const content = formatTranscript(format, data.segments, { videoId: data.videoId, language: data.language });
    downloadFile(content, `${data.videoId}-subtitles-${data.language}.${ext}`, mime);
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
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>
                {data.segments.length} caption line{data.segments.length !== 1 ? 's' : ''} ·{' '}
                {languageName(data.language)}
              </span>
              {data.availableLanguages && data.availableLanguages.length > 1 ? (
                <label className="inline-flex items-center gap-2">
                  <span className="sr-only">Caption language</span>
                  <select
                    value={data.language}
                    onChange={(e) =>
                      execute(`/api/youtube/transcript?v=${data.videoId}&lang=${encodeURIComponent(e.target.value)}`)
                    }
                    className="h-8 rounded-lg border bg-background px-2 text-sm text-foreground"
                  >
                    {data.availableLanguages.map((code) => (
                      <option key={code} value={code}>
                        {languageName(code)}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FORMATS.map((fmt) => (
                <Button key={fmt} variant="outline" onClick={() => download(fmt)} className="flex-col h-auto py-3">
                  <Download aria-hidden className="size-4 mb-1" />
                  <span className="text-xs">.{formatMeta[fmt].ext}</span>
                  <span className="sr-only"> download</span>
                </Button>
              ))}
            </div>

            <div className="max-h-80 overflow-y-auto rounded-lg border p-4 bg-muted/30 text-sm space-y-2">
              {data.segments.slice(0, 200).map((seg, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-xs text-muted-foreground shrink-0 pt-0.5 tabular-nums w-16 text-right font-mono">
                    {clockTime(seg.offset)}
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
