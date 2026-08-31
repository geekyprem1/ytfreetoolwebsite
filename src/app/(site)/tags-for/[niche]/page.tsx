import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { graphJsonLd, breadcrumbNode } from '@/lib/seo/schema-graph';
import { CopyTags } from '../copy-tags';
import { tagNiches, getTagNiche } from '@/content/tags-for';

export function generateStaticParams() {
  return tagNiches.map((n) => ({ niche: n.slug }));
}

interface PageProps {
  params: Promise<{ niche: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { niche } = await params;
  const n = getTagNiche(niche);
  if (!n) return {};
  const title = `YouTube Tags for ${n.name} (Free Copy List) | yttools.pro`;
  const description = `A free starter set of YouTube tags for ${n.name} videos. Copy the list, then generate video-specific tags with AI. No login.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/tags-for/${n.slug}` },
    openGraph: { title, description },
  };
}

export default async function TagsForNichePage({ params }: PageProps) {
  const { niche } = await params;
  const n = getTagNiche(niche);
  if (!n) notFound();

  return (
    <ContentPageShell
      breadcrumbLabel={`Tags for ${n.name}`}
      title={`YouTube Tags for ${n.name}`}
      description={`A starter set of tags for ${n.name} videos. Copy them as a base, then tailor tags to each specific video for best results.`}
    >
      <JsonLd
        data={graphJsonLd([
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Tags by niche', path: '/tags-for' },
            { name: n.name, path: `/tags-for/${n.slug}` },
          ]),
        ])}
      />

      <CopyTags tags={n.tags} />

      <h2>How to use these tags</h2>
      <p>
        These are broad, niche-level tags to start from. Tags play a smaller ranking role than your
        title, description, and content, so treat them as context rather than a magic lever. For each
        upload, add a few specific tags that match the exact topic and any spelling variations.
      </p>

      <h2>Generate tags for a specific video</h2>
      <p>
        For tags tuned to one video, use the{' '}
        <Link href="/keyword-generator">Keyword Generator</Link> or{' '}
        <Link href="/hashtag-generator">Hashtag Generator</Link>, and extract tags from top-ranking
        videos with the <Link href="/tags-extractor">Tags Extractor</Link>.
      </p>

      <h2>Other niches</h2>
      <ul>
        {tagNiches
          .filter((x) => x.slug !== n.slug)
          .slice(0, 10)
          .map((x) => (
            <li key={x.slug}>
              <Link href={`/tags-for/${x.slug}`}>YouTube tags for {x.name}</Link>
            </li>
          ))}
      </ul>
    </ContentPageShell>
  );
}
