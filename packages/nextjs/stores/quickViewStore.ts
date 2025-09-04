import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Product } from "~~/types/marketplace";

interface QuickViewState {
  product: Product | null;
  isOpen: boolean;

  isLoading: boolean;
  selectedImageIndex: number;
  selectedVariant: string | null;
  quantity: number;

  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setSelectedImage: (index: number) => void;
  setSelectedVariant: (variant: string | null) => void;
  setQuantity: (quantity: number) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  resetQuickView: () => void;
}

export const useQuickViewStore = create<QuickViewState>()(
  devtools(
    set => ({
      product: null,
      isOpen: false,
      isLoading: false,
      selectedImageIndex: 0,
      selectedVariant: null,
      quantity: 1,

      openQuickView: (product: Product) => {
        set(
          () => ({
            product,
            isOpen: true,
            selectedImageIndex: 0,
            selectedVariant: null,
            quantity: 1,
            isLoading: false,
          }),
          false,
          "openQuickView",
        );
      },

      closeQuickView: () => {
        set(
          () => ({
            isOpen: false,
          }),
          false,
          "closeQuickView",
        );
      },

      setSelectedImage: (index: number) => {
        set(
          state => {
            const maxIndex = state.product?.images?.length || 1;
            const clampedIndex = Math.max(0, Math.min(index, maxIndex - 1));
            return { selectedImageIndex: clampedIndex };
          },
          false,
          "setSelectedImage",
        );
      },

      setSelectedVariant: (variant: string | null) => {
        set(() => ({ selectedVariant: variant }), false, "setSelectedVariant");
      },

      setQuantity: (quantity: number) => {
        set(() => ({ quantity: Math.max(1, quantity) }), false, "setQuantity");
      },

      incrementQuantity: () => {
        set(state => ({ quantity: state.quantity + 1 }), false, "incrementQuantity");
      },

      decrementQuantity: () => {
        set(state => ({ quantity: Math.max(1, state.quantity - 1) }), false, "decrementQuantity");
      },

      resetQuickView: () => {
        set(
          () => ({
            product: null,
            isOpen: false,
            selectedImageIndex: 0,
            selectedVariant: null,
            quantity: 1,
            isLoading: false,
          }),
          false,
          "resetQuickView",
        );
      },
    }),
    {
      name: "QuickViewStore",
    },
  ),
);
