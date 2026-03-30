'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import Section from '@/components/Section';

export default function Home() {
  const [isScrolling, setIsScrolling] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Gallery scroll controls
  const scroll = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = 400;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* ──── HERO SECTION ──── */}
      <div className="relative w-full bg-black overflow-hidden">
        <div className="relative trd-aurora min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none" />

          <div className="relative z-10 max-w-[1080px] mx-auto px-6 pt-32 pb-20 w-full">
            {/* Main Headline */}
            <div className="mb-8 text-center">
              <h1 className="text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[5.5rem] font-700 leading-[1.1] tracking-tight text-[#f5f5f7] mb-6">
                Your tone.{' '}
                <span className="trd-gradient-text">Engineered.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#f5f5f7]/80 max-w-2xl mx-auto leading-relaxed mb-8">
                Custom pedalboard builds tailored to your playing style, signal chain, and sonic vision. From weekend warriors to touring professionals.
              </p>

              {/* CTA Button */}
              <div className="flex gap-4 justify-center mb-16">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-600 px-8 py-4 rounded-lg transition-colors duration-200"
                >
                  Book a Free Consultation
                </Link>
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 text-center pt-12 border-t border-white/10">
              <div>
                <p className="text-2xl sm:text-3xl font-700 text-[#F5A623] mb-2">17+</p>
                <p className="text-sm text-[#f5f5f7]/60">Years Experience</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-2xl sm:text-3xl font-700 text-[#F5A623] mb-2">200+</p>
                <p className="text-sm text-[#f5f5f7]/60">Rigs Built</p>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/10" />
              <div>
                <p className="text-2xl sm:text-3xl font-700 text-[#F5A623] mb-2">50+</p>
                <p className="text-sm text-[#f5f5f7]/60">Touring Artists</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ──── REVIEWS SLIDER ──── */}
      <Section theme="dark" id="reviews" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#f5f5f7] mb-2">
            Loved by guitarists
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">Real feedback from real builds</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="trd-glass-dark p-8 hover:bg-white/[0.06] transition-colors duration-300">
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#F5A623]">★</span>
              ))}
            </div>
            <p className="text-[#f5f5f7] leading-relaxed mb-6">
              "The pedalboard Jacob designed completely transformed my live rig. It's like he read my mind about what I needed. Best investment I've made in my tone."
            </p>
            <div>
              <p className="font-600 text-[#f5f5f7]">Isaiah Sharkey</p>
              <p className="text-sm text-[#f5f5f7]/60">Session & Touring Guitarist</p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="trd-glass-dark p-8 hover:bg-white/[0.06] transition-colors duration-300">
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#F5A623]">★</span>
              ))}
            </div>
            <p className="text-[#f5f5f7] leading-relaxed mb-6">
              "I've worked with Jacob multiple times. He understands signal flow, tone shaping, and durability. Your board won't fail you on tour."
            </p>
            <div>
              <p className="font-600 text-[#f5f5f7]">Tosin Abasi</p>
              <p className="text-sm text-[#f5f5f7]/60">Professional Guitarist</p>
            </div>
          </div>

          {/* Review 3 */}
          <div className="trd-glass-dark p-8 hover:bg-white/[0.06] transition-colors duration-300">
            <div className="mb-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#F5A623]">★</span>
              ))}
            </div>
            <p className="text-[#f5f5f7] leading-relaxed mb-6">
              "From consultation to delivery, the whole experience was professional and smooth. My new board is exactly what I envisioned."
            </p>
            <div>
              <p className="font-600 text-[#f5f5f7]">Client</p>
              <p className="text-sm text-[#f5f5f7]/60">Home Player & Hobbyist</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── PROCESS SECTION ──── */}
      <Section theme="light" id="process" reveal>
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#1d1d1f] mb-2">
            How it works
          </h2>
          <p className="text-[#1d1d1f]/60 text-lg">
            Four steps from consultation to gig-ready
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Step 1 */}
          <div className="trd-glass-light p-8 flex flex-col">
            <div className="text-4xl font-700 text-[#F5A623] mb-4">1</div>
            <h3 className="text-xl font-600 text-[#1d1d1f] mb-3">Consultation</h3>
            <p className="text-[#1d1d1f]/60 leading-relaxed">
              We talk tone, budget, and your playing style. No pressure, no upsell—just honest advice.
            </p>
          </div>

          {/* Step 2 */}
          <div className="trd-glass-light p-8 flex flex-col">
            <div className="text-4xl font-700 text-[#F5A623] mb-4">2</div>
            <h3 className="text-xl font-600 text-[#1d1d1f] mb-3">Design</h3>
            <p className="text-[#1d1d1f]/60 leading-relaxed">
              Custom layout, signal chain mapping, and power distribution planned for your exact rig.
            </p>
          </div>

          {/* Step 3 */}
          <div className="trd-glass-light p-8 flex flex-col">
            <div className="text-4xl font-700 text-[#F5A623] mb-4">3</div>
            <h3 className="text-xl font-600 text-[#1d1d1f] mb-3">Build</h3>
            <p className="text-[#1d1d1f]/60 leading-relaxed">
              Hand-wired, tested, and optimized. Every cable soldered. Every connection verified.
            </p>
          </div>

          {/* Step 4 */}
          <div className="trd-glass-light p-8 flex flex-col">
            <div className="text-4xl font-700 text-[#F5A623] mb-4">4</div>
            <h3 className="text-xl font-600 text-[#1d1d1f] mb-3">Ship & Play</h3>
            <p className="text-[#1d1d1f]/60 leading-relaxed">
              Carefully packaged and shipped. Ready to gig. Lifetime support included.
            </p>
          </div>
        </div>
      </Section>

      {/* ──── GALLERY SECTION ──── */}
      <Section theme="dark" id="gallery" noPadding reveal>
        <div className="px-6 mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#f5f5f7] mb-2">
            Recent builds
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg">
            Scroll to see custom rigs we've built this year
          </p>
        </div>

        <div className="relative">
          <div
            ref={galleryRef}
            className="flex gap-4 overflow-x-auto px-6 pb-6 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Gallery Images */}
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

          {/* Scroll Controls */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors duration-200 ml-2 sm:ml-6"
            aria-label="Scroll gallery left"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors duration-200 mr-2 sm:mr-6"
            aria-label="Scroll gallery right"
          >
            →
          </button>
        </div>

        <style>{`
          div[ref] {
            -webkit-overflow-scrolling: touch;
          }
          div[ref]::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </Section>

      {/* ──── TONE TUTORING CTA ──── */}
      <Section theme="light" id="tone-tutoring-cta" reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#1d1d1f] mb-4">
              Not ready for a full build?
            </h2>
            <p className="text-lg text-[#1d1d1f]/60 leading-relaxed mb-6">
              Check out Tone Tutoring—our structured program to help you discover and develop your signature tone. Perfect for players who want to level up without a custom build.
            </p>
            <Link
              href="/tone-tutoring"
              className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-600 px-8 py-4 rounded-lg transition-colors duration-200"
            >
              Learn About Tone Tutoring
            </Link>
          </div>

          <div className="relative h-80 bg-gradient-to-br from-[#F5A623]/20 to-[#10B981]/20 rounded-2xl flex items-center justify-center border border-[#F5A623]/20">
            <div className="text-center">
              <p className="text-[#1d1d1f]/40 text-lg">Discover Your Tone</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ──── TRUST / CLOSING CTA ──── */}
      <Section theme="dark" id="closing-cta" reveal className="text-center">
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-700 tracking-tight text-[#f5f5f7] mb-4">
            Trusted by <span className="trd-gradient-text">professionals</span>
          </h2>
          <p className="text-[#f5f5f7]/60 text-lg max-w-2xl mx-auto mb-2">
            If your tone matters to you, your board should too.
          </p>
          <p className="text-sm text-[#f5f5f7]/40">
            Trusted by Isaiah Sharkey, Tosin Abasi, and 50+ touring artists worldwide.
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-600 px-8 py-4 rounded-lg transition-colors duration-200"
          >
            Start a Build
          </Link>
        </div>
      </Section>
    </>
  );
}
