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
      {/* ──── 1. HERO ──── */}
      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-screen flex items-end justify-center bg-black trd-aurora-intense">
          <HeroVideo />

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-24 pt-40 w-full text-center">
            <h1 className="trd-hero-headline text-[#f5f5f7] mb-8">
              We don&apos;t sell gear.
              <br />
              <span className="trd-gradient-text">We wire it right.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-12">
              Hand-wired pedalboards built around how you actually play.
              One at a time. Built to last.
            </p>
            <div className="flex justify-center gap-4 mb-20">
              <Link
                href="/book"
                className="trd-cta-gradient trd-glow-pulse inline-flex items-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
              >
                Start a Build
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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

      {/* ──── 2. ARTIST TESTIMONIALS ──── */}
      <Section theme="light" id="testimonials" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">On the Road</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Trusted by players who can&apos;t afford a bad night.
          </h2>
        </div>
        <TestimonialCarousel theme="light" />
      </Section>

      {/* light → dark transition */}
      <div className="trd-divider-light-to-dark" />

      {/* ──── 3. HOW WE BUILD (Cinema / Parallax) ──── */}
      <CinemaSection />

      {/* dark → light transition */}
      <div className="trd-divider-dark-to-light" />

      {/* ──── 4. WATCH THE BUILD ──── */}
      <Section theme="light" id="video-build" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Watch the Build</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Bare enclosure to road-ready.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">The whole thing in under a minute.</p>
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
      </Section>

      {/* light → dark transition */}
      <div className="trd-divider-light-to-dark" />

      {/* ──── 5. GALLERY ──── */}
      <Section theme="dark" id="gallery" reveal>
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">The Gallery</p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-2">
            500+ rigs. <span className="trd-gradient-text">Here&apos;s a few.</span>
          </h2>
        </div>
        <GallerySlider />
      </Section>

      {/* dark → light transition */}
      <div className="trd-divider-dark-to-light" />

      {/* ──── 6. BEFORE/AFTER ──── */}
      <Section theme="light" id="transformations" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Transformations</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Same pedals. Completely different rig.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">What changes when we get our hands on it.</p>
        </div>
        <BeforeAfter />
      </Section>

      {/* ──── MID-PAGE CTA ──── */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-16 sm:py-20">
        {/* Tie-dye aurora glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_50%_80%,rgba(255,55,95,0.06)_0%,transparent_50%)]" />
        <div className="relative max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#f5f5f7] tracking-tight">
              Looking for a Rig Renovation?
            </h3>
            <p className="text-[#f5f5f7]/50 text-base mt-3">
              Tell us what you&apos;re working with. We&apos;ll tell you what it needs.
            </p>
          </div>
          <Link
            href="/book"
            className="trd-cta-gradient trd-glow-pulse inline-flex items-center px-8 py-4 rounded-full font-semibold text-base whitespace-nowrap"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>

      {/* dark CTA → dark tiers (seamless) */}

      {/* ──── 7. SERVICE TIERS ──── */}
      <Section theme="dark" id="service-tiers" reveal>
        <div className="text-center mb-16">
          <h2 className="trd-section-headline text-[#f5f5f7] mb-4">
            Three ways to <span className="trd-gradient-text">get your tone right.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            Depends on how hands-on you want to be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1 */}
          <div className="rounded-2xl p-8 bg-[#f5f5f7]/[0.06] border border-white/[0.06] flex flex-col hover:-translate-y-1 transition-all duration-500">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f5f5f7]/30 mb-2">Current Setup</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7]/70 mb-2">Ride it out</h3>
            <p className="text-[#f5f5f7]/40 text-sm mb-6">
              Keep your current board as-is. No cost, but here&apos;s what you&apos;re living with.
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

            <Link
              href="/book"
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full border-2 border-[#f5f5f7]/20 text-[#f5f5f7]/60 hover:border-[#f5f5f7]/40 hover:text-[#f5f5f7] transition-all duration-300"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Tier 2 */}
          <div className="rounded-2xl p-8 bg-[#f5f5f7]/[0.06] border border-white/[0.08] flex flex-col hover:-translate-y-1 transition-all duration-500">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f5f5f7]/30 mb-2">DIY Kits</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">Build it yourself</h3>
            <p className="text-[#f5f5f7]/50 text-sm mb-6">
              Same components we use. You do the assembly.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7] mb-1">$750 – $1,500 <span className="text-lg font-normal text-[#f5f5f7]/50">USD</span></p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">+ your time and patience</p>

            <div className="space-y-4 flex-grow">
              {[
                { text: 'Decent signal path improvement', ok: true },
                { text: 'Pick your own layout', ok: true },
                { text: 'No isolated power design', ok: false },
                { text: 'No hand-soldered connections', ok: false },
                { text: 'No lifetime support', ok: false },
                { text: 'Stage-ready if you test it enough', ok: true },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex-shrink-0 ${item.ok ? 'text-[#10B981]' : 'text-red-400/60'}`}>
                    {item.ok ? '✓' : '✕'}
                  </span>
                  <span className={`text-sm leading-snug ${item.ok ? 'text-[#f5f5f7]/70' : 'text-[#f5f5f7]/40'}`}>{item.text}</span>
                </div>
              ))}
            </div>

            <Link
              href="/book"
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full border-2 border-[#0071E3]/50 text-[#0071E3] hover:bg-[#0071E3] hover:text-white transition-all duration-300"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Tier 3 — Most Popular */}
          <div className="relative rounded-2xl p-8 bg-gradient-to-b from-[#0a1628] to-[#0f0a1f] border border-[#0071E3]/30 flex flex-col shadow-[0_0_40px_rgba(0,113,227,0.15)] hover:shadow-[0_0_60px_rgba(0,113,227,0.25)] hover:-translate-y-1 transition-all duration-500">
            <div className="absolute -top-3.5 right-6">
              <span className="bg-[#0071E3] text-white text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full">
                Most Popular
              </span>
            </div>

            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#0071E3] mb-2">Custom Build</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">We build it for you</h3>
            <p className="text-[#f5f5f7]/50 text-sm mb-6">
              Hand us your board. Walk away. Get it back wired right and built to last.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7] mb-1">From $2,000 <span className="text-lg font-normal text-[#f5f5f7]/50">USD</span></p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">turnkey, guaranteed</p>

            <div className="space-y-4 flex-grow">
              {[
                'Fully isolated power design',
                'Hand-soldered, every connection',
                'Dead-quiet signal chain',
                'Road-tested before it ships',
                'Ongoing support when you need it',
                'Engineered signal path',
                'Bulletproof on any stage',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#10B981] mt-0.5 flex-shrink-0">✓</span>
                  <span className="text-[#f5f5f7]/80 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/book"
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full bg-[#0071E3] hover:bg-[#005BB5] text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,113,227,0.40)]"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </Section>

      {/* dark → light transition */}
      <div className="trd-divider-dark-to-light" />

      {/* ──── 8. REVIEWS — Auto-scrolling marquee ──── */}
      <Section theme="light" id="customer-reviews" reveal>
        <div className="text-center mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Don&apos;t take our word for it.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Straight from the people who gig on these boards every week.</p>
        </div>
        <ReviewsMarquee />
      </Section>

      {/* ──── 9. FAQ ──── */}
      <Section theme="lightGray" id="faq" reveal>
        <div className="text-center mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f]">
            Got questions? We&apos;ve got answers.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#1d1d1f]/10">
          {[
            {
              q: "How long does a build take?",
              a: "Most builds ship in 4-8 weeks depending on complexity and what parts we need to source. Touring emergency? We do rush builds too. Just let us know.",
            },
            {
              q: "How much does a custom build cost?",
              a: "Every rig is different, so every quote is different. Builds start from $2,000 and scale with complexity. Your consultation is free — we'll walk through what you need and give you a straight answer.",
            },
            {
              q: "What if something breaks?",
              a: "We stand behind our work. If something goes wrong with the build, reach out and we'll figure it out with you. We're not going to leave you hanging.",
            },
            {
              q: "Do I need to ship my board to you?",
              a: "Most clients do, yeah. We're in Houston, TX. We'll send you a shipping label and walk you through packing it safe. Local? Drop it off anytime.",
            },
            {
              q: "What is included in the free consultation?",
              a: "We talk through your rig, your signal chain, what's bugging you, and what you want it to do. Then we put together a game plan and a quote. No pressure, no obligation.",
            },
            {
              q: "Do you build MIDI switching systems and audio loops?",
              a: "Absolutely. That's actually where things get really fun. We build full MIDI-controlled rigs with loop switchers, preset routing, the whole deal.",
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

        <div className="text-center mt-10">
          <Link href="/book" className="text-[#0071E3] hover:text-[#005BB5] font-medium transition-colors">
            Still have questions? Let&apos;s talk &rsaquo;
          </Link>
        </div>
      </Section>
    </>
  );
}
