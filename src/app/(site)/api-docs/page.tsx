import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';

export const metadata: Metadata = {
  title: 'API Docs',
  description:
    'YT Toolkit read-only API reference: thumbnail, video stats, channel stats, and playlist endpoints. Free public YouTube data as JSON, with rate limits and examples.',
  alternates: { canonical: '/api-docs' },
  openGraph: {
    title: 'YT Toolkit API Docs',
    description: 'Read-only endpoints for public YouTube data as JSON. Rate limits and examples included.',
  },
};

export default function ApiDocsPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="API Docs"
      title="YT Toolkit API"
      description="A small set of read-only endpoints that return public YouTube data as JSON. Free to use within fair rate limits. No key required today; be a good neighbor."
      wide
    >
      <aside
        className="mb-4 rounded-xl border border-border/70 bg-muted/40 px-4 py-3 text-sm leading-relaxed not-prose"
        aria-label="Answer-First Summary"
      >
        <p className="text-caption font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
          Answer-First Summary
        </p>
        <p className="text-foreground/90">
          YT Toolkit exposes free read-only JSON endpoints for public YouTube data — thumbnails, video
          statistics, channel statistics, and playlist length. All responses use a{' '}
          <code>{'{ success, data }'}</code> envelope. Requests are rate-limited per IP; there is no API
          key today.
        </p>
      </aside>

      <h2>Base URL and response shape</h2>
      <p>
        All endpoints are under <code>https://yttoolkit.com/api</code> and respond with JSON in a
        consistent envelope:
      </p>
      <pre>{`// success
{ "success": true, "data": { ... }, "meta": {} }

// error
{ "success": false, "error": { "code": "VIDEO_NOT_FOUND", "message": "..." } }`}</pre>

      <h2>Rate limits</h2>
      <p>
        Requests are limited per IP address to keep the service fair and to stay within YouTube API
        quota. Standard read endpoints allow roughly 60 requests per minute. Exceeding the limit returns
        HTTP <code>429</code> with a <code>Retry-After</code> header. Do not build production workloads on
        top of these endpoints — they are intended for light, interactive use.
      </p>

      <h2>Endpoints</h2>

      <h3>GET /api/youtube/thumbnail</h3>
      <p>Returns thumbnail URLs in every available quality for a video.</p>
      <pre>{`curl "https://yttoolkit.com/api/youtube/thumbnail?v=VIDEO_ID"`}</pre>

      <h3>GET /api/youtube/video-stats</h3>
      <p>Public statistics for a video: views, likes, comments, duration, publish date.</p>
      <pre>{`curl "https://yttoolkit.com/api/youtube/video-stats?v=VIDEO_ID"`}</pre>

      <h3>GET /api/youtube/channel-stats</h3>
      <p>Public channel statistics: subscribers, total views, video count, recent uploads.</p>
      <pre>{`curl "https://yttoolkit.com/api/youtube/channel-stats?c=UC_CHANNEL_ID"`}</pre>

      <h3>GET /api/youtube/playlist</h3>
      <p>Total duration, video count, and average length for a playlist.</p>
      <pre>{`curl "https://yttoolkit.com/api/youtube/playlist?list=PLAYLIST_ID"`}</pre>

      <h2>Examples</h2>
      <h3>JavaScript (fetch)</h3>
      <pre>{`const res = await fetch(
  "https://yttoolkit.com/api/youtube/video-stats?v=VIDEO_ID"
);
const json = await res.json();
if (json.success) console.log(json.data);`}</pre>

      <h3>Python (requests)</h3>
      <pre>{`import requests

r = requests.get(
    "https://yttoolkit.com/api/youtube/video-stats",
    params={"v": "VIDEO_ID"},
)
data = r.json()
if data["success"]:
    print(data["data"])`}</pre>

      <h2>Terms of use</h2>
      <p>
        These endpoints return only public YouTube data and are provided as-is, without warranty, for
        light interactive use. Respect the rate limits, do not scrape at scale, and cache responses on
        your side where possible. See our <Link href="/terms">Terms</Link> for details. YT Toolkit is
        independent and not affiliated with YouTube or Google.
      </p>

      <h2>Prefer the tools?</h2>
      <p>
        Most people do not need the API. Use the{' '}
        <Link href="/video-statistics">Video Statistics</Link>,{' '}
        <Link href="/channel-statistics">Channel Statistics</Link>, or{' '}
        <Link href="/thumbnail-downloader">Thumbnail Downloader</Link> tools directly.
      </p>
    </ContentPageShell>
  );
}
