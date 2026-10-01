'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS, CATEGORIES, FAQS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { RKWBannerShowcase } from '@/components/RKWBannerShowcase';
import { LiveExtractionBanner } from '@/components/LiveExtractionBanner';
import { ProcessComparison } from '@/components/ProcessComparison';
import { useCart } from '@/context/CartContext';
import { 
  FiArrowRight, 
  FiCheckCircle, 
  FiShield, 
  FiTruck, 
  FiAward, 
  FiPhone, 
  FiEye, 
  FiChevronDown, 
  FiStar,
  FiShoppingBag,
  FiCheck
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function HomePage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroTab, setHeroTab] = useState<number>(0);
  const [heroAdded, setHeroAdded] = useState(false);

  const heroFeaturedProducts = [
    PRODUCTS.find((p) => p.id === 'yellow-mustard-oil') || PRODUCTS[0],
    PRODUCTS.find((p) => p.id === 'vedic-a2-bilona-gir-cow-ghee') || PRODUCTS[2],
    PRODUCTS.find((p) => p.id === 'pure-badam-rogan-almond-oil') || PRODUCTS[4],
  ];

  const currentHeroProduct = heroFeaturedProducts[heroTab] || heroFeaturedProducts[0];

  const handleHeroQuickAdd = () => {
    addToCart(currentHeroProduct, currentHeroProduct.volumes[0], 1);
    setHeroAdded(true);
    setTimeout(() => setHeroAdded(false), 2000);
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const testimonials = [
    {
      name: 'Dr. Anita Saxena (Ayurvedic Specialist)',
      location: 'Pitampura, New Delhi',
      rating: 5,
      comment:
        'I have personally observed Ramesh Ji’s extraction unit at Pitampura. The low RPM wooden ghani keeps the delicate omega acids intact. Their yellow mustard oil and A2 cow ghee are the benchmark of purity in Delhi.',
      product: 'Yellow Mustard Oil & A2 Ghee',
    },
    {
      name: 'Suresh & Meena Aggarwal',
      location: 'Janakpuri, West Delhi',
      rating: 5,
      comment:
        'Our family has been purchasing oil from Ramesh Kolhu Wale for years. When you heat this oil in the kadhai, the authentic mustard fragrance reminds me of our ancestral home in Alwar. Absolutely zero burning sensation or gastric acidity.',
      product: 'Pure Wood-Pressed Yellow Mustard',
    },
    {
      name: 'Rohan Malhotra (Fitness & Nutrition Coach)',
      location: 'Sector 50, Noida',
      rating: 5,
      comment:
        'Finding genuine raw cold-pressed almond oil and granular bilona ghee without synthetic adulterants is rare. RKW test reports are totally transparent and batch-verified. Highly recommended!',
      product: 'Sweet Badam Rogan & Bilona Ghee',
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-16 pb-16">
      {/* 1. Split 2-Column Responsive Hero Section in Royal Forest Emerald & Gold Theme */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#041f17] via-[#062e22] to-[#083a2b] text-white py-10 sm:py-16 lg:py-20 border-b-2 border-amber-500/30">
        {/* Subtle Ambient Glow Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Brand Typography, Trust & CTAs */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-400/15 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
                100% Traditional Wooden Ghani &amp; Vedic Clay Bilona
              </div>

              {/* Main Headlines */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-serif tracking-wide leading-tight">
                  RAMESH KOLHU WALE
                  <span className="text-amber-400 text-sm align-top ml-1">TM</span>
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-amber-300 font-sans tracking-wide leading-snug">
                  शुद्धता और स्वाद, <br className="hidden sm:inline" />
                  पीढ़ी-दर-पीढ़ी का विश्वास
                </p>
              </div>

              {/* Subtitle Description */}
              <p className="text-sm sm:text-base lg:text-lg text-emerald-100/90 leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
                Extracted fresh before your eyes below 38°C in authentic wooden Kolhu (Lakdi Ki Ghani) and traditional earthen pot Vedic A2 Gir Cow Bilona Ghee. Zero hexane solvent, zero caustic soda bleach, zero artificial deodorizers.
              </p>

              {/* 4 Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs font-semibold text-amber-100 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-1.5 bg-white/5 py-1.5 px-2.5 rounded-lg border border-white/10">
                  <FiCheckCircle className="text-amber-400 flex-shrink-0" />
                  <span className="truncate">Cold-Pressed &lt;38°C</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 py-1.5 px-2.5 rounded-lg border border-white/10">
                  <FiCheckCircle className="text-amber-400 flex-shrink-0" />
                  <span className="truncate">NABL Lab Tested</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 py-1.5 px-2.5 rounded-lg border border-white/10">
                  <FiCheckCircle className="text-amber-400 flex-shrink-0" />
                  <span className="truncate">FSSAI Certified</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 py-1.5 px-2.5 rounded-lg border border-white/10">
                  <FiCheckCircle className="text-amber-400 flex-shrink-0" />
                  <span className="truncate">Delhi NCR Express</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <Link
                  href="/shop"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <span>Shop Pure Range</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/process#visit-unit"
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/25 transition-all"
                >
                  <FiEye className="text-amber-300 w-4 h-4" />
                  <span>Watch Live Extraction</span>
                </Link>

                <a
                  href="https://wa.me/919811254321?text=Hello%20Ramesh%20Kolhu%20Wale,%20I%20want%20to%20order%20pure%20cold%20pressed%20oil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all"
                >
                  <FaWhatsapp className="text-base" />
                  <span>WhatsApp Order</span>
                </a>
              </div>

              {/* Quick Stat Counter */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-emerald-700/50 text-stone-300 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-white">50,000+</span>
                  <span className="text-[11px] text-emerald-200/80">Delighted Families</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-amber-300">100%</span>
                  <span className="text-[11px] text-emerald-200/80">Zero Chemicals</span>
                </div>
                <div>
                  <span className="block text-xl sm:text-2xl font-black text-white">4.9 ★</span>
                  <span className="text-[11px] text-emerald-200/80">Verified Purity Rating</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Featured Product Stage */}
            <div className="lg:col-span-5 relative">
              {/* Product Switcher Tabs */}
              <div className="flex items-center justify-center gap-1.5 mb-3 bg-[#031c14] p-1.5 rounded-2xl border border-emerald-600/40 max-w-md mx-auto">
                {['Yellow Mustard', 'A2 Bilona Ghee', 'Badam Rogan'].map((label, idx) => (
                  <button
                    key={label}
                    onClick={() => setHeroTab(idx)}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      heroTab === idx
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-md font-extrabold scale-102'
                        : 'text-emerald-100 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Featured Showcase Card */}
              <div className="relative rounded-3xl bg-white text-stone-900 p-5 sm:p-6 shadow-2xl border-2 border-amber-400/60 max-w-md mx-auto animate-fadeIn">
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-[#062e22] text-amber-300 shadow-md border border-amber-400/40">
                  <span>★</span>
                  <span>{currentHeroProduct.category === 'bilona-ghee' ? 'Clay Matka Churned' : 'Wood-Pressed <38°C'}</span>
                </div>

                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 mb-4 border border-stone-200">
                  <Image
                    src={currentHeroProduct.image}
                    alt={currentHeroProduct.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    priority
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-stone-900 text-base sm:text-lg leading-snug line-clamp-1">
                        {currentHeroProduct.name}
                      </h3>
                      <p className="text-xs text-emerald-800 font-bold mt-0.5 font-sans">
                        {currentHeroProduct.hindiName}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                        ₹{currentHeroProduct.volumes[0].price}
                      </span>
                      <span className="text-xs text-stone-400 line-through block">
                        ₹{currentHeroProduct.volumes[0].originalPrice}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-700 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                    <FiAward className="text-emerald-800 w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{currentHeroProduct.processHighlight}</span>
                  </div>

                  {/* Actions inside card */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleHeroQuickAdd}
                      className={`flex-1 py-3 px-4 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                        heroAdded
                          ? 'bg-green-700 text-white'
                          : 'bg-emerald-800 hover:bg-emerald-900 text-amber-200 hover:text-white'
                      }`}
                    >
                      {heroAdded ? (
                        <>
                          <FiCheck className="w-4 h-4" />
                          <span>Added to Basket ✓</span>
                        </>
                      ) : (
                        <>
                          <FiShoppingBag className="w-4 h-4 text-amber-300" />
                          <span>Quick Add to Basket ({currentHeroProduct.volumes[0].size})</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/product/${currentHeroProduct.slug}`}
                      className="p-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
                      title="View product details"
                    >
                      <FiArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Official Brand Identity Banner Showcase */}
      <RKWBannerShowcase />

      {/* 3. Product Catalog Grid with Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 text-center md:text-left">
          <div>
            <span className="text-xs font-black tracking-widest text-emerald-900 uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 inline-block">
              Straight from the Wooden Kolhu
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mt-2 font-serif">
              Our 100% Pure Range
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Extracted slowly in front of your eyes. Available in glass bottles &amp; eco-friendly canisters.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <span>View All ({PRODUCTS.length} Products)</span>
            <FiArrowRight className="w-4 h-4 text-amber-600" />
          </Link>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8 justify-start sm:justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-amber-200 shadow-md shadow-emerald-950/20 scale-102 border border-emerald-700'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Live Extraction & Trust Banner */}
      <LiveExtractionBanner />

      {/* 5. The 5-Step Vedic Journey (Process Overview) */}
      <section className="py-12 bg-amber-50/50 border-y border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-black tracking-widest text-emerald-900 uppercase bg-amber-200/60 px-3 py-1 rounded-full border border-amber-300">
              Purity in Every Step
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mt-2 font-serif">
              The 5-Step Vedic Extraction Journey
            </h2>
            <p className="text-stone-600 text-xs sm:text-base mt-2">
              We never compromise. From organic native seeds to slow wooden churning, here is why every spoonful brings health and vitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Organic Seed Sourcing',
                desc: 'Single-origin Rajasthani yellow & black mustard, California almonds & Saurashtra peanuts, sun-dried without sulfur.',
              },
              {
                step: '02',
                title: 'Lakdi Ka Kolhu',
                desc: 'Slowly pressed in Waghai & Neem wood mortar at 14 RPM. Friction temperature is strictly kept under 38°C.',
              },
              {
                step: '03',
                title: 'Earthen Pot Bilona',
                desc: 'Pure A2 Gir cow milk boiled on gentle wood fire, cultured into whole curd, and churned bi-directionally with wooden mathani.',
              },
              {
                step: '04',
                title: 'Cotton Sedimentation',
                desc: 'Natural settling for 48 hours and filtration through organic muslin cloth. 0% chemical bleaching agents or acid clays.',
              },
              {
                step: '05',
                title: 'UV-Sanitized Glass',
                desc: 'Bottled in heavy glass bottles and food-grade metal containers to protect delicate polyphenols from light and heat degradation.',
              },
            ].map((item, idx) => (
              <div
                key={item.step}
                className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="text-3xl font-black text-amber-500/40 block mb-2 font-mono">
                    {item.step}
                  </span>
                  <h3 className="font-extrabold text-stone-900 text-base mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center text-[11px] font-bold text-emerald-800">
                  <span>Step {idx + 1} of 5</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/process"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-950 text-amber-300 font-bold text-xs uppercase tracking-wider transition-colors shadow"
            >
              <span>Explore Detailed Engineering of Our Kolhu</span>
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Process Comparison: Lakdi Ghani vs Factory Refined */}
      <ProcessComparison />

      {/* 7. Real Customer Reviews & Health Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-black tracking-widest text-emerald-900 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Delhi NCR Loves RKW
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-stone-900 mt-2 font-serif">
            Words of Trust from Real Families
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Over 50,000 households in Delhi NCR have switched back to genuine Lakdi Ki Ghani oils.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <FiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{t.name}</h4>
                  <p className="text-[11px] text-stone-400">{t.location}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-black tracking-widest text-emerald-900 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-2 font-serif">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Everything you need to know about our extraction, Vedic methods, and workshop visits.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={faq.q}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-stone-900 text-sm sm:text-base hover:text-emerald-800 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <FiChevronDown
                  className={`w-5 h-5 text-stone-400 transition-transform duration-200 flex-shrink-0 ${
                    openFaq === idx ? 'rotate-180 text-emerald-800' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Join the Purity Revolution CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#031d15] via-[#062e22] to-[#041a13] text-white p-8 sm:p-12 text-center space-y-6 shadow-2xl border border-amber-400/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
              Free Express Delivery in Delhi NCR on ₹799+
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-serif">
              Bring Vedic Health &amp; Honest Purity Home Today
            </h2>
            <p className="text-emerald-100 text-xs sm:text-base leading-relaxed">
              Order now or visit our master workshops in Delhi NCR. Try coupon code <strong className="text-amber-300">RKW10</strong> for 10% off your first cold-pressed order.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/shop"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-transform hover:scale-105"
              >
                Shop All Products
              </Link>
              <a
                href="tel:9811254321"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all"
              >
                <FiPhone className="text-amber-300" />
                <span>Call Helpline: +91 98112 54321</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
