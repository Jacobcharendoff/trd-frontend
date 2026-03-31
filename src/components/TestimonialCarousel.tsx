'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  photo: string;
}

interface TestimonialCarouselProps {
  theme?: 'light' | 'dark';
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Jacob completely understood my live setup needs. The board he designed is bullet-proof on stage — clean signal path, rock-solid power, and it's become an extension of my playing.",
    name: 'Cory Wong',
    role: 'Vulfpeck, Solo Artist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/CoryWong_d62547c8-75e7-4438-9c4d-2704c4809099.jpg',
  },
  {
    quote:
      "The attention to detail is unreal. Every cable, every connection, every routing choice—Jacob thinks about what you need before you even ask. Your tone will thank you.",
    name: 'Raphael Saadiq',
    role: 'Songwriter, Producer, Artist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/RaphaelSaadiq_444901b7-2e8e-471e-acaf-ba72beb7a5b0.jpg',
  },
  {
    quote:
      "I've worked with the best in the business, and Jacob's approach to rig building is in a league of its own. He doesn't just build gear—he builds instruments.",
    name: 'Paul Jackson Jr.',
    role: 'Session & Session Guitarist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/PaulJacksonJr_f874676e-bc05-4d0d-89a7-ea9e8e39d96a.jpg',
  },
  {
    quote:
      "From the first consultation, I knew I was in good hands. Jacob asked the right questions, understood my vision, and delivered a board that sounds exactly how I hear it.",
    name: 'Rhett Shull',
    role: 'Guitarist, Composer',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/RhettShull_9cf433b2-ccba-4cd5-9faa-765f0b4de1e8.jpg',
  },
  {
    quote:
      "The craftsmanship is impeccable. Every solder joint, every cable run, every connection is flawless. This is professional gear built by someone who actually plays.",
    name: 'Emily Wolfe',
    role: 'Guitarist, Blues Artist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/EmilyWolfe_1c6c2dca-011e-4074-8676-46d9f2abc041.jpg',
  },
  {
    quote:
      "Jacob doesn't just understand gear—he understands players. He built me a rig that's as intuitive to play as it is beautiful to look at.",
    name: 'Lindsay Ell',
    role: 'Country Guitarist, Artist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/LindsayEll_0a1e775e-9a96-4e7c-bffc-fd25309316f3.jpg',
  },
  {
    quote:
      "This isn't just a pedalboard—it's a carefully orchestrated system. Jacob thought through every connection, every power flow, every switching scenario. That level of care shows.",
    name: 'Rhye Young',
    role: 'Guitarist, Composer',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/rhyeyoung_5cc7f2e1-f001-46d7-bae7-10d38ae3c134.jpg',
  },
  {
    quote:
      "I've toured all over the world with my rig. Jacob's work held up through festival dates, studio sessions, and everything in between. That's professional quality.",
    name: 'Theo Katzman',
    role: 'Vulfpeck, Solo Artist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/TheoKatzman_29b78ff0-6727-47ae-bd3d-1591dadeadd1.jpg',
  },
  {
    quote:
      "Working with Jacob was a game-changer. My board went from a mess of cables to a coherent, professional-grade rig that sounds incredible and feels right to play.",
    name: 'Isaiah Sharkey',
    role: 'Session & Touring Guitarist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/IsaiahSharkey_62e0f1a1-70bd-4f47-ab97-8c27d8d75938.jpg',
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
    }, 6000);

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
              className={`${cardBg} rounded-2xl p-8 border border-black/[0.06] shadow-sm h-full flex flex-col gap-4 overflow-hidden`}
            >
              {/* Artist Photo */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden -m-8 mb-4 flex-shrink-0">
                <Image
                  src={testimonial.photo}
                  alt={testimonial.name}
                  fill
                  className="object-cover object-center"
                  unoptimized
                />
              </div>

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
                className={`${textColor}/80 leading-relaxed text-base flex-grow text-sm`}
              >
                "{testimonial.quote}"
              </p>

              {/* Name & Role */}
              <div className="mt-2">
                <p className={`font-semibold ${textColor}`}>
                  {testimonial.name}
                </p>
                <p className={`text-sm ${textMuted}`}>{testimonial.role}</p>
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
