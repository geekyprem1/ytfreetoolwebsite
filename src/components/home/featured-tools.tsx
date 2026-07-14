'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Image, FileText, Tags, Search, PenLine } from 'lucide-react';
import { tools } from '@/content/tools-metadata';

const featuredSlugs = ['thumbnail-downloader', 'title-generator', 'transcript-extractor', 'tags-extractor', 'video-statistics', 'description-generator'];
const featuredTools = featuredSlugs.map(s => tools.find(t => t.slug === s)).filter(Boolean);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image, FileText, Tags, Search, Sparkles, PenLine,
};

const categoryColors: Record<string, string> = {
  downloader: '#FF3B30',
  extractor: '#10B981',
  'ai-generator': '#8B5CF6',
  analytics: '#3B82F6',
  seo: '#F59E0B',
};

function FeaturedCard({ tool, index }: { tool: (typeof featuredTools)[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = iconMap[tool?.icon || ''] || Sparkles;
  const color = categoryColors[tool?.category || ''] || '#FF3B30';

  if (!tool) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={tool.route} className="block h-full group">
        <div className="relative h-full rounded-2xl border bg-card hover:shadow-xl transition-all duration-300 p-5 pb-4 flex flex-col overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundImage: `linear-gradient(to right, ${color}, ${color}50)` }} />
          
          <div className="flex items-center gap-3 mb-3">
            <div className="size-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}14` }}>
              <span style={{ color }}><Icon className="size-5" /></span>
            </div>
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary">
              {tool.category === 'ai-generator' ? 'AI' : tool.category}
            </span>
          </div>

          <h3 className="text-[17px] font-bold tracking-tight mb-1.5 group-hover:text-primary transition-colors">
            {tool.name}
          </h3>
          <p className="text-[13px] text-muted-foreground leading-relaxed mb-4 flex-1">
            {tool.description}
          </p>

          <div className="flex items-center gap-1.5 text-[13px] font-semibold text-primary group-hover:gap-2.5 transition-all">
            Open Tool <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedTools() {
  return (
    <section className="py-24 px-4 bg-secondary/50 border-y border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-[13px] font-medium text-primary mb-5">
            <Sparkles className="size-3.5" />
            Most Popular
          </div>
          <h2 className="text-3xl md:text-[40px] font-bold tracking-tight mb-3">
            Featured tools
          </h2>
          <p className="text-[16px] text-muted-foreground max-w-lg">
            The tools creators use every day. Start here and explore everything.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool, i) => (
            <FeaturedCard key={tool?.slug} tool={tool} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="#tools"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-primary hover:underline"
          >
            View all 15+ tools <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
