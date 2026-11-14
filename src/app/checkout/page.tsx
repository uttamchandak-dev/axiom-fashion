import type { Metadata } from 'next';
import CheckoutView from '@/components/checkout/CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout — AXIOM',
  description: 'Complete your luxury fashion order securely.',
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
