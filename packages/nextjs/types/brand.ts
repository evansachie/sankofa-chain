import { Product } from "./marketplace";

export interface BrandProfile {
  id: string;
  address?: string;
  name: string;
  logo: string;
  bannerImage?: string;
  description: string;
  verified: boolean;
  featured: boolean;
  location?: {
    country?: string;
    city?: string;
  };
  categories?: string[];
  social?: {
    website?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  };
  stats: {
    followers: number;
    totalProducts: number;
    rating?: number;
  };
  productIds?: string[];
}

export type BrandWithProducts = BrandProfile & { products: Product[] };
