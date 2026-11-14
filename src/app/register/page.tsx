import type { Metadata } from 'next';
import RegisterForm from '@/components/auth/RegisterForm';
import { SITE_NAME } from '@/lib/constants';

export const metadata: Metadata = {
  title: `Create Account — ${SITE_NAME}`,
  description: 'Join AXIOM to access exclusive collections, manage your orders, and curate your wardrobe.',
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left: Fashion image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-neutral-100 dark:bg-neutral-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4 px-12">
            <h2 className="font-serif text-5xl text-[var(--text-primary)] leading-tight">
              Join the<br />Movement
            </h2>
            <p className="text-sm text-[var(--text-secondary)] font-light max-w-sm mx-auto leading-relaxed">
              Create your AXIOM account to unlock exclusive access to new collections, personalized recommendations, and a curated shopping experience.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-40" />
      </div>

      {/* Right: Register form */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <p className="text-caption text-[var(--text-secondary)] mb-3">Get Started</p>
            <h1 className="font-serif text-3xl text-[var(--text-primary)]">Create Account</h1>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
