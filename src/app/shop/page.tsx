'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { FiSearch, FiX } from 'react-icons/fi';

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [selectedPackaging, setSelectedPackaging] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesHindi = product.hindiName.includes(query);
        const matchesDesc = product.shortDesc.toLowerCase().includes(query);
        if (!matchesName && !matchesHindi && !matchesDesc) return false;
      }
      // Packaging filter
      if (selectedPackaging !== 'all') {
        const hasPackaging = product.volumes.some((v) =>
          v.packaging.toLowerCase().includes(selectedPackaging.toLowerCase())
        );
        if (!hasPackaging) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy, selectedPackaging]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#031d15] via-[#062e22] to-[#083a2b] text-white p-8 sm:p-10 shadow-xl border border-emerald-700/50">
        <div className="max-w-2xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
            Ramesh Kolhu Wale • Pure Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
            100% Pure Wood-Pressed Oils &amp; Vedic Bilona Ghee
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Extracted live before your eyes at &lt;38°C in Delhi NCR. Select your preferred bottle size, tin canister, or gifting combo.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search mustard, ghee, badam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700 text-stone-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="text-xs font-semibold text-stone-500 whitespace-nowrap">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-semibold text-stone-800 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="featured">Featured &amp; Best Sellers</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (★ 5.0)</option>
            </select>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-emerald-800 text-amber-200 shadow-sm border border-emerald-700'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            Showing {filteredProducts.length} Pure Products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-3">
            <p className="text-lg font-bold text-stone-800">No products match your criteria</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting your search terms or clearing category filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSelectedPackaging('all');
              }}
              className="px-5 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-stone-500">Loading catalog...</div>}>
      <ShopContent />
    </Suspense>
  );
}
