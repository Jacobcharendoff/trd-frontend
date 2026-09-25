import Link from 'next/link';
import Image from 'next/image';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import Reveal from '@/components/home/Reveal';
import ToneOptIn from '@/components/home/ToneOptIn';
import ParallaxImage from '@/components/home/ParallaxImage';
import {
  IconQuiet,
  IconBlueprint,
  IconRoadCase,
  IconVideo,
  IconCable,
  IconSolder,
  IconLifetime,
  IconShip,
  IconArrow,
} from '@/components/home/Icons';

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';
const BUY = '/api/checkout?handle=tone-tutoring-follow-up';
const VIDEO_ID = '5f0a62a68694406d95b83a837a56c2d0';

const sessions = [
  { Icon: IconQuiet, title: 'The noise hunt', body: "There's a hum or hiss you've been living with. We track down where it's coming from live on the call, cable by cable, and tell you exactly how to kill it." },
  { Icon: IconBlueprint, title: 'The chain order fix', body: 'Compressor before or after the drive? What goes in the loop? We map your whole signal chain and put it in the order that actually works for your amp.' },
  { Icon: IconRoadCase, title: 'Bedroom to stage', body: 'Sounds great at home, falls apart at rehearsal or at the gig. We figure out why and set you up for the room you actually play in.' },
  { Icon: IconVideo, title: 'The full rig walkthrough', body: "Every pedal, cable and setting. What's helping, what's fighting you, and a clear plan for what to change first." },
  { Icon: IconCable, title: 'Before you buy', body: "Eyeing a new pedal, a switcher or a full build? We'll tell you straight if you need it. Plenty of players leave without buying a thing." },
];

const included = [
  { title: '60 minutes, one on one', body: 'Just you, your rig and a builder on video. Full attention.' },
  { title: 'Signal chain audit', body: 'We map your whole chain and tell you if the order is working for you or fighting you.' },
  { title: 'Pedal placement plan', body: 'Where everything should sit on the board, and why it matters.' },
  { title: 'A tone roadmap', body: 'A line from where you are now to the sound in your head.' },
  { title: 'The recording', body: 'The whole call is recorded, so you can watch it back any time.' },
  { title: 'Written next steps', body: 'Notes with specific changes to make, in your inbox within 24 hours.' },
];

const faqs = [
  { q: "I'm kind of a beginner. Is this for me?", a: "Yeah. Whether you've got three pedals or thirty, we meet you where you are. The fundamentals of good tone are the same at every level." },
  { q: 'Do I need my gear set up?', a: "That's the whole point. Have your guitar, amp and pedals ready to go. If your setup isn't built yet, no problem. We can plan it out together." },
  { q: 'What platform do you use?', a: "Google Meet. We send you a link. Click and you're in." },
  { q: 'Can you help me pick new gear?', a: "It's one of our favorite things to do. We'll talk about what you're going for and your budget, and give you honest recommendations. Not whatever's trending this week." },
  { q: "How's this different from the free build consultation?", a: 'The free consultation is a 30-minute call for players thinking about a custom build. Tone Tutoring is a full hour of hands-on coaching where we dig into your rig and get the most out of what you already own.' },
  { q: 'Can I book more than one session?', a: 'Absolutely. A lot of players do a session, make the changes, play for a week, then come back. Book another whenever you are ready.' },
  { q: "What if I don't get anything out of it?", a: "Reach out and we'll make it right. If you didn't get value, that's on us." },
];

function BuyButton({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <a href={BUY} className={`trd-cta-gradient inline-flex items-center justify-center gap-2 rounded-full font-semibold ${className}`}>
      {children}
      <IconArrow />
    </a>
  );
}

export default function ToneTutoringPage() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative bg-black overflow-hidden">
        <div className="relative min-h-[calc(100svh-100px)] flex items-end">
          <video
            poster={`${CDN}preview_images/${VIDEO_ID}.thumbnail.0000000000.jpg`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-45"
          >
            <source src={`https://cdn.shopify.com/videos/c/vp/${VIDEO_ID}/${VIDEO_ID}.HD-720p-3.0Mbps-71202543.mp4`} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
          <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-16 sm:pb-20 pt-28 w-full text-center">
            <p className="trd-eyebrow text-white/55 mb-6">Tone Tutoring &middot; 60 min, one on one, on video</p>
            <h1 className="trd-hero-headline text-white mb-6">
              An hour on your rig.
              <br />
              <span className="trd-gradient-text">Your tone, sorted.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-10">
              Get on a video call with the guys who build rigs for touring artists. Bring your board and whatever&apos;s
              been bugging you. You leave knowing exactly what to change.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <BuyButton className="px-9 py-4 text-[17px]">Book a session &middot; $99</BuyButton>
              <a href="#twenty-off" className="trd-cta-ghost-dark inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-[17px]">
                Get 20% off your first
              </a>
            </div>
            <div className="mt-14 flex justify-center items-center gap-8 sm:gap-16 pt-8 border-t border-white/10 max-w-xl mx-auto">
              {[
                ['17+', 'years at the bench'],
                ['300+', 'rigs built'],
                ['50+', 'touring artists'],
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

      {/* ───────── WHAT PLAYERS BOOK IT FOR ───────── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14 sm:mb-16">
            <p className="trd-eyebrow text-black/40 mb-5">What players book it for</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Pick the one that <span className="trd-gradient-text">sounds like you.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sessions.map(({ Icon, title, body }, i) => (
              <Reveal key={title} delay={(i % 3) * 90}>
                <a href={BUY} className="group block h-full bg-[#f5f5f7] hover:bg-black rounded-[28px] p-8 sm:p-9 transition-colors duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <span className="trd-icon-ring w-12 h-12 text-black group-hover:text-white transition-colors duration-500">
                      <Icon size={24} />
                    </span>
                    <span className="text-black/30 group-hover:text-white/40 text-[13px] font-semibold tracking-[0.2em]">0{i + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-black group-hover:text-white mb-3 transition-colors duration-500">{title}</h3>
                  <p className="text-black/55 group-hover:text-white/65 text-[16px] leading-relaxed transition-colors duration-500">{body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-black group-hover:text-white transition-colors duration-500">
                    Book this session <IconArrow />
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={180}>
              <div className="relative h-full min-h-[320px] rounded-[28px] overflow-hidden bg-black">
                <Image src={`${CDN}Tone_Consultation_Screen_1.png`} alt="A Tone Tutoring session on video" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <p className="text-white text-xl font-bold tracking-tight mb-1">Not sure which?</p>
                  <p className="text-white/65 text-[15px] leading-relaxed">Book the hour and bring all of it. We&apos;ll start with whatever&apos;s bugging you most.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── WHAT'S INCLUDED ───────── */}
      <section className="bg-black py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <p className="trd-eyebrow text-white/45 mb-5">Every session, no exceptions</p>
              <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,4.5vw,56px)] mb-12">
                What you <span className="trd-gradient-text">walk away with.</span>
              </h2>
            </Reveal>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-9">
              {included.map(({ title, body }, i) => (
                <Reveal as="li" key={title} delay={i * 60}>
                  <div className="w-8 h-px mb-4" style={{ background: 'var(--trd-spectral)' }} />
                  <h3 className="text-white font-semibold text-[17px] mb-1.5">{title}</h3>
                  <p className="text-white/55 text-[15px] leading-relaxed">{body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal>
            <ParallaxImage
              src={`${CDN}RD_Pretty_Board_Pic.png`}
              alt="A finished pedalboard with switching and lit footswitches"
              strength={8}
              className="rounded-[28px] aspect-[4/3] lg:aspect-[4/4.4] bg-[#111]"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </Reveal>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14 sm:mb-16">
            <p className="trd-eyebrow text-black/40 mb-5">How it works</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Four steps. <span className="trd-gradient-text">Pretty simple.</span>
            </h2>
          </Reveal>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: IconShip, t: 'Book your time', d: 'Grab a slot. Takes 30 seconds.' },
              { Icon: IconBlueprint, t: 'Tell us about your rig', d: "A quick form on your gear, your style and what's bugging you, so we show up prepared." },
              { Icon: IconVideo, t: 'Get on the call', d: 'Plug in, play, and we dig into it together in real time.' },
              { Icon: IconLifetime, t: 'Keep the game plan', d: 'The recording and written notes land in your inbox within 24 hours.' },
            ].map(({ Icon, t, d }, i) => (
              <Reveal as="li" key={t} delay={i * 90} className="bg-[#f5f5f7] rounded-[28px] p-8">
                <div className="flex items-center justify-between mb-8">
                  <span className="trd-icon-ring w-12 h-12 text-black">
                    <Icon size={24} />
                  </span>
                  <span className="text-4xl font-bold trd-gradient-text">{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-black mb-2">{t}</h3>
                <p className="text-black/55 text-[15px] leading-relaxed">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── REVIEWS ───────── */}
      <section className="bg-[#f5f5f7] py-24 sm:py-32">
        <Reveal className="text-center max-w-3xl mx-auto px-6 mb-12">
          <p className="trd-eyebrow text-black/40 mb-5">From the players</p>
          <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(34px,4.5vw,56px)]">
            &ldquo;Talked me out of buying 3 pedals <span className="trd-gradient-text">I didn&apos;t need.&rdquo;</span>
          </h2>
        </Reveal>
        <ReviewsMarquee />
      </section>

      {/* ───────── PRICING + 20% OFF ───────── */}
      <section id="twenty-off" className="bg-white py-24 sm:py-32 scroll-mt-28">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Reveal className="bg-black rounded-[28px] p-9 sm:p-11 flex flex-col">
            <p className="trd-eyebrow text-white/45 mb-4">One session, everything included</p>
            <h2 className="text-white text-3xl font-bold tracking-tight mb-2">60-minute session</h2>
            <p className="text-white/55 mb-8">One hour, one rig, full attention.</p>
            <p className="text-6xl font-bold text-white tracking-tight mb-1">$99</p>
            <p className="text-white/45 text-sm mb-8">USD</p>
            <ul className="space-y-3 mb-10">
              {['60-minute 1-on-1 video session', 'Full signal chain audit', 'Session recording', 'Written next steps within 24 hours', 'Honest gear recommendations'].map((item) => (
                <li key={item} className="flex gap-3 items-start text-white/80 text-[15px]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: 'var(--trd-spectral)' }} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto">
              <BuyButton className="w-full px-8 py-4 text-[17px]">Book your session</BuyButton>
              <p className="text-white/40 text-[13px] text-center mt-4">Sessions run on Google Meet. Just bring your guitar and a camera.</p>
            </div>
          </Reveal>
          <Reveal delay={120} className="bg-[#f5f5f7] rounded-[28px] p-9 sm:p-11 flex flex-col">
            <span className="trd-icon-ring w-12 h-12 text-black mb-8">
              <IconSolder size={24} />
            </span>
            <p className="trd-eyebrow text-black/40 mb-4">First session?</p>
            <h2 className="text-black text-3xl sm:text-4xl font-bold tracking-tight leading-[1.05] mb-4">
              Take <span className="trd-gradient-text">20% off</span> your first hour.
            </h2>
            <p className="text-black/55 text-[16px] leading-relaxed mb-8">
              Drop your email and we&apos;ll send your code right away, plus a one-tap link that books the session with the discount already applied.
            </p>
            <div className="mt-auto">
              <ToneOptIn />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="bg-white pb-24 sm:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
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

      {/* ───────── CLOSE ───────── */}
      <ParallaxImage src={`${CDN}L1010577.jpg`} alt="A finished Rig Doctor pedalboard in warm light" strength={10} className="bg-black min-h-[75svh] flex items-center">
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="trd-display text-white mb-6">
            You&apos;re closer than <span className="trd-gradient-text">you think.</span>
          </h2>
          <p className="text-white/70 text-lg sm:text-xl mb-12">Let&apos;s go find your sound.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <BuyButton className="px-9 py-4 text-[17px]">Book a session &middot; $99</BuyButton>
            <Link href="/book" className="trd-cta-ghost-dark inline-flex items-center justify-center px-9 py-4 rounded-full font-semibold text-[17px]">
              Thinking about a full build?
            </Link>
          </div>
        </div>
      </ParallaxImage>
    </>
  );
}
