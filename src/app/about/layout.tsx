import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet Mason and Vince, the rig builders behind The Rig Doctor. 17+ years building custom pedalboards in Houston, TX. Our story, our values, our workshop.',
  openGraph: {
    title: 'About The Rig Doctor',
    description:
      'Meet Mason and Vince, the rig builders behind The Rig Doctor. 17+ years building custom pedalboards in Houston, TX.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
