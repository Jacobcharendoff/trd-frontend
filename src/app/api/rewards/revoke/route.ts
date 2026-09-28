import { NextRequest } from 'next/server';
import { adminConfigured, tagsAdd } from '@/lib/shopify-admin';
import { verify, revokeReward, TAG, type RewardType } from '@/lib/rewards';
import { simplePage } from '@/lib/rewards-pages';

/**
 * Link in Jacob's claim notification. GET asks for confirmation, POST cancels the gift card
 * (or deletes the fallback discount code) and tags the customer trd-rr-revoked.
 */

export const runtime = 'nodejs';

function params(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const t = sp.get('t') as RewardType;
  const id = sp.get('id') || '';
  const c = sp.get('c') || '';
  const s = sp.get('s');
  const valid =
    (t === 'gc' || t === 'dc') && /^\d+$/.test(id) && /^\d+$/.test(c) && adminConfigured() && verify(`revoke:${t}:${id}:${c}`, s);
  return { t, id, c, s, valid };
}

export function GET(req: NextRequest) {
  const { t, id, c, s, valid } = params(req);
  if (!valid) return simplePage('Invalid link', '<h1>That link isn&#39;t valid.</h1>', 400);
  return simplePage(
    'Cancel reward',
    `<h1>Cancel this reward?</h1><p>The ${t === 'gc' ? 'gift card' : 'code'} stops working right away. The customer isn&#39;t notified.</p>
     <form method="POST" action="/api/rewards/revoke?t=${t}&id=${id}&c=${c}&s=${encodeURIComponent(s || '')}"><button type="submit">Cancel the reward</button></form>`,
  );
}

export async function POST(req: NextRequest) {
  const { t, id, c, valid } = params(req);
  if (!valid) return simplePage('Invalid link', '<h1>That link isn&#39;t valid.</h1>', 400);
  try {
    await revokeReward(t, id);
    await tagsAdd(`gid://shopify/Customer/${c}`, [TAG.revoked]).catch(() => {});
  } catch (e) {
    console.error('Revoke failed:', e);
    return simplePage('Something went wrong', `<h1>Couldn&#39;t cancel it.</h1><p>${(e as Error).message.replace(/</g, '&lt;')}</p>`, 500);
  }
  return simplePage('Cancelled', '<h1>Done.</h1><p>That reward is cancelled.</p>');
}
