import { NextRequest } from 'next/server';
import { reviewEmail } from '@/lib/review-email';

/** Renders the review request email in the browser for QA. Sends nothing. */
export function GET(req: NextRequest) {
  const variant = req.nextUrl.searchParams.get('variant') === 'general' ? 'general' : 'tone';
  const { html } = reviewEmail(variant, 'Alex');
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' } });
}
