import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Pedalboard Builds',
  description:
    'Hand-wired custom pedalboard builds for touring artists and home players. Fully isolated power, engineered signal paths, road-tested before shipping. From $1,999 USD. Ships nationwide.',
  openGraph: {
    title: 'Custom Pedalboard Builds | The Rig Doctor',
    description:
      'Hand-wired custom pedalboard builds. Fully isolated power, engineered signal paths, road-tested. 500+ rigs built. From $1,999 USD.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Custom pedalboard build by The Rig Doctor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Pedalboard Builds | The Rig Doctor',
    description:
      'Hand-wired custom pedalboard builds. Fully isolated power, road-tested. 500+ rigs. From $1,999 USD.',
    images: ['/og-image.png'],
  },
};

export default function CustomBuildsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
