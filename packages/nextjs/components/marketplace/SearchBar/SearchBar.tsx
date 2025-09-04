import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useMarketplaceStore } from "~~/stores/marketplaceStore";
import { Product } from "~~/types/marketplace";

interface SearchBarProps {
  onToggleFilters?: () => void;
  showFilterToggle?: boolean;
  placeholder?: string;
  variant?: "default" | "compact";
}

export const SearchBar = ({
  onToggleFilters,
  showFilterToggle = true,
  placeholder = "Search products, creators, or categories...",
  variant = "default",
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { filters, setFilters, products, applyFilters } = useMarketplaceStore();

  useEffect(() => {
    setSearchQuery(filters.searchQuery || "");
  }, [filters.searchQuery]);

  useEffect(() => {
    if (searchQuery.length > 2) {
      const query = searchQuery.toLowerCase();
      const filteredSuggestions = products
        .filter(
          product =>
            product.name.toLowerCase().includes(query) ||
            product.creator.name.toLowerCase().includes(query) ||
            product.tags.some(tag => tag.toLowerCase().includes(query)),
        )
        .slice(0, 5);

      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, products]);

  const handleSearch = (query: string) => {
    setFilters({ searchQuery: query });
    applyFilters();
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery(product.name);
    handleSearch(product.name);
  };

  const clearSearch = () => {
    setSearchQuery("");
    handleSearch("");
    searchInputRef.current?.focus();
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      suggestionsRef.current &&
      !suggestionsRef.current.contains(e.target as Node) &&
      !searchInputRef.current?.contains(e.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchBarClasses = {
    default: "relative w-full max-w-2xl mx-auto",
    compact: "relative w-full max-w-md",
  };

  const inputClasses = {
    default:
      "w-full h-12 pl-12 pr-20 bg-base-100 border-2 border-base-content/20 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all duration-200 text-base-content placeholder:text-base-content/50",
    compact:
      "w-full h-10 pl-10 pr-16 bg-base-100 border border-base-content/20 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 text-base-content placeholder:text-base-content/50",
  };

  return (
    <div className={searchBarClasses[variant]}>
      <form onSubmit={handleSubmit} className="relative">
        <MagnifyingGlassIcon
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/50 ${
            variant === "default" ? "w-5 h-5" : "w-4 h-4"
          }`}
        />

        <input
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={inputClasses[variant]}
        />

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-1 text-base-content/50 hover:text-base-content transition-colors"
              title="Clear search"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}

          {showFilterToggle && (
            <button
              type="button"
              onClick={onToggleFilters}
              className="p-1.5 text-base-content/60 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
              title="Toggle filters"
            >
              <AdjustmentsHorizontalIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {isFocused && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 rounded-2xl border-2 border-indigo-500 pointer-events-none"
          />
        )}
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-base-100 border border-base-content/20 rounded-xl shadow-xl z-50 overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-base-content/10">
              <span className="text-xs font-medium text-base-content/60 uppercase tracking-wide">Suggestions</span>
            </div>

            {suggestions.map(product => (
              <button
                key={product.id}
                onClick={() => handleSuggestionClick(product)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-base-200 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-base-content/10 relative">
                  <Image src={product.images[0]} alt={product.name} className="object-cover" fill sizes="40px" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-base-content truncate">{product.name}</p>
                  <p className="text-sm text-base-content/60">by {product.creator.name}</p>
                </div>
                <div className="text-sm font-medium text-indigo-600">
                  {product.price.amount} {product.price.currency}
                </div>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
