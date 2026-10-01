'use client';

import Link from 'next/link';
import { track } from '@/lib/track';

/**
 * "What do you need?" on the free consult forms.
 * The free call is for builds and rebuilds. Anyone after tone help or troubleshooting
 * is sent to Tone Tutoring instead of the build calendar.
 */

import type { Need } from '@/lib/build-need';

export type { Need };

const OPTIONS: Array<{ value: Exclude<Need, ''>; label: string }> = [
  { value: 'new', label: 'A new custom board' },
  { value: 'rebuild', label: 'A rebuild of my board' },
  { value: 'tone', label: 'Help with my tone' },
];

export default function BuildNeed({
  value,
  onChange,
  showError,
  idPrefix,
}: {
  value: Need;
  onChange: (v: Need) => void;
  showError?: boolean;
  idPrefix: string;
}) {
  return (
    <div>
      <p id={`${idPrefix}-need-label`} className="text-[14px] font-semibold text-black mb-2">
        What do you need?
      </p>
      <div role="radiogroup" aria-labelledby={`${idPrefix}-need-label`} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {OPTIONS.map((o) => {
          const on = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => {
                onChange(o.value);
                if (o.value === 'tone') track('select_content', { content_type: 'consult_form', item_id: 'tone_redirect' });
              }}
              className={`px-3 py-3 rounded-xl text-[14px] font-medium border transition-all text-center ${
                on
                  ? 'bg-black text-white border-black'
                  : 'bg-[#f5f5f7] text-black/75 border-transparent hover:border-black/15'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      {showError && !value && (
        <p className="text-red-600 text-[13px] mt-2">Pick one so we know what you need.</p>
      )}

      {value === 'tone' && (
        <div className="mt-4 rounded-2xl bg-[#f5f5f7] p-5">
          <p className="text-black font-semibold text-[16px] mb-1">That&apos;s Tone Tutoring, not the build call.</p>
          <p className="text-black/60 text-[14px] leading-relaxed mb-4">
            The free call is for planning a custom build or rebuild. For help dialing in your tone or fixing a problem on
            the board you have, book Tone Tutoring: 60 minutes, one on one over video, and we work through your whole
            signal chain with you. $99.
          </p>
          <Link
            href="/tone-tutoring"
            className="trd-cta-gradient inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-[15px]"
          >
            Book Tone Tutoring, $99
          </Link>
        </div>
      )}
    </div>
  );
}
