import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { graphJsonLd, definedTermNode, breadcrumbNode } from '@/lib/seo/schema-graph';
import { glossaryTerms, getGlossaryTerm } from '@/content/glossary';

export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ term: t.slug }));
}

interface PageProps {
  params: Promise<{ term: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) return {};
  const title = `${t.term} — YouTube Glossary | yttools.pro`;
  return {
    title: { absolute: title },
    description: t.short,
    alternates: { canonical: `/glossary/${t.slug}` },
    openGraph: { title, description: t.short },
  };
}

export default async function GlossaryTermPage({ params }: PageProps) {
  const { term } = await params;
  const t = getGlossaryTerm(term);
  if (!t) notFound();

  const related = glossaryTerms.filter((x) => x.slug !== t.slug).slice(0, 6);

  return (
    <ContentPageShell breadcrumbLabel={t.term} title={t.term} description={t.short}>
      <JsonLd
        data={graphJsonLd([
          definedTermNode({ term: t.term, definition: t.short, slug: t.slug }),
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Glossary', path: '/glossary' },
            { name: t.term, path: `/glossary/${t.slug}` },
          ]),
        ])}
      />

      <p>{t.detail}</p>

      {t.formula && (
        <>
          <h2>Formula</h2>
          <p>
            <code>{t.formula}</code>
          </p>
        </>
      )}

      {t.example && (
        <>
          <h2>Example</h2>
          <p>{t.example}</p>
        </>
      )}

      {t.relatedTool && (
        <p>
          Related tool: <Link href={t.relatedTool.href}>{t.relatedTool.label}</Link>
        </p>
      )}

      <h2>More terms</h2>
      <ul>
        {related.map((x) => (
          <li key={x.slug}>
            <Link href={`/glossary/${x.slug}`}>{x.term}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link href="/glossary">Back to the full glossary</Link>.
      </p>
    </ContentPageShell>
  );
}
