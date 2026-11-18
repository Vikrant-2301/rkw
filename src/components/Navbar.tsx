'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { RKWLogo } from './RKWLogo';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { SITE_CONFIG } from '@/config/site';
import { FiArrowRight, FiMenu, FiSearch, FiShoppingBag, FiX } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { setMobileMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!searchOpen && !mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setSearchOpen(false); setMobileMenuOpen(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchOpen, mobileMenuOpen]);

  const filteredProducts = searchQuery.trim() ? PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6) : [];
  const navLinks = [
    { href: '/shop', label: 'Shop' }, { href: '/shelf', label: 'The shelf' },
    { href: '/process', label: 'Our method' }, { href: '/about', label: 'Our story' },
    { href: '/stores', label: 'Find a unit' },
  ];
  const wa = `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent('Hello RKW, I would like to know more about your products.')}`;

  return <>
    <div className="flex min-h-9 items-center justify-center gap-3 bg-[#173C31] px-4 py-2 text-center text-[9px] font-semibold uppercase tracking-[.15em] text-[#F5F1E8] sm:gap-6">
      <span>Free delivery across Delhi NCR above ₹799</span><span className="hidden text-white/30 sm:inline">•</span>
      <span className="hidden sm:inline">Our units · {SITE_CONFIG.contact.unitHours}</span>
      <a href={wa} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 text-[#E7B18A] transition hover:text-white md:inline-flex"><FaWhatsapp/> Speak to us ↗</a>
    </div>
    <header className={`sticky top-0 z-40 border-b border-[#D9D0C0] transition-all duration-300 ${scrolled?'bg-[#F5F1E8]/95 shadow-[0_8px_30px_rgba(32,42,34,.06)] backdrop-blur-xl':'bg-[#F5F1E8]'}`}>
      <div className="rkw-shell flex h-[76px] items-center justify-between gap-5">
        <Link href="/" aria-label="Ramesh Kolhu Wale home" className="shrink-0"><RKWLogo size="md" variant="horizontal"/></Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map(link=><Link key={link.href} href={link.href} className={`relative py-2 text-[10px] font-bold uppercase tracking-[.14em] transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#B66B3D] after:transition-transform hover:text-[#B66B3D] hover:after:scale-x-100 ${pathname===link.href?'text-[#B66B3D] after:scale-x-100':'text-[#465047]'}`}>{link.label}</Link>)}
        </nav>
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <button onClick={()=>setSearchOpen(true)} aria-label="Search products" className="grid size-10 place-items-center text-[#26382D] transition hover:text-[#B66B3D]"><FiSearch size={19}/></button>
          <button onClick={()=>setIsCartOpen(true)} aria-label={`Open basket, ${totalItems} items`} className="relative inline-flex h-10 items-center gap-2 bg-[#173C31] px-4 text-[10px] font-bold uppercase tracking-[.12em] text-white transition hover:bg-[#B66B3D]"><FiShoppingBag size={16}/><span className="hidden sm:inline">Basket</span><span className="grid min-w-5 place-items-center bg-[#E7B18A] px-1 text-[9px] text-[#173C31]">{totalItems}</span></button>
          <button onClick={()=>setMobileMenuOpen(v=>!v)} aria-label={mobileMenuOpen?'Close menu':'Open menu'} aria-expanded={mobileMenuOpen} className="grid size-10 place-items-center text-[#26382D] lg:hidden">{mobileMenuOpen?<FiX size={21}/>:<FiMenu size={21}/>}</button>
        </div>
      </div>
    </header>

    {mobileMenuOpen && <div className="fixed inset-0 z-[60] bg-[#102B23] text-[#F5F1E8] lg:hidden">
      <div className="flex h-[76px] items-center justify-between border-b border-white/15 px-6"><RKWLogo size="md" theme="light" variant="horizontal"/><button onClick={()=>setMobileMenuOpen(false)} aria-label="Close menu" className="grid size-10 place-items-center"><FiX size={24}/></button></div>
      <nav className="flex flex-col px-7 py-8">{navLinks.map((link,i)=><Link key={link.href} href={link.href} className="flex items-center justify-between border-b border-white/15 py-5 font-serif text-3xl" onClick={()=>setMobileMenuOpen(false)}><span><small className="mr-4 align-middle font-sans text-[9px] text-[#E7B18A]">0{i+1}</small>{link.label}</span><span className="text-lg text-[#E7B18A]">↗</span></Link>)}</nav>
      <div className="absolute inset-x-7 bottom-10"><p className="mb-4 text-[10px] uppercase tracking-[.18em] text-white/55">A family tradition since 1981</p><a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#E7B18A] py-4 text-xs font-bold uppercase tracking-widest text-[#173C31]"><FaWhatsapp/> Talk to RKW</a></div>
    </div>}

    {searchOpen && <div className="fixed inset-0 z-[70] bg-[#102B23]/80 px-4 pt-[10vh] backdrop-blur-sm" onClick={()=>{setSearchOpen(false);setSearchQuery('')}}>
      <div className="mx-auto max-w-2xl bg-[#F5F1E8] p-6 shadow-2xl sm:p-9" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center gap-4 border-b border-[#CFC6B6] pb-5"><FiSearch size={20} className="text-[#B66B3D]"/><input autoFocus value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} onKeyDown={e=>{if(e.key==='Escape')setSearchOpen(false)}} placeholder="What are you looking for?" className="min-w-0 flex-1 bg-transparent font-serif text-2xl text-[#202A22] outline-none placeholder:text-[#A69B8B] sm:text-3xl"/><button onClick={()=>{setSearchOpen(false);setSearchQuery('')}} aria-label="Close search"><FiX size={21}/></button></div>
        <div className="mt-5 max-h-[55vh] overflow-y-auto">{!searchQuery.trim()?<p className="py-8 text-center text-xs text-[#817767]">Search the collection by product or ingredient.</p>:filteredProducts.length===0?<p className="py-8 text-center text-xs text-[#817767]">No matches yet. Try another ingredient.</p>:filteredProducts.map(p=><Link key={p.id} href={`/product/${p.slug}`} onClick={()=>{setSearchOpen(false);setSearchQuery('')}} className="flex items-center gap-4 border-b border-[#D9D0C0] py-3 transition hover:bg-[#EAE2D3]"><div className="relative size-14 shrink-0 bg-[#EAE2D3]"><Image src={p.image} alt={p.name} fill sizes="56px" className="object-cover"/></div><div className="min-w-0 flex-1"><p className="font-serif text-lg text-[#202A22]">{p.name}</p><p className="mt-1 text-[10px] text-[#817767]">From ₹{p.volumes[0].price}</p></div><FiArrowRight className="text-[#B66B3D]"/></Link>)}</div>
        <div className="mt-5 flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#817767]"><span>RKW · The everyday collection</span><span>Esc to close</span></div>
      </div>
    </div>}
  </>;
};
