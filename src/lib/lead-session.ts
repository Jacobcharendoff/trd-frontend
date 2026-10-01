/**
 * Keeps the consult form's name and email for this tab only, so the calendar on
 * /book/thank-you opens with them filled in. Cleared once a call is booked.
 */

const KEY = 'trd_lead';

export function rememberLead(name: string, email: string) {
  try {
    const [firstName = '', ...rest] = name.trim().split(/\s+/).filter(Boolean);
    sessionStorage.setItem(KEY, JSON.stringify({ firstName, lastName: rest.join(' '), email: email.trim() }));
  } catch {
    // Private mode or storage blocked. The calendar just won't be prefilled.
  }
}

export function readLead(): { firstName?: string; lastName?: string; email?: string } | null {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || 'null');
  } catch {
    return null;
  }
}

export function forgetLead() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
