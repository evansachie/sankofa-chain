import { Product } from "./marketplace";

export interface Creator {
  id: string;
  name: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  speciality: string[];
  location: {
    country: string;
    region?: string;
  };
  contact: {
    email?: string;
    website?: string;
    social: {
      twitter?: string;
      instagram?: string;
      facebook?: string;
    };
  };
  verification: {
    verified: boolean;
    ensName?: string;
    efpAttestations: string[];
    badges: VerificationBadge[];
  };
  stats: {
    totalProducts: number;
    totalSales: string;
    rating: number;
    reviews: number;
    followers: number;
    joinedDate: string;
  };
  store: {
    name: string;
    description: string;
    policies: {
      shipping: string;
      returns: string;
      customization: string;
    };
    featured: boolean;
  };
}

export interface VerificationBadge {
  id: string;
  type: "master-artisan" | "cultural-committee" | "community-verified" | "top-seller";
  name: string;
  description: string;
  issuedBy: string;
  issuedDate: string;
  icon: string;
}

export interface CreatorProduct extends Product {
  creatorNotes?: string;
  customizationOptions?: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  type: "color" | "size" | "pattern" | "text";
  options: string[];
  additionalCost?: number;
}
