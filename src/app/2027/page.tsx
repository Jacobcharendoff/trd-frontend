import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BeforeAfter from '@/components/BeforeAfter';
import BookingCalendar from '@/components/BookingCalendar';
import PickATimeLink from '@/components/PickATimeLink';
import CampaignCountdown from '@/components/CampaignCountdown';
import Reveal from '@/components/home/Reveal';
import { IconArrow, IconVideo, IconBlueprint, IconShip, IconSolder, IconRoadCase } from '@/components/home/Icons';
import { CAMPAIGN, campaignOpen, exampleMath, usd } from '@/lib/campaign';

/**
 * /2027: "First in line for 2027" campaign page. Every campaign email lands here.
 * Offer copy comes from lib/campaign.ts and turns itself off after the deadline
 * (the page re-renders hourly), so old email links keep working.
 */

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'First in Line for 2027: Custom Pedalboard Builds',
  description:
    '2026 is sold out. The first 10 custom pedalboard builds of 2027 go on the bench in early January, one board at a time. Book a free build call with Vince.',
  alternates: { canonical: '/2027' },
  openGraph: {
    title: 'First in Line for 2027 | The Rig Doctor',
    description: '2026 is sold out. The first 10 builds of 2027 start in early January. Book a free build call.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Custom pedalboard by The Rig Doctor' }],
  },
};

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';
const GOOGLE_REVIEWS = 'https://search.google.com/local/reviews?placeid=ChIJddijiYl--iURpCUX_oqZkOw';

/* Builds as they're described on the gallery page. */
const builds = [
  { file: 'Javy_B.png', name: 'Javy B.', tag: 'Touring', line: 'Full MIDI switching and isolated power, built to hold up through 200+ shows a year.' },
  { file: 'Jacob_S.png', name: 'Jacob S.', tag: 'Rebuild', line: 'Complete teardown and rebuild. New wiring, new power, same pedals, totally different tone.' },
  { file: 'MikeStipanovLayout1.png', name: 'Mike S.', tag: 'Studio to stage', line: 'Full signal chain rebuild with custom switching, built to go from the studio to the stage.' },
  { file: 'Saxon_W..jpg', name: 'Saxon W.', tag: 'Touring', line: 'Built for a working touring musician. Road-proof, flight-case ready, dead quiet.' },
];

/* Straight from our Google reviews. */
const reviews = [
  { who: 'Eric W.', note: 'Board built around real EVH pedals', quote: 'BLOWN AWAY. From the initial consultation to constant comms throughout the build process, this was a great experience.' },
  { who: 'Nelson R.', note: 'Series-wired board, built years ago', quote: 'Vince expertly helped me create a custom series-wired pedal board that still performs perfectly years later.' },
  { who: 'Derrick C.', note: 'Custom build', quote: "This is hands down the best investment I've made for my guitar setup!" },
];

function CTA({ placement, className = '', children }: { placement: string; className?: string; children: React.ReactNode }) {
  return (
    <PickATimeLink
      page="campaign_2027"
      placement={placement}
      className={`trd-cta-gradient inline-flex items-center justify-center gap-2 rounded-full font-semibold ${className}`}
    >
      {children}
      <IconArrow />
    </PickATimeLink>
  );
}

export default function Campaign2027Page() {
  const open = campaignOpen();
  const m = exampleMath();

  const steps = [
    { Icon: IconVideo, title: 'Free build call', body: '30 minutes on Google Meet. Show Vince your board and tell him what you want it to do.' },
    { Icon: IconBlueprint, title: 'Plan and quote', body: 'Signal chain, wiring, power and parts, with a straight quote. No surprises later.' },
    {
      Icon: IconSolder,
      title: open ? `Lock in by ${CAMPAIGN.deadlineLabel}` : 'Lock in your spot',
      body: `Half down holds your place in line, fully refundable until ${CAMPAIGN.refundBy}. Or pay in full and save another ${CAMPAIGN.payInFullPct}%.`,
    },
    { Icon: IconShip, title: 'Ship your pedals', body: 'We send a prepaid label. Pack them up and drop them off.' },
    {
      Icon: IconRoadCase,
      title: 'On the bench in January',
      body: `In the order you locked in. About ${CAMPAIGN.benchDays} business days later it ships back insured, with lifetime support.`,
    },
  ];

  const faqs = [
    {
      q: `What if I can't get a call in before ${CAMPAIGN.deadlineLabel}?`,
      a: 'Grab the earliest time on the calendar. If nothing works, email vince@therigdr.com and he will try to make room.',
    },
    {
      q: 'Is the deposit refundable?',
      a: `Yes. Cancel any time before ${CAMPAIGN.refundBy}, 2027 and you get all of it back.`,
    },
    {
      q: 'Does a rebuild of my current board count?',
      a: 'Yes. New boards and rebuilds both count. If you just want help dialing in your tone, that is Tone Tutoring.',
    },
    {
      q: 'When will my board be done?',
      a: `Builds start in ${CAMPAIGN.starts}, in the order deposits come in. We build one board at a time, about ${CAMPAIGN.benchDays} business days each once your pedals arrive.`,
    },
    {
      q: `How does the ${usd(CAMPAIGN.discount)} work?`,
      a: open
        ? `It comes off your quote when you put your deposit down by ${CAMPAIGN.deadlineLabel}. Pay in full instead and you also take ${CAMPAIGN.payInFullPct}% off the full build.`
        : `That offer ended ${CAMPAIGN.deadlineLabel}. Paying in full still saves you ${CAMPAIGN.payInFullPct}% off the full build.`,
    },
  ];

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative bg-black overflow-hidden">
        <Image src={`${CDN}L1010577.jpg`} alt="A finished Rig Doctor pedalboard" fill priority sizes="100vw" className="object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-32 pb-20 sm:pb-24 text-center">
          <p className="trd-eyebrow text-white/60 mb-6">2026 is sold out</p>
          <h1 className="trd-hero-headline text-white mb-6">
            Get in line <span className="trd-gradient-text">for 2027.</span>
          </h1>
          <p className="trd-subheadline max-w-2xl mx-auto mb-10">
            {open
              ? `The first ${CAMPAIGN.spots} builds of 2027 go on the bench in ${CAMPAIGN.starts}, one board at a time. Have your build call and lock in your spot by ${CAMPAIGN.deadlineLabel}, and ${usd(CAMPAIGN.discount)} comes off your build.`
              : `2027 builds are booking now and go on the bench one board at a time. Have your build call and lock in your place in line.`}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <CTA placement="hero" className="px-9 py-4 text-[17px]">Pick a time with Vince</CTA>
            <a href="#the-deal" className="trd-cta-ghost-dark inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-[17px]">
              See the deal
            </a>
          </div>
          {open && <CampaignCountdown className="mt-5 text-[14px] text-white/60" />}
          <div className="mt-12 flex justify-center items-center gap-8 sm:gap-16 pt-8 border-t border-white/10 max-w-xl mx-auto">
            {(open
              ? [
                  [String(CAMPAIGN.spots), 'spots for January'],
                  [usd(CAMPAIGN.discount), `off through ${CAMPAIGN.deadlineLabel}`],
                  [`${CAMPAIGN.benchDays} days`, 'at the bench, per board'],
                ]
              : [
                  ['300+', 'boards built'],
                  ['1', 'board at a time'],
                  [`${CAMPAIGN.benchDays} days`, 'at the bench, per board'],
                ]
            ).map(([n, l]) => (
              <div key={l}>
                <p className="text-2xl sm:text-3xl font-bold text-white">{n}</p>
                <p className="text-[13px] text-white/50 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── THE DEAL ───────── */}
      <section id="the-deal" className="bg-white py-24 sm:py-28 scroll-mt-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-12">
            <p className="trd-eyebrow text-black/40 mb-5">The deal</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,4.5vw,56px)]">
              {open ? (
                <>
                  Lock in by {CAMPAIGN.deadlineLabel}. <span className="trd-gradient-text">Save {usd(CAMPAIGN.discount)}.</span>
                </>
              ) : (
                <>
                  Half down <span className="trd-gradient-text">holds your spot.</span>
                </>
              )}
            </h2>
          </Reveal>
          <div className={`grid grid-cols-1 ${open ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
            {open && (
              <Reveal className="bg-[#f5f5f7] rounded-[24px] p-8 border border-black/[0.04]">
                <p className="text-4xl font-bold trd-gradient-text mb-3">{usd(CAMPAIGN.discount)} off</p>
                <p className="text-black/60 text-[16px] leading-relaxed">
                  Any new board or rebuild in the first {CAMPAIGN.spots} of 2027, when you have the call and put your deposit down by {CAMPAIGN.deadlineLabel}.
                </p>
              </Reveal>
            )}
            <Reveal delay={80} className="bg-[#f5f5f7] rounded-[24px] p-8 border border-black/[0.04]">
              <p className="text-4xl font-bold text-black mb-3">{CAMPAIGN.depositPct}% down</p>
              <p className="text-black/60 text-[16px] leading-relaxed">
                Holds your place in line. Fully refundable if you cancel before {CAMPAIGN.refundBy}, 2027.
              </p>
            </Reveal>
            <Reveal delay={160} className="bg-[#f5f5f7] rounded-[24px] p-8 border border-black/[0.04]">
              <p className="text-4xl font-bold text-black mb-3">{CAMPAIGN.payInFullPct}% more</p>
              <p className="text-black/60 text-[16px] leading-relaxed">
                Pay in full up front and take another {CAMPAIGN.payInFullPct}% off the full build{open ? `, on top of the ${usd(CAMPAIGN.discount)}` : ''}.
              </p>
            </Reveal>
          </div>
          {open && (
            <p className="mt-8 text-black/60 text-[16px]">
              On a {usd(m.price)} build, that&apos;s about <strong className="text-black">{usd(m.deposit)} down</strong>, or{' '}
              <strong className="text-black">{usd(m.paidInFull)} paid in full</strong>.
            </p>
          )}
        </div>
      </section>

      {/* ───────── BEFORE / AFTER ───────── */}
      <section className="bg-[#f5f5f7] py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14 sm:mb-16">
            <p className="trd-eyebrow text-black/40 mb-5">Before and after</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Same pedals. <span className="trd-gradient-text">Different board.</span>
            </h2>
            <p className="mt-5 text-black/55 text-lg">Drag the slider.</p>
          </Reveal>
          <BeforeAfter />
        </div>
      </section>

      {/* ───────── MINI CASE STUDIES ───────── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-12">
            <p className="trd-eyebrow text-black/40 mb-5">From the bench</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              A few boards <span className="trd-gradient-text">we&apos;ve built.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {builds.map((b, i) => (
              <Reveal key={b.name} delay={i * 70} className="bg-[#f5f5f7] rounded-[24px] overflow-hidden border border-black/[0.04] flex flex-col">
                <div className="relative aspect-[4/3] bg-black">
                  <Image src={`${CDN}${b.file}`} alt={`${b.name}'s custom pedalboard`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-black/40 mb-1">{b.tag}</p>
                  <h3 className="text-black font-bold text-lg mb-2">{b.name}</h3>
                  <p className="text-black/60 text-[15px] leading-relaxed">{b.line}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((r, i) => (
              <Reveal key={r.who} delay={i * 70} className="rounded-[24px] p-7 border border-black/[0.08] bg-white">
                <p className="text-[#F5A623] text-[15px] mb-3" aria-label="5 out of 5 stars">★★★★★</p>
                <p className="text-black text-[16px] leading-relaxed mb-4">&ldquo;{r.quote}&rdquo;</p>
                <p className="text-black font-semibold text-[14px]">{r.who}</p>
                <p className="text-black/45 text-[13px]">{r.note}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-[14px] text-black/50">
            From our{' '}
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="text-black/80 underline underline-offset-2">
              Google reviews
            </a>
            . More builds in the{' '}
            <Link href="/gallery" className="text-black/80 underline underline-offset-2">
              gallery
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ───────── ONE AT A TIME ───────── */}
      <section className="bg-black py-24 sm:py-32">
        <Reveal className="max-w-3xl mx-auto px-6 text-center">
          <p className="trd-eyebrow text-white/45 mb-5">Why only {CAMPAIGN.spots}</p>
          <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)] mb-6">
            One board <span className="trd-gradient-text">at a time.</span>
          </h2>
          <p className="text-white/65 text-lg sm:text-xl leading-relaxed">
            {`Every board gets the bench to itself, about ${CAMPAIGN.benchDays} business days from the day your pedals arrive. No assembly line, nobody else's board in the way. That's why January only has room for ${CAMPAIGN.spots}, and why being first in line means getting your board first.`}
          </p>
        </Reveal>
      </section>

      {/* ───────── HOW IT GOES ───────── */}
      <section className="bg-[#f5f5f7] py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14">
            <p className="trd-eyebrow text-black/40 mb-5">How it goes</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              From the call to <span className="trd-gradient-text">plugging in.</span>
            </h2>
          </Reveal>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map(({ Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="bg-white rounded-[24px] p-7 flex flex-col border border-black/[0.04]">
                <div className="flex items-center justify-between mb-7">
                  <span className="trd-icon-ring w-11 h-11 text-black">
                    <Icon size={22} />
                  </span>
                  <span className="text-3xl font-bold trd-gradient-text">{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-black mb-2">{title}</h3>
                <p className="text-black/55 text-[15px] leading-relaxed">{body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── CALENDAR ───────── */}
      <section id="pick-a-time" className="bg-white py-24 sm:py-32 scroll-mt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 px-2">
            <p className="trd-eyebrow text-black/40 mb-5">Free build call</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,4.5vw,56px)] mb-5">
              Pick a time <span className="trd-gradient-text">with Vince.</span>
            </h2>
            <p className="text-black/60 text-lg leading-relaxed max-w-xl mx-auto">
              30 minutes on Google Meet. Show him your board, tell him what you want it to do, and you get a plan and a straight quote.
              {open ? ` Lock in by ${CAMPAIGN.deadlineLabel} and ${usd(CAMPAIGN.discount)} comes off.` : ''}
            </p>
            {open && <CampaignCountdown className="mt-4 text-[14px] text-black/50" />}
          </div>
          <div className="bg-[#f5f5f7] rounded-[28px] p-2 sm:p-5 border border-black/[0.04]">
            <BookingCalendar source="campaign_2027" lazy />
          </div>
          <p className="text-center text-[14px] text-black/50 mt-5">
            For new boards and rebuilds. Just want your tone dialed in?{' '}
            <Link href="/tone-tutoring" className="text-black/80 underline underline-offset-2">
              That&apos;s Tone Tutoring
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="bg-white pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <p className="trd-eyebrow text-black/40 mb-5">Questions</p>
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
          <div className="text-center mt-14">
            <CTA placement="faq" className="px-9 py-4 text-[17px]">Pick a time with Vince</CTA>
          </div>
        </div>
      </section>
    </>
  );
}
