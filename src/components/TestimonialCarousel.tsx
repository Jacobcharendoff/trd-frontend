'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Artist {
  name: string;
  role: string;
  photo: string;
}

interface TestimonialCarouselProps {
  theme?: 'light' | 'dark';
}

const artists: Artist[] = [
  {
    name: 'Cory Wong',
    role: 'Vulfpeck Guitarist & Solo Artist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/CoryWong_d62547c8-75e7-4438-9c4d-2704c4809099.jpg',
  },
  {
    name: 'Raphael Saadiq',
    role: 'Grammy-Nominated Producer & Tony! Toni! Toné! Founder',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/RaphaelSaadiq_444901b7-2e8e-471e-acaf-ba72beb7a5b0.jpg',
  },
  {
    name: 'Paul Jackson Jr.',
    role: 'Legendary Session Guitarist — Michael Jackson, Whitney Houston',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/PaulJacksonJr_f874676e-bc05-4d0d-89a7-ea9e8e39d96a.jpg',
  },
  {
    name: 'Rhett Shull',
    role: 'Nashville Guitarist & YouTube Creator',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/RhettShull_9cf433b2-ccba-4cd5-9faa-765f0b4de1e8.jpg',
  },
  {
    name: 'Emily Wolfe',
    role: 'Austin Rock & Blues Guitarist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/EmilyWolfe_1c6c2dca-011e-4074-8676-46d9f2abc041.jpg',
  },
  {
    name: 'Lindsay Ell',
    role: 'Country Artist & Guitarist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/LindsayEll_0a1e775e-9a96-4e7c-bffc-fd25309316f3.jpg',
  },
  {
    name: 'Rhye Young',
    role: 'Guitarist & Composer',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/rhyeyoung_5cc7f2e1-f001-46d7-bae7-10d38ae3c134.jpg',
  },
  {
    name: 'Theo Katzman',
    role: 'Vulfpeck Multi-Instrumentalist & Solo Artist',
    photo: 'https://cdn.shopify.com/s/files/1/0528/3171/5486/files/TheoKatzman_29b78ff0-6727-47ae-bd3d-1591dadeadd1.jpg',
  },
  {
    name: 'Isaiah Sharkey',
    role: "Grammy-Winning Guitarist — D'Angelo, Solo Artist",
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
          left: 540,
          behavior: 'smooth',
        });

        if (isAtEnd) {
          scrollContainerRef.current.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }
      }
    }, 4000);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isHovering]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 540;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const textColor = theme === 'dark' ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]';
  const textMuted =
    theme === 'dark' ? 'text-[#f5f5f7]/50' : 'text-[#1d1d1f]/50';

  return (
    <div className="relative w-[100vw] -ml-[calc((100vw-100%)/2)]">
      {/* Scrollable container — full viewport width, padded to align with content */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingLeft: 'max(24px, calc((100vw - 1080px) / 2 + 24px))',
          paddingRight: 'max(24px, calc((100vw - 1080px) / 2 + 24px))',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <style>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {artists.map((artist, index) => (
          <div
            key={index}
            className="flex-shrink-0 snap-start w-[420px] sm:w-[520px]"
          >
            <div className="group relative rounded-2xl overflow-hidden aspect-[16/9]">
              <Image
                src={artist.photo}
                alt={artist.name}
                fill
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-semibold text-white text-lg leading-tight">
                  {artist.name}
                </p>
                <p className="text-white/60 text-sm mt-1 leading-snug">
                  {artist.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow — aligned to content edge */}
      <button
        onClick={() => handleScroll('left')}
        className="absolute top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 hover:bg-white shadow-lg text-[#1d1d1f] p-3 transition-all duration-200 border border-black/10"
        style={{ left: 'max(12px, calc((100vw - 1080px) / 2 + 8px))' }}
        aria-label="Scroll left"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow — aligned to content edge */}
      <button
        onClick={() => handleScroll('right')}
        className="absolute top-1/2 -translate-y-1/2 z-20 rounded-full bg-white/90 hover:bg-white shadow-lg text-[#1d1d1f] p-3 transition-all duration-200 border border-black/10"
        style={{ right: 'max(12px, calc((100vw - 1080px) / 2 + 8px))' }}
        aria-label="Scroll right"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
