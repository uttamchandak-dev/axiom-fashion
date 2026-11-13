// ─── Site Constants ─────────────────────────────────────────────────────────

export const SITE_NAME = 'AXIOM';
export const SITE_DESCRIPTION = 'Premium fashion. Crafted with intention.';
export const SITE_URL = 'https://axiom.fashion';

// ─── Navigation ─────────────────────────────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
] as const;

export const SHOP_CATEGORIES = [
  { label: 'All Products', href: '/shop', slug: 'all' },
  { label: 'Men', href: '/shop?category=men', slug: 'men' },
  { label: 'Women', href: '/shop?category=women', slug: 'women' },
  { label: 'Unisex', href: '/shop?category=unisex', slug: 'unisex' },
  { label: 'New Arrivals', href: '/shop?sort=newest', slug: 'new-arrivals' },
  { label: 'Sale', href: '/shop?sale=true', slug: 'sale' },
] as const;

// ─── Product ────────────────────────────────────────────────────────────────

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;

export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Popular', value: 'popular' },
] as const;

export const MATERIAL_TYPES = [
  'Cotton',
  'Denim',
  'Wool',
  'Leather',
  'Nylon',
  'Silk',
  'Cashmere',
  'Linen',
  'Polyester',
] as const;

// ─── 3D Viewer ──────────────────────────────────────────────────────────────

export const CAMERA_PRESETS = {
  front: { position: [0, 0, 3] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  back: { position: [0, 0, -3] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  left: { position: [-3, 0, 0] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  right: { position: [3, 0, 0] as [number, number, number], target: [0, 0, 0] as [number, number, number] },
  detail: { position: [1, 1, 1.5] as [number, number, number], target: [0, 0.5, 0] as [number, number, number] },
} as const;

export const DPR_LIMITS = {
  desktop: [1, 2] as [number, number],
  mobile: [1, 1.5] as [number, number],
};

// ─── Footer ─────────────────────────────────────────────────────────────────

export const FOOTER_LINKS = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'New Arrivals', href: '/shop?sort=newest' },
    { label: 'Collections', href: '/collections' },
    { label: 'Sale', href: '/shop?sale=true' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Lookbook', href: '/lookbook' },
    { label: 'Sustainability', href: '/about#sustainability' },
    { label: 'Careers', href: '/about#careers' },
  ],
  support: [
    { label: 'Contact', href: '/about#contact' },
    { label: 'Shipping', href: '/about#shipping' },
    { label: 'Returns', href: '/about#returns' },
    { label: 'Size Guide', href: '/about#size-guide' },
  ],
} as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#', icon: 'instagram' },
  { label: 'Twitter', href: '#', icon: 'twitter' },
  { label: 'Pinterest', href: '#', icon: 'pinterest' },
] as const;
