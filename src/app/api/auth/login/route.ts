import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find customer
    const customer = await prisma.customer.findUnique({ where: { email } });
    if (!customer || !customer.passwordHash) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password
    const isValid = await verifyPassword(password, customer.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Create JWT
    const token = createToken({
      userId: customer.id,
      email: customer.email,
      type: 'customer',
    });

    const response = NextResponse.json({
      user: {
        id: customer.id,
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        type: 'customer' as const,
      },
    });

    setAuthCookie(response, token, 'customer');
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
