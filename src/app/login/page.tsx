import type { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Sign In — ${SITE_NAME}`,
  description: 'Sign in to your AXIOM account to manage orders, wishlist, and more.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Fashion image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-neutral-100 dark:bg-neutral-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-12">
            <h2 className="font-serif text-5xl text-[var(--text-primary)] leading-tight">
              Welcome<br />Back
            </h2>
            <p className="text-sm text-[var(--text-secondary)] font-light max-w-sm mx-auto leading-relaxed">
              Sign in to access your curated collections, track orders, and continue your fashion journey with AXIOM.
            </p>
          </div>
        </div>
        {/* Decorative accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-40" />
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <p className="text-caption text-[var(--text-secondary)] mb-3">Account</p>
            <h1 className="font-serif text-3xl text-[var(--text-primary)]">Sign In</h1>
          </div>
          <Suspense fallback={<div className="text-center text-sm text-[var(--text-secondary)]">Loading...</div>}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
