import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ToolPageShell } from '@/components/tools/tool-page-shell';
import { TrendingView } from '../trending-view';
import { SeoContent, faqs } from '@/content/tool-seo/youtube-trending';
import { getCachedTrending } from '@/lib/youtube/client';
import { trendingRegions, getRegionBySlug } from '@/content/trending-regions';

export const revalidate = 10800;

/** Pre-render every supported country at build time. */
export function generateStaticParams() {
  return trendingRegions.map((r) => ({ country: r.slug }));
}

interface PageProps {
  params: Promise<{ country: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { country } = await params;
  const region = getRegionBySlug(country);
  if (!region) return {};
  const title = `Trending YouTube Videos in ${region.name} (Today) | yttools.pro`;
  const description = `See today’s trending YouTube videos in ${region.name} — the most popular videos right now. Updated daily, free, no login.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/youtube-trending/${region.slug}` },
    openGraph: { title, description },
  };
}

export default async function TrendingCountryPage({ params }: PageProps) {
  const { country } = await params;
  const region = getRegionBySlug(country);
  if (!region) notFound();

  const data = await getCachedTrending(region.code);

  return (
    <ToolPageShell
      toolName="Trending Videos"
      toolDescription="See today’s trending YouTube videos by country."
      toolSlug="youtube-trending"
      title={`Trending YouTube Videos in ${region.name}`}
      description={`Today’s most popular YouTube videos in ${region.name}. The list updates throughout the day — switch countries to compare what is trending elsewhere.`}
      answerFirst={`This page lists the current trending (most popular) YouTube videos in ${region.name}, updated a few times daily. No login.`}
      seo={<SeoContent />}
      faqs={faqs}
    >
      <TrendingView regionSlug={region.slug} regionName={region.name} videos={data.videos} />
    </ToolPageShell>
  );
}
