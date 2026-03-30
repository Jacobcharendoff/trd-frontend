import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Process',
  description:
    'How The Rig Doctor builds your custom pedalboard. From free consultation to gig-ready delivery. 4 simple steps, 2-4 week build time, lifetime support.',
  openGraph: {
    title: 'How We Build Yours — The Rig Doctor',
    description:
      'From free consultation to gig-ready delivery. 4 steps, lifetime support.',
  },
};

export default function ProcessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
