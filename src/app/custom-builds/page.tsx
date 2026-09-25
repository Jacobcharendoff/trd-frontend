import Link from 'next/link';
import Image from 'next/image';
import CableZoom from '@/components/home/CableZoom';
import ParallaxImage from '@/components/home/ParallaxImage';
import Reveal from '@/components/home/Reveal';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import {
  IconPower,
  IconSolder,
  IconBlueprint,
  IconQuiet,
  IconLifetime,
  IconCable,
  IconVideo,
  IconShip,
  IconRoadCase,
  IconArrow,
} from '@/components/home/Icons';

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';
const TIMELAPSE = 'f12872e61445487b86f0ae5df85ba09b';

/* ---- FAQ (also rendered as FAQPage schema) ---- */
const customBuildsFAQs = [
  {
    q: 'How much does a custom pedalboard build cost?',
    a: 'Builds start from $1,999 USD and scale with complexity. Price depends on board size, number of pedals, power requirements, MIDI integration, and cable routing. Every build is quoted individually after your free consultation.',
  },
  {
    q: 'How long does a custom pedalboard build take?',
    a: 'Most builds ship in 4 to 8 weeks depending on complexity and parts sourcing. If you have a tour date or deadline, let us know. We do rush builds.',
  },
  {
    q: 'Do I need to ship my pedals to you?',
    a: 'Yes. We need your actual pedals to ensure proper fitment, cable routing, and power draw. We send a prepaid shipping label and ship your completed rig back fully insured.',
  },
  {
    q: 'What makes a Rig Doctor build different from DIY?',
    a: 'Every connection is hand-soldered with premium components. We use fully isolated power supplies, engineer the signal path for minimum noise, custom-cut every cable to length, and road-test every board before it ships. Plus lifetime support.',
  },
  {
    q: 'Can you build MIDI-controlled pedalboard systems?',
    a: 'Absolutely. MIDI integration is one of our specialties. We work with RJM, Boss ES-8, Morningstar, and other switching systems to give you preset-based control over your entire rig.',
  },
  {
    q: 'Do you offer ongoing support after the build?',
    a: 'Yes. Every build includes ongoing support. If something breaks, if you want to swap a pedal, or if you need advice down the road, we are a phone call away.',
  },
  {
    q: 'Where is The Rig Doctor located?',
    a: 'We are based in Houston, TX and ship nationwide across the United States. The consultation is remote via Google Meet, and your pedals ship to and from our shop.',
  },
  {
    q: 'What happens during the free consultation?',
    a: 'We talk through your rig, your playing style, what is bugging you, and what you want the board to do. Then we put together a build plan with a timeline and a straight quote. 30 minutes, no pressure, no obligation.',
  },
];

function CustomBuildsFAQSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: customBuildsFAQs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const artists = ['Andy Timmons', 'Oz Noy', 'Michael Landau', 'Kirk Fletcher', 'Josh Smith', 'Matt Schofield'];

const included = [
  { Icon: IconPower, title: 'Fully isolated power', body: "Clean, isolated power for every pedal. No shared grounds, no hum. Designed around your pedals' actual draw." },
  { Icon: IconSolder, title: 'Hand-soldered connections', body: 'Every joint hand-soldered with premium components and inspected. No daisy chains, no weak points.' },
  { Icon: IconBlueprint, title: 'Engineered signal path', body: 'Pedal order, buffer placement, loop routing and cable lengths planned before we build.' },
  { Icon: IconQuiet, title: 'Road-tested before it ships', body: 'Powered up, signal-tested and stress-tested at the shop, so problems never reach your stage.' },
  { Icon: IconCable, title: 'Clean cable management', body: 'Custom-cut cables, proper strain relief and routing that stays put on the road.' },
  { Icon: IconLifetime, title: 'Lifetime support', body: 'Swap a pedal, add MIDI later, something acting weird. Call us. We pick up.' },
];

const categories = [
  { title: 'Touring rigs', body: "Built to survive the road. Reinforced mounting, redundant power and cable management that holds up night after night. For players who can't afford a bad show.", image: 'Stage-Ready.jpg', alt: 'Guitarist on stage with a Rig Doctor touring board' },
  { title: 'Studio boards', body: 'Ultra-quiet signal chain, flexible routing for different sessions and instant recall. When the red light is on, your tone is ready.', image: 'RD_Pretty_Board_Pic.png', alt: 'Studio pedalboard with switching and lit footswitches' },
  { title: 'Worship rigs', body: 'Clean ambient tones, smooth gain staging and silent preset switching. Pad swells to driven leads without touching a knob.', image: 'Josh_W.png', alt: 'Custom worship pedalboard build' },
  { title: 'Home player boards', body: "You don't tour, but your tone still matters. Clean layout, proper power, no noise, and a board that makes you want to play more.", image: 'Hunter_W._1.jpg', alt: 'Custom home player pedalboard build' },
];

const steps = [
  { Icon: IconVideo, when: 'Day 1', title: 'Free consultation', body: "30-minute video call. Show us your rig and tell us what's driving you nuts. We map out a plan." },
  { Icon: IconBlueprint, when: 'Week 1', title: 'Design and planning', body: 'Wiring diagram, power layout, signal chain order and parts list. Every detail documented before we pick up a soldering iron.' },
  { Icon: IconShip, when: '', title: 'Ship your pedals', body: 'We send a prepaid label. On arrival we photograph everything and confirm the build spec.' },
  { Icon: IconSolder, when: 'Weeks 2 to 7', title: 'The build', body: 'Hand-soldered connections, custom-cut cables, isolated power, engineered signal path. Road-tested before it ships.' },
  { Icon: IconRoadCase, when: 'Weeks 4 to 8', title: 'Play and support', body: 'Your rig ships back fully insured and ready to plug in. Ongoing support included.' },
];

const wall = [
  'Agustin_Q..jpg',
  'Javy_B.png',
  'AfterlightImage-4.jpg',
  'William_O._1.png',
  'Chris_G.png',
  'Saxon_W..jpg',
  'AfterlightImage_2.jpg',
  'Vince_D.png',
];

function BookButton({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <Link href="/book" className={`trd-cta-gradient inline-flex items-center justify-center gap-2 rounded-full font-semibold ${className}`}>
      {children}
      <IconArrow />
    </Link>
  );
}

export default function CustomBuildsPage() {
  return (
    <>
      <CustomBuildsFAQSchema />

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
            <p className="trd-eyebrow text-white/55 mb-6">Custom pedalboard builds &middot; Houston, TX &middot; Ships nationwide</p>
            <h1 className="trd-hero-headline text-white mb-6">
              Hand-wired. Road-tested.
              <br />
              <span className="trd-gradient-text">Built for how you play.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-10">
              Custom pedalboards for players who need a rig that works every single night. 300+ builds, 17 years at the
              bench, every connection soldered by hand.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <BookButton className="px-9 py-4 text-[17px]">Book a free consultation</BookButton>
              <Link href="/gallery" className="trd-cta-ghost-dark inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-[17px]">
                See our work
              </Link>
            </div>
            <div className="mt-14 flex justify-center items-center gap-8 sm:gap-16 pt-8 border-t border-white/10 max-w-xl mx-auto">
              {[
                ['300+', 'rigs built'],
                ['17', 'years at the bench'],
                ['4-8 wk', 'typical turnaround'],
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

      {/* ───────── PROOF STRIP ───────── */}
      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-5 md:gap-10">
          <p className="trd-eyebrow text-black/40 shrink-0">Mason has built rigs for</p>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2">
            {artists.map((a) => (
              <li key={a} className="text-black/80 text-[17px] font-semibold tracking-tight">{a}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── BUILD CATEGORIES ───────── */}
      <section id="build-types" className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14 sm:mb-20">
            <p className="trd-eyebrow text-black/40 mb-5">Built around you</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              We build for how you <span className="trd-gradient-text">actually play.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={(i % 2) * 120}>
                <ParallaxImage src={`${CDN}${c.image}`} alt={c.alt} strength={8} className="rounded-[28px] aspect-[4/3.4] bg-black" sizes="(max-width: 768px) 100vw, 50vw">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                    <h3 className="text-white text-3xl font-bold tracking-tight mb-2">{c.title}</h3>
                    <p className="text-white/70 text-[16px] leading-relaxed max-w-md">{c.body}</p>
                  </div>
                </ParallaxImage>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CABLE ZOOM ───────── */}
      <section className="bg-black pt-28 sm:pt-36 pb-10 text-center px-6">
        <Reveal>
          <p className="trd-eyebrow text-white/45 mb-5">Flip it over</p>
          <h2 className="trd-display text-white">
            The part <span className="trd-gradient-text">nobody sees.</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            It&apos;s not a pedalboard with cables plugged in. It&apos;s an engineered system. Keep scrolling.
          </p>
        </Reveal>
      </section>
      <CableZoom />

      {/* ───────── WHAT'S INCLUDED ───────── */}
      <section id="whats-included" className="bg-black py-24 sm:py-32 border-t border-white/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <ParallaxImage
              src={`${CDN}AfterlightImage_2-212.jpg`}
              alt="Cable routing and power on a Rig Doctor pedalboard"
              strength={8}
              className="rounded-[28px] aspect-[4/3] lg:aspect-[4/4.4] bg-[#111]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="trd-eyebrow text-white/45 mb-5">Every build, every time</p>
              <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,4.5vw,56px)] mb-12">
                No shortcuts. <span className="trd-gradient-text">Down to the solder.</span>
              </h2>
            </Reveal>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {included.map(({ Icon, title, body }, i) => (
                <Reveal as="li" key={title} delay={i * 70}>
                  <span className="trd-icon-ring w-12 h-12 text-white mb-4">
                    <Icon size={24} />
                  </span>
                  <h3 className="text-white font-semibold text-[17px] mb-1.5">{title}</h3>
                  <p className="text-white/55 text-[15px] leading-relaxed">{body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────── PROCESS ───────── */}
      <section id="the-process" className="bg-[#f5f5f7] py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14 sm:mb-16">
            <p className="trd-eyebrow text-black/40 mb-5">How it works</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Five steps from call to <span className="trd-gradient-text">stage-ready.</span>
            </h2>
            <p className="mt-5 text-black/55 text-lg sm:text-xl leading-relaxed">You know exactly what&apos;s happening at every stage.</p>
          </Reveal>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map(({ Icon, when, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="bg-white rounded-[24px] p-7 flex flex-col border border-black/[0.04]">
                <div className="flex items-center justify-between mb-7">
                  <span className="trd-icon-ring w-11 h-11 text-black">
                    <Icon size={22} />
                  </span>
                  <span className="text-3xl font-bold trd-gradient-text">{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-black mb-2">{title}</h3>
                <p className="text-black/55 text-[15px] leading-relaxed">{body}</p>
                {when && <p className="mt-auto pt-5 text-[12px] font-semibold tracking-[0.18em] uppercase text-black/35">{when}</p>}
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── WALL ───────── */}
      <section id="recent-builds" className="bg-black py-24 sm:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2">
            <div className="max-w-2xl">
              <p className="trd-eyebrow text-white/45 mb-5">Recent builds</p>
              <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
                300+ rigs. <span className="trd-gradient-text">One at a time.</span>
              </h2>
            </div>
            <Link href="/gallery" className="text-white/70 hover:text-white text-[15px] font-medium inline-flex items-center gap-2 shrink-0">
              See the full gallery <IconArrow />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {wall.map((f, i) => (
              <Reveal key={f} delay={(i % 4) * 60} className="trd-photo relative aspect-square rounded-2xl bg-[#111]">
                <Image src={`${CDN}${f}`} alt="Custom pedalboard built by The Rig Doctor" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── REVIEWS ───────── */}
      <section className="bg-white py-24 sm:py-32">
        <Reveal className="text-center max-w-3xl mx-auto px-6 mb-12">
          <p className="trd-eyebrow text-black/40 mb-5">From the players</p>
          <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,4.5vw,56px)]">
            &ldquo;200+ shows a year. <span className="trd-gradient-text">Board hasn&apos;t let me down once.&rdquo;</span>
          </h2>
        </Reveal>
        <ReviewsMarquee />
      </section>

      {/* ───────── PRICING ───────── */}
      <section className="bg-black py-24 sm:py-32">
        <Reveal className="max-w-3xl mx-auto px-6 text-center">
          <p className="trd-eyebrow text-white/45 mb-5">Pricing</p>
          <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)] mb-6">
            Builds start from <span className="trd-gradient-text">$1,999 USD</span>
          </h2>
          <p className="text-white/60 text-lg mb-10">Every rig is different, so every quote is different. Price depends on:</p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['Board size', 'Pedal count', 'Power needs', 'MIDI complexity', 'Cable routing', 'Rush timeline'].map((f) => (
              <span key={f} className="text-[14px] text-white/80 border border-white/15 rounded-full px-4 py-2">{f}</span>
            ))}
          </div>
          <p className="text-white/45 text-[15px] mb-10">The consultation is free. You get a straight quote. No surprises, no hidden fees.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <BookButton className="px-9 py-4 text-[17px]">Get a free quote</BookButton>
            <Link href="/tone-tutoring" className="trd-cta-ghost-dark inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-[17px]">
              Just need advice? $99
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ───────── FAQ ───────── */}
      <section id="faq" className="bg-white py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="trd-eyebrow text-black/40 mb-5">Common questions about custom builds</p>
            <div className="divide-y divide-black/10 border-y border-black/10">
              {customBuildsFAQs.map((f) => (
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
          <p className="trd-eyebrow text-white/55 mb-6">2 build spots left in 2026</p>
          <h2 className="trd-display text-white mb-8">
            Your tone is worth <span className="trd-gradient-text">getting right.</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl mb-12">Stop fighting your rig. Let&apos;s build something that actually works.</p>
          <BookButton className="px-9 py-4 text-[17px]">Book a free consultation</BookButton>
        </div>
      </ParallaxImage>
    </>
  );
}
