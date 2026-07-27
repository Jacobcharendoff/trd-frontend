import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tone Tutoring — 1-on-1 Video Sessions',
  description:
    '60-minute 1-on-1 video session with expert pedalboard builders. Signal chain audit, amp settings, effects order, gear recommendations. $99 USD.',
  openGraph: {
    title: 'Tone Tutoring | The Rig Doctor',
    description:
      '60-minute 1-on-1 video tone session. Signal chain audit, amp settings, effects order, honest gear recs. $99 USD.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Tone Tutoring by The Rig Doctor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tone Tutoring | The Rig Doctor',
    description:
      '60-minute 1-on-1 video tone session. Signal chain audit, amp settings, gear recs. $99 USD.',
    images: ['/og-image.png'],
  },
};

export default function ToneTutoringLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
