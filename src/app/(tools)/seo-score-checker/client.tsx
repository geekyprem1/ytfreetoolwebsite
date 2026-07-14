'use client';

import { useState } from 'react';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { ToolLoading } from '@/components/tools/tool-loading';
import { ToolError } from '@/components/tools/tool-error';
import { RelatedTools } from '@/components/tools/related-tools';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Select } from '@/components/ui/select';
import { useToolApi } from '@/hooks/use-tool-api';

const CATEGORIES = [
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'music', label: 'Music' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'tech', label: 'Technology' },
  { value: 'vlog', label: 'Vlog' },
  { value: 'tutorial', label: 'Tutorial / How-To' },
  { value: 'review', label: 'Review' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'sports', label: 'Sports' },
];

interface SeoScoreResponse {
  overallScore: number;
  breakdown: Record<string, { score: number; maxScore: number; suggestions: string[]; weight: number }>;
  topSuggestions: string[];
}

export function SeoScoreCheckerClient() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const { data, isLoading, error, execute, reset } = useToolApi<SeoScoreResponse>();

  const handleAnalyze = () => {
    execute('/api/ai/seo-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, tags, hashtags, keyword, category }),
    });
  };

  const isValid = title && keyword && description;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Video Title" required>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Your video title..." disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Target Keyword" required>
          <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Main keyword..." disabled={isLoading} />
        </ToolInput>
      </div>

      <ToolInput label="Description" required>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Your video description..." rows={5} disabled={isLoading} />
      </ToolInput>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToolInput label="Tags (comma-separated)">
          <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="tag1, tag2, tag3..." disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Hashtags">
          <Input value={hashtags} onChange={(e) => setHashtags(e.target.value)} placeholder="#tag1 #tag2..." disabled={isLoading} />
        </ToolInput>
        <ToolInput label="Category">
          <Select value={category} onChange={(e) => setCategory(e.target.value)} options={[{ value: '', label: 'Select...' }, ...CATEGORIES]} disabled={isLoading} />
        </ToolInput>
      </div>

      <Button onClick={handleAnalyze} disabled={!isValid || isLoading} className="w-full">
        {isLoading ? 'Analyzing...' : 'Check SEO Score'}
      </Button>

      {isLoading && <ToolLoading variant="card" />}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <ToolOutput title="SEO Score Results">
          <div className="space-y-6">
            <div className="flex items-center justify-center py-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                  <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="8"
                    strokeLinecap="round"
                    className={data.overallScore >= 70 ? 'text-green-500' : data.overallScore >= 40 ? 'text-yellow-500' : 'text-red-500'}
                    strokeDasharray={`${(data.overallScore / 100) * 327} 327`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{data.overallScore}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(data.breakdown).map(([key, cat]) => (
                <div key={key} className="rounded-lg border p-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-sm font-bold">{cat.score}/{cat.maxScore}</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${cat.score >= 70 ? 'bg-green-500' : cat.score >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                    />
                  </div>
                  {cat.suggestions.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">{cat.suggestions[0]}</p>
                  )}
                </div>
              ))}
            </div>

            {data.topSuggestions.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="text-sm font-semibold mb-2">Top Suggestions</h4>
                  <ul className="space-y-1">
                    {data.topSuggestions.map((s, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary font-bold">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="seo-score-checker" />
    </div>
  );
}
