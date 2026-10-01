'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product, ProductVolume } from '@/types';
import { useCart } from '@/context/CartContext';
import { FiStar, FiShoppingBag, FiCheck, FiArrowRight } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedVolume, setSelectedVolume] = useState<ProductVolume>(product.volumes[0]);
  const [justAdded, setJustAdded] = useState(false);

  const discountPercent = Math.round(
    ((selectedVolume.originalPrice - selectedVolume.price) / selectedVolume.originalPrice) * 100
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, selectedVolume, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-stone-200/80 hover:border-emerald-500/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Badges on Top */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#062e22] text-amber-300 shadow-md border border-amber-400/40">
          {product.category === 'bilona-ghee' ? 'Vedic Bilona' : 'Wood-Pressed Ghani'}
        </span>
        {discountPercent > 0 && (
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-600 text-white shadow-sm border border-amber-500/40">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Product Image Link */}
      <Link
        href={`/product/${product.slug}`}
        className="relative aspect-square w-full bg-stone-100/70 overflow-hidden block"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-amber-200 text-xs font-semibold flex items-center gap-1">
            View Details <FiArrowRight className="w-3 h-3 text-amber-400" />
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-500'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-stone-800">{product.rating}</span>
            <span className="text-[11px] text-stone-400">({product.reviewsCount})</span>
          </div>

          {/* Title & Hindi Name */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-emerald-800 transition-colors">
            <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-1">
              {product.name}
            </h3>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5 line-clamp-1 font-sans">
              {product.hindiName}
            </p>
          </Link>

          {/* Short Description */}
          <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100">
          {/* Size / Volume Selector */}
          <div className="mb-3">
            <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
              Select Size &amp; Packaging:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.volumes.map((vol) => (
                <button
                  key={vol.size}
                  type="button"
                  onClick={() => setSelectedVolume(vol)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedVolume.size === vol.size
                      ? 'bg-emerald-50 text-emerald-900 border-2 border-emerald-600 shadow-2xs font-bold'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-transparent'
                  }`}
                >
                  {vol.size}
                </button>
              ))}
            </div>
          </div>

          {/* Price & Add to Cart */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-stone-900">
                  ₹{selectedVolume.price}
                </span>
                {selectedVolume.originalPrice > selectedVolume.price && (
                  <span className="text-xs text-stone-400 line-through">
                    ₹{selectedVolume.originalPrice}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-400 block">
                {selectedVolume.packaging}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                justAdded
                  ? 'bg-amber-600 text-white'
                  : 'bg-emerald-800 hover:bg-emerald-900 text-amber-100 hover:text-white hover:shadow-md border border-emerald-700/50'
              }`}
              aria-label={`Add ${product.name} to basket`}
            >
              {justAdded ? (
                <>
                  <FiCheck className="w-4 h-4 text-white" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <FiShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
