import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product } from "~~/types/marketplace";

interface ComparisonState {
  products: Product[];
  isOpen: boolean;
  maxProducts: number;

  isLoading: boolean;

  addToComparison: (product: Product) => void;
  removeFromComparison: (productId: string) => void;
  clearComparison: () => void;
  toggleComparison: () => void;
  openComparison: () => void;
  closeComparison: () => void;

  isProductInComparison: (productId: string) => boolean;
  canAddMore: () => boolean;
  getComparisonCount: () => number;
}

export const useComparisonStore = create<ComparisonState>()(
  devtools(
    (set, get) => ({
      products: [],
      isOpen: false,
      maxProducts: 4,
      isLoading: false,

      addToComparison: (product: Product) => {
        set(
          state => {
            if (state.products.length >= state.maxProducts) {
              return {
                products: [...state.products.slice(1), product],
                isOpen: true,
              };
            }

            if (state.products.some(p => p.id === product.id)) {
              return state;
            }

            return {
              products: [...state.products, product],
              isOpen: state.products.length === 0 ? true : state.isOpen,
            };
          },
          false,
          "addToComparison",
        );
      },

      removeFromComparison: (productId: string) => {
        set(
          state => ({
            products: state.products.filter(p => p.id !== productId),
            isOpen: state.products.length <= 1 ? false : state.isOpen,
          }),
          false,
          "removeFromComparison",
        );
      },

      clearComparison: () => {
        set(
          () => ({
            products: [],
            isOpen: false,
          }),
          false,
          "clearComparison",
        );
      },

      toggleComparison: () => {
        set(state => ({ isOpen: !state.isOpen }), false, "toggleComparison");
      },

      openComparison: () => {
        set(() => ({ isOpen: true }), false, "openComparison");
      },

      closeComparison: () => {
        set(() => ({ isOpen: false }), false, "closeComparison");
      },

      isProductInComparison: (productId: string) => {
        const state = get();
        return state.products.some(p => p.id === productId);
      },

      canAddMore: () => {
        const state = get();
        return state.products.length < state.maxProducts;
      },

      getComparisonCount: () => {
        const state = get();
        return state.products.length;
      },
    }),
    {
      name: "ComparisonStore",
    },
  ),
);
