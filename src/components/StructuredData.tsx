'use client';

export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.therigdr.com/#business',
    name: 'The Rig Doctor',
    description:
      'Professional custom pedalboard builds and signal chain design for touring artists and home players. Hand-wired, stress-tested, lifetime support.',
    url: 'https://www.therigdr.com',
    telephone: '+1-936-548-9254',
    email: 'info@therigdr.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '641 Amesbury Road',
      addressLocality: 'Montgomery',
      addressRegion: 'TX',
      postalCode: '77316',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.3888,
      longitude: -95.6933,
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-17:00',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    sameAs: [
      'https://www.instagram.com/therigdr',
      'https://www.youtube.com/@therigdr',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Custom Pedalboard Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Rig Build',
            description:
              'Full custom pedalboard build — layout, soldered cabling, clean power, MIDI integration, labeling. Road-ready and dead-quiet.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tone Tutoring',
            description:
              '60-minute video session to dial in your signal chain, effects order, amp settings, and overall rig strategy.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'DIY Rig Building Kit',
            description:
              'Full wiring and power spec, pre-cut cables, labeled parts, and a step-by-step map to assemble your own pedalboard.',
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostSchema({
  title,
  description,
  date,
  url,
}: {
  title: string;
  description: string;
  date: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: date,
    url,
    author: {
      '@type': 'Person',
      name: 'Jacob Charendoff',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Rig Doctor',
      url: 'https://www.therigdr.com',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
