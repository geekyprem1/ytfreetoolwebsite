'use client';

import { useState, useMemo } from 'react';
import { YouTubeUrlInput } from '@/components/tools/youtube-url-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToolApi } from '@/hooks/use-tool-api';
import { downloadFile } from '@/lib/utils/download';
import { Download } from 'lucide-react';

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

type SortKey = 'likes' | 'newest' | 'oldest';

function toCsv(comments: Comment[]): string {
  const header = 'author,likes,published_at,text';
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const rows = comments.map(
    (c) => `${esc(c.author)},${c.likeCount},${esc(c.publishedAt)},${esc(c.text)}`,
  );
  return [header, ...rows].join('\n');
}

export function CommentExporterClient({ initialUrl }: { initialUrl?: string }) {
  const { data, isLoading, error, execute, reset } = useToolApi<CommentsResponse>();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('likes');

  const handleValidUrl = (videoId: string) => {
    execute(`/api/youtube/comments?v=${videoId}`);
  };

  const rows = useMemo(() => {
    if (!data) return [];
    let list = [...data.comments];
    const q = search.trim().toLowerCase();
    if (q) list = list.filter((c) => c.text.toLowerCase().includes(q) || c.author.toLowerCase().includes(q));
    list.sort((a, b) => {
      if (sort === 'likes') return b.likeCount - a.likeCount;
      const at = new Date(a.publishedAt).getTime();
      const bt = new Date(b.publishedAt).getTime();
      return sort === 'newest' ? bt - at : at - bt;
    });
    return list;
  }, [data, search, sort]);

  return (
    <div className="space-y-4">
      <YouTubeUrlInput
        onValidUrl={handleValidUrl}
        placeholder="Paste YouTube video URL..."
        disabled={isLoading}
        initialUrl={initialUrl}
        autoSubmit
        submitLabel="Load comments"
      />

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={() => reset()} />}

      {data && !isLoading && (
        <ToolOutput title={data.videoTitle || 'Comments'}>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground">
                {data.totalFetched.toLocaleString()} comments
                {data.truncated ? ' (capped)' : ''} · {rows.length} shown
              </span>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={rows.length === 0}
                  onClick={() => downloadFile(toCsv(rows), `${data.videoId}-comments.csv`, 'text/csv')}
                >
                  <Download className="size-3.5 mr-1.5" />
                  CSV
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={rows.length === 0}
                  onClick={() =>
                    downloadFile(JSON.stringify(rows, null, 2), `${data.videoId}-comments.json`, 'application/json')
                  }
                >
                  <Download className="size-3.5 mr-1.5" />
                  JSON
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search comments or authors..."
                className="flex-1"
              />
              <div className="flex gap-1">
                {(['likes', 'newest', 'oldest'] as const).map((k) => (
                  <Button
                    key={k}
                    variant={sort === k ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSort(k)}
                    className="capitalize"
                  >
                    {k}
                  </Button>
                ))}
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto divide-y divide-border/60 rounded-lg border">
              {rows.slice(0, 300).map((c) => (
                <div key={c.id} className="p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium truncate">{c.author}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{c.likeCount} likes</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{c.text}</p>
                </div>
              ))}
              {rows.length > 300 && (
                <p className="p-3 text-xs text-muted-foreground">
                  Preview shows 300 rows. Exports include all {rows.length}.
                </p>
              )}
            </div>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-comment-exporter" />
    </div>
  );
}
