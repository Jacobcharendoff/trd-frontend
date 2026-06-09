import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import HubSpotTracking from '@/components/HubSpotTracking';
import UTMCapture from '@/components/UTMCapture';
import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorInit from '@/components/ErrorInit';
import LocalBusinessSchema from '@/components/StructuredData';
import FAQSchema from '@/components/FAQSchema';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Custom Pedalboard Builder | The Rig Doctor',
    template: '%s | The Rig Doctor',
  },
  description:
    'America\'s premier custom pedalboard builder. 500+ hand-wired rigs for touring artists and home players. 17 years experience. Free consultations. Ships nationwide.',
  metadataBase: new URL('https://www.therigdr.com'),
  openGraph: {
    type: 'website',
    siteName: 'The Rig Doctor',
    title: 'Custom Pedalboard Builder | The Rig Doctor',
    description:
      'America\'s premier custom pedalboard builder. 500+ hand-wired rigs. 17 years experience. Free consultations.',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Rig Doctor — Custom Pedalboard Builder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Pedalboard Builder | The Rig Doctor',
    description:
      '500+ hand-wired rigs. 17 years experience. Free consultations. Ships nationwide.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LocalBusinessSchema />
        <FAQSchema />
        <Analytics />
        <HubSpotTracking />
        <UTMCapture />
        <ErrorInit />
        <Header />
        <ErrorBoundary>
          <main className="pt-14">{children}</main>
        </ErrorBoundary>
        <Footer />
      </body>
    </html>
  );
}
