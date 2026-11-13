'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/ui/Breadcrumb';

interface Address {
  id: string;
  isDefault: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      isDefault: true,
      name: 'Alexander Wright',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      phone: '+1 (555) 234-5678',
    },
    {
      id: 'addr-2',
      isDefault: false,
      name: 'Alexander Wright (Summer Residence)',
      street: '12 Ocean View Drive',
      city: 'East Hampton',
      state: 'NY',
      zip: '11937',
      country: 'United States',
      phone: '+1 (555) 234-5678',
    },
  ]);

  const setDefault = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="pt-24 pb-32 bg-white">
      <div className="page-container">
        <Breadcrumb
          items={[
            { label: 'Account', href: '/account' },
            { label: 'Saved Addresses' },
          ]}
        />

        <div className="mb-10 pb-6 border-b border-neutral-100 flex items-baseline justify-between">
          <div>
            <h1 className="font-serif text-3xl md:text-5xl text-neutral-900">Saved Addresses</h1>
            <p className="text-xs text-neutral-500 mt-1">Manage delivery destinations for seamless one-click checkout.</p>
          </div>
          <button
            onClick={() => alert('New address modal opened.')}
            className="px-4 py-2 bg-neutral-900 text-white text-xs uppercase tracking-wider font-medium rounded-xs hover:bg-black transition-colors"
          >
            + Add Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-6 border rounded-xs relative flex flex-col justify-between ${
                addr.isDefault ? 'border-neutral-900 bg-neutral-50/50' : 'border-neutral-200 bg-white'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-900">
                    {addr.name}
                  </h3>
                  {addr.isDefault && (
                    <span className="text-[10px] uppercase tracking-wider font-medium text-neutral-900 bg-neutral-200 px-2 py-0.5 rounded-xs">
                      Default Delivery
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-600 font-light leading-relaxed">
                  {addr.street}<br />
                  {addr.city}, {addr.state} {addr.zip}<br />
                  {addr.country}
                </p>
                <p className="text-xs text-neutral-400 mt-2">{addr.phone}</p>
              </div>

              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-neutral-200 text-xs">
                {!addr.isDefault && (
                  <button
                    onClick={() => setDefault(addr.id)}
                    className="text-neutral-700 hover:text-neutral-900 font-medium"
                  >
                    Set as Default
                  </button>
                )}
                <button
                  onClick={() => alert(`Edit address ${addr.id}`)}
                  className="text-neutral-500 hover:text-neutral-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteAddress(addr.id)}
                  className="text-red-500 hover:text-red-700 ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
