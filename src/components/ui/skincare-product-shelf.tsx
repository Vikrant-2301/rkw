"use client";

/**
 * RKW Shop Experience (complete single-file version)
 * Ramesh Kolhu Wale: Pure Cold-Pressed Oils & Vedic Bilona Ghee.
 *
 * Scroll-driven store walkthrough:
 *   storefront with rolling shutter -> step inside -> four lit aisles
 *   (bottles rise onto planks under pendant lamps) -> billing counter.
 * Click a bottle for the 360° product dialog (drag to spin, inertia, sticker wrap).
 *
 * Usage: <ShopExperience />   (or <ProductShelf />, same component)
 */

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue
} from "motion/react";
import {
  ChevronDown,
  ChevronLeft,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Check,
  X,
  RotateCw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldCheck,
  Leaf,
  Sparkles,
  Store,
  Flame,
  Award,
  Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/data/products";

// ---------------------------------------------------------------- pricing

const sizeFactor = (sizeName: string): number => {
  if (sizeName.includes("200")) return 1;
  if (sizeName.includes("500")) return 2.4;
  if (sizeName.includes("1 L") || sizeName.includes("1L") || sizeName.includes("1 Litre")) return 4.5;
  if (sizeName.includes("2 L") || sizeName.includes("2L") || sizeName.includes("2 Litres")) return 8.8;
  if (sizeName.includes("5 L") || sizeName.includes("5L") || sizeName.includes("5 Litres")) return 21.3;
  if (sizeName.includes("15 kg") || sizeName.includes("15kg")) return 60;
  return 1;
};

const findCatalogVolume = (productId: string, sizeName: string) => {
  const cat = PRODUCTS.find((p) => p.id === productId);
  if (!cat || !cat.volumes || cat.volumes.length === 0) return undefined;
  const clean = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const target = clean(sizeName);
  return cat.volumes.find((v) => {
    const vc = clean(v.size);
    return vc.includes(target) || target.includes(vc);
  });
};

export function getProductVolumePrice(productId: string, sizeName: string, fallbackPrice: number): number {
  const found = findCatalogVolume(productId, sizeName);
  if (found) return found.price;
  const f = sizeFactor(sizeName);
  return f === 1 ? fallbackPrice : Math.round(fallbackPrice * f);
}

export function getProductVolumeCompareAt(productId: string, sizeName: string, fallbackCompareAt?: number): number | undefined {
  const found = findCatalogVolume(productId, sizeName);
  if (found && found.originalPrice) return found.originalPrice;
  if (!fallbackCompareAt) return undefined;
  const f = sizeFactor(sizeName);
  return f === 1 ? fallbackCompareAt : Math.round(fallbackCompareAt * f);
}

// ---------------------------------------------------------------- types & data

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
  short: string;
  sub?: string;
  category: string;
  color: string;
  cap: string;
  label: string;
  ink: string;
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
  origin?: string;
  sourceType?: string;
  stickerColor?: string;
  bottleImage?: string;
  showcaseImage?: string;
};

const PET_SIZES = ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"];

export const DEFAULT_PRODUCTS: Product[] = [
  // --- AISLE 1: Signature Mustard Oils & Vedic Bilona Ghee ---
  {
    id: "yellow-mustard-oil",
    kind: "round-bottle",
    name: "Pure Cold-Pressed Yellow Mustard Oil",
    short: "Yellow Mustard Oil",
    sub: "पीली सरसों का तेल",
    category: "Mustard Oil",
    color: "#faf6ee",
    cap: "#FAB800",
    label: "#D97706",
    stickerColor: "#D97706",
    origin: "RAJASTHAN",
    sourceType: "Seeds Sourced from",
    ink: "#1c1404",
    glass: true,
    liquid: "#eab318",
    price: 75,
    compareAt: 95,
    bottleImage: "/mockups/yellow-mustard/bottle.png",
    showcaseImage: "/mockups/yellow-mustard/showcase.png",
    sizes: PET_SIZES,
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
    id: "black-mustard-oil",
    kind: "round-bottle",
    name: "Traditional Cold-Pressed Black Mustard Oil",
    short: "Black Mustard Oil",
    sub: "काली सरसों का तेल (झल वाला)",
    category: "Mustard Oil",
    color: "#e8edea",
    cap: "#FAB800",
    label: "#7A1426",
    stickerColor: "#7A1426",
    origin: "RAJASTHAN",
    sourceType: "Seeds Sourced from",
    ink: "#fbf6ec",
    glass: true,
    liquid: "#a25f0a",
    price: 70,
    compareAt: 90,
    bottleImage: "/mockups/black-mustard/bottle.png",
    showcaseImage: "/mockups/black-mustard/showcase.png",
    sizes: PET_SIZES,
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
    id: "dahi-bilona-desi-cow-ghee",
    kind: "jar",
    name: "Dahi Bilona Desi Cow Ghee",
    short: "Desi Cow Ghee",
    sub: "दही बिलोना देसी गाय का शुद्ध घी",
    category: "Bilona Ghee",
    color: "#f6f3eb",
    cap: "#c29139",
    label: "#8C4318",
    stickerColor: "#8C4318",
    origin: "VEDIC GAUSHALA",
    sourceType: "Handcrafted at",
    ink: "#3d280b",
    glass: true,
    liquid: "#f0c64c",
    price: 750,
    compareAt: 900,
    showcaseImage: "/images/bilona_ghee.jpg",
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
    stickerColor: "#7A1426",
    ink: "#fdf8ef",
    price: 1500,
    compareAt: 1850,
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

  // --- AISLE 2: Nut & Coconut Cold-Pressed Range ---
  {
    id: "cold-pressed-groundnut-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Groundnut Oil (Peanut Oil)",
    short: "Groundnut Oil",
    sub: "मूंगफली का तेल",
    category: "Nut & Seed Oils",
    color: "#f2edf2",
    cap: "#FAB800",
    label: "#4A1D6D",
    stickerColor: "#4A1D6D",
    origin: "GUJARAT",
    sourceType: "Seeds Sourced from",
    ink: "#faeef8",
    glass: true,
    liquid: "#e8af36",
    price: 80,
    compareAt: 105,
    bottleImage: "/mockups/groundnut-oil/bottle.png",
    showcaseImage: "/mockups/groundnut-oil/showcase.png",
    sizes: PET_SIZES,
    rating: 4.8,
    reviews: 890,
    tagline: "Cold pressed from Saurashtra red-skin peanuts. High 225°C smoke point.",
    description: "The golden cooking pride of western and northern India. Pressed in our cold-press Kolhu by Ramesh Kolhu Wale from sun-dried sweet Saurashtra peanuts without high temperatures, chemical filtration, or hexane solvents. Imparts a delightful, non-sticky aroma to puris and daily sabzis.",
    benefits: [
      "High Smoke Point (225°C): Ideal for Indian deep frying and tadka",
      "Rich in Natural Resveratrol for cardiovascular protection",
      "Naturally Sweet Nutty Flavor with zero greasy aftertaste",
      "Single-pressed from Saurashtra certified organic farms"
    ],
    ingredients: "100% Pure Cold-Pressed Saurashtra Peanuts (Arachis hypogaea).",
    howTo: "Excellent for frying puris, samosas, sauteing vegetables, and everyday family cooking."
  },
  {
    id: "cold-pressed-coconut-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Virgin Coconut Oil",
    short: "Coconut Oil",
    sub: "गोले का तेल",
    category: "Nut & Seed Oils",
    color: "#eef4f0",
    cap: "#FAB800",
    label: "#166534",
    stickerColor: "#166534",
    origin: "KERALA",
    sourceType: "Coconut Sourced from",
    ink: "#eefcf3",
    glass: true,
    liquid: "#f5f8f6",
    price: 110,
    compareAt: 140,
    bottleImage: "/mockups/coconut-oil/bottle.png",
    showcaseImage: "/mockups/coconut-oil/showcase.png",
    sizes: PET_SIZES,
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
    id: "extra-virgin-coconut-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Extra Virgin Coconut Oil",
    short: "Extra Virgin Coconut Oil",
    sub: "गोले का तेल",
    category: "Nut & Seed Oils",
    color: "#eaf1fa",
    cap: "#FAB800",
    label: "#0D3B82",
    stickerColor: "#0D3B82",
    origin: "KARNATAKA (Tiptur)",
    sourceType: "Coconut Sourced from",
    ink: "#eef6fd",
    glass: true,
    liquid: "#f6f9fc",
    price: 130,
    compareAt: 165,
    bottleImage: "/mockups/extra-virgin-coconut-oil/bottle.png",
    showcaseImage: "/mockups/extra-virgin-coconut-oil/showcase.png",
    sizes: PET_SIZES,
    rating: 5.0,
    reviews: 780,
    tagline: "Single-pressed from fresh organic Tiptur coconuts. Superior crystal clarity.",
    description: "Ultra-pure Cold-Pressed Extra Virgin Coconut Oil extracted from select sun-kissed organic coconuts from Tiptur, Karnataka. Retains light crystal-clear clarity when liquid and pure snow-white solid butter in cooler seasons. Highest concentration of medium-chain triglycerides (MCTs).",
    benefits: [
      "Over 55% Lauric Acid for immune vitality",
      "Ultra-fine molecular texture for non-greasy facial hydration",
      "100% raw virgin cold extraction below 32°C",
      "Zero chemical deodorization, zero sulfur"
    ],
    ingredients: "100% Pure Fresh Organic Tiptur Coconuts.",
    howTo: "Consume 1 spoon directly, blend in smoothies, or use as delicate baby massage and facial moisturizer."
  },
  {
    id: "cold-pressed-white-sesame-oil",
    kind: "round-bottle",
    name: "Cold-Pressed White Sesame Oil (Til Ka Tel)",
    short: "White Sesame Oil",
    sub: "सफेद तिल का तेल",
    category: "Nut & Seed Oils",
    color: "#f6f1e8",
    cap: "#FAB800",
    label: "#78350F",
    stickerColor: "#78350F",
    origin: "GUJARAT",
    sourceType: "Seeds Sourced from",
    ink: "#fcf8ee",
    glass: true,
    liquid: "#deb15b",
    price: 120,
    compareAt: 150,
    bottleImage: "/mockups/white-sesame-oil/bottle.png",
    showcaseImage: "/mockups/white-sesame-oil/showcase.png",
    sizes: PET_SIZES,
    rating: 4.9,
    reviews: 670,
    tagline: "Ayurveda supreme king of oils (Sarva Taila Pravara) for bones & joints.",
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

  // --- AISLE 3: Wellness Rogan, Walnut & Artisanal Oils ---
  {
    id: "pure-badam-rogan-almond-oil",
    kind: "round-bottle",
    name: "100% Pure Mamra Badam Rogan (Sweet Almond Oil)",
    short: "Mamra Almond Oil",
    sub: "मामरा बादाम का तेल",
    category: "Wellness Rogan",
    color: "#f9f0f0",
    cap: "#FAB800",
    label: "#B91C1C",
    stickerColor: "#B91C1C",
    origin: "KASHMIR",
    sourceType: "Almonds Sourced from",
    ink: "#fbf5f2",
    glass: true,
    liquid: "#dda835",
    price: 520,
    compareAt: 650,
    bottleImage: "/mockups/mamra-almond-oil/bottle.png",
    showcaseImage: "/mockups/mamra-almond-oil/showcase.png",
    sizes: PET_SIZES,
    rating: 5.0,
    reviews: 1580,
    tagline: "Single-press extra-virgin sweet almond elixir from Kashmiri Mamra almonds.",
    description: "Gold standard elixir for neural health, radiant skin, and silky hair. Extracted without heat from grade-A Kashmiri sweet Mamra almonds by Ramesh Kolhu Wale. Unlike cosmetic synthetic oils packed with mineral paraffin, RKW Badam Rogan is 100% pure food-grade and therapeutic.",
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
    id: "gurbandi-almond-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Gurbandi Almond Oil",
    short: "Gurbandi Almond Oil",
    sub: "गुरबन्दी बादाम का तेल",
    category: "Wellness Rogan",
    color: "#f7eee8",
    cap: "#FAB800",
    label: "#6E3917",
    stickerColor: "#6E3917",
    origin: "KASHMIR",
    sourceType: "Almonds Sourced from",
    ink: "#fdf6f0",
    glass: true,
    liquid: "#c8872a",
    price: 380,
    compareAt: 480,
    bottleImage: "/mockups/gurbandi-almond-oil/bottle.png",
    showcaseImage: "/mockups/gurbandi-almond-oil/showcase.png",
    sizes: PET_SIZES,
    rating: 4.9,
    reviews: 640,
    tagline: "Cold pressed from high-altitude Kashmiri Gurbandi almonds. High natural oil density.",
    description: "Pressed from wild Kashmiri Gurbandi almonds by Ramesh Kolhu Wale. Gurbandi almonds have a smaller profile but boast a significantly higher natural oil content and concentrated antioxidants compared to standard commercial varieties.",
    benefits: [
      "High natural oil concentration with potent phytonutrients",
      "Supports brain function, neurological endurance, and sound sleep",
      "Rich in natural antioxidants that fight oxidative cellular stress",
      "100% edible food grade, zero artificial coloring or essence"
    ],
    ingredients: "100% Pure Cold-Pressed Gurbandi Almonds.",
    howTo: "Take with warm milk or massage into temples for calming mental relief."
  },
  {
    id: "cold-pressed-walnut-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Kashmiri Walnut Oil (अखरोट तेल)",
    short: "Walnut Oil",
    sub: "अखरोट का तेल",
    category: "Wellness Rogan",
    color: "#ede9e6",
    cap: "#FAB800",
    label: "#4A2E1B",
    stickerColor: "#4A2E1B",
    origin: "KASHMIR",
    sourceType: "Seeds of",
    ink: "#f6eee9",
    glass: true,
    liquid: "#ba741c",
    price: 280,
    compareAt: 350,
    bottleImage: "/mockups/walnut-oil/bottle.png",
    showcaseImage: "/mockups/walnut-oil/showcase.png",
    sizes: PET_SIZES,
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
    short: "Flax Seed Oil",
    sub: "अलसी का तेल",
    category: "Wellness Rogan",
    color: "#e8edf5",
    cap: "#FAB800",
    label: "#1D4ED8",
    stickerColor: "#1D4ED8",
    origin: "MADHYA PRADESH",
    sourceType: "Seeds Sourced from",
    ink: "#eef4fd",
    glass: true,
    liquid: "#ce9222",
    price: 95,
    compareAt: 120,
    bottleImage: "/mockups/flax-seed-oil/bottle.png",
    showcaseImage: "/mockups/flax-seed-oil/showcase.png",
    sizes: PET_SIZES,
    rating: 4.7,
    reviews: 530,
    tagline: "Mother Nature richest plant source of Alpha-Linolenic Acid (ALA).",
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

  // --- AISLE 4: Specialty & Daily Kitchen Cold-Pressed Oils ---
  {
    id: "cold-pressed-black-sesame-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Black Sesame Oil (Kaale Til Ka Tel)",
    short: "Black Sesame Oil",
    sub: "काले तिल का तेल",
    category: "Specialty Oils",
    color: "#e5e7eb",
    cap: "#FAB800",
    label: "#374151",
    stickerColor: "#374151",
    origin: "WEST BENGAL",
    sourceType: "Seeds Sources from",
    ink: "#f3f4f6",
    glass: true,
    liquid: "#4b3820",
    price: 135,
    compareAt: 170,
    bottleImage: "/mockups/black-sesame-oil/bottle.png",
    showcaseImage: "/mockups/black-sesame-oil/showcase.png",
    sizes: PET_SIZES,
    rating: 4.9,
    reviews: 480,
    tagline: "Potent mineral-dense black sesame oil from Bengal organic heirloom seeds.",
    description: "Pressed slowly in our cold-press Ghani by Ramesh Kolhu Wale from heirloom West Bengal black sesame seeds. Supreme for Ayurvedic therapeutic massage, nourishing hair follicles to delay premature greying, and deep bone-nourishing therapies.",
    benefits: [
      "Deeply penetrative for musculoskeletal strength and joint elasticity",
      "Rich in Calcium, Iron & Magnesium for hair luster and density",
      "Ayurvedic Shirodhara gold standard oil",
      "Single-pressed from pure native West Bengal black sesame seeds"
    ],
    ingredients: "100% Pure Cold-Pressed Black Sesame Seeds.",
    howTo: "Warm gently for joint massage or apply to scalp for deep root strength."
  },
  {
    id: "cold-pressed-extra-virgin-olive-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Extra Virgin Olive Oil (जैतून तेल)",
    short: "Extra Virgin Olive Oil",
    sub: "एक्स्ट्रा वर्जिन जैतून का तेल",
    category: "Specialty Oils",
    color: "#edf3ee",
    cap: "#FAB800",
    label: "#164E22",
    stickerColor: "#164E22",
    origin: "RAJASTHAN & MEDITERRANEAN",
    sourceType: "Olives Sourced from",
    ink: "#eefbee",
    glass: true,
    liquid: "#839328",
    price: 220,
    compareAt: 280,
    bottleImage: "/mockups/olive-oil/bottle.png",
    showcaseImage: "/mockups/olive-oil/showcase.png",
    sizes: PET_SIZES,
    rating: 4.9,
    reviews: 720,
    tagline: "Single-estate cold pressed from Rajasthan & Mediterranean olive groves.",
    description: "First mechanical cold press of handpicked olives. Exhibits a fresh herbal aroma with a distinct peppery finish, proving high oleocanthal and polyphenol content.",
    benefits: [
      "Ultra-low Acidity (<0.5% Free Fatty Acids)",
      "High Oleic Acid and Potent Natural Antioxidants",
      "First Mechanical Cold Press, Zero Chemical Extraction",
      "Authentic Indian Olive Initiative Single Estate"
    ],
    ingredients: "100% Pure Extra Virgin Olive Oil (Olea europaea).",
    howTo: "Drizzle generously over raw salads, warm breads, grilled vegetables, hummus, and Mediterranean bowls."
  },
  {
    id: "cold-pressed-onion-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Pure Onion Oil (प्याज का तेल)",
    short: "Onion Oil",
    sub: "प्याज का तेल",
    category: "Specialty Oils",
    color: "#fdf2f8",
    cap: "#FAB800",
    label: "#831843",
    stickerColor: "#831843",
    origin: "MAHARASHTRA",
    sourceType: "Seeds of",
    ink: "#fce7f3",
    glass: true,
    liquid: "#b3421b",
    price: 140,
    compareAt: 180,
    bottleImage: "/mockups/onion-oil/bottle.png",
    showcaseImage: "/mockups/onion-oil/showcase.png",
    sizes: PET_SIZES,
    rating: 4.9,
    reviews: 620,
    tagline: "Pure cold-pressed onion seed oil (Kalonji) for follicular vitality and hair density.",
    description: "Cold-pressed from genuine native Maharashtra onion seeds (Allium cepa) by Ramesh Kolhu Wale. Naturally rich in sulfur, potassium, and active quercetin, onion seed oil stimulates dormant hair follicles and reduces seasonal hair fall.",
    benefits: [
      "Rich in Natural Bio-Active Sulfur: Strengthens hair roots and prevents breakage",
      "Potassium & Antioxidants: Revitalizes scalp and reduces dandruff flakes",
      "100% Cold-Pressed Seed Extract: Zero mineral oil, zero artificial perfumes",
      "Dual-use: Nourishing scalp oil and edible herbal dressing"
    ],
    ingredients: "100% Pure Cold-Pressed Onion Seed Oil.",
    howTo: "Part hair into sections and massage gently into scalp 30 minutes before washing."
  },
  {
    id: "cold-pressed-sunflower-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Sunflower Oil (सूरजमुखी तेल)",
    short: "Sunflower Oil",
    sub: "सूरजमुखी का तेल",
    category: "Specialty Oils",
    color: "#fffbeb",
    cap: "#FAB800",
    label: "#EA580C",
    stickerColor: "#EA580C",
    origin: "KARNATAKA",
    sourceType: "Seeds of",
    ink: "#fef3c7",
    glass: true,
    liquid: "#f59e0b",
    price: 90,
    compareAt: 115,
    bottleImage: "/mockups/sunflower-oil/bottle.png",
    showcaseImage: "/mockups/sunflower-oil/showcase.png",
    sizes: PET_SIZES,
    rating: 4.8,
    reviews: 510,
    tagline: "Light golden, non-greasy cooking oil cold pressed from Karnataka sunflower seeds.",
    description: "Cold-pressed by Ramesh Kolhu Wale from non-GMO, sun-drenched Karnataka sunflower seeds. Naturally light, neutral, and clear, it allows the authentic flavors of vegetables and curries to shine without greasy residue. Exceptionally rich in Vitamin E.",
    benefits: [
      "Exceptionally High in Natural Vitamin E: Powerful cellular antioxidant",
      "Ultra-light & non-sticky: Absorbs minimal oil during everyday frying",
      "Balanced Omega-6 & MUFA profile for active cardiovascular health",
      "Chemical-free: No hexane, no bleaching clays, zero artificial deodorizers"
    ],
    ingredients: "100% Pure Cold-Pressed Sunflower Seeds.",
    howTo: "Ideal for everyday light cooking, sauteing, baking, and crispy deep frying."
  }
];

// ---------------------------------------------------------------- colour helpers

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

// ---------------------------------------------------------------- packaging shapes (viewBox 200 x 300, stands on y = 286)

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
  "M 86 38 " +
  "L 86 40 " +
  "L 83 40 Q 82 42 83 44 L 86 44 " +
  "L 86 56 " +
  "C 86 68 76 80 66 90 " +
  "L 66 98 Q 69.5 102.25 66 106.5 " +
  "L 66 113.5 Q 69.5 117.75 66 122 " +
  "L 66 129 Q 69.5 133.25 66 137.5 " +
  "L 66 144.5 Q 69.5 148.75 66 153 " +
  "L 66 160 Q 69.5 164.25 66 168.5 " +
  "L 66 175.5 Q 69.5 179.75 66 184 " +
  "L 66 191 Q 69.5 195.25 66 199.5 " +
  "L 66 206.5 Q 69.5 210.75 66 215 " +
  "L 66 222 Q 69.5 226.25 66 230.5 " +
  "L 66 256 " +
  "Q 64 262 64 270 L 64 280 Q 64 286 70 286 " +
  "L 74 286 Q 100 277 126 286 L 130 286 " +
  "Q 136 286 136 280 L 136 270 Q 136 262 134 256 " +
  "L 134 230.5 Q 130.5 226.25 134 222 " +
  "L 134 215 Q 130.5 210.75 134 206.5 " +
  "L 134 199.5 Q 130.5 195.25 134 191 " +
  "L 134 184 Q 130.5 179.75 134 175.5 " +
  "L 134 168.5 Q 130.5 164.25 134 160 " +
  "L 134 153 Q 130.5 148.75 134 144.5 " +
  "L 134 137.5 Q 130.5 133.25 134 129 " +
  "L 134 122 Q 130.5 117.75 134 113.5 " +
  "L 134 106.5 Q 130.5 102.25 134 98 " +
  "L 134 90 " +
  "C 124 80 114 68 114 56 " +
  "L 114 44 " +
  "L 117 44 Q 118 42 117 40 L 114 40 " +
  "L 114 38 " +
  "Z";

const renderPetOilCap = (id: string) => {
  const capX = 84;
  const capW = 32;
  const capTop = 15;
  return (
    <g id={`${id}-pet-cap-group`}>
      <ellipse cx="100" cy="39" rx="16" ry="1.5" fill="#000" opacity="0.32" />
      <path
        d={`M${capX + 3} ${capTop} h${capW - 6} a3 3 0 0 1 3 3 v15 h-${capW} v-15 a3 3 0 0 1 3 -3 z`}
        fill={`url(#${id}-yellow-cap)`}
      />
      <ellipse cx="100" cy={capTop + 1.2} rx="14" ry="1.6" fill="#FFF8C4" opacity="0.9" />
      <path d={`M${capX + 2} ${capTop + 1} h${capW - 4}`} stroke="#FFE875" strokeWidth="1" strokeOpacity="0.95" />
      {Array.from({ length: 22 }, (_, i) => {
        const rx = capX + 2.5 + i * 1.25;
        return (
          <g key={i}>
            <line x1={rx} y1={capTop + 3} x2={rx} y2={capTop + 18} stroke="#9E5400" strokeWidth="0.5" strokeOpacity="0.45" />
            <line x1={rx + 0.5} y1={capTop + 3} x2={rx + 0.5} y2={capTop + 18} stroke="#FFFAC8" strokeWidth="0.55" strokeOpacity="0.8" />
          </g>
        );
      })}
      <rect x={capX + 0.5} y={capTop + 18} width={capW - 1} height="1.2" fill="#7A3E00" opacity="0.75" />
      <path
        d={`M${capX} ${capTop + 19.2} h${capW} v5.6 a1.2 1.2 0 0 1 -1.2 1.2 h-${capW - 2.4} a1.2 1.2 0 0 1 -1.2 -1.2 z`}
        fill={`url(#${id}-yellow-cap)`}
      />
      <line x1={capX + 1} y1={capTop + 25.4} x2={capX + capW - 1} y2={capTop + 25.4} stroke="#FFE875" strokeWidth="0.8" strokeOpacity="0.75" />
      {[88, 93, 98, 103, 108, 112].map((sx) => (
        <line key={sx} x1={sx} y1={capTop + 18} x2={sx} y2={capTop + 20.6} stroke="#542B00" strokeWidth="0.8" strokeOpacity="0.85" />
      ))}
    </g>
  );
};

const SHAPES: Record<Kind, Shape> = {
  "round-bottle": {
    body: PET_OIL_BODY_PATH,
    box: { x: 64, y: 38, w: 72, h: 248 },
    print: { x: 75.5, y: 93, w: 49, h: 159, paper: true },
    fill: 48,
    cap: (id) => renderPetOilCap(id)
  },
  bottle: {
    body: PET_OIL_BODY_PATH,
    box: { x: 64, y: 38, w: 72, h: 248 },
    print: { x: 75.5, y: 93, w: 49, h: 159, paper: true },
    fill: 48,
    cap: (id) => renderPetOilCap(id)
  },
  tin: {
    body: rr(48, 102, 104, 184, 8),
    box: { x: 48, y: 102, w: 104, h: 184 },
    print: { x: 52, y: 126, w: 96, h: 142, paper: true },
    cap: (id) => (
      <>
        <path d="M70 102 C70 56 130 56 130 102" fill="none" stroke="#555" strokeWidth="6.5" strokeLinecap="round" />
        <path d="M70 102 C70 56 130 56 130 102" fill="none" stroke="#e0e0e0" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="54" y="80" width="18" height="22" rx="3" fill={`url(#${id}-cap)`} />
        <path d={rr(52, 74, 22, 10, 2)} fill={`url(#${id}-cap)`} />
        <g>{ridges(52, 76, 22, 7, 2)}</g>
        <path d="M50 104 H150" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.6" />
        <path d="M48 106.5 H152" stroke="#000" strokeOpacity="0.25" strokeWidth="1" />
      </>
    )
  },
  jar: {
    body: "M42 192 H158 Q164 192 164 200 V276 Q164 286 150 286 H50 Q36 286 36 276 V200 Q36 192 42 192 Z",
    box: { x: 36, y: 192, w: 128, h: 94 },
    print: { x: 42, y: 214, w: 116, h: 58, paper: true },
    fill: 198,
    cap: (id) => (
      <>
        <path d={rr(34, 160, 132, 34, 6)} fill={`url(#${id}-cap)`} />
        <g>{ridges(34, 166, 132, 26, 2.5)}</g>
        <path d={rr(34, 160, 132, 34, 6)} fill={`url(#${id}-capv)`} />
        <path d="M40 162 H160" stroke="#fff" strokeOpacity="0.75" strokeWidth="1.4" />
        <rect x="36" y="192" width="128" height="3" fill="#000" opacity="0.22" />
      </>
    )
  },
  dropper: {
    body: "M64 165 Q64 148 86 146 L86 138 L114 138 L114 146 Q136 148 136 165 L136 272 Q136 286 122 286 L78 286 Q64 286 64 272 Z",
    box: { x: 64, y: 138, w: 72, h: 148 },
    print: { x: 64, y: 184, w: 72, h: 76, paper: true },
    fill: 160,
    cap: (id) => (
      <>
        <path d="M86 116 V84 Q86 60 100 60 Q114 60 114 84 V116 Z" fill={`url(#${id}-bulb)`} />
        <path d="M91 72 Q93 64 100 63" stroke="#fff" strokeOpacity="0.45" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d={rr(80, 114, 40, 26, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(80, 114, 40, 26, 2.2)}</g>
        <path d={rr(80, 114, 40, 26, 3)} fill={`url(#${id}-capv)`} />
      </>
    )
  },
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

// ---------------------------------------------------------------- sticker text helpers

const getStickerTitle = (short: string) => {
  const clean = short.replace(/\s*\([^)]*\)/g, "").trim();
  const upper = clean.toUpperCase();
  if (upper.includes("EXTRA VIRGIN COCONUT")) return { line1: "EXTRA VIRGIN", line2: "COCONUT OIL" };
  if (upper.includes("EXTRA VIRGIN OLIVE")) return { line1: "EXTRA VIRGIN", line2: "OLIVE OIL" };
  if (upper.includes("MUSTARD 5L")) return { line1: "MUSTARD OIL", line2: "5L ECO CAN" };
  const words = clean.split(/\s+/);
  if (words.length <= 1) return { line1: words[0].toUpperCase(), line2: "" };
  if (words.length === 2) return { line1: words[0].toUpperCase(), line2: words[1].toUpperCase() };
  if (words.length === 3) return { line1: `${words[0]} ${words[1]}`.toUpperCase(), line2: words[2].toUpperCase() };
  return { line1: `${words[0]} ${words[1]}`.toUpperCase(), line2: words.slice(2).join(" ").toUpperCase() };
};

const getDisplayQty = (raw?: string) => {
  if (!raw) return "500 ml";
  const match = raw.match(/(\d+)\s*(ml|l|kg)/i);
  if (match) {
    const unit = match[2].toLowerCase() === "l" ? "L" : match[2].toLowerCase() === "kg" ? "kg" : "ml";
    return `${match[1]} ${unit}`;
  }
  return raw.split(" ")[0];
};

type NF = [string, string][];

// Standard oil table: energy, sat, mono, poly, one highlighted extra row
const oilFacts = (energy: string, sat: string, mono: string, poly: string, extra: [string, string]): NF => [
  ["ENERGY", energy],
  ["PROTIEN", "0 g"],
  ["CARBOHYDRATE", "0 g"],
  ["TOTAL FAT", "100 g"],
  ["SATURATED FAT", sat],
  ["MONO UNSATURATED", mono],
  ["POLY UNSATURATED", poly],
  extra,
  ["CHOLESTEROL", "0 g"]
];

const getNutritionFacts = (p: Product): NF => {
  const id = p.id.toLowerCase();
  if (id.includes("coconut")) {
    return [
      ["ENERGY", "892 KCAL"],
      ["PROTIEN", "0 g"],
      ["CARBOHYDRATE", "0 g"],
      ["TOTAL FAT", "99.2 g"],
      ["SATURATED FAT", "86 g"],
      ["LAURIC ACID (MCT)", "50 g"],
      ["MONO UNSATURATED", "6 g"],
      ["POLY UNSATURATED", "2 g"],
      ["CHOLESTEROL", "0 g"]
    ];
  }
  if (id.includes("almond") || id.includes("badam")) return oilFacts("884 KCAL", "9 g", "70 g", "21 g", ["VITAMIN E", "26 mg"]);
  if (id.includes("walnut")) return oilFacts("884 KCAL", "9 g", "16 g", "63 g", ["OMEGA-3 (ALA)", "14 g"]);
  if (id.includes("flax")) return oilFacts("884 KCAL", "9 g", "18 g", "70 g", ["OMEGA-3 (ALA)", "55 g"]);
  if (id.includes("olive")) return oilFacts("884 KCAL", "14 g", "73 g", "11 g", ["POLYPHENOLS", "High"]);
  if (id.includes("sunflower")) return oilFacts("884 KCAL", "10 g", "23 g", "65 g", ["VITAMIN E", "41 mg"]);
  if (id.includes("sesame")) return oilFacts("884 KCAL", "14 g", "40 g", "42 g", ["NATURAL SESAMIN", "Present"]);
  if (id.includes("groundnut")) return oilFacts("900 KCAL", "17 g", "48 g", "34 g", ["RESVERATROL", "Active"]);
  if (id.includes("ghee")) {
    return [
      ["ENERGY", "897 KCAL"],
      ["PROTIEN", "0 g"],
      ["CARBOHYDRATE", "0 g"],
      ["MILK FAT", "99.7 g"],
      ["SATURATED FAT", "65 g"],
      ["MONO UNSATURATED", "28 g"],
      ["POLY UNSATURATED", "4 g"],
      ["BUTYRIC ACID", "3.5 g"],
      ["CHOLESTEROL", "256 mg"]
    ];
  }
  return [
    ["ENERGY", "900 KCAL"],
    ["PROTIEN", "0 g"],
    ["CARBOHYDRATE", "0 g"],
    ["TOTAL FAT", "100 g"],
    ["SATURATED FAT", "12 g"],
    ["TRANS FAT", "0 g"],
    ["MONO UNSATURATED", "60 g"],
    ["POLY UNSATURATED", "21 g"],
    ["CHOLESTEROL", "0 g"]
  ];
};

// ---------------------------------------------------------------- botanical illustration on the sticker

function Cruet({ liquid, tx = -10, opacity = 0.92 }: { liquid: string; tx?: number; opacity?: number }) {
  return (
    <g transform={`translate(${tx} 6)`}>
      <rect x="-2" y="0" width="4" height="3" rx="0.5" fill="#A0522D" />
      <path d="M -1.8 3 L -1.8 7 L -4 14 Q -7 20 -7 24 Q -7 28 0 28 Q 7 28 7 24 Q 7 20 4 14 L 1.8 7 L 1.8 3 Z" fill="rgba(255,255,255,0.7)" stroke="#A0522D" strokeWidth="0.5" />
      <path d="M -3.6 14 Q -6.5 19 -6.5 23.5 Q -6.5 27.5 0 27.5 Q 6.5 27.5 6.5 23.5 Q 6.5 19 3.6 14 Z" fill={liquid} opacity={opacity} />
      <path d="M -4.5 16 Q -5.5 20 -4.5 24" stroke="#FFF" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.85" />
    </g>
  );
}

const Bowl = ({ fill = "#78350F", stroke = "#451A03" }: { fill?: string; stroke?: string }) => (
  <path d="M -8 2 Q 0 10 8 2 Q 8 -1 -8 -1 Z" fill={fill} stroke={stroke} strokeWidth="0.5" />
);

function renderBotanicalArt(p: Product) {
  const id = p.id.toLowerCase();
  const liquidColor = p.liquid || "#D97706";

  if (id.includes("mustard")) {
    const isBlack = id.includes("black");
    const seedColor = isBlack ? "#1C1917" : "#EAB308";
    const seedHighlight = isBlack ? "#44403C" : "#FDE047";
    return (
      <g>
        <ellipse cx="-12" cy="30" rx="9" ry="6" fill="#15803D" opacity="0.8" />
        <ellipse cx="-11" cy="27" rx="8" ry="5" fill="#EAB308" opacity="0.9" />
        <circle cx="-15" cy="25" r="2.2" fill="#FACC15" />
        <circle cx="-12" cy="23" r="2" fill="#FDE047" />
        <circle cx="-8" cy="24" r="1.8" fill="#FACC15" />
        <circle cx="-13" cy="28" r="2" fill="#EAB308" />
        <Cruet liquid={liquidColor} />
        <g transform="translate(6 22)">
          <Bowl />
          <ellipse cx="0" cy="1" rx="7.5" ry="3" fill={seedColor} />
          <ellipse cx="0" cy="0" rx="6.5" ry="2.2" fill={seedHighlight} />
          <circle cx="-3" cy="0.5" r="0.6" fill={seedColor} />
          <circle cx="0" cy="0" r="0.6" fill={seedHighlight} />
          <circle cx="3" cy="0.8" r="0.6" fill={seedColor} />
        </g>
      </g>
    );
  }

  if (id.includes("coconut")) {
    return (
      <g>
        <path d="M -20 32 Q -12 20 -2 24 Q -10 28 -18 34 Z" fill="#15803D" opacity="0.85" />
        <path d="M -18 26 Q -10 16 0 18 Q -8 24 -16 30 Z" fill="#166534" opacity="0.8" />
        <Cruet liquid={liquidColor} tx={-11} opacity={0.8} />
        <g transform="translate(6 21)">
          <circle cx="-6" cy="1" r="5" fill="#582900" stroke="#381a00" strokeWidth="0.5" />
          <circle cx="-7" cy="0" r="0.7" fill="#2d1400" />
          <circle cx="-5" cy="0.5" r="0.7" fill="#2d1400" />
          <ellipse cx="4" cy="2" rx="7" ry="5.5" fill="#582900" stroke="#381a00" strokeWidth="0.5" />
          <ellipse cx="4" cy="1.5" rx="5.8" ry="4.2" fill="#FFFFFF" />
          <ellipse cx="4" cy="2" rx="4" ry="2.8" fill="#E0F2FE" opacity="0.9" />
          <path d="M 2 1.5 Q 4 1 6 1.8" stroke="#FFF" strokeWidth="0.6" strokeLinecap="round" fill="none" />
        </g>
      </g>
    );
  }

  if (id.includes("almond") || id.includes("badam")) {
    return (
      <g>
        <path d="M -18 28 Q -12 20 -4 25 Q -10 28 -16 32 Z" fill="#15803D" opacity="0.8" />
        <circle cx="-14" cy="24" r="2" fill="#FBCFE8" opacity="0.9" />
        <circle cx="-14" cy="24" r="0.8" fill="#F43F5E" />
        <Cruet liquid={liquidColor} />
        <g transform="translate(6 22)">
          <Bowl />
          <ellipse cx="-3" cy="0.5" rx="3.5" ry="1.8" fill="#B45309" transform="rotate(-15 -3 0.5)" />
          <ellipse cx="2" cy="0" rx="3.8" ry="1.9" fill="#D97706" transform="rotate(20 2 0)" />
          <ellipse cx="-0.5" cy="-1.5" rx="3.6" ry="1.8" fill="#92400E" transform="rotate(5 -0.5 -1.5)" />
          <line x1="-5" y1="0.5" x2="-1" y2="0.5" stroke="#78350F" strokeWidth="0.4" />
          <line x1="0" y1="0" x2="4" y2="0" stroke="#78350F" strokeWidth="0.4" />
        </g>
      </g>
    );
  }

  if (id.includes("walnut")) {
    return (
      <g>
        <path d="M -18 30 Q -10 22 -3 26 Q -10 30 -16 34 Z" fill="#15803D" opacity="0.85" />
        <Cruet liquid={liquidColor} />
        <g transform="translate(6 22)">
          <Bowl fill="#5A3A1A" stroke="#3A220F" />
          <path d="M -4 1 C -5 -1 -3 -3 -1 -2 C 0 -3 2 -3 3 -1 C 4 1 2 2 0 1 C -2 2 -3 2 -4 1 Z" fill="#D97706" stroke="#92400E" strokeWidth="0.4" />
          <circle cx="-1" cy="0" r="0.8" fill="#B45309" />
          <circle cx="2" cy="0.5" r="0.7" fill="#B45309" />
        </g>
      </g>
    );
  }

  if (id.includes("groundnut")) {
    return (
      <g>
        <ellipse cx="-13" cy="28" rx="7" ry="5" fill="#15803D" opacity="0.8" />
        <Cruet liquid={liquidColor} />
        <g transform="translate(6 21)">
          <path d="M -6 0 C -7 -2 -4 -4 -2 -2 C -1 -3 2 -3 4 -1 C 5 1 3 3 1 2 C 0 3 -4 3 -6 0 Z" fill="#D4A373" stroke="#A66A38" strokeWidth="0.4" />
          <ellipse cx="2" cy="3" rx="2.8" ry="1.6" fill="#991B1B" />
          <ellipse cx="-2" cy="3.5" rx="2.5" ry="1.5" fill="#C2410C" />
          <circle cx="1.8" cy="2.8" r="0.6" fill="#FCA5A5" />
        </g>
      </g>
    );
  }

  if (id.includes("sesame")) {
    const isBlack = id.includes("black");
    const seedColor = isBlack ? "#18181B" : "#F5F5DC";
    const seedStroke = isBlack ? "#09090B" : "#D4D4D8";
    return (
      <g>
        <ellipse cx="-13" cy="28" rx="8" ry="5" fill="#15803D" opacity="0.8" />
        <Cruet liquid={liquidColor} />
        <g transform="translate(6 22)">
          <Bowl />
          <ellipse cx="0" cy="1" rx="7.5" ry="3" fill={seedColor} stroke={seedStroke} strokeWidth="0.3" />
          <circle cx="-3" cy="0.8" r="0.6" fill={seedStroke} />
          <circle cx="0" cy="0.4" r="0.6" fill={seedStroke} />
          <circle cx="3" cy="0.8" r="0.6" fill={seedStroke} />
        </g>
      </g>
    );
  }

  if (id.includes("flax")) {
    return (
      <g>
        <ellipse cx="-13" cy="28" rx="8" ry="5" fill="#15803D" opacity="0.8" />
        <circle cx="-14" cy="22" r="2.2" fill="#3B82F6" />
        <circle cx="-11" cy="20" r="1.8" fill="#60A5FA" />
        <circle cx="-13" cy="21" r="0.6" fill="#FDE047" />
        <Cruet liquid={liquidColor} />
        <g transform="translate(6 22)">
          <Bowl />
          <ellipse cx="0" cy="1" rx="7.5" ry="3" fill="#B45309" />
          <ellipse cx="0" cy="0" rx="6.5" ry="2.2" fill="#92400E" />
          <circle cx="-2" cy="0.5" r="0.6" fill="#F59E0B" />
          <circle cx="2" cy="0.6" r="0.6" fill="#F59E0B" />
        </g>
      </g>
    );
  }

  if (id.includes("olive")) {
    return (
      <g>
        <path d="M -18 30 Q -11 20 -2 24 Q -9 27 -16 33 Z" fill="#4D7C0F" opacity="0.85" />
        <circle cx="-13" cy="24" r="2.2" fill="#65A30D" />
        <circle cx="-9" cy="22" r="2" fill="#365314" />
        <Cruet liquid={liquidColor} />
        <g transform="translate(6 22)">
          <Bowl fill="#365314" stroke="#1A2E05" />
          <ellipse cx="-2.5" cy="0.5" rx="3.5" ry="2.2" fill="#65A30D" transform="rotate(-10 -2.5 0.5)" />
          <ellipse cx="2.5" cy="0.8" rx="3.2" ry="2.1" fill="#4D7C0F" transform="rotate(15 2.5 0.8)" />
          <circle cx="-3" cy="0" r="0.6" fill="#BEF264" />
        </g>
      </g>
    );
  }

  if (id.includes("onion")) {
    return (
      <g>
        <ellipse cx="-13" cy="28" rx="8" ry="5" fill="#15803D" opacity="0.8" />
        <Cruet liquid={liquidColor} />
        <g transform="translate(6 21)">
          <circle cx="-1" cy="1" r="5" fill="#BE185D" stroke="#831843" strokeWidth="0.5" />
          <circle cx="-1" cy="1" r="3.8" fill="#FDF2F8" />
          <circle cx="-1" cy="1" r="2.8" fill="#DB2777" />
          <circle cx="-1" cy="1" r="1.6" fill="#FDF2F8" />
          <circle cx="5" cy="2" r="0.7" fill="#111827" />
          <circle cx="4" cy="4" r="0.6" fill="#111827" />
          <circle cx="6" cy="3.5" r="0.6" fill="#111827" />
        </g>
      </g>
    );
  }

  if (id.includes("sunflower")) {
    return (
      <g>
        <Cruet liquid={liquidColor} />
        <g transform="translate(6 20)">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <ellipse key={deg} cx="0" cy="0" rx="6" ry="1.8" fill="#F59E0B" transform={`rotate(${deg})`} />
          ))}
          <circle cx="0" cy="0" r="3" fill="#451A03" stroke="#78350F" strokeWidth="0.4" />
          <circle cx="0" cy="0" r="1.8" fill="#291201" />
        </g>
      </g>
    );
  }

  return (
    <g>
      <g transform="translate(-9 12)">
        <ellipse cx="0" cy="0" rx="6" ry="2" fill="#B45309" />
        <path d="M -5.5 0 Q -8 7 -6 12 Q 0 15 6 12 Q 8 7 5.5 0 Z" fill="#92400E" stroke="#78350F" strokeWidth="0.5" />
        <line x1="0" y1="-6" x2="0" y2="4" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      </g>
      <g transform="translate(6 21)">
        <path d="M -7 2 Q 0 9 7 2 Q 7 -1 -7 -1 Z" fill="#D97706" stroke="#92400E" strokeWidth="0.5" />
        <ellipse cx="0" cy="1" rx="6.5" ry="2.6" fill="#FACC15" />
        <circle cx="-2" cy="0.6" r="0.6" fill="#FEF08A" />
        <circle cx="2" cy="0.8" r="0.6" fill="#FEF08A" />
      </g>
    </g>
  );
}

// ---------------------------------------------------------------- the product drawing (cylinder shading + spinning label)

export function ProductArt({
  p,
  spin,
  size,
  className
}: {
  p: Product;
  spin?: MotionValue<number>;
  size?: string;
  className?: string;
}) {
  const id = "ps" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const isPet = p.kind === "round-bottle" || p.kind === "bottle";
  const s = SHAPES[p.kind] || SHAPES["round-bottle"];
  const c = hexRgb(p.color);
  const k = hexRgb(p.cap);
  const lab = hexRgb(p.label);
  const a = p.glass ? (lum(c) > 200 ? 0.32 : 0.78) : 1;
  const liq = hexRgb(p.liquid ?? p.color);
  const { print: P, box: B } = s;
  const period = isPet ? 136 : P.w * 2.6;
  const fallback = useMotionValue(0);
  const x = useTransform(spin ?? fallback, (v) => -((((v * period) % period) + period) % period));
  const nameSize = Math.min(9.5, P.w * 0.11, (P.w * 1.1) / p.short.length);
  const subSize = Math.min(6.2, P.w * 0.075, (P.w * 1.2) / Math.max(1, (p.sub ?? "").length));

  const renderFrontSticker = (dx: number) => {
    const cx = 100 + dx;
    const sx = 75.5 + dx;
    const sy = 93;
    const sw = 49;
    const sh = 159;
    const themeColor = p.stickerColor || p.label || "#7A1426";
    const maroon = themeColor;
    const navy = "#0B2545";
    const gold = "#D4AF37";
    const origin = p.origin || "RAJASTHAN";
    const sourceType = p.sourceType || "Seeds Sourced from";

    const { line1: title1, line2: title2 } = getStickerTitle(p.short);
    const displayQty = getDisplayQty(size || p.sizes[0]);
    const cleanHindiSub = p.sub ? p.sub.replace(/\s*\([^)]*\)/g, "").trim() : "";

    return (
      <g key={`front-${dx}`}>
        <rect x={sx} y={sy} width={sw} height={sh} rx={3.5} fill="#FFFFFF" stroke={maroon} strokeWidth={1.2} />
        <rect x={sx + 1.2} y={sy + 1.2} width={sw - 2.4} height={sh - 2.4} rx={2.5} fill="none" stroke={maroon} strokeWidth={0.35} strokeOpacity={0.5} />

        <g transform={`translate(${cx} ${sy + 9.5})`}>
          <circle cx="0" cy="0" r="5.8" fill="#FFF" stroke={navy} strokeWidth="0.8" />
          <circle cx="0" cy="0" r="5" fill="none" stroke={gold} strokeWidth="0.4" />
          <path d="M -3.2 -2.8 C -1 -4.2 2.8 -4.2 3.8 -2 C 4.5 -0.5 4 1.5 2.5 2.6 C 1 3.5 -0.8 4 -2.8 3.5 C -0.8 3 1.2 2.2 2 -0.2 C 2.5 -1.8 1.2 -3 -1.2 -2.5 Z" fill="#D62828" />
          <path d="M -3.2 -1.2 C -1.5 -2.4 1.8 -2.2 2.4 -0.6 C 3 1 1.8 2.4 0.2 3 C -1.5 3.6 -2.8 2.8 -3.2 1.5 C -2.4 2 -1 2.2 0.2 1.6 C 1.2 1.1 1.6 0.2 1 -0.8 C 0.4 -1.6 -1.8 -1.5 -3.2 -1.2 Z" fill={navy} />
          <circle cx="0" cy="0.2" r="1.1" fill={gold} />
          <text x="6.8" y="-3.2" fill={navy} fontSize="2.2" fontWeight="bold">®</text>
        </g>

        <text x={cx} y={sy + 20} fill={navy} fontSize="6.8" fontWeight="900" letterSpacing="0.06em" textAnchor="middle">RKW</text>
        <g transform={`translate(${cx + 15} ${sy + 16})`}>
          <rect x="0" y="0" width="3.8" height="3.8" rx="0.5" fill="#FFF" stroke="#138808" strokeWidth="0.5" />
          <circle cx="1.9" cy="1.9" r="1.1" fill="#138808" />
        </g>

        <text x={cx} y={sy + 25.5} fill={navy} fontSize="4.2" fontWeight="800" textAnchor="middle">रमेश कोल्हू वाले</text>

        <line x1={cx - 16} y1={sy + 27.2} x2={cx - 2} y2={sy + 27.2} stroke="#E5A812" strokeWidth="0.6" strokeLinecap="round" />
        <line x1={cx + 2} y1={sy + 27.2} x2={cx + 16} y2={sy + 27.2} stroke="#E5A812" strokeWidth="0.6" strokeLinecap="round" />
        <path d={`M ${cx} ${sy + 26.4} Q ${cx - 1.2} ${sy + 28} ${cx} ${sy + 28.8} Q ${cx + 1.2} ${sy + 28} ${cx} ${sy + 26.4} Z`} fill="#E5A812" />

        <text x={cx} y={sy + 32.5} fill={maroon} fontSize="3.4" fontWeight="700" fontStyle="italic" textAnchor="middle">पीढ़ियों का विश्वास</text>

        <g transform={`translate(${cx} ${sy + 37.5})`}>
          <rect x="-17" y="-3" width="34" height="6" rx="3" fill={maroon} />
          <text x="0" y="1.2" fill="#FFF" fontSize="3.1" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">COLD PRESSED</text>
        </g>

        <text x={cx} y={sy + 46.5} fill={maroon} fontSize={title2 ? "5.4" : "6"} fontWeight="900" letterSpacing="0.02em" textAnchor="middle">{title1}</text>
        {title2 && (
          <text x={cx} y={sy + 52.5} fill={maroon} fontSize="5.2" fontWeight="900" letterSpacing="0.02em" textAnchor="middle">{title2}</text>
        )}

        {cleanHindiSub && (
          <text x={cx} y={sy + (title2 ? 57.5 : 53.5)} fill={maroon} fontSize="3.6" fontWeight="600" fontStyle="italic" textAnchor="middle">{cleanHindiSub}</text>
        )}

        <g transform={`translate(${cx} ${sy + (title2 ? 63 : 59)})`}>
          <rect x="-15" y="-2.6" width="30" height="5.2" rx="2.6" fill={maroon} />
          <text x="0" y="1.1" fill="#FFF" fontSize="2.7" fontWeight="800" letterSpacing="0.06em" textAnchor="middle">SINGLE PRESSED</text>
        </g>

        <text x={cx} y={sy + (title2 ? 70 : 66)} fill="#555" fontSize="2.4" fontWeight="600" textAnchor="middle">{sourceType}</text>
        <text x={cx} y={sy + (title2 ? 74.2 : 70.2)} fill={themeColor} fontSize={origin.length > 14 ? "2.4" : "3.1"} fontWeight="900" letterSpacing="0.05em" textAnchor="middle">{origin}</text>
        <line x1={cx - 10} y1={sy + (title2 ? 75.5 : 71.5)} x2={cx + 10} y2={sy + (title2 ? 75.5 : 71.5)} stroke={maroon} strokeWidth="0.5" />

        <g transform={`translate(${cx} ${sy + 77})`}>
          <rect x="-22" y="0" width="44" height="38" rx="2" fill={`url(#${id}-farm-field-glow)`} />
          {renderBotanicalArt(p)}
          <g transform="translate(10 6)">
            <text x="0" y="0" fill="#262626" fontSize="2.2" fontWeight="800" fontStyle="italic" textAnchor="middle">Premium Quality</text>
            <text x="0" y="4" fill="#262626" fontSize="2.2" fontWeight="800" fontStyle="italic" textAnchor="middle">No Preservatives</text>
            <text x="0" y="8" fill="#262626" fontSize="2.2" fontWeight="800" fontStyle="italic" textAnchor="middle">No Added Colour</text>
          </g>
        </g>

        <g>
          <path d={`M ${sx + 1.2} ${sy + 118} Q ${cx} ${sy + 115} ${sx + sw - 1.2} ${sy + 118} L ${sx + sw - 1.2} ${sy + sh - 2.5} Q ${cx} ${sy + sh - 1} ${sx + 1.2} ${sy + sh - 2.5} Z`} fill={maroon} />
          <g transform={`translate(${sx + 7} ${sy + 135})`} stroke="#FFF" fill="none" strokeWidth="0.5" strokeLinecap="round">
            <path d="M 0 0 C -4 -4 -6 2 -2 5 C 1 7 -2 10 -5 9" />
            <circle cx="-3.5" cy="4" r="0.8" fill="#FFF" stroke="none" />
            <path d="M -1 2 C -3 0 -5 1 -4 3" />
            <circle cx="-1" cy="7" r="0.6" fill="#FFF" stroke="none" />
          </g>
          <g transform={`translate(${sx + sw - 7} ${sy + 135}) scale(-1 1)`} stroke="#FFF" fill="none" strokeWidth="0.5" strokeLinecap="round">
            <path d="M 0 0 C -4 -4 -6 2 -2 5 C 1 7 -2 10 -5 9" />
            <circle cx="-3.5" cy="4" r="0.8" fill="#FFF" stroke="none" />
            <path d="M -1 2 C -3 0 -5 1 -4 3" />
            <circle cx="-1" cy="7" r="0.6" fill="#FFF" stroke="none" />
          </g>
          <text x={cx} y={sy + 124} fill="#FFFFFF" fontSize="3.2" fontWeight="600" letterSpacing="0.04em" textAnchor="middle">Net Qty.</text>
          <text x={cx} y={sy + 136} fill="#FFFFFF" fontSize="9.2" fontWeight="900" letterSpacing="-0.02em" textAnchor="middle">{displayQty}</text>
          <g transform={`translate(${cx} ${sy + 148})`}>
            <polygon points="0,-4.5 4,2 -4,2" fill="none" stroke="#FACC15" strokeWidth="0.6" strokeLinejoin="round" />
            <path d="M 0 -4.5 L 1 -3" stroke="#FACC15" strokeWidth="0.5" />
            <path d="M 4 2 L 2.5 2" stroke="#FACC15" strokeWidth="0.5" />
            <path d="M -4 2 L -3 0.5" stroke="#FACC15" strokeWidth="0.5" />
            <circle cx="0" cy="-0.2" r="1" fill="#22C55E" />
          </g>
        </g>
      </g>
    );
  };

  const renderBackSticker = (dx: number) => {
    const cx = 100 + dx;
    const sx = 75.5 + dx;
    const sy = 93;
    const sw = 49;
    const sh = 159;
    const maroon = p.stickerColor || p.label || "#7A1426";
    const navy = "#0B2545";
    const qty = getDisplayQty(size || p.sizes[0]);

    return (
      <g key={`back-${dx}`}>
        <rect x={sx} y={sy} width={sw} height={sh} rx={3.5} fill="#FFFFFF" stroke={maroon} strokeWidth={1.2} />
        <rect x={sx + 1.2} y={sy + 1.2} width={sw - 2.4} height={sh - 2.4} rx={2.5} fill="none" stroke={maroon} strokeWidth="0.35" strokeOpacity={0.5} />

        <g transform={`translate(${cx - 10} ${sy + 7.5})`}>
          <circle cx="0" cy="0" r="4.2" fill="#FFF" stroke={navy} strokeWidth="0.6" />
          <circle cx="0" cy="0" r="3.2" fill="#FFF" stroke="#D97706" strokeWidth="0.4" />
          <text x="0" y="1" fill={navy} fontSize="3" fontWeight="bold" textAnchor="middle">R</text>
          <text x="5.2" y="-2" fill={navy} fontSize="1.8" fontWeight="bold">®</text>
        </g>
        <text x={cx + 6} y={sy + 6.2} fill={navy} fontSize="4.2" fontWeight="900" letterSpacing="0.05em" textAnchor="middle">RKW</text>
        <g transform={`translate(${cx + 17} ${sy + 3.8})`}>
          <rect x="0" y="0" width="3.2" height="3.2" rx="0.4" fill="#FFF" stroke="#138808" strokeWidth="0.4" />
          <circle cx="1.6" cy="1.6" r="0.9" fill="#138808" />
        </g>
        <text x={cx} y={sy + 11.8} fill={navy} fontSize="3.8" fontWeight="800" textAnchor="middle">Ramesh Kolhu Wale</text>
        <path d={`M ${cx} ${sy + 13} Q ${cx - 0.9} ${sy + 14.5} ${cx} ${sy + 15.2} Q ${cx + 0.9} ${sy + 14.5} ${cx} ${sy + 13} Z`} fill="#E5A812" />

        <g transform={`translate(${cx} ${sy + 17.5})`}>
          <rect x="-22" y="0" width="44" height="4.5" fill="#FDE047" stroke="#333" strokeWidth="0.4" />
          <text x="0" y="3.2" fill="#1C1917" fontSize="2.2" fontWeight="900" textAnchor="middle">Nutrition Facts (Per 100g)</text>
          <rect x="-22" y="4.5" width="44" height="28" fill="#FFF" stroke="#333" strokeWidth="0.4" />
          <line x1="8" y1="4.5" x2="8" y2="32.5" stroke="#333" strokeWidth="0.3" />
          {getNutritionFacts(p).map(([label, val], idx) => {
            const rowY = 7.5 + idx * 3;
            return (
              <g key={idx}>
                {idx > 0 && <line x1="-22" y1={4.5 + idx * 3} x2="22" y2={4.5 + idx * 3} stroke="#E5E7EB" strokeWidth="0.3" />}
                <text x="-20" y={rowY} fill="#1F2937" fontSize="1.8" fontWeight="700">{label}</text>
                <text x="20" y={rowY} fill="#1F2937" fontSize="1.8" fontWeight="800" textAnchor="end">{val}</text>
              </g>
            );
          })}
        </g>

        <g transform={`translate(${cx} ${sy + 53})`}>
          <text x="0" y="0" fill="#111" fontSize="2.1" fontWeight="800" textAnchor="middle">Ingredients: 100% Pure Cold-Pressed {p.short}</text>
          <text x="0" y="3.2" fill="#444" fontSize="1.8" fontWeight="600" textAnchor="middle">Free From Argemone Oil Representative</text>
          <text x="0" y="6.8" fill="#111" fontSize="2.2" fontWeight="800" textAnchor="middle">NET QUANTITY : {qty.toUpperCase()}</text>
        </g>

        <g transform={`translate(${cx} ${sy + 68})`}>
          <g transform="translate(-16 -2) scale(0.65)">
            <circle cx="3" cy="11" r="2.5" fill="#333" />
            <circle cx="15" cy="11" r="2.5" fill="#333" />
            <path d="M 3 11 L 8 11 L 10 5 L 14 5 L 15 11" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="5" y="3" width="5" height="5" rx="0.5" fill="#DC2626" />
          </g>
          <text x="-3" y="1" fill="#DC2626" fontSize="2.5" fontWeight="900">FREE DELIVERY</text>
          <text x="-3" y="4.2" fill="#444" fontSize="1.8" fontWeight="700">Delhi NCR &bull; Min. ₹799</text>
          <g transform="translate(0 9)">
            <circle cx="-14" cy="0" r="2.6" fill="#22C55E" />
            <path d="M -15 -1 Q -14 -2 -13 -1 L -12.5 0 Q -13 1 -14 1 Q -15 0 -15 -1 Z" fill="#FFF" />
            <text x="-8" y="0.8" fill="#111" fontSize="2.1" fontWeight="800">+91 9217744378 / 79</text>
          </g>
        </g>

        <g transform={`translate(${cx} ${sy + 89})`}>
          <text x="0" y="0" fill="#666" fontSize="1.7" fontWeight="600" textAnchor="middle">Mfg. &amp; Pkd. By:</text>
          <text x="0" y="3.2" fill="#111" fontSize="2.3" fontWeight="900" textAnchor="middle">VINAYAK UDYOG GLOBAL PVT. LTD.</text>
          <text x="0" y="6.4" fill="#444" fontSize="1.8" fontWeight="600" textAnchor="middle">Plot No. 100, Pocket A, Sector 1, DSIIDC, Bawana, Delhi-39</text>
          <g transform="translate(0 12)">
            <text x="-12" y="1.8" fill="#1E3A8A" fontSize="3.6" fontWeight="900" fontStyle="italic">fssai</text>
            <text x="2" y="1.8" fill="#111" fontSize="2" fontWeight="800">Lic. No. 10018011004919</text>
          </g>
          <text x="0" y="18" fill="#2563EB" fontSize="2" fontWeight="700" textAnchor="middle">www.rameshkolhuwale.com</text>
        </g>

        <g transform={`translate(${cx} ${sy + 120})`}>
          <rect x="-18" y="0" width="12" height="12" fill="#FFF" stroke="#222" strokeWidth="0.5" />
          <rect x="-16.5" y="1.5" width="3.5" height="3.5" fill="#222" />
          <rect x="-10" y="1.5" width="2" height="2" fill="#222" />
          <rect x="-16.5" y="7" width="2" height="2" fill="#222" />
          <rect x="-11.5" y="5.5" width="3.5" height="3.5" fill="#222" />
          <g transform="translate(-1 0)">
            {[0, 2, 3, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19].map((bx, i) => (
              <line key={i} x1={bx} y1="0" x2={bx} y2="10" stroke="#111" strokeWidth={i % 3 === 0 ? "0.9" : "0.5"} />
            ))}
            <text x="9.5" y="13.5" fill="#111" fontSize="1.8" fontWeight="bold" letterSpacing="0.08em" textAnchor="middle">8 906225 820923</text>
          </g>
        </g>

        <g transform={`translate(${cx} ${sy + 144})`}>
          <circle cx="-8" cy="0" r="2.2" fill="none" stroke="#222" strokeWidth="0.4" />
          <circle cx="-2" cy="0" r="2.2" fill="none" stroke="#222" strokeWidth="0.4" />
          <line x1="-5.8" y1="0" x2="-4.2" y2="0" stroke="#222" strokeWidth="0.4" />
          <polygon points="6,-3 9,2 3,2" fill="none" stroke="#22C55E" strokeWidth="0.5" />
        </g>
      </g>
    );
  };

  // Label art for non-PET items (jar, tin, etc.)
  const printArt = (dx: number) => {
    const isRound = p.kind === "round-bottle";
    const isTin = p.kind === "tin";
    const isJar = p.kind === "jar";
    const centerX = P.x + P.w / 2;

    return (
      <g transform={`translate(${dx} 0)`}>
        {P.paper && (
          <rect x={P.x} y={P.y} width={P.w} height={P.h} rx={isRound ? 6 : 3} fill={css(lab)} stroke={p.ink} strokeWidth={0.8} strokeOpacity={0.25} />
        )}
        {P.paper && (
          <rect x={P.x + 2} y={P.y + 2} width={P.w - 4} height={P.h - 4} rx={isRound ? 4 : 2} fill="none" stroke={p.ink} strokeWidth={0.6} strokeOpacity={0.35} strokeDasharray={isTin ? "3 1.5" : undefined} />
        )}

        <g transform={`translate(${centerX} ${P.y + P.h * 0.16})`}>
          <circle cx="-16" cy="-2" r="4.2" fill={p.ink} />
          <circle cx="-16" cy="-2" r="3" fill={css(lab)} />
          <path d="M-17.5 -2 H-14.5 M-16 -3.5 V-0.5" stroke={p.ink} strokeWidth="0.8" />
          <text x="0" y="0.5" fill={p.ink} fontSize={Math.min(7.5, P.w * 0.09)} fontWeight="800" letterSpacing="0.08em" textAnchor="middle">RKW</text>
          <text x="11.5" y="-2" fill={p.ink} fontSize="3.5" fontWeight="bold">®</text>
        </g>

        <text x={centerX} y={P.y + P.h * 0.28} fill={p.ink} fontSize={Math.min(4.8, P.w * 0.055)} fontWeight="600" opacity="0.9" textAnchor="middle">रमेश कोल्हू वाले</text>

        <text x={centerX} y={P.y + P.h * 0.46} fill={p.ink} fontSize={nameSize} fontWeight="700" letterSpacing="-0.15" textAnchor="middle">{p.short}</text>

        {p.sub && (
          <text x={centerX} y={P.y + P.h * 0.61} fill={p.ink} fontSize={subSize} fontWeight="500" opacity="0.85" textAnchor="middle">{p.sub}</text>
        )}

        <g transform={`translate(${centerX} ${P.y + P.h * 0.74})`}>
          <rect x="-24" y="-4" width="48" height="8" rx="2" fill={p.ink} fillOpacity="0.1" />
          <text x="0" y="1.8" fill={p.ink} fontSize="3.5" fontWeight="700" letterSpacing="0.04em" textAnchor="middle">
            {isJar ? "BILONA GHEE • 100% PURE" : "COLD-PRESSED • <38°C"}
          </text>
        </g>

        <g transform={`translate(${centerX} ${P.y + P.h * 0.89})`}>
          <rect x={-P.w * 0.38} y="-3.5" width="6" height="6" fill="#fff" stroke="#138808" strokeWidth="0.6" rx="0.5" />
          <circle cx={-P.w * 0.38 + 3} cy="-0.5" r="1.8" fill="#138808" />
          <text x="1" y="0.8" fill={p.ink} opacity="0.95" fontSize={Math.min(5.6, P.w * 0.07)} fontWeight="600" textAnchor="middle">
            {size ? getDisplayQty(size) : p.sizes[0]}
          </text>
        </g>
      </g>
    );
  };

  const svgViewBox = isPet
    ? "46 10 108 284"
    : p.kind === "jar"
      ? "24 140 152 150"
      : p.kind === "tin"
        ? "36 45 128 248"
        : "0 0 200 300";

  return (
    <svg viewBox={svgViewBox} className={className} aria-hidden overflow="visible">
      <defs>
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
        <linearGradient id={`${id}-yellow-cap`} x1="0" x2="1">
          <stop offset="0" stopColor="#D98A00" />
          <stop offset="0.08" stopColor="#FAB800" />
          <stop offset="0.22" stopColor="#FFE564" />
          <stop offset="0.38" stopColor="#FFC820" />
          <stop offset="0.65" stopColor="#F5A800" />
          <stop offset="0.88" stopColor="#E09200" />
          <stop offset="1" stopColor="#BA7200" />
        </linearGradient>
        <linearGradient id={`${id}-pet-plastic`} x1="0" x2="1">
          <stop offset="0" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="0.08" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="0.5" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="0.92" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="1" stopColor="rgba(255,255,255,0.3)" />
        </linearGradient>
        <linearGradient id={`${id}-pet-oil-grad`} x1="0" x2="1">
          <stop offset="0" stopColor={css(mixRgb(liq, BLACK, 0.42))} />
          <stop offset="0.08" stopColor={css(mixRgb(liq, BLACK, 0.12))} />
          <stop offset="0.2" stopColor={css(mixRgb(liq, WHITE, 0.28))} />
          <stop offset="0.36" stopColor={css(liq, 1.08)} />
          <stop offset="0.52" stopColor={css(mixRgb(liq, WHITE, 0.38))} />
          <stop offset="0.75" stopColor={css(mixRgb(liq, BLACK, 0.05))} />
          <stop offset="0.9" stopColor={css(mixRgb(liq, BLACK, 0.2))} />
          <stop offset="1" stopColor={css(mixRgb(liq, BLACK, 0.42))} />
        </linearGradient>
        <linearGradient id={`${id}-farm-field-glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FEF3C7" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#FDE68A" stopOpacity="0.95" />
          <stop offset="1" stopColor="#EAB308" stopOpacity="0.8" />
        </linearGradient>
        <clipPath id={`${id}-panel-clip`}>
          <rect x="74" y="91" width="52" height="163" rx="3" />
        </clipPath>
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

      <path d={s.body} fill={isPet ? `url(#${id}-pet-plastic)` : `url(#${id}-body)`} />

      <g clipPath={`url(#${id}-clip)`}>
        {isPet ? (
          <>
            <rect x="60" y="48" width="80" height="240" fill={`url(#${id}-pet-oil-grad)`} opacity="0.96" />

            <rect x="86" y="38" width="28" height="10" fill="rgba(255,255,255,0.06)" />
            <line x1="88" y1="40" x2="88" y2="48" stroke="#fff" strokeWidth="0.9" strokeOpacity="0.7" />
            <line x1="112" y1="40" x2="112" y2="48" stroke="#fff" strokeWidth="0.6" strokeOpacity="0.35" />

            <ellipse cx="100" cy="42" rx="16.5" ry="2" fill="none" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.85" />
            <ellipse cx="100" cy="42.5" rx="16" ry="1.6" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />

            <path d="M 86 48 Q 100 50.5 114 48" stroke="#FFF9D2" strokeWidth="1.3" strokeOpacity="0.95" fill="none" />
            <path d="M 86 48.8 Q 100 51.3 114 48.8" stroke="rgba(100,50,0,0.5)" strokeWidth="0.8" fill="none" />

            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const ny = 98 + i * 15.5;
              return (
                <g key={i}>
                  <rect x="67" y={ny} width="6.5" height="8.5" rx="1.8" fill="rgba(60,25,0,0.32)" />
                  <rect x="67.5" y={ny + 0.5} width="5.5" height="7.5" rx="1.2" fill="rgba(255,225,90,0.28)" />
                  <line x1="67" y1={ny} x2="73.5" y2={ny} stroke="rgba(255,255,255,0.85)" strokeWidth="0.8" />
                  <line x1="67" y1={ny + 8.5} x2="73.5" y2={ny + 8.5} stroke="rgba(100,45,0,0.5)" strokeWidth="0.8" />
                  <ellipse cx="70.2" cy={ny + 4.25} rx="1.8" ry="2" fill="#FFEAA7" opacity="0.65" />

                  <rect x="126.5" y={ny} width="6.5" height="8.5" rx="1.8" fill="rgba(60,25,0,0.32)" />
                  <rect x="127" y={ny + 0.5} width="5.5" height="7.5" rx="1.2" fill="rgba(255,225,90,0.28)" />
                  <line x1="126.5" y1={ny} x2="133" y2={ny} stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
                  <line x1="126.5" y1={ny + 8.5} x2="133" y2={ny + 8.5} stroke="rgba(100,45,0,0.5)" strokeWidth="0.8" />
                  <ellipse cx="129.8" cy={ny + 4.25} rx="1.8" ry="2" fill="#FFEAA7" opacity="0.55" />
                </g>
              );
            })}

            <line x1="74" y1="90" x2="74" y2="256" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            <line x1="126" y1="90" x2="126" y2="256" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />

            <line x1="86" y1="56" x2="66" y2="90" stroke="#fff" strokeWidth="1.6" strokeOpacity="0.75" strokeLinecap="round" />
            <line x1="114" y1="56" x2="134" y2="90" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 74 86 Q 100 84 126 86" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />

            <g>
              <polygon points="74,91 75.5,93 75.5,253 74,255" fill="rgba(255,255,255,0.45)" />
              <polygon points="74,91 126,91 124.5,93 75.5,93" fill="rgba(255,255,255,0.55)" />
              <polygon points="126,91 126,255 124.5,253 124.5,93" fill="rgba(0,0,0,0.22)" />
              <polygon points="74,255 75.5,253 124.5,253 126,255" fill="rgba(0,0,0,0.18)" />
            </g>

            <g clipPath={`url(#${id}-panel-clip)`}>
              <motion.g style={{ x }}>
                {renderFrontSticker(-period)}
                {renderBackSticker(-period * 0.5)}
                {renderFrontSticker(0)}
                {renderBackSticker(period * 0.5)}
                {renderFrontSticker(period)}
                {renderBackSticker(period * 1.5)}
              </motion.g>
            </g>

            <rect x="76" y="93" width="7" height="158" rx="3.5" fill="#fff" opacity="0.32" filter={`url(#${id}-soft)`} />
            <line x1="77.5" y1="93" x2="77.5" y2="251" stroke="#fff" strokeWidth="1.2" strokeOpacity="0.88" />
            <path d="M 75 88 L 86 68" stroke="#fff" strokeWidth="1.4" strokeOpacity="0.65" strokeLinecap="round" />
            <line x1="123" y1="93" x2="123" y2="251" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.25" />

            <path d="M 66 264 H 134" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
            <path d="M 64 274 H 136" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
            <path d="M 64 280 H 136" stroke="rgba(120,60,0,0.35)" strokeWidth="1" />
            <path d="M 70 286 Q 100 277 130 286" stroke="#fff" strokeWidth="1.6" strokeOpacity="0.85" fill="none" />
            <path d="M 72 286 Q 100 279 128 286" stroke="rgba(120,60,0,0.45)" strokeWidth="1" fill="none" />
          </>
        ) : (
          <>
            {p.glass && s.fill !== undefined && (
              <>
                <rect x={B.x + 3} y={s.fill} width={B.w - 6} height={286 - s.fill - 8} fill={`url(#${id}-liquid)`} opacity="0.82" />
                <rect x={B.x + 3} y={s.fill} width={B.w - 6} height="1.8" fill="#fff" opacity="0.5" />
                {s.tube && <rect x="98.6" y={B.y - 4} width="2.8" height={286 - B.y - 4} fill="#fff" opacity="0.4" />}
                <rect x={B.x} y="274" width={B.w} height="12" fill={css(c, 0.5, 0.55)} />
                <path d={`M${B.x + 6} 275 H${B.x + B.w - 6}`} stroke="#fff" strokeOpacity="0.55" strokeWidth="0.8" />
              </>
            )}

            <motion.g style={{ x }}>
              {printArt(0)}
              {printArt(period)}
            </motion.g>

            <rect x={B.x} y={P.y - 2} width={B.w} height={P.h + 4} fill={`url(#${id}-wrap)`} opacity="0.5" />
            <rect x={B.x} y={B.y} width={B.w} height={B.h} fill={`url(#${id}-shade)`} />
            <rect x={B.x + B.w * 0.07} y={B.y + 4} width={B.w * 0.11} height={B.h - 8} rx="3" fill="#fff" opacity={lum(c) > 200 ? 0.45 : 0.3} filter={`url(#${id}-soft)`} />
            <rect x={B.x + B.w * 0.11} y={B.y + 6} width={B.w * 0.028} height={B.h - 12} rx="1" fill="#fff" opacity="0.85" />
            <rect x={B.x + B.w * 0.86} y={B.y + 8} width={B.w * 0.025} height={B.h - 16} rx="1" fill="#fff" opacity="0.3" />
          </>
        )}
      </g>

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

// ---------------------------------------------------------------- procedural sound effects

export class ShelfSoundSystem {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (val && !this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        try {
          this.ctx = new AudioCtx();
        } catch {
          // ignore
        }
      }
    }
    if (this.ctx && this.ctx.state === "suspended" && val) {
      this.ctx.resume().catch(() => {});
    }
  }

  public getEnabled() {
    return this.enabled;
  }

  public playWoodClick() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(280, t);
      osc.frequency.exponentialRampToValueAtTime(70, t + 0.04);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);
    } catch {
      // ignore
    }
  }

  public playChime() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      const t = this.ctx.currentTime;
      [587.33, 880, 1174.66].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, t + idx * 0.05);
        gain.gain.setValueAtTime(0.06, t + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.05);
        osc.stop(t + idx * 0.05 + 0.35);
      });
    } catch {
      // ignore
    }
  }

  public playShutter() {
    if (!this.enabled || !this.ctx) return;
    try {
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, t);
      osc.frequency.linearRampToValueAtTime(240, t + 0.2);
      gain.gain.setValueAtTime(0.06, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch {
      // ignore
    }
  }
}

// ---------------------------------------------------------------- 360° product dialog

const SPRING = { type: "spring" as const, bounce: 0, duration: 0.55 };
const WA = "919217744378";

export function ProductPage({
  p,
  currency,
  onClose,
  onAdd,
  bagRef,
  soundSystem,
  onOpenBag
}: {
  p: Product;
  currency: string;
  onClose: () => void;
  onAdd: (product: Product, size: string, qty: number) => void;
  bagRef: RefObject<HTMLButtonElement | null>;
  soundSystem?: ShelfSoundSystem;
  onOpenBag?: () => void;
}) {
  const reduce = useReducedMotion();
  const spin = useMotionValue(0);
  const [size, setSize] = useState(p.sizes[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(false);
  const [activeTab, setActiveTab] = useState<"order" | "process" | "lab">("order");
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const drag = useRef<{ x: number; v: number; samples: { x: number; t: number }[] } | null>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    if (reduce) return;
    const c = animate(spin, 1, { duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 });
    return () => c.stop();
  }, [spin, reduce]);

  // Continuous auto spin loop
  useEffect(() => {
    if (!isAutoSpinning) return;
    let animId: number;
    const tick = () => {
      spin.set(spin.get() + 0.0032);
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [isAutoSpinning, spin]);

  const computedPrice = getProductVolumePrice(p.id, size, p.price);
  const computedCompareAt = getProductVolumeCompareAt(p.id, size, p.compareAt) || Math.round(computedPrice * 1.25);

  const handleAdd = () => {
    onAdd(p, size, qty);
    setAdded(true);
    soundSystem?.playChime();
    bagRef.current?.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
      { duration: 320, easing: "ease-out" }
    );
  };

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsAutoSpinning(false);
    spin.stop();
    soundSystem?.playWoodClick();
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

  const snapAngle = (offset: number) => {
    setIsAutoSpinning(false);
    soundSystem?.playWoodClick();
    const currentBase = Math.floor(spin.get());
    animate(spin, currentBase + offset, { type: "spring", stiffness: 90, damping: 14 });
  };

  return (
    <motion.div role="dialog" aria-modal="true" aria-label={p.name} className="fixed inset-0 z-[70] overflow-y-auto">
      <motion.div
        className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      <div className="relative mx-auto flex min-h-full max-w-[1140px] flex-col justify-center px-3 py-6 sm:px-6 md:grid md:grid-cols-[1.08fr_1fr] md:items-center md:gap-8 md:py-8">
        {/* Left: 360° bottle on a turntable */}
        <div className="relative flex flex-col items-center justify-center pb-4 pt-2 md:py-0">
          <motion.div
            layoutId={`product-${p.id}`}
            transition={SPRING}
            className="relative z-10 flex h-[44vh] max-h-[580px] w-[200px] cursor-grab touch-none select-none items-center justify-center active:cursor-grabbing sm:h-[52vh] sm:w-[250px] md:h-[65vh] md:w-[290px]"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <ProductArt p={p} spin={spin} size={size} className="h-full w-auto max-w-full drop-shadow-2xl" />
          </motion.div>

          {/* Wooden Turntable with controls */}
          <div className="relative -mt-2 flex flex-col items-center sm:-mt-3">
            <div className="h-4 w-44 rounded-[50%] border-t border-[#FDE68A]/40 bg-gradient-to-b from-[#B86B28] via-[#8C4318] to-[#451A03] shadow-[0_15px_35px_rgba(0,0,0,0.5)] sm:h-5 sm:w-56" />

            {/* Rotation & Inspection Action Bar */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setIsAutoSpinning(!isAutoSpinning);
                  soundSystem?.playWoodClick();
                }}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold transition shadow-sm",
                  isAutoSpinning
                    ? "bg-amber-400 text-stone-900 ring-2 ring-amber-300 font-black"
                    : "bg-white/10 text-amber-200 hover:bg-white/20 border border-white/20 backdrop-blur-md"
                )}
              >
                {isAutoSpinning ? <Pause className="size-3" /> : <Play className="size-3" />}
                <span>{isAutoSpinning ? "Pause 360°" : "Auto 360°"}</span>
              </button>

              <div className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-0.5 backdrop-blur-md text-[10px] font-bold text-amber-200">
                <button
                  type="button"
                  onClick={() => snapAngle(0)}
                  className="rounded-full px-2.5 py-0.5 hover:bg-white/20 transition"
                >
                  Front
                </button>
                <button
                  type="button"
                  onClick={() => snapAngle(0.25)}
                  className="rounded-full px-2.5 py-0.5 hover:bg-white/20 transition"
                >
                  Botanical
                </button>
                <button
                  type="button"
                  onClick={() => snapAngle(0.5)}
                  className="rounded-full px-2.5 py-0.5 hover:bg-white/20 transition"
                >
                  Nutrition
                </button>
                <button
                  type="button"
                  onClick={() => snapAngle(0.75)}
                  className="rounded-full px-2.5 py-0.5 hover:bg-white/20 transition"
                >
                  Quality
                </button>
              </div>
            </div>

            <p className="mt-2 text-center text-[10px] font-medium text-amber-200/70 sm:text-[11px]">
              ⇄ Drag horizontally to spin • Inspect authentic purity stickers
            </p>
          </div>
        </div>

        {/* Right: details card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="relative z-20 mx-auto w-full max-w-[520px] rounded-3xl border border-stone-200/90 bg-white p-5 text-stone-900 shadow-2xl sm:p-7 md:mx-0"
        >
          {/* Top Bar inside card */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-[#EBF2F8] px-2.5 py-1 text-xs font-black uppercase tracking-wider text-[#0E2A47] transition-colors hover:bg-[#DDE9F4]"
            >
              <ChevronLeft className="size-3.5" strokeWidth={2.4} /> Back to Shelf
            </button>
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-amber-200/60 bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-800">
                {p.category}
              </span>
              <div className="flex items-center gap-1 rounded-full border border-amber-200/40 bg-amber-50/60 px-2 py-0.5 text-[11px] font-black text-amber-600">
                <Star className="size-3 fill-amber-400 text-amber-500" />
                <span>{p.rating.toFixed(1)}</span>
                <span className="font-normal text-stone-400">({p.reviews})</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="grid size-7 cursor-pointer place-items-center rounded-lg text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-800"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Title & Pricing */}
          <div className="mt-3">
            <h2 className="font-serif text-xl font-black leading-tight text-stone-900 sm:text-2xl">{p.name}</h2>
            {p.sub && <p className="mt-0.5 text-xs font-bold text-[#0E2A47] sm:text-sm">{p.sub}</p>}
          </div>

          <div className="mt-2.5 flex flex-wrap items-baseline gap-2.5">
            <span className="text-2xl font-black tabular-nums text-[#0E2A47] sm:text-3xl">
              {currency}
              {computedPrice}
            </span>
            {computedCompareAt && (
              <span className="text-sm tabular-nums text-stone-400 line-through">
                {currency}
                {computedCompareAt}
              </span>
            )}
            {computedCompareAt > computedPrice && (
              <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-black text-emerald-800">
                Save {currency}
                {computedCompareAt - computedPrice} ({Math.round(((computedCompareAt - computedPrice) / computedCompareAt) * 100)}% OFF)
              </span>
            )}
            <span className="text-[11px] font-semibold text-stone-500">Taxes included &bull; Free Delhi NCR above ₹799</span>
          </div>

          {/* Tab Navigation */}
          <div className="mt-3 flex items-center rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs font-bold text-stone-600">
            <button
              type="button"
              onClick={() => {
                setActiveTab("order");
                soundSystem?.playWoodClick();
              }}
              className={cn(
                "flex-1 py-1.5 rounded-lg text-center transition-all",
                activeTab === "order" ? "bg-white text-[#0E2A47] shadow-sm font-black" : "hover:text-stone-900"
              )}
            >
              🛒 Select &amp; Order
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("process");
                soundSystem?.playWoodClick();
              }}
              className={cn(
                "flex-1 py-1.5 rounded-lg text-center transition-all",
                activeTab === "process" ? "bg-white text-[#0E2A47] shadow-sm font-black" : "hover:text-stone-900"
              )}
            >
              🌿 Cold-Press Heritage
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("lab");
                soundSystem?.playWoodClick();
              }}
              className={cn(
                "flex-1 py-1.5 rounded-lg text-center transition-all",
                activeTab === "lab" ? "bg-white text-[#0E2A47] shadow-sm font-black" : "hover:text-stone-900"
              )}
            >
              🧪 Purity &amp; Nutrition
            </button>
          </div>

          {/* TAB 1: ORDER */}
          {activeTab === "order" && (
            <div className="mt-3.5 space-y-3.5">
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-stone-700">Select Volume / Packaging:</span>
                  <span className="text-[11px] font-bold text-[#0E2A47]">{size}</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {p.sizes.map((sz) => {
                    const on = size === sz;
                    const optPrice = getProductVolumePrice(p.id, sz, p.price);
                    const shortSz = sz.replace(/\s*\([^)]*\)/g, "").trim();
                    const packType = sz.includes("Tin") ? "Tin" : p.kind === "jar" ? "Jar" : "PET";
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          setSize(sz);
                          soundSystem?.playWoodClick();
                        }}
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-center rounded-xl border px-1 py-1.5 text-center transition-all",
                          on
                            ? "border-[#0E2A47] bg-[#0E2A47] text-white shadow-sm ring-2 ring-[#0E2A47]/40"
                            : "border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100"
                        )}
                      >
                        <span className="text-[12px] font-black leading-tight">{shortSz}</span>
                        <span className={cn("text-[11px] font-bold tabular-nums", on ? "text-amber-300" : "text-[#0E2A47]")}>
                          {currency}
                          {optPrice} <span className="text-[9px] font-normal opacity-70">({packType})</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center gap-2">
                <div className="flex h-11 flex-shrink-0 items-center rounded-xl border border-stone-200 bg-stone-50">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => {
                      setQty((q) => Math.max(1, q - 1));
                      soundSystem?.playWoodClick();
                    }}
                    className="grid h-full w-8 cursor-pointer place-items-center rounded-l-xl text-stone-700 transition-colors hover:bg-stone-200 disabled:opacity-30"
                    disabled={qty === 1}
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-7 text-center text-xs font-black tabular-nums">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => {
                      setQty((q) => Math.min(10, q + 1));
                      soundSystem?.playWoodClick();
                    }}
                    className="grid h-full w-8 cursor-pointer place-items-center rounded-r-xl text-stone-700 transition-colors hover:bg-stone-200"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className={cn(
                    "flex h-11 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl text-xs font-black uppercase tracking-wide shadow-md transition-all active:scale-95 sm:text-sm",
                    added ? "bg-emerald-700 text-white" : "bg-[#0E2A47] text-amber-300 hover:bg-[#163A60] hover:text-white"
                  )}
                >
                  {added ? (
                    <>
                      <Check className="size-4" />
                      <span>Added ✓</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="size-4" />
                      <span>
                        Add ({currency}
                        {computedPrice * qty})
                      </span>
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/${WA}?text=${encodeURIComponent(
                    `Namaste Ramesh Kolhu Wale! I would like to order:\n\n*Product:* ${p.name}\n*Packaging:* ${size}\n*Quantity:* ${qty}\n*Amount:* ₹${computedPrice * qty}\n\nPlease confirm availability and delivery to Delhi NCR.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Order on WhatsApp"
                  className="flex h-11 flex-shrink-0 cursor-pointer items-center justify-center gap-1 rounded-xl bg-[#25D366] px-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#20BD5A] hover:shadow active:scale-95"
                >
                  <span className="text-sm">💬</span>
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>

              {/* Added to Bag Post-Action Banner */}
              {added && (
                <div className="flex items-center justify-between rounded-xl border border-emerald-300 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-900 animate-in fade-in zoom-in-95">
                  <div className="flex items-center gap-1.5">
                    <Check className="size-4 text-emerald-600" />
                    <span>Item added to your basket!</span>
                  </div>
                  {onOpenBag && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenBag();
                      }}
                      className="rounded-lg bg-emerald-700 px-2.5 py-1 text-[11px] font-black text-white hover:bg-emerald-800 transition"
                    >
                      View Bag &rarr;
                    </button>
                  )}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-1 rounded-xl border border-stone-200/80 bg-stone-50 p-2 text-center">
                <div className="flex flex-col items-center text-[10px] font-bold text-stone-700 sm:text-[11px]">
                  <span className="font-black text-amber-700">❄️ &lt;38°C Cold Press</span>
                  <span className="text-[9px] font-normal text-stone-500">Traditional Kolhu</span>
                </div>
                <div className="flex flex-col items-center border-x border-stone-200 text-[10px] font-bold text-stone-700 sm:text-[11px]">
                  <span className="font-black text-emerald-700">🌿 Single-Source</span>
                  <span className="text-[9px] font-normal text-stone-500">{p.origin || "Native Seeds"}</span>
                </div>
                <div className="flex flex-col items-center text-[10px] font-bold text-stone-700 sm:text-[11px]">
                  <span className="font-black text-[#0E2A47]">🚚 Free Delhi NCR</span>
                  <span className="text-[9px] font-normal text-stone-500">Orders above ₹799</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXTRACTION & PROCESS */}
          {activeTab === "process" && (
            <div className="mt-3.5 space-y-3 text-xs text-stone-700">
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3">
                <p className="font-bold text-amber-900">
                  <span className="font-black">Cold Extraction Method:</span> Traditional Kachi Ghani (Kolhu) at slow 14 RPM under 38°C. Made without heat, chemical solvents, or argemone.
                </p>
                <p className="mt-1 text-[11px] text-amber-800">
                  <span className="font-bold">Source Region:</span> {p.sourceType || "Seeds sourced from"} {p.origin || "Rajasthan certified fields"}.
                </p>
              </div>

              <div>
                <p className="font-black uppercase tracking-wider text-stone-800 text-[11px] mb-1.5">Key Health Benefits:</p>
                <div className="space-y-1.5">
                  {p.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ShieldCheck className="size-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-stone-700 font-medium leading-snug">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-100 pt-2">
                <p className="font-black text-[11px] text-stone-800">Ingredients:</p>
                <p className="text-[11px] text-stone-600 mt-0.5 italic">{p.ingredients}</p>
              </div>
            </div>
          )}

          {/* TAB 3: LAB VERIFIED & NUTRITION */}
          {activeTab === "lab" && (
            <div className="mt-3.5 space-y-3 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-stone-50 border border-stone-200 p-2.5">
                <div>
                  <span className="font-black text-[#0E2A47] text-sm italic">fssai</span>
                  <span className="ml-1.5 text-[11px] font-bold text-stone-700">Lic. No. 10018011004919</span>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black text-emerald-800">
                  100% PURE &bull; 0% ARGEMONE
                </span>
              </div>

              <div>
                <p className="font-black uppercase tracking-wider text-stone-800 text-[11px] mb-1">Nutrition Facts (per 100g):</p>
                <div className="max-h-40 overflow-y-auto rounded-xl border border-stone-200 bg-stone-50/50 p-2">
                  <table className="w-full text-[11px]">
                    <tbody>
                      {getNutritionFacts(p).map(([lbl, val], idx) => (
                        <tr key={idx} className="border-b border-stone-100 last:border-0">
                          <td className="py-1 text-stone-600 font-medium">{lbl}</td>
                          <td className="py-1 text-right font-black text-stone-900">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-2">
                <p className="font-black text-[11px] text-stone-800">Culinary &amp; Wellness Instructions:</p>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-relaxed">{p.howTo}</p>
              </div>
            </div>
          )}

          <p className="mt-3 text-center text-[11px] italic leading-snug text-stone-600">{p.tagline}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ================================================================
//  SHOP EXPERIENCE: storefront -> aisles -> billing counter
// ================================================================

const AISLES = [
  {
    no: "01",
    title: "Mustard Oils & Vedic Bilona Ghee",
    sub: "Traditional cold-press Kolhu & hand-churned curd ghee",
    wall: "linear-gradient(180deg,#1b0f06 0%,#2e1a0b 60%,#3a2210 100%)",
    glow: "rgba(255,196,80,0.55)"
  },
  {
    no: "02",
    title: "Nut & Coconut Cold-Pressed Oils",
    sub: "Saurashtra peanuts, Kerala copra, Tiptur virgin & Gujarat sesame",
    wall: "linear-gradient(180deg,#07201a 0%,#0e2f26 60%,#143a2f 100%)",
    glow: "rgba(255,226,150,0.5)"
  },
  {
    no: "03",
    title: "Wellness Rogans & Exotic Seeds",
    sub: "Kashmir Mamra & Gurbandi almonds, walnut & organic flaxseed",
    wall: "linear-gradient(180deg,#2a0b12 0%,#3d121c 60%,#4a1824 100%)",
    glow: "rgba(255,190,120,0.5)"
  },
  {
    no: "04",
    title: "Specialty & Daily Kitchen Oils",
    sub: "Black sesame, olive, onion seed & sunflower",
    wall: "linear-gradient(180deg,#0a1626 0%,#10233b 60%,#16304f 100%)",
    glow: "rgba(255,214,130,0.5)"
  }
];

// ---------------------------------------------------------------- storefront

function Storefront({ preview, onEnter }: { preview: Product[]; onEnter: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const shutterY = useTransform(scrollYProgress, [0.08, 0.42], ["0%", "-102%"]);
  const facadeScale = useTransform(scrollYProgress, [0.3, 0.9], [1, 2.6]);
  const facadeOpacity = useTransform(scrollYProgress, [0.62, 0.9], [1, 0]);
  const interiorScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const welcomeOpacity = useTransform(scrollYProgress, [0.5, 0.72, 0.95], [0, 1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={ref} className="relative h-[240vh]">
      <div className="sticky top-0 h-dvh overflow-hidden bg-[#150b04]">
        {/* Interior glimpse behind the shutter */}
        <motion.div style={{ scale: interiorScale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(255,190,80,0.35),transparent_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[repeating-linear-gradient(90deg,#2b160a_0,#2b160a_70px,#34190b_70px,#34190b_72px)]" />
          <div className="absolute inset-x-0 bottom-[34%] h-3 bg-gradient-to-b from-[#b8702f] to-[#6a2e0a]" />
          <div className="absolute inset-x-0 bottom-[34%] flex items-end justify-center gap-[3vw] px-6">
            {preview.map((p, i) => (
              <div key={p.id} className={cn("h-[30vh] sm:h-[38vh]", i > 2 && "hidden sm:block")}>
                <ProductArt p={p} className="h-full w-auto opacity-90 drop-shadow-2xl" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Welcome copy once the shutter is up */}
        <motion.div style={{ opacity: welcomeOpacity }} className="pointer-events-none absolute inset-x-0 top-[16%] z-10 px-6 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.35em] text-amber-300">Welcome in</p>
          <h2 className="mt-2 font-serif text-3xl font-extrabold text-amber-50 sm:text-5xl">Pressed in front of you since 1981</h2>
        </motion.div>

        {/* Facade */}
        <motion.div style={{ scale: facadeScale, opacity: facadeOpacity, transformOrigin: "50% 85%" }} className="absolute inset-0 z-20">
          <div className="absolute inset-0 bg-[#0c1f2e]" />
          <div className="absolute inset-0 opacity-30 [background:repeating-linear-gradient(0deg,transparent_0,transparent_26px,rgba(0,0,0,0.5)_26px,rgba(0,0,0,0.5)_28px),repeating-linear-gradient(90deg,transparent_0,transparent_58px,rgba(0,0,0,0.35)_58px,rgba(0,0,0,0.35)_60px)]" />

          {/* Signboard */}
          <div className="absolute inset-x-0 top-[7%] mx-auto w-[88%] max-w-3xl rounded-lg border-4 border-[#e5a812] bg-gradient-to-b from-[#7a1426] to-[#4a0a16] px-4 py-4 text-center shadow-[0_10px_40px_rgba(0,0,0,0.6)] sm:py-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-300 sm:text-xs">Est. 1981 &bull; Live Kachi Ghani</p>
            <h1 className="mt-1 font-serif text-3xl font-black tracking-wide text-amber-50 sm:text-6xl">RAMESH KOLHU WALE</h1>
            <p className="mt-1 text-sm font-bold text-amber-200 sm:text-xl">रमेश कोल्हू वाले &bull; पीढ़ियों का विश्वास</p>
          </div>

          {/* Striped awning */}
          <div className="absolute inset-x-0 top-[34%] h-[11%] shadow-[0_14px_24px_rgba(0,0,0,0.5)] [background:repeating-linear-gradient(90deg,#fab800_0,#fab800_48px,#7a1426_48px,#7a1426_96px)]" />

          {/* Live Ghani Ticker Banner */}
          <div className="absolute inset-x-0 top-[45%] z-20 flex justify-center px-4">
            <div className="flex items-center gap-2 rounded-full border border-amber-400/40 bg-[#160b04]/90 px-4 py-1 text-[10px] font-bold text-amber-200 backdrop-blur-md shadow-lg sm:text-xs">
              <span className="size-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span>LIVE GHANI: 14 RPM Wood Press &bull; Cold-Pressed &lt;38°C &bull; Est. 1981 Delhi NCR</span>
            </div>
          </div>

          {/* Rolling shutter */}
          <div className="absolute inset-x-[6%] bottom-0 top-[47%] overflow-hidden border-x-8 border-t-8 border-[#5b2a0c]">
            <motion.div
              style={{ y: shutterY }}
              className="absolute inset-0 bg-[repeating-linear-gradient(180deg,#9aa3a8_0,#c9d0d4_10px,#7b858b_12px)] shadow-[inset_0_-12px_20px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute inset-x-0 bottom-0 flex h-11 items-center justify-center bg-[#555e63]">
                <button
                  type="button"
                  onClick={onEnter}
                  className="flex items-center gap-2 rounded-full bg-[#2a3135] px-4 py-1 text-[10px] font-black uppercase tracking-[0.25em] text-amber-300 shadow transition hover:bg-amber-300 hover:text-stone-900 active:scale-95 cursor-pointer"
                >
                  <span>Open &bull; 10 AM &ndash; 10 PM</span>
                  <span className="opacity-75">| Step Inside &darr;</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom hint / quick enter */}
        <motion.div style={{ opacity: hintOpacity }} className="absolute inset-x-0 bottom-6 z-30 flex flex-col items-center gap-1.5 text-amber-100">
          <button
            type="button"
            onClick={onEnter}
            className="flex items-center gap-2 rounded-full border border-amber-300/40 bg-black/60 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.3em] text-amber-200 backdrop-blur-md hover:bg-amber-300 hover:text-stone-900 transition active:scale-95 cursor-pointer"
          >
            <span>Scroll or Click to Enter Shop</span>
            <ChevronDown className="size-4 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- aisle

function Lamp({ glow }: { glow: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center">
      <div className="h-8 w-px bg-amber-200/50 sm:h-14" />
      <div className="h-5 w-14 rounded-t-full bg-gradient-to-b from-[#f5d77a] to-[#92400e] shadow-lg" />
      <div className="-mt-px h-1.5 w-5 rounded-b bg-[#fff3c4] shadow-[0_0_24px_10px_rgba(255,220,120,0.7)]" />
      <div
        className="h-[78vw] max-h-[480px] w-[150%] -translate-y-1"
        style={{
          clipPath: "polygon(46% 0, 54% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(to bottom, ${glow}, transparent 88%)`
        }}
      />
    </div>
  );
}

function Aisle({
  index,
  items,
  currency,
  openId,
  onOpen,
  onActive,
  onQuickAdd,
  onSound
}: {
  index: number;
  items: Product[];
  currency: string;
  openId: string | null;
  onOpen: (id: string) => void;
  onActive: (i: number) => void;
  onQuickAdd: (p: Product, size: string, qty: number) => void;
  onSound?: (type: "wood" | "chime" | "shutter") => void;
}) {
  const a = AISLES[index];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const numY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const wallShift = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const handleQuick = (p: Product) => {
    onQuickAdd(p, p.sizes[0], 1);
    setQuickAddedId(p.id);
    onSound?.("chime");
    setTimeout(() => {
      setQuickAddedId((cur) => (cur === p.id ? null : cur));
    }, 1800);
  };

  return (
    <motion.section
      ref={ref}
      id={`aisle-${index + 1}`}
      onViewportEnter={() => onActive(index)}
      viewport={{ amount: 0.45 }}
      className="relative min-h-dvh overflow-hidden py-16 sm:py-24"
      style={{ background: a.wall }}
    >
      <motion.div
        style={{ y: wallShift }}
        className="absolute inset-x-0 -top-10 bottom-0 opacity-[0.07] [background:repeating-linear-gradient(90deg,#fff_0,#fff_1px,transparent_1px,transparent_90px)]"
      />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.35)_0,rgba(0,0,0,0.35)_80px,rgba(0,0,0,0.5)_80px,rgba(0,0,0,0.5)_82px)]" />

      <motion.div
        style={{ y: numY }}
        aria-hidden
        className="pointer-events-none absolute -right-4 top-10 select-none font-serif text-[34vw] font-black leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,226,150,0.12)] sm:text-[24vw]"
      >
        {a.no}
      </motion.div>

      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* Hanging aisle sign */}
        <motion.div
          initial={{ y: -80, opacity: 0, rotate: -3 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ type: "spring", stiffness: 70, damping: 11 }}
          className="relative mx-auto mb-10 w-full max-w-xl origin-top text-center sm:mb-14"
        >
          <div className="pointer-events-none absolute -top-16 left-[18%] h-16 w-px bg-amber-200/40" />
          <div className="pointer-events-none absolute -top-16 right-[18%] h-16 w-px bg-amber-200/40" />
          <div className="rounded-xl border-2 border-[#e5a812] bg-gradient-to-b from-[#6a2e0a] to-[#3b1501] px-5 py-4 shadow-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-300">Aisle {a.no}</p>
            <h2 className="mt-1 font-serif text-xl font-extrabold leading-tight text-amber-50 sm:text-3xl">{a.title}</h2>
            <p className="mt-1 text-[11px] font-medium text-amber-200/80 sm:text-sm">{a.sub}</p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-[9px] font-extrabold tracking-wider text-amber-200 uppercase">
              <span>❄️ Cold-Pressed &lt;38°C</span>
              <span>&bull;</span>
              <span>100% Single-Source</span>
            </div>
          </div>
        </motion.div>

        {/* Bottles on wooden shelf */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
          {items.map((p, i) => (
            <div key={p.id} className="relative flex flex-col items-center">
              <div className="relative h-[290px] w-full sm:h-[360px] lg:h-[400px]">
                <Lamp glow={a.glow} />
                <motion.div
                  initial={{ y: 160, opacity: 0, rotate: i % 2 ? 4 : -4 }}
                  whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 60, damping: 13, delay: 0.12 * (i % 4) }}
                  className="absolute inset-x-0 bottom-0 flex h-[84%] items-end justify-center"
                >
                  {openId === p.id ? (
                    <div className="h-full w-full" />
                  ) : (
                    <motion.div
                      layoutId={`product-${p.id}`}
                      transition={SPRING}
                      whileHover={{ y: -14, scale: 1.04 }}
                      className="group relative flex h-full w-full cursor-pointer items-end justify-center rounded-2xl outline-none"
                    >
                      <button
                        type="button"
                        onClick={() => {
                          onOpen(p.id);
                          onSound?.("wood");
                        }}
                        className="h-full w-full flex items-end justify-center cursor-pointer"
                        aria-label={`${p.name}, from ${currency}${p.price}`}
                      >
                        <ProductArt p={p} className="h-full w-auto max-w-full drop-shadow-[0_18px_22px_rgba(0,0,0,0.55)]" />
                      </button>

                      {/* Hover Action Bar */}
                      <div className="absolute -top-2 inset-x-0 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-auto">
                        <button
                          type="button"
                          onClick={() => {
                            onOpen(p.id);
                            onSound?.("wood");
                          }}
                          className="flex items-center gap-1 rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-black tracking-wider text-[#3b1501] shadow hover:bg-amber-400 active:scale-95 transition"
                        >
                          <RotateCw className="size-3" />
                          <span>360°</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuick(p)}
                          className={cn(
                            "flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black tracking-wider shadow active:scale-95 transition",
                            quickAddedId === p.id
                              ? "bg-emerald-600 text-white"
                              : "bg-[#0E2A47] text-amber-200 border border-amber-300/40 hover:bg-[#163A60]"
                          )}
                        >
                          {quickAddedId === p.id ? (
                            <>
                              <Check className="size-3" />
                              <span>Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="size-3" />
                              <span>Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Wooden plank shelf */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 * (i % 4) }}
                aria-hidden
                className="-mt-1 h-3.5 w-[112%] rounded-sm bg-gradient-to-b from-[#c07a38] via-[#8c4318] to-[#4a1c05] shadow-[0_14px_22px_rgba(0,0,0,0.6)] sm:h-4"
              />

              {/* Hanging price tag */}
              <motion.div
                initial={{ rotate: -6, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                whileHover={{ rotate: 1, y: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 120, damping: 8, delay: 0.5 + 0.1 * (i % 4) }}
                className="relative mt-3 w-full max-w-[215px] origin-top rounded-xl bg-gradient-to-b from-[#fdf7ea] to-[#f4e8cb] px-3.5 py-2.5 text-center shadow-xl border border-amber-900/10"
              >
                <span aria-hidden className="absolute -top-3 left-1/2 size-2.5 -translate-x-1/2 rounded-full border-2 border-[#92400e] bg-[#2a1608]" />

                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="rounded-full bg-amber-900/10 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-amber-950">
                    {p.origin || "PURE"}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-700">
                    <Star className="size-2.5 fill-amber-500 text-amber-500" />
                    <span className="text-[10px] font-black">{p.rating.toFixed(1)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onOpen(p.id);
                    onSound?.("wood");
                  }}
                  className="block w-full text-left cursor-pointer group"
                >
                  <span className="block truncate text-[13px] font-black text-stone-900 group-hover:text-amber-800 transition-colors">
                    {p.short}
                  </span>
                  {p.sub && <span className="block truncate text-[10px] font-medium text-stone-600">{p.sub}</span>}
                </button>

                <div className="mt-1.5 flex items-center justify-between border-t border-amber-900/10 pt-1.5">
                  <div className="text-left">
                    <span className="text-[13px] font-black tabular-nums text-[#7a1426]">
                      {currency}
                      {p.price}
                    </span>
                    {p.compareAt && (
                      <span className="ml-1 text-[10px] text-stone-400 line-through">
                        {currency}
                        {p.compareAt}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleQuick(p)}
                      className={cn(
                        "flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm transition-all active:scale-95",
                        quickAddedId === p.id
                          ? "bg-emerald-600 text-white"
                          : "bg-[#0E2A47] text-amber-300 hover:bg-[#163A60] hover:text-white"
                      )}
                    >
                      {quickAddedId === p.id ? "Added ✓" : "+ Add"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onOpen(p.id);
                        onSound?.("wood");
                      }}
                      aria-label="360 view"
                      className="grid size-6 place-items-center rounded-lg bg-amber-900/10 text-stone-700 hover:bg-amber-900/20 transition"
                    >
                      <RotateCw className="size-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

// ---------------------------------------------------------------- billing counter

function Counter({
  onSound,
  onBrowseAisles
}: {
  onSound?: (type: "wood" | "chime" | "shutter") => void;
  onBrowseAisles?: () => void;
}) {
  const cart = useCart();
  const subtotal = cart?.subtotal || 0;
  const totalItems = cart?.totalItems || 0;
  const threshold = 799;
  const progressToFree = Math.min(100, Math.round((subtotal / threshold) * 100));
  const diffToFree = Math.max(0, threshold - subtotal);

  return (
    <section id="counter" className="relative overflow-hidden bg-gradient-to-b from-[#3b1501] via-[#210c03] to-[#120702] px-4 py-20 text-center sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(255,190,80,0.25),transparent_70%)]" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto max-w-2xl"
      >
        <p className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-300">Billing Counter &bull; Ramesh Kolhu Wale</p>
        <h2 className="mt-2 font-serif text-3xl font-extrabold text-amber-50 sm:text-5xl">Ready to take authentic purity home?</h2>
        <p className="mt-3 text-sm text-amber-100/80">Fresh cold-pressed oils &amp; Vedic Bilona ghee straight from our Delhi NCR unit.</p>

        {/* Live Basket & Free Shipping Status */}
        <div className="mt-6 rounded-2xl border border-amber-400/30 bg-black/40 p-4 backdrop-blur-md text-amber-50 text-left">
          <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="size-4 text-amber-300" />
              <span>Your Basket: <strong className="text-amber-300">{totalItems} items</strong> (₹{subtotal})</span>
            </span>
            <span className="text-[11px] text-amber-200/80 font-medium">Free Delivery above ₹799</span>
          </div>

          <div className="mt-3">
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToFree}%` }}
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
              />
            </div>
            <p className="mt-2 text-[11px] text-amber-200">
              {diffToFree > 0
                ? `🚚 Add ₹${diffToFree} more for FREE Delhi NCR Home Delivery!`
                : "🎉 You have qualified for FREE Home Delivery across Delhi NCR!"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (cart) cart.setIsCartOpen(true);
              onSound?.("chime");
            }}
            className="flex items-center gap-2 rounded-xl bg-amber-400 px-6 py-3.5 text-sm font-black text-[#2e1305] shadow-lg hover:bg-amber-300 active:scale-95 transition"
          >
            <ShoppingBag className="size-4" />
            <span>Open Shopping Bag ({totalItems})</span>
          </button>

          <a
            href={`https://wa.me/${WA}?text=${encodeURIComponent(
              `Namaste Ramesh Kolhu Wale! I would like to order fresh cold-pressed oils & Vedic Bilona ghee directly to Delhi NCR.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-[#20bd5a] active:scale-95"
          >
            <span>💬 WhatsApp +91 92177 44378</span>
          </a>

          <button
            type="button"
            onClick={() => {
              onBrowseAisles?.();
              onSound?.("wood");
            }}
            className="rounded-xl border border-amber-300/50 px-5 py-3.5 text-sm font-bold text-amber-200 transition hover:bg-amber-300/10 active:scale-95"
          >
            &uarr; Explore Aisles Again
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 grid grid-cols-2 gap-2 text-[11px] font-bold text-amber-100/90 sm:grid-cols-4 sm:text-xs">
          <div className="rounded-xl bg-white/5 p-3 border border-white/5">❄️ Cold-pressed &lt;38°C</div>
          <div className="rounded-xl bg-white/5 p-3 border border-white/5">🌿 Single-source seeds</div>
          <div className="rounded-xl bg-white/5 p-3 border border-white/5">✅ FSSAI Licensed</div>
          <div className="rounded-xl bg-white/5 p-3 border border-white/5">🚚 Fast Delhi NCR Delivery</div>
        </div>

        <p className="mt-6 text-[11px] text-amber-200/60">
          Unit: B-2, Village Khurreji Khas, West Laxmi Market, Delhi-51 &bull; Open 7 Days: 10:00 AM &ndash; 10:00 PM
        </p>
      </motion.div>
    </section>
  );
}

// ---------------------------------------------------------------- root

export type ProductShelfProps = {
  products?: Product[];
  currency?: string;
  className?: string;
  children?: ReactNode;
  title?: string;
  subtitle?: string;
  onAddToCart?: (product: Product, size: string, quantity: number) => void;
};

export function ShopExperience({
  products = DEFAULT_PRODUCTS,
  currency = "₹",
  className,
  children,
  onAddToCart
}: ProductShelfProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [bag, setBag] = useState(0);
  const [active, setActive] = useState(-1);
  const [soundOn, setSoundOn] = useState(false);
  const soundRef = useRef(new ShelfSoundSystem());
  const bagRef = useRef<HTMLButtonElement | null>(null);
  const cart = useCart();
  const count = cart ? cart.totalItems : bag;

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const rows = [0, 1, 2, 3].map((r) => products.slice(r * 4, r * 4 + 4));
  const open = products.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openId]);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundRef.current.setEnabled(next);
    if (next) soundRef.current.playWoodClick();
  };

  const handleAdd = (product: Product, size: string, qty: number) => {
    setBag((b) => b + qty);
    if (onAddToCart) return onAddToCart(product, size, qty);
    if (!cart) return;
    const price = getProductVolumePrice(product.id, size, product.price);
    const originalPrice = getProductVolumeCompareAt(product.id, size, product.compareAt) || Math.round(price * 1.25);
    const vol = {
      size,
      price,
      originalPrice,
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
      price,
      originalPrice,
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
    cart.addToCart(cartProduct as any, vol as any, qty);
  };

  const jump = (i: number) => {
    document.getElementById(`aisle-${i + 1}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={cn("relative w-full overflow-x-clip bg-[#150b04] font-sans text-amber-50 antialiased", className)}>
      {/* Scroll progress bar */}
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-amber-300 to-[#e5a812]" />

      {/* Side aisle rail on desktop */}
      <div className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 md:flex">
        <button
          type="button"
          aria-label="Go to entrance"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            soundRef.current.playWoodClick();
          }}
          className={cn(
            "group relative size-2.5 rounded-full border border-amber-200/70 transition-all",
            active === -1 ? "scale-150 bg-amber-300" : "bg-transparent hover:bg-amber-200/40"
          )}
        >
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rounded-md bg-stone-900/90 px-2 py-0.5 text-[10px] font-bold text-amber-200 opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow">
            Storefront
          </span>
        </button>

        {AISLES.map((a, i) => (
          <button
            key={a.no}
            type="button"
            aria-label={`Go to aisle ${a.no}`}
            onClick={() => {
              jump(i);
              soundRef.current.playWoodClick();
            }}
            className={cn(
              "group relative size-2.5 rounded-full border border-amber-200/70 transition-all",
              active === i ? "scale-150 bg-amber-300" : "bg-transparent hover:bg-amber-200/40"
            )}
          >
            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rounded-md bg-stone-900/90 px-2 py-0.5 text-[10px] font-bold text-amber-200 opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow">
              {a.no} &bull; {a.title.split("&")[0].trim()}
            </span>
          </button>
        ))}

        <button
          type="button"
          aria-label="Go to cash counter"
          onClick={() => {
            document.getElementById("counter")?.scrollIntoView({ behavior: "smooth" });
            soundRef.current.playWoodClick();
          }}
          className={cn(
            "group relative size-2.5 rounded-full border border-amber-200/70 transition-all",
            active === 4 ? "scale-150 bg-amber-300" : "bg-transparent hover:bg-amber-200/40"
          )}
        >
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rounded-md bg-stone-900/90 px-2 py-0.5 text-[10px] font-bold text-amber-200 opacity-0 group-hover:opacity-100 transition whitespace-nowrap shadow">
            Cash Counter
          </span>
        </button>
      </div>

      {/* Floating Luxury Aisle Navigator Dock (replaces unwanted top header) */}
      <nav
        aria-label="Aisle Navigation"
        className="fixed bottom-5 inset-x-0 z-40 mx-auto w-fit max-w-[96vw] flex items-center gap-1 sm:gap-2 rounded-full border border-amber-400/30 bg-[#160b05]/92 p-1.5 px-2.5 sm:px-3 text-amber-100 shadow-[0_15px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl"
      >
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            soundRef.current.playShutter();
          }}
          className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold text-amber-200 hover:bg-white/10 transition"
          title="Storefront Entrance"
        >
          <Store className="size-3.5" />
          <span className="hidden sm:inline">Entrance</span>
        </button>

        <div className="flex items-center gap-1">
          {AISLES.map((a, i) => (
            <button
              key={a.no}
              type="button"
              onClick={() => {
                jump(i);
                soundRef.current.playWoodClick();
              }}
              className={cn(
                "rounded-full px-2.5 py-1 text-[11px] font-bold transition",
                active === i ? "bg-amber-300 text-[#3b1501] shadow" : "text-amber-100/90 hover:bg-white/10"
              )}
            >
              <span className="font-black">{a.no}</span>
              <span className="ml-1 hidden md:inline">{a.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            document.getElementById("counter")?.scrollIntoView({ behavior: "smooth" });
            soundRef.current.playWoodClick();
          }}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-bold transition",
            active === 4 ? "bg-amber-300 text-[#3b1501]" : "text-amber-100 hover:bg-white/10"
          )}
        >
          <span className="sm:hidden">Cash</span>
          <span className="hidden sm:inline">🧾 Cash Counter</span>
        </button>

        <div className="h-4 w-px bg-amber-400/25" />

        <button
          ref={bagRef}
          type="button"
          onClick={() => {
            if (cart) cart.setIsCartOpen(true);
            else document.getElementById("counter")?.scrollIntoView({ behavior: "smooth" });
            soundRef.current.playChime();
          }}
          className="relative flex items-center gap-1.5 rounded-full bg-amber-400/20 hover:bg-amber-400/30 px-3 py-1 text-[11px] font-black text-amber-200 transition border border-amber-300/30"
          title="Open Shopping Bag"
        >
          <ShoppingBag className="size-3.5" />
          <span className="hidden sm:inline">Bag</span>
          {count > 0 && (
            <span className="grid size-4 place-items-center rounded-full bg-amber-300 text-[10px] font-black text-[#3b1501]">
              {count}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={toggleSound}
          className="grid size-7 place-items-center rounded-full text-amber-200 hover:bg-white/10 transition"
          title={soundOn ? "Mute audio effects" : "Enable tactile sound effects"}
        >
          {soundOn ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5 opacity-60" />}
        </button>
      </nav>

      <LayoutGroup>
        <Storefront
          preview={products.slice(0, 5)}
          onEnter={() => {
            jump(0);
            soundRef.current.playShutter();
          }}
        />

        {rows.map((items, i) => (
          <Aisle
            key={i}
            index={i}
            items={items}
            currency={currency}
            openId={openId}
            onOpen={setOpenId}
            onActive={setActive}
            onQuickAdd={handleAdd}
            onSound={(type) => {
              if (type === "wood") soundRef.current.playWoodClick();
              if (type === "chime") soundRef.current.playChime();
              if (type === "shutter") soundRef.current.playShutter();
            }}
          />
        ))}

        <Counter
          onSound={(type) => {
            if (type === "wood") soundRef.current.playWoodClick();
            if (type === "chime") soundRef.current.playChime();
          }}
          onBrowseAisles={() => jump(0)}
        />

        <AnimatePresence>
          {open && (
            <ProductPage
              key={open.id}
              p={open}
              currency={currency}
              onClose={() => setOpenId(null)}
              onAdd={handleAdd}
              bagRef={bagRef}
              soundSystem={soundRef.current}
              onOpenBag={() => cart?.setIsCartOpen(true)}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>

      {children}
    </div>
  );
}

// Drop-in alias so existing <ProductShelf /> usages get the new experience.
export const ProductShelf = ShopExperience;
export default ShopExperience;
