import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { graphJsonLd, itemListNode } from '@/lib/seo/schema-graph';
import { tagNiches } from '@/content/tags-for';

export const metadata: Metadata = {
  title: 'YouTube Tags by Niche',
  description:
    'Starter YouTube tag sets for popular niches — gaming, vlog, cooking, tech, fitness, and more. Copy a set, then generate video-specific tags with AI.',
  alternates: { canonical: '/tags-for' },
  openGraph: {
    title: 'YouTube Tags by Niche',
    description: 'Starter tag sets for popular YouTube niches. Copy and customize.',
  },
};

export default function TagsForIndexPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Tags by niche"
      title="YouTube Tags by Niche"
      description="Starter tag sets for popular niches. Use them as a base, then generate video-specific tags with the AI tools."
    >
      <JsonLd
        data={graphJsonLd([
          itemListNode({
            id: '/tags-for#list',
            items: tagNiches.map((n) => ({ name: `YouTube tags for ${n.name}`, path: `/tags-for/${n.slug}` })),
          }),
        ])}
      />
      <ul>
        {tagNiches.map((n) => (
          <li key={n.slug}>
            <Link href={`/tags-for/${n.slug}`}>YouTube tags for {n.name}</Link>
          </li>
        ))}
      </ul>
    </ContentPageShell>
  );
}
