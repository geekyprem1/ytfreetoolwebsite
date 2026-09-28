import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/json-ld';
import { ToolFaqSection } from '@/components/tools/tool-faq-section';
import { RankingsShell } from '@/components/rankings/rankings-shell';
import { getFastestGrowing, selectMostSubscribed, type RankedChannel } from '@/lib/rankings/rankings';
import { formatCompact, formatCountWords, formatPercent, rankingYear } from '@/lib/rankings/format';
import { graphJsonLd, breadcrumbNode, itemListNode, faqPageNode } from '@/lib/seo/schema-graph';
import { rankingFilters, filterPath, filterHeading, filterListSize } from '@/content/rankings/filters';
import { trendingRegions } from '@/content/trending-regions';
import { mostSubscribedFaqs } from '@/content/rankings/faqs';

/** 6 hours — counts are rounded, and this keeps ISR writes inside Vercel Hobby limits. */
export const revalidate = 21600;

const PATH = '/youtube-rankings';

export async function generateMetadata(): Promise<Metadata> {
  const title = `YouTube Rankings (${rankingYear()}): Most Subscribed, Fastest Growing & Trending | yttools.pro`;
  const description =
    'Live YouTube rankings: the 100 most subscribed channels, the fastest growing channels, top YouTubers by country and category, and trending videos in 30 countries. Free, no login.';
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: PATH },
    openGraph: { title, description, url: PATH },
  };
}

function PreviewList({
  items,
}: {
  items: { channel: RankedChannel; value: string }[];
}) {
  return (
    <ol className="space-y-2">
      {items.map(({ channel, value }, i) => (
        <li key={channel.id} className="flex items-center gap-3 text-sm">
          <span className="w-5 text-right font-semibold tabular-nums text-muted-foreground">{i + 1}</span>
          {channel.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={channel.thumbnail}
              alt=""
              width={28}
              height={28}
              referrerPolicy="no-referrer"
              className="size-7 rounded-full bg-muted object-cover"
            />
          ) : (
            <span aria-hidden className="size-7 rounded-full bg-muted" />
          )}
          <span className="min-w-0 flex-1 truncate font-medium text-foreground">{channel.title}</span>
          <span className="tabular-nums text-muted-foreground">{value}</span>
        </li>
      ))}
    </ol>
  );
}

function RankingCard({
  href,
  title,
  blurb,
  children,
}: {
  href: string;
  title: string;
  blurb: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="flex flex-col rounded-2xl border bg-card p-5">
      <h2 className="text-lg font-semibold tracking-tight">
        <Link href={href} className="hover:text-primary">
          {title}
        </Link>
      </h2>
      <p className="mt-1 mb-4 text-sm text-muted-foreground">{blurb}</p>
      <div className="flex-1">{children}</div>
      <Link
        href={href}
        className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        View full ranking <ArrowRight aria-hidden className="size-3.5" />
        <span className="sr-only">: {title}</span>
      </Link>
    </section>
  );
}

export default async function RankingsHubPage() {
  const { pool, baseline, rows: growth } = await getFastestGrowing(5);
  const top = selectMostSubscribed(pool, { limit: 100 });
  const [first] = top;
  const faqs = mostSubscribedFaqs(top).slice(0, 3);

  const lists = [
    { name: 'Top 100 most subscribed YouTube channels', path: '/youtube-rankings/most-subscribed' },
    { name: 'Top 100 fastest growing YouTube channels', path: '/youtube-rankings/fastest-growing' },
    ...rankingFilters.map((f) => ({ name: filterHeading(f, filterListSize(f)), path: filterPath(f) })),
    { name: 'Trending YouTube videos by country', path: '/youtube-trending' },
  ];

  return (
    <RankingsShell
      breadcrumbs={[{ name: 'YouTube Rankings', href: PATH }]}
      title="YouTube Rankings"
      description="Live leaderboards built from public YouTube data: the biggest channels, the fastest risers, top YouTubers by country and category, and what is trending today."
      activeTab="hub"
      updatedAt={pool.fetchedAt || undefined}
      answerFirst={
        first ? (
          <>
            Right now the most subscribed YouTube channel is <strong>{first.title}</strong> with about{' '}
            {formatCountWords(first.subscribers)} subscribers.
            {growth[0] ? (
              <>
                {' '}
                The fastest growing channel over the last {baseline?.days} days is {growth[0].channel.title} (+
                {formatCountWords(growth[0].gain)}).
              </>
            ) : null}{' '}
            All rankings use public YouTube counts refreshed every few hours.
          </>
        ) : undefined
      }
    >
      <JsonLd
        data={graphJsonLd([
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'YouTube Rankings', path: PATH },
          ]),
          itemListNode({ id: `${PATH}#list`, items: lists }),
          faqPageNode(PATH, faqs),
        ])}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <RankingCard
          href="/youtube-rankings/most-subscribed"
          title="Top 100 most subscribed"
          blurb="The biggest YouTube channels in the world by subscribers."
        >
          {top.length ? (
            <PreviewList items={top.slice(0, 5).map((c) => ({ channel: c, value: formatCompact(c.subscribers) }))} />
          ) : (
            <p className="text-sm text-muted-foreground">Live data is loading — check back shortly.</p>
          )}
        </RankingCard>

        <RankingCard
          href="/youtube-rankings/fastest-growing"
          title="Fastest growing"
          blurb={
            baseline
              ? `Most subscribers gained over the last ${baseline.days} days.`
              : 'Most subscribers gained over a rolling 28-day window.'
          }
        >
          {growth.length ? (
            <PreviewList
              items={growth.map((g) => ({
                channel: g.channel,
                value: `+${formatCompact(g.gain)} · ${formatPercent(g.percent)}`,
              }))}
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              Growth history is being collected. The ranking appears once there are two days of data.
            </p>
          )}
        </RankingCard>

        <RankingCard
          href="/youtube-trending"
          title="Trending videos"
          blurb={`Today’s most popular videos in ${trendingRegions.length} countries.`}
        >
          <ul className="flex flex-wrap gap-2">
            {trendingRegions.slice(0, 12).map((r) => (
              <li key={r.code}>
                <Link
                  href={`/youtube-trending/${r.slug}`}
                  className="inline-flex h-8 items-center rounded-lg border px-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </RankingCard>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight mb-4">Top YouTubers by country and category</h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {rankingFilters.map((f) => (
            <li key={f.slug}>
              <Link
                href={filterPath(f)}
                className="flex items-center justify-between rounded-xl border px-4 py-3 text-sm hover:bg-muted/40"
              >
                <span className="font-medium">{filterHeading(f, filterListSize(f))}</span>
                <ArrowRight aria-hidden className="size-3.5 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="tool-prose mt-14">
        <h2>About these rankings</h2>
        <p>
          Every list on this page is built from the same live data: public subscriber, view and video counts from
          the YouTube Data API, refreshed every few hours and rendered directly into the page. The most-subscribed
          lists sort channels by subscribers. The fastest-growing list compares daily snapshots over a rolling
          window of up to 28 days. Trending videos come from YouTube’s own “most popular” chart for each country.
        </p>
        <ToolFaqSection faqs={faqs} />
      </div>
    </RankingsShell>
  );
}
