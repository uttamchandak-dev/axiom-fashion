import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search our collection of premium fashion.',
};

export default function SearchPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="page-container">
        <div className="mb-16">
          <p className="text-caption text-muted mb-3">Search</p>
          <h1 className="text-headline">Search</h1>
        </div>
        <div className="text-muted text-sm">
          Full search experience will be implemented in Phase 10.
        </div>
      </div>
    </div>
  );
}
