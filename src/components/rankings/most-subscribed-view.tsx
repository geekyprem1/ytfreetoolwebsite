import Link from 'next/link';
import { JsonLd } from '@/components/seo/json-ld';
import { ToolFaqSection } from '@/components/tools/tool-faq-section';
import { RankingsShell, RankingPills } from '@/components/rankings/rankings-shell';
import { ChannelTable } from '@/components/rankings/channel-table';
import type { RankedChannel } from '@/lib/rankings/rankings';
import { formatCountWords, formatRankingDate } from '@/lib/rankings/format';
import { graphJsonLd, breadcrumbNode, rankingPageNodes, faqPageNode, type FaqItem } from '@/lib/seo/schema-graph';
import { rankingFilters, filterPath } from '@/content/rankings/filters';
import { rankingChannels } from '@/content/rankings/channels';

interface MostSubscribedViewProps {
  path: string;
  /** Breadcrumb label for this page. */
  crumb: string;
  title: string;
  description: string;
  /** Lower-case scope for prose, e.g. "in India" or "gaming channels". */
  scopeLabel: string;
  rows: RankedChannel[];
  fetchedAt: string;
  faqs: FaqItem[];
  /** Extra context links rendered under the table. */
  related?: React.ReactNode;
}

export function MostSubscribedView({
  path,
  crumb,
  title,
  description,
  scopeLabel,
  rows,
  fetchedAt,
  faqs,
  related,
}: MostSubscribedViewProps) {
  const isRoot = path === '/youtube-rankings/most-subscribed';
  const [a, b, c] = rows;
  const date = formatRankingDate(fetchedAt);

  const countryPills = rankingFilters
    .filter((f) => f.kind === 'country')
    .map((f) => ({ href: filterPath(f), label: f.name }));
  const categoryPills = rankingFilters
    .filter((f) => f.kind === 'category')
    .map((f) => ({ href: filterPath(f), label: f.name }));

  const breadcrumbs = [
    { name: 'YouTube Rankings', href: '/youtube-rankings' },
    ...(isRoot ? [] : [{ name: 'Most subscribed', href: '/youtube-rankings/most-subscribed' }]),
    { name: crumb, href: path },
  ];

  return (
    <RankingsShell
      breadcrumbs={breadcrumbs}
      title={title}
      description={description}
      activeTab="most-subscribed"
      updatedAt={fetchedAt || undefined}
      answerFirst={
        a ? (
          <>
            As of {date}, the most subscribed YouTube channel {scopeLabel} is <strong>{a.title}</strong> with about{' '}
            {formatCountWords(a.subscribers)} subscribers
            {b ? (
              <>
                , followed by {b.title} ({formatCountWords(b.subscribers)})
                {c ? <> and {c.title} ({formatCountWords(c.subscribers)})</> : null}
              </>
            ) : null}
            . Counts are public YouTube figures refreshed every few hours.
          </>
        ) : undefined
      }
    >
      <JsonLd
        data={graphJsonLd([
          breadcrumbNode([
            { name: 'Home', path: '/' },
            ...breadcrumbs.map((bc) => ({ name: bc.name, path: bc.href })),
          ]),
          ...rankingPageNodes({
            path,
            name: title,
            description,
            dateModified: fetchedAt || undefined,
            items: rows.map((r) => ({
              name: r.title,
              url: `https://www.youtube.com/channel/${r.id}`,
              description: `${formatCountWords(r.subscribers)} subscribers`,
            })),
          }),
          faqPageNode(path, faqs),
        ])}
      />

      <div className="mb-5 space-y-3">
        <RankingPills label="Country:" items={countryPills} activeHref={path} />
        <RankingPills label="Category:" items={categoryPills} activeHref={path} />
        {!isRoot ? (
          <p className="text-sm">
            <Link href="/youtube-rankings/most-subscribed" className="text-primary hover:underline">
              ← Back to the global Top 100
            </Link>
          </p>
        ) : null}
      </div>

      {rows.length > 0 ? (
        <ChannelTable rows={rows.map((channel) => ({ channel }))} caption={title} />
      ) : (
        <p role="status" className="rounded-xl border border-dashed p-6 text-sm text-muted-foreground">
          Live ranking data is temporarily unavailable. Please check back in a few minutes.
        </p>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Hover a number to see the exact public count. Channels with hidden subscriber counts are excluded.
      </p>

      <div className="tool-prose mt-14">
        <h2>How this ranking works</h2>
        <p>
          We track {rankingChannels.length} of the largest YouTube channels and pull their public subscriber,
          view and video counts from the YouTube Data API every few hours. Channels are sorted by subscribers;
          ties (YouTube rounds public counts) are broken by total views. Nothing is estimated — if YouTube shows
          331M on the channel page, you see 331M here.
        </p>
        {related}
        <h2>Explore more</h2>
        <ul>
          <li>
            <Link href="/youtube-rankings/fastest-growing">Fastest growing YouTube channels</Link> — who gained the most
            subscribers in the last few weeks.
          </li>
          <li>
            <Link href="/youtube-trending">Trending YouTube videos by country</Link> — what is popular right now.
          </li>
          <li>
            <Link href="/channel-comparison">Compare two channels</Link> side by side, or check any channel with the{' '}
            <Link href="/channel-statistics">Channel Statistics</Link> tool.
          </li>
          <li>
            Wondering what these channels earn? Try the{' '}
            <Link href="/youtube-money-calculator">YouTube Money Calculator</Link>.
          </li>
        </ul>
        <ToolFaqSection faqs={faqs} />
      </div>
    </RankingsShell>
  );
}
