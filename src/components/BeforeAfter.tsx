'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface CaseStudy {
  playerName: string;
  playerRole: string;
  heading: string;
  story: string;
  tags: string[];
  beforeImage: string;
  afterImage: string;
}

const caseStudies: CaseStudy[] = [
  {
    playerName: 'Mason M.',
    playerRole: 'Touring Guitarist',
    heading: 'From tangled mess to tour-ready',
    story: 'Mason came to us with a board held together with zip ties and hope. We rebuilt it from scratch with isolated power, buffered signal path, and a switching system that lets him go from clean to lead with one tap.',
    tags: ['12 PEDALS', 'MIDI SWITCHING', 'TOURING RIG'],
    beforeImage: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_20.png',
    afterImage: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png',
  },
  {
    playerName: 'Shannon G.',
    playerRole: 'Worship Leader',
    heading: 'Silent stage, massive tone',
    story: "Shannon's board was plagued by ground loops and hum. We redesigned the power section with fully isolated outputs and re-routed the signal chain. Dead silent on stage, massive tone out front.",
    tags: ['8 PEDALS', 'ISOLATED POWER', 'WORSHIP'],
    beforeImage: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Untitled_design_11.png',
    afterImage: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Shannon_G._1.png',
  },
  {
    playerName: 'Jeff C.',
    playerRole: 'Session Player',
    heading: 'Studio precision, zero compromise',
    story: 'Jeff tracks for multiple artists and needed a board that covers everything from jazz cleans to modern high-gain. We built a dual-amp rig with isolated loops and studio-grade cabling throughout.',
    tags: ['15 PEDALS', 'DUAL AMP', 'STUDIO'],
    beforeImage: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/MikeStipanovLayout1.png',
    afterImage: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jeremy_B.png',
  },
];

function BeforeAfterSlider({ beforeImage, afterImage }: { beforeImage: string; afterImage: string }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden bg-[#f5f5f7] cursor-col-resize select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* After Image (full) */}
      <Image src={afterImage} alt="After" fill className="object-cover" />

      {/* Before Image (clipped) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
        <Image src={beforeImage} alt="Before" fill className="object-cover" />
      </div>

      {/* Slider line + handle */}
      <div className="absolute top-0 bottom-0 z-10" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-0 bottom-0 -translate-x-1/2 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)]" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-[#1d1d1f]/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3m8-6l3 3-3 3" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full">
          Before
        </span>
      </div>
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full">
          After
        </span>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <div className="space-y-24">
      {caseStudies.map((study, idx) => {
        const isReversed = idx % 2 !== 0;
        return (
          <div
            key={idx}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
              isReversed ? 'lg:direction-rtl' : ''
            }`}
          >
            {/* Image Slider */}
            <div className={`relative aspect-[4/3] ${isReversed ? 'lg:order-2' : ''}`}>
              <BeforeAfterSlider
                beforeImage={study.beforeImage}
                afterImage={study.afterImage}
              />
            </div>

            {/* Story */}
            <div className={isReversed ? 'lg:order-1' : ''}>
              <p className="text-[#0071E3] font-medium text-sm tracking-wide mb-3">
                {study.playerName} — {study.playerRole}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1d1d1f] mb-4 leading-tight">
                {study.heading}
              </h3>
              <p className="text-[#1d1d1f]/60 text-base sm:text-lg leading-relaxed mb-6">
                {study.story}
              </p>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium tracking-wide uppercase text-[#1d1d1f]/50 border border-[#1d1d1f]/15 rounded-full px-4 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
