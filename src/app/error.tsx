'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary Caught:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center mb-6 mx-auto">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h2 className="text-2xl font-light text-neutral-900 dark:text-white mb-4">
        Something went wrong
      </h2>
      <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-10 text-sm">
        We encountered an unexpected error while processing your request. Our team has been notified.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => reset()}
          className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
        <Link 
          href="/"
          className="px-8 py-3 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800 text-sm font-medium uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
