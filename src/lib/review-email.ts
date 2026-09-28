/**
 * Google review request email.
 *
 * Asks every customer the same way (no incentives, no filtering by sentiment),
 * which keeps it inside Google's review policy.
 *
 * variant 'tone'    → sent by Vince a few days after a Tone Tutoring purchase
 * variant 'general' → sent by Jacob to past build and session customers
 */

import { ENDS_ON, ENDS_LABEL } from './rewards';

const SITE = 'https://www.therigdr.com';
const IMG = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';
const SPECTRAL = 'linear-gradient(90deg,#00A85A 0%,#0071E3 50%,#8E3FD9 100%)';
const FONT = "-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif";

export type ReviewVariant = 'tone' | 'general';

/** True if the Review Rewards offer is still open `daysAhead` days from now (Central time). */
function rewardsOpenIn(daysAhead: number) {
  const d = new Date(Date.now() + daysAhead * 86_400_000);
  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(d);
  return day <= ENDS_ON;
}

function reviewUrl(variant: ReviewVariant, content: string, path = '/review') {
  const q = new URLSearchParams({
    utm_source: 'email',
    utm_medium: 'email',
    utm_campaign: variant === 'tone' ? 'review_tone' : 'review_backfill',
    utm_content: content,
  });
  return `${SITE}${path}?${q.toString()}`;
}

function copy(variant: ReviewVariant, name: string, rewards: boolean) {
  if (variant === 'tone') {
    return {
      subject: 'How did your session go?',
      preview: 'Two minutes, and it helps the next player find us.',
      eyebrow: 'Tone Tutoring',
      headline: 'How did your<br>session go?',
      paras: [
        `Hey ${name},`,
        'Hope the session helped and your rig is sounding the way you want it to.',
        'Most players find us through Google. If you have two minutes, a few honest lines about how it went helps the next guitarist figure out if we&#39;re the right fit. Good, bad or somewhere in between.',
        ...(rewards
          ? [
              `Through ${ENDS_LABEL} we&#39;re saying thanks with Rig Doctor credit: $50 for a review, $75 with a photo of your rig, $100 with a video. Mention the gift card in your review, then send us a screenshot at therigdr.com/rewards. Five stars or two, you get the card.`,
            ]
          : []),
      ],
      after: 'Haven&#39;t had your session yet? Just reply and we&#39;ll get you on the calendar.',
      signoff: 'Vince',
    };
  }
  return {
    subject: 'How did we do?',
    preview: 'Two minutes, and it helps the next player find us.',
    eyebrow: 'The Rig Doctor',
    headline: 'How did we<br>do?',
    paras: [
      `Hey ${name},`,
      'Quick one. Most players find The Rig Doctor through Google, and our reviews there are thinner than they should be.',
      'If we built your board or ran a Tone Tutoring session with you, would you leave a few honest lines about how it went? Good, bad or somewhere in between. It takes two minutes and it helps the next guitarist decide if we&#39;re the right shop for them.',
    ],
    after: 'And if anything on your rig isn&#39;t right, just reply. Lifetime support means lifetime.',
    signoff: 'Jacob',
  };
}

export function reviewEmail(variant: ReviewVariant, firstName = '') {
  const name = (firstName || '').trim() || 'there';
  // Tone Tutoring asks go out 5 days after purchase, so check the offer is still open then.
  const rewards = variant === 'tone' && rewardsOpenIn(5);
  const path = rewards ? '/rewards' : '/review';
  const c = copy(variant, name, rewards);
  const btn = (content: string, label: string) => `
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td align="center" bgcolor="#8E3FD9" style="border-radius:999px;background:#8E3FD9;background-image:${SPECTRAL};">
            <a href="${reviewUrl(variant, content, path)}" style="display:inline-block;padding:18px 38px;font-family:${FONT};font-size:17px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">${label}</a>
          </td>
        </tr></table>`;

  const html = `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark">
<title>${c.subject}</title>
</head>
<body style="margin:0;padding:0;background:#000000;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${c.preview}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#000000" style="background:#000000;">
<tr><td align="center" style="padding:24px 12px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

  <tr><td align="center" style="padding:8px 0 26px;">
    <a href="${SITE}" style="text-decoration:none;"><img src="${IMG}logo-white-hrt.png?width=280" width="110" alt="The Rig Doctor" style="display:block;border:0;width:110px;height:auto;"></a>
  </td></tr>

  <tr><td bgcolor="#0b0b0c" style="background:#0b0b0c;border-radius:24px;overflow:hidden;border:1px solid #1f1f22;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="font-size:0;line-height:0;">
        <a href="${reviewUrl(variant, 'hero', path)}" style="text-decoration:none;"><img src="${IMG}2022-L1010577.jpg?width=1120" width="560" alt="A finished Rig Doctor pedalboard" style="display:block;width:100%;max-width:560px;height:auto;border:0;border-radius:24px 24px 0 0;"></a>
      </td></tr>
      <tr><td style="height:3px;font-size:0;line-height:0;background:#8E3FD9;background-image:${SPECTRAL};">&nbsp;</td></tr>

      <tr><td align="center" style="padding:40px 32px 8px;font-family:${FONT};">
        <p style="margin:0 0 14px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#8e8e93;font-weight:600;">${c.eyebrow}</p>
        <h1 style="margin:0;font-size:44px;line-height:1.04;letter-spacing:-1.5px;font-weight:800;color:#ffffff;">${c.headline}</h1>
      </td></tr>

      <tr><td style="padding:26px 36px 6px;font-family:${FONT};">
        ${c.paras.map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#c7c7cc;">${p}</p>`).join('\n        ')}
      </td></tr>

      <tr><td align="center" style="padding:10px 32px 8px;">${btn('button', 'Leave a Google review &rarr;')}
      </td></tr>
      <tr><td align="center" style="padding:6px 32px 30px;font-family:${FONT};font-size:13px;color:#8e8e93;">
        Takes about two minutes. Opens our Google profile.
      </td></tr>

      <tr><td style="padding:0 36px;"><div style="height:1px;background:#1f1f22;font-size:0;line-height:0;">&nbsp;</div></td></tr>

      <tr><td style="padding:24px 36px 38px;font-family:${FONT};">
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#a1a1a6;">${c.after}</p>
        <p style="margin:0;font-size:16px;line-height:1.6;color:#a1a1a6;">Thanks,<br><span style="color:#ffffff;">${c.signoff}</span><br>The Rig Doctor</p>
      </td></tr>
    </table>
  </td></tr>

  <tr><td align="center" style="padding:24px 24px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:#6e6e73;">
    You&#39;re getting this because you worked with The Rig Doctor.<br>The Rig Doctor &middot; therigdr.com
  </td></tr>

</table>
</td></tr>
</table>
</body></html>`;

  const text = [
    ...c.paras.map((p) => p.replace(/&#39;/g, "'")),
    `Leave a Google review: ${reviewUrl(variant, 'text', path)}`,
    c.after.replace(/&#39;/g, "'"),
    `Thanks,\n${c.signoff}\nThe Rig Doctor`,
  ].join('\n\n');

  return { subject: c.subject, html, text };
}
