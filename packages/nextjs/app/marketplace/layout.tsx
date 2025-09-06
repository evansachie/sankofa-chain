import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "SankofaChain",
  description: "Discover authentic African products, patterns, and experiences from verified creators",
});

const MarketplaceLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default MarketplaceLayout;
