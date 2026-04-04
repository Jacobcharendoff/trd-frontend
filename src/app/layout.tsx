import type { Metadata } from 'next';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationPopup from '@/components/ConsultationPopup';
import LocalBusinessSchema from '@/components/StructuredData';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The Rig Doctor | Custom Pedalboard Builds',
    template: '%s | The Rig Doctor',
  },
  description:
    'Professional custom pedalboard builds for touring artists and home players. Hand-wired, stress-tested, lifetime support. Houston, TX.',
  metadataBase: new URL('https://www.therigdr.com'),
  openGraph: {
    type: 'website',
    siteName: 'The Rig Doctor',
    locale: 'en_US',
    title: 'The Rig Doctor | Custom Pedalboard Builds',
    description:
      'Professional custom pedalboard builds for touring artists and home players. 17+ years experience. 200+ rigs built.',
    url: 'https://www.therigdr.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Rig Doctor | Custom Pedalboard Builds',
    description:
      'Professional custom pedalboard builds for touring artists and home players.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.therigdr.com',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload hero poster for fast LCP */}
        <link
          rel="preload"
          as="image"
          href="https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png?width=1200&format=webp&v=1"
          type="image/webp"
        />
        <link rel="preconnect" href="https://cdn.shopify.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <LocalBusinessSchema />
      </head>
      <GoogleAnalytics />
      <body className="antialiased">
        {/* AnnouncementBar hidden for Dawn parity — restore post-launch */}
        {/* <AnnouncementBar /> */}
        <Header />
        <main>{children}</main>
        <Footer />
        <ConsultationPopup />
      </body>
    </html>
  );
}
