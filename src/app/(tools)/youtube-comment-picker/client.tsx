'use client';

import { useState, useMemo } from 'react';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToolApi } from '@/hooks/use-tool-api';
import { Gift, Trophy } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  authorChannelUrl: string;
  text: string;
  likeCount: number;
  publishedAt: string;
}

interface CommentsResponse {
  videoId: string;
  videoTitle: string;
  totalFetched: number;
  truncated: boolean;
  comments: Comment[];
}

/** Deterministic string hash -> 32-bit int, used to seed the shuffle for reproducibility. */
function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Mulberry32 PRNG for a repeatable draw from a seed. */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function CommentPickerClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<CommentsResponse>();

  const [keyword, setKeyword] = useState('');
  const [minLikes, setMinLikes] = useState('0');
  const [dedupe, setDedupe] = useState(true);
  const [winnerCount, setWinnerCount] = useState('1');
  const [draw, setDraw] = useState<{ winners: Comment[]; seed: string; at: string } | null>(null);

  const handleValidUrl = (videoId: string) => {
    setDraw(null);
    execute(`/api/youtube/comments?v=${videoId}`);
  };

  const eligible = useMemo(() => {
    if (!data) return [];
    let list = data.comments;
    const kw = keyword.trim().toLowerCase();
    const min = parseInt(minLikes) || 0;
    if (kw) list = list.filter((c) => c.text.toLowerCase().includes(kw));
    if (min > 0) list = list.filter((c) => c.likeCount >= min);
    if (dedupe) {
      const seen = new Set<string>();
      list = list.filter((c) => {
        const key = c.authorChannelUrl || c.author;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }
    return list;
  }, [data, keyword, minLikes, dedupe]);

  const pickWinners = () => {
    const count = Math.max(1, Math.min(parseInt(winnerCount) || 1, eligible.length));
    const seed = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const rng = mulberry32(hashSeed(seed));
    const pool = [...eligible];
    // Fisher–Yates using the seeded PRNG.
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j]!, pool[i]!];
    }
    setDraw({ winners: pool.slice(0, count), seed, at: new Date().toISOString() });
  };

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={handleValidUrl}
        placeholder="Paste the giveaway video URL..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
        submitLabel="Load comments"
      />

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={data.videoTitle || 'Comments loaded'}>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {data.totalFetched.toLocaleString()} comments loaded
              {data.truncated ? ' (capped for very large videos)' : ''} · {eligible.length} eligible after
              filters
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ToolInput label="Must contain keyword" description="Optional, case-insensitive">
                <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. done" />
              </ToolInput>
              <ToolInput label="Minimum likes">
                <Input type="number" min="0" value={minLikes} onChange={(e) => setMinLikes(e.target.value)} />
              </ToolInput>
              <ToolInput label="Number of winners">
                <Input type="number" min="1" value={winnerCount} onChange={(e) => setWinnerCount(e.target.value)} />
              </ToolInput>
              <label className="flex items-center gap-2 rounded-lg border p-2.5 cursor-pointer hover:bg-muted/40 self-end">
                <input type="checkbox" checked={dedupe} onChange={(e) => setDedupe(e.target.checked)} className="size-4 accent-[#FF3B30]" />
                <span className="text-sm">One entry per person</span>
              </label>
            </div>

            <Button
              onClick={pickWinners}
              disabled={eligible.length === 0}
              className="w-full bg-[#FF3B30] hover:bg-[#E0352B] text-white"
            >
              <Gift className="size-4 mr-2" />
              Pick {parseInt(winnerCount) > 1 ? `${parseInt(winnerCount)} winners` : 'a winner'}
            </Button>

            {draw && (
              <div className="space-y-3">
                {draw.winners.map((w, i) => (
                  <div key={w.id} className="rounded-xl border-2 border-[#FF3B30]/40 bg-[#FF3B30]/5 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="size-4 text-[#FF3B30]" />
                      <span className="text-sm font-semibold">
                        Winner{draw.winners.length > 1 ? ` #${i + 1}` : ''}: {w.author}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-3">{w.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">{w.likeCount} likes</p>
                  </div>
                ))}
                <div className="rounded-lg border bg-muted/20 p-3 text-xs text-muted-foreground space-y-1">
                  <p>
                    <strong className="text-foreground">Proof seed:</strong>{' '}
                    <span className="font-mono">{draw.seed}</span>
                  </p>
                  <p>
                    <strong className="text-foreground">Drawn at:</strong> {new Date(draw.at).toLocaleString()} ·
                    from {eligible.length} eligible entries
                  </p>
                  <p>Share this seed and time so entrants can verify the draw was not cherry-picked.</p>
                </div>
              </div>
            )}
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-comment-picker" />
    </div>
  );
}
