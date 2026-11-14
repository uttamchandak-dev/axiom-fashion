import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { MOCK_COLLECTIONS } from '@/data/products';

export const metadata: Metadata = {
  title: 'Collections — AXIOM',
  description: 'Explore the curated seasonal collections of AXIOM.',
};

export default function CollectionsPage() {
  return (
    <div className="pt-24 pb-32 bg-white">
      <div className="page-container">
        <Breadcrumb items={[{ label: 'Collections' }]} />

        <div className="max-w-2xl mb-16 pb-6 border-b border-neutral-100">
          <p className="text-caption text-neutral-400 mb-2">Curated Releases</p>
          <h1 className="font-serif text-4xl md:text-6xl text-neutral-900 font-normal">
            Seasonal Collections
          </h1>
          <p className="text-sm md:text-base text-neutral-500 font-light mt-4 leading-relaxed">
            Each collection explores a distinct aesthetic philosophy, unified by premium craftsmanship and modern tailoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_COLLECTIONS.map((col) => (
            <Link
              key={col.id}
              href={`/collections/${col.slug}`}
              className="group block relative"
            >
              <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden rounded-xs mb-4">
                <Image
                  src={col.heroImage}
                  alt={col.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-[10px] tracking-widest uppercase text-white/70 mb-1">
                    {col.products.length} Garments
                  </p>
                  <h3 className="font-serif text-2xl font-light">{col.name}</h3>
                </div>
              </div>

              <p className="text-xs text-neutral-500 font-light leading-relaxed">
                {col.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
