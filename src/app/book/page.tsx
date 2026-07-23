'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import Section from '@/components/Section';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import BeforeAfter from '@/components/BeforeAfter';

/* ──── Hero with Calendar ──── */
function Hero() {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.charset = 'utf-8';
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Dark hero — cinematic first impression */}
      <div className="relative bg-black pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-full">
                <span className="inline-block w-2 h-2 rounded-full bg-[#0071E3]" />
                <span className="text-[13px] text-white/[0.85]">Custom builds &middot; Houston, TX</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
                {"Let's build "}
                <span className="trd-gradient-text">something that sounds like you.</span>
              </h1>

              <p className="text-[18px] text-white/[0.75] leading-relaxed max-w-md">
                {"Free 30-minute call. Tell us what you play, what your rig looks like, and what's driving you nuts. We'll tell you what we'd do about it."}
              </p>

              <div className="flex flex-wrap gap-6 py-4">
                {[
                  { icon: 'M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: '#0071E3', label: '30 minutes' },
                  { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', color: '#BF5AF2', label: 'Google Meet' },
                  { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: '#0071E3', label: 'Complimentary' },
                ].map((meta) => (
                  <div key={meta.label} className="flex items-center gap-3">
                    <svg className="w-5 h-5" style={{ color: meta.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={meta.icon} />
                    </svg>
                    <span className="text-[14px] text-white/[0.75]">{meta.label}</span>
                  </div>
                ))}
              </div>

              <p className="text-[14px] text-white/[0.65]">Most builds ship in 4–8 weeks from approval.</p>

              {/* Agenda card */}
              <div className="trd-glass-dark p-6 space-y-4">
                <h3 className="text-[15px] font-semibold text-white">{"What we'll dig into"}</h3>
                <ul className="space-y-3">
                  {["What you play and the tone you're chasing", "Your current rig — what's working, what's not", "A custom build plan with timeline and pricing"].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#0071E3] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[14px] text-white/[0.85]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[14px] text-white/[0.65]">
                Looking for signal chain feedback or a one-off consultation?{' '}
                <Link href="/tone-tutoring" className="text-[#0071E3] hover:text-[#005BB5] transition-colors font-medium">
                  Check out Tone Tutoring &rarr;
                </Link>
              </p>
            </div>

            {/* Right: Calendar (desktop) */}
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white shadow-2xl">
                <div ref={calendarRef} className="meetings-iframe-container" data-src="https://meetings-na2.hubspot.com/trd/rig-build-consultation?embed=true" />
              </div>
            </div>
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden mt-12">
            <button onClick={scrollToCalendar} className="w-full py-4 px-6 bg-[#0071E3] text-white font-semibold rounded-full hover:bg-[#005BB5] transition-colors text-[16px]">
              Book your free consultation
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Calendar */}
      <div className="lg:hidden bg-white py-12 px-6">
        <div className="max-w-[1080px] mx-auto">
          <div ref={calendarRef} className="meetings-iframe-container rounded-2xl overflow-hidden border border-black/[0.06] shadow-lg" data-src="https://meetings-na2.hubspot.com/trd/rig-build-consultation?embed=true" />
        </div>
      </div>
    </>
  );
}

/* ──── Visual Process Section ──── */
function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'We Map It Out',
      description: 'Your specs, wiring diagram, signal chain order, component list — everything documented so nothing gets lost. We photograph your current board and plan the rebuild piece by piece.',
      image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_S.png',
      imageAlt: 'Detailed rig planning and wiring diagram',
    },
    {
      number: '02',
      title: 'We Build It',
      description: 'Every connection hand-soldered. Every cable custom-cut. Isolated power, engineered signal path, cable management that stays clean on the road. We road-test it before it ships.',
      image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/John_A._1.png',
      imageAlt: 'Hand-soldered pedalboard build in progress',
    },
    {
      number: '03',
      title: 'You Play It',
      description: 'Board arrives road-ready. Plug in, hit your presets, and hear the difference. Dead quiet. Zero signal loss. And if anything ever goes wrong — we\'re a phone call away.',
      image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Saxon_W..jpg',
      imageAlt: 'Finished custom pedalboard ready to play',
    },
  ];

  return (
    <Section theme="light" id="process" reveal>
      <div className="text-center mb-16">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">
          The Process
        </p>
        <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
          From call to <span className="trd-gradient-text">stage-ready.</span>
        </h2>
        <p className="text-[#1d1d1f]/50 text-lg max-w-2xl mx-auto">
          Three steps. No surprises. You know exactly what&apos;s happening at every stage.
        </p>
      </div>

      <div className="space-y-20">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
              idx % 2 === 1 ? 'lg:[direction:rtl]' : ''
            }`}
          >
            {/* Image */}
            <div className={`${idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0a0a0a] shadow-xl group">
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Step number overlay */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold tracking-widest px-3 py-1.5 rounded-full">
                  STEP {step.number}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`space-y-6 ${idx % 2 === 1 ? 'lg:[direction:ltr]' : ''}`}>
              <div className="text-6xl sm:text-7xl font-bold trd-gradient-text opacity-30">
                {step.number}
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f] -mt-4">
                {step.title}
              </h3>
              <p className="text-[16px] text-[#1d1d1f]/60 leading-relaxed max-w-md">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing note */}
      <div className="text-center mt-20 space-y-4">
        <p className="text-[18px] text-[#1d1d1f] font-medium">
          Custom builds typically start from{' '}
          <span className="trd-gradient-text font-bold">$1,999 USD</span>
        </p>
        <p className="text-[14px] text-[#1d1d1f]/40">
          Every rig is different. Your consultation is free — we give you a straight quote.
        </p>
      </div>
    </Section>
  );
}

/* ──── Before/After Transformation ──── */
function TransformationSection() {
  return (
    <>
      <Section theme="dark" id="before-after" reveal>
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">
            The Difference
          </p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-2">
            Same pedals. <span className="trd-gradient-text">Completely different rig.</span>
          </h2>
          <p className="text-[#f5f5f7]/50 text-lg">
            Drag the slider and see what changes when we get our hands on it.
          </p>
        </div>
        <BeforeAfter theme="dark" />
      </Section>
    </>
  );
}

/* ──── Build Gallery Strip ──── */
function GalleryStrip() {
  const images = [
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Javy_B.png?v=1773867365', alt: 'Javy B. build' },
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/William_O._1.png?v=1773867364', alt: 'William O. build' },
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Josh_W.png?v=1773867364', alt: 'Josh W. build' },
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D.png?v=1773867366', alt: 'Vince D. build' },
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Hunter_W._1.jpg?v=1774980806', alt: 'Hunter W. build' },
    { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_D._2.jpg?v=1777143325', alt: 'Vince D. board' },
  ];

  return (
    <Section theme="lightGray" id="recent-builds" reveal>
      <div className="text-center mb-10">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">
          Recent Builds
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f]">
          Every board tells a story.
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {images.map((img, idx) => (
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
    </Section>
  );
}

/* ──── Trusted By ──── */
function TrustedBy() {
  return (
    <>
      <Section theme="dark" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">On the Road</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-2">
            Trusted by players who <span className="trd-gradient-text">can&apos;t afford a bad night.</span>
          </h2>
        </div>
        <TestimonialCarousel theme="dark" />
      </Section>
    </>
  );
}

/* ──── Main Page ──── */
export default function BookPage() {
  return (
    <>
      <Hero />
      <ProcessSection />
      <TransformationSection />
      <GalleryStrip />
      <TrustedBy />
    </>
  );
}
