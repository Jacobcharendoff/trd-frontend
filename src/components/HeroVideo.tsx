'use client';

import { useRef, useEffect } from 'react';

// Shopify CDN resize: 1200px WebP (~100KB vs 1.2MB raw PNG)
const POSTER_URL = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png?width=1200&format=webp&v=1';
const VIDEO_URL = 'https://cdn.shopify.com/videos/c/o/v/21a7252cb5764170a234e7dd476193e1.mov';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure autoplay fires even if the browser deferred it
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Static poster — ALWAYS in DOM, never unmounted. This is the LCP element. */}
      <img
        src={POSTER_URL}
        alt="Custom pedalboard build"
        fetchPriority="high"
        decoding="sync"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Video layers ON TOP of the image — plays immediately */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
    </div>
  );
}
