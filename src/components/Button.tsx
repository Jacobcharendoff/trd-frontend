'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';

/**
 * Button — Shared CTA component with 4 variants.
 *
 * Replaces 10+ copy-pasted CTA patterns across the site.
 * Renders as <Link> when href is provided, <button> otherwise.
 *
 * Variants:
 *   primary   — Solid blue CTA (Apple-style)
 *   solid     — Solid fill (theme-aware)
 *   outline   — Border-only ghost button (theme-aware)
 *   secondary — Subtle dark button for light backgrounds
 */

type ButtonVariant = 'primary' | 'solid' | 'outline' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonTheme = 'dark' | 'light';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: ButtonTheme;
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

type ButtonProps = ButtonAsLink | ButtonAsButton;

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-6 py-2.5 text-sm',
  md: 'px-8 py-3.5 text-sm',
  lg: 'px-10 py-4 text-lg',
};

function getVariantClasses(variant: ButtonVariant, theme: ButtonTheme): string {
  const onDark = theme === 'dark';

  switch (variant) {
    case 'primary':
      return 'trd-cta-gradient text-white';

    case 'solid':
      return onDark
        ? 'bg-trd-blue text-white hover:bg-trd-blue-dark transition-colors'
        : 'bg-trd-dark-card text-white hover:bg-trd-dark-card/90 transition-colors';

    case 'outline':
      return onDark
        ? 'border-2 border-white/20 text-white hover:border-white/50 hover:bg-white/[0.06] transition-all'
        : 'border-2 border-trd-dark-card/15 text-trd-dark-card hover:border-trd-dark-card/30 hover:bg-trd-dark-card/[0.03] transition-all';

    case 'secondary':
      return onDark
        ? 'bg-white/[0.08] text-white hover:bg-white/[0.12] transition-colors'
        : 'bg-trd-light-gray text-trd-dark-card hover:bg-trd-light-gray/80 transition-colors';

    default:
      return '';
  }
}

export default function Button({
  variant = 'primary',
  size = 'lg',
  theme = 'dark',
  children,
  className = '',
  glow = false,
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center gap-2 font-semibold rounded-full',
    sizeClasses[size],
    getVariantClasses(variant, theme),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={(props as ButtonAsButton).type || 'button'}
      onClick={(props as ButtonAsButton).onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
