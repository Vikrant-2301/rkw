import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowUpRight, FiMapPin, FiArrowRight, FiClock, FiEye, FiHeart, FiDroplet } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: 'Our Story Since 1981 | Ramesh Kolhu Wale',
  description:
    'Discover the story of Ramesh Kolhu Wale. A Delhi-based family tradition of authentic cold-pressed oils and traditional Bilona ghee since 1981.',
  alternates: {
    canonical: '/about',
  },
};

const UNIT_HOURS = '10:00 AM – 8:30 PM';
const COMING_SOON = /karawal|maujpur|moj\s?pur/i;

const principles = [
  {
    icon: FiDroplet,
    title: 'Let the process take its time.',
    description:
      'We choose traditional, slow cold-press extraction over shortcuts. The method takes patience, but the character of the oil is worth preserving.',
  },
  {
    icon: FiEye,
    title: 'Nothing to hide.',
    description:
      'Our doors are open. Visit our Units, see the seeds, understand the process and watch your oil being pressed in front of you.',
  },
  {
    icon: FiHeart,
    title: 'Tradition, practised every day.',
    description:
      'Traditional knowledge remains at the heart of what we do, supported by modern practices and careful attention to hygiene.',
  },
];

export default function AboutPage() {
  const stores = SITE_CONFIG.stores as unknown as { name: string; area: string }[];
  const soonCount = stores.filter((s) => COMING_SOON.test(`${s.name} ${s.area}`)).length;
  const openCount = stores.length - soonCount;
  const years = new Date().getFullYear() - 1981;

  const stats = [
    { value: '1981', label: 'Our beginnings' },
    { value: `${years}+`, label: 'Years of trust' },
    { value: String(openCount).padStart(2, '0'), label: 'Units open' },
    { value: '7 days', label: 'Open every week' },
  ];

  return (
    <main className="bg-[#FAF8F3] text-[#1C1A16] overflow-x-hidden">
      {/* 01 — OPENING */}
      <section className="relative pt-14 sm:pt-20 lg:pt-28 pb-14 sm:pb-20 border-b border-[#E8E0D0]">
        <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#EBF2F8]/70 rounded-full blur-3xl pointer-events-none -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#F5E6B0]/30 rounded-full blur-3xl pointer-events-none -ml-24 -mb-24" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-10 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EBF2F8] text-[#0E2A47] text-[11px] sm:text-xs font-semibold rounded-full uppercase tracking-wider border border-[#163A60]/10">
              <FiMapPin className="w-3.5 h-3.5" />
              The story of Ramesh Kolhu Wale
            </span>
            <span className="text-xs tracking-[0.25em] text-[#8A7E6E] font-semibold">EST. 1981</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-16 items-end">
            <div>
              <p className="font-serif italic text-[#B8860B] text-lg sm:text-2xl mb-4">
                Some things are worth doing slowly.
              </p>
              <h1 className="font-serif font-normal text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#1C1A16]">
                A legacy of{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 italic text-[#0E2A47]">good things.</span>
                  <span className="absolute left-0 right-0 bottom-1 h-2.5 sm:h-4 bg-[#F5E6B0] rounded-sm" />
                </span>
              </h1>
            </div>

            <div className="max-w-md">
              <div className="w-14 h-px bg-[#B8860B] mb-6" />
              <p className="text-[#5A5248] text-base sm:text-lg leading-relaxed font-light">
                It started in 1981 with a traditional Kolhu, a commitment to honest work and a simple
                understanding of what belongs in an Indian kitchen.
              </p>
              <div className="mt-7 flex items-center gap-4">
                <div className="relative w-16 h-14 sm:w-20 sm:h-16 flex-shrink-0">
                  <Image src="/logos/4.svg" alt="Ramesh Kolhu Wale" fill sizes="80px" className="object-contain" />
                </div>
                <div className="border-l border-[#E8E0D0] pl-4">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8A7E6E]">A family tradition</p>
                  <p className="font-serif text-lg mt-0.5 text-[#0E2A47]">Since 1981</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-20 relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2.35/1] overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg border border-[#E8E0D0]">
            <Image
              src="/images/Rustic RKW Mustard Oil Workshop.png"
              alt="Traditional cold-press extraction at Ramesh Kolhu Wale"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C30]/80 via-[#0A1C30]/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-9 sm:right-9">
              <p className="text-[#F5E6B0] uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-1.5 sm:mb-2">
                Our heritage. Our everyday work.
              </p>
              <p className="text-white font-serif text-lg sm:text-3xl leading-snug max-w-xl">
                The art of doing things the traditional way.
              </p>
            </div>
            <span className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-white/10 backdrop-blur border border-white/30 rounded-full px-3 py-1.5 text-white text-[9px] sm:text-[10px] tracking-[0.18em]">
              DELHI NCR · INDIA
            </span>
          </div>
        </div>
      </section>

      {/* 02 — THE FOUNDING STORY */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-10 lg:gap-24">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#B8860B] font-bold mb-5">
                Chapter 01 — The beginning
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.08] font-normal">
                It began with a <span className="italic text-[#0E2A47]">Kolhu.</span>
              </h2>
              <div className="mt-8 w-20 h-px bg-[#B8860B]" />
              <p className="mt-5 text-sm leading-7 text-[#8A7E6E] max-w-xs">
                A traditional way of extracting oil. A belief that has stayed with us for decades.
              </p>
            </div>

            <div className="max-w-2xl">
              <p className="font-serif text-xl sm:text-3xl leading-[1.45] text-[#1C1A16] mb-8">
                Back in 1981, Ramesh ji began cold-pressing indigenous mustard seeds for families in Delhi.
              </p>

              <div className="space-y-5 text-[#5A5248] text-[15px] sm:text-base leading-[1.9] font-light">
                <p>
                  In those days, the relationship between a household and the person who made its everyday
                  essentials was a personal one. People knew where their food came from and valued the hands and
                  experience behind it.
                </p>
                <p>
                  The work began with selecting mustard seeds, understanding their quality and using a traditional
                  Kolhu to extract oil at a slow pace. There was no need to rush. The quality of the ingredients and
                  the care taken at every step mattered most.
                </p>
                <p>
                  Families returned, recommendations travelled from one household to another, and what began with a
                  single traditional extraction unit gradually grew into a name recognised by customers across Delhi
                  NCR.
                </p>
                <p>
                  Today, Ramesh Kolhu Wale continues that tradition through its Units, bringing traditional
                  cold-pressed oils and Bilona ghee to modern Indian households.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t border-[#E8E0D0] flex items-center justify-between gap-4">
                <div>
                  <p className="font-serif italic text-xl text-[#B8860B]">Since 1981.</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A7E6E] mt-2">
                    Still rooted in the same belief
                  </p>
                </div>
                <span className="font-serif text-5xl sm:text-7xl text-[#EBE4D3] leading-none">1981</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — THE CRAFT */}
      <section className="bg-gradient-to-br from-[#0E2A47] via-[#163A60] to-[#0A1C30] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#F5E6B0]/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-[#F5E6B0] uppercase text-[11px] font-bold tracking-[0.25em] mb-6">
                Chapter 02 — The craft
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08]">
                Not everything needs to <span className="italic text-[#F5E6B0]">be faster.</span>
              </h2>
              <div className="w-16 h-px bg-[#F5E6B0] my-7" />
              <p className="text-[#C8D7E6] leading-[1.9] text-sm sm:text-base max-w-lg font-light">
                Cold-pressing is a process that asks for patience. Rather than relying on aggressive industrial
                extraction, we follow a traditional method that works at a slower pace and keeps the process
                honest and straightforward.
              </p>
              <p className="text-[#C8D7E6] leading-[1.9] text-sm sm:text-base max-w-lg mt-4 font-light">
                Once pressed, the oil is allowed to settle naturally before it is filtered and bottled, so what
                reaches your kitchen is as close to the seed as possible.
              </p>
              <Link
                href="/shelf"
                className="inline-flex items-center gap-2.5 mt-8 text-[#F5E6B0] uppercase tracking-[0.16em] text-xs font-semibold border-b border-[#F5E6B0]/50 pb-2 hover:text-white hover:border-white transition-colors"
              >
                Explore the 3D shelf
                <FiArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 shadow-2xl">
                <Image
                  src="/images/hero.jpg"
                  alt="The traditional cold-pressing process"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C30]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#F5E6B0] text-[#0E2A47] rounded-2xl p-4 sm:p-6 max-w-[200px] sm:max-w-[240px] shadow-xl">
                  <p className="font-serif text-3xl sm:text-4xl font-bold">Live</p>
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.14em] mt-2 leading-relaxed font-semibold">
                    Watch your oil being pressed at our Units
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 mt-14 sm:mt-24 border-t border-white/15">
            {stats.map((item, i) => (
              <div
                key={item.label}
                className={`py-6 sm:py-9 pl-4 sm:pl-7 border-white/10 ${i % 2 === 0 ? 'border-r' : ''} ${
                  i < 2 ? 'border-b md:border-b-0' : ''
                } ${i === 1 ? 'md:border-r' : ''} ${i === 2 ? 'md:border-r' : ''}`}
              >
                <p className="font-serif text-3xl sm:text-5xl text-[#F5E6B0]">{item.value}</p>
                <p className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-[#8EA5BC]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — TIMELESS VALUES */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-20">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#B8860B] font-bold mb-5">
                Chapter 03 — What matters
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] font-normal">
                The things we have <span className="italic text-[#0E2A47]">never changed.</span>
              </h2>
              <p className="mt-6 text-sm sm:text-base leading-[1.85] text-[#5A5248] max-w-sm font-light">
                Methods may evolve and the world may move forward. But some principles deserve to remain exactly
                where they started.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-5">
              {principles.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 sm:gap-6 bg-white rounded-2xl border border-[#E8E0D0] p-5 sm:p-7 hover:shadow-md hover:border-[#163A60]/30 transition-all"
                  >
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#EBF2F8] text-[#0E2A47] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[#B8860B]">
                        0{i + 1}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1A16] mt-0.5">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-[1.85] text-[#5A5248]">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 05 — TRANSPARENCY */}
      <section className="bg-[#EBF2F8]/60 border-y border-[#E8E0D0] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-20 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#B8860B] font-bold mb-5">
                An open invitation
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.1] font-normal">
                Don&apos;t just take our <span className="italic text-[#0E2A47]">word for it.</span>
              </h2>
              <p className="text-[#5A5248] text-sm sm:text-base leading-[1.9] mt-6 max-w-lg font-light">
                We believe the best way to understand the quality of an oil is to see how it is made. That is why
                customers are welcome at our Units to see the traditional extraction process first-hand.
              </p>
              <p className="text-[#5A5248] text-sm sm:text-base leading-[1.9] mt-4 max-w-lg font-light">
                See the seeds, watch the Kolhu at work and experience the process behind the bottle. No complicated
                claims. Just a closer look at what goes into your everyday essentials.
              </p>
              <Link
                href="/stores"
                className="inline-flex items-center justify-center gap-2.5 mt-8 px-7 py-3.5 bg-[#0E2A47] hover:bg-[#163A60] text-white text-xs font-semibold uppercase tracking-[0.14em] rounded-full transition-colors shadow-md w-full sm:w-auto"
              >
                Find a Unit near you
                <FiArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white border border-[#E8E0D0] rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm">
              <div className="flex justify-between items-center pb-4 border-b border-[#F0EBE1]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8A7E6E] font-semibold">
                  You are welcome
                </p>
                <FiClock className="text-[#B8860B] w-5 h-5" />
              </div>

              <p className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-7 text-[#0E2A47] leading-[1.05]">
                10 AM <span className="text-[#B8860B]">–</span> 8:30 PM
              </p>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#B8860B] font-bold mt-3">
                Every day · 7 days a week
              </p>

              <div className="h-px bg-[#F0EBE1] my-6" />

              <div className="flex justify-between items-center gap-4">
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold">
                    {openCount} Units open{soonCount > 0 ? '.' : ''}
                  </p>
                  <p className="text-sm text-[#5A5248] mt-1">
                    {soonCount > 0 ? `${soonCount} more opening soon across Delhi NCR.` : 'Across Delhi NCR.'}
                  </p>
                </div>
                <Link
                  href="/stores"
                  aria-label="Find our units"
                  className="w-11 h-11 flex-shrink-0 rounded-full border border-[#163A60]/30 text-[#0E2A47] flex items-center justify-center hover:bg-[#0E2A47] hover:text-white transition-all"
                >
                  <FiArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — CLOSING */}
      <section className="bg-gradient-to-br from-[#0E2A47] via-[#163A60] to-[#0A1C30] text-white py-16 sm:py-28 relative overflow-hidden">
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-[#F5E6B0]/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="relative w-20 h-16 sm:w-24 sm:h-20 mx-auto mb-8">
            <Image
              src="/logos/4.svg"
              alt="Ramesh Kolhu Wale heritage mark"
              fill
              sizes="96px"
              className="object-contain"
            />
          </div>

          <p className="text-[#F5E6B0] uppercase tracking-[0.25em] text-[11px] font-bold mb-6">
            Ramesh Kolhu Wale · Since 1981
          </p>

          <h2 className="font-serif text-4xl sm:text-6xl leading-[1.1] font-normal">
            Good things are worth <span className="italic text-[#F5E6B0]">coming back to.</span>
          </h2>

          <p className="text-[#C8D7E6] text-sm sm:text-base leading-[1.85] max-w-xl mx-auto mt-6 font-light">
            Whether you are discovering us for the first time or have been part of our journey for years, there is
            always a place for you at Ramesh Kolhu Wale.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-9">
            <Link
              href="/stores"
              className="inline-flex justify-center items-center gap-2.5 px-7 py-3.5 bg-[#F5E6B0] hover:bg-[#fff1c2] text-[#0E2A47] text-xs font-bold uppercase tracking-[0.14em] rounded-full transition-colors"
            >
              Visit our Units
              <FiArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex justify-center items-center gap-2.5 px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold uppercase tracking-[0.14em] rounded-full transition-colors"
            >
              Explore our collection
              <FiArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                'Hello Ramesh Kolhu Wale! I would like to know more and place an order.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center gap-2.5 px-7 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-[0.14em] rounded-full transition-colors"
            >
              <FaWhatsapp className="w-4 h-4" />
              WhatsApp us
            </a>
          </div>

          <div className="mt-16 sm:mt-20 pt-6 border-t border-white/15 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/45">
            <span>Made with care, since 1981.</span>
            <span>
              Open {UNIT_HOURS} · Delhi NCR
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}