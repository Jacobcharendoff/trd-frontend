import { NextResponse } from 'next/server';

/**
 * Retired one-time cleanup (Oct 12 2026). It canceled the session emails queued off purchase
 * dates and emailed Vince the list. The daily /api/cron/tone-sessions keeps the same backstop.
 */
export async function GET() {
  return NextResponse.json({ error: 'Gone' }, { status: 410 });
}
