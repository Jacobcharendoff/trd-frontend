import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/policies/'],
    },
    sitemap: 'https://www.therigdr.com/sitemap.xml',
  };
}
