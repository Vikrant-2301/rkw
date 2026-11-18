'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiTruck, FiClock } from 'react-icons/fi';
import { SITE_CONFIG } from '@/config/site';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'oil', label: 'Pure Oils' },
    { id: 'bilona-ghee', label: 'Bilona Ghee' },
  ];

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-3 font-semibold">Our Collection</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1A16] font-normal">Shop All Pure Oils &amp; Ghee</h1>
        <p className="text-[#8A7E6E] mt-3 max-w-xl font-light">
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

      {/* Category filters */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#0E2A47] text-white shadow-md'
                : 'bg-[#EBF2F8] text-[#4A4035] hover:bg-[#DDE9F4] hover:text-[#0E2A47]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {filtered.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[#8A7E6E]">
          <p>No products in this category yet.</p>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[#8A7E6E]">Loading collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
