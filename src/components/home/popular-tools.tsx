import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { tools, type ToolMetadata } from '@/content/tools-metadata';

const iconMap: Record<string, string> = {
  Image: '🖼️', Tags: '🏷️', Hash: '#️⃣', FileText: '📄', Sparkles: '✨',
  PenLine: '✍️', HashIcon: '🔖', BarChart3: '📊', Users: '👥', Search: '🔍',
  Zap: '⚡', Clock: '🕐', Lightbulb: '💡', Target: '🎯', GitCompare: '⚖️',
};

const categoryLabels: Record<string, string> = {
  downloader: 'Downloaders',
  extractor: 'Extractors',
  'ai-generator': 'AI Generators',
  analytics: 'Analytics',
  seo: 'SEO Tools',
};

function ToolCard({ tool }: { tool: ToolMetadata }) {
  return (
    <Link href={tool.route}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
        <CardHeader>
          <div className="text-3xl mb-2">{iconMap[tool.icon] || '🔧'}</div>
          <CardTitle className="text-base group-hover:text-primary transition-colors">{tool.name}</CardTitle>
          <CardDescription className="text-xs">{tool.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export function PopularTools() {
  const categorized = tools.reduce(
    (acc, tool) => {
      const cat = tool.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat]!.push(tool);
      return acc;
    },
    {} as Record<string, ToolMetadata[]>,
  );

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {Object.entries(categorized).map(([category, categoryTools]) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold mb-6">
            {categoryLabels[category] || category}
            <span className="text-sm font-normal text-muted-foreground ml-2">
              ({categoryTools.length} tools)
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
