import { NextRequest, NextResponse } from 'next/server';
import sitemap from '@/app/sitemap';
import { submitToIndexNow } from '@/lib/indexnow';

/**
 * Weekly (vercel.json cron, Mondays 11am Central). Pings IndexNow (Bing and friends)
 * with the homepage, the blog index and any blog post published or updated in the
 * last 8 days. Add ?all=1 to submit every URL in the sitemap.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WINDOW_MS = 8 * 24 * 60 * 60 * 1000;
const ALWAYS = new Set(['https://www.therigdr.com', 'https://www.therigdr.com/blog']);

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (secret) return req.headers.get('authorization') === `Bearer ${secret}`;
  return (req.headers.get('user-agent') || '').includes('vercel-cron');
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const all = req.nextUrl.searchParams.get('all') === '1';
  const since = Date.now() - WINDOW_MS;

  const urls = sitemap()
    .filter((entry) => {
      if (all || ALWAYS.has(entry.url)) return true;
      if (!entry.url.includes('/blog/') || !entry.lastModified) return false;
      return new Date(entry.lastModified).getTime() >= since;
    })
    .map((entry) => entry.url);

  try {
    const result = await submitToIndexNow(urls);
    return NextResponse.json({ submitted: urls.length, ...result });
  } catch (err) {
    return NextResponse.json(
      { submitted: 0, ok: false, error: err instanceof Error ? err.message : 'indexnow failed' },
      { status: 502 }
    );
  }
}
