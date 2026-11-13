'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { useUIStore } from '@/stores/ui-store';

export default function MobileNav() {
  const { mobileNavOpen, closeMobileNav } = useUIStore();

  // Lock body scroll when open
  useEffect(() => {
    if (mobileNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMobileNav();
    };
    if (mobileNavOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileNavOpen, closeMobileNav]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          mobileNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobileNav}
        aria-hidden="true"
      />

      {/* Panel */}
      <nav
        className={`fixed inset-y-0 left-0 w-full max-w-sm bg-white z-[70] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="flex flex-col h-full px-6 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <span className="text-lg tracking-[0.3em] uppercase font-light">{SITE_NAME}</span>
            <button
              onClick={closeMobileNav}
              className="p-1 hover:opacity-60 transition-opacity"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileNav}
                className="text-2xl font-light tracking-wide py-3 text-neutral-800 hover:text-neutral-500 transition-colors"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom links */}
          <div className="mt-auto flex flex-col gap-3 border-t border-neutral-100 pt-6">
            <Link
              href="/account"
              onClick={closeMobileNav}
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Account
            </Link>
            <Link
              href="/wishlist"
              onClick={closeMobileNav}
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Wishlist
            </Link>
            <Link
              href="/cart"
              onClick={closeMobileNav}
              className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              Cart
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
