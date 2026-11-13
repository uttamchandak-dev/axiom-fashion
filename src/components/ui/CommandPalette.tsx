'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

type CommandItem = {
  id: string;
  title: string;
  type: 'nav' | 'product' | 'order' | 'customer';
  href: string;
  subtitle?: string;
};

const COMMANDS: CommandItem[] = [
  // Navigation
  { id: 'nav-1', title: 'Dashboard', type: 'nav', href: '/admin' },
  { id: 'nav-2', title: 'Products', type: 'nav', href: '/admin/products' },
  { id: 'nav-3', title: 'Orders', type: 'nav', href: '/admin/orders' },
  { id: 'nav-4', title: 'Customers', type: 'nav', href: '/admin/customers' },
  { id: 'nav-5', title: 'Settings', type: 'nav', href: '/admin/settings' },
  { id: 'nav-6', title: 'Categories', type: 'nav', href: '/admin/categories' },
  // Mock Products
  { id: 'prod-1', title: 'Camel Wool Flat Cap', subtitle: 'SKU: AX-GEN', type: 'product', href: '/admin/products' },
  { id: 'prod-2', title: 'Japanese Selvedge Denim', subtitle: 'SKU: AX-DEN-01', type: 'product', href: '/admin/products' },
  // Mock Orders
  { id: 'ord-1', title: 'ORD-1042', subtitle: 'John Doe - $320.00', type: 'order', href: '/admin/orders' },
  { id: 'ord-2', title: 'ORD-1043', subtitle: 'Jane Smith - $145.00', type: 'order', href: '/admin/orders' },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Autofocus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  // Filter commands
  const filteredCommands = query
    ? COMMANDS.filter((cmd) => 
        cmd.title.toLowerCase().includes(query.toLowerCase()) || 
        cmd.subtitle?.toLowerCase().includes(query.toLowerCase())
      )
    : COMMANDS;

  // Keyboard navigation within the palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filteredCommands.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        handleSelect(filteredCommands[activeIndex]);
      }
    }
  };

  const handleSelect = (cmd: CommandItem) => {
    router.push(cmd.href);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 sm:pt-32 bg-neutral-900/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={() => setOpen(false)} 
        aria-hidden="true"
      />
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-neutral-900 rounded-xl shadow-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 animate-slide-up"
        role="dialog"
      >
        <div className="flex items-center px-4 border-b border-neutral-100 dark:border-neutral-800">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent px-3 py-4 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-none"
            placeholder="Search products, orders, or pages..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-[10px] font-medium text-neutral-500">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto py-2">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-neutral-500">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            <div className="px-2">
              {['nav', 'order', 'product'].map((group) => {
                const groupItems = filteredCommands.filter(c => c.type === group);
                if (groupItems.length === 0) return null;
                
                return (
                  <div key={group} className="mb-4 last:mb-0">
                    <h3 className="px-3 pb-2 text-[10px] font-medium text-neutral-400 uppercase tracking-wider">
                      {group === 'nav' ? 'Navigation' : group === 'order' ? 'Orders' : 'Products'}
                    </h3>
                    <ul className="space-y-0.5">
                      {groupItems.map((cmd) => {
                        const idx = filteredCommands.findIndex(c => c.id === cmd.id);
                        return (
                          <li key={cmd.id}>
                            <button
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                                activeIndex === idx 
                                  ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white' 
                                  : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                              }`}
                              onClick={() => handleSelect(cmd)}
                              onMouseEnter={() => setActiveIndex(idx)}
                            >
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{cmd.title}</span>
                                {cmd.subtitle && (
                                  <span className="text-xs text-neutral-500 mt-0.5">{cmd.subtitle}</span>
                                )}
                              </div>
                              {activeIndex === idx && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-neutral-400 shrink-0">
                                  <polyline points="9 18 15 12 9 6" />
                                </svg>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
