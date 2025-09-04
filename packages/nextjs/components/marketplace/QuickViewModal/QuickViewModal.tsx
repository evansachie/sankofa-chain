"use client";

import { useEffect } from "react";
import { ProductImageGallery } from "../ProductImageGallery/ProductImageGallery";
import { AnimatePresence, motion } from "framer-motion";
import {
  EyeIcon,
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { formatPrice } from "~~/lib/utils";
import { useCartStore } from "~~/stores/cartStore";
import { useQuickViewStore } from "~~/stores/quickViewStore";

export const QuickViewModal = () => {
  const { product, isOpen, quantity, closeQuickView, incrementQuantity, decrementQuantity } = useQuickViewStore();

  const { addToCart } = useCartStore();

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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      closeQuickView();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeQuickView();
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-base-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-base-100 border-b border-base-200 p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 text-primary">
                <EyeIcon className="w-5 h-5" />
                <span className="font-medium">Quick View</span>
              </div>
              <button
                onClick={closeQuickView}
                className="btn btn-ghost btn-sm btn-circle"
                aria-label="Close quick view"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              <div>
                <ProductImageGallery
                  images={product.images || []}
                  productName={product.name}
                  enableZoom={false}
                  showThumbnails={true}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-base-content mb-2">{product.name}</h2>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                  </div>

                  {product.stats.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.stats.rating!)
                                ? "text-yellow-400 fill-current"
                                : "text-base-content/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-base-content/60">
                        {product.stats.rating.toFixed(1)} ({product.stats.reviews || 0} reviews)
                      </span>
                    </div>
                  )}
                </div>

                {product.description && (
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-base-content/80 text-sm leading-relaxed line-clamp-4">{product.description}</p>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-3">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-base-300 rounded-lg">
                      <button
                        onClick={decrementQuantity}
                        className="p-2 hover:bg-base-200 transition-colors duration-200"
                        disabled={quantity <= 1}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                      <button
                        onClick={incrementQuantity}
                        className="p-2 hover:bg-base-200 transition-colors duration-200"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-sm text-base-content/60">
                      Total:{" "}
                      {formatPrice({ amount: product.price.amount * quantity, currency: product.price.currency })}
                    </span>
                  </div>
                </div>

                {product.tags && product.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.slice(0, 5).map(tag => (
                        <span key={tag} className="px-3 py-1 bg-base-200 text-base-content text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button onClick={handleAddToCart} className="btn btn-primary flex-1 gap-2">
                    <ShoppingCartIcon className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="btn btn-ghost btn-square">
                    <HeartIcon className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-base-200 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Creator:</span>
                    <span className="font-medium">{product.creator.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/60">Location:</span>
                    <span className="font-medium">{product.location.country}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
