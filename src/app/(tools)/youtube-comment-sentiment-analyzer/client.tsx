'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Copy, Download, MessageSquareText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RelatedTools } from '@/components/tools/related-tools';
import { ToolError } from '@/components/tools/tool-error';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolOutput } from '@/components/tools/tool-output';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { useToolApi } from '@/hooks/use-tool-api';
import { downloadFile } from '@/lib/utils/download';
import type { CommentSentiment, CommentSentimentAnalysis } from '@/lib/ai/comment-sentiment';

const sentiments: { key: CommentSentiment; label: string; color: string; bar: string }[] = [
  { key: 'positive', label: 'Positive', color: 'text-emerald-700 dark:text-emerald-300', bar: 'bg-emerald-500' },
  { key: 'negative', label: 'Negative', color: 'text-rose-700 dark:text-rose-300', bar: 'bg-rose-500' },
  { key: 'neutral', label: 'Neutral', color: 'text-slate-700 dark:text-slate-300', bar: 'bg-slate-500' },
  { key: 'mixed', label: 'Mixed', color: 'text-amber-700 dark:text-amber-300', bar: 'bg-amber-500' },
  { key: 'unclear', label: 'Unclear', color: 'text-violet-700 dark:text-violet-300', bar: 'bg-violet-500' },
];

function formatSummary(result: CommentSentimentAnalysis): string {
  const counts = sentiments.map(({ key, label }) =>
    `${label}: ${result.counts[key]} (${result.percentages[key]}%)`,
  );
  const themes = result.themes.map((theme) => `- ${theme.name}: ${theme.count}`).join('\n');
  const examples = result.representatives
    .map((item) => `- ${item.sentiment}: ${item.text}`)
    .join('\n');

  return [
    result.videoTitle || 'YouTube comment sentiment',
    `${result.analyzedCount} comments analyzed from a maximum sample of ${result.sampleLimit}.`,
    `Sampling method: ${result.sampleMethod}.`,
    '',
    'Sentiment split:',
    ...counts,
    '',
    'Recurring themes:',
    themes || '- No themes returned.',
    '',
    'Representative sample comments:',
    examples || '- No comments available.',
    '',
    'This AI-assisted summary describes only the displayed sample, not every viewer. Sarcasm, mixed language and short comments can be misread.',
  ].join('\n');
}

function formatFetchedAt(timestamp: number): string {
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(timestamp);
}

export function CommentSentimentAnalyzerClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<CommentSentimentAnalysis>();
  const [lastVideoId, setLastVideoId] = useState('');

  const analyze = (videoId: string) => {
    setLastVideoId(videoId);
    reset();
    void execute('/api/ai/analyze-comment-sentiment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId }),
    });
  };

  const handleCopy = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(formatSummary(data));
      toast.success('Summary copied');
    } catch {
      toast.error('Could not access the clipboard. Download the summary instead.');
    }
  };

  return (
    <div className="space-y-5">
      <YouTubeUrlInput
        onValidUrl={analyze}
        placeholder="Paste a public YouTube video URL..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
        submitLabel="Analyze comments"
      />
      <p className="text-xs text-muted-foreground">Video URLs only. We analyze up to 40 top-level comments returned in YouTube relevance order.</p>

      {isLoading && (
        <div aria-live="polite" aria-busy="true">
          <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
            <MessageSquareText className="size-4" /> Loading a small comment sample and classifying its tone…
          </p>
          <ToolLoading variant="list" />
        </div>
      )}
      {error && <ToolError message={error} onRetry={() => lastVideoId && analyze(lastVideoId)} />}

      {data && !isLoading && (
        <ToolOutput title={data.videoTitle || 'Comment sentiment summary'}>
          {data.status === 'empty' ? (
            <div className="rounded-xl border border-dashed border-border p-6">
              <h3 className="font-semibold">No readable public comments were returned.</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Comments may be disabled, unavailable to the public, or empty. The analyzer did not create a sentiment score.
              </p>
            </div>
          ) : (
            <div className="space-y-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium">{data.analyzedCount} comments analyzed</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Sample fetched {formatFetchedAt(data.fetchedAt)} · Analysis run {formatFetchedAt(data.analyzedAt)}
                  </p>
                  {data.moreCommentsAvailable && (
                    <p className="mt-1 text-xs text-muted-foreground">More comments are available; this result uses only the bounded sample.</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="size-3.5" /> Copy summary
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(formatSummary(data), `${data.videoId}-comment-sentiment.txt`)}
                  >
                    <Download className="size-3.5" /> Download
                  </Button>
                </div>
              </div>

              <section aria-labelledby="sentiment-split-heading">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 id="sentiment-split-heading" className="text-display text-lg font-semibold">Sentiment split</h3>
                  <p className="text-xs text-muted-foreground">Share of this sample · whole percentages add to 100%</p>
                </div>
                <div className="flex h-3 overflow-hidden rounded-full bg-muted" role="img" aria-label={sentiments.map(({ key, label }) => `${label} ${data.counts[key]} comments, ${data.percentages[key]} percent`).join('; ')}>
                  {sentiments.map(({ key, bar }) => data.percentages[key] > 0 && (
                    <span key={key} className={bar} style={{ width: `${data.percentages[key]}%` }} />
                  ))}
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  {sentiments.map(({ key, label, color }) => (
                    <li key={key} className="rounded-lg border border-border/70 bg-card px-3 py-2">
                      <p className={`text-xs font-medium ${color}`}>{label}</p>
                      <p className="mt-1 text-lg font-semibold tabular-nums">{data.percentages[key]}<span className="text-sm">%</span></p>
                      <p className="text-xs text-muted-foreground">{data.counts[key]} comments</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="themes-heading">
                <h3 id="themes-heading" className="mb-3 text-display text-lg font-semibold">Recurring themes in the sample</h3>
                {data.themes.length > 0 ? (
                  <ul className="divide-y divide-border/60 rounded-xl border border-border/70 px-4">
                    {data.themes.map((theme) => (
                      <li key={theme.name} className="flex items-center justify-between gap-3 py-3 text-sm">
                        <span>{theme.name}</span>
                        <span className="shrink-0 font-mono text-xs text-muted-foreground">{theme.count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No recurring topic stood out in this sample.</p>
                )}
              </section>

              {data.representatives.length > 0 && (
                <section aria-labelledby="examples-heading">
                  <h3 id="examples-heading" className="mb-3 text-display text-lg font-semibold">Comments that illustrate the sample</h3>
                  <div className="space-y-3">
                    {data.representatives.map((comment) => {
                      const sentiment = sentiments.find((item) => item.key === comment.sentiment)!;
                      return (
                        <blockquote key={comment.sentiment} className="rounded-xl border border-border/70 bg-muted/20 p-4">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className={`text-xs font-semibold capitalize ${sentiment.color}`}>{comment.sentiment}</span>
                            <span className="text-xs text-muted-foreground">{comment.likeCount.toLocaleString()} likes in sample</span>
                          </div>
                          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">“{comment.text}”</p>
                        </blockquote>
                      );
                    })}
                  </div>
                </section>
              )}

              <aside className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4 text-sm leading-relaxed text-muted-foreground">
                This is an AI-assisted estimate of up to {data.sampleLimit} top-level comments in YouTube relevance order, not a random or complete sample of viewers. It does not include replies. Sarcasm, short comments, emojis, and code-switching between English, Hindi, and Hinglish can be misread; mixed or unclear labels make uncertainty visible.
              </aside>
            </div>
          )}
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-comment-sentiment-analyzer" />
    </div>
  );
}
