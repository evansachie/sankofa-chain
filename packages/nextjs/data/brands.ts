import { BrandProfile } from "~~/types/brand";

export const brands: BrandProfile[] = [
  {
    id: "b1",
    address: "0x1234567890123456789012345678901234567890",
    name: "Kente Heritage Co.",
    logo: "https://images.unsplash.com/photo-1660695828403-b42e117e0b4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bannerImage:
      "https://images.unsplash.com/photo-1655682614757-a9a33fa45c93?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "Premium Kente textiles and contemporary African fashion rooted in Ghanaian heritage.",
    verified: true,
    featured: true,
    location: { country: "Ghana", city: "Kumasi" },
    categories: ["Textiles", "Fashion"],
    social: { website: "https://kente-heritage.example.com" },
    stats: { followers: 2150, totalProducts: 36, rating: 4.8 },
    productIds: ["1", "4", "8"],
  },
  {
    id: "b2",
    address: "0x1111111111111111111111111111111111111111",
    name: "Savannah Skincare",
    logo: "https://images.unsplash.com/photo-1582103645388-b85304592cb0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bannerImage:
      "https://images.unsplash.com/photo-1660190368311-64d54386e494?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "Natural beauty products crafted with shea, cocoa and botanicals from West Africa.",
    verified: true,
    featured: false,
    location: { country: "Ghana", city: "Tamale" },
    categories: ["Beauty", "Skincare"],
    social: { website: "https://savannah-skincare.example.com" },
    stats: { followers: 1340, totalProducts: 22, rating: 4.6 },
    productIds: ["5", "10"],
  },
  {
    id: "b3",
    address: "0x2222222222222222222222222222222222222222",
    name: "Heritage Crafts Collective",
    logo: "https://images.unsplash.com/photo-1682668701024-b6508708a764?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bannerImage:
      "https://images.unsplash.com/photo-1544914167-c71759753c6d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0",
    description: "Collective of artisans producing sustainable baskets, woodcraft and home décor.",
    verified: false,
    featured: false,
    location: { country: "Ghana", city: "Bolgatanga" },
    categories: ["Crafts", "Home"],
    social: { website: "https://heritage-crafts.example.com" },
    stats: { followers: 780, totalProducts: 18, rating: 4.5 },
    productIds: ["7", "11"],
  },
];

export const getBrandById = (id: string) => brands.find(b => b.id === id);
