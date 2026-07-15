import Link from 'next/link';
import { getRelatedTools } from '@/content/tools-metadata';
import {
  Image, Tags, Hash, FileText, Sparkles, PenLine, BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare, ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image, Tags, Hash, FileText, Sparkles, PenLine,
  BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare,
};

export function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedTools(currentSlug);

  return (
    <section className="mt-16 pt-10 border-t border-border/60">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-display text-xl font-semibold tracking-tight">Related tools</h2>
        <Link
          href="/#tools"
          className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
        >
          View all <ArrowRight className="size-3.5" />
        </Link>
      </div>
      <ul className="divide-y divide-border/60">
        {related.map((tool) => {
          const Icon = iconMap[tool.icon] || Sparkles;
          return (
            <li key={tool.slug}>
              <Link
                href={tool.route}
                className="group flex items-center gap-3 py-3.5 hover:text-primary transition-colors"
              >
                <Icon className="size-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" strokeWidth={1.75} />
                <span className="text-base font-medium flex-1">{tool.name}</span>
                <ArrowRight className="size-3.5 text-muted-foreground/0 group-hover:text-muted-foreground transition-colors" />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
