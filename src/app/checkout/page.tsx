'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import confetti from 'canvas-confetti';
import { 
  FiCheckCircle, 
  FiTruck, 
  FiShield, 
  FiShoppingBag, 
  FiArrowRight, 
  FiPhone, 
  FiCreditCard, 
  FiPrinter,
  FiHome 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function CheckoutPage() {
  const { cart, subtotal, discount, shippingFee, total, clearCart } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110034',
    deliveryType: 'standard',
    paymentMethod: 'upi',
  });

  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderDate, setOrderDate] = useState('');

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Generate random order ID
    const newOrderId = `RKW-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    setOrderId(newOrderId);
    setOrderDate(now);
    setIsOrdered(true);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}

    clearCart();
  };

  // If order was placed, show confirmation receipt
  if (isOrdered) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-fadeIn">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-inner">
            <FiCheckCircle className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-900 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
              Order Confirmed &amp; In Production
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 font-serif">
              Thank You for Trusting Ramesh Kolhu Wale!
            </h1>
            <p className="text-sm sm:text-base text-stone-600">
              Your order <strong>#{orderId}</strong> has been received by our Delhi NCR workshop. Our masters are cold-pressing and packing your fresh bottles.
            </p>
          </div>

          {/* Receipt Summary Card */}
          <div className="bg-emerald-50/40 rounded-2xl p-6 border border-emerald-200 text-left space-y-4 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-emerald-100 pb-3">
              <span className="text-stone-500 font-semibold">Order Number:</span>
              <span className="font-extrabold text-stone-900 font-mono text-base">{orderId}</span>
            </div>
            <div className="flex justify-between border-b border-emerald-100 pb-3">
              <span className="text-stone-500 font-semibold">Order Date:</span>
              <span className="font-semibold text-stone-800">{orderDate}</span>
            </div>
            <div className="flex justify-between border-b border-emerald-100 pb-3">
              <span className="text-stone-500 font-semibold">Shipping To:</span>
              <span className="font-bold text-stone-900 text-right">
                {formData.name}, {formData.address}, {formData.city}, {formData.pincode}
              </span>
            </div>
            <div className="flex justify-between border-b border-emerald-100 pb-3">
              <span className="text-stone-500 font-semibold">Payment Mode:</span>
              <span className="font-bold uppercase text-emerald-900">
                {formData.paymentMethod === 'upi'
                  ? 'UPI / QR Payment'
                  : formData.paymentMethod === 'cod'
                  ? 'Cash on Delivery (COD)'
                  : 'Card / Net Banking'}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-stone-900 pt-1">
              <span>Total Amount:</span>
              <span className="text-emerald-950 font-serif">₹{total}</span>
            </div>
          </div>

          {/* WhatsApp Confirmation CTA */}
          <div className="space-y-3">
            <a
              href={`https://wa.me/919811254321?text=Hello%20Ramesh%20Kolhu%20Wale,%20I%20have%20placed%20order%20%23${orderId}.%20Please%20send%20tracking%20updates.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-sm shadow-md transition-all"
            >
              <FaWhatsapp className="text-lg" />
              <span>Get WhatsApp Tracking Updates</span>
            </a>

            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-bold"
              >
                <FiPrinter /> Print Receipt
              </button>
              <Link
                href="/"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 text-white hover:bg-emerald-900 text-xs font-bold"
              >
                <FiHome /> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If basket is empty
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto">
          <FiShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-stone-900 font-serif">Your Pure Basket is Empty</h1>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
          You need at least one pure cold-pressed oil or bilona ghee product to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-800 text-white rounded-xl text-xs font-bold"
        >
          <span>Explore Catalog</span>
          <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif">
          Complete Your Order
        </h1>
        <p className="text-xs text-stone-500 mt-0.5">
          Fast &amp; secure delivery from Ramesh Kolhu Wale central workshops.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery Details & Payment */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Address */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 font-serif">
              <FiTruck className="text-emerald-800" />
              <span>1. Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-stone-700 font-bold uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold uppercase mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98112 54321"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-stone-700 font-bold uppercase mb-1">Email Address</label>
              <input
                type="email"
                placeholder="name@gmail.com (for invoice receipt)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800"
              />
            </div>

            <div className="text-xs">
              <label className="block text-stone-700 font-bold uppercase mb-1">Full Street Address</label>
              <textarea
                rows={2}
                required
                placeholder="House/Flat No., Building Name, Street, Landmark"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 text-stone-800"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-stone-700 font-bold uppercase mb-1">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-800"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-bold uppercase mb-1">State</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-800"
                />
              </div>
              <div>
                <label className="block text-stone-700 font-bold uppercase mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-stone-800"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-stone-900 flex items-center gap-2 font-serif">
              <FiCreditCard className="text-emerald-800" />
              <span>2. Payment Option</span>
            </h3>

            <div className="space-y-2 text-xs">
              <label
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'upi'
                    ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600 font-bold text-stone-900'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                  className="accent-emerald-700"
                />
                <div className="flex-1 flex items-center justify-between">
                  <span>Instant UPI (GooglePay / PhonePe / Paytm / QR)</span>
                  <span className="text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold">
                    Fastest
                  </span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600 font-bold text-stone-900'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                  className="accent-emerald-700"
                />
                <div className="flex-1 flex items-center justify-between">
                  <span>Cash on Delivery (Pay when oil arrives)</span>
                  <span className="text-[10px] text-stone-400 font-semibold">Delhi NCR only</span>
                </div>
              </label>

              <label
                className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600 font-bold text-stone-900'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'card'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                  className="accent-emerald-700"
                />
                <div className="flex-1">
                  <span>Credit / Debit Card &amp; Net Banking</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-md space-y-5">
          <h3 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-200 font-serif">
            Order Items ({cart.reduce((sum, i) => sum + i.quantity, 0)})
          </h3>

          <div className="max-h-60 overflow-y-auto divide-y divide-stone-100 pr-1">
            {cart.map((item) => (
              <div key={`${item.product.id}-${item.selectedVolume.size}`} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 relative rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                    <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-bold text-stone-900 truncate">{item.product.name}</h5>
                    <span className="text-stone-400 text-[11px]">
                      {item.selectedVolume.size} × {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-extrabold text-stone-900 flex-shrink-0">
                  ₹{item.selectedVolume.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-stone-900">₹{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-800 font-bold">
                <span>Discount Applied</span>
                <span>-₹{discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delhi NCR Shipping</span>
              <span className="font-bold text-stone-900">
                {shippingFee === 0 ? <span className="text-emerald-800">FREE</span> : `₹${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-stone-900 pt-2 border-t border-stone-200">
              <span>Total Payable</span>
              <span className="text-xl text-emerald-950 font-serif">₹{total}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-emerald-900 hover:from-emerald-900 hover:to-emerald-950 text-amber-200 hover:text-white font-black text-sm tracking-wider uppercase transition-all shadow-lg cursor-pointer"
          >
            Confirm &amp; Place Order
          </button>

          <div className="flex items-center justify-center gap-3 text-[11px] text-stone-400 pt-1">
            <span className="flex items-center gap-1">
              <FiShield className="text-emerald-800" /> 100% Purity Guarantee
            </span>
            <span>•</span>
            <span>Same-Day Workshop Bottling</span>
          </div>
        </div>
      </form>
    </div>
  );
}
