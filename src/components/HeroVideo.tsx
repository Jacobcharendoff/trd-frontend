'use client';

import { useRef, useEffect, useState } from 'react';

// Shopify-transcoded renditions of "Artist Video.mov" (the raw .mov is 106 MB and won't stream).
const VIDEO_ID = '21a7252cb5764170a234e7dd476193e1';
const VIDEO_BASE = `https://cdn.shopify.com/videos/c/vp/${VIDEO_ID}/${VIDEO_ID}`;
const VIDEO_DESKTOP = `${VIDEO_BASE}.HD-720p-4.5Mbps-70111310.mp4`; // 33 MB, streams progressively
const VIDEO_MOBILE = `${VIDEO_BASE}.SD-480p-1.5Mbps-70111310.mp4`; // 11 MB
const POSTER = `https://cdn.shopify.com/s/files/1/0528/3171/5486/files/preview_images/${VIDEO_ID}.thumbnail.0000000000.jpg`;

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData) return; // respect data saver: poster only
    setSrc(window.matchMedia('(min-width: 768px)').matches ? VIDEO_DESKTOP : VIDEO_MOBILE);
  }, []);

  useEffect(() => {
    if (src && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [src]);

  return (
    <div className="absolute inset-0">
      {/* Poster frame from the same video: paints instantly, video fades over it */}
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {src && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
    </div>
  );
}
