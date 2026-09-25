/*
 * TRD line icon set. Drawn on a 32px grid, 1.25 stroke, round caps.
 * Rendered inside .trd-icon-ring so each sits in a thin spectral circle.
 */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 28, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* Soldering iron with a single bead of solder */
export function IconSolder(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M6 26l9.5-9.5" />
      <path d="M13.5 14.5l4 4" />
      <path d="M15.5 12.5l6-6a2.8 2.8 0 014 4l-6 6" />
      <path d="M4.5 27.5l2-2" />
      <circle cx="9" cy="28" r="0.9" fill="currentColor" stroke="none" />
    </Base>
  );
}

/* Right-angle patch cable, cut to length */
export function IconCable(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="4" y="5" width="6" height="8" rx="1.5" />
      <path d="M7 13v3a6 6 0 006 6h6" />
      <rect x="19" y="19" width="8" height="6" rx="1.5" />
      <path d="M7 5V3M27 22h2" />
    </Base>
  );
}

/* Isolated power: bolt inside a split rail */
export function IconPower(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="4" y="6" width="24" height="20" rx="3" />
      <path d="M17 10l-4 6h5l-3 6" />
      <path d="M8 10v12M24 10v12" strokeDasharray="1.5 2.5" />
    </Base>
  );
}

/* Noise floor: a waveform settling to a flat line */
export function IconQuiet(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M3 16h3l2-6 3 12 3-9 2 5 2-2h11" />
    </Base>
  );
}

/* Road case with latches */
export function IconRoadCase(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="3.5" y="9" width="25" height="16" rx="2" />
      <path d="M12 9V6.5a1.5 1.5 0 011.5-1.5h5A1.5 1.5 0 0120 6.5V9" />
      <path d="M3.5 15h25" />
      <rect x="8" y="13.5" width="3" height="3" rx="0.6" />
      <rect x="21" y="13.5" width="3" height="3" rx="0.6" />
    </Base>
  );
}

/* Lifetime support: open loop with a check */
export function IconLifetime(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M26 16a10 10 0 11-3-7.1" />
      <path d="M26 5v4.5h-4.5" />
      <path d="M11.5 16.5l3 3 6-6.5" />
    </Base>
  );
}

/* Video session */
export function IconVideo(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="3.5" y="8" width="18" height="16" rx="2.5" />
      <path d="M21.5 14l7-4v12l-7-4" />
      <circle cx="12.5" cy="14.5" r="2.5" />
      <path d="M8 21c1-2 2.6-3 4.5-3s3.5 1 4.5 3" />
    </Base>
  );
}

/* Signal path blueprint */
export function IconBlueprint(p: IconProps) {
  return (
    <Base {...p}>
      <rect x="3.5" y="11" width="6" height="10" rx="1.2" />
      <rect x="13" y="11" width="6" height="10" rx="1.2" />
      <rect x="22.5" y="11" width="6" height="10" rx="1.2" />
      <path d="M9.5 16H13M19 16h3.5" />
      <path d="M6.5 11V7h19v4" strokeDasharray="1.5 2.5" />
    </Base>
  );
}

/* Shipping */
export function IconShip(p: IconProps) {
  return (
    <Base {...p}>
      <path d="M4 10l12-5 12 5v12l-12 5-12-5z" />
      <path d="M4 10l12 5 12-5M16 15v12" />
      <path d="M10 7.5l12 5" />
    </Base>
  );
}

export function IconArrow(p: IconProps) {
  return (
    <Base size={18} strokeWidth={1.75} {...p}>
      <path d="M6 16h20M19 9l7 7-7 7" />
    </Base>
  );
}
