"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { features } from "~~/data/features";

const Features = () => {
  return (
    <section className="py-20 bg-base-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-10 w-64 h-64 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-1/4 text-indigo-200/20 text-6xl"
          animate={{
            rotate: [0, 360],
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          ⚡
        </motion.div>
        <motion.div
          className="absolute bottom-32 right-1/3 text-indigo-200/20 text-4xl"
          animate={{
            rotate: [360, 0],
            x: [0, 15, 0],
          }}
          transition={{
            rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            x: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          ◆
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-20 text-indigo-200/20 text-5xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            rotate: { duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        >
          ✦
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-gradient-to-r from-indigo-100 to-violet-100 px-4 py-2 rounded-full mb-4">
            <span className="text-indigo-700 font-semibold text-sm">Platform Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">Why Choose SankofaChain?</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover the unique features that make SankofaChain the premier platform for authentic African commerce
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative p-8 bg-base-100 rounded-2xl border border-base-content/10 hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 h-full overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500">
                    <pattern id={`pattern-${index}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <polygon points="10,0 20,10 10,20 0,10" fill="currentColor" />
                    </pattern>
                    <rect width="100" height="100" fill={`url(#pattern-${index})`} />
                  </svg>
                </div>

                <div className="relative mb-6">
                  <motion.div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden">
                      <Image
                        src={feature.icon || "/placeholder.svg"}
                        alt={feature.title}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>

                  <motion.div className="absolute -top-2 -right-2" whileHover={{ scale: 1.1 }}>
                    <div className="bg-white border border-indigo-200 px-3 py-1 rounded-full text-xs font-semibold text-indigo-600 shadow-md">
                      {feature.stats}
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-4 relative z-10">
                  <h3 className="text-xl font-semibold text-base-content group-hover:text-indigo-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-base-content/70 leading-relaxed">{feature.description}</p>

                  <div className="pt-4">
                    <motion.button
                      className="inline-flex items-center text-base-content/70 hover:text-indigo-700 font-medium text-sm transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      Learn more
                      <motion.svg
                        className="ml-2 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </motion.button>
                  </div>
                </div>

                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
