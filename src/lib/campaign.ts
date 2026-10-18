/**
 * "First in line for 2027" build campaign (Oct 21 to Nov 20, 2026).
 *
 * 2026 build spots are sold out. The first 10 builds of 2027 go on the bench in early January.
 * Have the build call and put down a deposit by Nov 20 and $300 comes off the build.
 * Deposit = 50% of the quote, fully refundable before Jan 1, 2027.
 * Pay in full instead and take another 10% off the full build, on top of the $300.
 * Builds are done one at a time, about 10 business days each once the pedals arrive.
 *
 * Everything on the site that mentions the offer reads from here. After the deadline the
 * offer copy turns itself off and the page reads "2027 is booking".
 */

export const CAMPAIGN = {
  path: '/2027',
  // Nov 20, 11:59pm Central (CST, UTC-6 after Nov 1).
  deadline: '2026-11-21T05:59:59Z',
  deadlineLabel: 'Nov 20',
  spots: 10,
  // Update as deposits land (Vince tells us). Shown as "N of 10 left" once above 0.
  spotsTaken: 0,
  discount: 300,
  payInFullPct: 10,
  depositPct: 50,
  refundBy: 'Jan 1',
  starts: 'early January',
  benchDays: 10,
  fromPrice: 1999,
} as const;

export function campaignOpen(now = Date.now()) {
  return now <= Date.parse(CAMPAIGN.deadline);
}

export function spotsLeft() {
  return Math.max(0, CAMPAIGN.spots - CAMPAIGN.spotsTaken);
}

/** The $1,999 example: deposit after the $300, and the paid-in-full price. */
export function exampleMath(price: number = CAMPAIGN.fromPrice) {
  const afterDiscount = price - CAMPAIGN.discount;
  const deposit = Math.round((afterDiscount * CAMPAIGN.depositPct) / 100 / 50) * 50;
  const paidInFull = Math.round(price - (price * CAMPAIGN.payInFullPct) / 100 - CAMPAIGN.discount);
  return { price, afterDiscount, deposit, paidInFull };
}

export const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
