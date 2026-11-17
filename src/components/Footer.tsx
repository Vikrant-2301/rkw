'use client';

import React from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { RKWLogo } from './RKWLogo';
import { SITE_CONFIG } from '@/config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A1C30] text-[#C8D7E6]">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <RKWLogo size="md" theme="light" variant="horizontal" />
            <p className="text-sm leading-relaxed text-[#8EA5BC] max-w-xs font-light">
              Preserving India&apos;s sacred heritage of 100% pure cold-pressed oils and Vedic Bilona ghee since 1965.
              Every drop pressed fresh, tested with science.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 border border-[#1E4E80] text-[#93B5D9] bg-[#0E2A47]/60 rounded-full font-medium">FSSAI Registered</span>
              <span className="text-xs px-2.5 py-1 border border-[#1E4E80] text-[#93B5D9] bg-[#0E2A47]/60 rounded-full font-medium">NABL Tested</span>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/shop?category=oil', label: 'Cold-Pressed Oils' },
                { href: '/shop?category=bilona-ghee', label: 'Vedic Bilona Ghee' },
                { href: '/product/yellow-mustard-oil', label: 'Yellow Mustard Oil' },
                { href: '/product/black-mustard-oil', label: 'Black Mustard Oil' },
                { href: '/product/vedic-a2-bilona-gir-cow-ghee', label: 'A2 Gir Cow Ghee' },
                { href: '/product/pure-buffalo-bilona-desi-ghee', label: 'Buffalo Bilona Ghee' },
                { href: '/product/cold-pressed-coconut-oil', label: 'Cold-Pressed Coconut Oil' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors text-[#8EA5BC] hover:underline underline-offset-4">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Company &amp; Stores</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/stores', label: 'Find Nearest Store' },
                { href: '/about', label: 'Our Story' },
                { href: '/process', label: 'Cold-Press Process' },
                { href: '/lab-reports', label: 'Lab Reports' },
                { href: '/shelf', label: '3D Virtual Shelf' },
                { href: '/shop', label: 'Shop All' },
                { href: '/contact', label: 'Contact & Visit' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors text-[#8EA5BC] hover:underline underline-offset-4">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Workshop &amp; Delivery</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#B8860B]" />
                <span className="text-[#8EA5BC]">Plot 18, Block B, Pitampura,<br />New Delhi – 110034</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 flex-shrink-0 text-[#B8860B]" />
                <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-white transition-colors text-[#8EA5BC]">{SITE_CONFIG.contact.phone}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaWhatsapp className="w-4 h-4 flex-shrink-0 text-[#25D366]" />
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                    'Hello RKW, I want to order pure cold-pressed oils & Vedic Bilona ghee!'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-[#8EA5BC]"
                >
                  WhatsApp: {SITE_CONFIG.contact.whatsapp}
                </a>
              </li>
              <li className="text-xs text-[#F5E6B0] font-medium">
                ⏰ Workshop Hours: {SITE_CONFIG.contact.workshopHours}
              </li>
              <li className="text-xs text-[#8EA5BC]">
                🚚 Free Delhi NCR Delivery above ₹799 (₹100 below ₹799)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#163A60]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B85A0]">
          <p>© {new Date().getFullYear()} Ramesh Kolhu Wale. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/stores" className="hover:text-white transition-colors">Find Store</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/process" className="hover:text-white transition-colors">Process</Link>
            <Link href="/shelf" className="hover:text-white transition-colors">Virtual Shelf</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
