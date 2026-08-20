'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { tools } from '@/content/tools-metadata';
import { Separator } from '@/components/ui/separator';
import { Image, Tags, Hash, FileText, Sparkles, PenLine, BarChart3, Users, Search, Zap, Clock, Lightbulb, Target, GitCompare, BadgeDollarSign, Calculator, TrendingUp, DollarSign, Heart, Eye, Smartphone, Radio, Calendar, Timer } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
}

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

export function MobileNav({ links }: { links: NavLink[] }) {
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
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-14 z-40 bg-background overflow-y-auto"
          >
            <nav className="flex flex-col p-6 gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-3 text-base font-medium rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Separator className="my-3" />

              <p className="px-3 py-1 text-caption font-semibold text-muted-foreground uppercase tracking-wider">
                All Tools — {tools.length} free
              </p>

              {Object.entries(categorized).map(([category, categoryTools]) => (
                <div key={category} className="mt-3">
                  <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {categoryLabels[category] || category} · {categoryTools.length}
                  </p>
                  {categoryTools.map((tool) => {
                    const Icon = iconMap[tool.icon] || Sparkles;
                    return (
                      <Link
                        key={tool.slug}
                        href={tool.route}
                        className="flex items-center gap-3 px-3 py-2.5 text-base rounded-lg hover:bg-secondary transition-colors font-medium"
                        onClick={() => setOpen(false)}
                      >
                        <Icon className="size-4 text-muted-foreground shrink-0" />
                        {tool.name}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
