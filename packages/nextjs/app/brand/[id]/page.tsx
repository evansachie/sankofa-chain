"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { LinkIcon, MapPinIcon, ShieldCheckIcon, StarIcon } from "@heroicons/react/24/outline";
import { ProductCard } from "~~/components/marketplace/ProductCard/ProductCard";
import FollowButton from "~~/components/ui/FollowButton/FollowButton";
import { getBrandById, brands as mockBrands } from "~~/data/brands";
import { products as allProducts } from "~~/data/products";
import { BrandProfile } from "~~/types/brand";

export default function BrandDetailPage() {
  const params = useParams();
  const brandId = params.id as string;

  const [brand, setBrand] = useState<BrandProfile | null>(null);

  useEffect(() => {
    if (!brandId) return;
    if (mockBrands.length === 0) return;
    const b = getBrandById(brandId) || null;
    setBrand(b);
  }, [brandId]);

  const brandProducts = useMemo(() => {
    if (!brand) return [] as typeof allProducts;
    const ids = new Set(brand.productIds || []);
    return allProducts.filter(p => ids.has(p.id));
  }, [brand]);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Brand Not Found</h1>
          <p className="text-base-content/60">The brand you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="relative">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={brand.bannerImage || "https://placehold.co/600x400"}
            alt={`${brand.name} banner`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative px-4 sm:px-6 lg:px-8 -mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-base-100 rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden border-4 border-base-100 shadow-lg bg-base-200">
                    <Image src={brand.logo} alt={brand.name} fill className="object-cover" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                        {brand.name}
                        {brand.verified && <ShieldCheckIcon className="w-6 h-6 text-blue-500" />}
                      </h1>
                      <p className="text-base-content/80 mt-1">{brand.description}</p>

                      {brand.location && (brand.location.city || brand.location.country) && (
                        <div className="flex items-center gap-1 mt-2 text-sm text-base-content/60">
                          <MapPinIcon className="w-4 h-4" />
                          <span>
                            {brand.location.city && `${brand.location.city}, `}
                            {brand.location.country}
                          </span>
                        </div>
                      )}
                    </div>

                    {brand.stats?.rating && (
                      <div className="flex items-center gap-2">
                        <StarIcon className="w-5 h-5 text-yellow-500" />
                        <span className="font-medium">{brand.stats.rating.toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{brand.stats.followers}</div>
                      <div className="text-sm text-base-content/60">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{brand.stats.totalProducts}</div>
                      <div className="text-sm text-base-content/60">Products</div>
                    </div>

                    <div className="text-center col-span-2 md:col-span-1 md:text-left">
                      <FollowButton
                        lookupAddress={brand.address}
                        fallbackClassName="btn btn-secondary"
                        onDisconnectedClick={() => console.log("Please connect your wallet")}
                      />
                    </div>

                    {brand.social?.website && (
                      <div className="text-center col-span-2 md:col-span-1 md:text-left">
                        <a
                          href={brand.social.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost gap-2"
                        >
                          <LinkIcon className="w-4 h-4" />
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="text-sm text-base-content/60">{brandProducts.length} items</div>
        </div>

        {brandProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {brandProducts.map(product => (
              <ProductCard key={product.id} product={product} variant="default" />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 text-base-content/60">No products listed yet.</div>
        )}
      </div>
    </div>
  );
}
