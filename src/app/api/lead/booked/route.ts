import { NextRequest, NextResponse, after } from 'next/server';
import { cancelResend, cancelPendingFor, sendBatch, bookedSequence, RESEND_ID } from '@/lib/lead-emails';
import { findRecentBooking } from '@/lib/hubspot';

/**
 * Called by /book/thank-you when the HubSpot calendar confirms a booking.
 *
 * Body: { n, email, firstName, start }
 *   n      dot-separated ids of the not-booked follow-up (from the form, same browser)
 *   email  the address they booked with (from HubSpot's booking message, or the form)
 *   start  call start time in ms, from HubSpot's booking message
 *
 * 1. Cancels the ids in `n` right away.
 * 2. Confirms the booking with HubSpot (retrying while HubSpot catches up), then cancels any other
 *    scheduled follow-up to that address and sends the prep emails. Nothing goes out unless HubSpot
 *    shows a real booking, so this endpoint can't be used to email arbitrary addresses.
 */

export const maxDuration = 60;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const ids = String(body.n ?? '')
    .split('.')
    .filter((id) => RESEND_ID.test(id))
    .slice(0, 10);
  const email = String(body.email ?? '').trim().toLowerCase();
  const firstFromPage = String(body.firstName ?? '').trim().slice(0, 60);
  const start = Number(body.start);
  const startFromPage =
    Number.isFinite(start) && start > Date.now() && start < Date.now() + 120 * 86_400_000 ? start : null;

  await Promise.allSettled(ids.map(cancelResend));

  if (EMAIL_RE.test(email)) {
    after(async () => {
      let booking = await findRecentBooking(email);
      for (const wait of [4000, 8000, 15000]) {
        if (booking.booked) break;
        await sleep(wait);
        booking = await findRecentBooking(email);
      }
      if (!booking.booked) {
        console.warn('[booked] HubSpot shows no recent booking for this address; prep emails not sent');
        return;
      }

      await cancelPendingFor(email);
      const callAt = startFromPage ?? booking.meetingAt ?? null;
      const first = firstFromPage || booking.firstName || '';
      const sent = await sendBatch(bookedSequence(first, email, callAt));
      console.log(`[booked] prep emails scheduled: ${sent.length}`);
    });
  }

  return NextResponse.json({ ok: true, canceled: ids.length });
}
