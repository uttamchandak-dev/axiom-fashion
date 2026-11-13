import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    const sig = request.headers.get('stripe-signature');

    let event: any;

    if (process.env.STRIPE_WEBHOOK_SECRET && process.env.STRIPE_SECRET_KEY && sig) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2026-08-26.dahlia',
      });
      try {
        event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
      } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
      }
    } else {
      // Fallback for local testing without keys
      try {
        event = JSON.parse(rawBody);
      } catch (err) {
        return NextResponse.json({ error: 'Webhook payload parse error' }, { status: 400 });
      }
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data?.object;
      const orderNumber = paymentIntent?.metadata?.orderNumber;

      if (orderNumber && process.env.DATABASE_URL) {
        await prisma.order.updateMany({
          where: { orderNumber },
          data: { status: 'paid' },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Webhook failed' }, { status: 500 });
  }
}
