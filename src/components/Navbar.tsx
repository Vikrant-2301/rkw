'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RKWLogo } from './RKWLogo';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { 
  FiShoppingBag, 
  FiSearch, 
  FiMenu, 
  FiX, 
  FiPhone, 
  FiArrowRight,
  FiMapPin 
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Image from 'next/image';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products for search modal
  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.hindiName.includes(searchQuery) ||
          p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop All' },
    { href: '/shop?category=mustard-oils', label: 'Mustard Oils' },
    { href: '/shop?category=bilona-ghee', label: 'Bilona Ghee' },
    { href: '/shop?category=nut-seed-oils', label: 'Nut & Seed Oils' },
    { href: '/process', label: 'Extraction Process' },
    { href: '/lab-reports', label: 'Lab Reports' },
    { href: '/about', label: 'About RKW' },
    { href: '/contact', label: 'Contact & Visit' },
  ];

  return (
    <>
      {/* Top Banner with Hindi Tagline & Call Support */}
      <div className="bg-gradient-to-r from-[#031d15] via-[#062e22] to-[#031d15] text-amber-100 text-xs py-2 px-4 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Brand Tagline */}
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
            <span className="font-bold tracking-wide text-amber-300">
              रमेश कोल्हू वाले — शुद्धता और स्वाद, हर बूँद में विश्वास
            </span>
            <span className="hidden md:inline text-emerald-400/50">•</span>
            <span className="hidden md:inline text-emerald-100/90 font-medium">
              100% Traditional Wooden Ghani Oils &amp; Vedic Bilona Ghee
            </span>
          </div>

          {/* Quick Contacts */}
          <div className="flex items-center gap-3.5 text-xs text-stone-300">
            <a
              href="tel:9811254321"
              className="flex items-center gap-1.5 text-emerald-200 hover:text-amber-300 font-semibold transition-colors"
            >
              <FiPhone className="text-amber-400 w-3.5 h-3.5" />
              <span>+91 98112 54321</span>
            </a>
            <span className="text-emerald-800">|</span>
            <a
              href="https://wa.me/919811254321"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-400 hover:text-green-300 font-semibold transition-colors"
            >
              <FaWhatsapp className="text-sm" />
              <span className="hidden sm:inline">WhatsApp Order</span>
            </a>
            <span className="text-emerald-800 hidden lg:inline">|</span>
            <Link
              href="/process#visit-unit"
              className="hidden lg:flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-medium"
            >
              <FiMapPin className="w-3.5 h-3.5" />
              <span>RKW Workshops</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 bg-white/95 backdrop-blur-md border-b border-stone-200/90 ${
          scrolled ? 'shadow-md py-2.5' : 'py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <RKWLogo size="md" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-sm font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'text-emerald-950 bg-emerald-100/80 font-bold shadow-2xs border border-emerald-300/60'
                        : 'text-stone-700 hover:text-emerald-800 hover:bg-emerald-50/60'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Search Trigger */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 sm:p-2.5 rounded-full text-stone-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
                aria-label="Search catalog"
              >
                <FiSearch className="w-5 h-5" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-stone-800 border border-emerald-300/80 transition-all group shadow-2xs cursor-pointer"
                aria-label="View shopping basket"
              >
                <div className="relative">
                  <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-800 group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2.5 -right-2.5 bg-amber-600 text-white font-extrabold text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-950">
                  Cart
                </span>
                {subtotal > 0 && (
                  <span className="hidden sm:inline text-xs font-extrabold text-emerald-800 pl-1 border-l border-emerald-200">
                    ₹{subtotal}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs lg:hidden">
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <RKWLogo size="sm" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-800"
                  aria-label="Close menu"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-800 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-stone-200 space-y-3">
              <a
                href="tel:9811254321"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md"
              >
                <FiPhone /> Call Helpline (+91 98112 54321)
              </a>
              <a
                href="https://wa.me/919811254321"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-sm shadow-md"
              >
                <FaWhatsapp className="text-lg" /> WhatsApp Quick Order
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 animate-fadeIn border border-emerald-900/20">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-2 flex-1">
                <FiSearch className="text-emerald-700 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search pure cold-pressed oil, bilona ghee, badam rogan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-base sm:text-lg focus:outline-none placeholder-stone-400 font-medium text-stone-800"
                />
              </div>
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
                aria-label="Close search"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results */}
            <div className="mt-4 max-h-80 overflow-y-auto divide-y divide-stone-100">
              {searchQuery.trim() === '' ? (
                <div className="py-6 text-center text-stone-400 text-sm">
                  Type to search from our pure wooden ghani collection...
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-8 text-center text-stone-500 text-sm">
                  No products found matching &ldquo;{searchQuery}&rdquo;.
                </div>
              ) : (
                filteredProducts.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-4 py-3 hover:bg-emerald-50/60 px-3 rounded-xl transition-colors group"
                  >
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0 bg-stone-100">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 truncate">
                        {p.name}
                      </h4>
                      <p className="text-xs text-emerald-700 font-medium truncate font-sans">
                        {p.hindiName}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-sm font-extrabold text-stone-900">
                        ₹{p.price}
                      </span>
                      <span className="text-[10px] text-stone-400 block">Starting</span>
                    </div>
                    <FiArrowRight className="text-stone-400 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all" />
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
