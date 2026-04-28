import { NextRequest, NextResponse } from 'next/server';

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

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.therigdr.com';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ── 1. Create or update HubSpot contact ──────────────────
    if (HUBSPOT_ACCESS_TOKEN) {
      try {
        // Try to create the contact first
        const createRes = await fetch(
          'https://api.hubapi.com/crm/v3/objects/contacts',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              properties: {
                email: normalizedEmail,
                lifecyclestage: 'lead',
                hs_lead_status: 'NEW',
                leadsource: 'Signal Flow Cheat Sheet',
                notes_last_updated: `Signal Flow PDF download — ${new Date().toISOString()}`,
              },
            }),
          },
        );

        if (createRes.status === 409) {
          // Contact already exists — update them instead
          // Extract existing contact ID from the 409 response
          const conflict = await createRes.json();
          const existingId = conflict?.message?.match(/Existing ID: (\d+)/)?.[1];

          if (existingId) {
            await fetch(
              `https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`,
              {
                method: 'PATCH',
                headers: {
                  Authorization: `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  properties: {
                    notes_last_updated: `Signal Flow PDF re-download — ${new Date().toISOString()}`,
                  },
                }),
              },
            );
          }
        } else if (!createRes.ok) {
          const errText = await createRes.text();
          console.error('HubSpot CRM error:', createRes.status, errText);
          // Don't fail the whole request — the user still gets their PDF
        }
      } catch (hubspotErr) {
        console.error('HubSpot CRM request failed:', hubspotErr);
        // Non-blocking: user still gets PDF + nurture emails
      }
    } else {
      console.warn('HUBSPOT_ACCESS_TOKEN not set — skipping CRM contact creation');
    }

    // ── 2. Trigger nurture email sequence ────────────────────
    // Fire to our own nurture endpoint (non-blocking)
    const nurtureFetch = fetch(`${SITE_URL}/api/signal-flow-nurture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: normalizedEmail }),
    }).catch((err) => {
      console.error('Nurture trigger failed:', err);
    });

    // Don't await nurture — return success to the user immediately
    // The nurture emails will fire in the background
    void nurtureFetch;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Signal flow lead capture error:', err);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 },
    );
  }
}
