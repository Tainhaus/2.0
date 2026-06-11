// src/types/index.ts

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  salePrice?: number | null;
  category: string;
  useCase: string[];
  sizes: ProductSize[];
  images: ProductImage[];
  features: string[];
  specs: Record<string, string>;
  finishes: Finish[];
  inStock: boolean;
  featured: boolean;
  bestseller: boolean;
  new: boolean;
  rating: number;
  reviewCount: number;
  leadTime: string;
  warranty: string;
  reviews?: Review[];
};

export type ProductSize = {
  id: string;
  label: string;
  widthM: number;
  depthM: number;
  heightM: number;
  sqm: number;
  priceAdder: number;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
};

export type Finish = {
  id: string;
  name: string;
  hexColor?: string | null;
  imageUrl?: string | null;
  priceAdder: number;
};

export type Review = {
  id: string;
  rating: number;
  title: string;
  body: string;
  authorName: string;
  authorAge?: string | null;
  authorUse?: string | null;
  verified: boolean;
  createdAt: Date;
};

export type CartItem = {
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: ProductSize;
  selectedFinish?: Finish;
  useCase?: string;
  configOptions?: Record<string, string>;
  unitPrice: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
  itemCount: number;
};

export type ConfiguratorState = {
  product: Product | null;
  selectedSize: ProductSize | null;
  selectedFinish: Finish | null;
  selectedUseCase: string | null;
  selectedAddons: string[];
  totalPrice: number;
};

export type FilterState = {
  category: string[];
  useCase: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: "featured" | "price-asc" | "price-desc" | "rating" | "newest";
};

export const USE_CASES = [
  { id: "HOME_OFFICE", label: "Home Office", icon: "💼" },
  { id: "GYM_WELLNESS", label: "Gym & Wellness", icon: "🏃" },
  { id: "ART_STUDIO", label: "Art Studio", icon: "🎨" },
  { id: "SAUNA_SPA", label: "Sauna & Spa", icon: "🧖" },
  { id: "GUEST_ROOM", label: "Guest Room", icon: "🛏" },
  { id: "ENTERTAINMENT", label: "Entertainment", icon: "🎬" },
  { id: "READING_RETREAT", label: "Reading Retreat", icon: "📚" },
  { id: "YOGA_STUDIO", label: "Yoga Studio", icon: "🧘" },
  { id: "MUSIC_STUDIO", label: "Music Studio", icon: "🎵" },
  { id: "GARDEN_ROOM", label: "Garden Room", icon: "🌿" },
] as const;

export const CATEGORIES = [
  { id: "LOG_CABIN",    label: "Log Cabins & Garden Rooms" },
  { id: "KITCHEN_POD", label: "Kitchen & Bar Pods" },
] as const;
