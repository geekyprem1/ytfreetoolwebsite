/**
 * Registry of GEO/content pages (not tools). Drives sitemap entries and
 * cross-linking. Tool pages live in tools-metadata.ts; these are the
 * data, comparison, glossary, docs, and programmatic long-tail pages.
 */

export interface GeoPage {
  path: string;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  priority: number;
}

import { datasets } from '@/content/data/datasets';
import { comparisons } from '@/content/comparisons';
import { glossaryTerms } from '@/content/glossary';
import { tagNiches } from '@/content/tags-for';
import { postingRegions } from '@/content/best-time-to-post';

export function geoPages(): GeoPage[] {
  const pages: GeoPage[] = [
    { path: '/data', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/glossary', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/api-docs', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/tags-for', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/best-time-to-post', changeFrequency: 'monthly', priority: 0.6 },
  ];

  for (const d of datasets) pages.push({ path: `/data/${d.slug}`, changeFrequency: 'monthly', priority: 0.7 });
  for (const c of comparisons) pages.push({ path: `/vs/${c.slug}`, changeFrequency: 'monthly', priority: 0.6 });
  for (const t of glossaryTerms) pages.push({ path: `/glossary/${t.slug}`, changeFrequency: 'yearly', priority: 0.4 });
  for (const n of tagNiches) pages.push({ path: `/tags-for/${n.slug}`, changeFrequency: 'monthly', priority: 0.5 });
  for (const r of postingRegions) pages.push({ path: `/best-time-to-post/${r.slug}`, changeFrequency: 'monthly', priority: 0.5 });

  return pages;
}
