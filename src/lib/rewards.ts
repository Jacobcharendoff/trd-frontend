/**
 * Review Rewards program: Rig Doctor gift cards for honest Google reviews.
 *
 *   $50  written review
 *   $75  review + photo of the rig
 *   $100 review + video of the rig
 *
 * Ground rules baked into the flow:
 *   - The card is sent whatever the rating. We never read or check the stars.
 *   - Reviewers are asked to say in the review that they got a gift card as a thank-you.
 *   - Every past buyer gets the same offer. One reward per customer.
 *   - The card goes to the email on the customer's Shopify record, so only the real customer receives it.
 *
 * State lives on the Shopify customer as tags (see TAG) so it's visible in the admin.
 */

import crypto from 'crypto';
import { adminGql, AdminApiError, numericId, tagsAdd } from './shopify-admin';

export const SITE = 'https://www.therigdr.com';
export const GOOGLE_REVIEW_URL = 'https://maps.google.com/?cid=17046293411844793764';
export const FROM = process.env.REWARDS_FROM_EMAIL || 'The Rig Doctor Team <info@therigdr.com>';
export const REPLY_TO = 'info@therigdr.com';
export const NOTIFY_TO = process.env.REWARDS_NOTIFY_EMAIL || 'info@therigdr.com';
export const POSTAL_ADDRESS = 'The Rig Doctor LLC, 641 Amesbury Rd, Montgomery, TX 77316';

export type Tier = 50 | 75 | 100;
export const TIERS: Record<Tier, { label: string; short: string }> = {
  50: { label: 'Written review', short: 'review' },
  75: { label: 'Review + a photo of your rig', short: 'review + photo' },
  100: { label: 'Review + a video of it in action', short: 'review + video' },
};
export function isTier(n: number): n is Tier {
  return n === 50 || n === 75 || n === 100;
}

/** Last day claims are accepted (Central time, inclusive). */
export const ENDS_ON = '2026-10-31';
export const ENDS_LABEL = 'October 31';

/** Drip schedule (Central time dates). A step only goes to people who got the previous one. */
export const DRIP_STEPS = [
  { step: 1, from: '2026-09-30' },
  { step: 2, from: '2026-10-07' },
  { step: 3, from: '2026-10-27' },
] as const;

/**
 * Drip switch and audience. The drip stays off until Jacob confirms who gets it.
 *   'all'               every buyer who hasn't unsubscribed
 *   'subscribed'        buyers who opted in to email marketing
 *   'recent'            buyers whose first order was in the last 24 months
 *   'subscribed_recent' both of the above
 */
export const DRIP_ENABLED = false; // Bulk sends moved to Shopify Email (segment: Review rewards, not claimed yet)
/** Safety net on total gift cards issued. null = no cap. */
export const MAX_CLAIMS: number | null = null;
export type DripAudience = 'all' | 'subscribed' | 'recent' | 'subscribed_recent';
export const DRIP_AUDIENCE: DripAudience = 'subscribed';

export function inAudience(c: { marketingState: string | null; createdAt?: string }, audience: DripAudience, today: string) {
  const cutoff = `${Number(today.slice(0, 4)) - 2}${today.slice(4)}`;
  const subscribed = c.marketingState === 'SUBSCRIBED';
  const recent = (c.createdAt || '') >= cutoff;
  if (audience === 'subscribed') return subscribed;
  if (audience === 'recent') return recent;
  if (audience === 'subscribed_recent') return subscribed && recent;
  return true;
}

export const TAG = {
  claimed: 'trd-rr-claimed',
  tier: (t: Tier) => `trd-rr-tier-${t}`,
  sent: (n: number) => `trd-rr-sent-${n}`,
  /** Dated companion tag, e.g. trd-rr-sent-1-on-20260930, used to space the emails out. */
  sentOn: (n: number, dayCT: string) => `trd-rr-sent-${n}-on-${dayCT.replace(/-/g, '')}`,
  optout: 'trd-rr-optout',
  shareOk: 'trd-rr-share-ok',
  revoked: 'trd-rr-revoked',
};

export function todayCT(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

export function rewardsOpen(): boolean {
  return todayCT() <= ENDS_ON;
}

// ── Link signing ──────────────────────────────────────────────────────────

function signingKey(): string {
  const k = process.env.REWARDS_SIGNING_SECRET || process.env.SHOPIFY_ADMIN_TOKEN || process.env.SHOPIFY_ADMIN_CLIENT_SECRET;
  if (!k) throw new Error('No signing key configured');
  return k;
}

export function sign(payload: string): string {
  return crypto.createHmac('sha256', signingKey()).update(payload).digest('base64url').slice(0, 32);
}

export function verify(payload: string, sig: string | null): boolean {
  if (!sig) return false;
  const expected = sign(payload);
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function unsubscribeUrl(customerGid: string): string {
  const c = numericId(customerGid);
  return `${SITE}/api/rewards/unsubscribe?c=${c}&s=${sign(`unsub:${c}`)}`;
}

export function revokeUrl(type: RewardType, rewardGid: string, customerGid: string): string {
  const id = numericId(rewardGid);
  const c = numericId(customerGid);
  return `${SITE}/api/rewards/revoke?t=${type}&id=${id}&c=${c}&s=${sign(`revoke:${type}:${id}:${c}`)}`;
}

// ── Customers ─────────────────────────────────────────────────────────────

export interface RrCustomer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  numberOfOrders: number;
  tags: string[];
  marketingState: string | null;
  createdAt?: string;
  amountSpent?: number;
}

const CUSTOMER_FIELDS = `id firstName lastName email numberOfOrders tags createdAt amountSpent { amount } emailMarketingConsent { marketingState }`;

type RawCustomer = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  numberOfOrders: string | number;
  tags: string[];
  createdAt?: string;
  amountSpent?: { amount: string } | null;
  emailMarketingConsent: { marketingState: string } | null;
};

function mapCustomer(c: RawCustomer): RrCustomer {
  return {
    id: c.id,
    firstName: c.firstName,
    lastName: c.lastName,
    email: c.email,
    numberOfOrders: Number(c.numberOfOrders) || 0,
    tags: c.tags || [],
    marketingState: c.emailMarketingConsent?.marketingState ?? null,
    createdAt: c.createdAt,
    amountSpent: c.amountSpent ? Number(c.amountSpent.amount) || 0 : undefined,
  };
}

export async function findCustomerByEmail(email: string): Promise<RrCustomer | null> {
  const safe = email.replace(/["\\]/g, '');
  const d = await adminGql<{ customers: { nodes: RawCustomer[] } }>(
    `query($q: String!) { customers(first: 5, query: $q) { nodes { ${CUSTOMER_FIELDS} } } }`,
    { q: `email:"${safe}"` },
  );
  const match = d.customers.nodes.find((c) => (c.email || '').toLowerCase() === email.toLowerCase());
  return match ? mapCustomer(match) : null;
}

export async function getCustomer(gid: string): Promise<RrCustomer | null> {
  const d = await adminGql<{ customer: RawCustomer | null }>(
    `query($id: ID!) { customer(id: $id) { ${CUSTOMER_FIELDS} } }`,
    { id: gid },
  );
  return d.customer ? mapCustomer(d.customer) : null;
}

/** Every customer with at least one order. */
export async function listBuyers(): Promise<RrCustomer[]> {
  const out: RrCustomer[] = [];
  let after: string | null = null;
  for (let page = 0; page < 40; page++) {
    const d: {
      customers: { pageInfo: { hasNextPage: boolean; endCursor: string | null }; nodes: RawCustomer[] };
    } = await adminGql(
      `query($after: String) {
        customers(first: 200, after: $after, query: "orders_count:>0") {
          pageInfo { hasNextPage endCursor }
          nodes { ${CUSTOMER_FIELDS} }
        }
      }`,
      { after },
    );
    for (const c of d.customers.nodes) {
      const m = mapCustomer(c);
      if (m.numberOfOrders > 0) out.push(m);
    }
    if (!d.customers.pageInfo.hasNextPage) break;
    after = d.customers.pageInfo.endCursor;
  }
  return out;
}

export async function countCustomers(query: string): Promise<number> {
  try {
    const d = await adminGql<{ customersCount: { count: number } }>(
      `query($q: String!) { customersCount(query: $q) { count } }`,
      { q: query },
    );
    return d.customersCount.count;
  } catch {
    return -1;
  }
}

// ── Drip queue + state ──────────────────────────────────────────────────
//
// Who got which email, and when, lives in three app-owned shop metafields
// (drip_step_1..3). One read and a few writes per run, instead of a tag write per
// customer, so a run can send 1,000 emails inside the function time limit.

const SKIP_STATES = new Set(['UNSUBSCRIBED', 'REDACTED', 'INVALID']);
const MIN_GAP_DAYS = 5;
const STATE_NS = '$app:review_rewards';

/** customer numeric id -> day sent (YYYY-MM-DD), per step */
export type SentLog = Record<1 | 2 | 3, Map<string, string>>;

function daysBetween(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T12:00:00Z`) - Date.parse(`${a}T12:00:00Z`)) / 86_400_000);
}

function decodeStep(value: string | null | undefined): Map<string, string> {
  const map = new Map<string, string>();
  if (!value) return map;
  const obj = JSON.parse(value) as Record<string, string>;
  for (const [day, ids] of Object.entries(obj)) {
    const iso = `${day.slice(0, 4)}-${day.slice(4, 6)}-${day.slice(6, 8)}`;
    for (const b of ids.split(',')) if (b) map.set(parseInt(b, 36).toString(), iso);
  }
  return map;
}

function encodeStep(map: Map<string, string>): string {
  const grouped: Record<string, string[]> = {};
  for (const [id, day] of map) (grouped[day.replace(/-/g, '')] ||= []).push(Number(id).toString(36));
  return JSON.stringify(Object.fromEntries(Object.entries(grouped).map(([k, v]) => [k, v.join(',')])));
}

export async function loadDripState(): Promise<{ shopId: string; log: SentLog }> {
  type M = { value: string } | null;
  const d = await adminGql<{ shop: { id: string; s1: M; s2: M; s3: M } }>(
    `{ shop { id
      s1: metafield(namespace: "${STATE_NS}", key: "drip_step_1") { value }
      s2: metafield(namespace: "${STATE_NS}", key: "drip_step_2") { value }
      s3: metafield(namespace: "${STATE_NS}", key: "drip_step_3") { value }
    } }`,
  );
  return {
    shopId: d.shop.id,
    log: { 1: decodeStep(d.shop.s1?.value), 2: decodeStep(d.shop.s2?.value), 3: decodeStep(d.shop.s3?.value) },
  };
}

export async function saveDripStep(shopId: string, step: 1 | 2 | 3, map: Map<string, string>) {
  const d = await adminGql<{ metafieldsSet: { userErrors: { message: string }[] } }>(
    `mutation($m: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $m) { metafields { id } userErrors { field message } } }`,
    { m: [{ ownerId: shopId, namespace: STATE_NS, key: `drip_step_${step}`, type: 'json', value: encodeStep(map) }] },
  );
  if (d.metafieldsSet.userErrors.length) {
    throw new AdminApiError(`metafieldsSet: ${d.metafieldsSet.userErrors.map((e) => e.message).join('; ')}`);
  }
}

export interface QueueItem {
  customer: RrCustomer;
  step: 1 | 2 | 3;
}

export function buildQueue(
  buyers: RrCustomer[],
  today: string,
  log: SentLog,
  audience: DripAudience = DRIP_AUDIENCE,
): QueueItem[] {
  const queue: QueueItem[] = [];
  for (const c of buyers) {
    if (!inAudience(c, audience, today)) continue;
    if (!c.email || c.email.toLowerCase().endsWith('@therigdr.com')) continue;
    if (c.tags.includes(TAG.claimed) || c.tags.includes(TAG.optout)) continue;
    if (c.marketingState && SKIP_STATES.has(c.marketingState)) continue;
    const id = numericId(c.id);
    const last = log[3].has(id) ? 3 : log[2].has(id) ? 2 : log[1].has(id) ? 1 : 0;
    const next = last + 1;
    if (next > 3) continue;
    if (today < DRIP_STEPS[next - 1].from) continue;
    // Keep at least MIN_GAP_DAYS between emails, even if the drip started late.
    if (last > 0) {
      const lastOn = log[last as 1 | 2 | 3].get(id);
      if (lastOn && daysBetween(lastOn, today) < MIN_GAP_DAYS) continue;
    }
    queue.push({ customer: c, step: next as 1 | 2 | 3 });
  }
  return queue.sort((a, b) => a.step - b.step);
}

export function emptyLog(): SentLog {
  return { 1: new Map(), 2: new Map(), 3: new Map() };
}

// ── Rewards ───────────────────────────────────────────────────────────────

export type RewardType = 'gc' | 'dc';

export interface IssuedReward {
  type: RewardType;
  id: string;
  code: string;
  amount: Tier;
}

function isAccessProblem(e: unknown): boolean {
  if (!(e instanceof AdminApiError)) return false;
  return (
    e.codes.includes('ACCESS_DENIED') ||
    /access|scope|permission|not approved|plan|not available|unavailable|not enabled/i.test(e.message)
  );
}

async function createGiftCard(customer: RrCustomer, tier: Tier): Promise<IssuedReward> {
  const d = await adminGql<{
    giftCardCreate: {
      giftCard: { id: string } | null;
      giftCardCode: string | null;
      userErrors: { message: string }[];
    };
  }>(
    `mutation($input: GiftCardCreateInput!) {
      giftCardCreate(input: $input) {
        giftCard { id }
        giftCardCode
        userErrors { field message }
      }
    }`,
    {
      input: {
        initialValue: tier.toFixed(2),
        customerId: customer.id,
        note: `Review reward: $${tier} (${TIERS[tier].short}) for ${customer.email}`,
      },
    },
  );
  const r = d.giftCardCreate;
  if (r.userErrors.length || !r.giftCard || !r.giftCardCode) {
    throw new AdminApiError(`giftCardCreate: ${r.userErrors.map((e) => e.message).join('; ') || 'no card returned'}`);
  }
  return { type: 'gc', id: r.giftCard.id, code: r.giftCardCode, amount: tier };
}

function randomCode(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.randomBytes(8);
  let s = '';
  for (const b of bytes) s += alphabet[b % alphabet.length];
  return `TRD-THANKS-${s}`;
}

async function createDiscountCode(customer: RrCustomer, tier: Tier): Promise<IssuedReward> {
  const code = randomCode();
  const base = {
    title: `Review thank-you $${tier} (${customer.email})`,
    code,
    startsAt: new Date().toISOString(),
    customerGets: {
      value: { discountAmount: { amount: tier.toFixed(2), appliesOnEachItem: false } },
      items: { all: true },
    },
    usageLimit: 1,
    appliesOncePerCustomer: true,
  };
  const mutation = `mutation($d: DiscountCodeBasicInput!) {
    discountCodeBasicCreate(basicCodeDiscount: $d) {
      codeDiscountNode { id }
      userErrors { field message }
    }
  }`;
  type Res = { discountCodeBasicCreate: { codeDiscountNode: { id: string } | null; userErrors: { message: string }[] } };

  // Newer API versions use `context`; older ones use `customerSelection`. Try both.
  let d: Res;
  try {
    d = await adminGql<Res>(mutation, { d: { ...base, context: { all: 'ALL' } } });
  } catch {
    d = await adminGql<Res>(mutation, { d: { ...base, customerSelection: { all: true } } });
  }
  const r = d.discountCodeBasicCreate;
  if (r.userErrors.length || !r.codeDiscountNode) {
    throw new AdminApiError(`discountCodeBasicCreate: ${r.userErrors.map((e) => e.message).join('; ') || 'no code returned'}`);
  }
  return { type: 'dc', id: r.codeDiscountNode.id, code, amount: tier };
}

/** Gift card first. If the store or app can't issue gift cards, fall back to a one-time code for the same amount. */
export async function issueReward(customer: RrCustomer, tier: Tier): Promise<IssuedReward> {
  try {
    return await createGiftCard(customer, tier);
  } catch (e) {
    if (!isAccessProblem(e)) throw e;
    console.warn('Gift card creation not permitted, using discount code instead:', (e as Error).message);
    return createDiscountCode(customer, tier);
  }
}

export async function revokeReward(type: RewardType, id: string) {
  if (type === 'gc') {
    const d = await adminGql<{ giftCardDeactivate: { userErrors: { message: string }[] } }>(
      `mutation($id: ID!) { giftCardDeactivate(id: $id) { giftCard { id } userErrors { field message } } }`,
      { id: `gid://shopify/GiftCard/${id}` },
    );
    if (d.giftCardDeactivate.userErrors.length) throw new AdminApiError(d.giftCardDeactivate.userErrors.map((e) => e.message).join('; '));
  } else {
    const d = await adminGql<{ discountCodeDelete: { userErrors: { message: string }[] } }>(
      `mutation($id: ID!) { discountCodeDelete(id: $id) { deletedCodeDiscountId userErrors { field message } } }`,
      { id: `gid://shopify/DiscountCodeNode/${id}` },
    );
    if (d.discountCodeDelete.userErrors.length) throw new AdminApiError(d.discountCodeDelete.userErrors.map((e) => e.message).join('; '));
  }
}

export async function unsubscribeCustomer(customerGid: string) {
  // Tag first: that alone stops the drip, even if the consent update isn't permitted.
  await tagsAdd(customerGid, [TAG.optout]);
  try {
    await adminGql(
      `mutation($input: CustomerEmailMarketingConsentUpdateInput!) {
        customerEmailMarketingConsentUpdate(input: $input) { userErrors { field message } }
      }`,
      { input: { customerId: customerGid, emailMarketingConsent: { marketingState: 'UNSUBSCRIBED' } } },
    );
  } catch (e) {
    console.error('Marketing consent update failed (tag still applied):', e);
  }
}

// ── Email sending (Resend) ────────────────────────────────────────────────

export interface OutEmail {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text?: string;
  reply_to?: string;
  bcc?: string[];
  headers?: Record<string, string>;
  tags?: { name: string; value: string }[];
  attachments?: { filename: string; content: string }[];
}

export function resendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(email: OutEmail): Promise<string> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(email),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const j = (await res.json()) as { id: string };
  return j.id;
}

/** Up to 100 emails per call. */
export async function sendBatch(emails: OutEmail[]): Promise<void> {
  if (!emails.length) return;
  const res = await fetch('https://api.resend.com/emails/batch', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(emails),
  });
  if (!res.ok) throw new Error(`Resend batch ${res.status}: ${(await res.text()).slice(0, 300)}`);
}
