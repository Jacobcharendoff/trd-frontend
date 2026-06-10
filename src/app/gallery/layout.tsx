import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Gallery',
  description:
    'Browse custom pedalboard builds by The Rig Doctor. Touring rigs, studio boards, worship setups, and home player boards. 500+ rigs built. See the craftsmanship up close.',
  openGraph: {
    title: 'Build Gallery | The Rig Doctor',
    description:
      'Browse custom pedalboard builds. Touring rigs, studio boards, worship setups, and more.',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
