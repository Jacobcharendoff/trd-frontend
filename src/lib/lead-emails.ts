/**
 * Free consult follow-up (/book form and the homepage form).
 *
 * Opt-in → the visitor lands on the calendar page right away.
 *
 * NOT BOOKED: scheduled at opt-in, every one canceled the moment they book.
 *   N1  +30 min   Your call isn't booked yet
 *   N2  day 1     The 3 things wrong with most pedalboards
 *   N3  day 3     What a custom board costs
 *   N4  day 6     Not ready for a build? (Tone Tutoring)
 *   N5  day 10    Should we close your request?
 *
 * BOOKED: sent once HubSpot confirms the booking, timed off the call.
 *   B1  now               You're booked. Here's how to prep
 *   B2  next day 10am CT  Before your call: how a build goes   (only if the call is 2+ days out)
 *   B3  24h before call   Tomorrow: your rig call              (only if the call is 30+ hours out)
 *
 * Booking cancels pending emails two ways: the ids the form got back (same browser), and a lookup of
 * every scheduled email to that address from info@ (booked from an email link, another device, etc).
 */

import { esc } from './hubspot';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE = 'https://www.therigdr.com';

export const TEAM_FROM = 'The Rig Doctor Team <info@therigdr.com>';
const TEAM_ADDRESS = 'info@therigdr.com';
// The first follow-up and the last one come from Vince, written like a personal note.
// Replies go straight to him.
const VINCE_FROM = process.env.RESEND_VINCE_FROM_EMAIL || 'Vince DiGioia <vince@therigdr.com>';
const VINCE_ADDRESS = 'vince@therigdr.com';
export const ALERT_FROM = 'The Rig Doctor <notifications@therigdr.com>';
export const ALERT_TO = 'info@therigdr.com';

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
const BUTTON =
  'display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #ffffff; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 16px;';
const DAY = 86_400_000;
const HOUR = 3_600_000;

// ── Resend ─────────────────────────────────────────────────────────────

export type Email = {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  scheduledAt?: string;
  tag?: string;
};

function payload(p: Email) {
  return {
    from: p.from,
    to: p.to,
    subject: p.subject,
    html: p.html,
    reply_to: p.replyTo || TEAM_ADDRESS,
    ...(p.scheduledAt ? { scheduled_at: p.scheduledAt } : {}),
    ...(p.tag ? { tags: [{ name: 'flow', value: p.tag }] } : {}),
  };
}

const headers = () => ({ Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' });

/** Send or schedule one email. Returns the Resend id, or null on failure (never throws). */
export async function sendResend(p: Email): Promise<string | null> {
  if (!RESEND_API_KEY) return null;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(payload(p)),
    });
    if (!res.ok) {
      console.error('[resend] send failed', res.status, await res.text());
      return null;
    }
    return ((await res.json()) as { id?: string }).id ?? null;
  } catch (err) {
    console.error('[resend] request failed', err);
    return null;
  }
}

/** Send or schedule several emails in one request. Returns their ids in order ([] on failure). */
export async function sendBatch(emails: Email[]): Promise<string[]> {
  if (!RESEND_API_KEY || emails.length === 0) return [];
  try {
    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(emails.map(payload)),
    });
    if (!res.ok) {
      console.error('[resend] batch failed', res.status, await res.text());
      return [];
    }
    const body = (await res.json()) as { data?: Array<{ id?: string }> };
    return (body.data ?? []).map((d) => d.id ?? '').filter(Boolean);
  } catch (err) {
    console.error('[resend] batch request failed', err);
    return [];
  }
}

export async function cancelResend(id: string) {
  if (!RESEND_API_KEY) return false;
  try {
    const res = await fetch(`https://api.resend.com/emails/${id}/cancel`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
    });
    // Already sent or already canceled comes back as an error. Nothing to do either way.
    return res.ok;
  } catch (err) {
    console.error('[resend] cancel failed', err);
    return false;
  }
}

export const RESEND_ID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Cancel every still-scheduled email from info@ to this address, created in the last `days` days.
 * Walks Resend's email list newest first. Returns how many were canceled.
 */
export async function cancelPendingFor(email: string, days = 14) {
  if (!RESEND_API_KEY) return 0;
  const target = email.trim().toLowerCase();
  const oldest = Date.now() - days * DAY;
  let after = '';
  let canceled = 0;

  for (let page = 0; page < 10; page++) {
    const url = `https://api.resend.com/emails?limit=100${after ? `&after=${after}` : ''}`;
    let body: {
      data?: Array<{ id: string; to?: string[]; from?: string; subject?: string; created_at?: string; scheduled_at?: string | null; last_event?: string }>;
      has_more?: boolean;
    };
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${RESEND_API_KEY}` } });
      if (!res.ok) {
        console.error('[resend] list failed', res.status, await res.text());
        break;
      }
      body = await res.json();
    } catch (err) {
      console.error('[resend] list request failed', err);
      break;
    }

    const rows = body.data ?? [];
    for (const r of rows) {
      const toMatch = (r.to ?? []).some((t) => t.toLowerCase().includes(target));
      // Only this campaign's emails, matched by subject, so a booking never cancels anything else
      // (a Tone Tutoring review ask, the cheat sheet emails).
      const ours = NOT_BOOKED_SUBJECTS.has((r.subject ?? '').trim());
      const pending = r.last_event === 'scheduled' || (r.scheduled_at ? Date.parse(r.scheduled_at) > Date.now() : false);
      if (toMatch && ours && pending && r.last_event !== 'canceled') {
        if (await cancelResend(r.id)) canceled++;
      }
    }

    const last = rows[rows.length - 1];
    const lastCreated = last?.created_at ? Date.parse(last.created_at.replace(' ', 'T')) : 0;
    if (!body.has_more || !last || (lastCreated && lastCreated < oldest)) break;
    after = last.id;
  }
  return canceled;
}

// ── Time ───────────────────────────────────────────────────────────────

/** 10am Central (15:00 UTC) `daysAhead` days out, and never sooner than 12 hours from now. */
export function tenAmCentral(daysAhead: number, from = Date.now()) {
  const d = new Date(from);
  d.setUTCDate(d.getUTCDate() + daysAhead);
  d.setUTCHours(15, 0, 0, 0);
  if (d.getTime() - from < 12 * HOUR) d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString();
}

/** "Thursday, Oct 2 at 1:00 PM" in Central time. */
export function centralTime(ms: number) {
  const day = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  }).format(ms);
  const time = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    hour: 'numeric',
    minute: '2-digit',
  }).format(ms);
  return `${day} at ${time}`;
}

// ── Links ──────────────────────────────────────────────────────────────

function tag(url: string, campaign: string, content: string) {
  const u = new URL(url);
  u.searchParams.set('utm_source', 'consult_email');
  u.searchParams.set('utm_medium', 'email');
  u.searchParams.set('utm_campaign', campaign);
  u.searchParams.set('utm_content', content);
  return u.toString();
}

/** The calendar page. Booking there cancels whatever is still pending. */
const calendar = (content: string) => tag(`${SITE}/book/thank-you`, 'consult_not_booked', content);

// ── Layout ─────────────────────────────────────────────────────────────

const FOOTER =
  'The Rig Doctor LLC, 641 Amesbury Rd, Montgomery, TX 77316. You got this because you asked for a free rig consultation at therigdr.com. Reply "unsubscribe" and we won\'t email you again.';

function layout(body: string, signoff = 'Mason &amp; Vince<br/>The Rig Doctor') {
  return `
<div style="font-family: ${FONT}; max-width: 560px; margin: 0 auto; color: #1d1d1f; line-height: 1.6; font-size: 16px;">
${body}
  <p>${signoff}</p>
  <p style="margin-top: 32px; font-size: 12px; color: #86868b; line-height: 1.5;">${FOOTER}</p>
</div>`.trim();
}

const button = (href: string, label: string) =>
  `<p style="margin: 24px 0;"><a href="${href}" style="${BUTTON}">${label}</a></p>`;

const list = (items: string[], ordered = true) =>
  `<${ordered ? 'ol' : 'ul'} style="padding-left: 22px; margin: 16px 0;">${items
    .map((i) => `<li style="margin-bottom: 8px;">${i}</li>`)
    .join('')}</${ordered ? 'ol' : 'ul'}>`;

const hey = (first: string) => (first ? `Hey ${esc(first)},` : 'Hey,');

function quote(notes: string) {
  const short = notes.length > 400 ? `${notes.slice(0, 400).trim()}...` : notes;
  return `<p style="margin: 20px 0; padding: 14px 18px; background: #f5f5f7; border-radius: 12px; color: #424245; font-size: 15px;">${esc(short).replace(/\n/g, '<br/>')}</p>`;
}

// ── NOT BOOKED ─────────────────────────────────────────────────────────

export type LeadInfo = { need?: string; plays?: string; notes?: string };

/** Plain, personal-looking email from Vince: no buttons, no banner, just text and a link. */
function personal(body: string) {
  return `
<div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; color: #222; line-height: 1.55; font-size: 15px;">
${body}
  <p>Vince<br/>The Rig Doctor</p>
  <p style="margin-top: 28px; font-size: 11px; color: #999; line-height: 1.5;">${FOOTER}</p>
</div>`.trim();
}

const NEED_SUBJECT: Record<string, string> = {
  new: 'Your new board',
  rebuild: 'Your board rebuild',
};
const DEFAULT_SUBJECT = 'Your build call';

/** 30 minutes after the form, if they haven't booked: a note from Vince about their rig. */
function v1(first: string, info: LeadInfo) {
  const what = info.need === 'rebuild' ? 'rebuilding your board' : info.need === 'new' ? 'a new board' : 'a build';
  const notes = (info.notes || '').trim();
  const short = notes.length > 220 ? `${notes.slice(0, 220).trim()}...` : notes;
  return {
    subject: NEED_SUBJECT[info.need || ''] || DEFAULT_SUBJECT,
    html: personal(`
  <p>${first ? `Hey ${esc(first)},` : 'Hey,'}</p>
  <p>Vince here from The Rig Doctor. Saw your note about ${what}.${short ? ` You mentioned: "${esc(short)}"` : ''}</p>
  <p>Easiest next step is a 30-minute call so I can see what you're working with. Grab whatever time works for you here: <a href="${calendar('v1_link')}">${SITE.replace('https://www.', '')}/book</a></p>
  <p>If you'd rather start over email, just reply with a couple of photos of your current board and I'll take a look.</p>`),
  };
}

/** Day 10, if they still haven't booked: the last note, also from Vince. */
function v5(first: string) {
  return {
    subject: 'Should I close out your request?',
    html: personal(`
  <p>${first ? `Hey ${esc(first)},` : 'Hey,'}</p>
  <p>Haven't heard back, so I'll keep this short. Just reply with a number:</p>
  <p>1. Still want the call (or grab a time here: <a href="${calendar('v5_link')}">${SITE.replace('https://www.', '')}/book</a>)<br/>
  2. Interested, but not right now<br/>
  3. Not for me</p>
  <p>Any answer helps me know what to do next.</p>`),
  };
}

function n1(first: string) {
  return {
    subject: "Your rig call isn't booked yet",
    html: layout(`
  <p>${hey(first)}</p>
  <p>You asked us for a free build consultation but didn't get a time on the calendar. It takes about 30 seconds:</p>
  ${button(calendar('n1_button'), 'Pick a time')}
  <p>It's a 30-minute call with one of the builders about your new board or rebuild: what you play, where the board lives, what it has to do, and what it'll cost. No pressure, no obligation.</p>
  <p>Prefer email? Reply with what's on your board now and what you want the new one to do, and we'll start there.</p>`),
  };
}

function n2(first: string) {
  return {
    subject: 'The 3 things wrong with most pedalboards',
    html: layout(`
  <p>${hey(first)}</p>
  <p>After 300+ rigs, most of the boards we open up have the same three problems:</p>
  ${list([
    '<strong>Power.</strong> Daisy chains and shared grounds cause most of the hum we hear. Isolated power fixes it.',
    '<strong>Cables.</strong> Long, cheap patch cables eat your high end and fail at the worst possible time.',
    '<strong>Order.</strong> Great pedals in the wrong spot make a great rig sound flat.',
  ])}
  <p>A custom build or rebuild gets all three right from day one. On the call we'll map out what yours needs and give you a real number.</p>
  ${button(calendar('n2_button'), 'Pick a time')}`),
  };
}

function n3(first: string) {
  return {
    subject: 'What a custom board costs (straight answer)',
    html: layout(`
  <p>${hey(first)}</p>
  <p>Most people want to know this before the call, so here it is. Our custom builds start at $1,999, not counting pedals. What moves the price is the size of the board, whether it needs MIDI switching, and how much power it has to feed.</p>
  <p>Happy with your pedals and just want the board done right? We also rebuild existing boards: new layout, new cables, new power, same pedals. We quote those on the same free call.</p>
  ${button(calendar('n3_button'), 'Pick a time')}
  <p>Every build comes with lifetime support, and we ship anywhere in the US.</p>`),
  };
}

function n4(first: string) {
  const tone = tag(`${SITE}/tone-tutoring`, 'consult_not_booked', 'n4_tone');
  return {
    subject: 'Not ready for a build?',
    html: layout(`
  <p>${hey(first)}</p>
  <p>If what you really want right now is help with your tone or a problem on the board you have, that's Tone Tutoring, not the build call. It's a 60-minute one-on-one video session. We go through your whole signal chain with you and dial it in live. $99.</p>
  ${button(tone, 'See Tone Tutoring')}
  <p>When you're ready to plan a build, the free call is still open. <a href="${calendar('n4_link')}" style="color: #0071E3;">Pick a time here</a>.</p>`),
  };
}

function n5(first: string) {
  return {
    subject: 'Should we close your request?',
    html: layout(`
  <p>${hey(first)}</p>
  <p>We haven't heard back, so we'll keep this short. Just reply with a number:</p>
  ${list([
    `Still want the call. (Or <a href="${calendar('n5_link')}" style="color: #0071E3;">grab a time here</a>.)`,
    'Interested, but not right now.',
    'Not for me.',
  ])}
  <p>Any answer helps us know what to do next.</p>`),
  };
}

/**
 * Subjects of every not-booked email, current and earlier versions, so a booking can find and cancel
 * the pending ones without touching any other email to that person.
 */
export const NOT_BOOKED_SUBJECTS = new Set<string>([
  ...Object.values(NEED_SUBJECT),
  DEFAULT_SUBJECT,
  n1('').subject,
  n2('').subject,
  n3('').subject,
  n4('').subject,
  n5('').subject,
  v5('').subject,
]);

/** The five not-booked emails, scheduled from `now`. First and last come from Vince. */
export function notBookedSequence(first: string, to: string, info: LeadInfo = {}, now = Date.now()): Email[] {
  const at = (iso: string, e: { subject: string; html: string }, t: string, fromVince = false): Email => ({
    from: fromVince ? VINCE_FROM : TEAM_FROM,
    to,
    subject: e.subject,
    html: e.html,
    scheduledAt: iso,
    tag: t,
    ...(fromVince ? { replyTo: VINCE_ADDRESS } : {}),
  });
  return [
    at(new Date(now + 30 * 60_000).toISOString(), v1(first, info), 'consult_v1', true),
    at(tenAmCentral(1, now), n2(first), 'consult_n2'),
    at(tenAmCentral(3, now), n3(first), 'consult_n3'),
    at(tenAmCentral(6, now), n4(first), 'consult_n4'),
    at(tenAmCentral(10, now), v5(first), 'consult_v5', true),
  ];
}

// ── BOOKED ─────────────────────────────────────────────────────────────

const PREP = [
  'Two photos of your board: from the top, and underneath if you can flip it.',
  'Your pedals in order, from guitar to amp. A phone note is fine.',
  "Your amp and guitars, and whether you use the amp's effects loop.",
  'What the new board has to do, and what the current one gets wrong (noise, size, tap-dancing, reliability).',
  'Where the board lives: home, church, weekly gigs, or the road.',
  'A rough budget, and any date you need it by.',
];

function b1(first: string, callAt: number | null) {
  return {
    subject: "You're booked. Here's how to prep",
    html: layout(`
  <p>${hey(first)}</p>
  <p>You're on the calendar${callAt ? ` for <strong>${centralTime(callAt)} Central</strong>` : ''}. The calendar invite has the details.</p>
  <p>To get the most out of 30 minutes, reply to this email with whatever you can of this:</p>
  ${list(PREP)}
  <p>The more we see before the call, the more of the call goes to your plan instead of questions.</p>
  <p>Talk soon.</p>`),
  };
}

function b2(first: string) {
  const gallery = tag(`${SITE}/gallery`, 'consult_booked', 'b2_gallery');
  return {
    subject: 'Before your call: how a build goes',
    html: layout(`
  <p>${hey(first)}</p>
  <p>Quick look at what happens after we talk, so nothing is a surprise:</p>
  ${list([
    '<strong>The call.</strong> We scope your build: size, power, switching, and where the board lives.',
    '<strong>The diagram.</strong> We draw your rig: signal path, power and switching. You see it before we build it.',
    '<strong>The quote.</strong> One number, before anything gets built.',
    '<strong>The build.</strong> Every cable cut to length, isolated power, clean switching.',
    '<strong>Lifetime support.</strong> On every board we build.',
  ])}
  <p>Mason has built rigs for Andy Timmons, Oz Noy, Michael Landau and Kirk Fletcher. Vince plays lead with 35 Drive. Your board gets the same care.</p>
  ${button(gallery, 'See recent builds')}
  <p>If you haven't sent photos of your board yet, reply with them anytime before the call.</p>`),
  };
}

function b3(first: string, callAt: number) {
  return {
    subject: 'Tomorrow: your rig call',
    html: layout(`
  <p>${hey(first)}</p>
  <p>Quick reminder: we're talking tomorrow, <strong>${centralTime(callAt)} Central</strong>.</p>
  <p>If you haven't yet, reply with photos of your board (top and underneath) and your pedal order. Five minutes now saves fifteen on the call.</p>
  <p>Talk tomorrow.</p>`),
  };
}

/** The booked sequence. `callAt` is the call start (ms), if known. */
export function bookedSequence(first: string, to: string, callAt: number | null, now = Date.now()): Email[] {
  const base = (e: { subject: string; html: string }, t: string, scheduledAt?: string): Email => ({
    from: TEAM_FROM,
    to,
    subject: e.subject,
    html: e.html,
    tag: t,
    ...(scheduledAt ? { scheduledAt } : {}),
  });

  const out: Email[] = [base(b1(first, callAt), 'consult_b1')];
  if (!callAt) return out;

  const untilCall = callAt - now;
  if (untilCall >= 2 * DAY) {
    const b2At = Date.parse(tenAmCentral(1, now));
    if (callAt - b2At >= 24 * HOUR) out.push(base(b2(first), 'consult_b2', new Date(b2At).toISOString()));
  }
  if (untilCall >= 30 * HOUR) {
    out.push(base(b3(first, callAt), 'consult_b3', new Date(callAt - 24 * HOUR).toISOString()));
  }
  return out;
}

// ── Team alert ─────────────────────────────────────────────────────────

export function consultTeamAlert(d: {
  name: string;
  first: string;
  email: string;
  plays: string;
  lookingFor: string;
  notes: string;
  source: string;
  page: string;
  hubspotUrl: string | null;
  followUpScheduled: boolean;
}) {
  const row = (label: string, value: string) =>
    value
      ? `<tr><td style="padding: 6px 16px 6px 0; color: #86868b; font-size: 14px; vertical-align: top; white-space: nowrap;">${label}</td><td style="padding: 6px 0; font-size: 14px;">${value}</td></tr>`
      : '';
  const reply = `mailto:${encodeURIComponent(d.email)}?subject=${encodeURIComponent('Your rig consult with The Rig Doctor')}`;
  return {
    subject: `New build consult request: ${d.name || d.email}`,
    html: `
<div style="font-family: ${FONT}; max-width: 560px; margin: 0 auto; color: #1d1d1f; line-height: 1.6; font-size: 15px;">
  <p style="font-size: 18px; font-weight: 700; margin: 0 0 12px;">New free build consult request</p>
  <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; margin-bottom: 16px;">
    ${row('Name', esc(d.name))}
    ${row('Email', `<a href="mailto:${esc(d.email)}" style="color: #0071E3;">${esc(d.email)}</a>`)}
    ${row('Looking for', esc(d.lookingFor))}
    ${row('Plays', esc(d.plays))}
    ${row('Form', d.source === 'homepage' ? 'Homepage' : '/book')}
    ${row('Page', esc(d.page))}
  </table>
  ${d.notes ? `<p style="margin: 0 0 6px; color: #86868b; font-size: 14px;">Rig notes</p>${quote(d.notes)}` : '<p style="color: #86868b;">No rig notes.</p>'}
  <p style="margin: 20px 0;">
    <a href="${reply}" style="display: inline-block; background: #1d1d1f; color: #ffffff; padding: 12px 28px; border-radius: 999px; text-decoration: none; font-weight: 600;">Reply to ${esc(d.first || 'them')}</a>
    ${d.hubspotUrl ? `&nbsp; <a href="${d.hubspotUrl}" style="color: #0071E3; font-size: 14px;">Open in HubSpot</a>` : ''}
  </p>
  <p style="color: #86868b; font-size: 13px;">They were sent straight to the calendar.${d.followUpScheduled ? " If they don't book, a personal note from Vince goes out at 30 minutes (replies go to vince@), then follow-ups on days 1, 3, 6 and 10. Booking stops them and starts the prep emails." : ''} The page promises a reply within 24 hours.</p>
</div>`.trim(),
  };
}
