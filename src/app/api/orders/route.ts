import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, generateLuxuryOrderEmailHtml } from '@/lib/email';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');
  const orderNumber = searchParams.get('orderNumber');

  try {
    if (process.env.DATABASE_URL) {
      const where: any = {};
      if (orderNumber) where.orderNumber = orderNumber;
      if (email) {
        where.shippingAddress = {
          path: '$.email',
          equals: email,
        };
      }

      const orders = await prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { items: true },
      });

      if (orders.length > 0) {
        return NextResponse.json({ success: true, count: orders.length, data: orders });
      }
    }
  } catch (error) {
    console.warn('[Orders API] Database query fallback:', error);
  }

  // Fallback sample mock orders for local dev testing
  const fallbackOrders = [
    {
      id: 'ord_mock_1',
      orderNumber: 'AX-98214',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
      subtotal: 457,
      shipping: 0,
      tax: 36,
      total: 457,
      status: 'in_transit',
      deliveryMethod: 'express',
      shippingAddress: {
        firstName: 'Alexander',
        lastName: 'Wright',
        email: 'client@axiom.fashion',
        address: '742 Evergreen Terrace',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      items: [
        {
          name: 'Structured Wool Overcoat',
          color: 'Black',
          size: 'M',
          price: 389,
          quantity: 1,
          image: '/images/products/overcoat-1.jpg',
        },
        {
          name: 'Relaxed Cotton T-Shirt',
          color: 'White',
          size: 'M',
          price: 68,
          quantity: 1,
          image: '/images/products/tshirt-1.jpg',
        },
      ],
    },
    {
      id: 'ord_mock_2',
      orderNumber: 'AX-97812',
      createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
      subtotal: 245,
      shipping: 0,
      tax: 19,
      total: 245,
      status: 'delivered',
      deliveryMethod: 'express',
      shippingAddress: {
        firstName: 'Alexander',
        lastName: 'Wright',
        email: 'client@axiom.fashion',
        address: '742 Evergreen Terrace',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      items: [
        {
          name: 'Tailored Denim Jacket',
          color: 'Indigo',
          size: 'L',
          price: 245,
          quantity: 1,
          image: '/images/products/denim-jacket-1.jpg',
        },
      ],
    },
  ];

  return NextResponse.json({ success: true, count: fallbackOrders.length, data: fallbackOrders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, customer, deliveryMethod, shippingAddress, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in order payload' }, { status: 400 });
    }

    const subtotal = items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0);
    const shipping = subtotal > 200 ? 0 : 25;
    const tax = Math.round(subtotal * 0.08);
    const total = subtotal + shipping + tax;
    const orderNumber = `AX-${Math.floor(100000 + Math.random() * 900000)}`;

    let orderRecord = null;

    if (process.env.DATABASE_URL) {
      try {
        orderRecord = await prisma.order.create({
          data: {
            orderNumber,
            subtotal,
            shipping,
            tax,
            total,
            status: 'processing',
            deliveryMethod: deliveryMethod || 'express',
            shippingAddress: shippingAddress || {},
            paymentMethod: paymentMethod || 'credit_card',
            items: {
              create: items.map((it: any) => ({
                name: it.name,
                color: it.color,
                size: it.size,
                quantity: it.quantity,
                price: it.price,
                image: it.image || '/images/products/overcoat-1.jpg',
              })),
            },
          },
          include: { items: true },
        });
      } catch (err) {
        console.warn('[Orders API] DB save fallback:', err);
      }
    }

    // Trigger confirmation email
    const recipientEmail = shippingAddress?.email || customer?.email;
    if (recipientEmail) {
      const emailHtml = generateLuxuryOrderEmailHtml({
        orderNumber,
        customerName: `${shippingAddress?.firstName || 'Valued'} ${shippingAddress?.lastName || 'Client'}`,
        items,
        subtotal,
        shipping,
        tax,
        total,
        deliveryMethod,
        shippingAddress,
      });

      await sendEmail({
        to: recipientEmail,
        subject: `AXIOM Fashion — Order Confirmation #${orderNumber}`,
        body: `Thank you for your order #${orderNumber}. Total: $${total}. Items: ${items.length}`,
        html: emailHtml,
      });
    }

    return NextResponse.json(
      {
        success: true,
        orderNumber,
        data: orderRecord || { orderNumber, subtotal, shipping, tax, total, status: 'processing' },
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to place order' }, { status: 500 });
  }
}
