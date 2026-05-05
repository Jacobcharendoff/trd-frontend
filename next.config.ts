import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'www.therigdr.com' },
      { protocol: 'https', hostname: 'pedalplayground.com' },
    ],
  },
};
export default nextConfig;
