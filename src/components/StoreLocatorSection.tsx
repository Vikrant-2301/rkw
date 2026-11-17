'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import { FiMapPin, FiClock, FiPhone, FiSearch, FiNavigation, FiCheckCircle, FiTruck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface StoreLocatorSectionProps {
  id?: string;
  className?: string;
  showTitle?: boolean;
}

export const StoreLocatorSection: React.FC<StoreLocatorSectionProps> = ({
  id = 'find-store',
  className = '',
  showTitle = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'live' | 'east' | 'northeast'>('all');

  const filteredStores = useMemo(() => {
    return SITE_CONFIG.stores.filter((store) => {
      // Filter by category pill
      if (selectedFilter === 'live' && !store.hasLiveExtraction) return false;
      if (selectedFilter === 'east' && !store.area.includes('East Delhi') && !store.area.includes('Khureji') && !store.area.includes('Ashok')) return false;
      if (selectedFilter === 'northeast' && !store.area.includes('North East Delhi') && !store.area.includes('Maujpur') && !store.area.includes('Karawal')) return false;

      // Filter by search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchName = store.name.toLowerCase().includes(q);
      const matchAddress = store.address.toLowerCase().includes(q);
      const matchArea = store.area.toLowerCase().includes(q);
      const matchUnit = (store as any).unitNumber?.toLowerCase().includes(q);
      const matchPincode = store.pincode.includes(q);
      const matchCovered = store.pincodesCovered.some((pin) => pin.includes(q));

      return matchName || matchAddress || matchArea || matchUnit || matchPincode || matchCovered;
    });
  }, [searchQuery, selectedFilter]);

  return (
    <section id={id} className={`py-16 sm:py-24 bg-[#FAF8F3] relative overflow-hidden ${className}`}>
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EBF2F8]/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5E6B0]/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EBF2F8] text-[#0E2A47] text-xs font-semibold rounded-full uppercase tracking-wider mb-4 border border-[#163A60]/10">
              <FiMapPin className="w-3.5 h-3.5 text-[#0E2A47]" />
              Delhi NCR Experience Stores &amp; Units
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1A16] font-normal leading-tight">
              Find Your Nearest RKW Unit
            </h2>
            <p className="text-[#5A5248] text-base sm:text-lg mt-4 font-light leading-relaxed">
              Experience fresh live cold-press oil extraction at our Units, or pick up pure Bilona Desi Ghee. 
              Open everyday from <strong>{SITE_CONFIG.contact.unitHours}</strong>.
            </p>
          </div>
        )}

        {/* Free delivery & WhatsApp ordering banner */}
        <div className="bg-gradient-to-r from-[#0E2A47] via-[#163A60] to-[#0A1C30] text-white rounded-2xl p-6 sm:p-8 mb-10 shadow-lg border border-[#1E4E80]/40">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start sm:items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-[#F5E6B0]">
                <FiTruck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-white text-base sm:text-lg">
                    Free Home Delivery in Delhi NCR
                  </span>
                  <span className="text-xs bg-[#B8860B] text-white px-2.5 py-0.5 rounded-full font-semibold">
                    Orders Above ₹799
                  </span>
                </div>
                <p className="text-[#C8D7E6] text-xs sm:text-sm mt-1">
                  ₹100 delivery fee on orders below ₹799. Same-day &amp; express doorstep delivery across Delhi NCR.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <a
                href={`https://wa.me/91${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                  'Hello Ramesh Kolhu Wale! I would like to place an order for pure cold-pressed oils & Bilona ghee with delivery in Delhi NCR.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm rounded-full transition-all shadow-md hover:scale-[1.02]"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Order on WhatsApp: {SITE_CONFIG.contact.whatsapp}</span>
              </a>
              <Link
                href="/shop"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-full transition-colors border border-white/20"
              >
                Shop Online
              </Link>
            </div>
          </div>
        </div>

        {/* Search and filter controls */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E8E0D0] shadow-xs mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7E6E]" />
              <input
                type="text"
                placeholder="Enter Pincode (e.g. 110051) or Area (Khureji, Maujpur)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#FAF8F3] border border-[#E8E0D0] rounded-xl text-sm text-[#1C1A16] placeholder-[#8A7E6E] focus:outline-none focus:border-[#0E2A47] focus:ring-1 focus:ring-[#0E2A47]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7E6E] hover:text-[#1C1A16] px-1.5 py-0.5 bg-stone-200 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {[
                { id: 'all', label: 'All Units (4)' },
                { id: 'live', label: 'Live Cold-Press' },
                { id: 'east', label: 'East Delhi' },
                { id: 'northeast', label: 'North East Delhi' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedFilter(pill.id as typeof selectedFilter)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedFilter === pill.id
                      ? 'bg-[#0E2A47] text-white shadow-xs'
                      : 'bg-[#FAF8F3] text-[#4A4035] hover:bg-[#EBF2F8] border border-[#E8E0D0]'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Store Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl border border-[#E8E0D0] p-6 hover:shadow-md transition-all hover:border-[#163A60]/30 flex flex-col justify-between"
            >
              <div>
                {/* Card header badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold tracking-wider text-white bg-[#0E2A47] px-3 py-1 rounded-full uppercase">
                    {(store as any).unitNumber || 'UNIT'}
                  </span>
                  {store.isFlagship ? (
                    <span className="text-[10px] font-bold tracking-wider text-[#B8860B] bg-[#F5E6B0]/70 px-2.5 py-0.5 rounded-full uppercase border border-[#B8860B]/20">
                      ★ Flagship Unit
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Live Extraction Unit
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1C1A16] leading-snug mb-2">
                  {store.name}
                </h3>

                <p className="text-sm text-[#5A5248] leading-relaxed mb-4">
                  {store.address}
                </p>

                <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E8E0D0] space-y-2 mb-4 text-xs text-[#5A5248]">
                  <div className="flex items-center gap-2 text-[#0E2A47] font-semibold">
                    <FiClock className="w-3.5 h-3.5 text-[#B8860B] flex-shrink-0" />
                    <span>Unit Hours: {store.hours}</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#6B6155]">
                    <FiCheckCircle className="w-3.5 h-3.5 text-[#0E2A47] flex-shrink-0 mt-0.5" />
                    <span><strong>Landmark:</strong> {store.landmark}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#6B6155]">
                    <FiMapPin className="w-3.5 h-3.5 text-[#0E2A47] flex-shrink-0" />
                    <span><strong>Pincode:</strong> {store.pincode} (Deliveries covered: {store.pincodesCovered.join(', ')})</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-[#F0EBE1] space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={store.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#EBF2F8] hover:bg-[#DDE9F4] text-[#0E2A47] text-xs font-semibold rounded-xl transition-colors"
                  >
                    <FiNavigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#FAF8F3] hover:bg-[#F2EEE5] text-[#1C1A16] text-xs font-semibold rounded-xl transition-colors border border-[#E8E0D0]"
                  >
                    <FiPhone className="w-3.5 h-3.5 text-[#0E2A47]" />
                    <span>Call Unit</span>
                  </a>
                </div>

                <a
                  href={`https://wa.me/91${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                    `Hello RKW, I want to order from ${store.name}. Please share available cold-pressed oils and bilona ghee!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  <span>Order via WhatsApp ({SITE_CONFIG.contact.whatsapp})</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#E8E0D0] max-w-lg mx-auto">
            <FiMapPin className="w-10 h-10 text-[#8A7E6E] mx-auto mb-3" />
            <h4 className="font-serif text-lg text-[#1C1A16] font-semibold mb-1">No Unit matching &ldquo;{searchQuery}&rdquo;</h4>
            <p className="text-sm text-[#5A5248] mb-4">
              We deliver fresh across all Delhi NCR pincodes! Order online or directly on WhatsApp.
            </p>
            <a
              href={`https://wa.me/91${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                `Hello RKW! I am in pincode ${searchQuery}. Can you deliver cold-pressed oils & bilona ghee to my address?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-full hover:bg-[#20ba5a]"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp for Doorstep Delivery</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
