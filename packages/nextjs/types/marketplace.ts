export interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    amount: number;
    currency: "ETH" | "SANKOFA";
    usd?: number;
  };
  images: string[];
  category: string;
  subcategory?: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
    ensName?: string;
  };
  location: {
    country: string;
    region?: string;
  };
  tags: string[];
  authenticity: {
    verified: boolean;
    nftCertificate?: string;
    patternId?: string;
  };
  stats: {
    views: number;
    likes: number;
    sold: number;
    rating: number;
    reviews: number;
  };
  availability: {
    inStock: boolean;
    quantity?: number;
    isDigital: boolean;
  };
  metadata: {
    createdAt: string;
    updatedAt: string;
    featured: boolean;
    trending: boolean;
  };
  // Blockchain specific data
  tokenId?: string;
  contractAddress?: string;
  listingId?: string;
  isListed?: boolean;
  listingType?: "direct" | "auction";
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
  itemCount: number;
  featured: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  itemCount: number;
}

export interface FilterOptions {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  location: string[];
  verified: boolean;
  inStock: boolean;
  sortBy: "newest" | "oldest" | "price-low" | "price-high" | "popular" | "rating";
  searchQuery: string;
}

export interface MarketplaceStats {
  totalProducts: number;
  totalCreators: number;
  totalSales: string;
  featuredProducts: Product[];
  trendingProducts: Product[];
}

export interface CreatorProfile {
  id: string;
  address: string;
  name: string;
  avatar: string;
  bannerImage?: string;
  verified: boolean;
  featured: boolean;
  ensName?: string;
  bio: string;
  story?: string;
  location: string;
  country: string;
  city?: string;
  joinedDate: string;
  socialMedia: {
    website?: string;
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    opensea?: string;
  };
  specialties: string[];
  categories?: string[];
  languages: string[];
  stats: {
    totalProducts: number;
    totalSales: number;
    rating: number;
    followers: number;
    following: number;
    reviews?: number;
    joinedDate?: string;
    lastActive?: string;
  };
  achievements: Achievement[];
  storeSettings: {
    storeName: string;
    storeDescription: string;
    theme: string;
    customColors: {
      primary: string;
      secondary: string;
    };
    shippingInfo: string;
    returnPolicy: string;
    layoutType?: "grid" | "list" | "masonry";
    customBranding?: boolean;
    contactInfo?: {
      email?: string;
      businessHours?: string;
    };
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
}

export interface CreatorStats {
  totalViews: number;
  totalLikes: number;
  totalSales: number;
  averageRating: number;
  responseTime: string;
  completionRate: number;
}

export interface Follow {
  creatorId: string;
  followerId: string;
  followedAt: string;
}
