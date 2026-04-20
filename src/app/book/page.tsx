'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Section from '@/components/Section';
import TestimonialCarousel from '@/components/TestimonialCarousel';

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
      <div className="relative bg-black pt-32 pb-20 overflow-hidden trd-aurora">
        <div className="absolute inset-0 bg-black pointer-events-none" />
        <div className="relative max-w-[1080px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-full">
                <span className="inline-block w-2 h-2 rounded-full bg-[#10B981] trd-pulse-dot" />
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
                  { icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', color: '#10B981', label: 'Google Meet' },
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

              <p className="text-[14px] text-white/[0.65]">Most builds ship in 2-4 weeks from approval.</p>

              {/* Agenda card */}
              <div className="trd-glass-dark p-6 space-y-4">
                <h3 className="text-[15px] font-semibold text-white">{"What we'll dig into"}</h3>
                <ul className="space-y-3">
                  {['What you play and the tone you\u2019re chasing', 'Your current rig — what\u2019s working, what\u2019s not', 'A custom build plan with timeline and pricing'].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[14px] text-white/[0.85]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-[14px] text-white/[0.65]">
                Looking for signal chain feedback or a one-off consultation?{' '}
                <Link href="/tone-tutoring" className="text-[#34d399] hover:text-[#10B981] transition-colors font-medium">
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

/* ──── After the Call (light — informational) ──── */
function AfterTheCall() {
  const steps = [
    { number: '01', title: 'We Map It Out', description: 'Your specs, wiring diagram, component list. Everything documented so nothing gets lost.' },
    { number: '02', title: 'Clear Quote', description: 'Itemized proposal with a real timeline. You see exactly what you\u2019re paying for before we start.' },
    { number: '03', title: 'Your Move', description: "Take your time. Ask questions. Sleep on it. We\u2019re here when you\u2019re ready." },
  ];

  return (
    <Section theme="light" id="after-call">
      <div className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.number} className="bg-[#f5f5f7] rounded-2xl p-8 space-y-4">
              <div className="text-5xl font-bold trd-gradient-text">{step.number}</div>
              <h3 className="text-xl font-semibold text-[#1d1d1f]">{step.title}</h3>
              <p className="text-[15px] text-[#1d1d1f]/70 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#f5f5f7] rounded-2xl p-8 flex gap-6 items-start border border-black/[0.04]">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-[#0071E3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5h.01" />
            </svg>
          </div>
          <div className="flex-1 space-y-2">
            <h4 className="font-semibold text-[#1d1d1f]">Not sure if this is the right call?</h4>
            <p className="text-[15px] text-[#1d1d1f]/70">
              {"This consultation is built for custom build projects. If you're looking for signal chain feedback, gear recommendations, or quick advice, "}
              <Link href="/tone-tutoring" className="text-[#0071E3] hover:text-[#005BB5] transition-colors font-medium">explore Tone Tutoring</Link>.
            </p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-[18px] text-[#1d1d1f] font-medium">
            Custom builds typically start from <span className="trd-gradient-text font-bold">$2,000</span>
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => document.querySelector('.meetings-iframe-container')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-[#1d1d1f] text-white font-semibold rounded-full hover:bg-[#1d1d1f]/90 transition-colors text-[16px]"
          >
            Book your free consultation
          </button>
        </div>
      </div>
    </Section>
  );
}

/* ──── Team (light gray — warm, open) ──── */
function Team() {
  const team = [
    { name: 'Jacob', title: 'Rig Engineer', image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jacob_avatar.png' },
    { name: 'Vince', title: 'Rig Engineer', image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Vince_Avatar.png' },
    { name: 'Mason', title: 'Rig Engineer', image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Mason_Avatar.png' },
  ];

  return (
    <Section theme="lightGray">
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-2">The Bench</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1d1d1f]">The guys behind the builds.</h2>
          <p className="text-[16px] text-[#1d1d1f]/60 max-w-2xl mx-auto">Three rig engineers. 50+ years on the soldering iron between them.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {team.map((member) => (
            <div key={member.name} className="group bg-white rounded-2xl overflow-hidden border border-black/[0.04] hover:-translate-y-1 transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="text-[18px] font-semibold text-[#1d1d1f]">{member.name}</h3>
                <p className="text-[14px] text-[#1d1d1f]/50">{member.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ──── Trusted By (same carousel as homepage) ──── */
function TrustedBy() {
  return (
    <Section theme="light" reveal>
      <div className="text-center mb-12">
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">On the Road</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1d1d1f] mb-2">
          Trusted by players who <span className="trd-gradient-text">can&apos;t afford a bad night.</span>
        </h2>
      </div>
      <TestimonialCarousel theme="light" />
    </Section>
  );
}

/* ──── Fallback CTA (white) ──── */
function FallbackCTA() {
  return (
    <Section theme="light">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#1d1d1f]">{"Calendar not cooperating?"}</h2>
        <p className="text-[16px] text-[#1d1d1f]/60 max-w-2xl mx-auto">
          {"Shoot us an email — we'll find a time that works. Usually back to you within a day."}
        </p>
        <a href="mailto:info@therigdr.com" className="inline-block px-8 py-4 bg-[#1d1d1f] text-white font-semibold rounded-full hover:bg-[#1d1d1f]/90 transition-colors text-[16px]">
          Get in touch &rarr;
        </a>
      </div>
    </Section>
  );
}

/* ──── Main Page ──── */
export default function BookPage() {
  return (
    <>
      <Hero />
      <AfterTheCall />
      <Team />
      <TrustedBy />
      <FallbackCTA />
    </>
  );
}
