import { NextRequest } from 'next/server';
import { adminConfigured } from '@/lib/shopify-admin';
import { verify, unsubscribeCustomer } from '@/lib/rewards';
import { simplePage } from '@/lib/rewards-pages';

/**
 * GET  shows a confirm button (so link scanners in inboxes can't unsubscribe people by accident).
 * POST unsubscribes. Mail apps' one-click unsubscribe (List-Unsubscribe-Post) also POSTs here.
 */

export const runtime = 'nodejs';

function params(req: NextRequest) {
  const c = req.nextUrl.searchParams.get('c') || '';
  const s = req.nextUrl.searchParams.get('s');
  return { c, s, ok: /^\d+$/.test(c) && adminConfigured() && verify(`unsub:${c}`, s) };
}

export function GET(req: NextRequest) {
  const { c, s, ok } = params(req);
  if (!ok) return simplePage('Link expired', '<h1>That link didn&#39;t work.</h1><p>Email <a href="mailto:info@therigdr.com">info@therigdr.com</a> and we&#39;ll take you off the list.</p>', 400);
  return simplePage(
    'Unsubscribe',
    `<h1>Unsubscribe?</h1><p>You&#39;ll stop getting marketing emails from The Rig Doctor.</p>
     <form method="POST" action="/api/rewards/unsubscribe?c=${c}&s=${encodeURIComponent(s || '')}"><button type="submit">Unsubscribe me</button></form>`,
  );
}

export async function POST(req: NextRequest) {
  const { c, ok } = params(req);
  if (!ok) return simplePage('Link expired', '<h1>That link didn&#39;t work.</h1><p>Email <a href="mailto:info@therigdr.com">info@therigdr.com</a> and we&#39;ll take you off the list.</p>', 400);
  try {
    await unsubscribeCustomer(`gid://shopify/Customer/${c}`);
  } catch (e) {
    console.error('Unsubscribe failed:', e);
    return simplePage('Something went wrong', '<h1>Something went wrong.</h1><p>Email <a href="mailto:info@therigdr.com">info@therigdr.com</a> and we&#39;ll take you off the list by hand.</p>', 500);
  }
  return simplePage('Unsubscribed', '<h1>You&#39;re off the list.</h1><p>Sorry to see you go. If your rig ever needs anything, we&#39;re at <a href="https://www.therigdr.com">therigdr.com</a>.</p>');
}
