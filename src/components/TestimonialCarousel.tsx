'use client';

import { useEffect, useRef, useState } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

interface TestimonialCarouselProps {
  theme?: 'light' | 'dark';
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The pedalboard Jacob designed completely transformed my live rig. It's like he read my mind about what I needed. Best investment I've made in my tone.",
    name: 'Isaiah Sharkey',
    role: 'Session & Touring Guitarist',
    initials: 'IS',
  },
  {
    quote:
      "I've worked with Jacob multiple times. He understands signal flow, tone shaping, and durability. Your board won't fail you on tour.",
    name: 'Tosin Abasi',
    role: 'Animals As Leaders',
    initials: 'TA',
  },
  {
    quote:
      "From consultation to delivery, the whole experience was professional and smooth. My new board is exactly what I envisioned — and then some.",
    name: 'Marcus R.',
    role: 'Worship Leader',
    initials: 'MR',
  },
  {
    quote:
      "I was overwhelmed trying to figure out my signal chain. One session with Jacob and everything clicked. Now my board sounds exactly how I hear it in my head.",
    name: 'Derek P.',
    role: 'Home Player & Hobbyist',
    initials: 'DP',
  },
  {
    quote:
      "Jacob doesn't just build boards — he listens. He asked questions about my playing that nobody else ever has. The result was a rig that feels like an extension of me.",
    name: 'Sarah K.',
    role: 'Singer-Songwriter',
    initials: 'SK',
  },
  {
    quote:
      "We needed four matching rigs for a tour with tight changeovers. Jacob delivered all four on time, under budget, and they've survived 80+ shows without a single issue.",
    name: 'Chris T.',
    role: 'Tour Manager',
    initials: 'CT',
  },
];

export default function TestimonialCarousel({
  theme = 'light',
}: TestimonialCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovering) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
      return;
    }

    autoScrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          scrollContainerRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

        scrollContainerRef.current.scrollBy({
          left: 360,
          behavior: 'smooth',
        });

        if (isAtEnd) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    }, 5000);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isHovering]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 360;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const cardBg = theme === 'dark' ? 'bg-[#1d1d1f]' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]';
  const textMuted =
    theme === 'dark' ? 'text-[#f5f5f7]/50' : 'text-[#1d1d1f]/50';

  return (
    <div className="relative w-full">
      {/* Container with hidden scrollbar */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* CSS to hide scrollbar */}
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`flex-shrink-0 snap-start min-w-[340px] max-w-[400px] md:min-w-[360px] md:max-w-[400px] w-full sm:w-auto`}
          >
            <div
              className={`${cardBg} rounded-2xl p-8 border border-black/[0.06] shadow-sm h-full flex flex-col gap-4`}
            >
              {/* Star Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="#F5A623"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p
                className={`${textColor}/80 leading-relaxed text-base flex-grow`}
              >
                "{testimonial.quote}"
              </p>

              {/* Avatar + Name/Role */}
              <div className="flex items-center gap-4 mt-2">
                {/* Avatar Circle */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#F5A623] to-[#10B981] flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.initials}
                  </span>
                </div>

                {/* Name & Role */}
                <div>
                  <p className={`font-semibold ${textColor}`}>
                    {testimonial.name}
                  </p>
                  <p className={`text-sm ${textMuted}`}>{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={() => handleScroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:translate-x-0 md:left-4 z-10 rounded-full bg-[#1d1d1f]/80 hover:bg-[#1d1d1f] text-white p-3 transition-all duration-200"
        aria-label="Scroll left"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={() => handleScroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-0 md:right-4 z-10 rounded-full bg-[#1d1d1f]/80 hover:bg-[#1d1d1f] text-white p-3 transition-all duration-200"
        aria-label="Scroll right"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
