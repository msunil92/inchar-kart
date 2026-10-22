import type { Category } from "@/lib/types";
import { categoryImages } from "@/data/catalogConfig";
import { categories, getCategoryCount } from "@/data/products";

export interface CategoryMeta {
  name: Category;
  tagline: string;
  accent: string;
  image: string;
}

const meta: Record<Category, { tagline: string; accent: string }> = {
  Phones: { tagline: "Smartphones for every budget", accent: "#22d3ee" },
  Computers: { tagline: "Laptops, desktops & accessories", accent: "#fbbf24" },
  Electronics: { tagline: "Keyboards, chargers & gadgets", accent: "#4ade80" },
  Audio: { tagline: "Headphones, speakers & mics", accent: "#a78bfa" },
  Fashion: { tagline: "Watches, bags & everyday style", accent: "#fb7185" },
  Home: { tagline: "Lighting, living & comfort", accent: "#fde68a" },
  Beauty: { tagline: "Skincare, makeup & hair", accent: "#f9a8d4" },
  Sports: { tagline: "Footwear, fitness & outdoor", accent: "#f43f5e" },
};

export function getCategoryAisles(): (CategoryMeta & { count: number })[] {
  return categories.map((name) => ({
    name,
    tagline: meta[name].tagline,
    accent: meta[name].accent,
    image: categoryImages[name][0]!,
    count: getCategoryCount(name),
  }));
}
