"use client";

import { useMemo } from "react";
import {
  type RequiredParam,
  useAddress,
  useContract,
  useOwnedNFTs,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import type { Product } from "~~/types/marketplace";

const MARKETPLACE_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS || "";
const NFT_COLLECTION_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_COLLECTION_CONTRACT_ADDRESS || "";

export const useThirdwebMarketplace = () => {
  const address: RequiredParam<string> = useAddress();

  // Check if environment variables are set
  const isConfigured = MARKETPLACE_CONTRACT_ADDRESS && NFT_COLLECTION_CONTRACT_ADDRESS;

  const { contract: marketplace } = useContract(
    isConfigured ? MARKETPLACE_CONTRACT_ADDRESS : undefined,
    "marketplace-v3",
  );
  const { contract: nftCollection } = useContract(
    isConfigured ? NFT_COLLECTION_CONTRACT_ADDRESS : undefined,
    "nft-collection",
  );

  // Use the correct hooks for MarketplaceV3 only if contracts are configured
  const {
    data: directListings,
    isLoading: loadingDirectListings,
    error: directListingsError,
  } = useValidDirectListings(marketplace, isConfigured ? { start: 0, count: 100 } : undefined);

  const {
    data: auctionListings,
    isLoading: loadingAuctionListings,
    error: auctionListingsError,
  } = useValidEnglishAuctions(marketplace, isConfigured ? { start: 0, count: 100 } : undefined);

  const { data: ownedNFTs, isLoading: loadingOwnedNFTs } = useOwnedNFTs(
    nftCollection,
    isConfigured ? address : undefined,
  );

  // Combine listings from both sources, handling errors gracefully
  const listings = useMemo(() => {
    // Handle errors by treating them as empty arrays
    const direct = directListingsError ? [] : directListings || [];
    const auctions = auctionListingsError ? [] : auctionListings || [];
    return [...direct, ...auctions];
  }, [directListings, auctionListings, directListingsError, auctionListingsError]);

  const isLoadingListings = isConfigured ? loadingDirectListings || loadingAuctionListings : false;

  const products: Product[] = useMemo(() => {
    if (!listings || listings.length === 0) return [];

    return listings.map(listing => {
      // Handle both DirectListingV3 and EnglishAuction types
      const isDirectListing = "pricePerToken" in listing;
      const price = isDirectListing
        ? listing.pricePerToken
        : (listing as any).minimumBidAmount || (listing as any).buyoutBidAmount;

      const sellerAddress =
        (listing as any).listingCreator || (listing as any).sellerAddress || (listing as any).creatorAddress;

      // Extract creator info from asset attributes
      const attributes = (listing.asset?.attributes as any[]) || [];
      const creatorName = attributes.find((attr: any) => attr.trait_type === "Creator")?.value || "Creator";
      const creatorENS = attributes.find((attr: any) => attr.trait_type === "Creator ENS")?.value;
      const location = attributes.find((attr: any) => attr.trait_type === "Location")?.value;
      const category = attributes.find((attr: any) => attr.trait_type === "Category")?.value || "textiles";
      const subcategory = attributes.find((attr: any) => attr.trait_type === "Subcategory")?.value || "kente-cloth";
      const tags = attributes.filter((attr: any) => attr.trait_type === "Tag").map((attr: any) => attr.value) || [
        "blockchain",
        "nft",
      ];

      // Safely handle timestamp conversion
      const startTimestamp = (listing as any).startTimestamp;
      let createdAt: string;

      if (startTimestamp && typeof startTimestamp === "number" && startTimestamp > 0) {
        try {
          const date = new Date(startTimestamp * 1000);
          if (!isNaN(date.getTime())) {
            createdAt = date.toISOString();
          } else {
            createdAt = new Date().toISOString();
          }
        } catch (error) {
          console.warn("Invalid timestamp for listing:", listing.id, error);
          createdAt = new Date().toISOString();
        }
      } else {
        createdAt = new Date().toISOString();
      }

      return {
        id: listing.id,
        name: listing.asset?.name?.toString() || "Untitled Product",
        description: listing.asset?.description || "",
        price: {
          amount: parseFloat(price?.toString() || "0") / Math.pow(10, 18), // Convert from wei to ETH
          currency: "ETH" as "ETH" | "SANKOFA",
          usd: 0,
        },
        images: listing.asset?.image ? [listing.asset.image] : [],
        category: category,
        subcategory: subcategory,
        creator: {
          id: sellerAddress,
          name: creatorName,
          avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
          verified: true,
          ensName: creatorENS,
        },
        location: location
          ? {
              country: location.split(" - ")[0] || "Ghana",
              region: location.split(" - ")[1] || "Ashanti",
            }
          : {
              country: "Ghana",
              region: "Ashanti",
            },
        tags: tags,
        authenticity: {
          verified: true,
          nftCertificate: listing.asset?.id,
          patternId: undefined,
        },
        stats: {
          views: 0,
          likes: 0,
          sold: 0,
          rating: 5.0,
          reviews: 0,
        },
        availability: {
          inStock: true,
          quantity: 1,
          isDigital: true,
        },
        metadata: {
          createdAt,
          updatedAt: new Date().toISOString(),
          featured: false,
          trending: false,
        },
        tokenId: listing.asset?.id,
        contractAddress: listing.assetContractAddress,
        listingId: listing.id,
        isListed: true,
        listingType: isDirectListing ? "direct" : "auction",
      };
    });
  }, [listings]);

  const createListing = async (tokenId: string, price: string, type: "direct" | "auction" = "direct") => {
    if (!marketplace) throw new Error("Marketplace contract not initialized");
    throw new Error(
      `Create ${type} listing functionality not yet implemented for MarketplaceV3. TokenId: ${tokenId}, Price: ${price}`,
    );
  };

  const buyListing = async (listingId: string) => {
    if (!marketplace) throw new Error("Marketplace contract not initialized");

    try {
      // Find the listing to get its details
      const listing = listings.find(l => l.id === listingId);
      if (!listing) throw new Error("Listing not found");

      // Check if it's a direct listing
      const isDirectListing = "pricePerToken" in listing;
      if (!isDirectListing) {
        throw new Error("This is an auction listing. Use makeOffer instead.");
      }

      // Buy the direct listing using the correct API
      const tx = await (marketplace as any).buyoutListing(listingId, 1); // quantity = 1
      console.log("Buy transaction:", tx);

      return tx;
    } catch (error) {
      console.error("Buy listing error:", error);
      throw error;
    }
  };

  const makeOffer = async (listingId: string, pricePerToken: string) => {
    if (!marketplace) throw new Error("Marketplace contract not initialized");

    try {
      // Find the listing to get its details
      const listing = listings.find(l => l.id === listingId);
      if (!listing) throw new Error("Listing not found");

      // Check if it's a direct listing (for offers) or auction listing (for bids)
      const isDirectListing = "pricePerToken" in listing;

      // Convert price to wei
      const priceInWei = (parseFloat(pricePerToken) * Math.pow(10, 18)).toString();

      let tx;
      if (isDirectListing) {
        // Make an offer on a direct listing
        tx = await (marketplace as any).direct.makeOffer(
          listingId,
          1, // quantity
          "0x0000000000000000000000000000000000000000", // ETH address
          priceInWei,
        );
      } else {
        // Make a bid on an auction listing
        tx = await (marketplace as any).auction.makeBid(listingId, priceInWei);
      }

      console.log("Make offer/bid transaction:", tx);
      return tx;
    } catch (error) {
      console.error("Make offer error:", error);
      throw error;
    }
  };

  return {
    products,
    listings,
    ownedNFTs,
    isLoading: isLoadingListings, // Only consider marketplace listings as loading, not owned NFTs
    isLoadingOwnedNFTs: loadingOwnedNFTs, // Separate loading state for owned NFTs
    errors: {
      directListings: directListingsError,
      auctionListings: auctionListingsError,
    },
    createListing,
    buyListing,
    makeOffer,
    marketplace,
    nftCollection,
  };
};
