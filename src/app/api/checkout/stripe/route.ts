import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerEmail, orderNumber, shipping, discount } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const subtotal = items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0);
    const tax = Math.round((subtotal - (discount || 0)) * 0.08);
    const total = Math.max(0, subtotal - (discount || 0)) + (shipping || 0) + Math.max(0, tax);
    const amountInCents = Math.round(total * 100);

    // If STRIPE_SECRET_KEY is provided in production, create a live Stripe PaymentIntent
    if (process.env.STRIPE_SECRET_KEY) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2026-08-26.dahlia',
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd',
        metadata: {
          orderNumber,
          customerEmail,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        amount: amountInCents,
        currency: 'usd',
      });
    }

    // Mock response for instant local development / sandbox
    return NextResponse.json({
      success: true,
      clientSecret: `pi_mock_${Date.now()}`,
      orderNumber: orderNumber || `AX-${Math.floor(100000 + Math.random() * 900000)}`,
      amount: amountInCents,
      currency: 'usd',
      message: 'Stripe PaymentIntent initialized',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Stripe initialization failed' }, { status: 500 });
  }
}
