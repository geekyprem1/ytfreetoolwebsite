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
import { Loader2 } from 'lucide-react';

const TONES = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'clickbait', label: 'Clickbait' },
  { value: 'educational', label: 'Educational' },
  { value: 'humorous', label: 'Humorous' },
];

const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
];

interface TitleResponse {
  titles: { title: string; seoScore: number; emotionalAppeal: string }[];
  meta: { tokensUsed: number; model: string };
}

export function TitleGeneratorClient() {
  const [topic, setTopic] = useState('');
  const [keyword, setKeyword] = useState('');
  const [language, setLanguage] = useState('en');
  const [tone, setTone] = useState('professional');
  const [count, setCount] = useState(5);

  const { data, isLoading, error, execute, reset } = useToolApi<TitleResponse>();

  const handleGenerate = () => {
    execute('/api/ai/generate-titles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, keyword, language, tone, count }),
    });
  };

  const isValid = topic.length >= 3 && keyword.length >= 1;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Topic" description="What is your video about?" required>
          <Textarea value={topic} onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., How to grow on YouTube in 2025" rows={3} disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Keyword" description="Your target SEO keyword" required>
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g., youtube growth tips" disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && isValid && handleGenerate()} />
        </ToolInput>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <ToolInput label="Tone">
          <Select value={tone} onChange={(e) => setTone(e.target.value)} options={TONES} disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Language">
          <Select value={language} onChange={(e) => setLanguage(e.target.value)} options={LANGUAGES} disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Titles">
          <Slider value={count} min={3} max={15} step={1} onChange={setCount} disabled={isLoading} />
        </ToolInput>
      </div>

      <Button onClick={handleGenerate} disabled={!isValid || isLoading} className="w-full" size="lg">
        {isLoading ? (
          <><Loader2 className="size-4 mr-2 animate-spin" /> Generating... (10-30 sec)</>
        ) : (
          `Generate ${count} Titles`
        )}
      </Button>

      {isLoading && (
        <div className="text-center py-8">
          <ToolLoading variant="list" />
          <p className="text-xs text-muted-foreground mt-4">AI is thinking... this may take 10-30 seconds</p>
        </div>
      )}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <ToolOutput title={`${data.titles.length} Title Ideas`}>
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground">
                Tokens: {data.meta.tokensUsed} · {data.meta.model}
              </p>
              <OutputActions copyText={data.titles.map((t) => t.title).join('\n')} copyLabel="All titles" />
            </div>
            {data.titles.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group">
                <span className="text-xs font-medium text-muted-foreground w-5 text-right pt-0.5 tabular-nums">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">SEO: {item.seoScore}/100</span>
                    <span className="text-xs text-muted-foreground">{item.emotionalAppeal}</span>
                  </div>
                </div>
                <OutputActions copyText={item.title} copyLabel={`Title #${i + 1}`} />
              </div>
            ))}
          </div>
          <Button variant="outline" onClick={handleGenerate} className="mt-4 w-full" disabled={isLoading}>
            Regenerate
          </Button>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="title-generator" />
    </div>
  );
}
