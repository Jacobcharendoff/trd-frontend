/**
 * site.ts — Single source of truth for all TRD business data.
 *
 * Every component reads from here. Pricing changes, contact info updates,
 * and service definitions happen in ONE place.
 *
 * This is TRD's equivalent of StayBookt's client.ts.
 */

export const site = {
  name: 'The Rig Doctor',
  legalName: 'The Rig Doctor LLC',
  tagline: 'Custom Pedalboard Builds & Tone Consulting',
  description: 'Custom pedalboard builds, DIY kits, and one-on-one tone tutoring. Hand-soldered Mogami cables, lifetime support, and 17 years of experience. Houston, TX — shipping nationwide.',

  // ─── Contact ───
  phone: {
    display: '(647) 680-2324',
    raw: '+16476802324',
  },
  email: 'jacob@therigdr.com',

  // ─── Location ───
  address: {
    street: '641 Amesbury Rd',
    city: 'Montgomery',
    state: 'TX',
    zip: '77316-3161',
    country: 'US',
    displayCity: 'Houston',
    displayState: 'TX',
    full: '641 Amesbury Rd, Montgomery, TX 77316-3161',
    displayFull: 'Houston, TX',
  },

  // ─── Services ───
  services: [
    {
      slug: 'custom-builds',
      name: 'Custom Builds',
      shortName: 'Custom Build',
      price: 1999,
      priceDisplay: '$1,999',
      priceLabel: 'starting at',
      description: 'We build your dream rig from scratch. Full design, premium components, hand-soldered connections, and a board that travels.',
      href: '/custom-builds',
      featured: true,
    },
    {
      slug: 'diy-kit',
      name: 'DIY Kit',
      shortName: 'DIY Kit',
      price: 749,
      priceDisplay: '$749',
      priceLabel: 'starting at',
      description: 'Everything you need to build your own pedalboard the right way. Pro-grade components, custom layout, and expert guidance.',
      href: '/diy-kit',
      featured: false,
    },
    {
      slug: 'tone-tutoring',
      name: 'Tone Tutoring',
      shortName: 'Tone Tutoring',
      price: 99,
      priceDisplay: '$99',
      priceLabel: '/ 60 min session',
      description: 'One-on-one with a Rig Doctor builder. We dial in your signal chain, troubleshoot tone issues, and map out your ideal rig.',
      href: '/tone-tutoring',
      featured: false,
    },
  ],

  // ─── Booking ───
  booking: {
    consultUrl: '/book',
    consultDuration: '30 min',
    consultPrice: 'Free',
    consultCta: 'Book a Consultation',
  },

  // ─── Social ───
  social: {
    instagram: {
      url: 'https://instagram.com/therigdr',
      handle: '@therigdr',
    },
    youtube: {
      url: 'https://youtube.com/@therigdr',
      handle: '@therigdr',
    },
    tiktok: {
      url: 'https://tiktok.com/@therigdr',
      handle: '@therigdr',
    },
  },

  // ─── SEO & Analytics ───
  seo: {
    domain: 'therigdr.com',
    url: 'https://therigdr.com',
    ga4Id: 'G-1FK63P86TN',
    primaryKeyword: 'custom pedalboard builds',
  },

  // ─── Trust Stats ───
  stats: {
    yearsExperience: 17,
    rigsBuilt: '200+',
    satisfactionRate: '100%',
  },

  // ─── Founders ───
  founders: [
    { name: 'Jacob Charendoff', role: 'Co-Founder' },
    { name: 'Mason Marangell', role: 'Co-Founder' },
    { name: 'Vince DiGoia', role: 'Co-Founder' },
  ],

  // ─── Selling Points (for CTAs, meta, schema) ───
  sellingPoints: [
    'Hand-soldered Mogami cables',
    'Lifetime support + free repairs',
    '17 years of experience',
    '200+ rigs built',
    'Ships nationwide',
    'Free 30-min consultation',
  ],
} as const;

// ─── Type Exports ───
export type Site = typeof site;
export type Service = (typeof site.services)[number];
