'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { tools } from '@/content/tools-metadata';
import { ChevronDown, Play, Image, Tags, Hash, FileText, Sparkles, PenLine, BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  downloader: 'Downloaders',
  extractor: 'Extractors',
  'ai-generator': 'AI Generators',
  analytics: 'Analytics',
  seo: 'SEO Tools',
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Image, Tags, Hash, FileText, Sparkles, PenLine,
  BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare,
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
            className="absolute top-full left-0 mt-2 w-[560px] bg-card border rounded-2xl shadow-xl p-5 z-50"
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
                        <Icon className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        {tool.name}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
