'use client';

import { useState } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToolApi } from '@/hooks/use-tool-api';
import { formatPlaylistExport, getPlaylistKeywordStats, type PlaylistDraft } from '@/lib/youtube/playlist-content';
import { Loader2 } from 'lucide-react';

const TONES = [
  { value: 'educational', label: 'Educational' },
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'storytelling', label: 'Storytelling' },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
];

interface PlaylistResponse {
  playlists: PlaylistDraft[];
  meta?: { tokensUsed: number; model: string };
}

export function PlaylistGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [keyword, setKeyword] = useState('');
  const [videoThemes, setVideoThemes] = useState('');
  const [tone, setTone] = useState('educational');
  const [language, setLanguage] = useState('en');
  const [count, setCount] = useState(5);

  const { data, isLoading, error, execute, reset } = useToolApi<PlaylistResponse>();

  const handleGenerate = () => {
    execute('/api/ai/generate-playlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, audience: audience || 'general YouTube viewers', keyword, videoThemes, tone, language, count }),
    });
  };

  const isValid = topic.trim().length >= 3;
  const exportText = data ? formatPlaylistExport(data.playlists) : '';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Playlist topic" description="What connects the videos?" required>
          <Input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., YouTube SEO for beginners" disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Target audience" description="Who should follow this series?">
          <Input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g., new creators in India" disabled={isLoading} />
        </ToolInput>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Target keyword" description="Optional phrase to check exactly in each option">
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g., youtube seo" disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Video themes" description="One topic per line, or a short comma-separated list">
          <Textarea value={videoThemes} onChange={(e) => setVideoThemes(e.target.value)} placeholder={'Keyword research\nTitles and thumbnails\nYouTube Analytics'} rows={3} disabled={isLoading} />
        </ToolInput>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ToolInput label="Tone"><Select value={tone} onChange={(e) => setTone(e.target.value)} options={TONES} disabled={isLoading} /></ToolInput>
        <ToolInput label="Language"><Select value={language} onChange={(e) => setLanguage(e.target.value)} options={LANGUAGES} disabled={isLoading} /></ToolInput>
        <ToolInput label="Options"><Slider value={count} min={3} max={10} step={1} onChange={setCount} disabled={isLoading} /></ToolInput>
      </div>

      <Button onClick={handleGenerate} disabled={!isValid || isLoading} className="w-full" size="lg">
        {isLoading ? <><Loader2 className="size-4 mr-2 animate-spin" />Generating... (10-30 sec)</> : `Generate ${count} playlist options`}
      </Button>

      {isLoading && <div className="text-center py-8"><ToolLoading variant="list" /><p className="text-xs text-muted-foreground mt-4">AI is drafting distinct playlist angles...</p></div>}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <ToolOutput title={`${data.playlists.length} playlist options`}>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs text-muted-foreground">Character counts and keyword coverage are measured in your browser.</p>
              <OutputActions copyText={exportText} copyLabel="All playlist options" downloadContent={exportText} downloadFilename="youtube-playlist-options.txt" />
            </div>
            {data.playlists.map((draft, index) => {
              const stats = getPlaylistKeywordStats(draft, keyword);
              return (
                <article key={`${draft.title}-${index}`} className="rounded-xl border p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">Option {index + 1}</p>
                      <h3 className="font-semibold text-base break-words">{draft.title}</h3>
                    </div>
                    <OutputActions copyText={`Title: ${draft.title}\n\nDescription:\n${draft.description}`} copyLabel={`Option ${index + 1}`} />
                  </div>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{draft.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>Title: {stats.titleLength} chars</span>
                    <span>Description: {stats.descriptionLength} chars</span>
                    {keyword.trim() && <span>Exact keyword: {stats.titleKeywordCount + stats.descriptionKeywordCount}× ({stats.titleKeywordCount} title, {stats.descriptionKeywordCount} description)</span>}
                  </div>
                </article>
              );
            })}
            <Button variant="outline" onClick={handleGenerate} className="w-full" disabled={isLoading}>Regenerate</Button>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-playlist-title-description-generator" />
    </div>
  );
}
