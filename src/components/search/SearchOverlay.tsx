'use client';

import { useState, useEffect, useRef } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { searchProducts } from '@/data/products';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const found = searchProducts(query);
    setResults(found);
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSearch();
    };
    if (searchOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, closeSearch]);

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] bg-white/98 backdrop-blur-xl animate-fade-in flex flex-col">
      {/* Top Bar */}
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-10 h-20 flex items-center justify-between border-b border-neutral-100">
        <span className="text-xs tracking-[0.2em] uppercase text-neutral-400 font-light">Search Catalog</span>
        <button
          onClick={closeSearch}
          className="p-2 text-neutral-500 hover:text-neutral-900 transition-colors"
          aria-label="Close search"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main search box */}
      <div className="max-w-3xl w-full mx-auto px-6 pt-12 pb-8">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wool, silk, overcoats, denim..."
            className="w-full bg-transparent text-2xl md:text-4xl font-light tracking-tight text-neutral-900 placeholder:text-neutral-300 focus:outline-none border-b-2 border-neutral-200 focus:border-neutral-900 pb-4 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-0 top-3 text-xs text-neutral-400 hover:text-neutral-900 uppercase tracking-widest"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick searches when no query */}
        {!query && (
          <div className="mt-8">
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-3">Popular Searches</p>
            <div className="flex flex-wrap gap-2">
              {['Structured Wool Overcoat', 'Japanese Selvedge Denim', 'Washed Silk', 'Cashmere', 'Heavyweight Tee'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-xs text-neutral-700 rounded-xs transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results view */}
      <div className="flex-1 overflow-y-auto max-w-5xl w-full mx-auto px-6 pb-16">
        {query && results.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-base text-neutral-400 font-light">No garments found for &quot;{query}&quot;</p>
            <p className="text-xs text-neutral-400 mt-1">Try searching by material, silhouette, or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={closeSearch}
                className="group block"
              >
                <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden rounded-xs mb-2.5">
                  <Image
                    src={product.images[0] || '/images/hero/hero.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <p className="text-[10px] tracking-wider uppercase text-neutral-400">{product.category}</p>
                <h4 className="text-xs font-normal text-neutral-900 group-hover:text-neutral-600 transition-colors leading-snug">
                  {product.name}
                </h4>
                <p className="text-xs font-medium text-neutral-900 mt-1">{formatPrice(product.price)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
