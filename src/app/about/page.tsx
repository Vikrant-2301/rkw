import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Since 1981 – A Legacy of Purity and Trust | Ramesh Kolhu Wale',
  description: 'Our journey began in 1981 with a simple belief: every Indian family deserves pure, high-quality edible oils and authentic Bilona Ghee.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#F2EEE5] py-20 sm:py-28 border-b border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-4 font-semibold">Our Heritage &amp; Mission</p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1C1A16] font-normal leading-tight mb-6">
              Since 1981 – A Legacy of Purity and Trust
            </h1>
            <p className="text-[#5A5248] text-lg leading-relaxed font-light">
              Our journey began in 1981 with a simple belief every Indian family deserves pure, high-quality edible oils.
            </p>
          </div>
        </div>
      </section>

      {/* Story section with Heritage Seal */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-stone-200">
                <Image
                  src="/images/hero.jpg"
                  alt="Traditional cold-press extraction at RKW Unit"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-center p-6 bg-white rounded-2xl border border-stone-200 shadow-xs">
                <div className="relative w-52 h-44">
                  <Image
                    src="/logos/4.svg"
                    alt="Ramesh Kolhu Wale Heritage Seal"
                    fill
                    sizes="220px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-6 max-w-lg">
              <span className="text-xs font-semibold text-[#0E2A47] bg-[#EBF2F8] px-3 py-1 rounded-full uppercase tracking-wider">
                Est. 1981 · Delhi NCR
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal">Our Story</h2>
              <div className="space-y-4 text-[#5A5248] leading-relaxed text-sm sm:text-base">
                <p className="text-base sm:text-lg font-medium text-[#1C1A16]">
                  Our journey began in 1981 with a simple belief every Indian family deserves pure, high-quality edible oils.
                </p>
                <p>
                  In those early days, mustard oil manufacturing was closely connected to traditional knowledge and hands-on experience. From selecting mustard seeds to understanding their quality, aroma and natural characteristics, every step required care and attention. We learned that making good mustard oil was not just about manufacturing a product; it was about preserving the taste and traditions that have been part of Indian kitchens for generations.
                </p>
                <p>
                  Rooted in tradition and strengthened by decades of experience, we have continuously evolved by embracing modern manufacturing practices while staying true to the values that define us.
                </p>
                <p className="font-medium text-[#0E2A47] text-base border-l-2 border-[#B8860B] pl-4 italic bg-[#FAF8F3] py-2.5 rounded-r-lg">
                  For us, quality is more than a promise it is a commitment built on family values, generations of hard work and the trust of our customers.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#0E2A47]">
                <div className="flex items-center gap-1.5"><FiCheckCircle className="text-[#0E2A47]" /> 100% Pure First Press</div>
                <div className="flex items-center gap-1.5"><FiCheckCircle className="text-[#0E2A47]" /> Traditional Knowledge</div>
                <div className="flex items-center gap-1.5"><FiCheckCircle className="text-[#0E2A47]" /> Generations of Trust</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 bg-[#F2EEE5] border-y border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-3 font-semibold">Our Principles</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'No shortcuts',
                desc: 'True cold-pressing yields less oil and takes three times longer than industrial solvent extraction. We insist on this slow path because authentic purity and human health can never be compromised.',
              },
              {
                title: 'Full transparency',
                desc: 'Our pure quality testing guarantees 100% purity for every batch. We welcome customers into our Units to smell the crushed seeds and witness pure cold-pressed oil dripping into clean containers.',
              },
              {
                title: 'Vedic heritage',
                desc: 'Traditional cold-press extraction and bilona churning are 2,000-year-old treasures of Indian wisdom. We preserve these living traditions with rigorous modern hygiene standards.',
              },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-2xl p-8 space-y-4 shadow-sm border border-stone-200/80">
                <h3 className="font-serif text-xl text-[#0E2A47] font-semibold">{item.title}</h3>
                <p className="text-sm text-[#5A5248] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-[#FAF8F3]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal">
            Come see for yourself
          </h2>
          <p className="text-[#8A7E6E] leading-relaxed">
            Our Units in Delhi NCR are open daily from 10:00 AM to 10:00 PM. Experience the gentle rhythm of live cold-press extraction and take home oil pressed minutes earlier.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/stores"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0E2A47] hover:bg-[#163A60] text-white font-medium rounded-full shadow-md transition-all hover:scale-105"
            >
              Find Nearest Store <FiArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#D0C8B8] text-[#4A4035] hover:border-[#0E2A47] hover:text-[#0E2A47] rounded-full transition-colors hover:bg-white"
            >
              Shop Our Oils
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
