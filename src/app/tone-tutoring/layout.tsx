import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tone Tutoring',
  description:
    'Private 60-minute tone coaching sessions with a rig expert. Get personalized help with signal chain, pedal selection, and dialing in your sound. From $99.99.',
  openGraph: {
    title: 'Tone Tutoring — The Rig Doctor',
    description:
      'Private 60-minute tone coaching sessions. Signal chain, pedal selection, and dialing in your sound.',
  },
};

export default function ToneTutoringLayout({ children }: { children: React.ReactNode }) {
  return children;
}
