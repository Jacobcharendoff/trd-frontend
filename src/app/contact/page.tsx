'use client';

import { useState } from 'react';
import Link from 'next/link';
import Section from '@/components/Section';

const INTEREST_OPTIONS = [
  { value: '', label: 'Select one...' },
  { value: 'Custom Build', label: 'Custom Pedalboard Build' },
  { value: 'DIY Kit', label: 'DIY Kit' },
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
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0071E3]/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#0071E3]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3">Message sent.</h3>
        <p className="text-[#1d1d1f]/60 text-lg max-w-md mx-auto">
          We got it. Check your phone - we'll text you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
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
            First name <span className="text-[#0071E3]">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={(e) => update('firstName', e.target.value)}
            className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all"
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
            className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all"
            placeholder="Last name"
          />
        </div>
      </div>

      {/* Email + Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#1d1d1f] mb-2">
            Email <span className="text-[#0071E3]">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#1d1d1f] mb-2">
            Phone <span className="text-[#0071E3]">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all"
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
          className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all appearance-none"
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
          Tell us about your rig <span className="text-[#0071E3]">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className="w-full px-4 py-3 bg-[#f5f5f7] border border-black/[0.06] rounded-xl text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3] transition-all resize-none"
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
        className="w-full py-4 px-6 bg-[#0071E3] text-white font-semibold rounded-full hover:bg-[#005BB5] transition-colors text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
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
          'Send Message'
        )}
      </button>

      <p className="text-center text-sm text-[#1d1d1f]/40">
        We'll text you back within minutes.
      </p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div>
      {/* Hero with Background Video */}
      <div className="relative w-full overflow-hidden">
        <div className="relative min-h-[60vh] flex items-center justify-center bg-black">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source
              src="https://cdn.shopify.com/videos/c/o/v/1e7a54e296a04be0b5e8d7c34031924a.mov"
              type="video/quicktime"
            />
            <source
              src="https://cdn.shopify.com/videos/c/o/v/1e7a54e296a04be0b5e8d7c34031924a.mov"
              type="video/mp4"
            />
          </video>

          <div className="relative z-10 max-w-[1080px] mx-auto px-6 py-32 w-full text-center">
            <h1 className="trd-hero-headline text-[#f5f5f7] mb-6">
              Contact <span className="trd-gradient-text">The Rig Doctor</span>
            </h1>
            <p className="trd-subheadline max-w-2xl mx-auto">
              Questions about a build, need help with your rig, or just want to talk tone? We&apos;re here.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <Section theme="light" reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Email */}
          <div className="bg-[#f5f5f7] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#0071E3]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#0071E3]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Email</h3>
            <a href="mailto:info@therigdr.com" className="text-[#0071E3] hover:text-[#005BB5] transition-colors">
              info@therigdr.com
            </a>
            <p className="text-sm text-[#1d1d1f]/50 mt-2">We typically respond within 24 hours</p>
          </div>

          {/* Phone */}
          <div className="bg-[#f5f5f7] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#BF5AF2]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#BF5AF2]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Phone</h3>
            <a href="tel:+19365489254" className="text-[#0071E3] hover:text-[#005BB5] transition-colors">
              (936) 548-9254
            </a>
            <p className="text-sm text-[#1d1d1f]/50 mt-2">Mon-Fri, 9am-5pm CT</p>
          </div>

          {/* Location */}
          <div className="bg-[#f5f5f7] rounded-2xl p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#0071E3]/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-[#0071E3]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2">Location</h3>
            <p className="text-[#1d1d1f]/70">
              Houston, TX
            </p>
            <p className="text-sm text-[#1d1d1f]/50 mt-2">Ships nationwide</p>
          </div>
        </div>
      </Section>

      {/* Contact Form */}
      <Section theme="lightGray" reveal>
        <div className="text-center mb-12">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#1d1d1f]/40 mb-4">
            Send a Message
          </p>
          <h2 className="trd-section-headline text-[#1d1d1f] mb-4">
            Tell us about your <span className="trd-gradient-text">rig.</span>
          </h2>
          <p className="text-[#1d1d1f]/50 text-lg max-w-xl mx-auto">
            Drop us a message and we'll text you back within minutes.
          </p>
        </div>
        <ContactForm />
      </Section>

      {/* Book a Consultation CTA */}
      <Section theme="dark" reveal>
        <div className="text-center">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-[#f5f5f7]/40 mb-4">
            Ready to go?
          </p>
          <h2 className="trd-section-headline text-[#f5f5f7] mb-4">
            Rather just <span className="trd-gradient-text">talk?</span>
          </h2>
          <p className="text-lg text-[#f5f5f7]/60 mb-8 max-w-xl mx-auto">
            Book a free 30-minute consultation. We&apos;ll talk through your rig, your playing style, and figure out exactly what you need.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-[#0071E3] px-8 py-4 text-lg font-semibold text-white hover:bg-[#005BB5] transition-colors"
          >
            Book a Consultation
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </Section>
    </div>
  );
}
