'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';
import Input from '@/components/ui/Input';
import Breadcrumb from '@/components/ui/Breadcrumb';
import StripePaymentWrapper from './StripePaymentForm';

export default function CheckoutView() {
  const { items, getSubtotal, clearCart } = useCartStore();
  
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  const subtotal = getSubtotal();
  const shipping = subtotal > 200 ? 0 : 25;
  const tax = Math.round((subtotal - discount) * 0.08);
  const total = Math.max(0, subtotal - discount) + shipping + Math.max(0, tax);

  const router = useRouter();
  const [step, setStep] = useState<'shipping' | 'delivery' | 'payment'>('shipping');
  const [formData, setFormData] = useState({
    email: 'client@axiom.fashion',
    firstName: 'Alexander',
    lastName: 'Wright',
    address: '742 Evergreen Terrace',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    deliverySpeed: 'express',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '12/28',
    cvv: '984',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // HTML5 validation ensures fields are filled
    setStep('delivery');
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'AXIOM20') {
      setDiscount(subtotal * 0.20);
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Invalid promotional code');
    }
  };

  const proceedToPayment = async () => {
    setStep('payment');
    const generatedOrder = `AX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrder);

    try {
      const res = await fetch('/api/checkout/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customerEmail: formData.email,
          orderNumber: generatedOrder,
          shipping,
          discount
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      }
    } catch (err) {
      console.error('Failed to initialize Stripe', err);
    }
  };

  const handleFinalizeOrder = async (secret: string) => {
    setIsProcessing(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          formData,
          totals: { subtotal, discount, shipping, tax, total },
          orderNumber
        })
      });

      if (!res.ok) {
        throw new Error('Checkout failed');
      }

      clearCart();
      router.push(`/order-confirmation/${orderNumber}`);
    } catch (err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-24 pb-24 bg-white">
      <div className="page-container">
        <Breadcrumb items={[{ label: 'Bag', href: '/cart' }, { label: 'Checkout' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-4">
          {/* Checkout Steps Form */}
          <div className="lg:col-span-7">
            {/* Step navigation tabs */}
            <div className="flex items-center gap-6 border-b border-neutral-200 pb-4 mb-8 text-xs font-medium uppercase tracking-wider">
              <span className={step === 'shipping' ? 'text-neutral-900 border-b-2 border-neutral-900 pb-4 -mb-4' : 'text-neutral-400'}>
                1. Shipping Address
              </span>
              <span className={step === 'delivery' ? 'text-neutral-900 border-b-2 border-neutral-900 pb-4 -mb-4' : 'text-neutral-400'}>
                2. Delivery
              </span>
              <span className={step === 'payment' ? 'text-neutral-900 border-b-2 border-neutral-900 pb-4 -mb-4' : 'text-neutral-400'}>
                3. Payment
              </span>
            </div>

            {/* Step 1: Shipping */}
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-light text-neutral-900">Customer & Shipping Details</h2>
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>
                <Input
                  label="Street Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    label="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                  <Input
                    label="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                  />
                  <Input
                    label="Postal Code"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-neutral-900 text-white text-xs font-medium tracking-[0.16em] uppercase hover:bg-black transition-colors mt-6"
                >
                  Continue to Delivery
                </button>
              </form>
            )}

            {/* Step 2: Delivery */}
            {step === 'delivery' && (
              <div className="space-y-6 animate-fade-in">
                <h2 className="text-lg font-light text-neutral-900">Select Delivery Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border border-neutral-900 rounded-xs cursor-pointer bg-neutral-50/50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliverySpeed"
                        checked={formData.deliverySpeed === 'express'}
                        onChange={() => setFormData({ ...formData, deliverySpeed: 'express' })}
                        className="accent-neutral-900"
                      />
                      <div>
                        <p className="text-xs font-medium text-neutral-900 uppercase tracking-wider">
                          Complimentary Express Courier
                        </p>
                        <p className="text-[11px] text-neutral-500">2–3 business days with signature required</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-neutral-900">Free</span>
                  </label>

                  <label className="flex items-center justify-between p-4 border border-neutral-200 rounded-xs cursor-pointer hover:border-neutral-400">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="deliverySpeed"
                        checked={formData.deliverySpeed === 'sameday'}
                        onChange={() => setFormData({ ...formData, deliverySpeed: 'sameday' })}
                        className="accent-neutral-900"
                      />
                      <div>
                        <p className="text-xs font-medium text-neutral-900 uppercase tracking-wider">
                          White Glove Same-Day Concierge
                        </p>
                        <p className="text-[11px] text-neutral-500">Scheduled by appointment today</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-neutral-900">$45</span>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="py-4 px-6 border border-neutral-300 text-neutral-800 text-xs uppercase tracking-wider hover:border-neutral-900"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={proceedToPayment}
                    className="flex-1 py-4 bg-neutral-900 text-white text-xs font-medium tracking-[0.16em] uppercase hover:bg-black transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 'payment' && (
              <div className="space-y-6 animate-fade-in">
                {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && clientSecret ? (
                  <StripePaymentWrapper 
                    clientSecret={clientSecret} 
                    total={total}
                    onBack={() => setStep('delivery')}
                    onSuccess={() => handleFinalizeOrder(clientSecret)}
                  />
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); handleFinalizeOrder('mock_secret'); }} className="space-y-6">
                    <h2 className="text-lg font-light text-neutral-900">Payment Details</h2>

                    <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs flex items-center justify-between">
                      <span className="text-xs font-medium text-neutral-900 tracking-wider uppercase">
                        Credit / Debit Card (Encrypted)
                      </span>
                      <div className="flex gap-2">
                        <span className="text-[10px] bg-white border px-1.5 py-0.5 font-bold">VISA</span>
                        <span className="text-[10px] bg-white border px-1.5 py-0.5 font-bold">MC</span>
                        <span className="text-[10px] bg-white border px-1.5 py-0.5 font-bold">AMEX</span>
                      </div>
                    </div>

                    <Input
                      label="Card Number"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Expiry Date (MM/YY)"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        required
                      />
                      <Input
                        label="Security Code (CVV)"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setStep('delivery')}
                        className="py-4 px-6 border border-neutral-300 text-neutral-800 text-xs uppercase tracking-wider hover:border-neutral-900"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 py-4 bg-neutral-900 text-white text-xs font-medium tracking-[0.16em] uppercase hover:bg-black transition-colors disabled:opacity-50"
                      >
                        {isProcessing ? 'Authorizing Payment...' : `Authorize & Pay ${formatPrice(total)}`}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-50 p-6 md:p-8 rounded-xs space-y-4">
              <h2 className="text-xs tracking-[0.18em] uppercase text-neutral-900 font-medium pb-2 border-b border-neutral-200">
                Order Review ({items.length})
              </h2>

              <div className="divide-y divide-neutral-200 max-h-72 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <div className="relative w-12 h-16 bg-neutral-200 shrink-0 rounded-xs overflow-hidden">
                      <Image
                        src={item.image || '/images/products/overcoat-1.jpg'}
                        alt={item.name}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 text-xs">
                      <p className="font-medium text-neutral-900">{item.name}</p>
                      <p className="text-[11px] text-neutral-500">
                        {item.color} · Size: {item.size} · Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 pb-2">
                <p className="text-[11px] font-medium tracking-widest uppercase text-neutral-900 mb-2">Promo Code</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code (e.g. AXIOM20)"
                    className="flex-1 bg-white border border-neutral-300 px-3 py-2 text-xs focus:outline-none focus:border-neutral-900 placeholder:text-neutral-400"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-black transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[10px] text-red-500 mt-1">{promoError}</p>}
                {discount > 0 && <p className="text-[10px] text-emerald-600 mt-1">AXIOM20 (-20%) applied successfully!</p>}
              </div>

              <div className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-200">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-neutral-900">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount</span>
                    <span className="font-medium">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-neutral-900">
                    {shipping === 0 ? 'Complimentary' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sales Tax</span>
                  <span className="font-medium text-neutral-900">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-3 flex justify-between text-base font-medium text-neutral-900">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
