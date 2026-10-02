'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { track } from '@/lib/track';
import { readLead, forgetLead } from '@/lib/lead-session';
import { MEETINGS_EMBED_URL as MEETINGS_URL } from '@/lib/booking';

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
      {/* Step 2 of 2: the calendar is the page. It sits in the first screen so nobody mistakes
          the form for the finish line. */}
      <div className="bg-white pt-24 sm:pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <ol className="flex items-center justify-center gap-3 text-[13px] font-medium mb-6" aria-label="Progress">
            <li className="flex items-center gap-2 text-black/45">
              <span className="w-6 h-6 rounded-full bg-black/10 text-black/60 inline-flex items-center justify-center" aria-hidden="true">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              Your details
            </li>
            <li className="w-8 h-px bg-black/15" aria-hidden="true" />
            <li className="flex items-center gap-2 text-black" aria-current="step">
              <span className="w-6 h-6 rounded-full bg-black text-white inline-flex items-center justify-center text-[12px]">2</span>
              Pick a time
            </li>
          </ol>

          <div className="text-center mb-6">
            <h1 className="text-black font-bold tracking-[-0.04em] leading-[1.05] text-[clamp(30px,4.5vw,46px)] mb-3">
              Last step: <span className="trd-gradient-text">pick a time for your build call.</span>
            </h1>
            <p className="text-[#1d1d1f]/60 text-[16px] sm:text-lg max-w-xl mx-auto">
              Your request isn&apos;t booked until you choose a time. 30 minutes on Google Meet with one of the builders.
            </p>
          </div>

          {/* HubSpot Calendar Embed */}
          <div id="book-call" className="bg-[#f5f5f7] rounded-[28px] p-2 sm:p-5 border border-black/[0.04]">
            {calendarSrc ? (
              <div className="meetings-iframe-container" data-src={calendarSrc} style={{ minHeight: '650px' }} />
            ) : (
              <div style={{ minHeight: '650px' }} />
            )}
          </div>

          <p className="text-center text-[14px] text-black/55 mt-5">
            No time that works? Email{' '}
            <a href="mailto:info@therigdr.com" className="text-black/80 underline underline-offset-2">
              info@therigdr.com
            </a>{' '}
            and we&apos;ll set one up.
          </p>
          <p className="text-center text-[14px] text-black/50 mt-2">
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
      </div>
    </>
  );
}
