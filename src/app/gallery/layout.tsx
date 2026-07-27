import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Pedalboard Gallery',
  description:
    'Browse 500+ custom pedalboard builds by The Rig Doctor. Touring rigs, studio boards, worship setups, and home player builds. Houston, TX.',
  openGraph: {
    title: 'Custom Pedalboard Gallery | The Rig Doctor',
    description:
      '500+ custom pedalboard builds. Touring rigs, studio boards, worship setups, and home player builds.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Custom pedalboard gallery — The Rig Doctor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Pedalboard Gallery | The Rig Doctor',
    description:
      '500+ custom pedalboard builds. Touring rigs, studio boards, worship, and home player builds.',
    images: ['/og-image.png'],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
