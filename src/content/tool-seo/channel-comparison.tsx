import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I compare two YouTube channels?',
    a: 'Enter each channel’s URL or @handle in the fields above and press Compare. The tool loads public stats for each and lines them up in a table, highlighting which channel leads on each metric.',
  },
  {
    q: 'What metrics does the comparison show?',
    a: 'Subscribers, total lifetime views, video count, average views per video (total views ÷ videos), and channel age in years. Together these give a fuller picture than subscribers alone.',
  },
  {
    q: 'Why is average views per video useful?',
    a: 'It measures efficiency, not just size. A channel with fewer subscribers but far higher average views per video often has stronger packaging or shelf life. Two channels with identical subscriber counts can look very different once you factor in how many videos produced those views.',
  },
  {
    q: 'Can I compare three channels at once?',
    a: 'Yes. Add a third field to compare up to three channels side by side. This is handy for benchmarking yourself against two competitors in the same niche.',
  },
  {
    q: 'Does this include private analytics like watch time or revenue?',
    a: 'No. Comparison uses only public data — subscribers, views, video count, and join date. Watch time, CTR, and revenue are private to each channel owner in YouTube Studio and are never exposed.',
  },
  {
    q: 'Why should I account for Shorts when comparing?',
    a: 'Channels that lean heavily on Shorts can accumulate views and subscribers quickly, which inflates totals relative to long-form channels. When you compare, consider whether the channels publish similar formats before drawing conclusions.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What is a YouTube channel comparison tool?</h2>
      <p>
        A channel comparison tool lines up two or three YouTube channels side by side so you can see who
        leads on each public metric. Enter the channels and the tool shows subscribers, total views,
        video count, average views per video, and channel age together in one table.
      </p>
      <p>
        Comparing channels together is far more useful than reading each in isolation — it turns raw
        numbers into a clear read on scale, efficiency, and momentum.
      </p>

      <h2>How to compare channels</h2>
      <ol>
        <li>
          <strong>Enter each channel</strong> — URL, <code>@handle</code>, or <code>UC…</code> ID in each
          field.
        </li>
        <li>
          <strong>Add a third (optional)</strong> — Compare up to three at once.
        </li>
        <li>
          <strong>Press Compare</strong> — Read the side-by-side table with the leader highlighted per
          row.
        </li>
      </ol>

      <h2>Reading the comparison</h2>
      <ul>
        <li>
          <strong>Subscribers</strong> — Visible size, but rounded by YouTube above 1,000.
        </li>
        <li>
          <strong>Total views</strong> — Lifetime reach across all public videos.
        </li>
        <li>
          <strong>Videos</strong> — Library size; pair with views to judge efficiency.
        </li>
        <li>
          <strong>Avg views / video</strong> — Views ÷ videos; a strong signal of packaging quality.
        </li>
        <li>
          <strong>Channel age</strong> — Puts growth in context; a young channel matching an old one is
          growing faster.
        </li>
      </ul>

      <h2>Competitive research tips</h2>
      <p>
        Compare channels that publish similar formats, or note the difference when they do not (Shorts vs
        long-form skews totals). A newer channel with high average views per video is often a better
        model to study than a large but coasting one. Use comparison to shortlist who to analyze more
        deeply, then dig into individual videos.
      </p>

      <h2>Related tools</h2>
      <p>
        Go deeper on a single channel with{' '}
        <Link href="/channel-statistics">Channel Statistics</Link>, track one live with the{' '}
        <Link href="/live-subscriber-count">Live Subscriber Count</Link>, or see a channel’s recurring
        keywords with <Link href="/channel-tags">Channel Tags</Link>.
      </p>
    </>
  );
}
