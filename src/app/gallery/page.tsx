'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ParallaxImage from '@/components/home/ParallaxImage';
import Reveal from '@/components/home/Reveal';
import { IconArrow } from '@/components/home/Icons';

const CDN = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/';

type Category = 'touring' | 'studio' | 'worship' | 'home';

interface Build {
  file: string;
  title: string;
  description?: string;
  category?: Category;
  wide?: boolean;
}

/* Builds with known details first, then the rest of the library. */
const builds: Build[] = [
  { file: 'Javy_B.png', title: 'Javy B.', description: 'Full MIDI switching system with isolated power. Built for 200+ shows a year.', category: 'touring', wide: true },
  { file: 'William_O._1.png', title: 'William O.', description: 'Ultra-quiet signal chain optimized for recording. Instant recall between sessions.', category: 'studio' },
  { file: 'Josh_W.png', title: 'Josh W.', description: 'Clean ambient tones with smart loop switching. Sunday mornings to Wednesday nights.', category: 'worship' },
  { file: 'Saxon_W..jpg', title: 'Saxon W.', description: 'Designed for a working touring musician. Road-proof, flight-case ready, dead quiet.', category: 'touring' },
  { file: 'Hunter_W._1.jpg', title: 'Hunter W.', description: 'Pro-grade tone in a compact footprint. Proof that less can be more.', category: 'home' },
  { file: 'Vince_D.png', title: 'Vince D.', description: 'Full preset-based control with RJM switching. Every combination at your feet.', category: 'touring' },
  { file: 'MikeStipanovLayout1.png', title: 'Mike Stipanov', description: 'Full signal chain rebuild with custom switching. Designed for studio-to-stage versatility.', category: 'studio', wide: true },
  { file: 'Jeremy_B.png', title: 'Jeremy B.', description: 'Clean-to-ambient rig with smart loop switching. Built for reliability every week.', category: 'worship' },
  { file: 'Jacob_S.png', title: 'Jacob S.', description: 'Complete teardown and rebuild. New wiring, new power, same pedals, totally different tone.', category: 'touring' },
  { file: 'John_A._1.png', title: 'John A.', description: 'Hand-soldered from scratch. Every cable custom-cut, every connection verified.', category: 'touring' },
  { file: 'Vince_D._2.jpg', title: 'Vince D.', description: 'Clean routing, labeled runs, strain relief on every connection.', category: 'studio' },
  { file: 'Agustin_Q..jpg', title: 'Agustin Q.', wide: true },
  { file: 'AfterlightImage-4.jpg', title: 'Custom build' },
  { file: 'Chris_G.png', title: 'Chris G.' },
  { file: 'Shannon_G._2.png', title: 'Shannon G.' },
  { file: 'AfterlightImage_2.jpg', title: 'Custom build' },
  { file: 'Kaden_C.png', title: 'Kaden C.' },
  { file: 'L1010577.jpg', title: 'Custom build', wide: true },
  { file: 'William_O._2.png', title: 'William O.' },
  { file: 'Mark_F.png', title: 'Mark F.' },
  { file: 'AfterlightImage-2.jpg', title: 'Custom build' },
  { file: 'Robert_B.png', title: 'Robert B.' },
  { file: 'Kevin_M._1.png', title: 'Kevin M.' },
  { file: 'RD_Pretty_Board_Pic.png', title: 'Custom build', wide: true },
  { file: 'Jeff_C._1.png', title: 'Jeff C.' },
  { file: 'Nolgee_V.png', title: 'Nolgee V.' },
  { file: 'Victor_C._1.png', title: 'Victor C.' },
  { file: 'Shane_T.png', title: 'Shane T.' },
  { file: 'Mark_A.png', title: 'Mark A.' },
  { file: 'John_A._2.png', title: 'John A.' },
  { file: 'Mason_M.png', title: 'Mason M.' },
  { file: 'Hunter_W._2.jpg', title: 'Hunter W.' },
];

const filters: { key: 'all' | Category; label: string }[] = [
  { key: 'all', label: 'All builds' },
  { key: 'touring', label: 'Touring' },
  { key: 'studio', label: 'Studio' },
  { key: 'worship', label: 'Worship' },
  { key: 'home', label: 'Home' },
];

function Lightbox({ items, index, onClose, onMove }: { items: Build[]; index: number; onClose: () => void; onMove: (d: number) => void }) {
  const b = items[index];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onMove(1);
      if (e.key === 'ArrowLeft') onMove(-1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, onMove]);

  return (
    <div className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col animate-popup-fade" role="dialog" aria-modal="true" aria-label={b.title}>
      <div className="flex items-center justify-between px-6 py-5 text-white">
        <p className="text-[15px] font-semibold">
          {b.title}
          <span className="text-white/40 font-normal ml-3">
            {index + 1} / {items.length}
          </span>
        </p>
        <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center" aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M3 3l10 10M13 3L3 13" /></svg>
        </button>
      </div>
      <div className="relative flex-1 mx-4 sm:mx-16 mb-4">
        <Image src={`${CDN}${b.file}`} alt={b.title} fill sizes="100vw" className="object-contain" priority />
      </div>
      {b.description && <p className="text-center text-white/65 text-[15px] px-6 pb-4 max-w-2xl mx-auto">{b.description}</p>}
      <div className="flex items-center justify-center gap-3 pb-8">
        <button onClick={() => onMove(-1)} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="Previous build">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 3L5 9l6 6" /></svg>
        </button>
        <Link href="/book" className="trd-cta-gradient inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-[15px]">
          Build me one like this <IconArrow />
        </Link>
        <button onClick={() => onMove(1)} className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center" aria-label="Next build">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3l6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<'all' | Category>('all');
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(() => (filter === 'all' ? builds : builds.filter((b) => b.category === filter)), [filter]);
  const close = useCallback(() => setOpen(null), []);
  const move = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);

  return (
    <>
      {/* ───────── HERO ───────── */}
      <ParallaxImage src={`${CDN}vertex-pedalboard-29.jpg`} alt="Guitarist on stage with a Rig Doctor board" priority strength={10} className="bg-black min-h-[72svh] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30" />
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 pb-16 sm:pb-20 pt-32">
          <p className="trd-eyebrow text-white/60 mb-6">The gallery &middot; 300+ boards built</p>
          <h1 className="text-white font-bold tracking-[-0.045em] leading-[0.98] text-[clamp(46px,8vw,104px)] max-w-4xl">
            Off the bench. <span className="trd-gradient-text">Onto the stage.</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg sm:text-xl max-w-xl leading-relaxed">
            Every board tells a story. Tap any build to see it up close.
          </p>
        </div>
      </ParallaxImage>

      {/* ───────── GRID ───────── */}
      <section className="bg-black pt-10 pb-24 sm:pb-32">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="sticky top-[100px] z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-4 bg-black/80 backdrop-blur-xl mb-6 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2.5 rounded-full text-[14px] font-medium transition-colors duration-300 ${
                  filter === f.key ? 'trd-cta-gradient' : 'bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-white'
                }`}
                aria-pressed={filter === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 [grid-auto-flow:dense]">
            {items.map((b, i) => (
              <button
                key={b.file}
                onClick={() => setOpen(i)}
                className={`trd-photo group relative rounded-2xl bg-[#111] text-left ${b.wide && filter === 'all' ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}
                aria-label={`Open ${b.title}`}
              >
                <Image
                  src={`${CDN}${b.file}`}
                  alt={`${b.title} custom pedalboard by The Rig Doctor`}
                  fill
                  sizes={b.wide ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <p className="text-white font-semibold text-[15px]">{b.title}</p>
                  {b.category && <p className="text-white/60 text-[12px] uppercase tracking-[0.18em] mt-0.5">{b.category}</p>}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHO WE BUILD FOR ───────── */}
      <section className="bg-white py-24 sm:py-32">
        <div className="max-w-[1200px] mx-auto px-6">
          <Reveal className="max-w-3xl mb-14">
            <p className="trd-eyebrow text-black/40 mb-5">Who we build for</p>
            <h2 className="text-black font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(36px,5vw,64px)]">
              Different players. <span className="trd-gradient-text">Same standard.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { key: 'touring' as Category, t: 'Touring rigs', d: 'Road-proof builds for working musicians.' },
              { key: 'studio' as Category, t: 'Studio boards', d: 'Quiet, flexible, ready when the red light is on.' },
              { key: 'worship' as Category, t: 'Worship rigs', d: 'Clean ambient tones with smart switching.' },
              { key: 'home' as Category, t: 'Home players', d: 'Because your bedroom tone matters too.' },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 80}>
                <button
                  onClick={() => {
                    setFilter(c.key);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full text-left bg-[#f5f5f7] hover:bg-black group rounded-[24px] p-8 transition-colors duration-500 h-full"
                >
                  <span className="text-4xl font-bold trd-gradient-text">{i + 1}</span>
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-black group-hover:text-white transition-colors duration-500">{c.t}</h3>
                  <p className="mt-2 text-black/55 group-hover:text-white/60 text-[15px] leading-relaxed transition-colors duration-500">{c.d}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-black group-hover:text-white transition-colors duration-500">
                    See these builds <IconArrow />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CLOSE ───────── */}
      <ParallaxImage src={`${CDN}2022-L1010577.jpg`} alt="Close-up of a finished Rig Doctor pedalboard" strength={10} className="bg-black min-h-[70svh] flex items-center">
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 w-full max-w-3xl mx-auto px-6 py-24 text-center">
          <p className="trd-eyebrow text-white/55 mb-6">2 build spots left in 2026</p>
          <h2 className="trd-display text-white mb-10">
            Want to see <span className="trd-gradient-text">yours here?</span>
          </h2>
          <Link href="/book" className="trd-cta-gradient inline-flex items-center gap-2 px-9 py-4 rounded-full font-semibold text-[17px]">
            Book a free consultation <IconArrow />
          </Link>
        </div>
      </ParallaxImage>

      {open !== null && items[open] && <Lightbox items={items} index={open} onClose={close} onMove={move} />}
    </>
  );
}
