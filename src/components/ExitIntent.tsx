'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BEFORE_IMAGE = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_20.png';
const AFTER_IMAGE = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png';

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    if (hasTriggered) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener('mouseout', handleMouseLeave);
    return () => document.removeEventListener('mouseout', handleMouseLeave);
  }, [hasTriggered]);

  // Before/after crossfade
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-exit-fade"
      onClick={handleBackdropClick}
    >
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-exit-scale">
        {/* Before/after crossfade */}
        <div className="relative w-full h-[220px] bg-[#0a0a0a]">
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: showAfter ? 0 : 1 }}
          >
            <Image
              src={BEFORE_IMAGE}
              alt="Before"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: showAfter ? 1 : 0 }}
          >
            <Image
              src={AFTER_IMAGE}
              alt="After"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="absolute top-4 left-4 z-10">
            <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full">
              {showAfter ? 'After' : 'Before'}
            </span>
          </div>

          {/* Close */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 bg-black/40 backdrop-blur-sm rounded-full p-1.5 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Copy + CTA */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-[#1d1d1f] mb-2">
            Wait — before you go.
          </h2>
          <p className="text-[#1d1d1f]/60 text-base leading-relaxed mb-6">
            30 minutes. Free. Just two guitarists talking about your rig.
          </p>

          <div className="space-y-3">
            <Link
              href="/book"
              onClick={handleClose}
              className="block w-full bg-[#0071E3] hover:bg-[#005BB5] text-white font-semibold rounded-full py-3.5 px-6 text-center transition-colors duration-200"
            >
              Book a Free Call
            </Link>
            <button
              onClick={handleClose}
              className="w-full text-sm text-[#1d1d1f]/40 hover:text-[#1d1d1f]/70 transition-colors duration-200 py-2"
            >
              I&apos;m just looking
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes exitFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes exitScale {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-exit-fade {
          animation: exitFade 0.3s ease-out;
        }
        .animate-exit-scale {
          animation: exitScale 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
