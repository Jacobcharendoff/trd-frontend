import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with The Rig Doctor. Ask about custom pedalboard builds, schedule a tone tutoring session, or book a free consultation.',
  openGraph: {
    title: 'Contact The Rig Doctor',
    description:
      'Get in touch. Ask about custom pedalboard builds, schedule a tone tutoring session, or book a free consultation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact The Rig Doctor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact The Rig Doctor',
    description:
      'Ask about custom pedalboard builds, tone tutoring, or book a free consultation.',
    images: ['/og-image.png'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
