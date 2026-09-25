import type { Metadata } from 'next';
import Link from 'next/link';
import ParallaxImage from '@/components/home/ParallaxImage';
import Reveal from '@/components/home/Reveal';
import { IconVideo, IconSolder, IconArrow } from '@/components/home/Icons';

export const metadata: Metadata = {
  title: 'Custom Build Pricing',
  description:
    'Transparent pricing for custom pedalboard builds and tone tutoring sessions. Custom builds from $1,999. Houston, TX, shipping nationwide.',
  openGraph: {
    title: 'Custom Build Pricing | The Rig Doctor',
    description: 'Transparent pricing for custom pedalboard builds and tone tutoring. Houston, TX, shipping nationwide.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Custom Build Pricing | The Rig Doctor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Build Pricing | The Rig Doctor',
    description: 'Transparent pricing for custom pedalboard builds and tone tutoring. From $1,999 USD.',
    images: ['/og-image.png'],
  },
};

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';

const faqs = [
  {
    q: 'What determines the final price of a custom build?',
    a: 'Pedal count, routing complexity, power requirements, and whether you need extras like MIDI integration or effects loops. We quote everything upfront after your consultation so there are no surprises.',
  },
  {
    q: 'Do you offer rush builds?',
    a: 'Yes. If you have a tour date, recording session, or studio deadline, let us know and we will work with your timeline. Rush pricing varies by complexity.',
  },
  {
    q: 'What does lifetime support actually mean?',
    a: 'Every custom build comes with free repairs and adjustments for life. Swap a pedal, change your signal chain, need a patch cable replaced. We have got you covered, no charge.',
  },
];

function FAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const Dot = () => <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--trd-spectral)' }} />;

export default function PricingPage() {
  return (
    <>
      <FAQSchema />

      {/* ───────── HERO ───────── */}
      <ParallaxImage src={`${CDN}RD_Pretty_Board_Pic.png`} alt="A finished pedalboard with switching and lit footswitches" priority strength={10} className="bg-black min-h-[62svh] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-16 sm:pb-20 pt-32 text-center">
          <p className="trd-eyebrow text-white/60 mb-6">Transparent pricing</p>
          <h1 className="trd-hero-headline text-white mb-6">
            No hidden fees.
            <br />
            <span className="trd-gradient-text">Just honest pricing.</span>
          </h1>
          <p className="trd-subheadline max-w-2xl mx-auto">Every quote is custom because every rig is different. Here&apos;s where things start.</p>
        </div>
      </ParallaxImage>

      {/* ───────── TIERS ───────── */}
      <section id="pricing-tiers" className="bg-white py-24 sm:py-32">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <p className="trd-eyebrow text-black/40 mb-5">Choose your path</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Two ways to <span className="trd-gradient-text">better tone.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Reveal className="bg-[#f5f5f7] rounded-[28px] p-9 sm:p-11 flex flex-col">
              <span className="trd-icon-ring w-12 h-12 text-black mb-8">
                <IconVideo size={24} />
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-black mb-2">Tone Tutoring</h3>
              <p className="text-black/55 mb-8">One-on-one with a Rig Doctor builder. We dial in your signal chain and map out your ideal rig.</p>
              <p className="mb-8">
                <span className="text-5xl font-bold tracking-tight text-black">$99</span>
                <span className="text-black/45 ml-2">/ 60 min session</span>
              </p>
              <ul className="space-y-3 mb-10 flex-1">
                {['60-minute video session', 'Signal chain analysis', 'Personalized rig blueprint', 'Pedal order recommendations', 'Gain staging walkthrough', 'Recording of your session'].map((f) => (
                  <li key={f} className="flex gap-3 text-[15px] text-black/70">
                    <Dot />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/tone-tutoring" className="trd-cta-ink inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[15px]">
                Book a session
              </Link>
            </Reveal>
            <Reveal delay={120} className="relative bg-black rounded-[28px] p-9 sm:p-11 flex flex-col overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: 'var(--trd-spectral)' }} />
              <div className="flex items-center justify-between mb-8">
                <span className="trd-icon-ring w-12 h-12 text-white">
                  <IconSolder size={24} />
                </span>
                <span className="trd-cta-gradient text-[11px] font-semibold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full">Most popular</span>
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Custom Build</h3>
              <p className="text-white/55 mb-8">We build your rig from scratch. Full design, premium components, hand-soldered connections.</p>
              <p className="mb-8">
                <span className="text-5xl font-bold tracking-tight text-white">$1,999</span>
                <span className="text-white/45 ml-2">starting at</span>
              </p>
              <ul className="space-y-3 mb-10 flex-1">
                {['Free 30-min consultation', 'Custom design and rig blueprint', 'Hand-soldered Mogami cables', 'Isolated power solution', 'Full signal chain optimization', 'Lifetime support and free repairs', 'Ships nationwide'].map((f) => (
                  <li key={f} className="flex gap-3 text-[15px] text-white/75">
                    <Dot />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/book" className="trd-cta-gradient inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[15px]">
                Book a free consultation <IconArrow />
              </Link>
            </Reveal>
          </div>
          <p className="text-center text-[14px] text-black/45 mt-10 max-w-lg mx-auto">
            Final pricing depends on pedal count, routing complexity and power requirements. Every build starts with a free consultation.
          </p>
        </div>
      </section>

      {/* ───────── TIMELINE ───────── */}
      <section className="bg-black py-24 sm:py-32">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="trd-eyebrow text-white/45 mb-5">Typical timeline</p>
            <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              First call to <span className="trd-gradient-text">plugging in.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Consultation', time: 'Day 1', desc: '30 min call' },
              { label: 'Design', time: 'Week 1', desc: 'Diagram and quote' },
              { label: 'Build', time: 'Weeks 2 to 7', desc: 'Hands-on work' },
              { label: 'Delivery', time: 'Weeks 4 to 8', desc: 'At your door' },
            ].map((t, i) => (
              <Reveal key={t.label} delay={i * 80} className="bg-white/[0.04] border border-white/[0.08] rounded-[24px] p-7 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: 'var(--trd-spectral)' }} />
                <p className="text-[13px] text-white/45 font-medium mb-2">{t.label}</p>
                <p className="text-2xl font-bold tracking-tight text-white mb-1">{t.time}</p>
                <p className="text-[14px] text-white/50">{t.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="pricing-faq" className="bg-white py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="trd-eyebrow text-black/40 mb-5">Common questions about pricing</p>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {faqs.map((f) => (
                <details key={f.q} className="group">
                  <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <span className="text-black font-medium text-[17px]">{f.q}</span>
                    <span className="trd-icon-ring w-8 h-8 shrink-0 text-black transition-transform duration-300 group-open:rotate-45">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M7 1v12M1 7h12" />
                      </svg>
                    </span>
                  </summary>
                  <p className="text-black/55 text-[16px] leading-relaxed pb-6 pr-12">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── CLOSE ───────── */}
      <ParallaxImage src={`${CDN}2022-L1010577.jpg`} alt="Close-up of a finished Rig Doctor pedalboard" strength={10} className="bg-black min-h-[70svh] flex items-center">
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="trd-display text-white mb-8">
            Ready to <span className="trd-gradient-text">build?</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl mb-12">Book a free 30-minute consultation and let&apos;s talk about your rig.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href="/book" className="trd-cta-gradient inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-semibold text-[17px]">
              Book a consultation <IconArrow />
            </Link>
            <Link href="/tone-tutoring" className="trd-cta-ghost-dark inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-[17px]">
              Tone Tutoring &middot; $99
            </Link>
          </div>
        </div>
      </ParallaxImage>
    </>
  );
}
