import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug } from '@/data/products';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    if (process.env.DATABASE_URL) {
      const product = await prisma.product.findUnique({
        where: { slug },
        include: {
          colors: true,
          sizes: true,
          variants: true,
          model3D: {
            include: { hotspots: true },
          },
        },
      });

      if (product) {
        return NextResponse.json({ success: true, data: product });
      }
    }
  } catch (e) {
    console.warn('MySQL lookup fallback to static:', e);
  }

  const fallback = getProductBySlug(slug);
  if (!fallback) {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: fallback });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  const payload = getUserFromRequest(request, 'admin');
  if (!payload || payload.role === 'customer') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (payload.role === 'viewer') {
    return NextResponse.json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 });
  }

  try {
    if (process.env.DATABASE_URL) {
      await prisma.product.delete({ where: { slug } });
      return NextResponse.json({ success: true, message: `Product ${slug} deleted` });
    }
    return NextResponse.json({ success: true, message: `Product ${slug} queued for deletion` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Deletion failed' }, { status: 500 });
  }
}
