'use client';

import { useWishlistStore } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';
import { useUIStore } from '@/stores/ui-store';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function WishlistPageView() {
  const { items, remove } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { openCartDrawer } = useUIStore();

  const handleMoveToBag = (item: any) => {
    addToCart({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      price: item.price,
      image: item.image || '/images/products/overcoat-1.jpg',
      color: item.colors[0]?.name || 'Black',
      colorHex: item.colors[0]?.hex || '#0a0a0a',
      size: 'M',
      quantity: 1,
      maxQuantity: 10,
    });
    remove(item.productId);
    openCartDrawer();
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-32 text-center page-container">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />
        <div className="max-w-md mx-auto py-12">
          <h1 className="font-serif text-3xl font-light text-neutral-900 mb-2">Your Wishlist is Empty</h1>
          <p className="text-sm text-neutral-500 font-light mb-8">
            Save your favorite garments as you explore our collections.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-4 bg-neutral-900 text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-black transition-colors"
          >
            Explore Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-white">
      <div className="page-container">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />

        <div className="mb-10 pb-6 border-b border-neutral-100 flex items-baseline justify-between">
          <h1 className="font-serif text-3xl md:text-5xl text-neutral-900">Saved Items</h1>
          <span className="text-xs text-neutral-400 font-light">{items.length} garments</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {items.map((item) => (
            <div key={item.id} className="group relative flex flex-col justify-between">
              <div>
                <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden rounded-xs mb-3">
                  <Image
                    src={item.image || '/images/products/overcoat-1.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={() => remove(item.productId)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/90 shadow-sm text-neutral-400 hover:text-neutral-900 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <Link href={`/product/${item.slug}`}>
                  <h3 className="text-sm text-neutral-900 hover:text-neutral-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <p className="text-sm font-medium text-neutral-900 mt-1">{formatPrice(item.price)}</p>
              </div>

              <button
                onClick={() => handleMoveToBag(item)}
                className="w-full mt-4 py-2.5 bg-neutral-900 text-white text-[11px] font-medium tracking-[0.14em] uppercase hover:bg-black transition-colors"
              >
                Move to Bag
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
