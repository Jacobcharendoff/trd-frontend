'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useScrollProgress, segment } from './useScrollProgress';

const UNDERSIDE =
  'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/jYrUGxJ.jpg';

const beats = [
  { at: [0.08, 0.3], eyebrow: 'Look closer', line: 'Every cable cut to length.', sub: 'No coiled slack stuffed under the board. Each run is measured, cut and routed for that one spot.' },
  { at: [0.36, 0.58], eyebrow: 'Closer', line: 'Every joint soldered by hand.', sub: 'The same two sets of hands on every connection. Nothing crimped, nothing rushed.' },
  { at: [0.64, 0.86], eyebrow: 'All the way in', line: 'Power and signal never cross.', sub: 'Isolated supplies and separated runs, so your drives stop picking up hum from your digital gear.' },
];

/**
 * Pinned, scroll-scrubbed zoom into the underside of a finished board.
 * The section is 320vh tall; the image stays fixed while scroll drives the zoom and the captions.
 */
export default function CableZoom() {
  const ref = useRef<HTMLElement>(null);
  const p = useScrollProgress(ref, 'pinned');

  const scale = 1 + p * 1.35; // 1x -> 2.35x
  const dim = 0.35 + segment(p, 0, 0.12) * 0.25; // darken as captions arrive

  return (
    <section ref={ref} className="relative bg-black" style={{ height: '320vh' }} aria-label="Inside a Rig Doctor build">
      <div className="sticky top-0 h-[100svh] w-full" style={{ overflow: 'clip' }}>
        <div
          className="absolute inset-0 will-change-transform"
          style={{ transform: `scale(${scale})`, transformOrigin: '58% 62%' }}
        >
          <Image
            src={UNDERSIDE}
            alt="Underside of a Rig Doctor pedalboard showing cut-to-length cable runs and isolated power"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black" style={{ opacity: dim }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />

        {beats.map((b, i) => {
          const fadeIn = segment(p, b.at[0], b.at[0] + 0.06);
          const fadeOut = 1 - segment(p, b.at[1] - 0.04, b.at[1]);
          const o = Math.min(fadeIn, i === beats.length - 1 ? 1 : fadeOut);
          return (
            <div
              key={b.line}
              className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none"
              style={{ opacity: o, transform: `translateY(${(1 - fadeIn) * 24}px)` }}
            >
              <div className="max-w-3xl text-center">
                <p className="trd-eyebrow text-white/50 mb-5">{b.eyebrow}</p>
                <h2 className="text-white font-bold tracking-[-0.04em] leading-[1.02] text-[clamp(38px,6.5vw,88px)]">
                  {i === 2 ? (
                    <>
                      Power and signal <span className="trd-gradient-text">never cross.</span>
                    </>
                  ) : (
                    b.line
                  )}
                </h2>
                <p className="mt-6 text-white/70 text-lg sm:text-xl leading-relaxed max-w-xl mx-auto">{b.sub}</p>
              </div>
            </div>
          );
        })}

        <div
          className="absolute bottom-10 inset-x-0 flex justify-center"
          style={{ opacity: segment(p, 0.8, 0.92) }}
        >
          <Link
            href="/book"
            className="trd-cta-gradient inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-[15px]"
            style={{ pointerEvents: p > 0.8 ? 'auto' : 'none' }}
          >
            See what we&apos;d do with your board
          </Link>
        </div>

        {/* progress hairline */}
        <div className="absolute left-0 right-0 bottom-0 h-px bg-white/10">
          <div className="h-full" style={{ width: `${p * 100}%`, background: 'var(--trd-spectral)' }} />
        </div>
      </div>
    </section>
  );
}
