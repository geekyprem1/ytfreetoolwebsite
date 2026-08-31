'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Smoothly animates a displayed number toward `target` using an ease-out curve.
 * Used by the live counters so values glide between polled updates instead of
 * jumping, which reads as "live" without needing a faster (quota-heavy) poll.
 */
export function useAnimatedNumber(target: number, durationMs = 1500): number {
  const [display, setDisplay] = useState(target);
  const fromRef = useRef(target);
  const startRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - startRef.current) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (target - from) * eased));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, durationMs]);

  return display;
}
