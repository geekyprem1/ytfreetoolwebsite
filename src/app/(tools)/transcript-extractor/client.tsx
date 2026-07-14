'use client';

import { useState } from 'react';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToolApi } from '@/hooks/use-tool-api';

interface TranscriptResponse {
  videoId: string;
  language: string;
  segments: { text: string; duration: number; offset: number }[];
  fullText: string;
}

interface SummaryResponse {
  summary: string[];
}

export function TranscriptExtractorClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<TranscriptResponse>();
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
    execute: summarize,
  } = useToolApi<SummaryResponse>();
  const [lang, setLang] = useState('en');
  const [manualText, setManualText] = useState('');
  const [showManual, setShowManual] = useState(false);

  const handleValidUrl = (videoId: string) => {
    setShowManual(false);
    execute(`/api/youtube/transcript?v=${videoId}`);
  };

  const handleLangChange = (newLang: string) => {
    setLang(newLang);
    if (data?.videoId) {
      execute(`/api/youtube/transcript?v=${data.videoId}&lang=${newLang}`);
    }
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

      {data && !isLoading && (
        <ToolOutput>
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <OutputActions
                copyText={data.fullText}
                copyLabel="Transcript"
                downloadContent={data.fullText}
                downloadFilename={`${data.videoId}-transcript.txt`}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleSummarize}
                disabled={summaryLoading}
              >
                {summaryLoading ? 'Summarizing...' : '🤖 AI Summarize'}
              </Button>
            </div>

            <div className="max-h-96 overflow-y-auto rounded-lg border p-4 bg-muted/30 text-sm space-y-2">
              {data.segments.map((seg, i) => (
                <div key={i} className="flex gap-3 group">
                  <span className="text-xs text-muted-foreground shrink-0 pt-0.5 tabular-nums w-12 text-right">
                    {formatTime(seg.offset)}
                  </span>
                  <p className="text-sm leading-relaxed">{seg.text}</p>
                </div>
              ))}
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

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
