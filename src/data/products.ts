import { Product, Collection } from '@/types';

// ─── Product Colors ─────────────────────────────────────────────────────────

const BLACK = { name: 'Black', hex: '#0a0a0a' };
const WHITE = { name: 'White', hex: '#fafafa' };
const NAVY = { name: 'Navy', hex: '#1a1a3e' };
const CHARCOAL = { name: 'Charcoal', hex: '#36454f' };
const CAMEL = { name: 'Camel', hex: '#c19a6b' };
const OLIVE = { name: 'Olive', hex: '#556b2f' };
const BURGUNDY = { name: 'Burgundy', hex: '#722f37' };
const SLATE = { name: 'Slate', hex: '#708090' };
const IVORY = { name: 'Ivory', hex: '#fffff0' };
const SAND = { name: 'Sand', hex: '#c2b280' };
const FOREST = { name: 'Forest', hex: '#228b22' };
const STONE = { name: 'Stone', hex: '#928e85' };

// ─── Standard Sizes ─────────────────────────────────────────────────────────

const ALL_SIZES = [
  { name: 'XS', available: true },
  { name: 'S', available: true },
  { name: 'M', available: true },
  { name: 'L', available: true },
  { name: 'XL', available: true },
  { name: 'XXL', available: true },
];

const LIMITED_SIZES = [
  { name: 'XS', available: false },
  { name: 'S', available: true },
  { name: 'M', available: true },
  { name: 'L', available: true },
  { name: 'XL', available: true },
  { name: 'XXL', available: false },
];

// ─── Mock Products ──────────────────────────────────────────────────────────

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Structured Wool Overcoat',
    slug: 'structured-wool-overcoat',
    description: 'A masterfully tailored overcoat in premium Italian wool. Clean lines and a structured silhouette define this essential outerwear piece, designed for the modern wardrobe.',
    price: 389,
    compareAtPrice: undefined,
    categoryId: 'cat-men',
    category: 'Men',
    collectionId: 'col-autumn',
    collection: 'Autumn Essentials',
    images: ['/images/products/overcoat-1.jpg'],
    model3D: undefined,
    colors: [BLACK, CHARCOAL, CAMEL, NAVY],
    sizes: ALL_SIZES,
    materials: ['Wool', 'Cashmere'],
    variants: [
      { id: 'v-001-1', productId: 'prod-001', color: 'Black', size: 'M', sku: 'AX-OC-BK-M', price: 389, inventory: 12 },
      { id: 'v-001-2', productId: 'prod-001', color: 'Black', size: 'L', sku: 'AX-OC-BK-L', price: 389, inventory: 8 },
      { id: 'v-001-3', productId: 'prod-001', color: 'Camel', size: 'M', sku: 'AX-OC-CM-M', price: 389, inventory: 5 },
    ],
    tags: ['outerwear', 'wool', 'premium', 'coat'],
    featured: true,
    status: 'active',
    rating: 4.8,
    reviewCount: 124,
    createdAt: '2025-08-01T00:00:00Z',
    updatedAt: '2025-08-20T00:00:00Z',
  },
  {
    id: 'prod-002',
    name: 'Relaxed Cotton T-Shirt',
    slug: 'relaxed-cotton-tshirt',
    description: 'Heavyweight organic cotton tee with a relaxed, boxy fit. Drop shoulders and a clean neckline create an effortlessly refined silhouette.',
    price: 68,
    compareAtPrice: undefined,
    categoryId: 'cat-unisex',
    category: 'Unisex',
    collectionId: 'col-urban',
    collection: 'Urban Edge',
    images: ['/images/products/tshirt-1.jpg'],
    model3D: undefined,
    colors: [WHITE, BLACK, OLIVE, SLATE],
    sizes: ALL_SIZES,
    materials: ['Cotton'],
    variants: [
      { id: 'v-002-1', productId: 'prod-002', color: 'White', size: 'S', sku: 'AX-TS-WH-S', price: 68, inventory: 30 },
      { id: 'v-002-2', productId: 'prod-002', color: 'White', size: 'M', sku: 'AX-TS-WH-M', price: 68, inventory: 25 },
      { id: 'v-002-3', productId: 'prod-002', color: 'Black', size: 'M', sku: 'AX-TS-BK-M', price: 68, inventory: 20 },
    ],
    tags: ['basics', 'cotton', 'tshirt', 'essential'],
    featured: true,
    status: 'active',
    rating: 4.6,
    reviewCount: 312,
    createdAt: '2025-07-15T00:00:00Z',
    updatedAt: '2025-08-15T00:00:00Z',
  },
  {
    id: 'prod-003',
    name: 'Tailored Denim Jacket',
    slug: 'tailored-denim-jacket',
    description: 'Japanese selvedge denim, washed to a refined mid-tone. Tailored fit with architectural seaming and hidden metal hardware.',
    price: 245,
    compareAtPrice: 295,
    categoryId: 'cat-men',
    category: 'Men',
    collectionId: 'col-urban',
    collection: 'Urban Edge',
    images: ['/images/products/denim-jacket-1.jpg'],
    model3D: undefined,
    colors: [{ name: 'Indigo', hex: '#3f5277' }, BLACK, { name: 'Washed Blue', hex: '#6b8cae' }],
    sizes: LIMITED_SIZES,
    materials: ['Denim', 'Cotton'],
    variants: [
      { id: 'v-003-1', productId: 'prod-003', color: 'Indigo', size: 'M', sku: 'AX-DJ-IN-M', price: 245, inventory: 7 },
      { id: 'v-003-2', productId: 'prod-003', color: 'Black', size: 'L', sku: 'AX-DJ-BK-L', price: 245, inventory: 4 },
    ],
    tags: ['denim', 'jacket', 'japanese', 'selvedge'],
    featured: true,
    status: 'active',
    rating: 4.9,
    reviewCount: 87,
    createdAt: '2025-08-05T00:00:00Z',
    updatedAt: '2025-08-18T00:00:00Z',
  },
  {
    id: 'prod-004',
    name: 'Merino Knit Sweater',
    slug: 'merino-knit-sweater',
    description: 'Ultra-fine merino wool in a relaxed gauge knit. Ribbed cuffs and hem with a minimalist crew neck. Designed to layer or stand alone.',
    price: 178,
    compareAtPrice: undefined,
    categoryId: 'cat-unisex',
    category: 'Unisex',
    collectionId: 'col-autumn',
    collection: 'Autumn Essentials',
    images: ['/images/products/sweater-1.jpg'],
    model3D: undefined,
    colors: [CAMEL, CHARCOAL, IVORY, BURGUNDY],
    sizes: ALL_SIZES,
    materials: ['Wool', 'Cashmere'],
    variants: [
      { id: 'v-004-1', productId: 'prod-004', color: 'Camel', size: 'M', sku: 'AX-KS-CM-M', price: 178, inventory: 15 },
      { id: 'v-004-2', productId: 'prod-004', color: 'Charcoal', size: 'L', sku: 'AX-KS-CH-L', price: 178, inventory: 10 },
    ],
    tags: ['knitwear', 'merino', 'wool', 'sweater'],
    featured: false,
    status: 'active',
    rating: 4.7,
    reviewCount: 198,
    createdAt: '2025-07-20T00:00:00Z',
    updatedAt: '2025-08-10T00:00:00Z',
  },
  {
    id: 'prod-005',
    name: 'Wide-Leg Trousers',
    slug: 'wide-leg-trousers',
    description: 'Fluid wide-leg trousers in a matte crepe fabrication. High rise with a clean front and relaxed drape. Effortlessly modern.',
    price: 198,
    compareAtPrice: undefined,
    categoryId: 'cat-women',
    category: 'Women',
    collectionId: 'col-classic',
    collection: 'Classic Heritage',
    images: ['/images/products/silk-shirt-1.jpg'],
    model3D: undefined,
    colors: [BLACK, IVORY, NAVY, SAND],
    sizes: ALL_SIZES,
    materials: ['Polyester', 'Cotton'],
    variants: [
      { id: 'v-005-1', productId: 'prod-005', color: 'Black', size: 'S', sku: 'AX-WT-BK-S', price: 198, inventory: 18 },
      { id: 'v-005-2', productId: 'prod-005', color: 'Ivory', size: 'M', sku: 'AX-WT-IV-M', price: 198, inventory: 12 },
    ],
    tags: ['trousers', 'wide-leg', 'women', 'tailored'],
    featured: false,
    status: 'active',
    rating: 4.5,
    reviewCount: 76,
    createdAt: '2025-08-10T00:00:00Z',
    updatedAt: '2025-08-20T00:00:00Z',
  },
  {
    id: 'prod-006',
    name: 'Silk Button-Down Shirt',
    slug: 'silk-button-down-shirt',
    description: 'Washed silk with a soft hand feel and natural drape. Oversized fit with mother-of-pearl buttons and a concealed placket.',
    price: 265,
    compareAtPrice: undefined,
    categoryId: 'cat-women',
    category: 'Women',
    collectionId: 'col-classic',
    collection: 'Classic Heritage',
    images: ['/images/products/silk-shirt-1.jpg'],
    model3D: undefined,
    colors: [IVORY, BLACK, { name: 'Blush', hex: '#de9b9b' }, OLIVE],
    sizes: LIMITED_SIZES,
    materials: ['Silk'],
    variants: [
      { id: 'v-006-1', productId: 'prod-006', color: 'Ivory', size: 'S', sku: 'AX-SS-IV-S', price: 265, inventory: 6 },
      { id: 'v-006-2', productId: 'prod-006', color: 'Black', size: 'M', sku: 'AX-SS-BK-M', price: 265, inventory: 8 },
    ],
    tags: ['silk', 'shirt', 'luxury', 'button-down'],
    featured: true,
    status: 'active',
    rating: 4.9,
    reviewCount: 156,
    createdAt: '2025-07-25T00:00:00Z',
    updatedAt: '2025-08-15T00:00:00Z',
  },
  {
    id: 'prod-007',
    name: 'Technical Nylon Parka',
    slug: 'technical-nylon-parka',
    description: 'Waterproof technical nylon with sealed seams and articulated hood. Utility-inspired design meets precision tailoring.',
    price: 425,
    compareAtPrice: 495,
    categoryId: 'cat-men',
    category: 'Men',
    collectionId: 'col-urban',
    collection: 'Urban Edge',
    images: ['/images/products/overcoat-1.jpg'],
    model3D: undefined,
    colors: [BLACK, OLIVE, NAVY],
    sizes: ALL_SIZES,
    materials: ['Nylon'],
    variants: [
      { id: 'v-007-1', productId: 'prod-007', color: 'Black', size: 'L', sku: 'AX-NP-BK-L', price: 425, inventory: 4 },
      { id: 'v-007-2', productId: 'prod-007', color: 'Olive', size: 'M', sku: 'AX-NP-OL-M', price: 425, inventory: 6 },
    ],
    tags: ['parka', 'outerwear', 'technical', 'waterproof'],
    featured: false,
    status: 'active',
    rating: 4.7,
    reviewCount: 63,
    createdAt: '2025-08-12T00:00:00Z',
    updatedAt: '2025-08-22T00:00:00Z',
  },
  {
    id: 'prod-008',
    name: 'Cashmere Turtleneck',
    slug: 'cashmere-turtleneck',
    description: 'Pure Grade-A Mongolian cashmere in a fine-gauge knit. Folded turtleneck with reinforced seams and a relaxed body.',
    price: 345,
    compareAtPrice: undefined,
    categoryId: 'cat-unisex',
    category: 'Unisex',
    collectionId: 'col-autumn',
    collection: 'Autumn Essentials',
    images: ['/images/products/sweater-1.jpg'],
    model3D: undefined,
    colors: [CHARCOAL, CAMEL, IVORY, STONE],
    sizes: ALL_SIZES,
    materials: ['Cashmere'],
    variants: [
      { id: 'v-008-1', productId: 'prod-008', color: 'Charcoal', size: 'S', sku: 'AX-CT-CH-S', price: 345, inventory: 5 },
      { id: 'v-008-2', productId: 'prod-008', color: 'Camel', size: 'M', sku: 'AX-CT-CM-M', price: 345, inventory: 7 },
    ],
    tags: ['cashmere', 'knitwear', 'turtleneck', 'luxury'],
    featured: true,
    status: 'active',
    rating: 4.9,
    reviewCount: 214,
    createdAt: '2025-07-10T00:00:00Z',
    updatedAt: '2025-08-05T00:00:00Z',
  },
  {
    id: 'prod-009',
    name: 'Leather Moto Jacket',
    slug: 'leather-moto-jacket',
    description: 'Full-grain lamb leather with asymmetric zip closure. Slim, architectural fit with antiqued hardware and quilted liner.',
    price: 595,
    compareAtPrice: undefined,
    categoryId: 'cat-women',
    category: 'Women',
    collectionId: 'col-urban',
    collection: 'Urban Edge',
    images: ['/images/products/leather-jacket-1.jpg'],
    model3D: undefined,
    colors: [BLACK, BURGUNDY, { name: 'Cognac', hex: '#9a4e29' }],
    sizes: LIMITED_SIZES,
    materials: ['Leather'],
    variants: [
      { id: 'v-009-1', productId: 'prod-009', color: 'Black', size: 'S', sku: 'AX-LJ-BK-S', price: 595, inventory: 3 },
      { id: 'v-009-2', productId: 'prod-009', color: 'Black', size: 'M', sku: 'AX-LJ-BK-M', price: 595, inventory: 4 },
    ],
    tags: ['leather', 'jacket', 'moto', 'premium'],
    featured: false,
    status: 'active',
    rating: 4.8,
    reviewCount: 92,
    createdAt: '2025-08-08T00:00:00Z',
    updatedAt: '2025-08-20T00:00:00Z',
  },
  {
    id: 'prod-010',
    name: 'Linen Drawstring Trousers',
    slug: 'linen-drawstring-trousers',
    description: 'Garment-dyed French linen with an elastic drawstring waist. Tapered leg with a relaxed drape. Summer essential.',
    price: 148,
    compareAtPrice: undefined,
    categoryId: 'cat-men',
    category: 'Men',
    collectionId: 'col-classic',
    collection: 'Classic Heritage',
    images: ['/images/products/tshirt-1.jpg'],
    model3D: undefined,
    colors: [SAND, WHITE, OLIVE, SLATE],
    sizes: ALL_SIZES,
    materials: ['Linen'],
    variants: [
      { id: 'v-010-1', productId: 'prod-010', color: 'Sand', size: 'M', sku: 'AX-LT-SD-M', price: 148, inventory: 20 },
      { id: 'v-010-2', productId: 'prod-010', color: 'White', size: 'L', sku: 'AX-LT-WH-L', price: 148, inventory: 15 },
    ],
    tags: ['linen', 'trousers', 'summer', 'relaxed'],
    featured: false,
    status: 'active',
    rating: 4.4,
    reviewCount: 167,
    createdAt: '2025-06-20T00:00:00Z',
    updatedAt: '2025-08-01T00:00:00Z',
  },
  {
    id: 'prod-011',
    name: 'Cropped Wool Blazer',
    slug: 'cropped-wool-blazer',
    description: 'Double-breasted cropped blazer in fine Italian wool. Sharp shoulders and a nipped waist create a powerful silhouette.',
    price: 355,
    compareAtPrice: undefined,
    categoryId: 'cat-women',
    category: 'Women',
    collectionId: 'col-classic',
    collection: 'Classic Heritage',
    images: ['/images/products/overcoat-1.jpg'],
    model3D: undefined,
    colors: [BLACK, CHARCOAL, CAMEL],
    sizes: LIMITED_SIZES,
    materials: ['Wool'],
    variants: [
      { id: 'v-011-1', productId: 'prod-011', color: 'Black', size: 'S', sku: 'AX-WB-BK-S', price: 355, inventory: 6 },
      { id: 'v-011-2', productId: 'prod-011', color: 'Charcoal', size: 'M', sku: 'AX-WB-CH-M', price: 355, inventory: 4 },
    ],
    tags: ['blazer', 'wool', 'tailored', 'women'],
    featured: true,
    status: 'active',
    rating: 4.8,
    reviewCount: 134,
    createdAt: '2025-07-28T00:00:00Z',
    updatedAt: '2025-08-18T00:00:00Z',
  },
  {
    id: 'prod-012',
    name: 'Essential Hoodie',
    slug: 'essential-hoodie',
    description: 'Heavyweight loopback cotton fleece with a brushed interior. Oversized fit, kangaroo pocket, and minimal branding.',
    price: 128,
    compareAtPrice: undefined,
    categoryId: 'cat-unisex',
    category: 'Unisex',
    collectionId: 'col-urban',
    collection: 'Urban Edge',
    images: ['/images/products/hoodie-1.jpg'],
    model3D: undefined,
    colors: [BLACK, CHARCOAL, FOREST, SLATE, WHITE],
    sizes: ALL_SIZES,
    materials: ['Cotton'],
    variants: [
      { id: 'v-012-1', productId: 'prod-012', color: 'Black', size: 'M', sku: 'AX-EH-BK-M', price: 128, inventory: 25 },
      { id: 'v-012-2', productId: 'prod-012', color: 'Charcoal', size: 'L', sku: 'AX-EH-CH-L', price: 128, inventory: 18 },
      { id: 'v-012-3', productId: 'prod-012', color: 'Forest', size: 'M', sku: 'AX-EH-FR-M', price: 128, inventory: 12 },
    ],
    tags: ['hoodie', 'cotton', 'essential', 'basics'],
    featured: false,
    status: 'active',
    rating: 4.6,
    reviewCount: 289,
    createdAt: '2025-06-15T00:00:00Z',
    updatedAt: '2025-08-10T00:00:00Z',
  },
];

// ─── Mock Collections ───────────────────────────────────────────────────────

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'col-autumn',
    name: 'Autumn Essentials',
    slug: 'autumn-essentials',
    description: 'Seasonal staples in warm tones and premium natural fibers. Designed for the transition between warmth and cold.',
    heroImage: '/images/collections/autumn.jpg',
    products: ['prod-001', 'prod-004', 'prod-008'],
    status: 'active',
  },
  {
    id: 'col-urban',
    name: 'Urban Edge',
    slug: 'urban-edge',
    description: 'Contemporary city-ready pieces that balance technical performance with refined aesthetics.',
    heroImage: '/images/collections/urban.jpg',
    products: ['prod-002', 'prod-003', 'prod-007', 'prod-009', 'prod-012'],
    status: 'active',
  },
  {
    id: 'col-classic',
    name: 'Classic Heritage',
    slug: 'classic-heritage',
    description: 'Timeless silhouettes reimagined with modern construction and premium materials. Built to endure.',
    heroImage: '/images/collections/classic.jpg',
    products: ['prod-005', 'prod-006', 'prod-010', 'prod-011'],
    status: 'active',
  },
];

// ─── Helper Functions ───────────────────────────────────────────────────────

export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return MOCK_COLLECTIONS.find((c) => c.slug === slug);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.collectionId === collectionId);
}

export function getProductsByCategory(category: string): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.featured);
}

export function getNewArrivals(count: number = 4): Product[] {
  return [...MOCK_PRODUCTS]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.collection?.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.colors.some((c) => c.name.toLowerCase().includes(q)) ||
      p.materials.some((m) => m.toLowerCase().includes(q))
  );
}
