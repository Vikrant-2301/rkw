'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { 
  FiCheckCircle, 
  FiTruck, 
  FiShoppingBag, 
  FiArrowRight, 
  FiPrinter,
  FiHome 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG } from '@/config/site';

export default function CheckoutPage() {
  const { cart, subtotal, discount, shippingFee, total } = useCart();

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

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const lines = cart.map(item =>
      `• ${item.product.name} — ${item.selectedVolume.size} × ${item.quantity} = ₹${item.selectedVolume.price * item.quantity}`
    ).join('\n');
    const message = [
      'Hello Ramesh Kolhu Wale, I would like to place an order:',
      '',
      lines,
      '',
      `Subtotal: ₹${subtotal}`,
      discount > 0 ? `Discount: -₹${discount}` : '',
      `Delivery: ${shippingFee === 0 ? 'Free' : `₹${shippingFee}`}`,
      `Estimated total: ₹${total}`,
      '',
      'DELIVERY DETAILS',
      `Name: ${formData.name}`,
      `Phone: ${formData.phone}`,
      `Email: ${formData.email || 'Not provided'}`,
      `Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      `Payment preference: ${formData.paymentMethod === 'upi' ? 'UPI / QR' : 'Cash on Delivery'}`,
      '',
      'Please confirm product availability, delivery and payment instructions.'
    ].filter(Boolean).join('\n');

    const url = `https://wa.me/91${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-28 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#EBF2F8] text-[#0E2A47] flex items-center justify-center mx-auto">
          <FiShoppingBag className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-serif text-[#1C1A16] font-normal">Your Basket is Empty</h1>
        <p className="text-sm text-[#8A7E6E] max-w-sm mx-auto">
          Add cold-pressed oils or Vedic Bilona ghee to your basket before checkout.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0E2A47] text-white rounded-full text-sm font-semibold hover:bg-[#163A60] transition-colors shadow-sm"
        >
          <span>Explore Collection</span>
          <FiArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div>
        <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-2 font-semibold">Checkout</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal">
          Complete Your Order
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Address */}
          <div className="bg-[#FAF8F3] p-7 rounded-2xl border border-[#E8E0D0] space-y-5 shadow-xs">
            <h3 className="font-serif text-lg text-[#0E2A47] font-semibold flex items-center gap-2.5">
              <FiTruck className="text-[#0E2A47]" />
              <span>1. Delivery Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16]"
                />
              </div>
              <div>
                <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98112 54321"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16]"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com (for order receipt)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16]"
              />
            </div>

            <div className="text-xs">
              <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">Street Address</label>
              <textarea
                rows={2}
                required
                placeholder="Flat / House No., Building, Street, Landmark"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">City</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16]"
                />
              </div>
              <div>
                <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">State</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16]"
                />
              </div>
              <div>
                <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">PIN Code</label>
                <input
                  type="text"
                  required
                  value={formData.pincode}
                  onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16]"
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-[#FAF8F3] p-7 rounded-2xl border border-[#E8E0D0] space-y-4 shadow-xs">
            <h3 className="font-serif text-lg text-[#0E2A47] font-semibold">2. Payment preference</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                { id: 'upi', label: 'UPI / QR', desc: 'Payment details confirmed by our team' },
                { id: 'cod', label: 'Cash on Delivery', desc: 'Subject to order confirmation' },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`p-4 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                    formData.paymentMethod === method.id
                      ? 'border-[#0E2A47] bg-[#EBF2F8]'
                      : 'border-[#E8E0D0] bg-white hover:border-[#D0C8B8]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={formData.paymentMethod === method.id}
                      onChange={() => setFormData({ ...formData, paymentMethod: method.id })}
                      className="text-[#0E2A47] focus:ring-[#0E2A47]"
                    />
                    <span className="font-semibold text-[#1C1A16] text-xs">{method.label}</span>
                  </div>
                  <span className="text-[11px] text-[#8A7E6E] mt-2 block pl-5">{method.desc}</span>
                </label>
              ))}
            </div>
            <p className="border-t border-[#D9D0C0] pt-4 text-xs leading-6 text-[#817767]">Your order details will open in WhatsApp. Our team will confirm availability, delivery and payment instructions with you before the order is finalised. No payment is collected on this page.</p>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F2EEE5] p-7 rounded-2xl border border-[#E8E0D0] space-y-5 shadow-sm">
            <h3 className="font-serif text-lg text-[#1C1A16] font-semibold">Order Summary</h3>

            <div className="divide-y divide-[#E0D8CC] max-h-72 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedVolume.size}`} className="py-3 flex gap-3.5 items-center">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#1C1A16] truncate">{item.product.name}</p>
                    <p className="text-[11px] text-[#8A7E6E]">{item.selectedVolume.size} × {item.quantity}</p>
                  </div>
                  <span className="text-xs font-bold text-[#0E2A47]">
                    ₹{item.selectedVolume.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-3 border-t border-[#E0D8CC]">
              <div className="flex justify-between text-[#5A5248]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#1C1A16]">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#0E2A47] font-semibold">
                  <span>Discount</span>
                  <span>−₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#5A5248]">
                <span>Shipping (Delhi NCR)</span>
                <span className={shippingFee === 0 ? 'text-[#0E2A47] font-semibold' : ''}>
                  {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
                </span>
              </div>
              <p className="text-[11px] text-[#8A7E6E] -mt-1">
                {subtotal >= 799
                  ? 'Free Delhi NCR home delivery applied'
                  : '₹100 delivery fee on orders below ₹799'}
              </p>
              <div className="flex justify-between text-base font-bold text-[#1C1A16] pt-3 border-t border-[#E0D8CC]">
                <span>Total</span>
                <span className="font-serif text-[#0E2A47]">₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#0E2A47] hover:bg-[#163A60] text-white font-semibold text-sm rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
            >
              <span>Continue to WhatsApp · ₹{total}</span>
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
