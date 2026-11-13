import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import NewArrivals from '@/components/home/NewArrivals';
import FeaturedProduct from '@/components/home/FeaturedProduct';
import LookbookPreview from '@/components/home/LookbookPreview';
import BrandStory from '@/components/home/BrandStory';
import Newsletter from '@/components/home/Newsletter';

export const metadata: Metadata = {
  title: 'AXIOM — Premium Fashion',
  description:
    'Premium fashion crafted with intention. Explore our collections of contemporary menswear, womenswear, and unisex essentials.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollections />
      <NewArrivals />
      <FeaturedProduct />
      <LookbookPreview />
      <BrandStory />
      <Newsletter />
    </>
  );
}
