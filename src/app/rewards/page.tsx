import type { Metadata } from 'next';
import Link from 'next/link';
import ParallaxImage from '@/components/home/ParallaxImage';
import Reveal from '@/components/home/Reveal';
import ReviewButton from '../review/ReviewButton';
import RewardsClaimForm from './RewardsClaimForm';
import { ENDS_ON, ENDS_LABEL } from '@/lib/rewards';

export const metadata: Metadata = {
  title: 'Review Rewards',
  description: 'Leave an honest Google review and get up to $100 in Rig Doctor credit.',
  robots: { index: false, follow: false },
};

export const revalidate = 3600;

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';

const TIERS = [
  { amount: '$50', title: 'Written review', body: 'Tell other players how it went. A few honest lines is plenty.' },
  { amount: '$75', title: 'Review + photo', body: 'Add a photo of your rig to the review. Stage, studio, bedroom floor.' },
  { amount: '$100', title: 'Review + video', body: 'Add a short video of it in action. Doesn&apos;t need to be fancy.' },
];

function isOpen() {
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
  return today <= ENDS_ON;
}

export default function RewardsPage() {
  const open = isOpen();
  return (
    <>
      <ParallaxImage
        src={`${CDN}2022-L1010577.jpg`}
        alt="Close-up of a finished Rig Doctor pedalboard"
        priority
        strength={8}
        className="bg-black min-h-[70svh] flex items-end"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
        <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 pb-16 sm:pb-20 pt-32 text-center">
          <p className="trd-eyebrow text-white/60 mb-6">Review rewards</p>
          <h1 className="text-white font-bold tracking-[-0.045em] leading-[1.02] text-[clamp(40px,6.5vw,80px)] mb-6">
            Up to $100 for telling us
            <br />
            <span className="trd-gradient-text">how we did.</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Built your board, sorted your signal chain, or sent you the parts to bring your rig to life? Leave an honest
            Google review and we&apos;ll send you a Rig Doctor gift card.
          </p>
        </div>
      </ParallaxImage>

      {open ? (
        <>
          <section className="bg-white py-20 sm:py-28">
            <div className="max-w-[1100px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {TIERS.map((t, i) => (
                  <Reveal key={t.amount} delay={i * 80} className="bg-[#f5f5f7] rounded-[28px] p-8 sm:p-10">
                    <p className="text-5xl font-bold tracking-tight trd-gradient-text mb-4">{t.amount}</p>
                    <h2 className="text-xl font-bold tracking-tight text-black mb-2">{t.title}</h2>
                    <p className="text-black/55 text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: t.body }} />
                  </Reveal>
                ))}
              </div>
              <p className="text-center text-black/60 text-[16px] mt-10">
                <span className="text-black font-semibold">Five stars or two, you get the card.</span> We just want the truth.
              </p>
            </div>
          </section>

          <section className="bg-black py-20 sm:py-28">
            <div className="max-w-[1100px] mx-auto px-6">
              <Reveal className="text-center mb-14">
                <p className="trd-eyebrow text-white/45 mb-5">How it works</p>
                <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,5vw,60px)]">
                  Three steps. <span className="trd-gradient-text">Five minutes.</span>
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    n: '1',
                    t: 'Write your Google review',
                    b: 'Add your photo or video to it. Mention that we sent you a gift card as a thank-you, so the next player reading it knows.',
                  },
                  { n: '2', t: 'Screenshot it', b: 'Once it&apos;s posted, grab a screenshot that shows your review and your photo or video.' },
                  { n: '3', t: 'Send it below', b: 'Your gift card goes straight to the email on your order. Usually within minutes.' },
                ].map((s, i) => (
                  <Reveal key={s.n} delay={i * 80} className="bg-white/[0.04] border border-white/[0.08] rounded-[24px] p-8 relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: 'var(--trd-spectral)' }} />
                    <p className="text-[13px] text-white/45 font-semibold tracking-[0.15em] uppercase mb-3">Step {s.n}</p>
                    <h3 className="text-xl font-bold tracking-tight text-white mb-2">{s.t}</h3>
                    <p className="text-white/60 text-[15px] leading-relaxed" dangerouslySetInnerHTML={{ __html: s.b }} />
                  </Reveal>
                ))}
              </div>
              <div className="text-center mt-12">
                <ReviewButton />
              </div>
            </div>
          </section>

          <section id="claim" className="bg-[#f5f5f7] py-20 sm:py-28 scroll-mt-24">
            <div className="max-w-[1100px] mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="trd-eyebrow text-black/40 mb-5">Claim your gift card</p>
                <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,5vw,56px)]">
                  Posted it? <span className="trd-gradient-text">Send it over.</span>
                </h2>
              </div>
              <RewardsClaimForm />
              <p className="text-center text-[13px] text-black/45 mt-10 max-w-xl mx-auto leading-relaxed">
                One gift card per customer. Use the email you ordered with; the card goes to the email on your order. Any
                honest review counts, whatever you rate us. Runs through {ENDS_LABEL}, 2026. Gift cards work on anything at
                therigdr.com. Questions? <Link href="/contact" className="underline underline-offset-2">Get in touch</Link>.
              </p>
            </div>
          </section>
        </>
      ) : (
        <section className="bg-white py-24 sm:py-32">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.05] text-[clamp(32px,4.5vw,52px)] mb-6">
              This one&apos;s wrapped up.
            </h2>
            <p className="text-black/60 text-lg mb-10">
              Thanks to everyone who told us how we did. A Google review still helps the next player find us.
            </p>
            <ReviewButton />
          </div>
        </section>
      )}
    </>
  );
}
