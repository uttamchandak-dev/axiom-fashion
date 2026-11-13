import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import OrderStatusTracker from '@/components/order/OrderStatusTracker';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Order Confirmation — AXIOM',
  description: 'Your AXIOM order has been confirmed.',
};

interface OrderConfirmationPageProps {
  params: Promise<{ orderNumber: string }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { orderNumber } = await params;

  let orderData: any = null;

  if (process.env.DATABASE_URL) {
    try {
      orderData = await prisma.order.findUnique({
        where: { orderNumber },
        include: { items: true },
      });
    } catch (err) {
      console.warn('[OrderConfirmation] DB lookup fallback:', err);
    }
  }

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 4);

  const shippingAddr = (orderData?.shippingAddress as any) || null;

  return (
    <div className="pt-28 pb-24 bg-[var(--bg-primary)] min-h-screen">
      <div className="page-container max-w-2xl mx-auto">
        {/* Success icon */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-100 dark:ring-emerald-900/30">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="text-caption text-[var(--text-secondary)] mb-2">Order Confirmed</p>
          <h1 className="font-serif text-3xl md:text-4xl text-[var(--text-primary)]">Thank You</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-3 font-light leading-relaxed max-w-md mx-auto">
            Your order <strong className="text-[var(--text-primary)]">#{orderNumber}</strong> has been placed successfully
            and is being prepared with our signature luxury packaging.
          </p>
        </div>

        {/* Order Status Tracker */}
        <div className="mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <OrderStatusTracker status={orderData?.status || 'pending'} />
        </div>

        {/* Order Details Card */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xs p-6 mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between border-b border-[var(--border-primary)] pb-3 mb-4">
            <h2 className="text-xs tracking-[0.18em] uppercase text-[var(--text-primary)] font-medium">
              Order Summary
            </h2>
            <span className="text-[11px] text-[var(--text-secondary)]">
              Estimated Delivery: {estimatedDelivery.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-6">
            <div>
              <p className="text-[var(--text-secondary)] mb-1">Order Ref</p>
              <p className="font-medium text-[var(--text-primary)]">#{orderNumber}</p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)] mb-1">Status</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400">
                {orderData?.status || 'Processing'}
              </span>
            </div>
            <div>
              <p className="text-[var(--text-secondary)] mb-1">Method</p>
              <p className="font-medium text-[var(--text-primary)]">
                {orderData?.deliveryMethod === 'sameday' ? 'Same-Day Concierge' : 'Express Courier'}
              </p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)] mb-1">Total</p>
              <p className="font-medium text-[var(--text-primary)]">
                {orderData?.total ? formatPrice(Number(orderData.total)) : 'Calculated'}
              </p>
            </div>
          </div>

          {/* Line items if available */}
          {orderData?.items && orderData.items.length > 0 && (
            <div className="border-t border-[var(--border-primary)] pt-4 divide-y divide-[var(--border-primary)]">
              {orderData.items.map((it: any) => (
                <div key={it.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {it.image && (
                      <div className="relative w-10 h-12 rounded-xs overflow-hidden bg-neutral-100 shrink-0">
                        <Image src={it.image} alt={it.name} fill className="object-cover object-top" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{it.name}</p>
                      <p className="text-[11px] text-[var(--text-secondary)]">
                        {it.color} · Size: {it.size} · Qty: {it.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-medium text-[var(--text-primary)]">
                    {formatPrice(Number(it.price) * it.quantity)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Delivery Address Details if available */}
          {shippingAddr && (
            <div className="border-t border-[var(--border-primary)] pt-4 mt-2 text-xs">
              <p className="text-[var(--text-secondary)] mb-1 text-[10px] uppercase tracking-wider">Destination</p>
              <p className="font-medium text-[var(--text-primary)]">
                {shippingAddr.firstName} {shippingAddr.lastName}
              </p>
              <p className="text-[var(--text-secondary)] font-light mt-0.5">
                {shippingAddr.address}, {shippingAddr.city}, {shippingAddr.state} {shippingAddr.zip}
              </p>
            </div>
          )}
        </div>

        {/* Email notification */}
        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xs p-4 mb-8 flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-secondary)] shrink-0 mt-0.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            A confirmation receipt and courier tracking details have been transmitted via Resend.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Link
            href="/account/orders"
            className="flex-1 text-center py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-medium tracking-[0.16em] uppercase hover:opacity-90 transition-opacity"
          >
            View My Orders
          </Link>
          <Link
            href="/shop"
            className="flex-1 text-center py-4 border border-[var(--border-primary)] text-[var(--text-primary)] text-xs font-medium tracking-[0.16em] uppercase hover:bg-[var(--bg-secondary)] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
