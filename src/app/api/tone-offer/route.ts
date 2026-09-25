import { NextRequest, NextResponse } from 'next/server';

/**
 * Tone Tutoring 20% opt-in.
 *
 * 1. Creates or updates the HubSpot contact (lead, source noted).
 * 2. Emails the TONE20 code right away via Resend, with a one-click
 *    checkout link that already has the code applied.
 *
 * TONE20 lives in Shopify: 20% off "Tone Tutoring (60 min.)", one use per customer.
 */

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.RESEND_FROM_EMAIL || 'Jacob <jacob@therigdr.com>';
const REPLY_TO = 'info@therigdr.com';
const SITE = 'https://www.therigdr.com';
const CODE = 'TONE20';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function utm(url: string, content: string) {
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=trd_email&utm_medium=email&utm_campaign=tone20_optin&utm_content=${content}`;
}

async function upsertHubSpot(email: string) {
  if (!HUBSPOT_ACCESS_TOKEN) return;
  const note = `Tone Tutoring 20% opt-in (homepage). Sent code ${CODE}. ${new Date().toISOString()}`;
  const headers = { Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`, 'Content-Type': 'application/json' };

  const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      properties: {
        email,
        lifecyclestage: 'lead',
        hs_lead_status: 'NEW',
        leadsource: 'Tone Tutoring 20% Opt-in',
        notes_last_updated: note,
      },
    }),
  });

  if (res.status === 409) {
    const conflict = await res.json().catch(() => null);
    const id = conflict?.message?.match(/Existing ID: (\d+)/)?.[1];
    if (id) {
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ properties: { notes_last_updated: note } }),
      });
    }
  } else if (!res.ok) {
    console.error('HubSpot tone-offer error:', res.status, await res.text());
  }
}

function emailHtml() {
  const buy = utm(`${SITE}/api/checkout?handle=tone-tutoring-follow-up&discount=${CODE}`, 'button');
  const learn = utm(`${SITE}/tone-tutoring`, 'learn_more');
  const logo = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/logo-white-hrt.png?width=280';

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#f5f5f7;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:32px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1d1d1f;">
  <tr><td style="background:#000000;padding:28px 32px;" align="left">
    <a href="${utm(SITE, 'logo')}" style="text-decoration:none;"><img src="${logo}" width="120" alt="The Rig Doctor" style="display:block;border:0;width:120px;height:auto;"></a>
  </td></tr>
  <tr><td style="height:3px;background:#0A84FF;background-image:linear-gradient(90deg,#30D158,#0A84FF,#BF5AF2,#FF375F);font-size:0;line-height:0;">&nbsp;</td></tr>
  <tr><td style="padding:36px 32px 8px;">
    <p style="margin:0 0 18px;font-size:17px;line-height:1.6;">Hey,</p>
    <p style="margin:0 0 18px;font-size:17px;line-height:1.6;">Here's your code for 20% off your first Tone Tutoring session:</p>
  </td></tr>
  <tr><td align="center" style="padding:4px 32px 24px;">
    <div style="display:inline-block;border:1px solid #e5e5ea;border-radius:14px;padding:16px 28px;font-size:28px;font-weight:700;letter-spacing:4px;color:#000000;">${CODE}</div>
  </td></tr>
  <tr><td style="padding:0 32px 8px;">
    <p style="margin:0 0 18px;font-size:17px;line-height:1.6;">It's an hour on video going through your whole rig. Amp settings, pedal order, that hum you can't track down. Most guys leave knowing exactly what to change, and a lot of them don't end up buying anything new.</p>
    <p style="margin:0 0 26px;font-size:17px;line-height:1.6;">The button below books it with the discount already applied.</p>
  </td></tr>
  <tr><td align="center" style="padding:0 32px 32px;">
    <a href="${buy}" style="display:inline-block;background:#000000;color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;padding:16px 30px;border-radius:999px;">Book my session with 20% off</a>
  </td></tr>
  <tr><td style="padding:0 32px 36px;">
    <p style="margin:0 0 6px;font-size:15px;line-height:1.6;color:#6e6e73;">Want to know more first? <a href="${learn}" style="color:#0071E3;text-decoration:underline;">Here's how the sessions work.</a></p>
    <p style="margin:18px 0 0;font-size:17px;line-height:1.6;">Talk soon,<br>Jacob<br><span style="color:#6e6e73;font-size:15px;">The Rig Doctor</span></p>
  </td></tr>
  <tr><td style="background:#000000;padding:20px 32px;color:#8e8e93;font-size:12px;line-height:1.6;">
    One use per customer. Good on Tone Tutoring (60 min.). Just reply to this email if you have a question about your rig.
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

async function sendCode(email: string) {
  if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [email],
      reply_to: REPLY_TO,
      subject: 'Your 20% off Tone Tutoring code',
      html: emailHtml(),
      text: `Here's your code for 20% off your first Tone Tutoring session: ${CODE}\n\nBook with the discount applied: ${SITE}/api/checkout?handle=tone-tutoring-follow-up&discount=${CODE}\n\nTalk soon,\nJacob\nThe Rig Doctor`,
      tags: [{ name: 'campaign', value: 'tone20_optin' }],
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    if (body.company) return NextResponse.json({ ok: true }); // honeypot
    if (!EMAIL_RE.test(email) || email.length > 200) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // Email first: that's what the visitor is waiting for. CRM failure shouldn't block it.
    await sendCode(email);
    await upsertHubSpot(email).catch((e) => console.error('HubSpot tone-offer failed:', e));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Tone offer error:', err);
    return NextResponse.json({ error: 'Could not send code' }, { status: 500 });
  }
}
