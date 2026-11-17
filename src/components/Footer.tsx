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
              Preserving India&apos;s sacred heritage of 100% pure cold-pressed oils and pure Bilona ghee since 1981.
              Every drop pressed fresh before your eyes.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs px-2.5 py-1 border border-[#1E4E80] text-[#93B5D9] bg-[#0E2A47]/60 rounded-full font-medium">Agmark R.B.O. Certified</span>
              <span className="text-xs px-2.5 py-1 border border-[#1E4E80] text-[#93B5D9] bg-[#0E2A47]/60 rounded-full font-medium">100% Pure Guarantee</span>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/shop?category=oil', label: 'Cold-Pressed Oils' },
                { href: '/shop?category=bilona-ghee', label: 'Bilona Ghee' },
                { href: '/product/yellow-mustard-oil', label: 'Yellow Mustard Oil' },
                { href: '/product/black-mustard-oil', label: 'Black Mustard Oil' },
                { href: '/product/desi-cow-ghee', label: 'Desi Cow Ghee' },
                { href: '/product/desi-buffalo-ghee', label: 'Desi Buffalo Ghee' },
                { href: '/product/dahi-bilona-desi-cow-ghee', label: 'Dahi Bilona Cow Ghee' },
                { href: '/product/dahi-bilona-desi-buffalo-ghee', label: 'Dahi Bilona Buffalo Ghee' },
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
                { href: '/stores', label: 'Find Nearest Unit' },
                { href: '/about', label: 'Our Story (Since 1981)' },
                { href: '/process', label: 'Cold-Press Process' },
                { href: '/lab-reports', label: 'Quality Standards' },
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
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Units &amp; Delivery</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#B8860B]" />
                <span className="text-[#8EA5BC]">
                  UNIT-01: Khureji Khas, West Laxmi Market, Delhi-51<br />
                  <span className="text-xs text-[#6B85A0]">(4 Units across Delhi NCR)</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 flex-shrink-0 text-[#B8860B]" />
                <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-white transition-colors text-[#8EA5BC]">
                  {SITE_CONFIG.contact.phone} / {SITE_CONFIG.contact.phoneSecondary}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaWhatsapp className="w-4 h-4 flex-shrink-0 text-[#25D366]" />
                <a
                  href={`https://wa.me/91${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                    'Hello RKW, I want to order pure cold-pressed oils & Bilona ghee!'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-[#8EA5BC]"
                >
                  WhatsApp: {SITE_CONFIG.contact.whatsapp}
                </a>
              </li>
              <li className="text-xs text-[#F5E6B0] font-medium">
                ⏰ Unit Hours: {SITE_CONFIG.contact.unitHours}
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
          <p>© {new Date().getFullYear()} Ramesh Kolhu Wale. Since 1981. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/stores" className="hover:text-white transition-colors">Find Unit</Link>
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
