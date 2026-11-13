import { Resend } from 'resend';

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  html?: string;
}

export async function sendEmail({ to, subject, body, html }: EmailPayload): Promise<void> {
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
      
      await resend.emails.send({
        from: `AXIOM Fashion <${fromEmail}>`,
        to: [to],
        subject,
        text: body,
        html: html || undefined,
      });
      console.log(`[Resend] Successfully sent email to ${to}`);
      return;
    } catch (error) {
      console.error('[Resend] Error sending email:', error);
    }
  }

  // Fallback / Mock service for development mode
  console.log('\n=================== MOCK EMAIL DISPATCH ===================');
  console.log(`[TO]: ${to}`);
  console.log(`[SUBJECT]: ${subject}`);
  console.log(`[BODY]:\n${body}`);
  if (html) {
    console.log(`[HTML AVAILABLE]: YES (Length: ${html.length} chars)`);
  }
  console.log('===========================================================\n');
}

export function generateLuxuryOrderEmailHtml(order: {
  orderNumber: string;
  customerName: string;
  items: Array<{ name: string; color: string; size: string; quantity: number; price: number; image?: string }>;
  subtotal: number;
  discount?: number;
  shipping: number;
  tax: number;
  total: number;
  deliveryMethod?: string;
  shippingAddress?: any;
}): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0;">
        <div style="font-size: 14px; font-weight: 500; color: #111111;">${item.name}</div>
        <div style="font-size: 12px; color: #777777; margin-top: 4px;">${item.color} · Size ${item.size} · Qty ${item.quantity}</div>
      </td>
      <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0; text-align: right; font-size: 14px; font-weight: 500; color: #111111;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AXIOM Order Confirmation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 40px 20px; color: #111111;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e5e5; padding: 40px;">
    <div style="text-align: center; padding-bottom: 30px; border-bottom: 1px solid #111111;">
      <h1 style="letter-spacing: 0.3em; font-size: 20px; font-weight: 400; margin: 0; text-transform: uppercase;">AXIOM</h1>
      <p style="font-size: 11px; letter-spacing: 0.2em; color: #888888; margin-top: 6px; text-transform: uppercase;">Contemporary Luxury Tailoring</p>
    </div>

    <div style="padding: 30px 0;">
      <p style="font-size: 12px; letter-spacing: 0.15em; color: #888888; text-transform: uppercase; margin-bottom: 4px;">Order Confirmed</p>
      <h2 style="font-size: 24px; font-weight: 300; margin: 0 0 16px 0;">Thank you, ${order.customerName}</h2>
      <p style="font-size: 14px; color: #555555; line-height: 1.6; margin: 0;">
        We have received your order <strong style="color: #111111;">#${order.orderNumber}</strong> and our ateliers are carefully preparing your garments.
      </p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <thead>
        <tr>
          <th style="text-align: left; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #888888; padding-bottom: 12px; border-bottom: 1px solid #111111;">Garment</th>
          <th style="text-align: right; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #888888; padding-bottom: 12px; border-bottom: 1px solid #111111;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div style="background-color: #fafafa; padding: 20px; border-radius: 2px; margin-bottom: 30px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #666666;">
        <span>Subtotal</span>
        <span style="font-weight: 500; color: #111111;">$${order.subtotal.toFixed(2)}</span>
      </div>
      ${
        order.discount && order.discount > 0
          ? `
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #15803d;">
        <span>Promotional Discount</span>
        <span>-$${order.discount.toFixed(2)}</span>
      </div>`
          : ''
      }
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 13px; color: #666666;">
        <span>Shipping</span>
        <span style="font-weight: 500; color: #111111;">${order.shipping === 0 ? 'Complimentary' : `$${order.shipping.toFixed(2)}`}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 13px; color: #666666;">
        <span>Estimated Tax</span>
        <span style="font-weight: 500; color: #111111;">$${order.tax.toFixed(2)}</span>
      </div>
      <div style="border-top: 1px solid #e5e5e5; padding-top: 12px; display: flex; justify-content: space-between; font-size: 15px; font-weight: 600; color: #111111;">
        <span>Total</span>
        <span>$${order.total.toFixed(2)}</span>
      </div>
    </div>

    <div style="border-top: 1px solid #eeeeee; padding-top: 20px; text-align: center; font-size: 12px; color: #999999;">
      <p style="margin: 0 0 8px 0;">Complimentary concierge support available 24/7 at <a href="mailto:concierge@axiom-fashion.com" style="color: #111111; text-decoration: underline;">concierge@axiom-fashion.com</a></p>
      <p style="margin: 0;">© ${new Date().getFullYear()} AXIOM Fashion. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
}
