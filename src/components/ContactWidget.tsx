'use client';

import { useState } from 'react';

export default function ContactWidget() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submittedName, setSubmittedName] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setSubmittedName(form.firstName);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f5f5f7] py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="trd-section-headline text-[#1d1d1f] mb-3">
            Get in touch.
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg">
            Questions about a build, a product, or just want to talk tone? Drop us a line.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-black/[0.06] px-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#10B981]/10 mb-6">
              <svg className="w-10 h-10 text-[#10B981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">
              Thanks{submittedName ? `, ${submittedName}` : ''}! Message received.
            </h3>
            <p className="text-[#1d1d1f]/50 text-lg mb-2">
              We&apos;ve got your message and will get back to you within 24 hours.
            </p>
            <p className="text-[#1d1d1f]/40 text-sm">
              Need something urgent? Call us at{' '}
              <a href="tel:+19365489254" className="text-[#0071E3] hover:text-[#005BB5] transition-colors">
                (936) 548-9254
              </a>
              {' '}Mon–Fri, 9am–5pm CT.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-8 text-[#0071E3] hover:text-[#005BB5] font-medium text-sm transition-colors"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="cw-firstName" className="block text-sm font-medium text-[#1d1d1f]/70 mb-1.5">
                  First Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="cw-firstName"
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#1d1d1f] placeholder-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/50 transition-all text-sm"
                  placeholder="Jacob"
                />
              </div>
              <div>
                <label htmlFor="cw-lastName" className="block text-sm font-medium text-[#1d1d1f]/70 mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  id="cw-lastName"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#1d1d1f] placeholder-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/50 transition-all text-sm"
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="cw-email" className="block text-sm font-medium text-[#1d1d1f]/70 mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="cw-email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#1d1d1f] placeholder-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/50 transition-all text-sm"
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="cw-phone" className="block text-sm font-medium text-[#1d1d1f]/70 mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  id="cw-phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#1d1d1f] placeholder-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/50 transition-all text-sm"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cw-message" className="block text-sm font-medium text-[#1d1d1f]/70 mb-1.5">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                id="cw-message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#1d1d1f] placeholder-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/50 transition-all text-sm resize-none"
                placeholder="Tell us about your rig, what you're looking for, or just say hey."
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-500">Something went wrong. Please try again.</p>
            )}

            <div className="text-center pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 font-semibold px-10 py-4 rounded-full text-white bg-[#1d1d1f] hover:bg-[#1d1d1f]/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
