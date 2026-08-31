import { tools, toolCount, calculatorCount } from '@/content/tools-metadata';

const fallbackUrl = 'https://yttoolkit.com';

export const site = {
  name: 'YT Toolkit',
  legalName: 'YouTube Toolkit AI',
  tagline: `${toolCount} free YouTube creator tools. No login required.`,
  description: `${toolCount} free YouTube creator tools. Download thumbnails, extract tags, generate AI titles & descriptions, extract transcripts & stats, plus ${calculatorCount} YouTube calculators (earnings, RPM, CPM, watch time). No login required.`,
  keywords: [
    'YouTube creator tools',
    'free YouTube tools',
    'YouTube thumbnail downloader',
    'YouTube tags extractor',
    'YouTube AI title generator',
    'YouTube transcript extractor',
  ],
  supportEmail: 'hello@yttools.pro',
  get url() {
    return process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl;
  },
  /** Leave empty until real profiles exist — fake sameAs hurts trust. */
  sameAs: [] as string[],
  notAffiliated:
    'YT Toolkit is an independent project and is not affiliated with, endorsed by, or sponsored by YouTube, Google, or Alphabet Inc.',
  tools,
} as const;

export type SiteConfig = typeof site;
