import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'www.therigdr.com' },
      { protocol: 'https', hostname: 'pedalplayground.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
  async redirects() {
    return [
      // Old Shopify collection pages (Google still indexing these)
      { source: '/collections/:path*', destination: '/', permanent: true },
      // Only Tone Tutoring is sold online for now (Oct 2026). Shop, product, kit and gift card pages
      // are off; temporary redirects so they can come back later.
      { source: '/shop/:slug(tone-tutoring.*)', destination: '/tone-tutoring', permanent: false },
      { source: '/shop', destination: '/custom-builds', permanent: false },
      { source: '/shop/:path*', destination: '/custom-builds', permanent: false },
      { source: '/diy-kit', destination: '/custom-builds', permanent: false },
      { source: '/gift-cards', destination: '/tone-tutoring', permanent: false },
      // Old Shopify product pages
      { source: '/products/:slug(tone-tutoring.*)', destination: '/tone-tutoring', permanent: false },
      { source: '/products/:path*', destination: '/custom-builds', permanent: false },
      // Old Shopify pages
      { source: '/pages/:path*', destination: '/', permanent: true },
      // Old Shopify blog
      { source: '/blogs/:path*', destination: '/blog', permanent: true },
      // Old cart URL
      { source: '/cart', destination: '/tone-tutoring', permanent: false },
    ];
  },
};
export default nextConfig;
