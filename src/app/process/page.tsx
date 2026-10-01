'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  FiCheckCircle, 
  FiArrowRight, 
  FiEye, 
  FiShield, 
  FiClock, 
  FiThermometer, 
  FiMapPin, 
  FiPhone 
} from 'react-icons/fi';
import { ProcessComparison } from '@/components/ProcessComparison';

export default function ProcessPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Header Hero */}
      <section className="relative bg-gradient-to-r from-[#031d15] via-[#062e22] to-[#083a2b] text-white py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-amber-500/30">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Zero Chemicals • Zero High-Heat
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif">
            The Ancient Art of Kolhu &amp; Vedic Bilona
          </h1>
          <p className="text-xl sm:text-2xl text-amber-300 font-bold font-sans">
            शुद्धता और स्वाद, हर बूँद में विश्वास
          </p>
          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            At Ramesh Kolhu Wale, we practice open-door craftsmanship. See how slow wood-pressing and clay-pot churning retain living prana, aroma, and essential fatty acids.
          </p>
        </div>
      </section>

      {/* Part 1: The Wooden Kolhu (Lakdi Ki Ghani) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/40">
            <Image
              src="/images/process_live.jpg"
              alt="Lakdi Ki Ghani Machine crushing yellow mustard seeds"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <span className="text-amber-200 text-xs font-bold">
                Operating live in Delhi NCR • 14 RPM slow cold extraction
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Lakdi Ka Kolhu (Cold-Pressed)
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
              Why Wood Makes All The Difference
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              When seeds are crushed in modern industrial metal expellers, intense friction creates temperatures up to <strong>160°C to 200°C</strong>. This destroys fragile antioxidants, oxidizes delicate Omega-3 chains, and alters molecular structures.
            </p>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              In our traditional <strong>Lakdi Ki Ghani (Wooden Kolhu)</strong>, the mortar and pestle are carved out of aged Vagai (Albizia Lebbeck) and Neem wood. Wood naturally absorbs heat, keeping the extraction temperature strictly <strong>under 38°C</strong>.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <FiThermometer className="text-emerald-800 w-5 h-5 mb-1" />
                <span className="block text-xl font-extrabold text-stone-900">&lt; 38°C</span>
                <span className="text-xs text-stone-600">Preserves natural Vitamin E</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <FiClock className="text-amber-800 w-5 h-5 mb-1" />
                <span className="block text-xl font-extrabold text-stone-900">14 RPM</span>
                <span className="text-xs text-stone-600">Slow artisanal rotation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Part 2: The 5-Step Vedic Bilona Churning */}
      <section className="py-16 bg-[#031d15] text-white" id="bilona">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-3.5 py-1 rounded-full border border-amber-400/30">
                Ancient Vedic 5-Samskara Method
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
                How We Make True A2 Desi Cow Bilona Ghee
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Most commercial ghee brands do not make ghee from curd; they separate raw cream with centrifugal machines and boil it. That is NOT Bilona ghee.
              </p>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                Ramesh Kolhu Wale follows the sacred 5-samskara process:
              </p>

              <div className="space-y-3">
                {[
                  { title: '1. Sandhana (Boiling)', text: 'Fresh A2 Gir cow milk is boiled slowly over cow-dung wood fire in earthen handis.' },
                  { title: '2. Dadhimathan (Curdling)', text: 'Natural starter culture is added to turn whole milk into nutrient-rich whole curd in clay pots.' },
                  { title: '3. Mathani (Bidirectional Churning)', text: 'Wooden churner rotates clockwise and anticlockwise to separate light cultured makkhan.' },
                  { title: '4. Agnisanskar (Clarification)', text: 'Cultured butter is gently simmered till liquid gold granules (danedar ghee) emerge.' },
                  { title: '5. Galana (Muslin Filtration)', text: 'Filtered through fine muslin cloth into sterilized glass jars.' }
                ].map((s) => (
                  <div key={s.title} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs sm:text-sm">
                    <FiCheckCircle className="text-amber-400 w-4 h-4 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-200">{s.title}: </strong>
                      <span className="text-stone-300">{s.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400/40 order-1 lg:order-2">
              <Image
                src="/images/bilona_tradition.jpg"
                alt="Vedic Bilona Churning in Clay Pot"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <span className="text-amber-300 text-xs font-bold">
                  28–30 Liters of A2 Gir Cow Milk yields exactly 1 Liter of RKW Bilona Ghee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Component */}
      <ProcessComparison />

      {/* Visit Unit Live */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="visit-unit">
        <div className="rounded-3xl bg-emerald-50 border-2 border-emerald-300 p-8 sm:p-12 text-stone-900">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-900 bg-white px-3.5 py-1 rounded-full border border-emerald-200">
              Live Transparency
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif">
              Visit Our Pitampura Workshop in Delhi NCR
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              We welcome curious families, doctors, and students every single day. See the yellow mustard seeds poured into the wooden cavity, touch the cold oil frothing out, and fill your own glass bottles.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="tel:9811254321"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs shadow-md"
              >
                <FiPhone /> Call Workshop (+91 98112 54321)
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-stone-300 hover:bg-stone-50 font-bold text-xs text-stone-800"
              >
                <FiMapPin className="text-amber-600" /> View Map &amp; Directions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
