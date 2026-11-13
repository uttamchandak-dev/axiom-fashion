'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { formatPrice } from '@/lib/utils';
import { getFeaturedProducts } from '@/data/products';
import { useCartStore } from '@/stores/cart-store';
import { useUIStore } from '@/stores/ui-store';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedProduct() {
  const containerRef = useRef<HTMLElement>(null);
  const product = getFeaturedProducts()[0];
  const { addToCart } = useCartStore();
  const { openCartDrawer } = useUIStore();

  useGSAP(
    () => {
      gsap.from('.featured-image-box', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        x: -50,
        duration: 1.1,
        ease: 'power3.out',
      });

      gsap.from('.featured-content > *', {
        scrollTrigger: {
          trigger: '.featured-content',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        opacity: 0,
        y: 25,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  if (!product) return null;

  const handleQuickAdd = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: '/images/products/overcoat-1.jpg',
      color: product.colors[0]?.name || 'Black',
      colorHex: product.colors[0]?.hex || '#0a0a0a',
      size: 'M',
      quantity: 1,
      maxQuantity: 10,
    });
    openCartDrawer();
  };

  return (
    <section ref={containerRef} className="section-padding-lg bg-neutral-50/50 overflow-hidden border-y border-neutral-200/60">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="featured-image-box lg:col-span-7 relative aspect-[3/4] bg-neutral-200 overflow-hidden shadow-2xl rounded-xs">
            <Image
              src="/images/products/overcoat-1.jpg"
              alt={product.name}
              fill
              className="object-cover object-top hover:scale-102 transition-transform duration-1000"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            {/* Editorial overlay tag */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-[10px] tracking-[0.2em] uppercase font-medium">
              Signature Outerwear
            </div>
          </div>

          {/* Content */}
          <div className="featured-content lg:col-span-5 lg:py-6">
            <p className="text-caption text-neutral-400 mb-3">Autumn / Winter Spotlight</p>
            <h2 className="font-serif text-3xl md:text-5xl text-neutral-900 leading-[1.05] tracking-tight mb-4">
              {product.name}
            </h2>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl font-medium text-neutral-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs tracking-wider uppercase text-neutral-400 bg-neutral-100 px-2 py-0.5">
                In Stock · Italian Wool
              </span>
            </div>

            <p className="text-sm md:text-base text-neutral-600 font-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-8">
              <p className="text-[11px] tracking-wider uppercase text-neutral-400 mb-2.5">
                Available Colors
              </p>
              <div className="flex items-center gap-3">
                {product.colors.map((color, i) => (
                  <div
                    key={color.name}
                    className="flex items-center gap-2 text-xs text-neutral-700 bg-white border border-neutral-200 px-3 py-1.5 rounded-xs"
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-black/10"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[11px]">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleQuickAdd}
                className="flex-1 py-4 bg-neutral-900 text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-black transition-colors text-center"
              >
                Add to Bag
              </button>
              <Link
                href={`/product/${product.slug}`}
                className="py-4 px-8 border border-neutral-300 text-neutral-900 text-xs font-medium tracking-[0.15em] uppercase hover:border-neutral-900 transition-colors text-center inline-flex items-center justify-center gap-2"
              >
                View Details
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
