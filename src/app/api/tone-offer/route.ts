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
  const buy = (c: string) => utm(`${SITE}/api/checkout?handle=tone-tutoring-follow-up&discount=${CODE}`, c);
  const learn = utm(`${SITE}/tone-tutoring`, 'learn_more');
  const img = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';
  const logo = `${img}logo-white-hrt.png?width=280`;
  const hero = `${img}L1010577.jpg?width=1120`;
  const spectral = 'linear-gradient(90deg,#00A85A 0%,#0071E3 50%,#8E3FD9 100%)';
  const font = "-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  const session = (n: string, title: string, body: string, tag: string) => `
    <tr><td style="padding:0 0 12px;">
      <a href="${buy('session_' + tag)}" style="text-decoration:none;display:block;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" bgcolor="#141416" style="background:#141416;border:1px solid #232326;border-radius:16px;"><tr>
        <td width="44" valign="top" style="padding:18px 0 18px 18px;font-family:${font};font-size:13px;font-weight:700;letter-spacing:1px;color:#8E3FD9;">${n}</td>
        <td style="padding:16px 18px 18px 6px;font-family:${font};">
          <p style="margin:0 0 4px;font-size:17px;font-weight:700;color:#ffffff;letter-spacing:-0.2px;">${title}</p>
          <p style="margin:0;font-size:15px;line-height:1.55;color:#a1a1a6;">${body}</p>
        </td>
      </tr></table>
      </a>
    </td></tr>`;

  const step = (n: string, title: string, body: string) => `
    <tr><td style="padding:0 0 14px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
        <td width="30" valign="top"><div style="width:26px;height:26px;border-radius:26px;background:#8E3FD9;background-image:${spectral};font-family:${font};font-size:13px;font-weight:700;color:#ffffff;text-align:center;line-height:26px;">${n}</div></td>
        <td style="padding-left:12px;font-family:${font};font-size:15px;line-height:1.55;color:#a1a1a6;"><span style="color:#ffffff;font-weight:600;">${title}</span> ${body}</td>
      </tr></table>
    </td></tr>`;

  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light"><meta name="supported-color-schemes" content="dark light">
<title>Your 20% off Tone Tutoring</title>
</head>
<body style="margin:0;padding:0;background:#000000;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">20% off is already applied. One tap to book your hour on your tone.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#000000" style="background:#000000;">
<tr><td align="center" style="padding:24px 12px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

  <tr><td align="center" style="padding:8px 0 26px;">
    <a href="${utm(SITE, 'logo')}" style="text-decoration:none;"><img src="${logo}" width="110" alt="The Rig Doctor" style="display:block;border:0;width:110px;height:auto;"></a>
  </td></tr>

  <tr><td bgcolor="#0b0b0c" style="background:#0b0b0c;border-radius:24px;overflow:hidden;border:1px solid #1f1f22;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

      <tr><td style="font-size:0;line-height:0;">
        <a href="${buy('hero')}" style="text-decoration:none;"><img src="${hero}" width="560" alt="A Rig Doctor pedalboard" style="display:block;width:100%;max-width:560px;height:auto;border:0;border-radius:24px 24px 0 0;"></a>
      </td></tr>
      <tr><td style="height:3px;font-size:0;line-height:0;background:#8E3FD9;background-image:${spectral};">&nbsp;</td></tr>

      <tr><td align="center" style="padding:40px 32px 6px;font-family:${font};">
        <p style="margin:0 0 14px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#8e8e93;font-weight:600;">Tone Tutoring &middot; 60 min on video</p>
        <h1 style="margin:0;font-size:46px;line-height:1.02;letter-spacing:-1.5px;font-weight:800;color:#ffffff;">Your 20% off<br>is ready.</h1>
      </td></tr>

      <tr><td align="center" style="padding:22px 32px 4px;font-family:${font};">
        <a href="${buy('price')}" style="text-decoration:none;">
          <span style="font-size:20px;color:#6e6e73;text-decoration:line-through;">$99.99</span>
          <span style="font-size:40px;font-weight:800;color:#ffffff;letter-spacing:-1px;">&nbsp;$80</span>
          <span style="font-size:15px;color:#8e8e93;">&nbsp;USD</span>
        </a>
      </td></tr>

      <tr><td align="center" style="padding:26px 32px 10px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td align="center" bgcolor="#8E3FD9" style="border-radius:999px;background:#8E3FD9;background-image:${spectral};">
            <a href="${buy('button')}" style="display:inline-block;padding:19px 40px;font-family:${font};font-size:18px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">Claim my 20% off &rarr;</a>
          </td>
        </tr></table>
      </td></tr>
      <tr><td align="center" style="padding:6px 32px 34px;font-family:${font};font-size:13px;color:#8e8e93;">
        One tap. The discount is already applied at checkout.
      </td></tr>

      <tr><td align="center" style="padding:0 32px 36px;">
        <a href="${buy('code')}" style="text-decoration:none;">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="border:1px dashed #3a3a3c;border-radius:14px;padding:12px 22px;font-family:${font};">
              <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8e8e93;">Your code</span><br>
              <span style="font-size:24px;font-weight:800;letter-spacing:5px;color:#ffffff;">${CODE}</span>
            </td>
          </tr></table>
        </a>
      </td></tr>

      <tr><td style="padding:0 36px;"><div style="height:1px;background:#1f1f22;font-size:0;line-height:0;">&nbsp;</div></td></tr>

      <tr><td style="padding:32px 36px 6px;font-family:${font};">
        <p style="margin:0 0 6px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#8e8e93;font-weight:600;">What players book it for</p>
        <p style="margin:0 0 22px;font-size:24px;line-height:1.2;letter-spacing:-0.5px;color:#ffffff;font-weight:700;">Pick the one that sounds like you.</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${session('01', 'The noise hunt', 'There\'s a hum or hiss you\'ve been living with. We track down where it\'s coming from live on the call, cable by cable, and tell you exactly how to kill it.', 'noise')}
          ${session('02', 'The chain order fix', 'Compressor before or after the drive? What goes in the loop? We map your whole signal chain and put it in the order that actually works for your amp.', 'chain')}
          ${session('03', 'Bedroom to stage', 'Sounds great at home, falls apart at rehearsal or at the gig. We figure out why and set you up for the room you actually play in.', 'stage')}
          ${session('04', 'The full rig walkthrough', 'Every pedal, cable and setting. What\'s helping, what\'s fighting you, and a clear plan for what to change first.', 'walkthrough')}
          ${session('05', 'Before you buy', 'Eyeing a new pedal, a switcher or a full build? We\'ll tell you straight if you need it. Plenty of players leave without buying a thing.', 'before_buy')}
        </table>
      </td></tr>

      <tr><td style="padding:10px 36px 8px;"><div style="height:1px;background:#1f1f22;font-size:0;line-height:0;">&nbsp;</div></td></tr>

      <tr><td style="padding:26px 36px 8px;font-family:${font};">
        <p style="margin:0 0 18px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#8e8e93;font-weight:600;">How it works</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${step('1', 'Book your time.', 'Takes 30 seconds. Your 20% is already applied.')}
          ${step('2', 'Tell us about your rig.', 'A quick form on your gear, your style and what\'s bugging you, so we show up prepared.')}
          ${step('3', 'Get on the video call.', 'Plug in, play, and we dig into it together in real time.')}
          ${step('4', 'Keep the game plan.', 'The recording and written next steps land in your inbox within 24 hours.')}
        </table>
      </td></tr>

      <tr><td align="center" style="padding:18px 32px 30px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td align="center" bgcolor="#8E3FD9" style="border-radius:999px;background:#8E3FD9;background-image:${spectral};">
            <a href="${buy('button_bottom')}" style="display:inline-block;padding:17px 36px;font-family:${font};font-size:17px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">Book my session for $80 &rarr;</a>
          </td>
        </tr></table>
      </td></tr>

      <tr><td style="padding:14px 36px 38px;font-family:${font};">
        <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#a1a1a6;">Talk soon,<br><span style="color:#ffffff;">Jacob</span><br>The Rig Doctor</p>
        <p style="margin:0;font-size:14px;line-height:1.6;color:#8e8e93;">Want to see how it works first? <a href="${learn}" style="color:#ffffff;text-decoration:underline;">Here's the rundown.</a></p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td align="center" style="padding:24px 24px 0;font-family:${font};font-size:12px;line-height:1.6;color:#6e6e73;">
    One use per customer on Tone Tutoring (60 min.). Reply to this email with any rig question.<br>The Rig Doctor &middot; therigdr.com
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
      subject: 'Your 20% off is ready (already applied)',
      html: emailHtml(),
      text: `Your 20% off Tone Tutoring is ready. Code ${CODE} is already applied at this link: ${SITE}/api/checkout?handle=tone-tutoring-follow-up&discount=${CODE}\n\nTalk soon,\nJacob\nThe Rig Doctor`,
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
