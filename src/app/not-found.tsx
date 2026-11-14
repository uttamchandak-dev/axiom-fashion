import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-6xl font-light text-neutral-900 dark:text-white mb-4">404</h2>
      <h3 className="text-xl font-medium text-neutral-800 dark:text-neutral-200 mb-6">
        Page Not Found
      </h3>
      <p className="text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-10">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        href="/"
        className="px-8 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black text-sm font-medium uppercase tracking-widest hover:opacity-90 transition-opacity"
      >
        Return to Home
      </Link>
    </div>
  );
}
