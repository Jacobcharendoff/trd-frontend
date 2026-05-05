'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import Section from '@/components/Section';
import {
  boardSizes,
  pedalCategories,
  estimateBuild,
  type BoardSize,
  type PedalSelection,
  type RigPlan,
} from '@/lib/rig-planner';

/* ─────────────────────────────────────────────
   Pedal database — popular pedals per category
   ───────────────────────────────────────────── */
interface Pedal {
  id: string;
  name: string;
  categoryId: string;
  color: string;
  textColor: string;
  shortName: string;
  image?: string; // PedalPlayground image filename (ISC license)
}

const PEDAL_IMG_BASE = 'https://pedalplayground.com/images/pedals/';

const pedalDatabase: Pedal[] = [
  // Tuners
  { id: 'tu3', name: 'Boss TU-3', categoryId: 'tuner', color: '#1a1a1a', textColor: '#fff', shortName: 'TU-3', image: 'boss-tu3.png' },
  { id: 'polytune', name: 'TC Polytune 3', categoryId: 'tuner', color: '#1a1a1a', textColor: '#fff', shortName: 'Polytune' },
  // Filters / Wah
  { id: 'crybaby', name: 'Dunlop Cry Baby', categoryId: 'filter', color: '#2d2d2d', textColor: '#fff', shortName: 'Cry Baby', image: 'dunlop-gcb95.png' },
  { id: 'qtron', name: 'EHX Q-Tron', categoryId: 'filter', color: '#6B4C9A', textColor: '#fff', shortName: 'Q-Tron', image: 'electro-harmonix-q-tron.png' },
  // Compressors
  { id: 'keeley-comp', name: 'Keeley Compressor+', categoryId: 'compressor', color: '#3B82F6', textColor: '#fff', shortName: 'Keeley' },
  { id: 'dynacomp', name: 'MXR Dyna Comp', categoryId: 'compressor', color: '#EF4444', textColor: '#fff', shortName: 'Dyna Comp' },
  { id: 'cali76', name: 'Origin Cali76', categoryId: 'compressor', color: '#6B7280', textColor: '#fff', shortName: 'Cali76' },
  // Overdrive / Distortion
  { id: 'ts9', name: 'Ibanez Tube Screamer', categoryId: 'drive', color: '#22C55E', textColor: '#fff', shortName: 'TS9', image: 'ibanez-ts9.png' },
  { id: 'klon', name: 'Klon Centaur', categoryId: 'drive', color: '#D4A84B', textColor: '#1a1a1a', shortName: 'Klon' },
  { id: 'rat', name: 'ProCo RAT', categoryId: 'drive', color: '#1a1a1a', textColor: '#fff', shortName: 'RAT', image: 'proco-rat.png' },
  { id: 'bd2', name: 'Boss BD-2', categoryId: 'drive', color: '#3B82F6', textColor: '#fff', shortName: 'BD-2', image: 'boss-bd2.png' },
  { id: 'bigmuff', name: 'EHX Big Muff', categoryId: 'drive', color: '#7C3AED', textColor: '#fff', shortName: 'Big Muff', image: 'electro-harmonix-big-muff-pi.png' },
  { id: 'morning-glory', name: 'JHS Morning Glory', categoryId: 'drive', color: '#F59E0B', textColor: '#1a1a1a', shortName: 'MG' },
  { id: 'plumes', name: 'EQD Plumes', categoryId: 'drive', color: '#10B981', textColor: '#fff', shortName: 'Plumes' },
  { id: 'od1', name: 'Boss OD-1', categoryId: 'drive', color: '#F59E0B', textColor: '#1a1a1a', shortName: 'OD-1', image: 'boss-od1.png' },
  { id: 'king-of-tone', name: 'Analogman King of Tone', categoryId: 'drive', color: '#D4A84B', textColor: '#1a1a1a', shortName: 'KoT', image: 'analogman-king-of-tone.png' },
  { id: 'metal-zone', name: 'Boss MT-2', categoryId: 'drive', color: '#374151', textColor: '#fff', shortName: 'MT-2', image: 'boss-mt2.png' },
  { id: 'revv-g3', name: 'Revv G3', categoryId: 'drive', color: '#7C3AED', textColor: '#fff', shortName: 'G3' },
  { id: 'friedman-be', name: 'Friedman BE-OD', categoryId: 'drive', color: '#DC2626', textColor: '#fff', shortName: 'BE-OD' },
  // Modulation
  { id: 'ce2w', name: 'Boss CE-2W', categoryId: 'modulation', color: '#60A5FA', textColor: '#fff', shortName: 'CE-2W', image: 'boss-ce2w.png' },
  { id: 'phase90', name: 'MXR Phase 90', categoryId: 'modulation', color: '#F97316', textColor: '#fff', shortName: 'Phase 90', image: 'mxr-phase90.png' },
  { id: 'julia', name: 'Walrus Julia', categoryId: 'modulation', color: '#8B5CF6', textColor: '#fff', shortName: 'Julia' },
  { id: 'mobius', name: 'Strymon Mobius', categoryId: 'modulation', color: '#0EA5E9', textColor: '#fff', shortName: 'Mobius' },
  { id: 'univibe', name: 'Dunlop Uni-Vibe', categoryId: 'modulation', color: '#DC2626', textColor: '#fff', shortName: 'Uni-Vibe' },
  { id: 'boss-tr2', name: 'Boss TR-2', categoryId: 'modulation', color: '#F59E0B', textColor: '#1a1a1a', shortName: 'TR-2' },
  // Delay
  { id: 'dd500', name: 'Boss DD-500', categoryId: 'delay', color: '#2563EB', textColor: '#fff', shortName: 'DD-500', image: 'boss-dd500.png' },
  { id: 'timeline', name: 'Strymon Timeline', categoryId: 'delay', color: '#0EA5E9', textColor: '#fff', shortName: 'Timeline', image: 'strymon-timeline.png' },
  { id: 'carbon-copy', name: 'MXR Carbon Copy', categoryId: 'delay', color: '#059669', textColor: '#fff', shortName: 'CC' },
  { id: 'el-capistan', name: 'Strymon El Capistan', categoryId: 'delay', color: '#D97706', textColor: '#fff', shortName: 'El Cap' },
  { id: 'dd3', name: 'Boss DD-3', categoryId: 'delay', color: '#2563EB', textColor: '#fff', shortName: 'DD-3', image: 'boss-dd3.png' },
  { id: 'memory-man', name: 'EHX Deluxe Memory Man', categoryId: 'delay', color: '#6B4C9A', textColor: '#fff', shortName: 'DMM', image: 'electro-harmonix-deluxe-memory-man.png' },
  // Reverb
  { id: 'bigsky', name: 'Strymon BigSky', categoryId: 'reverb', color: '#0EA5E9', textColor: '#fff', shortName: 'BigSky', image: 'strymon-bigsky.png' },
  { id: 'rv6', name: 'Boss RV-6', categoryId: 'reverb', color: '#6366F1', textColor: '#fff', shortName: 'RV-6' },
  { id: 'slo', name: 'Walrus Slo', categoryId: 'reverb', color: '#EC4899', textColor: '#fff', shortName: 'Slö' },
  { id: 'flint', name: 'Strymon Flint', categoryId: 'reverb', color: '#DC2626', textColor: '#fff', shortName: 'Flint' },
  { id: 'holy-grail', name: 'EHX Holy Grail', categoryId: 'reverb', color: '#7C3AED', textColor: '#fff', shortName: 'Holy Grail', image: 'electro-harmonix-holy-grail.png' },
  { id: 'ventris', name: 'Source Audio Ventris', categoryId: 'reverb', color: '#1e40af', textColor: '#fff', shortName: 'Ventris' },
  // Utility
  { id: 'rc5', name: 'Boss RC-5', categoryId: 'utility', color: '#1a1a1a', textColor: '#fff', shortName: 'RC-5', image: 'boss-rc5.png' },
  { id: 'vpjr', name: 'Ernie Ball VP Jr', categoryId: 'utility', color: '#6B7280', textColor: '#fff', shortName: 'VP Jr' },
  { id: 'eq10', name: 'MXR 10-Band EQ', categoryId: 'utility', color: '#0EA5E9', textColor: '#fff', shortName: '10-Band' },
  { id: 'ns2', name: 'Boss NS-2', categoryId: 'utility', color: '#1e40af', textColor: '#fff', shortName: 'NS-2', image: 'boss-ns2.png' },
];

function getPedalById(id: string): Pedal | undefined {
  return pedalDatabase.find((p) => p.id === id);
}
