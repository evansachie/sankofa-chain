"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "~~/components/ui";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className="py-20 via-white to-violet-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full blur-xl"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-1/5 text-indigo-200/15 text-7xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
            scale: { duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          ◉
        </motion.div>
        <motion.div
          className="absolute bottom-24 left-1/6 text-indigo-200/15 text-6xl"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            y: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            rotate: { duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          }}
        >
          ✦
        </motion.div>
        <motion.div
          className="absolute top-1/3 left-12 text-indigo-200/15 text-5xl"
          animate={{
            x: [0, 20, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            x: { duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            opacity: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          }}
        >
          ◆
        </motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="rounded-3xl shadow-2xl shadow-indigo-500/10 border border-indigo-100 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative bg-gradient-to-br from-indigo-500 to-violet-600 p-8 lg:p-12 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-20 h-20 border border-white rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-16 h-16 border border-white rounded-lg rotate-45"></div>
                  <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white rounded-full"></div>

                  <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 400">
                    <pattern id="newsletter-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                      <polygon points="20,5 35,20 20,35 5,20" fill="white" opacity="0.1" />
                    </pattern>
                    <rect width="400" height="400" fill="url(#newsletter-pattern)" />
                  </svg>
                </div>

                <div className="text-center relative z-10">
                  <motion.div className="w-32 h-32 mx-auto mb-6 relative" whileHover={{ scale: 1.05, rotate: 5 }}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                      <Image
                        src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=80&h=80&fit=crop"
                        alt="Newsletter"
                        width={80}
                        height={80}
                        className="rounded-xl"
                      />
                    </div>
                  </motion.div>
                  <motion.h3
                    className="text-2xl text-white lg:text-3xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    Stay Connected with African Culture
                  </motion.h3>
                  <motion.p
                    className="text-indigo-100 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    Get the latest updates on new creators, exclusive products, and cultural stories directly to your
                    inbox.
                  </motion.p>

                  <div className="mt-8 space-y-3 text-left">
                    {[
                      "Weekly featured creator spotlights",
                      "Exclusive product launches & discounts",
                      "Cultural events and marketplace updates",
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                          whileHover={{ scale: 1.2 }}
                        >
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </motion.div>
                        <span className="text-indigo-100 text-sm">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex items-center relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-indigo-500">
                    <pattern id="form-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                      <circle cx="10" cy="10" r="2" fill="currentColor" />
                      <path d="M5,5 L15,15 M15,5 L5,15" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#form-pattern)" />
                  </svg>
                </div>

                <div className="w-full relative z-10">
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-lg text-base-content/70">
                      Be part of the SankofaChain family and never miss out on authentic African treasures.
                    </p>
                  </motion.div>

                  {!isSubscribed ? (
                    <motion.form
                      onSubmit={handleSubmit}
                      className="space-y-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <div className="space-y-4">
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-6 py-4 rounded-xl border-2 border-indigo-100 bg-indigo-50/50 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                            required
                          />
                          <div className="absolute inset-y-0 right-3 flex items-center">
                            <svg
                              className="w-5 h-5 text-indigo-200"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-700 hover:to-violet-600 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Subscribe to Newsletter
                        </Button>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="privacy"
                          className="mt-1 w-4 h-4 text-indigo-600 border-indigo-200 rounded focus:ring-indigo-500"
                          required
                        />
                        <label htmlFor="privacy" className="text-sm text-base-content/60 leading-relaxed">
                          I agree to receive marketing emails from SankofaChain and understand I can unsubscribe at any
                          time.
                          <a href="#" className="text-indigo-600 hover:text-indigo-700 font-medium ml-1">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      className="text-center py-8"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <h3 className="text-xl font-semibold text-base-content mb-2">Welcome to the Community!</h3>
                      <p className="text-base-content/70">Check your email for a confirmation message.</p>
                    </motion.div>
                  )}

                  <div className="mt-8 pt-8 border-t border-base-content/10">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-base-content/60">
                        Join <span className="font-semibold text-indigo-600">25,000+</span> subscribers
                      </div>
                      <div className="avatar-group -space-x-6">
                        <div className="avatar">
                          <div className="w-12">
                            <Image
                              src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                              width={48}
                              height={48}
                              alt="Avatar Image"
                            ></Image>
                          </div>
                        </div>
                        <div className="avatar">
                          <div className="w-12">
                            <Image
                              src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                              width={48}
                              height={48}
                              alt="Avatar Image"
                            ></Image>
                          </div>
                        </div>
                        <div className="avatar">
                          <div className="w-12">
                            <Image
                              src="https://img.daisyui.com/images/profile/demo/averagebulk@192.webp"
                              width={48}
                              height={48}
                              alt="Avatar Image"
                            ></Image>
                          </div>
                        </div>
                        <div className="avatar">
                          <div className="w-12">
                            <Image
                              src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp"
                              width={48}
                              height={48}
                              alt="Avatar Image"
                            ></Image>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
