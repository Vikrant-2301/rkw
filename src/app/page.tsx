import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tiro_Devanagari_Hindi } from 'next/font/google';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { StoreLocatorSection } from '@/components/StoreLocatorSection';
import { FiArrowRight, FiArrowUpRight, FiTruck } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG } from '@/config/site';

/* ────────────────────────────────────────────────────────────────────────────
   RKW homepage — mobile-first, scroll-driven.

   All scroll motion is native CSS scroll-driven animation (animation-timeline),
   so it runs off the main thread and needs no JS library. Browsers without
   support, and people who prefer reduced motion, get the same content as a
   normal static page: every animated rule lives inside a feature query.
   ──────────────────────────────────────────────────────────────────────────── */

const deva = Tiro_Devanagari_Hindi({ subsets: ['devanagari', 'latin'], weight: '400' });

const C = {
  mustard: '#F2B705',
  mustardDeep: '#B98200',
  navy: '#0E2A47',
  navyDeep: '#08192B',
  paper: '#FBF3DC',
  paperDark: '#F1E4BD',
  ink: '#1A1208',
};

const MARQUEE = [
  'Pressed below 38°C',
  'No solvents. No refining.',
  'Agmark R.B.O. certified',
  'Four live units across Delhi',
  'Since 1981',
  'Open 10 AM – 10 PM, all 7 days',
];

const STATEMENT =
  'Since 1981 we have pressed oil the slow way. Under 38°C. Nothing added, nothing refined out. Come and watch it happen.';

const STEPS = [
  { n: '01', title: 'Seed selection', desc: 'Single-origin seeds sourced directly from farmers across Rajasthan, MP and Gujarat.' },
  { n: '02', title: 'Sun drying', desc: 'Dried naturally for 2–3 days to lower moisture and bring out the flavour.' },
  { n: '03', title: 'Slow cold-press', desc: 'Pressed below 38°C in traditional ghanis. No friction heat, no shortcuts.' },
  { n: '04', title: 'Natural settling', desc: 'The oil rests for 48 hours before filtering and bottling. No preservatives.' },
];

const VOICES = [
  {
    quote:
      'The mustard oil from RKW has completely changed how our food tastes. You can smell the difference the moment you open the bottle.',
    author: 'Priya Sharma',
    location: 'Rohini, Delhi',
  },
  {
    quote:
      'I visited the unit and watched pure oil pressed before my eyes. That level of transparency is rare. The Desi cow ghee is exceptional.',
    author: 'Rajesh Mehra',
    location: 'East Delhi',
  },
  {
    quote:
      'My family has been buying from Ramesh ji for over 15 years. We will never go back to supermarket oils. The purity is unmatched.',
    author: 'Anita Kapoor',
    location: 'Laxmi Nagar, Delhi',
  },
];

const DOORS = [
  {
    href: '/shop?category=oil',
    kicker: 'Cold-pressed oils',
    title: 'Mustard, coconut & more',
    body: 'Kachi ghani yellow and black mustard, coconut and other oils, pressed in small batches.',
    cta: 'Browse oils',
    word: 'तेल',
    bg: C.navy,
    fg: C.paper,
    accent: C.mustard,
    outline: true,
  },
  {
    href: '/shop?category=bilona-ghee',
    kicker: 'Vedic Bilona ghee',
    title: 'Cow & buffalo, hand-churned',
    body: 'Made the bilona way: from curd, churned, then slow-cooked. Desi cow, desi buffalo and Dahi Bilona.',
    cta: 'Browse ghee',
    word: 'घी',
    bg: C.mustard,
    fg: C.navy,
    accent: C.navy,
    outline: false,
  },
  {
    href: '#find-store',
    kicker: 'Four live units',
    title: 'Come and watch it pressed',
    body: 'Walk into any unit between 10 AM and 10 PM, any day of the week, and see your oil made.',
    cta: 'Find a unit',
    word: 'देखो',
    bg: C.paperDark,
    fg: C.navy,
    accent: C.mustardDeep,
    outline: false,
  },
];

/** The wooden ghani: seeds go in, a pestle turns, oil collects. Driven by scroll via CSS classes. */
function Ghani() {
  const seeds = Array.from({ length: 42 }, (_, i) => {
    const r = 8 + 58 * Math.sqrt(i / 42);
    const a = i * 2.39996;
    return {
      x: +(100 + r * Math.cos(a)).toFixed(2),
      y: +(100 + r * Math.sin(a)).toFixed(2),
      rot: Math.round(((a * 180) / Math.PI) % 360),
    };
  });

  return (
    <svg
      viewBox="0 0 200 236"
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Illustration of a wooden ghani pressing mustard seeds into oil"
    >
      <defs>
        <radialGradient id="rkw-oil" cx="42%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#FFE07A" />
          <stop offset="60%" stopColor={C.mustard} />
          <stop offset="100%" stopColor="#C98F00" />
        </radialGradient>
      </defs>

      {/* sun (step 2) */}
      <g className="rkw-sun">
        <circle cx="22" cy="24" r="10" fill={C.mustard} />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={22 + Math.cos(a) * 15}
              y1={24 + Math.sin(a) * 15}
              x2={22 + Math.cos(a) * 21}
              y2={24 + Math.sin(a) * 21}
              stroke={C.mustard}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* wooden body */}
      <circle cx="100" cy="100" r="94" fill="#5E3719" />
      <circle cx="100" cy="100" r="89" fill="#7E4F27" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="#5A3519" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="76" fill="none" stroke="#9A6532" strokeWidth="1" />
      <circle cx="100" cy="100" r="72" fill="#22150A" />

      {/* seeds */}
      <g className="rkw-seeds">
        {seeds.map((s, i) => (
          <ellipse
            key={i}
            cx={s.x}
            cy={s.y}
            rx="3.3"
            ry="2.2"
            fill={i % 3 === 0 ? '#D9A62A' : '#B5801C'}
            transform={`rotate(${s.rot} ${s.x} ${s.y})`}
          />
        ))}
      </g>

      {/* oil pool */}
      <g className="rkw-pool">
        <circle cx="100" cy="100" r="56" fill="url(#rkw-oil)" />
        <ellipse cx="82" cy="80" rx="16" ry="8" fill="#fff" opacity=".28" transform="rotate(-30 82 80)" />
      </g>

      {/* pestle (the kolhu) */}
      <g className="rkw-pestle">
        <rect x="94.5" y="14" width="11" height="86" rx="5.5" fill="#8A5A2B" stroke="#3B2310" strokeWidth="1.5" />
        <circle cx="100" cy="20" r="10" fill="#8A5A2B" stroke="#3B2310" strokeWidth="1.5" />
        <circle cx="100" cy="20" r="3.5" fill="#3B2310" />
      </g>
      <circle cx="100" cy="100" r="8" fill={C.mustardDeep} stroke={C.ink} strokeWidth="1.5" />

      {/* spout + drop (step 4) */}
      <path d="M88 186 L112 186 L108 203 L92 203 Z" fill="#3B2310" />
      <g className="rkw-spout">
        <path
          className="rkw-drop"
          d="M100 207 C100 207 94 216 94 221 a6 6 0 0 0 12 0 C106 216 100 207 100 207 Z"
          fill={C.mustard}
        />
      </g>
    </svg>
  );
}

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter(p => p.featured).slice(0, 4);
  const displayProducts = featuredProducts.length >= 3 ? featuredProducts : PRODUCTS.slice(0, 4);

  const waOrder = `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
    'Hello RKW, I want to order pure cold-pressed oils & Bilona ghee!'
  )}`;

  const words = STATEMENT.split(' ');

  return (
    <div className="rkw-root" style={{ background: C.paper, color: C.ink, overflowX: 'clip' }}>
      <style>{`
        @property --temp { syntax: '<integer>'; inherits: true; initial-value: 38; }

        html { scroll-padding-top: 5rem; }
        @media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }

        .rkw-no-bar { scrollbar-width: none; }
        .rkw-no-bar::-webkit-scrollbar { display: none; }
        .rkw-outline { -webkit-text-stroke: 1.5px ${C.mustard}; color: transparent; }

        /* ── ambient loops (always-on, tiny) ── */
        @keyframes rkw-marquee { to { transform: translateX(-50%); } }
        @keyframes rkw-blob {
          0%, 100% { border-radius: 62% 38% 55% 45% / 48% 58% 42% 52%; transform: translate3d(0,0,0) rotate(0deg); }
          50%      { border-radius: 40% 60% 38% 62% / 58% 42% 60% 40%; transform: translate3d(14px,-18px,0) rotate(18deg); }
        }
        @keyframes rkw-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(7px); } }
        @keyframes rkw-drop {
          0%   { transform: translateY(-4px); opacity: 0; }
          20%  { opacity: 1; }
          80%  { transform: translateY(16px); opacity: 1; }
          100% { transform: translateY(21px); opacity: 0; }
        }
        .rkw-marquee { animation: rkw-marquee 40s linear infinite; }
        .rkw-blob { animation: rkw-blob 15s ease-in-out infinite; }
        .rkw-bob { animation: rkw-bob 1.8s ease-in-out infinite; }
        .rkw-drop { animation: rkw-drop 2.4s ease-in infinite; }
        @media (prefers-reduced-motion: reduce) {
          .rkw-marquee, .rkw-blob, .rkw-bob, .rkw-drop { animation: none; }
        }

        /* ── static (no-JS, no-support, reduced-motion) layout ── */
        .rkw-progress, .rkw-cover { display: none; }
        .rkw-stage { position: relative; min-height: 100svh; }
        .rkw-hero-img { clip-path: circle(150% at 50% 58%); }
        .rkw-temp { counter-reset: t var(--temp, 38); }
        .rkw-temp::after { content: counter(t) "°C"; }
        .rkw-step { margin-bottom: 1.25rem; }
        .rkw-truck { left: calc(100% - 30px); }
        .rkw-stack { position: sticky; top: calc(5.5rem + var(--i, 0) * 0.9rem); }
        @media (min-width: 768px) { .rkw-stack { position: static; } }

        /* ══════════════ SCROLL-DRIVEN LAYER ══════════════ */
        @media (prefers-reduced-motion: no-preference) {
        @supports (animation-timeline: view()) {

          /* top progress hairline */
          .rkw-progress { display: block; transform-origin: 0 50%; animation: rkw-grow linear both; animation-timeline: scroll(root); }
          @keyframes rkw-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

          /* generic rise-in (stagger with --d) */
          .rkw-rise {
            animation: rkw-rise linear both;
            animation-timeline: view();
            animation-range: entry calc(var(--d, 0) * 5%) entry calc(55% + var(--d, 0) * 5%);
          }
          @keyframes rkw-rise { from { opacity: 0; transform: translate3d(0, 56px, 0); } to { opacity: 1; transform: none; } }

          /* ── pinned scenes: tall container + sticky stage ── */
          .rkw-stage { position: sticky; top: 0; height: 100svh; min-height: 0; overflow: hidden; }
          .rkw-pin-hero { height: 300svh; view-timeline: --hero block; }
          .rkw-pin-proc { height: 400svh; view-timeline: --proc block; }

          /* HERO: iris opens from a small circle to full bleed (pinned range 25%→75%) */
          .rkw-hero-img { will-change: clip-path; animation: rkw-iris linear both; animation-timeline: --hero; animation-range: cover 25% cover 68%; }
          @keyframes rkw-iris { from { clip-path: circle(17% at 50% 58%); } to { clip-path: circle(110% at 50% 58%); } }
          .rkw-hero-zoom { animation: rkw-zoom linear both; animation-timeline: --hero; animation-range: cover 25% cover 75%; }
          @keyframes rkw-zoom { from { transform: scale(1.35); } to { transform: scale(1); } }
          .rkw-hero-shade { animation: rkw-shade linear both; animation-timeline: --hero; animation-range: cover 38% cover 66%; }
          @keyframes rkw-shade { from { opacity: 0; } to { opacity: 1; } }
          .rkw-word { transform-origin: 50% 0; animation: rkw-word linear both; animation-timeline: --hero; animation-range: cover 25% cover 62%; }
          @keyframes rkw-word { from { transform: none; } to { transform: translate3d(0, -2svh, 0) scale(.46); } }
          .rkw-badge { animation: rkw-rot linear both; animation-timeline: --hero; animation-range: cover 25% cover 75%; }
          @keyframes rkw-rot { to { transform: rotate(360deg); } }
          .rkw-hero-copy { animation: rkw-fadeup linear both; animation-timeline: --hero; animation-range: cover 52% cover 72%; }
          @keyframes rkw-fadeup { from { opacity: 0; transform: translate3d(0, 44px, 0); } to { opacity: 1; transform: none; } }
          .rkw-cue { animation: rkw-fadeout linear both; animation-timeline: --hero; animation-range: cover 25% cover 36%; }
          @keyframes rkw-fadeout { to { opacity: 0; } }

          /* STATEMENT: words light up as you read */
          .rkw-lit { view-timeline: --lit block; }
          .rkw-w {
            animation: rkw-lit linear both;
            animation-timeline: --lit;
            animation-range: cover calc(14% + var(--i) * 1.9%) cover calc(24% + var(--i) * 1.9%);
          }
          @keyframes rkw-lit { from { opacity: .16; } to { opacity: 1; } }

          /* PRODUCT / VOICE RAILS: centre card grows, neighbours recede (touch rails only) */
          @media (max-width: 1023px) {
            .rkw-rail-item { animation: rkw-card linear both; animation-timeline: view(inline); animation-range: cover 0% cover 100%; }
            @keyframes rkw-card {
              0%   { transform: scale(.88); opacity: .45; }
              50%  { transform: scale(1);   opacity: 1; }
              100% { transform: scale(.88); opacity: .45; }
            }
          }

          /* DELIVERY TRUCK drives to ₹799 */
          .rkw-road { view-timeline: --road block; }
          .rkw-truck { left: 0; animation: rkw-truck linear both; animation-timeline: --road; animation-range: cover 18% cover 58%; }
          @keyframes rkw-truck { from { left: 0; } to { left: calc(100% - 30px); } }
          .rkw-road-fill { transform-origin: 0 50%; animation: rkw-grow linear both; animation-timeline: --road; animation-range: cover 18% cover 58%; }

          /* THERMOMETER fills with scroll */
          .rkw-thermo { view-timeline: --thermo block; }
          .rkw-cover { display: block; transform-origin: 50% 0; animation: rkw-uncover linear both; animation-timeline: --thermo; animation-range: cover 25% cover 62%; }
          @keyframes rkw-uncover { from { transform: scaleY(1); } to { transform: scaleY(0); } }
          .rkw-t-rkw, .rkw-t-hot { animation: rkw-pop linear both; animation-timeline: --thermo; }
          .rkw-t-rkw { animation-range: cover 30% cover 36%; }
          .rkw-t-hot { animation-range: cover 54% cover 60%; }
          @keyframes rkw-pop { from { opacity: 0; transform: translate3d(-18px, 0, 0); } to { opacity: 1; transform: none; } }

          /* PROCESS: pinned ghani scene, windows inside 20%→80% */
          .rkw-steps { position: relative; min-height: 9.5rem; }
          .rkw-step { position: absolute; inset: 0 0 auto 0; margin: 0; animation: rkw-step linear both; animation-timeline: --proc; }
          .rkw-step[data-i="0"] { animation-name: rkw-step-first; animation-range: cover 20% cover 35%; }
          .rkw-step[data-i="1"] { animation-range: cover 35% cover 50%; }
          .rkw-step[data-i="2"] { animation-range: cover 50% cover 65%; }
          .rkw-step[data-i="3"] { animation-name: rkw-step-last; animation-range: cover 65% cover 80%; }
          @keyframes rkw-step       { 0% { opacity: 0; transform: translate3d(0,36px,0); } 28%,72% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translate3d(0,-36px,0); } }
          @keyframes rkw-step-first { 0%,72% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translate3d(0,-36px,0); } }
          @keyframes rkw-step-last  { 0% { opacity: 0; transform: translate3d(0,36px,0); } 28%,100% { opacity: 1; transform: none; } }

          .rkw-seg i { transform-origin: 0 50%; animation: rkw-grow linear both; animation-timeline: --proc; }
          .rkw-seg i[data-i="0"] { animation-range: cover 20% cover 35%; }
          .rkw-seg i[data-i="1"] { animation-range: cover 35% cover 50%; }
          .rkw-seg i[data-i="2"] { animation-range: cover 50% cover 65%; }
          .rkw-seg i[data-i="3"] { animation-range: cover 65% cover 80%; }

          .rkw-pestle { transform-origin: 100px 100px; animation: rkw-spin linear both; animation-timeline: --proc; animation-range: cover 20% cover 80%; }
          @keyframes rkw-spin { to { transform: rotate(900deg); } }
          .rkw-seeds { transform-origin: 100px 100px; animation: rkw-seeds linear both; animation-timeline: --proc; animation-range: cover 20% cover 80%; }
          @keyframes rkw-seeds { 0% { opacity: 0; transform: scale(.9); } 12%,45% { opacity: 1; transform: none; } 90%,100% { opacity: .12; transform: scale(.8); } }
          .rkw-pool { transform-origin: 100px 100px; animation: rkw-pool linear both; animation-timeline: --proc; animation-range: cover 20% cover 80%; }
          @keyframes rkw-pool { 0%,40% { opacity: 0; transform: scale(0); } 100% { opacity: 1; transform: scale(1); } }
          .rkw-sun { animation: rkw-sun linear both; animation-timeline: --proc; animation-range: cover 20% cover 80%; }
          @keyframes rkw-sun { 0%,18% { opacity: 0; } 26%,40% { opacity: 1; } 52%,100% { opacity: 0; } }
          .rkw-spout { animation: rkw-spout linear both; animation-timeline: --proc; animation-range: cover 20% cover 80%; }
          @keyframes rkw-spout { 0%,70% { opacity: 0; } 85%,100% { opacity: 1; } }
          .rkw-temp { animation: rkw-temp linear both; animation-timeline: --proc; animation-range: cover 20% cover 58%; }
          @keyframes rkw-temp { from { --temp: 20; } to { --temp: 38; } }

          /* ORDER SLIP prints out */
          .rkw-print { animation: rkw-print linear both; animation-timeline: view(); animation-range: entry 5% entry 95%; }
          @keyframes rkw-print { from { clip-path: inset(0 -24px 100% -24px); } to { clip-path: inset(0 -24px -24px -24px); } }

          /* MOBILE DOCK slides in once the hero is behind you */
          .rkw-dock { animation: rkw-dock linear both; animation-timeline: scroll(root); animation-range: 60svh 90svh; }
          @keyframes rkw-dock { from { transform: translate3d(0, 150%, 0); } to { transform: none; } }
        }
        }
      `}</style>

      {/* scroll progress hairline */}
      <div aria-hidden className="rkw-progress fixed left-0 top-0 z-[70] h-[3px] w-full" style={{ background: C.mustard }} />

      {/* ═══════════ 1 · HERO — iris opens as you scroll ═══════════ */}
      <section className="rkw-pin rkw-pin-hero" style={{ background: C.navy }}>
        <div className="rkw-stage overflow-hidden">
          <div
            aria-hidden
            className="rkw-blob absolute -left-24 top-[18%] h-72 w-72 opacity-30"
            style={{ background: C.mustard }}
          />
          <div
            aria-hidden
            className="rkw-blob absolute -right-28 bottom-[10%] h-80 w-80 opacity-20"
            style={{ background: C.mustardDeep, animationDelay: '-7s' }}
          />

          {/* photo, revealed through a growing circle */}
          <div className="rkw-hero-img absolute inset-0">
            <div className="rkw-hero-zoom absolute inset-0">
              <Image
                src="/images/hero.jpg"
                alt="Ramesh Kolhu Wale — cold-pressed oil being extracted"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div
              className="rkw-hero-shade absolute inset-0"
              style={{
                background: `linear-gradient(180deg, ${C.navyDeep}CC 0%, ${C.navyDeep}33 38%, ${C.navyDeep}F2 100%)`,
              }}
            />
          </div>

          {/* wordmark */}
          <div className="rkw-word absolute inset-x-0 top-[11svh] px-5 sm:px-8">
            <p
              className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] sm:text-xs"
              style={{ color: C.paper }}
            >
              Ramesh Kolhu Wale · Delhi · Since 1981
            </p>
            <h1 lang="hi" className={`${deva.className} leading-[1.02]`} style={{ color: C.mustard, fontSize: 'clamp(4.5rem, 30vw, 11rem)' }}>
              <span className="sr-only">Ramesh Kolhu Wale — pure cold-pressed oils and Bilona ghee, Delhi NCR. </span>
              <span aria-hidden>
                कच्ची<br className="lg:hidden" /> घानी
              </span>
            </h1>
          </div>

          {/* spinning badge */}
          <div className="rkw-badge absolute right-3 top-[30svh] h-24 w-24 sm:right-10 sm:h-32 sm:w-32" aria-hidden>
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <path id="rkw-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <circle cx="100" cy="100" r="98" fill={C.mustard} />
              <text fontSize="14" fontWeight="700" letterSpacing="2.4" fill={C.navy}>
                <textPath href="#rkw-circle">COLD PRESSED • BELOW 38°C • SINCE 1981 • </textPath>
              </text>
              <text x="100" y="112" textAnchor="middle" fontSize="34" fontWeight="700" fill={C.navy} fontFamily="serif">
                38°
              </text>
            </svg>
          </div>

          {/* phase two copy */}
          <div className="rkw-hero-copy absolute inset-x-0 bottom-0 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8 lg:pb-14">
            <div className="mx-auto max-w-7xl">
              <h2 className="font-serif text-[2.4rem] leading-[1.05] sm:text-6xl" style={{ color: C.paper }}>
                Pressed while
                <br />
                <span style={{ color: C.mustard }}>you watch.</span>
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed" style={{ color: '#E7DCC0' }}>
                Mustard, sesame, groundnut and coconut oils, and Vedic Bilona ghee, made in four Delhi units.
                Nothing added. Nothing refined out.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-bold"
                  style={{ background: C.mustard, color: C.navy }}
                >
                  Shop the shelf <FiArrowRight />
                </Link>
                <Link
                  href="#find-store"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 px-8 py-4 font-bold"
                  style={{ borderColor: C.paper, color: C.paper }}
                >
                  Find a unit
                </Link>
              </div>
            </div>
          </div>

          {/* scroll cue */}
          <div
            aria-hidden
            className="rkw-cue absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ color: C.paper }}
          >
            Scroll
            <span className="rkw-bob block h-6 w-px" style={{ background: C.mustard }} />
          </div>
        </div>
      </section>

      {/* ═══════════ marquee ═══════════ */}
      <div className="overflow-hidden py-3" style={{ background: C.mustard, color: C.navy }} aria-hidden>
        <div className="rkw-marquee flex w-max whitespace-nowrap">
          {[0, 1].map(dup => (
            <div key={dup} className="flex shrink-0 items-center">
              {MARQUEE.map(t => (
                <span key={`${dup}-${t}`} className="flex items-center text-xs font-bold uppercase tracking-[0.18em]">
                  <span className="px-5">{t}</span>
                  <span>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════ 2 · STATEMENT — words light up ═══════════ */}
      <section className="px-5 py-24 sm:px-8 sm:py-36">
        <p
          className="rkw-lit mx-auto max-w-5xl font-serif text-[2rem] leading-[1.12] sm:text-6xl lg:text-7xl"
          style={{ color: C.navy }}
        >
          {words.map((w, i) => (
            <span key={i} className="rkw-w" style={{ '--i': i } as React.CSSProperties}>
              {w}{' '}
            </span>
          ))}
        </p>
      </section>

      {/* ═══════════ 3 · DOORS — cards stack as you scroll (mobile), 3-up on desktop ═══════════ */}
      <section className="px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="rkw-rise mb-6 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustardDeep }}>
            Start here
          </p>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-5">
            {DOORS.map((d, i) => (
              <Link
                key={d.title}
                href={d.href}
                className="rkw-stack group relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-[28px] p-7 md:min-h-[30rem]"
                style={{
                  '--i': i,
                  background: d.bg,
                  color: d.fg,
                  boxShadow: '0 -14px 30px rgba(8,25,43,.18)',
                } as React.CSSProperties}
              >
                <span
                  aria-hidden
                  lang="hi"
                  className={`${deva.className} ${d.outline ? 'rkw-outline' : ''} pointer-events-none absolute -right-3 -top-8 select-none text-[11rem] leading-none`}
                  style={d.outline ? undefined : { color: d.accent, opacity: 0.22 }}
                >
                  {d.word}
                </span>
                <p className="relative text-xs font-bold uppercase tracking-[0.2em]" style={{ color: d.accent }}>
                  0{i + 1} / 03 · {d.kicker}
                </p>
                <div className="relative">
                  <h3 className="font-serif text-[2rem] leading-[1.05]">{d.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed opacity-80">{d.body}</p>
                  <span className="mt-5 inline-flex items-center gap-2 font-bold" style={{ color: d.accent }}>
                    {d.cta}
                    <FiArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 4 · THE SHELF — swipe rail on phones ═══════════ */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="rkw-rise mb-8 flex items-end justify-between gap-4 px-5 sm:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustardDeep }}>
                Fresh on the shelf
              </p>
              <h2 className="mt-2 font-serif text-4xl leading-[1.05] sm:text-5xl" style={{ color: C.navy }}>
                Made without shortcuts
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden shrink-0 items-center gap-1 border-b-2 pb-0.5 text-sm font-bold sm:inline-flex"
              style={{ color: C.navy, borderColor: C.mustard }}
            >
              View all <FiArrowRight />
            </Link>
          </div>

          <div className="rkw-no-bar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11%] pb-4 sm:px-[28%] lg:grid lg:snap-none lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-8">
            {displayProducts.map(product => (
              <div key={product.id} className="rkw-rail-item w-[78%] flex-none snap-center sm:w-[44%] lg:w-auto">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-4 px-5 sm:px-8 lg:hidden">
            <Link href="/shop" className="inline-flex items-center gap-2 font-bold" style={{ color: C.navy }}>
              See all products <FiArrowRight />
            </Link>
          </div>

          {/* delivery road */}
          <div className="rkw-road mx-auto mt-12 max-w-xl px-5 sm:px-8">
            <div className="relative h-8">
              <span
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-0 -translate-y-1/2 border-t-2 border-dashed"
                style={{ borderColor: C.navy, opacity: 0.35 }}
              />
              <span
                aria-hidden
                className="rkw-road-fill absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full"
                style={{ background: C.mustard }}
              />
              <span
                className="rkw-truck absolute top-0 flex h-8 w-[30px] items-center justify-center rounded-full"
                style={{ background: C.navy, color: C.mustard }}
              >
                <FiTruck className="h-4 w-4" />
              </span>
            </div>
            <div className="mt-2 flex justify-between text-xs font-semibold" style={{ color: C.navy }}>
              <span>₹100 delivery fee</span>
              <span>Free above ₹799 · Delhi NCR</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ 5 · THERMOMETER — fills as you scroll ═══════════ */}
      <section className="px-5 py-20 sm:px-8 sm:py-28" style={{ background: C.ink, color: C.paper }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="rkw-rise text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustard }}>
              Why RKW tastes different
            </p>
            <h2 className="rkw-rise mt-3 font-serif text-[2.4rem] leading-[1.05] sm:text-6xl" style={{ '--d': 1 } as React.CSSProperties}>
              It all comes
              <br />
              down to heat.
            </h2>
            <p className="rkw-rise mt-5 max-w-md leading-relaxed opacity-80" style={{ '--d': 2 } as React.CSSProperties}>
              We press slowly, under 38°C, so the nutrients, aroma and colour stay in the oil. Industrial
              refining typically runs far hotter and uses solvents. Ours never has.
            </p>
            <Link
              href="/process"
              className="rkw-rise mt-6 inline-flex items-center gap-2 font-bold"
              style={{ color: C.mustard, '--d': 3 } as React.CSSProperties}
            >
              See the full process <FiArrowRight />
            </Link>
          </div>

          <div className="rkw-thermo relative mx-auto h-[26rem] w-full max-w-sm">
            {/* tick labels */}
            {[0, 50, 100, 150, 200, 250].map(t => (
              <span
                key={t}
                className="absolute left-0 w-12 -translate-y-1/2 text-right text-[11px] opacity-50"
                style={{ bottom: `${(t / 250) * 100}%` }}
              >
                {t}°
              </span>
            ))}

            {/* tube */}
            <div
              className="absolute bottom-0 left-16 top-0 w-14 overflow-hidden rounded-full border-4"
              style={{ borderColor: 'rgba(251,243,220,.28)' }}
            >
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(0deg, ${C.mustard} 0%, #E8742A 55%, #B3261E 100%)` }}
              />
              <div className="rkw-cover absolute inset-0" style={{ background: C.ink }} />
            </div>

            {/* RKW marker (38 of 250) */}
            <div className="rkw-t-rkw absolute left-[8.5rem] right-0" style={{ bottom: '15.2%', transform: 'translateY(50%)' }}>
              <div className="flex items-center gap-3">
                <span className="h-px w-6" style={{ background: C.mustard }} />
                <div>
                  <p className="font-serif text-3xl leading-none" style={{ color: C.mustard }}>&lt; 38°C</p>
                  <p className="mt-1 text-xs opacity-75">RKW cold press</p>
                </div>
              </div>
            </div>

            {/* refining marker (200 of 250) */}
            <div className="rkw-t-hot absolute left-[8.5rem] right-0" style={{ bottom: '80%', transform: 'translateY(50%)' }}>
              <div className="flex items-center gap-3">
                <span className="h-px w-6" style={{ background: C.paper }} />
                <div>
                  <p className="font-serif text-3xl leading-none">200°C+</p>
                  <p className="mt-1 text-xs opacity-75">Typical industrial refining</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className="mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-3">
          {[
            ['Zero solvents', 'No chemical extraction at any stage'],
            ['Agmark tested', 'R.B.O. certified quality'],
            ['Seen to be believed', 'Watch the press at any unit, 10 AM – 10 PM'],
          ].map(([t, d], i) => (
            <li
              key={t}
              className="rkw-rise border-t pt-4"
              style={{ borderColor: 'rgba(251,243,220,.25)', '--d': i } as React.CSSProperties}
            >
              <p className="font-bold" style={{ color: C.mustard }}>{t}</p>
              <p className="mt-1 text-sm opacity-75">{d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ═══════════ 6 · PROCESS — the ghani, pinned ═══════════ */}
      <section className="rkw-pin rkw-pin-proc" style={{ background: C.navy, color: C.paper }} aria-label="From seed to bottle">
        <div className="rkw-stage flex flex-col px-5 pb-6 pt-6 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-12">
          <div className="contents lg:flex lg:w-1/2 lg:flex-col lg:justify-center">
            <div className="order-1">
              <div className="rkw-seg flex gap-1.5" aria-hidden>
                {STEPS.map((s, i) => (
                  <span key={s.n} className="h-1 flex-1 overflow-hidden rounded-full" style={{ background: 'rgba(251,243,220,.18)' }}>
                    <i data-i={i} className="block h-full w-full" style={{ background: C.mustard }} />
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustard }}>
                The method
              </p>
              <h2 className="mt-1 font-serif text-[2rem] leading-[1.05] sm:text-5xl">From seed to bottle</h2>
            </div>

            <div className="rkw-steps order-3 mt-2 lg:mt-8">
              {STEPS.map((s, i) => (
                <div key={s.n} data-i={i} className="rkw-step">
                  <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustard }}>
                    Step {s.n}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl sm:text-3xl">{s.title}</h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed opacity-80 sm:text-base">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="order-2 flex flex-1 flex-col items-center justify-center lg:w-1/2">
            <div className="aspect-[200/236] w-[min(60vw,31svh)] lg:w-[min(34vw,56svh)]">
              <Ghani />
            </div>
            <p
              className="rkw-temp mt-1 font-serif text-4xl lg:text-6xl"
              style={{ color: C.mustard }}
              aria-label="Pressing temperature stays below 38 degrees Celsius"
            />
          </div>
        </div>
      </section>

      {/* ═══════════ 7 · VOICES ═══════════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="rkw-rise mb-10 max-w-2xl px-5 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustardDeep }}>
              From the neighbourhood
            </p>
            <h2 className="mt-2 font-serif text-4xl leading-[1.05] sm:text-5xl" style={{ color: C.navy }}>
              Families who stopped buying supermarket oil
            </h2>
          </div>

          <div className="rkw-no-bar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[8%] pb-6 sm:px-[22%] md:grid md:snap-none md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8">
            {VOICES.map((v, i) => (
              <figure
                key={v.author}
                className="rkw-rail-item relative w-[84%] flex-none snap-center rounded-3xl p-7 sm:w-[56%] md:w-auto"
                style={{
                  background: i === 1 ? C.mustard : C.paperDark,
                  color: i === 1 ? C.navy : C.ink,
                  boxShadow: `6px 6px 0 ${C.navy}`,
                }}
              >
                <span aria-hidden className="absolute -top-4 left-6 font-serif text-7xl leading-none" style={{ color: C.navy }}>
                  &ldquo;
                </span>
                <blockquote className="mt-5 leading-relaxed">{v.quote}</blockquote>
                <figcaption className="mt-5 border-t pt-4 text-sm" style={{ borderColor: 'rgba(14,42,71,.25)' }}>
                  <span className="font-bold">{v.author}</span>
                  <span className="opacity-70"> · {v.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ 8 · UNITS ═══════════ */}
      <StoreLocatorSection id="find-store" />

      {/* ═══════════ 9 · ORDER SLIP — prints on scroll ═══════════ */}
      <section className="px-4 pb-36 pt-16 sm:px-6 sm:py-24 md:pb-24" style={{ background: C.mustard }}>
        <div
          className="rkw-print mx-auto max-w-2xl p-7 sm:p-12"
          style={{
            background: C.paper,
            border: `3px dashed ${C.navy}`,
            borderRadius: 20,
            boxShadow: `9px 9px 0 ${C.navy}`,
          }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustardDeep }}>
            Order slip · No. 1981
          </p>
          <h2 className="mt-2 font-serif text-[2rem] leading-[1.08] sm:text-4xl" style={{ color: C.navy }}>
            Tell us what you need.
            <br />
            We&rsquo;ll bring it.
          </h2>

          <dl className="mt-7 text-sm">
            {[
              ['Delivery area', 'Delhi NCR'],
              ['Orders above ₹799', 'Free doorstep delivery'],
              ['Orders below ₹799', '₹100 delivery fee'],
              ['Unit hours', '10 AM – 10 PM, all 7 days'],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex justify-between gap-4 border-b border-dotted py-3"
                style={{ borderColor: 'rgba(14,42,71,.35)' }}
              >
                <dt className="opacity-70">{k}</dt>
                <dd className="text-right font-bold" style={{ color: C.navy }}>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href={waOrder}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 font-bold text-white"
              style={{ background: '#1FAF54' }}
            >
              <FaWhatsapp className="text-xl" />
              Order on WhatsApp
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 px-7 py-4 font-bold"
              style={{ borderColor: C.navy, color: C.navy }}
            >
              Or shop online <FiArrowRight />
            </Link>
          </div>
          <p className="mt-4 text-center text-xs opacity-60 sm:text-left">{SITE_CONFIG.contact.whatsapp}</p>
        </div>
      </section>

      {/* ═══════════ mobile dock ═══════════ */}
      <nav
        aria-label="Quick actions"
        className="rkw-dock fixed inset-x-3 z-40 flex gap-1.5 rounded-full p-1.5 md:hidden"
        style={{
          bottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
          background: C.navy,
          boxShadow: '0 12px 32px rgba(8,25,43,.5)',
        }}
      >
        <Link
          href="/shop"
          className="flex-1 rounded-full py-3 text-center text-sm font-bold"
          style={{ background: C.mustard, color: C.navy }}
        >
          Shop
        </Link>
        <a
          href={waOrder}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[1.5] items-center justify-center gap-2 rounded-full py-3 text-sm font-bold text-white"
          style={{ background: '#1FAF54' }}
        >
          <FaWhatsapp className="text-lg" />
          Order
        </a>
        <Link
          href="#find-store"
          className="flex-1 rounded-full py-3 text-center text-sm font-bold"
          style={{ color: C.paper }}
        >
          Units
        </Link>
      </nav>
    </div>
  );
}