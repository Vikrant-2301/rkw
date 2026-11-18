'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { FiShoppingBag, FiCheck } from 'react-icons/fi';

interface ProductCardProps { product: Product; }

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const defaultVolume = product.volumes[0];
  const discountPercent = defaultVolume.originalPrice > defaultVolume.price
    ? Math.round(((defaultVolume.originalPrice - defaultVolume.price) / defaultVolume.originalPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addToCart(product, defaultVolume, 1); setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link href={`/product/${product.slug}`} className="rkw-product-card group block">
      <div className="rkw-product-visual relative mb-5 aspect-[4/5] overflow-hidden bg-[#EAE2D3]">
        <Image src={product.showcaseImage || product.image} alt={product.name} fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]" />
        <span className="absolute left-4 top-4 bg-[#F5F1E8] px-3 py-2 text-[9px] font-bold uppercase tracking-[.14em] text-[#173C31]">
          {product.bestSeller ? 'RKW favourite' : product.category === 'bilona-ghee' ? 'Bilona ghee' : 'Cold pressed'}
        </span>
        {discountPercent > 0 && <span className="absolute right-4 top-4 bg-[#B66B3D] px-2.5 py-2 text-[9px] font-bold text-white">{discountPercent}% OFF</span>}
        <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0 group-focus-within:translate-y-0">
          <button onClick={handleAddToCart} className={`flex w-full items-center justify-center gap-2 py-4 text-[10px] font-bold uppercase tracking-[.16em] shadow-lg transition ${added ? 'bg-[#173C31] text-white' : 'bg-[#F5F1E8] text-[#173C31] hover:bg-[#B66B3D] hover:text-white'}`}>
            {added ? <><FiCheck/> Added to basket</> : <><FiShoppingBag/> Add to basket</>}
          </button>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#B66B3D]">{product.category === 'bilona-ghee' ? 'Ghee collection' : 'Oil collection'}</p>
          <h3 className="font-serif text-[21px] leading-tight text-[#202A22] transition-colors group-hover:text-[#B66B3D]">{product.name}</h3>
          <p className="mt-2 text-[10px] text-[#817767]">{defaultVolume.size}</p>
        </div>
        <div className="shrink-0 pt-5 text-right">
          <p className="text-sm font-bold text-[#173C31]">₹{defaultVolume.price}</p>
          {defaultVolume.originalPrice > defaultVolume.price && <p className="mt-1 text-[10px] text-[#A69B8B] line-through">₹{defaultVolume.originalPrice}</p>}
        </div>
      </div>
    </Link>
  );
};
