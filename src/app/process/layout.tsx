import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How We Build Your Rig',
  description:
    'Five steps from free consultation to stage-ready pedalboard. See how The Rig Doctor designs, builds, and delivers custom rigs. 4–8 week turnaround. Ships nationwide.',
  openGraph: {
    title: 'How We Build Your Rig | The Rig Doctor',
    description:
      'Five steps from consultation to stage-ready. See our custom pedalboard build process.',
  },
};

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
