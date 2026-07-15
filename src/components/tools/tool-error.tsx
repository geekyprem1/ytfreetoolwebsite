'use client';

import { AlertCircle, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolErrorProps {
  message: string;
  onRetry?: () => void;
}

const friendlyMessages: Record<string, string> = {
  VIDEO_NOT_FOUND: 'Video not found. It may be private or deleted.',
  TRANSCRIPT_UNAVAILABLE: 'Transcript is not available for this video.',
  TRANSCRIPT_DISABLED: 'Transcripts are disabled for this video.',
  TAGS_NOT_AVAILABLE: 'This video has no tags.',
  YOUTUBE_API_ERROR: 'YouTube is temporarily unavailable. Please try again.',
  YOUTUBE_QUOTA_EXCEEDED: 'Service is at capacity. Please try again later.',
  RATE_LIMITED: 'Too many requests. Please slow down.',
  AI_GENERATION_FAILED: 'AI generation failed. Please try again.',
  AI_SAFETY_BLOCKED: 'Content blocked by safety filters.',
};

export function ToolError({ message, onRetry }: ToolErrorProps) {
  const friendlyMessage = friendlyMessages[message] || message;

  return (
    <div className="mt-6 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-4">
      <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
      <div className="space-y-2 min-w-0">
        <p className="text-sm font-medium text-destructive">Something went wrong</p>
        <p className="text-sm text-muted-foreground">{friendlyMessage}</p>
        {onRetry && (
          <Button variant="outline" size="sm" onClick={onRetry} className="mt-1 rounded-lg">
            <RotateCw className="size-3 mr-1.5" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
