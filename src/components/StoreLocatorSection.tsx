'use client';

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site';
import {
  FiMapPin,
  FiClock,
  FiPhone,
  FiSearch,
  FiNavigation,
  FiCheckCircle,
  FiTruck,
  FiCrosshair,
  FiCopy,
  FiCheck,
  FiShare2,
  FiBell,
  FiZap,
  FiExternalLink,
  FiX,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface StoreLocatorSectionProps {
  id?: string;
  className?: string;
  showTitle?: boolean;
  showBanner?: boolean;
}

type Store = (typeof SITE_CONFIG.stores)[number] & {
  unitNumber?: string;
  lat?: number;
  lng?: number;
};

type Filter = 'all' | 'open' | 'live' | 'east' | 'northeast';

/* ------------------------------------------------------------------ */
/*  Coordinates                                                        */
/*  Karawal Nagar is exact (from the Google Maps link you shared).     */
/*  The others are close approximations: put exact `lat` / `lng` on   */
/*  the store in SITE_CONFIG and they will override these.            */
/* ------------------------------------------------------------------ */
const COORD_FALLBACKS: { match: RegExp; lat: number; lng: number }[] = [
  { match: /karawal/i, lat: 28.713226318359375, lng: 77.26315307617188 },
  { match: /khureji/i, lat: 28.6446813, lng: 77.2800298 },
  { match: /ashok/i, lat: 28.594224, lng: 77.3112919 },
  { match: /maujpur|moj\s?pur/i, lat: 28.6967, lng: 77.2763 },
];

const getCoords = (s: Store): { lat: number; lng: number } | null => {
  if (typeof s.lat === 'number' && typeof s.lng === 'number') return { lat: s.lat, lng: s.lng };
  const hay = `${s.name} ${s.area} ${s.address}`;
  const hit = COORD_FALLBACKS.find((c) => c.match.test(hay));
  return hit ? { lat: hit.lat, lng: hit.lng } : null;
};

const isComingSoon = (s: Store) => Boolean((s as any).comingSoon);

const haversineKm = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

/* ------------------------------------------------------------------ */
/*  Live open / closed status (IST), parsed from the hours string      */
/* ------------------------------------------------------------------ */
const to24 = (h: string, m: string | undefined, ap: string) => {
  let hh = parseInt(h, 10) % 12;
  if (/pm/i.test(ap)) hh += 12;
  return hh * 60 + (m ? parseInt(m, 10) : 0);
};

const getOpenStatus = (hours: string, now: Date) => {
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
  const hh = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10) % 24;
  const mm = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
  const cur = hh * 60 + mm;
  const isOpen = close > open ? cur >= open && cur < close : cur >= open || cur < close;
  const fmt = (mins: number) => {
    const h = Math.floor(mins / 60);
    const mn = mins % 60;
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}${mn ? ':' + String(mn).padStart(2, '0') : ''} ${h >= 12 ? 'PM' : 'AM'}`;
  };
  let minsLeft = isOpen ? (close - cur + 1440) % 1440 : (open - cur + 1440) % 1440;
  const label = isOpen
    ? minsLeft <= 60
      ? `Closing in ${minsLeft} min`
      : `Open until ${fmt(close)}`
    : minsLeft <= 120
    ? `Opens in ${minsLeft} min`
    : `Opens at ${fmt(open)}`;
  return { isOpen, label };
};

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */
const Counter: React.FC<{ to: number; prefix?: string; suffix?: string }> = ({ to, prefix = '', suffix = '' }) => {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      const start = performance.now();
      const dur = 1400;
      const tick = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * to));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <span ref={ref}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export const StoreLocatorSection: React.FC<StoreLocatorSectionProps> = ({
  id = 'find-store',
  className = '',
  showTitle = false,
  showBanner = false,
}) => {
  const allStores = SITE_CONFIG.stores as unknown as Store[];
  const liveStores = useMemo(() => allStores.filter((s) => !isComingSoon(s)), [allStores]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [now, setNow] = useState<Date | null>(null);
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);
  const [geoState, setGeoState] = useState<'idle' | 'loading' | 'denied'>('idle');
  const [showLocatedPopup, setShowLocatedPopup] = useState(false);
  const [showDirectionPath, setShowDirectionPath] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [pin, setPin] = useState('');
  const [burst, setBurst] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const selected = useMemo(
    () => allStores.find((s) => s.id === selectedId) || liveStores[0] || allStores[0],
    [allStores, liveStores, selectedId]
  );

  const distanceTo = useCallback(
    (s: Store) => {
      const c = getCoords(s);
      return userLoc && c ? haversineKm(userLoc, c) : null;
    },
    [userLoc]
  );

  const filteredStores = useMemo(() => {
    const list = allStores.filter((store) => {
      const soon = isComingSoon(store);
      if (selectedFilter === 'live' && !store.hasLiveExtraction) return false;
      if (selectedFilter === 'open') {
        if (soon) return false;
        const st = now ? getOpenStatus(store.hours, now) : null;
        if (!st?.isOpen) return false;
      }
      if (
        selectedFilter === 'east' &&
        !store.area.includes('East Delhi') &&
        !store.area.includes('Khureji') &&
        !store.area.includes('Ashok')
      )
        return false;
      if (
        selectedFilter === 'northeast' &&
        !store.area.includes('North East Delhi') &&
        !store.area.includes('Maujpur') &&
        !store.area.includes('Karawal')
      )
        return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        store.name.toLowerCase().includes(q) ||
        store.address.toLowerCase().includes(q) ||
        store.area.toLowerCase().includes(q) ||
        (store.unitNumber || '').toLowerCase().includes(q) ||
        store.pincode.includes(q) ||
        store.pincodesCovered.some((p) => p.includes(q))
      );
    });
    // live stores first, coming soon last; then by distance if known
    return list.sort((a, b) => {
      const sa = isComingSoon(a) ? 1 : 0;
      const sb = isComingSoon(b) ? 1 : 0;
      if (sa !== sb) return sa - sb;
      const da = distanceTo(a);
      const db = distanceTo(b);
      if (da !== null && db !== null) return da - db;
      return 0;
    });
  }, [allStores, searchQuery, selectedFilter, now, distanceTo]);

  const allPincodes = useMemo(() => {
    const set = new Set<string>();
    liveStores.forEach((s) => {
      set.add(s.pincode);
      s.pincodesCovered.forEach((p) => set.add(p));
    });
    return set;
  }, [liveStores]);

  /* ---------- delivery checker ---------- */
  const pinResult = useMemo(() => {
    if (pin.length !== 6) return null;
    const direct = liveStores.find((s) => s.pincode === pin || s.pincodesCovered.includes(pin));
    if (direct) return { kind: 'direct' as const, store: direct };
    if (/^(110|1220|1210|2013|2010|2012)/.test(pin)) return { kind: 'ncr' as const };
    return { kind: 'unknown' as const };
  }, [pin, liveStores]);

  useEffect(() => {
    if (pinResult && pinResult.kind !== 'unknown') setBurst((b) => b + 1);
  }, [pinResult?.kind, pin]); // eslint-disable-line react-hooks/exhaustive-deps

  /* ---------- geolocation & nearest store ---------- */
  const applyUserLocation = useCallback(
    (loc: { lat: number; lng: number }) => {
      setUserLoc(loc);
      setGeoState('idle');
      const nearest = allStores
        .map((s) => ({ s, c: getCoords(s) }))
        .filter((x): x is { s: Store; c: { lat: number; lng: number } } => Boolean(x.c))
        .sort((a, b) => haversineKm(loc, a.c) - haversineKm(loc, b.c))[0];
      if (nearest) {
        setSelectedId(nearest.s.id);
        setShowLocatedPopup(true);
        setShowDirectionPath(true);
        setIsNavigating(true);
        setBurst((b) => b + 1);
        setTimeout(() => {
          mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 80);
      }
    },
    [allStores]
  );

  const findNearest = useCallback(() => {
    setGeoState('loading');
    if (typeof window === 'undefined' || !navigator.geolocation) {
      applyUserLocation({ lat: 28.6304, lng: 77.2773 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        applyUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      () => {
        // Fallback so user always sees the nearest unit and live route experience even if permission is prompt/blocked
        applyUserLocation({ lat: 28.6304, lng: 77.2773 });
      },
      { enableHighAccuracy: true, timeout: 6000 }
    );
  }, [applyUserLocation]);

  const copyAddress = async (s: Store) => {
    try {
      await navigator.clipboard.writeText(`${s.name}, ${s.address}`);
      setCopiedId(s.id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      /* ignore */
    }
  };

  const shareStore = (s: Store) => {
    const text = `Check out ${s.name} – fresh cold-pressed oils & Bilona ghee!\n${s.address}\n${s.mapUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const selectAndScroll = (s: Store) => {
    setSelectedId(s.id);
    mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selCoords = getCoords(selected);
  const distanceKm = userLoc && selCoords ? haversineKm(userLoc, selCoords) : null;
  const driveMinutes = distanceKm !== null ? Math.max(4, Math.round(distanceKm * 3.2 + 3)) : null;

  const embedSrc = useMemo(() => {
    if (isNavigating && userLoc && selCoords) {
      return `https://www.google.com/maps?saddr=${userLoc.lat},${userLoc.lng}&daddr=${selCoords.lat},${selCoords.lng}&hl=en&output=embed`;
    }
    if (selCoords) {
      return `https://www.google.com/maps?q=${selCoords.lat},${selCoords.lng}&z=16&hl=en&output=embed`;
    }
    return `https://www.google.com/maps?q=${encodeURIComponent(selected.address)}&z=16&hl=en&output=embed`;
  }, [isNavigating, userLoc, selCoords, selected.address]);

  const directionsUrl = useMemo(() => {
    if (selCoords) {
      if (userLoc) {
        return `https://www.google.com/maps/dir/?api=1&origin=${userLoc.lat},${userLoc.lng}&destination=${selCoords.lat},${selCoords.lng}`;
      }
      return `https://www.google.com/maps/dir/?api=1&destination=${selCoords.lat},${selCoords.lng}`;
    }
    return selected.mapUrl;
  }, [selCoords, userLoc, selected.mapUrl]);

  const wa = (text: string) =>
    `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(text)}`;

  const confetti = useMemo(
    () =>
      Array.from({ length: 26 }).map((_, i) => ({
        left: (i * 37) % 100,
        delay: (i % 9) * 0.06,
        color: ['#F5E6B0', '#B8860B', '#25D366', '#EBF2F8', '#ffffff'][i % 5],
        rot: (i * 53) % 360,
      })),
    []
  );

  return (
    <section id={id} className={`py-16 sm:py-24 bg-[#FAF8F3] relative overflow-hidden ${className}`}>
      <style>{`
        @keyframes rkw-pulse { 0%{transform:scale(.6);opacity:.8} 100%{transform:scale(2.6);opacity:0} }
        @keyframes rkw-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes rkw-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes rkw-rise { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rkw-confetti { 0%{transform:translateY(0) rotate(0);opacity:1} 100%{transform:translateY(240px) rotate(540deg);opacity:0} }
        @keyframes rkw-drip { 0%{transform:translateY(-4px) scale(.8);opacity:0} 30%{opacity:1} 100%{transform:translateY(22px) scale(1);opacity:0} }
        @keyframes rkw-dash { to{stroke-dashoffset:-40} }
        @keyframes rkw-route-walker {
          0% { left: 4%; opacity: 0.2; transform: translateY(-50%) scale(0.9); }
          25% { opacity: 1; }
          75% { opacity: 1; }
          95% { left: 88%; opacity: 0.2; transform: translateY(-50%) scale(1.05); }
          100% { left: 88%; opacity: 0; }
        }
        .rkw-route-walker {
          animation: rkw-route-walker 2.4s ease-in-out infinite;
        }
        .rkw-map-frame {
          filter: contrast(1.04) saturate(0.92) sepia(0.06);
        }
        .rkw-rise{animation:rkw-rise .6s cubic-bezier(.2,.8,.2,1) both}
        .rkw-shimmer{background:linear-gradient(110deg,#F5E6B0 20%,#fff8d6 40%,#F5E6B0 60%);background-size:200% 100%;animation:rkw-shimmer 2.4s linear infinite}
        .rkw-ring{position:absolute;inset:0;border-radius:9999px;animation:rkw-pulse 2s ease-out infinite}
        .rkw-dash{animation:rkw-dash 1.4s linear infinite}
        @media (prefers-reduced-motion: reduce){ .rkw-rise,.rkw-shimmer,.rkw-ring,.rkw-dash,.rkw-route-walker{animation:none !important} }
      `}</style>

      {/* Ambient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EBF2F8]/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5E6B0]/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 rkw-rise">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#EBF2F8] text-[#0E2A47] text-xs font-semibold rounded-full uppercase tracking-wider mb-4 border border-[#163A60]/10">
              <FiMapPin className="w-3.5 h-3.5" />
              Delhi NCR Experience Stores &amp; Units
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl text-[#1C1A16] font-normal leading-[1.05]">
              Watch your oil get{' '}
              <span className="relative inline-block">
                <span className="relative z-10 italic text-[#0E2A47]">pressed.</span>
                <span className="absolute left-0 right-0 bottom-1 h-3 sm:h-4 bg-[#F5E6B0] -z-0 rounded-sm" />
              </span>
            </h2>
            <p className="text-[#5A5248] text-base sm:text-lg mt-5 font-light leading-relaxed">
              Walk into an RKW Unit and see fresh cold-press extraction happen right in front of you, or pick up
              pure Bilona Desi Ghee. Open everyday from <strong>{SITE_CONFIG.contact.unitHours}</strong>.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mt-6 sm:mt-8">
              {[
                { n: liveStores.length, label: 'Units Open', prefix: '', suffix: '' },
                { n: allStores.length - liveStores.length, label: 'Opening Soon', prefix: '', suffix: '' },
                { n: allPincodes.size, label: 'Pincodes Covered', prefix: '', suffix: '+' },
                { n: 799, label: 'Free Delivery Above', prefix: '₹', suffix: '' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/80 backdrop-blur border border-[#E8E0D0] rounded-2xl py-4 px-2 shadow-xs"
                >
                  <div className="font-serif text-2xl sm:text-3xl text-[#0E2A47] font-bold">
                    <Counter to={s.n} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-[#8A7E6E] font-semibold mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Free delivery & WhatsApp banner */}
        {showBanner && (
          <div className="bg-gradient-to-r from-[#0E2A47] via-[#163A60] to-[#0A1C30] text-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg border border-[#1E4E80]/40 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-[#F5E6B0]/10 blur-2xl" />
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4 text-left">
                <div
                  className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-[#F5E6B0]"
                  style={{ animation: 'rkw-float 3s ease-in-out infinite' }}
                >
                  <FiTruck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-base sm:text-lg">Free Home Delivery in Delhi NCR</span>
                    <span className="text-xs bg-[#B8860B] text-white px-2.5 py-0.5 rounded-full font-semibold">
                      Orders Above ₹799
                    </span>
                  </div>
                  <p className="text-[#C8D7E6] text-xs sm:text-sm mt-1">
                    ₹100 delivery fee on orders below ₹799. Same-day &amp; express doorstep delivery across Delhi NCR.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <a
                  href={wa(
                    'Hello Ramesh Kolhu Wale! I would like to place an order for pure cold-pressed oils & Bilona ghee with delivery in Delhi NCR.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-5 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-sm rounded-full transition-all shadow-md hover:scale-[1.02]"
                >
                  <FaWhatsapp className="w-4 h-4" />
                  <span>Order on WhatsApp: {SITE_CONFIG.contact.whatsapp}</span>
                </a>
                <Link
                  href="/shop"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-medium text-sm rounded-full transition-colors border border-white/20"
                >
                  Shop Online
                </Link>
              </div>
            </div>
          </div>
        )}


        {/* Interactive Google Map + Nearest Unit Finder */}
        <div ref={mapRef} className="mb-10 scroll-mt-24">
          <div className="bg-white rounded-3xl border border-[#E8E0D0] shadow-md overflow-hidden relative">
            {/* Map Header with Unit Info & Action Buttons */}
            <div className="bg-gradient-to-r from-[#0E2A47] via-[#163A60] to-[#0A1C30] text-white p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-[#F2B705] text-[#0E2A47]">
                    {isComingSoon(selected)
                      ? '✦ Coming Soon • Live Extraction Unit'
                      : showLocatedPopup
                      ? 'Nearest Unit Located'
                      : '● Live Extraction Unit Open'}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      isComingSoon(selected)
                        ? 'text-amber-200 bg-amber-950/60 border border-amber-500/30'
                        : 'text-emerald-300 bg-emerald-950/60 border border-emerald-500/30'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isComingSoon(selected) ? 'bg-[#F2B705] animate-ping' : 'bg-emerald-400 animate-pulse'
                      }`}
                    />
                    {isComingSoon(selected) ? 'Launching Soon in Delhi NCR' : 'Open Today: 10:00 AM – 8:30 PM'}
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                  {selected.name.replace(/^RKW\s+Unit-\d+:\s*/i, '')}
                  <span className="text-[#F5E6B0] text-base sm:text-lg font-sans ml-2.5 font-light">
                    ({selected.area.split('/')[0].trim()})
                  </span>
                </h3>
                <p className="text-[#C8D7E6] text-xs sm:text-sm mt-1 max-w-xl">
                  {isComingSoon(selected)
                    ? '100% pure traditional live Kolhu extraction unit arriving soon. Exact address unveiling on launch day!'
                    : selected.address}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-shrink-0">
                <button
                  onClick={findNearest}
                  disabled={geoState === 'loading'}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F2B705] hover:bg-[#d9a304] text-[#0E2A47] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:scale-[1.02] cursor-pointer disabled:opacity-75"
                >
                  <FiCrosshair className={`w-4 h-4 ${geoState === 'loading' ? 'animate-spin' : ''}`} />
                  {geoState === 'loading' ? 'Locating nearest unit…' : userLoc ? 'Update my location' : 'Find a unit near me'}
                </button>
                {isComingSoon(selected) ? (
                  <a
                    href={wa(`Hello RKW! Please notify me when your new ${selected.name} live extraction unit launches. Send me launch day offers!`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl border border-white/20 transition-colors"
                  >
                    <FiBell className="w-3.5 h-3.5 text-[#F2B705]" />
                    <span>Notify Me on Launch</span>
                  </a>
                ) : (
                  <a
                    href={selected.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl border border-white/20 transition-colors"
                  >
                    <FiExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Google Maps</span>
                  </a>
                )}
              </div>
            </div>

            {/* Quick unit switcher tabs */}
            <div className="bg-[#FAF8F3] border-b border-[#E8E0D0] px-4 sm:px-6 py-2.5 flex items-center gap-2 overflow-x-auto rkw-no-bar">
              <span className="text-[11px] font-bold text-[#8A7E6E] uppercase tracking-wider mr-2 shrink-0">
                Switch Unit:
              </span>
              {allStores.map((store) => {
                const isCur = store.id === selected.id;
                const soon = isComingSoon(store);
                const d = distanceTo(store);
                return (
                  <button
                    key={String(store.id)}
                    onClick={() => setSelectedId(store.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isCur
                        ? 'bg-[#0E2A47] text-white shadow-xs'
                        : 'bg-white hover:bg-[#EBF2F8] text-[#3A3228] border border-[#E8E0D0]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isCur ? 'bg-[#F2B705]' : soon ? 'bg-amber-400' : 'bg-emerald-500'
                      }`}
                    />
                    <span>{store.name.replace(/^RKW\s+/i, '')}</span>
                    {soon ? (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 font-bold">
                        Soon
                      </span>
                    ) : (
                      d !== null && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            isCur ? 'bg-white/20 text-[#F5E6B0]' : 'bg-stone-100 text-[#8A7E6E]'
                          }`}
                        >
                          {d.toFixed(1)} km
                        </span>
                      )
                    )}
                  </button>
                );
              })}
            </div>

            {/* Live Direction Path Animation Banner */}
            {showDirectionPath && userLoc && distanceKm !== null && (
              <div className="bg-gradient-to-r from-[#0A1C30] via-[#0E2A47] to-[#163A60] text-white px-4 sm:px-6 py-3 border-b border-[#1E4E80] flex flex-col sm:flex-row items-center justify-between gap-3 rkw-rise">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="relative flex h-3 w-3 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-emerald-300">Live Route Active</div>
                    <div className="text-[11px] text-[#C8D7E6]">
                      Distance: <strong className="text-[#F2B705]">{distanceKm.toFixed(1)} km</strong> • ~{driveMinutes} mins drive in Delhi traffic
                    </div>
                  </div>
                </div>

                {/* Animated Direction Runner */}
                <div className="flex items-center gap-2 w-full sm:w-80 justify-between bg-black/30 px-3.5 py-1.5 rounded-full border border-white/10 text-[11px]">
                  <span className="flex items-center gap-1 text-[#C8D7E6] shrink-0 font-medium">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" /> You
                  </span>

                  <div className="relative flex-1 mx-3 h-4 flex items-center overflow-hidden">
                    <div className="w-full border-t border-dashed border-[#F2B705]/40" />
                    <div className="absolute top-1/2 rkw-route-walker">
                      <FiNavigation className="w-3.5 h-3.5 text-[#F2B705] rotate-90" />
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-[#F2B705] font-semibold shrink-0">
                    <FiMapPin className="w-3.5 h-3.5" /> {selected.name.replace(/^RKW\s+Unit-\d+:\s*/i, '')}
                  </span>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={() => setIsNavigating((prev) => !prev)}
                    className="text-xs text-[#F5E6B0] hover:text-white underline cursor-pointer"
                  >
                    {isNavigating ? 'Show Store Pin' : 'Show Route Path'}
                  </button>
                  <button
                    onClick={() => {
                      setShowDirectionPath(false);
                      setIsNavigating(false);
                    }}
                    className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 cursor-pointer"
                    title="Dismiss Route Banner"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Google Map Container */}
            <div className="relative w-full h-[340px] sm:h-[540px] lg:h-[580px] bg-[#FAF8F3]">
              <iframe
                key={`${selected.id}-${isNavigating ? 'nav' : 'pin'}`}
                title={`Google Map of ${selected.name}`}
                src={embedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 rkw-map-frame"
                allowFullScreen
              />

              {/* Floating "Store Located!" Popup Card */}
              {showLocatedPopup && (
                <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md z-20 rkw-rise">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#E8E0D0] text-[#1C1A16] relative">
                    <button
                      onClick={() => setShowLocatedPopup(false)}
                      className="absolute top-3.5 right-3.5 text-[#8A7E6E] hover:text-[#1C1A16] p-1 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Close popup"
                      aria-label="Close popup"
                    >
                      <FiX className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-full">
                        <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        Store Located!
                      </span>
                      {distanceKm !== null && (
                        <span className="text-xs font-semibold text-[#0E2A47] bg-[#F5E6B0] px-2.5 py-1 rounded-full">
                          {distanceKm.toFixed(1)} km away (~{driveMinutes} min)
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#0E2A47] leading-snug">
                      {selected.name}
                    </h4>
                    <p className="text-xs text-[#5A5248] mt-1 leading-relaxed">
                      {selected.address}
                    </p>

                    <div className="flex items-center gap-3 mt-3 text-xs text-[#8A7E6E] font-medium pt-3 border-t border-stone-200">
                      <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Open: 10:00 AM – 8:30 PM
                      </span>
                      <span>•</span>
                      <span>All 7 Days Open</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#0E2A47] hover:bg-[#163A60] text-white text-xs font-bold rounded-xl transition-all shadow-xs text-center"
                      >
                        <FiNavigation className="w-3.5 h-3.5 text-[#F2B705]" />
                        Start Directions
                      </a>
                      <a
                        href={`tel:${selected.phone || SITE_CONFIG.contact.phone}`}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#FAF8F3] hover:bg-[#F2EEE5] text-[#0E2A47] text-xs font-bold rounded-xl transition-all shadow-xs text-center border border-[#E8E0D0]"
                      >
                        <FiPhone className="w-3.5 h-3.5 text-[#B8860B]" />
                        Call Unit
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search + filters */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#E8E0D0] shadow-xs mb-8">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A7E6E]" />
              <input
                type="text"
                placeholder="Enter Pincode (e.g. 110051) or Area (Khureji, Maujpur)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#FAF8F3] border border-[#E8E0D0] rounded-xl text-sm text-[#1C1A16] placeholder-[#8A7E6E] focus:outline-none focus:border-[#0E2A47] focus:ring-1 focus:ring-[#0E2A47]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8A7E6E] hover:text-[#1C1A16] px-1.5 py-0.5 bg-stone-200 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto rkw-no-bar pb-1 md:pb-0">
              {(
                [
                  { id: 'all', label: `All Units (${allStores.length})` },
                  { id: 'open', label: '● Open Now' },
                  { id: 'live', label: 'Live Cold-Press' },
                  { id: 'east', label: 'East Delhi' },
                  { id: 'northeast', label: 'North East Delhi' },
                ] as { id: Filter; label: string }[]
              ).map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedFilter(pill.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedFilter === pill.id
                      ? 'bg-[#0E2A47] text-white shadow-xs'
                      : 'bg-[#FAF8F3] text-[#4A4035] hover:bg-[#EBF2F8] border border-[#E8E0D0]'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Store cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredStores.map((store, idx) => {
            const soon = isComingSoon(store);
            const status = !soon && now ? getOpenStatus(store.hours, now) : null;
            const dist = distanceTo(store);
            const isSel = store.id === selected.id;
            return (
              <div
                key={String(store.id)}
                onClick={() => setSelectedId(store.id)}
                style={{ animationDelay: `${idx * 90}ms` }}
                className={`rkw-rise relative bg-white rounded-2xl border p-4 sm:p-6 transition-all flex flex-col justify-between cursor-pointer hover:-translate-y-1 hover:shadow-xl ${
                  isSel ? 'border-[#0E2A47] ring-2 ring-[#0E2A47]/15 shadow-lg' : 'border-[#E8E0D0] hover:border-[#163A60]/30'
                } ${soon ? 'bg-gradient-to-br from-white to-[#FBF6E4]' : ''}`}
              >
                {soon && (
                  <div className="absolute top-0 right-0 overflow-hidden w-28 h-28 pointer-events-none rounded-tr-2xl">
                    <div className="rkw-shimmer absolute top-5 -right-9 rotate-45 w-36 text-center text-[10px] font-extrabold tracking-widest text-[#7A5A06] py-1">
                      COMING SOON
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                    <span className="text-[11px] font-bold tracking-wider text-white bg-[#0E2A47] px-3 py-1 rounded-full uppercase">
                      {store.unitNumber || 'UNIT'}
                    </span>
                    {!soon && (
                      <div className="flex items-center gap-2">
                        {dist !== null && (
                          <span className="text-[10px] font-bold text-[#0E2A47] bg-[#EBF2F8] px-2.5 py-0.5 rounded-full border border-[#163A60]/10">
                            {dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`} away
                          </span>
                        )}
                        {store.isFlagship ? (
                          <span className="text-[10px] font-bold tracking-wider text-[#B8860B] bg-[#F5E6B0]/70 px-2.5 py-0.5 rounded-full uppercase border border-[#B8860B]/20">
                            ★ Flagship Unit
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            Live Extraction Unit
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {status && (
                    <div
                      className={`inline-flex items-center gap-2 text-xs font-bold mb-3 px-3 py-1.5 rounded-full ${
                        status.isOpen ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                      }`}
                    >
                      <span className="relative flex w-2.5 h-2.5">
                        {status.isOpen && <span className="rkw-ring bg-emerald-500/60" />}
                        <span
                          className={`relative w-2.5 h-2.5 rounded-full ${status.isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`}
                        />
                      </span>
                      {status.isOpen ? 'Open now' : 'Closed'} · {status.label}
                    </div>
                  )}

                  {!soon && store.hasLiveExtraction && status?.isOpen && (
                    <div className="flex items-center gap-2 text-[11px] text-[#7A5A06] font-semibold mb-3">
                      <span className="relative inline-block w-3 h-4">
                        <span
                          className="absolute left-1/2 top-0 w-1.5 h-2 -ml-[3px] rounded-full bg-[#B8860B]"
                          style={{ animation: 'rkw-drip 1.6s ease-in infinite' }}
                        />
                      </span>
                      Fresh oil being pressed right now
                    </div>
                  )}

                  {soon ? (
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full mb-3">
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                        ✦ COMING SOON • LIVE EXTRACTION UNIT
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#0E2A47] leading-snug mb-2">
                        {store.name} — Launching Soon!
                      </h3>
                      <p className="text-sm text-[#5A5248] leading-relaxed mb-4">
                        We are bringing our pure live Kolhu cold-press extraction to {store.area.split('/')[0].trim()}! Stand and watch seeds crushed cold right before your eyes with nothing added and nothing refined out. Handcrafted Vedic Bilona Ghee also available.
                      </p>
                      <div className="bg-gradient-to-br from-[#0E2A47] to-[#163A60] text-white p-4 rounded-xl space-y-2 mb-4 text-xs">
                        <div className="flex items-center gap-2 text-[#F2B705] font-bold">
                          <FiZap className="w-3.5 h-3.5" />
                          <span>100% Traditional Live Kolhu (Ghani) Setup</span>
                        </div>
                        <div className="text-[#C8D7E6]">
                          <strong>Target Area:</strong> {store.area} (Covering {store.pincodesCovered.join(', ')})
                        </div>
                        <div className="text-xs text-amber-200">
                          Exact location &amp; launch date will be revealed on opening day!
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#1C1A16] leading-snug mb-2 pr-10">
                        {store.name.replace(/^RKW\s+Unit-\d+:\s*/i, '')}
                      </h3>
                      <p className="text-sm text-[#5A5248] leading-relaxed mb-4">{store.address}</p>

                      <div className="bg-[#FAF8F3] p-4 rounded-xl border border-[#E8E0D0] space-y-2 mb-4 text-xs text-[#5A5248]">
                        <div className="flex items-center gap-2 text-[#0E2A47] font-semibold">
                          <FiClock className="w-3.5 h-3.5 text-[#B8860B] flex-shrink-0" />
                          <span>Unit Hours: {store.hours}</span>
                        </div>
                        <div className="flex items-start gap-2 text-[#6B6155]">
                          <FiCheckCircle className="w-3.5 h-3.5 text-[#0E2A47] flex-shrink-0 mt-0.5" />
                          <span>
                            <strong>Landmark:</strong> {store.landmark}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#6B6155]">
                          <FiMapPin className="w-3.5 h-3.5 text-[#0E2A47] flex-shrink-0" />
                          <span>
                            <strong>Pincode:</strong> {store.pincode}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#F0EBE1] space-y-2" onClick={(e) => e.stopPropagation()}>
                  {soon ? (
                    <>
                      <a
                        href={wa(
                          `Hello RKW! Please notify me when your new ${store.name} live extraction unit launches. Send me launch day offers!`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-3 py-3 bg-[#0E2A47] hover:bg-[#163A60] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                      >
                        <FiBell className="w-3.5 h-3.5 text-[#F5E6B0]" />
                        <span>Notify me on opening day</span>
                      </a>
                      <p className="text-[11px] text-center text-[#8A7E6E]">
                        Until then, express home delivery is active across these pincodes.
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={store.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#0E2A47] hover:bg-[#163A60] text-white text-xs font-semibold rounded-xl transition-colors"
                        >
                          <FiNavigation className="w-3.5 h-3.5 text-[#F2B705]" />
                          <span>Get Directions</span>
                        </a>
                        <a
                          href={`tel:${store.phone || SITE_CONFIG.contact.phone}`}
                          className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#FAF8F3] hover:bg-[#F2EEE5] text-[#1C1A16] text-xs font-semibold rounded-xl transition-colors border border-[#E8E0D0]"
                        >
                          <FiPhone className="w-3.5 h-3.5 text-[#0E2A47]" />
                          <span>Call: {store.phone || SITE_CONFIG.contact.phone}</span>
                        </a>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => copyAddress(store)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 text-[#4A4035] text-[11px] font-semibold rounded-xl border border-dashed border-[#D8CFBC] hover:bg-[#FAF8F3] transition-colors cursor-pointer"
                        >
                          {copiedId === store.id ? (
                            <>
                              <FiCheck className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                            </>
                          ) : (
                            <>
                              <FiCopy className="w-3.5 h-3.5" /> Copy address
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => shareStore(store)}
                          className="flex items-center justify-center gap-1.5 px-3 py-2 text-[#4A4035] text-[11px] font-semibold rounded-xl border border-dashed border-[#D8CFBC] hover:bg-[#FAF8F3] transition-colors cursor-pointer"
                        >
                          <FiShare2 className="w-3.5 h-3.5" /> Share with a friend
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#E8E0D0] max-w-lg mx-auto">
            <FiMapPin className="w-10 h-10 text-[#8A7E6E] mx-auto mb-3" />
            <h4 className="font-serif text-lg text-[#1C1A16] font-semibold mb-1">
              {searchQuery ? <>No Unit matching &ldquo;{searchQuery}&rdquo;</> : 'No units match this filter right now'}
            </h4>
            <p className="text-sm text-[#5A5248] mb-4">
              We deliver fresh across all Delhi NCR pincodes! Order online or directly on WhatsApp.
            </p>
            <a
              href={wa(
                `Hello RKW! I am in pincode ${searchQuery || '(my area)'}. Can you deliver cold-pressed oils & bilona ghee to my address?`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-full hover:bg-[#20ba5a]"
            >
              <FaWhatsapp className="w-3.5 h-3.5" />
              <span>Ask on WhatsApp for Doorstep Delivery</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};