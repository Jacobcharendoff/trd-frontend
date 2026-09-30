'use client';

import { useState } from 'react';
import { trackLead } from '@/lib/track';

const PDF_URL =
  'https://ul04rn4k3jtypxsy.public.blob.vercel-storage.com/Signal_Flow_Cheat_Sheet-ht17iWYR53dcOwLBPjes5W2F4jgaNa.pdf';

/**
 * Signal Flow Cheat Sheet opt-in, sized for the middle of a blog post.
 * Opens the PDF right away (fresh user gesture, so no popup block), then logs the lead:
 * /api/signal-flow-lead creates the HubSpot contact and starts the 3-email nurture.
 */
export default function CheatSheetInline({ source }: { source: string }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'sending') return;
    window.open(PDF_URL, '_blank', 'noopener,noreferrer');
    setStatus('sending');
    try {
      await fetch('/api/signal-flow-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pageUri: window.location.href }),
      });
    } catch {
      // They already have the PDF. CRM capture is best effort.
    }
    trackLead('signal_flow_cheatsheet', { source });
    setStatus('done');
  }

  return (
    <aside className="not-prose my-12 rounded-[24px] border border-black/[0.06] bg-[#f5f5f7] p-7 sm:p-9">
      <div className="h-1 w-12 rounded-full mb-6" style={{ background: 'var(--trd-spectral)' }} />
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/45 mb-2">Free download</p>
      <h3 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-2">Signal Flow Cheat Sheet</h3>
      <p className="text-[16px] leading-relaxed text-black/60 mb-6 max-w-xl">
        12 signal chain diagrams, from a simple mono rig to wet/dry/wet and the 4-cable method. Print it and keep it next
        to your board.
      </p>

      {status === 'done' ? (
        <div>
          <p className="text-[15px] font-medium text-[#1d1d1f] mb-3">Your cheat sheet opened in a new tab.</p>
          <a
            href={PDF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="trd-cta-gradient inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[15px] text-white"
          >
            Download it again
          </a>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-lg">
          <label htmlFor={`cheatsheet-${source}`} className="sr-only">
            Email address
          </label>
          <input
            id={`cheatsheet-${source}`}
            type="email"
            required
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3 rounded-full bg-white border border-black/[0.1] text-[#1d1d1f] placeholder-black/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/40 text-[15px]"
          />
          <button
            type="submit"
            disabled={status === 'sending'}
            className="trd-cta-gradient px-7 py-3 rounded-full font-semibold text-[15px] text-white whitespace-nowrap disabled:opacity-60"
          >
            {status === 'sending' ? 'Opening...' : 'Get the PDF'}
          </button>
        </form>
      )}
      <p className="text-xs text-black/40 mt-4">Opens instantly. No spam, just gear knowledge.</p>
    </aside>
  );
}
