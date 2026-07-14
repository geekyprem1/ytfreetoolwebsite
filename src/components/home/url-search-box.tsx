'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';

const toolSuggestions: Record<string, { name: string; slug: string }[]> = {
  video: [
    { name: 'Thumbnail Downloader', slug: 'thumbnail-downloader' },
    { name: 'Tags Extractor', slug: 'tags-extractor' },
    { name: 'Transcript Extractor', slug: 'transcript-extractor' },
    { name: 'Video Statistics', slug: 'video-statistics' },
  ],
  channel: [
    { name: 'Channel Statistics', slug: 'channel-statistics' },
    { name: 'Channel Tags', slug: 'channel-tags' },
  ],
};

export function UrlSearchBox() {
  const [url, setUrl] = useState('');
  const [parsed, setParsed] = useState<ReturnType<typeof parseYouTubeUrl>>(null);

  const handleChange = (value: string) => {
    setUrl(value);
    const result = parseYouTubeUrl(value);
    setParsed(result);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m16 16 4 4"/></svg>
        </div>
        <Input
          type="text"
          placeholder="Paste YouTube URL here..."
          value={url}
          onChange={(e) => handleChange(e.target.value)}
          className="pl-10 pr-4 h-14 text-lg rounded-xl"
        />
      </div>

      {parsed && toolSuggestions[parsed.type] && (
        <div className="mt-4 animate-slide-up">
          <p className="text-sm text-muted-foreground mb-3">
            Detected: <span className="font-semibold text-foreground">{parsed.type === 'video' ? 'Video' : 'Channel'}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {toolSuggestions[parsed.type]?.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}?url=${encodeURIComponent(url)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-accent/80 text-sm font-medium transition-colors"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
