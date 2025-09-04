export interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export const steps: Step[] = [
  {
    id: 1,
    title: "Connect Your Wallet",
    description:
      "Set up your crypto wallet and connect it to SankofaChain. We support all major wallets for secure transactions.",
    icon: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=100&h=100&fit=crop",
    features: ["Secure Connection", "Multi-Wallet Support", "Easy Setup"],
  },
  {
    id: 2,
    title: "Discover Authentic Products",
    description:
      "Browse through verified African creators and their authentic products. Filter by category, price, and location.",
    icon: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
    features: ["Verified Creators", "Authentic Products", "Smart Filters"],
  },
  {
    id: 3,
    title: "Purchase & Support Creators",
    description:
      "Buy products directly from creators using crypto payments. Your purchase supports African artisans and their communities.",
    icon: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=100&h=100&fit=crop",
    features: ["Direct Payments", "Creator Support", "Fair Compensation"],
  },
];
