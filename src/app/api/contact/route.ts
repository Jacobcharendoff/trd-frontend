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

    // If HubSpot token is available, create/update contact
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
          lifecyclestage: 'lead',
        };

        if (existingContact) {
          // Update existing contact
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
          await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            },
            body: JSON.stringify({ properties }),
          });
        }

        // Create a note with the message
        const contactId = existingContact?.id;
        if (contactId) {
          const noteRes = await fetch(
            'https://api.hubapi.com/crm/v3/objects/notes',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${HUBSPOT_TOKEN}`,
              },
              body: JSON.stringify({
                properties: {
                  hs_note_body: `Website Contact Form:\n\nName: ${firstName} ${lastName || ''}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\n\nMessage:\n${message}`,
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
      } catch (hubspotErr) {
        // Log but don't fail the request — form submission still counts
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
