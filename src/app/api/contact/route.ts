import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

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

    // If HubSpot token is available, create/update contact + ticket
    if (HUBSPOT_TOKEN) {
      try {
        // Search for existing contact by email
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
        };

        if (existingContact) {
          // Update existing contact
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
          // Create new contact
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

        // Create a note with the message, associated to the contact
        if (contactId) {
          await fetch(
            'https://api.hubapi.com/crm/v3/objects/notes',
            {
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
            }
          );
        }

        // Create a HubSpot ticket — triggers email notifications to the team
        const ticketBody: Record<string, unknown> = {
          properties: {
            subject: `Website Contact: ${firstName} ${lastName || ''} — ${email}`,
            content: `Name: ${firstName} ${lastName || ''}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
            hs_pipeline: '0',
            hs_pipeline_stage: '1',
            hs_ticket_priority: 'MEDIUM',
            source_type: 'WEB',
          },
          associations: contactId
            ? [
                {
                  to: { id: contactId },
                  types: [
                    {
                      associationCategory: 'HUBSPOT_DEFINED',
                      associationTypeId: 16,
                    },
                  ],
                },
              ]
            : [],
        };

        await fetch('https://api.hubapi.com/crm/v3/objects/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          },
          body: JSON.stringify(ticketBody),
        });
      } catch (hubspotErr) {
        // Log but don't fail the request
        console.error('HubSpot error:', hubspotErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
