import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/Section';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import BeforeAfter from '@/components/BeforeAfter';
import GallerySlider from '@/components/GallerySlider';
import CinemaSection from '@/components/CinemaSection';
import ReviewsMarquee from '@/components/ReviewsMarquee';
import HeroVideo from '@/components/HeroVideo';
import LeadCaptureForm from '@/components/LeadCaptureForm';

export default function Home() {
  return (
    <>
      {/* ──── 1. HERO — Video + killer headline ──── */}
      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-screen flex items-end justify-center bg-black">
          <HeroVideo />

          <div className="relative z-10 max-w-[1200px] mx-auto px-6 pb-24 pt-40 w-full text-center">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-6">Only 2 Spots Left This Year</p>
            <h1 className="trd-hero-headline text-[#f5f5f7] mb-6">
              Your tone deserves better than
              <br />
              <span className="trd-gradient-text">zip ties and patch cables.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-12">
              Hand-wired pedalboards for guitarists who refuse to settle.
              300+ builds. 17 years at the bench. Only 2 spots left this year.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
              <Link
                href="/book"
                className="trd-cta-gradient inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
              >
                Claim Your Spot
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
                <p className="text-2xl sm:text-3xl font-bold text-white">300+</p>
                <p className="text-sm text-[#f5f5f7]/50 mt-1">rigs built</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white">17</p>
                <p className="text-sm text-[#f5f5f7]/50 mt-1">years at the bench</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-[#0071E3]">2</p>
                <p className="text-sm text-[#f5f5f7]/50 mt-1">spots left</p>
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

      {/* ──── 2. DOES YOUR RIG LOOK LIKE THIS? — Before/After ──── */}
      <Section theme="light" id="transformations" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">The Difference</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Does your rig look like this?
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-2xl mx-auto">
            Same pedals. Same amp. Same player. The only difference is who wired it.
            Drag the slider and see what changes when we get our hands on it.
          </p>
        </div>
        <BeforeAfter />
        <div className="text-center mt-12">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 transition-colors text-sm"
          >
            Get Your Rig Built Right
          </Link>
        </div>
      </Section>

      {/* ──── 3. SCARCITY CTA — The waitlist ──── */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_50%_80%,rgba(191,90,242,0.06)_0%,transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/30 mb-4">Limited Availability</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-[#f5f5f7] tracking-tight mb-3">
            Only <span className="trd-gradient-text">2 spots left</span> this year.
          </h3>
          <p className="text-[#f5f5f7]/50 text-base mb-8 max-w-xl mx-auto">
            Every build gets our full attention. No assembly line. No outsourcing.
            We cap it at 18 builds a year and we are almost done. Tell us about
            your rig before the last spots are gone.
          </p>
          <Link
            href="/book"
            className="trd-cta-gradient inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-semibold text-lg"
          >
            Claim Your Spot
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>

      {/* ──── 4. SOCIAL PROOF — Who trusts us ──── */}
      <Section theme="dark" id="testimonials" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">On The Road</p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-2">
            Trusted by players who can&apos;t afford a bad night.
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            Touring artists, session players, worship leaders. If your rig
            fails on stage, the gig fails. That is why they come to us.
          </p>
        </div>
        <TestimonialCarousel theme="dark" />
      </Section>

      {/* ──── 5. HOW WE BUILD — Cinema section ──── */}
      <CinemaSection />

      {/* ──── 6. BUILD GALLERY — The gear porn ──── */}
      <Section theme="dark" id="gallery" reveal>
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">The Work</p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-2">
            300+ rigs built. <span className="trd-gradient-text">One at a time.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            Every board is different because every player is different.
            Here is what it looks like when we are done.
          </p>
        </div>
        <GallerySlider />
        <div className="text-center mt-10">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-[#0071E3] font-medium hover:underline transition-colors"
          >
            Start Your Build
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </Section>

      {/* ──── 7. VIDEO BUILD — Watch it happen ──── */}
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
      </Section>

      {/* ──── 8. THE PROCESS — How it works ──── */}
      <Section theme="lightGray" id="process" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">The Process</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            From conversation to <span className="trd-gradient-text">stage-ready.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-2xl mx-auto">
            Three steps. No surprises. You know exactly what is happening at every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              number: '01',
              title: 'We Talk',
              desc: 'Tell us what you play, what is driving you nuts, and what your dream rig looks like. We map out the build, the signal chain, and the full component list.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_S.png',
            },
            {
              number: '02',
              title: 'We Build',
              desc: 'Every connection hand-soldered. Every cable custom-cut. Isolated power, engineered signal path, cable management that stays clean on the road.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/John_A._1.png',
            },
            {
              number: '03',
              title: 'You Play',
              desc: 'Board arrives road-ready. Plug in, hit your presets, and hear the difference. Dead quiet. Zero signal loss. And we are a phone call away if you ever need us.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Saxon_W..jpg',
            },
          ].map((step) => (
            <div key={step.number} className="group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-[#0a0a0a]">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold tracking-widest px-3 py-1.5 rounded-full">
                  STEP {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">{step.title}</h3>
              <p className="text-[14px] text-[#1d1d1f]/55 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-[18px] text-[#1d1d1f] font-medium mb-1">
            Custom builds start from <span className="trd-gradient-text font-bold">$1,999 USD</span>
          </p>
          <p className="text-[14px] text-[#1d1d1f]/40 mb-6">
            Every rig is different. Your consultation is free. We give you a straight quote.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 transition-colors text-sm"
          >
            Get on the List
          </Link>
        </div>
      </Section>

      {/* ──── 9. TONE TUTORING — Secondary offer ──── */}
      <Section theme="light" id="tone-tutoring" reveal>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Not Ready for a Build?</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Get expert advice on your current rig.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            A 60-minute 1-on-1 video call. We diagnose your tone issues and
            tell you exactly what to fix. Signal chain, amp settings, effects order, noise. All of it.
          </p>
          <div className="inline-flex items-baseline gap-2 mb-8">
            <span className="text-4xl font-bold text-[#1d1d1f]">$99</span>
            <span className="text-[#1d1d1f]/40 text-lg">USD / session</span>
          </div>
          <div className="block">
            <Link
              href="/tone-tutoring"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full border-2 border-[#1d1d1f]/15 text-[#1d1d1f] hover:border-[#1d1d1f]/30 hover:bg-[#1d1d1f]/[0.03] transition-all text-sm"
            >
              Book a Tone Session
            </Link>
          </div>
        </div>
      </Section>

      {/* ──── 10. REVIEWS — Volume of social proof ──── */}
      <Section theme="lightGray" id="customer-reviews" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Real Reviews</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Hear it from guitarists who&apos;ve been through it.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">They had the same problems. Here is what happened after.</p>
        </div>
        <ReviewsMarquee />
      </Section>

      {/* ──── 11. LEAD CAPTURE — Join the waitlist ──── */}
      <Section theme="light" id="get-in-touch" reveal>
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Join the Waitlist</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Tell us about your rig.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-xl mx-auto">
            We are almost full for the year. Drop your info and we will
            reach out to talk through what you need. No pressure, no spam.
          </p>
        </div>
        <LeadCaptureForm />
      </Section>

      {/* ──── 12. FAQ — Remove objections ──── */}
      <Section theme="lightGray" id="faq" reveal>
        <div className="text-center mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f]">
            Common questions, straight answers.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#1d1d1f]/10">
          {[
            {
              q: "Why only 18 builds a year?",
              a: "Because every build gets our full attention. We are not an assembly line. Each rig is designed, wired, and tested by the same hands. That is how we guarantee the quality that touring artists depend on. We are down to the last 2 spots for this year.",
            },
            {
              q: "How much does a custom build cost?",
              a: "Every rig is different, so every quote is different. Builds start from $1,999 USD and scale with complexity. Your consultation is free and we will give you a straight answer.",
            },
            {
              q: "What is Tone Tutoring?",
              a: "A 60-minute 1-on-1 video call where we diagnose your tone issues. Noise, hum, signal chain order, amp settings, effects placement, gear recommendations. You walk away with a clear plan. $99 USD.",
            },
            {
              q: "How long does a build take?",
              a: "Most builds ship in 4-8 weeks depending on complexity and parts sourcing. Touring emergency? We do rush builds. Just let us know.",
            },
            {
              q: "Do I need to ship my board to you?",
              a: "For a custom build, most clients ship their pedals to us. We are US-based and ship nationwide. We will send a label and walk you through packing it. For Tone Tutoring, it is all remote via video call.",
            },
            {
              q: "What if something breaks after the build?",
              a: "We stand behind our work. If something goes wrong, reach out and we will figure it out with you. We are not going to leave you hanging.",
            },
            {
              q: "Do you build MIDI switching systems?",
              a: "Absolutely. Full MIDI-controlled rigs with loop switchers, preset routing, the whole deal. That is where things get really fun.",
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

      {/* ──── 13. CLOSING CTA — Final push with scarcity ──── */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_50%_80%,rgba(191,90,242,0.06)_0%,transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            2 spots left. That is it.
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg mb-10 max-w-xl mx-auto">
            Your tone is worth getting right. Tell us what you play and
            we will tell you exactly what we would do about it.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/book"
              className="trd-cta-gradient inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
            >
              Claim Your Spot
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
