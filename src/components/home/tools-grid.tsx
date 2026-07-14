'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { tools, type ToolMetadata } from '@/content/tools-metadata';
import {
  Image, Tags, Hash, FileText, Sparkles, PenLine,
  BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare, ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image, Tags, Hash, FileText, Sparkles, PenLine,
  BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare,
};

const colors: Record<string, { hex: string; bg: string }> = {
  downloader: { hex: '#FF3B30', bg: 'bg-secondary' },
  extractor: { hex: '#10B981', bg: 'bg-transparent' },
  'ai-generator': { hex: '#8B5CF6', bg: 'bg-secondary/50' },
  analytics: { hex: '#3B82F6', bg: 'bg-transparent' },
  seo: { hex: '#F59E0B', bg: 'bg-secondary/50' },
};

const categoryLabels: Record<string, string> = {
  downloader: 'Downloaders',
  extractor: 'Extractors',
  'ai-generator': 'AI Generators',
  analytics: 'Analytics',
  seo: 'SEO Tools',
};

function ToolCard({ tool, index }: { tool: ToolMetadata; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const Icon = iconMap[tool.icon] || Sparkles;
  const hex = colors[tool.category]?.hex || '#FF3B30';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay: (index % 4) * 0.04 }}
    >
      <Link href={tool.route} className="block group">
        <div className="flex items-start gap-3 p-4 rounded-xl border border-transparent hover:border-border hover:bg-card hover:shadow-md transition-all duration-200">
          <div className="size-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${hex}14` }}>
            <span style={{ color: hex }}><Icon className="size-4" /></span>
          </div>
          <div className="min-w-0">
            <h4 className="text-[14px] font-semibold tracking-tight group-hover:text-primary transition-colors truncate">
              {tool.name}
            </h4>
            <p className="text-[12px] text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
              {tool.description}
            </p>
          </div>
          <ArrowRight className="size-3.5 text-muted-foreground/40 shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-all" />
        </div>
      </Link>
    </motion.div>
  );
}

export function ToolsGrid() {
  const categorized = tools.reduce(
    (acc, tool) => {
      const cat = tool.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat]!.push(tool);
      return acc;
    },
    {} as Record<string, ToolMetadata[]>,
  );

  let globalIndex = 0;
  const categories = Object.entries(categorized);

  return (
    <section id="tools" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-[13px] font-medium text-primary mb-5">
            <Sparkles className="size-3.5" />
            Complete Toolkit
          </div>
          <h2 className="text-3xl md:text-[40px] font-bold tracking-tight mb-3">
            All 15+ free tools
          </h2>
          <p className="text-[17px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Everything from downloading thumbnails to AI-powered content generation in one place.
          </p>
        </div>

        {categories.map(([category, categoryTools], catIdx) => {
          const color = colors[category];
          const hex = color?.hex || '#FF3B30';
          const bg = color?.bg || 'bg-transparent';
          return (
            <div
              key={category}
              className={`mb-6 last:mb-0 rounded-3xl px-6 py-8 ${bg}`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-9 w-1.5 rounded-full shrink-0" style={{ backgroundColor: hex }} />
                <div>
                  <h3 className="text-[18px] font-bold tracking-tight">
                    {categoryLabels[category] || category}
                  </h3>
                  <p className="text-[12px] text-muted-foreground">
                    {categoryTools.length} tool{categoryTools.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {categoryTools.map((tool) => {
                  const idx = globalIndex++;
                  return <ToolCard key={tool.slug} tool={tool} index={idx} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
