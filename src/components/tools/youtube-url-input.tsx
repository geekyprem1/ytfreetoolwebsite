'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Film, X, Clipboard } from 'lucide-react';
import { useYouTubeUrl } from '@/hooks/use-youtube-url';
import { cn } from '@/lib/utils';

interface YouTubeUrlInputProps {
  onValidUrl: (videoId: string, url: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  initialUrl?: string;
  autoSubmit?: boolean;
}

export function YouTubeUrlInput({
  onValidUrl,
  placeholder,
  className,
  disabled,
  initialUrl,
  autoSubmit = false,
}: YouTubeUrlInputProps) {
  const { url, isValid, videoId, error, setUrl } = useYouTubeUrl();
  const [submitted, setSubmitted] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialUrl && !initialized.current) {
      initialized.current = true;
      setUrl(initialUrl);
    }
  }, [initialUrl, setUrl]);

  useEffect(() => {
    if (autoSubmit && initialized.current && isValid && videoId && !submitted && !disabled) {
      setSubmitted(true);
      onValidUrl(videoId, url);
    }
  }, [autoSubmit, isValid, videoId, submitted, disabled, url, onValidUrl]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    if (isValid && videoId) {
      onValidUrl(videoId, url);
    }
  }, [isValid, videoId, url, onValidUrl]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      // ignore
    }
  };

  const handleClear = () => {
    setUrl('');
    setSubmitted(false);
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Film className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setSubmitted(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || 'Paste YouTube URL here...'}
            className="pl-9 pr-16"
            disabled={disabled}
          />
          {url && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Button variant="outline" size="icon" onClick={handlePaste} disabled={disabled} title="Paste from clipboard">
          <Clipboard className="size-4" />
        </Button>
        <Button onClick={handleSubmit} disabled={disabled || !url}>
          Analyze
        </Button>
      </div>
      {error && submitted && (
        <p className="text-xs text-destructive flex items-center gap-1">{error}</p>
      )}
      {isValid && !submitted && (
        <p className="text-xs text-green-600 dark:text-green-400">
          ✓ Valid YouTube URL detected. Press Enter or click Analyze.
        </p>
      )}
    </div>
  );
}
