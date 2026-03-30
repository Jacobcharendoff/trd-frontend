import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tone Tutoring — 1-on-1 Rig Coaching',
  description: 'Private tone coaching sessions with a rig expert. Get personalized help with signal chain, pedal selection, and dialing in your sound. From $99.99.',
};

export default function ToneTutoringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
