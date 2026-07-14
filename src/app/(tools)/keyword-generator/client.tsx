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
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { useToolApi } from '@/hooks/use-tool-api';

const LANGUAGES = [
  { value: 'en', label: 'English' }, { value: 'hi', label: 'Hindi' }, { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' }, { value: 'de', label: 'German' }, { value: 'pt', label: 'Portuguese' },
];

interface KeywordResponse {
  keywords: { keyword: string; difficulty: string; popularity: string; intent: string; relatedKeywords: string[]; suggestedQuestions: string[] }[];
}

const difficultyColor: Record<string, string> = { easy: 'bg-green-500/10 text-green-600', medium: 'bg-yellow-500/10 text-yellow-600', hard: 'bg-red-500/10 text-red-600' };

export function KeywordGeneratorClient() {
  const [seedKeyword, setSeedKeyword] = useState('');
  const [language, setLanguage] = useState('en');
  const { data, isLoading, error, execute, reset } = useToolApi<KeywordResponse>();

  const handleGenerate = () => {
    execute('/api/ai/generate-keywords', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seedKeyword, language }),
    });
  };

  const allKeywords = data ? data.keywords.map((k) => k.keyword).join(', ') : '';

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ToolInput label="Seed Keyword" required>
          <Input value={seedKeyword} onChange={(e) => setSeedKeyword(e.target.value)} placeholder="e.g., youtube seo" disabled={isLoading}
            onKeyDown={(e) => e.key === 'Enter' && seedKeyword && handleGenerate()} />
        </ToolInput>
        <ToolInput label="Language">
          <Select value={language} onChange={(e) => setLanguage(e.target.value)} options={LANGUAGES} disabled={isLoading} />
        </ToolInput>
      </div>

      <Button onClick={handleGenerate} disabled={!seedKeyword || isLoading} className="w-full">
        {isLoading ? 'Generating...' : 'Generate Keywords'}
      </Button>

      {isLoading && <ToolLoading variant="list" />}
      {error && <ToolError message={error} onRetry={reset} />}

      {data && !isLoading && (
        <ToolOutput title={`${data.keywords.length} Keywords for "${seedKeyword}"`}>
          <div className="space-y-3">
            <OutputActions copyText={allKeywords} copyLabel="All keywords" />
            {data.keywords.map((kw, i) => (
              <div key={i} className="rounded-lg border p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{kw.keyword}</span>
                  <div className="flex gap-1.5">
                    <Badge variant="outline" className={difficultyColor[kw.difficulty] || 'text-xs'}>{kw.difficulty}</Badge>
                    <Badge variant="outline" className="text-xs">{kw.popularity}</Badge>
                    <Badge variant="outline" className="text-xs">{kw.intent}</Badge>
                  </div>
                </div>
                {kw.relatedKeywords.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Related: {kw.relatedKeywords.join(', ')}
                  </p>
                )}
                {kw.suggestedQuestions.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Questions: {kw.suggestedQuestions.join(' | ')}
                  </p>
                )}
              </div>
            ))}
            <Button variant="outline" onClick={handleGenerate} className="w-full">🔄 Regenerate</Button>
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="keyword-generator" />
    </div>
  );
}
