"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { steps } from "~~/data/steps";

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full blur-2xl"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-32 right-1/4 text-indigo-200/15 text-8xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          ◉
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/5 text-indigo-200/15 text-6xl"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            y: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            rotate: { duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        >
          ⬢
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-10 text-indigo-200/15 text-5xl"
          animate={{
            x: [0, 20, 0],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            x: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            opacity: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          ◆
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
            <span className="text-indigo-700 font-semibold text-sm">Getting Started</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-base-content mb-4">How SankofaChain Works</h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Start your journey with authentic African commerce in just three simple steps
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative text-center group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-indigo-200 to-violet-200 transform translate-x-1/2 z-0">
                  <motion.div
                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                  </motion.div>

                  <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-1 h-1 bg-indigo-300 rounded-full"></div>
                  <div className="absolute top-1/2 left-2/4 transform -translate-y-1/2 w-1 h-1 bg-indigo-300 rounded-full"></div>
                  <div className="absolute top-1/2 left-3/4 transform -translate-y-1/2 w-1 h-1 bg-indigo-300 rounded-full"></div>
                </div>
              )}

              <motion.div
                className="relative bg-base-100 border border-base-content/10 rounded-2xl p-8 
             group-hover:border-indigo-300 group-hover:shadow-xl group-hover:shadow-indigo-500/10 
             transition-all duration-300 overflow-visible"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                  <svg viewBox="0 0 200 200" className="w-full h-full text-indigo-500">
                    <defs>
                      <pattern
                        id={`step-pattern-${index}`}
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <circle cx="20" cy="20" r="2" fill="currentColor" />
                        <path d="M10,10 L30,30 M30,10 L10,30" stroke="currentColor" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="200" height="200" fill={`url(#step-pattern-${index})`} />
                  </svg>
                </div>

                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {step.id}
                  </div>
                </motion.div>

                <div className="mb-6 pt-4 relative z-10">
                  <motion.div
                    className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>

                <div className="space-y-4 relative z-10">
                  <h3 className="text-xl font-semibold text-base-content">{step.title}</h3>
                  <p className="text-base-content/70 leading-relaxed">{step.description}</p>

                  <div className="pt-4 space-y-2">
                    {step.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center justify-center space-x-2 text-sm text-base-content/70"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.svg
                          className="w-4 h-4 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          whileHover={{ scale: 1.2 }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </motion.svg>
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
