'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

type SectionTheme = 'dark' | 'light' | 'lightGray';

interface SectionProps {
  theme?: SectionTheme;
  children: ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
  reveal?: boolean;
}

const themeClasses: Record<SectionTheme, string> = {
  dark: 'bg-[#0a0a0a] text-[#f5f5f7]',
  light: 'bg-white text-[#1d1d1f]',
  lightGray: 'bg-[#f5f5f7] text-[#1d1d1f]',
};

export default function Section({
  theme = 'light',
  children,
  className = '',
  id,
  noPadding = false,
  reveal = true,
}: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(!reveal);

  useEffect(() => {
    if (!reveal || !ref.current) return;

    // Create intersection observer with more lenient threshold
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '50px'
      }
    );

    observer.observe(ref.current);

    // Fallback: ensure visibility after 8 seconds if observer didn't trigger
    const timeoutId = setTimeout(() => {
      setVisible(true);
    }, 8000);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [reveal]);

  return (
    <section
      id={id}
      ref={ref}
      className={`
        ${themeClasses[theme]}
        ${noPadding ? '' : 'py-20 md:py-[120px]'}
        ${reveal ? `transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}` : ''}
        ${className}
      `}
    >
      <div className="max-w-[1080px] mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
