import type { FaqItem } from '@/lib/seo/schema-graph';
import type { RankedChannel } from '@/lib/rankings/rankings';
import { formatCountWords } from '@/lib/rankings/format';
import { rankingChannels } from '@/content/rankings/channels';

const trackedCount = rankingChannels.length;

const methodologyFaqs: FaqItem[] = [
  {
    q: 'Where does this ranking data come from?',
    a: 'Subscriber, view and video counts come from the public YouTube Data API and are refreshed every few hours. We do not estimate or adjust the numbers — they are the same public counts YouTube shows on each channel page.',
  },
  {
    q: 'Why are subscriber counts rounded?',
    a: 'YouTube only exposes rounded subscriber counts publicly (three significant figures above 1,000 subscribers). A channel with 331,400,000 subscribers is shown as 331 million. Two channels with the same rounded count are ordered by total views.',
  },
  {
    q: 'Which channels are included?',
    a: `We track a curated pool of ${trackedCount} of the largest YouTube channels across music, entertainment, kids, gaming, education, sports and news, in many countries. Channels that hide their subscriber count are excluded because they cannot be ranked. If you think a large channel is missing, contact us and we will add it.`,
  },
];

export function mostSubscribedFaqs(top: RankedChannel[]): FaqItem[] {
  const [first, second] = top;
  const dynamic: FaqItem[] = [];
  if (first) {
    dynamic.push({
      q: 'Who is the most subscribed YouTuber right now?',
      a: `${first.title} is the most subscribed YouTube channel we track, with about ${formatCountWords(first.subscribers)} subscribers${
        second ? `, ahead of ${second.title} with about ${formatCountWords(second.subscribers)}` : ''
      }. The list updates automatically every few hours.`,
    });
  }
  const topCreator = top.find((c) => ['entertainment', 'gaming', 'comedy', 'education', 'tech'].includes(c.category));
  if (topCreator && topCreator.id !== first?.id) {
    dynamic.push({
      q: 'Which individual creator has the most subscribers?',
      a: `Among creator-led channels, ${topCreator.title} ranks highest with about ${formatCountWords(topCreator.subscribers)} subscribers. Many of the very largest channels are music labels, TV networks or kids’ brands rather than individual creators.`,
    });
  }
  return [...dynamic, ...methodologyFaqs];
}

/** `question` is the natural query, e.g. "Who is the most subscribed YouTuber in India?". */
export function filterFaqs(question: string, top: RankedChannel[]): FaqItem[] {
  const [first] = top;
  const dynamic: FaqItem[] = first
    ? [
        {
          q: question,
          a: `${first.title} is currently #1 with about ${formatCountWords(first.subscribers)} subscribers, based on public YouTube counts refreshed every few hours.`,
        },
      ]
    : [];
  return [...dynamic, ...methodologyFaqs];
}

export function fastestGrowingFaqs(days: number | null): FaqItem[] {
  return [
    {
      q: 'How is “fastest growing” calculated?',
      a: `We store one public subscriber count per channel per day and compare today’s count with the oldest stored count${
        days ? ` (currently ${days} days ago)` : ''
      }. Channels are ranked by the absolute number of subscribers gained; the growth percentage is shown alongside.`,
    },
    {
      q: 'Why do some big channels show no growth?',
      a: 'YouTube rounds public subscriber counts to three significant figures, so a channel with 300+ million subscribers only moves in steps of one million. Small real gains can appear as zero until the next rounding step, and those channels are left out of the list.',
    },
    {
      q: 'How long is subscriber history kept?',
      a: 'Daily snapshots are deleted after 29 days, so growth is measured over a rolling window of up to 28 days. This keeps us within YouTube’s API data-storage rules.',
    },
    ...methodologyFaqs.slice(2),
  ];
}
