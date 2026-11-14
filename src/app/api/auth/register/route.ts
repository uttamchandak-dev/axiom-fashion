import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { hashPassword, createToken, setAuthCookie, validateEmail, validatePassword } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    // Validate inputs
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return NextResponse.json({ error: passwordCheck.message }, { status: 400 });
    }

    // Check if customer already exists
    const existing = await prisma.customer.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    // Create customer
    const passwordHash = await hashPassword(password);
    const customer = await prisma.customer.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
      },
    });

    // Create JWT and set cookie
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
    }, { status: 201 });

    setAuthCookie(response, token, 'customer');
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
