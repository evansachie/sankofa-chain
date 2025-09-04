export interface Collection {
  id: string;
  name: string;
  creator: string;
  creatorUsername: string;
  mainImage: string;
  previewImages: string[];
  items: number;
  floorPrice: string;
  volume: string;
  category: string;
  description: string;
}

export const trendingCollections: Collection[] = [
  {
    id: "1",
    name: "Premium Shea Butter",
    creator: "KAEME",
    creatorUsername: "@kaeme",
    mainImage:
      "https://images.unsplash.com/photo-1573812461383-e5f8b759d12e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    previewImages: [
      "https://images.unsplash.com/photo-1648203276014-20f97ba1f817?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1620567838034-f32ee85818aa?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    items: 480,
    floorPrice: "GHS 45",
    volume: "2.1k orders",
    category: "Skincare",
    description: "Hand-whipped Ghanaian shea butter—rich, unrefined, and perfect for daily skin & hair rituals.",
  },
  {
    id: "2",
    name: "African Black Soap",
    creator: "Natural Essentials",
    creatorUsername: "@naturals",
    mainImage:
      "https://images.unsplash.com/photo-1550309445-f37cdbe890fb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    previewImages: [
      "https://images.unsplash.com/photo-1733348188703-ad5a2e7d0d76?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1643923203594-b01213e5bd4a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1618840255457-306c49f5f1f5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    items: 620,
    floorPrice: "GHS 30",
    volume: "3.4k orders",
    category: "Bath & Body",
    description: "Traditional black soap crafted with cocoa pod ash and oils for a deep, gentle cleanse.",
  },
  {
    id: "3",
    name: "Kente Textiles",
    creator: "Bonwire Weavers",
    creatorUsername: "@bonwire",
    mainImage:
      "https://images.unsplash.com/photo-1660695828403-b42e117e0b4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    previewImages: [
      "https://images.unsplash.com/photo-1594736797933-d0701ba58665?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-c8abdb1d3d48?w=150&h=150&fit=crop",
    ],
    items: 210,
    floorPrice: "GHS 250",
    volume: "780 orders",
    category: "Textiles",
    description: "Authentic Kente cloth and accessories woven in Ashanti tradition—bold colorways, heirloom quality.",
  },
  {
    id: "6",
    name: "Bolga Baskets",
    creator: "Upper East Guild",
    creatorUsername: "@bolga",
    mainImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    previewImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=150&h=150&fit=crop",
    ],
    items: 275,
    floorPrice: "GHS 120",
    volume: "640 orders",
    category: "Home Goods",
    description: "Hand-woven elephant-grass baskets from Bolgatanga—sturdy carryalls and elegant home storage.",
  },
];
