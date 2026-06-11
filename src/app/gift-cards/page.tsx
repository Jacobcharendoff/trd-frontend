'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Section from '@/components/Section';
import { getProduct } from '@/lib/shopify';

/* ──── Constants ──── */
const GIFT_CARD_HANDLE = 'the-rig-dr-gift-card-25';

/* ──── Types ──── */
interface Denomination {
  variantId: string;
  amount: number;
  label: string;
  hint: string;
  imageUrl: string | null;
}

/* ──── Static fallback (mirrors Vince's Shopify product) ──── */
const fallbackDenominations: Denomination[] = [
  { variantId: '', amount: 25, label: '$25', hint: 'A little something toward their next upgrade', imageUrl: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Gift_Card_25.png?v=1781196422' },
  { variantId: '', amount: 100, label: '$100', hint: 'Covers one Tone Tutoring session', imageUrl: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Gift_Card_100.png?v=1781196431' },
  { variantId: '', amount: 250, label: '$250', hint: 'Session + accessories, or a dent in a build', imageUrl: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Gift_Card_250.png?v=1781196439' },
  { variantId: '', amount: 500, label: '$500', hint: 'Real money toward a custom build', imageUrl: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Gift_Card_500.png?v=1781196450' },
  { variantId: '', amount: 1000, label: '$1,000', hint: 'Half a custom pedalboard build', imageUrl: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Gift_Card_1000.png?v=1781196459' },
];

/* ──── Accordion ──── */
function AccordionItem({ title, content }: { title: string; content: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/[0.08] rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-6 flex justify-between items-center hover:bg-white/[0.02] transition-colors duration-200"
      >
        <h3 className="text-lg font-semibold text-[#f5f5f7] text-left">{title}</h3>
        <span
          className={`text-[#F5A623] text-2xl font-light transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="px-8 py-6 border-t border-white/[0.08] bg-white/[0.01]">
          <p className="text-[#f5f5f7]/80 leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  );
}

/* ──── Page ──── */
export default function GiftCardsPage() {
  const [denominations, setDenominations] = useState<Denomination[]>(fallbackDenominations);
  const [selectedIndex, setSelectedIndex] = useState(1); // Default to $100
  const [loaded, setLoaded] = useState(false);

  // Fetch gift card product from Shopify
  useEffect(() => {
    let cancelled = false;
    getProduct(GIFT_CARD_HANDLE)
      .then((product) => {
        if (cancelled || !product) return;

        // Build image map from product images → variant associations
        const imageMap = new Map<string, string>();
        // The Storefront API doesn't give us variant→image directly in this query,
        // so we fall back to matching by position or using the fallback images.

        const variants = product.variants.edges
          .filter((v) => v.node.availableForSale)
          .map((v, idx) => {
            const amount = parseFloat(v.node.price.amount);
            // Try to find matching image from product images by position
            const img = product.images.edges[idx]?.node.url || null;
            return {
              variantId: v.node.id,
              amount,
              label: formatLabel(amount),
              hint: getHint(amount),
              imageUrl: img,
            };
          })
          .sort((a, b) => a.amount - b.amount);

        if (variants.length > 0) {
          setDenominations(variants);
          const hundredIdx = variants.findIndex((v) => v.amount === 100);
          setSelectedIndex(hundredIdx >= 0 ? hundredIdx : Math.min(1, variants.length - 1));
        }
      })
      .catch(() => {
        // Shopify unavailable — fallback denominations already set
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selected = denominations[selectedIndex];

  // Build checkout URL
  const checkoutUrl = selected?.variantId
    ? `/api/checkout?handle=${GIFT_CARD_HANDLE}&variantId=${encodeURIComponent(selected.variantId)}`
    : `/api/checkout?handle=${GIFT_CARD_HANDLE}`;

  return (
    <>
      {/* ──── HERO ──── */}
      <div className="relative w-full bg-black overflow-hidden">
        <div className="relative trd-aurora min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none" />

          <div className="relative z-10 max-w-[1080px] mx-auto px-6 pt-32 pb-20 w-full">
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-block bg-white/[0.08] border border-[#0071E3]/40 rounded-full px-4 py-2">
                <p className="text-sm font-semibold text-[#0071E3]">Digital Gift Card</p>
              </div>
            </div>

            {/* Headline */}
            <div className="text-center">
              <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight text-[#f5f5f7] mb-6">
                Give the gift of{' '}
                <span className="trd-gradient-text">better tone.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#f5f5f7]/80 max-w-2xl mx-auto leading-relaxed mb-12">
                Know a guitarist who&apos;s been chasing a sound, thinking about getting their rig sorted, or could use an hour with a pro? This is the move.
              </p>

              {/* ──── Gift Card Image ──── */}
              {selected?.imageUrl && (
                <div className="max-w-md mx-auto mb-10 transition-all duration-300">
                  <Image
                    src={selected.imageUrl}
                    alt={`The Rig Doctor ${selected.label} Gift Card`}
                    width={700}
                    height={445}
                    className="w-full rounded-2xl shadow-2xl shadow-black/40"
                    priority
                  />
                </div>
              )}

              {/* ──── Denomination Picker ──── */}
              <div className="max-w-2xl mx-auto mb-10">
                <p className="text-sm text-[#f5f5f7]/50 uppercase tracking-wide font-medium mb-4">
                  Choose an amount
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {denominations.map((d, i) => (
                    <button
                      key={d.amount}
                      onClick={() => setSelectedIndex(i)}
                      className={`relative px-3 py-4 sm:px-4 sm:py-5 rounded-2xl text-center transition-all duration-200 ${
                        selectedIndex === i
                          ? 'bg-[#0071E3] text-white shadow-lg shadow-[#0071E3]/20 scale-[1.03]'
                          : 'bg-white/[0.06] border border-white/[0.08] text-[#f5f5f7] hover:bg-white/[0.1]'
                      }`}
                    >
                      <span className="text-xl sm:text-2xl font-bold block">{d.label}</span>
                      <span
                        className={`text-xs mt-1 block ${
                          selectedIndex === i ? 'text-white/80' : 'text-[#f5f5f7]/50'
                        }`}
                      >
                        USD
                      </span>
                    </button>
                  ))}
                </div>

                {/* Hint text */}
                <p className="text-sm text-[#f5f5f7]/60 mt-4 h-5 transition-all duration-200">
                  {selected?.hint}
                </p>
              </div>

              {/* CTA */}
              <a
                href={checkoutUrl}
                className="inline-flex items-center gap-2 text-white font-semibold px-10 py-4 rounded-full trd-cta-gradient trd-glow-pulse text-lg"
              >
                Buy {selected?.label} Gift Card
              </a>

              <p className="text-[#f5f5f7]/40 text-sm mt-4">
                Digital delivery. No expiration. No fees.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ──── USE CASES ──── */}
      <Section theme="dark" id="use-cases" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Three ways to use it.
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">
            Works across everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Use Case 1 */}
          <div className="trd-glass-dark p-8 hover:bg-white/[0.06] transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#0071E3]/10 flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#0071E3]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#f5f5f7] mb-3">Gift a Tone Tutoring Session</h3>
            <p className="text-[#f5f5f7]/70 leading-relaxed mb-4">
              A $100 card covers a full 60-minute session with a pro rig builder. Signal chain audit, gear recommendations, and a clear plan. The kind of gift that actually changes how someone plays.
            </p>
            <p className="text-sm text-[#0071E3] font-medium">$100 covers a full session</p>
          </div>

          {/* Use Case 2 */}
          <div className="trd-glass-dark p-8 hover:bg-white/[0.06] transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#BF5AF2]/10 flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#BF5AF2]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#f5f5f7] mb-3">Put It Toward a Custom Build</h3>
            <p className="text-[#f5f5f7]/70 leading-relaxed mb-4">
              Know someone who&apos;s been talking about getting a real pedalboard built? A gift card takes a chunk off the quote. Stack multiple cards if you want to go big. Builds start from $2,000.
            </p>
            <p className="text-sm text-[#BF5AF2] font-medium">Any amount helps toward a build</p>
          </div>

          {/* Use Case 3 */}
          <div className="trd-glass-dark p-8 hover:bg-white/[0.06] transition-colors duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#FF375F]/10 flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#FF375F]" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#f5f5f7] mb-3">Let Them Choose</h3>
            <p className="text-[#f5f5f7]/70 leading-relaxed mb-4">
              Maybe they need cables, a new board, or a session first and a build later. The card works site-wide, so they use it however they want. No restrictions.
            </p>
            <p className="text-sm text-[#FF375F] font-medium">Works on anything at therigdr.com</p>
          </div>
        </div>
      </Section>

      {/* ──── HOW IT WORKS ──── */}
      <Section theme="dark" id="how-it-works" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            How it works.
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">
            Three steps. Done in under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="trd-glass-dark p-8 flex flex-col">
            <div className="text-4xl font-bold text-[#0071E3] mb-4">1</div>
            <h3 className="text-xl font-semibold text-[#f5f5f7] mb-3">Pick an Amount</h3>
            <p className="text-[#f5f5f7]/60 leading-relaxed">
              Choose from $25 to $1,000. Not sure? $100 covers a full Tone Tutoring session, which is a great place to start.
            </p>
          </div>

          <div className="trd-glass-dark p-8 flex flex-col">
            <div className="text-4xl font-bold text-[#0071E3] mb-4">2</div>
            <h3 className="text-xl font-semibold text-[#f5f5f7] mb-3">We Send It</h3>
            <p className="text-[#f5f5f7]/60 leading-relaxed">
              Digital delivery straight to their inbox. Or send it to yourself if you want to hand it over in person. Either way, it shows up instantly.
            </p>
          </div>

          <div className="trd-glass-dark p-8 flex flex-col">
            <div className="text-4xl font-bold text-[#0071E3] mb-4">3</div>
            <h3 className="text-xl font-semibold text-[#f5f5f7] mb-3">They Redeem It</h3>
            <p className="text-[#f5f5f7]/60 leading-relaxed">
              They enter the code at checkout on anything at therigdr.com. Tone Tutoring, build deposits, accessories, whatever they need. No expiration.
            </p>
          </div>
        </div>
      </Section>

      {/* ──── PERFECT FOR ──── */}
      <Section theme="dark" id="perfect-for" reveal>
        <div className="border border-[#0071E3]/30 bg-[#0071E3]/[0.05] rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f5f7] mb-6">
            Perfect for the guitarist who already has{' '}
            <span className="trd-gradient-text">everything.</span>
          </h3>
          <p className="text-[#f5f5f7]/70 text-lg max-w-2xl mx-auto mb-8">
            They&apos;ve got the pedals. They&apos;ve got the amp. What they don&apos;t have is someone who can make it all work together. That&apos;s where we come in.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Birthdays', 'Holidays', 'Father\'s Day', 'Graduation', 'Just Because'].map((occasion) => (
              <span
                key={occasion}
                className="bg-white/[0.06] border border-white/[0.08] rounded-full px-4 py-2 text-sm text-[#f5f5f7]/80"
              >
                {occasion}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* ──── FAQ ──── */}
      <Section theme="dark" id="faq" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Questions?
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">We&apos;ve got answers.</p>
        </div>

        <div className="space-y-4 max-w-3xl">
          <AccordionItem
            title="How does the gift card get delivered?"
            content="It's digital. After purchase, a gift card code is sent via email. You can send it directly to the recipient or to yourself if you'd rather share it your own way."
          />
          <AccordionItem
            title="Does it expire?"
            content="No. The gift card never expires. They can use it whenever they're ready."
          />
          <AccordionItem
            title="Can it be used for a custom build?"
            content="Yes. Gift cards work as payment toward anything on the site, including custom pedalboard builds. If the build costs more than the card value, they just pay the difference at checkout."
          />
          <AccordionItem
            title="Can I stack multiple gift cards?"
            content="Yes. If you (or multiple people) buy separate gift cards, they can all be applied to a single order. Great for group gifts toward a custom build."
          />
          <AccordionItem
            title="What if I want a different amount?"
            content="We offer $25, $100, $250, $500, and $1,000. If you need a specific amount outside of those, reach out to us at info@therigdr.com and we'll work something out."
          />
          <AccordionItem
            title="Can I get a refund on a gift card?"
            content="Gift cards are non-refundable. But they never expire and work on everything, so whoever gets it will find a use for it."
          />
        </div>
      </Section>

      {/* ──── FINAL CTA ──── */}
      <Section theme="dark" id="final-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Better than another set of{' '}
            <span className="trd-gradient-text">strings.</span>
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto">
            Give them something they&apos;ll actually use.
          </p>
        </div>

        <div className="mt-12">
          <a
            href={checkoutUrl}
            className="inline-flex items-center gap-2 text-white font-semibold px-10 py-4 rounded-full trd-cta-gradient trd-glow-pulse text-lg"
          >
            Buy a Gift Card
          </a>
        </div>
      </Section>
    </>
  );
}

/* ──── Helpers ──── */
function formatLabel(amount: number): string {
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)},000`;
  return `$${amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2)}`;
}

function getHint(amount: number): string {
  if (amount <= 25) return 'A little something toward their next upgrade';
  if (amount <= 100) return 'Covers one Tone Tutoring session';
  if (amount <= 250) return 'Session + accessories, or a dent in a build';
  if (amount <= 500) return 'Real money toward a custom build';
  return 'Half a custom pedalboard build';
}