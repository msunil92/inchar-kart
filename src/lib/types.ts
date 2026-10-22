export type Category =
  | "Phones"
  | "Computers"
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Beauty"
  | "Sports"
  | "Audio";

export interface Review {
  id: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  features: string[];
  image: string;
  accent: string;
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: string;
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  postal: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}
