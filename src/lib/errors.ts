/**
 * Centralized error reporting utility.
 *
 * Currently logs to console in development and sends to /api/errors
 * in production. When you're ready for Sentry or similar, swap the
 * reportError implementation — everything else stays the same.
 */

interface ErrorContext {
  source?: string;
  componentStack?: string;
  url?: string;
  userId?: string;
  [key: string]: unknown;
}

export function reportError(error: Error | unknown, context?: ErrorContext) {
  const err = error instanceof Error ? error : new Error(String(error));
  const payload = {
    message: err.message,
    stack: err.stack,
    ...context,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : undefined,
  };

  // Always log locally
  console.error('[TRD Error]', payload);

  // In production, fire to our error endpoint (non-blocking)
  if (
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost'
  ) {
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {
      // If error reporting itself fails, don't recurse
    });
  }
}

/**
 * Global unhandled error + promise rejection capture.
 * Call once in a client-side layout or root component.
 */
export function initGlobalErrorHandlers() {
  if (typeof window === 'undefined') return;

  window.addEventListener('error', (event) => {
    reportError(event.error || event.message, {
      source: 'window.onerror',
      url: event.filename,
    });
  });

  window.addEventListener('unhandledrejection', (event) => {
    reportError(event.reason, { source: 'unhandledrejection' });
  });
}
