import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/Section';

/* ──── Inline FAQ Schema ──── */
const processFAQs = [
  {
    q: 'How long does a custom pedalboard build take?',
    a: 'Most builds ship in 4–8 weeks. Timeline depends on complexity, parts sourcing, and our current queue. If you have a tour date or studio session, tell us during the consultation and we will prioritize accordingly.',
  },
  {
    q: 'What happens during the free consultation?',
    a: 'A 30-minute Google Meet call where we talk through your current rig, your playing style, what frustrates you, and what you want the board to do. We walk away with enough information to design your build and give you a straight quote.',
  },
  {
    q: 'Do I need to ship my pedals to you?',
    a: 'Yes. We need your actual pedals to ensure proper fitment, power draw measurement, and cable routing. We send a prepaid shipping label and ship your completed rig back fully insured.',
  },
  {
    q: 'What if I want to change something after the build starts?',
    a: 'It happens. If you want to swap a pedal or adjust the layout, let us know as soon as possible. Minor changes are usually no problem. Major scope changes may affect the timeline and quote.',
  },
  {
    q: 'How much does a custom build cost?',
    a: 'Builds start from $1,999 USD. Final price depends on board size, pedal count, power requirements, MIDI complexity, and cable routing. You get a firm quote after the consultation — no surprises.',
  },
  {
    q: 'What kind of support do I get after the build?',
    a: 'Lifetime support. If something breaks, if you want to swap a pedal, add MIDI later, or just need tone advice — call us. We are here for the life of the board.',
  },
];

function ProcessFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: processFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ──── Step data ──── */
const steps = [
  {
    number: '01',
    title: 'Free Consultation',
    subtitle: '30 minutes. No obligation.',
    description:
      'We hop on a Google Meet call and talk through your rig. What pedals you are running, how you play, what is driving you nuts, and what you want the board to do. By the end of the call, we have a clear picture of the build.',
    details: [
      'Walk through your current signal chain',
      'Identify noise, power, and routing issues',
      'Discuss your playing context (touring, studio, worship, home)',
      'Define the scope and get a firm quote',
    ],
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D._2.jpg?v=1777143325',
    alt: 'Rig Doctor consultation - discussing pedalboard layout',
  },
  {
    number: '02',
    title: 'Design & Planning',
    subtitle: 'Your rig, on paper first.',
    description:
      'Before we pick up a soldering iron, we map everything out. Wiring diagram, power layout, signal chain order, component list. Every detail is documented so there are no surprises during the build.',
    details: [
      'Full wiring diagram with signal flow',
      'Power supply layout with isolated outputs',
      'Pedal placement optimized for cable routing',
      'Component sourcing (cables, jacks, power, mounting)',
    ],
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/William_O._1.png?v=1773867364',
    alt: 'Custom pedalboard design planning',
  },
  {
    number: '03',
    title: 'Ship Your Pedals',
    subtitle: 'Prepaid. Insured. Easy.',
    description:
      'We send you a prepaid shipping label. Pack your pedals, drop them off, and we handle the rest. On arrival, we photograph everything and confirm the build spec with you before we start.',
    details: [
      'Prepaid FedEx or UPS shipping label provided',
      'Every pedal photographed and inventoried on arrival',
      'Build spec confirmed with you before work starts',
      'Your gear is insured from pickup to delivery',
    ],
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Hunter_W._1.jpg?v=1774980806',
    alt: 'Pedals ready for custom pedalboard build',
  },
  {
    number: '04',
    title: 'The Build',
    subtitle: 'Where the magic happens.',
    description:
      'Hand-soldered connections. Custom-cut cables. Fully isolated power. Engineered signal path. Every board is built by hand, one at a time, with the same attention to detail whether it is a 6-pedal home board or a 20-pedal touring rig.',
    details: [
      'Every connection hand-soldered with premium components',
      'Custom-cut cables — no off-the-shelf patch cables',
      'Isolated power design for zero noise bleed',
      'Full signal chain testing under load before sign-off',
    ],
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Javy_B.png?v=1773867365',
    alt: 'Hand-soldering custom pedalboard connections',
  },
  {
    number: '05',
    title: 'Ship & Support',
    subtitle: 'Plug in and play. We are here forever.',
    description:
      'Your completed rig ships back fully insured, road-ready, and tested. Plug it in and go. And if anything ever comes up — a pedal swap, a question about your signal chain, something acting weird — call us. Lifetime support, no asterisk.',
    details: [
      'Fully insured shipping with tracking',
      'Board arrives road-tested and ready to plug in',
      'Lifetime support for pedal swaps, additions, and troubleshooting',
      'Detailed documentation of your build included',
    ],
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Josh_W.png?v=1773867364',
    alt: 'Completed custom pedalboard ready to ship',
  },
];

/* ──── Page ──── */
export default function ProcessPage() {
  return (
    <>
      <ProcessFAQSchema />

      {/* ── HERO ── */}
      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-[85vh] flex items-end justify-center bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source
              src="https://cdn.shopify.com/videos/c/vp/f12872e61445487b86f0ae5df85ba09b/f12872e61445487b86f0ae5df85ba09b.HD-1080p-7.2Mbps-78086312.mp4"
              type="video/mp4"
            />
          </video>

          <div className="relative z-10 max-w-[1000px] mx-auto px-6 pb-24 pt-40 w-full text-center">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-6">
              Our Process
            </p>
            <h1 className="trd-hero-headline text-[#f5f5f7] mb-6">
              How we build <span className="trd-gradient-text">your rig.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-12">
              Five steps. No surprises. From a 30-minute phone call to a road-tested pedalboard at your door.
            </p>

            <div className="flex justify-center items-center gap-8 sm:gap-16 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold trd-gradient-text">5</p>
                <p className="text-sm text-[#f5f5f7]/50 mt-1">clear steps</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">4–8 wk</p>
                <p className="text-sm text-[#f5f5f7]/50 mt-1">typical build</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">$0</p>
                <p className="text-sm text-[#f5f5f7]/50 mt-1">to start</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STEPS ── */}
      {steps.map((step, idx) => (
        <Section
          key={step.number}
          theme={idx % 2 === 0 ? 'light' : 'lightGray'}
          reveal
        >
          <div
            className={`flex flex-col ${
              idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
            } gap-10 lg:gap-16 items-center`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/[0.04]">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#f5f5f7] text-lg font-bold">
                  <span className="trd-gradient-text">{step.number}</span>
                </span>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f]">
                    {step.title}
                  </h2>
                  <p className="text-sm text-[#1d1d1f]/40 font-medium">{step.subtitle}</p>
                </div>
              </div>

              <p className="text-[#1d1d1f]/60 text-[16px] leading-relaxed mb-6">
                {step.description}
              </p>

              <ul className="space-y-3">
                {step.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#0071E3] flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-[15px] text-[#1d1d1f]/70">{detail}</span>
                  </li>
                ))}
              </ul>

              {idx === 0 && (
                <div className="mt-8">
                  <Link
                    href="/book"
                    className="inline-flex items-center gap-2 bg-[#1d1d1f] text-white font-semibold px-8 py-4 rounded-full hover:bg-[#333] transition-colors"
                  >
                    Book Your Free Consultation
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Section>
      ))}

      {/* ── TIMELINE SUMMARY ── */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%)]" />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
              Typical timeline
            </h2>
            <p className="text-lg text-[#f5f5f7]/50">
              From first call to plugging in.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Consultation', time: 'Day 1', desc: '30 min call' },
              { label: 'Design', time: 'Week 1', desc: 'Diagram + quote' },
              { label: 'Build', time: 'Weeks 2–7', desc: 'Hands-on work' },
              { label: 'Delivery', time: 'Week 4–8', desc: 'At your door' },
            ].map((item, idx) => (
              <div
                key={item.label}
                className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 text-center relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#0071E3] to-[#BF5AF2]" />
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#0071E3]/10 mb-3">
                  <span className="text-[#0071E3] text-sm font-bold">{idx + 1}</span>
                </div>
                <p className="text-sm text-[#f5f5f7]/40 font-medium mb-1">{item.label}</p>
                <p className="text-2xl font-bold trd-gradient-text mb-1">{item.time}</p>
                <p className="text-sm text-[#f5f5f7]/50">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-[#f5f5f7]/30 mt-8">
            Rush builds available for tour dates and studio deadlines. Just let us know.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <Section theme="lightGray" id="faq" reveal>
        <div className="text-center mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f]">
            Questions about the process.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#1d1d1f]/10">
          {processFAQs.map((item, idx) => (
            <details key={idx} className="group cursor-pointer">
              <summary className="flex items-center justify-between py-5 [&::-webkit-details-marker]:hidden list-none">
                <span className="font-medium text-[#1d1d1f] text-base sm:text-lg pr-4">
                  {item.q}
                </span>
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#1d1d1f]/30 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="text-[#1d1d1f]/60 pb-5 leading-relaxed text-[15px]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {/* ── CLOSING CTA ── */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_50%_80%,rgba(191,90,242,0.06)_0%,transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            Step one is a conversation.
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg mb-10 max-w-xl mx-auto">
            30 minutes. Free. No pressure. Tell us about your rig and we will tell you exactly what we would do.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/book"
              className="trd-cta-gradient inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
            >
              Book a Free Consultation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/custom-builds"
              className="inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg border-2 border-white/20 text-white hover:border-white/50 hover:bg-white/[0.06] transition-all duration-300"
            >
              See What You Get
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
