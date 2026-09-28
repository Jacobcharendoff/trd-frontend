'use client';

import { useState } from 'react';
import { track } from '@/lib/track';

const INPUT =
  'w-full px-4 py-3.5 rounded-xl bg-white border border-[#1d1d1f]/10 text-[#1d1d1f] placeholder:text-[#1d1d1f]/30 focus:outline-none focus:ring-4 focus:ring-[#8E3FD9]/10 focus:border-[#8E3FD9]/40 transition-all text-[15px]';

const TIER_OPTIONS = [
  { value: 50, title: '$50', label: 'Written review' },
  { value: 75, title: '$75', label: 'Review + photo' },
  { value: 100, title: '$100', label: 'Review + video' },
];

/** Shrink big screenshots in the browser so uploads stay small and fast. */
async function shrink(file: File): Promise<Blob> {
  if (file.size < 1_500_000 && /image\/(jpeg|png|webp)/.test(file.type)) return file;
  try {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, 2400 / Math.max(bmp.width, bmp.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext('2d')?.drawImage(bmp, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.85));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

type Done = { amount: number; label: string; sentTo: string };

export default function RewardsClaimForm() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [tier, setTier] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [reviewText, setReviewText] = useState('');
  const [honest, setHonest] = useState(false);
  const [disclosed, setDisclosed] = useState(false);
  const [shareOk, setShareOk] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState<Done | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!tier) return setError('Pick which one you did.');
    if (!file) return setError('Add a screenshot of your posted Google review.');
    if (!honest || !disclosed) return setError('Tick both boxes to confirm.');
    setBusy(true);
    try {
      const fd = new FormData(e.currentTarget);
      const img = await shrink(file);
      fd.set('screenshot', img, img === file ? file.name : 'review.jpg');
      fd.set('tier', String(tier));
      const res = await fetch('/api/rewards/claim', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({ ok: false, error: 'Something went wrong. Try again.' }));
      if (!res.ok || !data.ok) {
        setError(data.error || 'Something went wrong. Try again.');
      } else {
        setDone({ amount: data.amount, label: data.label, sentTo: data.sentTo });
        track('review_reward_claim', { tier: data.amount, value: data.amount, currency: 'USD' });
      }
    } catch {
      setError('Something went wrong. Check your connection and try again.');
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <div className="trd-icon-ring w-16 h-16 mx-auto mb-6 text-black">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold tracking-tight text-[#1d1d1f] mb-3">
          Your ${done.amount} is on the way.
        </h3>
        <p className="text-[#1d1d1f]/55 text-[17px] leading-relaxed">
          We just sent it to {done.sentTo}. Give it a few minutes and check spam if it doesn&apos;t show. Thanks for
          telling it straight.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto space-y-6" noValidate>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <fieldset>
        <legend className="text-[15px] font-semibold text-[#1d1d1f] mb-3">What did you post?</legend>
        <div className="grid grid-cols-3 gap-3">
          {TIER_OPTIONS.map((t) => (
            <button
              type="button"
              key={t.value}
              onClick={() => setTier(t.value)}
              aria-pressed={tier === t.value}
              className={`rounded-2xl px-3 py-4 text-center border transition-all ${
                tier === t.value
                  ? 'border-[#8E3FD9] ring-4 ring-[#8E3FD9]/10 bg-white'
                  : 'border-[#1d1d1f]/10 bg-white hover:border-[#1d1d1f]/25'
              }`}
            >
              <span className={`block text-2xl font-bold tracking-tight ${tier === t.value ? 'trd-gradient-text' : 'text-[#1d1d1f]'}`}>
                {t.title}
              </span>
              <span className="block text-[13px] text-[#1d1d1f]/55 mt-1">{t.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className={INPUT} type="text" name="firstName" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
        <input className={INPUT} type="email" name="email" required placeholder="Email you ordered with" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
      </div>

      <label className="block">
        <span className="text-[15px] font-semibold text-[#1d1d1f]">Screenshot of your posted Google review</span>
        <span className="block text-[13px] text-[#1d1d1f]/50 mb-2">Make sure your photo or video shows in the screenshot.</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-[14px] text-[#1d1d1f]/70 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:bg-[#1d1d1f] file:text-white file:font-semibold hover:file:bg-black file:cursor-pointer"
        />
      </label>

      <label className="block">
        <span className="text-[15px] font-semibold text-[#1d1d1f]">Paste your review (optional)</span>
        <textarea
          name="reviewText"
          rows={3}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Makes it easy for us to thank you properly."
          className={`${INPUT} mt-2 resize-none`}
        />
      </label>

      <div className="space-y-3 text-[14px] text-[#1d1d1f]/75">
        <label className="flex gap-3 items-start">
          <input type="checkbox" name="honest" checked={honest} onChange={(e) => setHonest(e.target.checked)} className="mt-1 accent-[#8E3FD9]" />
          <span>It&apos;s my honest take on my own experience with The Rig Doctor.</span>
        </label>
        <label className="flex gap-3 items-start">
          <input type="checkbox" name="disclosed" checked={disclosed} onChange={(e) => setDisclosed(e.target.checked)} className="mt-1 accent-[#8E3FD9]" />
          <span>My review mentions that The Rig Doctor sent me a gift card as a thank-you.</span>
        </label>
        <label className="flex gap-3 items-start">
          <input type="checkbox" name="shareOk" checked={shareOk} onChange={(e) => setShareOk(e.target.checked)} className="mt-1 accent-[#8E3FD9]" />
          <span>You can share my review, photo or video on therigdr.com and social media.</span>
        </label>
      </div>

      {error && <p className="text-red-600 text-[14px]">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="trd-cta-gradient w-full inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {busy ? 'Sending...' : tier ? `Send me my $${tier} gift card` : 'Send me my gift card'}
      </button>
    </form>
  );
}
