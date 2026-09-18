import { toolCount } from '@/content/tools-metadata';

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'YouTube Toolkit AI';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://yttools.pro';
/**
 * Derived from the registry on purpose — no env override.
 * NEXT_PUBLIC_SITE_DESCRIPTION goes stale every time a tool is added.
 */
export const SITE_DESCRIPTION = `Free YouTube creator toolkit with ${toolCount} tools. No login required.`;

export const TOOL_PHASES: Record<number, string> = {
  1: 'MVP',
  2: 'Expansion',
  3: 'Advanced',
  4: 'Growth',
  5: 'GEO',
};

export const AD_SLOT_IDS = {
  sidebar: 'sidebar-ad',
  'below-tool': 'below-tool-ad',
  'in-content': 'in-content-ad',
  homepage: 'homepage-ad',
} as const;
