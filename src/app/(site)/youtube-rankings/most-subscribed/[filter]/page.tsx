import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MostSubscribedView } from '@/components/rankings/most-subscribed-view';
import { getRankingPool, selectMostSubscribed } from '@/lib/rankings/rankings';
import { rankingYear } from '@/lib/rankings/format';
import { filterFaqs } from '@/content/rankings/faqs';
import {
  rankingFilters,
  getRankingFilter,
  filterListSize,
  filterHeading,
  filterQuestion,
  filterPath,
  type RankingFilter,
} from '@/content/rankings/filters';

export const revalidate = 21600;
/** Only the filters defined in content/rankings/filters.ts exist. */
export const dynamicParams = false;

export function generateStaticParams() {
  return rankingFilters.map((f) => ({ filter: f.slug }));
}

interface PageProps {
  params: Promise<{ filter: string }>;
}

function describe(f: RankingFilter): { description: string; scope: string } {
  return f.kind === 'country'
    ? {
        description: `The most subscribed YouTube channels from ${f.name}, ranked by public subscriber count with total views and videos.`,
        scope: `from ${f.name}`,
      }
    : {
        description: `The biggest ${f.name.toLowerCase()} channels on YouTube, ranked by public subscriber count with total views and videos.`,
        scope: `in ${f.name.toLowerCase()}`,
      };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { filter } = await params;
  const f = getRankingFilter(filter);
  if (!f) return {};
  const heading = filterHeading(f, filterListSize(f));
  const title = `${heading} (${rankingYear()}) | yttools.pro`;
  const { description } = describe(f);
  const path = filterPath(f);
  return {
    title: { absolute: title },
    description: `${description} Refreshed every few hours.`,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
  };
}

export default async function MostSubscribedFilterPage({ params }: PageProps) {
  const { filter } = await params;
  const f = getRankingFilter(filter);
  if (!f) notFound();

  const pool = await getRankingPool();
  const rows = selectMostSubscribed(pool, {
    ...(f.kind === 'country' ? { country: f.code } : { category: f.category }),
    limit: filterListSize(f),
  });
  // Heading reflects what is actually shown (a channel may be temporarily unavailable).
  const heading = filterHeading(f, rows.length || filterListSize(f));
  const { description, scope } = describe(f);

  return (
    <MostSubscribedView
      path={filterPath(f)}
      crumb={f.name}
      title={`${heading} (${rankingYear(pool.fetchedAt)})`}
      description={description}
      scopeLabel={scope}
      rows={rows}
      fetchedAt={pool.fetchedAt}
      faqs={filterFaqs(filterQuestion(f), rows)}
      related={
        f.kind === 'country' ? (
          <p>
            Want to know what people in {f.name} are watching today? See{' '}
            <Link href={`/youtube-trending/${f.slug}`}>trending YouTube videos in {f.name}</Link> and the{' '}
            <Link href={`/best-time-to-post/${f.slug}`}>best time to post in {f.name}</Link>.
          </p>
        ) : null
      }
    />
  );
}
