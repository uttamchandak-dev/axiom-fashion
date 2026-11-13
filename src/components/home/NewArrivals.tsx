'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SectionHeading from '@/components/ui/SectionHeading';
import ProductGrid from '@/components/product/ProductGrid';
import { getNewArrivals } from '@/data/products';

gsap.registerPlugin(ScrollTrigger);

export default function NewArrivals() {
  const containerRef = useRef<HTMLElement>(null);
  const products = getNewArrivals(4);

  useGSAP(
    () => {
      gsap.from('.arrivals-heading', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power3.out',
      });

      gsap.from('.arrivals-grid > *', {
        scrollTrigger: {
          trigger: '.arrivals-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section-padding bg-surface">
      <div className="page-container">
        <div className="arrivals-heading flex items-end justify-between mb-12 md:mb-16">
          <SectionHeading
            caption="Just Landed"
            title="New Arrivals"
            className="!mb-0"
          />
          <Link
            href="/shop?sort=newest"
            className="hidden md:inline-flex items-center text-[12px] tracking-[0.1em] uppercase text-muted hover:text-primary transition-colors"
          >
            View All
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="arrivals-grid">
          <ProductGrid products={products} columns={4} />
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            href="/shop?sort=newest"
            className="inline-flex items-center px-8 py-3.5 border border-primary text-primary text-[12px] tracking-[0.12em] uppercase hover:bg-primary hover:text-white transition-colors"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>
    </section>
  );
}
