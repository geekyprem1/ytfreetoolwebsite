'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToolApi } from '@/hooks/use-tool-api';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { downloadFile } from '@/lib/utils/download';
import {
  clockTime,
  formatMeta,
  formatTranscript,
  languageName,
  transcriptStats,
  type TranscriptFormat,
  type TranscriptSegment,
} from '@/lib/youtube/transcript-format';

interface TranscriptResponse {
  videoId: string;
  language: string;
  availableLanguages?: string[];
  segments: TranscriptSegment[];
  fullText: string;
}

interface SummaryResponse {
  summary: string[];
}

const FORMATS: TranscriptFormat[] = ['txt', 'srt', 'vtt', 'json'];

export function TranscriptExtractorClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<TranscriptResponse>();
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
    execute: summarize,
  } = useToolApi<SummaryResponse>();
  const { copy } = useCopyToClipboard();
  const [manualText, setManualText] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [timestamps, setTimestamps] = useState(true);

  const fetchTranscript = (videoId: string, lang?: string) =>
    execute(`/api/youtube/transcript?v=${videoId}${lang ? `&lang=${encodeURIComponent(lang)}` : ''}`);

  const handleValidUrl = (videoId: string) => {
    setShowManual(false);
    fetchTranscript(videoId);
  };

  const handleSummarize = () => {
    const text = data?.fullText || manualText;
    if (!text) return;
    summarize('/api/ai/summarize-transcript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript: text }),
    });
  };

  const hasTranscriptError = !!error && !showManual;
  const stats = data ? transcriptStats(data.segments) : null;
  const meta = data ? { videoId: data.videoId, language: data.language, timestamps } : null;
  const plainText = data && meta ? formatTranscript('txt', data.segments, meta) : '';

  const download = (format: TranscriptFormat) => {
    if (!data || !meta) return;
    const { ext, mime } = formatMeta[format];
    downloadFile(formatTranscript(format, data.segments, meta), `${data.videoId}-transcript-${data.language}.${ext}`, mime);
  };

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={handleValidUrl}
        placeholder="Paste YouTube video URL..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
      />

      {hasTranscriptError && (
        <div className="space-y-3">
          <ToolError
            message={error}
            onRetry={() => {
              setShowManual(true);
              reset();
            }}
          />
          {showManual && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Paste the transcript manually below:</p>
              <Textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Paste your transcript here..."
                rows={8}
              />
            </div>
          )}
        </div>
      )}

      {isLoading && <ToolLoading variant="text-block" />}

      {data && stats && !isLoading && (
        <ToolOutput>
          <div className="space-y-4">
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
              {[
                ['Words', stats.words.toLocaleString('en-US')],
                ['Characters', stats.characters.toLocaleString('en-US')],
                ['Reading time', `${Math.max(1, Math.round(stats.readingMinutes))} min`],
                ['Video covered', clockTime(stats.coveredSeconds)],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border px-3 py-2">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="font-semibold tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <label className="inline-flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={timestamps}
                  onChange={(e) => setTimestamps(e.target.checked)}
                  className="size-4 accent-[#FF3B30]"
                />
                Show timestamps
              </label>

              {data.availableLanguages && data.availableLanguages.length > 1 ? (
                <label className="inline-flex items-center gap-2 text-sm">
                  Language
                  <select
                    value={data.language}
                    onChange={(e) => fetchTranscript(data.videoId, e.target.value)}
                    className="h-8 rounded-lg border bg-background px-2 text-sm"
                  >
                    {data.availableLanguages.map((code) => (
                      <option key={code} value={code}>
                        {languageName(code)}
                      </option>
                    ))}
                  </select>
                </label>
              ) : (
                <span className="text-sm text-muted-foreground">Language: {languageName(data.language)}</span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => copy(plainText, 'Transcript')}>
                Copy text
              </Button>
              {FORMATS.map((fmt) => (
                <Button key={fmt} variant="outline" size="sm" onClick={() => download(fmt)}>
                  <Download aria-hidden className="size-3.5 mr-1.5" />
                  {formatMeta[fmt].label}
                  <span className="sr-only"> download</span>
                </Button>
              ))}
              <Button variant="outline" size="sm" onClick={handleSummarize} disabled={summaryLoading}>
                {summaryLoading ? 'Summarizing...' : '🤖 AI Summarize'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              TXT follows the timestamp toggle. SRT and VTT always include cue timings; JSON includes start, end and
              duration for every line.
            </p>

            <div className="max-h-96 overflow-y-auto rounded-lg border p-4 bg-muted/30 text-sm">
              {timestamps ? (
                <div className="space-y-2">
                  {data.segments.map((seg, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-xs text-muted-foreground shrink-0 pt-0.5 tabular-nums w-14 text-right">
                        {clockTime(seg.offset)}
                      </span>
                      <p className="text-sm leading-relaxed">{seg.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3 whitespace-pre-line leading-relaxed">{plainText}</div>
              )}
            </div>
          </div>
        </ToolOutput>
      )}

      {summaryData && (
        <ToolOutput title="AI Summary">
          <ul className="space-y-1">
            {Array.isArray(summaryData.summary) ? summaryData.summary.map((s, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                {s}
              </li>
            )) : (
              <p className="text-sm leading-relaxed">{String(summaryData.summary)}</p>
            )}
          </ul>
        </ToolOutput>
      )}

      {summaryError && <ToolError message={summaryError} />}

      <RelatedTools currentSlug="transcript-extractor" />
    </div>
  );
}
