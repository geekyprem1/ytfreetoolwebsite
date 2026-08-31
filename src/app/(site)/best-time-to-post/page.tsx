import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { graphJsonLd, itemListNode } from '@/lib/seo/schema-graph';
import { postingRegions } from '@/content/best-time-to-post';

export const metadata: Metadata = {
  title: 'Best Time to Post on YouTube by Country',
  description:
    'General best-time-to-post windows for YouTube by country and local timezone. Best-practice guidance to test against your own analytics.',
  alternates: { canonical: '/best-time-to-post' },
  openGraph: {
    title: 'Best Time to Post on YouTube by Country',
    description: 'General best-time-to-post windows by country. Verify with your own analytics.',
  },
};

export default function BestTimeIndexPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Best time to post"
      title="Best Time to Post on YouTube by Country"
      description="General best-practice posting windows by country and local timezone. These are starting points — your own audience data is always the final word."
    >
      <JsonLd
        data={graphJsonLd([
          itemListNode({
            id: '/best-time-to-post#list',
            items: postingRegions.map((r) => ({
              name: `Best time to post on YouTube in ${r.name}`,
              path: `/best-time-to-post/${r.slug}`,
            })),
          }),
        ])}
      />
      <ul>
        {postingRegions.map((r) => (
          <li key={r.slug}>
            <Link href={`/best-time-to-post/${r.slug}`}>Best time to post in {r.name}</Link>
          </li>
        ))}
      </ul>
    </ContentPageShell>
  );
}
