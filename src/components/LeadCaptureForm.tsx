'use client';

import { useState } from 'react';

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({ name: '', email: '', rig: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', rig: '' });
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
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#0071E3]/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#0071E3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">We got your info.</h3>
        <p className="text-[#1d1d1f]/50">
          Someone from The Rig Doctor will reach out within 24 hours to talk about your build.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#1d1d1f]/10 text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/50 transition-all text-[15px]"
          />
          <input
            type="email"
            placeholder="Your email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#1d1d1f]/10 text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/50 transition-all text-[15px]"
          />
        </div>
        <textarea
          placeholder="Tell us about your rig - what are you working with, and what's driving you crazy?"
          rows={3}
          value={formData.rig}
          onChange={(e) => setFormData({ ...formData, rig: e.target.value })}
          className="w-full px-4 py-3.5 rounded-xl bg-white border border-[#1d1d1f]/10 text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 focus:border-[#0071E3]/50 transition-all text-[15px] resize-none"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold px-8 py-3.5 rounded-full bg-[#1d1d1f] text-white hover:bg-[#1d1d1f]/90 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Get in Touch'}
          {status !== 'submitting' && (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          )}
        </button>
        {status === 'error' && (
          <p className="text-red-500 text-sm">Something went wrong. Try again or email us directly.</p>
        )}
      </form>
    </div>
  );
}
