'use client';

import Link from 'next/link';
import { SITE_NAME, FOOTER_LINKS, SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-16 py-16 md:py-24">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-lg tracking-[0.3em] uppercase font-light">
              {SITE_NAME}
            </Link>
            <p className="mt-4 text-sm text-neutral-400 leading-relaxed max-w-xs">
              Premium fashion crafted with intention. Every piece is designed to elevate your everyday.
            </p>
            {/* Social */}
            <div className="flex items-center gap-5 mt-6">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-neutral-400 hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  <span className="text-xs tracking-[0.1em] uppercase">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
