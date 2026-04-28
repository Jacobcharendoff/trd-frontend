'use client';

import { Component, type ReactNode } from 'react';
import { reportError } from '@/lib/errors';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * React Error Boundary — catches rendering crashes and shows
 * a user-friendly fallback instead of a white screen.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    reportError(error, {
      componentStack: info.componentStack || undefined,
      source: 'ErrorBoundary',
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[400px] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold text-[#1d1d1f] mb-3">
              Something went wrong
            </h2>
            <p className="text-[#1d1d1f]/60 mb-6">
              We hit a snag loading this section. Try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-[#1d1d1f] text-white rounded-full font-medium text-sm hover:bg-[#1d1d1f]/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
