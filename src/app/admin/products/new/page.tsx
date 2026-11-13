'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import Input from '@/components/ui/Input';
import Link from 'next/link';

export default function AdminNewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Men',
    description: '',
    image: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          images: formData.image ? [formData.image] : [],
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to create product');
      }

      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">Add New Garment</h1>
          <p className="text-xs text-neutral-500 mt-1">Create a new product in the catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 rounded-xs shadow-2xs space-y-6">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xs border border-red-100">
            {error}
          </div>
        )}

        <Input
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Price (USD)"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <div>
            <label className="block text-[11px] font-medium tracking-widest uppercase text-neutral-900 dark:text-neutral-300 mb-2">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-transparent border-b border-neutral-300 dark:border-neutral-700 pb-2 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] font-medium tracking-widest uppercase text-neutral-900 dark:text-neutral-300 mb-2">
            Primary Image
          </label>
          <CldUploadWidget 
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "axiom_preset"}
            onSuccess={(result: any) => {
              if (result?.info?.secure_url) {
                setFormData({ ...formData, image: result.info.secure_url });
              }
            }}
          >
            {({ open }) => {
              return (
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => open()}
                    className="w-full border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-6 text-sm text-neutral-500 hover:text-neutral-900 hover:border-neutral-900 transition-colors rounded-xs bg-neutral-50 dark:bg-neutral-800"
                  >
                    Click to Upload Image via Cloudinary
                  </button>
                  {formData.image && (
                    <div className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-200 p-2 rounded-xs flex items-center justify-between">
                      <span className="truncate pr-4">{formData.image}</span>
                      <button type="button" onClick={() => setFormData({...formData, image: ''})} className="text-emerald-800 font-medium">Remove</button>
                    </div>
                  )}
                </div>
              );
            }}
          </CldUploadWidget>
        </div>

        <div>
          <label className="block text-[11px] font-medium tracking-widest uppercase text-neutral-900 dark:text-neutral-300 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full bg-transparent border border-neutral-300 dark:border-neutral-700 p-3 text-sm text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors rounded-xs resize-none"
          />
        </div>

        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-6 py-2.5 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium uppercase tracking-wider rounded-xs hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-medium uppercase tracking-wider rounded-xs hover:bg-black transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
