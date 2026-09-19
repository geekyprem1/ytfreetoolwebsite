import {
  BadgeDollarSign,
  BarChart3,
  Calculator,
  Calendar,
  Captions,
  Clock,
  Code2,
  DollarSign,
  Eye,
  FileEdit,
  FileText,
  Fingerprint,
  GalleryHorizontal,
  Gift,
  GitCompare,
  Hash,
  Heart,
  Image,
  ImagePlay,
  LayoutTemplate,
  Lightbulb,
  ListVideo,
  MessageSquare,
  PenLine,
  Radio,
  ScrollText,
  Search,
  Signature,
  Smartphone,
  Sparkles,
  Tags,
  Target,
  Timer,
  TrendingUp,
  UserCircle,
  Users,
  Zap,
} from 'lucide-react';
import type { ToolCategory } from '@/content/tools-metadata';

export type IconComponent = React.ComponentType<{ className?: string; strokeWidth?: number }>;

/**
 * Single source of truth for tool icons.
 *
 * Keys must match the `icon` field in @/content/tools-metadata. When adding a tool
 * with a new icon, import it here only — every nav, grid, and related-tools surface
 * reads from this map. Unknown keys fall back to `Sparkles`.
 */
export const iconMap: Record<string, IconComponent> = {
  BadgeDollarSign,
  BarChart3,
  Calculator,
  Calendar,
  Captions,
  Clock,
  Code2,
  DollarSign,
  Eye,
  FileEdit,
  FileText,
  Fingerprint,
  GalleryHorizontal,
  Gift,
  GitCompare,
  Hash,
  Heart,
  Image,
  ImagePlay,
  LayoutTemplate,
  Lightbulb,
  ListVideo,
  MessageSquare,
  PenLine,
  Radio,
  ScrollText,
  Search,
  Signature,
  Smartphone,
  Sparkles,
  Tags,
  Target,
  Timer,
  TrendingUp,
  UserCircle,
  Users,
  Zap,
  // Legacy alias kept for registry entries that use `HashIcon`.
  HashIcon: Hash,
};

/**
 * Fallback for registry entries whose `icon` is missing from `iconMap`.
 *
 * Resolve icons with a plain lookup in render — `iconMap[tool.icon] ?? FallbackToolIcon` —
 * not via a helper function. A function call that returns a component trips the
 * react-hooks/static-components compiler rule.
 */
export const FallbackToolIcon: IconComponent = Sparkles;

/**
 * Short category labels — used in nav, dropdown, footer.
 * Typed as Record<ToolCategory, string> so a new category fails the build
 * until every label below is filled in.
 */
export const categoryLabels: Record<ToolCategory, string> = {
  downloader: 'Downloaders',
  extractor: 'Extractors',
  'ai-generator': 'AI Generators',
  analytics: 'Analytics',
  seo: 'SEO Tools',
  calculator: 'Calculators',
};

/** Long category headings — used on the homepage tools grid. */
export const categoryLabelsLong: Record<ToolCategory, string> = {
  ...categoryLabels,
  calculator: 'YouTube Calculators',
};

export const categoryDesc: Record<ToolCategory, string> = {
  downloader: 'Download YouTube assets in any resolution',
  extractor: 'Pull tags, transcripts, and channel keywords',
  'ai-generator': 'AI-powered titles, descriptions, hooks, and more',
  analytics: 'Detailed video and channel analytics',
  seo: 'Optimize your content for YouTube search',
  calculator: 'Estimate earnings, RPM, CPM, watch time and growth — instant',
};
