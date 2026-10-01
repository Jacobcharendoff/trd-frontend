/**
 * Emails for the Review Rewards program.
 * Same dark design as the Tone Tutoring offer email. No em dashes in copy.
 */

import { SITE, ENDS_LABEL, POSTAL_ADDRESS, TIERS, type Tier, type IssuedReward } from './rewards';

const IMG = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';
const SPECTRAL = 'linear-gradient(90deg,#00A85A 0%,#0071E3 50%,#8E3FD9 100%)';
const FONT = "-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',Roboto,Helvetica,Arial,sans-serif";

function link(path: string, campaign: string, content: string) {
  const url = path.startsWith('http') ? path : `${SITE}${path}`;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}utm_source=trd_email&utm_medium=email&utm_campaign=${campaign}&utm_content=${content}`;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function p(html: string) {
  return `<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:#c7c7cc;">${html}</p>`;
}

function button(href: string, label: string) {
  return `
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td align="center" bgcolor="#8E3FD9" style="border-radius:999px;background:#8E3FD9;background-image:${SPECTRAL};">
          <a href="${href}" style="display:inline-block;padding:18px 38px;font-family:${FONT};font-size:17px;font-weight:700;color:#ffffff;text-decoration:none;border-radius:999px;">${label}</a>
        </td>
      </tr></table>`;
}

function tierTable(href: (c: string) => string) {
  const row = (t: Tier, last: boolean) => `
        <tr><td style="padding:14px 18px;${last ? '' : 'border-bottom:1px solid #232326;'}">
          <a href="${href('tier_' + t)}" style="text-decoration:none;display:block;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
              <td width="78" style="font-family:${FONT};font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">$${t}</td>
              <td style="font-family:${FONT};font-size:15px;color:#c7c7cc;">${TIERS[t].label}</td>
            </tr></table>
          </a>
        </td></tr>`;
  return `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#141416" style="background:#141416;border:1px solid #232326;border-radius:16px;">
        ${row(50, false)}${row(75, false)}${row(100, true)}
      </table>`;
}

interface ShellOpts {
  title: string;
  preview: string;
  heroHref: string;
  eyebrow: string;
  headline: string;
  body: string;
  cta?: { href: string; label: string; note?: string };
  after?: string;
  signoff?: string;
  footer: string;
}

function shell(o: ShellOpts) {
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<meta name="color-scheme" content="dark"><meta name="supported-color-schemes" content="dark">
<title>${o.title}</title>
</head>
<body style="margin:0;padding:0;background:#000000;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${o.preview}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="#000000" style="background:#000000;">
<tr><td align="center" style="padding:24px 12px 40px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
  <tr><td align="center" style="padding:8px 0 26px;">
    <a href="${SITE}" style="text-decoration:none;"><img src="${IMG}logo-white-hrt.png?width=280" width="110" alt="The Rig Doctor" style="display:block;border:0;width:110px;height:auto;"></a>
  </td></tr>
  <tr><td bgcolor="#0b0b0c" style="background:#0b0b0c;border-radius:24px;overflow:hidden;border:1px solid #1f1f22;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="font-size:0;line-height:0;">
        <a href="${o.heroHref}" style="text-decoration:none;"><img src="${IMG}2022-L1010577.jpg?width=1120" width="560" alt="A finished Rig Doctor pedalboard" style="display:block;width:100%;max-width:560px;height:auto;border:0;border-radius:24px 24px 0 0;"></a>
      </td></tr>
      <tr><td style="height:3px;font-size:0;line-height:0;background:#8E3FD9;background-image:${SPECTRAL};">&nbsp;</td></tr>
      <tr><td align="center" style="padding:40px 32px 8px;font-family:${FONT};">
        <p style="margin:0 0 14px;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#8e8e93;font-weight:600;">${o.eyebrow}</p>
        <h1 style="margin:0;font-size:44px;line-height:1.04;letter-spacing:-1.5px;font-weight:800;color:#ffffff;">${o.headline}</h1>
      </td></tr>
      <tr><td style="padding:26px 36px 6px;font-family:${FONT};">
        ${o.body}
      </td></tr>
      ${
        o.cta
          ? `<tr><td align="center" style="padding:10px 32px 8px;">${button(o.cta.href, o.cta.label)}
      </td></tr>
      <tr><td align="center" style="padding:6px 32px 30px;font-family:${FONT};font-size:13px;color:#8e8e93;">${o.cta.note || ''}</td></tr>`
          : ''
      }
      <tr><td style="padding:0 36px;"><div style="height:1px;background:#1f1f22;font-size:0;line-height:0;">&nbsp;</div></td></tr>
      <tr><td style="padding:24px 36px 38px;font-family:${FONT};">
        ${o.after ? `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#a1a1a6;">${o.after}</p>` : ''}
        <p style="margin:0;font-size:16px;line-height:1.6;color:#a1a1a6;">Thanks,<br><span style="color:#ffffff;">${o.signoff || 'The Rig Doctor Team'}</span></p>
      </td></tr>
    </table>
  </td></tr>
  <tr><td align="center" style="padding:24px 24px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:#6e6e73;">
    ${o.footer}
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function marketingFooter(unsubscribeUrl: string) {
  return `You&#39;re getting this because you&#39;ve ordered from The Rig Doctor.<br>
    <a href="${unsubscribeUrl}" style="color:#8e8e93;text-decoration:underline;">Unsubscribe</a> &middot; ${POSTAL_ADDRESS}`;
}

const HOW_IT_WORKS = (claim: string) => `
        <p style="margin:8px 0 10px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#8e8e93;font-weight:600;">How it works</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${[
            'Write your review on Google and add your photo or video. Mention that we sent you a gift card as a thank-you, so the next player reading it knows.',
            `Screenshot your posted review and drop it at <a href="${claim}" style="color:#ffffff;text-decoration:underline;">therigdr.com/rewards</a>.`,
            'Your gift card lands in your inbox.',
          ]
            .map(
              (t, i) => `<tr>
            <td width="34" valign="top" style="padding:0 0 12px;"><div style="width:24px;height:24px;border-radius:24px;background:#8E3FD9;background-image:${SPECTRAL};font-family:${FONT};font-size:12px;font-weight:700;color:#ffffff;text-align:center;line-height:24px;">${i + 1}</div></td>
            <td valign="top" style="padding:2px 0 12px;font-family:${FONT};font-size:15px;line-height:1.55;color:#c7c7cc;">${t}</td>
          </tr>`,
            )
            .join('')}
        </table>`;

// ── Drip ──────────────────────────────────────────────────────────────────

export function dripEmail(step: 1 | 2 | 3, firstName: string | null, unsubscribeUrl: string) {
  const name = esc((firstName || '').trim()) || 'there';
  const campaign = `review_rewards_${step}`;
  const claim = link('/rewards', campaign, 'how_it_works');
  const u = (c: string) => link('/rewards', campaign, c);
  const footer = marketingFooter(unsubscribeUrl);

  if (step === 1) {
    return {
      subject: 'How did we do? (Up to $100 in it for you)',
      html: shell({
        title: 'How did we do?',
        preview: 'Leave an honest Google review and we&#39;ll send you up to $100 in Rig Doctor credit.',
        heroHref: u('hero'),
        eyebrow: 'Up to $100 in Rig Doctor credit',
        headline: 'How did<br>we do?',
        body: [
          p(`Hey ${name},`),
          p('Whether we built your board, sorted out your signal chain on a Tone Tutoring call, or sent you the cables and parts to bring your rig to life, we want to hear how it went. And we want to see the rig.'),
          p('Leave us an honest Google review and we&#39;ll send you a Rig Doctor gift card as a thank-you:'),
          tierTable(u),
          '<div style="height:22px;line-height:22px;font-size:0;">&nbsp;</div>',
          HOW_IT_WORKS(claim),
          p('<span style="color:#ffffff;">Five stars or two, you get the card.</span> We just want the truth.'),
        ].join('\n'),
        cta: { href: u('button'), label: 'Get my gift card &rarr;', note: `Runs through ${ENDS_LABEL}. One per customer.` },
        footer,
      }),
      text: `Hey ${firstName || 'there'},

Whether we built your board, sorted out your signal chain on a Tone Tutoring call, or sent you the cables and parts to bring your rig to life, we want to hear how it went. And we want to see the rig.

Leave us an honest Google review and we'll send you a Rig Doctor gift card as a thank-you:
$50 for a written review
$75 for a review + a photo of your rig
$100 for a review + a video of it in action

1. Write your review on Google and add your photo or video. Mention that we sent you a gift card as a thank-you.
2. Screenshot your posted review and drop it at ${SITE}/rewards
3. Your gift card lands in your inbox.

Five stars or two, you get the card. We just want the truth. Runs through ${ENDS_LABEL}. One per customer.

Thanks,
The Rig Doctor Team

Unsubscribe: ${unsubscribeUrl}
${POSTAL_ADDRESS}`,
    };
  }

  if (step === 2) {
    return {
      subject: 'Show off the handiwork',
      html: shell({
        title: 'Show off the handiwork',
        preview: 'A photo of your rig gets you $75 in Rig Doctor credit. A video gets you $100.',
        heroHref: u('hero'),
        eyebrow: 'Your credit is still waiting',
        headline: 'Show off the<br>handiwork.',
        body: [
          p(`Hey ${name},`),
          p('Your board on a stage, in the studio, on the bedroom floor. That&#39;s what helps the next guitarist decide if we&#39;re the right shop.'),
          p('Post a Google review with a photo and we&#39;ll send you <span style="color:#ffffff;font-weight:700;">$75</span> in Rig Doctor credit. Add a video of it in action and it&#39;s <span style="color:#ffffff;font-weight:700;">$100</span>. Just words? Still <span style="color:#ffffff;font-weight:700;">$50</span>.'),
          p('Mention the gift card in your review, screenshot it, and send it over. Takes five minutes.'),
        ].join('\n'),
        cta: { href: u('button'), label: 'Claim my credit &rarr;', note: `Good, bad or in between, you get the card. Ends ${ENDS_LABEL}.` },
        footer,
      }),
      text: `Hey ${firstName || 'there'},

Your board on a stage, in the studio, on the bedroom floor. That's what helps the next guitarist decide if we're the right shop.

Post a Google review with a photo and we'll send you $75 in Rig Doctor credit. Add a video of it in action and it's $100. Just words? Still $50.

Mention the gift card in your review, screenshot it, and send it over: ${SITE}/rewards

Good, bad or in between, you get the card. Ends ${ENDS_LABEL}.

Thanks,
The Rig Doctor Team

Unsubscribe: ${unsubscribeUrl}
${POSTAL_ADDRESS}`,
    };
  }

  return {
    subject: 'Last call: your Rig Doctor credit',
    html: shell({
      title: 'Last call',
      preview: `Up to $100 for an honest review. Wraps up ${ENDS_LABEL}.`,
      heroHref: u('hero'),
      eyebrow: `Ends ${ENDS_LABEL}`,
      headline: 'Last call.',
      body: [
        p(`Hey ${name},`),
        p(`The review thank-you wraps up on ${ENDS_LABEL}.`),
        p('Honest Google review, you get <span style="color:#ffffff;font-weight:700;">$50</span>. Add a photo, <span style="color:#ffffff;font-weight:700;">$75</span>. Add a video, <span style="color:#ffffff;font-weight:700;">$100</span>. Mention the gift card in your review, screenshot it, and send it our way.'),
      ].join('\n'),
      cta: { href: u('button'), label: 'Claim my credit &rarr;', note: 'Takes about five minutes.' },
      after: 'Already posted yours but haven&#39;t sent the screenshot? That&#39;s the last step.',
      footer,
    }),
    text: `Hey ${firstName || 'there'},

The review thank-you wraps up on ${ENDS_LABEL}.

Honest Google review, you get $50. Add a photo, $75. Add a video, $100. Mention the gift card in your review, screenshot it, and send it our way: ${SITE}/rewards

Thanks,
The Rig Doctor Team

Unsubscribe: ${unsubscribeUrl}
${POSTAL_ADDRESS}`,
  };
}

// ── Reward delivered ──────────────────────────────────────────────────────

export function rewardEmail(firstName: string | null, reward: IssuedReward) {
  const name = esc((firstName || '').trim()) || 'there';
  const isGift = reward.type === 'gc';
  const shop = link('/tone-tutoring', 'review_rewards_delivered', 'button');
  const howTo = isGift
    ? 'Enter it in the gift card box at checkout. Use it on Tone Tutoring or a Rig Blueprint at therigdr.com, or put it toward a custom build. Whatever you don&#39;t spend stays on the card.'
    : `Enter it at checkout for $${reward.amount} off one order. Use it on Tone Tutoring or a Rig Blueprint at therigdr.com, or put it toward a custom build.`;
  return {
    subject: `Your $${reward.amount} Rig Doctor ${isGift ? 'gift card' : 'credit'}`,
    html: shell({
      title: `Your $${reward.amount} Rig Doctor gift card`,
      preview: `Thanks for the review. Here&#39;s your $${reward.amount}.`,
      heroHref: shop,
      eyebrow: `$${reward.amount} ${isGift ? 'gift card' : 'credit'}`,
      headline: 'Thanks for<br>telling it straight.',
      body: [
        p(`Hey ${name},`),
        p(`Thanks for the review${reward.amount > 50 ? ' and for showing off the rig' : ''}. Here&#39;s your $${reward.amount}.`),
        `<table role="presentation" cellpadding="0" cellspacing="0" align="center" style="margin:6px auto 22px;"><tr>
          <td align="center" style="border:1px dashed #3a3a3c;border-radius:14px;padding:14px 24px;font-family:${FONT};">
            <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#8e8e93;">Your ${isGift ? 'gift card' : 'code'}</span><br>
            <span style="font-size:22px;font-weight:800;letter-spacing:3px;color:#ffffff;">${esc(reward.code)}</span>
          </td>
        </tr></table>`,
        p(howTo),
      ].join('\n'),
      cta: { href: shop, label: 'Spend it &rarr;' },
      after: 'Questions about your rig? Just reply.',
      footer: `${POSTAL_ADDRESS}`,
    }),
    text: `Hey ${firstName || 'there'},

Thanks for the review. Here's your $${reward.amount}.

Your ${isGift ? 'gift card' : 'code'}: ${reward.code}

${howTo.replace(/&#39;/g, "'")}

${SITE}/tone-tutoring

Thanks,
The Rig Doctor Team`,
  };
}

// ── Internal notifications ────────────────────────────────────────────────

export function claimNotificationEmail(o: {
  name: string;
  email: string;
  tier: Tier;
  reward: IssuedReward | null;
  customerAdminUrl: string;
  rewardAdminUrl: string | null;
  revokeUrl: string | null;
  shareOk: boolean;
  reviewText: string;
  delivered: boolean;
  error?: string;
}) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#6e6e73;font-size:14px;vertical-align:top;">${k}</td><td style="padding:6px 0;color:#111;font-size:14px;">${v}</td></tr>`;
  const html = `<div style="font-family:${FONT};max-width:560px;">
  <h2 style="margin:0 0 6px;font-size:20px;">${o.reward ? `$${o.tier} review reward issued` : 'Review reward claim needs a look'}</h2>
  <p style="margin:0 0 16px;color:#6e6e73;font-size:14px;">Screenshot of their Google review is attached.</p>
  <table cellpadding="0" cellspacing="0">
    ${row('Customer', `${esc(o.name)} &lt;${esc(o.email)}&gt;`)}
    ${row('Tier', `$${o.tier} (${TIERS[o.tier].short})`)}
    ${row('Reward', o.reward ? `${o.reward.type === 'gc' ? 'Gift card' : 'Discount code'} ${esc(o.reward.code)}` : `Not issued: ${esc(o.error || 'unknown error')}`)}
    ${row('Email to customer', o.delivered ? 'Sent' : 'NOT sent, forward the code manually')}
    ${row('OK to share on site/socials', o.shareOk ? 'Yes' : 'No')}
    ${o.reviewText ? row('Their review', esc(o.reviewText).replace(/\n/g, '<br>')) : ''}
  </table>
  <p style="margin:18px 0 0;font-size:14px;">
    <a href="${o.customerAdminUrl}">Customer in Shopify</a>
    ${o.rewardAdminUrl ? ` &middot; <a href="${o.rewardAdminUrl}">Reward in Shopify</a>` : ''}
  </p>
  ${
    o.revokeUrl
      ? `<p style="margin:18px 0 0;font-size:13px;color:#6e6e73;">Review doesn&#39;t check out? <a href="${o.revokeUrl}">Cancel this reward</a>.</p>`
      : ''
  }
</div>`;
  return {
    subject: o.reward
      ? `Review reward: $${o.tier} to ${o.name || o.email}`
      : `Review reward claim FAILED for ${o.name || o.email}`,
    html,
  };
}

export function weeklySummaryEmail(s: {
  sent: [number, number, number];
  claimed: number;
  byTier: Record<Tier, number>;
  optedOut: number;
}) {
  const total = s.byTier[50] * 50 + s.byTier[75] * 75 + s.byTier[100] * 100;
  const html = `<div style="font-family:${FONT};max-width:560px;font-size:15px;color:#111;">
  <h2 style="margin:0 0 12px;font-size:20px;">Review rewards: where it stands</h2>
  <p style="margin:0 0 6px;">${
    s.sent[0] + s.sent[1] + s.sent[2]
      ? `Emails sent: ${s.sent[0]} (1st) &middot; ${s.sent[1]} (2nd) &middot; ${s.sent[2]} (last call)`
      : 'The emails go out through Shopify Email. Opens, clicks and sales are in Shopify under Marketing.'
  }</p>
  <p style="margin:0 0 6px;">Claims: <b>${s.claimed}</b> &middot; $50: ${s.byTier[50]} &middot; $75: ${s.byTier[75]} &middot; $100: ${s.byTier[100]}</p>
  <p style="margin:0 0 6px;">Credit issued: <b>$${total}</b></p>
  <p style="margin:0 0 6px;">Unsubscribed: ${s.optedOut}</p>
  <p style="margin:14px 0 0;color:#6e6e73;font-size:13px;">Every claim is tagged in Shopify. Filter customers by the tag trd-rr-claimed to see them all.</p>
</div>`;
  return { subject: `Review rewards: ${s.claimed} claims, $${total} issued`, html };
}
