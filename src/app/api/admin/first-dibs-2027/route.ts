import { NextResponse } from 'next/server';

/** Retired one-off route (Oct 2026). Kept as a stub so nothing can send from it. */
export async function POST() {
  return NextResponse.json({ error: 'Gone' }, { status: 410 });
}
