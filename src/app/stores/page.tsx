import React from 'react';
import type { Metadata } from 'next';
import { StoreLocatorSection } from '@/components/StoreLocatorSection';
import { SITE_CONFIG } from '@/config/site';
import { FiClock, FiTruck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Find Nearest Store & Units in Delhi NCR | Ramesh Kolhu Wale',
  description:
    'Visit our 4 live cold-press Units in Delhi NCR: Khureji Khas, New Ashok Nagar, Maujpur, and Karawal Nagar. Open everyday 10:00 AM – 8:30 PM. Free home delivery above ₹799.',
  keywords: [
    'Ramesh Kolhu Wale store',
    'cold press oil shop near me',
    'bilona ghee shop Delhi NCR',
    'Khureji Khas cold pressed oil',
    'New Ashok Nagar oil extraction',
    'Maujpur cold pressed oils',
    'Karawal Nagar bilona ghee shop',
  ],
};

export default function StoresPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#FAF8F3] to-[#F2EEE5] py-16 sm:py-20 border-b border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-3 font-semibold">Store Locator</p>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1A16] font-normal leading-tight">
            Our Experience Stores &amp; Units
          </h1>
          <p className="text-[#5A5248] text-base sm:text-lg mt-4 font-light leading-relaxed">
            Visit our Units to see seeds cold-pressed before your eyes, or have fresh oils &amp; pure Bilona ghee delivered free to your doorstep in Delhi NCR on orders above ₹799.
          </p>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-4 text-xs font-semibold text-[#0E2A47]">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full border border-[#163A60]/10 shadow-xs">
              <FiClock className="w-3.5 h-3.5 text-[#B8860B]" /> Hours: {SITE_CONFIG.contact.unitHours}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full border border-[#163A60]/10 shadow-xs">
              <FiTruck className="w-3.5 h-3.5 text-[#B8860B]" /> Free Home Delivery Above ₹799 (₹100 under ₹799)
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white rounded-full border border-[#163A60]/10 shadow-xs">
              <FaWhatsapp className="w-3.5 h-3.5 text-[#25D366]" /> WhatsApp Order: {SITE_CONFIG.contact.whatsapp}
            </span>
          </div>
        </div>
      </section>

      {/* Main Locator Section */}
      <StoreLocatorSection showTitle={false} />
    </main>
  );
}
