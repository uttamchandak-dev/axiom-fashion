import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const payload = getUserFromRequest(request, 'admin');
    if (!payload || payload.role === 'customer') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (payload.role === 'viewer') {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 });
    }

    const { status } = await request.json();

    if (!status || !['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
