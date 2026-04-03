'use client';

import { useState, useRef, useEffect } from 'react';

const PDF_URL =
  'https://ul04rn4k3jtypxsy.public.blob.vercel-storage.com/Signal_Flow_Cheat_Sheet-ht17iWYR53dcOwLBPjes5W2F4jgaNa.pdf';

const HUBSPOT_PORTAL_ID = '245067165';
const HUBSPOT_FORM_ID = 'b6534f50-4862-409c-abb2-24b832a30c86';

export default function SignalFlowCapture() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'submitting') return;
    setStatus('submitting');

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fields: [{ name: 'email', value: email }],
            context: {
              pageUri: typeof window !== 'undefined' ? window.location.href : '',
              pageName: 'Signal Flow Cheat Sheet Capture',
            },
          }),
        },
      );
      if (!res.ok) throw new Error('Form submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      ref={ref}
      id="signal-flow"
      className={\`
        bg-[#0a0a0a] text-[#f5f5f7] py-20 md:py-[120px] overflow-hidden
        transition-all duration-700 ease-out
        \${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      \`}
    >
      <div className="max-w-[1080px] mx-auto px-6">
        <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-8 md:p-16 text-center overflow-hidden">
          {/* Subtle gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] via-transparent to-purple-500/[0.04] pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] mb-8">
              <span className="text-xs font-medium tracking-wide uppercase text-[#f5f5f7]/60">
                Free download
              </span>
            </div>

            <h2 className="trd-section-headline text-[#f5f5f7] mb-4">
              Signal Flow Cheat Sheet
            </h2>

            <p className="text-lg md:text-xl text-[#f5f5f7]/60 max-w-xl mx-auto mb-10 leading-relaxed">
              12 signal chain diagrams covering every rig style — from simple mono setups to
              wet/dry/wet and 4-cable method. Stop guessing where your pedals go.
            </p>

            {status === 'success' ? (
              <div className="animate-in fade-in duration-500">
                <div className="inline-flex items-center gap-2 text-green-400 mb-6">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-medium">You&apos;re in. Here&apos;s your cheat sheet.</span>
                </div>

                <div>
                  <a
                    href={PDF_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="trd-cta-gradient trd-glow-pulse inline-flex items-center gap-3 font-semibold px-10 py-4 rounded-full text-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download the Cheat Sheet
                  </a>
                </div>

                <p className="text-sm text-[#f5f5f7]/40 mt-6">
                  PDF &middot; 15 pages &middot; Prints great on letter or A4
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[#f5f5f7] placeholder-[#f5f5f7]/30 focus:outline-none focus:border-white/[0.25] focus:bg-white/[0.08] transition-all text-base"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="trd-cta-gradient trd-glow-pulse px-8 py-3.5 rounded-full font-semibold text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Get the PDF'}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-sm mt-3">
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="text-xs text-[#f5f5f7]/30 mt-4">
                  No spam, ever. Just gear knowledge.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
