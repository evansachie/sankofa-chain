"use client";

import Image from "next/image";
import { BackgroundSymbols } from "../shared/patterns/BackgroundSymbols";
import { CardKentePattern } from "../shared/patterns/CardKentePattern";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card, CardContent, CardHeader } from "~~/components/ui";
import { categories } from "~~/data/categories";

const TrendingCollections = () => (
  <section className="py-20 african-pattern-bg relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none z-0">
      <BackgroundSymbols />
    </div>

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-base-content mb-4 section-title-zd">
          Trending Categories
        </h2>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Explore our diverse categories featuring the best African creators and their unique products
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, i) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <Card className="group overflow-hidden rounded-2xl bg-base-100/80 backdrop-blur-sm shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 relative creator-card-border h-full flex flex-col">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <motion.div
                    className="relative w-full h-64"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={category.backgroundImage || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={i < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  </motion.div>
                </div>
              </CardHeader>

              <CardContent className="p-6 relative flex flex-col flex-grow">
                <div className="absolute inset-0 opacity-20 dark:opacity-30">
                  <CardKentePattern id={i} />
                </div>

                <div className="space-y-4 relative z-10 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-base-content mb-2">{category.name}</h3>
                    <p className="text-sm text-base-content/70 line-clamp-2">{category.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <div className="text-sm text-base-content/70">{category.itemCount.toLocaleString()} items</div>
                    <a className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md cursor-pointer transition-colors duration-300 group-hover:scale-105 transform">
                      <span>Explore</span>
                      <ChevronRightIcon className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrendingCollections;
