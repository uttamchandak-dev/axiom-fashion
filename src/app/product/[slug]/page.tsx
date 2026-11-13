import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import ProductDetailView from '@/components/product/ProductDetailView';

export async function generateStaticParams() {
  try {
    const products = await prisma.product.findMany({ select: { slug: true } });
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch {
    // DB unavailable at build time (e.g. Docker build) — fall back to dynamic rendering
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} — AXIOM`,
    description: product.description,
    openGraph: {
      title: `${product.name} | AXIOM`,
      description: product.description,
      images: [
        {
          url: Array.isArray(product.images) && product.images.length > 0 ? String(product.images[0]) : '/images/products/overcoat-1.jpg',
        }
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      variants: true,
      colors: true,
      sizes: true,
      Review: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!product) {
    notFound();
  }

  // Ensure JSON-LD includes review data if available
  const productImages = Array.isArray(product.images) ? product.images : [];
  const primaryImage = productImages[0] || 'https://axiom-fashion.com/images/default.jpg';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: primaryImage,
    description: product.description,
    sku: product.variants?.[0]?.sku || product.id,
    offers: {
      '@type': 'Offer',
      url: `https://axiom-fashion.com/product/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price.toString(),
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
    ...(Number(product.reviewCount) > 0 ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating.toString(),
        reviewCount: product.reviewCount.toString(),
      }
    } : {})
  };

  const relatedProducts = await prisma.product.findMany({
    where: {
      category: product.category,
      id: { not: product.id }
    },
    take: 4,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product as any} relatedProducts={relatedProducts as any} />
    </>
  );
}
