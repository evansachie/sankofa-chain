export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  stats: string;
  color: string;
}

export const features: Feature[] = [
  {
    id: 1,
    title: "IP Protection",
    description:
      "Blockchain-based intellectual property protection for African creators and their traditional patterns.",
    icon: "https://images.unsplash.com/photo-1516542076529-1ea3854896f2?w=100&h=100&fit=crop",
    stats: "1000+ Protected",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 2,
    title: "Automated Royalties",
    description:
      "Smart contract-powered royalty distribution ensuring creators are compensated whenever their patterns are used.",
    icon: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&h=100&fit=crop",
    stats: "99.9% Accuracy",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 3,
    title: "Verified Authenticity",
    description: "Every product comes with blockchain certificates guaranteeing authentic African craftsmanship.",
    icon: "https://images.unsplash.com/photo-1621419203897-20b66b98d495?w=100&h=100&fit=crop",
    stats: "100% Verified",
    color: "from-violet-500 to-purple-500",
  },
  {
    id: 4,
    title: "Global Marketplace",
    description:
      "Connect African creators directly with global consumers, eliminating intermediaries and maximizing profits.",
    icon: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&h=100&fit=crop",
    stats: "50+ Countries",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Cultural Heritage",
    description:
      "Preserve and celebrate African cultural heritage through digital commerce and community storytelling.",
    icon: "https://images.unsplash.com/photo-1621419203897-20b66b98d495?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    stats: "500+ Stories",
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 6,
    title: "Trust Network",
    description: "ENS and EFP-based reputation system building trust and credibility in the African marketplace.",
    icon: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
    stats: "95% Trust Score",
    color: "from-green-500 to-emerald-500",
  },
];
