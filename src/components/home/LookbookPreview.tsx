'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function LookbookPreview() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.lookbook-content', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Parallax image
      gsap.to('.lookbook-bg', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -60,
        ease: 'none',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="lookbook-bg absolute inset-0 -top-16 -bottom-16">
        <Image
          src="/images/collections/urban.jpg"
          alt="The Lookbook"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="lookbook-content relative z-10 text-center px-6">
        <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-4">
          The Lookbook
        </p>
        <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] text-white leading-[0.95] mb-6">
          Autumn / Winter
          <br />
          2025
        </h2>
        <p className="text-sm text-white/60 font-light max-w-md mx-auto mb-8 leading-relaxed">
          An editorial journey through the season&apos;s defining silhouettes and textures.
        </p>
        <Link
          href="/lookbook"
          className="inline-flex items-center px-8 py-3.5 border border-white/40 text-white text-[12px] tracking-[0.12em] uppercase hover:bg-white/10 transition-colors"
        >
          Explore the Lookbook
        </Link>
      </div>
    </section>
  );
}
