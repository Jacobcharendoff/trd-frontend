import { NextRequest, NextResponse } from 'next/server';
import { adminConfigured, ADMIN_STORE_URL, numericId, tagsAdd, tagsRemove } from '@/lib/shopify-admin';
import {
  FROM,
  REPLY_TO,
  NOTIFY_TO,
  TAG,
  TIERS,
  isTier,
  rewardsOpen,
  MAX_CLAIMS,
  countCustomers,
  findCustomerByEmail,
  issueReward,
  revokeUrl,
  sendEmail,
  resendConfigured,
  type IssuedReward,
} from '@/lib/rewards';
import { rewardEmail, claimNotificationEmail } from '@/lib/rewards-emails';

/**
 * POST /api/rewards/claim  (multipart/form-data)
 *
 * Fields: email, firstName?, tier (50|75|100), screenshot (image), reviewText?,
 *         honest=on, disclosed=on, shareOk?=on, company (honeypot)
 *
 * Verifies the email belongs to a Shopify customer with an order, allows one claim per
 * customer, issues the gift card and emails it to the address on the customer record.
 */

export const runtime = 'nodejs';
export const maxDuration = 30;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BYTES = 4 * 1024 * 1024;

function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

function maskEmail(e: string) {
  const [u, d] = e.split('@');
  return `${u.slice(0, 2)}${'*'.repeat(Math.max(1, u.length - 2))}@${d}`;
}

export async function POST(req: NextRequest) {
  if (!adminConfigured() || !resendConfigured()) {
    return fail('Rewards are being switched on right now. Try again in a little bit, or email info@therigdr.com.', 503);
  }
  if (!rewardsOpen()) return fail('This thank-you has wrapped up. Thanks for the review all the same.', 410);

  let fd: FormData;
  try {
    fd = await req.formData();
  } catch {
    return fail('That upload was too big. Try a smaller screenshot.', 413);
  }

  if (String(fd.get('company') || '')) return NextResponse.json({ ok: true }); // honeypot

  const email = String(fd.get('email') || '').trim().toLowerCase();
  const firstNameInput = String(fd.get('firstName') || '').trim().slice(0, 60);
  const tier = Number(fd.get('tier'));
  const reviewText = String(fd.get('reviewText') || '').trim().slice(0, 3000);
  const honest = fd.get('honest') === 'on';
  const disclosed = fd.get('disclosed') === 'on';
  const shareOk = fd.get('shareOk') === 'on';
  const shot = fd.get('screenshot');

  if (!EMAIL_RE.test(email) || email.length > 200) return fail('Enter the email you ordered with.');
  if (!isTier(tier)) return fail('Pick which one you did: review, review + photo, or review + video.');
  if (!honest || !disclosed) return fail('Tick both boxes so we know the review is yours and mentions the gift card.');
  if (!(shot instanceof File) || shot.size === 0) return fail('Add a screenshot of your posted Google review.');
  if (!shot.type.startsWith('image/')) return fail('The screenshot needs to be an image (JPG or PNG).');
  if (shot.size > MAX_BYTES) return fail('That screenshot is too big. Try a smaller one (under 4 MB).');

  const customer = await findCustomerByEmail(email).catch((e) => {
    console.error('Rewards customer lookup failed:', e);
    return undefined;
  });
  if (customer === undefined) return fail('Something went wrong on our end. Try again in a minute.', 502);
  if (!customer || customer.numberOfOrders < 1 || !customer.email) {
    return fail("We couldn't find an order under that email. Use the email you checked out with, or email info@therigdr.com and we'll sort it out.", 404);
  }
  if (customer.tags.includes(TAG.claimed)) {
    return fail("Looks like you've already claimed yours. Thanks again for the review!", 409);
  }
  if (MAX_CLAIMS !== null) {
    const claimed = await countCustomers(`tag:"${TAG.claimed}"`);
    if (claimed >= MAX_CLAIMS) {
      return fail('This round of gift cards has all been claimed. Thanks for the review all the same!', 410);
    }
  }

  // Claim the slot first so a double-submit can't issue two cards.
  const claimTags = [TAG.claimed, TAG.tier(tier), ...(shareOk ? [TAG.shareOk] : [])];
  try {
    await tagsAdd(customer.id, claimTags);
  } catch (e) {
    console.error('Rewards tagging failed:', e);
    return fail('Something went wrong on our end. Try again in a minute.', 502);
  }

  const name = [customer.firstName || firstNameInput, customer.lastName].filter(Boolean).join(' ') || firstNameInput;
  const screenshot = {
    filename: `review-${numericId(customer.id)}.${shot.type.includes('png') ? 'png' : 'jpg'}`,
    content: Buffer.from(await shot.arrayBuffer()).toString('base64'),
  };

  let reward: IssuedReward | null = null;
  let issueError = '';
  try {
    reward = await issueReward(customer, tier);
  } catch (e) {
    issueError = (e as Error).message;
    console.error('Rewards issue failed:', e);
    await tagsRemove(customer.id, claimTags).catch(() => {});
  }

  let delivered = false;
  if (reward) {
    try {
      const m = rewardEmail(customer.firstName || firstNameInput, reward);
      await sendEmail({
        from: FROM,
        to: [customer.email],
        reply_to: REPLY_TO,
        subject: m.subject,
        html: m.html,
        text: m.text,
        tags: [{ name: 'campaign', value: 'review_rewards_delivered' }],
      });
      delivered = true;
    } catch (e) {
      console.error('Rewards delivery email failed:', e);
    }
  }

  // Always tell Jacob, with the screenshot, whatever happened.
  try {
    const n = claimNotificationEmail({
      name,
      email: customer.email,
      tier,
      reward,
      customerAdminUrl: `${ADMIN_STORE_URL}/customers/${numericId(customer.id)}`,
      rewardAdminUrl: reward
        ? reward.type === 'gc'
          ? `${ADMIN_STORE_URL}/gift_cards/${numericId(reward.id)}`
          : `${ADMIN_STORE_URL}/discounts/${numericId(reward.id)}`
        : null,
      revokeUrl: reward ? revokeUrl(reward.type, reward.id, customer.id) : null,
      shareOk,
      reviewText,
      delivered,
      error: issueError,
    });
    await sendEmail({
      from: FROM,
      to: [NOTIFY_TO],
      reply_to: customer.email,
      subject: n.subject,
      html: n.html,
      attachments: [screenshot],
      tags: [{ name: 'campaign', value: 'review_rewards_notify' }],
    });
  } catch (e) {
    console.error('Rewards notification failed:', e);
  }

  if (!reward) {
    return fail("We got your screenshot but couldn't create the gift card automatically. We'll send it by hand within a day.", 502);
  }

  return NextResponse.json({
    ok: true,
    amount: tier,
    label: TIERS[tier].short,
    sentTo: maskEmail(customer.email),
    delivered,
  });
}
