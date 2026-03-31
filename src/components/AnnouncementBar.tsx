'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-[#1d1d1f] text-white text-center py-2.5 px-6 text-[13px]">
      <p>
        <span className="text-[#0071E3] font-medium">Free consultation</span>
        {' — '}
        Book a call and let&apos;s talk about your next build.{' '}
        <Link href="/book" className="underline underline-offset-2 hover:text-[#0071E3] transition-colors">
          Book now →
        </Link>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
        aria-label="Dismiss announcement"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
