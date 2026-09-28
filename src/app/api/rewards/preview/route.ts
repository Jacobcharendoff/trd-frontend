import { NextRequest } from 'next/server';
import { dripEmail, rewardEmail, claimNotificationEmail } from '@/lib/rewards-emails';

/** Renders the rewards emails in the browser for QA. Sends nothing. ?e=1|2|3|reward|admin */

export function GET(req: NextRequest) {
  const e = req.nextUrl.searchParams.get('e') || '1';
  let html: string;
  if (e === 'reward') {
    html = rewardEmail('Alex', { type: 'gc', id: 'gid://shopify/GiftCard/1', code: 'ABCD EFGH JKLM NPQR', amount: 75 }).html;
  } else if (e === 'admin') {
    html = claimNotificationEmail({
      name: 'Alex Rivera',
      email: 'alex@example.com',
      tier: 100,
      reward: { type: 'gc', id: 'gid://shopify/GiftCard/1', code: 'ABCD EFGH JKLM NPQR', amount: 100 },
      customerAdminUrl: '#',
      rewardAdminUrl: '#',
      revokeUrl: '#',
      shareOk: true,
      reviewText: 'Board has been flawless for two years of weekend gigs.',
      delivered: true,
    }).html;
  } else {
    const step = (e === '2' ? 2 : e === '3' ? 3 : 1) as 1 | 2 | 3;
    html = dripEmail(step, 'Alex', '#').html;
  }
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' } });
}
