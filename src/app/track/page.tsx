'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FiSearch,
  FiCheckCircle,
  FiTruck,
  FiPackage,
  FiClock,
  FiPhone,
  FiArrowRight,
  FiAlertCircle
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG } from '@/config/site';
import { Loader } from '@/components/ui/loader';

interface OrderData {
  orderId: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: Array<{
    name: string;
    size: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: 'pending_confirmation' | 'confirmed' | 'out_for_delivery' | 'delivered' | 'cancelled';
  dateFormatted?: string;
  createdAt: string;
}

export default function TrackOrderPage() {
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    if (!cleanId) return;

    setLoading(true);
    setNotFound(false);
    setOrder(null);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(cleanId)}`);
      const data = await res.json();
      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending_confirmation':
        return 1;
      case 'confirmed':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  const currentStep = order ? getStatusStep(order.status) : 1;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
          Live Order Tracking
        </p>
        <h1 className="text-3xl sm:text-5xl font-serif text-[#1C1A16] font-normal">
          Track Your RKW Order
        </h1>
        <p className="text-sm text-[#706456] max-w-md mx-auto">
          Enter your unique Order ID (received after placing your order or in your confirmation email).
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleTrack} className="max-w-xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2 bg-[#FAF8F3] p-2 rounded-2xl border border-[#D0C8B8] shadow-sm">
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-3.5 text-[#8A7E6E]" />
            <input
              type="text"
              required
              placeholder="e.g. RKW-20261119-918234"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-transparent text-sm font-mono uppercase tracking-wider text-[#1C1A16] focus:outline-none placeholder:normal-case placeholder:font-sans placeholder:tracking-normal"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#0E2A47] hover:bg-[#163A60] text-[#F5E6B0] font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader size={16} tone="light" />
                <span>Searching...</span>
              </span>
            ) : (
              <span>Track Status</span>
            )}
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Not Found Box */}
      {notFound && (
        <div className="max-w-xl mx-auto bg-amber-50 border border-amber-200 p-5 rounded-2xl text-center space-y-2 animate-fadeIn">
          <FiAlertCircle className="w-6 h-6 text-amber-600 mx-auto" />
          <p className="text-sm font-semibold text-amber-900">Order Not Found</p>
          <p className="text-xs text-amber-700">
            We couldn&apos;t find an order with ID &ldquo;{searchId}&rdquo;. Please verify the order number or contact our customer care via WhatsApp.
          </p>
          <a
            href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
              `Hello RKW, I want to check the status of my order ${searchId}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0E2A47] underline underline-offset-4 pt-1"
          >
            <FaWhatsapp className="text-emerald-600" />
            <span>Ask Customer Care on WhatsApp</span>
          </a>
        </div>
      )}

      {/* Order Status Display */}
      {order && (
        <div className="bg-[#FAF8F3] rounded-3xl p-6 sm:p-10 border border-[#E8E0D0] shadow-sm space-y-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E0D0] pb-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B]">
                Order Details
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#0E2A47]">
                #{order.orderId}
              </h2>
              <p className="text-xs text-[#8A7E6E] mt-0.5">
                Placed on {order.dateFormatted || new Date(order.createdAt).toLocaleString('en-IN')}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-[#8A7E6E] block">Total Amount</span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#0E2A47]">
                ₹{order.total}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="py-4">
            <div className="grid grid-cols-4 gap-2 relative">
              {[
                { step: 1, label: 'Order Accepted', desc: 'Queued at Unit' },
                { step: 2, label: 'Care Confirmed', desc: 'Called & Verified' },
                { step: 3, label: 'Out for Delivery', desc: 'With Delhi Courier' },
                { step: 4, label: 'Delivered', desc: 'At Your Doorstep' },
              ].map((s) => {
                const isPassed = currentStep >= s.step;
                const isCurrent = currentStep === s.step;

                return (
                  <div key={s.step} className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                        isCurrent
                          ? 'bg-[#B8860B] text-white shadow-md ring-4 ring-[#B8860B]/20'
                          : isPassed
                          ? 'bg-[#0E2A47] text-[#F5E6B0]'
                          : 'bg-[#E8E0D0] text-[#8A7E6E]'
                      }`}
                    >
                      {isPassed ? <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> : s.step}
                    </div>
                    <div>
                      <p className={`text-[11px] sm:text-xs font-semibold ${isPassed ? 'text-[#0E2A47]' : 'text-[#8A7E6E]'}`}>
                        {s.label}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-[#A89E90] hidden xs:block">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Customer & Items Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F2EEE5] p-5 sm:p-6 rounded-2xl border border-[#E0D8CC] text-xs">
            <div className="space-y-2">
              <span className="font-semibold uppercase tracking-wider text-[#5A5248] text-[11px]">
                Delivering To
              </span>
              <p className="font-bold text-[#1C1A16] text-sm">{order.customerName}</p>
              <p className="text-[#5A5248]">{order.address}</p>
              <p className="text-[#5A5248]">{order.city}, {order.state} - {order.pincode}</p>
              <p className="text-[#5A5248] pt-1">
                Phone: <strong>{order.phone}</strong>
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-semibold uppercase tracking-wider text-[#5A5248] text-[11px]">
                Items in this Order ({order.items.length})
              </span>
              <div className="space-y-1.5">
                {order.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[#1C1A16]">
                    <span className="truncate pr-2 font-medium">
                      {it.name} <span className="text-[#8A7E6E]">({it.size})</span> × {it.quantity}
                    </span>
                    <span className="font-bold shrink-0">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Support Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                `Hello RKW, I am tracking my order #${order.orderId}. Can you provide an update on delivery time?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] hover:bg-[#1ebd5a] text-white font-semibold text-xs transition-colors shadow-xs"
            >
              <FaWhatsapp className="text-base" />
              <span>Ask for Courier Tracking on WhatsApp</span>
            </a>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-full bg-[#0E2A47] hover:bg-[#163A60] text-white font-semibold text-xs transition-colors text-center"
            >
              Order More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
