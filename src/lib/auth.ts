import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role?: string;
  type: 'customer' | 'admin';
}

export interface TokenPayload {
  userId: string;
  email: string;
  type: 'customer' | 'admin';
  role?: string;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const JWT_SECRET = process.env.JWT_SECRET || 'axiom-fashion-secret-key-change-in-production';
const TOKEN_EXPIRY = '7d';
const CUSTOMER_COOKIE = 'axiom_auth_token';
const ADMIN_COOKIE = 'axiom_admin_token';

// ─── Password Hashing ──────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── JWT Token Management ───────────────────────────────────────────────────

export function createToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

// ─── Cookie Helpers ─────────────────────────────────────────────────────────

export function setAuthCookie(
  response: NextResponse,
  token: string,
  type: 'customer' | 'admin' = 'customer'
): void {
  const cookieName = type === 'admin' ? ADMIN_COOKIE : CUSTOMER_COOKIE;
  response.cookies.set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  });
}

export function clearAuthCookie(
  response: NextResponse,
  type: 'customer' | 'admin' = 'customer'
): void {
  const cookieName = type === 'admin' ? ADMIN_COOKIE : CUSTOMER_COOKIE;
  response.cookies.set(cookieName, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
}

// ─── Request Helpers ────────────────────────────────────────────────────────

export function getTokenFromRequest(
  request: NextRequest,
  type: 'customer' | 'admin' = 'customer'
): string | undefined {
  const cookieName = type === 'admin' ? ADMIN_COOKIE : CUSTOMER_COOKIE;
  return request.cookies.get(cookieName)?.value;
}

export function getUserFromRequest(
  request: NextRequest,
  type: 'customer' | 'admin' = 'customer'
): TokenPayload | null {
  const token = getTokenFromRequest(request, type);
  if (!token) return null;
  return verifyToken(token);
}

// ─── Validation ─────────────────────────────────────────────────────────────

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  return { valid: true };
}
