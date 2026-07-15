import { tools } from '@/content/tools-metadata';

const fallbackUrl = 'https://yttoolkit.com';

export const site = {
  name: 'YT Toolkit',
  legalName: 'YouTube Toolkit AI',
  tagline: '15+ free YouTube creator tools. No login required.',
  description:
    'Free YouTube creator toolkit with 15+ tools. Thumbnail Downloader, Tags Extractor, Transcript Extractor, AI Title & Description Generator, analytics, and SEO helpers. No login required.',
  supportEmail: 'hello@yttoolkit.com',
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
