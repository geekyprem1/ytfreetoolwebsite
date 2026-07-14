import Link from 'next/link';
import { getRelatedTools, type ToolMetadata } from '@/content/tools-metadata';
import { Image, Tags, Hash, FileText, Sparkles, PenLine, BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image, Tags, Hash, FileText, Sparkles, PenLine,
  BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare,
};

const iconColors: Record<string, string> = {
  downloader: '#FF3B30',
  extractor: '#10B981',
  'ai-generator': '#8B5CF6',
  analytics: '#3B82F6',
  seo: '#F59E0B',
};

function ToolCard({ tool }: { tool: ToolMetadata }) {
  const Icon = iconMap[tool.icon] || Sparkles;
  const color = iconColors[tool.category] || '#FF3B30';

  return (
    <Link href={tool.route} className="block h-full group">
      <div className="h-full p-4 rounded-xl border bg-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div className="size-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${color}14` }}>
          <span style={{ color }}><Icon className="size-4" /></span>
        </div>
        <h3 className="text-[14px] font-semibold mb-1 group-hover:text-primary transition-colors">{tool.name}</h3>
        <p className="text-[12px] text-muted-foreground line-clamp-2">{tool.description}</p>
      </div>
    </Link>
  );
}

export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedTools(currentSlug);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold tracking-tight">Related Tools</h2>
        <Link href="/#tools" className="text-[13px] text-primary hover:underline flex items-center gap-1 font-medium">
          View all <ArrowRight className="size-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {related.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
