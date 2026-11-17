import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface RKWLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  theme?: 'dark' | 'light' | 'original';
  variant?: 'horizontal' | 'mark' | 'vertical' | 'wide';
}

export const RKWLogo: React.FC<RKWLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  theme = 'original',
  variant = 'horizontal',
}) => {
  const sizeMap = {
    sm: { height: 36, width: 140, markSize: 36, text: 'text-sm font-semibold tracking-wider', sub: 'text-[9px]' },
    md: { height: 46, width: 180, markSize: 44, text: 'text-base font-semibold tracking-widest', sub: 'text-[10px]' },
    lg: { height: 56, width: 220, markSize: 56, text: 'text-xl font-semibold tracking-widest', sub: 'text-xs' },
    xl: { height: 72, width: 280, markSize: 72, text: 'text-2xl font-semibold tracking-widest', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  // 1. Vertical Master Presentation (4.svg)
  if (variant === 'vertical') {
    return (
      <Link
        href="/"
        className={`inline-flex flex-col items-center text-center group flex-shrink-0 ${className}`}
        aria-label="Ramesh Kolhu Wale — Home"
      >
        <div className="relative w-44 h-48 sm:w-52 sm:h-56 overflow-hidden flex items-center justify-center drop-shadow-md group-hover:scale-105 transition-transform duration-300">
          <Image
            src="/logos/4.svg"
            alt="Ramesh Kolhu Wale Heritage Seal"
            fill
            sizes="250px"
            className="object-contain"
            priority
          />
        </div>
      </Link>
    );
  }

  // 2. Wide Horizontal Banner Lockup (5.svg)
  if (variant === 'wide') {
    return (
      <Link
        href="/"
        className={`inline-flex items-center group flex-shrink-0 ${className}`}
        aria-label="Ramesh Kolhu Wale — Home"
      >
        <div
          style={{ height: currentSize.height, width: Math.round(currentSize.width * 1.35) }}
          className="relative overflow-hidden flex items-center justify-center group-hover:opacity-95 transition-opacity"
        >
          <div className="absolute inset-0 flex items-center justify-center scale-[2.75] origin-center">
            <Image
              src="/logos/5.svg"
              alt="Ramesh Kolhu Wale Logo"
              fill
              sizes="350px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Link>
    );
  }

  // 3. Circular Emblem Mark with Typography alongside (7.svg)
  if (variant === 'mark') {
    return (
      <Link
        href="/"
        className={`inline-flex items-center gap-3 group flex-shrink-0 ${className}`}
        aria-label="Ramesh Kolhu Wale — Home"
      >
        <div
          style={{ width: currentSize.markSize, height: currentSize.markSize }}
          className="relative rounded-full overflow-hidden flex-shrink-0 bg-white shadow-xs border border-[#163A60]/20 flex items-center justify-center group-hover:scale-105 transition-transform"
        >
          <div className="absolute inset-0 flex items-center justify-center scale-[1.95] origin-center">
            <Image
              src="/logos/7.svg"
              alt="RKW Emblem"
              fill
              sizes="64px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <span
            className={`font-serif uppercase leading-tight font-bold tracking-wider ${
              theme === 'light' ? 'text-white' : 'text-[#0E2A47]'
            } ${currentSize.text}`}
          >
            Ramesh Kolhu Wale
          </span>
          {showTagline && (
            <span
              className={`tracking-widest uppercase text-[10px] mt-0.5 font-medium ${
                theme === 'light' ? 'text-[#D4A017]' : 'text-[#8A7E6E]'
              }`}
            >
              Cold-Pressed Oils &amp; Ghee
            </span>
          )}
        </div>
      </Link>
    );
  }

  // 4. Default: Standard Horizontal Logo Lockup (6.svg)
  // When theme is 'light' (e.g. dark footer), frame in a refined cream pill so the royal navy/gold branding shines with high contrast.
  if (theme === 'light') {
    return (
      <Link
        href="/"
        className={`inline-flex items-center group flex-shrink-0 ${className}`}
        aria-label="Ramesh Kolhu Wale — Home"
      >
        <div className="bg-[#FAF8F3] px-3.5 py-1.5 rounded-xl shadow-xs border border-white/20 group-hover:bg-white transition-colors">
          <div
            style={{ height: currentSize.height - 4, width: currentSize.width }}
            className="relative overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 flex items-center justify-center scale-[2.75] origin-center">
              <Image
                src="/logos/6.svg"
                alt="Ramesh Kolhu Wale Logo"
                fill
                sizes="280px"
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={`inline-flex items-center group flex-shrink-0 ${className}`}
      aria-label="Ramesh Kolhu Wale — Home"
    >
      <div
        style={{ height: currentSize.height, width: currentSize.width }}
        className="relative overflow-hidden flex items-center justify-center group-hover:opacity-95 transition-opacity duration-200"
      >
        <div className="absolute inset-0 flex items-center justify-center scale-[2.75] origin-center">
          <Image
            src="/logos/6.svg"
            alt="Ramesh Kolhu Wale Logo"
            fill
            sizes="280px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </Link>
  );
};
