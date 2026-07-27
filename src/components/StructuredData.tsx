export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://www.therigdr.com/#business',
    name: 'The Rig Doctor',
    description:
      'Professional custom pedalboard builder serving touring artists and home players. Hand-wired rigs, signal chain design, lifetime support. US-based, shipping nationwide.',
    url: 'https://www.therigdr.com',
    telephone: '+1-936-548-9254',
    email: 'info@therigdr.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '641 Amesbury Rd',
      addressLocality: 'Montgomery',
      addressRegion: 'TX',
      postalCode: '77316',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.3886,
      longitude: -95.6933,
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
      ratingCount: '52',
      reviewCount: '52',
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
            price: '99',
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

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Rig Doctor',
    url: 'https://www.therigdr.com',
    description:
      'Custom pedalboard builds, DIY kits, and tone tutoring for guitarists. Hand-wired rigs built in Montgomery, TX — shipping nationwide.',
    publisher: {
      '@id': 'https://www.therigdr.com/#business',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.therigdr.com/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
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

export function PricingFAQSchema() {
  const faqs = [
    {
      question: 'What determines the final price of a custom build?',
      answer:
        'Pedal count, routing complexity, power requirements, and whether you need extras like MIDI integration or effects loops. We quote everything upfront after your consultation so there are no surprises.',
    },
    {
      question: "What's included in the DIY Kit?",
      answer:
        'Hand-soldered Mogami patch cables, a custom rig blueprint designed for your specific pedals, a 60-minute Tone Tutoring session to walk through the build, and a pedalboard essentials kit with everything you need to get started.',
    },
    {
      question: 'Can I upgrade from a DIY Kit to a Custom Build?',
      answer:
        'Absolutely. If you start with a DIY Kit and decide you want us to take it from there, we will credit the kit price toward your custom build.',
    },
    {
      question: 'Do you offer rush builds?',
      answer:
        'Yes. If you have a tour date, recording session, or studio deadline, let us know and we will work with your timeline. Rush pricing varies by complexity.',
    },
    {
      question: 'What does lifetime support actually mean?',
      answer:
        'Every custom build comes with free repairs and adjustments for life. Swap a pedal, change your signal chain, need a patch cable replaced. We have got you covered, no charge.',
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
