/**
 * UTM Parameter Utilities
 *
 * Captures UTM parameters from incoming URLs, persists them in a cookie,
 * and provides retrieval for checkout attribution.
 *
 * Cookie: trd_utm — JSON-encoded UTM params, 30-day expiry
 * Used by: UTMCapture component (client-side capture) + checkout API route (server-side read)
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const UTM_COOKIE_NAME = 'trd_utm';
const UTM_COOKIE_DAYS = 30;
const UTM_KEYS: (keyof UTMParams)[] = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
];

/**
 * Extract UTM params from a URL search string.
 * Returns null if no UTM params are present.
 */
export function extractUTMFromURL(searchParams: URLSearchParams): UTMParams | null {
  const params: UTMParams = {};
  let found = false;

  for (const key of UTM_KEYS) {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
      found = true;
    }
  }

  return found ? params : null;
}

/**
 * Set UTM cookie (client-side).
 * Only overwrites if new UTM params are present — preserves existing attribution
 * for users who arrive via email then browse around.
 */
export function setUTMCookie(params: UTMParams): void {
  const expires = new Date();
  expires.setDate(expires.getDate() + UTM_COOKIE_DAYS);

  document.cookie = `${UTM_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(params))}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
}

/**
 * Read UTM cookie (works client-side and in edge/server contexts).
 * Pass document.cookie or the Cookie header string.
 */
export function getUTMFromCookie(cookieString: string): UTMParams | null {
  const match = cookieString.match(
    new RegExp(`(?:^|;\\s*)${UTM_COOKIE_NAME}=([^;]*)`)
  );

  if (!match?.[1]) return null;

  try {
    return JSON.parse(decodeURIComponent(match[1])) as UTMParams;
  } catch {
    return null;
  }
}

/**
 * Append UTM params to a checkout URL.
 * Shopify's hosted checkout will capture these for analytics attribution.
 */
export function appendUTMToURL(url: string, params: UTMParams): string {
  const urlObj = new URL(url);

  for (const [key, value] of Object.entries(params)) {
    if (value) {
      urlObj.searchParams.set(key, value);
    }
  }

  return urlObj.toString();
}

/**
 * Convert UTM params to Shopify cart attributes format.
 * These show up on the order in Shopify admin for manual attribution review.
 */
export function utmToCartAttributes(params: UTMParams): Array<{ key: string; value: string }> {
  return Object.entries(params)
    .filter(([, value]) => !!value)
    .map(([key, value]) => ({ key, value: value as string }));
}
