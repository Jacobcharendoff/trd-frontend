import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tone Tutoring — $99 Expert Session',
  description:
    '60-minute 1-on-1 video session with a pro rig builder. Signal chain audit, amp settings, effects order, gear recommendations. $99 USD. Walk away with a clear plan.',
  openGraph: {
    title: 'Tone Tutoring | The Rig Doctor',
    description:
      '60-minute 1-on-1 tone coaching session. Signal chain audit, gear recs, and a clear plan. $99.',
  },
};

export default function ToneTutoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
