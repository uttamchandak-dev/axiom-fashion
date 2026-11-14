// ─── Product Types ───────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  categoryId: string;
  category: string;
  collectionId?: string;
  collection?: string;
  images: string[];
  model3D?: string;
  colors: ProductColor[];
  sizes: ProductSize[];
  materials: string[];
  variants: ProductVariant[];
  tags: string[];
  featured: boolean;
  status: 'active' | 'draft' | 'archived';
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  Review?: any[];
}

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  name: string;
  available: boolean;
  measurements?: SizeMeasurements;
}

export interface SizeMeasurements {
  chest?: string;
  waist?: string;
  hips?: string;
  length?: string;
  shoulders?: string;
  sleeve?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  color: string;
  size: string;
  sku: string;
  price: number;
  inventory: number;
}

// ─── 3D Model Types ─────────────────────────────────────────────────────────

export interface Model3D {
  id: string;
  productId: string;
  desktopModel: string;
  mobileModel?: string;
  thumbnail: string;
  materials: ModelMaterial[];
  hotspots: ModelHotspot[];
}

export interface ModelMaterial {
  id: string;
  name: string;
  type: 'cotton' | 'denim' | 'wool' | 'leather' | 'nylon' | 'silk' | 'custom';
  baseColor: string;
  roughness: number;
  metalness: number;
  normalMap?: string;
  textureMap?: string;
  aoMap?: string;
}

export interface ModelHotspot {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  cameraTarget: [number, number, number];
  cameraPosition: [number, number, number];
}

// ─── Collection Types ───────────────────────────────────────────────────────

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  heroImage: string;
  products: string[]; // product IDs
  status: 'active' | 'draft';
}

// ─── Lookbook Types ─────────────────────────────────────────────────────────

export interface Lookbook {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  looks: Look[];
}

export interface Look {
  id: string;
  number: number;
  title: string;
  description: string;
  image: string;
  productIds: string[];
}

// ─── Cart Types ─────────────────────────────────────────────────────────────

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  color: string;
  colorHex: string;
  size: string;
  quantity: number;
  maxQuantity: number;
}

// ─── Wishlist Types ─────────────────────────────────────────────────────────

export interface WishlistItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  colors: ProductColor[];
  addedAt: string;
}

// ─── Order Types ────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone?: string;
}

// ─── Customer Types ─────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  addresses: Address[];
  orders: string[];
  wishlist: string[];
  createdAt: string;
}

// ─── Search Types ───────────────────────────────────────────────────────────

export interface SearchResult {
  products: Product[];
  collections: Collection[];
  totalResults: number;
}

// ─── Analytics Types ────────────────────────────────────────────────────────

export type AnalyticsEvent =
  | 'product_view'
  | '3d_viewer_opened'
  | '3d_rotate'
  | '3d_zoom'
  | '3d_color_change'
  | '3d_material_change'
  | '3d_hotspot_click'
  | '3d_fullscreen'
  | 'add_to_cart'
  | 'checkout_started'
  | 'purchase_completed'
  | 'wishlist_added'
  | 'search_performed';
