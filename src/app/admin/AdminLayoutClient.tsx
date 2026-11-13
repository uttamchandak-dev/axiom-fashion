'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import CommandPalette from '@/components/ui/CommandPalette';
import AIAssistantWidget from '@/components/admin/AIAssistantWidget';

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: '📊' },
  { label: 'Products', href: '/admin/products', icon: '👔' },
  { label: 'Categories', href: '/admin/categories', icon: '📂' },
  { label: 'Collections', href: '/admin/collections', icon: '✨' },
  { label: 'Orders', href: '/admin/orders', icon: '📦' },
  { label: 'Customers', href: '/admin/customers', icon: '👥' },
  { label: 'Inventory', href: '/admin/inventory', icon: '🏷️' },
  { label: 'Lookbooks', href: '/admin/lookbooks', icon: '📸' },
  { label: '3D Assets', href: '/admin/3d-assets', icon: '🎨' },
  { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
];

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const isActive = (href: string) => {
    if (href === '/admin') return pathname === '/admin';
    return pathname.startsWith(href);
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col w-56 min-h-[calc(100vh-5rem)] border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-5">
          {/* Admin profile */}
          <div className="px-3 pb-4 mb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-xs font-medium">
                {user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : 'AD'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-neutral-900 dark:text-white truncate">
                  {user ? `${user.firstName} ${user.lastName}` : 'Admin'}
                </p>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 truncate">
                  {user?.role || 'admin'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-0.5 flex-1">
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 mb-2 px-3">
              Navigation
            </p>
            {ADMIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm rounded transition-colors flex items-center gap-2.5 ${
                  isActive(item.href)
                    ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="pt-4 mt-auto border-t border-neutral-100 dark:border-neutral-800">
            <button
              onClick={() => logout()}
              className="w-full px-3 py-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded transition-colors flex items-center gap-2.5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 p-6 md:p-10">
          {children}
        </div>
      </div>
      <CommandPalette />
      <AIAssistantWidget />
    </div>
  );
}
