import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * Shopify Order Paid Webhook Handler
 *
 * Receives orders/paid webhooks from Shopify.
 * Detects the order type and sends the appropriate post-purchase email:
 *
 *   - Tone Tutoring → Branded email from Vince with scheduling instructions
 *   - Gift Card     → Buyer thank-you email explaining what the recipient gets
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
const TEAM_FROM = 'The Rig Doctor <team@therigdr.com>';
const VINCE_BCC = 'vince@therigdr.com';
const TEAM_BCC = 'jacob@therigdr.com';

// Match any Tone Tutoring product by title keywords
const TONE_TUTORING_KEYWORDS = ['tone tutoring', 'tone consulting', '1:1 tone'];

function isToneTutoringOrder(lineItems: Array<{ title?: string; product_id?: number }>): boolean {
  return lineItems.some((item) => {
    const title = (item.title || '').toLowerCase();
    return TONE_TUTORING_KEYWORDS.some((kw) => title.includes(kw));
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isGiftCardOrder(lineItems: Array<any>): boolean {
  return lineItems.some((item) => item.gift_card === true);
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

// ── Tone Tutoring email template ────────────────────────────

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

// ── Gift Card buyer thank-you email template ────────────────

function buildGiftCardBuyerEmail(firstName: string, amount: string) {
  const name = firstName || 'there';
  const displayAmount = amount || 'a';
  return {
    subject: "Great call - here's what happens next",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<title>Great call</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  * { margin: 0; padding: 0; }
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  body {
    margin: 0 !important; padding: 0 !important;
    background-color: #0a0a0a; width: 100% !important;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  }
  .email-container { max-width: 600px; margin: 0 auto; }
  .cta-button {
    display: inline-block; background: linear-gradient(135deg, #6366F1, #A855F7);
    color: #ffffff !important; font-size: 16px; font-weight: 600; text-decoration: none;
    padding: 16px 40px; border-radius: 50px; letter-spacing: 0.01em;
  }
  @media screen and (max-width: 600px) {
    .email-container { width: 100% !important; }
    .hero-headline { font-size: 30px !important; }
    .section-pad { padding-left: 20px !important; padding-right: 20px !important; }
  }
</style>
</head>
<body>
<div style="display: none; font-size: 1px; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif">Your gift card is on its way to make someone's rig better.</div>

<center style="width:100%; background-color:#0a0a0a;">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" class="email-container" style="max-width:600px; margin:0 auto; width:100%;">

<!-- LOGO -->
<tr>
  <td style="padding: 32px 40px 24px; text-align: center;" class="section-pad">
    <a href="https://www.therigdr.com?utm_source=email&utm_medium=transactional&utm_campaign=gift_card_buyer" style="text-decoration:none;">
      <img src="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/logo-white-hrt.png?v=1742952854" alt="The Rig Doctor" width="140" style="width:140px; height:auto; display:inline-block;"/>
    </a>
  </td>
</tr>

<!-- HERO IMAGE -->
<tr>
  <td style="padding: 0 40px;" class="section-pad">
    <a href="https://www.therigdr.com/custom-builds?utm_source=email&utm_medium=transactional&utm_campaign=gift_card_buyer" style="display:block; text-decoration:none;">
      <img src="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Saxon_W..jpg?v=1777143325" alt="Custom pedalboard build by The Rig Doctor" width="520" style="width:100%; height:auto; display:block; border-radius:16px; border:1px solid rgba(255,255,255,0.08);"/>
    </a>
  </td>
</tr>

<tr><td style="height: 32px;"></td></tr>

<!-- HEADLINE + BODY -->
<tr>
  <td style="padding: 0 40px;" class="section-pad">
    <h1 class="hero-headline" style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:38px; font-weight:800; line-height:1.1; color:#ffffff; letter-spacing:-0.02em; margin:0 0 24px 0;">
      Great gift.
    </h1>
    <p style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:17px; font-weight:400; line-height:1.7; color:rgba(255,255,255,0.6); margin:0 0 20px 0;">
      Hey ${name}, thanks for grabbing a Rig Doctor gift card. Seriously cool move. Your recipient is going to get an email from us with their gift card code and a link to the site. All they do is enter the code at checkout and they're set.
    </p>
    <p style="font-family:'Inter',-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif; font-size:17px; font-weight:400; line-height:1.7; color:rgba(255,255,255,0.6); margin:0;">
      There's plenty to spend it on - <a href="https://www.therigdr.com/custom-builds?utm_source=email&utm_medium=transactional&utm_campaign=gift_card_buyer" style="color:#ffffff; text-decoration:underline;">custom pedalboard builds</a>, rewires, <a href="https://www.therigdr.com/tone-tutoring?utm_source=email&utm_medium=transactional&utm_campaign=gift_card_buyer" style="color:#ffffff; text-decoration:underline;">Tone Tutoring sessions</a> where we hop on a call and help them dial in their signal chain, plus all the cables and gear on the site. If they're not sure where to start, tell them to reach out. We'll point them in the right direction.
    </p>
  </td>
</tr>

<tr><td style="height: 40px;"></td></tr>

<!-- CTA -->
<tr>
  <td style="padding: 0 40px; text-align: center;" class="section-pad">
    <a href="https://www.therigdr.com?utm_source=email&utm_medium=transactional&utm_campaign=gift_card_buyer" class="cta-button" style="display:inline-block; background:linear-gradient(135deg,#6366F1,#A855F7); color:#ffffff; font-family:'Inter',sans-serif; font-size:16px; font-weight:600; text-decoration:none; padding:16px 40px; border-radius:50px;">See What's New &#8594;</a>
  </td>
</tr>

<tr><td style="height: 40px;"></td></tr>

<!-- SIGN-OFF -->
<tr>
  <td style="padding: 0 40px;" class="section-pad">
    <p style="font-family:'Inter',sans-serif; font-size:15px; font-weight:400; color:rgba(255,255,255,0.5); line-height:1.7; margin:0; text-align:center;">
      Appreciate you thinking of a guitarist.
    </p>
    <p style="font-family:'Inter',sans-serif; font-size:15px; font-weight:600; color:#ffffff; margin:8px 0 0; text-align:center;">
      Jacob, Mason &amp; Vince
    </p>
  </td>
</tr>

<tr><td style="height: 48px;"></td></tr>

<!-- FOOTER -->
<tr>
  <td style="padding: 0 40px;" class="section-pad">
    <hr style="border:none; border-top:1px solid rgba(255,255,255,0.06); margin:0;"/>
  </td>
</tr>
<tr>
  <td style="padding: 28px 40px 40px; text-align: center;" class="section-pad">
    <p style="font-family:'Inter',sans-serif; font-size:12px; color:rgba(255,255,255,0.3); line-height:1.8; margin:0;">
      The Rig Doctor &bull; Montgomery, TX<br/>
      Hand-wired pedalboards built around how you actually play.<br/><br/>
      <a href="https://www.therigdr.com?utm_source=email&utm_medium=transactional&utm_campaign=gift_card_buyer" style="color:rgba(255,255,255,0.4); text-decoration:underline;">therigdr.com</a>
      &nbsp;&bull;&nbsp;
      <a href="https://www.instagram.com/therigdr/" style="color:rgba(255,255,255,0.4); text-decoration:underline;">Instagram</a>
      &nbsp;&bull;&nbsp;
      <a href="https://www.youtube.com/@therigdr" style="color:rgba(255,255,255,0.4); text-decoration:underline;">YouTube</a>
    </p>
  </td>
</tr>

</table>
</center>
</body>
</html>`.trim(),
  };
}

// ── Resend helper ──────────────────────────────────────────

interface SendEmailOptions {
  from: string;
  to: string;
  bcc?: string;
  subject: string;
  html: string;
  replyTo?: string;
}

async function sendEmail({ from, to, bcc, subject, html, replyTo }: SendEmailOptions) {
  const payload: Record<string, string> = { from, to, subject, html };
  if (bcc) payload.bcc = bcc;
  if (replyTo) payload.reply_to = replyTo;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
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
    const lineItems = order.line_items || [];
    const customerEmail = order.customer?.email || order.email;
    const customerFirstName = order.customer?.first_name || '';
    const results: Array<{ type: string; emailId?: string }> = [];

    if (!customerEmail) {
      console.error('No customer email in order:', order.id);
      return NextResponse.json({ error: 'No customer email' }, { status: 400 });
    }

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // ── Tone Tutoring email ──
    if (isToneTutoringOrder(lineItems)) {
      const email = buildToneTutoringEmail(customerFirstName);
      const result = await sendEmail({
        from: VINCE_FROM,
        to: customerEmail,
        bcc: VINCE_BCC,
        subject: email.subject,
        html: email.html,
        replyTo: 'vince@therigdr.com',
      });
      console.log(`Tone Tutoring email sent to ${customerEmail} (order ${order.id})`);
      results.push({ type: 'tone_tutoring', emailId: result.id });
    }

    // ── Gift Card buyer thank-you email ──
    if (isGiftCardOrder(lineItems)) {
      // Get the gift card amount from the order total
      const amount = order.total_price ? `$${parseFloat(order.total_price).toFixed(0)}` : '';
      const email = buildGiftCardBuyerEmail(customerFirstName, amount);
      const result = await sendEmail({
        from: TEAM_FROM,
        to: customerEmail,
        bcc: TEAM_BCC,
        subject: email.subject,
        html: email.html,
        replyTo: 'jacob@therigdr.com',
      });
      console.log(`Gift card buyer email sent to ${customerEmail} (order ${order.id})`);
      results.push({ type: 'gift_card_buyer', emailId: result.id });
    }

    // No matching product type
    if (results.length === 0) {
      return NextResponse.json({ ok: true, skipped: true, reason: 'No email-triggering products in order' });
    }

    return NextResponse.json({ ok: true, orderId: order.id, emails: results });
  } catch (err) {
    console.error('Order paid webhook error:', err);
    // Return 200 anyway so Shopify doesn't retry
    return NextResponse.json({ error: 'Internal error', logged: true }, { status: 200 });
  }
}
