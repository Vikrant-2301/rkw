import React from 'react';
import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us & Visit Workshop | Ramesh Kolhu Wale',
  description: 'Visit our flagship extraction workshop in Pitampura, Delhi or contact us via WhatsApp for fresh cold-pressed oils and pure A2 Bilona Ghee orders.',
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
          <div className="max-w-xl">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-4 font-semibold">Get in Touch</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1A16] font-normal leading-tight mb-5">
              Visit us or order from home
            </h1>
            <p className="text-[#5A5248] leading-relaxed font-light">
              Walk into our Pitampura flagship workshop to see your oil cold-pressed live, or reach us on 
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
                <h2 className="font-serif text-2xl text-[#1C1A16] font-normal">Workshop Address</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#EBF2F8] rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-4 h-4 text-[#0E2A47]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C1A16] text-sm">RKW Central Workshop</p>
                      <p className="text-[#5A5248] text-sm mt-1">Plot 18, Block B, Main Market,<br />Pitampura, New Delhi – 110034</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#EBF2F8] rounded-full flex items-center justify-center flex-shrink-0">
                      <FiClock className="w-4 h-4 text-[#0E2A47]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C1A16] text-sm">Workshop Hours</p>
                      <p className="text-[#5A5248] text-sm mt-1">Monday – Sunday: 10:00 AM – 10:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <h2 className="font-serif text-2xl text-[#1C1A16] font-normal">Reach Us</h2>
                <div className="space-y-4">
                  <a
                    href="https://wa.me/919811254321"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors shadow-xs"
                  >
                    <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0 shadow-xs">
                      <FaWhatsapp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C1A16] text-sm">WhatsApp — Fastest Response</p>
                      <p className="text-[#5A5248] text-sm">+91 98112 54321</p>
                    </div>
                  </a>
                  <a
                    href="tel:9811254321"
                    className="flex items-center gap-4 p-4 bg-[#EBF2F8] rounded-xl hover:bg-[#DDE9F4] transition-colors border border-[#163A60]/10"
                  >
                    <div className="w-10 h-10 bg-[#0E2A47] rounded-full flex items-center justify-center flex-shrink-0 shadow-xs">
                      <FiPhone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C1A16] text-sm">Call Us</p>
                      <p className="text-[#5A5248] text-sm">+91 98112 54321</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 bg-[#EBF2F8] rounded-xl border border-[#163A60]/10">
                    <div className="w-10 h-10 bg-[#0E2A47] rounded-full flex items-center justify-center flex-shrink-0 shadow-xs">
                      <FiMail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1C1A16] text-sm">Email</p>
                      <p className="text-[#5A5248] text-sm">care@rameshkolhuwale.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="space-y-6">
              <div className="aspect-square bg-[#EBF2F8] rounded-2xl overflow-hidden flex items-center justify-center border border-[#163A60]/15 shadow-sm">
                <div className="text-center space-y-3 p-8">
                  <div className="w-16 h-16 bg-[#0E2A47] rounded-full flex items-center justify-center mx-auto shadow-md">
                    <FiMapPin className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-semibold text-[#1C1A16]">Plot 18, Block B</p>
                  <p className="text-sm text-[#8A7E6E]">Pitampura, New Delhi</p>
                  <div className="flex gap-3 mt-3 flex-wrap">
                    <a
                      href="https://maps.google.com/?q=Pitampura+New+Delhi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-[#0E2A47] text-white text-sm font-semibold rounded-full hover:bg-[#163A60] transition-colors shadow-xs"
                    >
                      Open in Maps
                    </a>
                    <Link
                      href="/stores"
                      className="px-6 py-2.5 bg-[#EBF2F8] text-[#0E2A47] text-sm font-semibold rounded-full hover:bg-[#DDE9F4] transition-colors"
                    >
                      View All 5 NCR Stores
                    </Link>
                  </div>
                </div>
              </div>
              <div className="bg-[#F2EEE5] rounded-xl p-6 space-y-2 border border-[#E8E0D0]">
                <p className="font-semibold text-[#1C1A16] text-sm">Workshop Hours &amp; Visiting Tip</p>
                <p className="text-sm text-[#5A5248]">
                  Open everyday from 10:00 AM to 10:00 PM. Come during workshop hours to see seed extraction live.
                  For express home delivery in Delhi NCR, call or WhatsApp +91 98112 54321.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
