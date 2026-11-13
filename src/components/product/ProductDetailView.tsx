'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProductViewer from '@/components/three/ProductViewer';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Rating from '@/components/ui/Rating';
import ColorSelector from '@/components/product/ColorSelector';
import SizeSelector from '@/components/product/SizeSelector';
import QuantitySelector from '@/components/product/QuantitySelector';
import VirtualTryOn from '@/components/product/VirtualTryOn';
import Modal from '@/components/ui/Modal';
import ProductGrid from '@/components/product/ProductGrid';
import { Product, ProductColor, ProductSize, ModelHotspot } from '@/types';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useUIStore } from '@/stores/ui-store';
import { getFeaturedProducts } from '@/data/products';
import ProductReviews from '@/components/product/ProductReviews';

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

const DEFAULT_HOTSPOTS: ModelHotspot[] = [
  {
    id: 'h-1',
    label: 'Italian Wool Blend',
    description: 'Woven in Biella, Italy with double-faced virgin wool and cashmere fibers.',
    position: [0, 0.85, 0.44],
    cameraTarget: [0, 0.85, 0],
    cameraPosition: [0, 0.85, 1.6],
  },
  {
    id: 'h-2',
    label: 'Architectural Lapel',
    description: 'Reinforced canvas interlining for a clean, sharp silhouette that holds shape.',
    position: [0.15, 1.25, 0.25],
    cameraTarget: [0, 1.25, 0],
    cameraPosition: [0.3, 1.3, 1.4],
  },
  {
    id: 'h-3',
    label: 'Horn Buttons',
    description: 'Natural matte-finish horn buttons with heavy-gauge cross-stitch fastening.',
    position: [0, 0.55, 0.44],
    cameraTarget: [0, 0.55, 0],
    cameraPosition: [0, 0.55, 1.5],
  },
];

export default function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSize>(
    product.sizes.find((s) => s.available) || product.sizes[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeViewMode, setActiveViewMode] = useState<'3d' | 'gallery'>('3d');
  const [activeAccordion, setActiveAccordion] = useState<string | null>('desc');

  const { addToCart } = useCartStore();
  const { toggle, contains } = useWishlistStore();
  const { openCartDrawer, sizeGuideOpen, openSizeGuide, closeSizeGuide } = useUIStore();

  const isWishlisted = contains(product.id);

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0] || '/images/products/overcoat-1.jpg',
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      size: selectedSize.name,
      quantity,
      maxQuantity: 10,
    });
    openCartDrawer();
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };


  return (
    <div className="pt-24 pb-24 bg-white">
      <div className="page-container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Shop', href: '/shop' },
            { label: product.category, href: `/shop?category=${product.category.toLowerCase()}` },
            { label: product.name },
          ]}
        />

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-4">
          {/* Left Column — 3D Viewer & Gallery */}
          <div className="lg:col-span-7 flex flex-col">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 mb-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveViewMode('3d')}
                  className={`text-xs tracking-[0.14em] uppercase font-medium pb-1 relative transition-colors ${
                    activeViewMode === '3d' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Interactive 3D Studio
                  {activeViewMode === '3d' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
                  )}
                </button>
                <button
                  onClick={() => setActiveViewMode('gallery')}
                  className={`text-xs tracking-[0.14em] uppercase font-medium pb-1 relative transition-colors ${
                    activeViewMode === 'gallery' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-700'
                  }`}
                >
                  Editorial Gallery
                  {activeViewMode === 'gallery' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900" />
                  )}
                </button>
              </div>

              <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-light hidden sm:inline">
                Drag to Rotate · Pinch to Zoom
              </span>
            </div>

            {/* Viewer Box */}
            <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] bg-neutral-100 rounded-xs overflow-hidden shadow-sm">
              {activeViewMode === '3d' ? (
                <ProductViewer
                  colorHex={selectedColor.hex}
                  materialType={product.materials[0]?.toLowerCase() as any || 'wool'}
                  hotspots={DEFAULT_HOTSPOTS}
                  fallbackImage={product.images[0]}
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={product.images[0] || '/images/products/overcoat-1.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              )}
            </div>

            {/* Features below 3D */}
            <div className="grid grid-cols-3 gap-4 pt-6 text-center border-t border-neutral-100 mt-6">
              <div className="p-3">
                <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">Craftsmanship</p>
                <p className="text-xs font-medium text-neutral-800 mt-1">Artisanal Tailoring</p>
              </div>
              <div className="p-3">
                <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">Shipping</p>
                <p className="text-xs font-medium text-neutral-800 mt-1">Complimentary Global</p>
              </div>
              <div className="p-3">
                <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-400">Guarantee</p>
                <p className="text-xs font-medium text-neutral-800 mt-1">5-Year Quality Care</p>
              </div>
            </div>
          </div>

          {/* Right Column — Purchasing & Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Header info */}
            <div className="border-b border-neutral-100 pb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
                  {product.collection || 'Autumn Essentials'} · {product.category}
                </span>
                <Rating value={product.rating} reviewCount={product.reviewCount} />
              </div>

              <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 leading-tight mb-3">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-medium text-neutral-900 tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
                <span className="text-[10px] tracking-wider uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 font-medium ml-2">
                  In Stock & Ready to Ship
                </span>
              </div>
            </div>

            {/* Selectors */}
            <div className="py-6 space-y-6 border-b border-neutral-100">
              {/* Color Selector with Real-time 3D Sync */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs tracking-[0.12em] uppercase text-neutral-600 font-medium">
                    Color: <span className="text-neutral-900 font-normal">{selectedColor.name}</span>
                  </span>
                  <span className="text-[10px] tracking-wider text-neutral-400">Updates 3D View</span>
                </div>
                <ColorSelector
                  colors={product.colors}
                  selectedColor={selectedColor.name}
                  onSelect={(color) => setSelectedColor(color)}
                />
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs tracking-[0.12em] uppercase text-neutral-600 font-medium">
                    Select Size: <span className="text-neutral-900 font-normal">{selectedSize.name}</span>
                  </span>
                  <button
                    onClick={openSizeGuide}
                    className="text-xs text-neutral-500 hover:text-neutral-900 underline underline-offset-4 transition-colors"
                  >
                    Size Guide
                  </button>
                </div>
                <SizeSelector
                  sizes={product.sizes}
                  selectedSize={selectedSize.name}
                  onSelect={(size) => setSelectedSize(size)}
                />
              </div>

              {/* Quantity */}
              <div>
                <span className="text-xs tracking-[0.12em] uppercase text-neutral-600 font-medium block mb-2.5">
                  Quantity
                </span>
                <QuantitySelector
                  value={quantity}
                  min={1}
                  max={10}
                  onChange={(val) => setQuantity(val)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="py-6 space-y-3">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-neutral-900 text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-black transition-colors shadow-sm active:scale-[0.99]"
                >
                  Add to Bag
                </button>
                <button
                  onClick={() =>
                    toggle({
                      id: product.id,
                      productId: product.id,
                      name: product.name,
                      slug: product.slug,
                      price: product.price,
                      compareAtPrice: product.compareAtPrice,
                      image: product.images[0] || '/images/products/overcoat-1.jpg',
                      colors: product.colors,
                      addedAt: new Date().toISOString(),
                    })
                  }
                  className={`p-4 border rounded-xs transition-colors ${
                    isWishlisted
                      ? 'border-red-200 bg-red-50/40 text-red-600'
                      : 'border-neutral-200 text-neutral-700 hover:border-neutral-900'
                  }`}
                  aria-label="Wishlist"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={isWishlisted ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 border border-neutral-900 text-neutral-900 text-xs font-medium tracking-[0.15em] uppercase hover:bg-neutral-50 transition-colors"
              >
                Instant Checkout
              </button>

              <VirtualTryOn productImage={product.images[0] || '/images/products/overcoat-1.jpg'} productName={product.name} />
            </div>

            {/* Luxury Accordions */}
            <div className="divide-y divide-neutral-100 border-t border-neutral-100">
              {/* Description */}
              <div className="py-4">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'desc' ? null : 'desc')}
                  className="w-full flex items-center justify-between text-xs tracking-[0.14em] uppercase text-neutral-900 font-medium py-1"
                >
                  <span>Description & Fit</span>
                  <span>{activeAccordion === 'desc' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'desc' && (
                  <div className="pt-3 text-xs text-neutral-600 font-light leading-relaxed animate-fade-in">
                    <p className="mb-2">{product.description}</p>
                    <ul className="list-disc pl-4 space-y-1 text-neutral-500">
                      <li>Designed for a relaxed contemporary drape</li>
                      <li>Double-breasted front with hidden interior fastening</li>
                      <li>Articulated sleeves with storm flap interior cuffs</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Materials */}
              <div className="py-4">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'mat' ? null : 'mat')}
                  className="w-full flex items-center justify-between text-xs tracking-[0.14em] uppercase text-neutral-900 font-medium py-1"
                >
                  <span>Materials & Craftsmanship</span>
                  <span>{activeAccordion === 'mat' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'mat' && (
                  <div className="pt-3 text-xs text-neutral-600 font-light leading-relaxed animate-fade-in space-y-1.5">
                    <p>
                      <strong>Main Fabric:</strong> {product.materials.join(', ')}
                    </p>
                    <p>
                      <strong>Origin:</strong> Crafted by master artisans in Italy
                    </p>
                    <p>
                      <strong>Hardware:</strong> Custom antiqued nickel-plated brass
                    </p>
                  </div>
                )}
              </div>

              {/* Care */}
              <div className="py-4">
                <button
                  onClick={() => setActiveAccordion(activeAccordion === 'care' ? null : 'care')}
                  className="w-full flex items-center justify-between text-xs tracking-[0.14em] uppercase text-neutral-900 font-medium py-1"
                >
                  <span>Care Instructions</span>
                  <span>{activeAccordion === 'care' ? '−' : '+'}</span>
                </button>
                {activeAccordion === 'care' && (
                  <div className="pt-3 text-xs text-neutral-600 font-light leading-relaxed animate-fade-in">
                    <p>Specialist dry clean only. Steam with low heat. Store on contoured wooden hanger in a breathable garment bag.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ProductReviews productSlug={product.slug} reviews={product.Review || []} />

        {/* Related Products */}
        <div className="mt-28 pt-16 border-t border-neutral-200">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-caption text-neutral-400 mb-1">Curated Selection</p>
              <h2 className="text-2xl font-light text-neutral-900">Complete the Look</h2>
            </div>
            <Link
              href="/shop"
              className="text-xs tracking-[0.12em] uppercase text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              View All
            </Link>
          </div>
          <ProductGrid products={relatedProducts} columns={4} />
        </div>
      </div>

      {/* Size Guide Modal */}
      <Modal isOpen={sizeGuideOpen} onClose={closeSizeGuide} title="Garment Measurements (Inches)">
        <div className="space-y-6 pt-2">
          <p className="text-xs text-neutral-500">
            All measurements are taken flat. Compare these metrics against a garment you already own for the optimal fit.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-400 uppercase tracking-wider">
                  <th className="py-2.5">Size</th>
                  <th className="py-2.5">Chest</th>
                  <th className="py-2.5">Shoulders</th>
                  <th className="py-2.5">Sleeve</th>
                  <th className="py-2.5">Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {[
                  { size: 'XS', chest: '38"', shoulders: '17.5"', sleeve: '33"', length: '40"' },
                  { size: 'S', chest: '40"', shoulders: '18.0"', sleeve: '34"', length: '41"' },
                  { size: 'M', chest: '42"', shoulders: '18.5"', sleeve: '35"', length: '42"' },
                  { size: 'L', chest: '44"', shoulders: '19.0"', sleeve: '35.5"', length: '43"' },
                  { size: 'XL', chest: '46"', shoulders: '19.5"', sleeve: '36"', length: '44"' },
                  { size: 'XXL', chest: '48"', shoulders: '20.0"', sleeve: '36.5"', length: '45"' },
                ].map((row) => (
                  <tr key={row.size} className="hover:bg-neutral-50">
                    <td className="py-2.5 font-medium">{row.size}</td>
                    <td className="py-2.5">{row.chest}</td>
                    <td className="py-2.5">{row.shoulders}</td>
                    <td className="py-2.5">{row.sleeve}</td>
                    <td className="py-2.5">{row.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={closeSizeGuide}
            className="w-full py-3 bg-neutral-900 text-white text-xs font-medium tracking-[0.15em] uppercase hover:bg-black transition-colors"
          >
            Got It
          </button>
        </div>
      </Modal>
    </div>
  );
}
