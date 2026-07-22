import Link from 'next/link';
import Image from 'next/image';
import Section from '@/components/Section';
import BuildTimeline from '@/components/BuildTimeline';

/* ---- Inline FAQ Schema for this page ---- */
const customBuildsFAQs = [
  {
    q: 'How much does a custom pedalboard build cost?',
    a: 'Builds start from $1,999 USD and scale with complexity. Price depends on board size, number of pedals, power requirements, MIDI integration, and cable routing. Every build is quoted individually after your free consultation.',
  },
  {
    q: 'How long does a custom pedalboard build take?',
    a: 'Most builds ship in 4–8 weeks depending on complexity and parts sourcing. If you have a tour date or deadline, let us know — we do rush builds.',
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
    a: 'Yes. Every build includes ongoing support. If something breaks, if you want to swap a pedal, or if you need advice down the road — we are a phone call away.',
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
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ---- Page ---- */
export default function CustomBuildsPage() {
  return (
    <>
      <CustomBuildsFAQSchema />

      {/* -- 1. HERO -- */}
      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-screen flex items-end justify-center bg-black trd-aurora-intense">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source
              src="https://cdn.shopify.com/videos/c/vp/f12872e61445487b86f0ae5df85ba09b/f12872e61445487b86f0ae5df85ba09b.HD-1080p-7.2Mbps-78086312.mp4"
              type="video/mp4"
            />
          </video>

          <div className="relative z-10 max-w-[1080px] mx-auto px-6 pb-24 pt-40 w-full text-center">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-6">
              Custom Pedalboard Builds &bull; Houston, TX &bull; Ships Nationwide
            </p>
            <h1 className="trd-hero-headline text-[#f5f5f7] mb-6">
              Your rig, built from scratch.
              <br />
              <span className="trd-gradient-text">Hand-wired. Road-tested. Bulletproof.</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto mb-12">
              We design and build custom pedalboards for guitarists who need a rig that works every single night.
              500+ builds. 17 years at the bench. Every connection hand-soldered.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <Link
                href="/book"
                className="trd-cta-gradient trd-glow-pulse inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
              >
                Book a Free Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/gallery"
                className="inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg border-2 border-white/20 text-white hover:border-white/50 hover:bg-white/[0.06] transition-all duration-300"
              >
                See Our Work
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
                <p className="text-sm text-[#f5f5f7]/50 mt-1">years experience</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold trd-gradient-text-warm">4–8 wk</p>
                <p className="text-sm text-[#f5f5f7]/50 mt-1">typical turnaround</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="trd-divider-dark-to-light" />

      {/* -- 2. WHAT'S INCLUDED -- */}
      <Section theme="light" id="whats-included" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">What You Get</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Every build. Every time. <span className="trd-gradient-text">No shortcuts.</span>
          </h2>
          <p className="text-lg text-[#1d1d1f]/60 max-w-2xl mx-auto">
            A Rig Doctor build isn&apos;t a pedalboard with cables plugged in. It&apos;s an engineered system designed to eliminate noise, survive the road, and make your signal chain work the way it should.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: 'M13 10V3L4 14h7v7l9-11h-7z',
              title: 'Fully Isolated Power',
              desc: 'Every pedal gets clean, isolated power. No shared grounds, no noise bleed, no hum. We design the power layout specific to your pedals\' draw requirements.',
            },
            {
              icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
              title: 'Hand-Soldered Connections',
              desc: 'Every single connection is hand-soldered with premium components. No patch cables daisy-chained together. No weak points. Every joint is inspected.',
            },
            {
              icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3',
              title: 'Engineered Signal Path',
              desc: 'We map your entire signal chain before we build. Pedal order, buffer placement, loop routing, and cable lengths are all planned for minimum signal loss and maximum tone.',
            },
            {
              icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
              title: 'Road-Tested Before It Ships',
              desc: 'Every board gets powered up, signal-tested, and stress-tested before it leaves the shop. We catch problems so you never have to deal with them on stage.',
            },
            {
              icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
              title: 'Lifetime Support',
              desc: 'Your build doesn\'t end when it ships. Need to swap a pedal? Add MIDI later? Something acting up? Call us. We\'re here.',
            },
            {
              icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
              title: 'Clean Cable Management',
              desc: 'Custom-cut cables, proper strain relief, clean routing that stays organized on the road. No spaghetti. No loose ends. Every cable has a purpose and a path.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-[#f5f5f7] rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-[#1d1d1f]/5 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-[#1d1d1f]/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">{item.title}</h3>
              <p className="text-[15px] text-[#1d1d1f]/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* -- 3. BUILD CATEGORIES -- */}
      <Section theme="lightGray" id="build-types" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">Build Categories</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            We build for how you <span className="trd-gradient-text">actually play.</span>
          </h2>
          <p className="text-lg text-[#1d1d1f]/60 max-w-2xl mx-auto">
            No two rigs are the same because no two players are. Your build is designed around your playing style, your gig demands, and your signal chain.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Touring Rigs',
              desc: 'Built to survive the road. Reinforced mounting, redundant power, quick-swap capability, and cable management that holds up night after night. For players who can\'t afford a bad show.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Javy_B.png?v=1773867365',
              alt: 'Custom touring pedalboard build by The Rig Doctor',
            },
            {
              title: 'Studio Boards',
              desc: 'Optimized for recording. Ultra-quiet signal chain, flexible routing for different sessions, and instant recall. When the red light is on, your tone needs to be ready.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/William_O._1.png?v=1773867364',
              alt: 'Custom studio pedalboard build',
            },
            {
              title: 'Worship Rigs',
              desc: 'Clean ambient tones, smooth gain staging, silent switching between presets. Built for worship players who need to go from pad swells to driven leads without touching a knob.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Josh_W.png?v=1773867364',
              alt: 'Custom worship pedalboard build',
            },
            {
              title: 'Home Player Boards',
              desc: 'You don\'t tour, but your tone still matters. Clean layout, proper power, no noise, and a board that makes you want to play more. Pro quality for your practice space.',
              image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Hunter_W._1.jpg?v=1774980806',
              alt: 'Custom home player pedalboard build',
            },
          ].map((cat) => (
            <div key={cat.title} className="group bg-white rounded-2xl overflow-hidden border border-black/[0.04] hover:border-black/[0.1] transition-colors">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-[#1d1d1f] mb-2">{cat.title}</h3>
                <p className="text-[15px] text-[#1d1d1f]/60 leading-relaxed">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="trd-divider-light-to-dark" />

      {/* -- 4. GALLERY STRIP -- */}
      <Section theme="dark" id="recent-builds" reveal>
        <div className="text-center mb-10">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">Recent Builds</p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-2">
            500+ rigs built. <span className="trd-gradient-text">One at a time.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg">
            Every board is different because every player is different.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {[
            { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Javy_B.png?v=1773867365', alt: 'Custom pedalboard build - touring rig' },
            { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/William_O._1.png?v=1773867364', alt: 'Custom pedalboard build - studio board' },
            { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Josh_W.png?v=1773867364', alt: 'Custom pedalboard build - worship rig' },
            { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D.png?v=1773867366', alt: 'Custom pedalboard build - MIDI integration' },
            { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Hunter_W._1.jpg?v=1774980806', alt: 'Custom pedalboard build - home player' },
            { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D._2.jpg?v=1777143325', alt: 'Custom pedalboard build - cable management detail' },
          ].map((img, idx) => (
            <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden group bg-[#0a0a0a]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/gallery" className="text-[#34d399] hover:text-[#10B981] transition-colors font-medium text-sm">
            View full gallery &rarr;
          </Link>
        </div>
      </Section>

      <div className="trd-divider-dark-to-light" />

      {/* -- 5. THE PROCESS -- */}
      <Section theme="light" id="the-process" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">How It Works</p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Five steps from call to <span className="trd-gradient-text">stage-ready.</span>
          </h2>
          <p className="text-lg text-[#1d1d1f]/60 max-w-2xl mx-auto">
            No surprises. You know exactly what&apos;s happening at every stage of your build.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {[
            { step: '01', title: 'Free Consultation', desc: '30-minute video call. Tell us what you play, show us your current rig, and tell us what’s driving you nuts. We’ll map out a plan.' },
            { step: '02', title: 'Design & Planning', desc: 'We create your wiring diagram, power layout, signal chain order, and component list. Every detail documented before we pick up a soldering iron.' },
            { step: '03', title: 'Ship Your Pedals', desc: 'We send a prepaid label. Pack your pedals, ship them to us. We photograph everything on arrival and confirm the build spec.' },
            { step: '04', title: 'The Build', desc: 'Hand-soldered connections, custom-cut cables, isolated power, engineered signal path. Every board is road-tested before it ships.' },
            { step: '05', title: 'Play & Support', desc: 'Your rig ships back fully insured, ready to plug in. Ongoing support included — swap a pedal, add MIDI later, whatever you need.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#f5f5f7] flex items-center justify-center">
                <span className="text-lg font-bold trd-gradient-text">{item.step}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] mb-1">{item.title}</h3>
                <p className="text-[15px] text-[#1d1d1f]/60 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <BuildTimeline theme="light" />

      {/* -- 6. PRICING -- */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">Pricing</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-6">
            Builds start from <span className="trd-gradient-text">$1,999 USD</span>
          </h2>
          <p className="text-lg text-[#f5f5f7]/60 mb-4 max-w-xl mx-auto">
            Every rig is different, so every quote is different. Price depends on:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10 max-w-lg mx-auto">
            {['Board size', 'Pedal count', 'Power needs', 'MIDI complexity', 'Cable routing', 'Rush timeline'].map((factor) => (
              <div key={factor} className="flex items-center gap-2">
                <span className="text-[#10B981] text-sm">&bull;</span>
                <span className="text-sm text-[#f5f5f7]/70">{factor}</span>
              </div>
            ))}
          </div>
          <p className="text-[#f5f5f7]/40 text-sm mb-10">
            Your consultation is free. We give you a straight quote — no surprises, no hidden fees.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/book"
              className="trd-cta-gradient trd-glow-pulse inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/tone-tutoring"
              className="inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg border-2 border-white/20 text-white hover:border-white/50 hover:bg-white/[0.06] transition-all duration-300"
            >
              Just Need Advice? $99
            </Link>
          </div>
        </div>
      </section>

      {/* -- 7. FAQ -- */}
      <Section theme="lightGray" id="faq" reveal>
        <div className="text-center mb-12">
          <h2 className="trd-section-headline text-[#1d1d1f]">
            Common questions about custom builds.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-[#1d1d1f]/10">
          {customBuildsFAQs.map((item, idx) => (
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

      {/* -- 8. CLOSING CTA -- */}
      <section className="relative overflow-hidden bg-[#1d1d1f] py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(0,113,227,0.15)_0%,transparent_55%),radial-gradient(ellipse_at_70%_50%,rgba(191,90,242,0.12)_0%,transparent_55%),radial-gradient(ellipse_at_50%_80%,rgba(255,55,95,0.06)_0%,transparent_50%)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            Your tone is worth getting right.
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg mb-10 max-w-xl mx-auto">
            Stop fighting your rig. Book a free consultation and let&apos;s build something that actually works.
          </p>
          <Link
            href="/book"
            className="trd-cta-gradient trd-glow-pulse inline-flex items-center justify-center gap-2 font-semibold px-10 py-4 rounded-full text-lg"
          >
            Book a Free Consultation
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>
    </>
  );
}
