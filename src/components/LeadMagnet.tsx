'use client';

import { useState, useEffect } from 'react';

export default function LeadMagnet() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercentage >= 60 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
    setTimeout(() => {
      handleDismiss();
    }, 2000);
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-[#1d1d1f] text-white py-4 px-6 transition-transform duration-500 ease-out z-40 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Headline & Subtext */}
        <div className="flex-1">
          {isSubmitted ? (
            <p className="text-lg font-semibold">Thanks! Check your inbox.</p>
          ) : (
            <>
              <h3 className="text-lg font-semibold mb-1">Get our free Signal Chain Cheat Sheet</h3>
              <p className="text-sm text-white/70">
                The same framework we use to design every custom build. Yours free.
              </p>
            </>
          )}
        </div>

        {/* Right: Email Input & Button */}
        {!isSubmitted && (
          <form onSubmit={handleSubmit} className="flex gap-3 w-full sm:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-transparent flex-1 sm:flex-none"
            />
            <button
              type="submit"
              className="bg-[#F5A623] hover:bg-[#D48A1A] text-black font-semibold rounded-full px-6 py-3 transition-colors duration-200 whitespace-nowrap"
            >
              Get It Free
            </button>
          </form>
        )}

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-6 text-white/50 hover:text-white transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
