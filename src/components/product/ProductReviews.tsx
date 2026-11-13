'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Review {
  id: string;
  rating: number;
  authorName: string;
  content: string;
  createdAt: Date;
}

interface ProductReviewsProps {
  productSlug: string;
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-neutral-900' : 'text-neutral-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductReviews({ productSlug, reviews }: ProductReviewsProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [authorName, setAuthorName] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch(`/api/products/${productSlug}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          authorName,
          content,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit review');
      }

      setSuccess(true);
      setAuthorName('');
      setContent('');
      setRating(5);
      
      // Refresh the page data to show the new review
      router.refresh();
    } catch (err) {
      setError('An error occurred while submitting your review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-24 border-t border-neutral-200 pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Reviews List */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-serif text-neutral-900">Customer Reviews</h2>
            <div className="flex items-center gap-2 border-l border-neutral-300 pl-4">
              <StarRating rating={Math.round(Number(averageRating))} />
              <span className="text-sm font-medium text-neutral-900">{averageRating}</span>
              <span className="text-sm text-neutral-500">({reviews.length} reviews)</span>
            </div>
          </div>

          <div className="space-y-8 max-h-[600px] overflow-y-auto pr-4">
            {reviews.length === 0 ? (
              <p className="text-sm text-neutral-500 italic">No reviews yet. Be the first to review this product!</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-neutral-100 pb-8 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{review.authorName}</p>
                      <p className="text-[11px] text-neutral-400 mt-1">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{review.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submit Review Form */}
        <div className="lg:col-span-5">
          <div className="bg-neutral-50 p-8 rounded-xs">
            <h3 className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-900 mb-6">Write a Review</h3>
            
            {success ? (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xs text-sm border border-emerald-200">
                Thank you for your review! It has been published successfully.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="text-red-500 text-xs p-3 bg-red-50 border border-red-200 rounded-xs">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <svg
                          className={`w-6 h-6 ${star <= rating ? 'text-neutral-900' : 'text-neutral-200'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="authorName" className="block text-xs uppercase tracking-wider text-neutral-700 mb-2">Name</label>
                  <input
                    id="authorName"
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors rounded-none"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-xs uppercase tracking-wider text-neutral-700 mb-2">Review</label>
                  <textarea
                    id="content"
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full bg-white border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:border-neutral-900 transition-colors rounded-none resize-y"
                    placeholder="What did you think about this product?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-neutral-900 text-white text-xs font-medium tracking-[0.16em] uppercase hover:bg-black transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
