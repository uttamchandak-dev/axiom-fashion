import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const customerToken = cookieStore.get('axiom_auth_token')?.value;
    const adminToken = cookieStore.get('axiom_admin_token')?.value;

    // Try admin token first
    if (adminToken) {
      const payload = verifyToken(adminToken);
      if (payload && payload.type === 'admin') {
        const admin = await prisma.adminUser.findUnique({
          where: { id: payload.userId },
          select: { id: true, email: true, firstName: true, lastName: true, role: true },
        });

        if (admin) {
          return NextResponse.json({
            user: { ...admin, type: 'admin' as const },
          });
        }
      }
    }

    // Try customer token
    if (customerToken) {
      const payload = verifyToken(customerToken);
      if (payload && payload.type === 'customer') {
        const customer = await prisma.customer.findUnique({
          where: { id: payload.userId },
          select: { id: true, email: true, firstName: true, lastName: true },
        });

        if (customer) {
          return NextResponse.json({
            user: { ...customer, type: 'customer' as const },
          });
        }
      }
    }

    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
