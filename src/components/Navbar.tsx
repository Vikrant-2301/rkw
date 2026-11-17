'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RKWLogo } from './RKWLogo';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { FiShoppingBag, FiSearch, FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/shelf', label: 'Virtual Shelf' },
    { href: '/process', label: 'Our Process' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Thin announcement bar */}
      <div className="bg-[#1C3829] text-[#F5E6B0] text-xs py-2 px-4 text-center tracking-wide">
        Free delivery in Delhi NCR on orders above ₹799 &nbsp;·&nbsp;
        <a href="https://wa.me/919811254321" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white transition-colors">
          WhatsApp: +91 98112 54321
        </a>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F3]/98 backdrop-blur-md border-b border-[#E8E0D0] shadow-sm py-3'
          : 'bg-[#FAF8F3]/98 backdrop-blur-md border-b border-[#E8E0D0] py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <RKWLogo size="md" />
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(link => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#1C3829] border-b-2 border-[#B8860B] pb-0.5'
                      : 'text-[#4A4035] hover:text-[#1C3829]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#4A4035] hover:text-[#1C3829] transition-colors"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 bg-[#1C3829] text-[#F5E6B0] text-sm font-medium rounded-full hover:bg-[#2A5240] transition-colors"
              aria-label="Cart"
            >
              <FiShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Basket</span>
              {totalItems > 0 && (
                <span className="bg-[#B8860B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#4A4035] hover:text-[#1C3829]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-72 bg-[#FAF8F3] shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-[#E8E0D0]">
              <RKWLogo size="sm" />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-[#4A4035]">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 p-5 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-[#1C1A16] hover:bg-[#EDE8DF] hover:text-[#1C3829] rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="p-5 border-t border-[#E8E0D0] space-y-3">
              <a
                href="https://wa.me/919811254321"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-700 text-white rounded-full text-sm font-medium"
              >
                <FaWhatsapp className="text-base" />
                WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Search modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-24 px-4" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
          <div className="bg-[#FAF8F3] rounded-2xl shadow-2xl max-w-xl w-full p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-[#E8E0D0] pb-4">
              <FiSearch className="text-[#1C3829] w-5 h-5 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search oils, ghee..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="flex-1 text-base focus:outline-none bg-transparent text-[#1C1A16] placeholder-[#A09585]"
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-1 text-[#A09585] hover:text-[#1C1A16]">
                <FiX className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-4 max-h-72 overflow-y-auto space-y-1">
              {searchQuery.trim() === '' ? (
                <p className="text-sm text-[#A09585] text-center py-6">Start typing to search our collection</p>
              ) : filteredProducts.length === 0 ? (
                <p className="text-sm text-[#A09585] text-center py-6">No results for "{searchQuery}"</p>
              ) : (
                filteredProducts.map(p => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center gap-4 p-3 hover:bg-[#EDE8DF] rounded-xl transition-colors"
                  >
                    <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0 bg-[#E8E0D0]">
                      <Image src={p.image} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1C1A16] truncate">{p.name}</p>
                      <p className="text-xs text-[#A09585]">from ₹{p.price}</p>
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
