/**
 * TRD Design Tokens
 * Single source of truth for all design values.
 * Colors match the Dawn Shopify theme: primary blue #0071E3.
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

  // Accent — matches Dawn theme
  blue: '#0071E3',
  blueDark: '#005BB5',
  purple: '#BF5AF2',

  // Borders
  borderLight: 'rgba(0, 0, 0, 0.06)',
  borderDark: 'rgba(255, 255, 255, 0.08)',
} as const;

export const gradients = {
  aurora: 'radial-gradient(ellipse at 20% 50%, rgba(0,113,227,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(191,90,242,0.08) 0%, transparent 60%)',
  trdAccent: 'linear-gradient(135deg, #0071E3, #BF5AF2)',
  purpleBlue: 'linear-gradient(135deg, #BF5AF2, #0071E3)',
  blueGlow: 'radial-gradient(ellipse at center, rgba(0,113,227,0.15) 0%, transparent 70%)',
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
