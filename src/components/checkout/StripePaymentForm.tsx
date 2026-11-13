'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) 
  : null;

interface StripePaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onBack: () => void;
  total: number;
}

function CheckoutForm({ onSuccess, onBack, total }: Omit<StripePaymentFormProps, 'clientSecret'>) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Return URL is required, though we might redirect manually below
        return_url: `${window.location.origin}/checkout`,
      },
      redirect: 'if_required' // Prevent automatic redirect if possible to handle local logic
    });

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      onSuccess();
    } else {
      setErrorMessage('Payment failed or is processing.');
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <h2 className="text-lg font-light text-neutral-900">Payment Details</h2>

      <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xs flex items-center justify-between">
        <span className="text-xs font-medium text-neutral-900 tracking-wider uppercase">
          Credit / Debit Card (Encrypted via Stripe)
        </span>
        <div className="flex gap-2">
          <span className="text-[10px] bg-white border px-1.5 py-0.5 font-bold">VISA</span>
          <span className="text-[10px] bg-white border px-1.5 py-0.5 font-bold">MC</span>
          <span className="text-[10px] bg-white border px-1.5 py-0.5 font-bold">AMEX</span>
        </div>
      </div>

      <div className="p-4 border border-neutral-200 rounded-xs">
        <PaymentElement />
      </div>

      {errorMessage && (
        <div className="text-red-500 text-xs mt-2">{errorMessage}</div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="py-4 px-6 border border-neutral-300 text-neutral-800 text-xs uppercase tracking-wider hover:border-neutral-900"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isProcessing || !stripe || !elements}
          className="flex-1 py-4 bg-neutral-900 text-white text-xs font-medium tracking-[0.16em] uppercase hover:bg-black transition-colors disabled:opacity-50"
        >
          {isProcessing ? 'Authorizing Payment...' : `Authorize & Pay $${(total).toFixed(2)}`}
        </button>
      </div>
    </form>
  );
}

export default function StripePaymentWrapper(props: StripePaymentFormProps) {
  if (!stripePromise) {
    return (
      <div className="p-4 border border-red-200 bg-red-50 text-red-700 text-sm">
        Stripe is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: props.clientSecret, appearance: { theme: 'stripe' } }}>
      <CheckoutForm {...props} />
    </Elements>
  );
}
