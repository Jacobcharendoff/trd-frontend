'use client';

import Link from 'next/link';

const comparisonData = [
  {
    feature: 'Signal Chain Design',
    diy: 'Trial and error, YouTube research',
    trd: 'Designed by a pro for your playing style',
  },
  {
    feature: 'Cable Quality',
    diy: "Whatever's on Amazon",
    trd: 'Pro-grade, hand-soldered connections',
  },
  {
    feature: 'Power Distribution',
    diy: 'Daisy chain (hello, noise)',
    trd: 'Isolated power, zero ground loop',
  },
  {
    feature: 'Build Time',
    diy: 'Weekends of frustration',
    trd: '2-4 weeks, delivered gig-ready',
  },
  {
    feature: 'Troubleshooting',
    diy: 'Reddit threads at 2am',
    trd: 'Lifetime support, one call away',
  },
  {
    feature: 'Cost',
    diy: '$200-500 in parts + your time',
    trd: 'Starts at $200 labor + parts',
  },
  {
    feature: 'Result',
    diy: 'Might work, might not',
    trd: 'Guaranteed to sound like you',
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="M22 4 12 14.01l-3-3" />
    </svg>
  );
}

function NeutralIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#1d1d1f]/30 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  );
}

export default function ComparisonTable() {
  return (
    <div className="w-full">
      {/* Comparison Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-4">
        {/* DIY Column */}
        <div className="flex flex-col">
          <div className="bg-[#f5f5f7] border border-black/[0.06] rounded-2xl p-6 mb-4 text-center">
            <h3 className="text-2xl font-semibold text-[#1d1d1f]">DIY Build</h3>
            <p className="text-sm text-[#1d1d1f]/50 mt-2">You&apos;re the builder</p>
          </div>

          <div className="space-y-3">
            {comparisonData.map((item, idx) => (
              <div key={idx}>
                <div className="text-xs font-medium text-[#1d1d1f]/40 uppercase tracking-wide mb-1.5 text-center lg:text-left lg:hidden">
                  {item.feature}
                </div>
                <div className="bg-[#f5f5f7] border border-black/[0.06] rounded-xl p-4 flex items-start gap-3">
                  <NeutralIcon />
                  <div>
                    <p className="text-xs font-medium text-[#1d1d1f]/40 uppercase tracking-wide mb-1 hidden lg:block">{item.feature}</p>
                    <p className="text-sm text-[#1d1d1f]/60 leading-relaxed">{item.diy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TRD Column */}
        <div className="flex flex-col">
          <div className="relative mb-4">
            <div className="bg-white rounded-2xl p-6 text-center border-2 border-[#F5A623]/30">
              <div className="flex items-center justify-center gap-3">
                <h3 className="text-2xl font-semibold trd-gradient-text">TRD Custom Build</h3>
                <span className="bg-[#F5A623]/10 text-[#F5A623] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                  Recommended
                </span>
              </div>
              <p className="text-sm text-[#1d1d1f]/50 mt-2">Built by a pro, for your tone</p>
            </div>
          </div>

          <div className="space-y-3">
            {comparisonData.map((item, idx) => (
              <div key={idx}>
                <div className="text-xs font-medium text-[#1d1d1f]/40 uppercase tracking-wide mb-1.5 text-center lg:text-left lg:hidden">
                  {item.feature}
                </div>
                <div className="bg-gradient-to-br from-[#10B981]/[0.04] to-[#F5A623]/[0.04] border border-[#10B981]/10 rounded-xl p-4 flex items-start gap-3">
                  <CheckIcon />
                  <div>
                    <p className="text-xs font-medium text-[#1d1d1f]/40 uppercase tracking-wide mb-1 hidden lg:block">{item.feature}</p>
                    <p className="text-sm text-[#1d1d1f] font-medium leading-relaxed">{item.trd}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 text-center">
        <p className="text-[#1d1d1f]/50 mb-4">Still not sure?</p>
        <Link
          href="/tone-tutoring"
          className="inline-flex items-center gap-2 bg-[#1d1d1f] hover:bg-[#1d1d1f]/90 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-200"
        >
          Try Tone Tutoring First
        </Link>
      </div>
    </div>
  );
}
