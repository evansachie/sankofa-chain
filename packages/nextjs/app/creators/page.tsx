"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FunnelIcon, MagnifyingGlassIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { CreatorCard } from "~~/components/marketplace";
import { creators as mockCreators } from "~~/data/creators";
import { formatNumber } from "~~/lib/utils";
import { useCreatorStore } from "~~/stores/creatorStore";

export default function CreatorsPage() {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const {
    creators,
    setCreators,
    getFilteredCreators,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filterBy,
    setFilterBy,
    clearFilters,
    followCreator,
    unfollowCreator,
    isFollowing,
  } = useCreatorStore();

  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCreators(mockCreators);
    setIsLoading(false);
  }, [setCreators]);

  const filteredCreators = getFilteredCreators();

  const handleFollow = (creatorId: string) => {
    if (isFollowing(creatorId)) {
      unfollowCreator(creatorId);
    } else {
      followCreator(creatorId);
    }
  };

  const sortOptions = [
    { value: "followers", label: "Most Followers" },
    { value: "rating", label: "Highest Rated" },
    { value: "totalSales", label: "Most Sales" },
    { value: "joinedDate", label: "Newest" },
    { value: "name", label: "Name A-Z" },
  ];

  const locationOptions = ["Nigeria", "Ghana", "Senegal", "Kenya", "South Africa"];
  const categoryOptions = ["Textiles", "Sculptures", "Jewelry", "Paintings", "Ceramics"];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/90 to-secondary/90">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1596626417050-39c7f6ddd2c9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="African artisans and creators"
            fill
            className={`object-cover ${isDarkMode ? "opacity-60" : "opacity-200"}`}
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Discover Amazing Creators</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Connect with talented artisans and creators from across Africa, each with their unique story and
              craftsmanship.
            </p>
            <div className="flex items-center justify-center gap-8 mt-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold">{formatNumber(creators.length)}</div>
                <div className="text-sm">Creators</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {formatNumber(creators.reduce((sum, c) => sum + c.stats.totalProducts, 0))}
                </div>
                <div className="text-sm">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{creators.filter(c => c.verified).length}</div>
                <div className="text-sm">Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
            <input
              type="text"
              placeholder="Search creators..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="select select-bordered"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button onClick={() => setShowFilters(!showFilters)} className="btn btn-outline gap-2">
            <FunnelIcon className="w-5 h-5" />
            Filters
          </button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-base-200 rounded-lg p-6 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-medium mb-2 block">Location</label>
                <div className="space-y-2">
                  {locationOptions.map(location => (
                    <label key={location} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filterBy.location.includes(location)}
                        onChange={e => {
                          if (e.target.checked) {
                            setFilterBy({
                              location: [...filterBy.location, location],
                            });
                          } else {
                            setFilterBy({
                              location: filterBy.location.filter(l => l !== location),
                            });
                          }
                        }}
                        className="checkbox checkbox-sm"
                      />
                      <span className="text-sm">{location}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-medium mb-2 block">Categories</label>
                <div className="space-y-2">
                  {categoryOptions.map(category => (
                    <label key={category} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filterBy.categories.includes(category)}
                        onChange={e => {
                          if (e.target.checked) {
                            setFilterBy({
                              categories: [...filterBy.categories, category],
                            });
                          } else {
                            setFilterBy({
                              categories: filterBy.categories.filter(c => c !== category),
                            });
                          }
                        }}
                        className="checkbox checkbox-sm"
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-medium mb-2 block">Other</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filterBy.verified}
                      onChange={e => setFilterBy({ verified: e.target.checked })}
                      className="checkbox checkbox-sm"
                    />
                    <span className="text-sm">Verified Only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filterBy.featured}
                      onChange={e => setFilterBy({ featured: e.target.checked })}
                      className="checkbox checkbox-sm"
                    />
                    <span className="text-sm">Featured Only</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={clearFilters} className="btn btn-ghost btn-sm">
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{filteredCreators.length} Creators Found</h2>
        </div>

        {filteredCreators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map(creator => (
              <div key={creator.id} className="relative">
                <CreatorCard
                  creator={creator}
                  onFollow={handleFollow}
                  isFollowing={isFollowing(creator.id)}
                  variant="default"
                  showActions={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <UserGroupIcon className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No creators found</h3>
            <p className="text-base-content/60 mb-4">Try adjusting your search or filter criteria.</p>
            <button onClick={clearFilters} className="btn btn-primary">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
