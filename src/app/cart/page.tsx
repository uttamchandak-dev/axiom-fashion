import type { Metadata } from 'next';
import CartPageView from '@/components/cart/CartPageView';

export const metadata: Metadata = {
  title: 'Shopping Bag — AXIOM',
  description: 'Review your selected items in your shopping bag.',
};

export default function CartPage() {
  return <CartPageView />;
}
