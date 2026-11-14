import type { Metadata } from 'next';
import LookbookView from '@/components/lookbook/LookbookView';

export const metadata: Metadata = {
  title: 'Editorial Lookbook — AXIOM',
  description: 'Explore our latest editorial fashion looks, styled silhouettes, and shop the complete aesthetic.',
};

export default function LookbookPage() {
  return <LookbookView />;
}
