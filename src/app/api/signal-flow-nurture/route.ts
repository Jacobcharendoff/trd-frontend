import { NextRequest, NextResponse } from 'next/server';

/*
 * Signal Flow Cheat Sheet — Nurture Sequence API
 *
 * Called after a user submits their email for the PDF.
 * Schedules 3 emails via Resend:
 *   1. Immediate: Welcome + PDF delivery
 *   2. Day 3: Signal chain tip + soft Tone Tutoring mention
 *   3. Day 7: CTA to book Tone Tutoring
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Jacob <jacob@therigdr.com>';
const PDF_URL =
  'https://ul04rn4k3jtypxsy.public.blob.vercel-storage.com/Signal_Flow_Cheat_Sheet-ht17iWYR53dcOwLBPjes5W2F4jgaNa.pdf';
const TONE_TUTORING_URL = 'https://www.therigdr.com/tone-tutoring';

// ── Email content ──────────────────────────────────────────

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

  <p>Quick thing about me: I'm Jacob, and I've been building pedalboards for about 17 years now. Over 200 custom rigs for touring musicians, session players, and bedroom shredders who just want their stuff to sound right. I started The Rig Doctor because I kept seeing the same problem over and over. Great players with great gear, wired wrong.</p>

  <p>If you ever have a signal chain question, just reply to this email. I read everything.</p>

  <p>Talk soon,<br/>Jacob<br/><span style="color: #86868b;">The Rig Doctor</span></p>
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

  <p>Since you grabbed the cheat sheet, figured I'd share something that trips up almost everyone I work with. Buffers.</p>

  <p>Here's the deal: every cable on your board is a tiny antenna sucking tone out of your signal. The longer your cable runs and the more pedals you chain together, the more high end you lose. Your sound gets darker and muddier the further it travels. That's not your pedals. That's physics.</p>

  <p>A buffer fixes this. It takes your high-impedance guitar signal and converts it to low-impedance so it can travel through your whole chain without losing clarity. Think of it like a signal booster for your tone.</p>

  <p><strong>Where to put one:</strong> First in the chain (right after your guitar) is the most common spot. If you have a long cable run to your amp, putting a second buffer at the end of your chain helps too. Some pedals already have buffers built in — Boss pedals, for example, are buffered bypass. So if you've got a Boss tuner up front, you might already be covered.</p>

  <p><strong>One thing to watch:</strong> If you're running a fuzz face or vintage-style fuzz, those want to see your guitar's raw signal directly. Put the fuzz before the buffer, or you'll lose that sputtery, reactive feel those pedals are known for.</p>

  <p>That's the kind of stuff the cheat sheet covers at a high level, but there's only so much a diagram can do for your specific rig. Every board is different. Different pedals, different cable runs, different problems.</p>

  <p>If you've got a setup that's fighting you and you can't figure out why, that's literally what we do. We offer 1-on-1 Tone Tutoring sessions where we go through your whole rig on a video call and sort it out. 60 minutes, and you walk away with a plan that actually works for your gear.</p>

  <p>No pressure on that. Just wanted you to know it exists.</p>

  <p>Jacob</p>
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

  <p>Vince here from The Rig Doctor. Jacob asked me to reach out because I'm the one who runs our Tone Tutoring sessions, and I wanted to put a name to the face you'd actually be working with.</p>

  <p>You know that feeling where you've watched a dozen YouTube videos on signal chain, read three forum threads, and you're somehow more confused than when you started? Everyone's got an opinion. Half of them contradict each other. And none of them have seen your actual board.</p>

  <p>That's the gap a cheat sheet can't fill. Diagrams show you the theory. But your rig has its own quirks. Your power supply, your specific pedals, the way your amp responds to what's in front of it.</p>

  <p>Tone Tutoring is 60 minutes on a video call where we go through your whole signal chain together. You show me your board, I tell you what I'd change and why. You get a recording of the session and follow-up notes so you can actually do the work after we hang up.</p>

  <p>It's $99. Most guys tell me they would've saved twice that in pedals they bought trying to fix a problem that turned out to be a wiring issue.</p>

  <p style="margin: 24px 0;">
    <a href="${TONE_TUTORING_URL}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 16px;">Book a Tone Tutoring Session</a>
  </p>

  <p>Either way, thanks for downloading the cheat sheet. Hope it's been useful.</p>

  <p>Vince<br/><span style="color: #86868b;">The Rig Doctor · Montgomery, TX</span></p>
</div>
    `.trim(),
  };
}

// ── Resend send helper ─────────────────────────────────────

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
      reply_to: params.from === VINCE_FROM_EMAIL ? 'vince@therigdr.com' : 'jacobcharendoff@gmail.com',
      ...(params.scheduledAt ? { scheduled_at: params.scheduledAt } : {}),
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Resend error: ${res.status} ${error}`);
  }

  return res.json();
}

// ── API route handler ──────────────────────────────────────

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

    const e1 = email1(firstName);
    const e2 = email2(firstName);
    const e3 = email3(firstName);

    // Fire all 3 emails (email 1 immediate, 2 & 3 scheduled)
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
