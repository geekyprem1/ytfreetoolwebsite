'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Image, FileText, Tags, Search, PenLine, BarChart3 } from 'lucide-react';
import { tools } from '@/content/tools-metadata';

const featuredSlugs = ['thumbnail-downloader', 'title-generator', 'transcript-extractor', 'tags-extractor', 'video-statistics', 'description-generator'];
const featuredTools = featuredSlugs.map(s => tools.find(t => t.slug === s)).filter(Boolean);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image, FileText, Tags, Search, Sparkles, PenLine, BarChart3,
};

export function FeaturedTools() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section className="section-pad border-t hairline">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 md:mb-16 max-w-xl">
          <h2 className="text-display text-heading-lg mb-3">
            Featured tools
          </h2>
          <p className="text-lead">
            The tools creators use every day. Start here and explore everything.
          </p>
        </div>

        <div ref={ref} className="divide-y divide-border/60 border-y border-border/60">
          {featuredTools.map((tool, i) => {
            if (!tool) return null;
            const Icon = iconMap[tool.icon] || Sparkles;
            return (
              <motion.div
                key={tool.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <Link
                  href={tool.route}
                  className="group flex items-start sm:items-center gap-4 py-5 md:py-6 hover:bg-secondary/40 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="size-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <Icon className="size-[18px] text-foreground/70" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold tracking-tight group-hover:text-primary transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground/40 shrink-0 mt-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10">
          <Link
            href="#tools"
            className="inline-flex items-center gap-2 text-base font-medium text-primary hover:underline underline-offset-4"
          >
            View all 27 tools <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
