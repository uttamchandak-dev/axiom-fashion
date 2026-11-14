'use client';

import { useState, useEffect } from 'react';

interface ARButtonProps {
  modelUrl?: string;
  iosSrc?: string;
  title?: string;
  className?: string;
}

export default function ARButton({
  modelUrl = '/models/clothing/overcoat.glb',
  iosSrc,
  title = 'Garment',
  className = '',
}: ARButtonProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check for iOS Quick Look support or WebXR
    const userAgent = navigator.userAgent || navigator.vendor;
    const isAppleDevice = /iPad|iPhone|iPod/.test(userAgent);
    setIsIOS(isAppleDevice);

    // Check if device is mobile or has XR
    const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
    setIsSupported(isMobile);
  }, []);

  const handleLaunchAR = () => {
    if (isIOS && iosSrc) {
      const anchor = document.createElement('a');
      anchor.setAttribute('rel', 'ar');
      anchor.appendChild(document.createElement('img'));
      anchor.setAttribute('href', iosSrc);
      anchor.click();
    } else {
      // Android Scene Viewer Intent
      const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
        window.location.origin + modelUrl
      )}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
      window.location.href = intentUrl;
    }
  };

  return (
    <button
      onClick={handleLaunchAR}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md border border-neutral-300 text-neutral-900 text-xs font-medium tracking-[0.14em] uppercase hover:bg-neutral-900 hover:text-white transition-all shadow-xs rounded-xs ${className}`}
      title="View in your space via Augmented Reality"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
      <span>View in AR</span>
    </button>
  );
}
