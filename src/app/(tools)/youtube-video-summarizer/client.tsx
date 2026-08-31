'use client';

import { useState, useCallback } from 'react';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { useToolApi } from '@/hooks/use-tool-api';

interface TranscriptResponse {
  videoId: string;
  fullText: string;
}

interface SummaryResponse {
  summary: string[];
  totalDuration?: string;
}

export function VideoSummarizerClient({ initialUrl }: { initialUrl?: string }) {
  const transcript = useToolApi<TranscriptResponse>();
  const summary = useToolApi<SummaryResponse>();
  const [stage, setStage] = useState<'idle' | 'transcript' | 'summary'>('idle');
  const [failedStep, setFailedStep] = useState<string | null>(null);

  const run = useCallback(
    async (videoId: string) => {
      setFailedStep(null);
      setStage('transcript');
      const t = await transcript.execute(`/api/youtube/transcript?v=${videoId}`);
      if (!t?.fullText) {
        setFailedStep('transcript');
        setStage('idle');
        return;
      }
      setStage('summary');
      await summary.execute('/api/ai/summarize-transcript', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: t.fullText }),
      });
      setStage('idle');
    },
    [transcript, summary],
  );

  const busy = stage !== 'idle';
  const summaryText = summary.data?.summary
    ? summary.data.summary.map((s) => `• ${s}`).join('\n')
    : '';

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={run}
        placeholder="Paste YouTube video URL..."
        disabled={busy}
        initialUrl={initialUrl}
        autoSubmit
        submitLabel="Summarize"
      />

      {stage === 'transcript' && <ToolLoading variant="text-block" />}
      {stage === 'summary' && (
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          Transcript loaded. Summarizing with AI…
        </div>
      )}

      {failedStep === 'transcript' && transcript.error && (
        <ToolError
          message={`${transcript.error} A summary needs captions; this video may not have any.`}
          onRetry={() => transcript.reset()}
        />
      )}
      {summary.error && <ToolError message={summary.error} onRetry={() => summary.reset()} />}

      {summary.data && !busy && (
        <ToolOutput title="AI summary">
          <div className="space-y-4">
            <OutputActions
              copyText={summaryText}
              copyLabel="Summary"
              downloadContent={summaryText}
              downloadFilename={`${transcript.data?.videoId ?? 'video'}-summary.txt`}
            />
            <ul className="space-y-2">
              {summary.data.summary.map((point, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="text-primary shrink-0">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-video-summarizer" />
    </div>
  );
}
