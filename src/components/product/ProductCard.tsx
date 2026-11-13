'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/utils';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';
import { useUIStore } from '@/stores/ui-store';
import { Product } from '@/types';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  className?: string;
  priority?: boolean;
}

export default function ProductCard({ product, className, priority = false }: ProductCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { toggle, contains } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { openCartDrawer } = useUIStore();
  
  const isWishlisted = contains(product.id);
  const isOnSale = product.compareAtPrice && product.compareAtPrice > product.price;

  const currentImage = product.images[0] || '/images/hero/hero.jpg';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const selectedColor = product.colors[selectedColorIndex] || product.colors[0];
    const defaultSize = product.sizes.find(s => s.available)?.name || 'M';

    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: currentImage,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      size: defaultSize,
      quantity: 1,
      maxQuantity: 10,
    });

    openCartDrawer();
  };

  return (
    <div 
      className={cn('group relative flex flex-col', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden mb-4 rounded-xs">
        <div className="aspect-[3/4] bg-neutral-100 relative overflow-hidden">
          <Image
            src={currentImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            priority={priority}
          />

          {/* Subtle vignette on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isOnSale && <Badge variant="sale" />}
            {product.featured && !isOnSale && <Badge variant="new" />}
          </div>

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle({
                id: product.id,
                productId: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                compareAtPrice: product.compareAtPrice,
                image: currentImage,
                colors: product.colors,
                addedAt: new Date().toISOString(),
              });
            }}
            className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-md shadow-xs opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={isWishlisted ? '#ef4444' : 'none'}
              stroke={isWishlisted ? '#ef4444' : '#171717'}
              strokeWidth="1.5"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Quick Add Button overlay on hover */}
          <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <button
              onClick={handleQuickAdd}
              className="w-full py-3 bg-neutral-900/95 backdrop-blur-md text-white text-[11px] font-medium tracking-[0.14em] uppercase hover:bg-black transition-colors shadow-lg active:scale-[0.99]"
            >
              + Quick Add
            </button>
          </div>
        </div>
      </Link>

      {/* Product info */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Color dots */}
          {product.colors.length > 1 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.colors.map((color, i) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColorIndex(i)}
                  className={cn(
                    'w-3.5 h-3.5 rounded-full transition-all duration-200 cursor-pointer border border-black/10',
                    selectedColorIndex === i && 'ring-1 ring-offset-1 ring-neutral-900 scale-110'
                  )}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.name}
                  title={color.name}
                />
              ))}
            </div>
          )}

          {/* Category / Collection Tag */}
          <p className="text-[10px] tracking-[0.18em] uppercase text-neutral-400 font-medium">
            {product.category} · {product.materials[0]}
          </p>

          {/* Name */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm text-neutral-900 font-normal hover:text-neutral-600 transition-colors leading-snug pt-0.5">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 pt-1">
          <span className={cn('text-sm font-medium tracking-tight', isOnSale ? 'text-red-600' : 'text-neutral-900')}>
            {formatPrice(product.price)}
          </span>
          {isOnSale && product.compareAtPrice && (
            <span className="text-xs text-neutral-400 line-through font-normal">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
