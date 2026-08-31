import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContentPageShell } from '@/components/layout/content-page-shell';
import { JsonLd } from '@/components/seo/json-ld';
import { graphJsonLd, datasetNode, breadcrumbNode } from '@/lib/seo/schema-graph';
import { DownloadCsvButton } from '../download-button';
import { datasets, getDatasetBySlug, datasetToCsv } from '@/content/data/datasets';

export function generateStaticParams() {
  return datasets.map((d) => ({ slug: d.slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dataset = getDatasetBySlug(slug);
  if (!dataset) return {};
  return {
    title: { absolute: dataset.metaTitle },
    description: dataset.metaDescription,
    keywords: dataset.keywords,
    alternates: { canonical: `/data/${dataset.slug}` },
    openGraph: { title: dataset.metaTitle, description: dataset.metaDescription },
  };
}

export default async function DatasetPage({ params }: PageProps) {
  const { slug } = await params;
  const dataset = getDatasetBySlug(slug);
  if (!dataset) notFound();

  const csv = datasetToCsv(dataset);

  return (
    <ContentPageShell breadcrumbLabel={dataset.title} title={dataset.title} description={dataset.intro}>
      <JsonLd
        data={graphJsonLd([
          datasetNode({
            name: dataset.title,
            description: dataset.metaDescription,
            path: `/data/${dataset.slug}`,
            keywords: dataset.keywords,
            dateModified: dataset.lastUpdated,
          }),
          breadcrumbNode([
            { name: 'Home', path: '/' },
            { name: 'Data', path: '/data' },
            { name: dataset.title, path: `/data/${dataset.slug}` },
          ]),
        ])}
      />

      <aside
        className="mb-4 rounded-xl border border-border/70 bg-muted/40 px-4 py-3 text-sm leading-relaxed not-prose"
        aria-label="Answer-First Summary"
      >
        <p className="text-caption font-semibold uppercase tracking-[0.08em] text-muted-foreground mb-1.5">
          Answer-First Summary
        </p>
        <p className="text-foreground/90">{dataset.answerFirst}</p>
      </aside>

      <div className="flex items-center justify-between gap-3 not-prose my-4">
        <p className="text-xs text-muted-foreground">
          Updated {dataset.lastUpdated} · {dataset.unitNote}
        </p>
        <DownloadCsvButton csv={csv} filename={`${dataset.slug}.csv`} />
      </div>

      <div className="not-prose overflow-x-auto rounded-lg border">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-muted/50">
              {dataset.columns.map((c) => (
                <th key={c.key} className="text-left p-2.5 font-medium border-b">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataset.rows.map((row, i) => (
              <tr key={i} className="border-b last:border-0">
                {dataset.columns.map((c) => (
                  <td key={c.key} className="p-2.5">
                    {row[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Methodology</h2>
      <p>{dataset.methodology}</p>

      <h2>More YouTube data</h2>
      <ul>
        {datasets
          .filter((d) => d.slug !== dataset.slug)
          .map((d) => (
            <li key={d.slug}>
              <Link href={`/data/${d.slug}`}>{d.title}</Link>
            </li>
          ))}
      </ul>
      <p>
        Run your own numbers with the{' '}
        <Link href="/youtube-money-calculator">YouTube Money Calculator</Link> and{' '}
        <Link href="/youtube-rpm-calculator">RPM Calculator</Link>.
      </p>
    </ContentPageShell>
  );
}
