import Link from 'next/link';
import ParallaxImage from '@/components/home/ParallaxImage';
import Reveal from '@/components/home/Reveal';
import { IconVideo, IconBlueprint, IconShip, IconSolder, IconLifetime, IconArrow } from '@/components/home/Icons';

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';
const TIMELAPSE = 'f12872e61445487b86f0ae5df85ba09b';

/* ──── Inline FAQ Schema ──── */
const processFAQs = [
  {
    q: 'How long does a custom pedalboard build take?',
    a: 'Most builds ship in 4 to 8 weeks. Timeline depends on complexity, parts sourcing, and our current queue. If you have a tour date or studio session, tell us during the consultation and we will prioritize accordingly.',
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
    a: 'Builds start from $1,999 USD. Final price depends on board size, pedal count, power requirements, MIDI complexity, and cable routing. You get a firm quote after the consultation. No surprises.',
  },
  {
    q: 'What kind of support do I get after the build?',
    a: 'Lifetime support. If something breaks, if you want to swap a pedal, add MIDI later, or just need tone advice, call us. We are here for the life of the board.',
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
    image: `${CDN}Tone_Consultation_Screen_1.png`,
    alt: 'A free consultation over video',
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
    image: `${CDN}Signal_Routing.png`,
    alt: 'Signal routing diagram for a Rig Doctor build',
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
    image: `${CDN}Ben_Before.jpg`,
    alt: 'Pedals as they arrive before a rebuild',
  },
  {
    number: '04',
    title: 'The Build',
    subtitle: 'Where the magic happens.',
    description:
      'Hand-soldered connections. Custom-cut cables. Fully isolated power. Engineered signal path. Every board is built by hand, one at a time, with the same attention to detail whether it is a 6-pedal home board or a 20-pedal touring rig.',
    details: [
      'Every connection hand-soldered with premium components',
      'Custom-cut cables, no off-the-shelf patch cables',
      'Isolated power design for zero noise bleed',
      'Full signal chain testing under load before sign-off',
    ],
    image: `${CDN}6_219d02cd-1fd7-44f4-ab74-f42783ae338f.png`,
    alt: 'Hand-soldering a connector at the bench',
  },
  {
    number: '05',
    title: 'Ship & Support',
    subtitle: 'Plug in and play. We are here forever.',
    description:
      'Your completed rig ships back fully insured, road-ready, and tested. Plug it in and go. And if anything ever comes up, a pedal swap, a question about your signal chain, something acting weird, call us. Lifetime support, no asterisk.',
    details: [
      'Fully insured shipping with tracking',
      'Board arrives road-tested and ready to plug in',
      'Lifetime support for pedal swaps, additions, and troubleshooting',
      'Detailed documentation of your build included',
    ],
    image: `${CDN}L1010577.jpg`,
    alt: 'A finished Rig Doctor pedalboard ready to ship',
  },
];

/* ──── Page ──── */
const stepIcons = [IconVideo, IconBlueprint, IconShip, IconSolder, IconLifetime];

export default function ProcessPage() {
  return (
    <>
      <ProcessFAQSchema />

      {/* ───────── HERO ───────── */}
      <section className="relative bg-black overflow-hidden">
        <div className="relative min-h-[calc(100svh-100px)] flex items-end">
          <video
            poster={`${CDN}preview_images/${TIMELAPSE}.thumbnail.0000000000.jpg`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          >
            <source src={`https://cdn.shopify.com/videos/c/vp/${TIMELAPSE}/${TIMELAPSE}.HD-720p-4.5Mbps-78086312.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-16 sm:pb-20 pt-28 w-full text-center">
            <p className="trd-eyebrow text-white/55 mb-6">Our process</p>
            <h1 className="trd-hero-headline text-white mb-6">
              How a pro rig <span className="trd-gradient-text">gets built.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-10">
              Five steps. No surprises. From a 30-minute call to a road-tested pedalboard at your door.
            </p>
            <div className="flex justify-center items-center gap-8 sm:gap-16 pt-8 border-t border-white/10 max-w-xl mx-auto">
              {[
                ['5', 'clear steps'],
                ['4-8 wk', 'typical build'],
                ['$0', 'to start'],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{n}</p>
                  <p className="text-[13px] text-white/50 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── STEPS ───────── */}
      {steps.map((step, idx) => {
        const Icon = stepIcons[idx];
        const dark = idx % 2 === 1;
        return (
          <section key={step.number} className={`${dark ? 'bg-black' : 'bg-white'} py-20 sm:py-28`}>
            <div className={`max-w-[1200px] mx-auto px-6 flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}>
              <Reveal className="w-full lg:w-[55%]">
                <ParallaxImage
                  src={step.image}
                  alt={step.alt}
                  strength={8}
                  className="rounded-[28px] aspect-[4/3] bg-[#111]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                >
                  <span className="absolute top-5 left-5 text-white/90 text-[12px] font-semibold tracking-[0.2em] bg-black/45 backdrop-blur-md rounded-full px-3.5 py-1.5">
                    STEP {step.number}
                  </span>
                </ParallaxImage>
              </Reveal>
              <Reveal className="w-full lg:w-[45%]" delay={120}>
                <div className="flex items-center gap-4 mb-6">
                  <span className={`trd-icon-ring w-12 h-12 ${dark ? 'text-white' : 'text-black'}`}>
                    <Icon size={24} />
                  </span>
                  <span className="text-5xl font-bold trd-gradient-text">{step.number}</span>
                </div>
                <h2 className={`font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(32px,4vw,52px)] mb-2 ${dark ? 'text-white' : 'text-black'}`}>
                  {step.title}
                </h2>
                <p className={`text-[15px] font-medium mb-6 ${dark ? 'text-white/45' : 'text-black/40'}`}>{step.subtitle}</p>
                <p className={`text-[17px] leading-relaxed mb-8 ${dark ? 'text-white/65' : 'text-black/60'}`}>{step.description}</p>
                <ul className="space-y-3.5">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--trd-spectral)' }} />
                      <span className={`text-[15px] ${dark ? 'text-white/75' : 'text-black/70'}`}>{d}</span>
                    </li>
                  ))}
                </ul>
                {idx === 0 && (
                  <Link href="/book" className="mt-10 trd-cta-gradient inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[15px]">
                    Book your free consultation <IconArrow />
                  </Link>
                )}
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ───────── TIMELINE ───────── */}
      <section className="bg-[#f5f5f7] py-24 sm:py-32">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal className="text-center mb-14">
            <p className="trd-eyebrow text-black/40 mb-5">Typical timeline</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
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
              <Reveal key={t.label} delay={i * 80} className="bg-white rounded-[24px] p-7 relative overflow-hidden border border-black/[0.04]">
                <div className="absolute top-0 inset-x-0 h-[3px]" style={{ background: 'var(--trd-spectral)' }} />
                <p className="text-[13px] text-black/45 font-medium mb-2">{t.label}</p>
                <p className="text-2xl font-bold tracking-tight text-black mb-1">{t.time}</p>
                <p className="text-[14px] text-black/50">{t.desc}</p>
              </Reveal>
            ))}
          </div>
          <p className="text-center text-[14px] text-black/45 mt-8">Rush builds available for tour dates and studio deadlines. Just let us know.</p>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="bg-white py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="trd-eyebrow text-black/40 mb-5">Questions about the process</p>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {processFAQs.map((f) => (
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
      <ParallaxImage src={`${CDN}2022-L1010577.jpg`} alt="Close-up of a finished Rig Doctor pedalboard" strength={10} className="bg-black min-h-[75svh] flex items-center">
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="trd-display text-white mb-8">
            Step one is <span className="trd-gradient-text">a conversation.</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl mb-12">30 minutes. Free. Tell us about your rig and we&apos;ll tell you exactly what we would do.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link href="/book" className="trd-cta-gradient inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-semibold text-[17px]">
              Book a free consultation <IconArrow />
            </Link>
            <Link href="/custom-builds" className="trd-cta-ghost-dark inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-[17px]">
              See what you get
            </Link>
          </div>
        </div>
      </ParallaxImage>
    </>
  );
}
