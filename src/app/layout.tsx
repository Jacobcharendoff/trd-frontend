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
    default: 'The Rig Doctor | Custom Pedalboard Builds',
    template: '%s | The Rig Doctor',
  },
  description:
    'Professional custom pedalboard builds for touring artists and home players. 500+ rigs built. 17 years of experience. Free consultations. US-based, shipping nationwide.',
  metadataBase: new URL('https://www.therigdr.com'),
  openGraph: {
    type: 'website',
    siteName: 'The Rig Doctor',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Rig Doctor — Custom Pedalboard Builds',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
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
