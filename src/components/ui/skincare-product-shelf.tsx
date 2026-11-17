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
  origin?: string;
  sourceType?: string;
  stickerColor?: string;
  bottleImage?: string;
  showcaseImage?: string;
};

/**
 * Default RKW Product Catalog
 * Configured with authentic bottle stickers, volume sizes (200ml, 500ml, 1L, 2L, 5L)
 * from OIL STICKER 500 ML.pdf and FINAL OIL STICKER ROUND BOTTLE.pdf.
 */
export const DEFAULT_PRODUCTS: Product[] = [
  // --- ROW 1: Signature Mustard Oils & Vedic Bilona Ghee ---
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

  // --- ROW 2: Nut & Coconut Cold-Pressed Range ---
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
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
    id: "extra-virgin-coconut-oil",
    kind: "round-bottle",
    name: "Cold-Pressed Extra Virgin Coconut Oil",
    short: "Extra Virgin Coconut",
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
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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

  // --- ROW 3: Wellness Rogan, Walnut & Artisanal Oils ---
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
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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

  // --- ROW 4: Specialty & Daily Kitchen Cold-Pressed Oils ---
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
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
    sizes: ["200 ml (PET bottle)", "500 ml (PET bottle)", "1 L (PET bottle)", "2 L (PET bottle)", "5 L (PET bottle)", "15 kg (Tin)"],
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
  // Top of neck cylinder (thick diameter: width 28, x = 86 to 114)
  "M 86 38 " +
  "L 86 40 " +
  // Left collar flange (transfer ring)
  "L 83 40 Q 82 42 83 44 L 86 44 " +
  // Short thick neck cylinder (small height: only y=44 to 56)
  "L 86 56 " +
  // Left shoulder sloping smoothly down to body
  "C 86 68 76 80 66 90 " +
  // Left side with 9 grip ribs (notches)
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
  // Left base pedestal flare and corner
  "Q 64 262 64 270 L 64 280 Q 64 286 70 286 " +
  // Bottom kick-up arch
  "L 74 286 Q 100 277 126 286 L 130 286 " +
  // Right base corner and pedestal flare
  "Q 136 286 136 280 L 136 270 Q 136 262 134 256 " +
  // Right side with 9 grip ribs (going upwards)
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
  // Right shoulder sloping in to neck
  "C 124 80 114 68 114 56 " +
  // Short thick neck cylinder
  "L 114 44 " +
  // Right collar flange
  "L 117 44 Q 118 42 117 40 L 114 40 " +
  // Top right of neck
  "L 114 38 " +
  "Z";

const renderPetOilCap = (id: string) => {
  const capX = 84;
  const capW = 32;
  const capTop = 15;
  return (
    <g id={`${id}-pet-cap-group`}>
      {/* Soft contact shadow from cap onto neck collar */}
      <ellipse cx="100" cy="39" rx="16" ry="1.5" fill="#000" opacity="0.32" />

      {/* Main Cap Body with rounded top */}
      <path
        d={`M${capX + 3} ${capTop} h${capW - 6} a3 3 0 0 1 3 3 v15 h-${capW} v-15 a3 3 0 0 1 3 -3 z`}
        fill={`url(#${id}-yellow-cap)`}
      />
      {/* Top rim highlight */}
      <ellipse cx="100" cy={capTop + 1.2} rx="14" ry="1.6" fill="#FFF8C4" opacity="0.9" />
      <path d={`M${capX + 2} ${capTop + 1} h${capW - 4}`} stroke="#FFE875" strokeWidth="1" strokeOpacity="0.95" />

      {/* Fluted Vertical Ridges (Knurling) */}
      {Array.from({ length: 22 }, (_, i) => {
        const rx = capX + 2.5 + i * 1.25;
        return (
          <g key={i}>
            <line x1={rx} y1={capTop + 3} x2={rx} y2={capTop + 18} stroke="#9E5400" strokeWidth="0.5" strokeOpacity="0.45" />
            <line x1={rx + 0.5} y1={capTop + 3} x2={rx + 0.5} y2={capTop + 18} stroke="#FFFAC8" strokeWidth="0.55" strokeOpacity="0.8" />
          </g>
        );
      })}

      {/* Separation Groove / Tear Line */}
      <rect x={capX + 0.5} y={capTop + 18} width={capW - 1} height="1.2" fill="#7A3E00" opacity="0.75" />

      {/* Tamper Evident Safety Ring */}
      <path
        d={`M${capX} ${capTop + 19.2} h${capW} v5.6 a1.2 1.2 0 0 1 -1.2 1.2 h-${capW - 2.4} a1.2 1.2 0 0 1 -1.2 -1.2 z`}
        fill={`url(#${id}-yellow-cap)`}
      />
      {/* Tamper Ring Highlight and Breakout Slits */}
      <line x1={capX + 1} y1={capTop + 25.4} x2={capX + capW - 1} y2={capTop + 25.4} stroke="#FFE875" strokeWidth="0.8" strokeOpacity="0.75" />
      {[88, 93, 98, 103, 108, 112].map((sx) => (
        <line key={sx} x1={sx} y1={capTop + 18} x2={sx} y2={capTop + 20.6} stroke="#542B00" strokeWidth="0.8" strokeOpacity="0.85" />
      ))}
    </g>
  );
};

const SHAPES: Record<Kind, Shape> = {
  // 1. Signature Square PET Cold-Pressed Oil Bottle (Square with Side Grip Ribs & Yellow Cap)
  "round-bottle": {
    body: PET_OIL_BODY_PATH,
    box: { x: 64, y: 38, w: 72, h: 248 },
    print: { x: 75.5, y: 93, w: 49, h: 159, paper: true },
    fill: 48,
    cap: (id) => renderPetOilCap(id),
  },

  // 2. Standard PET Cold Pressed Oil Bottle
  bottle: {
    body: PET_OIL_BODY_PATH,
    box: { x: 64, y: 38, w: 72, h: 248 },
    print: { x: 75.5, y: 93, w: 49, h: 159, paper: true },
    fill: 48,
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
  bottle: { top: 14, w: 76 },
  "round-bottle": { top: 14, w: 76 },
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

const getStickerTitle = (short: string) => {
  const clean = short.replace(/\s*\([^)]*\)/g, "").trim();
  const words = clean.split(/\s+/);
  if (words.length <= 1) return { line1: words[0].toUpperCase(), line2: "" };
  if (words.length === 2) return { line1: words[0].toUpperCase(), line2: words[1].toUpperCase() };
  if (words.length === 3) return { line1: `${words[0]} ${words[1]}`.toUpperCase(), line2: words[2].toUpperCase() };
  return { line1: `${words[0]} ${words[1]}`.toUpperCase(), line2: words.slice(2).join(" ").toUpperCase() };
};

const getDisplayQty = (raw?: string) => {
  if (!raw) return "500ml";
  const match = raw.match(/(\d+)\s*(ml|l|kg)/i);
  if (match) return `${match[1]}${match[2].toLowerCase()}`;
  return raw.split(" ")[0];
};

function ProductArt({
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
  const period = isPet ? 136 : P.w * 2.6; // Wrap period for 360-degree rotation
  const fallback = useMotionValue(0);
  const x = useTransform(spin ?? fallback, (v) => -((((v * period) % period) + period) % period));
  const nameSize = Math.min(9.5, P.w * 0.11, (P.w * 1.1) / p.short.length);
  const subSize = Math.min(6.2, P.w * 0.075, (P.w * 1.2) / (p.sub ?? "").length);

  // Dynamic front sticker matching authentic RKW label (media_1794909193509_b2918e2a.jpg)
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
        {/* 1. White Sticker Base with Rich Maroon Border */}
        <rect
          x={sx}
          y={sy}
          width={sw}
          height={sh}
          rx={3.5}
          fill="#FFFFFF"
          stroke={maroon}
          strokeWidth={1.2}
        />
        {/* Inner thin maroon decorative pinstripe */}
        <rect
          x={sx + 1.2}
          y={sy + 1.2}
          width={sw - 2.4}
          height={sh - 2.4}
          rx={2.5}
          fill="none"
          stroke={maroon}
          strokeWidth={0.35}
          strokeOpacity={0.5}
        />

        {/* 2. Top Circular RKW Logo Emblem */}
        <g transform={`translate(${cx} ${sy + 9.5})`}>
          <circle cx="0" cy="0" r="5.8" fill="#FFF" stroke={navy} strokeWidth="0.8" />
          <circle cx="0" cy="0" r="5" fill="none" stroke={gold} strokeWidth="0.4" />
          {/* Swirling stylized R design */}
          <path
            d="M -3.2 -2.8 C -1 -4.2 2.8 -4.2 3.8 -2 C 4.5 -0.5 4 1.5 2.5 2.6 C 1 3.5 -0.8 4 -2.8 3.5 C -0.8 3 1.2 2.2 2 -0.2 C 2.5 -1.8 1.2 -3 -1.2 -2.5 Z"
            fill="#D62828"
          />
          <path
            d="M -3.2 -1.2 C -1.5 -2.4 1.8 -2.2 2.4 -0.6 C 3 1 1.8 2.4 0.2 3 C -1.5 3.6 -2.8 2.8 -3.2 1.5 C -2.4 2 -1 2.2 0.2 1.6 C 1.2 1.1 1.6 0.2 1 -0.8 C 0.4 -1.6 -1.8 -1.5 -3.2 -1.2 Z"
            fill={navy}
          />
          <circle cx="0" cy="0.2" r="1.1" fill={gold} />
          {/* Registered symbol ® */}
          <text x="6.8" y="-3.2" fill={navy} fontSize="2.2" fontWeight="bold">®</text>
        </g>

        {/* 3. Brand Name "RKW" + Veg Dot */}
        <text
          x={cx}
          y={sy + 20}
          fill={navy}
          fontSize="6.8"
          fontWeight="900"
          letterSpacing="0.06em"
          textAnchor="middle"
        >
          RKW
        </text>
        {/* Veg Stamp */}
        <g transform={`translate(${cx + 15} ${sy + 16})`}>
          <rect x="0" y="0" width="3.8" height="3.8" rx="0.5" fill="#FFF" stroke="#138808" strokeWidth="0.5" />
          <circle cx="1.9" cy="1.9" r="1.1" fill="#138808" />
        </g>

        {/* 4. Hindi Brand Name: रमेश कोल्हू वाले */}
        <text
          x={cx}
          y={sy + 25.5}
          fill={navy}
          fontSize="4.2"
          fontWeight="800"
          textAnchor="middle"
        >
          रमेश कोल्हू वाले
        </text>

        {/* Golden Drop Accent Underline */}
        <line x1={cx - 16} y1={sy + 27.2} x2={cx - 2} y2={sy + 27.2} stroke="#E5A812" strokeWidth="0.6" strokeLinecap="round" />
        <line x1={cx + 2} y1={sy + 27.2} x2={cx + 16} y2={sy + 27.2} stroke="#E5A812" strokeWidth="0.6" strokeLinecap="round" />
        <path
          d={`M ${cx} ${sy + 26.4} Q ${cx - 1.2} ${sy + 28} ${cx} ${sy + 28.8} Q ${cx + 1.2} ${sy + 28} ${cx} ${sy + 26.4} Z`}
          fill="#E5A812"
        />

        {/* Cursive Tagline: पीढ़ियों का विश्वास */}
        <text
          x={cx}
          y={sy + 32.5}
          fill={maroon}
          fontSize="3.4"
          fontWeight="700"
          fontStyle="italic"
          textAnchor="middle"
        >
          पीढ़ियों का विश्वास
        </text>

        {/* 5. Maroon Pill: COLD PRESSED */}
        <g transform={`translate(${cx} ${sy + 37.5})`}>
          <rect x="-17" y="-3" width="34" height="6" rx="3" fill={maroon} />
          <text x="0" y="1.2" fill="#FFF" fontSize="3.1" fontWeight="900" letterSpacing="0.08em" textAnchor="middle">
            COLD PRESSED
          </text>
        </g>

        {/* 6. Product Title in Bold Maroon (Line 1 & Line 2) */}
        <text
          x={cx}
          y={sy + 46.5}
          fill={maroon}
          fontSize={title2 ? "5.4" : "6"}
          fontWeight="900"
          letterSpacing="0.02em"
          textAnchor="middle"
        >
          {title1}
        </text>
        {title2 && (
          <text
            x={cx}
            y={sy + 52.5}
            fill={maroon}
            fontSize="5.2"
            fontWeight="900"
            letterSpacing="0.02em"
            textAnchor="middle"
          >
            {title2}
          </text>
        )}

        {/* Subtitle / Hindi Name in Italic Serif */}
        {cleanHindiSub && (
          <text
            x={cx}
            y={sy + (title2 ? 57.5 : 53.5)}
            fill={maroon}
            fontSize="3.6"
            fontWeight="600"
            fontStyle="italic"
            textAnchor="middle"
          >
            {cleanHindiSub}
          </text>
        )}

        {/* 7. Maroon Pill: SINGLE PRESSED */}
        <g transform={`translate(${cx} ${sy + (title2 ? 63 : 59)})`}>
          <rect x="-15" y="-2.6" width="30" height="5.2" rx="2.6" fill={maroon} />
          <text x="0" y="1.1" fill="#FFF" fontSize="2.7" fontWeight="800" letterSpacing="0.06em" textAnchor="middle">
            SINGLE PRESSED
          </text>
        </g>

        {/* 8. Sourcing Callout: Dynamic Origin */}
        <text
          x={cx}
          y={sy + (title2 ? 70 : 66)}
          fill="#555"
          fontSize="2.4"
          fontWeight="600"
          textAnchor="middle"
        >
          {sourceType}
        </text>
        <text
          x={cx}
          y={sy + (title2 ? 74.2 : 70.2)}
          fill={themeColor}
          fontSize={origin.length > 14 ? "2.4" : "3.1"}
          fontWeight="900"
          letterSpacing="0.05em"
          textAnchor="middle"
        >
          {origin}
        </text>
        <line
          x1={cx - 10}
          y1={sy + (title2 ? 75.5 : 71.5)}
          x2={cx + 10}
          y2={sy + (title2 ? 75.5 : 71.5)}
          stroke={maroon}
          strokeWidth="0.5"
        />

        {/* 9. Farm, Flowers & Cruet Illustration Section */}
        <g transform={`translate(${cx} ${sy + 77})`}>
          {/* Background farm glow */}
          <rect x="-22" y="0" width="44" height="38" rx="2" fill={`url(#${id}-farm-field-glow)`} />

          {/* Yellow mustard field flowers & greenery */}
          <ellipse cx="-12" cy="30" rx="9" ry="6" fill="#15803D" opacity="0.8" />
          <ellipse cx="-11" cy="27" rx="8" ry="5" fill="#EAB308" opacity="0.9" />
          <circle cx="-15" cy="25" r="2.2" fill="#FACC15" />
          <circle cx="-12" cy="23" r="2" fill="#FDE047" />
          <circle cx="-8" cy="24" r="1.8" fill="#FACC15" />
          <circle cx="-13" cy="28" r="2" fill="#EAB308" />

          {/* Traditional Glass Cruet Bottle */}
          <g transform="translate(-10 6)">
            {/* Wooden cork stopper */}
            <rect x="-2" y="0" width="4" height="3" rx="0.5" fill="#A0522D" />
            {/* Glass neck */}
            <path d="M -1.8 3 L -1.8 7 L -4 14 Q -7 20 -7 24 Q -7 28 0 28 Q 7 28 7 24 Q 7 20 4 14 L 1.8 7 L 1.8 3 Z" fill="rgba(255,255,255,0.7)" stroke="#A0522D" strokeWidth="0.5" />
            {/* Golden oil inside cruet */}
            <path d="M -3.6 14 Q -6.5 19 -6.5 23.5 Q -6.5 27.5 0 27.5 Q 6.5 27.5 6.5 23.5 Q 6.5 19 3.6 14 Z" fill="#D97706" opacity="0.92" />
            {/* Glass specular highlight */}
            <path d="M -4.5 16 Q -5.5 20 -4.5 24" stroke="#FFF" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.85" />
          </g>

          {/* Wooden Bowl of Pure Mustard Seeds */}
          <g transform="translate(6 22)">
            {/* Wooden bowl */}
            <path d="M -8 2 Q 0 10 8 2 Q 8 -1 -8 -1 Z" fill="#78350F" stroke="#451A03" strokeWidth="0.5" />
            {/* Mound of black seeds */}
            <ellipse cx="0" cy="1" rx="7.5" ry="3" fill="#1C1917" />
            <ellipse cx="0" cy="0" rx="6.5" ry="2.2" fill="#292524" />
            {/* Tiny seed textures */}
            <circle cx="-3" cy="0.5" r="0.6" fill="#444" />
            <circle cx="0" cy="0" r="0.6" fill="#555" />
            <circle cx="3" cy="0.8" r="0.6" fill="#444" />
          </g>

          {/* Quality Badges on Right */}
          <g transform="translate(10 6)">
            <text x="0" y="0" fill="#262626" fontSize="2.2" fontWeight="800" fontStyle="italic" textAnchor="middle">
              Premium Quality
            </text>
            <text x="0" y="4" fill="#262626" fontSize="2.2" fontWeight="800" fontStyle="italic" textAnchor="middle">
              No Preservatives
            </text>
            <text x="0" y="8" fill="#262626" fontSize="2.2" fontWeight="800" fontStyle="italic" textAnchor="middle">
              No Added Colour
            </text>
          </g>
        </g>

        {/* 10. Maroon Bottom Banner with White Ornate Filigree Scrolls */}
        <g>
          {/* Maroon shaped bottom background */}
          <path
            d={`M ${sx + 1.2} ${sy + 118} Q ${cx} ${sy + 115} ${sx + sw - 1.2} ${sy + 118} L ${sx + sw - 1.2} ${sy + sh - 2.5} Q ${cx} ${sy + sh - 1} ${sx + 1.2} ${sy + sh - 2.5} Z`}
            fill={maroon}
          />

          {/* Ornate White Floral Filigree Scrolls on Left & Right */}
          {/* Left Scroll */}
          <g transform={`translate(${sx + 7} ${sy + 135})`} stroke="#FFF" fill="none" strokeWidth="0.5" strokeLinecap="round">
            <path d="M 0 0 C -4 -4 -6 2 -2 5 C 1 7 -2 10 -5 9" />
            <circle cx="-3.5" cy="4" r="0.8" fill="#FFF" stroke="none" />
            <path d="M -1 2 C -3 0 -5 1 -4 3" />
            <circle cx="-1" cy="7" r="0.6" fill="#FFF" stroke="none" />
          </g>
          {/* Right Scroll (Mirrored) */}
          <g transform={`translate(${sx + sw - 7} ${sy + 135}) scale(-1 1)`} stroke="#FFF" fill="none" strokeWidth="0.5" strokeLinecap="round">
            <path d="M 0 0 C -4 -4 -6 2 -2 5 C 1 7 -2 10 -5 9" />
            <circle cx="-3.5" cy="4" r="0.8" fill="#FFF" stroke="none" />
            <path d="M -1 2 C -3 0 -5 1 -4 3" />
            <circle cx="-1" cy="7" r="0.6" fill="#FFF" stroke="none" />
          </g>

          {/* Net Qty Header */}
          <text
            x={cx}
            y={sy + 124}
            fill="#FFFFFF"
            fontSize="3.2"
            fontWeight="600"
            letterSpacing="0.04em"
            textAnchor="middle"
          >
            Net Qty.
          </text>

          {/* Big Bold Volume Display: e.g. 500ml */}
          <text
            x={cx}
            y={sy + 136}
            fill="#FFFFFF"
            fontSize="9.2"
            fontWeight="900"
            letterSpacing="-0.02em"
            textAnchor="middle"
          >
            {displayQty}
          </text>

          {/* Recycling Emblem Icon at bottom */}
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

  // Dynamic back sticker matching authentic RKW label (media_1794909193509_b2918e2a.jpg)
  const renderBackSticker = (dx: number) => {
    const cx = 100 + dx;
    const sx = 75.5 + dx;
    const sy = 93;
    const sw = 49;
    const sh = 159;
    const themeColor = p.stickerColor || p.label || "#7A1426";
    const maroon = themeColor;
    const navy = "#0B2545";

    return (
      <g key={`back-${dx}`}>
        {/* 1. White Base Card with Maroon Border */}
        <rect
          x={sx}
          y={sy}
          width={sw}
          height={sh}
          rx={3.5}
          fill="#FFFFFF"
          stroke={maroon}
          strokeWidth={1.2}
        />
        <rect
          x={sx + 1.2}
          y={sy + 1.2}
          width={sw - 2.4}
          height={sh - 2.4}
          rx={2.5}
          fill="none"
          stroke={maroon}
          strokeWidth="0.35"
          strokeOpacity={0.5}
        />

        {/* 2. Top Header: RKW Logo + Ramesh Kolhu Wale */}
        <g transform={`translate(${cx - 10} ${sy + 7.5})`}>
          <circle cx="0" cy="0" r="4.2" fill="#FFF" stroke={navy} strokeWidth="0.6" />
          <circle cx="0" cy="0" r="3.2" fill="#FFF" stroke="#D97706" strokeWidth="0.4" />
          <text x="0" y="1" fill={navy} fontSize="3" fontWeight="bold" textAnchor="middle">R</text>
          <text x="5.2" y="-2" fill={navy} fontSize="1.8" fontWeight="bold">®</text>
        </g>
        <text
          x={cx + 6}
          y={sy + 6.2}
          fill={navy}
          fontSize="4.2"
          fontWeight="900"
          letterSpacing="0.05em"
          textAnchor="middle"
        >
          RKW
        </text>
        <g transform={`translate(${cx + 17} ${sy + 3.8})`}>
          <rect x="0" y="0" width="3.2" height="3.2" rx="0.4" fill="#FFF" stroke="#138808" strokeWidth="0.4" />
          <circle cx="1.6" cy="1.6" r="0.9" fill="#138808" />
        </g>

        <text
          x={cx}
          y={sy + 11.8}
          fill={navy}
          fontSize="3.8"
          fontWeight="800"
          textAnchor="middle"
        >
          Ramesh Kolhu Wale
        </text>

        {/* Golden drop */}
        <path
          d={`M ${cx} ${sy + 13} Q ${cx - 0.9} ${sy + 14.5} ${cx} ${sy + 15.2} Q ${cx + 0.9} ${sy + 14.5} ${cx} ${sy + 13} Z`}
          fill="#E5A812"
        />

        {/* 3. Nutrition Facts Box with Yellow Header */}
        <g transform={`translate(${cx} ${sy + 17.5})`}>
          {/* Yellow header banner */}
          <rect x="-22" y="0" width="44" height="4.5" fill="#FDE047" stroke="#333" strokeWidth="0.4" />
          <text x="0" y="3.2" fill="#1C1917" fontSize="2.2" fontWeight="900" textAnchor="middle">
            Nutrition Facts (Per 100g)
          </text>

          {/* Nutrition Table Grid */}
          <rect x="-22" y="4.5" width="44" height="28" fill="#FFF" stroke="#333" strokeWidth="0.4" />
          <line x1="8" y1="4.5" x2="8" y2="32.5" stroke="#333" strokeWidth="0.3" />

          {[
            ["ENERGY", "900 KCAL"],
            ["PROTIEN", "0 g"],
            ["CARBOHYDRATE", "0 g"],
            ["TOTAL FAT", "100 g"],
            ["SATURATED FAT", "12 g"],
            ["TRANS FAT", "0 g"],
            ["MONO UNSATURATED", "58 g"],
            ["POLY UNSATURATED", "16 g"],
            ["CHOLESTEROL", "0 g"]
          ].map(([label, val], idx) => {
            const rowY = 7.5 + idx * 3;
            return (
              <g key={idx}>
                {idx > 0 && <line x1="-22" y1={4.5 + idx * 3} x2="22" y2={4.5 + idx * 3} stroke="#E5E7EB" strokeWidth="0.3" />}
                <text x="-20" y={rowY} fill="#1F2937" fontSize="1.8" fontWeight="700">
                  {label}
                </text>
                <text x="20" y={rowY} fill="#1F2937" fontSize="1.8" fontWeight="800" textAnchor="end">
                  {val}
                </text>
              </g>
            );
          })}
        </g>

        {/* 4. Ingredients & Declarations */}
        <g transform={`translate(${cx} ${sy + 53})`}>
          <text x="0" y="0" fill="#111" fontSize="2.1" fontWeight="800" textAnchor="middle">
            Ingredients: 100% Pure Cold-Pressed Oil
          </text>
          <text x="0" y="3.2" fill="#444" fontSize="1.8" fontWeight="600" textAnchor="middle">
            Free From Argemone Oil Representative
          </text>
          <text x="0" y="6.8" fill="#111" fontSize="2.2" fontWeight="800" textAnchor="middle">
            NET QUANTITY : 500 ML (450 g)
          </text>
        </g>

        {/* 5. Free Delivery Scooter & Contact Callout */}
        <g transform={`translate(${cx} ${sy + 68})`}>
          {/* Red delivery scooter */}
          <g transform="translate(-16 -2) scale(0.65)">
            <circle cx="3" cy="11" r="2.5" fill="#333" />
            <circle cx="15" cy="11" r="2.5" fill="#333" />
            <path d="M 3 11 L 8 11 L 10 5 L 14 5 L 15 11" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" />
            <rect x="5" y="3" width="5" height="5" rx="0.5" fill="#DC2626" />
          </g>
          <text x="-3" y="1" fill="#DC2626" fontSize="2.5" fontWeight="900">
            FREE DELIVERY
          </text>
          <text x="-3" y="4.2" fill="#444" fontSize="1.8" fontWeight="700">
            Delhi NCR &bull; Min. ₹799
          </text>

          {/* WhatsApp & Phones */}
          <g transform="translate(0 9)">
            <circle cx="-14" cy="0" r="2.6" fill="#22C55E" />
            <path d="M -15 -1 Q -14 -2 -13 -1 L -12.5 0 Q -13 1 -14 1 Q -15 0 -15 -1 Z" fill="#FFF" />
            <text x="-8" y="0.8" fill="#111" fontSize="2.1" fontWeight="800">
              +91 9217744378 / 79
            </text>
          </g>
        </g>

        {/* 6. Factory Address & FSSAI */}
        <g transform={`translate(${cx} ${sy + 89})`}>
          <text x="0" y="0" fill="#666" fontSize="1.7" fontWeight="600" textAnchor="middle">
            Mfg. &amp; Pkd. By:
          </text>
          <text x="0" y="3.2" fill="#111" fontSize="2.3" fontWeight="900" textAnchor="middle">
            VINAYAK UDYOG GLOBAL PVT. LTD.
          </text>
          <text x="0" y="6.4" fill="#444" fontSize="1.8" fontWeight="600" textAnchor="middle">
            Plot No. 100, Pocket A, Sector 1, DSIIDC, Bawana, Delhi-39
          </text>

          {/* FSSAI Logo & Lic No */}
          <g transform="translate(0 12)">
            <text x="-12" y="1.8" fill="#1E3A8A" fontSize="3.6" fontWeight="900" fontStyle="italic">
              fssai
            </text>
            <text x="2" y="1.8" fill="#111" fontSize="2" fontWeight="800">
              Lic. No. 10018011004919
            </text>
          </g>
          <text x="0" y="18" fill="#2563EB" fontSize="2" fontWeight="700" textAnchor="middle">
            www.rameshkolhuwale.com
          </text>
        </g>

        {/* 7. Barcode & QR Code */}
        <g transform={`translate(${cx} ${sy + 120})`}>
          {/* QR Code Simulation */}
          <rect x="-18" y="0" width="12" height="12" fill="#FFF" stroke="#222" strokeWidth="0.5" />
          <rect x="-16.5" y="1.5" width="3.5" height="3.5" fill="#222" />
          <rect x="-10" y="1.5" width="2" height="2" fill="#222" />
          <rect x="-16.5" y="7" width="2" height="2" fill="#222" />
          <rect x="-11.5" y="5.5" width="3.5" height="3.5" fill="#222" />

          {/* Barcode Simulation */}
          <g transform="translate(-1 0)">
            {[0, 2, 3, 5, 7, 8, 10, 11, 13, 14, 16, 17, 19].map((bx, i) => (
              <line
                key={i}
                x1={bx}
                y1="0"
                x2={bx}
                y2="10"
                stroke="#111"
                strokeWidth={i % 3 === 0 ? "0.9" : "0.5"}
              />
            ))}
            <text x="9.5" y="13.5" fill="#111" fontSize="1.8" fontWeight="bold" letterSpacing="0.08em" textAnchor="middle">
              8 906225 820923
            </text>
          </g>
        </g>

        {/* 8. Bottom Swachh Bharat & Recycling Marks */}
        <g transform={`translate(${cx} ${sy + 144})`}>
          {/* Chashma logo */}
          <circle cx="-8" cy="0" r="2.2" fill="none" stroke="#222" strokeWidth="0.4" />
          <circle cx="-2" cy="0" r="2.2" fill="none" stroke="#222" strokeWidth="0.4" />
          <line x1="-5.8" y1="0" x2="-4.2" y2="0" stroke="#222" strokeWidth="0.4" />
          {/* Recycle triangle */}
          <polygon points="6,-3 9,2 3,2" fill="none" stroke="#22C55E" strokeWidth="0.5" />
        </g>
      </g>
    );
  };

  // Fallback label art for non-PET items (such as Jar and Tin)
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
            {isJar ? "BILONA GHEE • 100% PURE" : "COLD-PRESSED • <38°C"}
          </text>
        </g>

        {/* Bottom row: FSSAI Green Veg Dot & Net Qty */}
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
          <stop offset="0" stopColor={css(mixRgb(liq, BLACK, 0.42))} />
          <stop offset="0.08" stopColor={css(mixRgb(liq, BLACK, 0.12))} />
          <stop offset="0.2" stopColor={css(mixRgb(liq, WHITE, 0.28))} />
          <stop offset="0.36" stopColor={css(liq, 1.08)} />
          <stop offset="0.52" stopColor={css(mixRgb(liq, WHITE, 0.38))} />
          <stop offset="0.75" stopColor={css(mixRgb(liq, BLACK, 0.05))} />
          <stop offset="0.9" stopColor={css(mixRgb(liq, BLACK, 0.2))} />
          <stop offset="1" stopColor={css(mixRgb(liq, BLACK, 0.42))} />
        </linearGradient>

        {/* Farm Field Glow Gradient for Sticker Illustration */}
        <linearGradient id={`${id}-farm-field-glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FEF3C7" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#FDE68A" stopOpacity="0.95" />
          <stop offset="1" stopColor="#EAB308" stopOpacity="0.8" />
        </linearGradient>

        {/* Front Panel Clip to cleanly wrap rotating 3D stickers */}
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

      {/* Body background */}
      <path d={s.body} fill={isPet ? `url(#${id}-pet-plastic)` : `url(#${id}-body)`} />

      {/* Liquid & Glass Layer */}
      <g clipPath={`url(#${id}-clip)`}>
        {isPet ? (
          <>
            {/* 1. Golden Oil Liquid Fill up to neck meniscus at y=48 */}
            <rect x="60" y="48" width="80" height="240" fill={`url(#${id}-pet-oil-grad)`} opacity="0.96" />

            {/* 2. Clear PET Neck Headspace above oil (y=38 to 48) */}
            <rect x="86" y="38" width="28" height="10" fill="rgba(255,255,255,0.06)" />
            <line x1="88" y1="40" x2="88" y2="48" stroke="#fff" strokeWidth="0.9" strokeOpacity="0.7" />
            <line x1="112" y1="40" x2="112" y2="48" stroke="#fff" strokeWidth="0.6" strokeOpacity="0.35" />

            {/* 2b. Protruding Neck Collar / Transfer Ring (y=40 to 44) */}
            <ellipse cx="100" cy="42" rx="16.5" ry="2" fill="none" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.85" />
            <ellipse cx="100" cy="42.5" rx="16" ry="1.6" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="0.6" />

            {/* 3. Liquid Meniscus at y=48 with specular glint */}
            <path d="M 86 48 Q 100 50.5 114 48" stroke="#FFF9D2" strokeWidth="1.3" strokeOpacity="0.95" fill="none" />
            <path d="M 86 48.8 Q 100 51.3 114 48.8" stroke="rgba(100,50,0,0.5)" strokeWidth="0.8" fill="none" />

            {/* 4. The 9 Side Grip Ribs (Notches on Left & Right) */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const ny = 98 + i * 15.5;
              return (
                <g key={i}>
                  {/* Left Notch */}
                  <rect x="67" y={ny} width="6.5" height="8.5" rx="1.8" fill="rgba(60,25,0,0.32)" />
                  <rect x="67.5" y={ny + 0.5} width="5.5" height="7.5" rx="1.2" fill="rgba(255,225,90,0.28)" />
                  <line x1="67" y1={ny} x2="73.5" y2={ny} stroke="rgba(255,255,255,0.85)" strokeWidth="0.8" />
                  <line x1="67" y1={ny + 8.5} x2="73.5" y2={ny + 8.5} stroke="rgba(100,45,0,0.5)" strokeWidth="0.8" />
                  <ellipse cx="70.2" cy={ny + 4.25} rx="1.8" ry="2" fill="#FFEAA7" opacity="0.65" />

                  {/* Right Notch */}
                  <rect x="126.5" y={ny} width="6.5" height="8.5" rx="1.8" fill="rgba(60,25,0,0.32)" />
                  <rect x="127" y={ny + 0.5} width="5.5" height="7.5" rx="1.2" fill="rgba(255,225,90,0.28)" />
                  <line x1="126.5" y1={ny} x2="133" y2={ny} stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" />
                  <line x1="126.5" y1={ny + 8.5} x2="133" y2={ny + 8.5} stroke="rgba(100,45,0,0.5)" strokeWidth="0.8" />
                  <ellipse cx="129.8" cy={ny + 4.25} rx="1.8" ry="2" fill="#FFEAA7" opacity="0.55" />
                </g>
              );
            })}

            {/* Vertical Inner Divider Lines between ribs and center window */}
            <line x1="74" y1="90" x2="74" y2="256" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            <line x1="126" y1="90" x2="126" y2="256" stroke="rgba(0,0,0,0.2)" strokeWidth="0.8" />

            {/* 5. Shoulder Chamfer Facets */}
            <line x1="86" y1="56" x2="66" y2="90" stroke="#fff" strokeWidth="1.6" strokeOpacity="0.75" strokeLinecap="round" />
            <line x1="114" y1="56" x2="134" y2="90" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 74 86 Q 100 84 126 86" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.4" fill="none" />

            {/* 6. Front Recessed Panel Bevel Frame */}
            <g>
              <polygon points="74,91 75.5,93 75.5,253 74,255" fill="rgba(255,255,255,0.45)" />
              <polygon points="74,91 126,91 124.5,93 75.5,93" fill="rgba(255,255,255,0.55)" />
              <polygon points="126,91 126,255 124.5,253 124.5,93" fill="rgba(0,0,0,0.22)" />
              <polygon points="74,255 75.5,253 124.5,253 126,255" fill="rgba(0,0,0,0.18)" />
              <line x1="74,91" x2="75.5,93" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.7" />
              <line x1="126,91" x2="124.5,93" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="74,255" x2="75.5,253" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.5" />
              <line x1="126,255" x2="124.5,253" stroke="#000" strokeWidth="0.8" strokeOpacity="0.25" />
            </g>

            {/* 7. Rotating Authentic RKW Sticker Art (Front & Back) */}
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

            {/* 8. Studio Lighting Reflections matching the photo */}
            {/* Left softbox diffuse highlight */}
            <rect x="76" y="93" width="7" height="158" rx="3.5" fill="#fff" opacity="0.32" filter={`url(#${id}-soft)`} />
            {/* Sharp specular pinstripe */}
            <line x1="77.5" y1="93" x2="77.5" y2="251" stroke="#fff" strokeWidth="1.2" strokeOpacity="0.88" />
            {/* Shoulder specular */}
            <path d="M 75 88 L 86 68" stroke="#fff" strokeWidth="1.4" strokeOpacity="0.65" strokeLinecap="round" />
            {/* Right fill light */}
            <line x1="123" y1="93" x2="123" y2="251" stroke="#fff" strokeWidth="0.8" strokeOpacity="0.25" />

            {/* Base pedestal kick-up arch and thick plastic reflections */}
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
  title = "3D Kolhu Cellar & Virtual Shelves",
  subtitle = "Touch any bottle to inspect in 360° 3D, verify the Agmark & FSSAI purity labels, and order live cold-pressed oil.",
  onAddToCart
}: ProductShelfProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [bag, setBag] = useState(0);
  const [bump, setBump] = useState(0);
  const [activeTab, setActiveTab] = useState<number>(0);
  const bagRef = useRef<HTMLButtonElement | null>(null);

  // Cart integration
  const cartContext = useCart();
  const effectiveBagCount = cartContext ? cartContext.totalItems : bag;

  // Split into 4 shelves
  const rows = [
    products.slice(0, 4),
    products.slice(4, 8),
    products.slice(8, 12),
    products.slice(12, 16)
  ];

  const shelfTitles = [
    { title: "01. Signature Mustard Oils & Vedic Bilona Ghee", sub: "Traditional cold-press Kolhu & hand-churned Vedic curd ghee" },
    { title: "02. Pure Nut & Coconut Cold-Pressed Oils", sub: "Saurashtra peanuts, Kerala copra, Tiptur extra virgin & Gujarat sesame" },
    { title: "03. Wellness Rogans & Exotic Seeds", sub: "Kashmir Mamra & Gurbandi almonds, wild walnut & organic flaxseed" },
    { title: "04. Specialty & Daily Kitchen Cold-Pressed Oils", sub: "West Bengal black sesame, cold-pressed olive, Maharashtra onion & Karnataka sunflower" }
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

  return (
    <div
      className={cn(
        "relative min-h-dvh w-full overflow-x-hidden bg-gradient-to-b from-[#F7F3EB] via-[#F2EDE3] to-[#EAE2D5] font-sans text-[#1C1A16] antialiased",
        className
      )}
    >
      {/* Top Cellar Spotlight Glow */}
      <div className="absolute top-0 inset-x-0 h-[480px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />

      <LayoutGroup>
        <main className="relative mx-auto w-full max-w-[1200px] px-3 pt-6 pb-20 sm:px-6 sm:pt-10">
          {/* Top Heritage Badge & Cellar Header */}
          <div className="mb-8 text-center max-w-3xl mx-auto space-y-2.5 px-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-900/10 border border-amber-800/20 text-[#8C4318] text-[11px] sm:text-xs font-black uppercase tracking-widest shadow-2xs">
              <span>★ SINCE 1981</span>
              <span>&bull;</span>
              <span>RAMESH KOLHU WALE</span>
              <span>&bull;</span>
              <span>LIVE COLD PRESS</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif text-[#1C1A16] font-extrabold tracking-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-[#786C5E] leading-relaxed max-w-xl mx-auto font-medium">
              {subtitle}
            </p>

            {/* Quick Trust Highlights Banner */}
            <div className="pt-2 flex items-center justify-center flex-wrap gap-2 text-[11px] sm:text-xs font-bold text-stone-700">
              <span className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-stone-200/80 shadow-2xs">
                <span>❄️</span> Cold-Pressed &lt;38°C
              </span>
              <span className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-stone-200/80 shadow-2xs">
                <span>🚚</span> Free Delhi NCR Delivery &gt;₹799
              </span>
              <span className="inline-flex items-center gap-1 bg-white/80 backdrop-blur-xs px-3 py-1 rounded-full border border-stone-200/80 shadow-2xs">
                <span>⏰</span> Unit Hours: 10:00 AM – 10:00 PM
              </span>
              <a
                href="https://wa.me/919217744378"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-[#25D366]/15 text-[#137A37] px-3 py-1 rounded-full border border-[#25D366]/30 hover:bg-[#25D366]/25 transition-colors cursor-pointer"
              >
                <span>💬</span> WhatsApp: +91 9217744378
              </a>
            </div>

            {/* Category Jump Tabs */}
            <div className="pt-3 flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
              {[
                "All 4 Shelves (16 Items)",
                "01. Mustard & Ghee (4)",
                "02. Nut & Coconut (4)",
                "03. Wellness Rogans (4)",
                "04. Daily & Specialty (4)"
              ].map((tabLabel, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={cn(
                    "px-3 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs",
                    activeTab === idx
                      ? "bg-[#0E2A47] text-white shadow-sm ring-2 ring-[#0E2A47]/30"
                      : "bg-white/80 hover:bg-white text-stone-700 border border-stone-200"
                  )}
                >
                  {tabLabel}
                </button>
              ))}
            </div>
          </div>

          {/* Shelves Wall */}
          {rows.map((row, r) => {
            if (activeTab !== 0 && activeTab !== r + 1) return null;
            return (
              <section
                key={r}
                id={`shelf-${r + 1}`}
                aria-label={shelfTitles[r].title}
                className="relative mb-14 sm:mb-20"
              >
                {/* Shelf Category Header Plaque */}
                <div className="mb-4 px-2 sm:px-6 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 truncate">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#8C4318] text-amber-200 text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-2xs">
                      Shelf 0{r + 1}
                    </span>
                    <h2 className="text-sm sm:text-base font-black text-stone-900 tracking-tight truncate">
                      {shelfTitles[r].title}
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100/70 border border-amber-300/60 px-3 py-1 rounded-full uppercase tracking-wider flex-shrink-0">
                    <span className="hidden sm:inline">⇄ Click bottle to rotate 360°</span>
                    <span className="sm:hidden">Swipe shelf ⇄</span>
                  </span>
                </div>

                {/* Big Bottles Row Standing on Shelf - Mobile Touch Carousel / Desktop 4-Col Grid */}
                <div className="relative z-10 flex gap-4 overflow-x-auto snap-x snap-mandatory px-3 pb-3 no-scrollbar sm:grid sm:grid-cols-4 sm:gap-6 md:gap-8 sm:px-6 sm:overflow-visible sm:pb-0 sm:items-end">
                  {row.map((p) => (
                    <div
                      key={p.id}
                      className="w-[72vw] max-w-[240px] sm:w-auto flex-shrink-0 snap-center flex flex-col items-center group"
                    >
                      {openId === p.id ? (
                        <div className="h-[290px] sm:h-[330px] md:h-[360px] w-full" />
                      ) : (
                        <motion.button
                          layoutId={`product-${p.id}`}
                          type="button"
                          onClick={() => setOpenId(p.id)}
                          aria-label={`${p.name}, From ${currency}${p.price}`}
                          transition={SPRING}
                          className="relative h-[290px] sm:h-[330px] md:h-[360px] w-full flex items-end justify-center cursor-pointer outline-none transition-transform duration-300 group-hover:-translate-y-2.5 focus-visible:ring-2 focus-visible:ring-[#0E2A47] rounded-2xl"
                        >
                          {/* Ambient golden glow behind bottle on hover */}
                          <div className="absolute inset-0 bg-radial from-amber-400/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full" />
                          {p.bottleImage ? (
                            <div className="relative h-full w-full flex items-end justify-center pb-1">
                              <img
                                src={p.bottleImage}
                                alt={p.name}
                                className="h-full w-auto object-contain max-h-[285px] sm:max-h-[325px] md:max-h-[355px] drop-shadow-xl group-hover:scale-105 transition-transform duration-300 mix-blend-multiply"
                              />
                            </div>
                          ) : (
                            <ProductArt
                              p={p}
                              className="h-full w-auto max-w-full drop-shadow-md group-hover:drop-shadow-2xl transition-all duration-300"
                            />
                          )}
                          {/* Floating 360 badge on hover */}
                          <span className="absolute top-2 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-black text-[#0E2A47] shadow-sm border border-stone-200/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none tracking-wider">
                            360° ⇄
                          </span>
                        </motion.button>
                      )}

                      {/* On mobile: title, Hindi sub & price inline under each bottle */}
                      <div
                        className="mt-2 w-full text-center sm:hidden cursor-pointer bg-white/60 backdrop-blur-xs p-2.5 rounded-xl border border-stone-200/60 shadow-2xs"
                        onClick={() => setOpenId(p.id)}
                      >
                        <div className="text-[13px] leading-tight font-black text-stone-900 line-clamp-1">
                          {p.short}
                        </div>
                        {p.sub && (
                          <div className="text-[10px] text-stone-500 font-sans line-clamp-1">
                            {p.sub}
                          </div>
                        )}
                        <div className="mt-1 flex items-center justify-center gap-2">
                          <span className="text-[13px] font-black text-[#0E2A47]">
                            From {currency}{p.price}
                          </span>
                          {p.compareAt && (
                            <span className="text-[10px] font-normal text-stone-400 line-through">
                              {currency}{p.compareAt}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          className="mt-1.5 w-full py-1 rounded-lg bg-[#0E2A47] text-amber-300 text-[10px] font-black uppercase tracking-wider shadow-2xs"
                        >
                          Tap to Rotate 360° ⇄
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3D Handcrafted Sheesham / Teak Wood Shelf Plinth */}
                <div aria-hidden className="relative -mt-2 w-full">
                  {/* Top shelf surface with wood grain & golden reflection highlight */}
                  <div className="h-6 sm:h-8 w-full rounded-t-sm bg-gradient-to-b from-[#A45A2A] via-[#8C4318] to-[#6A2E0A] shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.15)_40px,rgba(0,0,0,0.15)_42px)]" />
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FDE68A]/60 to-transparent" />
                  </div>
                  {/* Shelf front face with thickness & engraved brass plaque */}
                  <div className="h-5 sm:h-6 w-full bg-gradient-to-b from-[#562205] to-[#3B1501] shadow-[0_6px_12px_rgba(0,0,0,0.35)] flex items-center justify-between px-3 sm:px-8 border-t border-[#3B1501]">
                    {/* Left brass screw stud */}
                    <div className="size-2 sm:size-2.5 rounded-full bg-gradient-to-tr from-[#92400E] via-[#FBBF24] to-[#FEF3C7] shadow-sm border border-[#78350F]" />
                    {/* Center engraved brass brand plaque */}
                    <div className="px-2.5 sm:px-4 py-0.5 rounded bg-gradient-to-r from-[#92400E] via-[#FBBF24] to-[#92400E] text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-[#451A03] shadow-sm border border-[#78350F]/50 truncate">
                      RAMESH KOLHU WALE &bull; LIVE COLD-PRESSED KACHI GHANI &bull; SINCE 1981
                    </div>
                    {/* Right brass screw stud */}
                    <div className="size-2 sm:size-2.5 rounded-full bg-gradient-to-tr from-[#92400E] via-[#FBBF24] to-[#FEF3C7] shadow-sm border border-[#78350F]" />
                  </div>
                  {/* Deep cast shadow under wooden shelf */}
                  <div className="h-10 sm:h-14 w-full bg-gradient-to-b from-black/25 via-black/10 to-transparent pointer-events-none" />
                </div>

                {/* Product Titles & Prices under shelf on desktop */}
                <div className="mt-3 hidden sm:grid sm:grid-cols-4 gap-6 md:gap-8 px-6">
                  {row.map((p) => (
                    <div
                      key={p.id}
                      className="text-center group cursor-pointer bg-white/70 hover:bg-white p-3 rounded-2xl border border-stone-200/80 shadow-2xs hover:shadow-md transition-all"
                      onClick={() => setOpenId(p.id)}
                    >
                      <div className="text-[13px] leading-snug font-black text-stone-900 sm:text-[14px] line-clamp-1 group-hover:text-[#0E2A47] transition-colors">
                        {p.short}
                      </div>
                      {p.sub && (
                        <div className="text-[11px] text-stone-500 font-sans line-clamp-1">
                          {p.sub}
                        </div>
                      )}
                      <div className="mt-1 text-[13px] font-black text-[#0E2A47] tabular-nums sm:text-[14px]">
                        From {currency}{p.price}
                        {p.compareAt && (
                          <span className="ml-1 text-[11px] font-normal text-stone-400 line-through">
                            {currency}{p.compareAt}
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-[#0E2A47] bg-[#EBF2F8] px-2.5 py-0.5 rounded-full group-hover:bg-[#0E2A47] group-hover:text-amber-300 transition-colors">
                        Inspect 360° ⇄
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
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
  const [viewMode, setViewMode] = useState<'3d' | 'mockup'>('3d');
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const drag = useRef<{ x: number; v: number; samples: { x: number; t: number }[] } | null>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    if (reduce) return;
    const c = animate(spin, 1, { duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 });
    return () => c.stop();
  }, [spin, reduce]);

  // Exact volume pricing lookup
  const computedPrice = getProductVolumePrice(p.id, size, p.price);
  const computedCompareAt = getProductVolumeCompareAt(p.id, size, p.compareAt) || Math.round(computedPrice * 1.25);
  const savings = computedCompareAt - computedPrice;

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

  return (
    <motion.div role="dialog" aria-modal="true" aria-label={p.name} className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-stone-950/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />

      {/* Main Dialog Container */}
      <div className="relative mx-auto flex min-h-full max-w-[1100px] flex-col justify-center px-3 py-4 sm:px-6 md:grid md:grid-cols-[1.05fr_1fr] md:items-center md:gap-8 md:py-8">
        {/* Left Column: Big 3D interactive bottle display / Studio Mockup toggle */}
        <div className="relative flex flex-col items-center justify-center pt-2 pb-4 md:py-0">
          {p.showcaseImage && (
            <div className="mb-3 z-20 flex items-center gap-1.5 bg-black/50 backdrop-blur-md p-1 rounded-full border border-white/20 shadow-md">
              <button
                type="button"
                onClick={() => setViewMode("3d")}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer",
                  viewMode === "3d"
                    ? "bg-[#FAB800] text-stone-950 shadow-sm"
                    : "text-white/80 hover:text-white"
                )}
              >
                ⇄ 360° 3D Bottle
              </button>
              <button
                type="button"
                onClick={() => setViewMode("mockup")}
                className={cn(
                  "px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer",
                  viewMode === "mockup"
                    ? "bg-[#FAB800] text-stone-950 shadow-sm"
                    : "text-white/80 hover:text-white"
                )}
              >
                📸 Studio Mockup
              </button>
            </div>
          )}

          {viewMode === "mockup" && p.showcaseImage ? (
            <div className="relative z-10 w-[240px] sm:w-[300px] md:w-[350px] aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40">
              <img
                src={p.showcaseImage}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <>
              <motion.div
                layoutId={`product-${p.id}`}
                transition={SPRING}
                className="relative z-10 w-[200px] sm:w-[250px] md:w-[290px] h-[44vh] sm:h-[52vh] md:h-[65vh] max-h-[580px] flex items-center justify-center cursor-grab touch-none select-none active:cursor-grabbing"
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={onUp}
              >
                <ProductArt p={p} spin={spin} size={size} className="h-full w-auto max-w-full drop-shadow-2xl" />
              </motion.div>

              {/* Wooden Turntable Plinth under bottle */}
              <div className="relative -mt-2 sm:-mt-3 flex flex-col items-center">
                <div className="h-4 sm:h-5 w-44 sm:w-56 rounded-[50%] bg-gradient-to-b from-[#B86B28] via-[#8C4318] to-[#451A03] shadow-[0_15px_35px_rgba(0,0,0,0.5)] border-t border-[#FDE68A]/40" />
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-bold text-amber-200 tracking-wider uppercase shadow-sm">
                  <span className="text-xs">⇄</span> Drag horizontally to rotate 360°
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column: Product Details, Volume Selector & CTA - Compact Single-Screen Layout (NO SCROLLING NEEDED!) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="relative z-20 rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-stone-200/90 text-stone-900 w-full max-w-[500px] mx-auto md:mx-0"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-black uppercase tracking-wider text-[#0E2A47] bg-[#EBF2F8] hover:bg-[#DDE9F4] transition-colors cursor-pointer"
            >
              <ChevronLeft className="size-3.5" strokeWidth={2.4} /> Back
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                {p.category}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-black text-amber-600 bg-amber-50/60 px-2 py-0.5 rounded-full border border-amber-200/40">
                <Star className="size-3 fill-amber-400 text-amber-500" />
                <span>{p.rating.toFixed(1)}</span>
                <span className="text-stone-400 font-normal">({p.reviews})</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="grid size-7 place-items-center rounded-lg text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Product Title & Hindi Subtitle */}
          <div className="mt-3">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-serif leading-tight">
              {p.name}
            </h2>
            {p.sub && (
              <p className="mt-0.5 text-xs sm:text-sm font-bold text-[#0E2A47]">
                {p.sub}
              </p>
            )}
          </div>

          {/* Price & Savings Row */}
          <div className="mt-3 flex items-baseline gap-2.5 flex-wrap">
            <span className="text-2xl sm:text-3xl font-black text-[#0E2A47] tabular-nums">
              {currency}{computedPrice}
            </span>
            {computedCompareAt && (
              <span className="text-sm text-stone-400 line-through tabular-nums">
                {currency}{computedCompareAt}
              </span>
            )}
            {computedCompareAt && computedCompareAt > computedPrice && (
              <span className="text-[11px] font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Save {currency}{computedCompareAt - computedPrice} ({Math.round(((computedCompareAt - computedPrice) / computedCompareAt) * 100)}% OFF)
              </span>
            )}
            <span className="text-[11px] font-semibold text-stone-500">
              Taxes included &bull; Free Delhi NCR above ₹799
            </span>
          </div>

          {/* Select Volume / Packaging Size (Compact 3x2 Grid) */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-stone-700">
                Select Volume / Packaging:
              </span>
              <span className="text-[11px] font-bold text-[#0E2A47]">
                {size}
              </span>
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
                    onClick={() => setSize(sz)}
                    className={cn(
                      "flex flex-col items-center justify-center py-1.5 px-1 rounded-xl border text-center transition-all cursor-pointer",
                      on
                        ? "bg-[#0E2A47] text-white border-[#0E2A47] shadow-sm ring-2 ring-[#0E2A47]/40"
                        : "bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200"
                    )}
                  >
                    <span className="text-[12px] font-black leading-tight">{shortSz}</span>
                    <span className={cn("text-[11px] font-bold tabular-nums", on ? "text-amber-300" : "text-[#0E2A47]")}>
                      {currency}{optPrice} <span className="opacity-70 font-normal text-[9px]">({packType})</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Stepper & Actions (Add to Bag + WhatsApp) */}
          <div className="mt-4 flex items-center gap-2">
            {/* Quantity Stepper */}
            <div className="flex items-center h-11 rounded-xl border border-stone-200 bg-stone-50 flex-shrink-0">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-full w-8 place-items-center rounded-l-xl text-stone-700 hover:bg-stone-200 transition-colors disabled:opacity-30 cursor-pointer"
                disabled={qty === 1}
              >
                <Minus className="size-3.5" />
              </button>
              <span className="w-7 text-center text-xs font-black tabular-nums">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
                className="grid h-full w-8 place-items-center rounded-r-xl text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <Plus className="size-3.5" />
              </button>
            </div>

            {/* Add to Bag Button */}
            <button
              type="button"
              onClick={handleAdd}
              className={cn(
                "h-11 flex-1 rounded-xl text-xs sm:text-sm font-black tracking-wide uppercase shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98",
                added
                  ? "bg-emerald-700 text-white"
                  : "bg-[#0E2A47] hover:bg-[#163A60] text-amber-300 hover:text-white"
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
                  <span>Add ({currency}{computedPrice * qty})</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Quick Order Button */}
            <a
              href={`https://wa.me/919217744378?text=${encodeURIComponent(`Namaste Ramesh Kolhu Wale! I would like to order:\n\n*Product:* ${p.name}\n*Packaging:* ${size}\n*Quantity:* ${qty}\n*Amount:* ₹${computedPrice * qty}\n\nPlease confirm availability and delivery to Delhi NCR.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Order on WhatsApp"
              className="h-11 px-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center gap-1 font-bold text-xs shadow-sm hover:shadow transition-all active:scale-98 cursor-pointer flex-shrink-0"
            >
              <span className="text-sm">💬</span>
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>

          {/* Trust Highlights Strip (3 Compact Badges) */}
          <div className="mt-3.5 grid grid-cols-3 gap-1 text-center bg-stone-50 p-2 rounded-xl border border-stone-200/80">
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-700 flex flex-col items-center">
              <span className="text-amber-700 font-black">❄️ &lt;38°C Cold Press</span>
              <span className="text-[9px] text-stone-500 font-normal">Traditional Kolhu</span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-700 flex flex-col items-center border-x border-stone-200">
              <span className="text-emerald-700 font-black">🌿 Single-Source</span>
              <span className="text-[9px] text-stone-500 font-normal">Native Indian Seeds</span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-bold text-stone-700 flex flex-col items-center">
              <span className="text-[#0E2A47] font-black">🚚 Free Delhi NCR</span>
              <span className="text-[9px] text-stone-500 font-normal">Orders above ₹799</span>
            </div>
          </div>

          {/* Crisp Culinary Tip */}
          <p className="mt-2.5 text-[11px] text-stone-600 leading-snug italic text-center">
            {p.tagline}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

