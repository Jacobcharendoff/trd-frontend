'use client';

import { useRef, useEffect, useState } from 'react';

// Shopify CDN resize: 1200px WebP (~100KB vs 1.2MB raw PNG)
const POSTER_URL = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png?width=1200&format=webp&v=1';
const POSTER_MOBILE = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png?width=640&format=webp&v=1';
const VIDEO_URL = 'https://cdn.shopify.com/videos/c/o/v/21a7252cb5764170a234e7dd476193e1.mov';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only load video on desktop (768px+) to save mobile bandwidth
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isDesktop && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isDesktop]);

  return (
    <div className="absolute inset-0">
      {/* Static poster — responsive sizes, always visible */}
      <picture>
        <source media="(max-width: 767px)" srcSet={POSTER_MOBILE} />
        <source media="(min-width: 768px)" srcSet={POSTER_URL} />
        <img
          src={POSTER_URL}
          alt="Custom pedalboard build"
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      </picture>

      {/* Video — desktop only. Not rendered on mobile at all. */}
      {isDesktop && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
    </div>
  );
}
