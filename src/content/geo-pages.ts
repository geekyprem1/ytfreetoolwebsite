/**
 * Registry of GEO/content pages (not tools). Drives sitemap entries and
 * cross-linking. Tool pages live in tools-metadata.ts; these are the
 * data, comparison, glossary, docs, and programmatic long-tail pages.
 */

export interface GeoPage {
  path: string;
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: number;
  lastModified?: string;
}

import { datasets } from '@/content/data/datasets';
import { comparisons } from '@/content/comparisons';
import { glossaryTerms } from '@/content/glossary';
import { tagNiches } from '@/content/tags-for';
import { postingRegions } from '@/content/best-time-to-post';
import { rankingFilters, filterPath } from '@/content/rankings/filters';

export function geoPages(): GeoPage[] {
  const pages: GeoPage[] = [
    { path: '/tools', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/for-students', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/data', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/glossary', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/api-docs', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/tags-for', changeFrequency: 'monthly', priority: 0.6 },
    { path: '/best-time-to-post', changeFrequency: 'monthly', priority: 0.6 },
    // Live rankings — data changes daily, so advertise it.
    { path: '/youtube-rankings', changeFrequency: 'daily', priority: 0.8 },
    { path: '/youtube-rankings/most-subscribed', changeFrequency: 'daily', priority: 0.8 },
    { path: '/youtube-rankings/fastest-growing', changeFrequency: 'daily', priority: 0.7 },
  ];

  for (const f of rankingFilters) pages.push({ path: filterPath(f), changeFrequency: 'daily', priority: 0.6 });

  for (const d of datasets) pages.push({ path: `/data/${d.slug}`, changeFrequency: 'monthly', priority: 0.7, lastModified: d.lastUpdated });
  for (const c of comparisons) pages.push({ path: `/vs/${c.slug}`, changeFrequency: 'monthly', priority: 0.6 });
  for (const t of glossaryTerms) pages.push({ path: `/glossary/${t.slug}`, changeFrequency: 'yearly', priority: 0.4 });
  for (const n of tagNiches) pages.push({ path: `/tags-for/${n.slug}`, changeFrequency: 'monthly', priority: 0.5 });
  for (const r of postingRegions) pages.push({ path: `/best-time-to-post/${r.slug}`, changeFrequency: 'monthly', priority: 0.5 });

  return pages;
}
