'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('axiom_cookie_consent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('axiom_cookie_consent', 'all');
    window.dispatchEvent(new Event('axiom_consent_updated'));
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('axiom_cookie_consent', 'necessary');
    window.dispatchEvent(new Event('axiom_consent_updated'));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-slide-up pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="bg-white border border-neutral-200 shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 w-full max-w-4xl pointer-events-auto">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-sm font-medium text-neutral-900 mb-2 tracking-wide uppercase">Privacy Settings</h3>
            <p className="text-xs text-neutral-500 leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. Read our <Link href="#" className="underline hover:text-neutral-900">Privacy Policy</Link> for more information.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleAcceptNecessary}
              className="px-6 py-3 border border-neutral-200 text-xs font-medium tracking-widest text-neutral-600 hover:text-neutral-900 hover:border-neutral-900 transition-colors uppercase whitespace-nowrap"
            >
              Necessary Only
            </button>
            <button
              onClick={handleAcceptAll}
              className="px-6 py-3 bg-neutral-900 text-white text-xs font-medium tracking-widest hover:bg-black transition-colors uppercase whitespace-nowrap"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
