export interface FeaturedProduct {
  id: string;
  name: string;
  creator: string;
  price: string;
  originalPrice: string;
  image: string;
  category: string;
  inStock: boolean;
}

export const featuredProducts: FeaturedProduct[] = [
  {
    id: "1",
    name: "Handwoven Kente Scarf",
    creator: "@bonwire_master",
    price: "125 GHS",
    originalPrice: "150 GHS",
    image: "https://images.unsplash.com/photo-1660695828403-b42e117e0b4f?w=400&h=300&fit=crop",
    category: "Textiles",
    inStock: true,
  },
  {
    id: "2",
    name: "Authentic Shea Butter Set",
    creator: "@kaeme_naturals",
    price: "45 GHS",
    originalPrice: "55 GHS",
    image: "https://images.unsplash.com/photo-1573812461383-e5f8b759d12e?w=400&h=300&fit=crop",
    category: "Beauty",
    inStock: true,
  },
  {
    id: "3",
    name: "Carved Wooden Mask",
    creator: "@akan_sculptor",
    price: "280 GHS",
    originalPrice: "320 GHS",
    image: "https://images.unsplash.com/photo-1621419203897-20b66b98d495?w=400&h=300&fit=crop",
    category: "Art",
    inStock: false,
  },
];
