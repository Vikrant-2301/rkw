'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RKWLogo } from '@/components/RKWLogo';
import { 
  FiCheckCircle, 
  FiShield, 
  FiHeart, 
  FiAward, 
  FiPhone, 
  FiArrowRight, 
  FiMapPin 
} from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#031d15] via-[#062e22] to-[#083a2b] text-white py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-500/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15">
            Ramesh Kolhu Wale (RKW) Heritage
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif">
            Rooted in Tradition, Bound by Purity
          </h1>
          <p className="text-xl sm:text-2xl text-amber-300 font-bold font-sans">
            शुद्धता और स्वाद, पीढ़ी-दर-पीढ़ी का विश्वास
          </p>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Founded with a single wooden Kolhu and an unrelenting refusal to accept adulterated, chemically bleached factory oils in our family food.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-black tracking-widest text-emerald-900 uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              Reviving India’s Lost Heritage of Honest Food
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Decades ago, every Indian neighborhood had a local <em>Kolhu</em> (oil mill). You could hear the slow, rhythmic turning of the wooden pestle, breathe in the fresh aroma of crushed mustard and sesame, and fill a stainless steel dabba with warm, frothy oil.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              When industrial mega-corporations flooded Indian kitchens with refined packet oils, real nutritional food was substituted with petroleum-derived hexane solvent extraction, caustic soda bleaching, and synthetic deodorizing. Natural aroma vanished. Chronic heart ailments and digestive acidity skyrocketed.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-semibold">
              <strong>Ramesh Kolhu Wale (RKW)</strong> was founded by Ramesh Ji to restore that ancient trust. We brought the traditional Lakdi Ka Kolhu and the earthen pot Bilona mathani back to Delhi NCR.
            </p>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300">
              <p className="text-xs sm:text-sm text-stone-800 italic">
                &ldquo;If an oil brand cannot let you watch their extraction live, they have something to hide. We open our doors wide every single morning.&rdquo;
              </p>
              <span className="block text-xs font-bold text-amber-900 mt-2">— Ramesh Ji, Founder, Ramesh Kolhu Wale</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/40">
              <Image
                src="/images/process_live.jpg"
                alt="Ramesh Kolhu Wale Workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Ramesh Kolhu Wale */}
      <section className="bg-stone-100/70 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-black tracking-widest text-emerald-900 uppercase bg-white px-3.5 py-1 rounded-full border border-stone-200">
              Our Unshakable Pillars
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 font-serif">The RKW Code of Honor</h2>
            <p className="text-stone-500 text-xs sm:text-sm">
              Principles we will never compromise, no matter how large we grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <FiCheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-stone-900 font-serif">100% Lakdi Ki Ghani</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We only press seeds in wooden mortars at low RPM (&lt;14 RPM). Temperatures never exceed 38°C, protecting delicate fatty acids.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <FiHeart className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-stone-900 font-serif">Clay-Pot Bilona Ghee</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Never made from separated cream. Boiled over cow-dung flame, fermented into whole curd in clay pots, and churned with wooden mathani.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-800 flex items-center justify-center">
                <FiShield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-stone-900 font-serif">Zero Adulteration</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Tested negative for argemone, palm oil, mineral paraffin, and synthetic preservatives. Batch reports publicly available.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                <FiAward className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-stone-900 font-serif">Open Workshop Doors</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We invite every customer to visit our workshops, bring their own bottles, select raw seeds, and watch the live extraction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#031d15] to-[#062e22] text-white space-y-6 shadow-xl border border-amber-400/40">
          <h2 className="text-2xl sm:text-3xl font-black font-serif">
            Experience the True Taste of Purity
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Order online with same-day dispatch in Delhi NCR, or visit our Pitampura workshop to witness live oil extraction.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-black rounded-xl text-xs uppercase tracking-wider"
            >
              Explore Products
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs border border-white/20"
            >
              Locate Our Workshop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
