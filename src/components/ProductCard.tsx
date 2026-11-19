'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useLiveProducts } from '@/hooks/useLiveProducts';
import { useCart } from '@/context/CartContext';
import { FiShoppingBag, FiCheck, FiPlus, FiSlash } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product: initialProduct }) => {
  const { products: liveProducts } = useLiveProducts();
  const product = liveProducts.find((p) => p.id === initialProduct.id) || initialProduct;

  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  // Check if entire product is out of stock or all volumes are out of stock
  const allVolumesOutOfStock =
    Array.isArray(product.volumes) &&
    product.volumes.length > 0 &&
    product.volumes.every((v) => v.inStock === false);

  const isOutOfStock = product.inStock === false || allVolumesOutOfStock;

  // Prefer first available in-stock volume, else 1L, else first volume
  const inStockVolume = product.volumes.find((v) => v.inStock !== false);
  const defaultVolume =
    (inStockVolume?.size.startsWith('1L') ? inStockVolume : null) ||
    product.volumes.find((v) => v.size.startsWith('1L') && v.inStock !== false) ||
    inStockVolume ||
    product.volumes[0];

  const isVolumeOutOfStock = isOutOfStock || defaultVolume?.inStock === false;

  const discountPercent =
    defaultVolume && defaultVolume.originalPrice > defaultVolume.price
      ? Math.round(((defaultVolume.originalPrice - defaultVolume.price) / defaultVolume.originalPrice) * 100)
      : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isVolumeOutOfStock) return;
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
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            isOutOfStock ? 'opacity-70 grayscale-[25%]' : ''
          }`}
        />

        {/* Status badges */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 flex flex-col gap-1 items-start z-10 pointer-events-none max-w-[85%]">
          {isOutOfStock ? (
            <span className="px-2.5 py-0.5 sm:py-1 bg-red-600 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
              Out of stock
            </span>
          ) : (
            <>
              {product.isSpecialOffer && product.specialOffer && (
                <span className="px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-md flex items-center gap-1 uppercase tracking-tight animate-pulse">
                  <span>⚡</span> {product.specialOffer}
                </span>
              )}
              {product.bestSeller && (
                <span className="px-2.5 py-0.5 sm:py-1 bg-[#F2B705] text-[#0E2A47] text-[10px] sm:text-xs font-bold rounded-full shadow-sm flex items-center gap-1 uppercase tracking-tight border border-[#D9A304]">
                  <span>🔥</span> Most Selling
                </span>
              )}
              {discountPercent > 0 && !product.isSpecialOffer && (
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#0E2A47] text-white text-[10px] sm:text-xs font-semibold rounded-full shadow-sm">
                  {discountPercent}% off
                </span>
              )}
            </>
          )}
        </div>

        {/* Mobile Quick Add Floating Button */}
        {!isOutOfStock && (
          <button
            onClick={handleAddToCart}
            disabled={isVolumeOutOfStock}
            className={`sm:hidden absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0E2A47] text-[#F5E6B0] hover:bg-[#163A60]'
            }`}
            aria-label={`Add ${product.name} to basket`}
          >
            {added ? <FiCheck className="w-4 h-4" /> : <FiPlus className="w-4 h-4" />}
          </button>
        )}

        {/* Desktop Quick add overlay */}
        <div className="hidden sm:block absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {isOutOfStock ? (
            <div className="w-full py-2.5 rounded-lg text-xs font-semibold bg-red-950/80 backdrop-blur text-red-200 border border-red-500/40 text-center shadow-md flex items-center justify-center gap-1.5">
              <FiSlash className="w-3.5 h-3.5" />
              <span>Currently Out of Stock</span>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={isVolumeOutOfStock}
              className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                added
                  ? 'bg-[#0E2A47] text-white'
                  : 'bg-white/95 text-[#1C1A16] hover:bg-[#0E2A47] hover:text-white'
              }`}
            >
              {added ? (
                <>
                  <FiCheck className="w-4 h-4 text-emerald-400" /> Added
                </>
              ) : (
                <>
                  <FiShoppingBag className="w-4 h-4" /> Add to basket
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-1 px-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] sm:text-xs text-[#8A7E6E] uppercase tracking-widest font-medium truncate">
            {product.category === 'bilona-ghee' ? 'Vedic Bilona Ghee' : 'Cold-Pressed Oil'}
          </p>
          {isOutOfStock ? (
            <span className="text-[10px] font-bold text-red-600">Out of Stock</span>
          ) : product.bestSeller ? (
            <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              🔥 Best Seller
            </span>
          ) : defaultVolume ? (
            <span className="text-[10px] sm:text-xs text-[#8A7E6E] ml-auto shrink-0">{defaultVolume.size}</span>
          ) : null}
        </div>
        <h3 className="text-xs sm:text-sm font-semibold text-[#1C1A16] leading-snug line-clamp-2 group-hover:text-[#0E2A47] transition-colors">
          {product.name}
        </h3>
        {defaultVolume && (
          <div className="flex items-baseline gap-1.5 sm:gap-2 pt-0.5 flex-wrap">
            <span className="text-xs sm:text-sm font-bold text-[#0E2A47]">₹{defaultVolume.price}</span>
            {defaultVolume.originalPrice > defaultVolume.price && (
              <span className="text-[10px] sm:text-xs text-[#A09585] line-through">₹{defaultVolume.originalPrice}</span>
            )}
            {!isOutOfStock && defaultVolume.inStock === false && (
              <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                {defaultVolume.size} Sold Out
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};
