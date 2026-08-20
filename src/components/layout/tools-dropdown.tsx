'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { tools } from '@/content/tools-metadata';
import { ChevronDown, Image, Tags, Hash, FileText, Sparkles, PenLine, BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare, BadgeDollarSign, Calculator, TrendingUp, DollarSign, Heart, Eye, Smartphone, Radio, Calendar, Timer } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  downloader: 'Downloaders',
  extractor: 'Extractors',
  'ai-generator': 'AI Generators',
  analytics: 'Analytics',
  seo: 'SEO Tools',
  calculator: 'Calculators',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image, Tags, Hash, FileText, Sparkles, PenLine,
  BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare, BadgeDollarSign,
  Calculator, TrendingUp, DollarSign, Heart, Eye, Smartphone, Radio, Calendar, Timer,
  HashIcon: Hash,
};

export function ToolsDropdown() {
  const [open, setOpen] = useState(false);

  const categorized = tools.reduce(
    (acc, tool) => {
      const cat = tool.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat]!.push(tool);
      return acc;
    },
    {} as Record<string, typeof tools>,
  );

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors flex items-center gap-1"
        onClick={() => setOpen(!open)}
      >
        Tools
        <ChevronDown className={`size-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-2 w-[640px] max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain bg-card border rounded-2xl shadow-xl p-5 z-50 scrollbar-thin"
          >
            <div className="grid grid-cols-2 gap-5">
              {Object.entries(categorized).map(([category, categoryTools]) => (
                <div key={category} className="space-y-2">
                  <p className="text-caption font-semibold text-muted-foreground uppercase tracking-wider px-2">
                    {categoryLabels[category] || category}
                  </p>
                  {categoryTools.map((tool) => {
                    const Icon = iconMap[tool.icon] || Sparkles;
                    return (
                      <Link
                        key={tool.slug}
                        href={tool.route}
                        className="flex items-center gap-2.5 py-2 px-2 rounded-lg text-sm hover:bg-secondary transition-colors font-medium group"
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                        <span className="leading-tight">{tool.name}</span>
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
              <span className="text-xs text-muted-foreground">27 tools — all free, no login</span>
              <Link href="/#tools" onClick={() => setOpen(false)} className="text-xs font-medium text-primary hover:underline">
                View all →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
