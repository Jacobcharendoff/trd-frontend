import { NextRequest, NextResponse } from 'next/server';
import { adminConfigured, numericId } from '@/lib/shopify-admin';
import {
  FROM,
  REPLY_TO,
  NOTIFY_TO,
  TAG,
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
  loadDripState,
  saveDripStep,
  type QueueItem,
  type OutEmail,
  type SentLog,
} from '@/lib/rewards';
import { dripEmail, weeklySummaryEmail } from '@/lib/rewards-emails';

/**
 * Daily (vercel.json cron, 10am Central). Sends the Review Rewards drip:
 *   email 1 from DRIP_STEPS[0].from, email 2 from [1].from, last call from [2].from,
 *   with at least 5 days between emails for each person.
 *
 * Who got what lives in shop metafields (see loadDripState). Each chunk is recorded
 * BEFORE it's sent and un-recorded if the send fails, so a rerun never double-sends.
 *
 * Volume ramps up to protect the sending domain: 150 on day one, then up to twice
 * everything sent so far, capped at 1,000 per run. Skips anyone who claimed or unsubscribed.
 * On Mondays it also emails Jacob a summary.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const CHUNK = 100; // Resend batch limit
const TIME_BUDGET_MS = 40_000; // stop starting new chunks after this

function authorized(req: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (secret) return req.headers.get('authorization') === `Bearer ${secret}`;
  return (req.headers.get('user-agent') || '').includes('vercel-cron');
}

async function summary(log: SentLog) {
  const q = (tag: string) => countCustomers(`tag:"${tag}"`);
  const [claimed, t50, t75, t100, optedOut] = await Promise.all([
    q(TAG.claimed),
    q(TAG.tier(50)),
    q(TAG.tier(75)),
    q(TAG.tier(100)),
    q(TAG.optout),
  ]);
  const m = weeklySummaryEmail({
    sent: [log[1].size, log[2].size, log[3].size],
    claimed,
    byTier: { 50: t50, 75: t75, 100: t100 },
    optedOut,
  });
  await sendEmail({ from: FROM, to: [NOTIFY_TO], subject: m.subject, html: m.html });
}

function toEmail({ customer, step }: QueueItem): OutEmail {
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
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!adminConfigured() || !resendConfigured()) return NextResponse.json({ skipped: 'not configured' });

  const started = Date.now();
  const today = todayCT();
  const isMonday =
    new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short' }).format(new Date()) === 'Mon';
  const result: Record<string, unknown> = { today };

  const { shopId, log } = await loadDripState();

  if (!DRIP_ENABLED) {
    result.drip = 'paused';
  } else if (today > ENDS_ON) {
    result.drip = 'ended';
  } else {
    const sentSoFar = log[1].size + log[2].size + log[3].size;
    const maxPerRun = Number(process.env.REVIEW_DRIP_MAX_PER_RUN) || 1000;
    const cap = Math.min(maxPerRun, Math.max(150, sentSoFar * 2));
    const queue = buildQueue(await listBuyers(), today, log);
    const todays = queue.slice(0, cap);
    const sentByStep = { 1: 0, 2: 0, 3: 0 };
    const errors: string[] = [];

    for (let i = 0; i < todays.length; i += CHUNK) {
      if (Date.now() - started > TIME_BUDGET_MS) {
        errors.push('time budget reached, rest goes out tomorrow');
        break;
      }
      const chunk = todays.slice(i, i + CHUNK);
      const steps = [...new Set(chunk.map((c) => c.step))];

      // 1. Record first, so a crash mid-send can't cause a double send tomorrow.
      for (const item of chunk) log[item.step].set(numericId(item.customer.id), today);
      try {
        for (const s of steps) await saveDripStep(shopId, s, log[s]);
      } catch (e) {
        for (const item of chunk) log[item.step].delete(numericId(item.customer.id));
        errors.push(`state save failed, stopped: ${(e as Error).message}`);
        break;
      }

      // 2. Send.
      const emails = chunk.map(toEmail);
      const failed: QueueItem[] = [];
      try {
        await sendBatch(emails);
      } catch (e) {
        // Batch rejected: try one by one so one bad address can't block the rest.
        errors.push(`batch: ${(e as Error).message}`);
        for (let j = 0; j < chunk.length; j++) {
          try {
            await new Promise((r) => setTimeout(r, 550)); // Resend allows 2 requests/second
            await sendEmail(emails[j]);
          } catch (err) {
            failed.push(chunk[j]);
            if (errors.length < 20) errors.push(`send ${numericId(chunk[j].customer.id)}: ${(err as Error).message}`);
          }
          if (Date.now() - started > TIME_BUDGET_MS + 10_000) {
            // Out of time mid-fallback: treat the rest as not sent.
            failed.push(...chunk.slice(j + 1));
            break;
          }
        }
      }

      // 3. Un-record anything that didn't go, so it's retried next run.
      if (failed.length) {
        for (const item of failed) log[item.step].delete(numericId(item.customer.id));
        for (const s of [...new Set(failed.map((f) => f.step))]) {
          await saveDripStep(shopId, s, log[s]).catch((e) => errors.push(`state rollback: ${(e as Error).message}`));
        }
      }
      for (const item of chunk) if (!failed.includes(item)) sentByStep[item.step]++;

      // Every send failing usually means the daily sending quota is used up. Stop for today.
      if (failed.length === chunk.length) {
        errors.push('every send in this chunk failed, stopping for today');
        break;
      }
    }

    Object.assign(result, { eligible: queue.length, cap, sent: sentByStep, errors, ms: Date.now() - started });

    // Tell Jacob if anything went wrong, so problems don't sit unnoticed.
    if (errors.length) {
      await sendEmail({
        from: FROM,
        to: [NOTIFY_TO],
        subject: `Review drip: ${errors.length} issue${errors.length === 1 ? '' : 's'} on ${today}`,
        html: `<div style="font-family:sans-serif;font-size:14px;line-height:1.5">
          <p>Sent today: ${sentByStep[1]} (1st), ${sentByStep[2]} (2nd), ${sentByStep[3]} (last call). Still queued: ${Math.max(0, queue.length - sentByStep[1] - sentByStep[2] - sentByStep[3])}.</p>
          <p>Anything that didn't go out is retried automatically tomorrow.</p>
          <pre style="white-space:pre-wrap;background:#f5f5f7;padding:12px;border-radius:8px">${errors
            .slice(0, 20)
            .join('\n')
            .replace(/</g, '&lt;')}</pre></div>`,
      }).catch(() => {});
    }
  }

  if (isMonday) {
    try {
      await summary(log);
      result.summary = 'sent';
    } catch (e) {
      result.summary = `failed: ${(e as Error).message}`;
    }
  }

  return NextResponse.json(result);
}
