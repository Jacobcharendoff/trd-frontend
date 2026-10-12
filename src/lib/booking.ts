/**
 * The HubSpot scheduling page for the free build call (Vince's calendar, since Oct 6 2026).
 * Swap MEETINGS_BASE when the calendar owner changes. Keep the slug "rig-build-consultation":
 * HubSpot logs a booking as "Meetings Link: <owner>/rig-build-consultation", and the follow-up
 * emails use that to tell who has booked.
 */
export const MEETING_SLUG = 'rig-build-consultation';
export const MEETINGS_BASE = `https://meetings-na2.hubspot.com/therigdr/${MEETING_SLUG}`;
export const MEETINGS_EMBED_URL = `${MEETINGS_BASE}?embed=true`;

/**
 * Vince's 1:1 Tone Tutoring calendar (60 minutes). Buyers pick their session time here, and the
 * after-session emails (review ask, check-in) are timed off the session they book.
 * HubSpot logs a booking as "Meetings Link: therigdr/private-tone-consultation".
 */
export const TONE_MEETING_SLUG = 'private-tone-consultation';
export const TONE_MEETINGS_BASE = `https://meetings-na2.hubspot.com/therigdr/${TONE_MEETING_SLUG}`;
export const TONE_EMBED_URL = `${TONE_MEETINGS_BASE}?embed=true`;
export const TONE_SESSION_MINUTES = 60;
