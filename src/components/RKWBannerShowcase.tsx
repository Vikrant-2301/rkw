'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiPhone, FiGlobe, FiCheckCircle } from 'react-icons/fi';

export const RKWBannerShowcase: React.FC = () => {
  const products = [
    { label: 'YELLOW MUSTARD', href: '/product/yellow-mustard-oil' },
    { label: 'BLACK MUSTARD', href: '/product/black-mustard-oil' },
    { label: 'VIRGIN COCONUT', href: '/product/wood-pressed-coconut-oil' },
    { label: 'SWEET BADAM ROGAN', href: '/product/pure-badam-rogan-almond-oil' },
    { label: 'WHITE SESAME (TIL)', href: '/product/wood-pressed-white-sesame-oil' },
    { label: 'COLD PRESSED PEANUT', href: '/product/wood-pressed-groundnut-oil' },
  ];

  return (
    <section className="py-4 sm:py-6 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Container replicating the authentic brand identity banner with Royal Emerald & Gold Theme */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#062e22] via-[#083a2b] to-[#031d15] text-white shadow-2xl border-2 sm:border-4 border-amber-400/40 p-5 sm:p-8 lg:p-10">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Top Header Row with Helpline */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-emerald-700/50 pb-4 mb-6 relative z-10 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-amber-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <span>Official Certified Brand Emblem &amp; Master Workshop</span>
          </div>

          <a
            href="tel:9811254321"
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-900 font-black text-xs sm:text-sm px-4 py-1.5 rounded-full transition-all shadow-md group"
          >
            <FiPhone className="group-hover:rotate-12 transition-transform" />
            <span>M.: +91 98112 54321</span>
          </a>
        </div>

        {/* Main Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          {/* Left Column: Brand Emblem Badge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-44 sm:w-56 lg:w-64 aspect-square drop-shadow-2xl transition-transform hover:scale-105 duration-300">
              <Image
                src="/logo.svg"
                alt="RKW Ramesh Kolhu Wale Official Emblem"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-3 text-amber-200 font-mono font-bold text-xs sm:text-sm tracking-widest flex items-center gap-1.5">
              <FiGlobe className="text-amber-400" />
              <span>www.rameshkolhuwale.com</span>
            </div>
          </div>

          {/* Right Column: Brand Name & Detailed Products Showcase */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-4">
            {/* Top Tagline Hindi */}
            <div className="bg-amber-400/15 border border-amber-400/30 rounded-xl px-4 py-2 inline-block self-center lg:self-start">
              <p className="text-amber-300 font-bold text-sm sm:text-base tracking-wide text-center lg:text-left">
                ॥ शुद्धता और स्वाद, पीढ़ी-दर-पीढ़ी का अटूट विश्वास ॥
              </p>
            </div>

            {/* Main Brand Title */}
            <div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-wider text-white uppercase text-center lg:text-left leading-tight drop-shadow-md">
                RAMESH KOLHU WALE
              </h2>
              <p className="text-xl sm:text-2xl font-bold text-amber-400 tracking-wide mt-1 text-center lg:text-left font-serif">
                रमेश कोल्हू वाले
              </p>
            </div>

            {/* Products Bar Grid */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-widest text-amber-200/90 mb-2.5 text-center lg:text-left">
                ★ 100% Traditional Wooden Ghani Extraction (Lakdi Ki Ghani) ★
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {products.map((p) => (
                  <Link
                    key={p.label}
                    href={p.href}
                    className="flex items-center gap-2 bg-[#04241a]/90 hover:bg-emerald-800/80 border border-emerald-600/40 hover:border-amber-400 rounded-xl px-3 py-2 text-xs font-bold text-amber-100 hover:text-white transition-all group"
                  >
                    <FiCheckCircle className="text-amber-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="truncate">{p.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer Address inside Banner */}
            <div className="pt-2 border-t border-emerald-700/50 flex flex-col sm:flex-row items-center justify-between text-stone-300 text-xs gap-2">
              <div className="text-center sm:text-left">
                <span className="font-bold text-white">Workshop &amp; Store:</span> Plot 18, Block B, Main Market, Pitampura, New Delhi - 110034
              </div>
              <div className="text-amber-400 font-bold whitespace-nowrap">
                FSSAI Lic. No.: 13324001000845
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
