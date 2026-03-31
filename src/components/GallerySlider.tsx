'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const galleryImages = [
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png', alt: 'Custom rig build — touring pedalboard' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/MikeStipanovLayout1.png', alt: 'Custom rig build — studio layout' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Jeremy_B.png', alt: 'Custom rig build — Jeremy B.' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Untitled_design_11.png', alt: 'Custom rig build — compact board' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_20.png', alt: 'Custom rig build — professional wiring' },
  { src: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_28.png', alt: 'Custom rig build — finished board' },
];

export default function GallerySlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, []);

  // Auto-advance every 5 seconds unless hovering
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [isHovering, goNext]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main image area */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-w-5xl mx-auto rounded-2xl overflow-hidden bg-[#0a0a0a]">
        {galleryImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1080px"
              priority={idx === 0}
            />
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={goPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all text-[#1d1d1f] border border-black/10"
          aria-label="Previous image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all text-[#1d1d1f] border border-black/10"
          aria-label="Next image"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-sm text-white/70 text-xs font-medium px-3 py-1.5 rounded-full">
          {activeIndex + 1} / {galleryImages.length}
        </div>
      </div>

      {/* Thumbnail micro-gallery */}
      <div className="flex justify-center gap-2 sm:gap-3 mt-4 px-4">
        {galleryImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden transition-all duration-300 flex-shrink-0 ${
              idx === activeIndex
                ? 'ring-2 ring-[#0071E3] ring-offset-2 opacity-100 scale-105'
                : 'opacity-40 hover:opacity-70'
            }`}
            aria-label={`View image ${idx + 1}`}
          >
            <Image
              src={img.src}
              alt=""
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
