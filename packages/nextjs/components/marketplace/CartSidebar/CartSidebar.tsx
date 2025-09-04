"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { formatPrice } from "~~/lib/utils";
import { useCartStore } from "~~/stores/cartStore";

export const CartSidebar = () => {
  const { items, isOpen, isLoading, lastAction, removeFromCart, updateQuantity, clearCart, closeCart, getCartTotal } =
    useCartStore();

  const cartTotal = getCartTotal();

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
      closeCart();
    }
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/50"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-base-100 shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="border-b border-base-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCartIcon className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <span className="badge badge-primary">{cartTotal.items}</span>
              </div>
              <button onClick={closeCart} className="btn btn-ghost btn-sm btn-circle" aria-label="Close cart">
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {lastAction && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-success/10 border-l-4 border-success p-3 text-sm text-success"
              >
                {lastAction}
              </motion.div>
            )}

            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <ShoppingBagIcon className="w-16 h-16 text-base-content/30 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-base-content/60 mb-6">Add some amazing artworks to get started!</p>
                  <Link href="/marketplace" onClick={closeCart} className="btn btn-primary">
                    Browse Marketplace
                  </Link>
                </div>
              ) : (
                <div className="p-4 space-y-4">
                  {items.map(item => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-base-200 rounded-lg p-4"
                    >
                      <div className="flex gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-base-300">
                          <Image
                            src={item.product.images?.[0] || "/api/placeholder/64/64"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-2 mb-1">{item.product.name}</h4>
                          <p className="text-xs text-base-content/60 mb-2">by {item.product.creator.name}</p>

                          {item.selectedVariant && (
                            <p className="text-xs text-base-content/60 mb-2">Variant: {item.selectedVariant}</p>
                          )}

                          <div className="flex items-center justify-between">
                            <span className="font-bold text-primary">
                              {formatPrice({
                                amount: item.product.price.amount * item.quantity,
                                currency: item.product.price.currency,
                              })}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="btn btn-ghost btn-xs btn-circle"
                                disabled={item.quantity <= 1}
                              >
                                <MinusIcon className="w-3 h-3" />
                              </button>

                              <span className="text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>

                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="btn btn-ghost btn-xs btn-circle"
                              >
                                <PlusIcon className="w-3 h-3" />
                              </button>

                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10"
                              >
                                <TrashIcon className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-base-200 p-6 space-y-4">
                <button onClick={clearCart} className="btn btn-ghost btn-sm w-full text-error hover:bg-error/10">
                  <TrashIcon className="w-4 h-4" />
                  Clear Cart
                </button>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartTotal.items} items)</span>
                    <span>{formatPrice({ amount: cartTotal.subtotal, currency: "ETH" })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>{formatPrice({ amount: cartTotal.tax, currency: "ETH" })}</span>
                  </div>
                  <div className="border-t border-base-300 pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice({ amount: cartTotal.total, currency: "ETH" })}</span>
                  </div>
                </div>

                <button className="btn btn-primary w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCartIcon className="w-5 h-5" />
                      Proceed to Checkout
                    </>
                  )}
                </button>

                <p className="text-xs text-base-content/60 text-center">
                  Secure checkout powered by blockchain technology
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
