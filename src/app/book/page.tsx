'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Section from '@/components/Section';

// Hero Section with Calendar Embed
function Hero() {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.charset = 'utf-8';
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-black pt-32 pb-20 overflow-hidden trd-aurora">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-full">
                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] trd-pulse-dot" />
                <span className="text-[13px] text-white/[0.85]">
                  Custom builds · Montgomery, TX
                </span>
              </div>

              {/* H1 */}
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white">
                Let's design{' '}
                <span className="trd-gradient-text">your next rig.</span>
              </h1>

              {/* Subhead */}
              <p className="text-[18px] text-white/[0.75] leading-relaxed max-w-md">
                Book a free 30-minute consultation. We'll map your tone goals, discuss your current setup, and design a custom pedalboard that brings your vision to life.
              </p>

              {/* Meta Row */}
              <div className="flex flex-wrap gap-6 py-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#F5A623]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-[14px] text-white/[0.75]">30 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#10B981]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-[14px] text-white/[0.75]">Google Meet</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[#06B6D4]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-[14px] text-white/[0.75]">Complimentary</span>
                </div>
              </div>

              {/* Turnaround note */}
              <div className="pt-2">
                <p className="text-[14px] text-white/[0.65]">
                  Most builds ship in 2–4 weeks from approval.
                </p>
              </div>

              {/* Agenda Card */}
              <div className="trd-glass-dark p-6 space-y-4">
                <h3 className="text-[15px] font-semibold text-white">What we'll cover</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[14px] text-white/[0.85]">
                      Your tone goals and inspiration
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[14px] text-white/[0.85]">
                      Existing gear and rig constraints
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-[14px] text-white/[0.85]">
                      Custom build proposal and timeline
                    </span>
                  </li>
                </ul>
              </div>

              {/* Note about other services */}
              <p className="text-[14px] text-white/[0.65]">
                Looking for signal chain feedback or a one-off consultation?{' '}
                <Link
                  href="/tone-tutoring"
                  className="text-[#34d399] hover:text-[#10B981] transition-colors font-medium"
                >
                  Check out Tone Tutoring →
                </Link>
              </p>
            </div>

            {/* Right Column: Calendar */}
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-white shadow-2xl">
                <div
                  ref={calendarRef}
                  className="meetings-iframe-container"
                  data-src="https://meetings-na2.hubspot.com/trd/rig-build-consultation?embed=true"
                />
              </div>
            </div>
          </div>

          {/* Mobile CTA Button */}
          <div className="lg:hidden mt-12">
            <button
              onClick={scrollToCalendar}
              className="w-full py-4 px-6 bg-white text-black font-semibold rounded-full hover:bg-white/90 transition-colors text-[16px]"
            >
              Book your free consultation
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Calendar - below the fold */}
      <div className="lg:hidden bg-white py-12 px-6">
        <div className="max-w-[1080px] mx-auto">
          <div
            ref={calendarRef}
            className="meetings-iframe-container rounded-2xl overflow-hidden border border-black/[0.06] shadow-lg"
            data-src="https://meetings-na2.hubspot.com/trd/rig-build-consultation?embed=true"
          />
        </div>
      </div>
    </>
  );
}

// After the Call Section
function AfterTheCall() {
  const steps = [
    {
      number: '01',
      title: 'Custom Build Plan',
      description:
        'We document your exact specifications, wiring diagram, and components selected.',
    },
    {
      number: '02',
      title: 'Transparent Quote',
      description:
        'You receive an itemized proposal with timeline and no surprise fees.',
    },
    {
      number: '03',
      title: 'You Decide',
      description:
        "No pressure. Review, ask questions, and move forward when you're ready.",
    },
  ];

  return (
    <Section theme="light" id="after-call">
      <div className="space-y-16">
        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="trd-glass-light p-8 space-y-4"
            >
              <div className="text-5xl font-bold trd-gradient-text">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">
                {step.title}
              </h3>
              <p className="text-[15px] text-[#1d1d1f]/[0.7] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Qualify Callout */}
        <div className="trd-glass-light p-8 flex gap-6 items-start">
          <div className="flex-shrink-0">
            <svg
              className="w-6 h-6 text-[#F5A623]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01"
              />
            </svg>
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="font-semibold text-[#1d1d1f]">
              Not sure if this is the right call?
            </h4>
            <p className="text-[15px] text-[#1d1d1f]/[0.7]">
              This consultation is built for custom build projects. If you're looking for signal chain feedback, gear recommendations, or quick advice,{' '}
              <Link
                href="/tone-tutoring"
                className="text-[#D48A1A] hover:text-[#F5A623] transition-colors font-medium"
              >
                explore Tone Tutoring
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Price Anchor */}
        <div className="text-center space-y-4">
          <p className="text-[18px] text-[#1d1d1f] font-medium">
            Custom builds typically start from{' '}
            <span className="trd-gradient-text font-bold">$2,000</span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              document
                .querySelector('.meetings-iframe-container')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-black/90 transition-colors text-[16px]"
          >
            Book your free consultation
          </button>
        </div>
      </div>
    </Section>
  );
}

// Team Section
function Team() {
  const team = [
    {
      name: 'Jacob',
      title: 'Founder',
      image:
        'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_avatar.png',
    },
    {
      name: 'Vince',
      title: 'Rig Engineer',
      image:
        'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_Avatar.png',
    },
    {
      name: 'Mason',
      title: 'Rig Engineer',
      image:
        'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Mason_Avatar.png',
    },
  ];

  return (
    <Section theme="dark">
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-white">
            Meet your build team
          </h2>
          <p className="text-[16px] text-white/[0.75] max-w-2xl mx-auto">
            Three rig engineers with 50+ years of collective experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {team.map((member) => (
            <div key={member.name} className="text-center space-y-4">
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-2 border-white/[0.1]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-[14px] text-white/[0.6]">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Reviews Section
function Reviews() {
  const reviews = [
    {
      author: 'Paul Papanek',
      rating: 5,
      text: 'Jacob knew exactly what I needed before I even finished describing it. The build transformed my entire rig.',
    },
    {
      author: 'Paul Rose',
      rating: 5,
      text: 'The attention to detail is insane. Every cable, every pedal, everything is dialed in perfectly.',
    },
    {
      author: 'Verified Client',
      rating: 5,
      text: "Best money I've spent on gear. The consultation alone was worth it. Shipping was fast and the build quality is pristine.",
    },
  ];

  return (
    <Section theme="lightGray">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-[#F5A623]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-[18px] font-semibold text-[#1d1d1f]">
            Trusted by touring artists worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.author}
              className="bg-white rounded-2xl p-8 border border-black/[0.06] space-y-4"
            >
              <div className="flex gap-1">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-[#F5A623]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[15px] text-[#1d1d1f]/[0.8] leading-relaxed">
                "{review.text}"
              </p>
              <p className="text-[14px] font-semibold text-[#1d1d1f]">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Gallery Section
function Gallery() {
  return (
    <Section theme="dark" noPadding>
      <div className="space-y-8 px-6">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-bold text-white">Recent builds</h2>
          <p className="text-[16px] text-white/[0.75]">
            Scroll to see what we've created
          </p>
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-hide py-12">
        <div className="flex gap-6 px-6 pb-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 w-80 h-56 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl border border-white/[0.08] overflow-hidden group cursor-pointer hover:border-white/[0.15] transition-all"
            >
              <div className="w-full h-full bg-white/[0.02] flex items-center justify-center text-white/[0.5]">
                <span className="text-[15px]">Build #{i}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// Trust Section
function Trust() {
  return (
    <Section theme="light">
      <div className="text-center space-y-4">
        <p className="text-[18px] text-[#1d1d1f] leading-relaxed">
          Trusted by{' '}
          <span className="font-semibold">touring artists</span> like{' '}
          <span className="font-semibold">Isaiah Sharkey</span> and{' '}
          <span className="font-semibold">Tosin Abasi</span>. Over{' '}
          <span className="font-semibold">200 rigs built</span> and counting.
        </p>
      </div>
    </Section>
  );
}

// Fallback CTA Section
function FallbackCTA() {
  return (
    <Section theme="light">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#1d1d1f]">
          Can't find a time that works?
        </h2>
        <p className="text-[16px] text-[#1d1d1f]/[0.75] max-w-2xl mx-auto">
          Email us directly and we'll get back to you within 24 hours to find a
          time that fits your schedule.
        </p>
        <a
          href="mailto:hello@therigdr.com"
          className="inline-block px-8 py-4 bg-black text-white font-semibold rounded-full hover:bg-black/90 transition-colors text-[16px]"
        >
          Get in touch →
        </a>
      </div>
    </Section>
  );
}

// Main Page
export default function BookPage() {
  return (
    <>
      <Hero />
      <AfterTheCall />
      <Team />
      <Reviews />
      <Gallery />
      <Trust />
      <FallbackCTA />
    </>
  );
}
