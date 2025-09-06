"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  CheckBadgeIcon,
  EyeIcon,
  HeartIcon,
  MapPinIcon,
  ShareIcon,
  ShieldCheckIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { useToast } from "~~/components/Toast";
import { Button } from "~~/components/ui";
import { useThirdwebMarketplace } from "~~/hooks/thirdweb/useThirdwebMarketplace";
import { useMarketplaceStore } from "~~/stores/marketplaceStore";

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const { getProductById } = useMarketplaceStore();
  const { products: blockchainProducts, buyListing, makeOffer } = useThirdwebMarketplace();
  const { addToast } = useToast();

  // Try to find product in blockchain products first, then fallback to store
  const blockchainProduct = blockchainProducts.find(p => p.id === productId);
  const storeProduct = getProductById(productId);
  const product = blockchainProduct || storeProduct;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isMakingOffer, setIsMakingOffer] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
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
          <h1 className="text-2xl font-bold text-base-content mb-4">Product Not Found</h1>
          <p className="text-base-content/60 mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button onClick={() => router.push("/marketplace")}>Return to Marketplace</Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: typeof product.price) => {
    if (price.currency === "ETH") {
      // Format ETH with proper decimal places and avoid scientific notation
      const formattedAmount = price.amount < 0.001 ? price.amount.toExponential(2) : price.amount.toFixed(4);
      return `${formattedAmount} ETH`;
    }
    return `${price.amount.toLocaleString()} $SANKOFA`;
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handlePurchase = async () => {
    if (!product.isListed || !product.listingId) {
      alert("This product is not available for purchase");
      return;
    }

    setIsPurchasing(true);
    try {
      await buyListing(product.listingId);
      addToast({
        type: "success",
        title: "Purchase Successful!",
        message: "Check your wallet for the NFT.",
      });
    } catch (error) {
      console.error("Purchase failed:", error);
      addToast({
        type: "error",
        title: "Purchase Failed",
        message: "Please try again or check your wallet connection.",
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleMakeOffer = async () => {
    if (!product.isListed || !product.listingId) {
      alert("This product is not available for offers");
      return;
    }

    const offerPrice = prompt(`Enter your offer price in ETH (minimum: ${product.price.amount} ETH):`);
    if (!offerPrice) return;

    const price = parseFloat(offerPrice);
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price");
      return;
    }

    setIsMakingOffer(true);
    try {
      await makeOffer(product.listingId, offerPrice);
      addToast({
        type: "success",
        title: "Offer Submitted!",
        message: "Your offer has been submitted successfully.",
      });
    } catch (error) {
      console.error("Offer failed:", error);
      addToast({
        type: "error",
        title: "Offer Failed",
        message: "Please try again or check your wallet connection.",
      });
    } finally {
      setIsMakingOffer(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="bg-base-100 border-b border-base-content/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-base-content/70 hover:text-base-content"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-square rounded-2xl overflow-hidden bg-base-100 border border-base-content/10"
            >
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index
                        ? "border-indigo-500 ring-2 ring-indigo-500/20"
                        : "border-base-content/20 hover:border-indigo-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.metadata.featured && (
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-semibold rounded-full">
                    Featured
                  </span>
                )}
                {product.metadata.trending && (
                  <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-semibold rounded-full">
                    Trending
                  </span>
                )}
                {product.authenticity.verified && (
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                    <ShieldCheckIcon className="w-4 h-4" />
                    Verified Authentic
                  </span>
                )}
                {product.isListed && (
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Blockchain
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-base-content mb-4">{product.name}</h1>

              <Link
                href={`/creator/${product.creator.id}`}
                className="flex items-center gap-3 mb-4 hover:bg-base-content/5 rounded-lg p-2 -m-2 transition-colors"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={product.creator.avatar}
                    alt={product.creator.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base-content">{product.creator.name}</span>
                    {product.creator.verified && <CheckBadgeIcon className="w-5 h-5 text-blue-500" />}
                  </div>
                  {product.creator.ensName && (
                    <span className="text-sm text-indigo-300">{product.creator.ensName}</span>
                  )}
                </div>
              </Link>

              <div className="flex items-center gap-2 text-base-content/60 mb-4">
                <MapPinIcon className="w-5 h-5" />
                <span>
                  {product.location.country}
                  {product.location.region && `, ${product.location.region}`}
                </span>
              </div>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.stats.rating) ? "text-yellow-500 fill-current" : "text-base-content/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-medium text-base-content">{product.stats.rating.toFixed(1)}</span>
                  <span className="text-base-content/60">({product.stats.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-base-content/60">
                  <EyeIcon className="w-4 h-4" />
                  <span>{product.stats.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            <div className="bg-base-100 rounded-2xl border border-base-content/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-3xl font-bold text-base-content">{formatPrice(product.price)}</div>
                  {product.price.usd && <div className="text-lg text-base-content/60">≈ ${product.price.usd}</div>}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLike}
                    className="p-3 bg-base-200 hover:bg-base-300 rounded-full transition-colors"
                    title={isLiked ? "Remove from favorites" : "Add to favorites"}
                  >
                    {isLiked ? (
                      <HeartSolidIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <HeartIcon className="w-6 h-6 text-base-content" />
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 bg-base-200 hover:bg-base-300 rounded-full transition-colors"
                    title="Share product"
                  >
                    <ShareIcon className="w-6 h-6 text-base-content" />
                  </button>
                </div>
              </div>

              {product.availability.inStock ? (
                <div className="space-y-4">
                  {!product.availability.isDigital && product.availability.quantity && (
                    <div className="flex items-center gap-4">
                      <span className="text-base-content/70">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedQuantity(Math.max(1, selectedQuantity - 1))}
                          className="w-8 h-8 bg-base-200 hover:bg-base-300 rounded-lg flex items-center justify-center transition-colors"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium">{selectedQuantity}</span>
                        <button
                          onClick={() =>
                            setSelectedQuantity(Math.min(product.availability.quantity || 1, selectedQuantity + 1))
                          }
                          className="w-8 h-8 bg-base-200 hover:bg-base-300 rounded-lg flex items-center justify-center transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm text-base-content/60">{product.availability.quantity} available</span>
                    </div>
                  )}

                  {product.isListed ? (
                    <div className="space-y-3">
                      <Button
                        size="lg"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={handlePurchase}
                        disabled={isPurchasing}
                      >
                        {isPurchasing ? "Processing..." : `Buy Now - ${formatPrice(product.price)}`}
                      </Button>
                      {product.listingType === "auction" && (
                        <Button
                          size="lg"
                          variant="outline"
                          className="w-full"
                          onClick={handleMakeOffer}
                          disabled={isMakingOffer}
                        >
                          {isMakingOffer ? "Submitting Offer..." : "Make Offer"}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                      {product.availability.isDigital ? "Purchase & Download" : "Add to Cart"}
                    </Button>
                  )}

                  <div className="text-sm text-base-content/60 text-center">
                    {product.stats.sold} people have purchased this item
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-red-500 font-medium mb-2">Out of Stock</div>
                  <Button variant="outline" disabled>
                    Notify When Available
                  </Button>
                </div>
              )}
            </div>

            <div className="bg-base-100 rounded-2xl border border-base-content/10 p-6">
              <h3 className="text-xl font-semibold text-base-content mb-4">Description</h3>
              <p className="text-base-content/70 leading-relaxed">{product.description}</p>

              <div className="mt-6">
                <h4 className="text-lg font-medium text-base-content mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-base-200 text-base-content/70 text-sm rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {product.authenticity.verified && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-blue-900">Authenticity Verified</h3>
                </div>
                <p className="text-blue-800 mb-4">
                  This product has been verified as authentic and comes with a blockchain certificate.
                </p>
                {product.authenticity.nftCertificate && (
                  <div className="text-sm text-blue-700">
                    <strong>Certificate:</strong> {product.authenticity.nftCertificate}
                  </div>
                )}
                {product.authenticity.patternId && (
                  <div className="text-sm text-blue-700 mt-1">
                    <strong>Pattern ID:</strong> {product.authenticity.patternId}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
