import Link from 'next/link';
import type { ToolFaq } from '@/components/tools/tool-faq-section';

export const faqs: ToolFaq[] = [
  {
    q: 'How do I find out when a YouTube channel was created?',
    a: 'Paste the channel URL, @handle or channel ID into the checker. It reads the public creation date from the YouTube Data API and shows the exact day, plus the channel’s age in years, months and days.',
  },
  {
    q: 'Is the creation date the same as the “Joined” date on YouTube?',
    a: 'Yes. The date comes from the same public field YouTube uses for “Joined” on a channel’s About section. For some older or brand channels it reflects when the underlying account was created, which can be earlier than the first upload.',
  },
  {
    q: 'Why is the channel older than its first video?',
    a: 'Many people create a channel long before they upload. The creation date marks when the channel existed, not when it became active. Check the first uploads on the channel to see when publishing started.',
  },
  {
    q: 'What do “videos per year” and “subscribers per day” mean?',
    a: 'They are lifetime averages: total public videos, subscribers or views divided by the channel’s age. They give a quick sense of pace but hide bursts — most channels grow unevenly. For recent momentum, see the fastest growing channels ranking.',
  },
  {
    q: 'Does channel age affect monetization?',
    a: 'Age alone does not. The YouTube Partner Program looks at subscribers, watch hours or Shorts views, and policy compliance, not how old the channel is. Use the Monetization Checker or Monetization Progress Calculator for those requirements.',
  },
  {
    q: 'Can I check a channel without the URL?',
    a: 'You need one of: the channel URL, the @handle, or the channel ID (starts with UC). If you only know the name, search it on YouTube, open the channel, and copy the link from the address bar.',
  },
  {
    q: 'Is the Channel Age Checker free?',
    a: 'Yes. It is free, needs no login, and only reads public channel information.',
  },
];

export function SeoContent() {
  return (
    <>
      <h2>What the Channel Age Checker shows</h2>
      <p>
        This tool tells you when any YouTube channel was created and how old it is today. Paste a channel link,
        an @handle or a channel ID and you get the <strong>exact creation date</strong>, the age in years, months
        and days, the total number of days, and a few lifetime averages: videos per year, subscribers per day and
        views per day.
      </p>
      <p>
        The date is the channel’s public creation timestamp from the YouTube Data API — the same value YouTube
        shows as “Joined” in a channel’s About section. Nothing is estimated.
      </p>

      <h2>How to check a channel’s age</h2>
      <ol>
        <li>Open the channel on YouTube and copy the link, or note its @handle.</li>
        <li>Paste it into the box above and select <strong>Check Age</strong>.</li>
        <li>Read the creation date and exact age, then copy the one-line summary if you need it.</li>
      </ol>

      <h2>Why channel age is useful</h2>
      <ul>
        <li>
          <strong>Competitor research.</strong> A channel with 1M subscribers in two years tells a different story
          from one that took twelve.
        </li>
        <li>
          <strong>Benchmarking your own pace.</strong> Compare videos per year and subscribers per day against
          channels in your niche.
        </li>
        <li>
          <strong>Spotting sold or repurposed channels.</strong> A very old channel with recent, unrelated uploads
          may have been renamed or changed hands.
        </li>
        <li>
          <strong>Collaboration and sponsorship checks.</strong> Age plus consistency is a quick trust signal
          before you partner with a creator.
        </li>
      </ul>

      <h2>Reading the averages carefully</h2>
      <p>
        Lifetime averages flatten everything into one number. A channel that grew slowly for years and then took
        off will show a modest “subscribers per day” even if it is gaining thousands daily right now. YouTube also
        rounds public subscriber counts, so very large channels have coarse numbers. For recent growth, look at the{' '}
        <Link href="/youtube-rankings/fastest-growing">fastest growing YouTube channels</Link>; for a full profile,
        use <Link href="/channel-statistics">Channel Statistics</Link>.
      </p>

      <h2>Related tools</h2>
      <p>
        Compare two channels side by side with <Link href="/channel-comparison">Channel Comparison</Link>, check
        how views relate to subscribers with the{' '}
        <Link href="/youtube-views-ratio-calculator">Views-to-Subscribers Ratio Calculator</Link>, or find a
        channel’s UC… ID with the <Link href="/channel-id-finder">Channel ID Finder</Link>. See where the biggest
        channels stand in the <Link href="/youtube-rankings/most-subscribed">Top 100 most subscribed</Link> list.
      </p>
    </>
  );
}
