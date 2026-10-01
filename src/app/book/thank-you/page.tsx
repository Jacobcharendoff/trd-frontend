'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Section from '@/components/Section';
import { track } from '@/lib/track';
import { readLead, forgetLead } from '@/lib/lead-session';

const MEETINGS_URL = 'https://meetings-na2.hubspot.com/trd/rig-build-consultation?embed=true';

/**
 * Pull the booker's email, first name and call time out of HubSpot's booking message.
 * Shape: { meetingsPayload: { bookingResponse: { event: { dateTime }, postResponse: { timerange: { start }, contact: { email, firstName } } } } }
 * Read defensively; anything missing falls back to what the form stored.
 */
function readBooking(data: unknown): { email?: string; firstName?: string; start?: number } {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const r = (data as any)?.meetingsPayload?.bookingResponse;
  const contact = r?.postResponse?.contact ?? {};
  const start = Number(r?.postResponse?.timerange?.start ?? r?.event?.dateTime);
  return {
    email: typeof contact.email === 'string' ? contact.email : undefined,
    firstName: typeof contact.firstName === 'string' ? contact.firstName : undefined,
    start: Number.isFinite(start) && start > 0 ? start : undefined,
  };
}

export default function BookThankYouPage() {
  // Calendar URL, prefilled with the name and email they just typed (HubSpot meetings prefill params).
  const [calendarSrc, setCalendarSrc] = useState<string | null>(null);
  const booked = useRef(false);

  useEffect(() => {
    const lead = readLead();
    const q = new URLSearchParams();
    if (lead?.firstName) q.set('firstName', lead.firstName);
    if (lead?.lastName) q.set('lastName', lead.lastName);
    if (lead?.email) q.set('email', lead.email);
    const extra = q.toString();
    setCalendarSrc(extra ? `${MEETINGS_URL}&${extra}` : MEETINGS_URL);
  }, []);

  useEffect(() => {
    if (!calendarSrc) return;
    // Pending reminder ids, from the form redirect or the email link. Booking cancels them.
    const pending = new URLSearchParams(window.location.search).get('n') || '';

    const script = document.createElement('script');
    script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    script.async = true;
    document.body.appendChild(script);
    // HubSpot's meetings iframe posts { meetingBookSucceeded: true } when a call is booked.
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin === 'string' && !e.origin.includes('hubspot')) return;
      if (e.data && (e.data as { meetingBookSucceeded?: boolean }).meetingBookSucceeded && !booked.current) {
        booked.current = true;
        track('schedule', { meeting: 'rig_build_consultation' });
        // Stops the "you haven't booked yet" emails and starts the prep emails.
        const booking = readBooking(e.data);
        const lead = readLead();
        fetch('/api/lead/booked', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            n: pending,
            email: booking.email || lead?.email || '',
            firstName: booking.firstName || lead?.firstName || '',
            start: booking.start,
          }),
          keepalive: true,
        }).catch(() => {});
        forgetLead();
      }
    };
    window.addEventListener('message', onMessage);
    return () => {
      document.body.removeChild(script);
      window.removeEventListener('message', onMessage);
    };
  }, [calendarSrc]);

  return (
    <>
      {/* Confirmation Hero */}
      <div className="bg-black pt-20 sm:pt-28 pb-16">
        <div className="max-w-[680px] mx-auto px-6 text-center">
          {/* Success icon */}
          <div className="trd-icon-ring w-16 h-16 text-white mb-8">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-white font-bold tracking-[-0.045em] leading-[1.02] text-[clamp(40px,6vw,68px)] mb-5">
            {"You're in. "}
            <span className="trd-gradient-text">Now pick a time.</span>
          </h1>

          <p className="text-[18px] text-white/[0.6] leading-relaxed max-w-xl mx-auto mb-6">
            Grab a slot for your free 30-minute build call below. A builder is also reading your notes
            and will reply within 24 hours if you&apos;d rather start by email.
          </p>

          {/* Arrow pointing down */}
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/60 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.05] text-[clamp(30px,4vw,48px)] mb-3">
              Book your free build call <span className="trd-gradient-text">right now.</span>
            </h2>
            <p className="text-[#1d1d1f]/50 text-lg">
              30 minutes with a builder about your new board or rebuild. No obligation.
            </p>
          </div>

          {/* HubSpot Calendar Embed */}
          <div className="bg-[#f5f5f7] rounded-[28px] p-4 sm:p-6 border border-black/[0.04]">
            {calendarSrc ? (
              <div className="meetings-iframe-container" data-src={calendarSrc} style={{ minHeight: '650px' }} />
            ) : (
              <div style={{ minHeight: '650px' }} />
            )}
          </div>

          <p className="text-center text-[14px] text-black/50 mt-5">
            This call is for custom builds and rebuilds. Need help with your tone or a problem on your current board?{' '}
            <Link href="/tone-tutoring" className="text-black/80 underline underline-offset-2">
              That&apos;s Tone Tutoring
            </Link>
            .
          </p>

          {/* What to expect */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
                title: 'We scope your build',
                desc: 'What you play, where the board lives and what it has to do.',
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
                <div className="trd-icon-ring w-11 h-11 text-black mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <Link href="/" className="text-[14px] text-black/60 hover:text-black transition-colors">
              &larr; Back to The Rig Doctor
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
