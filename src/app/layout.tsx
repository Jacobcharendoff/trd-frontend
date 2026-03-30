import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'The Rig Doctor | Custom Pedalboard Builds',
    template: '%s | The Rig Doctor',
  },
  description:
    'Professional custom pedalboard builds for touring artists and home players. 17 years of experience. 200+ rigs built. Montgomery, TX.',
  metadataBase: new URL('https://www.therigdr.com'),
  openGraph: {
    type: 'website',
    siteName: 'The Rig Doctor',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
