'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { FiShoppingBag, FiCheck } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const defaultVolume = product.volumes[0];
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
      <div className="relative aspect-square overflow-hidden rounded-xl bg-[#EDE8DF] mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discountPercent > 0 && (
          <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#1C3829] text-white text-xs font-medium rounded-full">
            {discountPercent}% off
          </span>
        )}
        {/* Quick add overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              added
                ? 'bg-[#1C3829] text-white'
                : 'bg-white/95 text-[#1C1A16] hover:bg-[#1C3829] hover:text-white'
            }`}
          >
            {added ? (
              <><FiCheck className="w-4 h-4" /> Added</>
            ) : (
              <><FiShoppingBag className="w-4 h-4" /> Add to basket</>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-1 px-1">
        <p className="text-xs text-[#8A7E6E] uppercase tracking-widest">
          {product.category === 'bilona-ghee' ? 'Bilona Ghee' :
           product.category === 'mustard-oils' ? 'Mustard Oil' : 'Wood-Pressed Oil'}
        </p>
        <h3 className="text-sm font-medium text-[#1C1A16] leading-snug group-hover:text-[#1C3829] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-semibold text-[#1C1A16]">₹{defaultVolume.price}</span>
          {defaultVolume.originalPrice > defaultVolume.price && (
            <span className="text-xs text-[#A09585] line-through">₹{defaultVolume.originalPrice}</span>
          )}
          <span className="text-xs text-[#8A7E6E] ml-auto">{defaultVolume.size}</span>
        </div>
      </div>
    </Link>
  );
};
