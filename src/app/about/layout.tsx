import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Jacob and the team behind The Rig Doctor. 17+ years building custom pedalboards in Montgomery, TX. Our story, our values, our workshop.',
  openGraph: {
    title: 'About The Rig Doctor',
    description:
      'Meet Jacob and the team behind The Rig Doctor. 17+ years building custom pedalboards in Montgomery, TX.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
