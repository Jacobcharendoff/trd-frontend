import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Tone Shop',
  description:
    'Shop cables, pedalboards, switching equipment, and more. Everything you need to build a rig that works.',
  openGraph: {
    title: 'The Tone Shop | The Rig Doctor',
    description:
      'Professional cables, pedalboards, and switching equipment from The Rig Doctor.',
    type: 'website',
    url: 'https://www.therigdr.com/shop',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
