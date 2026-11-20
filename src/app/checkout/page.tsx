'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import confetti from 'canvas-confetti';
import { 
  FiCheckCircle, 
  FiTruck, 
  FiShoppingBag, 
  FiArrowRight, 
  FiPrinter,
  FiHome,
  FiPhone,
  FiLoader,
  FiShield,
  FiClock
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG } from '@/config/site';

interface FinalOrderSnapshot {
  orderId: string;
  orderDate: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes?: string;
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  items: Array<{
    id: string;
    name: string;
    size: string;
    quantity: number;
    price: number;
  }>;
}

export default function CheckoutPage() {
  const { cart, subtotal, discount, shippingFee, total, clearCart, couponCode } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110034',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedOrder, setCompletedOrder] = useState<FinalOrderSnapshot | null>(null);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || isSubmitting) return;

    // Validate phone number
    const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number so customer care can call you.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const itemsPayload = cart.map(item => ({
      id: item.product.id,
      name: item.product.name,
      size: item.selectedVolume.size,
      quantity: item.quantity,
      price: item.selectedVolume.price,
      image: item.product.image,
    }));

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
          items: itemsPayload,
          subtotal,
          discount,
          shippingFee,
          total,
          couponCode: couponCode || '',
          paymentMethod: 'Pay on Delivery / Call Confirmation',
          notes: formData.notes.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order. Please check details and try again.');
      }

      setCompletedOrder({
        orderId: data.orderId,
        orderDate: data.date,
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        state: formData.state.trim(),
        pincode: formData.pincode.trim(),
        notes: formData.notes.trim(),
        subtotal,
        shippingFee,
        discount,
        total,
        items: itemsPayload,
      });

      try {
        confetti({
          particleCount: 110,
          spread: 75,
          origin: { y: 0.6 },
        });
      } catch {}

      clearCart();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------------------------------------------
  // Screen: Order Placed Successfully
  // ----------------------------------------------------
  if (completedOrder) {
    return (
      <>
        {/* CSS for clean, dedicated thermal/A4 Tax Invoice printing */}
        <style jsx global>{`
          @media print {
            body * {
              visibility: hidden;
            }
            #printable-receipt,
            #printable-receipt * {
              visibility: visible;
            }
            #printable-receipt {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 24px;
              background: #ffffff !important;
              color: #000000 !important;
            }
            .no-print {
              display: none !important;
            }
          }
        `}</style>

        <div className="max-w-3xl mx-auto px-4 py-10 sm:py-16 space-y-8 animate-fadeIn">
          {/* Main Success Card (Web View) */}
          <div className="bg-[#FAF8F3] rounded-3xl p-6 sm:p-12 border border-[#E8E0D0] shadow-sm text-center space-y-6 sm:space-y-8 no-print">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#EBF2F8] text-[#0E2A47] flex items-center justify-center shadow-inner">
              <FiCheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#25D366]" />
            </div>

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF2F8] text-[#0E2A47] text-xs font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                Order Accepted &amp; Queued
              </div>

              <h1 className="text-2xl sm:text-4xl font-serif text-[#1C1A16] font-normal leading-tight">
                Your Order Has Been Accepted!
              </h1>

              {/* Exact confirmation required by user */}
              <div className="bg-[#0E2A47] text-white p-5 rounded-2xl shadow-sm text-left sm:text-center space-y-2">
                <p className="text-base sm:text-lg font-semibold text-[#F5E6B0]">
                  Our customer care will contact you to confirm the order.
                </p>
                <p className="text-xs text-[#CBD5E1] leading-relaxed max-w-lg mx-auto">
                  Our Delhi NCR dispatch desk has received your request. We will call you at <strong className="text-white">{completedOrder.phone}</strong> to confirm your address and preferred payment mode before sending fresh bottles.
                </p>
              </div>
            </div>

            {/* Quick summary snippet */}
            <div className="bg-[#F2EEE5] rounded-2xl p-5 sm:p-6 text-left space-y-3 text-xs sm:text-sm border border-[#E0D8CC]">
              <div className="flex justify-between items-center border-b border-[#E0D8CC] pb-3">
                <span className="text-[#8A7E6E] font-medium">Unique Order ID</span>
                <span className="font-bold text-[#0E2A47] font-mono text-base bg-white px-3 py-1 rounded-md border border-[#D0C8B8]">
                  #{completedOrder.orderId}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#E0D8CC] pb-2.5">
                <span className="text-[#8A7E6E]">Order Date</span>
                <span className="text-[#1C1A16] font-medium">{completedOrder.orderDate}</span>
              </div>
              <div className="flex justify-between border-b border-[#E0D8CC] pb-2.5">
                <span className="text-[#8A7E6E]">Customer Name</span>
                <span className="font-semibold text-[#1C1A16]">{completedOrder.name}</span>
              </div>
              <div className="flex justify-between border-b border-[#E0D8CC] pb-2.5">
                <span className="text-[#8A7E6E]">Delivery Address</span>
                <span className="font-medium text-[#1C1A16] text-right max-w-xs">
                  {completedOrder.address}, {completedOrder.city} - {completedOrder.pincode}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#1C1A16] pt-1">
                <span>Total Amount</span>
                <span className="font-serif font-bold text-[#0E2A47] text-xl">₹{completedOrder.total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                  `Hello Ramesh Kolhu Wale! I have placed order #${completedOrder.orderId} (₹${completedOrder.total}). Please confirm my order.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm transition-transform hover:scale-[1.01] active:scale-[0.99] shadow-sm"
              >
                <FaWhatsapp className="text-lg" />
                <span>Connect on WhatsApp for Instant Updates</span>
              </a>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border-2 border-[#0E2A47] bg-white text-[#0E2A47] hover:bg-[#0E2A47] hover:text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <FiPrinter className="w-4 h-4" />
                  <span>Print Official Tax Receipt</span>
                </button>
                <Link
                  href={`/track`}
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#D0C8B8] bg-white text-[#5A5248] hover:bg-[#EBF2F8] text-xs font-semibold transition-colors"
                >
                  <FiClock className="w-4 h-4" />
                  <span>Track Live Status</span>
                </Link>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#0E2A47] text-white hover:bg-[#163A60] text-xs font-semibold transition-colors"
                >
                  <FiHome className="w-4 h-4" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* DEDICATED OFFICIAL PRINT RECEIPT (Only shown in Print / PDF)*/}
          {/* ========================================================= */}
          <div
            id="printable-receipt"
            className="bg-white p-8 rounded-2xl border-2 border-dashed border-[#0E2A47]/30 text-black max-w-2xl mx-auto space-y-6 shadow-sm"
          >
            {/* Receipt Header */}
            <div className="border-b-2 border-black pb-4 text-center space-y-1">
              <h2 className="text-2xl font-serif font-bold tracking-wider text-[#0E2A47]">
                RAMESH KOLHU WALE
              </h2>
              <p className="text-xs uppercase tracking-widest text-[#B8860B] font-semibold">
                Traditional Kacchi Ghani Pure Oils &amp; Vedic Bilona Ghee · Est. 1981
              </p>
              <p className="text-[11px] text-neutral-600">
                Live Units: Khureji, Ashok Nagar, Maujpur &amp; Karawal Nagar, Delhi NCR
              </p>
              <p className="text-[11px] text-neutral-600 font-medium">
                Helpline: +91 92177 44380 | Email: lpure.farms@gmail.com
              </p>
            </div>

            {/* Receipt Details Bar */}
            <div className="flex justify-between items-start text-xs border-b border-neutral-300 pb-3">
              <div>
                <p className="font-bold text-sm">
                  ORDER INVOICE: <span className="font-mono text-base">#{completedOrder.orderId}</span>
                </p>
                <p className="text-neutral-600">Date: {completedOrder.orderDate}</p>
                <p className="text-neutral-600 font-medium">
                  Payment Mode: <strong>Pay on Confirmation / Delivery</strong>
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block bg-neutral-100 border border-neutral-400 px-2.5 py-1 text-[11px] font-bold uppercase rounded">
                  Status: Accepted
                </span>
              </div>
            </div>

            {/* Customer Bill / Ship To */}
            <div className="text-xs border-b border-neutral-300 pb-3 space-y-1">
              <p className="font-bold uppercase text-[11px] text-neutral-500">Deliver To:</p>
              <p className="font-bold text-sm">{completedOrder.name}</p>
              <p>{completedOrder.address}, {completedOrder.city}, {completedOrder.state} - {completedOrder.pincode}</p>
              <p>Contact Phone: <strong>{completedOrder.phone}</strong> {completedOrder.email && `| Email: ${completedOrder.email}`}</p>
              {completedOrder.notes && <p className="italic text-neutral-600">Note: {completedOrder.notes}</p>}
            </div>

            {/* Itemized Table */}
            <div>
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b-2 border-black font-bold uppercase text-[11px]">
                    <th className="py-2">Item Description</th>
                    <th className="py-2">Pack</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Rate (₹)</th>
                    <th className="py-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {completedOrder.items.map((it, idx) => (
                    <tr key={idx} className="py-2">
                      <td className="py-2 font-medium">{it.name}</td>
                      <td className="py-2 text-neutral-600">{it.size}</td>
                      <td className="py-2 text-center font-bold">{it.quantity}</td>
                      <td className="py-2 text-right">₹{it.price}</td>
                      <td className="py-2 text-right font-bold">₹{it.price * it.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="border-t-2 border-black pt-3 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">₹{completedOrder.subtotal}</span>
              </div>
              {completedOrder.discount > 0 && (
                <div className="flex justify-between font-medium">
                  <span>Discount:</span>
                  <span>−₹{completedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges (Delhi NCR):</span>
                <span>{completedOrder.shippingFee === 0 ? 'FREE HOME DELIVERY' : `₹${completedOrder.shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold border-t border-neutral-400 pt-2 text-[#0E2A47]">
                <span>Total Amount Payable:</span>
                <span className="font-serif text-lg">₹{completedOrder.total}</span>
              </div>
            </div>

            {/* Policies & Signature */}
            <div className="border-t border-dashed border-neutral-300 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-[10px] text-neutral-600">
              <div className="space-y-2 max-w-sm">
                <div>
                  <p className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">Shipping policy:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-neutral-600 text-[9.5px]">
                    <li>Delivery time varies according to the location</li>
                    <li>Free delivery only upto 15 km from our stores; additional charges may apply for other locations</li>
                    <li>Additional cost of ₹100 will be applied for orders below ₹799</li>
                  </ul>
                </div>
                <div>
                  <p className="font-bold text-neutral-800 uppercase tracking-wider text-[10px]">Return and refund policy:</p>
                  <p className="text-neutral-600 text-[9.5px]">
                    Kindly note that all purchases are final and we are unable to offer returns or exchanges.
                  </p>
                </div>
              </div>
              <div className="text-right sm:text-right shrink-0">
                <div className="w-28 border-b border-black mb-1 ml-auto"></div>
                <p className="font-bold uppercase text-[9px] text-neutral-800">Authorized Dispatch Desk</p>
                <p className="text-[9px]">Ramesh Kolhu Wale, Delhi</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ----------------------------------------------------
  // Screen: Empty Basket
  // ----------------------------------------------------
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-28 text-center space-y-5">
        <div className="w-16 h-16 rounded-full bg-[#EBF2F8] text-[#0E2A47] flex items-center justify-center mx-auto">
          <FiShoppingBag className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-serif text-[#1C1A16] font-normal">Your Basket is Empty</h1>
        <p className="text-sm text-[#8A7E6E] max-w-sm mx-auto">
          Add pure cold-pressed oils or Vedic Bilona ghee to your basket before checkout.
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

  // ----------------------------------------------------
  // Screen: Streamlined Checkout Form (No Payment Method)
  // ----------------------------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 sm:space-y-10">
      <div>
        <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-1.5 font-semibold">Fast Checkout</p>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#1C1A16] font-normal">
          Complete Your Order
        </h1>
        <p className="text-xs sm:text-sm text-[#706456] mt-1">
          Zero advance payment needed. Enter delivery details and our team will call to confirm before dispatch.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          <strong>Order Error:</strong> {errorMessage}
        </div>
      )}

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
        {/* Left: Customer & Delivery Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#FAF8F3] p-5 sm:p-7 rounded-2xl border border-[#E8E0D0] space-y-4 sm:space-y-5 shadow-xs">
            <h3 className="font-serif text-lg text-[#0E2A47] font-semibold flex items-center gap-2.5">
              <FiTruck className="text-[#0E2A47]" />
              <span>Customer &amp; Delivery Destination</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
              <div>
                <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
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
                <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">
                  Mobile Number (Calling &amp; WhatsApp) <span className="text-red-500">*</span>
                </label>
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
              <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">
                Email Address (for order receipt &amp; dispatch updates)
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16]"
              />
            </div>

            <div className="text-xs">
              <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">
                Delivery Address <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={2}
                required
                placeholder="House / Flat No., Floor, Apartment / Society, Street, Landmark"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
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

            <div className="text-xs">
              <label className="block text-[#5A5248] font-medium uppercase tracking-wider mb-1.5">
                Special Delivery Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Call before arrival, leave at security"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D0C8B8] bg-white focus:outline-none focus:border-[#0E2A47] text-[#1C1A16]"
              />
            </div>
          </div>

          {/* Reassuring Zero-Advance Trust Box (Replaces Payment Method Selector) */}
          <div className="bg-[#EBF2F8] p-4 sm:p-5 rounded-2xl border border-[#163A60]/15 flex items-start gap-3.5">
            <FiShield className="w-5 h-5 text-[#0E2A47] shrink-0 mt-0.5" />
            <div className="text-xs text-[#0E2A47] space-y-1">
              <p className="font-bold text-sm">Zero Advance Payment Required</p>
              <p className="text-[#4A4035] leading-relaxed">
                You do not need to pay anything right now. Our customer care will call you to confirm your address, freshly press your bottles, and you can pay conveniently via UPI QR code or Cash on Delivery when our delivery partner arrives.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#F2EEE5] p-5 sm:p-7 rounded-2xl border border-[#E8E0D0] space-y-4 sm:space-y-5 shadow-sm">
            <h3 className="font-serif text-lg text-[#1C1A16] font-semibold flex items-center justify-between">
              <span>Order Summary</span>
              <span className="text-xs font-sans font-normal text-[#8A7E6E]">{cart.length} item{cart.length > 1 ? 's' : ''}</span>
            </h3>

            <div className="divide-y divide-[#E0D8CC] max-h-72 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedVolume.size}`} className="py-3 flex gap-3.5 items-center">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0 border border-[#E0D8CC]">
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
                  {shippingFee === 0 ? 'Free Home Delivery' : `₹${shippingFee}`}
                </span>
              </div>
              <p className="text-[11px] text-[#8A7E6E] -mt-1">
                {subtotal >= 799
                  ? '✓ Free Delhi NCR delivery applied (>₹799)'
                  : '₹100 delivery fee on orders below ₹799'}
              </p>
              <div className="flex justify-between text-base font-bold text-[#1C1A16] pt-3 border-t border-[#E0D8CC]">
                <span>Total Payable</span>
                <span className="font-serif text-[#0E2A47] text-xl">₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-white font-semibold text-sm rounded-full transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                isSubmitting
                  ? 'bg-[#0E2A47]/70 cursor-not-allowed'
                  : 'bg-[#0E2A47] hover:bg-[#163A60] hover:scale-[1.01] active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="w-4 h-4 animate-spin" />
                  <span>Submitting Order...</span>
                </>
              ) : (
                <>
                  <span>Confirm &amp; Place Order (₹{total})</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <p className="text-[11px] text-[#8A7E6E] flex items-center justify-center gap-1.5">
                <FiPhone className="text-[#0E2A47]" />
                Customer care confirms each order before dispatch
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
