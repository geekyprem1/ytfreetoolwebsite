import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { graphJsonLd, definedTermSetNode } from '@/lib/seo/schema-graph';
import { glossaryTerms } from '@/content/glossary';

export const metadata: Metadata = {
  title: 'YouTube Creator Glossary',
  description:
    'Plain-English definitions of YouTube creator terms — CPM, RPM, watch time, AVD, CTR, impressions, YPP, Shorts, and more. Each with a formula or example.',
  alternates: { canonical: '/glossary' },
  openGraph: {
    title: 'YouTube Creator Glossary',
    description: 'Clear definitions of YouTube terms: CPM, RPM, watch time, CTR, YPP, and more.',
  },
};

export default function GlossaryIndexPage() {
  return (
    <ContentPageShell
      breadcrumbLabel="Glossary"
      title="YouTube Creator Glossary"
      description="Plain-English definitions of the terms creators run into, each with a formula or example and a link to the tool that uses it."
    >
      <JsonLd
        data={graphJsonLd([
          definedTermSetNode(glossaryTerms.map((t) => ({ term: t.term, slug: t.slug }))),
        ])}
      />
      <dl>
        {glossaryTerms.map((t) => (
          <div key={t.slug}>
            <dt>
              <Link href={`/glossary/${t.slug}`}>{t.term}</Link>
            </dt>
            <dd>{t.short}</dd>
          </div>
        ))}
      </dl>
    </ContentPageShell>
  );
}
