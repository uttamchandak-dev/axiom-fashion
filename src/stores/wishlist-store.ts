'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WishlistItem } from '@/types';

interface WishlistStore {
  items: WishlistItem[];
  add: (item: WishlistItem) => void;
  remove: (productId: string) => void;
  toggle: (item: WishlistItem) => void;
  contains: (productId: string) => boolean;
  getCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      add: (item) => {
        if (!get().contains(item.productId)) {
          set({ items: [...get().items, { ...item, addedAt: new Date().toISOString() }] });
        }
      },

      remove: (productId) => {
        set({ items: get().items.filter((i) => i.productId !== productId) });
      },

      toggle: (item) => {
        if (get().contains(item.productId)) {
          get().remove(item.productId);
        } else {
          get().add(item);
        }
      },

      contains: (productId) => {
        return get().items.some((i) => i.productId === productId);
      },

      getCount: () => get().items.length,
    }),
    {
      name: 'axiom-wishlist',
    }
  )
);
