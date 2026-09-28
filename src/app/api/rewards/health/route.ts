import { NextRequest, NextResponse } from 'next/server';
import { adminConfigured, adminGql } from '@/lib/shopify-admin';
import { resendConfigured, rewardsOpen, todayCT, ENDS_ON, listBuyers, buildQueue, DRIP_STEPS } from '@/lib/rewards';

/** Setup check for the rewards program. Shows whether things are wired up. No secrets, no customer data. */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const out: Record<string, unknown> = {
    adminConfigured: adminConfigured(),
    resendConfigured: resendConfigured(),
    open: rewardsOpen(),
    today: todayCT(),
    endsOn: ENDS_ON,
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
    // ?drip=1: how many buyers each drip step would reach today (counts only, sends nothing).
    if (req.nextUrl.searchParams.get('drip') === '1' && !out.adminError) {
      try {
        const buyers = await listBuyers();
        const queue = buildQueue(buyers, todayCT());
        out.buyers = buyers.length;
        out.reachableForEmail1 = buildQueue(buyers, DRIP_STEPS[0].from).filter((q) => q.step === 1).length;
        out.dueToday = { 1: 0, 2: 0, 3: 0, ...Object.fromEntries([1, 2, 3].map((n) => [n, queue.filter((q) => q.step === n).length])) };
      } catch (e) {
        out.dripError = (e as Error).message.slice(0, 200);
      }
    }
  }
  return NextResponse.json(out, { headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } });
}
