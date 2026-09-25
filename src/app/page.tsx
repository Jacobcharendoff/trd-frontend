import Link from 'next/link';
import Image from 'next/image';
import HeroVideo from '@/components/HeroVideo';
import BeforeAfter from '@/components/BeforeAfter';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import CableZoom from '@/components/home/CableZoom';
import ParallaxImage from '@/components/home/ParallaxImage';
import Reveal from '@/components/home/Reveal';
import ToneOptIn from '@/components/home/ToneOptIn';
import {
  IconSolder,
  IconCable,
  IconPower,
  IconQuiet,
  IconRoadCase,
  IconLifetime,
  IconVideo,
  IconBlueprint,
  IconShip,
  IconArrow,
} from '@/components/home/Icons';

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';

const img = {
  stage: `${CDN}Stage-Ready.jpg`,
  room: `${CDN}L1010577.jpg`,
  roomAlt: `${CDN}2022-L1010577.jpg`,
  underside: `${CDN}AfterlightImage_2-212.jpg`,
  consult: `${CDN}Tone_Consultation_Screen_1.png`,
  design: `${CDN}Signal_Routing.png`,
  solder: `${CDN}6_219d02cd-1fd7-44f4-ab74-f42783ae338f.png`,
  bench: `${CDN}Pedal-Board-Building-Original-scaled.jpg`,
  mason: `${CDN}Mason_Avatar.png`,
  vince: `${CDN}Vince_Avatar.png`,
};

const artists = ['Andy Timmons', 'Oz Noy', 'Michael Landau', 'Kirk Fletcher', 'Josh Smith', 'Matt Schofield'];

const steps = [
  {
    n: '01',
    title: 'We talk.',
    body: 'A free call about what you play, where you play it and what is driving you nuts. Hum, tap-dancing, a board that fights you. We figure out what it actually needs.',
    image: img.consult,
    Icon: IconVideo,
  },
  {
    n: '02',
    title: 'We design it.',
    body: 'Before anyone picks up a soldering iron, we map it all out: wiring diagram, power layout, signal chain order and parts list. Nothing gets guessed at the bench.',
    image: img.design,
    Icon: IconBlueprint,
  },
  {
    n: '03',
    title: 'We build it by hand.',
    body: 'Hand-soldered connectors, every cable cut to length, isolated power, clean routing underneath. The same two guys do every board, start to finish.',
    image: img.solder,
    Icon: IconSolder,
  },
  {
    n: '04',
    title: 'We test it. Then it ships.',
    body: 'Full signal chain testing under load before it leaves the bench. Your rig ships back insured, road-tested and ready to plug in.',
    image: img.bench,
    Icon: IconShip,
  },
];

const features = [
  { Icon: IconSolder, title: 'Hand-soldered', body: 'Every connection done by hand. No solderless kits that loosen on the road.' },
  { Icon: IconCable, title: 'Cut to length', body: 'Each run measured for its exact spot. No slack coiled up under the board.' },
  { Icon: IconPower, title: 'Isolated power', body: 'Clean, separated supplies so digital gear stops bleeding hum into your drives.' },
  { Icon: IconQuiet, title: 'Dead quiet', body: 'Tested under load before it ships. One player thought something was unplugged. It was just quiet.' },
  { Icon: IconRoadCase, title: 'Road-ready', body: 'Built to take load-ins, sticky floors and 200-show years without flinching.' },
  { Icon: IconLifetime, title: 'We pick up the phone', body: 'Six months or six years later, you call and a builder answers.' },
];

const wall = [
  'Agustin_Q..jpg',
  'Hunter_W._1.jpg',
  'Javy_B.png',
  'AfterlightImage-4.jpg',
  'John_A._1.png',
  'Chris_G.png',
  'Saxon_W..jpg',
  'Shannon_G._2.png',
  'Jeremy_B.png',
  'AfterlightImage_2.jpg',
  'Kaden_C.png',
  'Josh_W.png',
];

const faqs = [
  {
    q: 'How much does a custom build cost?',
    a: 'Builds start at $1,999 USD and go up with complexity. MIDI switching and loop systems add to it. The consultation is free and you get a real number up front.',
  },
  {
    q: 'Why only 18 builds a year?',
    a: 'The same hands wire every board from start to finish. That is the only way we can stand behind the work. We are down to the last 2 spots this year.',
  },
  {
    q: 'How long does a build take?',
    a: 'Usually 4 to 8 weeks depending on the rig and parts. Tour date coming up? Tell us and we will work around it.',
  },
  {
    q: 'Do I ship my pedals to you?',
    a: 'Yes. We send you a label and show you how to pack everything so nothing gets damaged. Tone Tutoring is fully remote.',
  },
  {
    q: 'Do you build MIDI and switching rigs?',
    a: 'All the time. Loop switchers, MIDI preset routing, multi-amp setups. Some of our best work is on rigs where everything has to talk to everything else.',
  },
  {
    q: 'What is Tone Tutoring?',
    a: 'An hour on video going through your whole signal chain: amp settings, pedal order, that noise you cannot track down. $99 USD. A lot of players start here.',
  },
];

function PrimaryCTA({ children, href = '/book', className = '' }: { children: React.ReactNode; href?: string; className?: string }) {
  return (
    <Link href={href} className={`trd-cta-gradient inline-flex items-center justify-center gap-2 rounded-full font-semibold ${className}`}>
      {children}
      <IconArrow />
    </Link>
  );
}

export default function Home() {
  return (
    <>
      {/* ───────────── 1. HERO ───────────── */}
      <section className="relative bg-black">
        <div className="relative min-h-[calc(100svh-100px)] flex items-end justify-center overflow-hidden">
          <HeroVideo />
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-16 sm:pb-20 pt-28 w-full text-center">
            <p className="trd-eyebrow text-white/55 mb-6">Custom pedalboards &middot; 2 build spots left this year</p>
            <h1 className="trd-hero-headline text-white mb-6">
              You didn&apos;t spend thousands on gear
              <br />
              <span className="trd-gradient-text">to zip-tie it together.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-10">
              Hand-wired pedalboards built by working players. Over 300 of them in 17 years, for guys who tour night after
              night and guys who just want to hear what their rig can really do.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <PrimaryCTA className="px-9 py-4 text-[17px]">Book a free rig consultation</PrimaryCTA>
              <Link
                href="/tone-tutoring"
                className="trd-cta-ghost-dark inline-flex items-center justify-center gap-2 font-semibold px-9 py-4 rounded-full text-[17px]"
              >
                Tone Tutoring &middot; $99
              </Link>
            </div>
            <div className="mt-14 flex justify-center items-center gap-8 sm:gap-16 pt-8 border-t border-white/10 max-w-xl mx-auto">
              {[
                ['300+', 'boards built'],
                ['17', 'years at the bench'],
                ['2', 'spots left in 2026'],
              ].map(([n, l]) => (
                <div key={l} className="text-center">
                  <p className={`text-2xl sm:text-3xl font-bold ${n === '2' ? 'trd-gradient-text' : 'text-white'}`}>{n}</p>
                  <p className="text-[13px] text-white/50 mt-1">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 2. PROOF STRIP ───────────── */}
      <section className="bg-white border-b border-black/[0.06]">
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-5 md:gap-10">
          <p className="trd-eyebrow text-black/40 shrink-0">Mason has built rigs for</p>
          <ul className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2">
            {artists.map((a) => (
              <li key={a} className="text-black/80 text-[17px] font-semibold tracking-tight">
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── 3. TWO KINDS OF PLAYERS ───────────── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14 sm:mb-20">
            <p className="trd-eyebrow text-black/40 mb-5">Who we build for</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(38px,5.5vw,72px)]">
              Built for the stage it&apos;s going to live on. <span className="trd-gradient-text">Or the room.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Reveal>
              <ParallaxImage
                src={img.stage}
                alt="Guitarist on stage stomping a Rig Doctor pedalboard"
                className="rounded-[28px] aspect-[4/5] sm:aspect-[4/4.2] bg-black"
                sizes="(max-width: 1024px) 100vw, 50vw"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                  <p className="trd-eyebrow text-white/60 mb-3">For the road</p>
                  <h3 className="text-white text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-3">
                    Sticky floors. Spilled beer. Load-in every night.
                  </h3>
                  <p className="text-white/70 text-[16px] leading-relaxed max-w-md">
                    Boards that survive the dive bars and the 200-show years, because a dead pedal mid-set is not an option.
                  </p>
                </div>
              </ParallaxImage>
            </Reveal>
            <Reveal delay={120}>
              <ParallaxImage
                src={img.room}
                alt="A finished Rig Doctor pedalboard in warm studio light"
                className="rounded-[28px] aspect-[4/5] sm:aspect-[4/4.2] bg-black"
                sizes="(max-width: 1024px) 100vw, 50vw"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10">
                  <p className="trd-eyebrow text-white/60 mb-3">For the room</p>
                  <h3 className="text-white text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-3">
                    Plug in and hear the quiet.
                  </h3>
                  <p className="text-white/70 text-[16px] leading-relaxed max-w-md">
                    You bought a custom shop guitar and a great amp. We make sure the board in the middle stops getting in their way.
                  </p>
                </div>
              </ParallaxImage>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────── 4. CINEMATIC CABLE ZOOM ───────────── */}
      <section className="bg-black pt-28 sm:pt-36 pb-10 text-center px-6">
        <Reveal>
          <p className="trd-eyebrow text-white/45 mb-5">Flip it over</p>
          <h2 className="trd-display text-white">
            The part <span className="trd-gradient-text">nobody sees.</span>
          </h2>
          <p className="mt-6 text-white/60 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            The top of a board is the pedals you picked. The bottom is where you can tell who built it. Keep scrolling.
          </p>
        </Reveal>
      </section>
      <CableZoom />

      {/* ───────────── 5. BEFORE / AFTER CASE STUDIES ───────────── */}
      <section id="transformations" className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <p className="trd-eyebrow text-black/40 mb-5">Before and after</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Same pedals. Same player. <span className="trd-gradient-text">Drag the slider.</span>
            </h2>
          </Reveal>
          <BeforeAfter />
          <div className="text-center mt-16">
            <PrimaryCTA className="px-8 py-3.5 text-[15px]">Get your board rebuilt</PrimaryCTA>
          </div>
        </div>
      </section>

      {/* ───────────── 6. THE PROCESS ───────────── */}
      <section id="process" className="bg-[#f5f5f7] py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-16 sm:mb-20">
            <p className="trd-eyebrow text-black/40 mb-5">How a pro build works</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Four steps. <span className="trd-gradient-text">No mystery.</span>
            </h2>
            <p className="mt-5 text-black/55 text-lg sm:text-xl leading-relaxed">
              You know what is happening, what it costs and who is doing it at every stage.
            </p>
          </Reveal>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map(({ n, title, body, image, Icon }, i) => (
              <Reveal as="li" key={n} delay={(i % 2) * 120} className="bg-white rounded-[28px] overflow-hidden border border-black/[0.04]">
                <div className="trd-photo relative aspect-[16/10] bg-black">
                  <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  <span className="absolute top-5 left-5 text-white/90 text-[13px] font-semibold tracking-[0.2em] bg-black/45 backdrop-blur-md rounded-full px-3.5 py-1.5">
                    STEP {n}
                  </span>
                </div>
                <div className="p-8 sm:p-10 flex gap-5">
                  <span className="trd-icon-ring w-12 h-12 shrink-0 text-black">
                    <Icon size={24} />
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-black mb-2">{title}</h3>
                    <p className="text-black/55 text-[16px] leading-relaxed">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white rounded-[28px] px-8 sm:px-10 py-8 border border-black/[0.04]">
            <div>
              <p className="text-black text-xl font-semibold">
                Builds start at <span className="trd-gradient-text font-bold">$1,999 USD</span>
              </p>
              <p className="text-black/50 text-[15px] mt-1">Free consultation. A real quote before anything gets cut.</p>
            </div>
            <PrimaryCTA className="px-8 py-3.5 text-[15px] shrink-0">Start with a free call</PrimaryCTA>
          </div>
        </div>
      </section>

      {/* ───────────── 7. UNDER THE HOOD ───────────── */}
      <section className="bg-black py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <Reveal>
            <ParallaxImage
              src={img.underside}
              alt="Cable routing and power on a Rig Doctor pedalboard"
              strength={8}
              className="rounded-[28px] aspect-[4/3] lg:aspect-[4/4.4] bg-[#111]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="trd-eyebrow text-white/45 mb-5">What you&apos;re paying for</p>
              <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,4.5vw,56px)] mb-12">
                Uncompromising, <span className="trd-gradient-text">down to the solder.</span>
              </h2>
            </Reveal>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {features.map(({ Icon, title, body }, i) => (
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

      {/* ───────────── 8. THE BUILDERS ───────────── */}
      <section id="builders" className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14 sm:mb-20">
            <p className="trd-eyebrow text-black/40 mb-5">Who&apos;s building your rig</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Two working players. <span className="trd-gradient-text">Nobody else touches it.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                name: 'Mason Marangella',
                role: 'Founder, Vertex Effects',
                image: img.mason,
                body: '17+ years at the bench. Mason founded Vertex Effects and built the Vertex by Gator pedalboard series. He has built rigs for Andy Timmons, Oz Noy, Michael Landau, Kirk Fletcher, Josh Smith and Matt Schofield. Real builds that went on real tours.',
              },
              {
                name: 'Vince DiGioia',
                role: 'Engineer, producer, touring guitarist',
                image: img.vince,
                body: '15+ years building rigs and chasing down bad tone. Vince plays lead with 35 Drive and has toured with Roger Creager, Josh Abbott Band, Reckless Kelly and Pat Green. He knows what a board needs to survive a 200-show year because he has lived it.',
              },
            ].map((b, i) => (
              <Reveal key={b.name} delay={i * 120} className="group rounded-[28px] overflow-hidden bg-[#f5f5f7]">
                <div className="trd-photo relative aspect-square bg-black">
                  <Image src={b.image} alt={b.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-8">
                    <h3 className="text-white text-3xl font-bold tracking-tight">{b.name}</h3>
                    <p className="text-white/65 text-[15px] mt-1">{b.role}</p>
                  </div>
                </div>
                <p className="p-8 text-black/60 text-[16px] leading-relaxed">{b.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 9. THE BUILD WALL ───────────── */}
      <section id="gallery" className="bg-black py-24 sm:py-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-2">
            <div className="max-w-2xl">
              <p className="trd-eyebrow text-white/45 mb-5">300+ boards and counting</p>
              <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
                Every one of these <span className="trd-gradient-text">went out the door quiet.</span>
              </h2>
            </div>
            <Link href="/gallery" className="text-white/70 hover:text-white text-[15px] font-medium inline-flex items-center gap-2 shrink-0">
              See the full gallery <IconArrow />
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            {wall.map((f, i) => (
              <Reveal
                key={f}
                delay={(i % 4) * 60}
                className={`trd-photo relative rounded-2xl bg-[#111] ${i === 0 || i === 7 ? 'md:col-span-2 md:row-span-2 aspect-square' : 'aspect-square'}`}
              >
                <Image
                  src={`${CDN}${f}`}
                  alt="Custom pedalboard built by The Rig Doctor"
                  fill
                  sizes={i === 0 || i === 7 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                  className="object-cover"
                />
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-14">
            <PrimaryCTA className="px-8 py-3.5 text-[15px]">Put your board on this wall</PrimaryCTA>
          </div>
        </div>
      </section>

      {/* ───────────── 10. REVIEWS ───────────── */}
      <section id="customer-reviews" className="bg-white py-24 sm:py-32">
        <Reveal className="text-center max-w-3xl mx-auto px-6 mb-12">
          <p className="trd-eyebrow text-black/40 mb-5">From the players</p>
          <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
            &ldquo;I genuinely thought something <span className="trd-gradient-text">was unplugged.&rdquo;</span>
          </h2>
        </Reveal>
        <ReviewsMarquee />
      </section>

      {/* ───────────── 11. TONE TUTORING + OPT-IN ───────────── */}
      <section id="tone-tutoring" className="bg-[#f5f5f7] py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal className="relative aspect-[4/3] rounded-[28px] overflow-hidden bg-black order-2 lg:order-1">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              poster="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/preview_images/5f0a62a68694406d95b83a837a56c2d0.thumbnail.0000000000.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="A Tone Tutoring session"
            >
              <source
                src="https://cdn.shopify.com/videos/c/vp/5f0a62a68694406d95b83a837a56c2d0/5f0a62a68694406d95b83a837a56c2d0.HD-720p-3.0Mbps-71202543.mp4"
                type="video/mp4"
              />
            </video>
            <span className="absolute bottom-5 left-5 trd-eyebrow text-white/85 bg-black/45 backdrop-blur-md rounded-full px-3.5 py-1.5">Live on video &middot; 60 min</span>
          </Reveal>
          <Reveal className="order-1 lg:order-2">
            <p className="trd-eyebrow text-black/40 mb-5">Not ready for a build?</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,4.5vw,56px)] mb-5">
              Start with an hour on <span className="trd-gradient-text">your tone.</span>
            </h2>
            <p className="text-black/55 text-lg leading-relaxed mb-8">
              One video call going through your whole signal chain. Amp settings, pedal order, that hum that shows up when
              you kick on a drive. Most players leave knowing exactly what to change. Some find out they need a build.
            </p>
            <div className="flex flex-wrap items-center gap-5 mb-10">
              <Link href="/tone-tutoring" className="trd-cta-ink inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-[15px]">
                Book Tone Tutoring &middot; $99
              </Link>
              <span className="text-black/45 text-[15px]">USD per session</span>
            </div>
            <div className="border-t border-black/10 pt-8">
              <p className="text-black font-semibold mb-1">Want 20% off your first session?</p>
              <p className="text-black/50 text-[15px] mb-4">Drop your email. We will send the code and the occasional rig tip. That&apos;s it.</p>
              <ToneOptIn />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── 12. TALK TO US + FAQ ───────────── */}
      <section id="get-in-touch" className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Reveal>
            <p className="trd-eyebrow text-black/40 mb-5">Tell us about your rig</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,4.5vw,56px)] mb-5">
              What&apos;s going on with your board?
            </h2>
            <p className="text-black/55 text-lg leading-relaxed mb-10">
              Two spots left this year. Tell us what you play and what isn&apos;t working. A builder gets back to you within a day.
            </p>
            <div className="[&>div]:mx-0">
              <LeadCaptureForm />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="trd-eyebrow text-black/40 mb-5">Questions we get a lot</p>
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

      {/* ───────────── 13. CLOSE ───────────── */}
      <ParallaxImage src={img.roomAlt} alt="Close-up of a finished Rig Doctor pedalboard" strength={10} className="bg-black min-h-[88svh] flex items-center">
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-28 text-center">
          <p className="trd-eyebrow text-white/55 mb-6">2 build spots left in 2026</p>
          <h2 className="trd-display text-white mb-8">
            You already own the gear. <span className="trd-gradient-text">Let&apos;s hear it.</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Tell us what you play and what isn&apos;t working. We&apos;ll tell you exactly what we would do. The call is free.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <PrimaryCTA className="px-9 py-4 text-[17px]">Book a free rig consultation</PrimaryCTA>
            <Link href="/tone-tutoring" className="trd-cta-ghost-dark inline-flex items-center justify-center font-semibold px-9 py-4 rounded-full text-[17px]">
              Tone Tutoring &middot; $99
            </Link>
          </div>
        </div>
      </ParallaxImage>
    </>
  );
}
