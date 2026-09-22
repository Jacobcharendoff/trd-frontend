import { NextRequest, NextResponse } from 'next/server';

/**
 * Homepage Lead Capture API
 *
 * Creates or updates a HubSpot contact via the CRM API (v3)
 * using a private app token. Follows the same pattern as
 * /api/signal-flow-lead.
 *
 * Fields: name, email, rig (description of their current rig).
 */

const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

export async function POST(req: NextRequest) {
  try {
    const { name, email, rig } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const nameParts = (name || '').trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Create or update HubSpot contact
    if (HUBSPOT_ACCESS_TOKEN) {
      try {
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
                firstname: firstName,
                lastname: lastName,
                lifecyclestage: 'lead',
                hs_lead_status: 'NEW',
                leadsource: 'Website Lead Form',
                notes_last_updated: `Homepage lead form${rig ? ` - Rig notes: ${rig}` : ''} - ${new Date().toISOString()}`,
              },
            }),
          },
        );

        if (createRes.status === 409) {
          // Contact already exists - update them
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
                    firstname: firstName || undefined,
                    lastname: lastName || undefined,
                    notes_last_updated: `Lead form re-submission${rig ? ` - Rig notes: ${rig}` : ''} - ${new Date().toISOString()}`,
                  },
                }),
              },
            );
          }
        } else if (!createRes.ok) {
          const errText = await createRes.text();
          console.error('HubSpot CRM error:', createRes.status, errText);
        }
      } catch (hubspotErr) {
        console.error('HubSpot CRM request failed:', hubspotErr);
      }
    } else {
      console.warn('HUBSPOT_ACCESS_TOKEN not set - skipping CRM');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Lead capture error:', err);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 },
    );
  }
}
