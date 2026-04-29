'use client';

import { useEffect } from 'react';
import { extractUTMFromURL, setUTMCookie } from '@/lib/utm';

/**
 * UTMCapture — silent client component that runs once on page load.
 * Reads UTM params from the URL and persists them in a 30-day cookie.
 * Only writes if UTM params are actually present (preserves existing attribution).
 *
 * Mount in layout.tsx alongside <Analytics />.
 */
export default function UTMCapture() {
  useEffect(() => {
    const params = extractUTMFromURL(new URLSearchParams(window.location.search));
    if (params) {
      setUTMCookie(params);
    }
  }, []);

  return null;
}
