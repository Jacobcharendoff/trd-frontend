/**
 * The HubSpot scheduling page for the free build call.
 * Swap MEETINGS_BASE when the calendar owner changes. Keep the slug "rig-build-consultation":
 * HubSpot logs a booking as "Meetings Link: <owner>/rig-build-consultation", and the follow-up
 * emails use that to tell who has booked.
 */
export const MEETING_SLUG = 'rig-build-consultation';
export const MEETINGS_BASE = `https://meetings-na2.hubspot.com/trd/${MEETING_SLUG}`;
export const MEETINGS_EMBED_URL = `${MEETINGS_BASE}?embed=true`;
