'use client';

import { useState } from 'react';

/** Email opt-in for the Tone Tutoring discount. Posts to /api/lead so the contact lands in HubSpot. */
export default function ToneOptIn() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: '', rig: 'Tone Tutoring 20% off opt-in (homepage)' }),
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-2xl bg-white border border-black/[0.06] px-6 py-5">
        <p className="font-semibold text-black">You&apos;re in.</p>
        <p className="text-black/55 text-[15px] mt-1">Your 20% code is on its way to {email}. Check your inbox within a day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <label htmlFor="tone-optin-email" className="sr-only">Email address</label>
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
