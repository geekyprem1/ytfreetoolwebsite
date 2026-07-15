'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';
import { Search, Link2, Film, Sparkles } from 'lucide-react';

const toolSuggestions: Record<string, { name: string; slug: string; icon: React.ComponentType<{ className?: string }> }[]> = {
  video: [
    { name: 'Thumbnail Downloader', slug: 'thumbnail-downloader', icon: Film },
    { name: 'Tags Extractor', slug: 'tags-extractor', icon: Sparkles },
    { name: 'Transcript Extractor', slug: 'transcript-extractor', icon: Search },
    { name: 'Video Statistics', slug: 'video-statistics', icon: Sparkles },
  ],
  channel: [
    { name: 'Channel Statistics', slug: 'channel-statistics', icon: Sparkles },
    { name: 'Channel Tags', slug: 'channel-tags', icon: Sparkles },
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
    <div className="w-full max-w-xl mx-auto">
      <div
        className={`relative rounded-2xl border bg-card transition-all duration-300 ${
          focused ? 'border-primary/40 shadow-lg shadow-primary/5 ring-2 ring-primary/10' : 'border-border shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3 p-2 pr-4">
          <div className="shrink-0 pl-3">
            <Link2 className={`size-5 transition-colors duration-300 ${focused || url ? 'text-primary' : 'text-muted-foreground'}`} />
          </div>
          <Input
            type="text"
            placeholder="Paste YouTube URL..."
            value={url}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="flex-1 border-0 bg-transparent px-0 h-11 text-[15px] placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
          />
        </div>
      </div>

      <AnimatePresence>
        {parsed && toolSuggestions[parsed.type] && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 overflow-hidden"
          >
            <div className="bg-card rounded-xl border p-3 shadow-sm">
              <p className="text-xs text-muted-foreground mb-2 px-1 font-medium uppercase tracking-wider">
                {parsed.type === 'video' ? 'Detected Video' : 'Detected Channel'}
              </p>
              <div className="flex flex-wrap gap-2">
                {toolSuggestions[parsed.type]?.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.slug}
                      href={`/${tool.slug}?url=${encodeURIComponent(url)}`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-muted text-[13px] font-medium transition-colors border border-transparent hover:border-border"
                    >
                      <Icon className="size-3.5 text-primary" />
                      {tool.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
