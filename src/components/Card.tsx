'use client';

import { type ReactNode } from 'react';

/**
 * Card — Shared card component with 3 variants.
 *
 * Variants:
 *   glass-dark  — Transparent white on dark backgrounds
 *   glass-light — Light gray on white backgrounds
 *   solid       — Dark card (for featured items on dark backgrounds)
 *
 * Usage:
 *   <Card variant="glass-dark" hover>
 *     <h3>Card Title</h3>
 *     <p>Card content</p>
 *   </Card>
 */

type CardVariant = 'glass-dark' | 'glass-light' | 'solid';

interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'li';
}

const variantClasses: Record<CardVariant, string> = {
  'glass-dark': 'bg-white/[0.04] border border-white/[0.08]',
  'glass-light': 'bg-[#f5f5f7] border border-black/[0.04]',
  'solid': 'bg-[#1d1d1f] border border-white/[0.08]',
};

const paddingClasses = {
  sm: 'p-5',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-10',
};

export default function Card({
  variant = 'glass-light',
  children,
  className = '',
  hover = false,
  padding = 'md',
  as: Tag = 'div',
}: CardProps) {
  const classes = [
    'rounded-2xl',
    variantClasses[variant],
    paddingClasses[padding],
    hover ? 'hover:-translate-y-1 transition-all duration-300' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
}
