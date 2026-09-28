'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { track } from '@/lib/track';

/**
 * 1. Sends a page_view on every client-side route change (App Router doesn't reload the page,
 *    so gtag's automatic page_view only ever fired once per visit).
 * 2. Listens for clicks site-wide and tracks the ones that matter:
 *    - any link into /api/checkout            -> begin_checkout (+ Meta InitiateCheckout)
 *    - any link to /book                      -> cta_click (which CTA, which page)
 *    - tel: / mailto: links                   -> contact_click
 */
export default function RouteTracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const first = useRef(true);

  useEffect(() => {
    // The first page view is sent by each tag's own loader (gtag config, fbq init, HubSpot script).
    if (first.current) {
      first.current = false;
      return;
    }
    const url = pathname + (search?.toString() ? `?${search.toString()}` : '');
    try {
      window.gtag?.('event', 'page_view', {
        page_path: url,
        page_location: window.location.href,
        page_title: document.title,
      });
      window.fbq?.('track', 'PageView');
      window._hsq = window._hsq || [];
      window._hsq.push(['setPath', url]);
      window._hsq.push(['trackPageView']);
    } catch {}
  }, [pathname, search]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const label = (a.textContent || '').trim().slice(0, 80);
      const page = window.location.pathname;

      if (href.startsWith('/api/checkout')) {
        const q = new URLSearchParams(href.split('?')[1] || '');
        const handle = q.get('handle') || '';
        const discount = q.get('discount') || undefined;
        const isTone = handle.startsWith('tone-tutoring');
        const value = isTone ? (discount === 'TONE20' ? 79.2 : 99) : undefined;
        track('begin_checkout', {
          currency: 'USD',
          value,
          item_id: handle,
          coupon: discount,
          cta_text: label,
          page,
        });
      } else if (href === '/book' || href.startsWith('/book?') || href.startsWith('/book#') || href === '#consult-form') {
        track('cta_click', { destination: 'book', cta_text: label, page });
      } else if (href.startsWith('/tone-tutoring')) {
        track('cta_click', { destination: 'tone_tutoring', cta_text: label, page });
      } else if (href.startsWith('tel:') || href.startsWith('mailto:')) {
        track('contact_click', { method: href.startsWith('tel:') ? 'phone' : 'email', page });
      }
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
