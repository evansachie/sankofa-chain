"use client";

import { useEffect, useState } from "react";
import Footer from "./Footer";
import ThemeSync from "./ThemeSync";
import ScrollToTop from "./shared/ScrollToTop";
import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TransactionModal, TransactionProvider } from "ethereum-identity-kit";
import "ethereum-identity-kit/css";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WagmiProvider } from "wagmi";
import { Header } from "~~/components/Header";
import { CartSidebar } from "~~/components/marketplace/CartSidebar/CartSidebar";
import { ProductComparison } from "~~/components/marketplace/ProductComparison/ProductComparison";
import { QuickViewModal } from "~~/components/marketplace/QuickViewModal/QuickViewModal";
import { BlockieAvatar } from "~~/components/scaffold-eth";
import { useInitializeNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  useInitializeNativeCurrencyPrice();

  return (
    <>
      <div className={`flex flex-col min-h-screen `}>
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>

      <QuickViewModal />
      <ProductComparison />
      <CartSidebar />

      <Toaster />
      <ScrollToTop />
    </>
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ScaffoldEthAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <TransactionProvider>
          <RainbowKitProvider
            avatar={BlockieAvatar}
            theme={mounted ? (isDarkMode ? darkTheme() : lightTheme()) : lightTheme()}
          >
            <ThemeSync />
            <ProgressBar height="3px" color="#2299dd" />
            <ScaffoldEthApp>{children}</ScaffoldEthApp>
            <TransactionModal />
          </RainbowKitProvider>
        </TransactionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
