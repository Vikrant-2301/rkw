'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowRight, FiTag } from 'react-icons/fi';

export const CartDrawer: React.FC = () => {
  const {
    cart, isCartOpen, setIsCartOpen,
    removeFromCart, updateQuantity,
    subtotal, discount, couponCode,
    applyCoupon, shippingFee, total,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponStatus, setCouponStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponStatus(res);
  };

  const freeShippingThreshold = 799;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F3] shadow-2xl flex flex-col animate-slideIn">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E0D0] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FiShoppingBag className="w-5 h-5 text-[#0E2A47]" />
              <h2 className="text-base font-semibold text-[#1C1A16]">Your Basket</h2>
              <span className="text-xs px-2 py-0.5 bg-[#EBF2F8] text-[#0E2A47] rounded-full font-semibold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#8A7E6E] hover:text-[#1C1A16] transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping progress */}
          <div className="px-6 py-3 bg-[#F2EEE5] border-b border-[#E8E0D0]">
            <div className="flex items-center justify-between text-xs text-[#5A5248] mb-2 font-medium">
              {amountNeeded > 0 ? (
                <span>Add <strong className="text-[#0E2A47]">₹{amountNeeded}</strong> for free Delhi NCR delivery <span className="text-[10px] text-[#8A7E6E]">(₹100 under ₹799)</span></span>
              ) : (
                <span className="text-[#0E2A47] font-semibold">Free Delhi NCR delivery unlocked!</span>
              )}
              <span className="text-[#8A7E6E]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#E8E0D0] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0E2A47] h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#E8E0D0]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-5">
                <div className="w-16 h-16 bg-[#EBF2F8] rounded-full flex items-center justify-center">
                  <FiShoppingBag className="w-7 h-7 text-[#0E2A47]" />
                </div>
                <div>
                  <p className="font-semibold text-[#1C1A16] text-sm">Your basket is empty</p>
                  <p className="text-xs text-[#8A7E6E] mt-1 font-light">Discover our pure, cold-pressed collection</p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-[#0E2A47] text-white rounded-full text-sm font-semibold hover:bg-[#163A60] transition-colors shadow-sm"
                >
                  Shop Now
                </Link>
              </div>
            ) : (
              cart.map(item => (
                <div key={`${item.product.id}-${item.selectedVolume.size}`} className="py-4 flex gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#EBF2F8] flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-[#1C1A16] leading-snug line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-[#8A7E6E] mt-0.5">{item.selectedVolume.size} · {item.selectedVolume.packaging}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVolume.size)}
                        className="p-1 text-[#C0B8A8] hover:text-red-500 transition-colors flex-shrink-0 cursor-pointer"
                        aria-label="Remove"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-[#D0C8B8] rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVolume.size, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-[#5A5248] hover:bg-[#EBF2F8] transition-colors cursor-pointer"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#1C1A16]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVolume.size, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-[#5A5248] hover:bg-[#EBF2F8] transition-colors cursor-pointer"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-[#0E2A47]">
                        ₹{item.selectedVolume.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout footer */}
          {cart.length > 0 && (
            <div className="px-6 py-5 border-t border-[#E8E0D0] bg-[#F2EEE5] space-y-4">
              {/* Coupon */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A09585] w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. RKW10)"
                    value={inputCoupon}
                    onChange={e => setInputCoupon(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16] uppercase font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0E2A47] text-white rounded-lg text-xs font-semibold hover:bg-[#163A60] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {couponStatus && (
                <p className={`text-xs font-medium ${couponStatus.success ? 'text-[#0E2A47]' : 'text-red-600'}`}>
                  {couponStatus.message}
                </p>
              )}

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#5A5248]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1C1A16]">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#0E2A47] font-semibold">
                    <span>Discount ({couponCode})</span>
                    <span>−₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5A5248]">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? 'text-[#0E2A47] font-semibold' : ''}>
                    {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-[#1C1A16] pt-2 border-t border-[#D0C8B8]">
                  <span>Total</span>
                  <span className="font-serif text-base text-[#0E2A47]">₹{total}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0E2A47] hover:bg-[#163A60] text-white font-semibold text-sm rounded-full transition-all shadow-md hover:scale-[1.01]"
              >
                Proceed to Checkout
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
