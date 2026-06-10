import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How We Build Your Rig',
  description:
    'See exactly how The Rig Doctor builds a custom pedalboard — from free consultation to signal testing to your doorstep. 5-step process, 4–8 week turnaround, lifetime support.',
  openGraph: {
    title: 'How We Build — The Rig Doctor',
    description:
      'From consultation to doorstep: the 5-step process behind every Rig Doctor custom pedalboard build.',
    url: 'https://www.therigdr.com/process',
  },
  alternates: {
    canonical: 'https://www.therigdr.com/process',
  },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
