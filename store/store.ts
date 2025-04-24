import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../sanity.types'; // Adjust the path to your Sanity types

// Interface for a basket item
interface BasketItem {
  product: Product;
  quantity: number;
}

// Interface for the basket state
interface BasketState {
  items: BasketItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  clearBasket: () => void;
  getTotalPrice: () => number;
  getItemsCount: () => number;
  getItemQuantity: (productId: string) => number;
  getGroupedItems: () => Record<string, BasketItem>;
}

// Zustand store with persist middleware
export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product._id === product._id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.product._id === productId);
          if (existingItem) {
            if (existingItem.quantity > 1) {
              // Decrease the quantity by 1
              return {
                items: state.items.map((item) =>
                  item.product._id === productId
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                ),
              };
            } else {
              // Remove the item if quantity is 1
              return {
                items: state.items.filter((item) => item.product._id !== productId),
              };
            }
          }
          return state; // If the product doesn't exist, return the current state
        });
      },

      clearBasket: () => {
        set({ items: [] });
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.product.price ?? 0) * item.quantity, 0);
      },

      getItemsCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      getItemQuantity: (productId) => {
        const item = get().items.find((item) => item.product._id === productId);
        return item ? item.quantity : 0; // Return 0 if the product is not in the basket
      },

      getGroupedItems: () => {
        return get().items.reduce((grouped, item) => {
          grouped[item.product._id] = item;
          return grouped;
        }, {} as Record<string, BasketItem>);
      },
    }),
    {
      name: 'basket-storage', // Key for localStorage
    }
  )
);