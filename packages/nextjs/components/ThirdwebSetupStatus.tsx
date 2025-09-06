"use client";

import { Button } from "~~/components/ui";
import { useThirdwebMarketplace } from "~~/hooks/thirdweb/useThirdwebMarketplace";

export const ThirdwebSetupStatus = () => {
  const { marketplace, nftCollection, isLoading, products, errors } = useThirdwebMarketplace();

  const isConfigured = marketplace && nftCollection;
  const hasProducts = products && products.length > 0;
  const hasErrors = errors.directListings || errors.auctionListings;

  if (isLoading) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-yellow-800 font-medium">Loading Thirdweb contracts...</span>
        </div>
      </div>
    );
  }

  if (!isConfigured) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-red-800 font-semibold mb-1">Thirdweb Setup Required</h3>
            <p className="text-red-700 text-sm">
              Please configure your environment variables with the correct contract addresses.
            </p>
            <p className="text-red-600 text-xs mt-1">
              Marketplace: {process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || "Not set"}
              <br />
              NFT Collection: {process.env.NEXT_PUBLIC_NFT_COLLECTION_CONTRACT_ADDRESS || "Not set"}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.open("/scripts/deploy-contracts.md", "_blank")}>
            View Setup Guide
          </Button>
        </div>
      </div>
    );
  }

  if (hasErrors) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <span className="text-orange-800 font-medium">Marketplace connected with warnings</span>
            <p className="text-orange-700 text-sm mt-1">
              {hasProducts
                ? `Found ${products.length} products, but some marketplace data couldn't be loaded`
                : "No products found - this might be normal if no listings exist yet"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <span className="text-green-800 font-medium">Thirdweb contracts connected successfully!</span>
            {hasProducts && <p className="text-green-700 text-sm mt-1">Found {products.length} blockchain products</p>}
          </div>
        </div>
        {!hasProducts && <div className="text-green-700 text-sm">No products listed yet</div>}
      </div>
    </div>
  );
};
