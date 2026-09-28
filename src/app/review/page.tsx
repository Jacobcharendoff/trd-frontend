import type { Metadata } from 'next';
import Link from 'next/link';
import ParallaxImage from '@/components/home/ParallaxImage';
import ReviewButton from './ReviewButton';

export const metadata: Metadata = {
  title: 'Leave a Review',
  description: 'Tell other players how your Rig Doctor build or Tone Tutoring session went.',
  robots: { index: false, follow: false },
};

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';

export default function ReviewPage() {
  return (
    <ParallaxImage
      src={`${CDN}2022-L1010577.jpg`}
      alt="Close-up of a finished Rig Doctor pedalboard"
      priority
      strength={8}
      className="bg-black min-h-[88svh] flex items-center"
    >
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-28 text-center">
        <p className="trd-eyebrow text-white/55 mb-6">Two minutes, big favor</p>
        <h1 className="text-white font-bold tracking-[-0.045em] leading-[1.02] text-[clamp(40px,6vw,72px)] mb-6">
          How did we <span className="trd-gradient-text">do?</span>
        </h1>
        <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-4">
          Most players find us through Google. A few honest lines about your build or your Tone Tutoring session
          helps the next guitarist decide if we&apos;re the right shop for them.
        </p>
        <p className="text-white/50 text-[15px] mb-12">
          Good, bad or somewhere in between. We read every one.
        </p>
        <ReviewButton />
        <p className="text-white/45 text-[14px] mt-10">
          Need a hand with your rig?{' '}
          <Link href="/contact" className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white">
            Get in touch
          </Link>{' '}
          anytime. Lifetime support means lifetime.
        </p>
      </div>
    </ParallaxImage>
  );
}
