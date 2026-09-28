'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface UseToolApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
}

interface UseToolApiReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  execute: (url: string | URL, init?: RequestInit) => Promise<T | null>;
  reset: () => void;
}

export function useToolApi<T = unknown>(options: UseToolApiOptions<T> = {}): UseToolApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  // Keep the latest callbacks in a ref so `execute` stays referentially stable.
  // Callers usually pass an inline object (or nothing, which defaults to `{}`),
  // and depending on it directly made `execute` change every render — which
  // reset any effect/interval that lists it as a dependency.
  const optionsRef = useRef(options);
  useEffect(() => {
    optionsRef.current = options;
  });

  const execute = useCallback(
    async (url: string | URL, init?: RequestInit): Promise<T | null> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(url, {
          ...init,
          signal: controller.signal,
        });

        const json = await res.json();

        if (!res.ok || !json.success) {
          const message = json.error?.message || 'Something went wrong. Please try again.';
          setError(message);
          optionsRef.current.onError?.(message);
          toast.error(message);
          return null;
        }

        setData(json.data);
        optionsRef.current.onSuccess?.(json.data);
        return json.data;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return null;
        }
        const message = err instanceof Error ? err.message : 'Network error. Please try again.';
        setError(message);
        optionsRef.current.onError?.(message);
        toast.error(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { data, isLoading, error, execute, reset };
}
