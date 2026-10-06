import { NextRequest, NextResponse, after } from 'next/server';
import { createHash, timingSafeEqual } from 'node:crypto';
import { sendBatch, type Email } from '@/lib/lead-emails';
import { upsertContact, addContactNote, esc } from '@/lib/hubspot';

/**
 * One-off send (Oct 2026): "first dibs on 2027", 15% off a build, to past build-call prospects
 * who didn't move forward. Sent as a personal note from Vince; replies go to him.
 *
 * Recipients come in the request body, never stored in this public repo. Guarded by a one-time
 * token whose SHA-256 is below. Remove this route once the batch is out.
 */

const TOKEN_SHA256 = '1837f8715fc4d4358d26a4da34d5e5123f1ec59d5bc6617332d0a4aa0bbfbd7f';
const FROM = process.env.RESEND_VINCE_FROM_EMAIL || 'Vince DiGioia <vince@therigdr.com>';
const REPLY_TO = 'vince@therigdr.com';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function authorized(req: NextRequest) {
  const token = req.headers.get('x-admin-token') || '';
  const got = createHash('sha256').update(token).digest();
  const want = Buffer.from(TOKEN_SHA256, 'hex');
  return token.length > 0 && got.length === want.length && timingSafeEqual(got, want);
}

const FOOTER =
  'The Rig Doctor LLC, 641 Amesbury Rd, Montgomery, TX 77316. You got this because you talked with us about a build. Reply "unsubscribe" and we won\'t email you again.';

function email(first: string, noShow: boolean) {
  const P = (s: string) => `<p style="margin: 0 0 14px;">${s}</p>`;
  const opener = noShow
    ? 'We had a call set up about your board a while back that never happened. All good, life gets busy.'
    : 'Vince from The Rig Doctor. We talked about your board a while back and the timing wasn&#39;t right. All good.';
  return `
<div style="font-family: Arial, Helvetica, sans-serif; max-width: 540px; color: #222; line-height: 1.6; font-size: 15px;">
  ${P(first ? `Hey ${esc(first)},` : 'Hey,')}
  ${P(noShow ? `Vince from The Rig Doctor. ${opener}` : opener)}
  ${P('We&#39;re booking our first builds of 2027, and I&#39;d rather start the year with players we&#39;ve already talked gear with. So you get first dibs, and 15% off.')}
  ${P('Only 5 slots, open till Nov 30. Reply &quot;I&#39;m in&quot; and we&#39;ll pick up where we left off.')}
  ${P('Not the right time? No worries, just let me know.')}
  ${P('Vince')}
  ${P('P.S. If the board&#39;s grown a few pedals since we talked, no judgment.')}
  <p style="margin-top: 32px; font-size: 11px; color: #aaa; line-height: 1.5;">${FOOTER}</p>
</div>`.trim();
}

type Recipient = { email: string; first?: string; noShow?: boolean };

export async function POST(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as { recipients?: Recipient[]; dryRun?: boolean };
  const list = (body.recipients ?? [])
    .map((r) => ({ email: String(r.email || '').trim().toLowerCase(), first: String(r.first || '').trim(), noShow: !!r.noShow }))
    .filter((r) => EMAIL_RE.test(r.email));
  const unique = [...new Map(list.map((r) => [r.email, r])).values()].slice(0, 30);

  const emails: Email[] = unique.map((r) => ({
    from: FROM,
    to: r.email,
    subject: 'first dibs on 2027',
    html: email(r.first, r.noShow),
    replyTo: REPLY_TO,
    tag: 'first_dibs_2027',
  }));

  if (body.dryRun) {
    return NextResponse.json({ ok: true, dryRun: true, count: emails.length, sample: emails[0]?.html ?? null });
  }

  const ids = await sendBatch(emails);

  after(async () => {
    for (const r of unique) {
      const id = await upsertContact(r.email, {}, {});
      if (id) await addContactNote(id, '<strong>Sent "first dibs on 2027"</strong>: 15% off a build, first 5 slots of 2027, open till Nov 30. From Vince.');
    }
  });

  return NextResponse.json({ ok: ids.length === emails.length, sent: ids.length, requested: emails.length });
}
