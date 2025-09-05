"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPinIcon, ShieldCheckIcon, StarIcon } from "@heroicons/react/24/outline";
import FollowButton from "~~/components/ui/FollowButton/FollowButton";
import { BrandProfile } from "~~/types/brand";

interface BrandCardProps {
  brand: BrandProfile;
  variant?: "default" | "compact" | "featured";
}

export const BrandCard = ({ brand, variant = "default" }: BrandCardProps) => {
  const cardVariants = {
    default:
      "bg-base-100 border border-base-300 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/30",
    compact:
      "bg-base-100 border border-base-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:border-primary/30",
    featured:
      "bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/30 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-primary/50",
  } as const;

  const sizeVariants = {
    default: { banner: "h-32", logo: "w-16 h-16", padding: "p-6" },
    compact: { banner: "h-24", logo: "w-12 h-12", padding: "p-4" },
    featured: { banner: "h-40", logo: "w-20 h-20", padding: "p-8" },
  } as const;

  const sizes = sizeVariants[variant];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={cardVariants[variant]}
    >
      <div
        className={`relative ${sizes.banner} overflow-hidden ${variant === "compact" ? "rounded-t-lg" : "rounded-t-xl"}`}
      >
        <Image
          src={brand.bannerImage || "/api/placeholder/400/200"}
          alt={`${brand.name} banner`}
          fill
          className="object-cover"
          sizes="400px"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className={`${sizes.padding} relative`}>
        <div className="absolute -top-8 left-6">
          <div
            className={`relative ${sizes.logo} rounded-xl overflow-hidden border-4 border-base-100 shadow-lg bg-base-100 flex items-center justify-center`}
          >
            <Image src={brand.logo} alt={brand.name} fill className="object-cover" />
          </div>
        </div>

        <div className={variant === "compact" ? "mt-6" : "mt-8"}>
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold ${variant === "featured" ? "text-xl" : "text-lg"} flex items-center gap-2`}>
                <Link href={`/brand/${brand.id}`} className="hover:text-primary transition-colors truncate">
                  {brand.name}
                </Link>
                {brand.verified && <ShieldCheckIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />}
              </h3>
              {brand.location && (brand.location.city || brand.location.country) && (
                <div className="flex items-center gap-1 text-sm text-base-content/60">
                  <MapPinIcon className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">
                    {brand.location.city && `${brand.location.city}, `}
                    {brand.location.country}
                  </span>
                </div>
              )}
            </div>

            {brand.stats?.rating && (
              <div className="flex items-center gap-1 text-sm text-base-content/80 ml-2">
                <StarIcon className="w-4 h-4 text-yellow-500" />
                <span>{brand.stats.rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <p className={`text-sm text-base-content/80 mb-4 ${variant === "compact" ? "line-clamp-1" : "line-clamp-2"}`}>
            {brand.description}
          </p>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-bold text-primary">{brand.stats.totalProducts}</div>
              <div className="text-xs text-base-content/60">Products</div>
            </div>
            <div>
              <div className="font-bold text-primary">{brand.stats.followers}</div>
              <div className="text-xs text-base-content/60">Followers</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2">
                <FollowButton
                  lookupAddress={brand.address}
                  onDisconnectedClick={() => console.log("Please connect your wallet")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BrandCard;
