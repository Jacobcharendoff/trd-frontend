'use client';

import { useEffect, useState } from 'react';
import { CAMPAIGN } from '@/lib/campaign';

/** "12 days, 4 hrs left" until the campaign deadline. Renders nothing before mount or after the deadline. */
export default function CampaignCountdown({ className = '' }: { className?: string }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (now === null) return <p className={className} aria-hidden="true">&nbsp;</p>;
  const ms = Date.parse(CAMPAIGN.deadline) - now;
  if (ms <= 0) return null;

  const days = Math.floor(ms / 86_400_000);
  const hrs = Math.floor((ms % 86_400_000) / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  const left =
    days > 0
      ? `${days} day${days === 1 ? '' : 's'}, ${hrs} hr${hrs === 1 ? '' : 's'}`
      : `${hrs} hr${hrs === 1 ? '' : 's'}, ${mins} min`;

  return (
    <p className={className}>
      {left} left to lock in by {CAMPAIGN.deadlineLabel}
    </p>
  );
}
