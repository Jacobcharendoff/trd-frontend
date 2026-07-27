import { NextRequest, NextResponse } from 'next/server';

/**
 * Meeting Booked Webhook
 *
 * Receives a POST when a rig build consultation is booked via HubSpot Meetings.
 * Sends an SMS to Jacob's cell so he can prep and reach out immediately.
 *
 * Wire this up in one of two ways:
 * 1. HubSpot Workflow: Trigger = "Meeting booked" → Action = Webhook POST to
 *    https://www.therigdr.com/api/webhooks/meeting-booked
 * 2. Make.com Scenario: HubSpot "Watch Meetings" → HTTP POST to this URL
 *
 * Expected payload (flexible — handles both HubSpot and Make.com formats):
 * {
 *   contactName: "John Smith",
 *   contactEmail: "john@example.com",
 *   contactPhone: "+15551234567",
 *   meetingTime: "2026-08-01T14:00:00Z",
 *   meetingTitle: "Rig Build Consultation"
 * }
 */

const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER;
const JACOB_CELL = '+16476802324';

// Simple auth token to prevent random POSTs
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Optional: verify webhook secret via query param or header
    const secret = req.nextUrl.searchParams.get('secret')
      || req.headers.get('x-webhook-secret');
    if (WEBHOOK_SECRET && secret !== WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Parse flexibly — different sources send different shapes
    const contactName = body.contactName
      || body.properties?.firstname?.value
      || body.firstName
      || 'Someone';

    const contactPhone = body.contactPhone
      || body.properties?.phone?.value
      || body.phone
      || '';

    const contactEmail = body.contactEmail
      || body.properties?.email?.value
      || body.email
      || '';

    const meetingTime = body.meetingTime
      || body.properties?.hs_meeting_start_time?.value
      || body.startTime
      || '';

    // Format the meeting time for the SMS
    let formattedTime = 'TBD';
    if (meetingTime) {
      try {
        const d = new Date(meetingTime);
        formattedTime = d.toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          timeZone: 'America/Chicago',
        });
      } catch {
        formattedTime = meetingTime;
      }
    }

    // Build SMS
    let smsBody = `New consult booked!\n${contactName} — ${formattedTime}`;
    if (contactPhone) smsBody += `\nPhone: ${contactPhone}`;
    if (contactEmail) smsBody += `\nEmail: ${contactEmail}`;

    // Send SMS to Jacob
    if (TWILIO_SID && TWILIO_AUTH && TWILIO_FROM) {
      try {
        const params = new URLSearchParams({
          To: JACOB_CELL,
          From: TWILIO_FROM,
          Body: smsBody,
        });

        const res = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_AUTH}`).toString('base64')}`,
            },
            body: params.toString(),
          }
        );

        if (!res.ok) {
          const errBody = await res.text();
          console.error('[Meeting Webhook] Twilio error:', res.status, errBody);
        }
      } catch (smsErr) {
        console.error('[Meeting Webhook] SMS failed:', smsErr);
      }
    } else {
      console.warn('[Meeting Webhook] Twilio env vars not set — SMS skipped');
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[Meeting Webhook] Error:', err);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
