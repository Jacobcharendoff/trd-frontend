import { NextRequest, NextResponse } from 'next/server';
import { recentBookers } from '@/lib/hubspot';
import { cancelPendingFor } from '@/lib/lead-emails';

/**
 * Daily safety net for the consult follow-up.
 * Anyone who booked the rig consult calendar in the last 26 hours, wherever they booked it,
 * gets their pending "you haven't booked yet" emails canceled.
 * (Bookings on /book/thank-you are handled instantly by /api/lead/booked.)
 */

export const maxDuration = 60;

function authorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get('authorization') === `Bearer ${secret}`) return true;
  return (req.headers.get('user-agent') || '').includes('vercel-cron');
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const emails = await recentBookers(Date.now() - 26 * 3_600_000);
  let canceled = 0;
  for (const email of emails) canceled += await cancelPendingFor(email);
  return NextResponse.json({ ok: true, bookers: emails.length, canceled });
}
