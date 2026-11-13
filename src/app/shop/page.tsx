import { Suspense } from 'react';
import type { Metadata } from 'next';
import ShopView from '@/components/shop/ShopView';

export const metadata: Metadata = {
  title: 'Shop All Garments — AXIOM',
  description: 'Explore the complete luxury contemporary catalog of menswear, womenswear, and unisex essentials.',
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-xs tracking-widest uppercase text-neutral-400">Loading Catalog...</div>}>
      <ShopView />
    </Suspense>
  );
}
