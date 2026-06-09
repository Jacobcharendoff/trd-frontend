import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with The Rig Doctor. Questions about a custom pedalboard build, tone tutoring, or your current rig? Email, call, or book a free consultation.',
  openGraph: {
    title: 'Contact The Rig Doctor',
    description:
      'Questions about custom pedalboard builds or tone tutoring? Reach out — we typically respond within 24 hours.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
