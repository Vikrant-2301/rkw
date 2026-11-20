'use client';

import React, { useState, useMemo } from 'react';
import { useLiveProducts } from '@/hooks/useLiveProducts';
import { ProductCard } from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import { FiTruck, FiClock, FiFilter } from 'react-icons/fi';
import { SITE_CONFIG } from '@/config/site';

export function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high'>('featured');
  const { products } = useLiveProducts();

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'oil', label: 'Pure Oils' },
    { id: 'bilona-ghee', label: 'Bilona Ghee' },
  ];

  const filteredAndSorted = useMemo(() => {
    let list = [...products];

    // Category Filter
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    // Sort
    if (sortBy === 'price_low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_high') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, activeCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-20">
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-2 sm:mb-3 font-semibold">Our Collection</p>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1C1A16] font-normal">Shop All Pure Oils &amp; Ghee</h1>
        <p className="text-[#8A7E6E] mt-2 sm:mt-3 max-w-xl font-light text-sm sm:text-base">
          Every product is cold-pressed fresh or authentically Bilona-churned, batch tested, and 100% pure &amp; chemical-free.
        </p>
      </div>

      {/* Delivery & Hours Info Bar */}
      <div className="bg-[#EBF2F8] border border-[#163A60]/15 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#0E2A47]">
        <div className="flex items-center gap-2 font-medium">
          <FiTruck className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
          <span><strong>Free Delhi NCR Home Delivery</strong> on orders above ₹799 (₹100 delivery fee on orders below ₹799).</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#5A5248]">
            <FiClock className="w-3.5 h-3.5 text-[#0E2A47]" />
            <span>Unit Hours: {SITE_CONFIG.contact.unitHours}</span>
          </span>
          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
              'Hello RKW, I want to order pure cold-pressed oils & Bilona ghee!'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full font-semibold shadow-xs"
          >
            <FaWhatsapp className="w-3.5 h-3.5" />
            <span>Order on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Category filters + Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#0E2A47] text-white shadow-md'
                  : 'bg-[#EBF2F8] text-[#4A4035] hover:bg-[#DDE9F4] hover:text-[#0E2A47]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 shrink-0">
          <FiFilter className="w-3.5 h-3.5 text-[#8A7E6E]" />
          <span className="text-xs text-[#8A7E6E] font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="px-3 py-1.5 rounded-xl border border-[#D0C8B8] bg-white text-xs font-semibold text-[#0E2A47] focus:outline-none focus:border-[#0E2A47]"
          >
            <option value="featured">Featured</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {filteredAndSorted.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredAndSorted.length === 0 && (
        <div className="text-center py-20 text-[#8A7E6E] space-y-3">
          <p className="text-base font-semibold">No products found in this category.</p>
          <button
            onClick={() => setActiveCategory('all')}
            className="px-4 py-2 bg-[#0E2A47] text-white text-xs font-semibold rounded-xl"
          >
            View All Products
          </button>
        </div>
      )}
    </div>
  );
}
