import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getRelatedTools, type ToolMetadata } from '@/content/tools-metadata';
import { Image, Tags, Hash, FileText, Sparkles, PenLine, HashIcon, BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image,
  Tags,
  Hash,
  FileText,
  Sparkles,
  PenLine,
  HashIcon,
  BarChart3,
  Users,
  Search,
  Zap,
  Clock,
  Lightbulb,
  Target,
  GitCompare,
};

function ToolCard({ tool }: { tool: ToolMetadata }) {
  const Icon = iconMap[tool.icon] || Sparkles;
  return (
    <Link href={tool.route} className="group">
      <Card className="h-full transition-colors hover:border-primary/50 hover:bg-muted/50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Icon className="size-5 text-primary shrink-0" />
            <CardTitle className="text-sm group-hover:text-primary transition-colors">
              {tool.name}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xs">{tool.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedTools(currentSlug);

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Related Tools</h2>
        <Link
          href="/"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          View All
          <ArrowRight className="size-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {related.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
