import { prisma } from '@/lib/prisma';
import InventoryTable from './InventoryTable';

export const dynamic = 'force-dynamic';

export default async function AdminInventoryPage() {
  const variants = await prisma.productVariant.findMany({
    select: {
      id: true,
      sku: true,
      color: true,
      size: true,
      inventory: true,
      product: {
        select: { name: true, category: true, images: true }
      }
    },
    orderBy: {
      inventory: 'asc'
    }
  });

  // Calculate some quick stats
  const outOfStockCount = variants.filter(v => v.inventory === 0).length;
  const lowStockCount = variants.filter(v => v.inventory > 0 && v.inventory <= 5).length;
  const totalStock = variants.reduce((acc, v) => acc + v.inventory, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-neutral-900 dark:text-white">Inventory Management</h1>
        <p className="text-sm text-neutral-500 mt-1">Real-time stock tracking across all product variants.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm">
          <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2">Total Units</p>
          <p className="text-3xl font-light text-neutral-900 dark:text-white">{totalStock}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 p-6 border border-amber-200 dark:border-amber-900/50 rounded-xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 dark:bg-amber-900/20 rounded-bl-full -mr-8 -mt-8" />
          <p className="text-xs uppercase tracking-widest text-amber-600 dark:text-amber-500 mb-2">Low Stock (≤5)</p>
          <p className="text-3xl font-light text-neutral-900 dark:text-white">{lowStockCount}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 p-6 border border-red-200 dark:border-red-900/50 rounded-xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-bl-full -mr-8 -mt-8" />
          <p className="text-xs uppercase tracking-widest text-red-600 dark:text-red-500 mb-2">Out of Stock</p>
          <p className="text-3xl font-light text-neutral-900 dark:text-white">{outOfStockCount}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
        <InventoryTable initialData={variants as any} />
      </div>
    </div>
  );
}
