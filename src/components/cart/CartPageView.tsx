'use client';

import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';

export default function CartPageView() {
  const { items, removeFromCart, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const estimatedShipping = subtotal > 200 ? 0 : 25;
  const estimatedTax = Math.round(subtotal * 0.08);
  const total = subtotal + estimatedShipping + estimatedTax;

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-32 text-center page-container">
        <Breadcrumb items={[{ label: 'Shopping Bag' }]} />
        <div className="max-w-md mx-auto py-12">
          <h1 className="font-serif text-3xl font-light text-neutral-900 mb-2">Your Bag is Empty</h1>
          <p className="text-sm text-neutral-500 font-light mb-8">
            Explore our latest collections to discover signature outerwear, fine knitwear, and tailoring.
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
        <Breadcrumb items={[{ label: 'Shopping Bag' }]} />

        <div className="mb-10 pb-6 border-b border-neutral-100 flex items-baseline justify-between">
          <h1 className="font-serif text-3xl md:text-5xl text-neutral-900">Shopping Bag</h1>
          <span className="text-xs text-neutral-400 font-light">{items.length} items</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Item table */}
          <div className="lg:col-span-8 divide-y divide-neutral-100">
            {items.map((item) => (
              <div key={item.id} className="py-6 flex gap-6 items-start">
                <div className="relative w-24 h-32 bg-neutral-100 shrink-0 rounded-xs overflow-hidden">
                  <Image
                    src={item.image || '/images/products/overcoat-1.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="text-base font-normal text-neutral-900 hover:text-neutral-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: item.colorHex }} />
                        {item.color}
                      </span>
                      <span>·</span>
                      <span>Size: {item.size}</span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[11px] tracking-wider uppercase text-neutral-400 hover:text-neutral-900 transition-colors mt-4 block"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center sm:items-start justify-between sm:flex-col sm:items-end gap-3">
                    <span className="text-base font-medium text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>

                    <div className="flex items-center border border-neutral-200 rounded-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-xs text-neutral-500 hover:bg-neutral-100 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-xs text-neutral-500 hover:bg-neutral-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-neutral-50 p-6 md:p-8 rounded-xs space-y-4">
              <h2 className="text-xs tracking-[0.18em] uppercase text-neutral-900 font-medium pb-2 border-b border-neutral-200">
                Order Summary
              </h2>

              <div className="space-y-2.5 text-xs text-neutral-600 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-neutral-900">
                    {estimatedShipping === 0 ? 'Complimentary' : formatPrice(estimatedShipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span className="font-medium text-neutral-900">{formatPrice(estimatedTax)}</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-4 flex justify-between text-base font-medium text-neutral-900">
                <span>Estimated Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <p className="text-[10px] text-neutral-400 font-light">
                Duties and taxes included. Orders are packaged in our signature luxury gift box.
              </p>

              <Link
                href="/checkout"
                className="block w-full py-4 bg-neutral-900 text-white text-xs font-medium tracking-[0.16em] uppercase hover:bg-black transition-colors text-center shadow-sm"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
