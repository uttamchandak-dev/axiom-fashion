import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { rating, authorName, content } = await request.json();

    if (!rating || !authorName || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Find the product
    const product = await prisma.product.findUnique({
      where: { slug }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        authorName,
        content,
        productId: product.id,
      }
    });

    // Recalculate average rating
    const aggregates = await prisma.review.aggregate({
      where: { productId: product.id },
      _avg: { rating: true },
      _count: { rating: true }
    });

    const newRating = aggregates._avg.rating || 5.0;
    const newCount = aggregates._count.rating || 0;

    await prisma.product.update({
      where: { id: product.id },
      data: {
        rating: newRating,
        reviewCount: newCount
      }
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
