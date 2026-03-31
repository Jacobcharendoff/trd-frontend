'use client';

import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/Section';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import BeforeAfter from '@/components/BeforeAfter';
import GallerySlider from '@/components/GallerySlider';

export default function Home() {
  return (
    <>
      {/* ──── 1. HERO SECTION (dark — cinematic video hero matching Dawn) ──── */}
      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-screen flex items-center justify-center bg-black">
          {/* Background video — matches Dawn's autoplay muted loop hero */}
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png"
              className="w-full h-full object-cover opacity-50"
            >
              <source
                src="https://cdn.shopify.com/videos/c/vp/f12872e61445487b86f0ae5df85ba09b/f12872e61445487b86f0ae5df85ba09b.HD-1080p-7.2Mbps-78086312.mp4"
                type="video/mp4"
              />
            </video>
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
          </div>

          {/* Hero content — left-aligned to match Dawn */}
          <div className="relative z-10 max-w-[1080px] mx-auto px-6 pt-32 pb-20 w-full text-left">
            <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-[#f5f5f7] mb-6 max-w-3xl">
              We don&apos;t sell gear.{' '}
              <br />
              <span className="trd-gradient-text">We wire it right.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#f5f5f7]/70 max-w-xl leading-relaxed mb-8">
              17 years. 200+ custom rigs. Hand-soldered, tour-tested, backed for life.
            </p>
            <div className="flex gap-4 mb-16">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-[#2997FF] hover:bg-[#1a82e6] text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200"
              >
                Start a Build
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 pt-8 border-t border-white/10">
              <p className="text-base sm:text-lg text-[#f5f5f7]/60">Custom builds from $2,000 USD</p>
              <span className="hidden sm:block text-[#f5f5f7]/20">&bull;</span>
              <p className="text-base sm:text-lg text-[#f5f5f7]/60">Lifetime support</p>
              <span className="hidden sm:block text-[#f5f5f7]/20">&bull;</span>
              <p className="text-base sm:text-lg text-[#f5f5f7]/60">Free repairs</p>
            </div>
          </div>
        </div>
      </div>

      {/* ──── 2. ARTIST TESTIMONIALS (light — matches Dawn "WHAT ARTISTS SAY") ──── */}
      <Section theme="light" id="testimonials" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">What Artists Say</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            Real builds. Real players. <span className="trd-gradient-text">Real results.</span>
          </h2>
        </div>
        <TestimonialCarousel theme="light" />
      </Section>

      {/* ──── 3. HOW WE BUILD (lightGray — numbered steps matching Dawn) ──── */}
      <Section theme="lightGray" id="how-we-build" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">How We Build</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            Noise. Rat&apos;s nest. Tone suck. <span className="text-[#F5A623]">We fix that.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: '01', title: 'Signal Routing', desc: 'Optimized signal path tailored to your effects and playing style. No more tone suck.' },
            { num: '02', title: 'Cable Architecture', desc: 'Every run is labeled, laced, and built to survive hundreds of shows. No rat\'s nest. No guesswork.' },
            { num: '03', title: 'Power & Protection', desc: 'Isolated power distribution eliminates ground loops and noise. Clean power, clean tone.' },
            { num: '04', title: 'Tour-Ready', desc: 'Your board leaves here stage-ready. Peace of mind on stage. Every night.' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 flex flex-col border border-black/[0.06]">
              <p className="text-4xl font-bold text-[#1d1d1f]/10 mb-4">{item.num}</p>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">{item.title}</h3>
              <p className="text-[#1d1d1f]/60 leading-relaxed flex-grow">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ──── 4. VIDEO SECTION (light — "See a rig come to life") ──── */}
      <Section theme="light" id="video-build" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Watch the Build</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            See a rig come to <span className="text-[#F5A623]">life.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">From bare enclosure to road-ready in under a minute.</p>
        </div>

        <div className="relative w-full rounded-3xl overflow-hidden bg-[#0a0a0a] aspect-video max-w-4xl mx-auto shadow-2xl">
          <video
            controls
            className="w-full h-full object-cover"
            poster="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png"
          >
            <source
              src="https://cdn.shopify.com/videos/c/vp/f12872e61445487b86f0ae5df85ba09b/f12872e61445487b86f0ae5df85ba09b.HD-1080p-7.2Mbps-78086312.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </Section>

      {/* ──── 5. GALLERY (lightGray — fade slider with thumbnails) ──── */}
      <Section theme="lightGray" id="gallery" reveal>
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">The Gallery</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            200+ rigs. <span className="trd-gradient-text">Here&apos;s a few.</span>
          </h2>
        </div>
        <GallerySlider />
      </Section>

      {/* ──── 6. BEFORE/AFTER — Case Studies (light) ──── */}
      <Section theme="light" id="transformations" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Transformations</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            From chaos to <span className="text-[#F5A623]">clarity.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">See what a professional build actually changes about your rig.</p>
        </div>
        <BeforeAfter />
      </Section>

      {/* ──── 7. SERVICE TIERS — Dark comparison matching Dawn ──── */}
      <Section theme="dark" id="service-tiers" reveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Your rig. <span className="italic text-[#F5A623]">Your call.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            Whether you&apos;re upgrading, building, or staying put — here&apos;s what each option really looks like.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1 — Current Setup (anti-sell) */}
          <div className="rounded-2xl p-8 bg-[#f5f5f7]/[0.06] border border-white/[0.06] flex flex-col">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f5f5f7]/30 mb-2">Current Setup</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7]/70 mb-2">Fix what you&apos;ve got</h3>
            <p className="text-[#f5f5f7]/40 text-sm mb-6">
              Already have a board? We&apos;ll optimize your signal chain, clean up your wiring, and kill the noise.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7]/50 mb-1">$0</p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">upfront — but it costs you tone</p>

            <div className="space-y-4 flex-grow">
              {[
                'Signal degrades at every connection',
                'Power noise bleeds into your signal',
                'No professional signal path design',
                'No warranty or ongoing support',
                'Tone loss compounds over time',
                'Unreliable on stage',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-red-400/60 mt-0.5 flex-shrink-0">&#10005;</span>
                  <span className="text-[#f5f5f7]/40 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-[#f5f5f7]/25 text-sm italic mt-8">You already know something&apos;s off.</p>
          </div>

          {/* Tier 2 — DIY Build */}
          <div className="rounded-2xl p-8 bg-[#f5f5f7]/[0.06] border border-white/[0.08] flex flex-col">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#f5f5f7]/30 mb-2">DIY Build</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">Build it yourself</h3>
            <p className="text-[#f5f5f7]/50 text-sm mb-6">
              Want to learn? Our DIY kits come with the same components we use in custom builds.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7] mb-1">$750 – $1,500 <span className="text-lg font-normal text-[#f5f5f7]/50">USD</span></p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">+ your time</p>

            <div className="space-y-4 flex-grow">
              {[
                { text: 'Basic signal path improvement', positive: true },
                { text: 'Your choice of layout & components', positive: true },
                { text: 'No isolated power design', positive: false },
                { text: 'No hand-soldered connections', positive: false },
                { text: 'No lifetime support or repairs', positive: false },
                { text: 'Stage-ready (with enough testing)', positive: true },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex-shrink-0 ${item.positive ? 'text-[#10B981]' : 'text-red-400/60'}`}>
                    {item.positive ? '✓' : '✕'}
                  </span>
                  <span className={`text-sm leading-snug ${item.positive ? 'text-[#f5f5f7]/70' : 'text-[#f5f5f7]/40'}`}>{item.text}</span>
                </div>
              ))}
            </div>

            <Link
              href="/shop"
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full border-2 border-[#F5A623] text-[#F5A623] hover:bg-[#F5A623] hover:text-black transition-colors duration-200"
            >
              Explore DIY Options
            </Link>
          </div>

          {/* Tier 3 — Custom Build (recommended) */}
          <div className="relative rounded-2xl p-8 bg-gradient-to-b from-[#1a3a4a] to-[#0f2833] border border-[#2997FF]/20 flex flex-col">
            {/* Recommended badge */}
            <div className="absolute -top-3.5 right-6">
              <span className="bg-[#2997FF] text-white text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full">
                ✓ Recommended
              </span>
            </div>

            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#2997FF] mb-2">Custom Build</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">We build it for you</h3>
            <p className="text-[#f5f5f7]/50 text-sm mb-6">
              Hand us your pedalboard and walk away. You&apos;ll get it back wired right, sounding right, and backed for life.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7] mb-1">From $2,000 <span className="text-lg font-normal text-[#f5f5f7]/50">USD</span></p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">turnkey, guaranteed</p>

            <div className="space-y-4 flex-grow">
              {[
                'Fully isolated power design',
                'Hand-soldered, precision connections',
                'Zero-noise signal chain',
                'Road-tested, tour-grade durability',
                'Lifetime support & free repairs',
                'Professional signal path engineering',
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
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full bg-[#F5A623] hover:bg-[#D48A1A] text-black transition-colors duration-200"
            >
              Start a Build
            </Link>
          </div>
        </div>
      </Section>

      {/* ──── 8. CUSTOMER REVIEWS (white — real reviews) ──── */}
      <Section theme="light" id="customer-reviews" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            What our customers say.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Real feedback from real players.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Kevin M.', feedback: 'Jacob built exactly what I imagined. Fast, professional, and the board is bulletproof.' },
            { name: 'Josh W.', feedback: 'Best decision I made for my live rig. No more noise issues, and it fits perfectly in my case.' },
            { name: 'Kaden C.', feedback: 'The craftsmanship is incredible. Every detail matters, and it shows in how the board plays.' },
            { name: 'Shane T.', feedback: 'Finally, a pedalboard that doesn\'t fight me during gigs. Highly recommend.' },
            { name: 'Mason M.', feedback: 'Jacob really listened to what I needed. The result is a rig that feels like an extension of me.' },
            { name: 'Robert B.', feedback: 'Professional quality, professional results. Worth every penny.' },
          ].map((review, idx) => (
            <div key={idx} className="bg-[#f5f5f7] rounded-2xl p-8 border border-black/[0.06]">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5" fill="#F5A623" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#1d1d1f]/70 mb-4 leading-relaxed">{review.feedback}</p>
              <p className="font-semibold text-[#1d1d1f]">{review.name}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ──── 9. FAQ (lightGray — "Got questions?") ──── */}
      <Section theme="lightGray" id="faq" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            Got questions? We&apos;ve got answers.
          </h2>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          {[
            {
              q: "How long does a custom build take?",
              a: "Typically 2–4 weeks depending on complexity and current workload. We'll give you a timeline during your consultation.",
            },
            {
              q: "What if I'm not happy with my build?",
              a: "We offer a 100% satisfaction guarantee. If something isn't right, we'll fix it or rebuild it. Lifetime support means you're never on your own.",
            },
            {
              q: "Can I add to or modify my board later?",
              a: "Absolutely. We design boards to evolve with you. Future modifications are easy and you get lifetime support.",
            },
            {
              q: "Do you ship internationally?",
              a: "Yes, we ship worldwide. Shipping costs and timelines vary by location—ask during your consultation.",
            },
            {
              q: "What if I just want repairs?",
              a: "We offer hourly repair services for cables, pedals, power issues, and more. Starts at $75/hour.",
            },
          ].map((item, idx) => (
            <details key={idx} className="bg-white rounded-2xl border border-black/[0.06] p-6 cursor-pointer">
              <summary className="font-semibold text-[#1d1d1f] flex items-center gap-3">
                <span className="text-[#F5A623]">+</span> {item.q}
              </summary>
              <p className="text-[#1d1d1f]/60 mt-4 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ──── 10. TONE TUTORING CROSS-SELL (white) ──── */}
      <Section theme="light" id="tone-tutoring-cta" reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
              Start with a Tone Tutoring session.
            </h2>
            <p className="text-lg text-[#1d1d1f]/60 leading-relaxed mb-6">
              Not sure if you need a full build? Do a 60-minute Tone Tutoring session first. We&apos;ll dig into your current rig, your playing style, and create a roadmap for your tone. Then decide if a custom build is right for you.
            </p>
            <Link
              href="/tone-tutoring"
              className="inline-flex items-center gap-2 bg-[#1d1d1f] hover:bg-[#1d1d1f]/90 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200"
            >
              Book a Session
            </Link>
          </div>
          <div className="relative h-80 bg-gradient-to-br from-[#F5A623]/10 to-[#10B981]/10 rounded-2xl flex items-center justify-center border border-[#F5A623]/20">
            <div className="text-center">
              <p className="text-5xl font-bold trd-gradient-text mb-2">$99.99</p>
              <p className="text-[#1d1d1f]/40 text-lg">60 minutes</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── 11. CLOSING CTA (dark accent — strong finish) ──── */}
      <Section theme="dark" id="closing-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Your tone. Our craft. For life.
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto">
            Let&apos;s build the rig you&apos;ve been dreaming about.
          </p>
        </div>
        <div className="mt-12">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-8 py-4 rounded-full transition-colors duration-200"
          >
            Start a Build
          </Link>
        </div>
      </Section>
    </>
  );
}
