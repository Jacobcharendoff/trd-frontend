import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Pedalboard Builds',
  description:
    'Hand-wired custom pedalboard builds for touring artists and home players. Fully isolated power, engineered signal paths, lifetime support. Builds from $1,999 USD. Ships nationwide.',
  openGraph: {
    title: 'Custom Pedalboard Builds | The Rig Doctor',
    description:
      'Hand-wired custom pedalboard builds. 500+ rigs built. 17 years experience. Free consultations.',
  },
};

export default function CustomBuildsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
