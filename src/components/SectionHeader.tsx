/**
 * SectionHeader — Eyebrow + Headline + Subtitle pattern.
 *
 * Used in every content section. Theme-aware.
 * Replaces 10+ duplicated header patterns across pages.
 *
 * Usage:
 *   <SectionHeader
 *     eyebrow="How It Works"
 *     headline="Three steps to"
 *     headlineAccent="better tone."
 *     subtitle="Expert advice, hands-on kit, or full custom build."
 *     theme="light"
 *   />
 */

import { type ReactNode } from 'react';

type SectionHeaderTheme = 'dark' | 'light';
type SectionHeaderAlign = 'center' | 'left';

interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  headlineAccent?: string;
  subtitle?: string | ReactNode;
  theme?: SectionHeaderTheme;
  align?: SectionHeaderAlign;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  headline,
  headlineAccent,
  subtitle,
  theme = 'light',
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const onDark = theme === 'dark';
  const centered = align === 'center';

  return (
    <div className={`${centered ? 'text-center' : ''} mb-14 ${className}`}>
      {eyebrow && (
        <p
          className={`text-sm font-medium tracking-[0.2em] uppercase mb-4 ${
            onDark ? 'text-white/40' : 'text-[#1d1d1f]/40'
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`trd-section-headline mb-4 ${
          onDark ? 'text-[#f5f5f7]' : 'text-[#1d1d1f]'
        }`}
      >
        {headline}
        {headlineAccent && (
          <>
            {' '}
            <span className="trd-gradient-text">{headlineAccent}</span>
          </>
        )}
      </h2>

      {subtitle && (
        <p
          className={`text-lg ${
            centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          } ${
            onDark ? 'text-white/60' : 'text-[#1d1d1f]/60'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
