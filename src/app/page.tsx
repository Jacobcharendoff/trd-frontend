import Link from 'next/link';
import Section from '@/components/Section';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import BeforeAfter from '@/components/BeforeAfter';
import GallerySlider from '@/components/GallerySlider';
import CinemaSection from '@/components/CinemaSection';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import HeroVideo from '@/components/HeroVideo';

export default function Home() {
  return (
    <>
      {/* ──── 1. HERO — Immediately tell them what we do ──── */}
      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-screen flex items-end justify-center bg-black trd-aurora-intense">
          <HeroVideo />

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-24 pt-40 w-full text-center">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-6">Custom Pedalboard Builds &bull; Expert Tone Advice</p>
            <h1 className="trd-hero-headline text-[#f5f5f7] mb-6">
              We build pedalboards.
              <br />
              <span className="trd-gradient-text">We fix tone problems.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-12">
              Hand-wired rigs for guitarists who won&apos;t settle for noise, hum,
              or a board that holds them back. 500+ builds. 17 years at the bench.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
              <Link
                href="/book"
                className="trd-cta-gradient trd-glow-pulse inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
              >
                Book a Free Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/tone-tutoring"
                className="inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg border-2 border-white/20 text-white hover:border-white/50 hover:bg-white/[0.06] transition-all duration-300"
              >
                Fix Your Tone — $99
              </Link>
            </div>

            <div className="flex justify-center items-center gap-8 sm:gap-16 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">500+</p>
                <p className="text-sm text-[#f5f5f7]/50 mt-1">rigs built</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">17</p>
                <p className="text-sm text-[#f5f5f7]/50 mt-1">years at the bench</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold trd-gradient-text-warm">50+</p>
                <p className="text-sm text-[#f5f5f7]/50 mt-1">touring artists</p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* dark → light transition */}
      <div className="trd-divider-dark-to-light" />

      {/* ──── 2. THE PROBLEM — Speak to their pain ──── */}
      <Section theme="light" id="the-problem" reveal>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Sound Familiar?</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-6">
            Your rig has a problem.
          </h2>
          <p className="text-lg text-[#1d1d1f]/60 leading-relaxed mb-10">
            Noise you can&apos;t track down. Hum that gets worse every gig. Cables everywhere,
            no plan behind the signal chain, and a board you don&apos;t trust on stage.
            You know something&apos;s off — you just don&apos;t know where to start.
          </p>
          <p className="text-xl font-semibold text-[#1d1d1f] mb-8">
            That&apos;s exactly what we do.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/custom-builds"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 transition-colors text-sm"
            >
              See Our Custom Builds
            </Link>
            <Link
              href="/tone-tutoring"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full border-2 border-[#1d1d1f]/15 text-[#1d1d1f] hover:border-[#1d1d1f]/30 hover:bg-[#1d1d1f]/[0.03] transition-all text-sm"
            >
              Get Expert Tone Advice — $99
            </Link>
          </div>
        </div>
      </Section>

      {/* light → dark transition */}
      <div className="trd-divider-light-to-dark" />

      {/* ──── 3. SOCIAL PROOF — Who trusts us ──── */}
      <Section theme="dark" id="testimonials" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">Artists Who Trust Us</p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-2">
            We build for players who can&apos;t afford a bad night.
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            From Grammy-nominated producers to weekend warriors — if your tone matters, we&apos;re your people.
          </p>
        </div>
        <TestimonialCarousel theme="dark" />
      </Section>

      {/* dark → dark (seamless into cinema) */}

      {/* ──── 4. HOW WE BUILD — Show the process ──── */}
      <CinemaSection />

      {/* dark → light transition */}
      <div className="trd-divider-dark-to-light" />

      {/* ──── 5. WATCH IT HAPPEN — Video proof ──── */}
      <Section theme="light" id="video-build" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">See It For Yourself</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Bare enclosure to road-ready in 60 seconds.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Every cable soldered. Every connection verified. This is what a Rig Doctor build looks like.</p>
        </div>

        <div className="relative w-full rounded-3xl overflow-hidden bg-[#0a0a0a] aspect-video max-w-4xl mx-auto shadow-2xl">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="w-full h-full object-cover"
            poster="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png"
          >
            <source
              src="https://cdn.shopify.com/videos/c/vp/f12872e61445487b86f0ae5df85ba09b/f12872e61445487b86f0ae5df85ba09b.HD-1080p-7.2Mbps-78086312.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="text-center mt-12">
          <p className="text-[#1d1d1f]/50 text-base mb-6">Want this for your rig?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center font-semibold px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 transition-colors text-sm"
            >
              Book a Free Consultation
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center font-semibold px-8 py-3.5 rounded-full border-2 border-[#1d1d1f]/15 text-[#1d1d1f] hover:border-[#1d1d1f]/30 hover:bg-[#1d1d1f]/[0.03] transition-all text-sm"
            >
              See Our Full Process
            </Link>
          </div>
          <p className="mt-4">
            <Link href="/process" className="text-sm text-[#1d1d1f]/40 hover:text-[#1d1d1f]/70 transition-colors">
              How we build your rig — from consultation to your doorstep →
            </Link>
          </p>
        </div>
      </Section>

      {/* light → dark transition */}
      <div className="trd-divider-light-to-dark" />

      {/* ──── 6. GALLERY — Volume of proof ──── */}
      <Section theme="dark" id="gallery" reveal>
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">The Work</p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-2">
            500+ rigs built. <span className="trd-gradient-text">One at a time.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            Every board is different because every player is different. Here&apos;s a handful of recent builds.
          </p>
        </div>
        <GallerySlider />
        <div className="text-center mt-10">
          <Link
            href="/custom-builds"
            className="inline-flex items-center gap-2 text-[#0071E3] font-medium hover:underline transition-colors"
          >
            Explore our custom builds
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </Section>

      {/* dark → light transition */}
      <div className="trd-divider-dark-to-light" />

      {/* ──── 7. BEFORE/AFTER — The transformation ──── */}
      <Section theme="light" id="transformations" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Before &amp; After</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Same pedals. Completely different rig.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-2xl mx-auto">
            We don&apos;t change your gear — we organize it, optimize it, and wire it so it actually works the way it should.
          </p>
        </div>
        <BeforeAfter />
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/custom-builds"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 transition-colors text-sm"
            >
              See Our Custom Builds
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full border-2 border-[#1d1d1f]/15 text-[#1d1d1f] hover:border-[#1d1d1f]/30 hover:bg-[#1d1d1f]/[0.03] transition-all text-sm"
            >
              How We Build Your Rig
            </Link>
          </div>
        </div>
      </Section>

      {/* ──── MID-PAGE CTA — Decision point ──── */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_50%_80%,rgba(191,90,242,0.06)_0%,transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f5f7] tracking-tight mb-3">
            Two ways to get started.
          </h3>
          <p className="text-[#f5f5f7]/50 text-base mb-8 max-w-xl mx-auto">
            Need a full custom build? Book a free consultation.
            Just need expert advice on your current rig? Book a tone session.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/custom-builds"
              className="trd-cta-gradient trd-glow-pulse inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base whitespace-nowrap"
            >
              Explore Custom Builds
            </Link>
            <Link
              href="/tone-tutoring"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base whitespace-nowrap border-2 border-white/20 text-white hover:border-white/40 hover:bg-white/[0.06] transition-all duration-300"
            >
              Get Tone Help — $99
            </Link>
          </div>
        </div>
      </section>

      {/* dark CTA → dark tiers (seamless) */}

      {/* ──── 8. SERVICE TIERS — Compare the options ──── */}
      <Section theme="dark" id="service-tiers" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">Compare Your Options</p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-4">
            Three paths to <span className="trd-gradient-text">better tone.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            Do nothing, get expert advice, or hand it to us. Depends on where you are.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1 — Ride it out */}
          <div className="rounded-2xl p-8 bg-[#f5f5f7]/[0.06] border border-white/[0.06] flex flex-col hover:-translate-y-1 transition-all duration-500">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f5f5f7]/30 mb-2">Do Nothing</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7]/70 mb-2">Ride it out</h3>
            <p className="text-[#f5f5f7]/40 text-sm mb-6">
              Keep your current board as-is. No cost — but here&apos;s what you&apos;re living with.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7]/50 mb-1">$0</p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">but it costs you tone</p>

            <div className="space-y-4 flex-grow">
              {[
                'Signal gets worse at every connection',
                'Noise and hum you can\'t track down',
                'No plan behind the signal chain',
                'Nobody to call when something breaks',
                'Gets worse over time, not better',
                'A liability on stage',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5 flex-shrink-0">&#10005;</span>
                  <span className="text-[#f5f5f7]/40 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-[#f5f5f7]/25 text-sm italic mt-8">You know something&apos;s off.</p>
          </div>

          {/* Tier 2 — Tone Tutoring */}
          <div className="rounded-2xl p-8 bg-[#f5f5f7]/[0.06] border border-white/[0.08] flex flex-col hover:-translate-y-1 transition-all duration-500">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f5f5f7]/30 mb-2">Expert Advice</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">Tone Tutoring</h3>
            <p className="text-[#f5f5f7]/50 text-sm mb-6">
              A 60-minute 1-on-1 video session. We diagnose your tone issues and tell you exactly what to fix.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7] mb-1">$99 <span className="text-lg font-normal text-[#f5f5f7]/50">USD</span></p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">one session, real answers</p>

            <div className="space-y-4 flex-grow">
              {[
                'Signal chain analysis',
                'Amp settings optimized',
                'Effects order corrected',
                'Noise, hum & buzz diagnosed',
                'Gear recommendations',
                '60-min 1-on-1 video call',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#0071E3] mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-[#f5f5f7]/70 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/tone-tutoring"
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full border-2 border-[#0071E3]/50 text-[#0071E3] hover:bg-[#0071E3] hover:text-white transition-all duration-300"
            >
              Book a Tone Session
            </Link>
          </div>

          {/* Tier 3 — Custom Build */}
          <div className="relative rounded-2xl p-8 bg-gradient-to-b from-[#0a1628] to-[#0f0a1f] border border-[#0071E3]/30 flex flex-col shadow-[0_0_40px_rgba(0,113,227,0.15)] hover:shadow-[0_0_60px_rgba(0,113,227,0.25)] hover:-translate-y-1 transition-all duration-500">
            <div className="absolute -top-3.5 right-6">
              <span className="bg-[#0071E3] text-white text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full">
                Most Popular
              </span>
            </div>

            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#0071E3] mb-2">Full Custom Build</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">We build it for you</h3>
            <p className="text-[#f5f5f7]/50 text-sm mb-6">
              Ship us your pedals. We design, wire, and build your dream rig from scratch.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7] mb-1">From $1,999 <span className="text-lg font-normal text-[#f5f5f7]/50">USD</span></p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">turnkey, guaranteed</p>

            <div className="space-y-4 flex-grow">
              {[
                'Fully isolated power design',
                'Hand-soldered, every connection',
                'Dead-quiet signal chain',
                'Road-tested before it ships',
                'Ongoing support included',
                'Engineered signal path',
                'Bulletproof on any stage',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#0071E3] mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-[#f5f5f7]/80 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/custom-builds"
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full bg-[#0071E3] hover:bg-[#005BB5] text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,113,227,0.40)]"
            >
              Explore Custom Builds
            </Link>
          </div>
        </div>
      </Section>

      {/* dark → light transition */}
      <div className="trd-divider-dark-to-light" />

      {/* ──── 9. REVIEWS — Volume of social proof ──── */}
      <Section theme="light" id="customer-reviews" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Real Reviews</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Hear it from guitarists who&apos;ve been through it.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">They had the same problems. Here&apos;s what happened after.</p>
        </div>
        <ReviewsMarquee />
      </Section>

      {/* ──── 10. FAQ — Remove objections ──── */}
      <Section theme="lightGray" id="faq" reveal>
        <div className="text-center mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f]">
            Common questions, straight answers.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#1d1d1f]/10">
          {[
            {
              q: "What does The Rig Doctor actually do?",
              a: "We're a custom pedalboard building company. We design, wire, and build pedalboards from scratch for guitarists. We also offer Tone Tutoring — a 60-minute video session where we help you diagnose and fix tone problems on your current rig.",
            },
            {
              q: "How much does a custom build cost?",
              a: "Every rig is different, so every quote is different. Builds start from $1,999 USD and scale with complexity. Your consultation is free — we'll walk through what you need and give you a straight answer.",
            },
            {
              q: "What is Tone Tutoring?",
              a: "A 60-minute 1-on-1 video call where we diagnose your tone issues — noise, hum, signal chain order, amp settings, effects placement, gear recommendations. You walk away with a clear plan. $99 USD.",
            },
            {
              q: "How long does a build take?",
              a: "Most builds ship in 4-8 weeks depending on complexity and parts sourcing. Touring emergency? We do rush builds. Just let us know.",
            },
            {
              q: "Do I need to ship my board to you?",
              a: "For a custom build, most clients ship their pedals to us. We're US-based and ship nationwide — we'll send a label and walk you through packing it. For Tone Tutoring, it's all remote via video call.",
            },
            {
              q: "What if something breaks after the build?",
              a: "We stand behind our work. If something goes wrong, reach out and we'll figure it out with you. We're not going to leave you hanging.",
            },
            {
              q: "Do you build MIDI switching systems?",
              a: "Absolutely. Full MIDI-controlled rigs with loop switchers, preset routing, the whole deal. That's where things get really fun.",
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

      {/* ──── 11. CLOSING CTA — Final push ──── */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_50%_80%,rgba(191,90,242,0.06)_0%,transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            Your tone is worth getting right.
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg mb-10 max-w-xl mx-auto">
            Whether you need a full custom build or 60 minutes of expert advice — let&apos;s fix your rig.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/custom-builds"
              className="trd-cta-gradient trd-glow-pulse inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
            >
              Explore Custom Builds
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
