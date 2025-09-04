import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { products } from "~~/data/products";
import { FilterOptions, Product } from "~~/types/marketplace";

interface MarketplaceState {
  products: Product[];
  filteredProducts: Product[];

  isLoading: boolean;
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;

  filters: FilterOptions;

  setProducts: (products: Product[]) => void;
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

export const useMarketplaceStore = create<MarketplaceState>()(
  devtools(
    persist(
      (set, get) => ({
        products: products,
        filteredProducts: products,
        isLoading: false,
        currentPage: 1,
        itemsPerPage: 13,
        totalItems: products.length,
        filters: defaultFilters,

        setProducts: newProducts =>
          set(
            () => ({
              products: newProducts,
              filteredProducts: newProducts,
              totalItems: newProducts.length,
            }),
            false,
            "setProducts",
          ),

        setFilters: newFilters =>
          set(
            state => {
              const updatedFilters = { ...state.filters, ...newFilters };

              let filtered = [...state.products];

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

              if (updatedFilters.categories.length > 0) {
                filtered = filtered.filter(product => updatedFilters.categories.includes(product.category));
              }

              filtered = filtered.filter(
                product =>
                  product.price.amount >= updatedFilters.priceRange.min &&
                  product.price.amount <= updatedFilters.priceRange.max,
              );

              if (updatedFilters.location.length > 0) {
                filtered = filtered.filter(product => updatedFilters.location.includes(product.location.country));
              }

              if (updatedFilters.verified) {
                filtered = filtered.filter(product => product.creator.verified);
              }

              if (updatedFilters.inStock) {
                filtered = filtered.filter(product => product.availability.inStock);
              }

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
              filteredProducts: state.products,
              currentPage: 1,
              totalItems: state.products.length,
            }),
            false,
            "resetFilters",
          ),

        applyFilters: () =>
          set(
            state => {
              let filtered = [...state.products];
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
          const { products } = get();
          return products.find(product => product.id === id);
        },

        getFeaturedProducts: () => {
          const { products } = get();
          return products.filter(product => product.metadata.featured);
        },

        getTrendingProducts: () => {
          const { products } = get();
          return products.filter(product => product.metadata.trending);
        },
      }),
      {
        name: "marketplace-store",
        partialize: state => ({
          filters: state.filters,
          currentPage: state.currentPage,
          itemsPerPage: state.itemsPerPage,
        }),
      },
    ),
    {
      name: "marketplace-store",
    },
  ),
);
