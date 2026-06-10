import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Free Consultation',
  description:
    'Book a free 30-minute video consultation with The Rig Doctor. Discuss your rig, get a custom build plan, and receive a straight quote. No obligation.',
  openGraph: {
    title: 'Book a Free Consultation | The Rig Doctor',
    description:
      'Free 30-minute consultation. Tell us about your rig and get a custom build plan.',
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
