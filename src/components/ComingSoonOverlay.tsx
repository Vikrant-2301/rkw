'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export const ComingSoonOverlay: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Secret preview via URL parameter: e.g. /?preview=true or localStorage
    try {
      if (
        window.location.search.includes('preview=true') ||
        sessionStorage.getItem('rkw_preview') === 'true'
      ) {
        setIsUnlocked(true);
        return;
      }
    } catch {}

    // Lock body and html scrollbar so there is zero scrolling
    const originalOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  if (isUnlocked) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[99999] h-screen w-screen overflow-hidden bg-[#061e15] text-[#f5eedf] flex flex-col justify-center items-center p-6 text-center select-none">
      <div className="max-w-md mx-auto space-y-8 flex flex-col items-center">
        {/* Brand Emblem & Name */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0b281d] border border-amber-500/30 p-2.5 flex items-center justify-center shadow-md">
            <Image
              src="/logo.svg"
              alt="Ramesh Kolhu Wale Logo"
              width={60}
              height={60}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-wider text-white uppercase">
              RAMESH KOLHU WALE
            </h2>
            <p className="text-xs sm:text-sm text-amber-400/90 font-medium tracking-wide">
              रमेश कोल्हू वाले
            </p>
          </div>
        </div>

        {/* Clean, Simple Message */}
        <div className="space-y-3">
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-amber-400/90 border-b border-amber-400/30 pb-1 inline-block">
            Coming Soon
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight leading-tight">
            We will be live soon.
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            हमारी वेबसाइट जल्द ही लाइव होगी।
          </p>
          <p className="text-xs sm:text-sm text-stone-400/90 leading-relaxed font-light">
            शुद्धता और स्वाद, हर बूँद में विश्वास।
          </p>
        </div>
      </div>
    </div>
  );
};
