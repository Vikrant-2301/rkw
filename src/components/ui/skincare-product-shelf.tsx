"use client";

/**
 * Product Shelf. Originally designed by Aakash Mehra.
 * Adapted & Customized for Ramesh Kolhu Wale (RKW) Pure Cold-Pressed Oils & Vedic Bilona Ghee.
 *
 * A store wall of three floating shelves with twelve authentic cold-pressed oils & Vedic ghee,
 * drawn to look like studio product shots: cylinder shading with softbox reflections, printed type,
 * ridged caps, transparent glass with visible golden mustard/seed oil liquid and thick glass bases.
 * Click one and it moves from its place on the shelf to the left of a product page and turns once,
 * its authentic RKW sticker wrapping round the body. Drag it to turn it yourself; let go and it
 * carries your speed, then settles facing front.
 */

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from "react";
import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { ChevronDown, ChevronLeft, Minus, Plus, ShoppingBag, Star, ShieldCheck, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

// Exact catalog pricing helper
export function getProductVolumePrice(productId: string, sizeName: string, fallbackPrice: number): number {
  const cat = PRODUCTS.find((p) => p.id === productId);
  if (cat && cat.volumes && cat.volumes.length > 0) {
    const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const target = clean(sizeName);
    const found = cat.volumes.find((v) => {
      const vc = clean(v.size);
      return vc.includes(target) || target.includes(vc);
    });
    if (found) return found.price;
  }
  if (sizeName.includes("200")) return fallbackPrice;
  if (sizeName.includes("500")) return Math.round(fallbackPrice * 2.4);
  if (sizeName.includes("1 L") || sizeName.includes("1L") || sizeName.includes("1 Litre")) return Math.round(fallbackPrice * 4.5);
  if (sizeName.includes("2 L") || sizeName.includes("2L") || sizeName.includes("2 Litres")) return Math.round(fallbackPrice * 8.8);
  if (sizeName.includes("5 L") || sizeName.includes("5L") || sizeName.includes("5 Litres")) return Math.round(fallbackPrice * 21.3);
  if (sizeName.includes("15 kg") || sizeName.includes("15kg")) return Math.round(fallbackPrice * 60);
  return fallbackPrice;
}

export function getProductVolumeCompareAt(productId: string, sizeName: string, fallbackCompareAt?: number): number | undefined {
  const cat = PRODUCTS.find((p) => p.id === productId);
  if (cat && cat.volumes && cat.volumes.length > 0) {
    const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
    const target = clean(sizeName);
    const found = cat.volumes.find((v) => {
      const vc = clean(v.size);
      return vc.includes(target) || target.includes(vc);
    });
    if (found && found.originalPrice) return found.originalPrice;
  }
  if (!fallbackCompareAt) return undefined;
  if (sizeName.includes("200")) return fallbackCompareAt;
  if (sizeName.includes("500")) return Math.round(fallbackCompareAt * 2.4);
  if (sizeName.includes("1 L") || sizeName.includes("1L") || sizeName.includes("1 Litre")) return Math.round(fallbackCompareAt * 4.5);
  if (sizeName.includes("2 L") || sizeName.includes("2L") || sizeName.includes("2 Litres")) return Math.round(fallbackCompareAt * 8.8);
  if (sizeName.includes("5 L") || sizeName.includes("5L") || sizeName.includes("5 Litres")) return Math.round(fallbackCompareAt * 21.3);
  if (sizeName.includes("15 kg") || sizeName.includes("15kg")) return Math.round(fallbackCompareAt * 60);
  return fallbackCompareAt;
}

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
    name: "Traditional Cold-Pressed Black Mustard Oil",
    short: "Black Mustard Oil",
    sub: "काली सरसों का तेल (झल वाला)",
    category: "Mustard Oil",
    color: "#e8edea",
    cap: "#FAB800",
    label: "#6b1424",
    ink: "#fbf6ec",
    glass: true,
    liquid: "#a25f0a",
    price: 70,
    compareAt: 90,
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
    rating: 4.9,
    reviews: 1420,
    tagline: "Authentic pungent jhal, single cold-pressed in traditional Cold Press Kolhu.",
    description: "The quintessential North Indian kitchen soul. Sourced from high-pungency Rajasthani black mustard seeds (Kali Sarson) crushed slowly at <38°C by Ramesh Kolhu Wale. Retains natural sinigrin for the eye-watering pungency true mustard lovers crave. Ideal for achaar, fish curries and winter massage.",
    benefits: [
      "100% Single-Pressed at <38°C in Traditional Cold Press Kolhu",
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
    name: "Pure Cold-Pressed Yellow Mustard Oil",
    short: "Yellow Mustard Oil",
    sub: "पीली सरसों का तेल (मीठी झल)",
    category: "Mustard Oil",
    color: "#faf6ee",
    cap: "#FAB800",
    label: "#d48b0a",
    ink: "#1c1404",
    glass: true,
    liquid: "#eab318",
    price: 75,
    compareAt: 95,
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
    rating: 5.0,
    reviews: 2150,
    tagline: "Naturally sweeter with mild golden aroma for everyday healthy curries.",
    description: "Extracted slowly in our authentic traditional cold-press Kolhu in front of your eyes at less than 38°C. Made exclusively from select Rajasthani native yellow mustard seeds (Pili Sarson) supervised by Ramesh Kolhu Wale. Naturally sweeter, milder, and preserves all vital omega-3 fatty acids without burning the throat.",
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
    id: "dahi-bilona-desi-cow-ghee",
    kind: "jar",
    name: "Dahi Bilona Desi Cow Ghee",
    short: "Desi Cow Ghee",
    sub: "दही बिलोना देसी गाय का शुद्ध घी",
    category: "Bilona Ghee",
    color: "#f6f3eb",
    cap: "#c29139",
    label: "#fbf8f1",
    ink: "#3d280b",
    glass: true,
    liquid: "#f0c64c",
    price: 850,
    compareAt: 950,
    sizes: ["500 ml (PET bottle)", "1 L (PET bottle)"],
    rating: 5.0,
    reviews: 3280,
    tagline: "Handcrafted via traditional Dahi Bilona method in earthen vessels.",
    description: "Authentic pure Desi Cow Ghee prepared using traditional curd bilona method. Slow-boiled whole cow milk is cultured into curd and hand-churned with a bilona to extract fresh makkhan, then gently heated to golden, granular perfection.",
    benefits: [
      "100% Pure Desi Cow Ghee",
      "Granular (Danedar) golden texture rich in natural aroma",
      "Handcrafted from cultured dahi makkhan",
      "Zero preservatives, no artificial coloring or essence"
    ],
    ingredients: "100% Pure Clarified Butterfat from Fresh Desi Cow Milk Curd.",
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
    ingredients: "100% Pure Cold-Pressed Black Mustard Oil (Cold Press).",
    howTo: "Pull up the spout ring, decant into your daily glass kitchen cruet, and close the cap tightly."
  },

  // --- ROW 2: Nut & Seed Cold-Pressed Range ---
  {
    id: "cold-pressed-groundnut-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Groundnut Oil (Peanut Oil)",
    short: "Groundnut Oil",
    sub: "मूंगफली का तेल (गुजरात मूंगफली)",
    category: "Nut & Seed Oils",
    color: "#f2edf2",
    cap: "#FAB800",
    label: "#52164a",
    ink: "#faeef8",
    glass: true,
    liquid: "#e8af36",
    price: 95,
    compareAt: 120,
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
    rating: 4.8,
    reviews: 890,
    tagline: "Cold pressed from Saurashtra red-skin peanuts. High 232°C smoke point.",
    description: "The golden cooking pride of western and northern India. Pressed in our cold-press Kolhu by Ramesh Kolhu Wale from sun-dried sweet Saurashtra peanuts without high temperatures, chemical filtration, or hexane solvents. Imparts a delightful, non-sticky aroma to puris and daily sabzis.",
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
    id: "cold-pressed-white-sesame-oil",
    kind: "round-bottle",
    name: "Cold-Pressed White Sesame Oil (Til Ka Tel)",
    short: "White Sesame Oil",
    sub: "सफेद तिल का तेल (कच्ची घानी)",
    category: "Nut & Seed Oils",
    color: "#f6f1e8",
    cap: "#FAB800",
    label: "#8f5e13",
    ink: "#fcf8ee",
    glass: true,
    liquid: "#deb15b",
    price: 120,
    compareAt: 150,
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
    rating: 4.9,
    reviews: 670,
    tagline: "Ayurveda's supreme king of oils (Sarva Taila Pravara) for bones & joints.",
    description: "In Charaka Samhita, sesame oil is revered as the king of all oils. Extracted slowly in Ramesh Kolhu Wale traditional cold-press ghani without toasting or bleaching. Rich in natural sesamin and sesamolin, calms Vata dosha, and ideal for daily oil pulling (Gandusha) and Abhyanga massage.",
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
    id: "cold-pressed-virgin-coconut-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Virgin Coconut Oil",
    short: "Virgin Coconut Oil",
    sub: "कच्ची घानी गोले का तेल (केरल)",
    category: "Nut & Seed Oils",
    color: "#eef4f0",
    cap: "#FAB800",
    label: "#1c5432",
    ink: "#eefcf3",
    glass: true,
    liquid: "#f5f8f6",
    price: 110,
    compareAt: 140,
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
    rating: 4.9,
    reviews: 1120,
    tagline: "Sulfur-free sun-dried Kerala copra pressed at <35°C in neem ghani.",
    description: "Experience the pure tropical magic of Kerala sun-dried coconuts, pressed in our traditional cold-press Ghani by Ramesh Kolhu Wale without heat or chemical deodorizers. In winters, it naturally solidifies into a pristine snow-white butter, proving its unrefined purity.",
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
    kind: "round-bottle",
    name: "100% Pure Badam Rogan (Sweet Almond Oil)",
    short: "Pure Badam Rogan",
    sub: "शुद्ध बादाम रोगन (मामरा बादाम)",
    category: "Wellness Rogan",
    color: "#f2ede9",
    cap: "#FAB800",
    label: "#8b2a16",
    ink: "#fbf5f2",
    glass: true,
    liquid: "#dda835",
    price: 490,
    compareAt: 650,
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
    kind: "round-bottle",
    name: "Cold-Pressed Kashmiri Walnut Oil (अखरोट तेल)",
    short: "Kashmiri Walnut Oil",
    sub: "कश्मीरी अखरोट का तेल (कोल्ड प्रेस्ड)",
    category: "Wellness Rogan",
    color: "#ede9e6",
    cap: "#FAB800",
    label: "#3d1e13",
    ink: "#f6eee9",
    glass: true,
    liquid: "#ba741c",
    price: 280,
    compareAt: 350,
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
    rating: 4.8,
    reviews: 410,
    tagline: "Cold pressed from high-altitude whole Kashmiri walnut kernels.",
    description: "Extracted in small cold-press batches from prized Kashmiri walnuts. Exceptional concentration of Alpha-Linolenic Acid (ALA) and polyphenols for cardiovascular wellness, memory enhancement, and radiant skin.",
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
    kind: "round-bottle",
    name: "Cold-Pressed Flax Seed Oil (अलसी का तेल)",
    short: "Flax Seed Oil (Alsi)",
    sub: "अलसी का तेल (मध्य प्रदेश अलसी)",
    category: "Wellness Rogan",
    color: "#e8edf5",
    cap: "#FAB800",
    label: "#193563",
    ink: "#eef4fd",
    glass: true,
    liquid: "#ce9222",
    price: 95,
    compareAt: 120,
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
    kind: "round-bottle",
    name: "Cold-Pressed Extra Virgin Olive Oil (जैतून तेल)",
    short: "Extra Virgin Olive Oil",
    sub: "एक्स्ट्रा वर्जिन जैतून का तेल",
    category: "Wellness Rogan",
    color: "#edf3ee",
    cap: "#FAB800",
    label: "#173f27",
    ink: "#eefbee",
    glass: true,
    liquid: "#839328",
    price: 220,
    compareAt: 280,
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
const BLACK: RGB = [0, 0, 0];
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

const PET_OIL_BODY_PATH =
  "M91 38 " +
  "L91 41 " +
  "L87 41 Q85 43 87 45 L91 45 " +
  "L91 74 " +
  "Q91 82 84 88 L68 103 Q66 105 66 108 " +
  "L66 119 Q68.5 123 66 127 " +
  "L66 135 Q68.5 139 66 143 " +
  "L66 151 Q68.5 155 66 159 " +
  "L66 167 Q68.5 171 66 175 " +
  "L66 183 Q68.5 187 66 191 " +
  "L66 199 Q68.5 203 66 207 " +
  "L66 215 Q68.5 219 66 223 " +
  "L66 231 Q68.5 235 66 239 " +
  "L66 247 Q68.5 251 66 255 " +
  "L66 258 Q64 263 64 270 L64 280 Q64 286 70 286 " +
  "L74 286 Q100 277 126 286 L130 286 " +
  "Q136 286 136 280 L136 270 Q136 263 134 258 " +
  "L134 255 Q131.5 251 134 247 " +
  "L134 239 Q131.5 235 134 231 " +
  "L134 223 Q131.5 219 134 215 " +
  "L134 207 Q131.5 203 134 199 " +
  "L134 191 Q131.5 187 134 183 " +
  "L134 175 Q131.5 171 134 167 " +
  "L134 159 Q131.5 155 134 151 " +
  "L134 143 Q131.5 139 134 135 " +
  "L134 127 Q131.5 123 134 119 " +
  "L134 108 Q134 105 132 103 L116 88 Q109 82 109 74 " +
  "L109 45 L113 45 Q115 43 113 41 L109 41 " +
  "L109 38 " +
  "Z";

const renderPetOilCap = (id: string) => {
  const capX = 86;
  const capW = 28;
  const capTop = 12;
  return (
    <g id={`${id}-pet-cap-group`}>
      {/* Soft contact shadow from cap onto neck collar */}
      <ellipse cx="100" cy="38.5" rx="13" ry="1.2" fill="#000" opacity="0.3" />

      {/* Main Cap Body with rounded top */}
      <path
        d={`M${capX + 3} ${capTop} h${capW - 6} a3 3 0 0 1 3 3 v15 h-${capW} v-15 a3 3 0 0 1 3 -3 z`}
        fill={`url(#${id}-yellow-cap)`}
      />
      {/* Top rim highlight */}
      <ellipse cx="100" cy={capTop + 1.2} rx="12" ry="1.5" fill="#FFF8C4" opacity="0.9" />
      <path d={`M${capX + 2} ${capTop + 1} h${capW - 4}`} stroke="#FFE875" strokeWidth="1" strokeOpacity="0.95" />

      {/* Fluted Vertical Ridges (Knurling) */}
      {Array.from({ length: 20 }, (_, i) => {
        const rx = capX + 2.4 + i * 1.22;
        return (
          <g key={i}>
            <line x1={rx} y1={capTop + 3} x2={rx} y2={capTop + 18} stroke="#9E5400" strokeWidth="0.5" strokeOpacity="0.45" />
            <line x1={rx + 0.5} y1={capTop + 3} x2={rx + 0.5} y2={capTop + 18} stroke="#FFFAC8" strokeWidth="0.55" strokeOpacity="0.8" />
          </g>
        );
      })}

      {/* Separation Groove / Tear Line */}
      <rect x={capX + 0.5} y={capTop + 18.2} width={capW - 1} height="1.2" fill="#7A3E00" opacity="0.75" />

      {/* Tamper Evident Safety Ring */}
      <path
        d={`M${capX} ${capTop + 19.4} h${capW} v5.6 a1.2 1.2 0 0 1 -1.2 1.2 h-${capW - 2.4} a1.2 1.2 0 0 1 -1.2 -1.2 z`}
        fill={`url(#${id}-yellow-cap)`}
      />
      {/* Tamper Ring Highlight and Breakout Slits */}
      <line x1={capX + 1} y1={capTop + 25.5} x2={capX + capW - 1} y2={capTop + 25.5} stroke="#FFE875" strokeWidth="0.8" strokeOpacity="0.75" />
      {[90, 95, 100, 105, 110].map((sx) => (
        <line key={sx} x1={sx} y1={capTop + 18.2} x2={sx} y2={capTop + 20.8} stroke="#542B00" strokeWidth="0.8" strokeOpacity="0.85" />
      ))}
    </g>
  );
};

const SHAPES: Record<Kind, Shape> = {
  // 1. Signature Square PET Cold-Pressed Oil Bottle (Square with Side Grip Ribs & Yellow Cap)
  "round-bottle": {
    body: PET_OIL_BODY_PATH,
    box: { x: 64, y: 38, w: 72, h: 248 },
    print: { x: 74, y: 110, w: 52, h: 144, paper: true },
    fill: 62,
    cap: (id) => renderPetOilCap(id),
  },

  // 2. Standard PET Cold Pressed Oil Bottle
  bottle: {
    body: PET_OIL_BODY_PATH,
    box: { x: 64, y: 38, w: 72, h: 248 },
    print: { x: 74, y: 110, w: 52, h: 144, paper: true },
    fill: 62,
    cap: (id) => renderPetOilCap(id),
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
  bottle: { top: 10, w: 76 },
  "round-bottle": { top: 10, w: 76 },
  tin: { top: 60, w: 106 },
  dropper: { top: 60, w: 72 },
  tube: { top: 37, w: 76 },
  pump: { top: 50, w: 101 },
  perfume: { top: 96, w: 116 },
  mist: { top: 80, w: 76 },
  stick: { top: 166, w: 38 },
  lip: { top: 128, w: 34 }
};

const pageZoom = (k: Kind) => Math.min(1.45, 230 / (290 - EXTENT[k].top), 170 / EXTENT[k].w);

// ---------- The Product Drawing with Cylinder Shading & Spinning Label ----------

function ProductArt({ p, spin, className }: { p: Product; spin?: MotionValue<number>; className?: string }) {
  const id = "ps" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const isPet = p.kind === "round-bottle" || p.kind === "bottle";
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
    const isPet = p.kind === "round-bottle" || p.kind === "bottle";
    const isRound = p.kind === "round-bottle";
    const isTin = p.kind === "tin";
    const isJar = p.kind === "jar";
    const centerX = P.x + P.w / 2;

    if (isPet) {
      return (
        <g transform={`translate(${dx} 0)`}>
          {/* Subtle clear decal sheen & gold foil border (Zero opaque background!) */}
          <rect
            x={P.x + 2}
            y={P.y + 4}
            width={P.w - 4}
            height={P.h - 8}
            rx={3}
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(212,175,55,0.45)"
            strokeWidth={0.6}
          />

          {/* Brand Header: Authentic RKW Logo & Typography */}
          <g transform={`translate(${centerX} ${P.y + P.h * 0.14})`}>
            <circle cx="-13" cy="-1.5" r="3.6" fill="#0E2A47" />
            <circle cx="-13" cy="-1.5" r="2.6" fill="#D4AF37" />
            <path d="M-14.2 -1.5 H-11.8 M-13 -2.7 V-0.3" stroke="#0E2A47" strokeWidth="0.6" />
            <text
              x="0"
              y="0.5"
              fill="#0E2A47"
              fontSize={Math.min(6.8, P.w * 0.12)}
              fontWeight="900"
              letterSpacing="0.08em"
              textAnchor="middle"
            >
              RKW
            </text>
            <text x="9.5" y="-1.5" fill="#0E2A47" fontSize="3" fontWeight="bold">®</text>
          </g>

          {/* Hindi Brand Name */}
          <text
            x={centerX}
            y={P.y + P.h * 0.25}
            fill="#1C1A16"
            fontSize={Math.min(4.4, P.w * 0.08)}
            fontWeight="700"
            textAnchor="middle"
          >
            रमेश कोल्हू वाले
          </text>

          {/* Product Title (e.g. YELLOW MUSTARD OIL) */}
          <text
            x={centerX}
            y={P.y + P.h * 0.44}
            fill="#0E2A47"
            fontSize={Math.min(7.5, (P.w * 0.95) / p.short.length)}
            fontWeight="800"
            letterSpacing="-0.05"
            textAnchor="middle"
          >
            {p.short}
          </text>

          {/* Subtitle / Hindi Name */}
          {p.sub && (
            <text
              x={centerX}
              y={P.y + P.h * 0.58}
              fill="#4A3B2C"
              fontSize={Math.min(4.5, (P.w * 0.9) / (p.sub ?? "").length)}
              fontWeight="600"
              textAnchor="middle"
            >
              {p.sub}
            </text>
          )}

          {/* Trust badge stamp */}
          <g transform={`translate(${centerX} ${P.y + P.h * 0.72})`}>
            <rect x="-18" y="-3.5" width="36" height="7" rx="1.5" fill="rgba(255,255,255,0.4)" stroke="#0E2A47" strokeWidth="0.5" strokeOpacity="0.4" />
            <text x="0" y="1.5" fill="#0E2A47" fontSize="3.2" fontWeight="800" letterSpacing="0.04em" textAnchor="middle">
              COLD-PRESSED • &lt;38°C
            </text>
          </g>

          {/* Bottom row: FSSAI Green Veg Dot & Net Qty */}
          <g transform={`translate(${centerX} ${P.y + P.h * 0.88})`}>
            <rect x={-P.w * 0.36} y="-3" width="5.5" height="5.5" fill="#fff" stroke="#138808" strokeWidth="0.5" rx="0.5" />
            <circle cx={-P.w * 0.36 + 2.75} cy="-0.25" r="1.5" fill="#138808" />
            <text x="1" y="0.8" fill="#1C1A16" fontSize={Math.min(5, P.w * 0.09)} fontWeight="700" textAnchor="middle">
              {p.sizes[0]}
            </text>
          </g>
        </g>
      );
    }

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
            {isJar ? "BILONA GHEE • 100% PURE" : "COLD-PRESSED • <38°C"}
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

        {/* PET Yellow Cap Gradient matching uploaded photo */}
        <linearGradient id={`${id}-yellow-cap`} x1="0" x2="1">
          <stop offset="0" stopColor="#D98A00" />
          <stop offset="0.08" stopColor="#FAB800" />
          <stop offset="0.22" stopColor="#FFE564" />
          <stop offset="0.38" stopColor="#FFC820" />
          <stop offset="0.65" stopColor="#F5A800" />
          <stop offset="0.88" stopColor="#E09200" />
          <stop offset="1" stopColor="#BA7200" />
        </linearGradient>

        {/* PET Plastic Sheen Gradient */}
        <linearGradient id={`${id}-pet-plastic`} x1="0" x2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="0.08" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="0.92" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.3)" />
        </linearGradient>

        {/* PET Golden Oil Liquid Gradient matching reference photo */}
        <linearGradient id={`${id}-pet-oil-grad`} x1="0" x2="1">
          <stop offset="0" stopColor={css(mixRgb(liq, BLACK, 0.45))} />
          <stop offset="0.06" stopColor={css(mixRgb(liq, BLACK, 0.15))} />
          <stop offset="0.16" stopColor={css(mixRgb(liq, WHITE, 0.35))} />
          <stop offset="0.34" stopColor={css(mixRgb(liq, WHITE, 0.65))} />
          <stop offset="0.52" stopColor={css(mixRgb(liq, WHITE, 0.45))} />
          <stop offset="0.78" stopColor={css(mixRgb(liq, BLACK, 0.05))} />
          <stop offset="0.92" stopColor={css(mixRgb(liq, BLACK, 0.22))} />
          <stop offset="1" stopColor={css(mixRgb(liq, BLACK, 0.45))} />
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
      {isPet ? (
        <>
          <ellipse cx="100" cy="287" rx="46" ry="5.5" fill={`url(#${id}-floor)`} />
          <ellipse cx="100" cy="286.3" rx="34" ry="1.4" fill="#000" opacity="0.32" />
        </>
      ) : (
        <>
          <ellipse cx="100" cy="287" rx={B.w * 0.7} ry="6" fill={`url(#${id}-floor)`} />
          <ellipse cx="100" cy="286.3" rx={B.w * 0.47} ry="1.4" fill="#000" opacity="0.35" />
        </>
      )}

      {/* Body background */}
      <path d={s.body} fill={isPet ? `url(#${id}-pet-plastic)` : `url(#${id}-body)`} />

      {/* Liquid & Glass Layer */}
      <g clipPath={`url(#${id}-clip)`}>
        {isPet ? (
          <>
            {/* 1. Golden Oil Liquid Fill up to neck meniscus at y=58 */}
            <rect x="60" y="58" width="80" height="230" fill={`url(#${id}-pet-oil-grad)`} opacity="0.96" />

            {/* 2. Clear PET Neck Headspace above oil (y=38 to 58) */}
            <rect x="91" y="38" width="18" height="20" fill="rgba(255,255,255,0.06)" />
            <line x1="93" y1="41" x2="93" y2="58" stroke="#fff" strokeWidth="0.9" strokeOpacity="0.7" />
            <line x1="107" y1="41" x2="107" y2="58" stroke="#fff" strokeWidth="0.6" strokeOpacity="0.35" />

            {/* 2b. Protruding Neck Collar / Transfer Ring (y=41 to 45) */}
            <ellipse cx="100" cy="43" rx="13.5" ry="2" fill="none" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.85" />
            <ellipse cx="100" cy="43.5" rx="13" ry="1.6" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />

            {/* 3. Liquid Meniscus at y=58 with specular glint */}
            <path d="M 91 58 Q 100 60.5 109 58" stroke="#FFF9D2" strokeWidth="1.4" strokeOpacity="0.95" fill="none" />
            <path d="M 91 58.8 Q 100 61.2 109 58.8" stroke="rgba(100,50,0,0.5)" strokeWidth="0.8" fill="none" />

            {/* 4. The 9 Side Grip Ribs (Notches on Left & Right) */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const ny = 118.75 + i * 16;
              return (
                <g key={i}>
                  {/* Left Notch */}
                  <rect x="67" y={ny} width="7" height="8.5" rx="1.8" fill="rgba(60,25,0,0.32)" />
                  <rect x="67.5" y={ny + 0.5} width="6" height="7.5" rx="1.2" fill="rgba(255,225,90,0.28)" />
                  <line x1="67" y1={ny} x2="74" y2={ny} stroke="rgba(255,255,255,0.85)" strokeWidth="0.8" />
                  <line x1="67" y1={ny + 8.5} x2="74" y2={ny + 8.5} stroke="rgba(100,45,0,0.5)" strokeWidth="0.8" />
                  <ellipse cx="70.5" cy={ny + 4.25} rx="1.8" ry="2" fill="#FFEAA7" opacity="0.65" />

                  {/* Right Notch */}
                  <rect x="126" y={ny} width="7" height="8.5" rx="1.8" fill="rgba(60,25,0,0.32)" />
                  <rect x="126.5" y={ny + 0.5} width="6" height="7.5" rx="1.2" fill="rgba(255,225,90,0.28)" />
                  <line x1="126" y1={ny} x2="133" y2={ny} stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
                  <line x1="126" y1={ny + 8.5} x2="133" y2={ny + 8.5} stroke="rgba(100,45,0,0.5)" strokeWidth="0.8" />
                  <ellipse cx="129.5" cy={ny + 4.25} rx="1.8" ry="2" fill="#FFEAA7" opacity="0.55" />
                </g>
              );
            })}

            {/* Vertical Inner Divider Lines between ribs and center window */}
            <line x1="74.5" y1="108" x2="74.5" y2="256" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            <line x1="125.5" y1="108" x2="125.5" y2="256" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />

            {/* 5. Shoulder Chamfer Facets */}
            <line x1="91" y1="74" x2="66" y2="108" stroke="#fff" strokeWidth="1.6" strokeOpacity="0.75" strokeLinecap="round" />
            <line x1="109" y1="74" x2="134" y2="108" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 74 98 Q 100 96 126 98" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />

            {/* 6. Front Recessed Panel Bevel Frame */}
            <g>
              <polygon points="74.5,106 76.5,108 76.5,254 74.5,256" fill="rgba(255,255,255,0.45)" />
              <polygon points="74.5,106 125.5,106 123.5,108 76.5,108" fill="rgba(255,255,255,0.55)" />
              <polygon points="125.5,106 125.5,256 123.5,254 123.5,108" fill="rgba(0,0,0,0.22)" />
              <polygon points="74.5,256 76.5,254 123.5,254 125.5,256" fill="rgba(0,0,0,0.18)" />
              <line x1="74.5" y1="106" x2="76.5" y2="108" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.7" />
              <line x1="125.5" y1="106" x2="123.5" y2="108" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="74.5" y1="256" x2="76.5" y2="254" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="125.5" y1="256" x2="123.5" y2="254" stroke="#000" strokeWidth="0.8" strokeOpacity="0.25" />
              <rect x="76.5" y="108" width="47" height="146" rx="2" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" />
            </g>

            {/* 7. Rotating Transparent Silkscreen Art */}
            <motion.g style={{ x }}>
              {printArt(0)}
              {printArt(period)}
            </motion.g>

            {/* 8. Studio Lighting Reflections matching the photo */}
            {/* Left softbox diffuse highlight */}
            <rect x="76" y="108" width="8" height="146" rx="4" fill="#fff" opacity="0.4" filter={`url(#${id}-soft)`} />
            {/* Sharp specular pinstripe */}
            <line x1="78" y1="108" x2="78" y2="254" stroke="#fff" strokeWidth="1.4" strokeOpacity="0.92" />
            {/* Shoulder specular */}
            <path d="M 75 97 L 88 84" stroke="#fff" strokeWidth="1.4" strokeOpacity="0.65" strokeLinecap="round" />
            {/* Right fill light */}
            <line x1="123" y1="108" x2="123" y2="254" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.3" />

            {/* Base pedestal kick-up arch and thick plastic reflections */}
            <path d="M 66 264 H 134" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
            <path d="M 64 274 H 136" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
            <path d="M 64 280 H 136" stroke="rgba(120,60,0,0.35)" strokeWidth="1" />
            <path d="M 70 286 Q 100 276 130 286" stroke="#fff" strokeWidth="1.6" strokeOpacity="0.85" fill="none" />
            <path d="M 72 286 Q 100 278 128 286" stroke="rgba(120,60,0,0.45)" strokeWidth="1" fill="none" />
          </>
        ) : (
          <>
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
          </>
        )}
      </g>

      {/* Glass outer contour stroke */}
      {isPet ? (
        <>
          <path d={s.body} fill="none" stroke="rgba(255,200,50,0.4)" strokeWidth="0.8" />
          <path d={s.body} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.5" />
        </>
      ) : (
        <path d={s.body} fill="none" stroke={css(c, 0.45, 0.45)} strokeWidth="0.7" />
      )}
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
  title = "Pure Cold-Pressed Cellar",
  subtitle = "कच्ची घानी दर्शन • 100% Raw, Unrefined & Cold Pressed below 38°C",
  onAddToCart
}: ProductShelfProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [bag, setBag] = useState(0);
  const [bump, setBump] = useState(0);
  const bagRef = useRef<HTMLButtonElement | null>(null);

  // Cart integration
  const cartContext = useCart();

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
      // Connect to existing RKW CartContext with exact volume price
      const volPrice = getProductVolumePrice(product.id, size, product.price);
      const volCompareAt = getProductVolumeCompareAt(product.id, size, product.compareAt) || Math.round(volPrice * 1.25);
      const vol = {
        size,
        price: volPrice,
        originalPrice: volCompareAt,
        packaging: size.includes("Tin") ? "Tin" : product.kind === "jar" ? "Glass Jar" : "PET bottle"
      };
      const cartProduct = {
        id: product.id,
        name: product.name,
        hindiName: product.sub || product.name,
        slug: product.id,
        category: product.category,
        shortDesc: product.tagline,
        description: product.description,
        price: volPrice,
        originalPrice: volCompareAt,
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
        extractionDetails: { method: "Traditional Cold Press (<38°C)" },
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
        <main className="mx-auto w-full max-w-[1140px] px-3 pt-8 pb-16 sm:px-6 sm:pt-12">
          {/* Section Header */}
          <div className="mb-8 sm:mb-14 text-center max-w-2xl mx-auto space-y-2 sm:space-y-3 px-2">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#B8860B]">
              Interactive Showcase
            </p>
            <h1 className="text-2xl sm:text-4xl font-serif text-[#1C1A16] font-normal tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-[#8A7E6E] leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Shelves Wall */}
          {rows.map((row, r) => (
            <section
              key={r}
              aria-label={["Signature Mustard Oils & Ghee", "Pure Nut & Seed Oils", "Wellness Rogan & Elixirs"][r]}
              className="relative mb-12 sm:mb-16"
            >
              {/* Shelf Category Header */}
              <div className="mb-3 px-2 sm:px-8 flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-widest">
                <span className="text-[11px] sm:text-xs truncate">
                  {[
                    "01. Pure Mustard Oils & Bilona Ghee",
                    "02. Pure Cold-Pressed Nut & Seed Oils",
                    "03. Wellness Rogan, Walnut & Artisanal Oils"
                  ][r]}
                </span>
                <span className="text-[11px] font-medium text-sky-800 lowercase hidden sm:inline">click bottle to rotate 360°</span>
                <span className="text-[11px] font-medium text-amber-700 lowercase sm:hidden flex-shrink-0">swipe shelf ⇄</span>
              </div>

              {/* Products Row Standing on Shelf - Mobile Touch Carousel / Desktop 4-Col Grid */}
              <div className="relative z-10 flex gap-4 overflow-x-auto snap-x snap-mandatory px-3 pb-3 no-scrollbar sm:grid sm:grid-cols-4 sm:gap-8 sm:px-8 sm:overflow-visible sm:pb-0 sm:items-end">
                {row.map((p) => (
                  <div key={p.id} className="w-[155px] sm:w-auto flex-shrink-0 snap-start flex flex-col items-center">
                    {openId === p.id ? (
                      <div className="aspect-[2/3] w-full max-w-[155px] sm:max-w-[160px]" />
                    ) : (
                      <motion.button
                        layoutId={`product-${p.id}`}
                        type="button"
                        onClick={() => setOpenId(p.id)}
                        aria-label={`${p.name}, From ${currency}${p.price}`}
                        transition={SPRING}
                        className="group relative aspect-[2/3] w-full max-w-[155px] sm:max-w-[160px] cursor-pointer rounded-2xl outline-none transition-transform duration-200 hover:-translate-y-2 focus-visible:ring-2 focus-visible:ring-[#0E2A47]"
                      >
                        <ProductArt p={p} className="size-full drop-shadow-sm group-hover:drop-shadow-md transition-all" />
                      </motion.button>
                    )}

                    {/* On mobile: title, Hindi sub & price inline under each bottle */}
                    <div className="mt-2 w-full text-center sm:hidden cursor-pointer" onClick={() => setOpenId(p.id)}>
                      <div className="text-[13px] leading-tight font-bold text-stone-900 line-clamp-1">
                        {p.short}
                      </div>
                      {p.sub && (
                        <div className="text-[10px] text-stone-500 font-sans line-clamp-1">
                          {p.sub}
                        </div>
                      )}
                      <div className="mt-0.5 text-[12px] font-extrabold text-[#0E2A47]">
                        From {currency}{p.price}
                        {p.compareAt && (
                          <span className="ml-1 text-[10px] font-normal text-stone-400 line-through">
                            {currency}{p.compareAt}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating 3D Heritage Shelf with Soft Shadows */}
              <div aria-hidden className="relative -mt-[6px] h-[18px]">
                <div className="absolute inset-x-0 top-0 h-[9px] bg-gradient-to-b from-[#e3ded4] to-[#fbf9f4] rounded-t-sm" />
                <div className="absolute inset-x-0 top-[9px] h-[9px] bg-gradient-to-b from-[#ede9df] to-[#d6cfc0] shadow-[0_2px_4px_rgba(0,0,0,0.06)]" />
                <div className="absolute inset-x-[2%] top-[18px] h-[36px] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(0,0,0,0.14),transparent)]" />
              </div>

              {/* Product Titles & Prices under shelf on desktop */}
              <div className="mt-5 hidden sm:grid sm:grid-cols-4 gap-8 px-8">
                {row.map((p) => (
                  <div key={p.id} className="text-center group cursor-pointer" onClick={() => setOpenId(p.id)}>
                    <div className="text-[13px] leading-snug font-bold text-stone-900 sm:text-[14px] line-clamp-1 group-hover:text-[#0E2A47] transition-colors">
                      {p.short}
                    </div>
                    {p.sub && (
                      <div className="text-[11px] text-stone-500 font-sans line-clamp-1">
                        {p.sub}
                      </div>
                    )}
                    <div className="mt-1 text-[13px] font-extrabold text-[#0E2A47] tabular-nums sm:text-[14px]">
                      From {currency}{p.price}
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

  // Exact volume pricing lookup
  const computedPrice = getProductVolumePrice(p.id, size, p.price);
  const computedCompareAt = getProductVolumeCompareAt(p.id, size, p.compareAt);

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
            <Check className="size-4 text-[#0E2A47] flex-shrink-0 mt-0.5" />
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
    <motion.div role="dialog" aria-modal="true" aria-label={p.name} className="fixed inset-0 z-50 overflow-y-auto">
      <motion.div
        className="fixed inset-0 bg-stone-950/75 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Mobile Sticky Top Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-stone-950/85 px-4 py-2.5 backdrop-blur-md md:hidden">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white bg-white/15 hover:bg-white/25 active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="size-4" strokeWidth={2.4} /> Back
        </button>
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/70 px-2.5 py-0.5 rounded-full border border-amber-500/30">
          {p.category}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="grid size-8 place-items-center rounded-lg text-white/80 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="relative mx-auto flex min-h-full max-w-[1140px] flex-col justify-center px-3 pt-4 pb-12 sm:px-6 md:grid md:grid-cols-[1fr_1.1fr] md:items-center md:gap-10 md:pt-10">
        {/* Left Column: 3D interactive bottle display */}
        <div className="relative flex flex-col items-center justify-center pt-2 pb-6 md:py-0 md:h-[calc(100dvh-5rem)]">
          <motion.div
            layoutId={`product-${p.id}`}
            transition={SPRING}
            className="relative z-10 aspect-[2/3] h-[34vh] sm:h-[40vh] md:h-[60vh] cursor-grab touch-none select-none active:cursor-grabbing"
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
            className="relative -mt-[1.5%] h-[14px] sm:h-[18px] w-[75%] sm:w-[86%] rounded-[4px] bg-gradient-to-b from-white to-[#e5e0d4] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <p className="mt-3 text-[11px] sm:text-xs font-semibold text-stone-300 sm:text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
            <span>⇄</span> Swipe bottle to rotate 360°
          </p>
        </div>

        {/* Right Column: Product Details, Sizes & Add to Bag */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="relative z-20 rounded-3xl bg-white p-5 sm:p-8 shadow-2xl border border-stone-200/90 text-stone-900 md:max-h-[calc(100dvh-5rem)] md:overflow-y-auto"
        >
          {/* Desktop header with Back to Shelves & Category */}
          <div className="hidden md:flex items-center justify-between mb-4">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#0E2A47] bg-[#EBF2F8] hover:bg-[#DDE9F4] transition-colors focus-visible:outline-2 focus-visible:outline-[#0E2A47] cursor-pointer"
            >
              <ChevronLeft className="size-4" strokeWidth={2.4} /> Back to Shelves
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {p.category}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-stone-900 font-serif leading-tight">
            {p.name}
          </h2>
          {p.sub && (
            <p className="mt-1 text-xs sm:text-sm font-bold text-[#0E2A47]">
              {p.sub}
            </p>
          )}
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-stone-600">
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

          {/* Price display with exact volume price */}
          <div className="mt-4 sm:mt-5 flex items-baseline gap-2.5 sm:gap-3 tabular-nums">
            <span className="text-2xl sm:text-3xl font-black text-[#0E2A47]">
              {currency}{computedPrice}
            </span>
            {computedCompareAt && (
              <span className="text-sm sm:text-base text-stone-400 line-through">
                {currency}{computedCompareAt}
              </span>
            )}
            <span className="text-[11px] sm:text-xs font-bold text-[#0E2A47] bg-[#EBF2F8] px-2 py-0.5 rounded-md border border-[#163A60]/20">
              100% Tax Included
            </span>
          </div>

          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm leading-relaxed text-stone-700">
            {p.description}
          </p>

          {/* Size Selector with exact prices for every volume */}
          <fieldset className="mt-5 sm:mt-6">
            <legend className="mb-2 text-xs font-black uppercase tracking-wider text-stone-800">
              Select Volume / Packaging Size:
            </legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {p.sizes.map((sz) => {
                const on = size === sz;
                const optPrice = getProductVolumePrice(p.id, sz, p.price);
                return (
                  <label
                    key={sz}
                    className={cn(
                      "flex cursor-pointer flex-col justify-between rounded-xl border p-2.5 transition-all",
                      on
                        ? "border-[#0E2A47] bg-[#EBF2F8] shadow-xs ring-2 ring-[#0E2A47]"
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
                    <span className="font-bold text-[11px] sm:text-xs text-stone-900 leading-tight">{sz}</span>
                    <span className="mt-1 text-xs font-black text-[#0E2A47] tabular-nums">
                      {currency}{optPrice}
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {/* Quantity & Add to Cart button */}
          <div className="mt-5 sm:mt-6 flex items-stretch gap-2 sm:gap-3">
            <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-full w-9 sm:w-10 place-items-center rounded-l-xl text-stone-700 transition-colors hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
                disabled={qty === 1}
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-7 sm:w-8 text-center text-sm font-black tabular-nums">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="grid h-full w-9 sm:w-10 place-items-center rounded-r-xl text-stone-700 transition-colors hover:bg-stone-200 cursor-pointer"
              >
                <Plus className="size-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className={cn(
                "h-12 flex-1 rounded-xl text-xs sm:text-sm font-extrabold tracking-wide uppercase shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98",
                added
                  ? "bg-emerald-700 text-white"
                  : "bg-[#0E2A47] hover:bg-[#163A60] text-amber-300 hover:text-white"
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
          <dl className="mt-4 sm:mt-5 grid grid-cols-2 gap-2 text-xs bg-stone-50 p-2.5 sm:p-3 rounded-xl border border-stone-200/80">
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
          <div className="mt-5 sm:mt-6 border-t border-stone-200">
            {sections.map(([stitle, sbody]) => {
              const isOpen = section === stitle;
              return (
                <div key={stitle} className="border-b border-stone-200">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setSection(isOpen ? null : stitle)}
                    className="flex w-full items-center justify-between py-3 sm:py-3.5 text-left text-xs font-bold uppercase tracking-wider text-stone-900 cursor-pointer"
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

