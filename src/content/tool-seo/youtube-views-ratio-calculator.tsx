import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'What is a good views-to-subscribers ratio on YouTube?',
    a: 'There is no single “good” number — it depends on niche, age and format. Evergreen, search-driven channels often have far more lifetime views per subscriber than channels whose audience comes mainly from subscriptions. Compare with channels in your niche and of similar size, and track your own ratio over time.',
  },
  {
    q: 'How is views per subscriber calculated?',
    a: 'Lifetime public views divided by the current public subscriber count. For example, 2,500,000 views and 18,000 subscribers gives about 139 views per subscriber.',
  },
  {
    q: 'What does “average video reach” mean?',
    a: 'It is the average views per video (lifetime views ÷ public videos) shown as a percentage of subscribers. If a channel averages 5,000 views per video and has 50,000 subscribers, the average video reaches 10% of the subscriber count. It is a rough signal of how much of the audience turns up for a typical upload.',
  },
  {
    q: 'Why is my ratio different from YouTube Studio?',
    a: 'This calculator uses public lifetime totals. YouTube Studio can break views down by date range, traffic source and subscribed vs not-subscribed viewers, which is more precise. Public subscriber counts are also rounded above 1,000.',
  },
  {
    q: 'Does a low ratio mean my channel is shadowbanned?',
    a: 'No. A low ratio usually means older videos have stopped getting views, many subscribers are inactive, or recent uploads target a different audience. Check YouTube Studio for impressions and click-through rate before drawing conclusions.',
  },
  {
    q: 'Where do the Top-100 medians come from?',
    a: 'From our live rankings of the most subscribed YouTube channels, refreshed every few hours using public YouTube data. They show how the biggest channels look, not what small channels should expect.',
  },
  {
    q: 'Is the calculator free?',
    a: 'Yes. Channel lookups use public data and need no login. Manual mode runs entirely in your browser.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the Views-to-Subscribers Ratio Calculator does</h2>
      <p>
        Subscriber count alone says little about how many people actually watch. This calculator relates a
        channel’s <strong>lifetime views</strong> to its <strong>subscribers</strong> and{' '}
        <strong>videos</strong> and returns four numbers:
      </p>
      <ul>
        <li>
          <strong>Views per subscriber</strong> — lifetime views ÷ subscribers.
        </li>
        <li>
          <strong>Average views per video</strong> — lifetime views ÷ public videos.
        </li>
        <li>
          <strong>Average video reach</strong> — average views per video as a percentage of subscribers.
        </li>
        <li>
          <strong>Subscribers per video</strong> — subscribers ÷ public videos, a rough measure of how efficiently
          uploads turn into subscribers.
        </li>
      </ul>
      <p>
        Paste a channel link and the public numbers are fetched for you, or switch to manual mode and type your own
        figures from YouTube Studio.
      </p>

      <h2>How to use it</h2>
      <ol>
        <li>Choose <strong>From a channel</strong> and paste a channel URL, @handle or channel ID.</li>
        <li>Or choose <strong>Enter numbers</strong> and type total views, subscribers and public videos.</li>
        <li>Read the ratios and compare with the Top-100 medians and with channels in your niche.</li>
        <li>Copy the summary to keep a record and recheck every month.</li>
      </ol>

      <h2>How to read the numbers</h2>
      <p>
        A high views-per-subscriber ratio usually means videos keep getting found through search and recommendations
        long after publishing — typical of tutorials, reviews and evergreen explainers. A low ratio is common for
        channels that grew subscribers fast (for example through a viral Short) but whose long-form videos reach
        only part of that audience.
      </p>
      <p>
        Average video reach is the most practical signal for creators. If it is falling over time, recent uploads
        are reaching a smaller share of your audience; look at thumbnails, titles and topic fit in YouTube Studio.
        Keep in mind that lifetime averages include your oldest videos, so a strong back catalogue can hide weak
        recent uploads, and the reverse.
      </p>

      <h2>Limits of public data</h2>
      <p>
        Public subscriber counts are rounded above 1,000, and view totals include every video that is still public.
        Deleted or private videos, Shorts vs long-form mix, and live streams all affect the result. For precise
        answers, use the Studio breakdown of views from subscribers vs non-subscribers.
      </p>

      <h2>Related tools</h2>
      <p>
        Check engagement on individual videos with the{' '}
        <Link href="/youtube-engagement-calculator">Engagement Rate Calculator</Link>, see a channel’s full profile
        in <Link href="/channel-statistics">Channel Statistics</Link>, compare two channels with{' '}
        <Link href="/channel-comparison">Channel Comparison</Link>, or find out how old a channel is with the{' '}
        <Link href="/youtube-channel-age-checker">Channel Age Checker</Link>. Benchmarks for engagement live on{' '}
        <Link href="/data/youtube-engagement-rate-benchmarks">YouTube engagement rate benchmarks</Link>.
      </p>
    </>
  );
}
