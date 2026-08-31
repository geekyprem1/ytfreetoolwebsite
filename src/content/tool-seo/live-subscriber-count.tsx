import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How accurate is the live subscriber count?',
    a: 'The number reflects YouTube’s public subscriber count, which YouTube itself rounds once a channel passes 1,000 subscribers (for example it shows 1.23M, not the exact figure). Below 1,000 the count is exact. So the live view is accurate to what YouTube publishes, but it is an estimate of the true internal number for larger channels.',
  },
  {
    q: 'How often does the count update?',
    a: 'The tool fetches a fresh number about every 60 seconds and animates smoothly between updates so it feels live. A very short refresh interval is not possible because YouTube’s API has daily usage limits shared across all visitors.',
  },
  {
    q: 'Why is this different from the number on YouTube?',
    a: 'YouTube’s own display and its public API can lag each other by a few minutes, and both round large counts. Small differences between this tool, the channel page, and YouTube Studio are normal and usually resolve within minutes.',
  },
  {
    q: 'Can I track my own channel’s subscribers live?',
    a: 'Yes. Paste your channel URL or @handle. Note that for your own real-time analytics, YouTube Studio has a “Realtime” card that shows an estimated live figure only you can see; this tool shows the public count anyone can see.',
  },
  {
    q: 'Does the counter keep updating if I leave the tab open?',
    a: 'Yes. While the page is open and tracking, it keeps refreshing roughly every minute. If usage limits are reached across all visitors, live updates pause and the tool shows the most recent snapshot until they resume.',
  },
  {
    q: 'Can I share a live counter for a specific channel?',
    a: 'Yes. Each channel has its own page at /live-subscriber-count/@handle, which loads the counter for that channel automatically — handy for sharing a milestone watch link.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a live YouTube subscriber counter?</h2>
      <p>
        A live subscriber counter shows a channel’s subscriber total updating in near real time, instead
        of a static number you have to refresh yourself. Paste a channel URL or <code>@handle</code> and
        the count refreshes automatically, with a smooth animation between updates so you can watch it
        climb.
      </p>
      <p>
        It is popular for milestone watch parties (like a channel approaching 1M), for comparing your
        growth against peers, and simply for the satisfying live number.
      </p>

      <h2>How to track a channel’s subscribers live</h2>
      <ol>
        <li>
          <strong>Paste the channel</strong> — A URL, <code>@handle</code>, or <code>UC…</code> ID works.
        </li>
        <li>
          <strong>Press Track live</strong> — The counter loads and begins refreshing automatically.
        </li>
        <li>
          <strong>Leave it open</strong> — The number updates about every 60 seconds on its own.
        </li>
      </ol>

      <h2>Why the number is an estimate</h2>
      <p>
        Once a channel passes 1,000 subscribers, YouTube deliberately rounds the public count (showing
        1.2M rather than 1,234,567). The public API returns that same rounded figure, so no third-party
        tool can show the exact internal number for a large channel — only the channel owner sees a more
        precise figure inside YouTube Studio. This tool is honest about that: it displays the public,
        estimated count and animates smoothly rather than pretending to have second-by-second precision.
      </p>

      <h2>Live counter uses</h2>
      <ul>
        <li>
          <strong>Milestone watch parties</strong> — Follow a channel toward 100K, 1M, or 10M.
        </li>
        <li>
          <strong>Competitive tracking</strong> — Keep a peer channel’s number on screen.
        </li>
        <li>
          <strong>Streams &amp; overlays</strong> — A quick public reference during a broadcast.
        </li>
      </ul>

      <h2>Related tools</h2>
      <p>
        Watch a single video’s views climb with the{' '}
        <Link href="/live-view-count">Live View Count</Link>, see full public metrics with{' '}
        <Link href="/channel-statistics">Channel Statistics</Link>, or compare several channels at once
        with <Link href="/channel-comparison">Channel Comparison</Link>.
      </p>
    </>
  );
}
