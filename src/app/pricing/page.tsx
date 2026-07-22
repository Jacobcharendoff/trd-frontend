import type { Metadata } from 'next';
import Link from 'next/link';
import Section from '@/components/Section';
import BuildTimeline from '@/components/BuildTimeline';

export const metadata: Metadata = {
  title: 'Pricing | The Rig Doctor',
  description:
    'Transparent pricing for custom pedalboard builds, DIY kits, and tone tutoring sessions. Custom builds from $1,999. Houston, TX — shipping nationwide.',
  openGraph: {
    title: 'Pricing | The Rig Doctor',
    description:
      'Transparent pricing for custom pedalboard builds, DIY kits, and tone tutoring. Houston, TX — shipping nationwide.',
  },
};

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative w-full overflow-hidden">
        <div className="relative flex items-end justify-center bg-black trd-aurora-intense pt-36 pb-20 sm:pt-44 sm:pb-28">
          <div className="relative z-10 max-w-[1080px] mx-auto px-6 text-center">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-6">Transparent Pricing</p>
            <h1 className="trd-hero-headline text-[#f5f5f7] mb-6">
              No hidden fees.
              <br />
              <span className="trd-gradient-text">Just honest pricing.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto">
              Every quote is custom because every rig is different. Here is where things start.
            </p>
          </div>
        </div>
      </div>

      <div className="trd-divider-dark-to-light" />

      {/* Pricing Cards */}
      <Section theme="light" id="pricing-tiers" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Choose Your Path</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Three ways to <span className="trd-gradient-text">better tone.</span>
          </h2>
          <p className="text-lg text-[#1d1d1f]/60 max-w-2xl mx-auto">
            Expert advice, hands-on kit, or full custom build. Depends on where you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Tone Tutoring */}
          <div className="bg-[#f5f5f7] rounded-2xl p-8 flex flex-col hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">Tone Tutoring</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold tracking-tight text-[#1d1d1f]">$99</span>
              <span className="text-sm ml-1 text-[#1d1d1f]/50">/ 60 min session</span>
            </div>
            <p className="text-sm text-[#1d1d1f]/60 leading-relaxed mb-8">
              One-on-one with a Rig Doctor builder. We dial in your signal chain, troubleshoot tone issues, and map out your ideal rig.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {['60-minute video session', 'Signal chain analysis', 'Personalized rig blueprint', 'Pedal order recommendations', 'Gain staging walkthrough', 'Recording of your session'].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0071E3]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  <span className="text-[#1d1d1f]/70">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/tone-tutoring"
              className="block text-center rounded-full px-6 py-3.5 text-sm font-medium bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 transition-colors"
            >
              Book a Session
            </Link>
          </div>

          {/* DIY Kit */}
          <div className="bg-[#f5f5f7] rounded-2xl p-8 flex flex-col hover:-translate-y-1 transition-all duration-300">
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-4">DIY Kit</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold tracking-tight text-[#1d1d1f]">$749</span>
              <span className="text-sm ml-1 text-[#1d1d1f]/50">starting at</span>
            </div>
            <p className="text-sm text-[#1d1d1f]/60 leading-relaxed mb-8">
              Everything you need to build your own pedalboard the right way. Pro-grade components, custom layout, and expert guidance.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {['Hand-soldered Mogami patch cables', 'Custom rig blueprint', '60-min Tone Tutoring session', 'Pedalboard essentials kit', 'Signal chain layout diagram', 'Build support via text'].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0071E3]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  <span className="text-[#1d1d1f]/70">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/diy-kit"
              className="block text-center rounded-full px-6 py-3.5 text-sm font-medium bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 transition-colors"
            >
              Get Your Kit
            </Link>
          </div>

          {/* Custom Build — Featured */}
          <div className="relative bg-[#1d1d1f] rounded-2xl p-8 flex flex-col ring-2 ring-[#0071E3]/30 hover:-translate-y-1 transition-all duration-300 shadow-[0_0_40px_rgba(0,113,227,0.1)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#0071E3] to-[#BF5AF2] text-white text-[11px] font-semibold tracking-wider uppercase px-4 py-1 rounded-full">
                Most Popular
              </span>
            </div>
            <h3 className="text-lg font-semibold text-[#f5f5f7] mb-4">Custom Build</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold tracking-tight text-[#f5f5f7]">$1,999</span>
              <span className="text-sm ml-1 text-white/50">starting at</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-8">
              We build your dream rig from scratch. Full design, premium components, hand-soldered connections, and a board that travels.
            </p>
            <ul className="space-y-3 mb-8 flex-1">
              {['Free 30-min consultation', 'Custom design + rig blueprint', 'Hand-soldered Mogami cables', 'Isolated power solution', 'Full signal chain optimization', 'Lifetime support + free repairs', 'Ships nationwide'].map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#0071E3]" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                  </svg>
                  <span className="text-white/70">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/book"
              className="block text-center rounded-full px-6 py-3.5 text-sm font-medium bg-[#0071E3] text-white hover:bg-[#005BB5] transition-colors"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-[#1d1d1f]/40 mt-10 max-w-lg mx-auto">
          Final pricing depends on pedal count, routing complexity, and power requirements.
          Every build starts with a free consultation.
        </p>
      </Section>

      <div className="trd-divider-light-to-dark" />

      {/* Timeline */}
      <BuildTimeline theme="dark" />

      <div className="trd-divider-dark-to-light" />

      {/* FAQ */}
      <Section theme="lightGray" id="pricing-faq" reveal>
        <div className="text-center mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f]">
            Common questions about pricing.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#1d1d1f]/10">
          {[
            {
              q: 'What determines the final price of a custom build?',
              a: 'Pedal count, routing complexity, power requirements, and whether you need extras like MIDI integration or effects loops. We quote everything upfront after your consultation so there are no surprises.',
            },
            {
              q: "What's included in the DIY Kit?",
              a: 'Hand-soldered Mogami patch cables, a custom rig blueprint designed for your specific pedals, a 60-minute Tone Tutoring session to walk through the build, and a pedalboard essentials kit with everything you need to get started.',
            },
            {
              q: 'Can I upgrade from a DIY Kit to a Custom Build?',
              a: 'Absolutely. If you start with a DIY Kit and decide you want us to take it from there, we will credit the kit price toward your custom build.',
            },
            {
              q: 'Do you offer rush builds?',
              a: 'Yes. If you have a tour date, recording session, or studio deadline, let us know and we will work with your timeline. Rush pricing varies by complexity.',
            },
            {
              q: 'What does lifetime support actually mean?',
              a: 'Every custom build comes with free repairs and adjustments for life. Swap a pedal, change your signal chain, need a patch cable replaced. We have got you covered, no charge.',
            },
          ].map((item, idx) => (
            <details key={idx} className="group cursor-pointer">
              <summary className="flex items-center justify-between py-5 [&::-webkit-details-marker]:hidden list-none">
                <span className="font-medium text-[#1d1d1f] text-base sm:text-lg pr-4">{item.q}</span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#1d1d1f]/30 transition-transform duration-200 group-open:rotate-180"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-[#1d1d1f]/60 pb-5 leading-relaxed text-[15px]">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.08)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.06)_0%,transparent_55%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            Ready to build?
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg mb-10 max-w-xl mx-auto">
            Book a free 30-minute consultation and let&apos;s talk about your rig.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/book"
              className="trd-cta-gradient trd-glow-pulse inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
            >
              Book a Consultation
            </Link>
            <Link
              href="/tone-tutoring"
              className="inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg border-2 border-white/20 text-white hover:border-white/50 hover:bg-white/[0.06] transition-all duration-300"
            >
              Fix Your Tone — $99
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
