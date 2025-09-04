"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { EyeIcon, ScaleIcon, ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { formatPrice } from "~~/lib/utils";
import { useCartStore } from "~~/stores/cartStore";
import { useComparisonStore } from "~~/stores/comparisonStore";
import { useQuickViewStore } from "~~/stores/quickViewStore";
import { Product } from "~~/types/marketplace";

interface ComparisonFeature {
  label: string;
  getValue: (product: Product) => string | number | null;
  format?: (value: any) => string;
}

const comparisonFeatures: ComparisonFeature[] = [
  {
    label: "Price",
    getValue: product => product.price.amount,
    format: value => formatPrice({ amount: value, currency: "ETH" }),
  },
  {
    label: "Creator",
    getValue: product => product.creator.name,
  },
  {
    label: "Category",
    getValue: product => product.category,
  },
  {
    label: "Rating",
    getValue: product => product.stats.rating,
    format: value => (value ? `${value.toFixed(1)} ⭐` : "No rating"),
  },
  {
    label: "Reviews",
    getValue: product => product.stats.reviews,
    format: value => (value ? `${value} reviews` : "No reviews"),
  },
  {
    label: "Location",
    getValue: product => product.location.country,
    format: value => value || "Not specified",
  },
  {
    label: "Tags",
    getValue: product => product.tags?.length || 0,
    format: value => `${value} tags`,
  },
];

export const ProductComparison = () => {
  const { products, isOpen, removeFromComparison, clearComparison, closeComparison } = useComparisonStore();

  const { addToCart } = useCartStore();
  const { openQuickView } = useQuickViewStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeComparison();
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
  };

  const handleQuickView = (product: Product) => {
    openQuickView(product);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-base-100 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="bg-base-100 border-b border-base-200 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ScaleIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Compare Products</h2>
              <span className="text-base-content/60">({products.length} items)</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={clearComparison} className="btn btn-ghost btn-sm">
                Clear All
              </button>
              <button
                onClick={closeComparison}
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Close comparison"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto overflow-y-auto max-h-[calc(90vh-80px)]">
            <div className="min-w-full">
              {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <ScaleIcon className="w-16 h-16 text-base-content/30 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No products to compare</h3>
                  <p className="text-base-content/60">Add products to comparison to see them here.</p>
                </div>
              ) : (
                <div
                  className="grid grid-cols-1 gap-0"
                  style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
                >
                  <div className="p-4 bg-base-200 font-semibold border-b border-base-300">Products</div>
                  {products.map(product => (
                    <div key={product.id} className="p-4 border-b border-base-300 relative">
                      <button
                        onClick={() => removeFromComparison(product.id)}
                        className="absolute top-2 right-2 btn btn-ghost btn-xs btn-circle z-10"
                        aria-label="Remove from comparison"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>

                      <div className="space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-lg bg-base-200">
                          <Image
                            src={product.images?.[0] || "/api/placeholder/300/300"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="300px"
                          />
                        </div>

                        <div>
                          <h3 className="font-semibold text-sm line-clamp-2 mb-2">{product.name}</h3>
                          <div className="text-lg font-bold text-primary mb-3">{formatPrice(product.price)}</div>

                          <div className="flex flex-col gap-2">
                            <button onClick={() => handleAddToCart(product)} className="btn btn-primary btn-sm w-full">
                              <ShoppingCartIcon className="w-4 h-4" />
                              Add to Cart
                            </button>
                            <button onClick={() => handleQuickView(product)} className="btn btn-ghost btn-sm w-full">
                              <EyeIcon className="w-4 h-4" />
                              Quick View
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {comparisonFeatures.map(feature => (
                    <div key={feature.label} className="contents">
                      <div className="p-4 bg-base-200 font-medium border-b border-base-300">{feature.label}</div>
                      {products.map(product => {
                        const value = feature.getValue(product);
                        const displayValue = feature.format ? feature.format(value) : value?.toString() || "N/A";

                        return (
                          <div key={product.id} className="p-4 border-b border-base-300">
                            <span className="text-sm">{displayValue}</span>
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  <div className="p-4 bg-base-200 font-medium border-b border-base-300">Description</div>
                  {products.map(product => (
                    <div key={product.id} className="p-4 border-b border-base-300">
                      <p className="text-sm text-base-content/80 line-clamp-3">
                        {product.description || "No description available"}
                      </p>
                    </div>
                  ))}

                  <div className="p-4 bg-base-200 font-medium">Tags</div>
                  {products.map(product => (
                    <div key={product.id} className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {product.tags?.slice(0, 3).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-base-200 text-xs rounded-full">
                            {tag}
                          </span>
                        )) || <span className="text-sm text-base-content/60">No tags</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
