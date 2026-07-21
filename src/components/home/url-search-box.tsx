'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';
import { Link2, Film, Search, BarChart3, Tags, Users, Hash, BadgeDollarSign } from 'lucide-react';

const toolSuggestions: Record<string, { name: string; slug: string; icon: React.ComponentType<{ className?: string }> }[]> = {
  video: [
    { name: 'Thumbnail Downloader', slug: 'thumbnail-downloader', icon: Film },
    { name: 'Tags Extractor', slug: 'tags-extractor', icon: Tags },
    { name: 'Transcript Extractor', slug: 'transcript-extractor', icon: Search },
    { name: 'Video Statistics', slug: 'video-statistics', icon: BarChart3 },
  ],
  channel: [
    { name: 'Channel Statistics', slug: 'channel-statistics', icon: Users },
    { name: 'Channel Tags', slug: 'channel-tags', icon: Hash },
    { name: 'Monetization Checker', slug: 'monetization-checker', icon: BadgeDollarSign },
  ],
};

export function UrlSearchBox() {
  const [url, setUrl] = useState('');
  const [focused, setFocused] = useState(false);
  const [parsed, setParsed] = useState<ReturnType<typeof parseYouTubeUrl>>(null);

  const handleChange = (value: string) => {
    setUrl(value);
    const result = parseYouTubeUrl(value);
    setParsed(result);
  };

  return (
    <div className="w-full">
      <div
        className={`relative rounded-2xl border bg-background/80 backdrop-blur-sm transition-all duration-300 ${
          focused ? 'border-foreground/20 ring-1 ring-foreground/10' : 'border-border/80'
        }`}
      >
        <div className="flex items-center gap-3 p-2.5 pr-4">
          <div className="shrink-0 pl-3">
            <Link2 className={`size-5 transition-colors duration-300 ${focused || url ? 'text-foreground' : 'text-muted-foreground'}`} />
          </div>
          <Input
            type="text"
            placeholder="Paste YouTube URL..."
            value={url}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-1 border-0 bg-transparent px-0 h-12 text-base placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none md:text-base"
          />
        </div>
      </div>

      <AnimatePresence>
        {parsed && toolSuggestions[parsed.type] && (
          <motion.div
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-4 overflow-hidden"
          >
            <p className="text-caption text-muted-foreground mb-2.5 px-1 font-medium tracking-[0.06em] uppercase">
              {parsed.type === 'video' ? 'Detected video' : 'Detected channel'}
            </p>
            <div className="flex flex-col divide-y divide-border/60 border-t border-border/60">
              {toolSuggestions[parsed.type]?.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}?url=${encodeURIComponent(url)}`}
                    className="flex items-center gap-3 py-3.5 px-1 text-base font-medium text-foreground/90 hover:text-primary transition-colors"
                  >
                    <Icon className="size-4 text-muted-foreground" />
                    {tool.name}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
