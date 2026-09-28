import type { Metadata } from 'next';
import { MostSubscribedView } from '@/components/rankings/most-subscribed-view';
import { getRankingPool, selectMostSubscribed } from '@/lib/rankings/rankings';
import { rankingYear } from '@/lib/rankings/format';
import { mostSubscribedFaqs } from '@/content/rankings/faqs';

/** Rebuild every 6 hours; matches the ranking pool cache. */
export const revalidate = 21600;

const PATH = '/youtube-rankings/most-subscribed';

export async function generateMetadata(): Promise<Metadata> {
  const year = rankingYear();
  const title = `Top 100 Most Subscribed YouTube Channels (${year}) | yttools.pro`;
  const description =
    'Live ranking of the 100 most subscribed YouTube channels in the world, with subscriber, view and video counts. Public YouTube data refreshed every few hours. Filter by country or category.';
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: PATH },
    openGraph: { title, description, url: PATH },
  };
}

export default async function MostSubscribedPage() {
  const pool = await getRankingPool();
  const rows = selectMostSubscribed(pool, { limit: 100 });
  const year = rankingYear(pool.fetchedAt);

  return (
    <MostSubscribedView
      path={PATH}
      crumb="Most subscribed"
      title={`Top 100 Most Subscribed YouTube Channels (${year})`}
      description="The biggest YouTube channels in the world ranked by subscribers, with total views and video counts. Filter by country or category below."
      scopeLabel="in the world"
      rows={rows}
      fetchedAt={pool.fetchedAt}
      faqs={mostSubscribedFaqs(rows)}
    />
  );
}
