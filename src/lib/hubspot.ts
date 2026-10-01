/**
 * HubSpot CRM helpers for the site's forms.
 *
 * Only write properties that exist in the portal. HubSpot rejects the whole create or update
 * if a single property is unknown, which is how every site form silently stopped writing to the
 * CRM (leadsource and description don't exist here, and notes_last_updated is a date HubSpot sets itself).
 * Free text goes in `message` and in a note on the contact.
 */

const TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const API = 'https://api.hubapi.com';
const PORTAL_ID = '245067165';

/** Vince DiGioia. New website leads are assigned to him so HubSpot notifies a builder. */
export const LEAD_OWNER_ID = '61116245';

type Props = Record<string, string | undefined | null>;

function clean(p: Props): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(p)) {
    if (typeof v === 'string' && v.trim() !== '') out[k] = v.trim();
  }
  return out;
}

function hs(path: string, init: RequestInit) {
  return fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
  });
}

export function hubspotConfigured() {
  return Boolean(TOKEN);
}

export function contactUrl(id: string) {
  return `https://app.hubspot.com/contacts/${PORTAL_ID}/record/0-1/${id}`;
}

/**
 * Create the contact, or update it if the email already exists.
 * `onCreateOnly` is applied to new contacts only (lifecycle stage and owner), so a returning
 * customer never gets knocked back to "lead" or reassigned.
 * Returns the contact id, or null if HubSpot isn't configured or the call failed.
 */
export async function upsertContact(
  email: string,
  props: Props = {},
  onCreateOnly: Props = { lifecyclestage: 'lead' },
): Promise<string | null> {
  if (!TOKEN) return null;
  const properties = clean({ ...props, email: email.trim().toLowerCase() });

  try {
    const res = await hs('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify({ properties: { ...properties, ...clean(onCreateOnly) } }),
    });
    if (res.ok) return ((await res.json()) as { id?: string }).id ?? null;

    if (res.status === 409) {
      const body = (await res.json().catch(() => null)) as { message?: string } | null;
      const id = body?.message?.match(/Existing ID: (\d+)/)?.[1] ?? null;
      if (!id) return null;
      const { email: _email, ...update } = properties;
      void _email;
      if (Object.keys(update).length) {
        const up = await hs(`/crm/v3/objects/contacts/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ properties: update }),
        });
        if (!up.ok) console.error('[hubspot] update failed', up.status, await up.text());
      }
      return id;
    }

    console.error('[hubspot] create failed', res.status, await res.text());
    return null;
  } catch (err) {
    console.error('[hubspot] request failed', err);
    return null;
  }
}

/** Attach a note to a contact so the full submission shows on its timeline. */
export async function addContactNote(contactId: string, html: string) {
  if (!TOKEN || !contactId) return;
  try {
    const res = await hs('/crm/v3/objects/notes', {
      method: 'POST',
      body: JSON.stringify({
        properties: { hs_note_body: html, hs_timestamp: new Date().toISOString() },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
          },
        ],
      }),
    });
    if (!res.ok) console.error('[hubspot] note failed', res.status, await res.text());
  } catch (err) {
    console.error('[hubspot] note request failed', err);
  }
}

/**
 * Did this email just book the rig consult calendar? HubSpot records a booking as a
 * "Meetings Link: trd/rig-build-consultation" conversion on the contact.
 * Returns the contact's first name and the booked meeting time when HubSpot has them.
 */
export async function findRecentBooking(
  email: string,
  withinMs = 30 * 60_000,
): Promise<{ booked: boolean; contactId?: string; firstName?: string; meetingAt?: number }> {
  if (!TOKEN) return { booked: false };
  try {
    const res = await hs('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email.trim().toLowerCase() }] }],
        properties: ['firstname', 'recent_conversion_event_name', 'recent_conversion_date', 'engagements_last_meeting_booked'],
        limit: 1,
      }),
    });
    if (!res.ok) {
      console.error('[hubspot] booking lookup failed', res.status, await res.text());
      return { booked: false };
    }
    const data = (await res.json()) as {
      results?: Array<{ id: string; properties: Record<string, string | null> }>;
    };
    const c = data.results?.[0];
    if (!c) return { booked: false };
    const p = c.properties;
    const event = (p.recent_conversion_event_name || '').toLowerCase();
    const at = p.recent_conversion_date ? Date.parse(p.recent_conversion_date) : 0;
    const meeting = p.engagements_last_meeting_booked ? Date.parse(p.engagements_last_meeting_booked) : NaN;
    return {
      booked: event.includes('rig-build-consultation') && Date.now() - at <= withinMs,
      contactId: c.id,
      firstName: p.firstname || undefined,
      meetingAt: Number.isFinite(meeting) && meeting > Date.now() ? meeting : undefined,
    };
  } catch (err) {
    console.error('[hubspot] booking lookup request failed', err);
    return { booked: false };
  }
}

/** Contacts who booked the rig consult calendar since `sinceMs` (for the daily safety-net cron). */
export async function recentBookers(sinceMs: number): Promise<string[]> {
  if (!TOKEN) return [];
  try {
    const res = await hs('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              { propertyName: 'recent_conversion_event_name', operator: 'CONTAINS_TOKEN', value: '*rig-build-consultation*' },
              { propertyName: 'recent_conversion_date', operator: 'GTE', value: String(sinceMs) },
            ],
          },
        ],
        properties: ['email'],
        limit: 100,
      }),
    });
    if (!res.ok) {
      console.error('[hubspot] recent bookers failed', res.status, await res.text());
      return [];
    }
    const data = (await res.json()) as { results?: Array<{ properties: { email?: string | null } }> };
    return (data.results ?? []).map((r) => r.properties.email || '').filter(Boolean);
  } catch (err) {
    console.error('[hubspot] recent bookers request failed', err);
    return [];
  }
}

/** Escape user text before it goes into a note or an email. */
export function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
