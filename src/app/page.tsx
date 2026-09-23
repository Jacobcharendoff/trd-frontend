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
              You didn&apos;t spend thousands on gear
              <br />
              <span className="trd-gradient-text">to zip-tie it together.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-12">
              Hand-wired pedalboards built by guys who actually play.
              We&apos;ve done over 300 of these in 17 years and we&apos;ve got
              2 spots left before we close out the year.
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
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Before / After</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Same pedals. Same amp. Same player. <span className="trd-gradient-text">Look at the difference.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-2xl mx-auto">
            Nothing changed except who wired it. Drag the slider.
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
            We do 18 builds a year. That&apos;s it. Same hands wire every board
            from start to finish because that&apos;s the only way we can
            guarantee the work. We&apos;re almost done for the year.
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
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">From Our Players</p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-2">
            Three tours. Zero failures. <span className="trd-gradient-text">That&apos;s it.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            We build for guys who can&apos;t have a board go down mid-set.
            Session players, touring musicians, worship leaders who play
            four services a weekend. One of their techs looked at the underside
            and said &quot;whoever did this actually gives a damn.&quot;
          </p>
        </div>
        <TestimonialCarousel theme="dark" />
      </Section>

      {/* ──── 5. HOW WE BUILD — Cinema section ──── */}
      <CinemaSection />

      {/* ──── 5.5. MEET THE BUILDERS — Mason & Vince ──── */}
      <Section theme="lightGray" id="builders" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Who&apos;s Building Your Rig</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Two guys. <span className="trd-gradient-text">300+ builds between them.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-2xl mx-auto">
            Your board doesn&apos;t get handed off to some junior tech. These are the only two people who touch your rig.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mason */}
          <div className="bg-white rounded-2xl overflow-hidden border border-black/[0.04] hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
              <Image
                src="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D.png?v=1773867366"
                alt="Mason Marangella working on a rig build"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">Mason Marangella</h3>
                <p className="text-white/60 text-sm">Founder, Vertex Effects</p>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[#1d1d1f]/60 text-[15px] leading-relaxed mb-4">
                17+ years at the bench. Mason founded Vertex Effects Systems back in 2009 and built the &quot;Vertex by Gator&quot; pedalboard series you&apos;ve probably seen in shops. He&apos;s the reason people started calling this whole thing &quot;The Rig Doctor.&quot;
              </p>
              <p className="text-[#1d1d1f]/60 text-[15px] leading-relaxed mb-6">
                He&apos;s built rigs for Andy Timmons, Oz Noy, Michael Landau, Kirk Fletcher, Josh Smith, and Matt Schofield. Not endorsement deals. Real builds that went on real tours.
              </p>
              <div className="flex flex-wrap gap-2">
                {['17+ Years', 'Vertex Effects', 'Andy Timmons', 'Michael Landau', 'Josh Smith'].map((tag) => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-[#f5f5f7] text-[#1d1d1f]/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vince */}
          <div className="bg-white rounded-2xl overflow-hidden border border-black/[0.04] hover:shadow-lg transition-shadow duration-300">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#0a0a0a]">
              <Image
                src="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D._2.jpg?v=1777143325"
                alt="Vince DiGioia in the studio"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white">Vince DiGioia</h3>
                <p className="text-white/60 text-sm">Engineer, Producer, Rig Builder</p>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[#1d1d1f]/60 text-[15px] leading-relaxed mb-4">
                15+ years building rigs, soldering cables, and troubleshooting bad tone. Vince is a player, studio owner, and audio engineer out of Houston and Austin. He plays lead guitar with 35 Drive and has toured with Roger Creager, Josh Abbott Band, Reckless Kelly, and Pat Green.
              </p>
              <p className="text-[#1d1d1f]/60 text-[15px] leading-relaxed mb-6">
                He knows what a board needs to survive a 200-show year because he&apos;s lived it. When your rig shows up at TRD, Vince is one of the two sets of hands on it. Nobody else.
              </p>
              <div className="flex flex-wrap gap-2">
                {['15+ Years', 'Studio Owner', '35 Drive', 'Roger Creager', 'Josh Abbott Band'].map((tag) => (
                  <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-[#f5f5f7] text-[#1d1d1f]/50">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-[#1d1d1f]/40 text-sm mb-6">
            Two working musicians who build for working musicians. That&apos;s the whole pitch.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 transition-colors text-sm"
          >
            Talk to Us About Your Rig
          </Link>
        </div>
      </Section>

      {/* ──── 6. BUILD GALLERY — The gear porn ──── */}
      <Section theme="dark" id="gallery" reveal>
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">300+ Builds</p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-2">
            Flip it over. <span className="trd-gradient-text">Look at the wiring.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg max-w-2xl mx-auto">
            That&apos;s where you can tell. Color-coded cables, labeled jacks,
            every run cut to length so there&apos;s nothing bunched up underneath.
            This is the part most builders skip.
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
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Watch a Build</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Bare enclosure to road-ready in 60 seconds.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Hand-soldered joints, tested connections, cables cut to fit. Not cut to close-enough.</p>
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
            From rat&apos;s nest to <span className="trd-gradient-text">stage-ready.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-2xl mx-auto">
            Three steps. No mystery about what&apos;s happening or what it costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              number: '01',
              title: 'We Talk',
              desc: 'Tell us what you play and what’s bugging you. Maybe it’s a hum you can’t track down, or you’re tap-dancing between three pedals when you should be playing. We’ll go through your signal chain and figure out exactly what the board needs.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_S.png',
            },
            {
              number: '02',
              title: 'We Build',
              desc: 'Hand-soldered connections. Cables cut to fit, not cut to close-enough. Isolated power so your drive pedals aren’t picking up noise from your digital stuff. We road-test the whole thing before it ships. And yeah, flip it over and look at the wiring.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/John_A._1.png',
            },
            {
              number: '03',
              title: 'You Plug In',
              desc: 'Uncase it, plug in, and you’ll hear the difference before you finish your first chord. Dead quiet noise floor. Your band is going to think you bought a new amp. You didn’t. It’s just wired right now.',
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
            Builds start at <span className="trd-gradient-text font-bold">$1,999 USD</span>
          </p>
          <p className="text-[14px] text-[#1d1d1f]/40 mb-6">
            Every rig is different so every quote is different. The consultation is free, you get a real number, and there&apos;s nothing hidden.
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
            Let&apos;s just talk about your rig first.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            An hour on video with Jacob going through your whole signal chain.
            Amp settings, effects order, that weird hum that shows up when you
            kick on your drive. Most guys walk away knowing exactly what to
            change. Some realize they need a full build. Either way you&apos;ll
            know where you stand.
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

      {/* ──── 9.5. EMAIL CAPTURE — 20% off Tone Tutoring ──── */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-16 sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%)]" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/30 mb-4">Exclusive Offer</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-[#f5f5f7] tracking-tight mb-3">
            Get <span className="trd-gradient-text">20% off</span> your first Tone Tutoring session.
          </h3>
          <p className="text-[#f5f5f7]/50 text-base mb-8 max-w-lg mx-auto">
            Drop your email and we&apos;ll send you a code for $20 off your first session.
            One hour with Jacob going through your whole signal chain. No strings attached.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            action="#"
            data-hubspot-form="tone-tutoring-discount"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/15 text-white placeholder:text-white/30 focus:outline-none focus:border-[#0071E3] focus:ring-1 focus:ring-[#0071E3] text-sm"
            />
            <button
              type="submit"
              className="trd-cta-gradient px-8 py-3.5 rounded-full font-semibold text-sm whitespace-nowrap"
            >
              Send My Code
            </button>
          </form>
          <p className="text-[#f5f5f7]/25 text-xs mt-4">No spam. Just the discount code and maybe a rig tip or two.</p>
        </div>
      </section>

      {/* ──── 10. REVIEWS — Volume of social proof ──── */}
      <Section theme="lightGray" id="customer-reviews" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">What Players Are Saying</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Don&apos;t take our word for it.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">These guys came to us with the same stuff you&apos;re dealing with. Read what they said after.</p>
        </div>
        <ReviewsMarquee />
      </Section>

      {/* ──── 11. LEAD CAPTURE — Join the waitlist ──── */}
      <Section theme="light" id="get-in-touch" reveal>
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Get In Touch</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-2">
            Tell us what&apos;s going on with your rig.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-xl mx-auto">
            2 spots left this year. Drop your info and we&apos;ll get back to you
            within a day. Just a conversation. No pitch, no pressure.
          </p>
        </div>
        <LeadCaptureForm />
      </Section>

      {/* ──── 12. FAQ — Remove objections ──── */}
      <Section theme="lightGray" id="faq" reveal>
        <div className="text-center mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f]">
            Questions we get a lot.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#1d1d1f]/10">
          {[
            {
              q: "Why only 18 builds a year?",
              a: "Same hands wire every board from start to finish. That's the only way we can guarantee the work. We could take on more, but then we'd be cutting corners, and that's not something we're willing to do. We're down to the last 2 spots for this year.",
            },
            {
              q: "How much does a custom build cost?",
              a: "Starts at $1,999 USD and goes up depending on how complex the rig is. MIDI switching, loop systems, that kind of thing adds to it. The consultation is free and you'll get a real number up front. No surprises after the fact.",
            },
            {
              q: "What is Tone Tutoring?",
              a: "An hour on video with Jacob going through your whole signal chain. Your amp settings, your effects order, that noise you can't figure out. $99 USD. A lot of guys tell us they wish they'd done it years ago.",
            },
            {
              q: "How long does a build take?",
              a: "Usually 4 to 8 weeks depending on what we're building and whether we're waiting on any parts. If you've got a tour date coming up, let us know and we'll make it work.",
            },
            {
              q: "Do I need to ship my pedals to you?",
              a: "Yeah, most guys ship everything to us in Houston. We'll send you a label and walk you through how to pack it so nothing gets damaged. Tone Tutoring is all remote though, just a video call.",
            },
            {
              q: "What if something goes wrong after?",
              a: "Call us. Seriously. We've had guys reach out six months, a year later with a question and we get back to them the same day. We're not going to build you a board and then disappear.",
            },
            {
              q: "Do you do MIDI and switching rigs?",
              a: "That's actually where things get fun for us. MIDI-controlled rigs, loop switchers, preset routing, the whole deal. Some of our best work is on complex switching systems where everything needs to talk to everything else.",
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%),radial_gradient(ellipse_at_50%_80%,rgba(191,90,242,0.06)_0%,transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            2 spots left. That&apos;s it.
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg mb-10 max-w-xl mx-auto">
            You already own the gear. Let us make it sound like you thought it
            would when you bought it. Tell us what you play and what&apos;s
            not working. We&apos;ll tell you what we&apos;d do.
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
