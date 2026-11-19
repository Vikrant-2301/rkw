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
  size,
  showTagline = true,
  className = '',
  theme = 'original',
  variant = 'horizontal',
}) => {
  // Sizing map calibrated to 3.05:1 exact aspect ratio of rkw-logo.png
  const sizeMap = {
    sm: { height: 42, width: 130, markSize: 42, text: 'text-sm font-semibold tracking-wider', sub: 'text-[9px]' },
    md: { height: 52, width: 160, markSize: 52, text: 'text-base font-semibold tracking-widest', sub: 'text-[10px]' },
    lg: { height: 62, width: 190, markSize: 62, text: 'text-xl font-semibold tracking-widest', sub: 'text-xs' },
    xl: { height: 76, width: 235, markSize: 76, text: 'text-2xl font-semibold tracking-widest', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size || 'md'];

  // 1. Vertical Master Presentation (4.png seal)
  if (variant === 'vertical') {
    return (
      <Link
        href="/"
        className={`inline-flex flex-col items-center text-center group flex-shrink-0 ${className}`}
        aria-label="Ramesh Kolhu Wale — Home"
      >
        <div className="relative w-40 h-44 sm:w-52 sm:h-56 flex items-center justify-center drop-shadow-md group-hover:scale-105 transition-transform duration-300">
          <Image
            src="/logos/rkw-4.png"
            alt="Ramesh Kolhu Wale Heritage Seal"
            fill
            sizes="(max-width: 640px) 180px, 250px"
            className="object-contain"
            priority
          />
        </div>
      </Link>
    );
  }

  // 2. Wide Horizontal Banner Lockup
  if (variant === 'wide') {
    return (
      <Link
        href="/"
        className={`inline-flex items-center group flex-shrink-0 ${className}`}
        aria-label="Ramesh Kolhu Wale — Home"
      >
        <div
          style={{ height: currentSize.height, width: Math.round(currentSize.width * 1.25) }}
          className="relative flex items-center justify-center group-hover:opacity-95 transition-opacity duration-200"
        >
          <Image
            src="/logos/rkw-logo.png"
            alt="Ramesh Kolhu Wale Logo"
            fill
            sizes="350px"
            className="object-contain"
            priority
          />
        </div>
      </Link>
    );
  }

  // 3. Circular Emblem Mark with Typography alongside
  if (variant === 'mark') {
    return (
      <Link
        href="/"
        className={`inline-flex items-center gap-2.5 sm:gap-3 group flex-shrink-0 ${className}`}
        aria-label="Ramesh Kolhu Wale — Home"
      >
        <div
          style={{ width: currentSize.markSize, height: currentSize.markSize }}
          className="relative rounded-full overflow-hidden flex-shrink-0 bg-white shadow-xs border border-[#163A60]/20 flex items-center justify-center group-hover:scale-105 transition-transform"
        >
          <Image
            src="/logos/rkw-7.png"
            alt="RKW Emblem"
            fill
            sizes="80px"
            className="object-contain p-0.5"
            priority
          />
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
              className={`tracking-widest uppercase text-[9px] sm:text-[10px] mt-0.5 font-medium ${
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

  // 4. Light theme pill (e.g. for dark footer or rich backgrounds)
  if (theme === 'light') {
    return (
      <Link
        href="/"
        className={`inline-flex items-center group flex-shrink-0 ${className}`}
        aria-label="Ramesh Kolhu Wale — Home"
      >
        <div className="bg-[#FAF8F3] px-4 py-2 rounded-xl shadow-xs border border-white/20 group-hover:bg-white transition-colors">
          <div className="relative h-11 w-36 sm:h-12 sm:w-40 flex items-center justify-center">
            <Image
              src="/logos/rkw-logo.png"
              alt="Ramesh Kolhu Wale Logo"
              fill
              sizes="(max-width: 640px) 160px, 200px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </Link>
    );
  }

  // 5. Default: Standard Horizontal Brand Logo Lockup
  // When size is not explicitly passed, use fluid responsive sizing:
  // Mobile: 42px high, 130px wide logo (bold, legible, preserves navbar space)
  // Tablet: 50px high, 155px wide logo
  // Desktop: 58px high, 180px wide logo (prominent, prestigious heritage brand)
  const containerClasses = size
    ? ''
    : 'h-[42px] w-[130px] sm:h-[50px] sm:w-[155px] lg:h-[58px] lg:w-[180px]';

  const containerStyle = size
    ? { height: currentSize.height, width: currentSize.width }
    : undefined;

  return (
    <Link
      href="/"
      className={`inline-flex items-center group flex-shrink-0 ${className}`}
      aria-label="Ramesh Kolhu Wale — Home"
    >
      <div
        style={containerStyle}
        className={`relative flex items-center justify-start group-hover:opacity-95 transition-opacity duration-200 ${containerClasses}`}
      >
        <Image
          src="/logos/rkw-logo.png"
          alt="Ramesh Kolhu Wale Logo"
          fill
          sizes="(max-width: 640px) 150px, (max-width: 1024px) 180px, 220px"
          className="object-contain object-left"
          priority
        />
      </div>
    </Link>
  );
};
