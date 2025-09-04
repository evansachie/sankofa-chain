"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "~~/components/ui";

const HeroSection = () => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  const heroImage = {
    src: "https://images.unsplash.com/photo-1649299313612-48cc3493f62e?q=80&w=1219&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "A vibrant marketplace showcasing authentic African crafts and textiles",
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className={`object-cover ${isDarkMode ? "opacity-60" : "opacity-150"}`}
            priority
          />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="block text-white drop-shadow-lg">Discover Authentic</span>
              <span className="block bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent drop-shadow-lg">
                African Commerce
              </span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              SankofaChain connects African creators directly with a global audience. Buy, sell, and cherish authentic
              products and experiences, secured by the power of blockchain.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <Button
              size="lg"
              variant="default"
              className="text-lg px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-indigo-500"
            >
              Get Started
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-5 border-2 border-white/80 hover:bg-white/10 text-white rounded-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm bg-black/20"
            >
              Explore Marketplace
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-3 gap-4 md:gap-8 pt-24 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
              <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">240k+</div>
              <div className="text-sm text-white/80 mt-1">Total Sales</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
              <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">100k+</div>
              <div className="text-sm text-white/80 mt-1">Active Creators</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/5 rounded-xl p-4 md:p-6 border border-white/10">
              <div className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">50k+</div>
              <div className="text-sm text-white/80 mt-1">Products Listed</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
