'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const POSTER_URL = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png';
const VIDEO_URL = 'https://cdn.shopify.com/videos/c/o/v/21a7252cb5764170a234e7dd476193e1.mov';

export default function HeroVideo() {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Delay video load until after LCP is measured (~3s safety margin)
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — poster image stays visible
      });
    }
  }, [showVideo]);

  return (
    <div className="absolute inset-0">
      {/* Next.js Image — optimized through Vercel, this IS the LCP element */}
      {!showVideo && (
        <Image
          src={POSTER_URL}
          alt="Custom pedalboard build"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
          quality={75}
        />
      )}

      {/* Video fades in after initial paint */}
      {showVideo && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          poster={POSTER_URL}
          className="w-full h-full object-cover opacity-50"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
    </div>
  );
}
