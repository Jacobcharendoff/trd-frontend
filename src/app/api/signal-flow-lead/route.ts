import { NextRequest, NextResponse, after } from 'next/server';
import { upsertContact, addContactNote } from '@/lib/hubspot';

/**
 * Signal Flow Lead Capture API
 *
 * Replaces the broken HubSpot Forms API submission.
 * Creates or updates a HubSpot contact via the CRM API (v3)
 * using a private app token, then triggers the nurture
 * email sequence via the existing /api/signal-flow-nurture route.
 *
 * Why server-side: The old form ID (b6534f50-4862-409c-abb2-24b832a30c86)
 * returns 200 but never creates contacts. The CRM API is reliable
 * and gives us full control over contact properties.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.therigdr.com';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ── 1. Create or update HubSpot contact ──────────────────
    // Non-blocking for the visitor: they already have the PDF. Only real properties are written
    // (see lib/hubspot), and the download is logged as a note on the contact.
    after(async () => {
      // New contacts start as NEW leads; existing ones keep their status and notes.
      const id = await upsertContact(normalizedEmail, {}, { lifecyclestage: 'lead', hs_lead_status: 'NEW' });
      if (id) await addContactNote(id, '<strong>Signal Flow Cheat Sheet</strong> downloaded from therigdr.com');
    });

    // ── 2. Trigger nurture email sequence ────────────────────
    // Runs after the response is sent. after() keeps the function alive until it finishes;
    // a bare un-awaited fetch can be killed when a serverless function returns.
    after(async () => {
      try {
        const res = await fetch(`${SITE_URL}/api/signal-flow-nurture`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: normalizedEmail }),
        });
        if (!res.ok) console.error('Nurture trigger failed:', res.status, await res.text());
      } catch (err) {
        console.error('Nurture trigger failed:', err);
      }
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Signal flow lead capture error:', err);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 },
    );
  }
}
