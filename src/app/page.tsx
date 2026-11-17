import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { StoreLocatorSection } from '@/components/StoreLocatorSection';
import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG } from '@/config/site';

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);
  const displayProducts = featuredProducts.length >= 3 ? featuredProducts : PRODUCTS.slice(0, 4);

  return (
    <div>
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[#0E2A47] bg-gradient-to-b from-[#0A1C30] via-[#0E2A47] to-[#123356]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Ramesh Kolhu Wale — authentic cold-pressed oils"
            fill
            priority
            loading="eager"
            sizes="100vw"
            className="object-cover opacity-25"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-2xl">
            <p className="text-[#F5E6B0] text-sm uppercase tracking-[0.2em] mb-6 font-semibold">
              Ramesh Kolhu Wale — Est. 1965
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-white leading-tight mb-8">
              Pure Oils,<br />
              <em className="text-[#D4A017] not-italic font-serif">Cold-Pressed Fresh</em>
            </h1>
            <p className="text-[#C8D7E6] text-lg sm:text-xl leading-relaxed mb-10 max-w-xl font-light">
              Authentic traditional cold-pressed oils and Vedic Bilona ghee, 
              crafted in Delhi NCR with zero chemicals or artificial refining.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#B8860B] hover:bg-[#D4A017] text-white font-medium rounded-full shadow-lg shadow-black/20 transition-all hover:scale-[1.02]"
              >
                Shop Now
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#find-store"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#C8D7E6]/40 text-[#C8D7E6] hover:border-white hover:text-white rounded-full transition-all hover:bg-white/5"
              >
                Find Nearest Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust bar ───────────────────────────────────────── */}
      <section className="bg-[#FAF8F3] border-b border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-sm">
            {[
              { label: 'Cold-Pressed', sub: 'Never refined or solvent-extracted' },
              { label: 'NABL Certified', sub: 'Lab tested every batch' },
              { label: 'Free Delivery', sub: 'Delhi NCR on orders ₹799+ (₹100 under)' },
              { label: '10 AM – 10 PM', sub: 'Workshop hours open all 7 days' },
            ].map(item => (
              <div key={item.label} className="space-y-1">
                <p className="font-semibold text-[#0E2A47]">{item.label}</p>
                <p className="text-xs text-[#8A7E6E]">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Products ───────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#B8860B] text-xs uppercase tracking-widest font-semibold mb-2">Our Collection</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal">
                Made without shortcuts
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-[#0E2A47] hover:text-[#B8860B] transition-colors font-semibold"
            >
              View all <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center sm:hidden">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-[#0E2A47] font-semibold">
              See all products <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Craft story ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#F2EEE5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/hero.jpg"
                alt="Traditional cold-press extraction in action"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <p className="text-[#B8860B] text-xs uppercase tracking-widest font-semibold">Why RKW</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal leading-snug">
                The difference you<br />can taste
              </h2>
              <p className="text-[#5A5248] leading-relaxed">
                At Ramesh Kolhu Wale, we press our oils slowly at under 38°C using 
                traditional cold-press techniques. No heat, no chemicals, no compromise. 
                The result is oil that retains all its natural nutrients, flavour, and colour —
                exactly as nature intended.
              </p>
              <ul className="space-y-3">
                {[
                  'Pressed below 38°C — nutrients fully preserved',
                  'Zero chemical solvents or refining',
                  'NABL lab-tested for purity every batch',
                  'Watch your oil being pressed live at our workshop (10 AM – 10 PM)',
                ].map(point => (
                  <li key={point} className="flex items-start gap-3 text-sm text-[#5A5248]">
                    <FiCheck className="w-4 h-4 text-[#0E2A47] flex-shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href="/process"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E2A47] hover:text-[#B8860B] transition-colors"
              >
                Learn about our process <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process steps ───────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest font-semibold mb-3">The Method</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal">
              From seed to bottle
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Seed Selection', desc: 'Single-origin seeds sourced directly from farmers across Rajasthan, MP, and Gujarat.' },
              { step: '02', title: 'Sun Drying', desc: 'Seeds are dried naturally for 2–3 days to reduce moisture and intensify flavour.' },
              { step: '03', title: 'Cold-Press Extraction', desc: 'Slow cold-pressing at under 38°C in traditional cold-press ghanis. Zero friction heat.' },
              { step: '04', title: 'Natural Settling', desc: 'Oil settles naturally for 48 hours before filtering and bottling. No preservatives added.' },
            ].map(item => (
              <div key={item.step} className="space-y-4">
                <div className="text-4xl font-serif text-[#C8D7E6] font-bold leading-none">{item.step}</div>
                <h3 className="text-base font-semibold text-[#1C1A16]">{item.title}</h3>
                <p className="text-sm text-[#8A7E6E] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ────────────────────────────────────── */}
      <section className="py-20 sm:py-28 bg-[#0A1C30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#F5E6B0] text-xs uppercase tracking-widest font-semibold mb-3">What people say</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              Trusted by families
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The mustard oil from RKW has completely changed how our food tastes. You can smell the difference the moment you open the bottle.",
                author: "Priya Sharma",
                location: "Rohini, Delhi",
              },
              {
                quote: "I visited the workshop and watched my ghee being churned. That level of transparency is rare. The A2 cow ghee is exceptional.",
                author: "Rajesh Mehra",
                location: "Gurgaon",
              },
              {
                quote: "My mother has been buying from Ramesh ji for 15 years. We will never go back to supermarket oils. The quality is simply unmatched.",
                author: "Anita Kapoor",
                location: "Pitampura, Delhi",
              },
            ].map(item => (
              <div key={item.author} className="bg-[#163A60] rounded-2xl p-7 space-y-5 border border-[#1E4E80]/40 shadow-md">
                <p className="text-[#EBF2F8] leading-relaxed text-sm">&ldquo;{item.quote}&rdquo;</p>
                <div>
                  <p className="text-white font-semibold text-sm">{item.author}</p>
                  <p className="text-[#93B5D9] text-xs mt-0.5">{item.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Find Nearest Store & Live Workshops ───────────── */}
      <StoreLocatorSection id="find-store" />

      {/* ─── CTA / WhatsApp ──────────────────────────────────── */}
      <section className="py-16 sm:py-24 bg-[#F2EEE5] border-t border-[#E8E0D0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#B8860B] font-semibold">Fast Delhi NCR Doorstep Delivery</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal">
            Order Fresh Cold-Pressed Oils &amp; Bilona Ghee
          </h2>
          <p className="text-[#5A5248] leading-relaxed max-w-xl mx-auto">
            Free home delivery across Delhi NCR on orders above ₹799 (₹100 delivery fee on orders below ₹799). 
            Workshop open everyday from 10:00 AM to 10:00 PM.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                'Hello RKW, I want to order pure cold-pressed oils & Vedic Bilona ghee!'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold rounded-full shadow-md transition-all hover:scale-[1.02]"
            >
              <FaWhatsapp className="text-xl" />
              <span>WhatsApp to Order ({SITE_CONFIG.contact.whatsapp})</span>
            </a>
            <Link
              href="/stores"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#0E2A47] text-[#0E2A47] hover:bg-[#0E2A47] hover:text-white rounded-full transition-all font-semibold"
            >
              Find Nearest Store
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
