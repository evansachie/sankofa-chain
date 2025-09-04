"use-client";

import Image from "next/image";
import { BackgroundAdinkraSymbols } from "../shared/patterns/BackgroundAdinkraSymbols";
import { motion } from "framer-motion";
import { ArrowRightIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/ui";
import { featuredProducts } from "~~/data/featuredProducts";

const FeaturedProducts = () => {
  return (
    <section className="py-20 african-pattern-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <BackgroundAdinkraSymbols />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 section-title-zd">
              Featured Products
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl">
              Discover handpicked, authentic African products from our most trusted creators.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Products
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="overflow-hidden rounded-2xl bg-base-100/80 backdrop-blur-sm shadow-lg creator-card-border h-full flex flex-col">
                <div className="relative w-full h-72 overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-500 text-white shadow-md">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg text-base-content leading-tight mb-1">{product.name}</h3>
                    <p className="text-sm text-base-content/70 font-medium">by {product.creator}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-bold text-base-content">{product.price}</span>
                      <span className="text-sm text-base-content/50 line-through">{product.originalPrice}</span>
                    </div>
                    <button className="p-2 rounded-full hover:bg-base-200 transition-colors">
                      <HeartIcon className="w-6 h-6 text-base-content/70 hover:text-red-500 transition-colors" />
                    </button>
                  </div>

                  <div className="mt-4">
                    <Button
                      className={`w-full font-semibold transition-all duration-300 ${
                        product.inStock
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                          : "bg-base-300 text-base-content/50 cursor-not-allowed"
                      }`}
                      disabled={!product.inStock}
                    >
                      <ShoppingCartIcon className="w-5 h-5 mr-2" />
                      {product.inStock ? "Add to Cart" : "Sold Out"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
