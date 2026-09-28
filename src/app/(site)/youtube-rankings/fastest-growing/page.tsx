import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { ToolFaqSection } from '@/components/tools/tool-faq-section';
import { RankingsShell } from '@/components/rankings/rankings-shell';
import { ChannelTable } from '@/components/rankings/channel-table';
import { getFastestGrowing, selectMostSubscribed } from '@/lib/rankings/rankings';
import { GROWTH_WINDOW_DAYS } from '@/lib/rankings/snapshots';
import { formatCountWords, formatPercent, formatRankingDate, rankingYear } from '@/lib/rankings/format';
import { graphJsonLd, breadcrumbNode, rankingPageNodes, faqPageNode } from '@/lib/seo/schema-graph';
import { fastestGrowingFaqs } from '@/content/rankings/faqs';

export const revalidate = 21600;

const PATH = '/youtube-rankings/fastest-growing';

export async function generateMetadata(): Promise<Metadata> {
  const title = `Fastest Growing YouTube Channels (${rankingYear()}) — Top 100 | yttools.pro`;
  const description =
    'The YouTube channels gaining the most subscribers right now, ranked by subscribers gained over the last 28 days. Public YouTube data, refreshed every few hours.';
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: PATH },
    openGraph: { title, description, url: PATH },
  };
}

export default async function FastestGrowingPage() {
  const { pool, baseline, since, rows } = await getFastestGrowing(100);
  const days = baseline?.days ?? null;
  const windowLabel = days === 1 ? 'the last day' : days ? `the last ${days} days` : '';
  const title = `Top 100 Fastest Growing YouTube Channels (${rankingYear(pool.fetchedAt)})`;
  const description = `YouTube channels ranked by how many subscribers they gained over ${
    windowLabel || `a rolling ${GROWTH_WINDOW_DAYS}-day window`
  }, with growth percentage and current subscriber count.`;
  const faqs = fastestGrowingFaqs(days);
  const [a, b] = rows;

  const breadcrumbs = [
    { name: 'YouTube Rankings', href: '/youtube-rankings' },
    { name: 'Fastest growing', href: PATH },
  ];

  return (
    <RankingsShell
      breadcrumbs={breadcrumbs}
      title={title}
      description={description}
      activeTab="fastest-growing"
      updatedAt={pool.fetchedAt || undefined}
      answerFirst={
        a && baseline ? (
          <>
            Over {windowLabel} (since {formatRankingDate(baseline.date)}), the fastest growing YouTube channel we track
            is <strong>{a.channel.title}</strong>, which gained about {formatCountWords(a.gain)} subscribers (
            {formatPercent(a.percent)})
            {b ? (
              <>
                , followed by {b.channel.title} with about {formatCountWords(b.gain)} (
                {formatPercent(b.percent)})
              </>
            ) : null}
            . Growth is measured from daily public subscriber counts.
          </>
        ) : undefined
      }
    >
      <JsonLd
        data={graphJsonLd([
          breadcrumbNode([{ name: 'Home', path: '/' }, ...breadcrumbs.map((bc) => ({ name: bc.name, path: bc.href }))]),
          ...rankingPageNodes({
            path: PATH,
            name: title,
            description,
            dateModified: pool.fetchedAt || undefined,
            items: rows.map((r) => ({
              name: r.channel.title,
              url: `https://www.youtube.com/channel/${r.channel.id}`,
              description: `+${formatCountWords(r.gain)} subscribers (${formatPercent(r.percent)})`,
            })),
          }),
          faqPageNode(PATH, faqs),
        ])}
      />

      {rows.length > 0 && baseline ? (
        <>
          <ChannelTable
            mode="growth"
            gainLabel={`Gained (${days}d)`}
            caption={title}
            rows={rows.map((r) => ({ channel: r.channel, gain: r.gain, percent: r.percent }))}
          />
          <p className="mt-3 text-xs text-muted-foreground">
            Compared with public counts on {formatRankingDate(baseline.date)}. YouTube rounds subscriber counts, so
            very large channels move in steps of 100K–1M.
            {days !== null && days < GROWTH_WINDOW_DAYS
              ? ` History is still building up — the window grows to ${GROWTH_WINDOW_DAYS} days automatically.`
              : ''}
          </p>
        </>
      ) : (
        <GrowthCollecting since={since} fallback={selectMostSubscribed(pool, { limit: 10 }).length > 0} />
      )}

      <div className="tool-prose mt-14">
        <h2>How growth is measured</h2>
        <p>
          Once a day we record the public subscriber count of every channel we track. This page compares the
          latest count with the oldest record we hold, up to {GROWTH_WINDOW_DAYS} days back, and ranks channels by
          the number of subscribers gained. Records older than 29 days are deleted automatically.
        </p>
        <p>
          Because YouTube rounds public subscriber counts to three significant figures, channels only show growth
          once their count crosses the next rounding step. A creator with 12.3M subscribers moves in 100K steps; a
          channel with 330M moves in 1M steps.
        </p>
        <h2>Explore more</h2>
        <ul>
          <li>
            <Link href="/youtube-rankings/most-subscribed">Top 100 most subscribed YouTube channels</Link>
          </li>
          <li>
            <Link href="/youtube-trending">Trending YouTube videos by country</Link>
          </li>
          <li>
            Project your own channel with the{' '}
            <Link href="/youtube-subscriber-growth-calculator">Subscriber Growth Calculator</Link>, or watch any
            channel in real time with the <Link href="/live-subscriber-count">Live Subscriber Count</Link>.
          </li>
        </ul>
        <ToolFaqSection faqs={faqs} />
      </div>
    </RankingsShell>
  );
}

function GrowthCollecting({ since, fallback }: { since: string | null; fallback: boolean }) {
  return (
    <div role="status" className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground space-y-2">
      <p className="font-medium text-foreground">Growth data is being collected.</p>
      <p>
        {since
          ? `We started recording daily subscriber counts on ${formatRankingDate(since)}. `
          : 'Daily subscriber counts are recorded once per day. '}
        The ranking appears as soon as there are two days of history to compare, and the window grows to{' '}
        {GROWTH_WINDOW_DAYS} days over time.
      </p>
      {fallback ? (
        <p>
          In the meantime, see the{' '}
          <Link href="/youtube-rankings/most-subscribed" className="text-primary hover:underline">
            most subscribed YouTube channels
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
