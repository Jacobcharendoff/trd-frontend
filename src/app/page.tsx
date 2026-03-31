'use client';

import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/Section';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import BeforeAfter from '@/components/BeforeAfter';
import GallerySlider from '@/components/GallerySlider';
import CinemaSection from '@/components/CinemaSection';

export default function Home() {
  return (
    <>
      {/* ──── 1. HERO ──── */}
      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-screen flex items-center justify-center bg-black">
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

          <div className="relative z-10 max-w-[1080px] mx-auto px-6 pt-32 pb-20 w-full text-left">
            <h1 className="text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] lg:text-[5rem] font-bold leading-[1.08] tracking-tight text-[#f5f5f7] mb-6 max-w-3xl">
              Your board should sound
              <br />
              <span className="trd-gradient-text">as good as you play.</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#f5f5f7]/70 max-w-xl leading-relaxed mb-8">
              Hand-wired pedalboards built around how you actually play.
              One at a time. Backed for life.
            </p>
            <div className="flex gap-4 mb-16">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005BB5] text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200"
              >
                Start a Build
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-12 pt-8 border-t border-white/10">
              <p className="text-base sm:text-lg text-[#f5f5f7]/60">200+ rigs built</p>
              <span className="hidden sm:block text-[#f5f5f7]/20">&bull;</span>
              <p className="text-base sm:text-lg text-[#f5f5f7]/60">17 years at the bench</p>
              <span className="hidden sm:block text-[#f5f5f7]/20">&bull;</span>
              <p className="text-base sm:text-lg text-[#f5f5f7]/60">Lifetime support</p>
            </div>
          </div>
        </div>
      </div>

      {/* ──── 2. ARTIST TESTIMONIALS ──── */}
      <Section theme="light" id="testimonials" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">On the Road</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            Trusted by players who <span className="trd-gradient-text">can&apos;t afford a bad night.</span>
          </h2>
        </div>
        <TestimonialCarousel theme="light" />
      </Section>

      {/* ──── 3. HOW WE BUILD (Cinema / Parallax) ──── */}
      <CinemaSection />

      {/* ──── 4. VIDEO ──── */}
      <Section theme="light" id="video-build" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Watch the Build</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            Bare enclosure to <span className="text-[#0071E3]">road-ready.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">The whole thing in under a minute.</p>
        </div>

        <div className="relative w-full rounded-3xl overflow-hidden bg-[#0a0a0a] aspect-video max-w-4xl mx-auto shadow-2xl">
          <video
            controls
            className="w-full h-full object-cover"
            poster="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png"
          >
            <source
              src="https://cdn.shopify.com/videos/c/o/v/21a7252cb5764170a234e7dd476193e1.mov"
              type="video/quicktime"
            />
            <source
              src="https://cdn.shopify.com/videos/c/o/v/21a7252cb5764170a234e7dd476193e1.mov"
              type="video/mp4"
            />
          </video>
        </div>
      </Section>

      {/* ──── 5. GALLERY ──── */}
      <Section theme="lightGray" id="gallery" reveal>
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">The Gallery</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            200+ rigs. <span className="trd-gradient-text">Here&apos;s a few.</span>
          </h2>
        </div>
        <GallerySlider />
      </Section>

      {/* ──── 6. BEFORE/AFTER ──── */}
      <Section theme="light" id="transformations" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Transformations</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            Same pedals. <span className="text-[#0071E3]">Completely different rig.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">What changes when we get our hands on it.</p>
        </div>
        <BeforeAfter />
      </Section>

      {/* ──── 7. SERVICE TIERS ──── */}
      <Section theme="dark" id="service-tiers" reveal>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Three ways to <span className="trd-gradient-text">get your tone right.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            Depends on how hands-on you want to be.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1 — Keep what you've got */}
          <div className="rounded-2xl p-8 bg-[#f5f5f7]/[0.06] border border-white/[0.06] flex flex-col">
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

            <p className="text-[#f5f5f7]/25 text-sm italic mt-8">You know something&apos;s off.</p>
          </div>

          {/* Tier 2 — DIY Build */}
          <div className="rounded-2xl p-8 bg-[#f5f5f7]/[0.06] border border-white/[0.08] flex flex-col">
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
              href="/shop"
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full border-2 border-[#0071E3] text-[#0071E3] hover:bg-[#0071E3] hover:text-white transition-colors duration-200"
            >
              Browse Kits
            </Link>
          </div>

          {/* Tier 3 — Custom Build */}
          <div className="relative rounded-2xl p-8 bg-gradient-to-b from-[#1a3a4a] to-[#0f2833] border border-[#0071E3]/20 flex flex-col">
            <div className="absolute -top-3.5 right-6">
              <span className="bg-[#0071E3] text-white text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full">
                Most Popular
              </span>
            </div>

            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#0071E3] mb-2">Custom Build</p>
            <h3 className="text-2xl font-bold text-[#f5f5f7] mb-2">We build it for you</h3>
            <p className="text-[#f5f5f7]/50 text-sm mb-6">
              Hand us your board. Walk away. Get it back wired right and backed for life.
            </p>
            <p className="text-3xl font-bold text-[#f5f5f7] mb-1">From $2,000 <span className="text-lg font-normal text-[#f5f5f7]/50">USD</span></p>
            <p className="text-[#f5f5f7]/30 text-sm mb-8">turnkey, guaranteed</p>

            <div className="space-y-4 flex-grow">
              {[
                'Fully isolated power design',
                'Hand-soldered, every connection',
                'Dead-quiet signal chain',
                'Road-tested before it ships',
                'Lifetime support, free repairs',
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
              className="mt-8 block text-center font-semibold py-3.5 px-6 rounded-full bg-[#0071E3] hover:bg-[#005BB5] text-white transition-colors duration-200"
            >
              Start a Build
            </Link>
          </div>
        </div>
      </Section>

      {/* ──── 8. REVIEWS ──── */}
      <Section theme="light" id="customer-reviews" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            Players talk.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Straight from the people who gig on these boards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'Kevin M.', feedback: 'Jacob built exactly what I described. Fast, clean, and the board is rock solid. Took it on a 3-week run and it didn\'t miss a beat.' },
            { name: 'Josh W.', feedback: 'Best decision I made for my live rig. The noise I was chasing for months? Gone. First gig with the new board and I couldn\'t stop grinning.' },
            { name: 'Kaden C.', feedback: 'You can tell someone who cares about the craft put this together. Every cable, every connection. It\'s a different level.' },
            { name: 'Shane T.', feedback: 'I used to dread setting up my board at gigs. Now I just plug in and play. That\'s what I was paying for.' },
            { name: 'Mason M.', feedback: 'Jacob actually listened. Didn\'t try to upsell me on stuff I didn\'t need. The result sounds exactly like what was in my head.' },
            { name: 'Robert B.', feedback: 'Worth every dollar. I\'ve had this board for two years now and it still works like the day I got it.' },
          ].map((review, idx) => (
            <div key={idx} className="bg-[#f5f5f7] rounded-2xl p-8 border border-black/[0.06]">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4" fill="#EAB308" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#1d1d1f]/70 mb-6 leading-relaxed">{review.feedback}</p>
              <p className="font-semibold text-[#1d1d1f]">{review.name}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ──── 9. FAQ ──── */}
      <Section theme="lightGray" id="faq" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            The stuff people ask us.
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl">
          {[
            {
              q: "How long does a build take?",
              a: "Usually 2 to 4 weeks once we lock in the design. Complex rigs with switching systems can take a bit longer. We'll give you a real timeline before we start.",
            },
            {
              q: "What if something's not right with my build?",
              a: "We'll fix it. That's what lifetime support means. If your board needs a tweak or something's not working the way it should, send it back or hop on a call and we'll sort it out.",
            },
            {
              q: "Can I change my setup later?",
              a: "That's the plan. We build boards knowing your rig will evolve. Swapping a pedal or adding one later is straightforward, and we're here to help when you do.",
            },
            {
              q: "Do you ship outside the US?",
              a: "Yeah, we've shipped boards internationally. Shipping costs depend on where you are. We'll quote that out during the consultation.",
            },
            {
              q: "I don't need a full build. Can you just fix something?",
              a: "Absolutely. We do repair work too. Cables, pedals, power issues, whatever it is. Starts at $75/hour.",
            },
          ].map((item, idx) => (
            <details key={idx} className="bg-white rounded-2xl border border-black/[0.06] p-6 cursor-pointer group">
              <summary className="font-semibold text-[#1d1d1f] flex items-center gap-3 [&::-webkit-details-marker]:hidden list-none">
                <span className="text-[#0071E3] text-lg transition-transform duration-200 group-open:rotate-45">+</span>
                {item.q}
              </summary>
              <p className="text-[#1d1d1f]/60 mt-4 leading-relaxed pl-7">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ──── 10. TONE TUTORING CROSS-SELL ──── */}
      <Section theme="light" id="tone-tutoring-cta" reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Not ready for a build?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
              Talk tone with us first.
            </h2>
            <p className="text-lg text-[#1d1d1f]/60 leading-relaxed mb-6">
              60 minutes on a video call. We dig into your rig, figure out what&apos;s working and what isn&apos;t, and map out where to go from here. No commitment. Just good advice from someone who&apos;s wired 200+ boards.
            </p>
            <Link
              href="/tone-tutoring"
              className="inline-flex items-center gap-2 bg-[#1d1d1f] hover:bg-[#1d1d1f]/90 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200"
            >
              Learn More
            </Link>
          </div>
          <div className="relative h-80 bg-gradient-to-br from-[#0071E3]/10 to-[#00B4D8]/10 rounded-2xl flex items-center justify-center border border-[#0071E3]/20">
            <div className="text-center">
              <p className="text-5xl font-bold trd-gradient-text mb-2">$99.99</p>
              <p className="text-[#1d1d1f]/40 text-lg">60 minutes, 1-on-1</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── 11. CLOSING CTA ──── */}
      <Section theme="dark" id="closing-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Your rig&apos;s not going to fix itself.
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto">
            Grab a free call. Tell us what you&apos;re dealing with. We&apos;ll tell you what we&apos;d do about it.
          </p>
        </div>
        <div className="mt-12">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#005BB5] text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200"
          >
            Book a Free Consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
