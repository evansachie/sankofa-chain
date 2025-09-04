import { ProductCard } from "../ProductCard";
import { Product } from "~~/types/marketplace";

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  variant?: "default" | "compact" | "featured";
  viewMode?: "grid" | "list";
  showStats?: boolean;
  onLike?: (productId: string) => void;
  likedProducts?: Set<string>;
}

export const ProductGrid = ({
  products,
  isLoading = false,
  variant = "default",
  viewMode = "grid",
  showStats = true,
  onLike,
  likedProducts = new Set(),
}: ProductGridProps) => {
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-base-content/10 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-base-content mb-2">No products found</h3>
          <p className="text-base-content/60">
            Try adjusting your filters or search terms to find what you&apos;re looking for.
          </p>
        </div>
      </div>
    );
  }

  const gridClasses = {
    default: viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-6",
    compact:
      viewMode === "grid"
        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        : "space-y-4",
    featured: viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-8",
  };

  return (
    <div className={gridClasses[variant]}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          variant={viewMode === "list" ? "list" : variant}
          showStats={showStats}
          onLike={onLike}
          isLiked={likedProducts.has(product.id)}
        />
      ))}
    </div>
  );
};

const ProductGridSkeleton = () => {
  const skeletonItems = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {skeletonItems.map(item => (
        <div key={item} className="bg-base-100 border border-base-content/10 rounded-2xl overflow-hidden animate-pulse">
          <div className="aspect-square bg-base-content/10" />
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-base-content/10 rounded-full" />
              <div className="h-4 bg-base-content/10 rounded w-20" />
            </div>

            <div className="space-y-2">
              <div className="h-5 bg-base-content/10 rounded w-full" />
              <div className="h-5 bg-base-content/10 rounded w-3/4" />
            </div>

            <div className="h-4 bg-base-content/10 rounded w-1/2" />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-6 bg-base-content/10 rounded w-20" />
                <div className="h-4 bg-base-content/10 rounded w-16" />
              </div>
              <div className="h-5 bg-base-content/10 rounded w-12" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-base-content/10">
              <div className="h-4 bg-base-content/10 rounded w-10" />
              <div className="h-4 bg-base-content/10 rounded w-10" />
              <div className="h-4 bg-base-content/10 rounded w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
