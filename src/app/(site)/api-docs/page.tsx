import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { site } from '@/content/site';

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
  const apiBaseUrl = `${site.url}/api`;

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
        All endpoints are under <code>{apiBaseUrl}</code> and respond with JSON in a
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
      <pre>{`curl "${apiBaseUrl}/youtube/thumbnail?v=VIDEO_ID"`}</pre>

      <h3>GET /api/youtube/video-stats</h3>
      <p>
        Public video metadata and statistics. The JSON data includes <code>id</code>, <code>title</code>,{' '}
        <code>description</code>, <code>thumbnail</code>, <code>channelId</code>, <code>channelTitle</code>,{' '}
        <code>publishedAt</code> (ISO 8601), formatted <code>duration</code>, <code>category</code> (YouTube
        category ID), numeric view/like/comment counts, availability flags for those counters, and <code>tags</code>.
        An unavailable counter has a false availability flag; it is not the same as a returned count of zero.
      </p>
      <pre>{`{
  "success": true,
  "data": {
    "id": "VIDEO_ID",
    "title": "Video title",
    "description": "Public video description",
    "thumbnail": "https://...",
    "channelId": "UC...",
    "channelTitle": "Channel name",
    "publishedAt": "2026-09-29T12:34:56Z",
    "duration": "12:34",
    "category": "27",
    "viewCount": 12345,
    "likeCount": 321,
    "commentCount": 45,
    "tags": ["example"],
    "viewCountAvailable": true,
    "likeCountAvailable": true,
    "commentCountAvailable": true
  },
  "meta": {}
}`}</pre>
      <pre>{`curl "${apiBaseUrl}/youtube/video-stats?v=VIDEO_ID"`}</pre>

      <h3>GET /api/youtube/channel-stats</h3>
      <p>Public channel statistics: subscribers, total views, video count, recent uploads.</p>
      <pre>{`curl "${apiBaseUrl}/youtube/channel-stats?c=UC_CHANNEL_ID"`}</pre>

      <h3>GET /api/youtube/playlist</h3>
      <p>Total duration, video count, and average length for a playlist.</p>
      <pre>{`curl "${apiBaseUrl}/youtube/playlist?list=PLAYLIST_ID"`}</pre>

      <h2>Examples</h2>
      <h3>JavaScript (fetch)</h3>
      <pre>{`const res = await fetch(
  "${apiBaseUrl}/youtube/video-stats?v=VIDEO_ID"
);
const json = await res.json();
if (json.success) console.log(json.data);`}</pre>

      <h3>Python (requests)</h3>
      <pre>{`import requests

r = requests.get(
    "${apiBaseUrl}/youtube/video-stats",
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
