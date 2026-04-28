import { NextRequest, NextResponse } from 'next/server';

/**
 * Client-side error collection endpoint.
 *
 * Receives error reports from the browser and logs them.
 * When you're ready to scale, forward these to Sentry, Datadog, or similar.
 * For now this gives us server-side visibility into client crashes.
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Log with structured format for Vercel log drains
    console.error('[CLIENT_ERROR]', JSON.stringify({
      message: body.message,
      source: body.source,
      url: body.url,
      timestamp: body.timestamp,
      stack: body.stack?.split('\n').slice(0, 5).join('\n'), // First 5 stack frames
    }));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
