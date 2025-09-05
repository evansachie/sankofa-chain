"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MagnifyingGlassIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { BrandCard } from "~~/components/marketplace";
import { brands as mockBrands } from "~~/data/brands";
import { BrandProfile } from "~~/types/brand";

export default function BrandsPage() {
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "followers" | "products">("followers");
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  useEffect(() => {
    setBrands(mockBrands);
  }, []);

  const categories = useMemo(() => {
    const all = new Set<string>();
    brands.forEach(b => (b.categories || []).forEach(c => all.add(c)));
    return Array.from(all);
  }, [brands]);

  const filtered = useMemo(() => {
    let res = [...brands];
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(
        b =>
          b.name.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          (b.categories || []).some(c => c.toLowerCase().includes(q)),
      );
    }
    if (categoryFilter) {
      res = res.filter(b => (b.categories || []).includes(categoryFilter));
    }
    res.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "products":
          return (b.stats.totalProducts || 0) - (a.stats.totalProducts || 0);
        case "followers":
        default:
          return (b.stats.followers || 0) - (a.stats.followers || 0);
      }
    });
    return res;
  }, [brands, search, sortBy, categoryFilter]);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="relative overflow-hidden bg-gradient-to-br from-secondary/90 to-primary/90">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1552710307-537199cd41c0?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="Brands banner"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Explore Top Brands</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow-md">
              Discover verified African brands and their products.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
            <input
              type="text"
              placeholder="Search brands..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input input-bordered w-full pl-10"
            />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} className="select select-bordered">
            <option value="followers">Most Followers</option>
            <option value="products">Most Products</option>
            <option value="name">Name A-Z</option>
          </select>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">{filtered.length} Brands Found</h2>
          <div className="text-sm text-base-content/60 flex items-center gap-2">
            <Squares2X2Icon className="w-4 h-4" />
            Grid view
          </div>
        </div>

        {filtered.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map(brand => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-base-content/60">No brands match your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
