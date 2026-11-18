'use client';

import React from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowUpRight, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { RKWLogo } from './RKWLogo';
import { SITE_CONFIG } from '@/config/site';

export const Footer: React.FC = () => (
  <footer className="bg-[#102B23] text-[#F5F1E8]">
    <div className="rkw-shell grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.3fr_.7fr_.8fr_1fr]">
      <div>
        <RKWLogo size="lg" theme="light" variant="horizontal"/>
        <p className="mt-7 max-w-xs font-serif text-2xl leading-snug text-[#F5F1E8]">A little slower.<br/><em className="text-[#E7B18A]">A lot more considered.</em></p>
        <p className="mt-5 max-w-xs text-xs leading-6 text-white/55">Traditional cold-pressed oils and Bilona ghee from Ramesh Kolhu Wale. A family tradition since 1981.</p>
        <div className="mt-7 flex flex-wrap gap-2"><span className="border border-white/20 px-3 py-2 text-[8px] font-bold uppercase tracking-widest text-white/65">Agmark R.B.O. quality</span><span className="border border-white/20 px-3 py-2 text-[8px] font-bold uppercase tracking-widest text-white/65">Delhi NCR</span></div>
      </div>
      <div><p className="mb-6 text-[9px] font-bold uppercase tracking-[.2em] text-[#E7B18A]">Explore</p><ul className="space-y-4 text-xs text-white/65">{[{href:'/shop',label:'Shop the collection'},{href:'/shelf',label:'The virtual shelf'},{href:'/process',label:'Our method'},{href:'/about',label:'Our story'},{href:'/lab-reports',label:'Quality standards'}].map(x=><li key={x.href}><Link href={x.href} className="transition hover:text-white">{x.label}</Link></li>)}</ul></div>
      <div><p className="mb-6 text-[9px] font-bold uppercase tracking-[.2em] text-[#E7B18A]">Visit RKW</p><ul className="space-y-4 text-xs text-white/65">{SITE_CONFIG.stores.map(s=><li key={s.id}><Link href="/stores" className="transition hover:text-white"><span className="mb-1 block text-[8px] font-bold uppercase tracking-widest text-[#E7B18A]">{s.unitNumber}</span>{s.area}</Link></li>)}<li><Link href="/contact" className="inline-flex items-center gap-1 text-[#E7B18A]">All locations <FiArrowUpRight/></Link></li></ul></div>
      <div><p className="mb-6 text-[9px] font-bold uppercase tracking-[.2em] text-[#E7B18A]">Talk to us</p><div className="space-y-4 text-xs text-white/65"><a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="flex items-center gap-3 hover:text-white"><FiPhone className="text-[#E7B18A]"/>{SITE_CONFIG.contact.phone}</a><a href={`mailto:${SITE_CONFIG.contact.email}`} className="flex items-center gap-3 hover:text-white"><FiMail className="text-[#E7B18A]"/>{SITE_CONFIG.contact.email}</a><p className="flex items-start gap-3"><FiMapPin className="mt-0.5 shrink-0 text-[#E7B18A]"/><span>Delhi NCR · {SITE_CONFIG.contact.unitHours}<br/>Open all 7 days</span></p><a href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 bg-[#E7B18A] px-5 py-3 text-[9px] font-bold uppercase tracking-widest text-[#173C31] transition hover:bg-white"><FaWhatsapp/> WhatsApp RKW ↗</a></div></div>
    </div>
    <div className="border-t border-white/15"><div className="rkw-shell flex flex-col justify-between gap-3 py-5 text-[9px] uppercase tracking-[.12em] text-white/40 sm:flex-row"><span>© {new Date().getFullYear()} Ramesh Kolhu Wale. All rights reserved.</span><span>Made with care · Est. 1981</span></div></div>
  </footer>
);
