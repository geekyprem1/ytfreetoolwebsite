'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { ChannelLookupForm } from '@/components/tools/channel-lookup-form';
import { useToolApi } from '@/hooks/use-tool-api';
import { computeChannelAge, formatCreationDate, perDay, perYear } from '@/lib/youtube/channel-age';
import { formatNumber } from '@/lib/utils/format';
import type { ChannelOverview } from '@/lib/youtube/types';

export function ChannelAgeCheckerClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<ChannelOverview>();
  const autoRan = useRef(false);

  const lookup = (value: string) => execute(`/api/youtube/channel-overview?c=${encodeURIComponent(value)}`);

  useEffect(() => {
    if (initialUrl && !autoRan.current) {
      autoRan.current = true;
      lookup(initialUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialUrl]);

  const age = data ? computeChannelAge(data.publishedAt) : null;
  const created = data?.publishedAt ? formatCreationDate(data.publishedAt) : '';
  const summary =
    data && age
      ? `${data.title} was created on ${created} and is ${age.label} old (${age.totalDays.toLocaleString('en-US')} days).`
      : '';

  return (
    <div className="space-y-4">
      <ChannelLookupForm onSubmit={lookup} isLoading={isLoading} buttonLabel="Check Age" initialValue={initialUrl} />

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && age && !isLoading && (
        <ToolOutput title={data.title}>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              {data.thumbnail && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.thumbnail} alt="" width={56} height={56} className="size-14 rounded-full" />
              )}
              <div className="min-w-0">
                {data.customUrl && <p className="text-sm text-muted-foreground">{data.customUrl}</p>}
                <p className="text-sm text-muted-foreground">
                  {formatNumber(data.subscriberCount)} subscribers · {formatNumber(data.videoCount)} videos
                </p>
              </div>
            </div>

            <div className="rounded-xl border bg-muted/20 p-5 text-center" aria-live="polite">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Channel age</p>
              <p className="text-2xl sm:text-3xl font-semibold tracking-tight">{age.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Created on <time dateTime={data.publishedAt}>{created}</time>
              </p>
            </div>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Total days', value: age.totalDays.toLocaleString('en-US') },
                { label: 'Videos per year', value: perYear(data.videoCount, age.totalDays).toFixed(1) },
                { label: 'Subscribers per day', value: formatNumber(Math.round(perDay(data.subscriberCount, age.totalDays))) },
                { label: 'Views per day', value: formatNumber(Math.round(perDay(data.viewCount, age.totalDays))) },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border p-3">
                  <dt className="text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="text-lg font-semibold tabular-nums">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-muted-foreground">
              Per-day and per-year figures are lifetime averages from public counts. Growth is rarely even — see{' '}
              <Link href="/youtube-rankings/fastest-growing" className="text-primary hover:underline">
                fastest growing channels
              </Link>{' '}
              for recent momentum.
            </p>

            <OutputActions copyText={summary} copyLabel="Channel age" />
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-channel-age-checker" />
    </div>
  );
}
