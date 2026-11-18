'use client';

import React, { useMemo, useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG } from '@/config/site';

function ShopContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [query, setQuery] = useState('');
  const categories = [
    { id: 'all', label: 'Everything' },
    { id: 'oil', label: 'Cold-pressed oils' },
    { id: 'bilona-ghee', label: 'Bilona ghee' },
  ];
  const filtered = useMemo(() => PRODUCTS.filter(p =>
    (activeCategory === 'all' || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(query.toLowerCase()) || p.shortDesc.toLowerCase().includes(query.toLowerCase()))
  ), [activeCategory, query]);

  return (
    <main className="pb-24">
      <section className="bg-[#173C31] py-20 text-[#F5F1E8] sm:py-28">
        <div className="rkw-shell">
          <p className="text-[10px] font-bold uppercase tracking-[.25em] text-[#E7B18A]">The RKW collection · Since 1981</p>
          <h1 className="rkw-display mt-6 max-w-4xl text-6xl sm:text-7xl lg:text-8xl">The good things<br/><em>for your kitchen.</em></h1>
          <p className="mt-7 max-w-lg text-sm leading-7 text-white/70">Explore our range of traditional cold-pressed oils and Bilona ghee. Choose a product, find your size, and bring home the way we make it.</p>
          <div className="mt-10 flex flex-wrap gap-8 border-t border-white/20 pt-6 text-[9px] font-bold uppercase tracking-[.18em] text-white/70">
            <span>Delhi NCR delivery</span><span>Our own extraction units</span><span>Agmark R.B.O. quality</span>
          </div>
        </div>
      </section>
      <section className="rkw-shell py-14 sm:py-20">
        <div className="mb-10 flex flex-col justify-between gap-7 border-b border-[#D9D0C0] pb-8 md:flex-row md:items-end">
          <div><p className="rkw-eyebrow">Browse the range</p><h2 className="rkw-display mt-4 text-4xl text-[#202A22] sm:text-5xl">Find your everyday essential.</h2><p className="mt-3 text-xs text-[#817767]">{filtered.length} products in this collection</p></div>
          <label className="block w-full md:max-w-xs"><span className="mb-2 block text-[9px] font-bold uppercase tracking-[.16em] text-[#817767]">Search products</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try mustard, sesame, ghee..." className="w-full border-b border-[#AFA694] bg-transparent px-0 py-3 text-sm text-[#202A22] outline-none placeholder:text-[#A69B8B] focus:border-[#B66B3D]"/></label>
        </div>
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map(cat=><button key={cat.id} onClick={()=>setActiveCategory(cat.id)} className={`border px-5 py-3 text-[9px] font-bold uppercase tracking-[.14em] transition ${activeCategory===cat.id?'border-[#173C31] bg-[#173C31] text-white':'border-[#CFC6B6] text-[#5E6258] hover:border-[#173C31]'}`}>{cat.label}</button>)}
        </div>
        {filtered.length ? <div className="grid grid-cols-1 gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{filtered.map(p=><ProductCard key={p.id} product={p}/>)}</div> :
          <div className="border-y border-[#D9D0C0] py-20 text-center"><p className="font-serif text-3xl text-[#202A22]">Nothing in this aisle just yet.</p><p className="mt-3 text-xs text-[#817767]">Try another search or browse the full collection.</p><button onClick={()=>{setQuery('');setActiveCategory('all')}} className="mt-6 border-b border-[#B66B3D] pb-1 text-[10px] font-bold uppercase tracking-widest text-[#B66B3D]">Clear filters</button></div>}
      </section>
      <section className="bg-[#EAE2D3] py-10"><div className="rkw-shell flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#B66B3D]">Need a hand choosing?</p><p className="mt-2 font-serif text-2xl text-[#202A22]">Talk to the people who make it.</p><p className="mt-1 text-xs text-[#817767]">Our team is available {SITE_CONFIG.contact.unitHours}.</p></div><a href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent('Hello RKW, I need help choosing a product.')}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#173C31] px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-[#245442]"><FaWhatsapp/> Ask on WhatsApp ↗</a></div></section>
    </main>
  );
}

export default function ShopPage() {
  return <Suspense fallback={<div className="min-h-[60vh] bg-[#F5F1E8]"/>}><ShopContent/></Suspense>;
}
