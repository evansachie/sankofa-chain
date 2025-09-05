"use client";

import FeaturedProducts from "~~/components/landing/FeaturedProducts";
import Features from "~~/components/landing/Features";
import HeroSection from "~~/components/landing/HeroSection";
import HowItWorks from "~~/components/landing/HowItWorks";
import Newsletter from "~~/components/landing/Newsletter";
import Partners from "~~/components/landing/Partners";
import TopCreators from "~~/components/landing/TopCreators";
import TrendingCollections from "~~/components/landing/TrendingCollections";

const Home = () => {
  return (
    <>
      <HeroSection />
      <TrendingCollections />
      <TopCreators />
      <FeaturedProducts />
      <HowItWorks />
      <Features />
      <Newsletter />
      <Partners />
    </>
  );
};

export default Home;
