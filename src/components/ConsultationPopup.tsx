'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BEFORE_IMAGE = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_20.png';
const AFTER_IMAGE = 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/Rig_Build_27.png';

export default function ConsultationPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showAfter, setShowAfter] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Scroll trigger at 50%
  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= 50 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, isDismissed]);

  // Before/after crossfade loop
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setShowAfter((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, [isVisible]);

  // Load HubSpot embed script when popup opens
  useEffect(() => {
    if (!isVisible || !calendarRef.current) return;

    const existingScript = document.querySelector(
      'script[src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"]'
    );

    if (existingScript) {
      const container = calendarRef.current;
      if (container && !container.querySelector('iframe')) {
        const clone = container.cloneNode(true) as HTMLElement;
        container.parentNode?.replaceChild(clone, container);
      }
    } else {
      const script = document.createElement('script');
      script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end lg:items-center justify-center z-50 animate-popup-fade"
      onClick={handleBackdropClick}
    >
      {/* ─── Desktop: stacked layout — image banner on top, calendar below ─── */}
      <div className="hidden lg:flex lg:flex-col max-w-[520px] w-full bg-white rounded-3xl shadow-2xl overflow-hidden animate-popup-scale max-h-[85vh] relative">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 bg-black/40 backdrop-blur-sm rounded-full p-1.5 text-white/80 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Before/after image banner */}
        <div className="relative w-full h-[200px] flex-shrink-0 bg-[#0a0a0a] overflow-hidden">
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: showAfter ? 0 : 1 }}
          >
            <Image
              src={BEFORE_IMAGE}
              alt="Before — messy pedalboard"
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
              alt="After — clean TRD build"
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Before / After label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full">
              {showAfter ? 'After' : 'Before'}
            </span>
          </div>
        </div>

        {/* Copy */}
        <div className="px-6 pt-6 pb-3 text-center">
          <h2 className="text-xl font-bold text-[#1d1d1f] mb-1">
            This could be your board.
          </h2>
          <p className="text-[#1d1d1f]/50 text-sm">
            30 minutes. Free. Just two guitarists talking about your rig.
          </p>
        </div>

        {/* HubSpot Calendar */}
        <div className="flex-1 overflow-y-auto px-4 pb-2 min-h-0">
          <div
            ref={calendarRef}
            className="meetings-iframe-container"
            data-src="https://meetings-na2.hubspot.com/trd/rig-build-consultation?embed=true"
            style={{ minHeight: '400px' }}
          />
        </div>

        {/* Dismiss */}
        <div className="px-6 pb-4 text-center flex-shrink-0">
          <button
            onClick={handleClose}
            className="text-sm text-[#1d1d1f]/35 hover:text-[#1d1d1f]/60 transition-colors duration-200"
          >
            I&apos;m just looking
          </button>
        </div>
      </div>

      {/* ─── Mobile: slide-up sheet ─── */}
      <div className="lg:hidden w-full bg-white rounded-t-3xl shadow-2xl overflow-hidden flex flex-col animate-popup-slide-up max-h-[85vh]">
        {/* Before/after crossfade — compact */}
        <div className="relative w-full h-[160px] flex-shrink-0 bg-[#0a0a0a]">
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: showAfter ? 0 : 1 }}
          >
            <Image src={BEFORE_IMAGE} alt="Before" fill className="object-cover" unoptimized />
          </div>
          <div
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: showAfter ? 1 : 0 }}
          >
            <Image src={AFTER_IMAGE} alt="After" fill className="object-cover" unoptimized />
          </div>

          <div className="absolute top-3 left-3 z-10">
            <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
              {showAfter ? 'After' : 'Before'}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-sm rounded-full p-1.5 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Copy + CTA */}
        <div className="px-6 py-5 text-center">
          <h2 className="text-lg font-bold text-[#1d1d1f] mb-1">
            This could be your board.
          </h2>
          <p className="text-[#1d1d1f]/50 text-sm mb-5">
            30 minutes. Free. Just two guitarists talking about your rig.
          </p>

          <Link
            href="/book"
            onClick={handleClose}
            className="block w-full bg-[#0071E3] hover:bg-[#005BB5] text-white font-semibold rounded-full py-3.5 px-6 text-center transition-colors duration-200"
          >
            Book a Free Call
          </Link>
          <button
            onClick={handleClose}
            className="mt-3 text-sm text-[#1d1d1f]/35 hover:text-[#1d1d1f]/60 transition-colors duration-200 py-1"
          >
            I&apos;m just looking
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes popupFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupScale {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popupSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-popup-fade {
          animation: popupFade 0.3s ease-out;
        }
        .animate-popup-scale {
          animation: popupScale 0.35s ease-out;
        }
        .animate-popup-slide-up {
          animation: popupSlideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
