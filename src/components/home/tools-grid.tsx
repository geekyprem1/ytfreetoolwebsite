'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { tools, toolCount, type ToolCategory, type ToolMetadata } from '@/content/tools-metadata';
import { iconMap, FallbackToolIcon, categoryLabelsLong, categoryDesc } from '@/lib/utils/tool-icons';
import { ArrowRight } from 'lucide-react';

function ToolRow({ tool, index }: { tool: ToolMetadata; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const Icon = iconMap[tool.icon] ?? FallbackToolIcon;

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
    {} as Record<ToolCategory, ToolMetadata[]>,
  );

  const categories = Object.entries(categorized) as [ToolCategory, ToolMetadata[]][];

  return (
    <section id="tools" className="section-pad border-t hairline bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 md:mb-16 max-w-xl">
          <h2 className="text-display text-heading-lg mb-3">
            All {toolCount} tools, free forever
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
                  {categoryLabelsLong[category] || category}
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
