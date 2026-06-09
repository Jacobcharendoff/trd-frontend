export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://www.therigdr.com/#business',
    name: 'The Rig Doctor',
    description:
      'Professional custom pedalboard builds and signal chain design for touring artists and home players. Hand-wired, stress-tested, lifetime support. US-based, shipping nationwide.',
    url: 'https://www.therigdr.com',
    telephone: '+1-936-548-9254',
    email: 'info@therigdr.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    sameAs: [
      'https://www.instagram.com/therigdr',
      'https://www.youtube.com/@therigdr',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '78',
      reviewCount: '78',
    },
    review: [
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Isaiah Sharkey' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'The pedalboard Jacob designed completely transformed my live rig. Best investment I\'ve made in my tone.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Tosin Abasi' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'He understands signal flow, tone shaping, and durability. Your board won\'t fail you on tour.',
      },
      {
        '@type': 'Review',
        author: { '@type': 'Person', name: 'Mike Stipanov' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: 'From consultation to delivery, the whole experience was professional and smooth. My new board is exactly what I envisioned.',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Custom Pedalboard Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Free Rig Build Consultation',
            description:
              'Free video consultation to discuss your rig, signal chain, and build requirements. No pressure, no obligation — just honest advice from a professional rig builder.',
            provider: { '@id': 'https://www.therigdr.com/#business' },
            areaServed: { '@type': 'Country', name: 'United States' },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            price: '0',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Rig Build',
            description:
              'Full custom pedalboard build — layout, soldered cabling, clean power, MIDI integration, labeling. Road-ready and dead-quiet.',
            provider: { '@id': 'https://www.therigdr.com/#business' },
            areaServed: { '@type': 'Country', name: 'United States' },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            price: '2000',
            minPrice: '2000',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tone Tutoring',
            description:
              '60-minute video session to dial in your signal chain, effects order, amp settings, and overall rig strategy.',
            provider: { '@id': 'https://www.therigdr.com/#business' },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            price: '99.99',
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
