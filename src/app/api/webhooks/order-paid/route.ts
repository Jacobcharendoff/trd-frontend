import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Shopify Order Paid Webhook Handler
 *
 * Receives orders/paid webhooks from Shopify.
 * When the order contains a Tone Tutoring product,
 * sends a branded post-purchase email from Vince
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
const VINCE_FROM = process.env.RESEND_VINCE_FROM_EMAIL || 'Vince @ The Rig Doctor <vince@therigdr.com>';
const VINCE_BCC = 'vince@therigdr.com';

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

// ── Branded email template ─────────────────────────────────

function buildToneTutoringEmail(firstName: string) {
  const name = firstName || 'there';
  return {
    subject: "Let's lock in your session",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Let's lock in your session</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f7; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width: 560px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="padding: 0 0 32px 0; text-align: center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; color: #1d1d1f; letter-spacing: -0.02em; text-align: center; padding-bottom: 16px;">
                    The Rig Doctor
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <div style="width: 60px; height: 3px; background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899); border-radius: 2px;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Email body card -->
          <tr>
            <td style="background-color: #ffffff; border-radius: 16px; padding: 40px 36px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px; color: #1d1d1f; line-height: 1.7;">

                    <p style="margin: 0 0 20px 0;">Hey ${name},</p>

                    <p style="margin: 0 0 20px 0;">Vince here from The Rig Doctor. I'll be the one on the other end of your Tone Tutoring session. Thanks for booking, really looking forward to digging into your rig.</p>

                    <p style="margin: 0 0 20px 0;">Shoot me a few dates and times over the next week or two that work for you and we'll get it on the calendar. We run sessions on Google Meet. I'll send you a link once we lock something in. Just click it and you're good, nothing to install.</p>

                    <p style="margin: 0 0 20px 0;">If you want to hit the ground running, send over whatever's on your mind ahead of time. What's on your board, what's bugging you, what you're hoping to get out of the hour. Could be killing hum and buzz, cleaning up the signal chain, figuring out what gear to actually buy next. Whatever it is, the more I know going in, the more we get done.</p>

                    <p style="margin: 0 0 20px 0;">Looking forward to it.</p>

                    <!-- Signature -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 12px;">
                      <tr>
                        <td style="border-left: 3px solid #3b82f6; padding-left: 16px;">
                          <p style="margin: 0; font-weight: 600; color: #1d1d1f; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px;">Vince</p>
                          <p style="margin: 4px 0 0 0; color: #86868b; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px;">Head Rig Builder, The Rig Doctor</p>
                          <p style="margin: 4px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px;">
                            <a href="tel:+19365489254" style="color: #3b82f6; text-decoration: none;">(936) 548-9254</a>
                            <span style="color: #d1d1d6; padding: 0 8px;">·</span>
                            <a href="mailto:vince@therigdr.com" style="color: #3b82f6; text-decoration: none;">vince@therigdr.com</a>
                          </p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 0 0 0; text-align: center;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding-bottom: 16px;">
                    <a href="https://www.therigdr.com" style="color: #86868b; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 500;">therigdr.com</a>
                    <span style="color: #d1d1d6; padding: 0 10px;">·</span>
                    <a href="https://www.instagram.com/therigdr" style="color: #86868b; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 500;">Instagram</a>
                    <span style="color: #d1d1d6; padding: 0 10px;">·</span>
                    <a href="https://www.youtube.com/@therigdr" style="color: #86868b; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 500;">YouTube</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 12px; color: #aeaeb2; line-height: 1.5;">
                    Custom pedalboard builds, signal chain optimization,<br>
                    and 1-on-1 tone consulting for guitarists who give a damn.
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 12px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 11px; color: #c7c7cc;">
                    Montgomery, TX
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
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
      bcc: VINCE_BCC,
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

    // Send the branded post-purchase email from Vince
    const email = buildToneTutoringEmail(customerFirstName);
    const result = await sendEmail(customerEmail, email.subject, email.html);

    console.log(`Tone Tutoring post-purchase email sent to ${customerEmail} (order ${order.id})`);

    return NextResponse.json({ ok: true, emailId: result.id, orderId: order.id });
  } catch (err) {
    console.error('Order paid webhook error:', err);
    // Return 200 anyway so Shopify doesn't retry
    return NextResponse.json({ error: 'Internal error', logged: true }, { status: 200 });
  }
}
