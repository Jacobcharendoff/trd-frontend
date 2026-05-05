'use client';

import { useState, useMemo } from 'react';
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

/* ── Step indicator ── */
function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-semibold transition-colors ${
              i + 1 === current
                ? 'bg-[#F5A623] text-black'
                : i + 1 < current
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#f5f5f7] text-black/30'
            }`}
          >
            {i + 1 < current ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              i + 1
            )}
          </div>
          {i < total - 1 && (
            <div
              className={`w-8 h-0.5 transition-colors ${
                i + 1 < current ? 'bg-[#10B981]' : 'bg-black/[0.06]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Main Page ── */
export default function PlanYourRig() {
  const [step, setStep] = useState(1);
  const [selectedBoard, setSelectedBoard] = useState<BoardSize | null>(null);
  const [pedals, setPedals] = useState<PedalSelection[]>(
    pedalCategories.map((cat) => ({
      categoryId: cat.id,
      count: 0,
      names: [],
    }))
  );
  const [usesEffectsLoop, setUsesEffectsLoop] = useState(false);
  const [needsSwitcher, setNeedsSwitcher] = useState(false);
  const [notes, setNotes] = useState('');

  const totalPedals = pedals.reduce((sum, p) => sum + p.count, 0);

  const plan: RigPlan = useMemo(
    () => ({
      boardSize: selectedBoard,
      pedals,
      usesEffectsLoop,
      needsSwitcher,
      notes,
    }),
    [selectedBoard, pedals, usesEffectsLoop, needsSwitcher, notes]
  );

  const estimate = useMemo(() => estimateBuild(plan), [plan]);

  const updatePedalCount = (categoryId: string, delta: number) => {
    setPedals((prev) =>
      prev.map((p) =>
        p.categoryId === categoryId
          ? { ...p, count: Math.max(0, Math.min(6, p.count + delta)) }
          : p
      )
    );
  };

  const updatePedalName = (categoryId: string, index: number, name: string) => {
    setPedals((prev) =>
      prev.map((p) => {
        if (p.categoryId !== categoryId) return p;
        const names = [...p.names];
        names[index] = name;
        return { ...p, names };
      })
    );
  };

  const canAdvance = () => {
    if (step === 1) return selectedBoard !== null;
    if (step === 2) return totalPedals > 0;
    return true;
  };

  // Build consultation URL with rig spec as query params
  const buildConsultUrl = () => {
    if (!selectedBoard || !estimate) return '/book';
    const pedalSummary = pedals
      .filter((p) => p.count > 0)
      .map((p) => {
        const cat = pedalCategories.find((c) => c.id === p.categoryId);
        const names = p.names.filter(Boolean).join(', ');
        return `${p.count}x ${cat?.label || p.categoryId}${names ? ` (${names})` : ''}`;
      })
      .join('; ');

    const params = new URLSearchParams({
      board: selectedBoard.label,
      pedals: pedalSummary,
      total: String(totalPedals),
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

  return (
    <>
      {/* ── Hero ── */}
      <Section theme="dark" className="!py-16 md:!py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5A623] mb-4">
          Interactive Rig Planner
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#f5f5f7] mb-4">
          Plan your dream rig
        </h1>
        <p className="text-lg text-[#f5f5f7]/60 max-w-2xl">
          Pick your board, add your pedals, and see your signal chain come
          together. When you&apos;re ready, we&apos;ll build it for you.
        </p>
      </Section>

      {/* ── Planner ── */}
      <Section theme="light">
        <StepIndicator current={step} total={4} />

        {/* ── STEP 1: Board Size ── */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              Choose your board size
            </h2>
            <p className="text-[15px] text-black/50 mb-8">
              How many pedals are you working with? Pick the size that fits your setup.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {boardSizes.map((board) => (
                <button
                  key={board.id}
                  onClick={() => setSelectedBoard(board)}
                  className={`text-left p-5 rounded-2xl border transition-all ${
                    selectedBoard?.id === board.id
                      ? 'border-[#F5A623] bg-[#F5A623]/[0.04] ring-2 ring-[#F5A623]/20'
                      : 'border-black/[0.06] bg-[#f5f5f7] hover:border-black/[0.12]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-[17px] font-semibold text-[#1d1d1f]">
                      {board.label}
                    </h3>
                    <span className="text-[13px] font-medium text-[#F5A623]">
                      Up to {board.maxPedals}
                    </span>
                  </div>
                  <p className="text-[13px] text-black/50 mb-2">
                    {board.description}
                  </p>
                  <p className="text-[12px] text-black/35">{board.dimensions}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 2: Pedals ── */}
        {step === 2 && (
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f]">
                Add your pedals
              </h2>
              <div className="text-right">
                <span
                  className={`text-[15px] font-semibold ${
                    selectedBoard && totalPedals > selectedBoard.maxPedals
                      ? 'text-red-500'
                      : 'text-[#1d1d1f]'
                  }`}
                >
                  {totalPedals}
                </span>
                <span className="text-[15px] text-black/35">
                  {' '} / {selectedBoard?.maxPedals || '?'} pedals
                </span>
              </div>
            </div>
            <p className="text-[15px] text-black/50 mb-8">
              How many of each type? You can name specific pedals if you want.
            </p>

            <div className="space-y-3">
              {pedalCategories.map((cat) => {
                const sel = pedals.find((p) => p.categoryId === cat.id);
                const count = sel?.count || 0;

                return (
                  <div
                    key={cat.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      count > 0
                        ? 'border-[#F5A623]/30 bg-[#F5A623]/[0.03]'
                        : 'border-black/[0.06] bg-[#f5f5f7]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#1d1d1f] text-white flex items-center justify-center text-[12px] font-bold">
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
                            {cat.label}
                          </h3>
                          <p className="text-[12px] text-black/40">
                            {cat.examples.join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updatePedalCount(cat.id, -1)}
                          disabled={count === 0}
                          className="w-8 h-8 rounded-full border border-black/[0.1] flex items-center justify-center text-[18px] text-black/50 hover:bg-black/[0.04] disabled:opacity-20 transition-colors"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-[15px] font-semibold text-[#1d1d1f]">
                          {count}
                        </span>
                        <button
                          onClick={() => updatePedalCount(cat.id, 1)}
                          className="w-8 h-8 rounded-full border border-black/[0.1] flex items-center justify-center text-[18px] text-black/50 hover:bg-black/[0.04] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Name specific pedals */}
                    {count > 0 && (
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {Array.from({ length: count }, (_, i) => (
                          <input
                            key={i}
                            type="text"
                            placeholder={`Pedal ${i + 1} name (optional)`}
                            value={sel?.names[i] || ''}
                            onChange={(e) =>
                              updatePedalName(cat.id, i, e.target.value)
                            }
                            className="px-3 py-2 text-[13px] rounded-lg border border-black/[0.08] bg-white placeholder:text-black/25 focus:outline-none focus:border-[#F5A623]/50 focus:ring-1 focus:ring-[#F5A623]/20"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Effects loop / switcher toggles */}
            <div className="mt-6 space-y-3">
              <label className="flex items-center gap-3 p-4 rounded-xl border border-black/[0.06] bg-[#f5f5f7] cursor-pointer hover:border-black/[0.12] transition-colors">
                <input
                  type="checkbox"
                  checked={usesEffectsLoop}
                  onChange={(e) => setUsesEffectsLoop(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#F5A623]"
                />
                <div>
                  <span className="text-[15px] font-medium text-[#1d1d1f]">
                    I use an effects loop
                  </span>
                  <p className="text-[12px] text-black/40">
                    Time-based effects go in the loop, gain stays in front
                  </p>
                </div>
              </label>
              <label className="flex items-center gap-3 p-4 rounded-xl border border-black/[0.06] bg-[#f5f5f7] cursor-pointer hover:border-black/[0.12] transition-colors">
                <input
                  type="checkbox"
                  checked={needsSwitcher}
                  onChange={(e) => setNeedsSwitcher(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#F5A623]"
                />
                <div>
                  <span className="text-[15px] font-medium text-[#1d1d1f]">
                    I need a loop switcher / patch bay
                  </span>
                  <p className="text-[12px] text-black/40">
                    ES-8, Boss ES-5, GigRig, etc.
                  </p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* ── STEP 3: Signal Chain ── */}
        {step === 3 && estimate && (
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              Your signal chain
            </h2>
            <p className="text-[15px] text-black/50 mb-8">
              Here&apos;s the recommended order based on your pedals.{' '}
              {usesEffectsLoop
                ? 'Gain pedals in front of the amp, time-based in the loop.'
                : 'Standard front-of-amp chain.'}
            </p>

            {/* Signal chain visualization */}
            <div className="flex flex-wrap items-center gap-2 mb-10">
              {estimate.signalChain.map((node, i) => {
                const isAnchor = ['Guitar', 'Amp', 'Amp Input', 'FX Send', 'FX Return'].includes(node);
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div
                      className={`px-4 py-2.5 rounded-xl text-[13px] font-medium ${
                        isAnchor
                          ? 'bg-[#1d1d1f] text-white'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border border-black/[0.06]'
                      }`}
                    >
                      {node}
                    </div>
                    {i < estimate.signalChain.length - 1 && (
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 text-black/20 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add notes */}
            <div>
              <label className="text-[13px] font-medium text-[#1d1d1f] block mb-2">
                Anything else we should know?
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific amp, playing style, gig requirements, tone goals..."
                rows={3}
                className="w-full px-4 py-3 text-[14px] rounded-xl border border-black/[0.08] bg-[#f5f5f7] placeholder:text-black/25 focus:outline-none focus:border-[#F5A623]/50 focus:ring-1 focus:ring-[#F5A623]/20 resize-none"
              />
            </div>
          </div>
        )}

        {/* ── STEP 4: Estimate & CTA ── */}
        {step === 4 && estimate && selectedBoard && (
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#1d1d1f] mb-2">
              Your rig estimate
            </h2>
            <p className="text-[15px] text-black/50 mb-8">
              Here&apos;s what your custom build would look like. This is a starting estimate
              — final pricing depends on specific pedals and requirements.
            </p>

            {/* Summary card */}
            <div className="bg-[#0a0a0a] rounded-2xl p-6 md:p-8 mb-6">
              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f5f5f7]/40 mb-1">
                    Board
                  </p>
                  <p className="text-[17px] font-semibold text-[#f5f5f7]">
                    {selectedBoard.label}
                  </p>
                  <p className="text-[12px] text-[#f5f5f7]/40">
                    {selectedBoard.dimensions}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f5f5f7]/40 mb-1">
                    Pedals
                  </p>
                  <p className="text-[17px] font-semibold text-[#f5f5f7]">
                    {estimate.totalPedals} pedals
                  </p>
                  <p className="text-[12px] text-[#f5f5f7]/40">
                    {estimate.patchCableCount} patch cables needed
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#f5f5f7]/40 mb-1">
                    Extras
                  </p>
                  <p className="text-[17px] font-semibold text-[#f5f5f7]">
                    {usesEffectsLoop ? 'FX Loop' : ''}
                    {usesEffectsLoop && needsSwitcher ? ' + ' : ''}
                    {needsSwitcher ? 'Switcher' : ''}
                    {!usesEffectsLoop && !needsSwitcher ? 'Standard setup' : ''}
                  </p>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="border-t border-white/[0.08] pt-6 space-y-3">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#f5f5f7]/60">Build labor ({selectedBoard.label} board)</span>
                  <span className="text-[#f5f5f7]">${estimate.buildLabor.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#f5f5f7]/60">
                    Mogami 2314 patch cables ({estimate.patchCableCount})
                  </span>
                  <span className="text-[#f5f5f7]">${estimate.patchCableCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#f5f5f7]/60">Mogami 2524 instrument cables (2)</span>
                  <span className="text-[#f5f5f7]">${estimate.instrumentCableCost.toLocaleString()}</span>
                </div>
                {estimate.effectsLoopAdder > 0 && (
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#f5f5f7]/60">Effects loop wiring</span>
                    <span className="text-[#f5f5f7]">${estimate.effectsLoopAdder}</span>
                  </div>
                )}
                {estimate.switcherAdder > 0 && (
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[#f5f5f7]/60">Loop switcher integration</span>
                    <span className="text-[#f5f5f7]">${estimate.switcherAdder}</span>
                  </div>
                )}
                <div className="flex justify-between text-[17px] font-bold pt-3 border-t border-white/[0.08]">
                  <span className="text-[#f5f5f7]">Estimated total</span>
                  <span className="text-[#F5A623]">
                    ${estimate.totalEstimate.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Fine print */}
            <p className="text-[12px] text-black/35 mb-8">
              Estimate includes build labor, Mogami cables, and standard mounting hardware.
              Board, power supply, and pedals not included. Final quote provided during consultation.
              All builds include lifetime support and free repairs.
            </p>

            {/* CTA */}
            <div className="text-center">
              <Link
                href={buildConsultUrl()}
                className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold px-10 py-4 rounded-lg transition-colors text-[17px]"
              >
                Get This Built
              </Link>
              <p className="text-[13px] text-black/40 mt-3">
                Free consultation. No obligation. We&apos;ll review your plan and give you an exact quote.
              </p>
            </div>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-black/[0.06]">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-[14px] font-medium text-black/50 hover:text-black transition-colors"
            >
              Back
            </button>
          ) : (
            <div />
          )}
          {step < 4 && (
            <button
              onClick={() => canAdvance() && setStep(step + 1)}
              disabled={!canAdvance()}
              className={`px-6 py-3 rounded-lg text-[14px] font-semibold transition-colors ${
                canAdvance()
                  ? 'bg-[#1d1d1f] text-white hover:bg-black'
                  : 'bg-black/[0.06] text-black/25 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          )}
        </div>
      </Section>

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
