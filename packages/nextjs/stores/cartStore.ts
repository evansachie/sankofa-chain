import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Product } from "~~/types/marketplace";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariant?: string;
  addedAt: Date;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  isLoading: boolean;
  lastAction: string | null;

  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
  getCartTotal: () => { items: number; subtotal: number; tax: number; total: number };
  isProductInCart: (productId: string) => boolean;
  getProductQuantity: (productId: string) => number;
}

export const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        isOpen: false,
        isLoading: false,
        lastAction: null,

        addToCart: (product: Product, quantity = 1, variant) => {
          set(
            state => {
              const existingItemIndex = state.items.findIndex(
                item => item.product.id === product.id && item.selectedVariant === variant,
              );

              const newItems = [...state.items];

              if (existingItemIndex >= 0) {
                newItems[existingItemIndex] = {
                  ...newItems[existingItemIndex],
                  quantity: newItems[existingItemIndex].quantity + quantity,
                };
              } else {
                const newItem: CartItem = {
                  id: `${product.id}-${variant || "default"}-${Date.now()}`,
                  product,
                  quantity,
                  selectedVariant: variant,
                  addedAt: new Date(),
                };
                newItems.push(newItem);
              }

              return {
                items: newItems,
                lastAction: `Added ${product.name} to cart`,
                isOpen: true,
              };
            },
            false,
            "addToCart",
          );
        },

        removeFromCart: (itemId: string) => {
          set(
            state => ({
              items: state.items.filter(item => item.id !== itemId),
              lastAction: "Item removed from cart",
            }),
            false,
            "removeFromCart",
          );
        },

        updateQuantity: (itemId: string, quantity: number) => {
          set(
            state => {
              if (quantity <= 0) {
                return {
                  items: state.items.filter(item => item.id !== itemId),
                  lastAction: "Item removed from cart",
                };
              }

              return {
                items: state.items.map(item => (item.id === itemId ? { ...item, quantity } : item)),
                lastAction: "Quantity updated",
              };
            },
            false,
            "updateQuantity",
          );
        },

        clearCart: () => {
          set(
            () => ({
              items: [],
              lastAction: "Cart cleared",
              isOpen: false,
            }),
            false,
            "clearCart",
          );
        },

        toggleCart: () => {
          set(state => ({ isOpen: !state.isOpen }), false, "toggleCart");
        },

        openCart: () => {
          set(() => ({ isOpen: true }), false, "openCart");
        },

        closeCart: () => {
          set(() => ({ isOpen: false }), false, "closeCart");
        },

        getTotalItems: () => {
          const state = get();
          return state.items.reduce((total, item) => total + item.quantity, 0);
        },

        getTotalPrice: () => {
          const state = get();
          return state.items.reduce((total, item) => total + item.product.price.amount * item.quantity, 0);
        },

        getCartTotal: () => {
          const state = get();
          const subtotal = state.getTotalPrice();
          const tax = subtotal * 0.1;
          const total = subtotal + tax;
          const items = state.getTotalItems();

          return {
            items,
            subtotal,
            tax,
            total,
          };
        },

        isProductInCart: (productId: string) => {
          const state = get();
          return state.items.some(item => item.product.id === productId);
        },

        getProductQuantity: (productId: string) => {
          const state = get();
          const item = state.items.find(item => item.product.id === productId);
          return item ? item.quantity : 0;
        },
      }),
      {
        name: "sankofa-cart",
        partialize: state => ({
          items: state.items,
        }),
      },
    ),
    {
      name: "CartStore",
    },
  ),
);
