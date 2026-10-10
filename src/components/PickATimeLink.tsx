'use client';

import { track } from '@/lib/track';

/** In-page link to the build-call calendar (#pick-a-time). Tracks which button got the click. */
export default function PickATimeLink({
  placement,
  className = '',
  children,
}: {
  placement: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href="#pick-a-time"
      className={className}
      onClick={() => track('select_content', { content_type: 'book_cta', item_id: `custom_builds_${placement}` })}
    >
      {children}
    </a>
  );
}
