import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const payload = getUserFromRequest(request, 'admin');
    if (!payload || payload.role === 'customer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const where = category && category !== 'all' ? { category: { equals: category } } : {};

    const products = await prisma.product.findMany({
      where,
      include: {
        variants: true,
        colors: true,
        sizes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
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
    const { name, description, price, category, images } = body;

    // Generate a simple slug
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || '',
        price: parseFloat(price),
        category: category || 'Unisex',
        images: images || [],
        materials: [],
        tags: [],
        status: 'active',
        // Creating default sizes and colors for simplicity
        sizes: {
          create: [
            { name: 'S', available: true },
            { name: 'M', available: true },
            { name: 'L', available: true },
          ]
        },
        colors: {
          create: [
            { name: 'Black', hex: '#000000' }
          ]
        },
        variants: {
          create: [
            {
              sku: `AX-${Date.now().toString().slice(-6)}`,
              color: 'Black',
              size: 'M',
              price: parseFloat(price),
              inventory: 10
            }
          ]
        }
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
