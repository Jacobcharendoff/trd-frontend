'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useScrollProgress } from './useScrollProgress';

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** How far the image drifts, as a % of its height. */
  strength?: number;
  /** Slow zoom-out as it scrolls through (1 = off). */
  zoomFrom?: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}

export default function ParallaxImage({
  src,
  alt,
  strength = 12,
  zoomFrom = 1.12,
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '100vw',
  children,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const p = useScrollProgress(ref);
  const y = (p - 0.5) * strength * 2; // -strength% .. +strength%
  const scale = zoomFrom - (zoomFrom - 1) * p;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <div
        className="absolute inset-x-0 will-change-transform"
        style={{
          top: `-${strength}%`,
          bottom: `-${strength}%`,
          transform: `translate3d(0, ${y}%, 0) scale(${scale})`,
        }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={`object-cover ${imgClassName}`} />
      </div>
      {children}
    </div>
  );
}
