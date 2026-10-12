import { NextResponse } from 'next/server';
import { cancelEarlySessionAsks } from '@/lib/tone-emails';

/**
 * One-time cleanup (Oct 2026): cancels "How did your session go?" / "How's the board sounding?"
 * emails that were queued off purchase dates instead of sessions, and emails Vince the list.
 * Cancel-only and idempotent: once they're gone it does nothing. The daily tone-sessions cron
 * runs the same cleanup as a backstop.
 */

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET() {
  const r = await cancelEarlySessionAsks();
  return NextResponse.json({ ok: true, canceled: r.canceled, people: r.people });
}
