import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const COLLECTIONS_DATA = [
  {
    id: 'col-autumn',
    name: 'Autumn Essentials',
    slug: 'autumn-essentials',
    description: 'Seasonal staples in warm tones and premium natural fibers. Designed for the transition between warmth and cold.',
    heroImage: '/images/collections/autumn.jpg',
  },
  {
    id: 'col-urban',
    name: 'Urban Edge',
    slug: 'urban-edge',
    description: 'Contemporary city-ready pieces that balance technical performance with refined aesthetics.',
    heroImage: '/images/collections/urban.jpg',
  },
  {
    id: 'col-classic',
    name: 'Classic Heritage',
    slug: 'classic-heritage',
    description: 'Timeless silhouettes reimagined with modern construction and premium materials. Built to endure.',
    heroImage: '/images/collections/classic.jpg',
  },
];

const PRODUCTS_DATA = [
  {
    id: 'prod-001',
    name: 'Structured Wool Overcoat',
    slug: 'structured-wool-overcoat',
    description: 'A masterfully tailored overcoat in premium Italian wool. Clean lines and a structured silhouette define this essential outerwear piece, designed for the modern wardrobe.',
    price: 389,
    category: 'Men',
    collectionId: 'col-autumn',
    images: ['/images/products/overcoat-1.jpg'],
    materials: ['Wool', 'Cashmere'],
    tags: ['outerwear', 'wool', 'premium', 'coat'],
    featured: true,
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Camel', hex: '#c19a6b' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'prod-002',
    name: 'Relaxed Cotton T-Shirt',
    slug: 'relaxed-cotton-tshirt',
    description: 'Heavyweight organic cotton tee with a relaxed, boxy fit. Drop shoulders and a clean neckline create an effortlessly refined silhouette.',
    price: 68,
    category: 'Unisex',
    collectionId: 'col-urban',
    images: ['/images/products/tshirt-1.jpg'],
    materials: ['Cotton'],
    tags: ['basics', 'cotton', 'tshirt', 'essential'],
    featured: true,
    colors: [
      { name: 'White', hex: '#fafafa' },
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Olive', hex: '#556b2f' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'prod-003',
    name: 'Tailored Denim Jacket',
    slug: 'tailored-denim-jacket',
    description: 'Japanese selvedge denim, washed to a refined mid-tone. Tailored fit with architectural seaming and hidden metal hardware.',
    price: 245,
    compareAtPrice: 295,
    category: 'Men',
    collectionId: 'col-urban',
    images: ['/images/products/denim-jacket-1.jpg'],
    materials: ['Denim', 'Cotton'],
    tags: ['denim', 'jacket', 'japanese', 'selvedge'],
    featured: true,
    colors: [
      { name: 'Indigo', hex: '#3f5277' },
      { name: 'Black', hex: '#0a0a0a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'prod-004',
    name: 'Merino Knit Sweater',
    slug: 'merino-knit-sweater',
    description: 'Ultra-fine merino wool in a relaxed gauge knit. Ribbed cuffs and hem with a minimalist crew neck. Designed to layer or stand alone.',
    price: 178,
    category: 'Unisex',
    collectionId: 'col-autumn',
    images: ['/images/products/sweater-1.jpg'],
    materials: ['Wool', 'Cashmere'],
    tags: ['knitwear', 'merino', 'wool', 'sweater'],
    featured: false,
    colors: [
      { name: 'Camel', hex: '#c19a6b' },
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Ivory', hex: '#fffff0' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'prod-006',
    name: 'Silk Button-Down Shirt',
    slug: 'silk-button-down-shirt',
    description: 'Washed silk with a soft hand feel and natural drape. Oversized fit with mother-of-pearl buttons and a concealed placket.',
    price: 265,
    category: 'Women',
    collectionId: 'col-classic',
    images: ['/images/products/silk-shirt-1.jpg'],
    materials: ['Silk'],
    tags: ['silk', 'shirt', 'luxury', 'button-down'],
    featured: true,
    colors: [
      { name: 'Ivory', hex: '#fffff0' },
      { name: 'Black', hex: '#0a0a0a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'prod-009',
    name: 'Leather Moto Jacket',
    slug: 'leather-moto-jacket',
    description: 'Full-grain lamb leather with asymmetric zip closure. Slim, architectural fit with antiqued hardware and quilted liner.',
    price: 595,
    category: 'Women',
    collectionId: 'col-urban',
    images: ['/images/products/leather-jacket-1.jpg'],
    materials: ['Leather'],
    tags: ['leather', 'jacket', 'moto', 'premium'],
    featured: false,
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Burgundy', hex: '#722f37' },
    ],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 'prod-012',
    name: 'Essential Hoodie',
    slug: 'essential-hoodie',
    description: 'Heavyweight loopback cotton fleece with a brushed interior. Oversized fit, kangaroo pocket, and minimal branding.',
    price: 128,
    category: 'Unisex',
    collectionId: 'col-urban',
    images: ['/images/products/hoodie-1.jpg'],
    materials: ['Cotton'],
    tags: ['hoodie', 'cotton', 'essential', 'basics'],
    featured: false,
    colors: [
      { name: 'Black', hex: '#0a0a0a' },
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Forest', hex: '#228b22' },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
];

async function main() {
  console.log('Seeding AXIOM Fashion Database...');

  // 1. Seed Collections
  for (const col of COLLECTIONS_DATA) {
    await prisma.collection.upsert({
      where: { slug: col.slug },
      update: {},
      create: col,
    });
  }
  console.log('✓ Collections seeded');

  // 2. Seed Products
  for (const prod of PRODUCTS_DATA) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: {
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        description: prod.description,
        price: prod.price,
        compareAtPrice: prod.compareAtPrice,
        category: prod.category,
        collectionId: prod.collectionId,
        images: prod.images,
        materials: prod.materials,
        tags: prod.tags,
        featured: prod.featured,
        colors: {
          create: prod.colors.map((c) => ({ name: c.name, hex: c.hex })),
        },
        sizes: {
          create: prod.sizes.map((s) => ({ name: s, available: true })),
        },
        model3D: {
          create: {
            fabricType: prod.materials[0].toLowerCase(),
            roughness: 0.85,
            metalness: 0.05,
            hotspots: {
              create: [
                {
                  label: 'Premium Craftsmanship',
                  description: 'Artisanal tailoring with precision double-needle reinforcement.',
                  posX: 0,
                  posY: 0.85,
                  posZ: 0.44,
                  targetX: 0,
                  targetY: 0.85,
                  targetZ: 0,
                  camX: 0,
                  camY: 0.85,
                  camZ: 1.6,
                },
              ],
            },
          },
        },
      },
    });
  }
  console.log('✓ Products & 3D configurations seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
