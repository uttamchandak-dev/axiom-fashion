'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { formatPrice } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';

const DEFAULT_ORDERS = [
  {
    id: 'AX-98214',
    orderNumber: 'AX-98214',
    date: 'August 24, 2025',
    total: 457,
    status: 'In Transit',
    courier: 'DHL Express · Tracking #AX-891024-US',
    items: [
      {
        name: 'Structured Wool Overcoat',
        color: 'Black',
        size: 'M',
        price: 389,
        quantity: 1,
        image: '/images/products/overcoat-1.jpg',
      },
      {
        name: 'Relaxed Cotton T-Shirt',
        color: 'White',
        size: 'M',
        price: 68,
        quantity: 1,
        image: '/images/products/tshirt-1.jpg',
      },
    ],
  },
  {
    id: 'AX-97812',
    orderNumber: 'AX-97812',
    date: 'July 14, 2025',
    total: 245,
    status: 'Delivered',
    courier: 'FedEx Luxury Signature · Delivered to Door',
    items: [
      {
        name: 'Tailored Denim Jacket',
        color: 'Indigo',
        size: 'L',
        price: 245,
        quantity: 1,
        image: '/images/products/denim-jacket-1.jpg',
      },
    ],
  },
];

export default function AccountOrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<any[]>(DEFAULT_ORDERS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const endpoint = user?.email ? `/api/orders?email=${encodeURIComponent(user.email)}` : '/api/orders';
        const res = await fetch(endpoint);
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            const formatted = json.data.map((ord: any) => ({
              id: ord.orderNumber || ord.id,
              orderNumber: ord.orderNumber || ord.id,
              date: new Date(ord.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              }),
              total: Number(ord.total),
              status: ord.status === 'delivered' ? 'Delivered' : ord.status === 'in_transit' ? 'In Transit' : 'Processing',
              courier: `${ord.deliveryMethod === 'sameday' ? 'Concierge Same-Day' : 'DHL Express'} · Tracking #${ord.orderNumber}`,
              items: (ord.items || []).map((it: any) => ({
                name: it.name,
                color: it.color,
                size: it.size,
                price: Number(it.price),
                quantity: it.quantity,
                image: it.image || '/images/products/overcoat-1.jpg',
              })),
            }));
            setOrders(formatted);
          }
        }
      } catch (err) {
        console.warn('Orders fetch fallback:', err);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, [user]);

  return (
    <div className="pt-24 pb-32 bg-white dark:bg-neutral-950">
      <div className="page-container">
        <Breadcrumb
          items={[
            { label: 'Account', href: '/account' },
            { label: 'Order History' },
          ]}
        />

        <div className="mb-10 pb-6 border-b border-neutral-100 dark:border-neutral-800 flex items-baseline justify-between">
          <div>
            <p className="text-caption text-neutral-400 mb-1">Purchases & History</p>
            <h1 className="font-serif text-3xl md:text-5xl text-neutral-900 dark:text-white">Order History</h1>
          </div>
          <span className="text-xs text-neutral-400">{orders.length} past orders</span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-xs tracking-widest uppercase text-neutral-400">
            Retrieving client orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xs">
            <p className="text-base font-light text-neutral-900 dark:text-white mb-2">No past orders found</p>
            <p className="text-xs text-neutral-400 mb-6">Discover our curated wardrobe collection.</p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-medium tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
            >
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xs overflow-hidden shadow-2xs"
              >
                {/* Order Header */}
                <div className="bg-neutral-50 dark:bg-neutral-800/50 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-4 text-xs">
                  <div className="flex gap-6">
                    <div>
                      <span className="text-neutral-400 uppercase tracking-wider block text-[10px]">Order</span>
                      <span className="font-medium text-neutral-900 dark:text-white">#{order.orderNumber}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 uppercase tracking-wider block text-[10px]">Date</span>
                      <span className="text-neutral-700 dark:text-neutral-300">{order.date}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 uppercase tracking-wider block text-[10px]">Total</span>
                      <span className="font-medium text-neutral-900 dark:text-white">{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium rounded-full ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : order.status === 'In Transit'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                      }`}
                    >
                      {order.status}
                    </span>
                    <Link
                      href={`/order-confirmation/${order.orderNumber}`}
                      className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white underline text-xs transition-colors"
                    >
                      View Receipt →
                    </Link>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 divide-y divide-neutral-100 dark:divide-neutral-800">
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-18 bg-neutral-100 dark:bg-neutral-800 rounded-xs shrink-0 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-neutral-900 dark:text-white">{item.name}</p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            {item.color} · Size: {item.size} · Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-neutral-900 dark:text-white">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>

                {/* Courier info */}
                <div className="px-6 py-3 bg-neutral-50/50 dark:bg-neutral-800/30 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 flex justify-between items-center">
                  <span>{order.courier}</span>
                  <Link href="/shop" className="text-neutral-900 dark:text-white font-medium hover:underline">
                    Buy Again →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
