'use client';

import React from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { RKWLogo } from './RKWLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C3829] text-[#C8BFA8]">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <RKWLogo size="md" theme="light" />
            <p className="text-sm leading-relaxed text-[#A09585] max-w-xs">
              Preserving India&apos;s tradition of wood-pressed oils and Vedic Bilona ghee since generations.
              Every drop pressed with care, tested with science.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 border border-[#3D7A5E] text-[#A0C4B0] rounded-full">FSSAI Registered</span>
              <span className="text-xs px-2.5 py-1 border border-[#3D7A5E] text-[#A0C4B0] rounded-full">NABL Tested</span>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/product/yellow-mustard-oil', label: 'Yellow Mustard Oil' },
                { href: '/product/black-mustard-oil', label: 'Black Mustard Oil' },
                { href: '/product/vedic-a2-bilona-gir-cow-ghee', label: 'A2 Gir Cow Ghee' },
                { href: '/product/pure-buffalo-bilona-desi-ghee', label: 'Buffalo Bilona Ghee' },
                { href: '/product/wood-pressed-coconut-oil', label: 'Coconut Oil' },
                { href: '/product/wood-pressed-groundnut-oil', label: 'Groundnut Oil' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/about', label: 'Our Story' },
                { href: '/process', label: 'Extraction Process' },
                { href: '/lab-reports', label: 'Lab Reports' },
                { href: '/shelf', label: 'Virtual Shelf' },
                { href: '/shop', label: 'Shop All' },
                { href: '/contact', label: 'Contact & Visit' },
              ].map(item => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#B8860B]" />
                <span>Plot 18, Block B, Pitampura,<br />New Delhi – 110034</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 flex-shrink-0 text-[#B8860B]" />
                <a href="tel:9811254321" className="hover:text-white transition-colors">+91 98112 54321</a>
              </li>
              <li className="flex items-center gap-2.5">
                <FaWhatsapp className="w-4 h-4 flex-shrink-0 text-green-400" />
                <a href="https://wa.me/919811254321" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp Order
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 flex-shrink-0 text-[#B8860B]" />
                <span>care@rameshkolhuwale.com</span>
              </li>
              <li className="text-xs text-[#A09585]">Mon–Sun: 8:00 AM – 8:30 PM</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#2A5240]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B6055]">
          <p>© {new Date().getFullYear()} Ramesh Kolhu Wale. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <Link href="/about" className="hover:text-[#C8BFA8] transition-colors">About</Link>
            <Link href="/process" className="hover:text-[#C8BFA8] transition-colors">Process</Link>
            <Link href="/contact" className="hover:text-[#C8BFA8] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
