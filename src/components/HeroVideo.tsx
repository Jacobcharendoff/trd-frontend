'use client';

import { useState, useEffect, useRef } from 'react';

// Shopify CDN resize: serve 1200px wide WebP (~80-150KB vs 1.2MB PNG)
const POSTER_SMALL = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png?width=1200&format=webp&v=1';
const POSTER_FULL = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png';
const VIDEO_URL = 'https://cdn.shopify.com/videos/c/o/v/21a7252cb5764170a234e7dd476193e1.mov';

export default function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Delay video load until after LCP is measured
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [showVideo]);

  return (
    <div className="absolute inset-0">
      {/* Optimized poster — Shopify CDN serves 1200px WebP, ~100KB */}
      <img
        src={POSTER_SMALL}
        alt="Custom pedalboard build"
        fetchPriority="high"
        decoding="sync"
        className="w-full h-full object-cover opacity-50"
        style={{ display: showVideo ? 'none' : 'block' }}
      />

      {/* Video fades in after initial paint */}
      {showVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_FULL}
          className="w-full h-full object-cover opacity-50"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
    </div>
  );
}
