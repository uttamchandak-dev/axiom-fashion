import { prisma } from '@/lib/prisma';
import CustomerTabs from './CustomerTabs';

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    include: {
      orders: {
        select: {
          total: true,
          createdAt: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Calculate Segmentation Data
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const segmentedData = customers.map(customer => {
    const totalSpend = customer.orders.reduce((sum, order) => sum + Number(order.total), 0);
    const orderCount = customer.orders.length;
    const lastOrderDate = customer.orders.length > 0 
      ? new Date(Math.max(...customer.orders.map(o => new Date(o.createdAt).getTime())))
      : null;

    let segment = 'Standard';
    if (totalSpend > 1000 || orderCount >= 5) {
      segment = 'VIP';
    } else if (lastOrderDate && lastOrderDate < sixMonthsAgo) {
      segment = 'At Risk';
    } else if (new Date(customer.createdAt) > thirtyDaysAgo) {
      segment = 'New';
    }

    return {
      id: customer.id,
      name: `${customer.firstName} ${customer.lastName}`,
      email: customer.email,
      phone: customer.phone || 'N/A',
      joinedAt: customer.createdAt.toISOString(),
      orderCount,
      totalSpend,
      lastOrderDate: lastOrderDate ? lastOrderDate.toISOString() : null,
      segment
    };
  });

  // Stats
  const vipCount = segmentedData.filter(c => c.segment === 'VIP').length;
  const atRiskCount = segmentedData.filter(c => c.segment === 'At Risk').length;
  const newCount = segmentedData.filter(c => c.segment === 'New').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-neutral-900 dark:text-white">Customer Segmentation</h1>
        <p className="text-sm text-neutral-500 mt-1">AI-driven analytics to identify high-value clients and churn risks.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-neutral-900 p-6 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">Total Customers</p>
          <p className="text-3xl font-light">{customers.length}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 p-6 border border-emerald-200 dark:border-emerald-900/50 rounded-xl shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-500 mb-2">VIP Clients</p>
          <p className="text-3xl font-light">{vipCount}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 p-6 border border-amber-200 dark:border-amber-900/50 rounded-xl shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500 mb-2">At Risk (6mo+)</p>
          <p className="text-3xl font-light">{atRiskCount}</p>
        </div>
        <div className="bg-white dark:bg-neutral-900 p-6 border border-blue-200 dark:border-blue-900/50 rounded-xl shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.2em] text-blue-600 dark:text-blue-500 mb-2">New (30 Days)</p>
          <p className="text-3xl font-light">{newCount}</p>
        </div>
      </div>

      <CustomerTabs customers={segmentedData} />
    </div>
  );
}
