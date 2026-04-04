'use client';

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'The Rig Doctor',
    description: 'Professional custom pedalboard builds for touring artists and home players.',
    url: 'https://www.therigdr.com',
    telephone: '',
    email: 'info@therigdr.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Houston',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-17:00',
    sameAs: ['https://www.instagram.com/therigdr'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '44',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
