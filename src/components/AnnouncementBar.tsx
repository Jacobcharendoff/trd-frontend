'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#EC4899] text-white text-center py-2.5 px-10 text-[13px]">
      <Link
        href="/shop/mogami-2314-patch-cables"
        className="hover:opacity-90 transition-opacity"
      >
        <span className="hidden sm:inline">
          <span className="font-semibold">Mogami 2314 Patch Cables — $19</span>
          {' '}
          <span className="text-white/80 line-through">$24</span>
          {' · Sale ends May 1st · '}
        </span>
        <span className="sm:hidden">
          <span className="font-semibold">Mogami 2314 — $19</span>
          {' '}
          <span className="text-white/80 line-through">$24</span>
          {' · '}
        </span>
        <span className="underline underline-offset-2 font-semibold">Shop Now →</span>
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setVisible(false);
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1"
        aria-label="Dismiss announcement"
      >
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
