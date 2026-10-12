/**
 * Tone Tutoring after-session emails, timed off the session the buyer actually booked.
 *
 *   Review ask   ~2 hours after the session ends (moved to 10am CT if that lands overnight)
 *   Check-in     7 days after the session, 10am CT ("How's the board sounding?" + build call)
 *
 * Until Oct 12 2026 both went out a fixed number of days after purchase (5 and 12), which hit
 * people who hadn't had their session yet. Now they're only scheduled once HubSpot shows a
 * booking on Vince's 1:1 Tone Tutoring calendar (/tone-tutoring/book, or the HubSpot link directly).
 */

import { reviewEmail } from './review-email';
import { TONE_SESSION_MINUTES } from './booking';
import {
  type Email,
  type ResendRow,
  listRecentEmails,
  isPending,
  resendTime,
  cancelResend,
  sendResend,
  tenAmCentral,
  ALERT_FROM,
} from './lead-emails';
import { esc } from './hubspot';

const VINCE_FROM = process.env.RESEND_VINCE_FROM_EMAIL || 'Vince DiGioia <vince@therigdr.com>';
const VINCE_ADDRESS = 'vince@therigdr.com';
const HOUR = 3_600_000;

export const REVIEW_SUBJECT = 'How did your session go?';
export const CHECKIN_SUBJECT = "How's the board sounding?";
const SESSION_SUBJECTS = new Set([REVIEW_SUBJECT, CHECKIN_SUBJECT]);

/**
 * Emails created before this moment came from the old purchase-date timing. Any still pending
 * get canceled by cancelEarlySessionAsks(). Everything after it is timed off a booked session.
 */
export const OLD_TIMING_CUTOFF = Date.parse('2026-10-12T20:27:00Z');

function centralHour(ms: number) {
  return Number(new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', hour: 'numeric', hourCycle: 'h23' }).format(ms));
}

/** About 2 hours after the session ends. If that's between 9pm and 8am Central, next morning at 10am. */
export function afterSession(start: number) {
  const at = start + TONE_SESSION_MINUTES * 60_000 + 2 * HOUR;
  const h = centralHour(at);
  if (h >= 21 || h < 8) {
    // 10am Central is 15:00 UTC (9am in winter, close enough). From 9pm to midnight that's the
    // next UTC day; from midnight to 8am it's the same UTC day.
    const base = h >= 21 ? at + 12 * HOUR : at;
    const d = new Date(base);
    d.setUTCHours(15, 0, 0, 0);
    return d.toISOString();
  }
  return new Date(at).toISOString();
}

function checkInEmail(firstName: string) {
  const hey = firstName ? `Hey ${esc(firstName)},` : 'Hey,';
  const book =
    'https://www.therigdr.com/book?utm_source=tone_email&utm_medium=email&utm_campaign=tone_followup&utm_content=book_button';
  return {
    subject: CHECKIN_SUBJECT,
    html: `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; color: #1d1d1f; line-height: 1.6; font-size: 16px;">
  <p>${hey}</p>
  <p>Vince here. It's been about a week since our session, so I'm checking in. How's the board sounding? If something we changed isn't working, reply and tell me. I'll help you sort it out.</p>
  <p>Sometimes a session shows the real problem is the board itself: power, cables, layout. If that's where you landed, we can rebuild yours or build you a new one. It starts with a free 30-minute call.</p>
  <p style="margin: 24px 0;"><a href="${book}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #ffffff; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 16px;">Book a free build call</a></p>
  <p>Vince<br/>The Rig Doctor</p>
  <p style="margin-top: 32px; font-size: 12px; color: #86868b; line-height: 1.5;">The Rig Doctor LLC, 641 Amesbury Rd, Montgomery, TX 77316. You got this because you had a Tone Tutoring session with us.</p>
</div>`.trim(),
  };
}

/**
 * The two after-session emails for a session starting at `start` (ms).
 * Resend only schedules about 30 days out, so anything past 29 days is left off.
 */
export function sessionFollowUps(firstName: string, to: string, start: number): Email[] {
  const reviewAt = afterSession(start);
  const review = reviewEmail('tone', firstName, Date.parse(reviewAt));
  const check = checkInEmail(firstName);
  const emails: Email[] = [
    { from: VINCE_FROM, to, subject: review.subject, html: review.html, replyTo: VINCE_ADDRESS, scheduledAt: reviewAt, tag: 'tone_session_review' },
    { from: VINCE_FROM, to, subject: check.subject, html: check.html, replyTo: VINCE_ADDRESS, scheduledAt: tenAmCentral(7, start), tag: 'tone_session_checkin' },
  ];
  const limit = Date.now() + 29 * 24 * HOUR;
  return emails.filter((e) => !e.scheduledAt || Date.parse(e.scheduledAt) < limit);
}

const isSessionEmail = (r: ResendRow) => SESSION_SUBJECTS.has((r.subject ?? '').trim());
const sentTo = (r: ResendRow, email: string) => (r.to ?? []).some((t) => t.toLowerCase().includes(email));

/** Already has after-session emails waiting (so a second booking signal doesn't double them up). */
export async function hasPendingSessionEmails(email: string, rows?: ResendRow[]) {
  const target = email.trim().toLowerCase();
  const list = rows ?? (await listRecentEmails(14));
  return list.some((r) => isSessionEmail(r) && isPending(r) && sentTo(r, target) && resendTime(r.created_at) >= OLD_TIMING_CUTOFF);
}

/**
 * Cancel any pending session emails scheduled by the old purchase-date timing, and tell Vince
 * who they were, so he can ask for the review himself once their session is done.
 * Safe to run any number of times: after the first run there's nothing left to cancel.
 */
export async function cancelEarlySessionAsks(rows?: ResendRow[]) {
  const list = rows ?? (await listRecentEmails(14));
  const early = list.filter((r) => {
    const created = resendTime(r.created_at);
    return isSessionEmail(r) && isPending(r) && created > 0 && created < OLD_TIMING_CUTOFF;
  });
  const canceled: Array<{ to: string; subject: string; was: string }> = [];
  for (const r of early) {
    if (await cancelResend(r.id)) {
      canceled.push({ to: (r.to ?? []).join(', '), subject: r.subject ?? '', was: r.scheduled_at ?? '' });
    }
  }

  if (canceled.length) {
    const people = [...new Set(canceled.map((c) => c.to))];
    await sendResend({
      from: ALERT_FROM,
      to: VINCE_ADDRESS,
      subject: `Canceled ${canceled.length} early "How did your session go?" email${canceled.length === 1 ? '' : 's'}`,
      html:
        `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.6;color:#1d1d1f;max-width:560px">` +
        `<p>These Tone Tutoring buyers had a review ask or check-in queued off their purchase date, not their session. Those are canceled, so nobody gets asked about a session they haven't had.</p>` +
        `<ul>${people.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` +
        `<p>For these people only: once you've done their session, send them the review link yourself (therigdr.com/rewards), or have them pick their time at <a href="https://www.therigdr.com/tone-tutoring/book">therigdr.com/tone-tutoring/book</a> and it all goes out on its own after the session.</p>` +
        `<p>Every new buyer gets the booking link in their purchase email, and the follow-ups are timed off the session they book.</p></div>`,
      tag: 'tone_early_cancel',
    });
  }
  return { canceled: canceled.length, people: [...new Set(canceled.map((c) => c.to))].length };
}
