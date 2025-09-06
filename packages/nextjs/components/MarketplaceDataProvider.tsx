"use client";

import { useEffect } from "react";
import { useThirdwebMarketplace } from "~~/hooks/thirdweb/useThirdwebMarketplace";
import { useThirdwebMarketplaceStore } from "~~/stores/thirdwebMarketplaceStore";
import type { Product } from "~~/types/marketplace";

interface MarketplaceDataProviderProps {
  children: React.ReactNode;
}

export const MarketplaceDataProvider = ({ children }: MarketplaceDataProviderProps) => {
  const { products: blockchainProducts } = useThirdwebMarketplace();
  const { setBlockchainProducts } = useThirdwebMarketplaceStore();

  useEffect(() => {
    if (!blockchainProducts || blockchainProducts.length === 0) return;

    const normalizedProducts: Product[] = blockchainProducts.map(prod => ({
      ...prod,
      // ensure name is always a string
      name: prod.name?.toString() ?? "",

      // normalize listingType into union type
      listingType: prod.listingType === "direct" || prod.listingType === "auction" ? prod.listingType : undefined,
    }));

    setBlockchainProducts(normalizedProducts);
  }, [blockchainProducts, setBlockchainProducts]);

  return <>{children}</>;
};
