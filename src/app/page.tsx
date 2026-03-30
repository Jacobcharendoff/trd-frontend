'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import Section from '@/components/Section';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import BeforeAfter from '@/components/BeforeAfter';
import ComparisonTable from '@/components/ComparisonTable';

export default function Home() {
  const galleryRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* ──── HERO SECTION (dark — cinematic first impression) ──── */}
      <div className="relative w-full bg-black overflow-hidden">
        <div className="relative trd-aurora min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none" />
          <div className="relative z-10 max-w-[1080px] mx-auto px-6 pt-32 pb-20 w-full">
            <div className="mb-8 text-center">
              <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight text-[#f5f5f7] mb-6">
                Your tone.{' '}
                <span className="trd-gradient-text">Dialed in.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#f5f5f7]/80 max-w-2xl mx-auto leading-relaxed mb-8">
                We build pedalboards that actually sound like you. Tell us how you play, what you&apos;re chasing, and we&apos;ll handle the rest — from signal chain to soldered connection.
              </p>
              <div className="flex gap-4 justify-center mb-16">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-8 py-4 rounded-full transition-colors duration-200"
                >
                  Book a Free Consultation
                </Link>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 text-center pt-12 border-t border-white/10">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#F5A623] mb-2">17+</p>
                <p className="text-sm text-[#f5f5f7]/60">Years Experience</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#F5A623] mb-2">200+</p>
                <p className="text-sm text-[#f5f5f7]/60">Rigs Built</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-[#F5A623] mb-2">50+</p>
                <p className="text-sm text-[#f5f5f7]/60">Touring Artists</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──── REVIEWS (light gray — social proof carousel) ──── */}
      <Section theme="lightGray" id="reviews" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            Don&apos;t take our word for it.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Hear it from the players themselves</p>
        </div>
        <TestimonialCarousel />
      </Section>

      {/* ──── PROCESS (white — clean, informational) ──── */}
      <Section theme="light" id="process" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            How we build yours.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Four steps. Zero guesswork.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: '1', title: 'We Talk', desc: "Hop on a call — tell us what you play, what bugs you about your current setup, and where you want to go. No sales pitch." },
            { num: '2', title: 'We Design', desc: "We map out your signal chain, power, layout, and switching — every detail tailored to how you actually play." },
            { num: '3', title: 'We Build', desc: "Hand-wired, stress-tested, optimized. Every cable soldered, every connection verified before it leaves the bench." },
            { num: '4', title: 'You Play', desc: "Ships to your door, gig-ready. And if anything ever needs attention — lifetime support, on us." },
          ].map((step) => (
            <div key={step.num} className="bg-[#f5f5f7] rounded-2xl p-8 flex flex-col">
              <div className="text-4xl font-bold trd-gradient-text mb-4">{step.num}</div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3">{step.title}</h3>
              <p className="text-[#1d1d1f]/60 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ──── GALLERY (dark accent — photos pop on dark) ──── */}
      <Section theme="dark" id="gallery" noPadding reveal>
        <div className="py-20 md:py-[120px]">
          <div className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-2">
              Off the bench.
            </h2>
            <p className="text-[#f5f5f7]/60 text-lg">Recent builds from the shop</p>
          </div>

          <div className="relative -mx-6">
            <div
              ref={galleryRef}
              className="flex gap-4 overflow-x-auto px-6 pb-6 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
                'MikeStipanovLayout1.png',
                'Jeremy_B.png',
                'Untitled_design_11.png',
                'Rig_Build_27.png',
              ].map((filename, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-80 sm:w-96 h-64 sm:h-80 rounded-2xl overflow-hidden snap-center bg-[#1a1a1a]"
                >
                  <Image
                    src={`https://cdn.shopify.com/s/files/1/0528/3171/5486/files/${filename}`}
                    alt={`Custom rig build ${idx + 1}`}
                    width={400}
                    height={320}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll('left')}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
              aria-label="Scroll gallery left"
            >
              &#8592;
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
              aria-label="Scroll gallery right"
            >
              &#8594;
            </button>
          </div>
        </div>
      </Section>

      {/* ──── BEFORE / AFTER (light — transformation proof) ──── */}
      <Section theme="light" id="transformations" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            The difference is night and day.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Real rigs. Real transformations.</p>
        </div>
        <BeforeAfter />
      </Section>

      {/* ──── COMPARISON TABLE (lightGray — conversion driver) ──── */}
      <Section theme="lightGray" id="compare" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
            DIY or done right?
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">Let&apos;s be honest about what you&apos;re getting into.</p>
        </div>
        <ComparisonTable />
      </Section>

      {/* ──── TONE TUTORING CTA (white — soft cross-sell) ──── */}
      <Section theme="light" id="tone-tutoring-cta" reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-4">
              Not sure what you need yet?
            </h2>
            <p className="text-lg text-[#1d1d1f]/60 leading-relaxed mb-6">
              Tone Tutoring is a one-on-one session where we dig into your rig, your playing, and figure out what&apos;s holding your tone back. Think of it as a tone checkup before committing to a full build.
            </p>
            <Link
              href="/tone-tutoring"
              className="inline-flex items-center gap-2 bg-[#1d1d1f] hover:bg-[#1d1d1f]/90 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200"
            >
              Learn About Tone Tutoring
            </Link>
          </div>
          <div className="relative h-80 bg-gradient-to-br from-[#F5A623]/10 to-[#10B981]/10 rounded-2xl flex items-center justify-center border border-[#F5A623]/20">
            <div className="text-center">
              <p className="text-5xl font-bold trd-gradient-text mb-2">$99.99</p>
              <p className="text-[#1d1d1f]/40 text-lg">per session</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── CLOSING CTA (dark accent — strong finish) ──── */}
      <Section theme="dark" id="closing-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f7] mb-4">
            Your tone deserves <span className="trd-gradient-text">better.</span>
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto mb-2">
            Life&apos;s too short for a board that fights you on stage. Let&apos;s build one that works.
          </p>
          <p className="text-sm text-[#f5f5f7]/40">
            Trusted by Isaiah Sharkey, Tosin Abasi, and 50+ touring artists worldwide.
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
