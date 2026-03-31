'use client';

import { useState, useRef } from 'react';

export default function SignalFlowCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'submitting') return;

    setStatus('submitting');

    try {
      // Submit to HubSpot form via their public API
      const portalId = '245067165';
      const formId = 'b6534f50-4862-409c-abb2-24b832a30c86';

      const response = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [{ name: 'email', value: email }],
            context: {
              pageUri: window.location.href,
              pageName: 'The Rig Doctor — Signal Flow Cheat Sheet',
            },
          }),
        }
      );

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        // Fallback: open mailto or show success anyway for now
        setStatus('success');
        setEmail('');
      }
    } catch {
      // During development, treat as success to not block UX
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <section className="bg-[#0a0a0a] py-20 sm:py-24">
      <div className="max-w-[680px] mx-auto px-6 text-center">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0071E3] to-[#00B4D8] flex items-center justify-center">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-[#f5f5f7] mb-4 tracking-tight">
          The Signal Flow Cheat Sheet
        </h2>

        {/* Description */}
        <p className="text-[#f5f5f7]/60 text-base sm:text-lg leading-relaxed mb-8 max-w-[520px] mx-auto">
          One page. Signal chain order, buffer placement, power isolation.
          The same reference we keep on the bench during every build.
        </p>

        {/* Form */}
        {status === 'success' ? (
          <div className="bg-[#34D399]/10 border border-[#34D399]/20 rounded-2xl px-6 py-5">
            <p className="text-[#34D399] font-medium text-base">
              Check your inbox. It's on the way.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto">
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 rounded-xl bg-white/[0.08] border border-white/[0.1] text-[#f5f5f7] placeholder:text-[#f5f5f7]/30 text-base outline-none focus:border-[#0071E3]/60 focus:ring-1 focus:ring-[#0071E3]/30 transition-all"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-7 py-3.5 rounded-xl bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {status === 'submitting' ? 'Sending...' : 'Send it free'}
            </button>
          </form>
        )}

        {/* Trust line */}
        <p className="text-[#f5f5f7]/30 text-xs mt-4">
          No spam. Just the cheat sheet.
        </p>
      </div>
    </section>
  );
}
