"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CogIcon, EyeIcon, PencilIcon, PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { CreatorProfile, Product } from "~~/types/marketplace";

interface CreatorDashboardProps {
  creator: CreatorProfile;
  products: Product[];
  onUpdateCreator: (updates: Partial<CreatorProfile>) => void;
  onUpdateProduct: (productId: string, updates: Partial<Product>) => void;
  onDeleteProduct: (productId: string) => void;
  onAddProduct: (product: Omit<Product, "id">) => void;
}

export const CreatorDashboard = ({ creator, products, onUpdateCreator, onDeleteProduct }: CreatorDashboardProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "store" | "analytics">("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <EyeIcon className="w-4 h-4" /> },
    { id: "products", label: "Products", icon: <PhotoIcon className="w-4 h-4" /> },
    { id: "store", label: "Store Settings", icon: <CogIcon className="w-4 h-4" /> },
    { id: "analytics", label: "Analytics", icon: <CogIcon className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-base-200 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image src={creator.avatar} alt={creator.name} width={48} height={48} className="object-cover" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{creator.name}</h1>
                <p className="text-base-content/60">Creator Dashboard</p>
              </div>
            </div>
            <button className="btn btn-primary gap-2">
              <EyeIcon className="w-4 h-4" />
              View Public Store
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-base-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-base-content/60 hover:text-base-content hover:border-base-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-base-200 rounded-lg p-6">
                    <div className="text-2xl font-bold text-primary">{creator.stats.totalProducts}</div>
                    <div className="text-sm text-base-content/60">Total Products</div>
                  </div>
                  <div className="bg-base-200 rounded-lg p-6">
                    <div className="text-2xl font-bold text-primary">{creator.stats.totalSales}</div>
                    <div className="text-sm text-base-content/60">Total Sales</div>
                  </div>
                  <div className="bg-base-200 rounded-lg p-6">
                    <div className="text-2xl font-bold text-primary">{creator.stats.followers}</div>
                    <div className="text-sm text-base-content/60">Followers</div>
                  </div>
                  <div className="bg-base-200 rounded-lg p-6">
                    <div className="text-2xl font-bold text-primary">{creator.stats.rating.toFixed(1)}</div>
                    <div className="text-sm text-base-content/60">Average Rating</div>
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-base-300 last:border-b-0">
                      <span>New follower: John Doe</span>
                      <span className="text-sm text-base-content/60">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-base-300 last:border-b-0">
                      <span>Product sold: Traditional Mask</span>
                      <span className="text-sm text-base-content/60">1 day ago</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-base-300 last:border-b-0">
                      <span>New review received (5 stars)</span>
                      <span className="text-sm text-base-content/60">3 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Products ({products.length})</h2>
                  <button className="btn btn-primary gap-2">
                    <PlusIcon className="w-4 h-4" />
                    Add Product
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <div key={product.id} className="bg-base-200 rounded-lg overflow-hidden">
                      <div className="relative aspect-square">
                        <Image
                          src={product.images[0] || "/api/placeholder/300/300"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <button className="btn btn-xs btn-circle bg-black/50 border-none text-white hover:bg-black/70">
                            <PencilIcon className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(product.id)}
                            className="btn btn-xs btn-circle bg-red-500/80 border-none text-white hover:bg-red-500"
                          >
                            <TrashIcon className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                        <p className="text-primary font-bold">
                          {product.price.amount} {product.price.currency}
                        </p>
                        <div className="flex items-center justify-between mt-2 text-sm text-base-content/60">
                          <span>{product.stats.views} views</span>
                          <span>{product.stats.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center py-16">
                    <PhotoIcon className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No products yet</h3>
                    <p className="text-base-content/60 mb-4">Start by adding your first product to your store.</p>
                    <button className="btn btn-primary">Add Your First Product</button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "store" && (
              <div className="space-y-8">
                <div className="bg-base-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Store Customization</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Layout Type</label>
                      <select
                        value={creator.storeSettings.layoutType}
                        onChange={e =>
                          onUpdateCreator({
                            storeSettings: {
                              ...creator.storeSettings,
                              layoutType: e.target.value as "grid" | "list" | "masonry",
                            },
                          })
                        }
                        className="select select-bordered w-full"
                      >
                        <option value="grid">Grid</option>
                        <option value="list">List</option>
                        <option value="masonry">Masonry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Custom Branding</label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={creator.storeSettings.customBranding}
                          onChange={e =>
                            onUpdateCreator({
                              storeSettings: {
                                ...creator.storeSettings,
                                customBranding: e.target.checked,
                              },
                            })
                          }
                          className="checkbox"
                        />
                        <span>Enable custom branding</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-base-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={creator.storeSettings.contactInfo?.email || ""}
                        onChange={e =>
                          onUpdateCreator({
                            storeSettings: {
                              ...creator.storeSettings,
                              contactInfo: {
                                ...creator.storeSettings.contactInfo,
                                email: e.target.value,
                              },
                            },
                          })
                        }
                        className="input input-bordered w-full"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Business Hours</label>
                      <input
                        type="text"
                        value={creator.storeSettings.contactInfo?.businessHours || ""}
                        onChange={e =>
                          onUpdateCreator({
                            storeSettings: {
                              ...creator.storeSettings,
                              contactInfo: {
                                ...creator.storeSettings.contactInfo,
                                businessHours: e.target.value,
                              },
                            },
                          })
                        }
                        className="input input-bordered w-full"
                        placeholder="9 AM - 5 PM"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="text-center py-16">
                <CogIcon className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Coming Soon</h3>
                <p className="text-base-content/60">
                  Detailed analytics and insights will be available in a future update.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
