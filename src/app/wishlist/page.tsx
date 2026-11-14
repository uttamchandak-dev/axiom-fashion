import type { Metadata } from 'next';
import WishlistPageView from '@/components/wishlist/WishlistPageView';

export const metadata: Metadata = {
  title: 'Wishlist — AXIOM',
  description: 'View and manage your saved garments.',
};

export default function WishlistPage() {
  return <WishlistPageView />;
}
