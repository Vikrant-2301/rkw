'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RKWLogo } from './RKWLogo';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { FiShoppingBag, FiSearch, FiMenu, FiX, FiArrowRight, FiClock, FiTruck, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu or search modal is open
  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, searchOpen]);

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/stores', label: 'Find Unit' },
    { href: '/shelf', label: 'Virtual Shelf' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Announcement bar in rich heritage navy */}
      <div className="bg-[#0E2A47] text-[#F5E6B0] text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2 sm:gap-4">
        <span className="inline-flex items-center gap-1.5 truncate sm:truncate-none">
          <FiTruck className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
          <span>Free Delhi NCR Home Delivery &gt;₹799</span>
        </span>
        <span className="hidden md:inline text-white/30">|</span>
        <span className="hidden md:inline-flex items-center gap-1.5">
          <FiClock className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>Unit Hours: {SITE_CONFIG.contact.unitHours}</span>
        </span>
        <span className="hidden sm:inline text-white/30">|</span>
        <a
          href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
            'Hello RKW, I want to order pure cold-pressed oils & Bilona ghee!'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 underline underline-offset-2 hover:text-white transition-colors shrink-0"
        >
          <FaWhatsapp className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
          <span className="hidden xs:inline">WhatsApp: {SITE_CONFIG.contact.whatsapp}</span>
          <span className="xs:hidden">WhatsApp Order</span>
        </a>
      </div>

      {/* Main nav */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-[#FAF8F3]/98 backdrop-blur-md border-b border-[#E8E0D0] shadow-sm py-2.5 sm:py-3'
            : 'bg-[#FAF8F3]/98 backdrop-blur-md border-b border-[#E8E0D0] py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo with official vector brand logo */}
          <div className="flex-shrink-0">
            <RKWLogo variant="horizontal" />
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#0E2A47] border-b-2 border-[#B8860B] pb-0.5'
                      : 'text-[#4A4035] hover:text-[#0E2A47]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 sm:p-2.5 text-[#4A4035] hover:text-[#0E2A47] transition-colors rounded-full hover:bg-stone-200/50 cursor-pointer"
              aria-label="Search products"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Quick WhatsApp Order Button (Desktop) */}
            <a
              href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                'Hello RKW, I would like to order fresh cold-pressed oils & Vedic Bilona ghee!'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold rounded-full shadow-xs transition-transform hover:scale-105 active:scale-95"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
              <span>Order on WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-[#0E2A47] text-[#F5E6B0] text-xs sm:text-sm font-semibold rounded-full hover:bg-[#163A60] shadow-sm transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Cart basket"
            >
              <FiShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Basket</span>
              {totalItems > 0 && (
                <span className="bg-[#B8860B] text-white text-[10px] font-bold min-w-[20px] h-5 px-1 rounded-full flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4A4035] hover:text-[#0E2A47] rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-[290px] xs:w-80 bg-[#FAF8F3] shadow-2xl flex flex-col animate-slideIn">
            <div className="flex items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4 border-b border-[#E8E0D0] min-h-[70px]">
              <RKWLogo size="md" variant="horizontal" />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#4A4035] hover:text-[#0E2A47] rounded-full hover:bg-stone-200/50 cursor-pointer"
                aria-label="Close menu"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-4 sm:p-5 space-y-1 overflow-y-auto rkw-no-bar">
              {navLinks.map(link => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 text-sm font-semibold rounded-xl transition-colors active:scale-[0.99] ${
                      isActive
                        ? 'bg-[#0E2A47] text-white shadow-xs'
                        : 'text-[#1C1A16] hover:bg-[#EBF2F8] hover:text-[#0E2A47]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <FiArrowRight className={`w-4 h-4 ${isActive ? 'text-[#F5E6B0]' : 'text-stone-400'}`} />
                  </Link>
                );
              })}

              <div className="pt-4 mt-4 border-t border-[#E8E0D0] space-y-2">
                <Link
                  href="/track"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-[#E8E0D0] text-xs font-semibold text-[#0E2A47]"
                >
                  <div className="flex items-center gap-2.5">
                    <FiClock className="w-4 h-4 text-[#B8860B]" />
                    <span>Track Your Order</span>
                  </div>
                  <FiArrowRight className="w-3.5 h-3.5 text-stone-400" />
                </Link>

                <Link
                  href="/stores"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-[#E8E0D0] text-xs font-semibold text-[#0E2A47]"
                >
                  <FiMapPin className="w-4 h-4 text-[#B8860B]" />
                  <div>
                    <p className="font-bold">4 Live Extraction Units</p>
                    <p className="text-[11px] text-[#8A7E6E] font-normal">Khureji, Ashok Nagar, Maujpur &amp; Karawal</p>
                  </div>
                </Link>
              </div>
            </nav>

            <div className="p-4 sm:p-5 border-t border-[#E8E0D0] space-y-3 bg-white/60">
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                  'Hello RKW, I would like to order fresh cold-pressed oils & Bilona ghee!'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] text-white rounded-full text-sm font-semibold shadow-xs transition-transform"
              >
                <FaWhatsapp className="text-lg" />
                <span>WhatsApp: {SITE_CONFIG.contact.whatsapp}</span>
              </a>
              <div className="text-center space-y-1 text-[11px] text-[#5A5248]">
                <p className="inline-flex items-center justify-center gap-1.5">
                  <FiClock className="w-3 h-3 text-[#B8860B]" />
                  <span>Open: {SITE_CONFIG.contact.unitHours} (All 7 Days)</span>
                </p>
                <p className="text-[#0E2A47] font-semibold inline-flex items-center justify-center gap-1.5">
                  <FiTruck className="w-3 h-3 text-[#B8860B]" />
                  <span>Free Delhi NCR Delivery above ₹799</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4"
          onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
        >
          <div
            className="bg-[#FAF8F3] rounded-2xl shadow-2xl max-w-xl w-full p-4 sm:p-6 border border-[#E8E0D0] animate-fadeIn"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[#E8E0D0] pb-3 sm:pb-4">
              <FiSearch className="text-[#0E2A47] w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search mustard oil, bilona ghee, coconut oil..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 text-base focus:outline-none bg-transparent text-[#1C1A16] placeholder-[#A09585]"
              />
              <button
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="p-1.5 text-[#A09585] hover:text-[#1C1A16] rounded-full hover:bg-stone-200/50 cursor-pointer"
                aria-label="Close search"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 max-h-72 sm:max-h-80 overflow-y-auto space-y-1.5 rkw-no-bar">
              {searchQuery.trim() === '' ? (
                <div className="text-center py-8 text-[#A09585] text-xs sm:text-sm">
                  <p>Start typing to search our fresh pure oils &amp; Vedic ghee</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['Yellow Mustard', 'Black Mustard', 'Desi Cow Ghee', 'Desi Buffalo Ghee', 'Coconut Oil'].map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1 bg-white border border-[#E8E0D0] text-[#0E2A47] rounded-full text-xs font-medium hover:bg-[#EBF2F8] cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <p className="text-sm text-[#A09585] text-center py-8">No results for &ldquo;{searchQuery}&rdquo;</p>
              ) : (
                filteredProducts.map(p => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 hover:bg-[#EBF2F8] active:bg-[#EBF2F8] rounded-xl transition-colors"
                  >
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0 bg-[#E8E0D0]">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-[#1C1A16] truncate">{p.name}</p>
                      <p className="text-xs text-[#8A7E6E]">from ₹{p.price}</p>
                    </div>
                    <FiArrowRight className="text-[#A09585] w-4 h-4 flex-shrink-0" />
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
