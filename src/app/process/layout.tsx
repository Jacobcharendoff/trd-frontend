import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Build Process',
  description:
    'From consultation to your doorstep. How The Rig Doctor designs, wires, and builds your custom pedalboard. Five steps to a stage-ready rig.',
  openGraph: {
    title: 'Our Build Process | The Rig Doctor',
    description:
      'From consultation to your doorstep. How The Rig Doctor builds your custom pedalboard in five steps.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Rig Doctor build process',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Build Process | The Rig Doctor',
    description:
      'Five steps from consultation to stage-ready. How The Rig Doctor builds your custom pedalboard.',
    images: ['/og-image.png'],
  },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
