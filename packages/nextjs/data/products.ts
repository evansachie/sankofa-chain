import { Product } from "~~/types/marketplace";

export const products: Product[] = [
  {
    id: "1",
    name: "Authentic Kente Cloth Pattern #001",
    description:
      "Hand-woven traditional Kente cloth with authentic Asante patterns. Each thread tells a story of our rich cultural heritage. This piece represents wisdom, creativity, and strength.",
    price: {
      amount: 0.25,
      currency: "ETH",
      usd: 825,
    },
    images: [
      "https://images.unsplash.com/photo-1660695828403-b42e117e0b4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1660695828374-4ff51ac9df5d?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1723922967943-9d9fe2da5afd?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "textiles",
    subcategory: "kente-cloth",
    creator: {
      id: "1",
      name: "Akosua Mensah",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "akosua.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Ashanti",
    },
    tags: ["kente", "traditional", "handwoven", "asante", "authentic"],
    authenticity: {
      verified: true,
      nftCertificate: "0x123...abc",
      patternId: "kente-asante-001",
    },
    stats: {
      views: 1250,
      likes: 89,
      sold: 12,
      rating: 4.8,
      reviews: 15,
    },
    availability: {
      inStock: true,
      quantity: 5,
      isDigital: false,
    },
    metadata: {
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-02-01T14:20:00Z",
      featured: true,
      trending: true,
    },
  },
  {
    id: "2",
    name: "Adinkra Symbol Jewelry Set",
    description:
      "Handcrafted gold-plated jewelry featuring traditional Adinkra symbols. Each piece represents deep philosophical concepts and African wisdom.",
    price: {
      amount: 0.15,
      currency: "ETH",
      usd: 495,
    },
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=600&fit=crop",
    ],
    category: "jewelry",
    subcategory: "traditional",
    creator: {
      id: "3",
      name: "Ama Osei",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "ama.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Greater Accra",
    },
    tags: ["adinkra", "jewelry", "gold", "symbols", "handcrafted"],
    authenticity: {
      verified: true,
      nftCertificate: "0x456...def",
    },
    stats: {
      views: 890,
      likes: 67,
      sold: 8,
      rating: 4.9,
      reviews: 12,
    },
    availability: {
      inStock: true,
      quantity: 10,
      isDigital: false,
    },
    metadata: {
      createdAt: "2024-01-20T16:45:00Z",
      updatedAt: "2024-01-25T09:15:00Z",
      featured: true,
      trending: false,
    },
  },
  {
    id: "3",
    name: "Wooden Mask - Akan Fertility",
    description:
      "Traditional Akan fertility mask carved from premium African mahogany. Sacred symbol of life, fertility, and prosperity in Akan culture.",
    price: {
      amount: 0.35,
      currency: "ETH",
      usd: 1155,
    },
    images: [
      "https://images.unsplash.com/photo-1719169395872-3b953620f1ce?q=80&w=767&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1719169395171-e6d1aa1f1f6f?q=80&w=760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1719169396076-20ea603742ed?q=80&w=748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "art",
    subcategory: "sculpture",
    creator: {
      id: "2",
      name: "Kwame Asante",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "kwame.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Central",
    },
    tags: ["mask", "akan", "fertility", "sculpture", "mahogany"],
    authenticity: {
      verified: true,
      nftCertificate: "0x789...ghi",
    },
    stats: {
      views: 2100,
      likes: 156,
      sold: 3,
      rating: 5.0,
      reviews: 8,
    },
    availability: {
      inStock: true,
      quantity: 2,
      isDigital: false,
    },
    metadata: {
      createdAt: "2024-01-10T08:20:00Z",
      updatedAt: "2024-01-15T11:30:00Z",
      featured: true,
      trending: true,
    },
  },
  {
    id: "13",
    name: "Traditional Footwear",
    description:
      "Handcrafted African footwear worn for centuries across West Africa. Made with durable hide and natural dyes, they blend comfort, heritage, and timeless everyday style.",
    price: {
      amount: 0.16,
      currency: "ETH",
      usd: 528,
    },
    images: [
      "https://images.unsplash.com/photo-1734178313867-30531963c136?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1591964447401-b6a88f3dafb7?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1590269275103-a45074739058?q=80&w=1182&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "footwear",
    subcategory: "traditional-sandals",
    creator: {
      id: "10",
      name: "Kojo Mensah",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "kojo.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Northern",
    },
    tags: ["footwear", "sandals", "handcrafted", "traditional", "leather"],
    authenticity: {
      verified: true,
      nftCertificate: "0x987...zyx",
    },
    stats: {
      views: 1130,
      likes: 81,
      sold: 21,
      rating: 4.7,
      reviews: 19,
    },
    availability: {
      inStock: true,
      quantity: 12,
      isDigital: false,
    },
    metadata: {
      createdAt: "2024-02-12T12:00:00Z",
      updatedAt: "2024-02-20T09:15:00Z",
      featured: false,
      trending: false,
    },
  },
  {
    id: "4",
    name: "Digital Kente Pattern Collection",
    description:
      "Exclusive digital collection of 50 unique Kente patterns with commercial usage rights. Perfect for fashion designers and digital artists.",
    price: {
      amount: 2500,
      currency: "SANKOFA",
      usd: 125,
    },
    images: [
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582582494315-22dc4146c7d3?w=800&h=600&fit=crop",
    ],
    category: "digital",
    subcategory: "patterns",
    creator: {
      id: "4",
      name: "Kofi Adjei",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "kofi.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Volta",
    },
    tags: ["digital", "patterns", "kente", "commercial", "collection"],
    authenticity: {
      verified: true,
      nftCertificate: "0xabc...123",
      patternId: "digital-kente-001",
    },
    stats: {
      views: 3200,
      likes: 245,
      sold: 28,
      rating: 4.7,
      reviews: 35,
    },
    availability: {
      inStock: true,
      isDigital: true,
    },
    metadata: {
      createdAt: "2024-02-01T12:00:00Z",
      updatedAt: "2024-02-10T15:45:00Z",
      featured: false,
      trending: true,
    },
  },
  {
    id: "5",
    name: "Shea Butter & African Black Soap Set",
    description:
      "Premium skincare set featuring raw shea butter and traditional African black soap. Sourced directly from women's cooperatives in Northern Ghana.",
    price: {
      amount: 0.08,
      currency: "ETH",
      usd: 264,
    },
    images: [
      "https://images.unsplash.com/photo-1573812461383-e5f8b759d12e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1638131163449-70059e10de6a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "beauty",
    subcategory: "skincare",
    creator: {
      id: "5",
      name: "Efua Nkrumah",
      avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "efua.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Northern",
    },
    tags: ["shea-butter", "black-soap", "skincare", "natural", "cooperative"],
    authenticity: {
      verified: true,
      nftCertificate: "0xdef...456",
    },
    stats: {
      views: 1850,
      likes: 134,
      sold: 45,
      rating: 4.6,
      reviews: 52,
    },
    availability: {
      inStock: true,
      quantity: 25,
      isDigital: false,
    },
    metadata: {
      createdAt: "2024-01-25T14:30:00Z",
      updatedAt: "2024-02-05T10:20:00Z",
      featured: false,
      trending: false,
    },
  },
  {
    id: "6",
    name: "Kente Pattern Design Workshop",
    description:
      "Virtual workshop experience learning traditional Kente weaving patterns from master weavers. Includes materials kit and 3-hour live session.",
    price: {
      amount: 0.12,
      currency: "ETH",
      usd: 396,
    },
    images: [
      "https://images.unsplash.com/photo-1596626417050-39c7f6ddd2c9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1622396481359-6f5c5f481566?q=80&w=690&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1606885118474-c8baf907e998?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "experiences",
    subcategory: "workshops",
    creator: {
      id: "1",
      name: "Akosua Mensah",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "akosua.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Ashanti",
    },
    tags: ["workshop", "kente", "weaving", "virtual", "learning"],
    authenticity: {
      verified: true,
      nftCertificate: "0x321...cba",
    },
    stats: {
      views: 950,
      likes: 78,
      sold: 15,
      rating: 4.9,
      reviews: 18,
    },
    availability: {
      inStock: true,
      quantity: 8,
      isDigital: true,
    },
    metadata: {
      createdAt: "2024-02-05T09:00:00Z",
      updatedAt: "2024-02-08T16:30:00Z",
      featured: true,
      trending: false,
    },
  },
  {
    id: "7",
    name: "Handwoven Basket Collection",
    description:
      "Beautiful collection of traditional African baskets made from sustainable materials. Perfect for home décor and storage.",
    price: {
      amount: 0.06,
      currency: "ETH",
      usd: 198,
    },
    images: [
      "https://images.unsplash.com/photo-1544914167-c71759753c6d?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1567696154083-9547fd0c8e1d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1745490574185-e26342313db8?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1739131886213-7a9580cbc4e1?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "crafts",
    subcategory: "baskets",
    creator: {
      id: "6",
      name: "Yaw Boakye",
      avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "yaw.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Upper East",
    },
    tags: ["baskets", "handwoven", "sustainable", "home-decor", "storage"],
    authenticity: {
      verified: true,
      nftCertificate: "0x654...fed",
    },
    stats: {
      views: 750,
      likes: 45,
      sold: 18,
      rating: 4.5,
      reviews: 22,
    },
    availability: {
      inStock: true,
      quantity: 15,
      isDigital: false,
    },
    metadata: {
      createdAt: "2024-01-30T11:15:00Z",
      updatedAt: "2024-02-12T14:45:00Z",
      featured: false,
      trending: false,
    },
  },
  {
    id: "8",
    name: "African Print Fabric Bundle",
    description:
      "Premium collection of authentic African print fabrics. Vibrant colors and traditional patterns perfect for fashion and crafts.",
    price: {
      amount: 0.18,
      currency: "ETH",
      usd: 594,
    },
    images: [
      "https://images.unsplash.com/photo-1552710307-537199cd41c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1655682614757-a9a33fa45c93?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1655682604476-96976c1917fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "textiles",
    subcategory: "fabric",
    creator: {
      id: "5",
      name: "Efua Nkrumah",
      avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "efua.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Northern",
    },
    tags: ["fabric", "african-print", "vibrant", "fashion", "crafts"],
    authenticity: {
      verified: true,
      nftCertificate: "0x987...123",
    },
    stats: {
      views: 1420,
      likes: 102,
      sold: 25,
      rating: 4.7,
      reviews: 31,
    },
    availability: {
      inStock: true,
      quantity: 8,
      isDigital: false,
    },
    metadata: {
      createdAt: "2024-02-08T08:30:00Z",
      updatedAt: "2024-02-15T16:20:00Z",
      featured: true,
      trending: true,
    },
  },
  {
    id: "9",
    name: "Traditional Drumming Workshop",
    description:
      "Learn traditional African drumming techniques in this immersive virtual workshop. Includes practice drum and cultural history.",
    price: {
      amount: 0.09,
      currency: "ETH",
      usd: 297,
    },
    images: [
      "https://images.unsplash.com/photo-1523689119443-df96632084a1?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1522168709594-942fcde3d332?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1730635335549-09bd47b1a5ae?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "experiences",
    subcategory: "music",
    creator: {
      id: "7",
      name: "Kwabena Osei",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "kwabena.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Volta",
    },
    tags: ["drumming", "music", "workshop", "cultural", "virtual"],
    authenticity: {
      verified: true,
      nftCertificate: "0xaaa...bbb",
    },
    stats: {
      views: 680,
      likes: 58,
      sold: 12,
      rating: 4.9,
      reviews: 14,
    },
    availability: {
      inStock: true,
      quantity: 20,
      isDigital: true,
    },
    metadata: {
      createdAt: "2024-02-03T13:45:00Z",
      updatedAt: "2024-02-10T09:15:00Z",
      featured: false,
      trending: true,
    },
  },
  {
    id: "10",
    name: "Cocoa Butter Skincare Set",
    description:
      "Pure Ghanaian cocoa butter skincare collection. Nourishing and moisturizing products made from premium cocoa beans.",
    price: {
      amount: 0.07,
      currency: "ETH",
      usd: 231,
    },
    images: [
      "https://images.unsplash.com/photo-1707915317424-437561f0e323?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1660190368311-64d54386e494?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1663054801573-9201c80635a0?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "beauty",
    subcategory: "skincare",
    creator: {
      id: "8",
      name: "Adwoa Asante",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "adwoa.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Western",
    },
    tags: ["cocoa-butter", "skincare", "natural", "moisturizing", "premium"],
    authenticity: {
      verified: true,
      nftCertificate: "0xccc...ddd",
    },
    stats: {
      views: 920,
      likes: 71,
      sold: 33,
      rating: 4.6,
      reviews: 41,
    },
    availability: {
      inStock: true,
      quantity: 18,
      isDigital: false,
    },
    metadata: {
      createdAt: "2024-01-28T15:20:00Z",
      updatedAt: "2024-02-14T11:30:00Z",
      featured: false,
      trending: false,
    },
  },
  {
    id: "11",
    name: "Bronze Akan Weights Set",
    description:
      "Authentic replica of traditional Akan gold weights used in ancient trade. Each piece represents different proverbs and wisdom.",
    price: {
      amount: 0.22,
      currency: "ETH",
      usd: 726,
    },
    images: [
      "https://images.unsplash.com/photo-1736692336566-bc83c4830283?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1543132780-b92f51d70960?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "art",
    subcategory: "artifacts",
    creator: {
      id: "2",
      name: "Kwame Asante",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "kwame.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Central",
    },
    tags: ["bronze", "akan", "weights", "traditional", "artifacts"],
    authenticity: {
      verified: true,
      nftCertificate: "0xeee...fff",
    },
    stats: {
      views: 1680,
      likes: 124,
      sold: 7,
      rating: 4.8,
      reviews: 9,
    },
    availability: {
      inStock: true,
      quantity: 3,
      isDigital: false,
    },
    metadata: {
      createdAt: "2024-01-18T10:45:00Z",
      updatedAt: "2024-01-25T14:20:00Z",
      featured: true,
      trending: false,
    },
  },
  {
    id: "12",
    name: "Batik Art Workshop Experience",
    description:
      "Master the ancient art of batik in this hands-on virtual workshop. Learn traditional techniques and create your own patterns.",
    price: {
      amount: 0.14,
      currency: "ETH",
      usd: 462,
    },
    images: [
      "https://images.unsplash.com/photo-1542775846-e6c1e8aba884?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1612373931332-9fbb9b2290a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1641582163466-e4d573078f98?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    category: "experiences",
    subcategory: "art",
    creator: {
      id: "9",
      name: "Ama Gyasi",
      avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
      verified: true,
      ensName: "ama-gyasi.sankofachain.eth",
    },
    location: {
      country: "Ghana",
      region: "Greater Accra",
    },
    tags: ["batik", "art", "workshop", "traditional", "hands-on"],
    authenticity: {
      verified: true,
      nftCertificate: "0x111...222",
    },
    stats: {
      views: 540,
      likes: 42,
      sold: 9,
      rating: 4.7,
      reviews: 11,
    },
    availability: {
      inStock: true,
      quantity: 15,
      isDigital: true,
    },
    metadata: {
      createdAt: "2024-02-12T16:00:00Z",
      updatedAt: "2024-02-18T12:45:00Z",
      featured: false,
      trending: true,
    },
  },
];

export const featuredProducts = products.filter(product => product.metadata.featured);
export const trendingProducts = products.filter(product => product.metadata.trending);
