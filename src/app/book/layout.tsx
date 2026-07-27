import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Consultation',
  description:
    'Schedule a free 30-minute consultation with The Rig Doctor. Talk through your rig, your goals, and get a straight quote. No pressure, no obligation.',
  openGraph: {
    title: 'Book a Free Consultation | The Rig Doctor',
    description:
      'Free 30-minute consultation. Talk through your rig, your goals, and get a straight quote. No pressure.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Book a consultation with The Rig Doctor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Consultation | The Rig Doctor',
    description:
      'Free 30-minute rig consultation. Talk through your goals, get a straight quote.',
    images: ['/og-image.png'],
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
