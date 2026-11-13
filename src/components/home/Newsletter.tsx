'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const containerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.from('.newsletter-content > *', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section ref={containerRef} className="bg-neutral-950 text-white section-padding">
      <div className="page-container">
        <div className="newsletter-content max-w-lg mx-auto text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 mb-4">
            Stay Informed
          </p>
          <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
            Join the Inner Circle
          </h2>
          <p className="text-sm text-white/50 font-light leading-relaxed mb-8">
            Be the first to discover new collections, exclusive releases, and behind-the-scenes content.
          </p>

          {submitted ? (
            <p className="text-sm text-accent tracking-wider">Thank you for subscribing.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-transparent border border-white/20 border-r-0 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary text-[11px] tracking-[0.12em] uppercase hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="mt-4 text-[10px] text-white/30">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
