'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-[#1d1d1f]/95 backdrop-blur-xl border-t border-white/[0.06] py-3 px-6 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-[1080px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 text-[13px] text-[#f5f5f7]/70">
            <span className="inline-block w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" />
            Only 2 build spots left for 2026
          </span>
          <span className="sm:hidden text-[13px] text-[#f5f5f7]/70">
            2 spots left for 2026
          </span>
        </div>
        <Link
          href="/book"
          className="inline-flex items-center justify-center text-[13px] font-semibold rounded-full px-5 py-2 bg-[#0071E3] text-white hover:bg-[#005BB5] transition-colors whitespace-nowrap"
        >
          Book a Free Consultation
        </Link>
      </div>
    </div>
  );
}
