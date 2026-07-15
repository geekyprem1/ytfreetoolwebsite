'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link2, X, Clipboard } from 'lucide-react';
import { useYouTubeUrl } from '@/hooks/use-youtube-url';
import { cn } from '@/lib/utils';

interface YouTubeUrlInputProps {
  onValidUrl: (id: string, url: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  initialUrl?: string;
  autoSubmit?: boolean;
  submitLabel?: string;
}

export function YouTubeUrlInput({
  onValidUrl,
  placeholder,
  className,
  disabled,
  initialUrl,
  autoSubmit = false,
  submitLabel = 'Analyze',
}: YouTubeUrlInputProps) {
  const { url, isValid, videoId, channelId, error, setUrl } = useYouTubeUrl();
  const [submitted, setSubmitted] = useState(false);
  const initialized = useRef(false);

  const activeId = videoId || channelId;

  useEffect(() => {
    if (initialUrl && !initialized.current) {
      initialized.current = true;
      setUrl(initialUrl);
    }
  }, [initialUrl, setUrl]);

  useEffect(() => {
    if (autoSubmit && initialized.current && isValid && activeId && !submitted && !disabled) {
      setSubmitted(true);
      onValidUrl(activeId, url);
    }
  }, [autoSubmit, isValid, activeId, submitted, disabled, url, onValidUrl]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    if (isValid && activeId) {
      onValidUrl(activeId, url);
    }
  }, [isValid, activeId, url, onValidUrl]);

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
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Link2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setSubmitted(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || 'Paste YouTube URL here...'}
            className="pl-10 pr-10 h-12 text-base rounded-xl border-border/80 bg-background md:text-base"
            disabled={disabled}
          />
          {url && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
              type="button"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePaste}
            disabled={disabled}
            title="Paste from clipboard"
            className="h-12 w-12 rounded-xl shrink-0"
            type="button"
          >
            <Clipboard className="size-4" />
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={disabled || !url}
            className="h-12 px-5 rounded-xl bg-[#FF3B30] hover:bg-[#E0352B] text-white shrink-0"
            type="button"
          >
            {submitLabel}
          </Button>
        </div>
      </div>
      {error && submitted && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      {isValid && !submitted && (
        <p className="text-sm text-muted-foreground">
          Valid URL detected. Press Enter or click {submitLabel}.
        </p>
      )}
    </div>
  );
}
