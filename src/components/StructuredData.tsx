export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['MusicStore', 'ProfessionalService'],
    '@id': 'https://www.therigdr.com/#business',
    name: 'The Rig Doctor',
    legalName: 'The Rig Doctor LLC',
    alternateName: ['The Rig Dr.', 'TRD'],
    description:
      'Texas music store and custom pedalboard builder. Hand-wired custom pedalboards, Tone Tutoring video sessions, and the cables, power and parts we use on our own builds. 17 years, 300+ rigs, shipping anywhere in the US.',
    url: 'https://www.therigdr.com',
    logo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/logo-white-hrt.png',
    image: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/2022-L1010577.jpg',
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
    hasMap: 'https://maps.google.com/?cid=17046293411844793764',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '17:00',
      },
    ],
    priceRange: '$$',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    founder: [
      { '@type': 'Person', name: 'Mason Marangella' },
      { '@type': 'Person', name: 'Vince DiGioia' },
      { '@type': 'Person', name: 'Jacob Charendoff' },
    ],
    knowsAbout: [
      'Custom pedalboards',
      'Pedalboard wiring',
      'Guitar signal chain',
      'Isolated pedalboard power',
      'MIDI switching',
      'Guitar tone',
    ],
    sameAs: [
      'https://maps.google.com/?cid=17046293411844793764',
      'https://www.instagram.com/therigdr',
      'https://www.youtube.com/@therigdr',
      'https://www.facebook.com/therigdr',
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
              'Free video consultation to discuss your rig, signal chain, and build requirements. No pressure, no obligation. Just honest advice from a professional rig builder.',
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
              'Full custom pedalboard build: layout, soldered cabling, clean power, MIDI integration, labeling. Road-ready and dead-quiet.',
            provider: { '@id': 'https://www.therigdr.com/#business' },
            areaServed: { '@type': 'Country', name: 'United States' },
          },
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'USD',
            price: '1999',
            minPrice: '1999',
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
      'Custom pedalboard builds and Tone Tutoring for guitarists. Hand-wired rigs built in Montgomery, TX, shipping nationwide.',
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
