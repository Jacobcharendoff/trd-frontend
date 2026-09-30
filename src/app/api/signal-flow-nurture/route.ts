import { NextRequest, NextResponse } from 'next/server';

/*
 * Signal Flow Cheat Sheet — Nurture Sequence API
 *
 * Called after a user submits their email for the PDF.
 * Schedules 4 emails via Resend:
 *   1. Immediate: Welcome + PDF delivery
 *   2. Day 3: Signal chain tip + soft Tone Tutoring mention
 *   3. Day 7: Vince, Tone Tutoring with TONE20 (20% off) applied
 *   4. Day 12: Free 30-minute build consultation
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
// Sent as the team, not a person. Deliberately not RESEND_FROM_EMAIL, which may still name an individual.
const FROM_EMAIL = 'The Rig Doctor Team <info@therigdr.com>';
const PDF_URL =
  'https://ul04rn4k3jtypxsy.public.blob.vercel-storage.com/Signal_Flow_Cheat_Sheet-ht17iWYR53dcOwLBPjes5W2F4jgaNa.pdf';
const SITE = 'https://www.therigdr.com';

/** Tag every link so GA4 credits the email that drove the visit, booking or sale. */
function utm(url: string, content: string) {
  const u = new URL(url);
  u.searchParams.set('utm_source', 'signal_flow_email');
  u.searchParams.set('utm_medium', 'email');
  u.searchParams.set('utm_campaign', 'signal_flow_nurture');
  u.searchParams.set('utm_content', content);
  return u.toString();
}

const TONE_TUTORING_URL = `${SITE}/tone-tutoring`;
// TONE20: 20% off Tone Tutoring, one use per customer. Applied automatically at checkout by this link.
const TONE20_CHECKOUT = `${SITE}/api/checkout?handle=tone-tutoring-follow-up&discount=TONE20`;
const BOOK_URL = `${SITE}/book`;
const BUTTON_STYLE =
  'display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 16px;';

// ── Email content ──────────────────────────────────────────────────────

function email1(firstName: string) {
  const name = firstName || 'there';
  return {
    subject: "Your cheat sheet's in here",
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1d1d1f; line-height: 1.6; font-size: 16px;">
  <p>Hey ${name},</p>

  <p>Here's your Signal Flow Cheat Sheet:</p>

  <p style="margin: 24px 0;">
    <a href="${PDF_URL}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 16px;">Download the PDF</a>
  </p>

  <p>12 signal chain diagrams covering everything from a basic mono setup to wet/dry/wet and 4-cable method. Print it, tape it to your wall, keep it next to your board. That's what it's for.</p>

  <p>Quick thing about us: The Rig Doctor is Mason and Vince, two rig builders with 17 years and 300+ custom rigs behind them, for touring musicians, session players, and bedroom shredders who just want their stuff to sound right. We started The Rig Doctor because we kept seeing the same problem over and over. Great players with great gear, wired wrong.</p>

  <p>If you ever have a signal chain question, just reply to this email. We read everything.</p>

  <p>Talk soon,<br/>The Rig Doctor Team</p>
  <p style="margin-top: 32px; font-size: 12px; color: #86868b; line-height: 1.5;">The Rig Doctor LLC, 641 Amesbury Rd, Montgomery, TX 77316. You got this because you downloaded our Signal Flow Cheat Sheet. Reply "unsubscribe" and we'll take you off the list.</p>
</div>
    `.trim(),
  };
}

function email2(firstName: string) {
  const name = firstName || 'there';
  return {
    subject: 'The thing nobody explains about buffers',
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1d1d1f; line-height: 1.6; font-size: 16px;">
  <p>Hey ${name},</p>

  <p>Since you grabbed the cheat sheet, figured we'd share something that trips up almost everyone we work with. Buffers.</p>

  <p>Here's the deal: every cable on your board is a tiny antenna sucking tone out of your signal. The longer your cable runs and the more pedals you chain together, the more high end you lose. Your sound gets darker and muddier the further it travels. That's not your pedals. That's physics.</p>

  <p>A buffer fixes this. It takes your high-impedance guitar signal and converts it to low-impedance so it can travel through your whole chain without losing clarity. Think of it like a signal booster for your tone.</p>

  <p><strong>Where to put one:</strong> First in the chain (right after your guitar) is the most common spot. If you have a long cable run to your amp, putting a second buffer at the end of your chain helps too. Some pedals already have buffers built in. Boss pedals, for example, are buffered bypass. So if you've got a Boss tuner up front, you might already be covered.</p>

  <p><strong>One thing to watch:</strong> If you're running a fuzz face or vintage-style fuzz, those want to see your guitar's raw signal directly. Put the fuzz before the buffer, or you'll lose that sputtery, reactive feel those pedals are known for.</p>

  <p>That's the kind of stuff the cheat sheet covers at a high level, but there's only so much a diagram can do for your specific rig. Every board is different. Different pedals, different cable runs, different problems.</p>

  <p>If you've got a setup that's fighting you and you can't figure out why, that's literally what we do. We offer 1-on-1 Tone Tutoring sessions where we go through your whole rig on a video call and sort it out. 60 minutes, and you walk away with a plan that actually works for your gear.</p>

  <p><a href="${utm(TONE_TUTORING_URL, 'e2_tone_tutoring')}" style="color: #6d28d9;">Here's how a session works</a>. It's $99.</p>

  <p>No pressure on that. Just wanted you to know it exists.</p>

  <p>The Rig Doctor Team</p>
  <p style="margin-top: 32px; font-size: 12px; color: #86868b; line-height: 1.5;">The Rig Doctor LLC, 641 Amesbury Rd, Montgomery, TX 77316. You got this because you downloaded our Signal Flow Cheat Sheet. Reply "unsubscribe" and we'll take you off the list.</p>
</div>
    `.trim(),
  };
}

function email3(firstName: string) {
  const name = firstName || 'there';
  return {
    subject: 'Still chasing that tone?',
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1d1d1f; line-height: 1.6; font-size: 16px;">
  <p>Hey ${name},</p>

  <p>Vince here from The Rig Doctor. I'm the one who runs our Tone Tutoring sessions, and I wanted to put a name to the face you'd actually be working with.</p>

  <p>You know that feeling where you've watched a dozen YouTube videos on signal chain, read three forum threads, and you're somehow more confused than when you started? Everyone's got an opinion. Half of them contradict each other. And none of them have seen your actual board.</p>

  <p>That's the gap a cheat sheet can't fill. Diagrams show you the theory. But your rig has its own quirks. Your power supply, your specific pedals, the way your amp responds to what's in front of it.</p>

  <p>Tone Tutoring is 60 minutes on a video call where we go through your whole signal chain together. You show me your board, I tell you what I'd change and why. You get a recording of the session and follow-up notes so you can actually do the work after we hang up.</p>

  <p>It's normally $99. Since you grabbed the cheat sheet, your first session is 20% off, so $79.20. Code <strong>TONE20</strong> is already applied at the button below.</p>

  <p>Most guys tell me they would've saved twice that in pedals they bought trying to fix a problem that turned out to be a wiring issue.</p>

  <p style="margin: 24px 0;">
    <a href="${utm(TONE20_CHECKOUT, 'e3_tone20_button')}" style="${BUTTON_STYLE}">Book Tone Tutoring for $79.20</a>
  </p>

  <p>Want to see what we cover first? <a href="${utm(TONE_TUTORING_URL, 'e3_learn_more')}" style="color: #6d28d9;">Here's the rundown</a>.</p>

  <p>Either way, thanks for downloading the cheat sheet. Hope it's been useful.</p>

  <p>Vince<br/><span style="color: #86868b;">The Rig Doctor · Houston, TX</span></p>
  <p style="margin-top: 32px; font-size: 12px; color: #86868b; line-height: 1.5;">The Rig Doctor LLC, 641 Amesbury Rd, Montgomery, TX 77316. You got this because you downloaded our Signal Flow Cheat Sheet. Reply "unsubscribe" and we'll take you off the list.</p>
</div>
    `.trim(),
  };
}

function email4(firstName: string) {
  const name = firstName || 'there';
  return {
    subject: 'When a board needs more than a tune-up',
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1d1d1f; line-height: 1.6; font-size: 16px;">
  <p>Hey ${name},</p>

  <p>Last one from us for now.</p>

  <p>A lot of boards just need a better chain order or a power fix, and that's what Tone Tutoring is for. But some boards are past tweaking. Daisy-chained power, tired solderless cables, and every new pedal makes it a little noisier. That's when a rebuild makes sense.</p>

  <p>Every custom build starts with a free 30-minute call. We look at what you've got, talk through how you play, and give you a real number. Builds start at $1,999, usually take 4 to 8 weeks, and come with lifetime support.</p>

  <p style="margin: 24px 0;">
    <a href="${utm(BOOK_URL, 'e4_book_consult')}" style="${BUTTON_STYLE}">Book a free 30-minute call</a>
  </p>

  <p>Not there yet? No worries. Keep the cheat sheet next to your board, and reply any time you get stuck.</p>

  <p>The Rig Doctor Team</p>
  <p style="margin-top: 32px; font-size: 12px; color: #86868b; line-height: 1.5;">The Rig Doctor LLC, 641 Amesbury Rd, Montgomery, TX 77316. You got this because you downloaded our Signal Flow Cheat Sheet. Reply "unsubscribe" and we'll take you off the list.</p>
</div>
    `.trim(),
  };
}

// ── Resend send helper ─────────────────────────────────────────────────

const VINCE_FROM_EMAIL = process.env.RESEND_VINCE_FROM_EMAIL || 'Vince <vince@therigdr.com>';

async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
  scheduledAt?: string;
  from?: string;
}) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: params.from || FROM_EMAIL,
      to: params.to,
      subject: params.subject,
      html: params.html,
      reply_to: params.from === VINCE_FROM_EMAIL ? 'vince@therigdr.com' : 'info@therigdr.com',
      ...(params.scheduledAt ? { scheduled_at: params.scheduledAt } : {}),
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Resend error: ${res.status} ${error}`);
  }

  return res.json();
}

// ── API route handler ──────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 },
      );
    }

    const { email, firstName } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    // Calculate scheduled send times
    const now = new Date();
    const day3 = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const day7 = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const day12 = new Date(now.getTime() + 12 * 24 * 60 * 60 * 1000);

    const e1 = email1(firstName);
    const e2 = email2(firstName);
    const e3 = email3(firstName);
    const e4 = email4(firstName);

    // Fire all 4 emails (email 1 immediate, 2 to 4 scheduled)
    const results = await Promise.allSettled([
      sendEmail({ to: email, subject: e1.subject, html: e1.html }),
      sendEmail({
        to: email,
        subject: e2.subject,
        html: e2.html,
        scheduledAt: day3.toISOString(),
      }),
      sendEmail({
        to: email,
        subject: e3.subject,
        html: e3.html,
        scheduledAt: day7.toISOString(),
        from: VINCE_FROM_EMAIL,
      }),
      sendEmail({
        to: email,
        subject: e4.subject,
        html: e4.html,
        scheduledAt: day12.toISOString(),
      }),
    ]);

    const failed = results.filter((r) => r.status === 'rejected');
    if (failed.length > 0) {
      console.error('Some emails failed:', failed);
    }

    return NextResponse.json({
      ok: true,
      sent: results.filter((r) => r.status === 'fulfilled').length,
      failed: failed.length,
    });
  } catch (err) {
    console.error('Nurture sequence error:', err);
    return NextResponse.json(
      { error: 'Failed to schedule emails' },
      { status: 500 },
    );
  }
}
