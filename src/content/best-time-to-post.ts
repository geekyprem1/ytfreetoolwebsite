/**
 * Programmatic "best time to post on YouTube in {country}" pages.
 *
 * Recommendations are general best-practice windows (local time) synthesized from
 * commonly reported creator guidance, not measured per-country data. Each page
 * states this and tells creators to verify with their own analytics.
 */

export interface PostingRegion {
  slug: string;
  name: string;
  timezone: string;
}

export const postingRegions: PostingRegion[] = [
  { slug: 'united-states', name: 'United States', timezone: 'ET / PT' },
  { slug: 'united-kingdom', name: 'United Kingdom', timezone: 'GMT' },
  { slug: 'india', name: 'India', timezone: 'IST' },
  { slug: 'canada', name: 'Canada', timezone: 'ET / PT' },
  { slug: 'australia', name: 'Australia', timezone: 'AEST' },
  { slug: 'germany', name: 'Germany', timezone: 'CET' },
  { slug: 'france', name: 'France', timezone: 'CET' },
  { slug: 'brazil', name: 'Brazil', timezone: 'BRT' },
  { slug: 'japan', name: 'Japan', timezone: 'JST' },
  { slug: 'south-korea', name: 'South Korea', timezone: 'KST' },
  { slug: 'mexico', name: 'Mexico', timezone: 'CST' },
  { slug: 'spain', name: 'Spain', timezone: 'CET' },
  { slug: 'italy', name: 'Italy', timezone: 'CET' },
  { slug: 'netherlands', name: 'Netherlands', timezone: 'CET' },
  { slug: 'indonesia', name: 'Indonesia', timezone: 'WIB' },
  { slug: 'philippines', name: 'Philippines', timezone: 'PHT' },
  { slug: 'pakistan', name: 'Pakistan', timezone: 'PKT' },
  { slug: 'nigeria', name: 'Nigeria', timezone: 'WAT' },
  { slug: 'south-africa', name: 'South Africa', timezone: 'SAST' },
  { slug: 'turkey', name: 'Turkey', timezone: 'TRT' },
  { slug: 'saudi-arabia', name: 'Saudi Arabia', timezone: 'AST' },
  { slug: 'united-arab-emirates', name: 'United Arab Emirates', timezone: 'GST' },
  { slug: 'egypt', name: 'Egypt', timezone: 'EET' },
  { slug: 'argentina', name: 'Argentina', timezone: 'ART' },
  { slug: 'poland', name: 'Poland', timezone: 'CET' },
  { slug: 'vietnam', name: 'Vietnam', timezone: 'ICT' },
  { slug: 'thailand', name: 'Thailand', timezone: 'ICT' },
  { slug: 'sweden', name: 'Sweden', timezone: 'CET' },
  { slug: 'russia', name: 'Russia', timezone: 'MSK' },
  { slug: 'bangladesh', name: 'Bangladesh', timezone: 'BST' },
];

export function getPostingRegion(slug: string): PostingRegion | undefined {
  return postingRegions.find((r) => r.slug === slug);
}
