import { NextRequest, NextResponse } from 'next/server';

const HUBSPOT_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
// therigdr.com verified in Resend on Apr 28, 2026 — branded emails active
const VERIFIED_DOMAIN = true;
const FROM_ADDRESS = 'The Rig Doctor <notifications@therigdr.com>';
const NOTIFICATION_EMAIL = 'info@therigdr.com';

// Jacob's HubSpot owner ID — tickets and contacts get assigned to him
const OWNER_ID = '61103251';

async function sendNotificationEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}) {
  if (!RESEND_API_KEY) return;

  const { firstName, lastName, email, phone, message } = data;
  const fullName = `${firstName}${lastName ? ' ' + lastName : ''}`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [NOTIFICATION_EMAIL],
        reply_to: email,
        subject: `New inquiry from ${fullName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px 24px; color: #1d1d1f;">
            <div style="border-bottom: 2px solid #0071E3; padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #1d1d1f;">New Website Inquiry</h2>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 8px 0; color: #86868b; font-size: 14px; width: 80px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 500;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #86868b; font-size: 14px; vertical-align: top;">Email</td>
                <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #0071E3; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #86868b; font-size: 14px; vertical-align: top;">Phone</td>
                <td style="padding: 8px 0; font-size: 14px;">${phone || 'Not provided'}</td>
              </tr>
            </table>

            <div style="background: #f5f5f7; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0 0 8px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #86868b;">Message</p>
              <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #1d1d1f; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="text-align: center; padding-top: 8px;">
              <a href="mailto:${email}" style="display: inline-block; background: #1d1d1f; color: #ffffff; padding: 12px 32px; border-radius: 980px; font-size: 14px; font-weight: 500; text-decoration: none;">Reply to ${firstName}</a>
            </div>

            <p style="margin: 24px 0 0; font-size: 11px; color: #86868b; text-align: center;">
              Submitted via therigdr.com contact form
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('[Contact Form] Resend API error:', res.status, errorBody);
    }
  } catch (emailErr) {
    console.error('[Contact Form] Notification email failed:', emailErr);
  }
}

async function sendCustomerConfirmation(data: {
  firstName: string;
  email: string;
}) {
  // Only send customer-facing emails once therigdr.com domain is verified in Resend.
  // onboarding@resend.dev can only deliver to the account owner's email.
  if (!RESEND_API_KEY || !VERIFIED_DOMAIN) return;

  const { firstName, email } = data;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [email],
        subject: `Got your message, ${firstName}!`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 24px; color: #1d1d1f;">
            <div style="margin-bottom: 32px;">
              <h1 style="margin: 0 0 4px; font-size: 24px; font-weight: 700; color: #1d1d1f;">The Rig Doctor</h1>
              <div style="width: 40px; height: 3px; background: #0071E3; border-radius: 2px;"></div>
            </div>

            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 16px; color: #1d1d1f;">
              Hey ${firstName},
            </p>

            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 16px; color: #1d1d1f;">
              Thanks for reaching out — we got your message and we're on it. Someone from the team will get back to you shortly, usually within 24 hours.
            </p>

            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 24px; color: #1d1d1f;">
              In the meantime, feel free to reply to this email if you think of anything else.
            </p>

            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 4px; color: #1d1d1f;">
              Talk soon,
            </p>
            <p style="font-size: 16px; line-height: 1.7; margin: 0 0 32px; color: #1d1d1f; font-weight: 500;">
              The Rig Doctor Team
            </p>

            <div style="border-top: 1px solid rgba(0,0,0,0.06); padding-top: 20px;">
              <p style="margin: 0; font-size: 12px; color: #86868b; line-height: 1.5;">
                The Rig Doctor · Custom Pedalboards & Rig Builds<br>
                <a href="https://www.therigdr.com" style="color: #0071E3; text-decoration: none;">therigdr.com</a>
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('[Contact Form] Customer confirmation email error:', res.status, errorBody);
    }
  } catch (emailErr) {
    console.error('[Contact Form] Customer confirmation email failed:', emailErr);
  }
}

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

    const fullName = `${firstName}${lastName ? ' ' + lastName : ''}`;
    let contactId: string | null = null;

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
                hs_note_body: `<strong>Website Contact Form</strong><br><br><strong>Name:</strong> ${fullName}<br><strong>Email:</strong> ${email}<br><strong>Phone:</strong> ${phone || 'Not provided'}<br><br><strong>Message:</strong><br>${message}`,
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

      // Ticket creation removed — HubSpot's built-in ticket auto-reply
      // sends a generic "your request has been received" email that duplicates
      // our branded Resend confirmation. Contact + note is sufficient for CRM tracking.
    }

    // ── Step 3: Send notification email to Jacob ──
    await sendNotificationEmail({ firstName, lastName: lastName || '', email, phone: phone || '', message });

    // ── Step 4: Send confirmation email to customer ──
    await sendCustomerConfirmation({ firstName, email });

    return NextResponse.json({
      success: true,
      hubspot: HUBSPOT_TOKEN ? { contactId } : null,
    });
  } catch (err) {
    console.error('[Contact Form] Top-level error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
