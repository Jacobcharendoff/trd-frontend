/**
 * One call, every destination.
 *
 * track('generate_lead', { form: 'book_consult' })
 *   -> GA4 event (gtag)
 *   -> Meta Pixel standard/custom event (fbq), when the pixel is installed
 *   -> HubSpot custom behavioral event queue (_hsq), for timeline context
 *
 * GA4 names follow Google's recommended events so they show up as key events cleanly.
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _hsq?: unknown[];
  }
}

/** GA4 event name -> Meta standard event name */
const META_MAP: Record<string, string> = {
  generate_lead: 'Lead',
  sign_up: 'CompleteRegistration',
  begin_checkout: 'InitiateCheckout',
  view_item: 'ViewContent',
  add_to_cart: 'AddToCart',
  purchase: 'Purchase',
  schedule: 'Schedule',
};

export function track(event: string, params: Params = {}) {
  if (typeof window === 'undefined') return;
  const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));

  try {
    window.gtag?.('event', event, clean);
  } catch {}

  try {
    if (window.fbq) {
      const meta = META_MAP[event];
      if (meta) window.fbq('track', meta, clean);
      else window.fbq('trackCustom', event, clean);
    }
  } catch {}

  try {
    window._hsq = window._hsq || [];
    window._hsq.push(['trackCustomBehavioralEvent', { name: `pe_${event}`, properties: clean }]);
  } catch {}
}

/** Track a lead form submission. `form` is a stable id like 'book_consult' or 'tone20_optin'. */
export function trackLead(form: string, extra: Params = {}) {
  track('generate_lead', { form, currency: 'USD', ...extra });
}
