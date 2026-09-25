'use client';

import { useState } from 'react';

/** Email opt-in for the Tone Tutoring discount. /api/tone-offer emails the TONE20 code and logs the lead in HubSpot. */
export default function ToneOptIn() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [honey, setHoney] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/tone-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company: honey }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl bg-white border border-black/[0.06] px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <div>
          <p className="text-black/55 text-[15px]">Your code (we just emailed it to you too):</p>
          <p className="text-2xl font-bold tracking-[0.12em] text-black mt-1">TONE20</p>
        </div>
        <a
          href="/api/checkout?handle=tone-tutoring-follow-up&discount=TONE20"
          className="trd-cta-gradient inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[15px] whitespace-nowrap"
        >
          Book with 20% off
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <label htmlFor="tone-optin-email" className="sr-only">Email address</label>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={honey}
        onChange={(e) => setHoney(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />
      <input
        id="tone-optin-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1 px-5 py-3.5 rounded-full bg-white border border-black/10 text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#8E3FD9]/30 text-[15px]"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="trd-cta-ink px-7 py-3.5 rounded-full font-semibold text-[15px] whitespace-nowrap disabled:opacity-50"
      >
        {status === 'sending' ? 'Sending...' : 'Send my 20% code'}
      </button>
      {status === 'error' && <p className="text-red-600 text-sm sm:self-center">That didn&apos;t go through. Try again?</p>}
    </form>
  );
}
