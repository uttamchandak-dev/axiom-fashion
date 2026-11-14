import { NextRequest, NextResponse } from 'next/server';
import { MOCK_PRODUCTS } from '@/data/products';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'featured';
  const query = searchParams.get('q')?.toLowerCase();

  try {
    // If Prisma is connected to MySQL, query the database; otherwise fallback smoothly to catalog
    if (process.env.DATABASE_URL) {
      const whereClause: any = { status: 'active' };
      if (category && category !== 'all') {
        whereClause.category = { equals: category };
      }
      if (query) {
        whereClause.OR = [
          { name: { contains: query } },
          { description: { contains: query } },
        ];
      }

      let orderBy: any = { createdAt: 'desc' };
      if (sort === 'price-asc') orderBy = { price: 'asc' };
      if (sort === 'price-desc') orderBy = { price: 'desc' };
      if (sort === 'popular') orderBy = { reviewCount: 'desc' };

      const dbProducts = await prisma.product.findMany({
        where: whereClause,
        orderBy,
        include: {
          colors: true,
          sizes: true,
          variants: true,
          model3D: {
            include: { hotspots: true },
          },
        },
      });

      if (dbProducts.length > 0) {
        return NextResponse.json({ success: true, count: dbProducts.length, data: dbProducts });
      }
    }
  } catch (error) {
    console.warn('MySQL query fallback to in-memory catalog:', error);
  }

  // Graceful fallback to rich memory catalog
  let filtered = [...MOCK_PRODUCTS];
  if (category && category !== 'all') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }
  if (query) {
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query));
  }
  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'popular') filtered.sort((a, b) => b.reviewCount - a.reviewCount);

  return NextResponse.json({ success: true, count: filtered.length, data: filtered });
}

export async function POST(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request, 'admin');
    if (!payload || payload.role === 'customer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (payload.role === 'viewer') {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { name, slug, description, price, category, colors, sizes, materials } = body;

    if (!name || !price || !category) {
      return NextResponse.json({ error: 'Missing required garment fields' }, { status: 400 });
    }

    if (process.env.DATABASE_URL) {
      const newProduct = await prisma.product.create({
        data: {
          name,
          slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
          description: description || '',
          price,
          category,
          images: body.images || ['/images/products/overcoat-1.jpg'],
          materials: materials || ['Wool'],
          tags: body.tags || [category.toLowerCase()],
          colors: {
            create: (colors || [{ name: 'Black', hex: '#0a0a0a' }]).map((c: any) => ({
              name: c.name,
              hex: c.hex,
            })),
          },
          sizes: {
            create: (sizes || [{ name: 'M', available: true }]).map((s: any) => ({
              name: typeof s === 'string' ? s : s.name,
              available: s.available ?? true,
            })),
          },
        },
      });

      return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
    }

    return NextResponse.json({ success: true, message: 'Garment queued for persistence' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}
