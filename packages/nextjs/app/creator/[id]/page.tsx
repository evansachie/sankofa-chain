"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  ClockIcon,
  LinkIcon,
  MapPinIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  StarIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { ShieldCheckIcon as ShieldCheckSolidIcon } from "@heroicons/react/24/solid";
import { ProductCard } from "~~/components/marketplace/ProductCard/ProductCard";
import { creators as mockCreators } from "~~/data/creators";
import { formatDate, formatNumber } from "~~/lib/utils";
import { useCreatorStore } from "~~/stores/creatorStore";
import { Product } from "~~/types/marketplace";

export default function CreatorProfilePage() {
  const params = useParams();
  const creatorId = params.id as string;

  const {
    creators,
    selectedCreator,
    setCreators,
    setSelectedCreator,
    getCreatorById,
    getCreatorProducts,
    followCreator,
    unfollowCreator,
    isFollowing,
  } = useCreatorStore();

  const [activeTab, setActiveTab] = useState<"products" | "about" | "reviews">("products");
  const [isLoading, setIsLoading] = useState(true);
  const [creatorProducts, setCreatorProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (creators.length === 0) {
      setCreators(mockCreators);
    }

    if (creatorId) {
      const creator = getCreatorById(creatorId);
      setSelectedCreator(creator || null);
      const products = getCreatorProducts(creatorId);
      setCreatorProducts(products);

      setIsLoading(false);
    }
  }, [creatorId, creators.length, getCreatorById, setCreators, setSelectedCreator, getCreatorProducts]);

  const handleFollow = () => {
    if (selectedCreator) {
      if (isFollowing(selectedCreator.id)) {
        unfollowCreator(selectedCreator.id);
      } else {
        followCreator(selectedCreator.id);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!selectedCreator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Creator Not Found</h1>
          <p className="text-base-content/60">The creator you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "products", label: "Products", count: selectedCreator.stats.totalProducts },
    { id: "about", label: "About", count: null },
    { id: "reviews", label: "Reviews", count: selectedCreator.stats.reviews },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="relative">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={selectedCreator.bannerImage || "/api/placeholder/1200/400"}
            alt={`${selectedCreator.name} banner`}
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
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-base-100 shadow-lg">
                    <Image src={selectedCreator.avatar} alt={selectedCreator.name} fill className="object-cover" />
                  </div>
                  {selectedCreator.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                      <ShieldCheckSolidIcon className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                        {selectedCreator.name}
                        {selectedCreator.verified && <ShieldCheckIcon className="w-6 h-6 text-blue-500" />}
                      </h1>
                      {selectedCreator.ensName && <p className="text-primary font-medium">{selectedCreator.ensName}</p>}
                      <p className="text-base-content/80 mt-1">{selectedCreator.bio}</p>

                      <div className="flex items-center gap-1 mt-2 text-sm text-base-content/60">
                        <MapPinIcon className="w-4 h-4" />
                        <span>
                          {selectedCreator.city && `${selectedCreator.city}, `}
                          {selectedCreator.country}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleFollow}
                      className={`btn gap-2 ${isFollowing(selectedCreator.id) ? "btn-outline" : "btn-primary"}`}
                    >
                      {isFollowing(selectedCreator.id) ? (
                        <>
                          <UserMinusIcon className="w-5 h-5" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlusIcon className="w-5 h-5" />
                          Follow
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {formatNumber(selectedCreator.stats.followers)}
                      </div>
                      <div className="text-sm text-base-content/60">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedCreator.stats.totalProducts}</div>
                      <div className="text-sm text-base-content/60">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedCreator.stats.rating.toFixed(1)}</div>
                      <div className="text-sm text-base-content/60">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedCreator.stats.totalSales}</div>
                      <div className="text-sm text-base-content/60">Sales</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex border-b border-base-300 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-base-content/60 hover:text-base-content"
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-2 px-2 py-1 bg-base-200 rounded-full text-xs">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "products" && (
            <div>
              {creatorProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {creatorProducts.map(product => (
                    <ProductCard key={product.id} product={product} variant="default" />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <ShoppingBagIcon className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No products yet</h3>
                  <p className="text-base-content/60">This creator hasn&apos;t listed any products yet.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Story</h3>
                  <div className="prose max-w-none">
                    <p className="text-base-content/80 leading-relaxed">
                      {selectedCreator.story || selectedCreator.bio}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCreator.specialties.map(specialty => (
                      <span key={specialty} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCreator.achievements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Achievements</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCreator.achievements.map(achievement => (
                        <div key={achievement.id} className="bg-base-200 rounded-lg p-4 flex items-center gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <h4 className="font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-base-content/60">{achievement.description}</p>
                            <p className="text-xs text-base-content/50 mt-1">{formatDate(achievement.earnedDate)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-base-200 rounded-lg p-6">
                  <h3 className="font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CalendarIcon className="w-4 h-4 text-base-content/60" />
                      <span>Joined {formatDate(selectedCreator.joinedDate)}</span>
                    </div>
                    {selectedCreator.stats.lastActive && (
                      <div className="flex items-center gap-2 text-sm">
                        <ClockIcon className="w-4 h-4 text-base-content/60" />
                        <span>Last active {formatDate(selectedCreator.stats.lastActive)}</span>
                      </div>
                    )}
                    {selectedCreator.storeSettings.contactInfo?.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <LinkIcon className="w-4 h-4 text-base-content/60" />
                        <span>{selectedCreator.storeSettings.contactInfo.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {Object.values(selectedCreator.socialMedia).some(link => link) && (
                  <div className="bg-base-200 rounded-lg p-6">
                    <h3 className="font-bold mb-4">Social Media</h3>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(selectedCreator.socialMedia).map(([platform, url]) =>
                        url ? (
                          <a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-ghost"
                          >
                            {platform}
                          </a>
                        ) : null,
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="text-center py-16">
              <StarIcon className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reviews Coming Soon</h3>
              <p className="text-base-content/60">Review system will be implemented in Phase 5B.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
