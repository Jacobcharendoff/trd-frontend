/**
 * Shopify Admin API client (server only).
 *
 * Auth, in order of preference:
 *   1. SHOPIFY_ADMIN_TOKEN: a long-lived Admin API access token, if one is ever set.
 *   2. Client credentials grant for the Dev Dashboard app "TRD Site Automations":
 *      SHOPIFY_ADMIN_CLIENT_ID + SHOPIFY_ADMIN_CLIENT_SECRET are exchanged for a token
 *      (valid ~24h) and cached in memory for the life of the function instance.
 *
 * Never import this from a client component.
 */

export const SHOP_DOMAIN = 'the-rig-doctor.myshopify.com';
export const ADMIN_API_VERSION = '2026-01';
export const ADMIN_STORE_URL = 'https://admin.shopify.com/store/the-rig-doctor';

const STATIC_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;
const CLIENT_ID = process.env.SHOPIFY_ADMIN_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;

let cached: { token: string; expiresAt: number } | null = null;

export function adminConfigured(): boolean {
  return Boolean(STATIC_TOKEN || (CLIENT_ID && CLIENT_SECRET));
}

/** Secret material for signing links (unsubscribe, revoke). Never sent to the browser. */
export function adminSigningKey(): string {
  return process.env.REWARDS_SIGNING_SECRET || STATIC_TOKEN || CLIENT_SECRET || '';
}

async function getToken(): Promise<string> {
  if (STATIC_TOKEN) return STATIC_TOKEN;
  if (!CLIENT_ID || !CLIENT_SECRET) throw new Error('Shopify Admin API is not configured');
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;

  const res = await fetch(`https://${SHOP_DOMAIN}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }).toString(),
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Shopify token exchange failed: ${res.status} ${(await res.text()).slice(0, 300)}`);
  }
  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error('Shopify token exchange returned no access_token');
  cached = {
    token: data.access_token,
    expiresAt: Date.now() + Math.max(300, data.expires_in ?? 3600) * 1000,
  };
  return cached.token;
}

export class AdminApiError extends Error {
  codes: string[];
  constructor(message: string, codes: string[] = []) {
    super(message);
    this.codes = codes;
  }
}

type GqlError = { message: string; extensions?: { code?: string } };

export async function adminGql<T = Record<string, unknown>>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const token = await getToken();
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`https://${SHOP_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Shopify-Access-Token': token },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });
    if (res.status === 429 || res.status >= 500) {
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      continue;
    }
    const json = (await res.json().catch(() => ({}))) as { data?: T; errors?: GqlError[] | string };
    if (!res.ok) throw new AdminApiError(`Shopify Admin ${res.status}: ${JSON.stringify(json).slice(0, 300)}`);
    if (json.errors) {
      const errs = Array.isArray(json.errors) ? json.errors : [{ message: String(json.errors) }];
      const throttled = errs.some((e) => e.extensions?.code === 'THROTTLED');
      if (throttled && attempt < 2) {
        await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
        continue;
      }
      throw new AdminApiError(
        errs.map((e) => e.message).join('; '),
        errs.map((e) => e.extensions?.code || '').filter(Boolean),
      );
    }
    return json.data as T;
  }
  throw new AdminApiError('Shopify Admin API kept throttling');
}

/** "gid://shopify/Customer/123" -> "123" */
export function numericId(gid: string): string {
  return gid.split('/').pop() || gid;
}

export async function tagsAdd(id: string, tags: string[]) {
  const d = await adminGql<{ tagsAdd: { userErrors: { message: string }[] } }>(
    `mutation($id: ID!, $tags: [String!]!) { tagsAdd(id: $id, tags: $tags) { userErrors { field message } } }`,
    { id, tags },
  );
  if (d.tagsAdd.userErrors.length) throw new AdminApiError(d.tagsAdd.userErrors.map((e) => e.message).join('; '));
}

export async function tagsRemove(id: string, tags: string[]) {
  const d = await adminGql<{ tagsRemove: { userErrors: { message: string }[] } }>(
    `mutation($id: ID!, $tags: [String!]!) { tagsRemove(id: $id, tags: $tags) { userErrors { field message } } }`,
    { id, tags },
  );
  if (d.tagsRemove.userErrors.length) throw new AdminApiError(d.tagsRemove.userErrors.map((e) => e.message).join('; '));
}
