'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { tools, type ToolMetadata } from '@/content/tools-metadata';
import {
  Image, Tags, Hash, FileText, Sparkles, PenLine,
  BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare, ArrowRight, BadgeDollarSign,
  Calculator, TrendingUp, DollarSign, Heart, Eye, Smartphone, Radio, Calendar, Timer,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image, Tags, Hash, FileText, Sparkles, PenLine,
  BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare, BadgeDollarSign,
  Calculator, TrendingUp, DollarSign, Heart, Eye, Smartphone, Radio, Calendar, Timer,
  HashIcon: Hash,
};

const categoryLabels: Record<string, string> = {
  downloader: 'Downloaders',
  extractor: 'Extractors',
  'ai-generator': 'AI Generators',
  analytics: 'Analytics',
  seo: 'SEO Tools',
  calculator: 'YouTube Calculators',
};

const categoryDesc: Record<string, string> = {
  downloader: 'Download YouTube assets in any resolution',
  extractor: 'Pull tags, transcripts, and channel keywords',
  'ai-generator': 'AI-powered titles, descriptions, hooks, and more',
  analytics: 'Detailed video and channel analytics',
  seo: 'Optimize your content for YouTube search',
  calculator: 'Estimate earnings, RPM, CPM, watch time and growth — instant',
};

function ToolRow({ tool, index }: { tool: ToolMetadata; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const Icon = iconMap[tool.icon] || Sparkles;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: (index % 4) * 0.04 }}
    >
      <Link href={tool.route} className="group flex items-start gap-3.5 py-3.5">
        <Icon className="size-4 text-muted-foreground mt-1 shrink-0 group-hover:text-primary transition-colors" strokeWidth={1.75} />
        <div className="min-w-0 flex-1">
          <h4 className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
            {tool.name}
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
            {tool.description}
          </p>
        </div>
        <ArrowRight className="size-3.5 text-muted-foreground/0 group-hover:text-muted-foreground shrink-0 mt-1.5 transition-colors" />
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

  const categories = Object.entries(categorized);

  return (
    <section id="tools" className="section-pad border-t hairline bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-16 max-w-xl">
          <h2 className="text-display text-heading-lg mb-3">
            All 27 tools, free forever
          </h2>
          <p className="text-lead">
            Everything a YouTube creator needs — thumbs, tags, AI, analytics, SEO and calculators — in one place.
          </p>
        </div>

        <div className="space-y-14 md:space-y-16">
          {categories.map(([category, categoryTools]) => (
            <div key={category}>
              <div className="mb-4 pb-3 border-b border-border/60">
                <h3 className="text-display text-xl font-semibold tracking-tight">
                  {categoryLabels[category] || category}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {categoryDesc[category]} · {categoryTools.length} tool{categoryTools.length > 1 ? 's' : ''}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                {categoryTools.map((tool, i) => (
                  <ToolRow key={tool.slug} tool={tool} index={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
