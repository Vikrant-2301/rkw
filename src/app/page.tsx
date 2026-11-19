import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Tiro_Devanagari_Hindi } from 'next/font/google';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/ProductCard';
import { StoreLocatorSection } from '@/components/StoreLocatorSection';
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { SITE_CONFIG } from '@/config/site';

const deva = Tiro_Devanagari_Hindi({ subsets: ['devanagari', 'latin'], weight: '400' });

// Brand palette: mustard-field yellow + RKW navy, on warm paper tones
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
  'शुद्ध तेल और देसी घी',
  'No solvents. No refining.',
  'Four live units across Delhi',
  '100% Pure & Authentic',
  'Since 1981',
  'Open 10 AM – 8:30 PM, all 7 days',
];

const STEPS = [
  { n: '01', title: 'Seed selection', desc: 'Single-origin seeds sourced directly from farmers across Rajasthan, MP and Gujarat.' },
  { n: '02', title: 'Sun drying', desc: 'Dried naturally for 2–3 days to lower moisture and bring out flavour.' },
  { n: '03', title: 'Slow cold-press', desc: 'Pressed slowly in traditional ghanis. No friction heat, no shortcuts.' },
  { n: '04', title: 'Natural settling / Filtered', desc: 'The oil rests for 48 hours before filtering and bottling. No preservatives.' },
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

  return (
    <div style={{ background: C.paper, color: C.ink, overflowX: 'clip' }}>
      <style>{`
        @keyframes rkw-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes rkw-spin { to { transform: rotate(360deg) } }
        @keyframes rkw-drip {
          0%   { transform: translateY(-6px) scaleY(.6); opacity: 0 }
          15%  { opacity: 1 }
          70%  { transform: translateY(46px) scaleY(1); opacity: 1 }
          100% { transform: translateY(60px) scaleY(1); opacity: 0 }
        }
        @keyframes rkw-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .rkw-marquee { animation: rkw-marquee 38s linear infinite; }
        .rkw-spin { animation: rkw-spin 26s linear infinite; }
        .rkw-drip { animation: rkw-drip 2.8s ease-in infinite; }
        .rkw-outline { -webkit-text-stroke: 1.5px ${C.mustard}; color: transparent; }

        .rkw-stage { position: relative; padding: 4rem 1rem; }
        .rkw-step { margin-bottom: 1.25rem; }

        @media (prefers-reduced-motion: reduce) {
          .rkw-marquee, .rkw-spin, .rkw-drip { animation: none; }
        }

        @media (prefers-reduced-motion: no-preference) {
        @supports (animation-timeline: view()) {
          .rkw-stage { position: sticky; top: 0; height: 100svh; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
          .rkw-pin-proc { height: 180svh; view-timeline: --proc block; }

          /* PROCESS: pinned ghani scene, compact scroll range */
          .rkw-steps { position: relative; min-height: 7.5rem; }
          .rkw-step { position: absolute; inset: 0 0 auto 0; margin: 0; animation: rkw-step linear both; animation-timeline: --proc; }
          .rkw-step[data-i="0"] { animation-name: rkw-step-first; animation-range: cover 10% cover 30%; }
          .rkw-step[data-i="1"] { animation-range: cover 30% cover 50%; }
          .rkw-step[data-i="2"] { animation-range: cover 50% cover 70%; }
          .rkw-step[data-i="3"] { animation-name: rkw-step-last; animation-range: cover 70% cover 90%; }
          @keyframes rkw-step       { 0% { opacity: 0; transform: translate3d(0,28px,0); } 25%,75% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translate3d(0,-28px,0); } }
          @keyframes rkw-step-first { 0%,75% { opacity: 1; transform: none; } 100% { opacity: 0; transform: translate3d(0,-28px,0); } }
          @keyframes rkw-step-last  { 0% { opacity: 0; transform: translate3d(0,28px,0); } 25%,100% { opacity: 1; transform: none; } }

          .rkw-seg i { transform-origin: 0 50%; animation: rkw-grow linear both; animation-timeline: --proc; }
          .rkw-seg i[data-i="0"] { animation-range: cover 10% cover 30%; }
          .rkw-seg i[data-i="1"] { animation-range: cover 30% cover 50%; }
          .rkw-seg i[data-i="2"] { animation-range: cover 50% cover 70%; }
          .rkw-seg i[data-i="3"] { animation-range: cover 70% cover 90%; }

          .rkw-pestle { transform-origin: 100px 100px; animation: rkw-spin linear both; animation-timeline: --proc; animation-range: cover 10% cover 90%; }
          @keyframes rkw-spin { to { transform: rotate(900deg); } }
          .rkw-seeds { transform-origin: 100px 100px; animation: rkw-seeds linear both; animation-timeline: --proc; animation-range: cover 10% cover 90%; }
          @keyframes rkw-seeds { 0% { opacity: 0; transform: scale(.9); } 12%,45% { opacity: 1; transform: none; } 90%,100% { opacity: .12; transform: scale(.8); } }
          .rkw-pool { transform-origin: 100px 100px; animation: rkw-pool linear both; animation-timeline: --proc; animation-range: cover 10% cover 90%; }
          @keyframes rkw-pool { 0%,40% { opacity: 0; transform: scale(0); } 100% { opacity: 1; transform: scale(1); } }
          .rkw-sun { animation: rkw-sun linear both; animation-timeline: --proc; animation-range: cover 10% cover 90%; }
          @keyframes rkw-sun { 0%,18% { opacity: 0; } 26%,40% { opacity: 1; } 52%,100% { opacity: 0; } }
          .rkw-spout { animation: rkw-spout linear both; animation-timeline: --proc; animation-range: cover 10% cover 90%; }
          @keyframes rkw-spout { 0%,70% { opacity: 0; } 85%,100% { opacity: 1; } }
        }
        }
      `}</style>

      {/* ═══ HERO — mustard-field yellow, giant Devanagari headline ═══ */}
      <section className="relative overflow-hidden" style={{ background: C.mustard }}>
        {/* faint ghani-ring texture */}
        <div
          aria-hidden
          className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full opacity-20"
          style={{ border: `70px solid ${C.mustardDeep}` }}
        />
        <div
          aria-hidden
          className="absolute -left-24 bottom-0 h-[320px] w-[320px] rounded-full opacity-20"
          style={{ border: `40px solid ${C.mustardDeep}` }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-12 lg:gap-6 lg:px-8 lg:pb-24 lg:pt-20">
          <div className="lg:col-span-7">
            <p
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ background: C.navy, color: C.paper }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: C.mustard }} />
              Ramesh Kolhu Wale · Delhi · Est. 1981
            </p>

            <h1
              className={`${deva.className} leading-[1.15] tracking-tight`}
              style={{ color: C.navy, fontSize: 'clamp(2.75rem, 7vw, 6.25rem)' }}
            >
              शुद्ध तेल और घी
            </h1>
            <p
              className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl"
              style={{ color: C.navy }}
            >
              Pressed while you watch.
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: C.ink }}>
              Mustard, sesame, groundnut and coconut oils, plus Vedic Bilona ghee. Made in four
              Delhi units where you can stand and see it happen, with nothing added and nothing
              refined out.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 sm:py-4 font-semibold text-center transition-transform hover:-translate-y-0.5 active:scale-[0.98]"
                style={{ background: C.navy, color: C.paper, boxShadow: `4px 4px 0 ${C.ink}` }}
              >
                Shop the shelf <FiArrowRight />
              </Link>
              <Link
                href="#find-store"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 px-8 py-3.5 sm:py-4 font-semibold text-center transition-colors hover:bg-white/30 active:scale-[0.98]"
                style={{ borderColor: C.navy, color: C.navy }}
              >
                Find our store
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold" style={{ color: C.navy }}>
              <span>Free delivery above ₹799</span>
              <span aria-hidden>·</span>
              <span>100% Pure &amp; Natural</span>
              <span aria-hidden>·</span>
              <span>Delhi NCR</span>
            </div>
          </div>

          {/* arch photo + rotating badge */}
          <div className="relative mx-auto w-full max-w-xs sm:max-w-md lg:col-span-5 mt-4 sm:mt-0">
            <div
              className="relative aspect-[4/5] overflow-hidden"
              style={{
                borderRadius: '999px 999px 24px 24px',
                border: `6px solid ${C.navy}`,
                boxShadow: `clamp(6px, 1.5vw, 12px) clamp(6px, 1.5vw, 12px) 0 ${C.navy}`,
                background: C.navy,
              }}
            >
              <Image
                src="/images/hero.png"
                alt="Ramesh Kolhu Wale — cold-pressed oils being extracted"
                fill
                priority
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 420px"
                className="object-cover"
              />
              {/* oil drip */}
              <svg
                aria-hidden
                viewBox="0 0 20 60"
                className="absolute bottom-6 left-1/2 h-20 sm:h-24 w-5 sm:w-6 -translate-x-1/2 overflow-visible"
              >
                <path
                  className="rkw-drip"
                  d="M10 0 C10 0 2 14 2 22 a8 8 0 0 0 16 0 C18 14 10 0 10 0 Z"
                  fill={C.mustard}
                />
              </svg>
            </div>

            {/* Rotating Badge - positioned safely on mobile so it never causes horizontal overflow */}
            <div className="absolute -left-2 -top-4 sm:-left-8 sm:-top-6 lg:-left-10 h-24 w-24 sm:h-36 sm:w-36 lg:h-40 lg:w-40 pointer-events-none z-10">
              <svg viewBox="0 0 200 200" className="rkw-spin h-full w-full" aria-hidden>
                <defs>
                  <path id="rkw-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <circle cx="100" cy="100" r="98" fill={C.paper} stroke={C.navy} strokeWidth="3" />
                <text fontSize="13" fontWeight="700" letterSpacing="2.2" fill={C.navy}>
                  <textPath href="#rkw-circle">{'COLD PRESSED • PURE & NATURAL • SINCE 1981 • '}</textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-7">
                <div className="relative h-full w-full">
                  <Image
                    src="/logos/4.svg"
                    alt="Ramesh Kolhu Wale"
                    fill
                    sizes="(max-width: 640px) 70px, 120px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <div className="overflow-hidden py-3" style={{ background: C.navy, color: C.paper }} aria-hidden>
        <div className="rkw-marquee flex w-max whitespace-nowrap">
          {[0, 1].map(dup => (
            <div key={dup} className="flex shrink-0 items-center">
              {MARQUEE.map(t => (
                <span key={`${dup}-${t}`} className="flex items-center text-sm font-semibold uppercase tracking-[0.16em]">
                  <span className="px-6">{t}</span>
                  <span style={{ color: C.mustard }}>✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══ OIL OR GHEE — two big doors ═══ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustardDeep }}>
            Start here
          </p>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl" style={{ color: C.navy }}>
            What&rsquo;s going in your kadhai?
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <Link
            href="/shop?category=oil"
            className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl p-8 transition-transform hover:-translate-y-1"
            style={{ background: C.navy, color: C.paper }}
          >
            <span
              className={`${deva.className} rkw-outline pointer-events-none absolute right-4 top-3 select-none text-6xl leading-tight sm:right-6 sm:top-4 sm:text-7xl md:text-8xl`}
              aria-hidden
            >
              तेल
            </span>
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustard }}>
              Cold-pressed oils
            </p>
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl">Mustard, coconut &amp; more</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed opacity-80">
                Kachi ghani yellow and black mustard, coconut and other oils, pressed in small batches.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold" style={{ color: C.mustard }}>
                Browse oils <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </Link>

          <Link
            href="/shop?category=bilona-ghee"
            className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl p-8 transition-transform hover:-translate-y-1"
            style={{ background: C.mustard, color: C.navy }}
          >
            <span
              className={`${deva.className} pointer-events-none absolute right-4 top-3 select-none text-6xl leading-tight opacity-25 sm:right-6 sm:top-4 sm:text-7xl md:text-8xl`}
              aria-hidden
            >
              घी
            </span>
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Vedic Bilona ghee</p>
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl">Cow &amp; buffalo, hand-churned</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed">
                Made the bilona way, from curd, churned and slow-cooked. Desi cow, desi buffalo and Dahi Bilona.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 font-semibold">
                Browse ghee <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══ THE SHELF ═══ */}
      <section className="pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustardDeep }}>
                Fresh on the shelf
              </p>
              <h2 className="mt-2 font-serif text-4xl sm:text-5xl" style={{ color: C.navy }}>
                Made without shortcuts
              </h2>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <Link
                href="/shop?category=most-selling"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F2B705] text-[#0E2A47] text-xs font-bold hover:bg-[#d9a304] transition-colors shadow-xs"
              >
                <span>🔥</span> Most Selling
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 border-b-2 pb-0.5 text-sm font-bold"
                style={{ color: C.navy, borderColor: C.mustard }}
              >
                View all products <FiArrowRight />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <p
            className="mx-auto mt-10 w-fit rounded-full px-5 py-2 text-sm font-semibold"
            style={{ background: C.paperDark, color: C.navy }}
          >
            Free doorstep delivery across Delhi NCR above ₹799 · ₹100 below
          </p>
        </div>
      </section>


      {/* ═══════════ PROCESS — the ghani, pinned ═══════════ */}
      <section className="rkw-pin rkw-pin-proc" style={{ background: C.navy, color: C.paper }} aria-label="From seed to bottle">
        <div className="rkw-stage flex items-center justify-center">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-10 px-5 sm:px-8 lg:flex-row lg:gap-14 lg:px-10">
            <div className="w-full lg:max-w-lg">
              <div className="rkw-seg mb-5 flex max-w-xs gap-1.5" aria-hidden>
                {STEPS.map((s, i) => (
                  <span key={s.n} className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: 'rgba(251,243,220,.2)' }}>
                    <i data-i={i} className="block h-full w-full" style={{ background: C.mustard }} />
                  </span>
                ))}
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustard }}>
                The method
              </p>
              <h2 className="mt-1 font-serif text-3xl sm:text-4xl lg:text-5xl">From seed to bottle</h2>

              <div className="rkw-steps relative mt-6 min-h-[7.5rem]">
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

            <div className="flex w-full flex-col items-center justify-center lg:w-auto">
              <div className="aspect-[200/236] w-48 sm:w-60 lg:w-72">
                <Ghani />
              </div>
              <p className="mt-3 font-serif text-2xl sm:text-3xl" style={{ color: C.mustard }}>
                Traditional Cold Press
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VOICES ═══ */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustardDeep }}>
              From the neighbourhood
            </p>
            <h2 className="mt-2 font-serif text-4xl sm:text-5xl" style={{ color: C.navy }}>
              Families who stopped buying supermarket oil
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {VOICES.map((v, i) => (
              <figure
                key={v.author}
                className="relative rounded-2xl p-7"
                style={{
                  background: i === 1 ? C.mustard : C.paperDark,
                  color: i === 1 ? C.navy : C.ink,
                  transform: `rotate(${i === 0 ? -1.2 : i === 1 ? 0.8 : -0.6}deg)`,
                  boxShadow: `6px 6px 0 ${C.navy}`,
                }}
              >
                <span className="absolute -top-5 left-6 font-serif text-7xl leading-none" style={{ color: C.navy }} aria-hidden>
                  &ldquo;
                </span>
                <blockquote className="mt-4 leading-relaxed">{v.quote}</blockquote>
                <figcaption className="mt-5 border-t pt-4 text-sm" style={{ borderColor: 'rgba(14,42,71,.25)' }}>
                  <span className="font-bold">{v.author}</span>
                  <span className="opacity-70"> · {v.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UNITS ═══ */}
      <StoreLocatorSection id="find-store" />

      {/* ═══ ORDER SLIP — WhatsApp CTA ═══ */}
      <section className="px-4 py-12 sm:px-6 sm:py-24" style={{ background: C.mustard }}>
        <div
          className="mx-auto max-w-3xl p-5 sm:p-8 sm:p-12"
          style={{
            background: C.paper,
            border: `3px dashed ${C.navy}`,
            borderRadius: 20,
            boxShadow: `clamp(6px, 1.5vw, 10px) clamp(6px, 1.5vw, 10px) 0 ${C.navy}`,
          }}
        >
          <div className="flex items-start justify-between gap-4 sm:gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mustardDeep }}>
                Order slip
              </p>
              <h2 className="mt-1 sm:mt-2 font-serif text-2xl sm:text-4xl" style={{ color: C.navy }}>
                Tell us what you need. We&rsquo;ll bring it.
              </h2>
            </div>
            <span
              className={`${deva.className} hidden shrink-0 text-right text-3xl sm:block sm:text-4xl lg:text-5xl`}
              style={{ color: C.mustardDeep, lineHeight: 1.4 }}
              aria-hidden
            >
              शुद्ध तेल और<br />देसी घी
            </span>
          </div>

          <dl className="mt-6 sm:mt-8 divide-y text-xs sm:text-sm" style={{ borderColor: 'rgba(14,42,71,.2)' }}>
            {[
              ['Delivery area', 'Delhi NCR'],
              ['Orders above ₹799', 'Free doorstep delivery'],
              ['Orders below ₹799', '₹100 delivery fee'],
              ['Unit hours', '10:00 AM – 8:30 PM, all 7 days'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 py-2.5 sm:py-3" style={{ borderColor: 'rgba(14,42,71,.2)' }}>
                <dt className="opacity-70">{k}</dt>
                <dd className="font-semibold text-right" style={{ color: C.navy }}>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={waOrder}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full px-5 sm:px-7 py-3.5 sm:py-4 font-semibold text-white transition-transform hover:-translate-y-0.5 active:scale-[0.98] text-center text-xs sm:text-sm"
              style={{ background: '#1FAF54' }}
            >
              <FaWhatsapp className="text-lg sm:text-xl shrink-0" />
              <span>Order on WhatsApp ({SITE_CONFIG.contact.whatsapp})</span>
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 px-5 sm:px-7 py-3.5 sm:py-4 font-semibold transition-colors hover:bg-white/60 active:scale-[0.98] text-center text-xs sm:text-sm"
              style={{ borderColor: C.navy, color: C.navy }}
            >
              Or shop online <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}