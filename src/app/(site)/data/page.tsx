import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { graphJsonLd, itemListNode } from '@/lib/seo/schema-graph';
import { datasets } from '@/content/data/datasets';

export const metadata: Metadata = {
  title: 'YouTube Data & Benchmarks',
  description:
    'Free reference datasets for YouTube creators: CPM by country, RPM by niche, engagement rate benchmarks, and average video length. Estimated ranges with methodology.',
  alternates: { canonical: '/data' },
  openGraph: {
    title: 'YouTube Data & Benchmarks',
    description: 'CPM by country, RPM by niche, engagement benchmarks, and more. Estimated ranges with methodology.',
  },
};

export default function DataIndexPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Data"
      title="YouTube Data & Benchmarks"
      description="Free reference datasets for creators. Every figure is an estimated range compiled from public reports, with a methodology note — not private YouTube data."
    >
      <JsonLd
        data={graphJsonLd([
          itemListNode({
            id: '/data#list',
            items: datasets.map((d) => ({ name: d.title, path: `/data/${d.slug}` })),
          }),
        ])}
      />
      <ul>
        {datasets.map((d) => (
          <li key={d.slug}>
            <Link href={`/data/${d.slug}`}>{d.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        These pages exist to answer common creator questions with clear, sourced ranges. They are
        directional estimates, not guarantees or official YouTube figures. For your own numbers, use the{' '}
        <Link href="/youtube-money-calculator">earnings</Link> and{' '}
        <Link href="/youtube-rpm-calculator">RPM</Link> calculators.
      </p>
    </ContentPageShell>
  );
}
