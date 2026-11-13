'use client';

import { useState } from 'react';
import { formatPrice } from '@/lib/utils';

type CustomerSegment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  orderCount: number;
  totalSpend: number;
  lastOrderDate: string | null;
  segment: string;
};

const TABS = ['All', 'VIP', 'At Risk', 'New', 'Standard'];

export default function CustomerTabs({ customers }: { customers: CustomerSegment[] }) {
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(c => {
    const matchesTab = activeTab === 'All' || c.segment === activeTab;
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-sm">
      {/* Header & Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50/50 dark:bg-neutral-900/50">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-medium tracking-wide rounded-md transition-colors whitespace-nowrap ${
                  activeTab === tab 
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900' 
                    : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:focus:ring-white"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-neutral-50 dark:bg-neutral-950 text-neutral-500 text-xs uppercase tracking-wider border-b border-neutral-200 dark:border-neutral-800">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium text-right">Orders</th>
              <th className="px-6 py-4 font-medium text-right">Total Spend</th>
              <th className="px-6 py-4 font-medium">Last Order</th>
              <th className="px-6 py-4 font-medium">Segment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {filteredCustomers.map(customer => {
              let badgeColor = 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300';
              if (customer.segment === 'VIP') badgeColor = 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
              if (customer.segment === 'At Risk') badgeColor = 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
              if (customer.segment === 'New') badgeColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';

              return (
                <tr key={customer.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-white">{customer.name}</p>
                      <p className="text-xs text-neutral-500">{customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-neutral-600 dark:text-neutral-400">
                    {customer.orderCount}
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-neutral-900 dark:text-white">
                    {formatPrice(customer.totalSpend)}
                  </td>
                  <td className="px-6 py-4 text-xs text-neutral-500">
                    {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-medium uppercase tracking-widest ${badgeColor}`}>
                      {customer.segment}
                    </span>
                  </td>
                </tr>
              );
            })}

            {filteredCustomers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                  No customers found for this segment or search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
