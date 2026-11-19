'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { FiShoppingBag, FiCheck, FiPlus } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const defaultVolume = product.volumes.find((v) => v.size.startsWith('1L')) || product.volumes[0];
  const discountPercent = defaultVolume.originalPrice > defaultVolume.price
    ? Math.round(((defaultVolume.originalPrice - defaultVolume.price) / defaultVolume.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, defaultVolume, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-xl sm:rounded-2xl bg-[#EBF2F8] mb-3 sm:mb-4 shadow-xs">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discountPercent > 0 && (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#0E2A47] text-white text-[10px] sm:text-xs font-semibold rounded-full shadow-sm">
            {discountPercent}% off
          </span>
        )}

        {/* Mobile Quick Add Floating Button */}
        <button
          onClick={handleAddToCart}
          className={`sm:hidden absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer ${
            added
              ? 'bg-emerald-600 text-white'
              : 'bg-[#0E2A47] text-[#F5E6B0] hover:bg-[#163A60]'
          }`}
          aria-label={`Add ${product.name} to basket`}
        >
          {added ? <FiCheck className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
        </button>

        {/* Desktop Quick add overlay (untouched for laptop/desktop) */}
        <div className="hidden sm:block absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
              added
                ? 'bg-[#0E2A47] text-white'
                : 'bg-white/95 text-[#1C1A16] hover:bg-[#0E2A47] hover:text-white'
            }`}
          >
            {added ? (
              <><FiCheck className="w-4 h-4 text-emerald-400" /> Added</>
            ) : (
              <><FiShoppingBag className="w-4 h-4" /> Add to basket</>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-1 px-1">
        <p className="text-[10px] sm:text-xs text-[#8A7E6E] uppercase tracking-widest font-medium truncate">
          {product.category === 'bilona-ghee' ? 'Vedic Bilona Ghee' : 'Cold-Pressed Oil'}
        </p>
        <h3 className="text-xs sm:text-sm font-semibold text-[#1C1A16] leading-snug line-clamp-2 group-hover:text-[#0E2A47] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-1.5 sm:gap-2 pt-0.5 flex-wrap">
          <span className="text-xs sm:text-sm font-bold text-[#0E2A47]">₹{defaultVolume.price}</span>
          {defaultVolume.originalPrice > defaultVolume.price && (
            <span className="text-[10px] sm:text-xs text-[#A09585] line-through">₹{defaultVolume.originalPrice}</span>
          )}
          <span className="text-[10px] sm:text-xs text-[#8A7E6E] ml-auto">{defaultVolume.size}</span>
        </div>
      </div>
    </Link>
  );
};
