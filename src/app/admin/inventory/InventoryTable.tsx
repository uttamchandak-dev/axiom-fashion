'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function InventoryTable({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Poll database every 30 seconds for real-time inventory updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsRefreshing(true);
      router.refresh();
      
      // Reset refresh state after a short delay to show UI feedback
      setTimeout(() => setIsRefreshing(false), 800);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [router]);

  const filteredData = initialData.filter((item) => 
    item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50/50 dark:bg-neutral-900/50">
        <div className="relative w-72">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search SKU, Product, or Color..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
          />
        </div>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          {isRefreshing ? (
            <span className="flex items-center gap-1.5 text-emerald-600">
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Syncing...
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Sync Active
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-neutral-50 dark:bg-neutral-950 text-neutral-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">SKU</th>
              <th className="px-6 py-4 font-medium">Variant</th>
              <th className="px-6 py-4 font-medium text-right">Stock Level</th>
              <th className="px-6 py-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {filteredData.map((item) => {
              const imgUrl = Array.isArray(item.product.images) && item.product.images.length > 0 
                ? item.product.images[0] 
                : '/images/products/overcoat-1.jpg';
                
              let statusBadge = (
                <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium uppercase tracking-widest bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                  In Stock
                </span>
              );

              if (item.inventory === 0) {
                statusBadge = (
                  <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium uppercase tracking-widest bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
                    Out of Stock
                  </span>
                );
              } else if (item.inventory <= 5) {
                statusBadge = (
                  <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-medium uppercase tracking-widest bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                    Low Stock
                  </span>
                );
              }

              return (
                <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-neutral-100 relative">
                        <Image src={imgUrl} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900 dark:text-white">{item.product.name}</p>
                        <p className="text-xs text-neutral-500">{item.product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-500 font-mono text-xs">{item.sku}</td>
                  <td className="px-6 py-4 text-neutral-600 dark:text-neutral-400">
                    {item.color} · Size {item.size}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-medium ${item.inventory <= 5 ? 'text-red-600 dark:text-red-400' : 'text-neutral-900 dark:text-white'}`}>
                      {item.inventory}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {statusBadge}
                  </td>
                </tr>
              );
            })}
            
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                  No inventory items found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
