'use client';

import { track } from '@/lib/track';

export const GOOGLE_REVIEW_URL = 'https://maps.google.com/?cid=17046293411844793764';

export default function ReviewButton() {
  return (
    <a
      href={GOOGLE_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track('review_click', { platform: 'google' })}
      className="trd-cta-gradient inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-semibold text-[17px]"
    >
      Leave a Google review
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </a>
  );
}
