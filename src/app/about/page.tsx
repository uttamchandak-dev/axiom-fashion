import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'Our Story & Philosophy — AXIOM',
  description: 'Learn about AXIOM — our commitment to intentional design, sustainable virgin materials, and timeless contemporary tailoring.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-32 bg-white">
      <div className="page-container">
        <Breadcrumb items={[{ label: 'About' }]} />

        {/* Hero Manifesto */}
        <div className="max-w-3xl mb-20">
          <p className="text-caption text-neutral-400 mb-3">The House of AXIOM</p>
          <h1 className="font-serif text-4xl md:text-6xl text-neutral-900 font-normal leading-[1.08] mb-8">
            Form. Motion. Identity.<br />
            Crafted with Intention.
          </h1>
          <p className="text-base md:text-xl text-neutral-600 font-light leading-relaxed">
            AXIOM was founded with a singular conviction: luxury is not excess; it is the absolute refinement of necessity. Every garment is an architectural exploration of weight, texture, and silhouette.
          </p>
        </div>

        {/* High-impact image */}
        <div className="relative aspect-[21/9] sm:aspect-[3/1] bg-neutral-900 rounded-xs overflow-hidden mb-24 shadow-lg">
          <Image
            src="/images/collections/autumn.jpg"
            alt="AXIOM Artisanal Craftsmanship"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center p-8 md:p-16">
            <p className="font-serif text-2xl md:text-4xl text-white max-w-lg leading-snug font-light">
              &ldquo;We don&apos;t design for seasons. We engineer garments for longevity.&rdquo;
            </p>
          </div>
        </div>

        {/* Three Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-28 border-b border-neutral-100 pb-24">
          <div>
            <span className="text-xs font-mono text-neutral-400">01 / SOURCING</span>
            <h3 className="font-serif text-2xl font-light text-neutral-900 mt-2 mb-4">Uncompromising Fibers</h3>
            <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
              We partner exclusively with heritage mills in Biella (Italy) for double-faced virgin wools, Okayama (Japan) for shuttle-loom selvedge denim, and the high plateaus of Mongolia for Grade-A cashmere.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono text-neutral-400">02 / ARCHITECTURE</span>
            <h3 className="font-serif text-2xl font-light text-neutral-900 mt-2 mb-4">Sculpted Tailoring</h3>
            <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
              Every pattern undergoes dozens of iterations to achieve an effortless balance between structure and drape. Internal canvas interlinings provide enduring shape without rigidity.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono text-neutral-400">03 / SUSTAINABILITY</span>
            <h3 className="font-serif text-2xl font-light text-neutral-900 mt-2 mb-4">Circular Lifecycle</h3>
            <p className="text-xs md:text-sm text-neutral-500 font-light leading-relaxed">
              All collections are produced in limited, numbered batches to eliminate excess inventory. Every purchase is backed by our 5-Year Garment Care & Repair Guarantee.
            </p>
          </div>
        </div>

        {/* Client Concierge & Studio Information */}
        <div className="bg-neutral-50 p-8 md:p-16 rounded-xs grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-caption text-neutral-400 mb-2">Private Appointments</p>
            <h2 className="font-serif text-3xl text-neutral-900 font-light mb-4">Client Concierge</h2>
            <p className="text-xs md:text-sm text-neutral-600 font-light leading-relaxed mb-6">
              Our styling team is available for virtual consultations, bespoke sizing inquiries, and private showroom viewings.
            </p>
            <div className="space-y-1 text-xs text-neutral-700">
              <p><strong>Email:</strong> concierge@axiom.fashion</p>
              <p><strong>Hours:</strong> Mon–Fri: 9:00 AM – 7:00 PM EST</p>
              <p><strong>Showroom:</strong> 540 Madison Ave, New York, NY</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link
              href="/shop"
              className="py-4 px-8 bg-neutral-900 text-white text-xs font-medium tracking-[0.16em] uppercase hover:bg-black transition-colors text-center"
            >
              Explore Collection
            </Link>
            <Link
              href="/lookbook"
              className="py-4 px-8 border border-neutral-300 text-neutral-900 text-xs font-medium tracking-[0.16em] uppercase hover:border-neutral-900 transition-colors text-center"
            >
              View Lookbook
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
