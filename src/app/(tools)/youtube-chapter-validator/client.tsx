'use client';

import { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, FileText, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { OutputActions } from '@/components/tools/output-actions';
import { RelatedTools } from '@/components/tools/related-tools';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolOutput } from '@/components/tools/tool-output';
import { validateChapters } from '@/lib/youtube/chapter-validator';

export function YouTubeChapterValidatorClient() {
  const [sourceText, setSourceText] = useState('');
  const [videoDuration, setVideoDuration] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const durationValue = Number(videoDuration);
  const result = useMemo(
    () => validateChapters(sourceText, Number.isFinite(durationValue) && durationValue > 0 ? durationValue : undefined),
    [durationValue, sourceText],
  );

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type && file.type !== 'text/plain' && !file.name.toLowerCase().endsWith('.txt')) {
      setFileError('Choose a plain-text TXT file.');
      return;
    }

    try {
      setSourceText(await file.text());
      setFileName(file.name);
      setFileError(null);
      setShowResult(false);
    } catch {
      setFileError('The TXT file could not be read in your browser.');
    } finally {
      event.target.value = '';
    }
  };

  const validate = () => {
    if (!sourceText.trim()) return;
    setShowResult(true);
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2">
        <ToolInput label="Paste chapter timestamps" required description="One timestamp and title per line, such as 0:00 Intro">
          <Textarea
            value={sourceText}
            onChange={(event) => { setSourceText(event.target.value); setShowResult(false); setFileName(null); }}
            placeholder={'0:00 Intro\n0:20 The problem\n1:10 The solution'}
            rows={12}
          />
        </ToolInput>
        <div className="space-y-4">
          <ToolInput label="Or upload a TXT file" description="Read locally in your browser; no upload to a server" error={fileError}>
            <div className="flex items-center gap-2 rounded-lg border border-dashed border-input p-3">
              <Upload className="size-4 text-muted-foreground" aria-hidden="true" />
              <Input type="file" accept=".txt,text/plain" onChange={handleFileChange} className="border-0 p-0 file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary-foreground" />
            </div>
            {fileName && <p className="text-xs text-muted-foreground">Loaded locally: {fileName}</p>}
          </ToolInput>
          <ToolInput label="Video length (optional)" description="Seconds; checks the final chapter against the real ending">
            <Input type="number" min="0" step="1" value={videoDuration} onChange={(event) => { setVideoDuration(event.target.value); setShowResult(false); }} placeholder="600" inputMode="decimal" />
          </ToolInput>
          <div className="rounded-lg border bg-muted/20 p-3 text-sm text-muted-foreground">
            <FileText className="mb-2 size-4 text-primary" aria-hidden="true" />
            The validator checks format only. YouTube Studio still controls chapter availability for the channel and video.
          </div>
        </div>
      </section>

      <Button className="w-full" onClick={validate} disabled={!sourceText.trim()}>
        Validate chapter timestamps
      </Button>

      {showResult && (
        <ToolOutput title="Chapter validation result">
          <div className="space-y-5">
            <section className={`rounded-xl border p-4 sm:p-5 ${result.isValid ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-amber-500/40 bg-amber-500/5'}`}>
              <div className="flex gap-3">
                {result.isValid ? <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" /> : <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />}
                <div>
                  <h2 className="font-semibold">{result.isValid ? 'Ready to paste into YouTube' : `${result.issues.length} issue${result.issues.length === 1 ? '' : 's'} to fix`}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{result.chapters.length} valid timestamp{result.chapters.length === 1 ? '' : 's'} parsed. {result.isValid ? 'The list meets the validator rules.' : 'Fix the lines below, then run the validator again.'}</p>
                </div>
              </div>
            </section>

            {result.issues.length > 0 && (
              <section className="rounded-xl border p-4">
                <h3 className="font-semibold">Issues found</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {result.issues.map((issue, index) => <li key={`${issue.code}-${issue.lineNumber ?? 'global'}-${index}`} className="flex gap-2"><span className="font-mono text-xs text-amber-700 dark:text-amber-300">{issue.lineNumber ? `L${issue.lineNumber}` : 'Info'}</span><span>{issue.message}</span></li>)}
                </ul>
              </section>
            )}

            {result.cleanedText && (
              <section className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="font-semibold">Cleaned chapter block</h3><p className="text-sm text-muted-foreground">Titles are preserved; timestamps are normalized.</p></div><OutputActions copyText={result.cleanedText} copyLabel="Cleaned chapters" downloadContent={result.cleanedText} downloadFilename="youtube-chapters.txt" downloadMimeType="text/plain" /></div>
                <Textarea value={result.cleanedText} readOnly rows={Math.min(12, Math.max(4, result.chapters.length + 1))} className="font-mono text-sm" aria-label="Cleaned chapter block" />
              </section>
            )}
          </div>
        </ToolOutput>
      )}

      <RelatedTools currentSlug="youtube-chapter-validator" />
    </div>
  );
}
