'use client';

import { useState, useEffect, useCallback } from 'react';

const MAX_RECENT = 5;

export function useRecentSearches(toolSlug: string) {
  const storageKey = `recent-searches-${toolSlug}`;

  const [searches, setSearches] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setSearches(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
  }, [storageKey]);

  const addSearch = useCallback(
    (url: string) => {
      setSearches((prev) => {
        const filtered = prev.filter((s) => s !== url);
        const updated = [url, ...filtered].slice(0, MAX_RECENT);
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch {
          // ignore storage errors
        }
        return updated;
      });
    },
    [storageKey],
  );

  const clearSearches = useCallback(() => {
    setSearches([]);
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [storageKey]);

  return { searches, addSearch, clearSearches };
}
