import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Consultation',
  description:
    'Schedule a free 30-minute consultation to design your custom pedalboard. Talk through your setup, goals, and ideal rig with a pro builder.',
  openGraph: {
    title: 'Book a Free Consultation — The Rig Doctor',
    description:
      'Schedule a free 30-minute call. Talk through your setup and goals with a pro rig builder.',
  },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
