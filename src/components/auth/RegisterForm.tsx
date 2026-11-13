'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
    setLoading(false);

    if (result.success) {
      router.push('/account');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-xs rounded-xs">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="reg-first" className="block text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium mb-2">
            First Name
          </label>
          <input
            id="reg-first"
            type="text"
            value={formData.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-[var(--border-primary)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            required
          />
        </div>
        <div>
          <label htmlFor="reg-last" className="block text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium mb-2">
            Last Name
          </label>
          <input
            id="reg-last"
            type="text"
            value={formData.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="w-full px-4 py-3 bg-transparent border border-[var(--border-primary)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium mb-2">
          Email Address
        </label>
        <input
          id="reg-email"
          type="email"
          value={formData.email}
          onChange={(e) => update('email', e.target.value)}
          className="w-full px-4 py-3 bg-transparent border border-[var(--border-primary)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor="reg-pass" className="block text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium mb-2">
          Password
        </label>
        <input
          id="reg-pass"
          type="password"
          value={formData.password}
          onChange={(e) => update('password', e.target.value)}
          className="w-full px-4 py-3 bg-transparent border border-[var(--border-primary)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          placeholder="Min. 8 chars, 1 uppercase, 1 number"
          required
          minLength={8}
        />
      </div>

      <div>
        <label htmlFor="reg-confirm" className="block text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium mb-2">
          Confirm Password
        </label>
        <input
          id="reg-confirm"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => update('confirmPassword', e.target.value)}
          className="w-full px-4 py-3 bg-transparent border border-[var(--border-primary)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          placeholder="Re-enter your password"
          required
          minLength={8}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-medium tracking-[0.16em] uppercase hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>

      <p className="text-center text-xs text-[var(--text-secondary)]">
        Already have an account?{' '}
        <Link href="/login" className="text-[var(--text-primary)] font-medium hover:underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </form>
  );
}
