import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Shopify Order Paid Webhook Handler
 *
 * Receives orders/paid webhooks from Shopify.
 * When the order contains a Tone Tutoring product,
 * sends a personalized post-purchase email from Vince
 * via Resend with scheduling instructions.
 *
 * Webhook setup:
 *   Shopify Admin → Settings → Notifications → Webhooks
 *   Event: Order payment
 *   URL: https://www.therigdr.com/api/webhooks/order-paid
 *   Format: JSON
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SHOPIFY_WEBHOOK_SECRET = process.env.SHOPIFY_WEBHOOK_SECRET;
const VINCE_FROM = process.env.RESEND_VINCE_FROM_EMAIL || 'Vince <vince@therigdr.com>';

// Match any Tone Tutoring product by title keywords
const TONE_TUTORING_KEYWORDS = ['tone tutoring', 'tone consulting', '1:1 tone'];

function isToneTutoringOrder(lineItems: Array<{ title?: string; product_id?: number }>): boolean {
  return lineItems.some((item) => {
    const title = (item.title || '').toLowerCase();
    return TONE_TUTORING_KEYWORDS.some((kw) => title.includes(kw));
  });
}

// ── HMAC verification ──────────────────────────────────────

function verifyWebhook(rawBody: string, hmacHeader: string | null): boolean {
  if (!SHOPIFY_WEBHOOK_SECRET || !hmacHeader) return false;
  const computed = crypto
    .createHmac('sha256', SHOPIFY_WEBHOOK_SECRET)
    .update(rawBody, 'utf8')
    .digest('base64');
  try {
    return crypto.timingSafeEqual(
      Buffer.from(computed),
      Buffer.from(hmacHeader),
    );
  } catch {
    return false;
  }
}

// ── Email content ──────────────────────────────────────────

function buildToneTutoringEmail(firstName: string) {
  const name = firstName || 'there';
  return {
    subject: "Let's lock in your session",
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1d1d1f; line-height: 1.7; font-size: 16px;">
  <p>Hey ${name},</p>

  <p>Vince here from The Rig Doctor. I'll be the one on the other end of your Tone Tutoring session. Thanks for booking, really looking forward to digging into your rig.</p>

  <p>Shoot me back a few dates and times that work and we'll get it on the calendar. We run sessions on Google Meet. I'll send you a link once we lock something in. Just click it and you're good, nothing to install.</p>

  <p>If you want to hit the ground running, send over whatever's on your mind ahead of time. What's on your board, what's bugging you, what you're hoping to get out of the hour. Could be killing hum and buzz, cleaning up the signal chain, figuring out what gear to actually buy next. Whatever it is, the more I know going in, the more we get done.</p>

  <p>Looking forward to it.</p>

  <p>
    Vince<br/>
    <span style="color: #86868b;">The Rig Doctor</span><br/>
    <span style="color: #86868b;">Call or text anytime: (936) 548-9254</span>
  </p>
</div>
    `.trim(),
  };
}

// ── Resend helper ──────────────────────────────────────────

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: VINCE_FROM,
      to,
      subject,
      html,
      reply_to: 'vince@therigdr.com',
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Resend error: ${res.status} ${error}`);
  }

  return res.json();
}

// ── Webhook handler ────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();

    // Verify Shopify HMAC signature
    const hmac = req.headers.get('x-shopify-hmac-sha256');
    if (SHOPIFY_WEBHOOK_SECRET && !verifyWebhook(rawBody, hmac)) {
      console.error('Webhook signature verification failed');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const order = JSON.parse(rawBody);

    // Only process orders containing Tone Tutoring
    const lineItems = order.line_items || [];
    if (!isToneTutoringOrder(lineItems)) {
      return NextResponse.json({ ok: true, skipped: true, reason: 'Not a Tone Tutoring order' });
    }

    // Get customer info
    const customerEmail = order.customer?.email || order.email;
    const customerFirstName = order.customer?.first_name || '';

    if (!customerEmail) {
      console.error('No customer email in order:', order.id);
      return NextResponse.json({ error: 'No customer email' }, { status: 400 });
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Send the post-purchase email from Vince
    const email = buildToneTutoringEmail(customerFirstName);
    const result = await sendEmail(customerEmail, email.subject, email.html);

    console.log(`Tone Tutoring post-purchase email sent to ${customerEmail} (order ${order.id})`);

    return NextResponse.json({ ok: true, emailId: result.id, orderId: order.id });
  } catch (err) {
    console.error('Order paid webhook error:', err);
    // Return 200 anyway so Shopify doesn't retry
    // (log the error for debugging)
    return NextResponse.json({ error: 'Internal error', logged: true }, { status: 200 });
  }
}
