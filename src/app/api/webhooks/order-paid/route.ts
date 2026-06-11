import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Shopify Order Paid Webhook Handler
 *
 * Receives orders/paid webhooks from Shopify and sends
 * branded post-purchase emails via Resend based on product type:
 *
 * - Tone Tutoring → scheduling instructions from Vince
 * - Gift Card → buyer thank-you explaining what the recipient gets
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

// Match product types by title keywords
const TONE_TUTORING_KEYWORDS = ['tone tutoring', 'tone consulting', '1:1 tone'];
const GIFT_CARD_KEYWORDS = ['gift card', 'giftcard', 'gift certificate'];

interface LineItem {
  title?: string;
  product_id?: number;
  gift_card?: boolean;
  price?: string;
  quantity?: number;
}

function isToneTutoringOrder(lineItems: LineItem[]): boolean {
  return lineItems.some((item) => {
    const title = (item.title || '').toLowerCase();
    return TONE_TUTORING_KEYWORDS.some((kw) => title.includes(kw));
  });
}

function isGiftCardOrder(lineItems: LineItem[]): boolean {
  return lineItems.some((item) => {
    if (item.gift_card) return true;
    const title = (item.title || '').toLowerCase();
    return GIFT_CARD_KEYWORDS.some((kw) => title.includes(kw));
  });
}

function getGiftCardAmount(lineItems: LineItem[]): string {
  let total = 0;
  for (const item of lineItems) {
    const isGC =
      item.gift_card ||
      GIFT_CARD_KEYWORDS.some((kw) =>
        (item.title || '').toLowerCase().includes(kw)
      );
    if (isGC && item.price) {
      total += parseFloat(item.price) * (item.quantity || 1);
    }
  }
  return total > 0 ? `$${total.toFixed(0)}` : '';
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

// ── Tone Tutoring email template ───────────────────────────

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
                            <span style="color: #d1d1d6; padding: 0 8px;">&middot;</span>
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
                    <a href="https://www.therigdr.com?utm_source=email&utm_medium=transactional&utm_campaign=tone_tutoring" style="color: #86868b; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 500;">therigdr.com</a>
                    <span style="color: #d1d1d6; padding: 0 10px;">&middot;</span>
                    <a href="https://www.instagram.com/therigdr" style="color: #86868b; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 500;">Instagram</a>
                    <span style="color: #d1d1d6; padding: 0 10px;">&middot;</span>
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

// ── Gift Card buyer email template ─────────────────────────

function buildGiftCardBuyerEmail(firstName: string, amount: string) {
  const name = firstName || 'there';
  const amountText = amount ? `a ${amount} TRD gift card` : 'a TRD gift card';
  return {
    subject: "Great call — here's what happens next",
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Great call</title>
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

                    <p style="margin: 0 0 20px 0;">Vince here. Thanks for grabbing ${amountText} — that's a seriously cool gift.</p>

                    <p style="margin: 0 0 20px 0;">Here's what happens next: your recipient is going to get an email from us with their gift card code and a link to the shop. All they do is enter the code at checkout and they're set.</p>

                    <p style="margin: 0 0 20px 0;">There's plenty to spend it on — everything in the <a href="https://www.therigdr.com/shop?utm_source=email&utm_medium=transactional&utm_campaign=gift_card_buyer" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Tone Shop</a> (patch cables, power supplies, mounts), <a href="https://www.therigdr.com/tone-tutoring?utm_source=email&utm_medium=transactional&utm_campaign=gift_card_buyer" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Tone Tutoring</a> sessions where I hop on a call and help them sort out their signal chain, or even a custom pedalboard build if they want to go all in.</p>

                    <p style="margin: 0 0 20px 0;">If they're not sure where to start, tell them to shoot me a message. I'll point them in the right direction.</p>

                    <!-- CTA Button -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                      <tr>
                        <td align="center" style="border-radius: 980px; background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);">
                          <a href="https://www.therigdr.com/shop?utm_source=email&utm_medium=transactional&utm_campaign=gift_card_buyer&utm_content=cta" style="display: inline-block; padding: 14px 32px; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 980px;">Browse the Tone Shop</a>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 20px 0;">Appreciate you thinking of a guitarist.</p>

                    <!-- Signature -->
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top: 12px;">
                      <tr>
                        <td style="border-left: 3px solid #3b82f6; padding-left: 16px;">
                          <p style="margin: 0; font-weight: 600; color: #1d1d1f; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 16px;">Vince</p>
                          <p style="margin: 4px 0 0 0; color: #86868b; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px;">Head Rig Builder, The Rig Doctor</p>
                          <p style="margin: 4px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 14px;">
                            <a href="tel:+19365489254" style="color: #3b82f6; text-decoration: none;">(936) 548-9254</a>
                            <span style="color: #d1d1d6; padding: 0 8px;">&middot;</span>
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
                    <a href="https://www.therigdr.com?utm_source=email&utm_medium=transactional&utm_campaign=gift_card_buyer" style="color: #86868b; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 500;">therigdr.com</a>
                    <span style="color: #d1d1d6; padding: 0 10px;">&middot;</span>
                    <a href="https://www.instagram.com/therigdr" style="color: #86868b; text-decoration: none; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size: 13px; font-weight: 500;">Instagram</a>
                    <span style="color: #d1d1d6; padding: 0 10px;">&middot;</span>
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
    const lineItems: LineItem[] = order.line_items || [];
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

    const results: Record<string, unknown> = { orderId: order.id };
    let emailsSent = 0;

    // ── Tone Tutoring ────────────────────────────────────
    if (isToneTutoringOrder(lineItems)) {
      const email = buildToneTutoringEmail(customerFirstName);
      const result = await sendEmail(customerEmail, email.subject, email.html);
      results.toneTutoring = { sent: true, emailId: result.id };
      emailsSent++;
      console.log(`Tone Tutoring email sent to ${customerEmail} (order ${order.id})`);
    }

    // ── Gift Card ─────────────────────────────────────────
    if (isGiftCardOrder(lineItems)) {
      const amount = getGiftCardAmount(lineItems);
      const email = buildGiftCardBuyerEmail(customerFirstName, amount);
      const result = await sendEmail(customerEmail, email.subject, email.html);
      results.giftCard = { sent: true, emailId: result.id };
      emailsSent++;
      console.log(`Gift card buyer email sent to ${customerEmail} (order ${order.id})`);
    }

    // ── No matching products ──────────────────────────────
    if (emailsSent === 0) {
      return NextResponse.json({ ok: true, skipped: true, reason: 'No matching products' });
    }

    return NextResponse.json({ ok: true, ...results });
  } catch (err) {
    console.error('Order paid webhook error:', err);
    // Return 200 so Shopify doesn't retry
    return NextResponse.json({ error: 'Internal error', logged: true }, { status: 200 });
  }
}
