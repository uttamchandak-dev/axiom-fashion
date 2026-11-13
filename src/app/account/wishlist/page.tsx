import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Wishlist' };

export default function AccountWishlistPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="page-container">
        <p className="text-caption text-muted mb-3">Account</p>
        <h1 className="text-headline mb-10">My Wishlist</h1>
        <p className="text-muted text-sm">Your wishlist is empty.</p>
      </div>
    </div>
  );
}
