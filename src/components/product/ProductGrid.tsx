import { cn } from '@/lib/utils';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function ProductGrid({ products, columns = 4, className }: ProductGridProps) {
  return (
    <div
      className={cn(
        'grid gap-x-6 gap-y-10',
        columns === 2 && 'grid-cols-1 sm:grid-cols-2',
        columns === 3 && 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        columns === 4 && 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        className
      )}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
