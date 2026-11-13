'use client';

import { useCartStore } from '@/stores/cart-store';
import { useUIStore } from '@/stores/ui-store';
import Drawer from '@/components/ui/Drawer';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { cartDrawerOpen, closeCartDrawer } = useUIStore();
  const { items, removeFromCart, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  return (
    <Drawer
      isOpen={cartDrawerOpen}
      onClose={closeCartDrawer}
      title="Shopping Bag"
      side="right"
    >
      <div className="flex flex-col h-full justify-between p-6">
        {/* Cart items list */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <p className="text-base font-light text-neutral-900 mb-1">Your bag is empty</p>
            <p className="text-xs text-neutral-400 mb-6">Discover our curated new arrivals and timeless essentials.</p>
            <Button
              onClick={closeCartDrawer}
              variant="primary"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-5 flex gap-4">
                {/* Product thumbnail */}
                <div className="relative w-20 h-24 bg-neutral-100 shrink-0 overflow-hidden rounded-xs">
                  <Image
                    src={item.image || '/images/hero/hero.jpg'}
                    alt={item.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCartDrawer}
                        className="text-xs font-normal text-neutral-900 hover:text-neutral-600 transition-colors leading-tight"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-neutral-900 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    {/* Variant specs */}
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-neutral-500">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: item.colorHex }} />
                        {item.color}
                      </span>
                      <span>·</span>
                      <span>Size: {item.size}</span>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-neutral-200 rounded-xs">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs text-neutral-500 hover:bg-neutral-100 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs text-neutral-500 hover:bg-neutral-100 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-medium text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer / Checkout CTA */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 pt-5 mt-auto space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-neutral-500 font-light">Subtotal</span>
              <span className="text-base font-medium text-neutral-900">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[11px] text-neutral-400 font-light">
              Taxes and complimentary worldwide shipping calculated at checkout.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={closeCartDrawer}
                className="py-3 text-center border border-neutral-900 text-neutral-900 text-[11px] font-medium tracking-[0.14em] uppercase hover:bg-neutral-50 transition-colors"
              >
                View Bag
              </Link>
              <Link
                href="/checkout"
                onClick={closeCartDrawer}
                className="py-3 text-center bg-neutral-900 text-white text-[11px] font-medium tracking-[0.14em] uppercase hover:bg-black transition-colors"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
}
