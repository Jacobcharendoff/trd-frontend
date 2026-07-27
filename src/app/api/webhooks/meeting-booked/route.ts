import { NextRequest, NextResponse } from 'next/server';

/**
 * Meeting Booked Webhook
 *
 * Receives a POST when a rig build consultation is booked via HubSpot Meetings.
 * Tags the contact in HubSpot so the trd-welcome-imessage scheduled task
 * picks them up and sends a personalized iMessage from Jacob's number.
 *
 * Wire this up via Make.com:
 * HubSpot "Watch Meetings" trigger → HTTP POST to
 * https://www.therigdr.com/api/webhooks/meeting-booked?secret=YOUR_SECRET
 *
 * Expected payload (flexible -- handles HubSpot and Make.com formats):
 * {
 *   contactEmail: "john@example.com",
 *   contactName: "John Smith",
 *   contactPhone: "+15551234567",
 *   meetingTime: "2026-08-01T14:00:00Z",
 *   contactId: "12345"  // optional: HubSpot contact ID
 * }
 */

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

// Simple auth token to prevent random POSTs
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Verify webhook secret via query param or header
    const secret = req.nextUrl.searchParams.get('secret')
      || req.headers.get('x-webhook-secret');
    if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Parse flexibly -- different sources send different shapes
    const contactEmail = body.contactEmail
      || body.properties?.email?.value
      || body.email
      || '';

    const contactPhone = body.contactPhone
      || body.properties?.phone?.value
      || body.phone
      || '';

    const contactName = body.contactName
      || body.properties?.firstname?.value
      || body.firstName
      || '';

    // We can receive a HubSpot contact ID directly, or look up by email
    let contactId = body.contactId
      || body.properties?.hs_object_id?.value
      || '';

    if (!HUBSPOT_TOKEN) {
      console.warn('[Meeting Webhook] HUBSPOT_ACCESS_TOKEN not set -- skipping');
      return NextResponse.json({ ok: true, skipped: 'no hubspot token' });
    }

    // If no contactId, look up by email
    if (!contactId && contactEmail) {
      try {
        const searchRes = await fetch(
          'https://api.hubapi.com/crm/v3/objects/contacts/search',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            },
            body: JSON.stringify({
              filterGroups: [
                {
                  filters: [
                    { propertyName: 'email', operator: 'EQ', value: contactEmail },
                  ],
                },
              ],
            }),
          }
        );
        const searchData = await searchRes.json();
        contactId = searchData.results?.[0]?.id || '';
      } catch (searchErr) {
        console.error('[Meeting Webhook] Contact search failed:', searchErr);
      }
    }

    if (!contactId) {
      // No contact found and no ID provided -- create one if we have enough info
      if (contactEmail) {
        try {
          const createRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            },
            body: JSON.stringify({
              properties: {
                email: contactEmail,
                firstname: contactName,
                phone: contactPhone,
                hs_lead_status: 'NEW',
                hubspot_owner_id: '61103251',
                leadsource: 'Rig Build Consultation',
                description: 'Rig Build Consultation',
                lifecyclestage: 'lead',
              },
            }),
          });
          const createData = await createRes.json();
          contactId = createData.id || '';
          console.log('[Meeting Webhook] Created contact:', contactId);
        } catch (createErr) {
          console.error('[Meeting Webhook] Contact create failed:', createErr);
        }
      } else {
        console.warn('[Meeting Webhook] No email or contactId -- cannot tag contact');
        return NextResponse.json({ ok: true, skipped: 'no contact identifier' });
      }
    } else {
      // Update existing contact with booking tag
      try {
        await fetch(
          `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            },
            body: JSON.stringify({
              properties: {
                hs_lead_status: 'NEW',
                description: 'Rig Build Consultation',
                leadsource: 'Rig Build Consultation',
                phone: contactPhone || undefined,
              },
            }),
          }
        );
        console.log('[Meeting Webhook] Tagged contact:', contactId);
      } catch (updateErr) {
        console.error('[Meeting Webhook] Contact update failed:', updateErr);
      }
    }

    return NextResponse.json({ ok: true, contactId });
  } catch (err) {
    console.error('[Meeting Webhook] Error:', err);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
