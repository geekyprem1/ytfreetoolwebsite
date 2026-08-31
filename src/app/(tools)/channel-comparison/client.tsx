'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { formatNumber } from '@/lib/utils/format';
import { toast } from 'sonner';
import { Plus, X, Loader2 } from 'lucide-react';

interface CompareChannel {
  id: string;
  title: string;
  thumbnail: string;
  customUrl: string;
  country: string;
  publishedAt: string;
  subscriberCount: number;
  videoCount: number;
  viewCount: number;
}

function yearsActive(publishedAt: string): number {
  if (!publishedAt) return 0;
  const ms = Date.now() - new Date(publishedAt).getTime();
  return ms / (1000 * 60 * 60 * 24 * 365.25);
}

/** Highlight the best value in a numeric row. */
function bestIndex(values: number[]): number {
  let best = 0;
  values.forEach((v, i) => {
    if (v > values[best]!) best = i;
  });
  return best;
}

export function ChannelComparisonClient() {
  const [inputs, setInputs] = useState<string[]>(['', '']);
  const [channels, setChannels] = useState<CompareChannel[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setInput = (i: number, val: string) => {
    setInputs((prev) => prev.map((v, idx) => (idx === i ? val : v)));
  };

  const addField = () => {
    if (inputs.length < 3) setInputs((prev) => [...prev, '']);
  };

  const removeField = (i: number) => {
    setInputs((prev) => prev.filter((_, idx) => idx !== i));
  };

  const compare = async () => {
    const queries = inputs.map((s) => s.trim()).filter(Boolean);
    if (queries.length < 2) {
      toast.error('Enter at least two channels to compare.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.all(
        queries.map(async (q) => {
          const res = await fetch(`/api/youtube/channel-compare?c=${encodeURIComponent(q)}`);
          const json = await res.json();
          if (!res.ok || !json.success) {
            throw new Error(json.error?.message || `Could not load "${q}"`);
          }
          return json.data as CompareChannel;
        }),
      );
      setChannels(results);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Comparison failed.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const metrics: { label: string; values: number[]; format: (n: number) => string }[] =
    channels.length >= 2
      ? [
          {
            label: 'Subscribers',
            values: channels.map((c) => c.subscriberCount),
            format: formatNumber,
          },
          { label: 'Total views', values: channels.map((c) => c.viewCount), format: formatNumber },
          { label: 'Videos', values: channels.map((c) => c.videoCount), format: formatNumber },
          {
            label: 'Avg views / video',
            values: channels.map((c) => (c.videoCount > 0 ? Math.round(c.viewCount / c.videoCount) : 0)),
            format: formatNumber,
          },
          {
            label: 'Channel age (years)',
            values: channels.map((c) => Number(yearsActive(c.publishedAt).toFixed(1))),
            format: (n) => `${n}y`,
          },
        ]
      : [];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {inputs.map((val, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={val}
              onChange={(e) => setInput(i, e.target.value)}
              placeholder={`Channel ${i + 1} — URL, @handle, or UC… ID`}
              className="h-11 flex-1"
            />
            {inputs.length > 2 && (
              <Button variant="outline" size="icon" className="h-11 w-11 shrink-0" onClick={() => removeField(i)}>
                <X className="size-4" />
              </Button>
            )}
          </div>
        ))}
        <div className="flex gap-2">
          {inputs.length < 3 && (
            <Button variant="outline" onClick={addField} className="flex-1">
              <Plus className="size-4 mr-1.5" />
              Add channel
            </Button>
          )}
          <Button
            onClick={compare}
            disabled={loading}
            className="flex-1 bg-[#FF3B30] hover:bg-[#E0352B] text-white"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : 'Compare'}
          </Button>
        </div>
      </div>

      {error && <ToolError message={error} />}

      {channels.length >= 2 && (
        <ToolOutput title="Comparison">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 font-medium text-muted-foreground">Metric</th>
                  {channels.map((c) => (
                    <th key={c.id} className="p-2 text-center">
                      <div className="flex flex-col items-center gap-1">
                        {c.thumbnail && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={c.thumbnail} alt={c.title} className="size-9 rounded-full" />
                        )}
                        <span className="text-xs font-semibold line-clamp-2 max-w-[110px]">{c.title}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map((row) => {
                  const winner = bestIndex(row.values);
                  return (
                    <tr key={row.label} className="border-t">
                      <td className="p-2 text-muted-foreground">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className={`p-2 text-center font-medium tabular-nums ${
                            i === winner ? 'text-[#FF3B30] font-semibold' : ''
                          }`}
                        >
                          {row.format(v)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Highlighted values lead each row. Average views per video and channel age are computed from
            public totals, not YouTube Studio data.
          </p>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="channel-comparison" />
    </div>
  );
}
