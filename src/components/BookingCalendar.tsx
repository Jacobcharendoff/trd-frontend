'use client';

import { useEffect, useRef, useState } from 'react';
import { track } from '@/lib/track';
import { readLead, forgetLead } from '@/lib/lead-session';
import { MEETINGS_EMBED_URL } from '@/lib/booking';

const EMBED_SCRIPT = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';

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

/**
 * Vince's build-call calendar (HubSpot meetings embed).
 *
 * - Prefills name and email if the consult form was filled in this tab.
 * - On a booking: fires the `schedule` key event and calls /api/lead/booked, which cancels any
 *   "you haven't booked yet" emails (ids in ?n=) and sends the prep emails once HubSpot confirms.
 * - `lazy` waits until the calendar is near the viewport before loading HubSpot's script,
 *   so long pages don't pay for it up front.
 */
export default function BookingCalendar({
  source,
  lazy = false,
  minHeight = 650,
}: {
  source: string;
  lazy?: boolean;
  minHeight?: number;
}) {
  const box = useRef<HTMLDivElement>(null);
  const booked = useRef(false);
  const [src, setSrc] = useState<string | null>(null);
  const [near, setNear] = useState(!lazy);

  useEffect(() => {
    const lead = readLead();
    const q = new URLSearchParams();
    if (lead?.firstName) q.set('firstName', lead.firstName);
    if (lead?.lastName) q.set('lastName', lead.lastName);
    if (lead?.email) q.set('email', lead.email);
    const extra = q.toString();
    setSrc(extra ? `${MEETINGS_EMBED_URL}&${extra}` : MEETINGS_EMBED_URL);
  }, []);

  useEffect(() => {
    if (near) return;
    const el = box.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: '1200px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  useEffect(() => {
    if (!src || !near) return;
    const pending = new URLSearchParams(window.location.search).get('n') || '';

    const script = document.createElement('script');
    script.src = EMBED_SCRIPT;
    script.async = true;
    document.body.appendChild(script);

    // HubSpot's meetings iframe posts { meetingBookSucceeded: true } when a call is booked.
    const onMessage = (e: MessageEvent) => {
      if (typeof e.origin === 'string' && !e.origin.includes('hubspot')) return;
      if (!e.data || !(e.data as { meetingBookSucceeded?: boolean }).meetingBookSucceeded || booked.current) return;
      booked.current = true;
      track('schedule', { meeting: 'rig_build_consultation', source });
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
          source,
        }),
        keepalive: true,
      }).catch(() => {});
      forgetLead();
    };
    window.addEventListener('message', onMessage);
    return () => {
      script.remove();
      window.removeEventListener('message', onMessage);
    };
  }, [src, near, source]);

  return (
    <div ref={box} style={{ minHeight }}>
      {src && near ? (
        <div className="meetings-iframe-container" data-src={src} style={{ minHeight }} />
      ) : (
        <div style={{ minHeight }} className="flex items-center justify-center text-[14px] text-black/40">
          Loading the calendar&hellip;
        </div>
      )}
    </div>
  );
}
