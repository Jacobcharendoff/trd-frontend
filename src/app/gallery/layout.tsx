import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse custom pedalboard builds from The Rig Doctor. Touring rigs, studio boards, worship setups, and home player builds. See our work.',
  openGraph: {
    title: 'Build Gallery — The Rig Doctor',
    description:
      'Browse custom pedalboard builds. Touring rigs, studio boards, worship setups, and more.',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
