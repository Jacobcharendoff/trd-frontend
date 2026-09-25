'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Scroll progress of an element through the viewport.
 * mode "through": 0 when the top enters the bottom of the viewport, 1 when the bottom leaves the top.
 * mode "pinned":  0 when the top hits the top of the viewport, 1 when the bottom hits the bottom
 *                 (for tall sections with a sticky child).
 */
export function useScrollProgress(ref: RefObject<HTMLElement | null>, mode: 'through' | 'pinned' = 'through') {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setProgress(mode === 'pinned' ? 0.5 : 0.5);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === 'pinned') {
        const total = rect.height - vh;
        p = total > 0 ? -rect.top / total : 0;
      } else {
        p = (vh - rect.top) / (vh + rect.height);
      }
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, mode]);

  return progress;
}

/** Map progress from [a,b] to [0,1], clamped. */
export function segment(p: number, a: number, b: number) {
  return Math.min(1, Math.max(0, (p - a) / (b - a)));
}
