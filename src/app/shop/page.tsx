'use client';

import React, { useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'mustard-oils', label: 'Mustard Oils' },
    { id: 'bilona-ghee', label: 'Bilona Ghee' },
    { id: 'nut-seed-oils', label: 'Nut & Seed Oils' },
  ];

  const filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Page header */}
      <div className="mb-12">
        <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-3">Our Collection</p>
        <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1A16] font-normal">Shop All</h1>
        <p className="text-[#8A7E6E] mt-4 max-w-xl">
          Every product is wood-pressed or Bilona-churned, NABL lab-tested, and free of chemical solvents or preservatives.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-[#1C3829] text-white'
                : 'bg-[#EDE8DF] text-[#4A4035] hover:bg-[#E0D8CC]'
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
    <Suspense fallback={<div className="min-h-screen" />}>
      <ShopContent />
    </Suspense>
  );
}
