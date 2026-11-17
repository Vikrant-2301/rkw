import React from 'react';
import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export const metadata = {
  title: 'Contact & Visit | Ramesh Kolhu Wale',
  description: 'Visit our workshop in Pitampura, Delhi or reach us on WhatsApp for orders and inquiries.',
};

export default function ContactPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#F2EEE5] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-[#B8860B] text-xs uppercase tracking-widest mb-4">Get in Touch</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#1C1A16] font-normal leading-tight mb-5">
              Visit us or order from home
            </h1>
            <p className="text-[#5A5248] leading-relaxed">
              Walk into our Pitampura workshop to see your oil pressed live, or reach us on 
              WhatsApp for quick orders and delivery across Delhi NCR.
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
                    <div className="w-10 h-10 bg-[#EDE8DF] rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="w-4 h-4 text-[#1C3829]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1C1A16] text-sm">RKW Central Workshop</p>
                      <p className="text-[#5A5248] text-sm mt-1">Plot 18, Block B, Main Market,<br />Pitampura, New Delhi – 110034</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#EDE8DF] rounded-full flex items-center justify-center flex-shrink-0">
                      <FiClock className="w-4 h-4 text-[#1C3829]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1C1A16] text-sm">Workshop Hours</p>
                      <p className="text-[#5A5248] text-sm mt-1">Monday – Sunday: 8:00 AM – 8:30 PM</p>
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
                    className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaWhatsapp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1C1A16] text-sm">WhatsApp — Fastest Response</p>
                      <p className="text-[#5A5248] text-sm">+91 98112 54321</p>
                    </div>
                  </a>
                  <a
                    href="tel:9811254321"
                    className="flex items-center gap-4 p-4 bg-[#EDE8DF] rounded-xl hover:bg-[#E0D8CC] transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#1C3829] rounded-full flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1C1A16] text-sm">Call Us</p>
                      <p className="text-[#5A5248] text-sm">+91 98112 54321</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 bg-[#EDE8DF] rounded-xl">
                    <div className="w-10 h-10 bg-[#1C3829] rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1C1A16] text-sm">Email</p>
                      <p className="text-[#5A5248] text-sm">care@rameshkolhuwale.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="space-y-6">
              <div className="aspect-square bg-[#EDE8DF] rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="text-center space-y-3 p-8">
                  <div className="w-16 h-16 bg-[#1C3829] rounded-full flex items-center justify-center mx-auto">
                    <FiMapPin className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-medium text-[#1C1A16]">Plot 18, Block B</p>
                  <p className="text-sm text-[#8A7E6E]">Pitampura, New Delhi</p>
                  <a
                    href="https://maps.google.com/?q=Pitampura+New+Delhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 px-6 py-2.5 bg-[#1C3829] text-white text-sm font-medium rounded-full hover:bg-[#2A5240] transition-colors"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
              <div className="bg-[#F2EEE5] rounded-xl p-6 space-y-2">
                <p className="font-medium text-[#1C1A16] text-sm">Visiting tip</p>
                <p className="text-sm text-[#5A5248]">
                  Come between 9 AM and 6 PM on weekdays to see the full extraction process live. 
                  Weekends are busier — feel free to call ahead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
