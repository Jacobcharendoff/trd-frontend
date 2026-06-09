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
      // Old Shopify product pages
      { source: '/products/:path*', destination: '/shop', permanent: true },
      // Old Shopify pages
      { source: '/pages/:path*', destination: '/', permanent: true },
      // Old Shopify blog
      { source: '/blogs/:path*', destination: '/blog', permanent: true },
      // Old cart URL
      { source: '/cart', destination: '/shop', permanent: true },
    ];
  },
};
export default nextConfig;
