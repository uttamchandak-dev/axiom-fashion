'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeading from '@/components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const COLLECTIONS = [
  {
    name: 'Autumn Essentials',
    slug: 'autumn-essentials',
    image: '/images/collections/autumn.jpg',
    description: 'Warm tones. Natural fibers.',
  },
  {
    name: 'Urban Edge',
    slug: 'urban-edge',
    image: '/images/collections/urban.jpg',
    description: 'City-ready. Performance-driven.',
  },
  {
    name: 'Classic Heritage',
    slug: 'classic-heritage',
    image: '/images/collections/classic.jpg',
    description: 'Timeless silhouettes. Modern craft.',
  },
];

export default function FeaturedCollections() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.collection-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section-padding-lg bg-white">
      <div className="page-container">
        <SectionHeading
          caption="Collections"
          title="Explore Our World"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collections/${collection.slug}`}
              className="collection-card group relative overflow-hidden block"
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="text-eyebrow text-white/60 mb-2">
                    {collection.description}
                  </p>
                  <h3 className="text-xl md:text-2xl font-light text-white mb-4">
                    {collection.name}
                  </h3>
                  <span className="inline-flex items-center text-[11px] tracking-[0.15em] uppercase text-white/80 group-hover:text-white transition-colors">
                    Shop Now
                    <svg className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
