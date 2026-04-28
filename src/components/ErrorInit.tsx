'use client';

import { useEffect } from 'react';
import { initGlobalErrorHandlers } from '@/lib/errors';

/**
 * Initializes global error handlers (unhandled errors + promise rejections).
 * Mount once in the root layout. No UI output.
 */
export default function ErrorInit() {
  useEffect(() => {
    initGlobalErrorHandlers();
  }, []);

  return null;
}
