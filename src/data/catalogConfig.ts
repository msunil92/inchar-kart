import type { Category } from "@/lib/types";

export const categories: Category[] = [
  "Phones",
  "Computers",
  "Electronics",
  "Audio",
  "Fashion",
  "Home",
  "Beauty",
  "Sports",
];

/** Cover images for category aisle cards (verified Unsplash URLs). */
export const categoryImages: Record<Category, string[]> = {
  Phones: [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
  ],
  Computers: [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80",
  ],
  Electronics: [
    "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
  ],
  Audio: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
  ],
  Fashion: [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  ],
  Home: [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
  ],
  Beauty: [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
  ],
  Sports: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  ],
};
