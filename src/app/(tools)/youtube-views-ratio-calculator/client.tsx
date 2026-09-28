'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { ChannelLookupForm } from '@/components/tools/channel-lookup-form';
import { Input } from '@/components/ui/input';
import { useToolApi } from '@/hooks/use-tool-api';
import { cn } from '@/lib/utils';
import { formatNumber } from '@/lib/utils/format';
import { computeRatios, formatRatio, type RatioBenchmark, type RatioInput } from '@/lib/youtube/views-ratio';
import type { ChannelOverview } from '@/lib/youtube/types';

type Mode = 'channel' | 'manual';

function parseCount(s: string): number {
  const n = Number(s.replace(/[,\s_]/g, ''));
  return Number.isFinite(n) && n >= 0 ? n : NaN;
}

function Results({
  input,
  label,
  benchmark,
}: {
  input: RatioInput;
  label: string;
  benchmark: RatioBenchmark | null;
}) {
  const r = computeRatios(input);
  const summary = `${label}: ${formatRatio(r.viewsPerSubscriber)} views per subscriber, ${formatRatio(
    r.viewsPerVideo,
  )} views per video, average video reaches ${formatRatio(r.avgViewsPctOfSubs)}% of subscribers.`;

  const cards = [
    {
      label: 'Views per subscriber',
      value: formatRatio(r.viewsPerSubscriber),
      hint: 'Lifetime views ÷ subscribers',
      bench: benchmark ? formatRatio(benchmark.medianViewsPerSubscriber) : null,
    },
    {
      label: 'Avg. views per video',
      value: r.viewsPerVideo === null ? '—' : formatNumber(Math.round(r.viewsPerVideo)),
      hint: 'Lifetime views ÷ videos',
      bench: null,
    },
    {
      label: 'Avg. video reach',
      value: r.avgViewsPctOfSubs === null ? '—' : `${formatRatio(r.avgViewsPctOfSubs)}%`,
      hint: 'Avg. views per video as % of subscribers',
      bench: benchmark ? `${formatRatio(benchmark.medianAvgViewsPctOfSubs)}%` : null,
    },
    {
      label: 'Subscribers per video',
      value: formatRatio(r.subscribersPerVideo),
      hint: 'Subscribers ÷ videos',
      bench: null,
    },
  ];

  return (
    <ToolOutput title={label}>
      <div className="space-y-4">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3" aria-live="polite">
          {cards.map((c) => (
            <div key={c.label} className="rounded-xl border p-4">
              <dt className="text-xs text-muted-foreground">{c.label}</dt>
              <dd className="text-2xl font-semibold tabular-nums mt-0.5">{c.value}</dd>
              <dd className="text-xs text-muted-foreground mt-1">{c.hint}</dd>
              {c.bench ? (
                <dd className="text-xs mt-1.5">
                  Top-100 median: <span className="font-medium tabular-nums">{c.bench}</span>
                </dd>
              ) : null}
            </div>
          ))}
        </dl>
        {benchmark ? (
          <p className="text-xs text-muted-foreground">
            Medians come from the {benchmark.sampleSize} most subscribed channels in our{' '}
            <Link href="/youtube-rankings/most-subscribed" className="text-primary hover:underline">
              live YouTube rankings
            </Link>
            . Very large channels are not a target for small creators — compare against channels your size too.
          </p>
        ) : null}
        <OutputActions copyText={summary} copyLabel="Ratios" />
      </div>
    </ToolOutput>
  );
}

export function ViewsRatioCalculatorClient({ benchmark }: { benchmark: RatioBenchmark | null }) {
  const [mode, setMode] = useState<Mode>('channel');
  const [views, setViews] = useState('');
  const [subs, setSubs] = useState('');
  const [videos, setVideos] = useState('');
  const { data, isLoading, error, execute, reset } = useToolApi<ChannelOverview>();

  const lookup = (value: string) => execute(`/api/youtube/channel-overview?c=${encodeURIComponent(value)}`);

  const manual: RatioInput = { views: parseCount(views), subscribers: parseCount(subs), videos: parseCount(videos) };
  const manualValid = [manual.views, manual.subscribers, manual.videos].every((n) => Number.isFinite(n)) && manual.subscribers > 0;

  return (
    <div className="space-y-4">
      <div role="group" aria-label="Input mode" className="inline-flex rounded-xl border p-1 gap-1">
        {(
          [
            ['channel', 'From a channel'],
            ['manual', 'Enter numbers'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={mode === id}
            onClick={() => setMode(id)}
            className={cn(
              'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
              mode === id ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === 'channel' ? (
        <>
          <ChannelLookupForm onSubmit={lookup} isLoading={isLoading} buttonLabel="Calculate" />
          {isLoading && <ToolLoading variant="card" />}
          {error && <ToolError message={error} onRetry={reset} />}
          {data && !isLoading && (
            <>
              <p className="text-sm text-muted-foreground">
                {formatNumber(data.viewCount)} views · {formatNumber(data.subscriberCount)} subscribers ·{' '}
                {formatNumber(data.videoCount)} videos (public counts)
              </p>
              <Results
                label={data.title}
                input={{ views: data.viewCount, subscribers: data.subscriberCount, videos: data.videoCount }}
                benchmark={benchmark}
              />
            </>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(
              [
                ['Total views', views, setViews, 'e.g. 2,500,000'],
                ['Subscribers', subs, setSubs, 'e.g. 18,000'],
                ['Public videos', videos, setVideos, 'e.g. 120'],
              ] as const
            ).map(([label, value, set, ph]) => (
              <ToolInput key={label} label={label} required>
                <Input inputMode="numeric" value={value} onChange={(e) => set(e.target.value)} placeholder={ph} />
              </ToolInput>
            ))}
          </div>
          {manualValid ? (
            <Results label="Your channel" input={manual} benchmark={benchmark} />
          ) : (
            <p className="text-sm text-muted-foreground">Enter all three numbers (subscribers above 0) to see the ratios.</p>
          )}
        </>
      )}

      <RelatedTools currentSlug="youtube-views-ratio-calculator" />
    </div>
  );
}
