'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('.brand-story-content > *', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 25,
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
        <div className="brand-story-content max-w-2xl mx-auto text-center">
          <p className="text-caption text-muted mb-6">Our Philosophy</p>
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] mb-8">
            Crafted With
            <br />
            Intention
          </h2>
          <p className="text-base md:text-lg text-muted font-light leading-relaxed mb-6">
            We believe that exceptional clothing begins with intention. Every material is sourced
            for quality and sustainability. Every silhouette is refined through countless iterations.
            Every detail serves a purpose.
          </p>
          <p className="text-base md:text-lg text-muted font-light leading-relaxed">
            AXIOM exists at the intersection of design and function — where premium craftsmanship
            meets modern sensibility.
          </p>
          <div className="mt-10 flex items-center justify-center gap-12 text-center">
            {[
              { value: '100%', label: 'Premium Materials' },
              { value: '12+', label: 'Countries' },
              { value: '5yr', label: 'Garment Guarantee' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-light mb-1">{stat.value}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
