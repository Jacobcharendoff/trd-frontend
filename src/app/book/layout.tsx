import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Build Consultation',
  description:
    'Free 30-minute consultation for custom pedalboard builds and rebuilds. Plan the board with a builder and get a straight quote. For help with your tone, see Tone Tutoring.',
  openGraph: {
    title: 'Book a Free Build Consultation | The Rig Doctor',
    description:
      'Free 30-minute consultation for custom pedalboard builds and rebuilds. Get a straight quote.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Book a free build consultation with The Rig Doctor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Free Build Consultation | The Rig Doctor',
    description:
      'Free 30-minute build consultation for custom pedalboards and rebuilds. Get a straight quote.',
    images: ['/og-image.png'],
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
