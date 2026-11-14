import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProductGrid from '@/components/product/ProductGrid';
import { getCollectionBySlug, getProductsByCollection, MOCK_COLLECTIONS } from '@/data/products';

export async function generateStaticParams() {
  return MOCK_COLLECTIONS.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return { title: 'Collection Not Found' };
  }

  return {
    title: `${collection.name} Collection — AXIOM`,
    description: collection.description,
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const products = getProductsByCollection(collection.id);

  return (
    <div className="pt-24 pb-32 bg-white">
      <div className="page-container">
        <Breadcrumb
          items={[
            { label: 'Collections', href: '/collections' },
            { label: collection.name },
          ]}
        />

        {/* Collection Hero Banner */}
        <div className="relative aspect-[21/9] sm:aspect-[3/1] bg-neutral-900 rounded-xs overflow-hidden mb-16">
          <Image
            src={collection.heroImage}
            alt={collection.name}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-8 md:p-16">
            <div className="max-w-xl text-white">
              <p className="text-caption text-white/60 mb-2">Curated Collection</p>
              <h1 className="font-serif text-3xl md:text-5xl font-light mb-3">
                {collection.name}
              </h1>
              <p className="text-xs md:text-sm text-white/80 font-light leading-relaxed">
                {collection.description}
              </p>
            </div>
          </div>
        </div>

        {/* Garments in this collection */}
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-xs tracking-[0.16em] uppercase text-neutral-900 font-medium">
            Collection Pieces ({products.length})
          </h2>
        </div>

        <ProductGrid products={products} columns={4} />
      </div>
    </div>
  );
}
