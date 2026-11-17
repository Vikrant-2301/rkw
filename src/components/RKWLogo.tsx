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
    sm: { img: 32, text: 'text-sm font-semibold tracking-wider', sub: 'text-[10px]' },
    md: { img: 40, text: 'text-base font-semibold tracking-widest', sub: 'text-[10px]' },
    lg: { img: 52, text: 'text-xl font-semibold tracking-widest', sub: 'text-xs' },
    xl: { img: 68, text: 'text-2xl font-semibold tracking-widest', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group flex-shrink-0 ${className}`}
      aria-label="Ramesh Kolhu Wale — Home"
    >
      <div
        style={{ width: currentSize.img, height: currentSize.img }}
        className="relative rounded-lg overflow-hidden flex-shrink-0 bg-[#1C3829] flex items-center justify-center p-1"
      >
        <Image
          src="/logo.svg"
          alt="RKW Logo"
          width={currentSize.img}
          height={currentSize.img}
          className="w-full h-full object-contain"
          priority
        />
      </div>

      <div className="flex flex-col justify-center min-w-0">
        <span
          className={`font-serif uppercase leading-tight ${
            theme === 'light' ? 'text-white' : 'text-[#1C1A16]'
          } ${currentSize.text}`}
        >
          Ramesh Kolhu Wale
        </span>
        {showTagline && (
          <span
            className={`tracking-wider uppercase text-[10px] mt-0.5 ${
              theme === 'light' ? 'text-[#C8BFA8]' : 'text-[#8A7E6E]'
            }`}
          >
            Wood-Pressed Oils &amp; Ghee
          </span>
        )}
      </div>
    </Link>
  );
};
