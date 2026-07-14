'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { tools } from '@/content/tools-metadata';
import { cn } from '@/lib/utils';

const categoryLabels: Record<string, string> = {
  downloader: 'Downloaders',
  extractor: 'Extractors',
  'ai-generator': 'AI Generators',
  analytics: 'Analytics',
  seo: 'SEO Tools',
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
        className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md transition-colors flex items-center gap-1"
        onClick={() => setOpen(!open)}
      >
        Tools
        <ChevronDown className={cn('size-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-[560px] bg-background border rounded-lg shadow-lg p-4 z-50">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(categorized).map(([category, categoryTools]) => (
              <div key={category} className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {categoryLabels[category] || category}
                </p>
                {categoryTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={tool.route}
                    className="block text-sm py-1 rounded hover:text-primary hover:bg-muted/50 px-2 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
