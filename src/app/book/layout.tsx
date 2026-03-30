import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Rig Build Consultation',
  description: 'Schedule a free 30-minute consultation to design your custom pedalboard. We\'ll talk through your setup, goals, and ideal rig.',
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
