'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { 
  FiX, 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiShoppingBag, 
  FiArrowRight, 
  FiShield, 
  FiTruck, 
  FiTag 
} from 'react-icons/fi';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    shippingFee,
    total,
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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slideIn">
          {/* Header */}
          <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-emerald-50/70">
            <div className="flex items-center gap-2">
              <FiShoppingBag className="w-5 h-5 text-emerald-800" />
              <h2 className="text-lg font-bold text-stone-900 font-serif">Your Pure Basket</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-950 font-bold">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-emerald-100 text-stone-500 transition-colors"
              aria-label="Close cart"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-amber-50/80 px-5 py-3 border-b border-amber-200/60">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
              <span className="flex items-center gap-1.5">
                <FiTruck className="text-emerald-700 w-4 h-4" />
                {amountNeeded > 0 ? (
                  <span>
                    Add <strong className="text-emerald-800">₹{amountNeeded}</strong> more for{' '}
                    <strong>FREE Delhi NCR Delivery</strong>
                  </span>
                ) : (
                  <span className="text-emerald-800 font-bold">
                    🎉 You unlocked FREE Delhi NCR Express Delivery!
                  </span>
                )}
              </span>
              <span className="text-[11px] font-bold text-emerald-800">{progressPercent}%</span>
            </div>
            <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-600 to-amber-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <FiShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-800">Your basket is empty</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Explore Ramesh Kolhu Wale authentic cold-pressed oils and clay-pot Vedic Bilona ghee.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition-colors shadow-sm"
                >
                  Explore Pure Oils &amp; Ghee
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedVolume.size}`} className="py-4 flex gap-3.5 items-start">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-200">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-sm font-bold text-stone-900 leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedVolume.size)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-900 border border-emerald-200">
                        {item.selectedVolume.size}
                      </span>
                      <span className="text-[11px] text-stone-400 line-clamp-1">
                        {item.selectedVolume.packaging}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-stone-50">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVolume.size, item.quantity - 1)}
                          className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedVolume.size, item.quantity + 1)}
                          className="px-2.5 py-1 text-stone-600 hover:bg-stone-200 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line Item Price */}
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-stone-900">
                          ₹{item.selectedVolume.price * item.quantity}
                        </span>
                        <span className="text-[10px] text-stone-400 block">
                          ₹{item.selectedVolume.price} each
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. RKW10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 uppercase font-semibold text-stone-800 bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponStatus && (
                <p
                  className={`text-xs font-semibold ${
                    couponStatus.success ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {couponStatus.message}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-800">₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({couponCode})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delhi NCR Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total Payable</span>
                  <span className="text-base text-emerald-950 font-serif">₹{total}</span>
                </div>
              </div>

              {/* Primary Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-amber-200 hover:text-white font-black text-sm tracking-wide shadow-lg transition-all"
              >
                <span>Proceed to Secure Checkout</span>
                <FiArrowRight className="w-4 h-4 text-amber-300" />
              </Link>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <FiShield className="text-emerald-700" /> 100% Purity Assured
                </span>
                <span>•</span>
                <span>UPI / Cash on Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
