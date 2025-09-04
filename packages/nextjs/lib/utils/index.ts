import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Price formatting utility
export function formatPrice(price: { amount: number; currency: string }) {
  if (price.currency === "ETH") {
    return `${price.amount.toFixed(4)} ETH`;
  }
  if (price.currency === "SANKOFA") {
    return `${price.amount.toLocaleString()} $SANKOFA`;
  }
  return `${price.amount.toLocaleString()} ${price.currency}`;
}

// Date formatting utility
export function formatDate(date: Date | string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Truncate text utility
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// Format number with commas
export function formatNumber(num: number) {
  return num.toLocaleString();
}

// Generate initials from name
export function getInitials(name: string) {
  return name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
