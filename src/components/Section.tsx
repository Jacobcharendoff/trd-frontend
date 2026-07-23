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

    // If section is already near viewport on mount, reveal immediately
    const rect = ref.current.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [reveal]);

  return (
    <section
      id={id}
      ref={ref}
      className={`
        ${themeClasses[theme]}
        ${noPadding ? '' : 'py-20 md:py-28 lg:py-32'}
        ${className}
      `}
    >
      <div
        className={`max-w-[980px] mx-auto px-6${
          reveal ? ` trd-reveal${visible ? ' is-visible' : ''}` : ''
        }`}
      >
        {children}
      </div>
    </section>
  );
}
