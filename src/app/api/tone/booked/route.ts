import { NextRequest, NextResponse, after } from 'next/server';
import { findRecentBooking } from '@/lib/hubspot';
import { TONE_MEETING_SLUG } from '@/lib/booking';
import { sendBatch } from '@/lib/lead-emails';
import { sessionFollowUps, hasPendingSessionEmails } from '@/lib/tone-emails';

/**
 * Called by /tone-tutoring/book when the HubSpot calendar confirms a Tone Tutoring session.
 *
 * Body: { email, firstName, start }   start = session start in ms, from HubSpot's booking message
 *
 * Confirms the booking with HubSpot (retrying while HubSpot catches up), then schedules the
 * after-session emails off the session time. Nothing goes out unless HubSpot shows a real booking
 * on the Tone Tutoring calendar, so this endpoint can't be used to email arbitrary addresses.
 */

export const maxDuration = 60;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const email = String(body.email ?? '').trim().toLowerCase();
  const firstFromPage = String(body.firstName ?? '').trim().slice(0, 60);
  const start = Number(body.start);
  const startFromPage =
    Number.isFinite(start) && start > Date.now() && start < Date.now() + 120 * 86_400_000 ? start : null;

  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: true });

  after(async () => {
    let booking = await findRecentBooking(email, 30 * 60_000, TONE_MEETING_SLUG);
    for (const wait of [4000, 8000, 15000]) {
      if (booking.booked) break;
      await sleep(wait);
      booking = await findRecentBooking(email, 30 * 60_000, TONE_MEETING_SLUG);
    }
    if (!booking.booked) {
      console.warn('[tone/booked] HubSpot shows no recent Tone Tutoring booking for this address; nothing scheduled');
      return;
    }
    const sessionAt = startFromPage ?? booking.meetingAt ?? null;
    if (!sessionAt) {
      console.warn('[tone/booked] booking confirmed but no session time; nothing scheduled');
      return;
    }
    if (await hasPendingSessionEmails(email)) return;
    const ids = await sendBatch(sessionFollowUps(firstFromPage || booking.firstName || '', email, sessionAt));
    console.log(`[tone/booked] after-session emails scheduled: ${ids.length}`);
  });

  return NextResponse.json({ ok: true });
}
