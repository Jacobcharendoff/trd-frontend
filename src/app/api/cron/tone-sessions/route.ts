import { NextRequest, NextResponse } from 'next/server';
import { recentBookers, findRecentBooking } from '@/lib/hubspot';
import { TONE_MEETING_SLUG } from '@/lib/booking';
import { sendBatch, listRecentEmails } from '@/lib/lead-emails';
import { sessionFollowUps, hasPendingSessionEmails, cancelEarlySessionAsks } from '@/lib/tone-emails';

/**
 * Daily safety net for Tone Tutoring after-session emails.
 * Anyone who booked Vince's Tone Tutoring calendar in the last 26 hours, wherever they booked it,
 * gets the review ask and check-in scheduled off their session (skipped if already scheduled).
 * Also cancels anything left over from the old purchase-date timing.
 */

export const maxDuration = 60;

function authorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get('authorization') === `Bearer ${secret}`) return true;
  return (req.headers.get('user-agent') || '').includes('vercel-cron');
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rows = await listRecentEmails(14);
  const early = await cancelEarlySessionAsks(rows);

  const emails = await recentBookers(Date.now() - 26 * 3_600_000, TONE_MEETING_SLUG);
  let scheduled = 0;
  for (const email of emails) {
    if (await hasPendingSessionEmails(email, rows)) continue;
    const booking = await findRecentBooking(email, 26 * 3_600_000, TONE_MEETING_SLUG);
    if (!booking.booked || !booking.meetingAt) continue;
    const ids = await sendBatch(sessionFollowUps(booking.firstName || '', email.toLowerCase(), booking.meetingAt));
    if (ids.length) scheduled++;
  }
  return NextResponse.json({ ok: true, bookers: emails.length, scheduled, earlyCanceled: early.canceled });
}
