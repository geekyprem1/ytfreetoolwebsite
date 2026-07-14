export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'YouTube Toolkit AI';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://yttoolkit.com';
export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  'Free YouTube creator toolkit with 15+ tools. No login required.';

export const TOOL_PHASES: Record<number, string> = {
  1: 'MVP',
  2: 'Expansion',
  3: 'Advanced',
};

export const AD_SLOT_IDS = {
  sidebar: 'sidebar-ad',
  'below-tool': 'below-tool-ad',
  'in-content': 'in-content-ad',
  homepage: 'homepage-ad',
} as const;
