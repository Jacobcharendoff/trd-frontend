import type { Metadata } from 'next';
import Link from 'next/link';
import BuildTimeline from '@/components/BuildTimeline';

export const metadata: Metadata = {
  title: 'Pricing | The Rig Doctor',
  description:
    'Transparent pricing for custom pedalboard builds, DIY kits, and tone tutoring sessions. Starting at $99.99. Houston, TX — shipping nationwide.',
  openGraph: {
    title: 'Pricing | The Rig Doctor',
    description:
      'Transparent pricing for custom pedalboard builds, DIY kits, and tone tutoring. Houston, TX — shipping nationwide.',
  },
};

const tiers = [
  {
    name: 'Tone Tutoring',
    price: '$99.99',
    period: '/ 60 min session',
    description:
      'One-on-one with a Rig Doctor builder. We dial in your signal chain, troubleshoot tone issues, and map out your ideal rig.',
    features: [
      '60-minute video session',
      'Signal chain analysis',
      'Personalized rig blueprint',
      'Pedal order recommendations',
      'Gain staging walkthrough',
      'Recording of your session',
    ],
    cta: 'Book a Session',
    href: '/tone-tutoring',
    highlight: false,
  },
  {
    name: 'DIY Kit',
    price: '$750',
    period: 'starting at',
    description:
      'Everything you need to build your own pedalboard the right way. Pro-grade components, custom layout, and expert guidance.',
    features: [
      'Hand-soldered Mogami patch cables',
      'Custom rig blueprint',
      '60-min Tone Tutoring session',
      'Pedalboard essentials kit',
      'Signal chain layout diagram',
      'Build support via text',
    ],
    cta: 'Get Your Kit',
    href: '/diy-kit',
    highlight: false,
  },
  {
    name: 'Custom Build',
    price: '$1,500',
    period: 'starting at',
    description:
      'We build your dream rig from scratch. Full design, premium components, hand-soldered connections, and a board that travels.',
    features: [
      'Free 30-min consultation',
      'Custom design + rig blueprint',
      'Hand-soldered Mogami cables',
      'Isolated power solution',
      'Full signal chain optimization',
      'Lifetime support + free repairs',
      'Ships nationwide',
    ],
    cta: 'Book a Consultation',
    href: '/book',
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 bg-[#0a0a0a] overflow-hidden">
        {/* Aurora glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(245,166,35,0.15), transparent), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(16,185,129,0.1), transparent)',
          }}
        />
        <div className="relative max-w-[1080px] mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            Transparent pricing.
          </h1>
          <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto">
            No hidden fees. No surprise invoices. Just great rigs at honest prices.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 sm:py-28 bg-[#f5f5f7]">
        <div className="max-w-[1080px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  tier.highlight
                    ? 'bg-[#1d1d1f] text-[#f5f5f7] ring-2 ring-[#F5A623]/40'
                    : 'bg-white border border-black/[0.06] text-[#1d1d1f]'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-[#F5A623] to-[#10B981] text-white text-[11px] font-semibold tracking-wider uppercase px-4 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3
                  className={`text-lg font-semibold mb-4 ${
                    tier.highlight ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
                  }`}
                >
                  {tier.name}
                </h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                  <span
                    className={`text-sm ml-1 ${
                      tier.highlight ? 'text-white/50' : 'text-[#1d1d1f]/50'
                    }`}
                  >
                    {tier.period}
                  </span>
                </div>

                <p
                  className={`text-sm leading-relaxed mb-8 ${
                    tier.highlight ? 'text-white/60' : 'text-[#1d1d1f]/60'
                  }`}
                >
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <svg
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          tier.highlight ? 'text-[#10B981]' : 'text-[#10B981]'
                        }`}
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                      </svg>
                      <span
                        className={
                          tier.highlight ? 'text-white/70' : 'text-[#1d1d1f]/70'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href}
                  className={`block text-center rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                    tier.highlight
                      ? 'bg-[#F5A623] text-[#1d1d1f] hover:bg-[#F5A623]/90'
                      : 'bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#1d1d1f]/40 mt-10 max-w-lg mx-auto">
            Final pricing depends on pedal count, routing complexity, and power requirements.
            Every build starts with a free consultation.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <BuildTimeline theme="dark" />

      {/* FAQ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-[680px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] tracking-tight text-center mb-14">
            Common questions
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">
                What determines the final price of a custom build?
              </h3>
              <p className="text-[15px] text-[#1d1d1f]/60 leading-relaxed">
                Pedal count, routing complexity, power requirements, and whether you need extras like MIDI integration or effects loops. We quote everything upfront after your consultation so there are no surprises.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">
                What&apos;s included in the DIY Kit?
              </h3>
              <p className="text-[15px] text-[#1d1d1f]/60 leading-relaxed">
                Hand-soldered Mogami patch cables, a custom rig blueprint designed for your specific pedals, a 60-minute Tone Tutoring session to walk through the build, and a pedalboard essentials kit with everything you need to get started.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">
                Can I upgrade from a DIY Kit to a Custom Build?
              </h3>
              <p className="text-[15px] text-[#1d1d1f]/60 leading-relaxed">
                Absolutely. If you start with a DIY Kit and decide you want us to take it from there, we will credit the kit price toward your custom build.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">
                Do you offer rush builds?
              </h3>
              <p className="text-[15px] text-[#1d1d1f]/60 leading-relaxed">
                Yes. If you have a tour date, recording session, or studio deadline, let us know and we will work with your timeline. Rush pricing varies by complexity.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">
                What does &ldquo;lifetime support&rdquo; actually mean?
              </h3>
              <p className="text-[15px] text-[#1d1d1f]/60 leading-relaxed">
                Every custom build comes with free repairs and adjustments for life. Swap a pedal, change your signal chain, need a patch cable replaced. We have got you covered, no charge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-[#0a0a0a] text-center">
        <div className="max-w-[680px] mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            Ready to build?
          </h2>
          <p className="text-base text-white/50 mb-8">
            Book a free 30-minute consultation and let&apos;s talk about your rig.
          </p>
          <Link
            href="/book"
            className="inline-block bg-[#F5A623] text-[#1d1d1f] font-medium text-sm rounded-full px-8 py-3.5 hover:bg-[#F5A623]/90 transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </main>
  );
}
