import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, generateLuxuryOrderEmailHtml } from '@/lib/email';
import { formatPrice } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { items, formData, totals, orderNumber } = data;

    let orderId = `ord_${Date.now()}`;

    // Attempt to persist in MySQL database if configured
    if (process.env.DATABASE_URL) {
      try {
        const order = await prisma.order.create({
          data: {
            orderNumber: orderNumber || `AX-${Math.floor(100000 + Math.random() * 900000)}`,
            subtotal: totals.subtotal,
            shipping: totals.shipping,
            tax: totals.tax,
            total: totals.total,
            deliveryMethod: formData.deliverySpeed || 'express',
            paymentMethod: 'credit_card',
            shippingAddress: {
              email: formData.email,
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zip: formData.zip,
            },
            items: {
              create: items.map((item: any) => ({
                productId: item.productId || null,
                name: item.name,
                color: item.color,
                size: item.size,
                quantity: item.quantity,
                price: item.price,
                image: item.image || '/images/products/overcoat-1.jpg',
              })),
            },
          },
        });
        orderId = order.id;
      } catch (dbErr) {
        console.warn('[Checkout API] Database insertion fallback:', dbErr);
      }
    }

    // Generate plain-text email content
    let plainText = `Thank you for your order, ${formData.firstName}!\n\n`;
    plainText += `Order Number: ${orderNumber}\n`;
    plainText += `Delivery Method: ${formData.deliverySpeed === 'sameday' ? 'Same-Day Concierge' : 'Express Courier'}\n\n`;
    plainText += `Order Summary:\n`;
    items.forEach((item: any) => {
      plainText += `- ${item.quantity}x ${item.name} (${item.color}, ${item.size}) - ${formatPrice(item.price * item.quantity)}\n`;
    });
    plainText += `\nSubtotal: ${formatPrice(totals.subtotal)}\n`;
    if (totals.discount > 0) plainText += `Discount: -${formatPrice(totals.discount)}\n`;
    plainText += `Shipping: ${totals.shipping === 0 ? 'Complimentary' : formatPrice(totals.shipping)}\n`;
    plainText += `Tax: ${formatPrice(totals.tax)}\n`;
    plainText += `Total: ${formatPrice(totals.total)}\n\n`;
    plainText += `Our ateliers are preparing your pieces with signature luxury packaging.`;

    // Generate responsive luxury HTML email template
    const emailHtml = generateLuxuryOrderEmailHtml({
      orderNumber,
      customerName: `${formData.firstName} ${formData.lastName}`,
      items,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      deliveryMethod: formData.deliverySpeed,
      shippingAddress: formData,
    });

    // Dispatch transactional confirmation email via Resend
    await sendEmail({
      to: formData.email,
      subject: `AXIOM Fashion — Order Confirmation #${orderNumber}`,
      body: plainText,
      html: emailHtml,
    });

    return NextResponse.json({ success: true, orderId, orderNumber });
  } catch (error: any) {
    console.error('Error processing checkout:', error);
    return NextResponse.json({ error: error.message || 'Failed to process checkout' }, { status: 500 });
  }
}
