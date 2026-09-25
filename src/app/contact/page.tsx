'use client';

import { useState } from 'react';
import Link from 'next/link';
import ParallaxImage from '@/components/home/ParallaxImage';
import Reveal from '@/components/home/Reveal';
import { IconArrow } from '@/components/home/Icons';

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';

const INTEREST_OPTIONS = [
  { value: '', label: 'Select one...' },
  { value: 'Custom Build', label: 'Custom Pedalboard Build' },
  { value: 'Tone Tutoring', label: 'Tone Tutoring Session' },
  { value: 'General Question', label: 'General Question' },
];

function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
    company: '', // honeypot - invisible to humans
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [loadedAt] = useState(() => Date.now());

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          interest: form.interest,
          message: form.message,
          company: form.company, // honeypot
          _t: loadedAt, // timing check
        }),
      });

      if (!res.ok) throw new Error('Failed');
      setStatus('sent');
      setForm({ firstName: '', lastName: '', email: '', phone: '', interest: '', message: '', company: '' });
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="text-center py-16">
        <div className="trd-icon-ring w-16 h-16 mx-auto mb-6 text-black">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">Message sent.</h3>
        <p className="text-[#1d1d1f]/60 text-lg max-w-md mx-auto">
          We got it. Check your phone, we'll text you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot - hidden from humans, bots will fill it */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden', tabIndex: -1 } as React.CSSProperties}>
        <label htmlFor="company">Company</label>
        <input
          id="company"
          type="text"
          name="company"
          autoComplete="off"
          tabIndex={-1}
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
        />
      </div>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-[#1d1d1f] mb-2">
            First name <span className="text-black/35">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-black placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-4 focus:ring-[#8E3FD9]/10 focus:border-[#8E3FD9]/40 focus:bg-white transition-all"
            placeholder="First name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-[#1d1d1f] mb-2">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            value={form.lastName}
            onChange={(e) => update('lastName', e.target.value)}
            className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-black placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-4 focus:ring-[#8E3FD9]/10 focus:border-[#8E3FD9]/40 focus:bg-white transition-all"
            placeholder="Last name"
          />
        </div>
      </div>

      {/* Email + Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#1d1d1f] mb-2">
            Email <span className="text-black/35">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-black placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-4 focus:ring-[#8E3FD9]/10 focus:border-[#8E3FD9]/40 focus:bg-white transition-all"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#1d1d1f] mb-2">
            Phone <span className="text-black/35">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-black placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-4 focus:ring-[#8E3FD9]/10 focus:border-[#8E3FD9]/40 focus:bg-white transition-all"
            placeholder="(555) 555-5555"
          />
        </div>
      </div>

      {/* Interest dropdown */}
      <div>
        <label htmlFor="interest" className="block text-sm font-medium text-[#1d1d1f] mb-2">
          What are you interested in?
        </label>
        <select
          id="interest"
          value={form.interest}
          onChange={(e) => update('interest', e.target.value)}
          className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-black focus:outline-none focus:ring-4 focus:ring-[#8E3FD9]/10 focus:border-[#8E3FD9]/40 focus:bg-white transition-all appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231d1d1f' fill-opacity='0.4' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
        >
          {INTEREST_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#1d1d1f] mb-2">
          Tell us about your rig <span className="text-black/35">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-black placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-4 focus:ring-[#8E3FD9]/10 focus:border-[#8E3FD9]/40 focus:bg-white transition-all resize-none"
          placeholder="What pedals are you running? What's driving you nuts? What's the dream setup?"
        />
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          Something went wrong. Try again, or email us directly at{' '}
          <a href="mailto:info@therigdr.com" className="font-medium underline">info@therigdr.com</a>.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="trd-cta-gradient w-full py-4 px-6 font-semibold rounded-full text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send message'
        )}
      </button>

      <p className="text-center text-sm text-[#1d1d1f]/40">
        We'll text you back within minutes.
      </p>
    </form>
  );
}

export default function ContactPage() {
  const cards = [
    {
      title: 'Email',
      value: 'info@therigdr.com',
      href: 'mailto:info@therigdr.com',
      note: 'We typically respond within 24 hours',
      path: 'M4 8l12 8 12-8M5 7h22a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V8a1 1 0 011-1z',
    },
    {
      title: 'Phone',
      value: '(936) 548-9254',
      href: 'tel:+19365489254',
      note: 'Mon to Fri, 9am to 5pm CT',
      path: 'M9 4h4l2 6-3 2a14 14 0 008 8l2-3 6 2v4a2 2 0 01-2 2C13 25 7 19 7 6a2 2 0 012-2z',
    },
    {
      title: 'Location',
      value: 'Houston, TX',
      href: '',
      note: 'Ships nationwide',
      path: 'M16 28s9-8.5 9-15a9 9 0 10-18 0c0 6.5 9 15 9 15zM16 16a3 3 0 100-6 3 3 0 000 6z',
    },
  ];

  return (
    <div>
      {/* ───────── HERO ───────── */}
      <ParallaxImage src={`${CDN}2022-L1010577.jpg`} alt="Close-up of a finished Rig Doctor pedalboard" priority strength={10} className="bg-black min-h-[52svh] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-14 sm:pb-16 pt-32">
          <p className="trd-eyebrow text-white/60 mb-6">Contact</p>
          <h1 className="text-white font-bold tracking-[-0.045em] leading-[1.0] text-[clamp(42px,6.5vw,88px)] max-w-3xl">
            Let&apos;s talk <span className="trd-gradient-text">tone.</span>
          </h1>
          <p className="mt-5 text-white/70 text-lg sm:text-xl max-w-xl leading-relaxed">
            Questions about a build, help with your rig, or just want to talk gear? We&apos;re here.
          </p>
        </div>
      </ParallaxImage>

      {/* ───────── INFO + FORM ───────── */}
      <section className="bg-[#f5f5f7] py-20 sm:py-28">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-12 items-start">
          <div className="space-y-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} className="bg-white rounded-[24px] p-7 flex gap-5 items-start border border-black/[0.04]">
                <span className="trd-icon-ring w-12 h-12 shrink-0 text-black">
                  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={c.path} />
                  </svg>
                </span>
                <div>
                  <p className="text-[13px] text-black/45 font-medium mb-1">{c.title}</p>
                  {c.href ? (
                    <a href={c.href} className="text-black text-lg font-semibold hover:opacity-70 transition-opacity">{c.value}</a>
                  ) : (
                    <p className="text-black text-lg font-semibold">{c.value}</p>
                  )}
                  <p className="text-[14px] text-black/50 mt-1">{c.note}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={260} className="bg-black rounded-[24px] p-7">
              <p className="text-white text-lg font-semibold mb-2">Rather just talk?</p>
              <p className="text-white/55 text-[15px] mb-5">Book a free 30-minute consultation about your rig.</p>
              <Link href="/book" className="trd-cta-gradient inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[15px]">
                Book a consultation <IconArrow />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={120} className="bg-white rounded-[28px] p-7 sm:p-10 border border-black/[0.04]">
            <p className="trd-eyebrow text-black/40 mb-4">Send a message</p>
            <h2 className="text-black font-bold tracking-[-0.03em] text-3xl sm:text-4xl mb-2">
              Tell us about your <span className="trd-gradient-text">rig.</span>
            </h2>
            <p className="text-black/50 text-[16px] mb-8">Drop us a message and we&apos;ll text you back within minutes.</p>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
