/**
 * The Rig Doctor Product Catalog
 * Static data pulled from Shopify Admin API
 */

export type ProductCategory =
  | 'Pedalboards'
  | 'Cables & Patch Cables'
  | 'Accessories'
  | 'Switching & Electronics'
  | 'Services';

export interface Product {
  id: string;
  title: string;
  handle: string;
  description: string;
  category: ProductCategory;
  priceMin: number;
  priceMax: number;
  image?: string; // Shopify CDN filename
}

export const products: Product[] = [
  {
    id: '1',
    title: 'PowerGrip® Pedal Fastener (10 ft)',
    handle: 'powergrip-6-20-ft',
    description: 'A Game-Changing Alternative...PowerGrip® is the BEST way to mount your pedals to your pedalboards!',
    category: 'Accessories',
    priceMin: 75.0,
    priceMax: 75.0,
  },
  {
    id: '2',
    title: 'Tie-Down Mounts & Zip Ties (50 ct.)',
    handle: 'tie-down-mounts',
    description: 'The most overlooked component of any professional pedalboard...',
    category: 'Accessories',
    priceMin: 15.0,
    priceMax: 15.0,
  },
  {
    id: '3',
    title: 'Mogami 2314 Patch Cables',
    handle: 'mogami-2314-patch-cables',
    description: 'Professional grade patch cables in multiple lengths. 4" to 40" available.',
    category: 'Cables & Patch Cables',
    priceMin: 19.0,
    priceMax: 35.0,
  },
  {
    id: '4',
    title: '1:1 Tone Tutoring',
    handle: 'tone-tutoring',
    description: 'Your tone, unlocked. One-on-one session to dial in your rig.',
    category: 'Services',
    priceMin: 99.0,
    priceMax: 99.0,
  },
  {
    id: '5',
    title: 'Stereo Cables (TRS)',
    handle: 'stereo-cables-trs',
    description: 'Professional stereo interconnect cables for effects loops and more.',
    category: 'Cables & Patch Cables',
    priceMin: 25.0,
    priceMax: 50.0,
  },
  {
    id: '6',
    title: 'Insert Cables (TRS to Dual TS)',
    handle: 'insert-cables-trs-to-dual-ts',
    description: 'Precision insert cables for connecting to amp effects loops.',
    category: 'Cables & Patch Cables',
    priceMin: 30.0,
    priceMax: 45.0,
  },
  {
    id: '7',
    title: 'Power Cables',
    handle: 'power-cables',
    description: 'Heavy-duty power distribution cables for pedalboards.',
    category: 'Cables & Patch Cables',
    priceMin: 15.0,
    priceMax: 20.0,
  },
  {
    id: '8',
    title: "The Doctor's Special RX Custom Clean",
    handle: 'the-doctors-special-rx-custom-clean',
    description: 'Deep cleaning and optimization service for your rig.',
    category: 'Services',
    priceMin: 50.0,
    priceMax: 50.0,
  },
  {
    id: '9',
    title: 'MIDI Cable',
    handle: 'midi-cable',
    description: 'High-quality MIDI cables for seamless switching control.',
    category: 'Cables & Patch Cables',
    priceMin: 20.0,
    priceMax: 35.0,
  },
  {
    id: '10',
    title: 'Custom Rig Build',
    handle: 'custom-rig-build',
    description: 'Full custom pedalboard build service. Consultation deposit starts at $1.',
    category: 'Services',
    priceMin: 1.0,
    priceMax: 1.0,
  },
  {
    id: '11',
    title: 'Buffered Interfaces',
    handle: 'buffer-interface',
    description: 'Professional buffered interfaces for pristine signal integrity.',
    category: 'Switching & Electronics',
    priceMin: 120.0,
    priceMax: 200.0,
  },
  {
    id: '12',
    title: 'RJM Mastermind',
    handle: 'rjm-pbc-6x',
    description: 'Professional switching control for complex rigs.',
    category: 'Switching & Electronics',
    priceMin: 549.0,
    priceMax: 549.0,
  },
  {
    id: '13',
    title: 'Creation Music Aero Series',
    handle: 'creation-music-aero-series',
    description: 'Lightweight pedalboard with professional flight case integration.',
    category: 'Pedalboards',
    priceMin: 369.0,
    priceMax: 489.0,
  },
  {
    id: '14',
    title: 'Creation Music Elevation Series',
    handle: 'creation-music-elevation-series',
    description: 'Premium tiered pedalboard for maximum visibility and control.',
    category: 'Pedalboards',
    priceMin: 429.0,
    priceMax: 549.0,
  },
  {
    id: '15',
    title: 'Creation Music Aero Risers',
    handle: 'creation-music-aero-risers',
    description: 'Height adjustment accessories for Aero Series boards.',
    category: 'Accessories',
    priceMin: 49.0,
    priceMax: 59.0,
  },
  {
    id: '16',
    title: 'Creation Music Elevation Power Unit',
    handle: 'v3-power-unit',
    description: 'Integrated power distribution for Elevation Series boards.',
    category: 'Accessories',
    priceMin: 99.0,
    priceMax: 99.0,
  },
  {
    id: '17',
    title: 'Creation Music Aero Extension Feet',
    handle: 'creation-music-aero-extension-feet',
    description: 'Stability extension feet for Aero Series pedalboards.',
    category: 'Accessories',
    priceMin: 29.0,
    priceMax: 29.0,
  },
  {
    id: '18',
    title: 'Creation Music D Panel Adapter',
    handle: 'creation-music-d-panel-adapter',
    description: 'Connector adapter for seamless panel integration.',
    category: 'Accessories',
    priceMin: 19.0,
    priceMax: 19.0,
  },
  {
    id: '19',
    title: 'Creation Music Blackout Flight Case',
    handle: 'creation-music-blackout-flight-case',
    description: 'Professional flight case for safe transport and storage.',
    category: 'Accessories',
    priceMin: 249.0,
    priceMax: 349.0,
  },
  {
    id: '20',
    title: 'RJM Micro Line Mixer',
    handle: 'rjm-micro-line-mixer',
    description: 'Compact line mixing solution for complex signal chains.',
    category: 'Switching & Electronics',
    priceMin: 349.0,
    priceMax: 349.0,
  },
];

export const categories: ProductCategory[] = [
  'Pedalboards',
  'Cables & Patch Cables',
  'Accessories',
  'Switching & Electronics',
  'Services',
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function getPriceDisplay(priceMin: number, priceMax: number): string {
  if (priceMin === priceMax) {
    return formatPrice(priceMin);
  }
  return `${formatPrice(priceMin)} – ${formatPrice(priceMax)}`;
}
