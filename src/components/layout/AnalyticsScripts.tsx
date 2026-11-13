'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';

export default function AnalyticsScripts() {
  const [consentGiven, setConsentGiven] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check consent state
  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('axiom_cookie_consent');
      setConsentGiven(consent === 'all');
    };
    
    checkConsent();
    
    // Setup listener in case consent changes in another tab or later on the same page
    window.addEventListener('storage', checkConsent);
    // Custom event to trigger update when banner is clicked
    window.addEventListener('axiom_consent_updated', checkConsent);
    
    return () => {
      window.removeEventListener('storage', checkConsent);
      window.removeEventListener('axiom_consent_updated', checkConsent);
    };
  }, []);

  // Track page views when route changes
  useEffect(() => {
    if (consentGiven && typeof window !== 'undefined') {
      const dataLayer = (window as any).dataLayer = (window as any).dataLayer || [];
      dataLayer.push({
        event: 'pageview',
        page: pathname + (searchParams ? `?${searchParams.toString()}` : '')
      });
    }
  }, [pathname, searchParams, consentGiven]);

  if (!consentGiven) return null;

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `,
        }}
      />
      
      {/* Meta Pixel */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'META-XXXXXXX');
            fbq('track', 'PageView');
          `,
        }}
      />
    </>
  );
}
