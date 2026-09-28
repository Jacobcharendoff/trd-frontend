import { NextRequest, NextResponse } from 'next/server';
import { adminConfigured, tagsAdd, tagsRemove } from '@/lib/shopify-admin';
import {
  FROM,
  REPLY_TO,
  NOTIFY_TO,
  TAG,
  DRIP_STEPS,
  DRIP_ENABLED,
  ENDS_ON,
  todayCT,
  listBuyers,
  countCustomers,
  unsubscribeUrl,
  sendBatch,
  sendEmail,
  resendConfigured,
  buildQueue,
  type QueueItem,
  type OutEmail,
} from '@/lib/rewards';
import { dripEmail, weeklySummaryEmail } from '@/lib/rewards-emails';

/**
 * Daily (vercel.json cron, 10am Central). Sends the Review Rewards drip:
 *   email 1 from DRIP_STEPS[0].from, email 2 from [1].from, last call from [2].from
 * Each customer's progress is a Shopify tag (trd-rr-sent-N), so reruns never double-send.
 * Skips anyone who claimed, unsubscribed, or opted out. Caps sends per run for deliverability.
 * On Mondays it also emails Jacob a summary.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (secret) return req.headers.get('authorization') === `Bearer ${secret}`;
  return (req.headers.get('user-agent') || '').includes('vercel-cron');
}

async function summary() {
  const q = (tag: string) => countCustomers(`tag:"${tag}"`);
  const [s1, s2, s3, claimed, t50, t75, t100, optedOut] = await Promise.all([
    q(TAG.sent(1)),
    q(TAG.sent(2)),
    q(TAG.sent(3)),
    q(TAG.claimed),
    q(TAG.tier(50)),
    q(TAG.tier(75)),
    q(TAG.tier(100)),
    q(TAG.optout),
  ]);
  const m = weeklySummaryEmail({
    sent: [s1, s2, s3],
    claimed,
    byTier: { 50: t50, 75: t75, 100: t100 },
    optedOut,
  });
  await sendEmail({ from: FROM, to: [NOTIFY_TO], subject: m.subject, html: m.html });
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!adminConfigured() || !resendConfigured()) return NextResponse.json({ skipped: 'not configured' });

  const today = todayCT();
  const isMonday =
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short' }).format(new Date()) === 'Mon';

  const result: Record<string, unknown> = { today };

  if (!DRIP_ENABLED) {
    result.drip = 'paused';
  } else if (today <= ENDS_ON) {
    const cap = Number(process.env.REVIEW_DRIP_DAILY_CAP) || 60;
    const queue = buildQueue(await listBuyers(), today);
    const todays = queue.slice(0, cap);
    const sentByStep = { 1: 0, 2: 0, 3: 0 };
    const errors: string[] = [];

    for (let i = 0; i < todays.length; i += 50) {
      const chunk = todays.slice(i, i + 50);
      const tagged: QueueItem[] = [];
      for (const item of chunk) {
        try {
          await tagsAdd(item.customer.id, [TAG.sent(item.step), TAG.sentOn(item.step, today)]);
          tagged.push(item);
        } catch (e) {
          errors.push(`tag ${item.customer.id}: ${(e as Error).message}`);
        }
      }
      const emails: OutEmail[] = tagged.map(({ customer, step }) => {
        const unsub = unsubscribeUrl(customer.id);
        const m = dripEmail(step, customer.firstName, unsub);
        return {
          from: FROM,
          to: [customer.email as string],
          reply_to: REPLY_TO,
          subject: m.subject,
          html: m.html,
          text: m.text,
          headers: {
            'List-Unsubscribe': `<${unsub}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
          },
          tags: [{ name: 'campaign', value: `review_rewards_${step}` }],
        };
      });
      try {
        await sendBatch(emails);
        for (const t of tagged) sentByStep[t.step]++;
      } catch (e) {
        // Batch rejected: fall back to one-by-one so one bad address can't block everyone.
        errors.push(`batch: ${(e as Error).message}`);
        for (let j = 0; j < tagged.length; j++) {
          try {
            await new Promise((r) => setTimeout(r, 600)); // stay under Resend's 2 req/s
            await sendEmail(emails[j]);
            sentByStep[tagged[j].step]++;
          } catch (err) {
            errors.push(`send ${tagged[j].customer.id}: ${(err as Error).message}`);
            await tagsRemove(tagged[j].customer.id, [TAG.sent(tagged[j].step), TAG.sentOn(tagged[j].step, today)]).catch(() => {});
          }
        }
      }
    }
    Object.assign(result, { eligible: queue.length, sent: sentByStep, errors });
  } else {
    result.drip = 'ended';
  }

  if (isMonday) {
    try {
      await summary();
      result.summary = 'sent';
    } catch (e) {
      result.summary = `failed: ${(e as Error).message}`;
    }
  }

  return NextResponse.json(result);
}
