'use client';

import { useState } from 'react';
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
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#f5f5f7]">
      {/* Before Image */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${showAfter ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src={beforeImage}
          alt="Before"
          fill
          className="object-cover"
        />
      </div>
      {/* After Image */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${showAfter ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          src={afterImage}
          alt="After"
          fill
          className="object-cover"
        />
      </div>

      {/* Before / After Toggle */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10">
        <div className="flex bg-black/60 backdrop-blur-sm rounded-full p-1">
          <button
            onClick={() => setShowAfter(false)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              !showAfter
                ? 'bg-white text-[#1d1d1f]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Before
          </button>
          <button
            onClick={() => setShowAfter(true)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              showAfter
                ? 'bg-white text-[#1d1d1f]'
                : 'text-white/70 hover:text-white'
            }`}
          >
            After
          </button>
        </div>
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
