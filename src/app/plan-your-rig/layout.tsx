import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plan Your Rig — Interactive Pedalboard Builder',
  description:
    'Build your dream pedalboard online. Choose your board size, add pedals, see your signal chain, and get an instant build estimate from The Rig Doctor.',
  openGraph: {
    title: 'Plan Your Rig | The Rig Doctor',
    description:
      'Interactive pedalboard planner — pick your pedals, see your signal chain, get an instant build estimate.',
  },
};

export default function PlanYourRigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
