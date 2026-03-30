export function LocalBusinessSchema() {
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
      addressLocality: 'Montgomery',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-17:00',
    sameAs: [
      'https://www.instagram.com/therigdr',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '50',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostSchema({ title, description, date, url }: { title: string; description: string; date: string; url: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: 'Jacob Charendoff',
    },
    publisher: {
      '@type': 'Organization',
      name: 'The Rig Doctor',
      url: 'https://www.therigdr.com',
    },
    url: url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
