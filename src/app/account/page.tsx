import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'My Account — AXIOM',
  description: 'Manage your profile, active orders, and saved addresses.',
};

export default function AccountPage() {
  return (
    <div className="pt-24 pb-32 bg-white">
      <div className="page-container">
        <Breadcrumb items={[{ label: 'Account' }]} />

        <div className="max-w-4xl mb-12 pb-6 border-b border-neutral-100 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <p className="text-caption text-neutral-400 mb-1">Client Profile</p>
            <h1 className="font-serif text-3xl md:text-5xl text-neutral-900 font-normal">
              Alexander Wright
            </h1>
            <p className="text-xs text-neutral-500 mt-1">client@axiom.fashion · Member since 2025</p>
          </div>

          <span className="text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 font-medium rounded-full self-start">
            VIP Tier Client
          </span>
        </div>

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            href="/account/orders"
            className="p-6 border border-neutral-200 hover:border-neutral-900 rounded-xs transition-colors group bg-white"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mb-4 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <h3 className="text-sm tracking-[0.1em] uppercase font-medium text-neutral-900 mb-1">
              Order History (2)
            </h3>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Track shipments, review receipts, and request returns.
            </p>
          </Link>

          <Link
            href="/wishlist"
            className="p-6 border border-neutral-200 hover:border-neutral-900 rounded-xs transition-colors group bg-white"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mb-4 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3 className="text-sm tracking-[0.1em] uppercase font-medium text-neutral-900 mb-1">
              Saved Garments
            </h3>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Curate your seasonal wishlist and transfer directly to bag.
            </p>
          </Link>

          <Link
            href="/account/addresses"
            className="p-6 border border-neutral-200 hover:border-neutral-900 rounded-xs transition-colors group bg-white"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mb-4 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h3 className="text-sm tracking-[0.1em] uppercase font-medium text-neutral-900 mb-1">
              Addresses & Payment
            </h3>
            <p className="text-xs text-neutral-500 font-light leading-relaxed">
              Manage delivery locations and encrypted payment methods.
            </p>
          </Link>
        </div>

        {/* Active Order Snapshot */}
        <div className="bg-neutral-50 p-6 md:p-8 rounded-xs border border-neutral-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] tracking-widest uppercase text-neutral-400 font-medium">Active Shipment</p>
              <h2 className="text-sm font-medium text-neutral-900 mt-0.5">Order #AX-98214</h2>
            </div>
            <span className="text-[10px] tracking-wider uppercase font-medium px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full">
              In Transit · Expected Tomorrow
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-600">
            <span>Structured Wool Overcoat (Size: M, Black)</span>
            <span>·</span>
            <span>Relaxed Cotton T-Shirt (Size: L, White)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
