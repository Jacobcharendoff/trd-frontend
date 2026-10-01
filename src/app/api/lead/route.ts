import { NextRequest, NextResponse, after } from 'next/server';
import { upsertContact, addContactNote, contactUrl, esc, LEAD_OWNER_ID } from '@/lib/hubspot';
import { sendBatch, sendResend, notBookedSequence, consultTeamAlert, ALERT_FROM, ALERT_TO } from '@/lib/lead-emails';

/**
 * Free consult request (/book form and the homepage form).
 *
 * 1. Schedules the not-booked follow-up (30 min, then days 1, 3, 6, 10) in one Resend batch.
 * 2. Responds with those ids; the form sends the visitor straight to the calendar page.
 *    Booking there calls /api/lead/booked, which cancels the follow-up and starts the prep emails.
 * 3. After the response: contact + note in HubSpot (owner Vince) and an alert to info@.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  // Honeypot: a hidden field people never see. Bots fill it; pretend it worked.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    return NextResponse.json({ ok: true, n: '' });
  }

  const email = String(body.email ?? '').trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim().slice(0, 120);
  const [first = '', ...rest] = name.split(/\s+/).filter(Boolean);
  const last = rest.join(' ');
  const plays = String(body.instrument ?? '').trim().slice(0, 120);
  const notes = String(body.rig ?? '').trim().slice(0, 2000);
  const source = body.source === 'homepage' ? 'homepage' : 'book';
  const page = (req.headers.get('referer') || '').slice(0, 300);

  // Scheduled before responding, so a booking on the next page can always cancel them.
  const ids = await sendBatch(notBookedSequence(first, email));
  const n = ids.join('.');

  after(async () => {
    const formLabel = source === 'homepage' ? 'homepage form' : '/book';
    const message = [`Free consult request (${formLabel})`, plays && `Plays: ${plays}`, notes && `Rig: ${notes}`]
      .filter(Boolean)
      .join('. ');

    const contactId = await upsertContact(
      email,
      { firstname: first, lastname: last, message, hs_lead_status: 'NEW' },
      { lifecyclestage: 'lead', hubspot_owner_id: LEAD_OWNER_ID },
    );

    if (contactId) {
      await addContactNote(
        contactId,
        `<strong>Free consult request</strong> (${formLabel})` +
          (plays ? `<br><strong>Plays:</strong> ${esc(plays)}` : '') +
          (notes ? `<br><br><strong>Rig notes:</strong><br>${esc(notes).replace(/\n/g, '<br>')}` : '') +
          (page ? `<br><br><strong>Page:</strong> ${esc(page)}` : ''),
      );
    }

    const alert = consultTeamAlert({
      name,
      first,
      email,
      plays,
      notes,
      source,
      page,
      hubspotUrl: contactId ? contactUrl(contactId) : null,
      followUpScheduled: ids.length > 0,
    });
    await sendResend({
      from: ALERT_FROM,
      to: ALERT_TO,
      subject: alert.subject,
      html: alert.html,
      replyTo: email,
      tag: 'consult_alert',
    });
  });

  return NextResponse.json({ ok: true, n });
}
