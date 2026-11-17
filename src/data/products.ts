import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  // ─── 1. Mustard Oils ────────────────────────────────────────────────────────
  {
    id: 'yellow-mustard-oil',
    name: 'Pure Cold-Pressed Yellow Mustard Oil',
    hindiName: 'पीली सरसों का शुद्ध तेल (कच्ची घानी)',
    slug: 'yellow-mustard-oil',
    category: 'oil',
    shortDesc: 'Cold pressed fresh at our Units. Mild golden pungency with natural omega-3 and appetizing cooking aroma.',
    description: 'Extracted fresh before your eyes at our live extraction Units at less than 38°C. Made exclusively from select Rajasthani native yellow mustard seeds (Pili Sarson) supervised by Ramesh Kolhu Wale since 1981. Naturally sweeter, milder, and preserves all vital omega-3 fatty acids without burning the throat. Perfect for everyday Indian curries, tadka, and seasonal pickles.',
    price: 340,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 412,
    inStock: true,
    featured: true,
    bestSeller: true,
    image: '/mockups/yellow-mustard/showcase.png',
    bottleImage: '/mockups/yellow-mustard/bottle.png',
    showcaseImage: '/mockups/yellow-mustard/showcase.png',
    additionalImages: ['/mockups/yellow-mustard/bottle.png', '/images/yellow_mustard.jpg'],
    volumes: [
      { size: '200ml (PET bottle)', price: 75, originalPrice: 95, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 180, originalPrice: 220, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 340, originalPrice: 420, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 660, originalPrice: 800, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 1600, originalPrice: 1950, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 4500, originalPrice: 5400, packaging: 'Tin' }
    ],
    benefits: [
      'Heart friendly: Rich in Monounsaturated Fatty Acids (MUFA) and Omega-3 & 6',
      'Extracted at <38°C: Zero heat damage, preserving natural Vitamin E & Allyl Isothiocyanate',
      'Mild Golden Pungency: Perfect appetizing aroma for daily cooking, sabzis & dals',
      'Zero chemicals, zero palm oil, zero argemone adulteration'
    ],
    processHighlight: 'Cold-pressed at 14 RPM in traditional slow-speed Kolhu without any chemical refining or high-temperature heating.',
    smokePoint: '250°C (High Smoke Point - ideal for Indian tadka and frying)',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '11.8g',
      mufa: '65.2g',
      pufa: '23g',
      cholesterol: '0mg',
      vitamins: 'Natural Vitamin E (34mg), Vitamin K'
    },
    extractionDetails: {
      method: 'Traditional Kacchi Ghani (Cold Press)',
      temperature: 'Always kept below 38°C',
      rpm: '12 - 14 RPM (Slow Rotation)',
      seedOrigin: 'Single-source Certified Farms, Alwar (Rajasthan)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Virgin Grade (Agmark Standard)',
      adulteration: 'Negative for Mineral Oil & Palm Oil',
      argemone: 'Negative (TLC method)',
      freeFattyAcid: '0.42% (Standard < 1.5%)'
    }
  },
  {
    id: 'black-mustard-oil',
    name: 'Traditional Cold-Pressed Black Mustard Oil',
    hindiName: 'काली सरसों का शुद्ध तेल (कच्ची घानी - झल वाला)',
    slug: 'black-mustard-oil',
    category: 'oil',
    shortDesc: 'Authentic robust, pungent jhal aroma. Slow cold-pressed for North Indian pickles, fish curry & massage.',
    description: 'The quintessential North Indian kitchen soul since 1981. Sourced from high-pungency black mustard seeds (Kali Sarson) crushed in our cold-press Kolhu by Ramesh Kolhu Wale. The slow cold pressing retains natural sinigrin which releases the quintessential pungent, eye-watering sharpness true mustard connoisseurs crave. Perfect for achaar, fish curries, and warming massages.',
    price: 320,
    originalPrice: 400,
    rating: 4.8,
    reviewsCount: 324,
    inStock: true,
    featured: true,
    bestSeller: false,
    image: '/mockups/black-mustard/showcase.png',
    bottleImage: '/mockups/black-mustard/bottle.png',
    showcaseImage: '/mockups/black-mustard/showcase.png',
    additionalImages: ['/mockups/black-mustard/bottle.png', '/images/black_mustard.jpg'],
    volumes: [
      { size: '200ml (PET bottle)', price: 70, originalPrice: 90, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 170, originalPrice: 210, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 320, originalPrice: 400, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 620, originalPrice: 760, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 1500, originalPrice: 1850, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 4200, originalPrice: 5100, packaging: 'Tin' }
    ],
    benefits: [
      'Unmatched sharp pungency (Jhal) - authentic signature taste',
      'Packed with Glucosinolate & Allyl Isothiocyanate for respiratory clarity',
      'Natural food preservative - supreme oil for mango, lemon & chilli pickles',
      'Warming massage oil - relieves winter joint stiffness & improves circulation'
    ],
    processHighlight: 'Crushed cold at 14 RPM. Free from chemical bleaching, artificial colors, or essence.',
    smokePoint: '250°C',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '12g',
      mufa: '64g',
      pufa: '24g',
      cholesterol: '0mg',
      vitamins: 'Natural Tocopherols (Vitamin E)'
    },
    extractionDetails: {
      method: 'Kacchi Ghani Cold Press',
      temperature: '< 36°C',
      rpm: '14 RPM',
      seedOrigin: 'Alwar & Bharatpur (Rajasthan)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Single Origin Black Mustard (Agmark Standard)',
      adulteration: 'Zero Foreign Oil Detected',
      argemone: 'Negative',
      freeFattyAcid: '0.38%'
    }
  },

  // ─── 2. Ghee Collection (4 Types) ──────────────────────────────────────────
  {
    id: 'desi-cow-ghee',
    name: 'Desi Cow Ghee',
    hindiName: 'शुद्ध देसी गाय का घी',
    slug: 'desi-cow-ghee',
    category: 'bilona-ghee',
    shortDesc: 'Golden aromatic pure Desi Cow Ghee. Handcrafted traditional recipe with natural granular danedar texture.',
    description: 'Pure Desi Cow Ghee prepared with utmost reverence by Ramesh Kolhu Wale since 1981. Made from fresh desi cow milk with rich golden color, granular (danedar) texture, and comforting traditional aroma. Completely unadulterated, free from artificial colors or essences. Enhances immunity, aids digestion, and imparts heavenly flavor to rotis, dals, and Ayurvedic recipes.',
    price: 450,
    originalPrice: 550,
    rating: 4.9,
    reviewsCount: 284,
    inStock: true,
    featured: true,
    bestSeller: true,
    image: '/images/bilona_ghee.jpg',
    additionalImages: ['/images/bilona_tradition.jpg'],
    volumes: [
      { size: '500ml (PET bottle)', price: 450, originalPrice: 550, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 880, originalPrice: 1050, packaging: 'PET bottle' }
    ],
    benefits: [
      'Golden Danedar Texture: Pure cow milkfat with heavenly traditional aroma',
      'Rich in natural fat-soluble Vitamins A, D, E & K',
      'Boosts Agni (digestive fire) and supports healthy gut lining',
      'Zero preservatives, zero palm oil, zero chemical additives'
    ],
    processHighlight: 'Simmered slowly on traditional chulha to preserve golden aroma and wholesome nutrition.',
    smokePoint: '252°C (High heat stability for healthy cooking and tadka)',
    nutritionalInfo: {
      energy: '897 kcal / 100g',
      fat: '99.7g',
      saturatedFat: '62g',
      mufa: '28g',
      pufa: '4g',
      cholesterol: '190mg',
      vitamins: 'Natural Vitamin A, D, E, K'
    },
    extractionDetails: {
      method: 'Traditional Desi Simmering',
      temperature: 'Slow simmered on traditional chulha',
      rpm: 'Traditional artisanal preparation',
      seedOrigin: 'Indigenous Desi Cow Milk Dairy Farms',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Desi Cow Ghee (Agmark Standard)',
      adulteration: 'Negative for Vanaspati, Palm Oil & Animal Tallow',
      argemone: 'Negative',
      freeFattyAcid: '0.20%'
    }
  },
  {
    id: 'desi-buffalo-ghee',
    name: 'Desi Buffalo Ghee',
    hindiName: 'शुद्ध देसी भैंस का घी',
    slug: 'desi-buffalo-ghee',
    category: 'bilona-ghee',
    shortDesc: 'Pure snow-white Murrah Desi Buffalo Ghee. Rich, creamy, thick danedar texture for energy and sweet delicacies.',
    description: 'Pure Desi Buffalo Ghee crafted by Ramesh Kolhu Wale from rich, high-fat Murrah buffalo milk. Known across North Indian households for its snow-white granular texture, rich density, and sweet creamy fragrance. Traditional wrestlers and fitness enthusiasts have relied on buffalo ghee for muscle strength, bone density, and vital stamina since 1981.',
    price: 480,
    originalPrice: 580,
    rating: 4.8,
    reviewsCount: 198,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/images/bilona_tradition.jpg',
    additionalImages: ['/images/bilona_ghee.jpg'],
    volumes: [
      { size: '500ml (PET bottle)', price: 480, originalPrice: 580, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 940, originalPrice: 1100, packaging: 'PET bottle' }
    ],
    benefits: [
      'High calorie, wholesome energy source for strength & stamina',
      'Dense snow-white granular grain - ideal for halwa, laddoos & parathas',
      'Rich in calcium, phosphorus, and essential fatty acids for bone health',
      'Slow-crafted without artificial whitening, preservatives or hydrogenated fats'
    ],
    processHighlight: 'Crafted from pure whole buffalo milk simmered at gentle temperature for authentic aroma.',
    smokePoint: '255°C',
    nutritionalInfo: {
      energy: '900 kcal / 100g',
      fat: '99.8g',
      saturatedFat: '65g',
      mufa: '27g',
      pufa: '3.5g',
      cholesterol: '210mg',
      vitamins: 'Natural Vitamin A, E & Calcium'
    },
    extractionDetails: {
      method: 'Traditional Desi Simmering',
      temperature: 'Gentle flame slow boiling',
      rpm: 'Artisanal preparation',
      seedOrigin: 'Haryana Pasturelands Murrah Cattle',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Buffalo Milkfat (Agmark Standard)',
      adulteration: 'Negative for Vegetable Fat & Preservatives',
      argemone: 'Negative',
      freeFattyAcid: '0.22%'
    }
  },
  {
    id: 'dahi-bilona-desi-cow-ghee',
    name: 'Dahi Bilona Desi Cow Ghee',
    hindiName: 'दही बिलोना देसी गाय का घी (मंथन विधि)',
    slug: 'dahi-bilona-desi-cow-ghee',
    category: 'bilona-ghee',
    shortDesc: 'Vedic 5-step Dahi Bilona Desi Cow Ghee. Hand-churned from cultured curd (dahi makkhan) in clay pots.',
    description: 'The pinnacle of Ayurvedic purity: authentic Dahi Bilona Desi Cow Ghee crafted following sacred Vedic methods. Unlike industrial commercial ghee made by boiling centrifugal cream, our dahi bilona ghee requires 5 classical steps: boiling pure cow milk, culturing it into rich whole curd (dahi), hand-churning with a bi-directional mathani to extract fresh butter (makkhan), and gently clarifying over slow earthen heat. Takes ~25 to 30 liters of whole milk to yield just 1 liter of this precious golden medicine.',
    price: 750,
    originalPrice: 900,
    rating: 5.0,
    reviewsCount: 345,
    inStock: true,
    featured: true,
    bestSeller: true,
    image: '/images/bilona_ghee.jpg',
    additionalImages: ['/images/bilona_tradition.jpg'],
    volumes: [
      { size: '500ml (PET bottle)', price: 750, originalPrice: 900, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 1450, originalPrice: 1750, packaging: 'PET bottle' }
    ],
    benefits: [
      'Authentic Dahi Bilona Churning: Cultured curd butter method, zero cream boiling',
      'Rich in Gut-Healing Butyric Acid & Natural Probiotic Metabolites',
      'Golden Danedar Texture with authentic nutty Vedic aroma',
      'Supreme choice for daily Ayurvedic wellness, memory, and glowing vitality'
    ],
    processHighlight: 'Cultured whole curd bi-directionally churned in traditional pots. Never made from centrifugal separator cream.',
    smokePoint: '252°C',
    nutritionalInfo: {
      energy: '898 kcal / 100g',
      fat: '99.8g',
      saturatedFat: '61.5g',
      mufa: '29g',
      pufa: '4g',
      cholesterol: '185mg',
      vitamins: 'Natural Vitamin A, D, E, K2, CLA & Butyric Acid'
    },
    extractionDetails: {
      method: 'Vedic 5-Step Dahi Bilona (Curd Churning)',
      temperature: 'Slow simmered on traditional chulha',
      rpm: 'Bi-directional traditional churn',
      seedOrigin: 'Indigenous Desi Cow Gaushalas',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Cultured Dahi Bilona Cow Ghee',
      adulteration: 'Negative for Vanaspati, Palm Oil & Adulterants',
      argemone: 'Negative',
      freeFattyAcid: '0.16% (Ultra-low acidity)'
    }
  },
  {
    id: 'dahi-bilona-desi-buffalo-ghee',
    name: 'Dahi Bilona Desi Buffalo Ghee',
    hindiName: 'दही बिलोना देसी भैंस का घी (मंथन विधि)',
    slug: 'dahi-bilona-desi-buffalo-ghee',
    category: 'bilona-ghee',
    shortDesc: 'Vedic Dahi Bilona Buffalo Ghee. Churned from cultured buffalo curd for rich density, strength, and immunity.',
    description: 'Authentic Dahi Bilona Desi Buffalo Ghee prepared through traditional whole-curd churning by Ramesh Kolhu Wale. Buffalo milk is naturally cultured into thick dahi overnight, then churned bi-directionally to separate probiotic-rich makkhan before slow simmering. The result is an extraordinarily dense, fragrant, snowy-granular ghee packed with healthy fats, calcium, and natural vitality.',
    price: 780,
    originalPrice: 950,
    rating: 4.9,
    reviewsCount: 162,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/images/bilona_tradition.jpg',
    additionalImages: ['/images/bilona_ghee.jpg'],
    volumes: [
      { size: '500ml (PET bottle)', price: 780, originalPrice: 950, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 1500, originalPrice: 1800, packaging: 'PET bottle' }
    ],
    benefits: [
      'Authentic Dahi Bilona Method: Prepared from cultured buffalo dahi makkhan',
      'Rich in Calcium & Natural CLA for strength, muscle repair and restful sleep',
      'Dense snowy-white danedar grain with rich heritage fragrance',
      'Zero centrifugal cream, zero preservatives, 100% pure guarantee'
    ],
    processHighlight: 'Bi-directionally churned from thick whole buffalo curd, clarified slowly over gentle heat.',
    smokePoint: '255°C',
    nutritionalInfo: {
      energy: '900 kcal / 100g',
      fat: '99.8g',
      saturatedFat: '64g',
      mufa: '28g',
      pufa: '3.5g',
      cholesterol: '200mg',
      vitamins: 'Natural Vitamin A, E, Calcium & Minerals'
    },
    extractionDetails: {
      method: 'Vedic 5-Step Dahi Bilona (Curd Churning)',
      temperature: 'Gentle flame clarifying',
      rpm: 'Bi-directional traditional churn',
      seedOrigin: 'Haryana Murrah Buffalo Pastures',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Cultured Dahi Bilona Buffalo Ghee',
      adulteration: 'Negative for Any Foreign Fats',
      argemone: 'Negative',
      freeFattyAcid: '0.18%'
    }
  },

  // ─── 3. Nut & Seed Cold-Pressed Oils ────────────────────────────────────────
  {
    id: 'cold-pressed-groundnut-oil',
    name: 'Cold-Pressed Groundnut Oil (Peanut Oil)',
    hindiName: 'मूंगफली का शुद्ध तेल (कच्ची घानी)',
    slug: 'cold-pressed-groundnut-oil',
    category: 'oil',
    shortDesc: 'Golden, nutty everyday kitchen hero. High 225°C smoke point with sweet Saurashtra peanut fragrance.',
    description: 'The golden cooking pride of western and northern India since 1981. Pressed in our cold-press Kolhu by Ramesh Kolhu Wale from sun-dried Saurashtra red-skin peanuts. Unlike industrial refined peanut oil which is heated to 220°C and stripped of all flavor, our cold-pressed oil carries a delightful sweet peanut aroma and rich mouthfeel. Ideal for deep frying puris, bhaturas, pakoras, and everyday sautéing.',
    price: 360,
    originalPrice: 450,
    rating: 4.8,
    reviewsCount: 265,
    inStock: true,
    featured: true,
    bestSeller: false,
    image: '/mockups/groundnut-oil/showcase.png',
    bottleImage: '/mockups/groundnut-oil/bottle.png',
    showcaseImage: '/mockups/groundnut-oil/showcase.png',
    additionalImages: ['/mockups/groundnut-oil/bottle.png', '/images/groundnut_oil.jpg'],
    volumes: [
      { size: '200ml (PET bottle)', price: 80, originalPrice: 105, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 190, originalPrice: 240, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 360, originalPrice: 450, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 700, originalPrice: 870, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 1700, originalPrice: 2100, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 4900, originalPrice: 5900, packaging: 'Tin' }
    ],
    benefits: [
      'High Smoke Point: Perfect for deep frying without toxic lipid degradation',
      'Rich in Resveratrol: The same heart-protective polyphenol found in red grapes',
      'Zero cholesterol & trans fats: Promotes balanced HDL/LDL lipid profile',
      'Naturally sweet, clean nutty aroma that elevates home-cooked snacks'
    ],
    processHighlight: 'Cold-pressed at under 38°C from shelled, sun-dried Saurashtra groundnuts.',
    smokePoint: '225°C (Superb high-heat tolerance for crispy frying)',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '17g',
      mufa: '46g',
      pufa: '32g',
      cholesterol: '0mg',
      vitamins: 'Natural Vitamin E (15.7mg), Phytosterols'
    },
    extractionDetails: {
      method: 'Kacchi Ghani Cold Press',
      temperature: '< 38°C',
      rpm: '13 RPM',
      seedOrigin: 'Saurashtra Organic Peanut Farms (Gujarat)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Virgin Groundnut Oil (Agmark Standard)',
      adulteration: 'Zero Foreign Oil Adulteration',
      argemone: 'Negative',
      freeFattyAcid: '0.35%'
    }
  },
  {
    id: 'cold-pressed-coconut-oil',
    name: 'Cold-Pressed Virgin Coconut Oil',
    hindiName: 'शुद्ध कच्ची घानी नारियल तेल (गोले का तेल)',
    slug: 'cold-pressed-coconut-oil',
    category: 'oil',
    shortDesc: 'Made from sun-dried sulfur-free copra in cold-press ghani. Sweet natural coconut aroma. Raw & unrefined.',
    description: 'Experience the pure tropical magic of Kerala sun-dried coconuts, pressed in our cold-press Ghani by Ramesh Kolhu Wale without heat or chemical deodorizers. In winters, it naturally solidifies into a pristine snow-white butter, proving its unrefined purity. Excellent for South Indian cooking, bulletproof keto coffee, baby massage, and hair oiling.',
    price: 480,
    originalPrice: 600,
    rating: 4.9,
    reviewsCount: 215,
    inStock: true,
    featured: true,
    bestSeller: false,
    image: '/mockups/coconut-oil/showcase.png',
    bottleImage: '/mockups/coconut-oil/bottle.png',
    showcaseImage: '/mockups/coconut-oil/showcase.png',
    additionalImages: ['/mockups/coconut-oil/bottle.png', '/images/coconut_oil.jpg'],
    volumes: [
      { size: '200ml (PET bottle)', price: 110, originalPrice: 140, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 260, originalPrice: 320, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 480, originalPrice: 600, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 940, originalPrice: 1150, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 2280, originalPrice: 2800, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 6500, originalPrice: 7800, packaging: 'Tin' }
    ],
    benefits: [
      'High in MCTs (Medium Chain Triglycerides) & Lauric Acid: Instant energy and immunity',
      'Zero heat treatment: Retains 100% coconut enzymes and natural sweet aroma',
      'Dual-purpose: Edible kitchen elixir & 100% chemical-free hair/skin moisturizer',
      'Solidifies below 24°C naturally: The hallmark of pure virgin unrefined oil'
    ],
    processHighlight: 'Cold-pressed from naturally dried copra at < 35°C without sulfur bleaching.',
    smokePoint: '177°C (Ideal for low-medium sauteing and raw consumption)',
    nutritionalInfo: {
      energy: '862 kcal / 100g',
      fat: '100g',
      saturatedFat: '86.5g (MCTs 65%)',
      mufa: '6g',
      pufa: '1.5g',
      cholesterol: '0mg',
      vitamins: 'Lauric Acid (50%), Vitamin E'
    },
    extractionDetails: {
      method: 'Kacchi Ghani Cold Press',
      temperature: '< 35°C',
      rpm: '14 RPM',
      seedOrigin: 'Sun-Dried Sulfur-Free Copra, Kozhikode & Malabar (Kerala)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Virgin Coconut Oil (Agmark Standard)',
      adulteration: 'Negative for Liquid Paraffin & Mineral Oils',
      argemone: 'Negative',
      freeFattyAcid: '0.15%'
    }
  },
  {
    id: 'extra-virgin-coconut-oil',
    name: 'Cold-Pressed Extra Virgin Coconut Oil',
    hindiName: 'एक्स्ट्रा वर्जिन नारियल तेल (गोले का तेल)',
    slug: 'extra-virgin-coconut-oil',
    category: 'oil',
    shortDesc: 'Single-pressed from fresh organic Tiptur coconuts. Rich in lauric acid, pristine aroma for keto diet & infant massage.',
    description: 'Ultra-pure Cold-Pressed Extra Virgin Coconut Oil extracted from select sun-kissed organic coconuts from Tiptur, Karnataka. Pressed without heat or chemical refining, retaining light crystal-clear clarity when liquid and pure snow-white solid butter in cooler seasons. Highest concentration of medium-chain triglycerides (MCTs) and beneficial lauric acid.',
    price: 580,
    originalPrice: 720,
    rating: 5.0,
    reviewsCount: 142,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/mockups/extra-virgin-coconut-oil/showcase.png',
    bottleImage: '/mockups/extra-virgin-coconut-oil/bottle.png',
    showcaseImage: '/mockups/extra-virgin-coconut-oil/showcase.png',
    additionalImages: ['/mockups/extra-virgin-coconut-oil/bottle.png'],
    volumes: [
      { size: '200ml (PET bottle)', price: 130, originalPrice: 165, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 310, originalPrice: 390, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 580, originalPrice: 720, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 1120, originalPrice: 1380, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 2700, originalPrice: 3300, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 7800, originalPrice: 9400, packaging: 'Tin' }
    ],
    benefits: [
      'Over 55% Lauric Acid: Supports immune response and microbial defense',
      'Ultra-fine molecular texture: Non-comedogenic facial hydration and silky hair',
      'Pure raw cold-pressed: 100% edible virgin food grade',
      'Zero sulfur, zero mineral oil, zero hexane solvents'
    ],
    processHighlight: 'Single-pressed at less than 32°C from freshly harvested Tiptur coconuts.',
    smokePoint: '177°C',
    nutritionalInfo: {
      energy: '862 kcal / 100g',
      fat: '100g',
      saturatedFat: '87g',
      mufa: '5.8g',
      pufa: '1.4g',
      cholesterol: '0mg',
      vitamins: 'Lauric Acid, Caprylic Acid & Vitamin E'
    },
    extractionDetails: {
      method: 'Virgin Cold Extraction',
      temperature: '< 32°C',
      rpm: '10 RPM',
      seedOrigin: 'Tiptur Organic Coconut Groves (Karnataka)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Extra Virgin Coconut Oil',
      adulteration: 'Negative for Any Mineral/Foreign Oil',
      argemone: 'Negative',
      freeFattyAcid: '0.12%'
    }
  },
  {
    id: 'cold-pressed-white-sesame-oil',
    name: 'Cold-Pressed White Sesame Oil (Til Ka Tel)',
    hindiName: 'सफेद तिल का शुद्ध तेल (कच्ची घानी)',
    slug: 'cold-pressed-white-sesame-oil',
    category: 'oil',
    shortDesc: 'Revered in Ayurveda as queen of oils. Warm, nutty, nutrient-dense oil for cooking, oil pulling & abhyanga.',
    description: 'In Charaka Samhita, sesame oil is revered as the king of all oils. Extracted slowly in our cold-press Ghani from select Gujarat white sesame seeds (Safed Til) without chemical deodorization or roasting. Packed with sesamol and sesamolin — extraordinary natural antioxidants that give sesame oil exceptional shelf life and cellular rejuvenation properties. Supreme for daily cooking, Asian stir-fries, morning Gandusha (oil pulling), and winter body massages.',
    price: 520,
    originalPrice: 650,
    rating: 4.8,
    reviewsCount: 178,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/mockups/white-sesame-oil/showcase.png',
    bottleImage: '/mockups/white-sesame-oil/bottle.png',
    showcaseImage: '/mockups/white-sesame-oil/showcase.png',
    additionalImages: ['/mockups/white-sesame-oil/bottle.png', '/images/sesame_oil.jpg'],
    volumes: [
      { size: '200ml (PET bottle)', price: 120, originalPrice: 150, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 275, originalPrice: 340, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 520, originalPrice: 650, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 1020, originalPrice: 1250, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 2480, originalPrice: 3050, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 7100, originalPrice: 8500, packaging: 'Tin' }
    ],
    benefits: [
      'Potent Sesamol & Sesamolin: Defends against oxidative cellular aging',
      'Rich in Zinc & Copper: Strengthens hair roots and maintains scalp health',
      'Ayurvedic Oil Pulling Gold Standard: Whitens teeth and detoxifies mouth flora',
      'Anti-inflammatory: Relieves joint aches when applied as warm abhyanga oil'
    ],
    processHighlight: 'Cold-pressed at 13 RPM from native Gujarat white sesame seeds.',
    smokePoint: '210°C (Safe for regular cooking & tempering)',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '14.2g',
      mufa: '39.7g',
      pufa: '41.7g',
      cholesterol: '0mg',
      vitamins: 'Sesamin, Sesamol, Natural Vitamin E'
    },
    extractionDetails: {
      method: 'Kacchi Ghani Cold Press',
      temperature: '< 36°C',
      rpm: '13 RPM',
      seedOrigin: 'Saurashtra Native White Sesame Farms (Gujarat)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Virgin White Sesame Oil',
      adulteration: 'Negative for Cottonseed Oil & Palm Oil',
      argemone: 'Negative',
      freeFattyAcid: '0.40%'
    }
  },
  {
    id: 'cold-pressed-black-sesame-oil',
    name: 'Cold-Pressed Black Sesame Oil (Kaale Til Ka Tel)',
    hindiName: 'काले तिल का शुद्ध तेल (कच्ची घानी)',
    slug: 'cold-pressed-black-sesame-oil',
    category: 'oil',
    shortDesc: 'Deep, rich earthy oil pressed from West Bengal black sesame seeds. Powerful joint strengthener and anti-aging elixir.',
    description: 'Black sesame oil is celebrated in traditional Indian wellness as having higher calcium and iron density than white sesame. Pressed slowly in our cold-press Ghani by Ramesh Kolhu Wale from heirloom West Bengal black sesame seeds. Supreme for Ayurvedic therapeutic massage, nourishing hair follicles to delay premature greying, and deep bone-nourishing therapies.',
    price: 600,
    originalPrice: 750,
    rating: 4.9,
    reviewsCount: 112,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/mockups/black-sesame-oil/showcase.png',
    bottleImage: '/mockups/black-sesame-oil/bottle.png',
    showcaseImage: '/mockups/black-sesame-oil/showcase.png',
    additionalImages: ['/mockups/black-sesame-oil/bottle.png'],
    volumes: [
      { size: '200ml (PET bottle)', price: 135, originalPrice: 170, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 320, originalPrice: 390, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 600, originalPrice: 750, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 1160, originalPrice: 1420, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 2800, originalPrice: 3450, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 8100, originalPrice: 9800, packaging: 'Tin' }
    ],
    benefits: [
      'Concentrated Phytosterols: Penetrates deepest tissue layers (Majja Dhatu)',
      'Rich in Calcium, Iron & Magnesium for musculoskeletal support',
      'Ayurvedic Shirodhara & Scalp Nourishment: Restores hair luster and volume',
      'Single-pressed from pure native West Bengal black sesame seeds'
    ],
    processHighlight: 'Cold crushed at 12 RPM without friction heat.',
    smokePoint: '210°C',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '14g',
      mufa: '40g',
      pufa: '42g',
      cholesterol: '0mg',
      vitamins: 'Sesamin, Sesamol, Calcium & Iron'
    },
    extractionDetails: {
      method: 'Kacchi Ghani Cold Press',
      temperature: '< 35°C',
      rpm: '12 RPM',
      seedOrigin: 'Certified Single-Origin Black Sesame Farms (West Bengal)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Black Sesame Oil',
      adulteration: 'Negative for Any Mineral/Seed Adulterants',
      argemone: 'Negative',
      freeFattyAcid: '0.36%'
    }
  },

  // ─── 4. Wellness Rogan, Walnut, Flax & Artisanal Oils ───────────────────────
  {
    id: 'pure-badam-rogan-almond-oil',
    name: '100% Pure Mamra Badam Rogan (Sweet Almond Oil)',
    hindiName: 'शुद्ध मामरा बादाम का तेल (बादाम रोगन)',
    slug: 'pure-badam-rogan-almond-oil',
    category: 'oil',
    shortDesc: '100% pure sweet almond oil cold-pressed from premium edible Mamra kernels. For brain health, skin glow & infant care.',
    description: 'Gold in liquid form since 1981. Ramesh Kolhu Wale extracts this 100% Pure Badam Rogan slowly from premium edible Kashmiri Mamra sweet almonds without heat, preserving 100% of the active Vitamin E, riboflavin, and essential fatty acids. Used for centuries in Unani and Ayurvedic traditions to enhance memory, nourish brain cells, and soften skin. Completely food grade and chemical-free.',
    price: 520,
    originalPrice: 650,
    rating: 5.0,
    reviewsCount: 189,
    inStock: true,
    featured: true,
    bestSeller: true,
    image: '/mockups/mamra-almond-oil/showcase.png',
    bottleImage: '/mockups/mamra-almond-oil/bottle.png',
    showcaseImage: '/mockups/mamra-almond-oil/showcase.png',
    additionalImages: ['/mockups/mamra-almond-oil/bottle.png', '/images/badam_rogan.jpg'],
    volumes: [
      { size: '200ml (PET bottle)', price: 520, originalPrice: 650, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 1250, originalPrice: 1550, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 2400, originalPrice: 2950, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 4700, originalPrice: 5700, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 11400, originalPrice: 13500, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 31000, originalPrice: 36000, packaging: 'Tin' }
    ],
    benefits: [
      'Brain tonic: Rich in riboflavin & L-carnitine to boost memory and focus',
      'Skin Radiance: High natural Vitamin E deeply nourishes dry skin and fades dark circles',
      'Infant Massage: Gentle, hypoallergenic, strengthens delicate baby bones and muscles',
      'Digestive Ease: 1 teaspoon with warm milk relieves internal dryness and constipation'
    ],
    processHighlight: 'Cold-pressed at room temperature at only 10 RPM from premium Kashmiri sweet almond kernels.',
    smokePoint: '216°C (Primarily consumed raw or applied topically)',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '8.2g',
      mufa: '69.9g',
      pufa: '17.4g',
      cholesterol: '0mg',
      vitamins: 'Natural Vitamin E (26mg/100g)'
    },
    extractionDetails: {
      method: 'Ultra-Slow Cold Pressing',
      temperature: '< 30°C (Ambient Room Temperature)',
      rpm: '10 RPM',
      seedOrigin: 'Kashmir Valley Sweet Mamra Almonds',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Sweet Almond Oil (Zero Bitter Almond)',
      adulteration: 'Negative for Mineral Oil & Synthetic Scents',
      argemone: 'Negative',
      freeFattyAcid: '0.25%'
    }
  },
  {
    id: 'gurbandi-almond-oil',
    name: 'Cold-Pressed Gurbandi Almond Oil',
    hindiName: 'गुरबन्दी बादाम का शुद्ध तेल',
    slug: 'gurbandi-almond-oil',
    category: 'oil',
    shortDesc: 'Cold pressed from high-altitude Kashmiri Gurbandi almonds. Exceptional nutrient density and intense natural almond aroma.',
    description: 'Pressed from wild Kashmiri Gurbandi almonds by Ramesh Kolhu Wale. Gurbandi almonds have a smaller profile but boast a significantly higher natural oil content and concentrated antioxidants compared to standard commercial varieties. Revered for energy rejuvenation, daily memory tonic with milk, and natural winter warmth.',
    price: 380,
    originalPrice: 480,
    rating: 4.9,
    reviewsCount: 88,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/mockups/gurbandi-almond-oil/showcase.png',
    bottleImage: '/mockups/gurbandi-almond-oil/bottle.png',
    showcaseImage: '/mockups/gurbandi-almond-oil/showcase.png',
    additionalImages: ['/mockups/gurbandi-almond-oil/bottle.png'],
    volumes: [
      { size: '200ml (PET bottle)', price: 380, originalPrice: 480, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 920, originalPrice: 1150, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 1780, originalPrice: 2200, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 3480, originalPrice: 4250, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 8400, originalPrice: 10200, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 24500, originalPrice: 29000, packaging: 'Tin' }
    ],
    benefits: [
      'High natural oil concentration with potent phytonutrients',
      'Supports brain function, neurological endurance, and sound sleep',
      'Rich in natural antioxidants that fight oxidative cellular stress',
      '100% edible food grade, zero artificial coloring or essence'
    ],
    processHighlight: 'Single-pressed at low RPM from sorted Kashmiri Gurbandi kernels.',
    smokePoint: '216°C',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '8.4g',
      mufa: '68g',
      pufa: '18g',
      cholesterol: '0mg',
      vitamins: 'Natural Vitamin E, Riboflavin'
    },
    extractionDetails: {
      method: 'Slow Cold Press',
      temperature: '< 30°C',
      rpm: '10 RPM',
      seedOrigin: 'Kashmir High-Altitude Gurbandi Almonds',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Gurbandi Almond Oil',
      adulteration: 'Negative for Any Foreign Additives',
      argemone: 'Negative',
      freeFattyAcid: '0.28%'
    }
  },
  {
    id: 'cold-pressed-walnut-oil',
    name: 'Cold-Pressed Kashmiri Walnut Oil (अखरोट तेल)',
    hindiName: 'अखरोट का शुद्ध तेल (कश्मीरी अखरोट)',
    slug: 'cold-pressed-walnut-oil',
    category: 'oil',
    shortDesc: 'Plant-based Omega-3 superfood extracted from high-altitude whole Kashmiri walnut kernels. Nourishes brain & heart.',
    description: 'Extracted in small cold-press batches from prized Kashmiri walnuts by Ramesh Kolhu Wale. Boasts an exceptional concentration of Alpha-Linolenic Acid (ALA) and polyphenols for cardiovascular wellness, memory enhancement, and radiant skin elasticity. Delicious drizzled raw over gourmet salads and soups.',
    price: 280,
    originalPrice: 350,
    rating: 4.8,
    reviewsCount: 94,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/mockups/walnut-oil/showcase.png',
    bottleImage: '/mockups/walnut-oil/bottle.png',
    showcaseImage: '/mockups/walnut-oil/showcase.png',
    additionalImages: ['/mockups/walnut-oil/bottle.png'],
    volumes: [
      { size: '200ml (PET bottle)', price: 280, originalPrice: 350, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 660, originalPrice: 820, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 1280, originalPrice: 1580, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 2500, originalPrice: 3050, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 6100, originalPrice: 7400, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 17800, originalPrice: 21000, packaging: 'Tin' }
    ],
    benefits: [
      'Plant-based Omega-3 superfood for brain function & heart rhythm',
      'Rich in Neuro-Protective Antioxidants, Melatonin & Ellagitannins',
      'Gourmet delicate nutty aroma for healthy gourmet dressings',
      '100% mechanical cold extraction without chemical solvents'
    ],
    processHighlight: 'Cold-pressed at < 32°C from freshly shelled Kashmiri walnuts.',
    smokePoint: '160°C (Best consumed raw or for low-heat finishing)',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '9g',
      mufa: '22g',
      pufa: '65g (ALA 12%)',
      cholesterol: '0mg',
      vitamins: 'Omega-3 ALA, Vitamin E, Melatonin'
    },
    extractionDetails: {
      method: 'Slow Cold Press',
      temperature: '< 32°C',
      rpm: '10 RPM',
      seedOrigin: 'Wild Kashmiri Walnut Groves (Kashmir)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Virgin Walnut Oil',
      adulteration: 'Negative for Any Adulterants',
      argemone: 'Negative',
      freeFattyAcid: '0.30%'
    }
  },
  {
    id: 'cold-pressed-flax-seed-oil',
    name: 'Cold-Pressed Flax Seed Oil (अलसी का तेल)',
    hindiName: 'अलसी का शुद्ध तेल (कच्ची घानी)',
    slug: 'cold-pressed-flax-seed-oil',
    category: 'oil',
    shortDesc: 'Mother Nature\'s richest plant source of Alpha-Linolenic Acid (ALA Omega-3). Supports joints, heart & cellular vitality.',
    description: 'Pressed below 32°C from Madhya Pradesh organic brown flaxseeds. Never heated and unfiltered to preserve delicate lignans and essential omega-3 fatty acids that support cellular vitality and joint flexibility. Golden amber oil with earthy nutty flavor.',
    price: 95,
    originalPrice: 120,
    rating: 4.8,
    reviewsCount: 135,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/mockups/flax-seed-oil/showcase.png',
    bottleImage: '/mockups/flax-seed-oil/bottle.png',
    showcaseImage: '/mockups/flax-seed-oil/showcase.png',
    additionalImages: ['/mockups/flax-seed-oil/bottle.png'],
    volumes: [
      { size: '200ml (PET bottle)', price: 95, originalPrice: 120, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 225, originalPrice: 280, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 430, originalPrice: 540, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 840, originalPrice: 1040, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 2050, originalPrice: 2520, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 5900, originalPrice: 7200, packaging: 'Tin' }
    ],
    benefits: [
      'Over 55% Vegetarian Omega-3 Fatty Acids (ALA)',
      'Supports Joint Flexibility, Heart Rhythm, and Healthy Blood Pressure',
      'Raw and Unrefined: Retains natural protective lignans',
      'Single-pressed in small hygienic cold batches'
    ],
    processHighlight: 'Cold-pressed below 32°C from selected Madhya Pradesh flaxseeds.',
    smokePoint: '107°C (Strictly raw consumption only - do not heat)',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '9g',
      mufa: '18g',
      pufa: '73g (ALA 55%)',
      cholesterol: '0mg',
      vitamins: 'Alpha-Linolenic Acid (ALA), Lignans'
    },
    extractionDetails: {
      method: 'Ultra-Cold Pressing',
      temperature: '< 32°C',
      rpm: '10 RPM',
      seedOrigin: 'Organic Brown Flaxseed Fields (Madhya Pradesh)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Virgin Flaxseed Oil',
      adulteration: 'Negative for Any Foreign Oils',
      argemone: 'Negative',
      freeFattyAcid: '0.40%'
    }
  },
  {
    id: 'cold-pressed-extra-virgin-olive-oil',
    name: 'Cold-Pressed Extra Virgin Olive Oil (जैतून तेल)',
    hindiName: 'एक्स्ट्रा वर्जिन जैतून का शुद्ध तेल',
    slug: 'cold-pressed-extra-virgin-olive-oil',
    category: 'oil',
    shortDesc: 'Single-estate first mechanical cold press from select olive groves. Herbal fresh aroma with peppery antioxidant finish.',
    description: 'First mechanical cold extraction of handpicked olives harvested from select Indian olive groves and Mediterranean cultivars. Exhibits a fresh herbal green aroma with a distinct peppery finish, proving high oleocanthal and polyphenol content. Perfect for salads, Mediterranean bowls, and drizzling over warm rotis.',
    price: 220,
    originalPrice: 280,
    rating: 4.9,
    reviewsCount: 156,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/mockups/olive-oil/showcase.png',
    bottleImage: '/mockups/olive-oil/bottle.png',
    showcaseImage: '/mockups/olive-oil/showcase.png',
    additionalImages: ['/mockups/olive-oil/bottle.png'],
    volumes: [
      { size: '200ml (PET bottle)', price: 220, originalPrice: 280, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 520, originalPrice: 650, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 980, originalPrice: 1220, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 1920, originalPrice: 2380, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 4650, originalPrice: 5700, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 13500, originalPrice: 16200, packaging: 'Tin' }
    ],
    benefits: [
      'Ultra-low Acidity (<0.5% Free Fatty Acids)',
      'High Oleic Acid and Potent Natural Antioxidants (Polyphenols)',
      'First Mechanical Cold Extraction, Zero Chemical Solvents',
      'Fresh grassy aroma and peppery throat finish'
    ],
    processHighlight: 'First cold mechanical extraction at < 27°C within 12 hours of harvest.',
    smokePoint: '190°C',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '14g',
      mufa: '73g',
      pufa: '11g',
      cholesterol: '0mg',
      vitamins: 'Natural Vitamin E, Polyphenols'
    },
    extractionDetails: {
      method: 'First Mechanical Cold Extraction',
      temperature: '< 27°C',
      rpm: 'Centrifugal cold decanter',
      seedOrigin: 'Single-Estate Cold Extraction, Rajasthan & Mediterranean Groves',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Extra Virgin Grade',
      adulteration: 'Negative for Pomace or Refined Oils',
      argemone: 'Negative',
      freeFattyAcid: '0.28%'
    }
  },
  {
    id: 'cold-pressed-onion-oil',
    name: 'Cold-Pressed Pure Onion Oil (प्याज का तेल)',
    hindiName: 'प्याज का शुद्ध तेल (महाराष्ट्र प्याज बीज)',
    slug: 'cold-pressed-onion-oil',
    category: 'oil',
    shortDesc: 'Pressed from Maharashtra onion seeds (Kalonji/Pyaj beej). Rich in sulfur, potassium & antioxidants for hair density.',
    description: 'Cold-pressed from genuine native Maharashtra onion seeds (Allium cepa) by Ramesh Kolhu Wale. Naturally rich in sulfur, potassium, and active quercetin, onion seed oil stimulates dormant hair follicles, reduces seasonal hair fall, and restores scalp balance. 100% pure cold-pressed with zero liquid paraffin or synthetic fragrances.',
    price: 140,
    originalPrice: 180,
    rating: 4.9,
    reviewsCount: 210,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/mockups/onion-oil/showcase.png',
    bottleImage: '/mockups/onion-oil/bottle.png',
    showcaseImage: '/mockups/onion-oil/showcase.png',
    additionalImages: ['/mockups/onion-oil/bottle.png'],
    volumes: [
      { size: '200ml (PET bottle)', price: 140, originalPrice: 180, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 330, originalPrice: 410, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 620, originalPrice: 780, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 1200, originalPrice: 1480, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 2900, originalPrice: 3600, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 8400, originalPrice: 10200, packaging: 'Tin' }
    ],
    benefits: [
      'Rich in Natural Bio-Active Sulfur: Strengthens hair roots and prevents breakage',
      'Potassium & Antioxidants: Revitalizes scalp and reduces dandruff flakes',
      '100% Cold-Pressed Seed Extract: Zero mineral oil, zero artificial perfumes',
      'Dual-use: Nourishing scalp oil and edible herbal dressing'
    ],
    processHighlight: 'Cold-pressed at 12 RPM from sun-dried Nashik onion seeds.',
    smokePoint: '180°C',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '15g',
      mufa: '45g',
      pufa: '38g',
      cholesterol: '0mg',
      vitamins: 'Natural Sulfur Compounds, Quercetin, Vitamin E'
    },
    extractionDetails: {
      method: 'Kacchi Ghani Cold Press',
      temperature: '< 34°C',
      rpm: '12 RPM',
      seedOrigin: 'Nashik Native Onion Seeds (Maharashtra)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Cold-Pressed Onion Seed Oil',
      adulteration: 'Negative for Mineral Oil & Synthetic Scents',
      argemone: 'Negative',
      freeFattyAcid: '0.35%'
    }
  },
  {
    id: 'cold-pressed-sunflower-oil',
    name: 'Cold-Pressed Sunflower Oil (सूरजमुखी तेल)',
    hindiName: 'सूरजमुखी का शुद्ध तेल (कच्ची घानी)',
    slug: 'cold-pressed-sunflower-oil',
    category: 'oil',
    shortDesc: 'Light golden, non-greasy cooking oil cold pressed from Karnataka sunflower seeds. High Vitamin E for light healthy meals.',
    description: 'Cold-pressed by Ramesh Kolhu Wale from non-GMO, sun-drenched Karnataka sunflower seeds. Naturally light, neutral, and clear, it allows the authentic flavors of vegetables and curries to shine without greasy residue. Exceptionally rich in Vitamin E and heart-healthy polyunsaturated fatty acids (PUFA).',
    price: 90,
    originalPrice: 115,
    rating: 4.8,
    reviewsCount: 168,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/mockups/sunflower-oil/showcase.png',
    bottleImage: '/mockups/sunflower-oil/bottle.png',
    showcaseImage: '/mockups/sunflower-oil/showcase.png',
    additionalImages: ['/mockups/sunflower-oil/bottle.png'],
    volumes: [
      { size: '200ml (PET bottle)', price: 90, originalPrice: 115, packaging: 'PET bottle' },
      { size: '500ml (PET bottle)', price: 210, originalPrice: 265, packaging: 'PET bottle' },
      { size: '1L (PET bottle)', price: 390, originalPrice: 490, packaging: 'PET bottle' },
      { size: '2L (PET bottle)', price: 760, originalPrice: 940, packaging: 'PET bottle' },
      { size: '5L (PET bottle)', price: 1850, originalPrice: 2300, packaging: 'PET bottle' },
      { size: '15kg (Tin)', price: 5300, originalPrice: 6500, packaging: 'Tin' }
    ],
    benefits: [
      'Exceptionally High in Natural Vitamin E: Powerful cellular antioxidant',
      'Ultra-light & non-sticky: Absorbs minimal oil during everyday frying',
      'Balanced Omega-6 & MUFA profile for active cardiovascular health',
      'Chemical-free: No hexane, no bleaching clays, zero artificial deodorizers'
    ],
    processHighlight: 'Cold-pressed at 13 RPM from dehulled Karnataka sunflower seeds.',
    smokePoint: '225°C',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '10g',
      mufa: '30g',
      pufa: '58g',
      cholesterol: '0mg',
      vitamins: 'Natural Vitamin E (41mg/100g)'
    },
    extractionDetails: {
      method: 'Kacchi Ghani Cold Press',
      temperature: '< 36°C',
      rpm: '13 RPM',
      seedOrigin: 'Sun-Drenched Sunflower Fields (Karnataka)',
      pressType: 'Traditional Cold Press'
    },
    labReportSummary: {
      purity: '100% Pure Virgin Sunflower Oil',
      adulteration: 'Negative for Any Mineral/Foreign Fats',
      argemone: 'Negative',
      freeFattyAcid: '0.32%'
    }
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products', hindi: 'सभी उत्पाद' },
  { id: 'oil', name: 'Cold-Pressed Oils', hindi: 'शुद्ध कोल्ड-प्रेस्ड तेल' },
  { id: 'bilona-ghee', name: 'Bilona Ghee', hindi: 'शुद्ध देसी व बिलोना घी' },
];

export const FAQS = [
  {
    q: 'What is the promise of "Ramesh Kolhu Wale (RKW)"?',
    a: 'At Ramesh Kolhu Wale, we practice 100% open, transparent cold extraction since 1981. You are welcome to walk into our Units anytime between 10:00 AM and 10:00 PM, inspect our raw seeds, watch them being slowly pressed in our Kolhus at under 38°C, and receive warm, fresh oil bottled right before your eyes. Our motto: "अनुभव चार पीढ़ियों का, स्वाद हर पीढ़ी का" (Experience of 4 generations, taste for every generation).'
  },
  {
    q: 'Why should I choose Cold-Pressed over Refined Oils?',
    a: 'Industrial refined oils are subjected to extreme heat (>200°C) and treated with harsh chemical solvents like Hexane, caustic soda bleach, and artificial deodorizers, stripping away all natural vitamins. RKW cold-press kolhus crush seeds slowly at room temperature (<38°C) without friction heat, preserving natural aroma, golden color, antioxidants, and authentic health benefits.'
  },
  {
    q: 'What types of Ghee are available at Ramesh Kolhu Wale?',
    a: 'We offer 4 authentic types of Ghee: 1) Desi Cow Ghee, 2) Desi Buffalo Ghee, 3) Dahi Bilona Desi Cow Ghee, and 4) Dahi Bilona Desi Buffalo Ghee. All are available in 500ml and 1L PET bottles, crafted with pure milkfat and zero preservatives.'
  },
  {
    q: 'What are the packing sizes available for Oils and Ghee?',
    a: 'Oils are available in 200ml (PET bottle), 500ml (PET bottle), 1L (PET bottle), 2L (PET bottle), 5L (PET bottle), and 15kg (Tin). Ghee is available in 500ml (PET bottle) and 1L (PET bottle).'
  },
  {
    q: 'Can I visit the Ramesh Kolhu Wale Units or order via WhatsApp?',
    a: 'Yes, absolutely! We have 4 Units across Delhi NCR: Khureji Khas (Unit-01), New Ashok Nagar (Unit-02), Maujpur (Unit-03), and Karawal Nagar (Unit-04). Open everyday from 10:00 AM to 10:00 PM. You can also call or WhatsApp us on +91 9217744378 or +91 9217744379 for fast home delivery across Delhi NCR (Free delivery above ₹799, ₹100 below ₹799).'
  }
];
