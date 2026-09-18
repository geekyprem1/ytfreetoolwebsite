import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { graphJsonLd, breadcrumbNode } from '@/lib/seo/schema-graph';
import { comparisons, getComparisonBySlug } from '@/content/comparisons';
import { site } from '@/content/site';

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) return {};
  return {
    title: { absolute: c.metaTitle },
    description: c.metaDescription,
    alternates: { canonical: `/vs/${c.slug}` },
    openGraph: { title: c.metaTitle, description: c.metaDescription },
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  const { slug } = await params;
  const c = getComparisonBySlug(slug);
  if (!c) notFound();

  return (
    <ContentPageShell breadcrumbLabel={c.title} title={c.title} description={c.intro}>
      <JsonLd
        data={graphJsonLd([
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Compare', path: '/vs/free-youtube-tools' },
            { name: c.title, path: `/vs/${c.slug}` },
          ]),
          {
            '@type': 'FAQPage',
            '@id': `${site.url}/vs/${c.slug}#faq`,
            mainEntity: c.faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ])}
      />

      <aside
        className="mb-4 rounded-xl border border-border/70 bg-muted/40 px-4 py-3 text-sm leading-relaxed not-prose"
        aria-label="Answer-First Summary"
      >
        <p className="text-caption font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
          Answer-First Summary
        </p>
        <p className="text-foreground/90">{c.answerFirst}</p>
      </aside>

      <h2>Feature comparison</h2>
      <div className="not-prose overflow-x-auto rounded-lg border">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-2.5 font-medium border-b">Feature</th>
              <th className="text-left p-2.5 font-medium border-b">YT Toolkit</th>
              <th className="text-left p-2.5 font-medium border-b">{c.competitor}</th>
            </tr>
          </thead>
          <tbody>
            {c.rows.map((row, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-2.5 font-medium">{row.feature}</td>
                <td className="p-2.5">{row.ours}</td>
                <td className="p-2.5">{row.theirs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Where {c.competitor} is stronger</h2>
      <ul>
        {c.whereTheyWin.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>

      <h2>Where YT Toolkit is stronger</h2>
      <ul>
        {c.whereWeWin.map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>

      <h2>Frequently asked questions</h2>
      {c.faqs.map((f, i) => (
        <div key={i}>
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}

      <h2>Try the free tools</h2>
      <p>
        Start with the <Link href="/tags-extractor">Tags Extractor</Link>,{' '}
        <Link href="/title-generator">AI Title Generator</Link>,{' '}
        <Link href="/channel-statistics">Channel Statistics</Link>, or browse{' '}
        <Link href="/#tools">all tools</Link>.
      </p>

      <h2>Other comparisons</h2>
      <ul>
        {comparisons
          .filter((x) => x.slug !== c.slug)
          .map((x) => (
            <li key={x.slug}>
              <Link href={`/vs/${x.slug}`}>{x.title}</Link>
            </li>
          ))}
      </ul>
    </ContentPageShell>
  );
}
