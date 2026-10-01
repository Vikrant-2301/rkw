import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface RKWLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  theme?: 'dark' | 'light' | 'original';
}

export const RKWLogo: React.FC<RKWLogoProps> = ({
  size = 'md',
  showTagline = true,
  className = '',
  theme = 'original',
}) => {
  const sizeMap = {
    sm: { img: 38, text: 'text-sm sm:text-base', sub: 'text-[9px]' },
    md: { img: 46, text: 'text-base sm:text-lg xl:text-xl', sub: 'text-[10px] sm:text-[11px]' },
    lg: { img: 64, text: 'text-xl sm:text-2xl', sub: 'text-xs' },
    xl: { img: 88, text: 'text-2xl sm:text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3.5 group transition-transform duration-200 hover:scale-[1.01] flex-shrink-0 ${className}`}
      aria-label="Ramesh Kolhu Wale - Home"
    >
      {/* Precision Extracted Royal Emerald & Gold Emblem Badge */}
      <div className="relative flex-shrink-0 drop-shadow-md">
        <div
          style={{ width: currentSize.img, height: currentSize.img }}
          className="relative rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-amber-300 via-amber-400 to-emerald-700 shadow-sm ring-1 ring-amber-400/80 group-hover:ring-amber-300 transition-all"
        >
          <div className="w-full h-full bg-[#062e22] rounded-[10px] flex items-center justify-center p-0.5 overflow-hidden">
            <Image
              src="/logo.svg"
              alt="RKW Ramesh Kolhu Wale Logo"
              width={currentSize.img}
              height={currentSize.img}
              className="w-full h-full object-contain transform group-hover:scale-105 transition-transform"
              priority
            />
          </div>
        </div>
      </div>

      {/* Brand Typography with Single-Line Fit */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span
            className={`font-black tracking-wide uppercase font-serif ${
              theme === 'light'
                ? 'text-white'
                : 'text-emerald-950 group-hover:text-emerald-700 transition-colors'
            } ${currentSize.text} leading-tight`}
          >
            RAMESH KOLHU WALE
          </span>
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-900 border border-amber-500/50 leading-none">
            TM
          </span>
        </div>

        {showTagline && (
          <div className="flex items-center gap-1.5 mt-0.5 whitespace-nowrap">
            <span
              className={`font-bold text-amber-600 ${currentSize.sub} font-sans leading-none`}
            >
              रमेश कोल्हू वाले
            </span>
            <span className="text-emerald-500 text-[10px] leading-none">•</span>
            <span
              className={`${
                theme === 'light' ? 'text-amber-200' : 'text-stone-600'
              } font-medium ${currentSize.sub} leading-none`}
            >
              100% Pure Ghani Oils &amp; Ghee
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};
