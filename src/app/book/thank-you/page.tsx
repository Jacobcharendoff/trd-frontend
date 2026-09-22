'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Section from '@/components/Section';

export default function BookThankYouPage() {
  useEffect(() => {
    // Load HubSpot meetings embed script
    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Confirmation Hero */}
      <div className="bg-black pt-32 pb-16">
        <div className="max-w-[680px] mx-auto px-6 text-center">
          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0071E3]/10 border border-[#0071E3]/20 mb-8">
            <svg className="w-8 h-8 text-[#0071E3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            {"You're in. "}
            <span className="trd-gradient-text">We got your info.</span>
          </h1>

          <p className="text-[18px] text-white/[0.6] leading-relaxed max-w-xl mx-auto mb-6">
            We will reach out within 24 hours to talk through your rig. But if you want to skip
            the wait, grab a time on the calendar below and let us get into it right now.
          </p>

          {/* Arrow pointing down */}
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-[#0071E3] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <Section theme="light" id="book-call">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">
              Skip The Wait
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-2">
              Book your free consultation <span className="trd-gradient-text">right now.</span>
            </h2>
            <p className="text-[#1d1d1f]/50 text-lg">
              30 minutes. No obligation. Just straight talk about your rig.
            </p>
          </div>

          {/* HubSpot Calendar Embed */}
          <div className="bg-[#f5f5f7] rounded-2xl p-4 sm:p-6 border border-[#1d1d1f]/[0.06]">
            <div
              className="meetings-iframe-container"
              data-src="https://meetings-na2.hubspot.com/trd/rig-build-consultation?embed=true"
              style={{ minHeight: '650px' }}
            />
          </div>

          {/* What to expect */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
                title: 'We talk tone',
                desc: 'What you play, what you need, what is not working right now.',
              },
              {
                icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
                title: 'You get a plan',
                desc: 'Signal chain, wiring diagram, component list. All documented.',
              },
              {
                icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                title: 'Straight quote',
                desc: 'No hidden fees. You know exactly what it costs before we start.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0071E3]/[0.08] mb-3">
                  <svg className="w-5 h-5 text-[#0071E3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-[15px] font-semibold text-[#1d1d1f] mb-1">{item.title}</h3>
                <p className="text-[13px] text-[#1d1d1f]/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Back link */}
          <div className="text-center mt-12">
            <Link href="/" className="text-[14px] text-[#0071E3] hover:text-[#005BB5] transition-colors">
              &larr; Back to The Rig Doctor
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
