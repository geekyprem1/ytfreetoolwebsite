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

const catMeta: Record<string, { hex: string; desc: string }> = {
  downloader: { hex: '#FF3B30', desc: 'Download YouTube assets in any resolution' },
  extractor: { hex: '#10B981', desc: 'Pull tags, transcripts, and channel keywords' },
  'ai-generator': { hex: '#8B5CF6', desc: 'AI-powered titles, descriptions, hooks, and more' },
  analytics: { hex: '#3B82F6', desc: 'Detailed video and channel analytics' },
  seo: { hex: '#F59E0B', desc: 'Optimize your content for YouTube search' },
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
  const hex = catMeta[tool.category]?.hex || '#FF3B30';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
    >
      <Link href={tool.route} className="block group">
        <div className="flex items-start gap-4 p-5 rounded-xl border border-transparent hover:border-border hover:bg-card hover:shadow-md transition-all duration-200">
          <div className="size-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${hex}14` }}>
            <span style={{ color: hex }}><Icon className="size-[18px]" /></span>
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-[14px] font-semibold tracking-tight group-hover:text-primary transition-colors">
              {tool.name}
            </h4>
            <p className="text-[13px] text-muted-foreground leading-relaxed mt-1 line-clamp-2">
              {tool.description}
            </p>
          </div>
          <ArrowRight className="size-4 text-muted-foreground/30 shrink-0 mt-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
        </div>
      </Link>
    </motion.div>
  );
}

function CategorySection({ category, tools: categoryTools, isLast }: { category: string; tools: ToolMetadata[]; isLast: boolean }) {
  const meta = catMeta[category] || { hex: '#FF3B30', desc: '' };

  return (
    <div className={`${isLast ? 'mb-0' : 'mb-16'}`}>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-10 w-1.5 rounded-full shrink-0" style={{ backgroundColor: meta.hex }} />
        <div>
          <h3 className="text-[18px] font-bold tracking-tight">
            {categoryLabels[category] || category}
          </h3>
          <p className="text-[13px] text-muted-foreground">
            {meta.desc} · {categoryTools.length} tool{categoryTools.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categoryTools.map((tool, i) => (
          <ToolCard key={tool.slug} tool={tool} index={i} />
        ))}
      </div>
    </div>
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

  const categories = Object.entries(categorized);

  return (
    <section id="tools" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-[13px] font-semibold text-primary mb-5">
            <Sparkles className="size-3.5" />
            Complete Toolkit
          </div>
          <h2 className="text-3xl md:text-[40px] font-bold tracking-tight mb-3">
            All 15+ tools, free forever
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Everything a YouTube creator needs — thumbs, tags, AI, analytics, and SEO — in one place.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {categories.map(([category, categoryTools], i) => (
            <CategorySection
              key={category}
              category={category}
              tools={categoryTools}
              isLast={i === categories.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
