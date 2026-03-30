'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

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
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="max-w-lg bg-white rounded-2xl p-10 shadow-2xl animate-scale-in relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-[#1d1d1f]/30 hover:text-[#1d1d1f] transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1d1d1f] mb-4">Wait — before you go.</h2>
            <p className="text-base text-[#1d1d1f]/70 leading-relaxed">
              Book a free consultation. No commitment, no pressure — just two guitarists talking tone for 30 minutes.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 pt-4">
            <Link
              href="/book"
              onClick={handleClose}
              className="block w-full bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold rounded-full py-3 px-6 text-center transition-colors duration-200"
            >
              Book a Free Call
            </Link>
            <button
              onClick={handleClose}
              className="w-full text-sm text-[#1d1d1f]/50 hover:text-[#1d1d1f] transition-colors duration-200 py-2"
            >
              No thanks, I'm just browsing
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
