'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NAV_LINKS, SITE_NAME } from '@/lib/constants';
import { useUIStore } from '@/stores/ui-store';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useAuthStore } from '@/stores/auth-store';
import ThemeToggle from '@/components/ui/ThemeToggle';
import NotificationDropdown from '@/components/admin/NotificationDropdown';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { openMobileNav, openSearch, openCartDrawer } = useUIStore();
  const cartCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getCount());
  const { user, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu + Search (left) */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={openMobileNav}
              className="p-1 hover:opacity-60 transition-opacity"
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>

          {/* Desktop navigation (left) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] tracking-[0.12em] uppercase text-neutral-800 dark:text-neutral-300 hover:text-neutral-500 dark:hover:text-neutral-100 transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo (center) */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 text-lg md:text-xl tracking-[0.3em] uppercase font-light"
          >
            {SITE_NAME}
          </Link>

          {/* Actions (right) */}
          <div className="flex items-center gap-4 md:gap-5">
            <button
              onClick={openSearch}
              className="p-1 hover:opacity-60 transition-opacity"
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            <ThemeToggle />

            <Link
              href="/wishlist"
              className="p-1 hover:opacity-60 transition-opacity relative hidden md:block"
              aria-label="Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {user && user.role !== 'customer' && (
              <NotificationDropdown />
            )}

            <Link
              href={user ? "/account" : "/login"}
              className="p-1 hover:opacity-60 transition-opacity hidden md:flex items-center justify-center"
              aria-label="Account"
            >
              {user ? (
                <div className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-[10px] font-medium uppercase">
                  {user.firstName?.[0] || ''}{user.lastName?.[0] || ''}
                </div>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </Link>

            <button
              onClick={openCartDrawer}
              className="p-1 hover:opacity-60 transition-opacity relative"
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
