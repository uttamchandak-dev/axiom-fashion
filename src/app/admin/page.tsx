'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  avgOrderValue: number;
  activeProducts: number;
  ordersByStatus: Record<string, number>;
  revenueByMonth: { month: string; revenue: number; orders: number }[];
  recentOrders: {
    id: string;
    orderNumber: string;
    customer: string;
    email: string;
    items: number;
    total: number;
    status: string;
    date: string;
  }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-7 w-64 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
            <div className="h-4 w-48 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse mt-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-5 rounded-xs">
              <div className="h-3 w-20 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
              <div className="h-8 w-28 bg-neutral-100 dark:bg-neutral-800 rounded animate-pulse mt-2" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-6 rounded-xs h-72 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400',
    processing: 'bg-blue-100 dark:bg-blue-950/30 text-blue-800 dark:text-blue-400',
    shipped: 'bg-purple-100 dark:bg-purple-950/30 text-purple-800 dark:text-purple-400',
    delivered: 'bg-emerald-100 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400',
    cancelled: 'bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-400',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white">Store Analytics & Overview</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">Real-time performance metrics and catalog status.</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black text-xs font-medium uppercase tracking-wider rounded-xs hover:opacity-90 transition-opacity"
        >
          + Add Product
        </Link>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: '💰' },
          { label: 'Total Orders', value: stats.totalOrders.toString(), icon: '📦' },
          { label: 'Customers', value: stats.totalCustomers.toString(), icon: '👥' },
          { label: 'Avg. Order Value', value: formatPrice(stats.avgOrderValue), icon: '📊' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 p-5 rounded-xs shadow-2xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-medium">{stat.label}</p>
              <span className="text-lg">{stat.icon}</span>
            </div>
            <p className="text-2xl font-semibold text-neutral-900 dark:text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xs p-6">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Monthly Revenue</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenueByMonth}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B7355" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B7355" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#8B7355" fill="url(#revenueGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xs p-6">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Monthly Orders</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#999' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a1a',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="orders" fill="#8B7355" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xs p-6">
        <h2 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Order Status Distribution</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {Object.entries(stats.ordersByStatus).map(([status, count]) => (
            <div key={status} className="text-center p-3 rounded-xs bg-neutral-50 dark:bg-neutral-800">
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{count}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${statusColors[status] || 'bg-neutral-100 text-neutral-600'}`}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xs overflow-hidden shadow-2xs">
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">Recent Customer Orders</h2>
          <Link href="/admin/orders" className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white font-medium transition-colors">
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-6">Items</th>
                <th className="py-3 px-6">Total</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-700">
              {stats.recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50/60 dark:hover:bg-neutral-700/30 transition-colors">
                  <td className="py-3.5 px-6 font-medium text-neutral-900 dark:text-white">{order.orderNumber}</td>
                  <td className="py-3.5 px-6 text-neutral-700 dark:text-neutral-300">{order.customer}</td>
                  <td className="py-3.5 px-6 text-neutral-500 dark:text-neutral-400">{order.items} pcs</td>
                  <td className="py-3.5 px-6 font-medium text-neutral-900 dark:text-white">{formatPrice(order.total)}</td>
                  <td className="py-3.5 px-6">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${statusColors[order.status] || ''}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-6 text-neutral-400 dark:text-neutral-500">
                    {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
