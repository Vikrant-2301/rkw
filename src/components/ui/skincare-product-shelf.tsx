"use client";

/**
 * Product Shelf. Originally designed by Aakash Mehra.
 * Adapted & Customized for Ramesh Kolhu Wale (RKW) Pure Wood-Pressed Oils & Vedic Bilona Ghee.
 *
 * A store wall of three floating shelves with twelve authentic wood-pressed oils & Vedic ghee,
 * drawn to look like studio product shots: cylinder shading with softbox reflections, printed type,
 * ridged caps, transparent glass with visible golden mustard/seed oil liquid and thick glass bases.
 * Click one and it moves from its place on the shelf to the left of a product page and turns once,
 * its authentic RKW sticker wrapping round the body. Drag it to turn it yourself; let go and it
 * carries your speed, then settles facing front.
 */

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from "react";
import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { ChevronDown, ChevronLeft, Minus, Plus, ShoppingBag, Star, ShieldCheck, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export type Kind =
  | "bottle"
  | "round-bottle"
  | "tin"
  | "jar"
  | "dropper"
  | "tube"
  | "pump"
  | "perfume"
  | "mist"
  | "stick"
  | "lip";

export type Product = {
  id: string;
  kind: Kind;
  name: string;
  /** Name printed on the pack, with an optional second line. */
  short: string;
  sub?: string;
  category: string;
  /** Body colour, cap colour, label colour, print colour. */
  color: string;
  cap: string;
  label: string;
  ink: string;
  /** See-through glass, and the colour of what is inside. */
  glass?: boolean;
  liquid?: string;
  price: number;
  compareAt?: number;
  sizes: string[];
  rating: number;
  reviews: number;
  tagline: string;
  description: string;
  benefits: string[];
  ingredients: string;
  howTo: string;
};

/**
 * Default RKW Product Catalog
 * Configured with authentic bottle stickers, volume sizes (200ml, 500ml, 1L, 2L, 5L)
 * from OIL STICKER 500 ML.pdf and FINAL OIL STICKER ROUND BOTTLE.pdf.
 */
export const DEFAULT_PRODUCTS: Product[] = [
  // --- ROW 1: Signature Mustard Oils & Vedic Bilona Ghee ---
  {
    id: "black-mustard-oil",
    kind: "round-bottle",
    name: "Traditional Wood-Pressed Black Mustard Oil",
    short: "Black Mustard Oil",
    sub: "काली सरसों का तेल (झल वाला)",
    category: "Mustard Oil",
    color: "#e8edea",
    cap: "#6b1424",
    label: "#6b1424",
    ink: "#fbf6ec",
    glass: true,
    liquid: "#a25f0a",
    price: 340,
    compareAt: 420,
    sizes: ["200 ml", "500 ml", "1 Litre", "2 Litres", "5 Litres"],
    rating: 4.9,
    reviews: 1420,
    tagline: "Authentic pungent jhal, single cold-pressed in traditional neem wood Kolhu.",
    description: "The quintessential North Indian kitchen soul. Sourced from high-pungency Rajasthani black mustard seeds (Kali Sarson) crushed slowly at <38°C by Ramesh Kolhu Wale. Retains natural sinigrin for the eye-watering pungency true mustard lovers crave. Ideal for achaar, fish curries and winter massage.",
    benefits: [
      "100% Single-Pressed at <38°C in Lakdi Ka Kolhu",
      "Seeds sourced from Alwar & Bharatpur (Rajasthan)",
      "Zero Palm Oil, Zero Argemone Adulteration",
      "Natural Sinigrin & High Pungency for authentic Indian taste"
    ],
    ingredients: "100% Pure Cold-Pressed Black Mustard Seed Oil (Brassica nigra).",
    howTo: "Heat until light smoking point for traditional curries and pickles, or warm gently for soothing joint and chest massage."
  },
  {
    id: "yellow-mustard-oil",
    kind: "round-bottle",
    name: "Pure Wood-Pressed Yellow Mustard Oil",
    short: "Yellow Mustard Oil",
    sub: "पीली सरसों का तेल (मीठी झल)",
    category: "Mustard Oil",
    color: "#faf6ee",
    cap: "#d48b0a",
    label: "#d48b0a",
    ink: "#1c1404",
    glass: true,
    liquid: "#eab318",
    price: 360,
    compareAt: 450,
    sizes: ["500 ml", "1 Litre", "2 Litres", "5 Litres"],
    rating: 5.0,
    reviews: 2150,
    tagline: "Naturally sweeter with mild golden aroma for everyday healthy curries.",
    description: "Extracted slowly in our authentic wooden Kolhu (Lakdi Ki Ghani) in front of your eyes at less than 38°C. Made exclusively from select Rajasthani native yellow mustard seeds (Pili Sarson) supervised by Ramesh Kolhu Wale. Naturally sweeter, milder, and preserves all vital omega-3 fatty acids without burning the throat.",
    benefits: [
      "Rich in Heart-Healthy MUFA and Omega-3 & 6",
      "Cold-Pressed at 14 RPM with zero chemical refining",
      "Mild Golden Pungency: Perfect appetizing aroma for daily cooking",
      "Extracted from single-origin certified Rajasthani seeds"
    ],
    ingredients: "100% Pure Cold-Pressed Yellow Mustard Seed Oil (Brassica alba).",
    howTo: "Ideal for daily Indian sabzis, dals, shallow sauteing, deep frying, and preserving seasonal pickles."
  },
  {
    id: "vedic-a2-bilona-gir-cow-ghee",
    kind: "jar",
    name: "Vedic A2 Gir Cow Bilona Desi Ghee",
    short: "A2 Gir Cow Ghee",
    sub: "वैदिक बिलोना देसी घी (मंथन विधि)",
    category: "Vedic Bilona Ghee",
    color: "#f6f3eb",
    cap: "#c29139",
    label: "#fbf8f1",
    ink: "#3d280b",
    glass: true,
    liquid: "#f0c64c",
    price: 1450,
    compareAt: 1800,
    sizes: ["250 ml", "500 ml", "1 Litre", "2 Litres"],
    rating: 5.0,
    reviews: 3280,
    tagline: "Handcrafted via 5000-year-old Vedic Bilona method in clay pots.",
    description: "True Ayurvedic liquid gold crafted by Ramesh Kolhu Wale following the authentic 5-samskara Bilona method. Free-grazing desi Gir cows milk is boiled on slow cow dung wood fire, naturally set into whole curd in clay pots, and churned bi-directionally with a wooden mathani to extract fresh makkhan (cultured butter). Simmered to yield fragrant, golden, danedar (granular) A2 Ghee.",
    benefits: [
      "Authentic A2 Beta-Casein Protein for easy digestion",
      "Granular (Danedar) golden texture rich in Butyric Acid",
      "Ayurvedic Medhya Rasayana: Enhances memory and vitality",
      "100% Cultured curd butter source, never from industrial cream separators"
    ],
    ingredients: "100% Pure Clarified Butterfat from Grass-Fed Desi Gir Cow Milk.",
    howTo: "Enjoy 1-2 teaspoons over hot rotis, steaming dal, or stir into warm milk at bedtime for restful sleep and digestion."
  },
  {
    id: "black-mustard-oil-5l-can",
    kind: "tin",
    name: "Black Mustard Oil Heritage 5L Eco Can",
    short: "Mustard 5L Can",
    sub: "5L पारम्परिक टिन कैन (झल वाला)",
    category: "Mustard Oil",
    color: "#e2e6e3",
    cap: "#7a1426",
    label: "#7a1426",
    ink: "#fdf8ef",
    price: 1550,
    compareAt: 1950,
    sizes: ["2 Litres", "5 Litres"],
    rating: 4.9,
    reviews: 980,
    tagline: "Heritage food-grade metal canister that locks in fresh pungent aroma.",
    description: "Our signature high-pungency black mustard oil packed in an authentic food-grade metal tin can. Shields sensitive volatile antioxidants and allyl isothiocyanates from light degradation. Features a leakproof easy-pour spout for hassle-free kitchen decanting.",
    benefits: [
      "100% UV & Light-Proof Metal Packaging",
      "Zero Plastic Leaching into Oil",
      "Built-in Spill-Proof Pouring Spout",
      "Extra family value savings for heavy Indian kitchen usage"
    ],
    ingredients: "100% Pure Cold-Pressed Black Mustard Oil (Lakdi Ki Ghani).",
    howTo: "Pull up the spout ring, decant into your daily glass kitchen cruet, and close the cap tightly."
  },

  // --- ROW 2: Nut & Seed Cold-Pressed Range ---
  {
    id: "wood-pressed-groundnut-oil",
    kind: "round-bottle",
    name: "Wood-Pressed Groundnut Oil (Peanut Oil)",
    short: "Groundnut Oil",
    sub: "मूंगफली का तेल (गुजरात मूंगफली)",
    category: "Nut & Seed Oils",
    color: "#f2edf2",
    cap: "#52164a",
    label: "#52164a",
    ink: "#faeef8",
    glass: true,
    liquid: "#e8af36",
    price: 330,
    compareAt: 410,
    sizes: ["500 ml", "1 Litre", "2 Litres", "5 Litres"],
    rating: 4.8,
    reviews: 890,
    tagline: "Cold pressed from Saurashtra red-skin peanuts. High 232°C smoke point.",
    description: "The golden cooking pride of western and northern India. Pressed in our wooden Kolhu by Ramesh Kolhu Wale from sun-dried sweet Saurashtra peanuts without high temperatures, chemical filtration, or hexane solvents. Imparts a delightful, non-sticky aroma to puris and daily sabzis.",
    benefits: [
      "High Smoke Point (232°C): Ideal for Indian deep frying and tadka",
      "Rich in Natural Resveratrol for cardiovascular protection",
      "Naturally Sweet Nutty Flavor with zero greasy aftertaste",
      "Single-pressed from Saurashtra certified organic farms"
    ],
    ingredients: "100% Pure Cold-Pressed Saurashtra Peanuts (Arachis hypogaea).",
    howTo: "Excellent for frying puris, samosas, sauteing vegetables, and everyday family cooking."
  },
  {
    id: "wood-pressed-white-sesame-oil",
    kind: "round-bottle",
    name: "Wood-Pressed White Sesame Oil (Til Ka Tel)",
    short: "White Sesame Oil",
    sub: "सफेद तिल का तेल (कच्ची घानी)",
    category: "Nut & Seed Oils",
    color: "#f6f1e8",
    cap: "#8f5e13",
    label: "#8f5e13",
    ink: "#fcf8ee",
    glass: true,
    liquid: "#deb15b",
    price: 420,
    compareAt: 520,
    sizes: ["500 ml", "1 Litre", "2 Litres"],
    rating: 4.9,
    reviews: 670,
    tagline: "Ayurveda's supreme king of oils (Sarva Taila Pravara) for bones & joints.",
    description: "In Charaka Samhita, sesame oil is revered as the king of all oils. Extracted slowly in Ramesh Kolhu Wale traditional wooden ghani without toasting or bleaching. Rich in natural sesamin and sesamolin, calms Vata dosha, and ideal for daily oil pulling (Gandusha) and Abhyanga massage.",
    benefits: [
      "Ayurvedic King of Oils: Deeply penetrates and strengthens bone tissue",
      "Rich in Sesamin & Sesamolin for natural heart health",
      "Perfect for Morning Oil Pulling (Gandusha) therapy",
      "Pressed from raw unbleached Gujarat sesame seeds"
    ],
    ingredients: "100% Pure Virgin White Sesame Seeds (Sesamum indicum).",
    howTo: "Swish 1 tablespoon in mouth for 5 minutes in the morning, or warm gently for soothing full-body Abhyanga massage."
  },
  {
    id: "wood-pressed-virgin-coconut-oil",
    kind: "round-bottle",
    name: "Wood-Pressed Virgin Coconut Oil",
    short: "Virgin Coconut Oil",
    sub: "कच्ची घानी गोले का तेल (केरल)",
    category: "Nut & Seed Oils",
    color: "#eef4f0",
    cap: "#1c5432",
    label: "#1c5432",
    ink: "#eefcf3",
    glass: true,
    liquid: "#f5f8f6",
    price: 380,
    compareAt: 475,
    sizes: ["500 ml", "1 Litre", "2 Litres"],
    rating: 4.9,
    reviews: 1120,
    tagline: "Sulfur-free sun-dried Kerala copra pressed at <35°C in neem ghani.",
    description: "Experience the pure tropical magic of Kerala sun-dried coconuts, pressed in our wooden Ghani by Ramesh Kolhu Wale without heat or chemical deodorizers. In winters, it naturally solidifies into a pristine snow-white butter, proving its unrefined purity.",
    benefits: [
      "Over 50% Lauric Acid & Medium Chain Triglycerides (MCTs)",
      "Unrefined & Raw: Natural winter solidification proves genuine cold press",
      "Multipurpose: Edible cooking, keto coffee, and baby skin massage",
      "Zero sulfur bleaching, zero chemical deodorization"
    ],
    ingredients: "100% Pure Sun-Dried Kerala Coconut Copra.",
    howTo: "Use in South Indian recipes, stir into morning keto coffee, or apply directly to hair and skin for deep moisture."
  },
  {
    id: "yellow-mustard-oil-5l-can",
    kind: "tin",
    name: "Yellow Mustard Oil Heritage 5L Eco Can",
    short: "Yellow 5L Can",
    sub: "5L पारम्परic टिन कैन (पीली सरसों)",
    category: "Mustard Oil",
    color: "#f5eee0",
    cap: "#c48206",
    label: "#c48206",
    ink: "#1f1402",
    price: 1650,
    compareAt: 2100,
    sizes: ["2 Litres", "5 Litres"],
    rating: 5.0,
    reviews: 1240,
    tagline: "Bestseller family pack in authentic protective food-grade eco tin.",
    description: "Our most celebrated yellow mustard oil in heavy-duty food-grade tinplate. Preserves delicate natural Vitamin E and ensures 100% leakproof freshness right to your doorstep. The golden choice for healthy North Indian kitchens.",
    benefits: [
      "Maximum Savings for Active Family Kitchens",
      "Hermetically Sealed Against Heat & Light",
      "Sturdy Carry Handle & Easy Pour Spout",
      "100% Recyclable Eco-Friendly Tinplate"
    ],
    ingredients: "100% Pure Cold-Pressed Yellow Mustard Seeds.",
    howTo: "Convenient master reserve for months of flavorful, healthy Indian cooking."
  },

  // --- ROW 3: Wellness Rogan, Exotic Seeds & Artisanal Oils ---
  {
    id: "pure-badam-rogan-almond-oil",
    kind: "dropper",
    name: "100% Pure Badam Rogan (Sweet Almond Oil)",
    short: "Pure Badam Rogan",
    sub: "शुद्ध बादाम रोगन (मामरा बादाम)",
    category: "Wellness Rogan",
    color: "#f2ede9",
    cap: "#8b2a16",
    label: "#8b2a16",
    ink: "#fbf5f2",
    glass: true,
    liquid: "#dda835",
    price: 490,
    compareAt: 650,
    sizes: ["50 ml", "100 ml", "200 ml"],
    rating: 5.0,
    reviews: 1580,
    tagline: "Single-press extra-virgin sweet almond elixir from Mamra almonds.",
    description: "Gold standard elixir for neural health, radiant skin, and silky hair. Extracted without heat from grade-A sweet almonds by Ramesh Kolhu Wale. Unlike cosmetic synthetic oils packed with mineral paraffin, RKW Badam Rogan is 100% pure food-grade and therapeutic.",
    benefits: [
      "100% Pure Food-Grade & Edible: Safe to take orally with warm milk",
      "Rich in Natural Biotin & Vitamin E for healthy hair and scalp",
      "Natural Under-Eye Dark Circle Eraser and facial glow booster",
      "Zero liquid paraffin, zero synthetic perfume, zero chemical additives"
    ],
    ingredients: "100% Pure Extra Virgin Sweet Almond Oil (Prunus dulcis).",
    howTo: "Drink 5-10 drops in warm milk at night for memory and sleep, or apply 2-3 drops topically under eyes and on face."
  },
  {
    id: "cold-pressed-walnut-oil",
    kind: "bottle",
    name: "Cold-Pressed Kashmiri Walnut Oil (अखरोट तेल)",
    short: "Kashmiri Walnut Oil",
    sub: "कश्मीरी अखरोट का तेल (लकड़ी घानी)",
    category: "Wellness Rogan",
    color: "#ede9e6",
    cap: "#3d1e13",
    label: "#3d1e13",
    ink: "#f6eee9",
    glass: true,
    liquid: "#ba741c",
    price: 580,
    compareAt: 720,
    sizes: ["500 ml", "1 Litre"],
    rating: 4.8,
    reviews: 410,
    tagline: "Cold pressed from high-altitude whole Kashmiri walnut kernels.",
    description: "Extracted in small wooden batches from prized Kashmiri walnuts. Exceptional concentration of Alpha-Linolenic Acid (ALA) and polyphenols for cardiovascular wellness, memory enhancement, and radiant skin.",
    benefits: [
      "Plant-Based Omega-3 Superfood for Brain & Heart",
      "Rich in Neuro-Protective Antioxidants and Melatonin",
      "Delicate Roasted Walnut Aroma for gourmet dining",
      "Cold extracted without solvents or chemical refinement"
    ],
    ingredients: "100% Pure Cold-Pressed Walnut Kernels (Juglans regia).",
    howTo: "Drizzle over freshly tossed salads, pasta, warm soups, or massage gently into scalp for follicle strength."
  },
  {
    id: "cold-pressed-flax-seed-oil",
    kind: "bottle",
    name: "Cold-Pressed Flax Seed Oil (अलसी का तेल)",
    short: "Flax Seed Oil (Alsi)",
    sub: "अलसी का तेल (मध्य प्रदेश अलसी)",
    category: "Wellness Rogan",
    color: "#e8edf5",
    cap: "#193563",
    label: "#193563",
    ink: "#eef4fd",
    glass: true,
    liquid: "#ce9222",
    price: 390,
    compareAt: 480,
    sizes: ["500 ml", "1 Litre"],
    rating: 4.7,
    reviews: 530,
    tagline: "Mother Nature's richest plant source of Alpha-Linolenic Acid (ALA).",
    description: "Pressed below 32°C from Madhya Pradesh organic brown flaxseeds. Never heated and unfiltered to preserve delicate lignans and essential omega-3 fatty acids that support cellular vitality and joint flexibility.",
    benefits: [
      "Over 55% Vegetarian Omega-3 Fatty Acids (ALA)",
      "Supports Joint Flexibility, Heart Rhythm, and Blood Pressure",
      "Raw and Unrefined: Retains natural protective lignans",
      "Cold pressed in small hygienic batches"
    ],
    ingredients: "100% Pure Cold-Pressed Brown Flax Seeds (Linum usitatissimum).",
    howTo: "Take 1 tablespoon daily with morning meals, blend into fresh smoothies, or drizzle over dal. Do not heat."
  },
  {
    id: "cold-pressed-extra-virgin-olive-oil",
    kind: "bottle",
    name: "Cold-Pressed Extra Virgin Olive Oil (जैतून तेल)",
    short: "Extra Virgin Olive Oil",
    sub: "एक्स्ट्रा वर्जिन जैतून का तेल",
    category: "Wellness Rogan",
    color: "#edf3ee",
    cap: "#173f27",
    label: "#173f27",
    ink: "#eefbee",
    glass: true,
    liquid: "#839328",
    price: 620,
    compareAt: 780,
    sizes: ["500 ml", "1 Litre"],
    rating: 4.9,
    reviews: 720,
    tagline: "Single-estate cold pressed from Rajasthan olive groves.",
    description: "First mechanical cold press of handpicked olives harvested in Rajasthan. Exhibits a fresh herbal aroma with a distinct peppery finish, proving high oleocanthal and polyphenol content.",
    benefits: [
      "Ultra-low Acidity (<0.5% Free Fatty Acids)",
      "High Oleic Acid and Potent Natural Antioxidants",
      "First Mechanical Cold Press, Zero Chemical Extraction",
      "Authentic Indian Olive Initiative Single Estate"
    ],
    ingredients: "100% Pure Extra Virgin Olive Oil (Olea europaea).",
    howTo: "Drizzle generously over raw salads, warm breads, grilled vegetables, hummus, and Mediterranean bowls."
  }
];

// ---------- colour helpers ----------

type RGB = [number, number, number];
const hexRgb = (h: string): RGB => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16)
];
const mixRgb = (a: RGB, b: RGB, t: number): RGB => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t
];
const css = (c: RGB, k = 1, a = 1) =>
  `rgba(${[0, 1, 2].map((i) => Math.round(Math.min(255, Math.max(0, c[i] * k)))).join(",")},${a})`;
const WHITE: RGB = [255, 255, 255];
const lum = (c: RGB) => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11;

// ---------- packaging shapes (viewBox 200 x 300, stands on y = 286) ----------

type Box = { x: number; y: number; w: number; h: number };
type Shape = {
  body: string;
  box: Box;
  print: Box & { paper?: boolean };
  fill?: number;
  tube?: boolean;
  cap: (id: string) => ReactNode;
};

const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;

const ridges = (x: number, y: number, w: number, h: number, step = 2.6) =>
  Array.from({ length: Math.floor(w / step) }, (_, i) => (
    <line
      key={i}
      x1={x + 1 + i * step}
      y1={y + 1.5}
      x2={x + 1 + i * step}
      y2={y + h - 1.5}
      stroke="#000"
      strokeOpacity={i % 2 ? 0.16 : 0.07}
      strokeWidth="1"
    />
  ));

const SHAPES: Record<Kind, Shape> = {
  // 1. Round Mustard Oil Bottle (Inspired by FINAL OIL STICKER ROUND BOTTLE.pdf)
  "round-bottle": {
    body: "M66 94 Q66 74 88 70 L112 70 Q134 74 134 94 L139 268 Q139 286 122 286 L78 286 Q61 286 61 268 Z",
    box: { x: 61, y: 70, w: 78, h: 216 },
    print: { x: 61, y: 122, w: 78, h: 118, paper: true },
    fill: 96,
    cap: (id) => (
      <>
        {/* Ribbed Oil Screw Cap with Pour Nozzle Neck */}
        <path d={rr(76, 44, 48, 28, 5)} fill={`url(#${id}-cap)`} />
        <g>{ridges(76, 48, 48, 22, 2.4)}</g>
        <path d={rr(76, 44, 48, 28, 5)} fill={`url(#${id}-capv)`} />
        {/* Tamper evident safety ring */}
        <path d="M78 56 H122" stroke="#000" strokeOpacity="0.35" strokeWidth="1" />
        <path d="M78 45.5 H122" stroke="#fff" strokeOpacity="0.5" strokeWidth="1" />
      </>
    )
  },

  // 2. Standard 500ml Cold Pressed Oil Bottle (OIL STICKER 500 ML.pdf)
  bottle: {
    body: "M63 110 Q63 84 86 80 L114 80 Q137 84 137 110 L140 268 Q140 286 122 286 L78 286 Q60 286 60 268 Z",
    box: { x: 60, y: 80, w: 80, h: 206 },
    print: { x: 60, y: 130, w: 80, h: 114, paper: true },
    fill: 104,
    cap: (id) => (
      <>
        <path d={rr(78, 50, 44, 32, 5)} fill={`url(#${id}-cap)`} />
        <g>{ridges(78, 54, 44, 26, 2.3)}</g>
        <path d={rr(78, 50, 44, 32, 5)} fill={`url(#${id}-capv)`} />
        <path d="M80 62 H120" stroke="#000" strokeOpacity="0.4" />
        <path d="M80 51.5 H120" stroke="#fff" strokeOpacity="0.45" />
      </>
    )
  },

  // 3. Heritage 2L & 5L Oil Can / Metal Tin
  tin: {
    body: rr(48, 102, 104, 184, 8),
    box: { x: 48, y: 102, w: 104, h: 184 },
    print: { x: 52, y: 126, w: 96, h: 142, paper: true },
    cap: (id) => (
      <>
        {/* Metal curved wire handle */}
        <path d="M70 102 C70 56 130 56 130 102" fill="none" stroke="#555" strokeWidth="6.5" strokeLinecap="round" />
        <path d="M70 102 C70 56 130 56 130 102" fill="none" stroke="#e0e0e0" strokeWidth="3.5" strokeLinecap="round" />
        {/* Top nozzle & pour spout cap */}
        <rect x="54" y="80" width="18" height="22" rx="3" fill={`url(#${id}-cap)`} />
        <path d={rr(52, 74, 22, 10, 2)} fill={`url(#${id}-cap)`} />
        <g>{ridges(52, 76, 22, 7, 2)}</g>
        {/* Tin crimped top seam */}
        <path d="M50 104 H150" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.6" />
        <path d="M48 106.5 H152" stroke="#000" strokeOpacity="0.25" strokeWidth="1" />
      </>
    )
  },

  // 4. Vedic Bilona Desi Ghee Heritage Glass Jar
  jar: {
    body: "M42 192 H158 Q164 192 164 200 V276 Q164 286 150 286 H50 Q36 286 36 276 V200 Q36 192 42 192 Z",
    box: { x: 36, y: 192, w: 128, h: 94 },
    print: { x: 42, y: 214, w: 116, h: 58, paper: true },
    fill: 198,
    cap: (id) => (
      <>
        {/* Golden Brass / Metallic Churn Jar Lid */}
        <path d={rr(34, 160, 132, 34, 6)} fill={`url(#${id}-cap)`} />
        <g>{ridges(34, 166, 132, 26, 2.5)}</g>
        <path d={rr(34, 160, 132, 34, 6)} fill={`url(#${id}-capv)`} />
        <path d="M40 162 H160" stroke="#fff" strokeOpacity="0.75" strokeWidth="1.4" />
        <rect x="36" y="192" width="128" height="3" fill="#000" opacity="0.22" />
      </>
    )
  },

  // 5. Amber Glass Precision Dropper for Badam Rogan
  dropper: {
    body: "M64 165 Q64 148 86 146 L86 138 L114 138 L114 146 Q136 148 136 165 L136 272 Q136 286 122 286 L78 286 Q64 286 64 272 Z",
    box: { x: 64, y: 138, w: 72, h: 148 },
    print: { x: 64, y: 184, w: 72, h: 76, paper: true },
    fill: 160,
    cap: (id) => (
      <>
        {/* Rubber Bulb for Dropper */}
        <path d="M86 116 V84 Q86 60 100 60 Q114 60 114 84 V116 Z" fill={`url(#${id}-bulb)`} />
        <path d="M91 72 Q93 64 100 63" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Ribbed Dropper Collar */}
        <path d={rr(80, 114, 40, 26, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(80, 114, 40, 26, 2.2)}</g>
        <path d={rr(80, 114, 40, 26, 3)} fill={`url(#${id}-capv)`} />
      </>
    )
  },

  // Fallbacks for cosmetic kinds to preserve complete backwards compatibility
  tube: {
    body: "M80 250 L67 74 Q66 60 74 58 L126 58 Q134 60 133 74 L120 250 Z",
    box: { x: 66, y: 58, w: 68, h: 192 },
    print: { x: 66, y: 104, w: 68, h: 110 },
    cap: (id) => (
      <>
        <path d={`M62 40 H138 V58 H62 Z`} fill={`url(#${id}-body)`} />
        <path d={rr(73, 248, 54, 38, 7)} fill={`url(#${id}-cap)`} />
        <g>{ridges(73, 256, 54, 28, 2.4)}</g>
        <path d={rr(73, 248, 54, 38, 7)} fill={`url(#${id}-capv)`} />
      </>
    )
  },
  pump: {
    body: "M58 136 Q58 110 84 108 L116 108 Q142 110 142 136 L142 272 Q142 286 128 286 L72 286 Q58 286 58 272 Z",
    box: { x: 58, y: 108, w: 84, h: 178 },
    print: { x: 58, y: 160, w: 84, h: 90 },
    tube: true,
    fill: 132,
    cap: (id) => (
      <>
        <rect x="95.5" y="60" width="9" height="32" fill={`url(#${id}-cap)`} />
        <path d="M82 50 H126 Q132 50 132 55 V64 H78 V55 Q78 50 82 50 Z" fill={`url(#${id}-cap)`} />
        <path d={rr(80, 88, 40, 22, 3)} fill={`url(#${id}-cap)`} />
      </>
    )
  },
  perfume: {
    body: "M58 166 H142 Q154 166 156 178 L158 270 Q158 286 142 286 H58 Q42 286 42 270 L44 178 Q46 166 58 166 Z",
    box: { x: 42, y: 166, w: 116, h: 120 },
    print: { x: 66, y: 204, w: 68, h: 44 },
    fill: 178,
    cap: (id) => (
      <>
        <rect x="88" y="150" width="24" height="18" fill={`url(#${id}-cap)`} />
        <path d={rr(70, 96, 60, 56, 4)} fill={`url(#${id}-cap)`} />
      </>
    )
  },
  mist: {
    body: "M62 154 Q62 130 86 128 L114 128 Q138 130 138 154 L138 272 Q138 286 124 286 L76 286 Q62 286 62 272 Z",
    box: { x: 62, y: 128, w: 76, h: 158 },
    print: { x: 62, y: 178, w: 76, h: 78 },
    tube: true,
    fill: 168,
    cap: (id) => <path d={rr(82, 110, 36, 22, 3)} fill={`url(#${id}-cap)`} />
  },
  lip: {
    body: "M89 250 L85 152 Q85 144 91 143 L109 143 Q115 144 115 152 L111 250 Z",
    box: { x: 85, y: 143, w: 30, h: 107 },
    print: { x: 85, y: 166, w: 30, h: 60 },
    cap: (id) => <path d={rr(86, 248, 28, 38, 5)} fill={`url(#${id}-cap)`} />
  },
  stick: {
    body: rr(81, 224, 38, 62, 4),
    box: { x: 81, y: 224, w: 38, h: 62 },
    print: { x: 81, y: 236, w: 38, h: 38 },
    cap: (id) => <path d={rr(81, 168, 38, 58, 5)} fill={`url(#${id}-cap)`} />
  }
};

const EXTENT: Record<Kind, { top: number; w: number }> = {
  jar: { top: 160, w: 132 },
  bottle: { top: 50, w: 84 },
  "round-bottle": { top: 44, w: 84 },
  tin: { top: 60, w: 106 },
  dropper: { top: 60, w: 72 },
  tube: { top: 37, w: 76 },
  pump: { top: 50, w: 101 },
  perfume: { top: 96, w: 116 },
  mist: { top: 80, w: 76 },
  stick: { top: 166, w: 38 },
  lip: { top: 128, w: 34 }
};

const pageZoom = (k: Kind) => Math.min(2.2, 262 / (290 - EXTENT[k].top), 190 / EXTENT[k].w);

// ---------- The Product Drawing with Cylinder Shading & Spinning Label ----------

function ProductArt({ p, spin, className }: { p: Product; spin?: MotionValue<number>; className?: string }) {
  const id = "ps" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const s = SHAPES[p.kind] || SHAPES["round-bottle"];
  const c = hexRgb(p.color);
  const k = hexRgb(p.cap);
  const lab = hexRgb(p.label);
  const a = p.glass ? (lum(c) > 200 ? 0.32 : 0.78) : 1;
  const liq = hexRgb(p.liquid ?? p.color);
  const { print: P, box: B } = s;
  const period = P.w * 2.6; // Wrap period for 360-degree rotation
  const fallback = useMotionValue(0);
  const x = useTransform(spin ?? fallback, (v) => -((((v * period) % period) + period) % period));
  const nameSize = Math.min(9.5, P.w * 0.11, (P.w * 1.1) / p.short.length);
  const subSize = Math.min(6.2, P.w * 0.075, (P.w * 1.2) / (p.sub ?? "").length);

  const printArt = (dx: number) => {
    const isRound = p.kind === "round-bottle";
    const isTin = p.kind === "tin";
    const isJar = p.kind === "jar";
    const centerX = P.x + P.w / 2;

    return (
      <g transform={`translate(${dx} 0)`}>
        {P.paper && (
          <rect
            x={P.x}
            y={P.y}
            width={P.w}
            height={P.h}
            rx={isRound ? 6 : 3}
            fill={css(lab)}
            stroke={p.ink}
            strokeWidth={0.8}
            strokeOpacity={0.25}
          />
        )}

        {/* Decorative inner border matching RKW stickers */}
        {P.paper && (
          <rect
            x={P.x + 2}
            y={P.y + 2}
            width={P.w - 4}
            height={P.h - 4}
            rx={isRound ? 4 : 2}
            fill="none"
            stroke={p.ink}
            strokeWidth={0.6}
            strokeOpacity={0.35}
            strokeDasharray={isTin ? "3 1.5" : undefined}
          />
        )}

        {/* Brand Header: Authentic RKW Logo & Typography */}
        <g transform={`translate(${centerX} ${P.y + P.h * 0.16})`}>
          <circle cx="-16" cy="-2" r="4.2" fill={p.ink} />
          <circle cx="-16" cy="-2" r="3" fill={css(lab)} />
          <path d="M-17.5 -2 H-14.5 M-16 -3.5 V-0.5" stroke={p.ink} strokeWidth="0.8" />
          <text
            x="0"
            y="0.5"
            fill={p.ink}
            fontSize={Math.min(7.5, P.w * 0.09)}
            fontWeight="800"
            letterSpacing="0.08em"
            textAnchor="middle"
          >
            RKW
          </text>
          <text x="11.5" y="-2" fill={p.ink} fontSize="3.5" fontWeight="bold">®</text>
        </g>

        {/* Hindi Brand Name */}
        <text
          x={centerX}
          y={P.y + P.h * 0.28}
          fill={p.ink}
          fontSize={Math.min(4.8, P.w * 0.055)}
          fontWeight="600"
          opacity="0.9"
          textAnchor="middle"
        >
          रमेश कोल्हू वाले
        </text>

        {/* Product Title (e.g. BLACK MUSTARD OIL) */}
        <text
          x={centerX}
          y={P.y + P.h * 0.46}
          fill={p.ink}
          fontSize={nameSize}
          fontWeight="700"
          letterSpacing="-0.15"
          textAnchor="middle"
        >
          {p.short}
        </text>

        {/* Subtitle / Hindi Name */}
        {p.sub && (
          <text
            x={centerX}
            y={P.y + P.h * 0.61}
            fill={p.ink}
            fontSize={subSize}
            fontWeight="500"
            opacity="0.85"
            textAnchor="middle"
          >
            {p.sub}
          </text>
        )}

        {/* Trust badge stamp */}
        <g transform={`translate(${centerX} ${P.y + P.h * 0.74})`}>
          <rect x="-24" y="-4" width="48" height="8" rx="2" fill={p.ink} fillOpacity="0.1" />
          <text x="0" y="1.8" fill={p.ink} fontSize="3.5" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
            {isJar ? "VEDIC BILONA • 100% PURE" : "WOOD-PRESSED • <38°C"}
          </text>
        </g>

        {/* Bottom row: FSSAI Green Veg Dot & Net Qty */}
        <g transform={`translate(${centerX} ${P.y + P.h * 0.89})`}>
          <rect x={-P.w * 0.38} y="-3.5" width="6" height="6" fill="#fff" stroke="#138808" strokeWidth="0.6" rx="0.5" />
          <circle cx={-P.w * 0.38 + 3} cy="-0.5" r="1.8" fill="#138808" />
          <text x="1" y="0.8" fill={p.ink} opacity="0.95" fontSize={Math.min(5.6, P.w * 0.07)} fontWeight="600" textAnchor="middle">
            {p.sizes[0]}
          </text>
        </g>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 200 300" className={className} aria-hidden overflow="visible">
      <defs>
        {/* Softbox cylinder studio lighting */}
        <linearGradient id={`${id}-body`} x1="0" x2="1">
          <stop offset="0" stopColor={css(c, 0.42, a)} />
          <stop offset="0.06" stopColor={css(c, 0.64, a)} />
          <stop offset="0.1" stopColor={css(c, 0.92, a)} />
          <stop offset="0.16" stopColor={css(mixRgb(c, WHITE, 0.16), 1, a)} />
          <stop offset="0.36" stopColor={css(c, 1.02, a)} />
          <stop offset="0.55" stopColor={css(c, 0.93, a)} />
          <stop offset="0.76" stopColor={css(c, 0.78, a)} />
          <stop offset="0.9" stopColor={css(c, 0.6, a)} />
          <stop offset="0.95" stopColor={css(mixRgb(c, WHITE, 0.14), 0.9, a)} />
          <stop offset="1" stopColor={css(c, 0.5, a)} />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" x2="1">
          <stop offset="0" stopColor={css(k, 0.45)} />
          <stop offset="0.1" stopColor={css(k, 0.75)} />
          <stop offset="0.22" stopColor={css(mixRgb(k, WHITE, 0.65))} />
          <stop offset="0.3" stopColor={css(k, 1.05)} />
          <stop offset="0.6" stopColor={css(k, 0.88)} />
          <stop offset="0.85" stopColor={css(k, 0.62)} />
          <stop offset="0.93" stopColor={css(mixRgb(k, WHITE, 0.2), 0.9)} />
          <stop offset="1" stopColor={css(k, 0.45)} />
        </linearGradient>
        <linearGradient id={`${id}-capv`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.86" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={`${id}-wrap`} x1="0" x2="1">
          <stop offset="0" stopColor={css(c, 0.42)} stopOpacity="1" />
          <stop offset="0.14" stopColor={css(c, 0.42)} stopOpacity="0" />
          <stop offset="0.86" stopColor={css(c, 0.42)} stopOpacity="0" />
          <stop offset="1" stopColor={css(c, 0.42)} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}-liquid`} x1="0" x2="1">
          <stop offset="0" stopColor={css(liq, 0.72)} />
          <stop offset="0.3" stopColor={css(liq, 1.04)} />
          <stop offset="0.7" stopColor={css(liq, 0.94)} />
          <stop offset="1" stopColor={css(liq, 0.72)} />
        </linearGradient>
        <filter id={`${id}-soft`} x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <clipPath id={`${id}-clip`}>
          <path d={s.body} />
        </clipPath>
        <radialGradient id={`${id}-bulb`} cx="0.35" cy="0.25" r="0.9">
          <stop offset="0" stopColor={css(mixRgb(k, WHITE, 0.4))} />
          <stop offset="0.55" stopColor={css(k, 0.9)} />
          <stop offset="1" stopColor={css(k, 0.55)} />
        </radialGradient>
        <radialGradient id={`${id}-floor`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shelf contact shadow */}
      <ellipse cx="100" cy="287" rx={B.w * 0.7} ry="6" fill={`url(#${id}-floor)`} />
      <ellipse cx="100" cy="286.3" rx={B.w * 0.47} ry="1.4" fill="#000" opacity="0.35" />

      {/* Body background */}
      <path d={s.body} fill={`url(#${id}-body)`} />

      {/* Liquid & Glass Layer */}
      <g clipPath={`url(#${id}-clip)`}>
        {p.glass && s.fill !== undefined && (
          <>
            <rect
              x={B.x + 3}
              y={s.fill}
              width={B.w - 6}
              height={286 - s.fill - 8}
              fill={`url(#${id}-liquid)`}
              opacity="0.82"
            />
            {/* Liquid surface meniscus highlight */}
            <rect x={B.x + 3} y={s.fill} width={B.w - 6} height="1.8" fill="#fff" opacity="0.5" />
            {s.tube && (
              <rect x="98.6" y={B.y - 4} width="2.8" height={286 - B.y - 4} fill="#fff" opacity="0.4" />
            )}
            {/* Thick studio glass base */}
            <rect x={B.x} y="274" width={B.w} height="12" fill={css(c, 0.5, 0.55)} />
            <path d={`M${B.x + 6} 275 H${B.x + B.w - 6}`} stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" />
          </>
        )}

        {/* 360-Degree Rotating Sticker Art */}
        <motion.g style={{ x }}>
          {printArt(0)}
          {printArt(period)}
        </motion.g>

        {/* Shadow gradient wrap & vertical reflections */}
        <rect x={B.x} y={P.y - 2} width={B.w} height={P.h + 4} fill={`url(#${id}-wrap)`} opacity="0.5" />
        <rect x={B.x} y={B.y} width={B.w} height={B.h} fill={`url(#${id}-shade)`} />
        {/* Softbox reflection highlights */}
        <rect
          x={B.x + B.w * 0.07}
          y={B.y + 4}
          width={B.w * 0.11}
          height={B.h - 8}
          rx="3"
          fill="#fff"
          opacity={lum(c) > 200 ? 0.45 : 0.3}
          filter={`url(#${id}-soft)`}
        />
        <rect
          x={B.x + B.w * 0.11}
          y={B.y + 6}
          width={B.w * 0.028}
          height={B.h - 12}
          rx="1"
          fill="#fff"
          opacity="0.85"
        />
        <rect
          x={B.x + B.w * 0.86}
          y={B.y + 8}
          width={B.w * 0.025}
          height={B.h - 16}
          rx="1"
          fill="#fff"
          opacity="0.3"
        />
      </g>

      {/* Glass outer contour stroke */}
      <path d={s.body} fill="none" stroke={css(c, 0.45, 0.45)} strokeWidth="0.7" />
      {s.cap(id)}
    </svg>
  );
}

// ---------- Main Product Shelf Component ----------

export type ProductShelfProps = {
  products?: Product[];
  currency?: string;
  className?: string;
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  onAddToCart?: (product: Product, size: string, quantity: number) => void;
};

const SPRING = { type: "spring" as const, bounce: 0, duration: 0.55 };

export function ProductShelf({
  products = DEFAULT_PRODUCTS,
  currency = "₹",
  className,
  children,
  title = "Pure Wood-Pressed Cellar",
  subtitle = "काष्ठ घानी दर्शन • 100% Raw, Unrefined & Cold Pressed below 38°C",
  onAddToCart
}: ProductShelfProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [bag, setBag] = useState(0);
  const [bump, setBump] = useState(0);
  const bagRef = useRef<HTMLButtonElement | null>(null);

  // Cart integration
  let cartContext: ReturnType<typeof useCart> | null = null;
  try {
    cartContext = useCart();
  } catch {
    // Graceful fallback if rendered outside CartProvider
  }

  const effectiveBagCount = cartContext ? cartContext.totalItems : bag;

  // Split into 3 shelves
  const rows = [
    products.slice(0, 4),
    products.slice(4, 8),
    products.slice(8, 12)
  ];
  const open = products.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const handleAddToBag = (product: Product, size: string, qty: number) => {
    setBag((b) => b + qty);
    setBump((n) => n + 1);

    if (onAddToCart) {
      onAddToCart(product, size, qty);
    } else if (cartContext) {
      // Connect to existing RKW CartContext
      const vol = {
        size,
        price: product.price,
        originalPrice: product.compareAt || Math.round(product.price * 1.25),
        packaging: product.kind === "jar" ? "Glass Jar" : product.kind === "tin" ? "Eco Tin" : "Glass Bottle"
      };
      const cartProduct = {
        id: product.id,
        name: product.name,
        hindiName: product.sub || product.name,
        slug: product.id,
        category: product.category,
        shortDesc: product.tagline,
        description: product.description,
        price: product.price,
        originalPrice: product.compareAt || Math.round(product.price * 1.25),
        rating: product.rating,
        reviewsCount: product.reviews,
        inStock: true,
        featured: true,
        bestSeller: false,
        image: "/images/yellow_mustard.jpg",
        volumes: [vol],
        benefits: product.benefits,
        processHighlight: product.tagline,
        smokePoint: "250°C",
        nutritionalInfo: { energy: "884 kcal / 100g" },
        extractionDetails: { method: "Lakdi Ki Ghani (<38°C)" },
        labReportSummary: { purity: "100% Pure Virgin Grade" }
      };
      cartContext.addToCart(cartProduct as any, vol as any, qty);
    }
  };

  const handleBagClick = () => {
    if (cartContext) {
      cartContext.setIsCartOpen(true);
    }
  };

  return (
    <div
      className={cn(
        "relative min-h-dvh w-full overflow-x-hidden bg-[#FAF8F3] font-sans text-[#1C1A16] antialiased",
        className
      )}
    >
      <LayoutGroup>
        <main className="mx-auto w-full max-w-[1140px] px-4 pt-12 pb-16 sm:px-6">
          {/* Section Header */}
          <div className="mb-14 text-center max-w-2xl mx-auto space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
              Interactive Showcase
            </p>
            <h1 className="text-3xl sm:text-4xl font-serif text-[#1C1A16] font-normal tracking-tight">
              {title}
            </h1>
            <p className="text-sm text-[#8A7E6E] leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Shelves Wall */}
          {rows.map((row, r) => (
            <section
              key={r}
              aria-label={["Signature Mustard Oils & Ghee", "Pure Nut & Seed Oils", "Wellness Rogan & Elixirs"][r]}
              className="relative mb-16"
            >
              {/* Shelf Category Header */}
              <div className="mb-3 px-3 sm:px-8 flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-widest">
                <span>
                  {[
                    "01. Pure Mustard Oils & Vedic Bilona Ghee",
                    "02. Pure Cold-Pressed Nut & Seed Oils",
                    "03. Wellness Rogan, Walnut & Artisanal Oils"
                  ][r]}
                </span>
                <span className="text-[11px] font-medium text-emerald-800 lowercase">click bottle to rotate 360°</span>
              </div>

              {/* Products Row Standing on Shelf */}
              <div className="relative z-10 grid grid-cols-4 items-end gap-3 px-3 sm:gap-8 sm:px-8">
                {row.map((p) => (
                  <div key={p.id} className="flex flex-col items-center">
                    {openId === p.id ? (
                      <div className="aspect-[2/3] w-full max-w-[160px]" />
                    ) : (
                      <motion.button
                        layoutId={`product-${p.id}`}
                        type="button"
                        onClick={() => setOpenId(p.id)}
                        aria-label={`${p.name}, ${currency}${p.price}`}
                        transition={SPRING}
                        className="group relative aspect-[2/3] w-full max-w-[160px] cursor-pointer rounded-2xl outline-none transition-transform duration-200 hover:-translate-y-2 focus-visible:ring-2 focus-visible:ring-emerald-800"
                      >
                        <ProductArt p={p} className="size-full drop-shadow-sm group-hover:drop-shadow-md transition-all" />
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>

              {/* Floating 3D Wood Shelf with Soft Shadows */}
              <div aria-hidden className="relative -mt-[6px] h-[18px]">
                <div className="absolute inset-x-0 top-0 h-[9px] bg-gradient-to-b from-[#e3ded4] to-[#fbf9f4] rounded-t-sm" />
                <div className="absolute inset-x-0 top-[9px] h-[9px] bg-gradient-to-b from-[#ede9df] to-[#d6cfc0] shadow-[0_2px_4px_rgba(0,0,0,0.06)]" />
                <div className="absolute inset-x-[2%] top-[18px] h-[36px] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(0,0,0,0.14),transparent)]" />
              </div>

              {/* Product Titles & Prices under shelf */}
              <div className="mt-5 grid grid-cols-4 gap-3 px-3 sm:gap-8 sm:px-8">
                {row.map((p) => (
                  <div key={p.id} className="text-center group cursor-pointer" onClick={() => setOpenId(p.id)}>
                    <div className="text-[13px] leading-snug font-bold text-stone-900 sm:text-[14px] line-clamp-1 group-hover:text-emerald-900 transition-colors">
                      {p.short}
                    </div>
                    {p.sub && (
                      <div className="text-[11px] text-stone-500 font-sans line-clamp-1">
                        {p.sub}
                      </div>
                    )}
                    <div className="mt-1 text-[13px] font-extrabold text-emerald-900 tabular-nums sm:text-[14px]">
                      {currency}{p.price}
                      {p.compareAt && (
                        <span className="ml-1 text-[11px] font-normal text-stone-400 line-through">
                          {currency}{p.compareAt}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        {/* 3D Product Interactive Modal Page with 360 Drag & Rotate */}
        <AnimatePresence>
          {open && (
            <ProductPage
              key={open.id}
              p={open}
              currency={currency}
              onClose={() => setOpenId(null)}
              onAdd={handleAddToBag}
              bagRef={bagRef}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
      {children}
    </div>
  );
}

// ---------- 3D Product Detail Modal with Touch/Mouse 360 Spin ----------

function ProductPage({
  p,
  currency,
  onClose,
  onAdd,
  bagRef
}: {
  p: Product;
  currency: string;
  onClose: () => void;
  onAdd: (product: Product, size: string, qty: number) => void;
  bagRef: RefObject<HTMLButtonElement | null>;
}) {
  const reduce = useReducedMotion();
  const spin = useMotionValue(0);
  const [size, setSize] = useState(p.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [section, setSection] = useState<string | null>("Purity & Benefits");
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const drag = useRef<{ x: number; v: number; samples: { x: number; t: number }[] } | null>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    if (reduce) return;
    // Elegant entrance spin: bottle spins 360 degrees as it arrives
    const c = animate(spin, 1, { duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 });
    return () => c.stop();
  }, [spin, reduce]);

  // Size price multiplier
  const sizeIdx = p.sizes.indexOf(size);
  const sizeMultipliers = [1, 1.85, 3.4, 6.2, 14.5];
  const mult = sizeIdx >= 0 && sizeIdx < sizeMultipliers.length ? sizeMultipliers[sizeIdx] : 1;
  const computedPrice = Math.round(p.price * mult);
  const computedCompareAt = p.compareAt ? Math.round(p.compareAt * mult) : undefined;

  const handleAdd = () => {
    onAdd(p, size, qty);
    setAdded(true);
    bagRef.current?.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.2)" }, { transform: "scale(1)" }],
      { duration: 320, easing: "ease-out" }
    );
    setTimeout(() => setAdded(false), 2000);
  };

  // Drag to rotate bottle: 1:1 rotation with inertial Apple momentum physics
  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    spin.stop();
    drag.current = { x: e.clientX, v: spin.get(), samples: [{ x: e.clientX, t: e.timeStamp }] };
  };

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    spin.set(d.v - (e.clientX - d.x) / 380);
    d.samples.push({ x: e.clientX, t: e.timeStamp });
    if (d.samples.length > 5) d.samples.shift();
  };

  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const first = d.samples[0];
    const last = d.samples[d.samples.length - 1];
    const vx = last.t > first.t ? ((last.x - first.x) / (last.t - first.t)) * 1000 : 0;
    const velocity = -vx / 380;
    const projected = spin.get() + ((velocity / 1000) * 0.998) / (1 - 0.998);
    animate(spin, Math.round(projected), { type: "spring", bounce: 0, duration: 0.9, velocity });
  };

  const sections: [string, ReactNode][] = [
    [
      "Purity & Benefits",
      <ul key="b" className="space-y-2">
        {p.benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-stone-700 text-xs sm:text-sm">
            <Check className="size-4 text-emerald-800 flex-shrink-0 mt-0.5" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    ],
    [
      "Ingredients & Source",
      <div key="i" className="space-y-2 text-xs sm:text-sm text-stone-700">
        <p className="font-semibold text-stone-900">{p.ingredients}</p>
        <p className="text-stone-500">
          Zero chemicals, zero liquid paraffin, zero palm oil, zero argemone seeds. Tested & certified by FSSAI.
        </p>
      </div>
    ],
    [
      "Culinary & Ayurvedic Use",
      <p key="h" className="text-xs sm:text-sm leading-relaxed text-stone-700">
        {p.howTo}
      </p>
    ]
  ];

  return (
    <motion.div role="dialog" aria-modal="true" aria-label={p.name} className="fixed inset-0 z-40 overflow-y-auto">
      <motion.div
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <div className="relative mx-auto grid min-h-full max-w-[1100px] grid-cols-1 items-center gap-8 px-4 pt-16 pb-12 md:grid-cols-[1.05fr_1fr] md:gap-14 sm:px-8">
        {/* Left Column: 3D interactive bottle display */}
        <div className="relative flex flex-col items-center justify-center md:h-[calc(100dvh-6rem)]">
          <motion.div
            layoutId={`product-${p.id}`}
            transition={SPRING}
            className="relative z-10 aspect-[2/3] h-[46vh] cursor-grab touch-none select-none active:cursor-grabbing md:h-[64vh]"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <motion.div
              className="pointer-events-none size-full"
              style={{ transformOrigin: "50% 96.7%" }}
              initial={{ scale: 1 }}
              animate={{ scale: pageZoom(p.kind) }}
              exit={{ scale: 1 }}
              transition={SPRING}
            >
              <ProductArt p={p} spin={spin} className="size-full drop-shadow-2xl" />
            </motion.div>
          </motion.div>

          {/* Pedestal surface & reflection shadow */}
          <motion.div
            aria-hidden
            className="relative -mt-[1.5%] h-[18px] w-[86%] rounded-[4px] bg-gradient-to-b from-white to-[#e5e0d4] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <p className="mt-5 text-xs font-semibold text-stone-500 uppercase tracking-widest">
            ⇄ Drag horizontally to spin 360°
          </p>
        </div>

        {/* Right Column: Product Details, Sizes & Add to Bag */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="relative z-20 rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-200/90 text-stone-900"
        >
          <div className="flex items-center justify-between mb-4">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-950 bg-stone-100 hover:bg-stone-200 transition-colors focus-visible:outline-2 focus-visible:outline-emerald-800 cursor-pointer"
            >
              <ChevronLeft className="size-4" strokeWidth={2.4} /> Back to Shelves
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {p.category}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif leading-tight">
            {p.name}
          </h2>
          {p.sub && (
            <p className="mt-1 text-sm font-bold text-emerald-800">
              {p.sub}
            </p>
          )}
          <p className="mt-2 text-sm leading-relaxed text-stone-600">
            {p.tagline}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-stone-600">
            <div className="flex text-amber-500" aria-label={`Rated ${p.rating} out of 5`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="size-3.5 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <span className="font-bold text-stone-900">{p.rating.toFixed(1)}</span>
            <span>({p.reviews.toLocaleString()} verified buyers)</span>
          </div>

          {/* Price display */}
          <div className="mt-5 flex items-baseline gap-3 tabular-nums">
            <span className="text-2xl sm:text-3xl font-black text-emerald-950">
              {currency}{computedPrice}
            </span>
            {computedCompareAt && (
              <span className="text-base text-stone-400 line-through">
                {currency}{computedCompareAt}
              </span>
            )}
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              100% Tax Included
            </span>
          </div>

          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-700">
            {p.description}
          </p>

          {/* Size Selector */}
          <fieldset className="mt-6">
            <legend className="mb-2 text-xs font-black uppercase tracking-wider text-stone-800">
              Select Volume / Packaging Size:
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {p.sizes.map((sz, i) => {
                const on = size === sz;
                const optMult = i < sizeMultipliers.length ? sizeMultipliers[i] : 1;
                const optPrice = Math.round(p.price * optMult);
                return (
                  <label
                    key={sz}
                    className={cn(
                      "flex cursor-pointer flex-col justify-between rounded-xl border p-2.5 transition-all",
                      on
                        ? "border-emerald-800 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-800"
                        : "border-stone-200 hover:border-stone-400 bg-white"
                    )}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={sz}
                      checked={on}
                      onChange={() => setSize(sz)}
                      className="sr-only"
                    />
                    <span className="font-bold text-xs text-stone-900">{sz}</span>
                    <span className="text-xs font-extrabold text-emerald-900 tabular-nums">
                      {currency}{optPrice}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Quantity & Add to Cart button */}
          <div className="mt-6 flex items-stretch gap-3">
            <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-full w-10 place-items-center rounded-l-xl text-stone-700 transition-colors hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
                disabled={qty === 1}
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-black tabular-nums">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="grid h-full w-10 place-items-center rounded-r-xl text-stone-700 transition-colors hover:bg-stone-200 cursor-pointer"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={cn(
                "h-12 flex-1 rounded-xl text-sm font-extrabold tracking-wide uppercase shadow-md transition-all cursor-pointer flex items-center justify-center gap-2",
                added
                  ? "bg-green-700 text-white"
                  : "bg-emerald-900 hover:bg-emerald-950 text-amber-200 hover:text-white"
              )}
            >
              {added ? (
                <>
                  <Check className="size-4" />
                  <span>Added to Basket ✓</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="size-4" />
                  <span>Add to Bag ({currency}{computedPrice * qty})</span>
                </>
              )}
            </button>
          </div>

          {/* Delivery & Live Extraction Highlights */}
          <dl className="mt-5 grid grid-cols-2 gap-2 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200/80">
            <div>
              <dt className="font-bold text-stone-900">Delhi NCR Dispatch:</dt>
              <dd className="text-stone-500">Same / Next Day Fresh Extraction</dd>
            </div>
            <div>
              <dt className="font-bold text-stone-900">All India Delivery:</dt>
              <dd className="text-stone-500">2-4 Business Days via Safe Courier</dd>
            </div>
          </dl>

          {/* Accordion Details */}
          <div className="mt-6 border-t border-stone-200">
            {sections.map(([stitle, sbody]) => {
              const isOpen = section === stitle;
              return (
                <div key={stitle} className="border-b border-stone-200">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setSection(isOpen ? null : stitle)}
                    className="flex w-full items-center justify-between py-3.5 text-left text-xs font-bold uppercase tracking-wider text-stone-900 cursor-pointer"
                  >
                    <span>{stitle}</span>
                    <ChevronDown
                      className={cn(
                        "size-4 text-stone-500 transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={SPRING}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pt-1">{sbody}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

