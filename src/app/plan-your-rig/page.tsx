'use client';

import { useState, useMemo, useCallback } from 'react';
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
  color: string; // bg color for the visual block
  textColor: string;
  shortName: string; // abbreviated for the board view
}

const pedalDatabase: Pedal[] = [
  // Tuners
  { id: 'tu3', name: 'Boss TU-3', categoryId: 'tuner', color: '#1a1a1a', textColor: '#fff', shortName: 'TU-3' },
  { id: 'polytune', name: 'TC Polytune 3', categoryId: 'tuner', color: '#1a1a1a', textColor: '#fff', shortName: 'Polytune' },
  // Filters / Wah
  { id: 'crybaby', name: 'Dunlop Cry Baby', categoryId: 'filter', color: '#2d2d2d', textColor: '#fff', shortName: 'Cry Baby' },
  { id: 'qtron', name: 'EHX Q-Tron', categoryId: 'filter', color: '#6B4C9A', textColor: '#fff', shortName: 'Q-Tron' },
  // Compressors
  { id: 'keeley-comp', name: 'Keeley Compressor+', categoryId: 'compressor', color: '#3B82F6', textColor: '#fff', shortName: 'Keeley' },
  { id: 'dynacomp', name: 'MXR Dyna Comp', categoryId: 'compressor', color: '#EF4444', textColor: '#fff', shortName: 'Dyna Comp' },
  { id: 'cali76', name: 'Origin Cali76', categoryId: 'compressor', color: '#6B7280', textColor: '#fff', shortName: 'Cali76' },
  // Overdrive / Distortion
  { id: 'ts9', name: 'Ibanez Tube Screamer', categoryId: 'drive', color: '#22C55E', textColor: '#fff', shortName: 'TS9' },
  { id: 'klon', name: 'Klon Centaur', categoryId: 'drive', color: '#D4A84B', textColor: '#1a1a1a', shortName: 'Klon' },
  { id: 'rat', name: 'ProCo RAT', categoryId: 'drive', color: '#1a1a1a', textColor: '#fff', shortName: 'RAT' },
  { id: 'bd2', name: 'Boss BD-2', categoryId: 'drive', color: '#3B82F6', textColor: '#fff', shortName: 'BD-2' },
  { id: 'bigmuff', name: 'EHX Big Muff', categoryId: 'drive', color: '#7C3AED', textColor: '#fff', shortName: 'Big Muff' },
  { id: 'morning-glory', name: 'JHS Morning Glory', categoryId: 'drive', color: '#F59E0B', textColor: '#1a1a1a', shortName: 'MG' },
  { id: 'plumes', name: 'EQD Plumes', categoryId: 'drive', color: '#10B981', textColor: '#fff', shortName: 'Plumes' },
  // Modulation
  { id: 'ce2w', name: 'Boss CE-2W', categoryId: 'modulation', color: '#60A5FA', textColor: '#fff', shortName: 'CE-2W' },
  { id: 'phase90', name: 'MXR Phase 90', categoryId: 'modulation', color: '#F97316', textColor: '#fff', shortName: 'Phase 90' },
  { id: 'julia', name: 'Walrus Julia', categoryId: 'modulation', color: '#8B5CF6', textColor: '#fff', shortName: 'Julia' },
  { id: 'mobius', name: 'Strymon Mobius', categoryId: 'modulation', color: '#0EA5E9', textColor: '#fff', shortName: 'Mobius' },
  // Delay
  { id: 'dd500', name: 'Boss DD-500', categoryId: 'delay', color: '#2563EB', textColor: '#fff', shortName: 'DD-500' },
  { id: 'timeline', name: 'Strymon Timeline', categoryId: 'delay', color: '#0EA5E9', textColor: '#fff', shortName: 'Timeline' },
  { id: 'carbon-copy', name: 'MXR Carbon Copy', categoryId: 'delay', color: '#059669', textColor: '#fff', shortName: 'CC' },
  { id: 'el-capistan', name: 'Strymon El Capistan', categoryId: 'delay', color: '#D97706', textColor: '#fff', shortName: 'El Cap' },
  // Reverb
  { id: 'bigsky', name: 'Strymon BigSky', categoryId: 'reverb', color: '#0EA5E9', textColor: '#fff', shortName: 'BigSky' },
  { id: 'rv6', name: 'Boss RV-6', categoryId: 'reverb', color: '#6366F1', textColor: '#fff', shortName: 'RV-6' },
  { id: 'slo', name: 'Walrus Slo', categoryId: 'reverb', color: '#EC4899', textColor: '#fff', shortName: 'Slö' },
  { id: 'flint', name: 'Strymon Flint', categoryId: 'reverb', color: '#DC2626', textColor: '#fff', shortName: 'Flint' },
  // Utility
  { id: 'rc5', name: 'Boss RC-5', categoryId: 'utility', color: '#1a1a1a', textColor: '#fff', shortName: 'RC-5' },
  { id: 'vpjr', name: 'Ernie Ball VP Jr', categoryId: 'utility', color: '#6B7280', textColor: '#fff', shortName: 'VP Jr' },
  { id: 'eq10', name: 'MXR 10-Band EQ', categoryId: 'utility', color: '#0EA5E9', textColor: '#fff', shortName: '10-Band' },
  { id: 'ns2', name: 'Boss NS-2', categoryId: 'utility', color: '#1e40af', textColor: '#fff', shortName: 'NS-2' },
];

/* ─────────────────────────────────────────────
   Board placed pedal type
   ───────────────────────────────────────────── */
interface PlacedPedal {
  instanceId: string;
  pedal: Pedal;
  customName?: string;
}

/* ─────────────────────────────────────────────
   Pro tips engine — contextual tips based on rig
   ───────────────────────────────────────────── */
function getProTips(placed: PlacedPedal[], board: BoardSize | null, usesEffectsLoop: boolean): string[] {
  const tips: string[] = [];
  const cats = placed.map((p) => p.pedal.categoryId);

  if (placed.length === 0) {
    tips.push('Click pedals from the catalog to add them to your board. We\'ll handle the signal chain order.');
    return tips;
  }

  // Drive stacking
  const driveCount = cats.filter((c) => c === 'drive').length;
  if (driveCount >= 2) {
    tips.push('Stacking drives: put your lower-gain pedal first for a tighter, more focused boost into the heavier drive.');
  }

  // No tuner
  if (!cats.includes('tuner') && placed.length >= 3) {
    tips.push('No tuner? A tuner at the start of your chain gives you the cleanest signal for accurate tuning and doubles as a mute switch.');
  }

  // Effects loop suggestion
  if (!usesEffectsLoop && cats.includes('delay') && cats.includes('drive')) {
    tips.push('Running delay after drive works great, but if you use your amp\'s gain channel, an effects loop keeps your delays cleaner.');
  }

  // Board too small
  if (board && placed.length > board.maxPedals) {
    tips.push(`You've got ${placed.length} pedals on a ${board.label} board (max ${board.maxPedals}). Consider sizing up for a comfortable fit.`);
  }

  // Modulation placement
  if (cats.includes('modulation') && usesEffectsLoop) {
    tips.push('Modulation in the effects loop gives a cleaner, more defined sound. Some players prefer chorus in front for a grittier vibe — experiment.');
  }

  // General encouragement
  if (placed.length >= 4 && tips.length === 0) {
    tips.push('Looking good. Your signal chain is auto-ordered using standard practice — we can customize routing in your consultation.');
  }

  return tips.slice(0, 2);
}

/* ─────────────────────────────────────────────
   Board dimensions for visual rendering
   ───────────────────────────────────────────── */
function getBoardLayout(boardId: string) {
  switch (boardId) {
    case 'nano':
      return { cols: 4, rows: 1, width: 'max-w-[480px]', aspect: 'aspect-[4/1.4]' };
    case 'small':
      return { cols: 3, rows: 2, width: 'max-w-[520px]', aspect: 'aspect-[3/1.6]' };
    case 'medium':
      return { cols: 5, rows: 2, width: 'max-w-[640px]', aspect: 'aspect-[5/2.2]' };
    case 'large':
      return { cols: 5, rows: 3, width: 'max-w-[700px]', aspect: 'aspect-[5/3]' };
    case 'xl':
      return { cols: 6, rows: 4, width: 'max-w-[760px]', aspect: 'aspect-[6/3.6]' };
    default:
      return { cols: 5, rows: 2, width: 'max-w-[640px]', aspect: 'aspect-[5/2.2]' };
  }
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
  const tips = useMemo(() => getProTips(placedPedals, selectedBoard, usesEffectsLoop), [placedPedals, selectedBoard, usesEffectsLoop]);

  /* Signal chain — auto-ordered */
  const signalChain = useMemo(() => {
    if (!placedPedals.length) return [];
    const sorted = [...placedPedals].sort((a, b) => {
      const catA = pedalCategories.find((c) => c.id === a.pedal.categoryId);
      const catB = pedalCategories.find((c) => c.id === b.pedal.categoryId);
      return (catA?.chainOrder || 99) - (catB?.chainOrder || 99);
    });
    return sorted;
  }, [placedPedals]);

  const addPedal = useCallback(
    (pedal: Pedal) => {
      if (selectedBoard && placedPedals.length >= selectedBoard.maxPedals + 4) return; // soft cap with warning
      const instanceId = `${pedal.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setPlacedPedals((prev) => [...prev, { instanceId, pedal }]);
    },
    [selectedBoard, placedPedals.length]
  );

  const removePedal = useCallback((instanceId: string) => {
    setPlacedPedals((prev) => prev.filter((p) => p.instanceId !== instanceId));
  }, []);

  const clearBoard = useCallback(() => {
    setPlacedPedals([]);
  }, []);

  // Build consultation URL
  const buildConsultUrl = () => {
    if (!selectedBoard || !estimate) return '/book';
    const pedalSummary = placedPedals
      .map((pp) => pp.customName || pp.pedal.name)
      .join(', ');

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
      <Section theme="dark" className="!py-12 md:!py-20">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5A623] mb-3">
            Interactive Rig Planner
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#f5f5f7] mb-3">
            Build your pedalboard
          </h1>
          <p className="text-[15px] sm:text-lg text-[#f5f5f7]/50 max-w-xl mx-auto">
            Pick your board, drop your pedals, see your signal chain.
            When it looks right, we&apos;ll build it for real.
          </p>
        </div>
      </Section>

      {/* ── Board Size Picker ── */}
      {!selectedBoard && (
        <Section theme="light" className="!py-12 md:!py-16">
          <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-2 text-center">
            Start with your board size
          </h2>
          <p className="text-[15px] text-black/50 mb-8 text-center max-w-lg mx-auto">
            How many pedals are you working with? This sets the canvas you&apos;ll build on.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[800px] mx-auto">
            {boardSizes.map((board) => (
              <button
                key={board.id}
                onClick={() => setSelectedBoard(board)}
                className="group text-left p-5 rounded-2xl border border-black/[0.06] bg-[#f5f5f7] hover:border-[#F5A623]/40 hover:bg-[#F5A623]/[0.03] transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-[17px] font-semibold text-[#1d1d1f] group-hover:text-[#D48A1A] transition-colors">
                    {board.label}
                  </h3>
                  <span className="text-[12px] font-semibold text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded-full">
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
        </Section>
      )}

      {/* ── Playground ── */}
      {selectedBoard && (
        <section className="bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
            {/* Board size bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setSelectedBoard(null); clearBoard(); }}
                  className="text-[13px] text-black/40 hover:text-black transition-colors"
                >
                  &larr; Change board
                </button>
                <div className="h-4 w-px bg-black/10" />
                <h2 className="text-[15px] font-semibold text-[#1d1d1f]">
                  {selectedBoard.label} Board
                </h2>
                <span className="text-[12px] text-black/40">{selectedBoard.dimensions}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[13px] font-semibold ${
                  placedPedals.length > selectedBoard.maxPedals ? 'text-red-500' : 'text-[#1d1d1f]'
                }`}>
                  {placedPedals.length}/{selectedBoard.maxPedals} pedals
                </span>
                {placedPedals.length > 0 && (
                  <button onClick={clearBoard} className="text-[12px] text-black/30 hover:text-red-500 transition-colors">
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* ── Main layout: Catalog + Board ── */}
            <div className="flex flex-col lg:flex-row gap-6">

              {/* ── Pedal Catalog (sidebar on desktop, drawer on mobile) ── */}
              <div className="lg:w-[280px] shrink-0">
                {/* Mobile toggle */}
                <button
                  onClick={() => setCatalogOpen(!catalogOpen)}
                  className="lg:hidden w-full flex items-center justify-between p-3 rounded-xl border border-black/[0.06] bg-[#f5f5f7] mb-3"
                >
                  <span className="text-[14px] font-semibold text-[#1d1d1f]">Pedal Catalog</span>
                  <svg viewBox="0 0 24 24" className={`w-4 h-4 text-black/40 transition-transform ${catalogOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                <div className={`${catalogOpen ? 'block' : 'hidden'} lg:block`}>
                  <div className="bg-[#f5f5f7] rounded-2xl border border-black/[0.04] overflow-hidden">
                    <div className="p-3 border-b border-black/[0.04]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/40">
                        Click to add to board
                      </p>
                    </div>

                    <div className="max-h-[60vh] lg:max-h-[calc(100vh-300px)] overflow-y-auto">
                      {pedalCategories.map((cat) => {
                        const catPedals = pedalDatabase.filter((p) => p.categoryId === cat.id);
                        const isExpanded = expandedCategory === cat.id;

                        return (
                          <div key={cat.id} className="border-b border-black/[0.04] last:border-b-0">
                            <button
                              onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                              className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/60 transition-colors"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-md bg-[#1d1d1f] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                                  {cat.icon}
                                </div>
                                <div className="text-left">
                                  <span className="text-[13px] font-medium text-[#1d1d1f] block leading-tight">{cat.label}</span>
                                  <span className="text-[10px] text-black/35 leading-tight">{catPedals.length} pedals</span>
                                </div>
                              </div>
                              <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 text-black/25 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M6 9l6 6 6-6" />
                              </svg>
                            </button>

                            {isExpanded && (
                              <div className="px-2 pb-2 space-y-1">
                                {catPedals.map((pedal) => (
                                  <button
                                    key={pedal.id}
                                    onClick={() => addPedal(pedal)}
                                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white transition-colors group"
                                  >
                                    <div
                                      className="w-8 h-6 rounded shrink-0 flex items-center justify-center text-[8px] font-bold shadow-sm"
                                      style={{ backgroundColor: pedal.color, color: pedal.textColor }}
                                    >
                                      {pedal.shortName.slice(0, 4)}
                                    </div>
                                    <span className="text-[12px] text-[#1d1d1f] text-left leading-tight">{pedal.name}</span>
                                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-black/0 group-hover:text-[#10B981] ml-auto shrink-0 transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <path d="M12 5v14M5 12h14" />
                                    </svg>
                                  </button>
                                ))}
                                {/* Custom pedal add */}
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
                                  className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-white transition-colors group border border-dashed border-black/[0.1]"
                                >
                                  <div className="w-8 h-6 rounded shrink-0 flex items-center justify-center text-[10px] text-black/30 border border-dashed border-black/[0.15]">
                                    +
                                  </div>
                                  <span className="text-[12px] text-black/40 text-left">Other {cat.label}</span>
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Options toggles */}
                  <div className="mt-4 space-y-2">
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-black/[0.06] bg-[#f5f5f7] cursor-pointer hover:border-black/[0.12] transition-colors">
                      <input
                        type="checkbox"
                        checked={usesEffectsLoop}
                        onChange={(e) => setUsesEffectsLoop(e.target.checked)}
                        className="w-3.5 h-3.5 rounded accent-[#F5A623]"
                      />
                      <div>
                        <span className="text-[12px] font-medium text-[#1d1d1f] block leading-tight">Effects loop</span>
                        <span className="text-[10px] text-black/35 leading-tight">Time-based FX in the loop</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-black/[0.06] bg-[#f5f5f7] cursor-pointer hover:border-black/[0.12] transition-colors">
                      <input
                        type="checkbox"
                        checked={needsSwitcher}
                        onChange={(e) => setNeedsSwitcher(e.target.checked)}
                        className="w-3.5 h-3.5 rounded accent-[#F5A623]"
                      />
                      <div>
                        <span className="text-[12px] font-medium text-[#1d1d1f] block leading-tight">Loop switcher</span>
                        <span className="text-[10px] text-black/35 leading-tight">ES-8, Boss ES-5, GigRig</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* ── Board Canvas + Chain ── */}
              <div className="flex-1 min-w-0">
                {/* Visual Board */}
                <div className="bg-[#0a0a0a] rounded-2xl p-4 sm:p-6 mb-4">
                  {/* Board label */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#F5A623]" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        Your Board
                      </span>
                    </div>
                    {placedPedals.length > 0 && (
                      <span className="text-[11px] text-white/30">Click a pedal to remove it</span>
                    )}
                  </div>

                  {/* Board surface */}
                  {boardLayout && (
                    <div
                      className={`${boardLayout.width} mx-auto bg-[#1a1a1a] rounded-xl border border-white/[0.06] p-3 sm:p-4 relative overflow-hidden`}
                    >
                      {/* Board texture lines */}
                      <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 20px, #fff 20px, #fff 21px)',
                      }} />

                      {placedPedals.length === 0 ? (
                        <div className={`${boardLayout.aspect} flex items-center justify-center relative`}>
                          <div className="text-center">
                            <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-dashed border-white/[0.12] flex items-center justify-center mx-auto mb-3">
                              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            </div>
                            <p className="text-[13px] text-white/30 font-medium">Drop pedals here</p>
                            <p className="text-[11px] text-white/15 mt-1">Pick from the catalog</p>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="grid gap-2 sm:gap-3 relative"
                          style={{
                            gridTemplateColumns: `repeat(${boardLayout.cols}, minmax(0, 1fr))`,
                          }}
                        >
                          {/* Render placed pedals in signal chain order */}
                          {signalChain.map((pp) => (
                            <button
                              key={pp.instanceId}
                              onClick={() => removePedal(pp.instanceId)}
                              className="group relative aspect-[1/1.2] rounded-lg flex flex-col items-center justify-center p-1.5 shadow-lg hover:scale-105 hover:shadow-xl transition-all cursor-pointer"
                              style={{ backgroundColor: pp.pedal.color }}
                              title={`${pp.pedal.name} — click to remove`}
                            >
                              {/* LED indicator */}
                              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#10B981] shadow-[0_0_4px_rgba(16,185,129,0.6)]" />

                              {/* Pedal name */}
                              <span
                                className="text-[9px] sm:text-[10px] font-bold text-center leading-tight"
                                style={{ color: pp.pedal.textColor }}
                              >
                                {pp.pedal.shortName}
                              </span>

                              {/* Footswitch */}
                              <div className="absolute bottom-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-white/20 bg-black/30" />

                              {/* Remove indicator on hover */}
                              <div className="absolute inset-0 rounded-lg bg-red-500/0 group-hover:bg-red-500/20 transition-colors flex items-center justify-center">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </div>
                            </button>
                          ))}

                          {/* Empty slots */}
                          {Array.from({ length: Math.max(0, (boardLayout.cols * boardLayout.rows) - placedPedals.length) }, (_, i) => (
                            <div
                              key={`empty-${i}`}
                              className="aspect-[1/1.2] rounded-lg border border-dashed border-white/[0.08] flex items-center justify-center"
                            >
                              <svg viewBox="0 0 24 24" className="w-3 h-3 text-white/10" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 5v14M5 12h14" />
                              </svg>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Signal Chain Visualization ── */}
                {signalChain.length > 0 && (
                  <div className="bg-[#f5f5f7] rounded-2xl border border-black/[0.04] p-4 sm:p-5 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#F5A623]" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-[12px] font-semibold uppercase tracking-[0.08em] text-black/40">
                        Signal Chain {usesEffectsLoop ? '(with FX loop)' : ''}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Guitar */}
                      <div className="px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold bg-[#1d1d1f] text-white">
                        Guitar
                      </div>
                      <svg viewBox="0 0 24 24" className="w-3 h-3 text-black/15 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>

                      {/* Pedals in chain order */}
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
                                {(i < frontPedals.length - 1 || usesEffectsLoop || !usesEffectsLoop) && (
                                  <svg viewBox="0 0 24 24" className="w-3 h-3 text-black/15 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                  </svg>
                                )}
                              </div>
                            ))}

                            {usesEffectsLoop && loopPedals.length > 0 && (
                              <>
                                <div className="px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold bg-[#1d1d1f] text-white">
                                  Amp ⤵ FX Send
                                </div>
                                <svg viewBox="0 0 24 24" className="w-3 h-3 text-black/15 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                                {loopPedals.map((pp, i) => (
                                  <div key={pp.instanceId} className="flex items-center gap-1.5">
                                    <div
                                      className="px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-medium shadow-sm"
                                      style={{ backgroundColor: pp.pedal.color, color: pp.pedal.textColor }}
                                    >
                                      {pp.pedal.shortName}
                                    </div>
                                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-black/15 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                                      <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                ))}
                                <div className="px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold bg-[#1d1d1f] text-white">
                                  FX Return
                                </div>
                              </>
                            )}

                            {!usesEffectsLoop && (
                              <div className="px-3 py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold bg-[#1d1d1f] text-white">
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
                {tips.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {tips.map((tip, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-[#F5A623]/[0.06] border border-[#F5A623]/[0.12]"
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M12 2a7 7 0 017 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 017-7z" />
                          <path d="M10 21h4" />
                        </svg>
                        <p className="text-[12px] sm:text-[13px] text-[#1d1d1f]/70 leading-relaxed">{tip}</p>
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
                      className="w-full px-4 py-3 text-[13px] rounded-xl border border-black/[0.06] bg-[#f5f5f7] placeholder:text-black/25 focus:outline-none focus:border-[#F5A623]/40 focus:ring-1 focus:ring-[#F5A623]/20 resize-none"
                    />
                  </div>
                )}

                {/* ── Estimate Panel (expandable) ── */}
                {placedPedals.length > 0 && estimate && (
                  <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setShowEstimate(!showEstimate)}
                      className="w-full flex items-center justify-between px-5 py-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[14px] font-semibold text-[#f5f5f7]">
                          Estimated build
                        </span>
                        <span className="text-[12px] text-white/30">
                          {estimate.totalPedals} pedals &middot; {estimate.patchCableCount} cables
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[18px] font-bold text-[#F5A623]">
                          ${estimate.totalEstimate.toLocaleString()}
                        </span>
                        <svg viewBox="0 0 24 24" className={`w-4 h-4 text-white/30 transition-transform ${showEstimate ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </button>

                    {showEstimate && (
                      <div className="px-5 pb-5 border-t border-white/[0.06]">
                        <div className="space-y-2.5 pt-4">
                          <div className="flex justify-between text-[13px]">
                            <span className="text-white/50">Build labor ({selectedBoard.label})</span>
                            <span className="text-[#f5f5f7]">${estimate.buildLabor.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[13px]">
                            <span className="text-white/50">Mogami 2314 patch cables ({estimate.patchCableCount})</span>
                            <span className="text-[#f5f5f7]">${estimate.patchCableCost.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-[13px]">
                            <span className="text-white/50">Mogami 2524 instrument cables (2)</span>
                            <span className="text-[#f5f5f7]">${estimate.instrumentCableCost.toLocaleString()}</span>
                          </div>
                          {estimate.effectsLoopAdder > 0 && (
                            <div className="flex justify-between text-[13px]">
                              <span className="text-white/50">Effects loop wiring</span>
                              <span className="text-[#f5f5f7]">${estimate.effectsLoopAdder}</span>
                            </div>
                          )}
                          {estimate.switcherAdder > 0 && (
                            <div className="flex justify-between text-[13px]">
                              <span className="text-white/50">Loop switcher integration</span>
                              <span className="text-[#f5f5f7]">${estimate.switcherAdder}</span>
                            </div>
                          )}
                          <div className="flex justify-between text-[15px] font-bold pt-3 border-t border-white/[0.06]">
                            <span className="text-[#f5f5f7]">Estimated total</span>
                            <span className="text-[#F5A623]">${estimate.totalEstimate.toLocaleString()}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-white/25 mt-3">
                          Includes labor, Mogami cables, and mounting hardware. Board, power supply, and pedals not included.
                          Final quote in consultation. All builds include lifetime support.
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
                      className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-10 py-4 rounded-lg transition-colors text-[16px] shadow-lg shadow-[#F5A623]/20"
                    >
                      Get This Built
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <p className="text-[12px] text-black/35 mt-2">
                      Free consultation &middot; No obligation &middot; We&apos;ll review your plan and give an exact quote
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
          <p className="text-[15px] text-[#f5f5f7]/50 mb-6 max-w-lg mx-auto">
            Book a free rig consultation. We&apos;ll walk through your setup, talk tone goals,
            and figure out exactly what you need.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-[#f5f5f7] font-medium px-6 py-3 rounded-lg border border-white/[0.08] transition-colors text-[14px]"
          >
            Book a Free Consultation
          </Link>
        </div>
      </Section>
    </>
  );
}
