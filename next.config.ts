import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'www.therigdr.com' },
      { protocol: 'https', hostname: 'pedalplayground.com' },
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
    ],
  },
  async redirects() {
    return [
      // Old Shopify page routes
      { source: '/pages/custom-pedalboard-build', destination: '/process', permanent: true },
      { source: '/pages/custom-rig-build', destination: '/process', permanent: true },
      { source: '/pages/pedalboard-build-consult', destination: '/book', permanent: true },
      { source: '/pages/all-products', destination: '/shop', permanent: true },
      // Old Shopify collections
      { source: '/collections/:slug*', destination: '/shop', permanent: true },
      // Old Shopify product routes (individual products don't exist on headless — send to shop)
      { source: '/products/custom-rig-build', destination: '/book', permanent: true },
      { source: '/products/:slug*', destination: '/shop', permanent: true },
      // Old Shopify policy routes (footer had wrong paths)
      { source: '/policies/terms', destination: '/terms', permanent: true },
      { source: '/policies/terms-of-service', destination: '/terms', permanent: true },
      { source: '/policies/privacy', destination: '/privacy', permanent: true },
      { source: '/policies/privacy-policy', destination: '/privacy', permanent: true },
      { source: '/policies/refund', destination: '/refunds', permanent: true },
      { source: '/policies/refund-policy', destination: '/refunds', permanent: true },
      { source: '/policies/shipping-policy', destination: '/shipping', permanent: true },
      // Catch-all for any other old /pages/ route
      { source: '/pages/:slug*', destination: '/', permanent: true },
    ];
  },
};
export default nextConfig;
