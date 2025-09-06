import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { products } from "~~/data/products";
import { FilterOptions, Product } from "~~/types/marketplace";

interface ThirdwebMarketplaceState {
  // Mock data for development/fallback
  mockProducts: Product[];
  // Thirdweb data
  blockchainProducts: Product[];
  // Combined data
  allProducts: Product[];
  filteredProducts: Product[];

  isLoading: boolean;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;

  filters: FilterOptions;

  // Actions
  setMockProducts: (products: Product[]) => void;
  setBlockchainProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  applyFilters: () => void;
  setCurrentPage: (page: number) => void;
  searchProducts: (query: string) => void;

  getProductById: (id: string) => Product | undefined;
  getFeaturedProducts: () => Product[];
  getTrendingProducts: () => Product[];
}

const defaultFilters: FilterOptions = {
  categories: [],
  priceRange: {
    min: 0,
    max: 10,
  },
  location: [],
  verified: false,
  inStock: true,
  sortBy: "newest",
  searchQuery: "",
};

export const useThirdwebMarketplaceStore = create<ThirdwebMarketplaceState>()(
  devtools(
    persist(
      (set, get) => ({
        mockProducts: products,
        blockchainProducts: [],
        allProducts: products,
        filteredProducts: products,
        isLoading: false,
        currentPage: 1,
        itemsPerPage: 13,
        totalItems: products.length,
        filters: defaultFilters,

        setMockProducts: newProducts =>
          set(
            state => {
              const allProducts = [...newProducts, ...state.blockchainProducts];
              return {
                mockProducts: newProducts,
                allProducts,
                filteredProducts: allProducts,
                totalItems: allProducts.length,
              };
            },
            false,
            "setMockProducts",
          ),

        setBlockchainProducts: newProducts =>
          set(
            state => {
              const allProducts = [...state.mockProducts, ...newProducts];
              return {
                blockchainProducts: newProducts,
                allProducts,
                filteredProducts: allProducts,
                totalItems: allProducts.length,
              };
            },
            false,
            "setBlockchainProducts",
          ),

        setFilters: newFilters =>
          set(
            state => {
              const updatedFilters = { ...state.filters, ...newFilters };
              let filtered = [...state.allProducts];

              // Apply search filter
              if (updatedFilters.searchQuery) {
                const query = updatedFilters.searchQuery.toLowerCase();
                filtered = filtered.filter(
                  product =>
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.tags.some(tag => tag.toLowerCase().includes(query)) ||
                    product.creator.name.toLowerCase().includes(query),
                );
              }

              // Apply category filter
              if (updatedFilters.categories.length > 0) {
                filtered = filtered.filter(product => updatedFilters.categories.includes(product.category));
              }

              // Apply price range filter
              filtered = filtered.filter(
                product =>
                  product.price.amount >= updatedFilters.priceRange.min &&
                  product.price.amount <= updatedFilters.priceRange.max,
              );

              // Apply location filter
              if (updatedFilters.location.length > 0) {
                filtered = filtered.filter(product => updatedFilters.location.includes(product.location.country));
              }

              // Apply verification filter
              if (updatedFilters.verified) {
                filtered = filtered.filter(product => product.creator.verified);
              }

              // Apply stock filter
              if (updatedFilters.inStock) {
                filtered = filtered.filter(product => product.availability.inStock);
              }

              // Apply sorting
              switch (updatedFilters.sortBy) {
                case "newest":
                  filtered.sort(
                    (a, b) => new Date(b.metadata.createdAt).getTime() - new Date(a.metadata.createdAt).getTime(),
                  );
                  break;
                case "oldest":
                  filtered.sort(
                    (a, b) => new Date(a.metadata.createdAt).getTime() - new Date(b.metadata.createdAt).getTime(),
                  );
                  break;
                case "price-low":
                  filtered.sort((a, b) => a.price.amount - b.price.amount);
                  break;
                case "price-high":
                  filtered.sort((a, b) => b.price.amount - a.price.amount);
                  break;
                case "rating":
                  filtered.sort((a, b) => b.stats.rating - a.stats.rating);
                  break;
                case "popular":
                  filtered.sort((a, b) => b.stats.views - a.stats.views);
                  break;
                default:
                  break;
              }

              return {
                filters: updatedFilters,
                filteredProducts: filtered,
                totalItems: filtered.length,
                currentPage: 1,
              };
            },
            false,
            "setFilters",
          ),

        resetFilters: () =>
          set(
            state => ({
              filters: defaultFilters,
              filteredProducts: state.allProducts,
              currentPage: 1,
              totalItems: state.allProducts.length,
            }),
            false,
            "resetFilters",
          ),

        applyFilters: () =>
          set(
            state => {
              let filtered = [...state.allProducts];
              const { filters } = state;

              if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                filtered = filtered.filter(
                  product =>
                    product.name.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query) ||
                    product.tags.some(tag => tag.toLowerCase().includes(query)) ||
                    product.creator.name.toLowerCase().includes(query),
                );
              }

              if (filters.categories.length > 0) {
                filtered = filtered.filter(product => filters.categories.includes(product.category));
              }

              filtered = filtered.filter(
                product =>
                  product.price.amount >= filters.priceRange.min && product.price.amount <= filters.priceRange.max,
              );

              if (filters.location.length > 0) {
                filtered = filtered.filter(product => filters.location.includes(product.location.country));
              }

              if (filters.verified) {
                filtered = filtered.filter(product => product.creator.verified);
              }

              if (filters.inStock) {
                filtered = filtered.filter(product => product.availability.inStock);
              }

              switch (filters.sortBy) {
                case "newest":
                  filtered.sort(
                    (a, b) => new Date(b.metadata.createdAt).getTime() - new Date(a.metadata.createdAt).getTime(),
                  );
                  break;
                case "oldest":
                  filtered.sort(
                    (a, b) => new Date(a.metadata.createdAt).getTime() - new Date(b.metadata.createdAt).getTime(),
                  );
                  break;
                case "price-low":
                  filtered.sort((a, b) => a.price.amount - b.price.amount);
                  break;
                case "price-high":
                  filtered.sort((a, b) => b.price.amount - a.price.amount);
                  break;
                case "popular":
                  filtered.sort((a, b) => b.stats.views - a.stats.views);
                  break;
                case "rating":
                  filtered.sort((a, b) => b.stats.rating - a.stats.rating);
                  break;
              }

              return {
                filteredProducts: filtered,
                totalItems: filtered.length,
                currentPage: 1,
              };
            },
            false,
            "applyFilters",
          ),

        setCurrentPage: page => set({ currentPage: page }, false, "setCurrentPage"),

        searchProducts: query =>
          set(
            state => {
              const updatedFilters = { ...state.filters, searchQuery: query };
              return { filters: updatedFilters };
            },
            false,
            "searchProducts",
          ),

        getProductById: id => {
          const { allProducts } = get();
          return allProducts.find(product => product.id === id);
        },

        getFeaturedProducts: () => {
          const { allProducts } = get();
          return allProducts.filter(product => product.metadata.featured);
        },

        getTrendingProducts: () => {
          const { allProducts } = get();
          return allProducts.filter(product => product.metadata.trending);
        },
      }),
      {
        name: "thirdweb-marketplace-store",
        partialize: state => ({
          filters: state.filters,
          currentPage: state.currentPage,
          itemsPerPage: state.itemsPerPage,
        }),
      },
    ),
    {
      name: "thirdweb-marketplace-store",
    },
  ),
);
