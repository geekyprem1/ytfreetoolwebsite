/** Regions supported by the Trending tool. Codes are ISO 3166-1 alpha-2 (YouTube regionCode). */
export interface TrendingRegion {
  code: string;
  name: string;
  slug: string;
}

export const trendingRegions: TrendingRegion[] = [
  { code: 'US', name: 'United States', slug: 'united-states' },
  { code: 'GB', name: 'United Kingdom', slug: 'united-kingdom' },
  { code: 'IN', name: 'India', slug: 'india' },
  { code: 'CA', name: 'Canada', slug: 'canada' },
  { code: 'AU', name: 'Australia', slug: 'australia' },
  { code: 'DE', name: 'Germany', slug: 'germany' },
  { code: 'FR', name: 'France', slug: 'france' },
  { code: 'BR', name: 'Brazil', slug: 'brazil' },
  { code: 'JP', name: 'Japan', slug: 'japan' },
  { code: 'KR', name: 'South Korea', slug: 'south-korea' },
  { code: 'MX', name: 'Mexico', slug: 'mexico' },
  { code: 'ES', name: 'Spain', slug: 'spain' },
  { code: 'IT', name: 'Italy', slug: 'italy' },
  { code: 'RU', name: 'Russia', slug: 'russia' },
  { code: 'ID', name: 'Indonesia', slug: 'indonesia' },
  { code: 'NL', name: 'Netherlands', slug: 'netherlands' },
  { code: 'PL', name: 'Poland', slug: 'poland' },
  { code: 'TR', name: 'Turkey', slug: 'turkey' },
  { code: 'SA', name: 'Saudi Arabia', slug: 'saudi-arabia' },
  { code: 'AE', name: 'United Arab Emirates', slug: 'united-arab-emirates' },
  { code: 'PK', name: 'Pakistan', slug: 'pakistan' },
  { code: 'BD', name: 'Bangladesh', slug: 'bangladesh' },
  { code: 'NG', name: 'Nigeria', slug: 'nigeria' },
  { code: 'ZA', name: 'South Africa', slug: 'south-africa' },
  { code: 'AR', name: 'Argentina', slug: 'argentina' },
  { code: 'PH', name: 'Philippines', slug: 'philippines' },
  { code: 'VN', name: 'Vietnam', slug: 'vietnam' },
  { code: 'TH', name: 'Thailand', slug: 'thailand' },
  { code: 'EG', name: 'Egypt', slug: 'egypt' },
  { code: 'SE', name: 'Sweden', slug: 'sweden' },
];

export function getRegionBySlug(slug: string): TrendingRegion | undefined {
  return trendingRegions.find((r) => r.slug === slug);
}

export function getRegionByCode(code: string): TrendingRegion | undefined {
  return trendingRegions.find((r) => r.code === code.toUpperCase());
}
