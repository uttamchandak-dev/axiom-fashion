'use client';

import { useState, useEffect } from 'react';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthStore();
  const isViewer = user?.role === 'viewer';

  useEffect(() => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const filtered = filterCategory === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Product Management</h1>
          <p className="text-xs text-neutral-500 mt-1">Manage SKUs, variants, prices, inventory, and 3D configuration.</p>
        </div>

        {!isViewer && (
          <Link
            href="/admin/products/new"
            className="px-4 py-2.5 bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider rounded-xs hover:bg-black transition-colors self-start sm:self-auto"
          >
            + Add New Product
          </Link>
        )}
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center gap-2 pb-2">
        {['all', 'men', 'women', 'unisex'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider rounded-xs border transition-colors ${
              filterCategory === cat
                ? 'bg-neutral-900 text-white border-neutral-900'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Table */}
      <div className="bg-white border border-neutral-200 rounded-xs overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Garment</th>
                <th className="py-3.5 px-6">Category</th>
                <th className="py-3.5 px-6">Price</th>
                <th className="py-3.5 px-6">Colors</th>
                <th className="py-3.5 px-6">Sizes</th>
                <th className="py-3.5 px-6">3D Studio</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-neutral-500">Loading products...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-sm text-neutral-500">No products found.</td>
                </tr>
              ) : (
                filtered.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-9 h-12 bg-neutral-100 dark:bg-neutral-800 rounded-xs shrink-0 overflow-hidden">
                          <Image
                            src={prod.images?.[0] || '/images/products/overcoat-1.jpg'}
                            alt={prod.name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900 dark:text-neutral-100">{prod.name}</p>
                          <p className="text-[11px] text-neutral-400">SKU: {prod.variants?.[0]?.sku || 'AX-GEN'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-neutral-700 dark:text-neutral-300">{prod.category}</td>
                    <td className="py-3.5 px-6 font-medium text-neutral-900 dark:text-neutral-100">{formatPrice(Number(prod.price))}</td>
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-1">
                        {prod.colors?.map((c: any) => (
                          <span
                            key={c.name}
                            className="w-3 h-3 rounded-full border border-black/10 dark:border-white/10"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-6 text-neutral-500 dark:text-neutral-400">
                      {prod.sizes?.filter((s: any) => s.available).map((s: any) => s.name).join(', ') || 'N/A'}
                    </td>
                    <td className="py-3.5 px-6">
                      <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-medium px-2 py-0.5 rounded-xs">
                        Active
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right space-x-2">
                      <Link
                        href={`/product/${prod.slug}`}
                        className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 font-medium"
                        target="_blank"
                      >
                        View
                      </Link>
                      {!isViewer && (
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium ml-2"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
