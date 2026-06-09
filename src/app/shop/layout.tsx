import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Build Essentials',
  description:
    'Accessories and services that complement every custom rig — tie-down mounts, cable management, and expert tone tutoring sessions.',
  openGraph: {
    title: 'Build Essentials | The Rig Doctor',
    description:
      'Accessories and expert tone services from The Rig Doctor. Everything that complements a custom pedalboard build.',
    type: 'website',
    url: 'https://www.therigdr.com/shop',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
