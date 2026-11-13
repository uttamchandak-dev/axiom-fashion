'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';



gsap.registerPlugin();

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-eyebrow', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.3,
      })
        .from(
          '.hero-title span',
          {
            opacity: 0,
            y: 60,
            duration: 1,
            stagger: 0.15,
          },
          '-=0.4'
        )
        .from(
          '.hero-body',
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          '-=0.5'
        )
        .from(
          '.hero-cta',
          {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
          },
          '-=0.3'
        )
        .from(
          '.hero-image',
          {
            opacity: 0,
            scale: 1.05,
            duration: 1.2,
          },
          '-=1.2'
        )
        .from(
          '.hero-scroll',
          {
            opacity: 0,
            duration: 0.5,
          },
          '-=0.3'
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="hero-image absolute inset-0 z-0">
        <Image
          src="/images/hero/hero.jpg"
          alt="AXIOM Fashion"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />
      </div>



      {/* Content */}
      <div className="relative z-10 page-container w-full">
        <div className="max-w-2xl pt-20 md:pt-0">
          {/* Eyebrow */}
          <p className="hero-eyebrow text-eyebrow text-white/60 mb-6 md:mb-8">
            Autumn / Winter 2025
          </p>

          {/* Title */}
          <h1 className="hero-title text-white mb-8 md:mb-10 overflow-hidden">
            <span className="block font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.9] tracking-[-0.02em]">
              FORM
            </span>
            <span className="block font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.9] tracking-[-0.02em]">
              MOTION
            </span>
            <span className="block font-serif text-[clamp(3rem,10vw,7rem)] leading-[0.9] tracking-[-0.02em]">
              IDENTITY
            </span>
          </h1>

          {/* Body */}
          <p className="hero-body text-base md:text-lg text-white/70 font-light leading-relaxed max-w-md mb-10 md:mb-12">
            Premium fashion crafted with intention. Every piece designed to elevate the everyday into something extraordinary.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link
              href="/shop"
              className="hero-cta inline-flex items-center px-8 py-3.5 bg-white text-neutral-900 text-[12px] tracking-[0.12em] uppercase hover:bg-white/90 transition-colors"
            >
              Explore Collection
            </Link>
            <Link
              href="/product/structured-wool-overcoat"
              className="hero-cta inline-flex items-center px-8 py-3.5 border border-white/40 text-white text-[12px] tracking-[0.12em] uppercase hover:bg-white/10 transition-colors"
            >
              Enter 3D Experience
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Scroll</span>
        <div className="animate-scroll-indicator">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1" opacity="0.4">
            <path d="M7 13l5 5 5-5M7 7l5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
