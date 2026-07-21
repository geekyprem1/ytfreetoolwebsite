'use client';

import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Separator } from '@/components/ui/separator';
import { useToolApi } from '@/hooks/use-tool-api';
import {
  Users,
  Eye,
  Video,
  Calendar,
  Globe,
  CheckCircle2,
  XCircle,
  MinusCircle,
  AlertTriangle,
} from 'lucide-react';
import type {
  MonetizationPrediction,
  MonetizationSignal,
  MonetizationSignalStatus,
} from '@/lib/youtube/types';

interface VideoAdRow {
  videoId: string;
  title: string;
  thumbnail: string;
  checked: boolean;
  ads: boolean;
  ytAd: boolean | null;
  preroll: boolean;
  midroll: boolean;
  postroll: boolean;
  superThanks: boolean | null;
}

interface MonetizationCheckResponse {
  channel: {
    id: string;
    title: string;
    thumbnail: string;
    customUrl: string;
    country: string | null;
    publishedAt: string | null;
    publishedLabel: string | null;
    subscriberCount: string;
    videoCount: string;
    viewCount: string;
    madeForKids: boolean | null;
  };
  latestUpload: {
    videoId: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
    publishedLabel: string;
    viewCount: string;
  } | null;
  videoAdBreakdown: VideoAdRow[];
  estimate: {
    prediction: MonetizationPrediction;
    monetizationLabel: 'ON' | 'OFF';
    adStatus: string;
    memberships: string;
    status: string;
    confidence: number;
    probability: number;
    summary: string;
    signals: MonetizationSignal[];
  };
  disclaimer: string;
}

function onOffStyles(on: boolean): string {
  return on
    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200'
    : 'border-rose-500/35 bg-rose-500/8 text-rose-950 dark:text-rose-200';
}

function signalIcon(status: MonetizationSignalStatus) {
  if (status === 'detected') return CheckCircle2;
  if (status === 'not_detected') return XCircle;
  return MinusCircle;
}

function signalLabel(status: MonetizationSignalStatus): string {
  if (status === 'detected') return 'Detected';
  if (status === 'not_detected') return 'Not detected';
  return 'Unavailable';
}

function signalTone(status: MonetizationSignalStatus): string {
  if (status === 'detected') return 'text-emerald-700 dark:text-emerald-400';
  if (status === 'not_detected') return 'text-muted-foreground';
  return 'text-amber-700 dark:text-amber-400';
}

export function MonetizationCheckerClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<MonetizationCheckResponse>();

  const handleValidUrl = (channelId: string) => {
    execute(`/api/youtube/monetization-check?c=${encodeURIComponent(channelId)}`);
  };

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={handleValidUrl}
        placeholder="Paste channel or video URL, @handle, or channel ID..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
        submitLabel="Check"
      />

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <div className="space-y-4">
          <ToolOutput title="Monetization checker">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                {data.channel.thumbnail && (
                  <img
                    src={data.channel.thumbnail}
                    alt={data.channel.title}
                    className="size-16 rounded-full shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="text-base font-semibold truncate">{data.channel.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {data.channel.customUrl || data.channel.id}
                  </p>
                </div>
              </div>

              <div
                className={`rounded-xl border p-5 ${onOffStyles(data.estimate.monetizationLabel === 'ON')}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.08em] opacity-80 mb-1">
                      Channel monetization status
                    </p>
                    <p className="text-4xl sm:text-5xl font-bold tracking-tight">
                      {data.estimate.monetizationLabel}
                    </p>
                    <p className="mt-2 text-sm opacity-90">
                      Estimated {data.estimate.prediction} · {data.estimate.status}
                    </p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs uppercase tracking-[0.08em] opacity-80 mb-1">Confidence</p>
                    <p className="text-3xl font-semibold tabular-nums">{data.estimate.confidence}%</p>
                  </div>
                </div>
                <div className="mt-4 h-2.5 rounded-full bg-background/55 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-current opacity-75 transition-all"
                    style={{ width: `${data.estimate.confidence}%` }}
                  />
                </div>
                <p className="mt-3 text-sm opacity-90 leading-relaxed">{data.estimate.summary}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <StatusTile label="Channel ad status" value={data.estimate.adStatus} />
                <StatusTile label="Memberships / Join" value={data.estimate.memberships} />
                <StatusTile
                  label="Prediction"
                  value={data.estimate.prediction === 'YES' ? 'Monetized' : 'Not monetized'}
                />
              </div>

              <div className="flex gap-2.5 rounded-lg border border-amber-500/25 bg-amber-500/5 p-3 text-sm text-amber-950 dark:text-amber-100">
                <AlertTriangle className="size-4 shrink-0 mt-0.5" />
                <p>{data.disclaimer}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatCard icon={Users} label="Subscribers" value={data.channel.subscriberCount} />
                <StatCard icon={Video} label="Total videos" value={data.channel.videoCount} />
                <StatCard icon={Eye} label="Total views" value={data.channel.viewCount} />
                <StatCard icon={Globe} label="Country" value={data.channel.country || 'N/A'} />
                <StatCard
                  icon={Calendar}
                  label="Created"
                  value={data.channel.publishedLabel || 'N/A'}
                />
                <StatCard
                  icon={Calendar}
                  label="Latest upload"
                  value={data.latestUpload?.publishedLabel || 'N/A'}
                />
              </div>

              {data.videoAdBreakdown?.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">Recent video ad check</h4>
                    <p className="text-xs text-muted-foreground">
                      Public watch-page scan for ad placements (pre-roll / mid-roll / post-roll) —
                      same signal class as YTLarge.
                    </p>
                    <ul className="space-y-2">
                      {data.videoAdBreakdown.map((row) => (
                        <li
                          key={row.videoId}
                          className="flex items-center gap-3 rounded-lg border p-2"
                        >
                          {row.thumbnail ? (
                            <img
                              src={row.thumbnail}
                              alt=""
                              className="size-14 rounded object-cover shrink-0"
                            />
                          ) : (
                            <div className="size-14 rounded bg-muted shrink-0" />
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{row.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {!row.checked
                                ? 'Check failed'
                                : [
                                    row.ads ? 'Ads: yes' : 'Ads: no',
                                    row.preroll ? 'pre-roll' : null,
                                    row.midroll ? 'mid-roll' : null,
                                    row.postroll ? 'post-roll' : null,
                                    row.superThanks ? 'Super Thanks' : null,
                                  ]
                                    .filter(Boolean)
                                    .join(' · ')}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-semibold shrink-0 ${
                              row.ads
                                ? 'text-emerald-700 dark:text-emerald-400'
                                : 'text-muted-foreground'
                            }`}
                          >
                            {row.checked ? (row.ads ? 'ADS ON' : 'ADS OFF') : 'N/A'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              <Separator />

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Signals analyzed</h4>
                <ul className="space-y-2">
                  {data.estimate.signals.map((signal) => {
                    const Icon = signalIcon(signal.status);
                    return (
                      <li key={signal.id} className="rounded-lg border p-3 space-y-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-sm font-medium">{signal.label}</p>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-medium shrink-0 ${signalTone(signal.status)}`}
                          >
                            <Icon className="size-3.5" />
                            {signalLabel(signal.status)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{signal.detail}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </ToolOutput>
        </div>
      )}

      <RelatedTools currentSlug="monetization-checker" />
    </div>
  );
}

function StatusTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-3 space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border p-3 space-y-1">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-semibold truncate">{value || 'N/A'}</p>
    </div>
  );
}
