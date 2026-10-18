'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CAMPAIGN, campaignOpen, usd } from '@/lib/campaign';

export default function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);
  const [offerOpen, setOfferOpen] = useState(true);
  // On the campaign page itself, the bar jumps to the calendar instead of linking back to the page.
  const onCampaign = usePathname() === CAMPAIGN.path;
  useEffect(() => setOfferOpen(campaignOpen()), []);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-black/85 backdrop-blur-xl border-t border-white/[0.08] py-3 px-6 transition-all duration-300 ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-[1080px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-2 text-[13px] text-[#f5f5f7]/70">
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--trd-spectral)' }} />
            {offerOpen
              ? `2026 is sold out. ${usd(CAMPAIGN.discount)} off 2027 builds through ${CAMPAIGN.deadlineLabel}`
              : '2026 is sold out. Now booking 2027'}
          </span>
          <span className="sm:hidden text-[13px] text-[#f5f5f7]/70 whitespace-nowrap">
            2026 sold out
          </span>
        </div>
        <Link
          href={onCampaign ? '#pick-a-time' : CAMPAIGN.path}
          className="inline-flex items-center justify-center text-[13px] font-semibold rounded-full px-5 py-2 trd-cta-gradient whitespace-nowrap"
        >
          {onCampaign ? 'Pick a time with Vince' : 'Get in line for 2027'}
        </Link>
      </div>
    </div>
  );
}
