"use client";

import Image from "next/image";
import Link from "next/link";
import { MudclothPattern } from "../shared/patterns/MudclothPattern";
import { motion } from "framer-motion";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/solid";
import { Button } from "~~/components/ui";
import { creators } from "~~/data/creators";

const TopCreators = () => {
  return (
    <section className="py-20 african-pattern-bg relative overflow-hidden">
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
              Our Master Artisans
            </h2>
            <p className="text-lg text-base-content/70 max-w-2xl">
              Meet the celebrated creators and brands driving authentic African commerce forward.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/creators">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                View All Creators
                <ArrowRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {creators.slice(0, 6).map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/creator/${creator.id}`} className="block group text-center">
                <div className="relative bg-base-100/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg creator-card-border transition-all duration-300 h-full">
                  <div className="absolute inset-0 opacity-10 dark:opacity-20 z-0">
                    <MudclothPattern id={index} />
                  </div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative mb-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg mx-auto ring-2 ring-base-300 group-hover:ring-indigo-400 transition-all duration-300">
                        <Image
                          src={creator.avatar || "/placeholder.svg"}
                          alt={creator.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white shadow-lg">
                        <StarIcon className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-semibold text-base-content text-sm md:text-base leading-tight">
                        {creator.name}
                      </h3>
                      <p className="text-xs text-base-content/70 font-medium">{creator.location}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCreators;
