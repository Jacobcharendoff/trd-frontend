/**
 * TRD Design Tokens
 * Single source of truth for all design values.
 * Matches homepage rhythm: dark hero, light body, dark accent sections.
 */

export const colors = {
  // Backgrounds
  black: '#000000',
  darkBg: '#0a0a0a',
  darkCard: '#1d1d1f',
  darkSurface: '#111111',
  lightGray: '#f5f5f7',
  white: '#ffffff',

  // Text
  textPrimary: '#1d1d1f',
  textSecondary: 'rgba(0, 0, 0, 0.5)',
  textTertiary: 'rgba(0, 0, 0, 0.35)',
  textOnDark: '#f5f5f7',
  textOnDarkSecondary: 'rgba(255, 255, 255, 0.5)',
  textOnDarkTertiary: 'rgba(255, 255, 255, 0.35)',

  // Accent
  amber: '#F5A623',
  amberDark: '#D48A1A',
  green: '#10B981',
  greenLight: '#34d399',
  cyan: '#06B6D4',
  blue: '#2563EB',

  // Borders
  borderLight: 'rgba(0, 0, 0, 0.06)',
  borderDark: 'rgba(255, 255, 255, 0.08)',
} as const;

export const gradients = {
  aurora: 'radial-gradient(ellipse at 20% 50%, rgba(37,99,235,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.08) 0%, transparent 60%)',
  amberGreen: 'linear-gradient(135deg, #F5A623, #10B981)',
  amberFade: 'linear-gradient(180deg, rgba(245,166,35,0.7), rgba(245,166,35,0.25))',
  cyanGreen: 'linear-gradient(135deg, #06B6D4, #34d399)',
  blueGlow: 'radial-gradient(ellipse at center, rgba(37,99,235,0.15) 0%, transparent 70%)',
} as const;

export const fonts = {
  system: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
} as const;

export const spacing = {
  sectionY: '120px',
  sectionYMobile: '80px',
  innerMax: '1080px',
  innerPadding: '24px',
} as const;

export const radii = {
  sm: '12px',
  md: '16px',
  lg: '20px',
  pill: '980px',
} as const;
