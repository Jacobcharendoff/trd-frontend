import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gift Cards — Give the Gift of Better Tone',
  description:
    'The Rig Doctor gift card. Use it toward a custom pedalboard build, Tone Tutoring session, or anything in the shop. Digital delivery. No expiration. From $50 USD.',
  openGraph: {
    title: 'Gift Cards | The Rig Doctor',
    description:
      'Give the gift of better tone. Custom pedalboard builds, 1-on-1 tone coaching, and more. Digital delivery, no expiration.',
  },
};

export default function GiftCardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
