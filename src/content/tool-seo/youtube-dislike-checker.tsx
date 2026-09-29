import type { ToolFaq } from '@/components/tools/tool-faq-section';
import Link from 'next/link';

export const faqs: ToolFaq[] = [
  {
    q: 'Does YouTube publish a public dislike count?',
    a: 'No. YouTube removed public dislike counts from its Data API. This checker asks Return YouTube Dislike whether it has a third-party estimate for the video.',
  },
  {
    q: 'Are these the actual number of dislikes?',
    a: 'No. They are estimates from a separate community service. Its method may combine archived or scraped values with votes from extension users, so the estimate can differ from the actual count.',
  },
  {
    q: 'Why is there no estimate for some videos?',
    a: 'The provider may not have a record for that video, or its service may be temporarily unavailable or rate-limited. No estimate is shown as zero.',
  },
  {
    q: 'How fresh is the estimate?',
    a: 'The provider says its data is cached and may update roughly every 2–3 days. Our retrieval timestamp shows when our server received the provider response, not when the underlying votes or archive were last updated.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What this YouTube dislike checker can show</h2>
      <p>
        YouTube no longer supplies public dislike totals through its Data API. This tool checks whether the separate
        Return YouTube Dislike service has an estimate for a video, then labels the returned value as an estimate.
        It does not recover YouTube&apos;s hidden count or verify the provider&apos;s number against the creator&apos;s private data.
        YouTube&apos;s <a href="https://blog.youtube/news-and-events/update-to-youtube/" target="_blank" rel="noopener noreferrer">dislike-count announcement</a>{' '}
        explains that exact counts remain available to creators in Studio while public counts are private.
      </p>

      <h2>How the estimate is sourced</h2>
      <p>
        Return YouTube Dislike describes its backend as a combination of scraped data and estimates extrapolated
        from extension-user votes. Its FAQ says counts are cached and may be refreshed around every two to three days.
        Coverage and freshness vary by video. See the provider&apos;s{' '}
        <a href="https://github.com/Anarios/return-youtube-dislike/blob/main/README.md" target="_blank" rel="noopener noreferrer">API use and rate-limit notes</a>{' '}
        and its <a href="https://github.com/Anarios/return-youtube-dislike/blob/main/Docs/FAQ.md" target="_blank" rel="noopener noreferrer">methodology FAQ</a>.
      </p>

      <h2>How to use the result</h2>
      <ol>
        <li>Paste a YouTube video URL and request a lookup.</li>
        <li>Read the estimated dislike value alongside the provider and retrieval note.</li>
        <li>Treat it as a rough third-party signal; do not cite it as an official YouTube metric or an exact vote total.</li>
      </ol>

      <p>
        If no estimate is available, the tool reports that state instead of showing zero. To inspect public YouTube
        counters and metadata returned by YouTube itself, use <Link href="/video-statistics">Video Statistics</Link>.
      </p>
    </>
  );
}
