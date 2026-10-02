export interface Product {
  id: string;
  number: string;
  name: string;
  category: 'Outerwear' | 'Tops' | 'Trousers' | 'Knitwear' | 'Accessories';
  subCategory?: string;
  price: number;
  originalPrice?: number;
  colorName: string;
  colorHex: string;
  availableColors: { name: string; hex: string; image: string }[];
  sizes: string[];
  primaryImage: string;
  secondaryImage: string;
  galleryImages: string[];
  shortDescription: string;
  editorialDescription: string;
  details: string[];
  fit: string;
  composition: string;
  care: string[];
  isNewArrival?: boolean;
  isEssential?: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique composite: productId-size-color
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface LookbookItem {
  id: string;
  title: string;
  season: string;
  image: string;
  aspect: 'portrait' | 'landscape' | 'full';
  caption: string;
  hotspots: {
    x: number; // percentage
    y: number;
    productId: string;
    label: string;
    price: number;
  }[];
}

export type ActiveView = 'home' | 'collection' | 'lookbook' | 'story' | 'try-on';
