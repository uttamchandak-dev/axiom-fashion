'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import ProductGrid from '@/components/product/ProductGrid';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import { MOCK_PRODUCTS } from '@/data/products';
import { SORT_OPTIONS, MATERIAL_TYPES, SIZES } from '@/lib/constants';
import { Product } from '@/types';

export default function ShopView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const initialCategory = searchParams.get('category') || 'all';
  const initialSort = searchParams.get('sort') || 'featured';
  const initialMaterial = searchParams.get('material') || 'all';
  const initialSize = searchParams.get('size') || 'all';
  const initialPrice = searchParams.get('max_price') ? Number(searchParams.get('max_price')) : 600;

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMaterial, setSelectedMaterial] = useState<string>(initialMaterial);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize);
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);
  const [priceRange, setPriceRange] = useState<number>(initialPrice);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>(MOCK_PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live garments from backend database
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/products');
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0 && isMounted) {
            setProductsList(json.data);
          }
        }
      } catch (err) {
        console.warn('Using in-memory catalog:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    loadCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync state changes to URL
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (selectedMaterial !== 'all') params.set('material', selectedMaterial);
    if (selectedSize !== 'all') params.set('size', selectedSize);
    if (selectedSort !== 'featured') params.set('sort', selectedSort);
    if (priceRange !== 600) params.set('max_price', priceRange.toString());

    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [selectedCategory, selectedMaterial, selectedSize, selectedSort, priceRange, pathname, router]);

  const categories = [
    { label: 'All Garments', value: 'all' },
    { label: 'Men', value: 'men' },
    { label: 'Women', value: 'women' },
    { label: 'Unisex', value: 'unisex' },
  ];

  const filteredProducts = useMemo(() => {
    let result = [...productsList];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Material filter
    if (selectedMaterial !== 'all') {
      result = result.filter((p) =>
        p.materials.some((m) => m.toLowerCase() === selectedMaterial.toLowerCase())
      );
    }

    // Size filter
    if (selectedSize !== 'all') {
      result = result.filter((p) =>
        p.sizes.some((s) => s.name === selectedSize && s.available)
      );
    }

    // Price filter
    result = result.filter((p) => p.price <= priceRange);

    // Sorting
    if (selectedSort === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (selectedSort === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (selectedSort === 'popular') {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [selectedCategory, selectedMaterial, selectedSize, selectedSort, priceRange]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setSelectedSize('all');
    setPriceRange(600);
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedMaterial !== 'all' ||
    selectedSize !== 'all' ||
    priceRange < 600;

  return (
    <div className="pt-24 pb-24 bg-white">
      <div className="page-container">
        <Breadcrumb items={[{ label: 'Catalog' }]} />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-neutral-100 gap-4">
          <div>
            <p className="text-caption text-neutral-400 mb-1.5">Collection Catalog</p>
            <h1 className="font-serif text-3xl md:text-5xl text-neutral-900 font-normal">
              All Garments
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-neutral-400 font-light">
              Showing {filteredProducts.length} pieces
            </span>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden px-4 py-2 bg-neutral-100 text-neutral-800 text-xs uppercase tracking-wider font-medium flex items-center gap-2 rounded-xs"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="4" y1="21" x2="4" y2="14" />
                <line x1="4" y1="10" x2="4" y2="3" />
                <line x1="12" y1="21" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12" y2="3" />
                <line x1="20" y1="21" x2="20" y2="16" />
                <line x1="20" y1="12" x2="20" y2="3" />
              </svg>
              Filters
            </button>

            {/* Sort selector */}
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-transparent border border-neutral-200 px-3 py-2 text-xs text-neutral-800 tracking-wider uppercase font-medium focus:outline-none focus:border-neutral-900 rounded-xs"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sidebar Filters */}
          <aside
            className={`md:col-span-3 lg:col-span-3 space-y-8 ${
              mobileFilterOpen ? 'block' : 'hidden md:block'
            }`}
          >
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-red-600 hover:text-red-700 tracking-wider uppercase underline underline-offset-4 mb-2"
              >
                Clear all filters
              </button>
            )}

            {/* Category Filter */}
            <div>
              <h3 className="text-xs tracking-[0.14em] uppercase text-neutral-900 font-medium mb-3">
                Category
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`block w-full text-left text-xs tracking-wider transition-colors ${
                      selectedCategory === cat.value
                        ? 'text-neutral-900 font-medium'
                        : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="border-t border-neutral-100 pt-6">
              <h3 className="text-xs tracking-[0.14em] uppercase text-neutral-900 font-medium mb-3">
                Material / Fiber
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedMaterial('all')}
                  className={`block w-full text-left text-xs tracking-wider ${
                    selectedMaterial === 'all' ? 'text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  All Materials
                </button>
                {['Wool', 'Cotton', 'Denim', 'Silk', 'Cashmere', 'Leather'].map((mat) => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`block w-full text-left text-xs tracking-wider ${
                      selectedMaterial === mat ? 'text-neutral-900 font-medium' : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Filter */}
            <div className="border-t border-neutral-100 pt-6">
              <h3 className="text-xs tracking-[0.14em] uppercase text-neutral-900 font-medium mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedSize('all')}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider border ${
                    selectedSize === 'all' ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-200 text-neutral-700 hover:border-neutral-900'
                  }`}
                >
                  All
                </button>
                {SIZES.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-wider border ${
                      selectedSize === sz ? 'bg-neutral-900 text-white border-neutral-900' : 'border-neutral-200 text-neutral-700 hover:border-neutral-900'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="border-t border-neutral-100 pt-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs tracking-[0.14em] uppercase text-neutral-900 font-medium">
                  Max Price
                </h3>
                <span className="text-xs font-medium text-neutral-900">${priceRange}</span>
              </div>
              <input
                type="range"
                min={50}
                max={600}
                step={25}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-neutral-900 cursor-pointer"
              />
            </div>
          </aside>

          {/* Product Grid */}
          <main className="md:col-span-9 lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-neutral-50 rounded-xs">
                <p className="text-sm font-light text-neutral-800 mb-2">No garments match your filters.</p>
                <Button
                  onClick={clearFilters}
                  variant="primary"
                  className="mt-2"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} columns={3} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
