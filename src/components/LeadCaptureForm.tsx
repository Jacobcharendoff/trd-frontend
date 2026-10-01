'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trackLead } from '@/lib/track';
import { rememberLead } from '@/lib/lead-session';
import BuildNeed, { type Need } from '@/components/BuildNeed';

export default function LeadCaptureForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', rig: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [need, setNeed] = useState<Need>('');
  const [needError, setNeedError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!need) {
      setNeedError(true);
      return;
    }
    if (need === 'tone') return;
    setStatus('submitting');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, need, source: 'homepage' }),
      });

      if (res.ok) {
        const { n } = (await res.json().catch(() => ({}))) as { n?: string };
        trackLead('homepage_form', { need });
        rememberLead(formData.name, formData.email);
        // Straight to the calendar: booking the call is the next step, not waiting for a reply.
        router.push(n ? `/book/thank-you?n=${encodeURIComponent(n)}` : '/book/thank-you');
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <div className="trd-icon-ring w-16 h-16 mx-auto mb-6 text-black">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">Got it.</h3>
        <p className="text-[#1d1d1f]/50">Taking you to the calendar to pick a time for your build call.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <BuildNeed idPrefix="lc" value={need} onChange={(v) => { setNeed(v); setNeedError(false); }} showError={needError} />
        {need !== 'tone' && (
        <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#1d1d1f]/10 text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-4 focus:ring-[#8E3FD9]/10 focus:border-[#8E3FD9]/40 transition-all text-[15px]"
          />
          <input
            type="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#1d1d1f]/10 text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-4 focus:ring-[#8E3FD9]/10 focus:border-[#8E3FD9]/40 transition-all text-[15px]"
          />
        </div>
        {/* Honeypot: hidden from people, bots fill it in */}
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label htmlFor="lc-company">Company</label>
          <input id="lc-company" type="text" tabIndex={-1} autoComplete="off" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
        </div>
        <textarea
          placeholder="What's on your board now, and what do you want the new one to do?"
          rows={3}
          value={formData.rig}
          onChange={(e) => setFormData({ ...formData, rig: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#1d1d1f]/10 text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-4 focus:ring-[#8E3FD9]/10 focus:border-[#8E3FD9]/40 transition-all text-[15px] resize-none"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="trd-cta-gradient w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full text-[15px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Next: pick a time'}
          {status !== 'submitting' && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </button>
        {status === 'error' && (
          <p className="text-red-500 text-sm">Something went wrong. Try again or email us directly.</p>
        )}
        </>
        )}
      </form>
    </div>
  );
}
