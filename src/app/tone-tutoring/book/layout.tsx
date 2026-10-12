import type { Metadata } from 'next';

// Linked from the Tone Tutoring purchase email. Not a landing page, so keep it out of search.
export const metadata: Metadata = {
  title: 'Pick Your Tone Tutoring Session Time',
  description: 'Pick a time for your 60-minute Tone Tutoring session with Vince on Google Meet.',
  robots: { index: false, follow: false },
};

export default function ToneBookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
