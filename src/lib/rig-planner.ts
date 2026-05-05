/**
 * Rig Planner — data models and logic
 */

export interface PedalCategory {
  id: string;
  label: string;
  icon: string; // emoji or short label
  description: string;
  chainOrder: number; // position in standard signal chain
  examples: string[];
}

export const pedalCategories: PedalCategory[] = [
  {
    id: 'tuner',
    label: 'Tuner',
    icon: 'T',
    description: 'Chromatic tuners, polyphonic tuners',
    chainOrder: 1,
    examples: ['Boss TU-3', 'TC Polytune', 'Peterson StroboStomp'],
  },
  {
    id: 'filter',
    label: 'Filter / Wah',
    icon: 'W',
    description: 'Wah pedals, envelope filters, auto-wah',
    chainOrder: 2,
    examples: ['Cry Baby', 'MXR Envelope Filter', 'Morley Wah'],
  },
  {
    id: 'compressor',
    label: 'Compressor',
    icon: 'C',
    description: 'Optical, FET, or VCA compressors',
    chainOrder: 3,
    examples: ['Keeley Compressor+', 'Wampler Ego', 'MXR Dyna Comp'],
  },
  {
    id: 'drive',
    label: 'Overdrive / Distortion',
    icon: 'D',
    description: 'Overdrive, distortion, fuzz, boost',
    chainOrder: 4,
    examples: ['Tube Screamer', 'Klon', 'RAT', 'Big Muff', 'Boss BD-2'],
  },
  {
    id: 'modulation',
    label: 'Modulation',
    icon: 'M',
    description: 'Chorus, flanger, phaser, tremolo, vibrato',
    chainOrder: 5,
    examples: ['Boss CE-2W', 'MXR Phase 90', 'Strymon Mobius'],
  },
  {
    id: 'delay',
    label: 'Delay',
    icon: 'DL',
    description: 'Analog, digital, tape delay',
    chainOrder: 6,
    examples: ['Boss DD-500', 'Strymon Timeline', 'MXR Carbon Copy'],
  },
  {
    id: 'reverb',
    label: 'Reverb',
    icon: 'R',
    description: 'Spring, plate, hall, shimmer reverb',
    chainOrder: 7,
    examples: ['Strymon BigSky', 'Boss RV-6', 'Walrus Slo'],
  },
  {
    id: 'utility',
    label: 'Utility / Other',
    icon: 'U',
    description: 'Loopers, volume pedals, EQ, noise gates',
    chainOrder: 8,
    examples: ['Boss RC-5', 'Ernie Ball VP Jr', 'MXR 10-Band EQ'],
  },
];

export interface BoardSize {
  id: string;
  label: string;
  description: string;
  maxPedals: number;
  dimensions: string;
  basePrice: number; // build labor starting price
}

export const boardSizes: BoardSize[] = [
  {
    id: 'nano',
    label: 'Nano',
    description: 'Perfect for fly gigs or a tight setup',
    maxPedals: 4,
    dimensions: '~14" x 5"',
    basePrice: 299,
  },
  {
    id: 'small',
    label: 'Small',
    description: 'The essentials, done right',
    maxPedals: 6,
    dimensions: '~18" x 6"',
    basePrice: 449,
  },
  {
    id: 'medium',
    label: 'Medium',
    description: 'Room for everything you actually use',
    maxPedals: 10,
    dimensions: '~24" x 12"',
    basePrice: 699,
  },
  {
    id: 'large',
    label: 'Large',
    description: 'The full arsenal, pro-level',
    maxPedals: 16,
    dimensions: '~28" x 14"',
    basePrice: 999,
  },
  {
    id: 'xl',
    label: 'XL / Custom',
    description: 'Touring boards, multi-row setups',
    maxPedals: 24,
    dimensions: 'Custom',
    basePrice: 1299,
  },
];

export interface PedalSelection {
  categoryId: string;
  count: number;
  names: string[]; // optional: user can name specific pedals
}

export interface RigPlan {
  boardSize: BoardSize | null;
  pedals: PedalSelection[];
  usesEffectsLoop: boolean;
  needsSwitcher: boolean;
  notes: string;
}

/**
 * Estimate build cost based on rig plan
 */
export function estimateBuild(plan: RigPlan) {
  if (!plan.boardSize) return null;

  const totalPedals = plan.pedals.reduce((sum, p) => sum + p.count, 0);
  const patchCableCount = Math.max(0, totalPedals - 1);

  // Cable costs (Mogami 2314 patch + 2524 instrument)
  const patchCableCost = patchCableCount * 19; // $19 each (sale price)
  const instrumentCableCost = 2 * 65; // in + out cables

  // Switcher adder
  const switcherAdder = plan.needsSwitcher ? 200 : 0;
  const effectsLoopAdder = plan.usesEffectsLoop ? 75 : 0;

  const buildLabor = plan.boardSize.basePrice;
  const totalEstimate =
    buildLabor + patchCableCost + instrumentCableCost + switcherAdder + effectsLoopAdder;

  return {
    totalPedals,
    patchCableCount,
    patchCableCost,
    instrumentCableCost,
    buildLabor,
    switcherAdder,
    effectsLoopAdder,
    totalEstimate,
    signalChain: buildSignalChain(plan),
  };
}

/**
 * Build recommended signal chain from selections
 */
function buildSignalChain(plan: RigPlan): string[] {
  const chain: string[] = ['Guitar'];

  const sorted = [...plan.pedals]
    .filter((p) => p.count > 0)
    .sort((a, b) => {
      const catA = pedalCategories.find((c) => c.id === a.categoryId);
      const catB = pedalCategories.find((c) => c.id === b.categoryId);
      return (catA?.chainOrder || 99) - (catB?.chainOrder || 99);
    });

  if (plan.usesEffectsLoop) {
    // Front of amp
    const frontPedals = sorted.filter((p) => {
      const cat = pedalCategories.find((c) => c.id === p.categoryId);
      return cat && cat.chainOrder <= 4;
    });
    const loopPedals = sorted.filter((p) => {
      const cat = pedalCategories.find((c) => c.id === p.categoryId);
      return cat && cat.chainOrder > 4;
    });

    frontPedals.forEach((p) => {
      const cat = pedalCategories.find((c) => c.id === p.categoryId);
      if (cat) {
        for (let i = 0; i < p.count; i++) {
          chain.push(p.names[i] || cat.label);
        }
      }
    });

    chain.push('Amp Input');
    chain.push('FX Send');

    loopPedals.forEach((p) => {
      const cat = pedalCategories.find((c) => c.id === p.categoryId);
      if (cat) {
        for (let i = 0; i < p.count; i++) {
          chain.push(p.names[i] || cat.label);
        }
      }
    });

    chain.push('FX Return');
  } else {
    sorted.forEach((p) => {
      const cat = pedalCategories.find((c) => c.id === p.categoryId);
      if (cat) {
        for (let i = 0; i < p.count; i++) {
          chain.push(p.names[i] || cat.label);
        }
      }
    });
    chain.push('Amp');
  }

  return chain;
}
