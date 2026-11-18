"use client";

/**
 * RKW Contact Experience
 * A guided, story-driven contact page:
 *  - a friendly shopkeeper guide who chats with the visitor (order / visit / advice / stories / anything else)
 *  - Instagram-style full-screen stories (the Kolhu, Bilona ghee, seed origins, doorstep delivery)
 *  - live "open now" status, unit cards with directions, direct contact
 *
 * Put at: components/ContactExperience.tsx
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FiArrowRight, FiClock, FiMail, FiMapPin, FiNavigation, FiPhone, FiRotateCcw, FiSend, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SITE_CONFIG } from "@/config/site";

// -------------------------------------------------------------- config

/** Rename the guide, or drop in a real photo (e.g. "/images/guide.jpg") to replace the illustration. */
const GUIDE_NAME = "Your RKW Guide";
const GUIDE_PHOTO: string | null = null;

const WA_BASE = `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}`;
const waLink = (text: string) => `${WA_BASE}?text=${encodeURIComponent(text)}`;
const mapsLink = (q: string) => `https://maps.google.com/?q=${encodeURIComponent(q)}`;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Store = (typeof SITE_CONFIG.stores)[number];

// -------------------------------------------------------------- stories

type Slide = {
    eyebrow: string;
    title: string;
    body: string;
    emoji: string;
    cta?: { label: string; action: "order" | "visit" | "close" };
};
type Story = { id: string; label: string; emoji: string; bg: string; slides: Slide[] };

const STORIES: Story[] = [
    {
        id: "kolhu",
        label: "The Kolhu",
        emoji: "🪵",
        bg: "from-[#3b1501] via-[#7a1426] to-[#1b0f06]",
        slides: [
            {
                eyebrow: "Since 1981",
                title: "Oil, the way it was meant to be pressed",
                body: "Ramesh Kolhu Wale is built around one idea: a traditional cold-press Kolhu, running slowly, with nothing hidden.",
                emoji: "🪵"
            },
            {
                eyebrow: "Cold Press",
                title: "Slow, so nothing burns",
                body: "Seeds are crushed gently without friction heat. No hexane, no bleaching, no chemical refining, so the aroma and goodness stay in the bottle.",
                emoji: "✨"
            },
            {
                eyebrow: "Single pressed",
                title: "One press. One ingredient.",
                body: "Every bottle is 100% pure oil from a single pressing of one seed or nut. No added colour, no preservatives.",
                emoji: "🌻"
            },
            {
                eyebrow: "Live",
                title: "Watch it pressed before your eyes",
                body: "Walk into any of our 4 Delhi NCR Units and see your oil being extracted fresh.",
                emoji: "👀",
                cta: { label: "Find a Unit near me", action: "visit" }
            }
        ]
    },
    {
        id: "ghee",
        label: "Bilona Ghee",
        emoji: "🐄",
        bg: "from-[#4a2e08] via-[#b8860b] to-[#2a1a05]",
        slides: [
            {
                eyebrow: "Step 1",
                title: "Slow-boiled desi cow milk",
                body: "Fresh whole cow milk is boiled slowly, then cultured into curd (dahi).",
                emoji: "🥛"
            },
            {
                eyebrow: "Step 2",
                title: "Hand-churned with a bilona",
                body: "The curd is churned by hand to bring up fresh makkhan, the butter that gives bilona ghee its character.",
                emoji: "🫙"
            },
            {
                eyebrow: "Step 3",
                title: "Heated to golden",
                body: "The makkhan is gently heated until it turns into golden, granular (danedar) ghee.",
                emoji: "✨"
            },
            {
                eyebrow: "Pure",
                title: "Nothing else goes in",
                body: "No preservatives, no artificial colour or essence. Just 100% pure Dahi Bilona Desi Cow Ghee.",
                emoji: "🙏",
                cta: { label: "Order Bilona Ghee", action: "order" }
            }
        ]
    },
    {
        id: "origins",
        label: "Origins",
        emoji: "🌾",
        bg: "from-[#052e1a] via-[#166534] to-[#04140c]",
        slides: [
            {
                eyebrow: "Rajasthan",
                title: "Mustard country",
                body: "Our yellow and black mustard seeds are sourced from Rajasthan.",
                emoji: "🌼"
            },
            {
                eyebrow: "West & South",
                title: "Peanuts, sesame & coconut",
                body: "Groundnut and white sesame from Gujarat, coconuts from Kerala and Tiptur in Karnataka, sunflower seeds from Karnataka.",
                emoji: "🥥"
            },
            {
                eyebrow: "Kashmir",
                title: "Almonds & walnuts",
                body: "Mamra and Gurbandi almonds and walnuts come from the valleys of Kashmir.",
                emoji: "🌰"
            },
            {
                eyebrow: "Across India",
                title: "Flax, black sesame & onion seed",
                body: "Flax from Madhya Pradesh, black sesame from West Bengal, onion seeds from Maharashtra.",
                emoji: "🇮🇳",
                cta: { label: "Start an order", action: "order" }
            }
        ]
    },
    {
        id: "doorstep",
        label: "Doorstep",
        emoji: "🛵",
        bg: "from-[#07131f] via-[#0E2A47] to-[#020a12]",
        slides: [
            {
                eyebrow: "Step 1",
                title: "Message us on WhatsApp",
                body: `Tell us what you need on ${SITE_CONFIG.contact.whatsapp} or ${SITE_CONFIG.contact.whatsappSecondary}.`,
                emoji: "💬"
            },
            {
                eyebrow: "Delivery",
                title: "Free above ₹799",
                body: "Express doorstep delivery across Delhi NCR is free on orders above ₹799, and ₹100 below that.",
                emoji: "🛵"
            },
            {
                eyebrow: "Always open",
                title: `${SITE_CONFIG.contact.unitHours}`,
                body: `Our Units are open ${SITE_CONFIG.contact.unitDays}. Drop in any time during these hours.`,
                emoji: "🕙",
                cta: { label: "Order now", action: "order" }
            }
        ]
    }
];

function StoryViewer({
    story,
    onClose,
    onAction
}: {
    story: Story;
    onClose: () => void;
    onAction: (a: "order" | "visit") => void;
}) {
    const DURATION = 5500;
    const [i, setI] = useState(0);
    const [pct, setPct] = useState(0);
    const [paused, setPaused] = useState(false);
    const downAt = useRef(0);
    const last = story.slides.length - 1;

    const next = useCallback(() => {
        if (i >= last) return onClose();
        setI(i + 1);
        setPct(0);
    }, [i, last, onClose]);

    const prev = useCallback(() => {
        setI(Math.max(0, i - 1));
        setPct(0);
    }, [i]);

    useEffect(() => {
        if (paused) return;
        const t0 = performance.now() - (pct / 100) * DURATION;
        let raf = 0;
        const tick = (now: number) => {
            const p = Math.min(100, ((now - t0) / DURATION) * 100);
            setPct(p);
            if (p >= 100) return next();
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i, paused]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [next, prev, onClose]);

    const slide = story.slides[i];

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-0 backdrop-blur-md sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${story.label} story`}
        >
            <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 26 }}
                className={`relative h-dvh w-full select-none overflow-hidden bg-gradient-to-b text-white sm:h-[min(88dvh,780px)] sm:max-w-[420px] sm:rounded-[32px] ${story.bg}`}
                onPointerDown={() => {
                    downAt.current = performance.now();
                    setPaused(true);
                }}
                onPointerUp={(e) => {
                    setPaused(false);
                    if (performance.now() - downAt.current < 250) {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        if (x < rect.width * 0.35) prev();
                        else next();
                    }
                }}
                onPointerLeave={() => setPaused(false)}
            >
                {/* progress */}
                <div className="absolute inset-x-3 top-3 z-20 flex gap-1.5">
                    {story.slides.map((_, idx) => (
                        <div key={idx} className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
                            <div className="h-full rounded-full bg-white" style={{ width: idx < i ? "100%" : idx === i ? `${pct}%` : "0%" }} />
                        </div>
                    ))}
                </div>

                {/* header */}
                <div className="absolute inset-x-4 top-7 z-20 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="grid size-9 place-items-center rounded-full bg-white/15 text-lg backdrop-blur">{story.emoji}</div>
                        <div className="leading-tight">
                            <p className="text-sm font-bold">{story.label}</p>
                            <p className="text-[11px] text-white/70">Ramesh Kolhu Wale</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        aria-label="Close story"
                        onPointerDown={(e) => e.stopPropagation()}
                        onPointerUp={(e) => e.stopPropagation()}
                        onClick={onClose}
                        className="grid size-9 place-items-center rounded-full bg-black/30 backdrop-blur transition hover:bg-black/50"
                    >
                        <FiX className="size-5" />
                    </button>
                </div>

                {/* floating motif */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`emoji-${i}`}
                        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 1.4 }}
                        transition={{ type: "spring", stiffness: 140, damping: 14 }}
                        className="pointer-events-none absolute inset-x-0 top-[17%] text-center text-[120px] drop-shadow-2xl sm:text-[140px]"
                    >
                        <motion.span animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="inline-block">
                            {slide.emoji}
                        </motion.span>
                    </motion.div>
                </AnimatePresence>

                {/* text */}
                <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-6 pb-10 pt-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`txt-${i}`}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35 }}
                        >
                            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-300">{slide.eyebrow}</p>
                            <h3 className="mt-2 font-serif text-3xl font-bold leading-tight sm:text-[34px]">{slide.title}</h3>
                            <p className="mt-3 text-[15px] leading-relaxed text-white/85">{slide.body}</p>
                            {slide.cta && (
                                <button
                                    type="button"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onPointerUp={(e) => e.stopPropagation()}
                                    onClick={() => (slide.cta!.action === "close" ? onClose() : onAction(slide.cta!.action as "order" | "visit"))}
                                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-300 px-5 py-2.5 text-sm font-black text-[#3b1501] shadow-lg transition hover:bg-amber-200"
                                >
                                    {slide.cta.label} <FiArrowRight />
                                </button>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    );
}

// -------------------------------------------------------------- guide avatar

function GuideAvatar({ className, face = false }: { className?: string; face?: boolean }) {
    if (GUIDE_PHOTO) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={GUIDE_PHOTO} alt={GUIDE_NAME} className={`${className ?? ""} object-cover`} />;
    }
    return (
        <svg viewBox={face ? "42 30 116 116" : "0 0 200 230"} className={className} aria-hidden>
            {/* kurta */}
            <path d="M22 230 C22 176 58 154 100 154 C142 154 178 176 178 230 Z" fill="#0E2A47" />
            <path d="M84 154 L100 188 L116 154 Z" fill="#F2EEE5" />
            <circle cx="100" cy="196" r="2.4" fill="#B8860B" />
            <circle cx="100" cy="208" r="2.4" fill="#B8860B" />
            {/* oil drop badge */}
            <path d="M142 190 q-7 9 -7 14 a7 7 0 0 0 14 0 q0 -5 -7 -14z" fill="#FAB800" stroke="#B8860B" strokeWidth="1" />
            {/* neck + head */}
            <rect x="88" y="134" width="24" height="26" rx="8" fill="#D9A576" />
            <circle cx="57" cy="102" r="8" fill="#D9A576" />
            <circle cx="143" cy="102" r="8" fill="#D9A576" />
            <circle cx="100" cy="100" r="44" fill="#E8B98A" />
            {/* cap */}
            <path d="M55 92 Q56 50 100 48 Q144 50 145 92 Q122 80 100 80 Q78 80 55 92 Z" fill="#F8F4EA" stroke="#D2CAB5" strokeWidth="1.5" />
            <path d="M58 90 Q100 76 142 90" fill="none" stroke="#CFC6AE" strokeWidth="1.2" />
            {/* brows + eyes */}
            <path d="M76 97 Q84 92 92 96" stroke="#2a1b12" strokeWidth="2.6" fill="none" strokeLinecap="round" />
            <path d="M108 96 Q116 92 124 97" stroke="#2a1b12" strokeWidth="2.6" fill="none" strokeLinecap="round" />
            <motion.ellipse
                cx="84"
                cy="106"
                rx="3.6"
                ry="4"
                fill="#1b110b"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ repeat: Infinity, duration: 4.2, times: [0, 0.46, 0.5, 0.54, 1] }}
            />
            <motion.ellipse
                cx="116"
                cy="106"
                rx="3.6"
                ry="4"
                fill="#1b110b"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{ repeat: Infinity, duration: 4.2, times: [0, 0.46, 0.5, 0.54, 1] }}
            />
            <circle cx="75" cy="118" r="6" fill="#E59A7A" opacity="0.35" />
            <circle cx="125" cy="118" r="6" fill="#E59A7A" opacity="0.35" />
            {/* nose, mustache, smile */}
            <path d="M100 108 q-4 8 0 11" stroke="#C48A5E" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M76 122 Q89 113 100 120 Q111 113 124 122 Q113 130 100 125 Q87 130 76 122 Z" fill="#2a1b12" />
            <path d="M90 133 Q100 141 110 133" stroke="#7a3b22" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </svg>
    );
}

// -------------------------------------------------------------- open status

function useOpenStatus() {
    const [status, setStatus] = useState<{ open: boolean; label: string } | null>(null);
    useEffect(() => {
        const calc = () => {
            const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
            const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
            const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
            const mins = h * 60 + m;
            if (mins >= 600 && mins < 1230) setStatus({ open: true, label: "Our Units are open now · closing 8:30 PM" });
            else if (mins < 600) setStatus({ open: false, label: "Units are closed · opening 10:00 AM today" });
            else setStatus({ open: false, label: "Units are closed · opening 10:00 AM tomorrow" });
        };
        calc();
        const t = setInterval(calc, 60000);
        return () => clearInterval(t);
    }, []);
    return status;
}

// -------------------------------------------------------------- chat model

type Opt = { value: string; label: string };
type Body =
    | { kind: "text"; text: string }
    | { kind: "stores" }
    | { kind: "reco"; title: string; why: string }
    | { kind: "summary"; heading: string; lines: [string, string][]; url: string };
type Msg = { id: number; from: "me" | "guide"; body: Body };
type UI =
    | { kind: "choices"; key: string; options: Opt[]; multi?: boolean; canType?: boolean }
    | { kind: "form" }
    | { kind: "free" }
    | null;
type Order = { items: string[]; size: string; area: string; name: string; phone: string; note: string };

const MAIN_OPTS: Opt[] = [
    { value: "order", label: "🛒 I want to order" },
    { value: "visit", label: "🏪 Visit a Unit" },
    { value: "advice", label: "🌿 Which oil is right for me?" },
    { value: "story", label: "📖 Tell me your story" },
    { value: "other", label: "💬 Something else" }
];
const ITEM_OPTS: Opt[] = [
    "Yellow Mustard Oil",
    "Black Mustard Oil",
    "Groundnut Oil",
    "Coconut Oil",
    "Sesame Oil",
    "Almond Rogan",
    "Walnut / Flax Oil",
    "Olive / Sunflower / Onion",
    "Bilona Desi Ghee"
].map((l) => ({ value: l, label: l }));
const SIZE_OPTS: Opt[] = ["200 ml", "500 ml", "1 L", "2 L", "5 L", "Not sure yet"].map((l) => ({ value: l, label: l }));
const AREA_OPTS: Opt[] = [
    { value: "ncr", label: "🛵 Delhi NCR home delivery" },
    { value: "pickup", label: "🏪 I'll pick up from a Unit" },
    { value: "outside", label: "📦 Outside Delhi NCR" }
];
const USE_OPTS: Opt[] = [
    { value: "daily", label: "🍛 Daily cooking" },
    { value: "fry", label: "🍤 Deep frying" },
    { value: "pickle", label: "🌶️ Pickles & authentic jhal" },
    { value: "hair", label: "💇 Hair & skin care" },
    { value: "massage", label: "💆 Massage & joints" },
    { value: "omega", label: "🥗 Salads & omega-3" },
    { value: "ghee", label: "🫓 Rotis, dal & ghee-lovers" }
];
const RECO: Record<string, { title: string; why: string; item: string }> = {
    daily: {
        title: "Pure Cold-Pressed Yellow Mustard Oil",
        why: "Naturally sweeter with a mild golden aroma, made for everyday sabzi and dal. If you like a nutty, non-sticky tadka, our Groundnut Oil is a lovely alternative.",
        item: "Yellow Mustard Oil"
    },
    fry: {
        title: "Cold-Pressed Groundnut Oil",
        why: "Pressed from Saurashtra peanuts with a high smoke point (around 225°C), so puris and samosas come out crisp without a greasy aftertaste.",
        item: "Groundnut Oil"
    },
    pickle: {
        title: "Traditional Black Mustard Oil",
        why: "The pungent, high-jhal mustard oil for achaar, fish curries and traditional North Indian cooking.",
        item: "Black Mustard Oil"
    },
    hair: {
        title: "100% Pure Mamra Badam Rogan",
        why: "A pure, food-grade almond oil from Kashmiri Mamra almonds, popular for hair, skin and under-eye care. Our Onion Oil is a favourite for the scalp.",
        item: "Almond Rogan"
    },
    massage: {
        title: "White or Black Sesame Oil",
        why: "Sesame is the classic Ayurvedic massage oil. Warm it gently for body massage; black sesame is the traditional pick for hair roots and joints.",
        item: "Sesame Oil"
    },
    omega: {
        title: "Flax Seed or Walnut Oil",
        why: "Rich plant-based omega-3. Drizzle over dal, salads or smoothies and keep it unheated. For salads, our Extra Virgin Olive Oil shines too.",
        item: "Walnut / Flax Oil"
    },
    ghee: {
        title: "Dahi Bilona Desi Cow Ghee",
        why: "Hand-churned from cultured curd and heated to a golden, granular finish. A spoon on hot rotis or dal is all it takes.",
        item: "Bilona Desi Ghee"
    }
};
const AREA_TEXT: Record<string, string> = {
    ncr: "Home delivery, Delhi NCR (free above ₹799, ₹100 below)",
    pickup: "Pick-up from a Unit",
    outside: "Outside Delhi NCR (shipping to be confirmed)"
};

// -------------------------------------------------------------- chat pieces

function Dots() {
    return (
        <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-stone-200">
            {[0, 1, 2].map((d) => (
                <motion.span
                    key={d}
                    className="size-1.5 rounded-full bg-[#0E2A47]/60"
                    animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: d * 0.15 }}
                />
            ))}
        </div>
    );
}

function StoreCards() {
    return (
        <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
            {SITE_CONFIG.stores.map((s: Store, idx: number) => (
                <div key={s.id} className="w-[220px] flex-shrink-0 snap-start rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-stone-200">
                    <span className="rounded bg-[#0E2A47] px-2 py-0.5 text-[10px] font-bold text-white">{s.unitNumber}</span>
                    {idx === 0 && <span className="ml-1.5 rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">Flagship</span>}
                    <p className="mt-2 text-sm font-semibold text-[#0E2A47]">{s.name.replace("RKW ", "")}</p>
                    <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-[#5A5248]">{s.address}</p>
                    <a
                        href={mapsLink(s.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-[#0E2A47] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[#163A60]"
                    >
                        <FiNavigation className="size-3" /> Directions
                    </a>
                </div>
            ))}
        </div>
    );
}

function Bubble({ m }: { m: Msg }) {
    const b = m.body;
    if (m.from === "me" && b.kind === "text") {
        return (
            <motion.div initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex justify-end">
                <div className="max-w-[82%] rounded-2xl rounded-br-md bg-[#0E2A47] px-4 py-2.5 text-sm text-white shadow-sm">{b.text}</div>
            </motion.div>
        );
    }
    return (
        <motion.div initial={{ opacity: 0, y: 10, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex items-end gap-2">
            <div className="mb-0.5 size-7 flex-shrink-0 overflow-hidden rounded-full bg-amber-200 ring-1 ring-amber-300">
                <GuideAvatar face className="size-full" />
            </div>
            <div className="min-w-0 max-w-[88%]">
                {b.kind === "text" && (
                    <div className="rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-sm leading-relaxed text-[#1C1A16] shadow-sm ring-1 ring-stone-200">{b.text}</div>
                )}
                {b.kind === "stores" && <StoreCards />}
                {b.kind === "reco" && (
                    <div className="rounded-2xl border-l-4 border-[#B8860B] bg-white p-4 shadow-sm ring-1 ring-stone-200">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#B8860B]">My pick for you</p>
                        <p className="mt-1 font-serif text-lg font-semibold leading-snug text-[#0E2A47]">{b.title}</p>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-[#5A5248]">{b.why}</p>
                    </div>
                )}
                {b.kind === "summary" && (
                    <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-stone-200">
                        <div className="bg-[#0E2A47] px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.25em] text-amber-300">{b.heading}</div>
                        <dl className="space-y-1.5 border-b border-dashed border-stone-300 px-4 py-3 text-[13px]">
                            {b.lines.map(([k, v]) => (
                                <div key={k} className="flex gap-3">
                                    <dt className="w-16 flex-shrink-0 font-semibold text-[#5A5248]">{k}</dt>
                                    <dd className="font-medium text-[#1C1A16]">{v}</dd>
                                </div>
                            ))}
                        </dl>
                        <a
                            href={b.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-[#25D366] px-4 py-3 text-sm font-black text-white transition hover:bg-[#20bd5a]"
                        >
                            <FaWhatsapp className="size-5" /> Send on WhatsApp
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

function Choices({
    ui,
    onPick,
    onType
}: {
    ui: Extract<UI, { kind: "choices" }>;
    onPick: (key: string, picked: Opt[]) => void;
    onType: () => void;
}) {
    const [sel, setSel] = useState<string[]>([]);
    const toggle = (v: string) => setSel((s) => (s.includes(v) ? s.filter((x) => x !== v) : [...s, v]));
    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {ui.options.map((o, idx) => {
                    const on = sel.includes(o.value);
                    return (
                        <motion.button
                            key={o.value}
                            type="button"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => (ui.multi ? toggle(o.value) : onPick(ui.key, [o]))}
                            className={`rounded-full border px-3.5 py-2 text-[13px] font-semibold transition ${on
                                    ? "border-[#B8860B] bg-[#B8860B] text-white shadow"
                                    : "border-[#0E2A47]/25 bg-white text-[#0E2A47] hover:border-[#0E2A47] hover:bg-[#0E2A47] hover:text-white"
                                }`}
                        >
                            {o.label}
                        </motion.button>
                    );
                })}
            </div>
            <div className="mt-2.5 flex items-center justify-between gap-2">
                {ui.canType ? (
                    <button type="button" onClick={onType} className="text-[11px] font-semibold text-[#0E2A47]/70 underline-offset-2 hover:underline">
                        ✍️ Type my own question
                    </button>
                ) : (
                    <span />
                )}
                {ui.multi && (
                    <button
                        type="button"
                        disabled={sel.length === 0}
                        onClick={() => onPick(ui.key, ui.options.filter((o) => sel.includes(o.value)))}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#0E2A47] px-4 py-2 text-xs font-black text-amber-300 transition disabled:opacity-35"
                    >
                        Done ({sel.length}) <FiArrowRight />
                    </button>
                )}
            </div>
        </div>
    );
}

function ContactForm({ onSubmit }: { onSubmit: (v: { name: string; phone: string; note: string }) => void }) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [note, setNote] = useState("");
    const [err, setErr] = useState("");
    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const digits = phone.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
        if (name.trim().length < 2) return setErr("Please tell me your name 🙂");
        if (!/^[6-9]\d{9}$/.test(digits)) return setErr("Please enter a valid 10-digit mobile number");
        onSubmit({ name: name.trim(), phone: digits, note: note.trim() });
    };
    const field =
        "w-full rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm text-[#1C1A16] outline-none transition focus:border-[#0E2A47] focus:ring-2 focus:ring-[#0E2A47]/15";
    return (
        <form onSubmit={submit} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
                <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                <input className={field} placeholder="Mobile number" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
            </div>
            <input className={field} placeholder="Address / landmark or note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
            <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-medium text-rose-600">{err}</p>
                <button type="submit" className="inline-flex items-center gap-1.5 rounded-full bg-[#0E2A47] px-4 py-2 text-xs font-black text-amber-300 transition hover:bg-[#163A60]">
                    Make my order slip <FiArrowRight />
                </button>
            </div>
        </form>
    );
}

function FreeInput({ onSend }: { onSend: (t: string) => void }) {
    const [t, setT] = useState("");
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (t.trim()) onSend(t.trim());
            }}
            className="flex items-end gap-2"
        >
            <textarea
                value={t}
                onChange={(e) => setT(e.target.value)}
                rows={2}
                placeholder="Type your question or message…"
                className="flex-1 resize-none rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#0E2A47] focus:ring-2 focus:ring-[#0E2A47]/15"
            />
            <button type="submit" aria-label="Send" className="grid size-11 flex-shrink-0 place-items-center rounded-full bg-[#0E2A47] text-amber-300 transition hover:bg-[#163A60]">
                <FiSend />
            </button>
        </form>
    );
}

// -------------------------------------------------------------- main component

const TIPS = [
    "Tap a story to see how we work 👇",
    "Tell me what you need and I'll make your order slip.",
    "Not sure which oil? I'll help you pick.",
    "Come watch your oil being pressed live!"
];

export default function ContactExperience() {
    const reduce = useReducedMotion();
    const status = useOpenStatus();

    const [msgs, setMsgs] = useState<Msg[]>([]);
    const [typing, setTyping] = useState(false);
    const [ui, setUi] = useState<UI>(null);
    const [story, setStory] = useState<{ story: Story; from: "chat" | "page" } | null>(null);
    const [tip, setTip] = useState(0);

    const idRef = useRef(0);
    const run = useRef(0);
    const alive = useRef(false);
    const started = useRef(false);
    const scroller = useRef<HTMLDivElement>(null);
    const order = useRef<Order>({ items: [], size: "", area: "", name: "", phone: "", note: "" });

    useEffect(() => {
        const t = setInterval(() => setTip((x) => (x + 1) % TIPS.length), 4500);
        return () => clearInterval(t);
    }, []);

    useEffect(() => {
        scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
    }, [msgs, typing, ui]);

    const addMe = (text: string) => setMsgs((m) => [...m, { id: ++idRef.current, from: "me", body: { kind: "text", text } }]);

    const say = useCallback(async (items: (string | Body)[]) => {
        const my = run.current;
        setUi(null);
        for (const it of items) {
            if (run.current !== my || !alive.current) return false;
            const body: Body = typeof it === "string" ? { kind: "text", text: it } : it;
            setTyping(true);
            await sleep(Math.min(1500, 450 + (body.kind === "text" ? body.text.length : 50) * 14));
            if (run.current !== my || !alive.current) return false;
            setTyping(false);
            setMsgs((m) => [...m, { id: ++idRef.current, from: "guide", body }]);
            await sleep(220);
        }
        return true;
    }, []);

    const showMain = useCallback(() => setUi({ kind: "choices", key: "main", options: MAIN_OPTS, canType: true }), []);

    const greet = useCallback(
        async (again = false) => {
            const ok = again
                ? await say(["Namaste again! 🙏 Fresh start.", "What can I help you with?"])
                : await say([
                    "Namaste! 🙏 I'm your guide at Ramesh Kolhu Wale.",
                    "Our oils are pressed slowly without friction heat, in a traditional Kolhu, and I'd love to help you find the right one.",
                    "What brings you here today?"
                ]);
            if (ok) showMain();
        },
        [say, showMain]
    );

    useEffect(() => {
        alive.current = true;
        if (!started.current) {
            started.current = true;
            greet();
        }
        return () => {
            alive.current = false;
        };
    }, [greet]);

    const restart = () => {
        run.current++;
        setMsgs([]);
        setTyping(false);
        setUi(null);
        order.current = { items: [], size: "", area: "", name: "", phone: "", note: "" };
        greet(true);
    };

    const askSize = async () => {
        if (await say(["Which pack size should I note? We go from 200 ml up to 5 L (and 15 kg tins)."])) {
            setUi({ kind: "choices", key: "order-size", options: SIZE_OPTS });
        }
    };

    const handle = async (key: string, picked: Opt[]) => {
        const labels = picked.map((p) => p.label).join(", ");
        const v = picked[0]?.value ?? "";
        addMe(labels);
        setUi(null);

        switch (key) {
            case "main": {
                if (v === "order") {
                    if (await say(["Wonderful! I'll note it down like a proper shopkeeper 😊", "Which oils or ghee would you like? Pick as many as you like."]))
                        setUi({ kind: "choices", key: "order-items", options: ITEM_OPTS, multi: true });
                } else if (v === "visit") {
                    const ok = await say([
                        `Come see the press at work! We have ${SITE_CONFIG.stores.length} Units across Delhi NCR, open ${SITE_CONFIG.contact.unitDays}, ${SITE_CONFIG.contact.unitHours}.`,
                        { kind: "stores" },
                        "Tap Directions on any card and I'll point you the way."
                    ]);
                    if (ok)
                        setUi({
                            kind: "choices",
                            key: "visit-next",
                            options: [
                                { value: "see", label: "👀 What will I see there?" },
                                { value: "order", label: "🛒 Order instead" },
                                { value: "back", label: "← Back to start" }
                            ]
                        });
                } else if (v === "advice") {
                    if (await say(["Happy to help! What will you mainly use the oil for?"])) setUi({ kind: "choices", key: "oil-use", options: USE_OPTS });
                } else if (v === "story") {
                    if (await say(["Pull up a stool 🪑 Which story shall I tell?"]))
                        setUi({
                            kind: "choices",
                            key: "story-pick",
                            options: STORIES.map((s) => ({ value: s.id, label: `${s.emoji} ${s.label}` }))
                        });
                } else {
                    if (await say(["Of course! Type your question below and I'll pass it straight to the team on WhatsApp."])) setUi({ kind: "free" });
                }
                break;
            }

            case "order-items": {
                order.current.items = picked.map((p) => p.value);
                await askSize();
                break;
            }

            case "order-size": {
                order.current.size = v;
                if (await say(["Lovely. And where should this reach you?"])) setUi({ kind: "choices", key: "order-area", options: AREA_OPTS });
                break;
            }

            case "order-area": {
                order.current.area = v;
                const lines =
                    v === "ncr"
                        ? ["Home delivery across Delhi NCR is free above ₹799, and ₹100 below that. 🛵"]
                        : v === "pickup"
                            ? ["Pick-up it is! And you can watch your oil being pressed live. 😄"]
                            : ["We'll confirm shipping to your city on WhatsApp. 📦"];
                if (await say([...lines, "Last step: your name and mobile number, so the team can confirm."])) setUi({ kind: "form" });
                break;
            }

            case "visit-next": {
                if (v === "see") {
                    if (await say(["Your oil, pressed fresh, right in front of you. Here's the story 👇"])) setStory({ story: STORIES[0], from: "chat" });
                } else if (v === "order") {
                    await handle("main", [{ value: "order", label: "🛒 I want to order" }]);
                } else {
                    showMain();
                }
                break;
            }

            case "oil-use": {
                const r = RECO[v];
                order.current.items = [r.item];
                const ok = await say(["Got it. Here's what I'd put in your kitchen:", { kind: "reco", title: r.title, why: r.why }, "What would you like to do next?"]);
                if (ok)
                    setUi({
                        kind: "choices",
                        key: "oil-after",
                        options: [
                            { value: "orderthis", label: "🛒 Order this" },
                            { value: "another", label: "↺ Try another use" },
                            { value: "back", label: "← Back to start" }
                        ]
                    });
                break;
            }

            case "oil-after": {
                if (v === "orderthis") {
                    if (await say(["Great pick! 👌"])) await askSize();
                } else if (v === "another") {
                    if (await say(["Sure. What's the use this time?"])) setUi({ kind: "choices", key: "oil-use", options: USE_OPTS });
                } else showMain();
                break;
            }

            case "story-pick": {
                const s = STORIES.find((x) => x.id === v);
                if (s) setStory({ story: s, from: "chat" });
                break;
            }

            case "after": {
                if (v === "again") await handle("main", [{ value: "order", label: "🛒 Start another order" }]);
                else if (v === "story") await handle("main", [{ value: "story", label: "📖 Tell me your story" }]);
                else await handle("main", [{ value: "visit", label: "🏪 Visit a Unit" }]);
                break;
            }
        }
    };

    const submitForm = async (f: { name: string; phone: string; note: string }) => {
        const o = order.current;
        o.name = f.name;
        o.phone = f.phone;
        o.note = f.note;
        addMe(`${f.name} · ${f.phone}`);
        setUi(null);
        const lines: [string, string][] = [
            ["Items", o.items.join(", ")],
            ["Size", o.size],
            ["Delivery", AREA_TEXT[o.area] ?? o.area],
            ["Name", o.name],
            ["Phone", o.phone]
        ];
        if (o.note) lines.push(["Note", o.note]);
        const text =
            `Namaste Ramesh Kolhu Wale! 🙏\nI'd like to order:\n\n` +
            lines.map(([k, v]) => `*${k}:* ${v}`).join("\n") +
            `\n\nPlease confirm availability and delivery.`;
        const ok = await say([
            `Thank you, ${f.name}! 🙏 Here's your order slip. One tap sends it to our team on WhatsApp.`,
            { kind: "summary", heading: "Your order slip", lines, url: waLink(text) },
            "Anything else I can do for you?"
        ]);
        if (ok)
            setUi({
                kind: "choices",
                key: "after",
                options: [
                    { value: "again", label: "↺ Start another order" },
                    { value: "story", label: "📖 Hear a story" },
                    { value: "visit", label: "🏪 Visit a Unit" }
                ]
            });
    };

    const submitFree = async (t: string) => {
        addMe(t);
        setUi(null);
        const ok = await say([
            "Thank you! 🙏 Tap below and your message goes straight to our team on WhatsApp.",
            { kind: "summary", heading: "Your message", lines: [["Message", t]], url: waLink(`Namaste Ramesh Kolhu Wale! 🙏\n\n${t}`) }
        ]);
        if (ok) showMain();
    };

    const closeStory = async () => {
        const from = story?.from;
        setStory(null);
        if (from === "chat") {
            if (await say(["Hope that gave you a feel for how we work 🌿", "Anything else I can help with?"])) showMain();
        }
    };

    const storyAction = (a: "order" | "visit") => {
        setStory(null);
        run.current++;
        handle("main", [{ value: a, label: a === "order" ? "🛒 I want to order" : "🏪 Visit a Unit" }]);
        document.getElementById("guide-chat")?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <div className="font-sans">
            {/* ================= HERO: guide + chat ================= */}
            <section className="relative overflow-hidden bg-[#07131f] text-[#F2EEE5]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_20%_0%,rgba(250,184,0,0.22),transparent_65%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(14,42,71,0.9),transparent_70%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(90deg,#fff_0,#fff_1px,transparent_1px,transparent_80px)]" />
                {[
                    { l: "6%", t: "18%", s: 10, d: 0 },
                    { l: "44%", t: "8%", s: 7, d: 1.2 },
                    { l: "90%", t: "30%", s: 12, d: 0.6 },
                    { l: "30%", t: "80%", s: 8, d: 2 }
                ].map((o, k) => (
                    <motion.span
                        key={k}
                        aria-hidden
                        className="pointer-events-none absolute rounded-full bg-amber-300/40 blur-[1px]"
                        style={{ left: o.l, top: o.t, width: o.s, height: o.s }}
                        animate={reduce ? undefined : { y: [0, -24, 0], opacity: [0.2, 0.7, 0.2] }}
                        transition={{ duration: 6, repeat: Infinity, delay: o.d }}
                    />
                ))}

                <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8">
                    <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                        {/* LEFT */}
                        <div>
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300"
                            >
                                Get in Touch
                            </motion.p>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mt-3 font-serif text-4xl font-normal leading-[1.1] sm:text-5xl lg:text-6xl"
                            >
                                Namaste! Let&apos;s find your <span className="text-amber-300">perfect oil.</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.25 }}
                                className="mt-4 max-w-lg font-light leading-relaxed text-[#F2EEE5]/75"
                            >
                                Walk into any of our {SITE_CONFIG.stores.length} Delhi NCR Units to see your oil cold-pressed live, or chat with our guide for express doorstep
                                delivery (free above ₹799, ₹100 below).
                            </motion.p>

                            {/* Guide */}
                            <div className="mt-8 flex items-end gap-4">
                                <motion.div
                                    animate={reduce ? undefined : { y: [0, -6, 0] }}
                                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative size-32 flex-shrink-0 overflow-hidden rounded-[28px] bg-gradient-to-b from-amber-200 to-amber-400 shadow-[0_18px_40px_rgba(0,0,0,0.5)] ring-2 ring-amber-300/60 sm:size-44"
                                >
                                    <GuideAvatar className="absolute inset-x-0 bottom-0 h-[110%] w-full" />
                                </motion.div>
                                <div className="relative mb-6 min-h-[64px] max-w-[260px] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm font-medium text-[#0E2A47] shadow-xl">
                                    <AnimatePresence mode="wait">
                                        <motion.p key={tip} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
                                            {TIPS[tip]}
                                        </motion.p>
                                    </AnimatePresence>
                                </div>
                            </div>
                            <p className="mt-2 text-xs font-semibold tracking-wide text-amber-200/80">{GUIDE_NAME}</p>

                            {/* Stories */}
                            <div className="mt-7">
                                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.3em] text-[#F2EEE5]/60">Stories</p>
                                <div className="flex gap-4 overflow-x-auto pb-1">
                                    {STORIES.map((s, idx) => (
                                        <motion.button
                                            key={s.id}
                                            type="button"
                                            onClick={() => setStory({ story: s, from: "page" })}
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.3 + idx * 0.08, type: "spring" }}
                                            whileHover={{ y: -4 }}
                                            whileTap={{ scale: 0.94 }}
                                            className="group flex flex-shrink-0 flex-col items-center gap-1.5"
                                        >
                                            <span className="rounded-full bg-gradient-to-tr from-amber-300 via-[#B8860B] to-rose-400 p-[3px] shadow-lg">
                                                <span className="grid size-16 place-items-center rounded-full bg-[#0E2A47] text-2xl ring-2 ring-[#07131f] transition group-hover:bg-[#163A60]">
                                                    {s.emoji}
                                                </span>
                                            </span>
                                            <span className="text-[11px] font-semibold text-[#F2EEE5]/85">{s.label}</span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Status + quick contact */}
                            <div className="mt-7 space-y-3">
                                {status && (
                                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur">
                                        <span className="relative flex size-2.5">
                                            {status.open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
                                            <span className={`relative inline-flex size-2.5 rounded-full ${status.open ? "bg-emerald-400" : "bg-rose-400"}`} />
                                        </span>
                                        {status.label}
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2.5">
                                    <a
                                        href={WA_BASE}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#20bd5a]"
                                    >
                                        <FaWhatsapp className="size-4" /> WhatsApp
                                    </a>
                                    <a
                                        href={`tel:${SITE_CONFIG.contact.phoneRaw}`}
                                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-bold ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
                                    >
                                        <FiPhone className="size-4" /> Call us
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: chat */}
                        <motion.div
                            id="guide-chat"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 90, damping: 18 }}
                            className="relative flex h-[660px] max-h-[86dvh] flex-col overflow-hidden rounded-[28px] bg-[#FAF8F3] text-[#1C1A16] shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
                        >
                            {/* header */}
                            <div className="flex items-center gap-3 bg-gradient-to-r from-[#0E2A47] to-[#163A60] px-4 py-3 text-white">
                                <div className="size-10 overflow-hidden rounded-full bg-amber-200 ring-2 ring-amber-300/70">
                                    <GuideAvatar face className="size-full" />
                                </div>
                                <div className="min-w-0 flex-1 leading-tight">
                                    <p className="truncate text-sm font-bold">{GUIDE_NAME}</p>
                                    <p className="flex items-center gap-1.5 text-[11px] text-white/70">
                                        <span className="size-1.5 rounded-full bg-emerald-400" /> Online · orders finish on WhatsApp
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={restart}
                                    aria-label="Start over"
                                    title="Start over"
                                    className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
                                >
                                    <FiRotateCcw className="size-4" />
                                </button>
                            </div>

                            {/* messages */}
                            <div
                                ref={scroller}
                                className="flex-1 space-y-3 overflow-y-auto bg-[radial-gradient(circle_at_1px_1px,rgba(14,42,71,0.07)_1px,transparent_0)] px-4 py-4 [background-size:18px_18px]"
                            >
                                {msgs.map((m) => (
                                    <Bubble key={m.id} m={m} />
                                ))}
                                {typing && (
                                    <div className="flex items-end gap-2">
                                        <div className="size-7 flex-shrink-0 overflow-hidden rounded-full bg-amber-200 ring-1 ring-amber-300">
                                            <GuideAvatar face className="size-full" />
                                        </div>
                                        <Dots />
                                    </div>
                                )}
                            </div>

                            {/* composer */}
                            <div className="min-h-[96px] border-t border-stone-200 bg-white/80 p-3 backdrop-blur">
                                <AnimatePresence mode="wait">
                                    {ui?.kind === "choices" && (
                                        <motion.div key={ui.key} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <Choices key={ui.key} ui={ui} onPick={handle} onType={() => handle("main", [{ value: "other", label: "✍️ Let me type something" }])} />
                                        </motion.div>
                                    )}
                                    {ui?.kind === "form" && (
                                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <ContactForm onSubmit={submitForm} />
                                        </motion.div>
                                    )}
                                    {ui?.kind === "free" && (
                                        <motion.div key="free" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <FreeInput onSend={submitFree} />
                                        </motion.div>
                                    )}
                                    {!ui && <p className="py-3 text-center text-xs italic text-stone-400">{GUIDE_NAME} is typing…</p>}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ================= UNITS ================= */}
            <section className="border-b border-[#E8E0D0] bg-[#F2EEE5] py-20 sm:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
                        <div className="max-w-xl">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#B8860B]">Visit us</p>
                            <h2 className="font-serif text-3xl font-normal leading-tight text-[#1C1A16] sm:text-4xl">
                                Our {SITE_CONFIG.stores.length} Units: see the Kolhu at work
                            </h2>
                            <p className="mt-3 font-light leading-relaxed text-[#5A5248]">
                                All Units are open {SITE_CONFIG.contact.unitDays}, {SITE_CONFIG.contact.unitHours}. Come anytime and watch your oil freshly extracted before your eyes.
                            </p>
                        </div>
                        <Link href="/stores" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E2A47] hover:underline">
                            View full details <FiArrowRight />
                        </Link>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                        {/* Flagship */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.6 }}
                            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E2A47] to-[#07131f] p-8 text-white shadow-xl sm:p-10"
                        >
                            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-amber-300/15 blur-3xl" />
                            <div className="relative">
                                <div className="grid size-14 place-items-center rounded-full bg-amber-300 text-[#0E2A47] shadow-lg">
                                    <FiMapPin className="size-6" />
                                </div>
                                <span className="mt-5 inline-block rounded bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-200">
                                    UNIT-01 (Flagship)
                                </span>
                                <h3 className="mt-2 font-serif text-3xl font-normal">Khureji Khas</h3>
                                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/75">
                                    B-2, Village Khurreji Khas, West Laxmi Market, Nr. HP Petrol Pump (Opp. Samuday Bhawan), Delhi-51
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <a
                                        href="https://maps.google.com/?q=West+Laxmi+Market+Khureji+Khas+Delhi+110051"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full bg-amber-300 px-6 py-2.5 text-sm font-bold text-[#0E2A47] transition hover:bg-amber-200"
                                    >
                                        Open in Google Maps
                                    </a>
                                    <Link href="/stores" className="rounded-full bg-white/10 px-6 py-2.5 text-sm font-semibold ring-1 ring-white/20 transition hover:bg-white/20">
                                        View All {SITE_CONFIG.stores.length} Units
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Unit cards */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            {SITE_CONFIG.stores.map((s: Store, idx: number) => (
                                <motion.div
                                    key={s.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                                    whileHover={{ y: -6 }}
                                    className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                                >
                                    <span className="w-fit rounded bg-[#0E2A47] px-2 py-0.5 text-[10px] font-bold text-white">{s.unitNumber}</span>
                                    <p className="mt-2 text-sm font-semibold text-[#0E2A47]">{s.name.replace("RKW ", "")}</p>
                                    <p className="mt-1 flex-1 text-xs leading-relaxed text-[#5A5248]">{s.address}</p>
                                    <a
                                        href={mapsLink(s.address)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#0E2A47] hover:underline"
                                    >
                                        <FiNavigation className="size-3.5" /> Get directions
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= DIRECT CONTACT ================= */}
            <section className="relative overflow-hidden bg-[#07131f] py-20 text-[#F2EEE5] sm:py-24">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(250,184,0,0.16),transparent_70%)]" />
                <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Prefer a quiet word?</p>
                        <h2 className="mt-3 font-serif text-3xl font-normal sm:text-4xl">Reach us directly</h2>
                    </div>

                    <div className="mt-10 grid gap-4 md:grid-cols-3">
                        {[
                            {
                                href: `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}`,
                                icon: <FaWhatsapp className="size-6" />,
                                title: "WhatsApp: fastest response",
                                text: `${SITE_CONFIG.contact.whatsapp} / ${SITE_CONFIG.contact.whatsappSecondary}`,
                                bg: "bg-[#25D366]",
                                ext: true
                            },
                            {
                                href: `tel:${SITE_CONFIG.contact.phoneRaw}`,
                                icon: <FiPhone className="size-5" />,
                                title: "Call us",
                                text: `${SITE_CONFIG.contact.phone} / ${SITE_CONFIG.contact.phoneSecondary}`,
                                bg: "bg-amber-300 !text-[#0E2A47]",
                                ext: false
                            },
                            {
                                href: `mailto:${SITE_CONFIG.contact.email}`,
                                icon: <FiMail className="size-5" />,
                                title: "Email",
                                text: SITE_CONFIG.contact.email,
                                bg: "bg-white !text-[#0E2A47]",
                                ext: false
                            }
                        ].map((c, idx) => (
                            <motion.a
                                key={c.title}
                                href={c.href}
                                {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="group rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10"
                            >
                                <span className={`grid size-12 place-items-center rounded-full text-white shadow-lg ${c.bg}`}>{c.icon}</span>
                                <p className="mt-4 font-semibold">{c.title}</p>
                                <p className="mt-1 break-words text-sm text-[#F2EEE5]/70">{c.text}</p>
                            </motion.a>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white/5 px-6 py-5 text-center ring-1 ring-white/10">
                        <span className="grid size-10 place-items-center rounded-full bg-white/10">
                            <FiClock className="size-4 text-amber-300" />
                        </span>
                        <p className="text-sm text-[#F2EEE5]/80">
                            <span className="font-semibold text-white">Unit Operating Hours:</span> {SITE_CONFIG.contact.unitDays}: {SITE_CONFIG.contact.unitHours}. For doorstep delivery
                            across Delhi NCR, call or WhatsApp {SITE_CONFIG.contact.whatsapp} / {SITE_CONFIG.contact.whatsappSecondary}.
                        </p>
                    </div>
                </div>
            </section>

            {/* ================= STORY VIEWER ================= */}
            <AnimatePresence>
                {story && <StoryViewer key={story.story.id} story={story.story} onClose={closeStory} onAction={storyAction} />}
            </AnimatePresence>
        </div>
    );
}