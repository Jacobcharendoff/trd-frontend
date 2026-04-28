import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

// Jacob's HubSpot owner ID — tickets and contacts get assigned to him
// so HubSpot's built-in notifications fire to info@therigdr.com
const OWNER_ID = '61103251';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    // Validation
    if (!firstName || !email || !message) {
      return NextResponse.json(
        { error: 'First name, email, and message are required.' },
        { status: 400 }
      );
    }

    let contactId: string | null = null;
    let ticketCreated = false;

    if (HUBSPOT_TOKEN) {
      // ── Step 1: Create or update contact ──
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
                    { propertyName: 'email', operator: 'EQ', value: email },
                  ],
                },
              ],
            }),
          }
        );

        const searchData = await searchRes.json();
        const existingContact = searchData.results?.[0];

        const properties: Record<string, string> = {
          firstname: firstName,
          lastname: lastName || '',
          email,
          phone: phone || '',
          hs_lead_status: 'NEW',
          hubspot_owner_id: OWNER_ID,
        };

        if (existingContact) {
          contactId = existingContact.id;
          await fetch(
            `https://api.hubapi.com/crm/v3/objects/contacts/${existingContact.id}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${HUBSPOT_TOKEN}`,
              },
              body: JSON.stringify({ properties }),
            }
          );
        } else {
          properties.lifecyclestage = 'lead';
          const createRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            },
            body: JSON.stringify({ properties }),
          });
          const createData = await createRes.json();
          contactId = createData.id || null;
        }
      } catch (contactErr) {
        console.error('[Contact Form] Contact create/update failed:', contactErr);
      }

      // ── Step 2: Create note associated to contact ──
      if (contactId) {
        try {
          await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            },
            body: JSON.stringify({
              properties: {
                hs_note_body: `<strong>Website Contact Form</strong><br><br><strong>Name:</strong> ${firstName} ${lastName || ''}<br><strong>Email:</strong> ${email}<br><strong>Phone:</strong> ${phone || 'Not provided'}<br><br><strong>Message:</strong><br>${message}`,
                hs_timestamp: new Date().toISOString(),
              },
              associations: [
                {
                  to: { id: contactId },
                  types: [
                    {
                      associationCategory: 'HUBSPOT_DEFINED',
                      associationTypeId: 202,
                    },
                  ],
                },
              ],
            }),
          });
        } catch (noteErr) {
          console.error('[Contact Form] Note creation failed:', noteErr);
        }
      }

      // ── Step 3: Create ticket (assigned to Jacob → triggers email notification) ──
      try {
        const ticketPayload: Record<string, unknown> = {
          properties: {
            subject: `Website Contact: ${firstName} ${lastName || ''} — ${email}`,
            content: `Name: ${firstName} ${lastName || ''}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
            hs_pipeline: '0',
            hs_pipeline_stage: '1',
            hubspot_owner_id: OWNER_ID,
          },
        };

        // Associate ticket to contact if we have one
        if (contactId) {
          ticketPayload.associations = [
            {
              to: { id: contactId },
              types: [
                {
                  associationCategory: 'HUBSPOT_DEFINED',
                  associationTypeId: 16,
                },
              ],
            },
          ];
        }

        const ticketRes = await fetch('https://api.hubapi.com/crm/v3/objects/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          },
          body: JSON.stringify(ticketPayload),
        });

        if (ticketRes.ok) {
          ticketCreated = true;
        } else {
          const ticketError = await ticketRes.text();
          console.error('[Contact Form] Ticket creation failed:', ticketRes.status, ticketError);
        }
      } catch (ticketErr) {
        console.error('[Contact Form] Ticket creation threw:', ticketErr);
      }
    }

    return NextResponse.json({
      success: true,
      hubspot: HUBSPOT_TOKEN ? { contactId, ticketCreated } : null,
    });
  } catch (err) {
    console.error('[Contact Form] Top-level error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
