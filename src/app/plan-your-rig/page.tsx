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

/* ─────────────────────────────────────────────
   Starter Templates
   ───────────────────────────────────────────── */
interface StarterTemplate {
  id: string;
  name: string;
  genre: string;
  description: string;
  boardSizeId: string;
  pedalIds: string[];
  usesEffectsLoop: boolean;
  icon: string;
  gradient: string;
}

const starterTemplates: StarterTemplate[] = [
  {
    id: 'blues',
    name: 'Blues Board',
    genre: 'Blues / Classic Rock',
    description: 'Warm cleans, smooth breakup, and just enough shimmer. SRV meets Mayer.',
    boardSizeId: 'small',
    pedalIds: ['tu3', 'keeley-comp', 'ts9', 'bd2', 'ce2w', 'carbon-copy'],
    usesEffectsLoop: false,
    icon: '🎸',
    gradient: 'from-blue-600 to-indigo-800',
  },
  {
    id: 'worship',
    name: 'Worship Board',
    genre: 'Worship / Ambient',
    description: 'Shimmering pads, dotted-eighth delays, and infinite reverb. Sunday morning ready.',
    boardSizeId: 'medium',
    pedalIds: ['polytune', 'keeley-comp', 'morning-glory', 'ts9', 'ce2w', 'timeline', 'el-capistan', 'bigsky'],
    usesEffectsLoop: true,
    icon: '✨',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    id: 'classic-rock',
    name: 'Classic Rock',
    genre: 'Rock / Hard Rock',
    description: 'Crunchy riffs, wah solos, and a wall of sound. Hendrix, Zeppelin, AC/DC.',
    boardSizeId: 'medium',
    pedalIds: ['tu3', 'crybaby', 'dynacomp', 'od1', 'rat', 'phase90', 'dd3', 'rv6'],
    usesEffectsLoop: false,
    icon: '🔥',
    gradient: 'from-red-600 to-orange-600',
  },
  {
    id: 'metal',
    name: 'Metal Board',
    genre: 'Metal / High Gain',
    description: 'Tight palm mutes, scooped mids, precision. Djent to death metal.',
    boardSizeId: 'medium',
    pedalIds: ['tu3', 'ns2', 'ts9', 'revv-g3', 'friedman-be', 'eq10', 'dd500', 'rv6'],
    usesEffectsLoop: true,
    icon: '🤘',
    gradient: 'from-gray-800 to-gray-950',
  },
  {
    id: 'ambient',
    name: 'Ambient / Post-Rock',
    genre: 'Ambient / Shoegaze',
    description: 'Walls of sound, infinite sustain, textures on textures. Explosions in the Sky vibes.',
    boardSizeId: 'large',
    pedalIds: ['polytune', 'keeley-comp', 'plumes', 'bigmuff', 'julia', 'mobius', 'timeline', 'el-capistan', 'bigsky', 'slo', 'rc5'],
    usesEffectsLoop: true,
    icon: '🌊',
    gradient: 'from-cyan-600 to-teal-700',
  },
];

/* ─────────────────────────────────────────────
   Board placed pedal type
   ───────────────────────────────────────────── */
interface PlacedPedal {
  instanceId: string;
  pedal: Pedal;
  customName?: string;
  addedAt: number; // timestamp for animation
}

/* ─────────────────────────────────────────────
   Pro tips engine
   ───────────────────────────────────────────── */
function getProTips(placed: PlacedPedal[], board: BoardSize | null, usesEffectsLoop: boolean): string[] {
  const tips: string[] = [];
  const cats = placed.map((p) => p.pedal.categoryId);

  if (placed.length === 0) {
    tips.push('Click pedals from the catalog to add them to your board. We\'ll handle the signal chain order.');
    return tips;
  }

  const driveCount = cats.filter((c) => c === 'drive').length;
  if (driveCount >= 2) {
    tips.push('Stacking drives: put your lower-gain pedal first for a tighter, more focused boost into the heavier drive.');
  }

  if (!cats.includes('tuner') && placed.length >= 3) {
    tips.push('No tuner? A tuner first in your chain gives the cleanest signal for tuning and doubles as a mute switch.');
  }

  if (!usesEffectsLoop && cats.includes('delay') && cats.includes('drive')) {
    tips.push('Running delay after drive works, but if you use your amp\'s gain channel, an effects loop keeps delays cleaner.');
  }

  if (board && placed.length > board.maxPedals) {
    tips.push(`${placed.length} pedals on a ${board.label} board (max ${board.maxPedals}). Consider sizing up for comfortable spacing.`);
  }

  if (cats.includes('modulation') && usesEffectsLoop) {
    tips.push('Modulation in the FX loop = cleaner sound. Some players prefer chorus up front for grittier textures — try both.');
  }

  if (cats.filter((c) => c === 'reverb').length >= 2) {
    tips.push('Two reverbs? Stack a short plate into a long hall for depth that doesn\'t wash out. Beautiful move.');
  }

  if (placed.length >= 4 && tips.length === 0) {
    tips.push('Solid chain. We auto-order using standard practice — we can customize routing in your consultation.');
  }

  return tips.slice(0, 2);
}

/* ─────────────────────────────────────────────
   Board dimensions for visual rendering
   ───────────────────────────────────────────── */
function getBoardLayout(boardId: string) {
  switch (boardId) {
    case 'nano':
      return { cols: 4, rows: 1, width: 'max-w-[520px]', aspect: 'aspect-[4/1.4]' };
    case 'small':
      return { cols: 3, rows: 2, width: 'max-w-[520px]', aspect: 'aspect-[3/1.6]' };
    case 'medium':
      return { cols: 5, rows: 2, width: 'max-w-[680px]', aspect: 'aspect-[5/2.2]' };
    case 'large':
      return { cols: 5, rows: 3, width: 'max-w-[720px]', aspect: 'aspect-[5/3]' };
    case 'xl':
      return { cols: 6, rows: 4, width: 'max-w-[780px]', aspect: 'aspect-[6/3.6]' };
    default:
      return { cols: 5, rows: 2, width: 'max-w-[680px]', aspect: 'aspect-[5/2.2]' };
  }
}

/* ─────────────────────────────────────────────
   Animated Pedal Block
   ───────────────────────────────────────────── */
function PedalBlock({
  pp,
  onRemove,
}: {
  pp: PlacedPedal;
  onRemove: (id: string) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const hasImage = !!pp.pedal.image && !imgError;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      ref={ref}
      onClick={() => onRemove(pp.instanceId)}
      className={`group relative aspect-[1/1.3] rounded-xl overflow-hidden shadow-lg hover:scale-[1.08] hover:shadow-2xl transition-all duration-200 cursor-pointer ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
      style={{
        backgroundColor: pp.pedal.color,
        transitionProperty: 'opacity, transform, box-shadow',
      }}
      title={`${pp.pedal.name} — click to remove`}
    >
      {/* Real product image */}
      {hasImage && (
        <img
          src={`${PEDAL_IMG_BASE}${pp.pedal.image}`}
          alt={pp.pedal.name}
          className={`absolute inset-0 w-full h-full object-contain p-0.5 transition-opacity duration-300 ${
            imgLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          draggable={false}
        />
      )}

      {/* Fallback: styled pedal block (shows when no image or image loading) */}
      {(!hasImage || !imgLoaded) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-1.5">
          {/* Top jack ports */}
          <div className="absolute top-0 left-1/4 w-1.5 h-1 rounded-b-sm bg-black/40" />
          <div className="absolute top-0 right-1/4 w-1.5 h-1 rounded-b-sm bg-black/40" />

          {/* LED indicator */}
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_rgba(16,185,129,0.7)] animate-pulse" />

          {/* Knobs */}
          <div className="flex gap-1.5 mb-1">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20 border border-white/10" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/20 border border-white/10" />
          </div>

          {/* Pedal name */}
          <span
            className="text-[8px] sm:text-[10px] font-bold text-center leading-tight px-1"
            style={{ color: pp.pedal.textColor }}
          >
            {pp.pedal.shortName}
          </span>

          {/* Footswitch */}
          <div className="absolute bottom-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white/15 bg-black/40 shadow-inner" />
        </div>
      )}

      {/* Pedal name overlay on images */}
      {hasImage && imgLoaded && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-1 pb-1 pt-3">
          <span className="text-[7px] sm:text-[9px] font-bold text-white text-center block leading-tight drop-shadow-sm">
            {pp.pedal.shortName}
          </span>
        </div>
      )}

      {/* Hover: remove overlay */}
      <div className="absolute inset-0 rounded-xl bg-red-500/0 group-hover:bg-red-500/30 transition-colors duration-150 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white drop-shadow opacity-0 group-hover:opacity-100 transition-opacity duration-150" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────
   Main Page Component
   ───────────────────────────────────────────── */
export default function PlanYourRig() {
  const [selectedBoard, setSelectedBoard] = useState<BoardSize | null>(null);
  const [placedPedals, setPlacedPedals] = useState<PlacedPedal[]>([]);
  const [usesEffectsLoop, setUsesEffectsLoop] = useState(false);
  const [needsSwitcher, setNeedsSwitcher] = useState(false);
  const [notes, setNotes] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>('drive');
  const [showEstimate, setShowEstimate] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(true);
  const [recentlyAdded, setRecentlyAdded] = useState<string | null>(null);

  // Convert placed pedals to PedalSelection for cost estimation
  const pedalSelections: PedalSelection[] = useMemo(() => {
    const map = new Map<string, PedalSelection>();
    for (const pp of placedPedals) {
      const existing = map.get(pp.pedal.categoryId);
      if (existing) {
        existing.count++;
        existing.names.push(pp.customName || pp.pedal.name);
      } else {
        map.set(pp.pedal.categoryId, {
          categoryId: pp.pedal.categoryId,
          count: 1,
          names: [pp.customName || pp.pedal.name],
        });
      }
    }
    return Array.from(map.values());
  }, [placedPedals]);

  const plan: RigPlan = useMemo(
    () => ({
      boardSize: selectedBoard,
      pedals: pedalSelections,
      usesEffectsLoop,
      needsSwitcher,
      notes,
    }),
    [selectedBoard, pedalSelections, usesEffectsLoop, needsSwitcher, notes]
  );

  const estimate = useMemo(() => estimateBuild(plan), [plan]);
  const tips = useMemo(
    () => getProTips(placedPedals, selectedBoard, usesEffectsLoop),
    [placedPedals, selectedBoard, usesEffectsLoop]
  );

  // Category counts for badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const pp of placedPedals) {
      counts[pp.pedal.categoryId] = (counts[pp.pedal.categoryId] || 0) + 1;
    }
    return counts;
  }, [placedPedals]);

  // Signal chain — auto-ordered
  const signalChain = useMemo(() => {
    if (!placedPedals.length) return [];
    return [...placedPedals].sort((a, b) => {
      const catA = pedalCategories.find((c) => c.id === a.pedal.categoryId);
      const catB = pedalCategories.find((c) => c.id === b.pedal.categoryId);
      return (catA?.chainOrder || 99) - (catB?.chainOrder || 99);
    });
  }, [placedPedals]);

  // Search-filtered pedals
  const filteredPedals = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return pedalDatabase.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortName.toLowerCase().includes(q) ||
        pedalCategories.find((c) => c.id === p.categoryId)?.label.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const addPedal = useCallback(
    (pedal: Pedal) => {
      if (selectedBoard && placedPedals.length >= selectedBoard.maxPedals + 4) return;
      const instanceId = `${pedal.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setPlacedPedals((prev) => [...prev, { instanceId, pedal, addedAt: Date.now() }]);
      setRecentlyAdded(pedal.id);
      setTimeout(() => setRecentlyAdded(null), 600);
    },
    [selectedBoard, placedPedals.length]
  );

  const removePedal = useCallback((instanceId: string) => {
    setPlacedPedals((prev) => prev.filter((p) => p.instanceId !== instanceId));
  }, []);

  const clearBoard = useCallback(() => {
    setPlacedPedals([]);
    setShowEstimate(false);
  }, []);

  // Load a starter template
  const loadTemplate = useCallback(
    (template: StarterTemplate) => {
      const board = boardSizes.find((b) => b.id === template.boardSizeId);
      if (!board) return;
      setSelectedBoard(board);
      setUsesEffectsLoop(template.usesEffectsLoop);
      setShowTemplates(false);

      // Stagger pedal additions for animation
      const pedals: PlacedPedal[] = [];
      template.pedalIds.forEach((pid, i) => {
        const pedal = getPedalById(pid);
        if (pedal) {
          pedals.push({
            instanceId: `${pid}-${Date.now()}-${i}`,
            pedal,
            addedAt: Date.now() + i * 80,
          });
        }
      });
      setPlacedPedals(pedals);
    },
    []
  );

  // Build consultation URL
  const buildConsultUrl = () => {
    if (!selectedBoard || !estimate) return '/book';
    const pedalSummary = placedPedals.map((pp) => pp.customName || pp.pedal.name).join(', ');
    const params = new URLSearchParams({
      board: selectedBoard.label,
      pedals: pedalSummary,
      total: String(placedPedals.length),
      fx_loop: usesEffectsLoop ? 'yes' : 'no',
      switcher: needsSwitcher ? 'yes' : 'no',
      estimate: `$${estimate.totalEstimate.toLocaleString()}`,
      notes: notes || '',
      utm_source: 'rig_planner',
      utm_medium: 'website',
      utm_campaign: 'plan_your_rig',
    });
    return `/book?${params.toString()}`;
  };

  const boardLayout = selectedBoard ? getBoardLayout(selectedBoard.id) : null;

  return (
    <>
      {/* ── Hero ── */}
      <Section theme="dark" className="!py-10 md:!py-16">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5A623] mb-2">
            Interactive Rig Planner
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#f5f5f7] mb-2">
            Build your pedalboard
          </h1>
          <p className="text-[14px] sm:text-lg text-[#f5f5f7]/50 max-w-xl mx-auto">
            Pick a template or start from scratch. Drop your pedals, see your signal chain, get a build estimate.
          </p>
        </div>
      </Section>

      {/* ── Template Picker OR Board Size Picker ── */}
      {!selectedBoard && (
        <Section theme="lightGray" className="!py-10 md:!py-14">
          {showTemplates ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                    Start with a template
                  </h2>
                  <p className="text-[13px] text-black/40 mt-0.5">
                    Pre-loaded rigs you can customize. Or{' '}
                    <button
                      onClick={() => setShowTemplates(false)}
                      className="text-[#F5A623] hover:text-[#D48A1A] font-medium underline underline-offset-2 transition-colors"
                    >
                      start from scratch
                    </button>
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {starterTemplates.map((t) => {
                  const board = boardSizes.find((b) => b.id === t.boardSizeId);
                  return (
                    <button
                      key={t.id}
                      onClick={() => loadTemplate(t)}
                      className="group text-left rounded-2xl overflow-hidden border border-black/[0.04] bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {/* Gradient header */}
                      <div className={`bg-gradient-to-br ${t.gradient} px-5 py-4 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/10" />
                        <div className="relative flex items-center justify-between">
                          <div>
                            <span className="text-2xl">{t.icon}</span>
                            <h3 className="text-[16px] font-bold text-white mt-1">{t.name}</h3>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider block">
                              {board?.label} board
                            </span>
                            <span className="text-[11px] text-white/50">
                              {t.pedalIds.length} pedals
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="px-5 py-3.5">
                        <p className="text-[12px] text-black/50 leading-relaxed mb-2.5">
                          {t.description}
                        </p>
                        {/* Mini pedal preview */}
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {t.pedalIds.slice(0, 6).map((pid) => {
                            const p = getPedalById(pid);
                            if (!p) return null;
                            return p.image ? (
                              <div
                                key={pid}
                                className="w-7 h-7 rounded bg-white border border-black/[0.06] overflow-hidden flex items-center justify-center"
                                title={p.name}
                              >
                                <img
                                  src={`${PEDAL_IMG_BASE}${p.image}`}
                                  alt={p.shortName}
                                  className="w-full h-full object-contain"
                                  loading="lazy"
                                />
                              </div>
                            ) : (
                              <div
                                key={pid}
                                className="px-1.5 py-0.5 rounded text-[8px] font-bold shadow-sm"
                                style={{ backgroundColor: p.color, color: p.textColor }}
                              >
                                {p.shortName}
                              </div>
                            );
                          })}
                          {t.pedalIds.length > 6 && (
                            <span className="text-[9px] text-black/30 self-center ml-0.5">
                              +{t.pedalIds.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-5 pb-3.5">
                        <div className="flex items-center justify-between pt-2.5 border-t border-black/[0.04]">
                          <span className="text-[11px] text-black/30">{t.genre}</span>
                          <span className="text-[11px] font-semibold text-[#F5A623] group-hover:text-[#D48A1A] transition-colors">
                            Use template →
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                    Pick your board size
                  </h2>
                  <p className="text-[13px] text-black/40 mt-0.5">
                    This sets the canvas. Or{' '}
                    <button
                      onClick={() => setShowTemplates(true)}
                      className="text-[#F5A623] hover:text-[#D48A1A] font-medium underline underline-offset-2 transition-colors"
                    >
                      start from a template
                    </button>
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {boardSizes.map((board) => (
                  <button
                    key={board.id}
                    onClick={() => {
                      setSelectedBoard(board);
                      setShowTemplates(false);
                    }}
                    className="group text-left p-5 rounded-2xl border border-black/[0.04] bg-white hover:border-[#F5A623]/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-[17px] font-semibold text-[#1d1d1f] group-hover:text-[#D48A1A] transition-colors">
                        {board.label}
                      </h3>
                      <span className="text-[11px] font-semibold text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded-full">
                        {board.maxPedals} pedals
                      </span>
                    </div>
                    <p className="text-[13px] text-black/50 mb-1.5">{board.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] text-black/30">{board.dimensions}</p>
                      <p className="text-[13px] font-semibold text-[#1d1d1f]">from ${board.basePrice}</p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </Section>
      )}

      {/* ── Playground ── */}
      {selectedBoard && (
        <section className="bg-[#f5f5f7]">
          <div className="max-w-[1320px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
            {/* Board size bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setSelectedBoard(null);
                    clearBoard();
                    setShowTemplates(true);
                  }}
                  className="text-[13px] text-black/40 hover:text-black transition-colors flex items-center gap-1"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Templates
                </button>
                <div className="h-4 w-px bg-black/10" />
                <h2 className="text-[15px] font-semibold text-[#1d1d1f]">
                  {selectedBoard.label} Board
                </h2>
                <span className="text-[12px] text-black/35">{selectedBoard.dimensions}</span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-[13px] font-semibold transition-colors ${
                    placedPedals.length > selectedBoard.maxPedals ? 'text-red-500' : 'text-[#1d1d1f]'
                  }`}
                >
                  {placedPedals.length}/{selectedBoard.maxPedals} pedals
                </span>
                {placedPedals.length > 0 && (
                  <button
                    onClick={clearBoard}
                    className="text-[12px] text-black/30 hover:text-red-500 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* ── Main layout: Catalog + Board ── */}
            <div className="flex flex-col lg:flex-row gap-5">
              {/* ── Pedal Catalog ── */}
              <div className="lg:w-[290px] shrink-0">
                {/* Mobile toggle */}
                <button
                  onClick={() => setCatalogOpen(!catalogOpen)}
                  className="lg:hidden w-full flex items-center justify-between p-3 rounded-xl border border-black/[0.04] bg-white mb-3 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-semibold text-[#1d1d1f]">Pedal Catalog</span>
                    {placedPedals.length > 0 && (
                      <span className="text-[10px] font-semibold bg-[#F5A623] text-white px-1.5 py-0.5 rounded-full">
                        {placedPedals.length}
                      </span>
                    )}
                  </div>
                  <svg
                    viewBox="0 0 24 24"
                    className={`w-4 h-4 text-black/40 transition-transform ${catalogOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div className={`${catalogOpen ? 'block' : 'hidden'} lg:block`}>
                  <div className="bg-white rounded-2xl border border-black/[0.04] overflow-hidden shadow-sm">
                    {/* Search */}
                    <div className="p-2.5 border-b border-black/[0.04]">
                      <div className="relative">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-3.5 h-3.5 text-black/25 absolute left-2.5 top-1/2 -translate-y-1/2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="M21 21l-4.35-4.35" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Search pedals..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-2 text-[12px] rounded-lg bg-[#f5f5f7] border border-black/[0.04] placeholder:text-black/25 focus:outline-none focus:border-[#F5A623]/40 focus:ring-1 focus:ring-[#F5A623]/20"
                        />
                        {searchQuery && (
                          <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black/25 hover:text-black/50"
                          >
                            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="max-h-[55vh] lg:max-h-[calc(100vh-340px)] overflow-y-auto">
                      {/* Search results */}
                      {filteredPedals ? (
                        <div className="p-2 space-y-0.5">
                          {filteredPedals.length === 0 ? (
                            <p className="text-[12px] text-black/30 text-center py-4">No pedals found</p>
                          ) : (
                            filteredPedals.map((pedal) => (
                              <button
                                key={pedal.id}
                                onClick={() => addPedal(pedal)}
                                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#f5f5f7] transition-all group ${
                                  recentlyAdded === pedal.id ? 'bg-[#10B981]/10' : ''
                                }`}
                              >
                                {pedal.image ? (
                                  <div className="w-8 h-8 rounded shrink-0 overflow-hidden bg-white border border-black/[0.06] flex items-center justify-center">
                                    <img
                                      src={`${PEDAL_IMG_BASE}${pedal.image}`}
                                      alt={pedal.shortName}
                                      className="w-full h-full object-contain"
                                      loading="lazy"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="w-8 h-6 rounded shrink-0 flex items-center justify-center text-[8px] font-bold shadow-sm"
                                    style={{ backgroundColor: pedal.color, color: pedal.textColor }}
                                  >
                                    {pedal.shortName.slice(0, 4)}
                                  </div>
                                )}
                                <div className="text-left flex-1 min-w-0">
                                  <span className="text-[12px] text-[#1d1d1f] block truncate">{pedal.name}</span>
                                  <span className="text-[9px] text-black/30">
                                    {pedalCategories.find((c) => c.id === pedal.categoryId)?.label}
                                  </span>
                                </div>
                                <svg
                                  viewBox="0 0 24 24"
                                  className="w-3.5 h-3.5 text-black/0 group-hover:text-[#10B981] shrink-0 transition-colors"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                >
                                  <path d="M12 5v14M5 12h14" />
                                </svg>
                              </button>
                            ))
                          )}
                        </div>
                      ) : (
                        /* Category browser */
                        pedalCategories.map((cat) => {
                          const catPedals = pedalDatabase.filter((p) => p.categoryId === cat.id);
                          const isExpanded = expandedCategory === cat.id;
                          const count = categoryCounts[cat.id] || 0;

                          return (
                            <div key={cat.id} className="border-b border-black/[0.03] last:border-b-0">
                              <button
                                onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                                className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-[#f5f5f7]/60 transition-colors"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-7 h-7 rounded-lg bg-[#1d1d1f] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                    {cat.icon}
                                  </div>
                                  <div className="text-left">
                                    <span className="text-[13px] font-medium text-[#1d1d1f] block leading-tight">
                                      {cat.label}
                                    </span>
                                    <span className="text-[10px] text-black/30">{catPedals.length} options</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {/* Category badge */}
                                  {count > 0 && (
                                    <span className="text-[9px] font-bold bg-[#F5A623] text-white w-4.5 h-4.5 rounded-full flex items-center justify-center min-w-[18px]">
                                      {count}
                                    </span>
                                  )}
                                  <svg
                                    viewBox="0 0 24 24"
                                    className={`w-3.5 h-3.5 text-black/20 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                  >
                                    <path d="M6 9l6 6 6-6" />
                                  </svg>
                                </div>
                              </button>

                              {isExpanded && (
                                <div className="px-2 pb-2 space-y-0.5">
                                  {catPedals.map((pedal) => (
                                    <button
                                      key={pedal.id}
                                      onClick={() => addPedal(pedal)}
                                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#f5f5f7] transition-all group ${
                                        recentlyAdded === pedal.id ? 'bg-[#10B981]/10' : ''
                                      }`}
                                    >
                                      {pedal.image ? (
                                        <div className="w-8 h-8 rounded shrink-0 overflow-hidden bg-white border border-black/[0.06] flex items-center justify-center transition-transform group-hover:scale-110">
                                          <img
                                            src={`${PEDAL_IMG_BASE}${pedal.image}`}
                                            alt={pedal.shortName}
                                            className="w-full h-full object-contain"
                                            loading="lazy"
                                          />
                                        </div>
                                      ) : (
                                        <div
                                          className="w-8 h-6 rounded shrink-0 flex items-center justify-center text-[8px] font-bold shadow-sm transition-transform group-hover:scale-110"
                                          style={{ backgroundColor: pedal.color, color: pedal.textColor }}
                                        >
                                          {pedal.shortName.slice(0, 4)}
                                        </div>
                                      )}
                                      <span className="text-[12px] text-[#1d1d1f] text-left leading-tight flex-1">
                                        {pedal.name}
                                      </span>
                                      <svg
                                        viewBox="0 0 24 24"
                                        className="w-3.5 h-3.5 text-black/0 group-hover:text-[#10B981] shrink-0 transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                      >
                                        <path d="M12 5v14M5 12h14" />
                                      </svg>
                                    </button>
                                  ))}
                                  {/* Custom add */}
                                  <button
                                    onClick={() => {
                                      const custom: Pedal = {
                                        id: `custom-${cat.id}-${Date.now()}`,
                                        name: `Custom ${cat.label}`,
                                        categoryId: cat.id,
                                        color: '#4B5563',
                                        textColor: '#fff',
                                        shortName: cat.icon,
                                      };
                                      addPedal(custom);
                                    }}
                                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#f5f5f7] transition-colors group border border-dashed border-black/[0.08]"
                                  >
                                    <div className="w-8 h-6 rounded shrink-0 flex items-center justify-center text-[10px] text-black/25 border border-dashed border-black/[0.12]">
                                      +
                                    </div>
                                    <span className="text-[12px] text-black/35">Other {cat.label}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {/* Options toggles */}
                  <div className="mt-3 space-y-2">
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-black/[0.04] bg-white cursor-pointer hover:shadow-sm transition-all">
                      <input
                        type="checkbox"
                        checked={usesEffectsLoop}
                        onChange={(e) => setUsesEffectsLoop(e.target.checked)}
                        className="w-3.5 h-3.5 rounded accent-[#F5A623]"
                      />
                      <div>
                        <span className="text-[12px] font-medium text-[#1d1d1f] block leading-tight">Effects loop</span>
                        <span className="text-[10px] text-black/30">Time-based FX in the loop</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-black/[0.04] bg-white cursor-pointer hover:shadow-sm transition-all">
                      <input
                        type="checkbox"
                        checked={needsSwitcher}
                        onChange={(e) => setNeedsSwitcher(e.target.checked)}
                        className="w-3.5 h-3.5 rounded accent-[#F5A623]"
                      />
                      <div>
                        <span className="text-[12px] font-medium text-[#1d1d1f] block leading-tight">Loop switcher</span>
                        <span className="text-[10px] text-black/30">ES-8, Boss ES-5, GigRig</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* ── Board Canvas + Chain ── */}
              <div className="flex-1 min-w-0">
                {/* Visual Board */}
                <div className="bg-[#0a0a0a] rounded-2xl p-4 sm:p-6 mb-4 shadow-xl">
                  {/* Board label */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        Your Board
                      </span>
                    </div>
                    {placedPedals.length > 0 && (
                      <span className="text-[11px] text-white/25">Click a pedal to remove</span>
                    )}
                  </div>

                  {/* Board surface */}
                  {boardLayout && (
                    <div
                      className={`${boardLayout.width} mx-auto bg-gradient-to-b from-[#1e1e1e] to-[#161616] rounded-xl border border-white/[0.06] p-3 sm:p-5 relative overflow-hidden shadow-inner`}
                    >
                      {/* Board texture */}
                      <div
                        className="absolute inset-0 opacity-[0.015]"
                        style={{
                          backgroundImage:
                            'repeating-linear-gradient(90deg, transparent, transparent 18px, #fff 18px, #fff 19px), repeating-linear-gradient(0deg, transparent, transparent 18px, #fff 18px, #fff 19px)',
                        }}
                      />

                      {/* Rail lines */}
                      <div className="absolute left-0 right-0 top-3 h-px bg-white/[0.04]" />
                      <div className="absolute left-0 right-0 bottom-3 h-px bg-white/[0.04]" />

                      {placedPedals.length === 0 ? (
                        <div className={`${boardLayout.aspect} flex items-center justify-center relative min-h-[120px]`}>
                          <div className="text-center">
                            <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-dashed border-white/[0.1] flex items-center justify-center mx-auto mb-3">
                              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white/15" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            </div>
                            <p className="text-[14px] text-white/25 font-medium">Add pedals from the catalog</p>
                            <p className="text-[11px] text-white/12 mt-1">Or pick a template above</p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="grid gap-2.5 sm:gap-3 relative"
                          style={{
                            gridTemplateColumns: `repeat(${boardLayout.cols}, minmax(0, 1fr))`,
                          }}
                        >
                          {signalChain.map((pp) => (
                            <PedalBlock key={pp.instanceId} pp={pp} onRemove={removePedal} />
                          ))}

                          {/* Empty slots */}
                          {Array.from(
                            {
                              length: Math.max(0, boardLayout.cols * boardLayout.rows - placedPedals.length),
                            },
                            (_, i) => (
                              <div
                                key={`empty-${i}`}
                                className="aspect-[1/1.3] rounded-xl border border-dashed border-white/[0.06] flex items-center justify-center"
                              >
                                <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/[0.06]" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <path d="M12 5v14M5 12h14" />
                                </svg>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Signal Chain ── */}
                {signalChain.length > 0 && (
                  <div className="bg-white rounded-2xl border border-black/[0.04] p-4 sm:p-5 mb-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#F5A623]" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-black/35">
                        Signal Chain {usesEffectsLoop ? '· FX Loop' : ''}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Guitar */}
                      <div className="px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold bg-[#1d1d1f] text-white shadow-sm">
                        Guitar
                      </div>

                      {/* Animated connector */}
                      <div className="relative w-5 h-3 shrink-0">
                        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                          <div className="w-full h-px bg-black/10" />
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-black/15" />
                      </div>

                      {(() => {
                        const frontPedals = signalChain.filter((pp) => {
                          const cat = pedalCategories.find((c) => c.id === pp.pedal.categoryId);
                          return !usesEffectsLoop || (cat && cat.chainOrder <= 4);
                        });
                        const loopPedals = usesEffectsLoop
                          ? signalChain.filter((pp) => {
                              const cat = pedalCategories.find((c) => c.id === pp.pedal.categoryId);
                              return cat && cat.chainOrder > 4;
                            })
                          : [];

                        return (
                          <>
                            {frontPedals.map((pp, i) => (
                              <div key={pp.instanceId} className="flex items-center gap-1.5">
                                <div
                                  className="px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium shadow-sm"
                                  style={{ backgroundColor: pp.pedal.color, color: pp.pedal.textColor }}
                                >
                                  {pp.pedal.shortName}
                                </div>
                                {(i < frontPedals.length - 1 || true) && (
                                  <div className="relative w-5 h-3 shrink-0">
                                    <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                                      <div className="w-full h-px bg-black/10" />
                                    </div>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-black/15" />
                                  </div>
                                )}
                              </div>
                            ))}

                            {usesEffectsLoop && loopPedals.length > 0 && (
                              <>
                                <div className="px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold bg-[#1d1d1f] text-white shadow-sm">
                                  Amp ⤵ Send
                                </div>
                                <div className="relative w-5 h-3 shrink-0">
                                  <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                                    <div className="w-full h-px bg-black/10" />
                                  </div>
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-black/15" />
                                </div>
                                {loopPedals.map((pp, i) => (
                                  <div key={pp.instanceId} className="flex items-center gap-1.5">
                                    <div
                                      className="px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium shadow-sm"
                                      style={{ backgroundColor: pp.pedal.color, color: pp.pedal.textColor }}
                                    >
                                      {pp.pedal.shortName}
                                    </div>
                                    <div className="relative w-5 h-3 shrink-0">
                                      <div className="absolute inset-y-0 left-0 right-0 flex items-center">
                                        <div className="w-full h-px bg-black/10" />
                                      </div>
                                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent border-l-[4px] border-l-black/15" />
                                    </div>
                                  </div>
                                ))}
                                <div className="px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold bg-[#1d1d1f] text-white shadow-sm">
                                  Return
                                </div>
                              </>
                            )}

                            {!usesEffectsLoop && (
                              <div className="px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold bg-[#1d1d1f] text-white shadow-sm">
                                Amp
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>
                )}

                {/* ── Pro Tips ── */}
                {tips.length > 0 && placedPedals.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {tips.map((tip, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-white border border-[#F5A623]/[0.1] shadow-sm"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
                          <path d="M10 21h4" />
                        </svg>
                        <p className="text-[12px] sm:text-[13px] text-[#1d1d1f]/60 leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Notes ── */}
                {placedPedals.length > 0 && (
                  <div className="mb-4">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Anything else? Amp type, tone goals, gig requirements..."
                      rows={2}
                      className="w-full px-4 py-3 text-[13px] rounded-xl border border-black/[0.04] bg-white placeholder:text-black/20 focus:outline-none focus:border-[#F5A623]/40 focus:ring-1 focus:ring-[#F5A623]/20 resize-none shadow-sm"
                    />
                  </div>
                )}

                {/* ── Estimate Panel ── */}
                {placedPedals.length > 0 && estimate && (
                  <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-xl">
                    <button
                      onClick={() => setShowEstimate(!showEstimate)}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[14px] font-semibold text-[#f5f5f7]">Build estimate</span>
                        <span className="text-[11px] text-white/25">
                          {estimate.totalPedals} pedals · {estimate.patchCableCount} cables
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[20px] font-bold text-[#F5A623]">
                          ${estimate.totalEstimate.toLocaleString()}
                        </span>
                        <svg
                          viewBox="0 0 24 24"
                          className={`w-4 h-4 text-white/25 transition-transform ${showEstimate ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </button>

                    {showEstimate && (
                      <div className="px-5 pb-5 border-t border-white/[0.05]">
                        <div className="space-y-2.5 pt-4">
                          <div className="flex justify-between text-[13px]">
                            <span className="text-white/40">Build labor ({selectedBoard.label})</span>
                            <span className="text-[#f5f5f7]">${estimate.buildLabor.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[13px]">
                            <span className="text-white/40">Mogami 2314 patch cables ({estimate.patchCableCount})</span>
                            <span className="text-[#f5f5f7]">${estimate.patchCableCost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[13px]">
                            <span className="text-white/40">Mogami 2524 instrument cables (2)</span>
                            <span className="text-[#f5f5f7]">${estimate.instrumentCableCost.toLocaleString()}</span>
                          </div>
                          {estimate.effectsLoopAdder > 0 && (
                            <div className="flex justify-between text-[13px]">
                              <span className="text-white/40">Effects loop wiring</span>
                              <span className="text-[#f5f5f7]">${estimate.effectsLoopAdder}</span>
                            </div>
                          )}
                          {estimate.switcherAdder > 0 && (
                            <div className="flex justify-between text-[13px]">
                              <span className="text-white/40">Loop switcher integration</span>
                              <span className="text-[#f5f5f7]">${estimate.switcherAdder}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-[16px] font-bold pt-3 border-t border-white/[0.05]">
                            <span className="text-[#f5f5f7]">Estimated total</span>
                            <span className="text-[#F5A623]">${estimate.totalEstimate.toLocaleString()}</span>
                          </div>
                        </div>
                        <p className="text-[10px] text-white/20 mt-3">
                          Includes labor, Mogami cables, and mounting hardware. Board, power supply, and pedals not included.
                          Final quote in consultation. All builds include lifetime support and free repairs.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* ── CTA ── */}
                {placedPedals.length > 0 && (
                  <div className="text-center mt-6">
                    <Link
                      href={buildConsultUrl()}
                      className="inline-flex items-center gap-2.5 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-bold px-12 py-4 rounded-xl transition-all text-[16px] shadow-lg shadow-[#F5A623]/20 hover:shadow-xl hover:shadow-[#F5A623]/30 hover:-translate-y-0.5"
                    >
                      Get This Built
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <p className="text-[12px] text-black/30 mt-2.5">
                      Free consultation · No obligation · Lifetime support on every build
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <Section theme="dark">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#f5f5f7] mb-3">
            Not sure where to start?
          </h2>
          <p className="text-[15px] text-[#f5f5f7]/40 mb-6 max-w-lg mx-auto">
            Book a free rig consultation. We&apos;ll walk through your setup, talk tone goals,
            and figure out exactly what you need.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-[#f5f5f7] font-medium px-6 py-3 rounded-xl border border-white/[0.06] transition-all text-[14px] hover:-translate-y-0.5"
          >
            Book a Free Consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
