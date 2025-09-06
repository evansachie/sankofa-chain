import { CreatorProfile } from "~~/types/marketplace";

export const creators: CreatorProfile[] = [
  {
    id: "1",
    address: "0x1234567890123456789012345678901234567890",
    name: "Amara Kone",
    bio: "Master weaver from Mali specializing in traditional bogolan (mud cloth) with modern artistic interpretations. My work preserves ancient techniques while exploring contemporary expressions.",
    story:
      "Born in the heart of Bamako, I learned the ancient art of bogolan from my grandmother. Each piece tells a story of our ancestors and connects us to the earth.",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=faces",
    bannerImage:
      "https://images.unsplash.com/photo-1693988112036-fbb124e6b082?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    verified: true,
    featured: true,
    location: "Bamako, Mali",
    country: "Mali",
    city: "Bamako",
    ensName: "amara.eth",
    joinedDate: "2023-01-15",
    socialMedia: {
      website: "https://amarakone-textiles.com",
      instagram: "https://instagram.com/amarakone_textiles",
      twitter: "https://twitter.com/amarakone",
    },
    specialties: ["Textiles", "Traditional Crafts", "Mud Cloth", "Weaving"],
    categories: ["Textiles", "Traditional Crafts"],
    languages: ["French", "Bambara", "English"],
    stats: {
      totalProducts: 24,
      totalSales: 156,
      rating: 4.9,
      followers: 2100,
      following: 45,
      reviews: 89,
      joinedDate: "2023-01-15",
      lastActive: "2024-12-30",
    },
    achievements: [
      {
        id: "featured-artist",
        title: "Featured Artist",
        description: "Selected as featured artist for exceptional craftsmanship",
        earnedDate: "2023-06-15",
        icon: "star",
      },
      {
        id: "top-seller",
        title: "Top Seller",
        description: "Achieved over 100 sales milestone",
        earnedDate: "2023-09-10",
        icon: "trophy",
      },
    ],
    storeSettings: {
      storeName: "Amara's Bogolan Studio",
      storeDescription: "Authentic Malian mud cloth and contemporary textile art",
      theme: "earth",
      customColors: {
        primary: "#8B4513",
        secondary: "#D2691E",
      },
      shippingInfo: "Ships worldwide from Mali. Processing time: 3-5 business days.",
      returnPolicy: "30-day return policy for unused items in original condition.",
      layoutType: "grid",
      customBranding: true,
      contactInfo: {
        email: "amara@example.com",
        businessHours: "9 AM - 6 PM GMT",
      },
    },
  },
  {
    id: "2",
    address: "0x1234567890123456789012345678901234567890",
    name: "Kwame Asante",
    bio: "Contemporary sculptor and woodcarver from Ghana, blending traditional Akan artistic heritage with modern design sensibilities.",
    story:
      "From the heart of Kumasi, I blend traditional Akan artistry with contemporary design, honoring my ancestors while creating for the future.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
    bannerImage:
      "https://images.unsplash.com/photo-1632157071684-a1cf9c22fe98?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    verified: true,
    featured: false,
    location: "Kumasi, Ghana",
    country: "Ghana",
    city: "Kumasi",
    ensName: "kwame.eth",
    joinedDate: "2023-02-20",
    socialMedia: {
      website: "https://kwameasante.art",
      instagram: "https://instagram.com/kwameasante_art",
      facebook: "https://facebook.com/kwameasanteart",
    },
    specialties: ["Sculpture", "Wood Carving", "Contemporary Art", "Traditional Crafts"],
    categories: ["Sculptures", "Wood Art"],
    languages: ["English", "Twi", "French"],
    stats: {
      totalProducts: 18,
      totalSales: 89,
      rating: 4.8,
      followers: 1650,
      following: 32,
      reviews: 45,
      joinedDate: "2023-02-20",
      lastActive: "2024-12-29",
    },
    achievements: [
      {
        id: "master-craftsman",
        title: "Master Craftsman",
        description: "Recognized for exceptional skill in traditional woodcarving",
        earnedDate: "2023-04-22",
        icon: "star",
      },
    ],
    storeSettings: {
      storeName: "Asante Wood Studio",
      storeDescription: "Contemporary African sculptures and traditional woodcarvings",
      theme: "forest",
      customColors: {
        primary: "#228B22",
        secondary: "#32CD32",
      },
      shippingInfo: "Ships from Ghana. Customs fees may apply for international orders.",
      returnPolicy: "Returns accepted within 14 days. Buyer pays return shipping.",
      layoutType: "masonry",
      customBranding: false,
      contactInfo: {
        email: "kwame@example.com",
      },
    },
  },
  {
    id: "3",
    address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
    name: "Fatima Al-Zahra",
    bio: "Master metalsmith and jewelry designer from Morocco, creating intricate silver pieces inspired by Berber traditions and Islamic geometric patterns.",
    story:
      "In the ancient medina of Fez, I learned the sacred art of silver smithing, creating pieces that honor our Berber heritage and Islamic traditions.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces",
    bannerImage:
      "https://images.unsplash.com/photo-1624382497193-de32b368de64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    verified: true,
    featured: true,
    location: "Fez, Morocco",
    country: "Morocco",
    city: "Fez",
    joinedDate: "2022-11-10",
    socialMedia: {
      instagram: "https://instagram.com/fatima_silver_art",
      website: "https://fatima-jewelry.com",
    },
    specialties: ["Jewelry", "Metalwork", "Silver Smithing", "Islamic Art"],
    categories: ["Jewelry", "Metalwork"],
    languages: ["Arabic", "French", "Berber"],
    stats: {
      totalProducts: 31,
      totalSales: 203,
      rating: 4.9,
      followers: 2890,
      following: 67,
      reviews: 128,
      joinedDate: "2022-11-10",
      lastActive: "2024-12-31",
    },
    achievements: [
      {
        id: "heritage-guardian",
        title: "Heritage Guardian",
        description: "Preserving traditional Moroccan metalworking techniques",
        earnedDate: "2023-01-30",
        icon: "shield",
      },
      {
        id: "top-seller",
        title: "Top Seller",
        description: "Achieved over 200 sales milestone",
        earnedDate: "2023-11-05",
        icon: "trophy",
      },
    ],
    storeSettings: {
      storeName: "Al-Zahra Silver Atelier",
      storeDescription: "Exquisite Moroccan silver jewelry and traditional metalwork",
      theme: "desert",
      customColors: {
        primary: "#C0C0C0",
        secondary: "#FFD700",
      },
      shippingInfo: "Worldwide shipping available. Premium packaging included.",
      returnPolicy: "30-day return guarantee. Free returns on orders over $200.",
      layoutType: "grid",
      customBranding: true,
      contactInfo: {
        email: "fatima@al-zahra-silver.com",
        businessHours: "10 AM - 7 PM CET",
      },
    },
  },
  {
    id: "4",
    address: "0x9876543210987654321098765432109876543210",
    name: "Jabari Otieno",
    bio: "Innovative ceramic artist from Kenya, creating contemporary pottery that tells stories of East African culture and wildlife conservation.",
    story:
      "From Nairobi's vibrant art scene, I create ceramics that celebrate East African wildlife and our deep connection to the land.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces",
    bannerImage:
      "https://images.unsplash.com/photo-1631125915902-d8abe9225ff2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    verified: false,
    featured: false,
    location: "Nairobi, Kenya",
    country: "Kenya",
    city: "Nairobi",
    ensName: "jabari.eth",
    joinedDate: "2023-05-08",
    socialMedia: {
      instagram: "https://instagram.com/jabari_ceramics",
      twitter: "https://twitter.com/jabariotieno",
      website: "https://jabari-pottery.co.ke",
    },
    specialties: ["Ceramics", "Pottery", "Contemporary Art", "Wildlife Art"],
    categories: ["Ceramics", "Contemporary Art"],
    languages: ["English", "Swahili", "Luo"],
    stats: {
      totalProducts: 14,
      totalSales: 42,
      rating: 4.7,
      followers: 890,
      following: 23,
      reviews: 28,
      joinedDate: "2023-05-08",
      lastActive: "2024-12-28",
    },
    achievements: [
      {
        id: "rising-star",
        title: "Rising Star",
        description: "Promising new artist with growing recognition",
        earnedDate: "2023-07-12",
        icon: "star",
      },
    ],
    storeSettings: {
      storeName: "Jabari's Clay Stories",
      storeDescription: "Contemporary ceramics inspired by East African heritage",
      theme: "savanna",
      customColors: {
        primary: "#CD853F",
        secondary: "#F4A460",
      },
      shippingInfo: "Ships from Kenya. Carefully packaged for safe delivery.",
      returnPolicy: "Returns accepted for damaged items within 7 days of delivery.",
      layoutType: "grid",
      customBranding: false,
    },
  },
  {
    id: "5",
    address: "0x5555555555555555555555555555555555555555",
    name: "Aisha Traoré",
    bio: "Traditional basket weaver and contemporary fiber artist from Senegal, creating functional art pieces that bridge ancient techniques with modern aesthetics.",
    story:
      "In the heart of Dakar, I weave stories into baskets, each pattern telling tales of Senegalese women's strength and creativity.",
    avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=200&h=200&fit=crop&crop=faces",
    bannerImage:
      "https://images.unsplash.com/photo-1572796078439-ad087023b3b9?q=80&w=1263&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    verified: true,
    featured: false,
    location: "Dakar, Senegal",
    country: "Senegal",
    city: "Dakar",
    joinedDate: "2023-03-12",
    socialMedia: {
      instagram: "https://instagram.com/aisha_weaves",
      facebook: "https://facebook.com/aishatraorebaskets",
    },
    specialties: ["Basket Weaving", "Fiber Art", "Traditional Crafts", "Home Decor"],
    categories: ["Fiber Arts", "Traditional Crafts"],
    languages: ["French", "Wolof", "English"],
    stats: {
      totalProducts: 22,
      totalSales: 78,
      rating: 4.8,
      followers: 1340,
      following: 41,
      reviews: 56,
      joinedDate: "2023-03-12",
      lastActive: "2024-12-30",
    },
    achievements: [
      {
        id: "artisan-master",
        title: "Artisan Master",
        description: "Recognized expertise in traditional weaving techniques",
        earnedDate: "2023-08-20",
        icon: "star",
      },
    ],
    storeSettings: {
      storeName: "Traoré Fiber Arts",
      storeDescription: "Traditional Senegalese baskets and contemporary fiber art",
      theme: "ocean",
      customColors: {
        primary: "#4682B4",
        secondary: "#87CEEB",
      },
      shippingInfo: "Ships worldwide from Senegal. Eco-friendly packaging used.",
      returnPolicy: "30-day return policy. Original packaging required.",
      layoutType: "list",
      customBranding: true,
      contactInfo: {
        email: "aisha@traore-fiber.com",
        businessHours: "8 AM - 5 PM GMT",
      },
    },
  },
  {
    id: "6",
    address: "0x7777777777777777777777777777777777777777",
    name: "Kofi Mensah",
    bio: "Digital artist and traditional Kente weaver, creating NFTs and physical textiles that celebrate Ghanaian culture in the digital age.",
    story:
      "Bridging tradition and innovation, I bring centuries-old Kente patterns into the digital realm while honoring our cultural heritage.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces",
    bannerImage:
      "https://images.unsplash.com/photo-1640161704729-cbe966a08476?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    verified: true,
    featured: true,
    location: "Accra, Ghana",
    country: "Ghana",
    city: "Accra",
    ensName: "kofi.eth",
    joinedDate: "2022-12-03",
    socialMedia: {
      twitter: "https://twitter.com/kofi_digital",
      instagram: "https://instagram.com/kofi_kente_nft",
      website: "https://kofimensah.art",
      opensea: "https://opensea.io/kofimensah",
    },
    specialties: ["Digital Art", "NFTs", "Kente Weaving", "Cultural Heritage"],
    categories: ["Digital Art", "Textiles"],
    languages: ["English", "Twi", "Ga"],
    stats: {
      totalProducts: 45,
      totalSales: 267,
      rating: 4.9,
      followers: 3200,
      following: 89,
      reviews: 134,
      joinedDate: "2022-12-03",
      lastActive: "2024-12-31",
    },
    achievements: [
      {
        id: "digital-pioneer",
        title: "Digital Pioneer",
        description: "Leading the way in African digital art and NFTs",
        earnedDate: "2023-02-14",
        icon: "star",
      },
      {
        id: "top-seller",
        title: "Top Seller",
        description: "Achieved over 250 sales milestone",
        earnedDate: "2023-10-01",
        icon: "trophy",
      },
      {
        id: "community-leader",
        title: "Community Leader",
        description: "Active in supporting fellow African artists",
        earnedDate: "2023-08-15",
        icon: "heart",
      },
    ],
    storeSettings: {
      storeName: "Kofi's Cultural Canvas",
      storeDescription: "Where traditional Kente meets digital innovation",
      theme: "vibrant",
      customColors: {
        primary: "#FF6B35",
        secondary: "#F7931E",
      },
      shippingInfo: "Digital items delivered instantly. Physical items ship from Ghana.",
      returnPolicy: "Digital items non-refundable. Physical items: 14-day return window.",
      layoutType: "masonry",
      customBranding: true,
      contactInfo: {
        email: "kofi@cultural-canvas.art",
        businessHours: "9 AM - 9 PM GMT",
      },
    },
  },
];

export const getCreatorById = (id: string): CreatorProfile | undefined => {
  return creators.find(creator => creator.id === id);
};

export const getVerifiedCreators = (): CreatorProfile[] => {
  return creators.filter(creator => creator.verified);
};

export const getFeaturedCreators = (): CreatorProfile[] => {
  return creators.filter(creator => creator.featured);
};

export const getCreatorsByCountry = (country: string): CreatorProfile[] => {
  return creators.filter(creator => creator.country.toLowerCase() === country.toLowerCase());
};

export const searchCreators = (query: string): CreatorProfile[] => {
  const searchTerm = query.toLowerCase();
  return creators.filter(
    creator =>
      creator.name.toLowerCase().includes(searchTerm) ||
      creator.bio.toLowerCase().includes(searchTerm) ||
      creator.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm)) ||
      creator.location.toLowerCase().includes(searchTerm),
  );
};
