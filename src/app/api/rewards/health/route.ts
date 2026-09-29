import { NextRequest, NextResponse } from 'next/server';
import { adminConfigured, adminGql } from '@/lib/shopify-admin';
import {
  resendConfigured,
  rewardsOpen,
  todayCT,
  ENDS_ON,
  listBuyers,
  buildQueue,
  loadDripState,
  emptyLog,
  DRIP_STEPS,
  DRIP_ENABLED,
  DRIP_AUDIENCE,
} from '@/lib/rewards';

/** Setup check for the rewards program. Shows whether things are wired up. No secrets, no customer data. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const out: Record<string, unknown> = {
    adminConfigured: adminConfigured(),
    resendConfigured: resendConfigured(),
    open: rewardsOpen(),
    today: todayCT(),
    endsOn: ENDS_ON,
    dripEnabled: DRIP_ENABLED,
    dripAudience: DRIP_AUDIENCE,
    dripSteps: DRIP_STEPS,
  };
  if (adminConfigured()) {
    try {
      const d = await adminGql<{
        shop: { name: string };
        currentAppInstallation: { accessScopes: { handle: string }[] };
      }>(`{ shop { name } currentAppInstallation { accessScopes { handle } } }`);
      out.shop = d.shop.name;
      out.scopes = d.currentAppInstallation.accessScopes.map((s) => s.handle).sort();
    } catch (e) {
      out.adminError = (e as Error).message.slice(0, 200);
    }

    // Drip progress (counts only).
    let log = emptyLog();
    try {
      const st = await loadDripState();
      log = st.log;
      out.sent = { 1: log[1].size, 2: log[2].size, 3: log[3].size };
      // ?statewrite=1: prove the drip can save its progress (writes an app-owned timestamp only).
      if (req.nextUrl.searchParams.get('statewrite') === '1') {
        await adminGql(
          `mutation($m: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $m) { metafields { id } userErrors { field message } } }`,
          { m: [{ ownerId: st.shopId, namespace: '$app:review_rewards', key: 'health_check', type: 'single_line_text_field', value: new Date().toISOString() }] },
        ).then((r) => {
          const errs = (r as { metafieldsSet: { userErrors: { message: string }[] } }).metafieldsSet.userErrors;
          out.stateWrite = errs.length ? `failed: ${errs.map((x) => x.message).join('; ')}` : 'ok';
        });
      }
    } catch (e) {
      out.stateError = (e as Error).message.slice(0, 200);
    }

    // ?drip=1: how many buyers each drip step would reach today (counts only, sends nothing).
    if (req.nextUrl.searchParams.get('drip') === '1' && !out.adminError) {
      try {
        const buyers = await listBuyers();
        out.buyers = buyers.length;
        out.reachableForEmail1 = buildQueue(buyers, DRIP_STEPS[0].from, emptyLog()).filter((q) => q.step === 1).length;
        const queue = buildQueue(buyers, todayCT(), log);
        out.dueToday = Object.fromEntries([1, 2, 3].map((n) => [n, queue.filter((q) => q.step === n).length]));
      } catch (e) {
        out.dripError = (e as Error).message.slice(0, 200);
      }
    }
  }
  return NextResponse.json(out, { headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
}
