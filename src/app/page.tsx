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
              Your board is a mess.
              <br />
              <span className="trd-gradient-text">We fix that.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-12">
              Ground loops, spaghetti wiring, 15 minutes of setup while your band
              waits. We build boards that show up dead quiet and stage-ready.
              300+ rigs. 17 years deep. 2 spots left this year.
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
                Fix Your Tone &mdash; $99
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
            Same pedals. Same amp. <span className="trd-gradient-text">Completely different rig.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-2xl mx-auto">
            The only thing that changed is who wired it. Drag the slider
            and see what happens when the spaghetti becomes a signal chain.
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
            We cap it at 18 builds a year because every board gets the same
            obsessive treatment. Same hands, start to finish. No assembly line.
            And we&apos;re almost done for the year.
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
            200+ shows. Zero failures. <span className="trd-gradient-text">That&apos;s the review.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            Session players, touring artists, worship leaders. Guys who can&apos;t
            afford a board going down on stage. Their techs looked at the wiring
            and said &quot;whoever did this actually gives a damn.&quot; Yep.
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
            Flip it over. <span className="trd-gradient-text">Look at the wiring.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            Color-coded cables. Labeled jacks. Every cable cut to the exact right
            length. No excess, no tangles. This is what 300+ builds looks like.
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
          <p className="text-[#1d1d1f]/50 text-lg">Every joint hand-soldered. Every connection tested. Every cable the exact right length. This is the standard.</p>
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
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">How It Works</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            From spaghetti to <span className="trd-gradient-text">stage-ready.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-2xl mx-auto">
            Three steps. You know exactly what&apos;s happening the whole way through.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              number: '01',
              title: 'We Talk',
              desc: 'You tell us what you play, what pedals you’re running, and what’s driving you nuts. Hum, noise, tone suck, tap-dancing, whatever it is. We’ll diagram the signal chain and plan the whole rebuild.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_S.png',
            },
            {
              number: '02',
              title: 'We Build',
              desc: 'Every connection hand-soldered. Custom-cut cables. Isolated power, clean signal path, cable management that holds up 200 shows in. We road-test the whole thing before it ships. Flip it over and look at the wiring.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/John_A._1.png',
            },
            {
              number: '03',
              title: 'You Plug In',
              desc: 'Board shows up stage-ready. Uncase it, stomp through your presets, and hear the difference. Dead quiet. Zero tone suck. Your band will think you got a new amp. Nope. Same amp, proper signal chain.',
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
            Builds start from <span className="trd-gradient-text font-bold">$1,999 USD</span>
          </p>
          <p className="text-[14px] text-[#1d1d1f]/40 mb-6">
            Every rig is different, so every quote is different. The consultation is free and you&apos;ll get a straight number. Buy once, cry once.
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
            Let&apos;s just talk about your rig.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            An hour on video with Jacob. We&apos;ll go through your whole signal chain,
            talk amp settings, effects order, noise issues, the works. Most guys
            walk away knowing exactly what to change. Some realize they need a
            full build. Either way, you&apos;ll know.
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
            Don&apos;t take our word for it.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Noise, hum, tone suck, rat&apos;s nest wiring. These guys had the same problems. Here&apos;s what they said after.</p>
        </div>
        <ReviewsMarquee />
      </Section>

      {/* ──── 11. LEAD CAPTURE — Join the waitlist ──── */}
      <Section theme="light" id="get-in-touch" reveal>
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Join the Waitlist</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Tell us what&apos;s going on with your rig.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-xl mx-auto">
            2 spots left this year. Drop your info and we&apos;ll get back to you
            within 24 hours. Just a conversation about your setup. No pitch.
          </p>
        </div>
        <LeadCaptureForm />
      </Section>

      {/* ──── 12. FAQ — Remove objections ──── */}
      <Section theme="lightGray" id="faq" reveal>
        <div className="text-center mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f]">
            Common questions. Straight answers.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#1d1d1f]/10">
          {[
            {
              q: "Why only 18 builds a year?",
              a: "Because we're not a factory. Same hands design it, wire it, and test it. Every board gets the full treatment. That's how we can stand behind everything we ship. We're down to the last 2 spots for this year.",
            },
            {
              q: "How much does a custom build cost?",
              a: "Builds start at $1,999 USD and go up depending on complexity. Every rig is different, so every quote is different. The consultation is free and you'll get a straight number. No surprises.",
            },
            {
              q: "What is Tone Tutoring?",
              a: "An hour on video with Jacob. Your whole signal chain, amp settings, effects order, noise issues. You walk away knowing exactly what your rig needs. $99 USD. Most guys wish they'd done it years ago.",
            },
            {
              q: "How long does a build take?",
              a: "4 to 8 weeks, depending on complexity and parts. Got a tour date? We do rush builds. Just tell us when you need it.",
            },
            {
              q: "Do I need to ship my board to you?",
              a: "Most guys ship their pedals to us in Houston. We'll send a label and walk you through packing. Tone Tutoring is all remote, just a video call.",
            },
            {
              q: "What if something goes wrong after the build?",
              a: "Call us. We stand behind everything we build. Had a question six months later? You'll get a response the same day. We're not going to leave you hanging.",
            },
            {
              q: "Do you build MIDI switching rigs?",
              a: "All day long. MIDI-controlled rigs, loop switchers, preset routing. That's actually where things get really fun for us. Some of our best builds are complex switching systems.",
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
            2 spots left. That&apos;s it.
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg mb-10 max-w-xl mx-auto">
            You&apos;ve spent thousands on gear. Let&apos;s make sure it actually
            sounds like it. Tell us what you play and what&apos;s bugging you.
            We&apos;ll tell you exactly what we&apos;d do.
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
              Fix Your Tone &mdash; $99
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
