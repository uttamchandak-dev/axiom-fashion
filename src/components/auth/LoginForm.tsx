'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter, useSearchParams } from 'next/navigation';

interface LoginFormProps {
  redirectTo?: string;
}

export default function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const type = searchParams?.get('type') === 'admin' ? 'admin' : 'customer';
    const result = await login(email, password, type);
    setLoading(false);

    if (result.success) {
      router.push(redirectTo || '/account');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-xs rounded-xs">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="login-email" className="block text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium mb-2">
          Email Address
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-transparent border border-[var(--border-primary)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="login-password" className="block text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium mb-2">
          Password
        </label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 bg-transparent border border-[var(--border-primary)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="accent-neutral-900 dark:accent-white w-3.5 h-3.5" />
          <span className="text-xs text-[var(--text-secondary)]">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors underline-offset-2 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-medium tracking-[0.16em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </button>

      <p className="text-center text-xs text-[var(--text-secondary)]">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-[var(--text-primary)] font-medium hover:underline underline-offset-2">
          Create one
        </Link>
      </p>
    </form>
  );
}
