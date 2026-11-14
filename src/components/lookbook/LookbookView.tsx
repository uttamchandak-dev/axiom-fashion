'use client';

import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { MOCK_PRODUCTS } from '@/data/products';
import { formatPrice } from '@/lib/utils';

const LOOKS = [
  {
    number: '01',
    title: 'Architectural Layering',
    season: 'Autumn / Winter 2025',
    description: 'Double-faced virgin wool overcoat draped effortlessly over heavy organic cotton basics. Structured shoulders meet a relaxed drape.',
    image: '/images/hero/hero.jpg',
    featuredProduct: MOCK_PRODUCTS[0], // Overcoat
    secondaryProduct: MOCK_PRODUCTS[1], // Tee
  },
  {
    number: '02',
    title: 'Urban Monolith',
    season: 'Autumn / Winter 2025',
    description: 'Japanese selvedge raw indigo denim jacket paired with heavyweight loopback cotton fleece. Clean lines designed for the metropolis.',
    image: '/images/collections/urban.jpg',
    featuredProduct: MOCK_PRODUCTS[2], // Denim jacket
    secondaryProduct: MOCK_PRODUCTS[11], // Hoodie
  },
  {
    number: '03',
    title: 'Tactile Warmth',
    season: 'Autumn / Winter 2025',
    description: 'Mongolian cashmere turtleneck in warm camel tones. Fine-gauge knitwear designed to stand alone or anchor seasonal outerwear.',
    image: '/images/collections/autumn.jpg',
    featuredProduct: MOCK_PRODUCTS[3], // Sweater
    secondaryProduct: MOCK_PRODUCTS[7], // Cashmere turtleneck
  },
  {
    number: '04',
    title: 'Fluid Formality',
    season: 'Autumn / Winter 2025',
    description: 'Washed French silk with a natural lustre. Oversized button-down silhouette paired with wide-leg tailoring in matte crepe.',
    image: '/images/collections/classic.jpg',
    featuredProduct: MOCK_PRODUCTS[5], // Silk shirt
    secondaryProduct: MOCK_PRODUCTS[4], // Trousers
  },
];

export default function LookbookView() {
  return (
    <div className="pt-24 pb-32 bg-white">
      <div className="page-container">
        <Breadcrumb items={[{ label: 'Lookbook' }]} />

        {/* Hero title */}
        <div className="max-w-2xl mb-16 pb-6 border-b border-neutral-100">
          <p className="text-caption text-neutral-400 mb-2">Editorial Volume IV</p>
          <h1 className="font-serif text-4xl md:text-6xl text-neutral-900 font-normal leading-tight">
            The Autumn / Winter Lookbook
          </h1>
          <p className="text-sm md:text-base text-neutral-500 font-light mt-4 leading-relaxed">
            An exploration of contemporary silhouettes, organic textures, and artisanal tailoring. Each look is styled directly from our active collection.
          </p>
        </div>

        {/* Looks sequence */}
        <div className="space-y-32">
          {LOOKS.map((look, index) => (
            <div
              key={look.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Look editorial photo */}
              <div className={`lg:col-span-7 relative aspect-[3/4] bg-neutral-100 rounded-xs overflow-hidden shadow-lg ${
                index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
              }`}>
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  className="object-cover object-top hover:scale-103 transition-transform duration-1000"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-medium tracking-[0.2em] uppercase">
                  Look {look.number}
                </div>
              </div>

              {/* Look breakdown */}
              <div className={`lg:col-span-5 space-y-6 ${
                index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
              }`}>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
                    {look.season}
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 font-light mt-1">
                    {look.title}
                  </h2>
                </div>

                <p className="text-sm text-neutral-600 font-light leading-relaxed">
                  {look.description}
                </p>

                {/* Shop the Look Product Cards */}
                <div className="pt-4 space-y-3 border-t border-neutral-100">
                  <p className="text-[11px] tracking-wider uppercase text-neutral-400 font-medium">
                    Garments in this Look:
                  </p>

                  {[look.featuredProduct, look.secondaryProduct].filter(Boolean).map((prod) => (
                    <Link
                      key={prod.id}
                      href={`/product/${prod.slug}`}
                      className="flex items-center gap-4 p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xs transition-colors group"
                    >
                      <div className="relative w-12 h-16 bg-neutral-200 shrink-0 rounded-xs overflow-hidden">
                        <Image
                          src={prod.images[0] || '/images/products/overcoat-1.jpg'}
                          alt={prod.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-normal text-neutral-900 group-hover:text-neutral-600 transition-colors">
                          {prod.name}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">{prod.materials.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-medium text-neutral-900">{formatPrice(prod.price)}</span>
                        <span className="block text-[10px] uppercase text-neutral-400 mt-0.5 group-hover:text-neutral-900 transition-colors">
                          View →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
