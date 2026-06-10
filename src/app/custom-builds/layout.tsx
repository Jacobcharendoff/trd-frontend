import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Pedalboard Builds',
  description:
    'Professional custom pedalboard builds by The Rig Doctor. Hand-wired, isolated power, engineered signal paths. 500+ rigs built. Builds start from $2,000 USD. Free consultation.',
  openGraph: {
    title: 'Custom Pedalboard Builds — The Rig Doctor',
    description:
      'Hand-wired custom pedalboards built for touring artists and home players. 500+ rigs. 17 years experience. Free consultation.',
    url: 'https://www.therigdr.com/custom-builds',
  },
  alternates: {
    canonical: 'https://www.therigdr.com/custom-builds',
  },
};

export default function CustomBuildsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
