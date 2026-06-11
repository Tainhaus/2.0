// src/lib/cart-store.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, Product, ProductSize, Finish } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  // Actions
  addItem: (
    product: Product,
    options?: {
      selectedSize?: ProductSize;
      selectedFinish?: Finish;
      useCase?: string;
      configOptions?: Record<string, string>;
    }
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, options = {}) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.productId === product.id
          );

          const basePrice = product.salePrice ?? product.price;
          const sizeAdder = options.selectedSize?.priceAdder ?? 0;
          const finishAdder = options.selectedFinish?.priceAdder ?? 0;
          const unitPrice = basePrice + sizeAdder + finishAdder;

          if (existingIndex >= 0) {
            const newItems = [...state.items];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + 1,
            };
            return { items: newItems, isOpen: true };
          }

          const newItem: CartItem = {
            productId: product.id,
            product,
            quantity: 1,
            selectedSize: options.selectedSize,
            selectedFinish: options.selectedFinish,
            useCase: options.useCase,
            configOptions: options.configOptions,
            unitPrice,
          };

          return { items: [...state.items, newItem], isOpen: true };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotal: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
      },

      getItemCount: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "garden-pod-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
