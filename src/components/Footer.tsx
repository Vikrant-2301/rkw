'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import {
  FiPhone,
  FiMapPin,
  FiArrowUp,
  FiArrowUpRight,
  FiNavigation,
  FiTruck,
  FiShield,
  FiAward,
  FiDroplet,
  FiClock,
  FiCheck,
} from 'react-icons/fi';
import { RKWLogo } from './RKWLogo';
import { SITE_CONFIG } from '@/config/site';

type Store = (typeof SITE_CONFIG.stores)[number] & { unitNumber?: string };

const COMING_SOON = /karawal|maujpur|moj\s?pur/i;

const ORDER_CHIPS = [
  'Yellow Mustard Oil',
  'Black Mustard Oil',
  'Desi Cow Ghee',
  'Desi Buffalo Ghee',
  'Dahi Bilona Cow Ghee',
  'Cold-Pressed Coconut Oil',
];

const PRODUCT_LINKS = [
  { href: '/shop?category=oil', label: 'Cold-Pressed Oils' },
  { href: '/shop?category=bilona-ghee', label: 'Bilona Ghee' },
  { href: '/product/yellow-mustard-oil', label: 'Yellow Mustard Oil' },
  { href: '/product/black-mustard-oil', label: 'Black Mustard Oil' },
  { href: '/product/desi-cow-ghee', label: 'Desi Cow Ghee' },
  { href: '/product/desi-buffalo-ghee', label: 'Desi Buffalo Ghee' },
  { href: '/product/dahi-bilona-desi-cow-ghee', label: 'Dahi Bilona Cow Ghee' },
  { href: '/product/dahi-bilona-desi-buffalo-ghee', label: 'Dahi Bilona Buffalo Ghee' },
  { href: '/product/cold-pressed-coconut-oil', label: 'Cold-Pressed Coconut Oil' },
];

const COMPANY_LINKS = [
  { href: '/stores', label: 'Find Nearest Unit' },
  { href: '/about', label: 'Our Story (Since 1981)' },
  { href: '/shelf', label: '3D Virtual Shelf' },
  { href: '/shop', label: 'Shop All' },
  { href: '/contact', label: 'Contact & Visit' },
];

const MARQUEE = [
  '100% Cold-Pressed',
  'Pure Bilona Ghee',
  'Pressed Fresh Before Your Eyes',
  '100% Pure & Authentic',
  'Since 1981',
  'Free Delhi NCR Delivery Above ₹799',
  'No Chemicals. No Shortcuts.',
];

/* ---- open / closed in IST from a string like "9 AM - 9 PM" ---- */
const to24 = (h: string, m: string | undefined, ap: string) => {
  let hh = parseInt(h, 10) % 12;
  if (/pm/i.test(ap)) hh += 12;
  return hh * 60 + (m ? parseInt(m, 10) : 0);
};
const isOpenNow = (hours: string, now: Date): boolean | null => {
  const m = hours.match(
    /(\d{1,2})(?::(\d{2}))?\s*(AM|PM)\s*(?:-|–|—|to)\s*(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i
  );
  if (!m) return null;
  const open = to24(m[1], m[2], m[3]);
  const close = to24(m[4], m[5], m[6]);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const cur =
    (parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10) % 24) * 60 +
    parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  return close > open ? cur >= open && cur < close : cur >= open || cur < close;
};

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  const yearsOfTrust = year - 1981;
  const stores = SITE_CONFIG.stores as unknown as Store[];

  const [now, setNow] = useState<Date | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60000);
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearInterval(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const toggle = (p: string) =>
    setPicked((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));

  const orderHref = useMemo(() => {
    const text = picked.length
      ? `Hello Ramesh Kolhu Wale! I want to order:\n${picked.map((p) => `• ${p}`).join('\n')}\nPlease share sizes & prices.`
      : 'Hello RKW, I want to order pure cold-pressed oils & Bilona ghee!';
    return `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(text)}`;
  }, [picked]);

  const marqueeItems = [...MARQUEE, ...MARQUEE];

  return (
    <footer className="relative bg-[#06121F] text-[#C8D7E6] overflow-hidden">
      <style>{`
        @keyframes rkwf-marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes rkwf-sheen { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes rkwf-drop { 0%{transform:translateY(-10px);opacity:0} 20%{opacity:1} 100%{transform:translateY(120px);opacity:0} }
        @keyframes rkwf-ring { 0%{transform:scale(.6);opacity:.8} 100%{transform:scale(2.6);opacity:0} }
        .rkwf-marquee{animation:rkwf-marquee 38s linear infinite}
        .rkwf-marquee:hover{animation-play-state:paused}
        .rkwf-sheen{background:linear-gradient(100deg,#1b3a5c 0%,#1b3a5c 38%,#F5E6B0 50%,#1b3a5c 62%,#1b3a5c 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:rkwf-sheen 7s linear infinite}
        .rkwf-ring{position:absolute;inset:0;border-radius:9999px;animation:rkwf-ring 2s ease-out infinite}
        .rkwf-link{position:relative;display:inline-flex;align-items:center;gap:6px}
        .rkwf-link::after{content:'';position:absolute;left:0;bottom:-3px;height:1px;width:0;background:#F5E6B0;transition:width .3s ease}
        .rkwf-link:hover::after{width:100%}
        @media (prefers-reduced-motion: reduce){ .rkwf-marquee,.rkwf-sheen,.rkwf-ring{animation:none !important} }
      `}</style>

      {/* ambient glows + grain grid */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[#163A60]/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full bg-[#B8860B]/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ===== Trust marquee ===== */}
      <div className="relative border-b border-[#163A60]/70 bg-[#0A1C30]/80 backdrop-blur overflow-hidden">
        <div className="flex w-max rkwf-marquee py-3.5">
          {marqueeItems.map((m, i) => (
            <span
              key={i}
              className="flex items-center gap-4 px-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#93B5D9] whitespace-nowrap"
            >
              {m}
              <FiDroplet className="w-3.5 h-3.5 text-[#B8860B]" />
            </span>
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== Hero CTA: build-your-order ===== */}
        <div className="pt-16 sm:pt-24 pb-14 grid lg:grid-cols-5 gap-10 items-end">
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#F5E6B0] mb-5">
              <span className="w-8 h-px bg-[#F5E6B0]" />
              {yearsOfTrust} years of pressing, one drop at a time
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.02] font-normal">
              Taste what{' '}
              <span className="italic text-[#F5E6B0]">purity</span>
              <br className="hidden sm:block" /> actually tastes like.
            </h2>
            <p className="mt-6 text-[#8EA5BC] max-w-xl font-light leading-relaxed">
              100% pure cold-pressed oils and Bilona ghee, pressed fresh before your eyes since 1981. Pick what you
              need and we&apos;ll take it from there on WhatsApp.
            </p>
          </div>

          <div className="lg:col-span-2 relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 sm:p-6 shadow-2xl">
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#F5E6B0]/70 to-transparent" />
            <div className="text-xs font-bold uppercase tracking-widest text-[#F5E6B0] mb-3">
              Order in 10 seconds
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {ORDER_CHIPS.map((c) => {
                const on = picked.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggle(c)}
                    aria-pressed={on}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      on
                        ? 'bg-[#F5E6B0] text-[#0E2A47] border-[#F5E6B0] scale-[1.03]'
                        : 'bg-transparent text-[#C8D7E6] border-white/15 hover:border-[#F5E6B0]/60'
                    }`}
                  >
                    {on && <FiCheck className="w-3 h-3" />}
                    {c}
                  </button>
                );
              })}
            </div>
            <a
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-[#25D366]/20 hover:-translate-y-0.5"
            >
              <FaWhatsapp className="w-5 h-5" />
              {picked.length ? `Send ${picked.length} item${picked.length > 1 ? 's' : ''} on WhatsApp` : 'Order on WhatsApp'}
              <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <p className="mt-3 text-[11px] text-center text-[#8EA5BC] flex items-center justify-center gap-1.5">
              <FiTruck className="w-3.5 h-3.5 text-[#B8860B]" />
              Free Delhi NCR delivery above ₹799 · ₹100 below
            </p>
          </div>
        </div>

        {/* ===== Units strip ===== */}
        <div className="pb-14">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest">Visit a Unit</h3>
            <Link href="/stores" className="rkwf-link text-xs font-semibold text-[#F5E6B0]">
              All units &amp; live map <FiArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stores.map((s) => {
              const soon = COMING_SOON.test(`${s.name} ${s.area}`);
              const open = !soon && now ? isOpenNow(s.hours, now) : null;
              return (
                <a
                  key={String(s.id)}
                  href={soon ? '/stores' : s.mapUrl}
                  target={soon ? undefined : '_blank'}
                  rel={soon ? undefined : 'noopener noreferrer'}
                  className="group relative rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-5 hover:border-[#F5E6B0]/50 hover:-translate-y-1 transition-all overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold tracking-widest text-[#F5E6B0] uppercase">
                      {s.unitNumber || 'UNIT'}
                    </span>
                    {soon ? (
                      <span className="text-[10px] font-bold tracking-wider text-[#0E2A47] bg-[#F5E6B0] px-2 py-0.5 rounded-full">
                        SOON
                      </span>
                    ) : open !== null ? (
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold ${
                          open ? 'text-emerald-300' : 'text-rose-300'
                        }`}
                      >
                        <span className="relative flex w-2 h-2">
                          {open && <span className="rkwf-ring bg-emerald-400/60" />}
                          <span
                            className={`relative w-2 h-2 rounded-full ${open ? 'bg-emerald-400' : 'bg-rose-400'}`}
                          />
                        </span>
                        {open ? 'Open now' : 'Closed'}
                      </span>
                    ) : null}
                  </div>
                  <div className="font-serif text-lg text-white leading-snug mb-1.5">
                    {s.name.replace(/^RKW\s+Unit-\d+:\s*/i, '')}
                  </div>
                  <div className="text-xs text-[#8EA5BC] leading-relaxed line-clamp-2">{s.address}</div>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#93B5D9] group-hover:text-[#F5E6B0] transition-colors">
                    {soon ? 'Opening soon' : <>Get directions</>}
                    {!soon && <FiNavigation className="w-3.5 h-3.5" />}
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* ===== Link columns ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-14 border-t border-white/10">
          <div className="lg:col-span-4 space-y-5">
            <RKWLogo size="md" theme="light" variant="horizontal" />
            <p className="text-sm leading-relaxed text-[#8EA5BC] max-w-sm font-light">
              Preserving India&apos;s sacred heritage of 100% pure cold-pressed oils and pure Bilona ghee since
              1981. Every drop pressed fresh before your eyes.
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[#1E4E80] text-[#93B5D9] bg-[#0E2A47]/60 rounded-full font-medium">
                <FiAward className="w-3.5 h-3.5 text-[#B8860B]" /> 100% Pure &amp; Chemical-Free
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-[#1E4E80] text-[#93B5D9] bg-[#0E2A47]/60 rounded-full font-medium">
                <FiShield className="w-3.5 h-3.5 text-[#B8860B]" /> 100% Pure Guarantee
              </span>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Products</h4>
            <ul className="space-y-2.5 text-sm">
              {PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="rkwf-link text-[#8EA5BC] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="rkwf-link text-[#8EA5BC] hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-widest">Talk to us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <FaWhatsapp className="w-4 h-4 flex-shrink-0 text-[#25D366]" />
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
                    'Hello RKW, I want to order pure cold-pressed oils & Bilona ghee!'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-[#8EA5BC]"
                >
                  WhatsApp: <strong className="text-white">+91 9217744380</strong>
                </a>
              </li>
              <li className="space-y-1.5 pt-1.5 border-t border-white/5">
                <div className="text-xs text-[#8EA5BC] font-medium flex items-center gap-2">
                  <FiPhone className="w-3.5 h-3.5 text-[#B8860B]" /> Store Contacts:
                </div>
                <div className="pl-5 space-y-1 text-xs">
                  <div>
                    <span className="text-[#8EA5BC]">Khureji:</span>{' '}
                    <a href="tel:+919217744381" className="text-white hover:underline font-semibold">+91 9217744381</a>
                  </div>
                  <div>
                    <span className="text-[#8EA5BC]">New Ashok Nagar:</span>{' '}
                    <a href="tel:+919217744382" className="text-white hover:underline font-semibold">+91 9217744382</a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-2.5 text-[#F5E6B0] text-xs font-medium">
                <FiClock className="w-4 h-4 flex-shrink-0 text-[#B8860B]" />
                Unit Hours: {SITE_CONFIG.contact.unitHours}
              </li>
              <li className="flex items-start gap-2.5 text-xs text-[#8EA5BC]">
                <FiMapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#B8860B]" />
                {stores.length} live units open across Delhi NCR
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===== Giant wordmark ===== */}
      <div className="relative select-none overflow-hidden px-4" aria-hidden>
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="rkwf-sheen font-serif font-bold text-center leading-[0.9] tracking-tight whitespace-nowrap text-[clamp(1.35rem,5.6vw,5.8rem)] pb-2">
            RAMESH KOLHU WALE
          </div>
        </div>
        {/* oil drip decoration */}
        <span
          className="absolute left-1/2 top-0 w-2 h-3 rounded-full bg-[#B8860B]"
          style={{ animation: 'rkwf-drop 3.2s ease-in infinite' }}
        />
      </div>

      {/* ===== Bottom bar ===== */}
      <div className="relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#6B85A0]">
          <p>
            © {year} Ramesh Kolhu Wale. Since 1981. All rights reserved. Made with care in Delhi.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/stores" className="hover:text-white transition-colors">Find Unit</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/shelf" className="hover:text-white transition-colors">Virtual Shelf</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      {/* back to top — stacked cleanly above WhatsApp floating button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`fixed bottom-24 right-6 z-40 w-11 h-11 rounded-full bg-[#F5E6B0] text-[#0E2A47] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <FiArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};