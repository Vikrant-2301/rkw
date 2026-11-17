import React from 'react';
import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact Us & Visit Units | Ramesh Kolhu Wale',
  description: 'Visit our 4 live cold-press Units in Delhi NCR or contact us via WhatsApp (+91 9217744378 / +91 9217744379) for fresh cold-pressed oils and pure Bilona Ghee.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#F2EEE5] py-20 sm:py-24 border-b border-[#E8E0D0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-4 font-semibold">Get in Touch</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1A16] font-normal leading-tight mb-5">
              Visit our Units or order from home
            </h1>
            <p className="text-[#5A5248] leading-relaxed font-light">
              Walk into any of our 4 Delhi NCR Units to see your oil cold-pressed live before your eyes, or reach us on 
              WhatsApp for express doorstep delivery across Delhi NCR (Free delivery above ₹799, ₹100 below ₹799).
            </p>
          </div>
        </div>
      </section>

      {/* Contact info */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-2xl text-[#1C1A16] font-normal">Our Units (4 Branches)</h2>
                  <Link href="/stores" className="text-xs font-semibold text-[#0E2A47] hover:underline">
                    View full details &rarr;
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SITE_CONFIG.stores.map((store) => (
                    <div key={store.id} className="p-4 bg-white rounded-xl border border-stone-200 shadow-xs space-y-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0E2A47] text-white">
                        {store.unitNumber}
                      </span>
                      <p className="font-semibold text-sm text-[#0E2A47]">{store.name.replace('RKW ', '')}</p>
                      <p className="text-xs text-[#5A5248] leading-relaxed">{store.address}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-4 p-4 bg-[#FAF8F3] rounded-xl border border-stone-200">
                  <div className="w-10 h-10 bg-[#EBF2F8] rounded-full flex items-center justify-center flex-shrink-0">
                    <FiClock className="w-4 h-4 text-[#0E2A47]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1C1A16] text-sm">Unit Operating Hours</p>
                    <p className="text-[#5A5248] text-sm mt-0.5">{SITE_CONFIG.contact.unitDays}: {SITE_CONFIG.contact.unitHours}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h2 className="font-serif text-2xl text-[#1C1A16] font-normal">Direct Contact</h2>
                <div className="space-y-4">
                  <a
                    href={`https://wa.me/91${SITE_CONFIG.contact.whatsappRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors shadow-xs"
                  >
                    <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 shadow-xs">
                      <FaWhatsapp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C1A16] text-sm">WhatsApp — Fastest Response</p>
                      <p className="text-[#5A5248] text-sm">{SITE_CONFIG.contact.whatsapp} / {SITE_CONFIG.contact.whatsappSecondary}</p>
                    </div>
                  </a>
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                    className="flex items-center gap-4 p-4 bg-[#EBF2F8] rounded-xl hover:bg-[#DDE9F4] transition-colors border border-[#163A60]/10"
                  >
                    <div className="w-10 h-10 bg-[#0E2A47] rounded-full flex items-center justify-center flex-shrink-0 shadow-xs">
                      <FiPhone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C1A16] text-sm">Call Us</p>
                      <p className="text-[#5A5248] text-sm">{SITE_CONFIG.contact.phone} / {SITE_CONFIG.contact.phoneSecondary}</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 bg-[#EBF2F8] rounded-xl border border-[#163A60]/10">
                    <div className="w-10 h-10 bg-[#0E2A47] rounded-full flex items-center justify-center flex-shrink-0 shadow-xs">
                      <FiMail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C1A16] text-sm">Email</p>
                      <p className="text-[#5A5248] text-sm">{SITE_CONFIG.contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map & Flagship Box */}
            <div className="space-y-6">
              <div className="p-8 bg-[#EBF2F8] rounded-2xl border border-[#163A60]/15 shadow-sm space-y-5">
                <div className="w-14 h-14 bg-[#0E2A47] rounded-full flex items-center justify-center shadow-md">
                  <FiMapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E2A47] bg-white px-2.5 py-1 rounded">
                    UNIT-01 (Flagship)
                  </span>
                  <h3 className="font-serif text-2xl text-[#1C1A16] font-normal mt-2">Khureji Khas</h3>
                  <p className="text-sm text-[#5A5248] mt-1 leading-relaxed">
                    B-2, Village Khurreji Khas, West Laxmi Market, Nr. HP Petrol Pump (Opp. Samuday Bhawan), Delhi-51
                  </p>
                </div>
                <div className="flex gap-3 flex-wrap pt-2">
                  <a
                    href="https://maps.google.com/?q=West+Laxmi+Market+Khureji+Khas+Delhi+110051"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-[#0E2A47] text-white text-sm font-semibold rounded-full hover:bg-[#163A60] transition-colors shadow-xs"
                  >
                    Open in Google Maps
                  </a>
                  <Link
                    href="/stores"
                    className="px-6 py-2.5 bg-white text-[#0E2A47] text-sm font-semibold rounded-full hover:bg-stone-100 transition-colors border border-stone-200"
                  >
                    View All 4 Units
                  </Link>
                </div>
              </div>

              <div className="bg-[#F2EEE5] rounded-xl p-6 space-y-2 border border-[#E8E0D0]">
                <p className="font-semibold text-[#1C1A16] text-sm">Unit Hours &amp; Visiting Tip</p>
                <p className="text-sm text-[#5A5248] leading-relaxed">
                  All 4 Units are open everyday from 10:00 AM to 10:00 PM. Come anytime during Unit hours to watch your cold-pressed oil freshly extracted before your eyes.
                  For doorstep home delivery across Delhi NCR, call or WhatsApp +91 9217744378 / +91 9217744379.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
