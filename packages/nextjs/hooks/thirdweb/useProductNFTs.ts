"use client";

import { useCallback } from "react";
import { useContract, useMintNFT } from "@thirdweb-dev/react";

const NFT_COLLECTION_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_COLLECTION_CONTRACT_ADDRESS || "";

export interface ProductMintData {
  name: string;
  description: string;
  image: string;
  category: string;
  subcategory?: string;
  tags: string[];
  location: {
    country: string;
    region?: string;
  };
  creator: {
    name: string;
    avatar: string;
    ensName?: string;
  };
  authenticity: {
    verified: boolean;
    patternId?: string;
  };
}

export const useProductNFTs = () => {
  const { contract } = useContract(NFT_COLLECTION_CONTRACT_ADDRESS, "nft-collection");
  const { mutateAsync: mintNFT, isLoading: isMinting } = useMintNFT(contract);

  const mintProduct = useCallback(
    async (productData: ProductMintData) => {
      if (!contract) throw new Error("NFT Collection contract not initialized");

      const metadata = {
        name: productData.name,
        description: productData.description,
        image: productData.image,
        attributes: [
          {
            trait_type: "Category",
            value: productData.category,
          },
          {
            trait_type: "Subcategory",
            value: productData.subcategory || "",
          },
          {
            trait_type: "Country",
            value: productData.location.country,
          },
          {
            trait_type: "Region",
            value: productData.location.region || "",
          },
          {
            trait_type: "Creator",
            value: productData.creator.name,
          },
          {
            trait_type: "Verified",
            value: productData.authenticity.verified,
          },
          {
            trait_type: "Pattern ID",
            value: productData.authenticity.patternId || "",
          },
          {
            trait_type: "Tags",
            value: productData.tags.join(","),
          },
        ],
      };

      return await mintNFT({
        metadata,
        to: productData.creator.name,
      });
    },
    [contract, mintNFT],
  );

  const getProductMetadata = useCallback(
    async (tokenId: string) => {
      if (!contract) throw new Error("NFT Collection contract not initialized");

      const nft = await contract.erc721.get(tokenId);
      return nft.metadata;
    },
    [contract],
  );

  return {
    mintProduct,
    getProductMetadata,
    isMinting,
    contract,
  };
};
