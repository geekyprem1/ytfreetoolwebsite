'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RelatedTools } from '@/components/tools/related-tools';
import { formatNumber, formatDuration } from '@/lib/utils/format';
import { trendingRegions } from '@/content/trending-regions';

interface TrendingVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnail: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  duration: string;
}

export function TrendingView({
  regionSlug,
  regionName,
  videos,
}: {
  regionSlug: string;
  regionName: string;
  videos: TrendingVideo[];
}) {
  const router = useRouter();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor="region" className="text-sm text-muted-foreground">
          Country:
        </label>
        <select
          id="region"
          value={regionSlug}
          onChange={(e) => router.push(`/youtube-trending/${e.target.value}`)}
          className="h-9 rounded-lg border bg-background px-3 text-sm"
        >
          {trendingRegions.map((r) => (
            <option key={r.code} value={r.slug}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {videos.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Trending data for {regionName} is unavailable right now. Try another country.
        </p>
      ) : (
        <ol className="space-y-2">
          {videos.map((v, i) => (
            <li key={v.id}>
              <a
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 rounded-lg border p-2.5 hover:bg-muted/40 transition-colors"
              >
                <span className="text-sm font-semibold text-muted-foreground w-6 shrink-0 text-right pt-1">
                  {i + 1}
                </span>
                {v.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={v.thumbnail} alt={v.title} className="w-28 rounded object-cover shrink-0" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium line-clamp-2">{v.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{v.channelTitle}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatNumber(v.viewCount)} views · {formatNumber(v.likeCount)} likes ·{' '}
                    {formatDuration(v.duration)}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ol>
      )}

      <p className="text-xs text-muted-foreground">
        Trending list refreshes a few times a day. See other countries above, or explore{' '}
        <Link href="/youtube-trending" className="text-primary hover:underline">
          all regions
        </Link>
        .
      </p>

      <RelatedTools currentSlug="youtube-trending" />
    </div>
  );
}
