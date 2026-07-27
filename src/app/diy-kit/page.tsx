import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import BuildTimeline from '@/components/BuildTimeline';

export const metadata: Metadata = {
  title: 'DIY Pedalboard Kit',
  description:
    'Build your own pedalboard the right way. Pro-grade Mogami cables, custom rig blueprint, 60-min Tone Tutoring session, and everything you need to get started. Starting at $749.',
  openGraph: {
    title: 'DIY Pedalboard Kit | The Rig Doctor',
    description:
      'Build your own pedalboard the right way. Pro-grade components + expert guidance. Starting at $749.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DIY Pedalboard Kit — The Rig Doctor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIY Pedalboard Kit | The Rig Doctor',
    description:
      'Build your own pedalboard the right way. Pro-grade components + expert guidance. Starting at $749.',
    images: ['/og-image.png'],
  },
};

export default function DiyKitPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative w-full overflow-hidden">
        <div className="relative flex items-end justify-center bg-black pt-36 pb-20 sm:pt-44 sm:pb-28">
          <div className="relative z-10 max-w-[1080px] mx-auto px-6 text-center">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-6">Starting at $749</p>
            <h1 className="trd-hero-headline text-[#f5f5f7] mb-6">
              Build it yourself.
              <br />
              <span className="trd-gradient-text">Build it right.</span>
            </h1>
            <p className="trd-subheadline max-w-xl mx-auto mb-12">
              Pro-grade components and expert guidance. You build it, we make sure you build it right.
            </p>
            <Link
              href="/book"
              className="trd-cta-gradient inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </div>

      {/* What's Included */}
      <Section theme="light" id="kit-contents" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">What You Get</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Everything in <span className="trd-gradient-text">the kit.</span>
          </h2>
          <p className="text-lg text-[#1d1d1f]/60 max-w-lg mx-auto">
            No hunting for parts. No guessing what you need. Open the box and start building.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {[
            {
              title: 'Hand-Soldered Mogami Patch Cables',
              description: 'Custom-length patch cables built with Mogami wire and soldered by hand. The same cables we use in our custom builds.',
              icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.556a4.5 4.5 0 00-6.364-6.364L4.5 8.188',
            },
            {
              title: 'Custom Rig Blueprint',
              description: 'A detailed layout diagram designed for your specific pedals. Optimized signal chain, power routing, and cable paths.',
              icon: 'M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z',
            },
            {
              title: '60-Minute Tone Tutoring Session',
              description: 'One-on-one with a Rig Doctor builder to walk through your build, dial in your signal chain, and answer every question.',
              icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
            },
            {
              title: 'Pedalboard Essentials Kit',
              description: 'All the mounting hardware and cable management supplies you need to build a clean, professional board.',
              icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#f5f5f7] rounded-2xl p-8 border border-black/[0.04] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#0071E3]/10 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[#0071E3]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
              <p className="text-sm text-[#1d1d1f]/60 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How It Works */}
      <Section theme="lightGray" id="how-it-works" reveal>
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">How It Works</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Three steps to a board <span className="trd-gradient-text">you built yourself.</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {[
            {
              step: '01',
              title: 'Tell us about your rig',
              desc: 'Book a free consultation. We will talk through your pedals, your playing style, and what you want your board to do.',
            },
            {
              step: '02',
              title: 'We design, you build',
              desc: 'We send your custom kit with a detailed rig blueprint. Your Tone Tutoring session walks you through every step of the build.',
            },
            {
              step: '03',
              title: 'Plug in and play',
              desc: 'A board you built yourself, designed by the same people who build rigs for touring artists. Questions after? We are always a text away.',
            },
          ].map((item) => (
            <div key={item.step} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white border border-black/[0.04] flex items-center justify-center">
                <span className="text-lg font-bold trd-gradient-text">{item.step}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">{item.title}</h3>
                <p className="text-[15px] text-[#1d1d1f]/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline */}
      <BuildTimeline theme="dark" />

      {/* Upgrade CTA */}
      <Section theme="light" id="upgrade" reveal>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Want Us to Build It Instead?</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Upgrade to a <span className="trd-gradient-text">Custom Build</span> anytime.
          </h2>
          <p className="text-lg text-[#1d1d1f]/60 mb-8">
            Start with the DIY Kit and decide later. We will credit the kit price toward your custom build if you want us to take it from there.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/custom-builds"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 transition-colors text-sm"
            >
              Explore Custom Builds
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full border-2 border-[#1d1d1f]/15 text-[#1d1d1f] hover:border-[#1d1d1f]/30 hover:bg-[#1d1d1f]/[0.03] transition-all text-sm"
            >
              Compare All Options
            </Link>
          </div>
        </div>
      </Section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.08)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.06)_0%,transparent_55%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            Ready to build your own?
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg mb-10 max-w-xl mx-auto">
            Book a free consultation and we will design your kit.
          </p>
          <Link
            href="/book"
            className="trd-cta-gradient inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
