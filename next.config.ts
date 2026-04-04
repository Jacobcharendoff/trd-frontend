import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'www.therigdr.com' },
    ],
  },
  async rewrites() {
    return [
      // Proxy Shopify checkout routes to Shopify's servers.
      // The Storefront API returns checkout URLs on our custom domain,
      // but /cart/* and /checkouts/* must be handled by Shopify.
      {
        source: '/cart/:path*',
        destination: 'https://the-rig-doctor.myshopify.com/cart/:path*',
      },
      {
        source: '/checkouts/:path*',
        destination: 'https://the-rig-doctor.myshopify.com/checkouts/:path*',
      },
    ];
  },
};
export default nextConfig;
