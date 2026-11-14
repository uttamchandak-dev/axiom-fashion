import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyPassword, createToken, setAuthCookie } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find admin
    const admin = await prisma.adminUser.findUnique({ where: { email } });
    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Update last login
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    // Create JWT
    const token = createToken({
      userId: admin.id,
      email: admin.email,
      type: 'admin',
      role: admin.role,
    });

    const response = NextResponse.json({
      user: {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        role: admin.role,
        type: 'admin' as const,
      },
    });

    setAuthCookie(response, token, 'admin');
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
