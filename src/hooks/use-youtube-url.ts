'use client';

import { useState, useCallback } from 'react';
import { parseYouTubeUrl } from '@/lib/youtube/url-parser';

interface YouTubeUrlState {
  url: string;
  isValid: boolean;
  videoId: string | null;
  channelId: string | null;
  type: 'video' | 'channel' | null;
  error: string | null;
}

export function useYouTubeUrl() {
  const [state, setState] = useState<YouTubeUrlState>({
    url: '',
    isValid: false,
    videoId: null,
    channelId: null,
    type: null,
    error: null,
  });

  const setUrl = useCallback((rawUrl: string) => {
    const trimmed = rawUrl.trim();
    if (!trimmed) {
      setState({
        url: '',
        isValid: false,
        videoId: null,
        channelId: null,
        type: null,
        error: null,
      });
      return;
    }

    const parsed = parseYouTubeUrl(trimmed);
    if (!parsed) {
      setState({
        url: trimmed,
        isValid: false,
        videoId: null,
        channelId: null,
        type: null,
        error: 'Invalid YouTube URL. Please check and try again.',
      });
      return;
    }

    setState({
      url: trimmed,
      isValid: true,
      videoId: parsed.type === 'video' ? parsed.id : null,
      channelId: parsed.type === 'channel' ? parsed.id : null,
      type: parsed.type,
      error: null,
    });
  }, []);

  return { ...state, setUrl };
}
