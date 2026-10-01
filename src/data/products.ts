import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: 'yellow-mustard-oil',
    name: 'Pure Wood-Pressed Yellow Mustard Oil',
    hindiName: 'पीली सरसों का शुद्ध तेल (रमेश कोल्हू वाले)',
    slug: 'yellow-mustard-oil',
    category: 'mustard-oils',
    shortDesc: 'Cold pressed in traditional wooden Kolhu (Lakdi Ki Ghani). Mild, pungent aroma with high natural antioxidants.',
    description: 'Extracted slowly in our authentic wooden Kolhu (Lakdi Ki Ghani) in front of your eyes at less than 38°C. Made exclusively from select Rajasthani native yellow mustard seeds (Pili Sarson) supervised by Ramesh Kolhu Wale. Yellow mustard oil is naturally sweeter, milder, and retains all vital omega-3 fatty acids without the overpowering burn of chemical-refined oils. Ideal for daily Indian curries, pickle preserving, and deep frying.',
    price: 360,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 412,
    inStock: true,
    featured: true,
    bestSeller: true,
    image: '/images/yellow_mustard.jpg',
    additionalImages: ['/images/process_live.jpg', '/images/hero.jpg'],
    volumes: [
      { size: '500ml', price: 190, originalPrice: 240, packaging: 'Dark Glass Bottle' },
      { size: '1 Liter', price: 360, originalPrice: 450, packaging: 'Premium Food-Grade Glass Bottle' },
      { size: '2 Liters', price: 690, originalPrice: 850, packaging: 'Leak-Proof Steel/Tin Container' },
      { size: '5 Liters', price: 1650, originalPrice: 2100, packaging: 'Heritage Food-Grade Eco Tin' }
    ],
    benefits: [
      'Heart friendly: Rich in Monounsaturated Fatty Acids (MUFA) and Omega-3 & 6',
      'Extracted at <38°C: Zero heat damage, preserving natural Vitamin E & Allyl Isothiocyanate',
      'Mild Golden Pungency: Perfect appetizing aroma for daily cooking, sabzis & dals',
      'Zero chemicals, zero palm oil, zero argemone adulteration'
    ],
    processHighlight: 'Cold-pressed at 14 RPM in traditional Marachekku / Lakdi Ghani without any chemical refining or high-temperature heating.',
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
      method: 'Lakdi Ki Ghani (Traditional Wooden Cold Press)',
      temperature: 'Always kept below 38°C',
      rpm: '12 - 14 RPM (Slow Rotation)',
      seedOrigin: 'Single-source Organic Farms, Alwar (Rajasthan)',
      woodType: 'Waghai & Neem Wood Pestle'
    },
    labReportSummary: {
      purity: '100% Pure Virgin Grade',
      adulteration: 'Negative for Mineral Oil & Palm Oil',
      argemone: 'Negative (TLC method)',
      freeFattyAcid: '0.42% (Standard < 1.5%)'
    }
  },
  {
    id: 'black-mustard-oil',
    name: 'Traditional Wood-Pressed Black Mustard Oil',
    hindiName: 'काली सरसों का शुद्ध तेल (कच्ची घानी)',
    slug: 'black-mustard-oil',
    category: 'mustard-oils',
    shortDesc: 'Authentic robust, zesty aroma. Slow-pressed for traditional North Indian pickles, winter body massage & bold tadka.',
    description: 'The quintessential North Indian kitchen soul. Sourced from high-pungency black mustard seeds (Kali Sarson) crushed in our wooden Kolhu by Ramesh Kolhu Wale. The slow wood pressing retains natural sinigrin which releases the quintessential pungent, eye-watering sharpness true mustard connoisseurs crave. Perfect for achaar (pickles), fish curries, and comforting infant/adult joint massages.',
    price: 340,
    originalPrice: 420,
    rating: 4.8,
    reviewsCount: 324,
    inStock: true,
    featured: true,
    bestSeller: false,
    image: '/images/black_mustard.jpg',
    additionalImages: ['/images/process_live.jpg'],
    volumes: [
      { size: '500ml', price: 180, originalPrice: 220, packaging: 'Dark Amber Glass Bottle' },
      { size: '1 Liter', price: 340, originalPrice: 420, packaging: 'Heavy Glass Bottle' },
      { size: '2 Liters', price: 650, originalPrice: 800, packaging: 'Metal Tin' },
      { size: '5 Liters', price: 1550, originalPrice: 1950, packaging: 'Traditional 5L Metal Can' }
    ],
    benefits: [
      'High natural pungency: Boosts digestion and stimulates gastric juices',
      'Strong antimicrobial & antifungal properties: Keeps pickles fresh for years',
      'Traditional Ayurvedic massage: Relieves joint stiffness, winter cold, and muscular fatigue',
      'Raw, unrefined, and sediment-filtered through cotton cloth only'
    ],
    processHighlight: 'Extracted slowly drop-by-drop in front of your eyes. Zero artificial essence or colorants added.',
    smokePoint: '254°C',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '12g',
      mufa: '60g',
      pufa: '28g',
      cholesterol: '0mg',
      vitamins: 'Rich in Tocopherols (Vitamin E)'
    },
    extractionDetails: {
      method: 'Lakdi Ka Kolhu (Wood Pestle Churning)',
      temperature: '< 36°C',
      rpm: '14 RPM',
      seedOrigin: 'Bharatpur & Morena certified farms',
      woodType: 'Sacred Neem & Babool wood'
    },
    labReportSummary: {
      purity: '100% Single Origin Black Mustard',
      adulteration: 'Zero chemical residue',
      argemone: 'Negative',
      freeFattyAcid: '0.38%'
    }
  },
  {
    id: 'vedic-a2-bilona-gir-cow-ghee',
    name: 'Vedic A2 Gir Cow Bilona Desi Ghee',
    hindiName: 'शुद्ध वैदिक A2 गिर गाय बिलोना देसी घी (मंथन विधि)',
    slug: 'vedic-a2-bilona-gir-cow-ghee',
    category: 'bilona-ghee',
    shortDesc: 'Prepared using ancient 5-samskara Bilona method. Cultured curd hand-churned in clay pots. Golden, granular & aromatic.',
    description: 'True Ayurvedic liquid gold crafted by Ramesh Kolhu Wale following the authentic 5000-year-old Vedic Bilona method. Free-grazing desi Gir cows milk is boiled on slow cow dung wood fire, naturally set into whole curd in clay pots, and churned bidirectionally with a wooden mathani to extract fresh makkhan (cultured butter). The butter is then slowly simmered to yield fragrant, golden, danedar (granular) A2 Ghee that nourishes body, brain, and soul.',
    price: 1450,
    originalPrice: 1800,
    rating: 5.0,
    reviewsCount: 578,
    inStock: true,
    featured: true,
    bestSeller: true,
    image: '/images/bilona_ghee.jpg',
    additionalImages: ['/images/bilona_tradition.jpg', '/images/hero.jpg'],
    volumes: [
      { size: '250ml', price: 420, originalPrice: 520, packaging: 'Heritage Glass Jar' },
      { size: '500ml', price: 780, originalPrice: 950, packaging: 'Heritage Glass Jar' },
      { size: '1 Liter', price: 1450, originalPrice: 1800, packaging: 'Sealed Cork & Glass Jar' },
      { size: '2 Liters', price: 2800, originalPrice: 3500, packaging: 'Twin Glass Pack + Wooden Spoon' }
    ],
    benefits: [
      'Authentic A2 Beta-Casein Protein: Easily digestible even for lactose-sensitive individuals',
      'Granular (Danedar) Golden Texture: Naturally packed with Butyric Acid for superior gut health',
      'Ayurvedic Medhya Rasayana: Enhances memory (Smriti), intelligence (Dhi), and vitality (Ojas)',
      '100% Cultured Curd Butter (Makhan) source, never made from industrial cream separator'
    ],
    processHighlight: 'Handmade in small batches in earthen terracotta pots. 28-30 liters of pure A2 Gir Cow milk produces just 1 liter of this nectar.',
    smokePoint: '252°C (One of the safest healthy fats for high-heat cooking)',
    nutritionalInfo: {
      energy: '897 kcal / 100g',
      fat: '99.8g',
      saturatedFat: '62g (Short & Medium Chain Triglycerides)',
      mufa: '28g',
      pufa: '4g',
      cholesterol: '180mg / 100g',
      vitamins: 'Natural Vitamin A, D, E, K2 and CLA'
    },
    extractionDetails: {
      method: '5-Step Vedic Bilona Churning (Mathani Churn)',
      temperature: 'Slow simmered on traditional chulha',
      rpm: 'Slow manual/bi-directional churn',
      seedOrigin: 'Desi Gir Gaushalas with free-grazing grass feed',
      woodType: 'Natural Teak Wood Mathani'
    },
    labReportSummary: {
      purity: '100% Pure A2 Cow Ghee',
      adulteration: 'No vegetable fat or animal fat residue',
      argemone: 'Negative',
      freeFattyAcid: '0.18%'
    }
  },
  {
    id: 'pure-buffalo-bilona-desi-ghee',
    name: 'Pure Murrah Buffalo Bilona Desi Ghee',
    hindiName: 'शुद्ध मुर्राह भैंस का बिलोना देसी घी (ताज़ा माखन से निर्मित)',
    slug: 'pure-buffalo-bilona-desi-ghee',
    category: 'bilona-ghee',
    shortDesc: 'Rich, creamy and power-packed. Prepared by churning cultured Murrah buffalo curd in earthen matkas. Ideal for athletes.',
    description: 'Beloved by traditional Indian pehelwans (wrestlers) and growing children. Made from rich, thick A2-grade whole milk of pasture-grazed Murrah buffaloes. Slow-cooked from cultured curd butter by Ramesh Kolhu Wale, it has an irresistible creamy aroma, bright white-to-ivory granules, and extraordinary strength-giving nourishment.',
    price: 950,
    originalPrice: 1200,
    rating: 4.8,
    reviewsCount: 215,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/images/bilona_tradition.jpg',
    additionalImages: ['/images/bilona_ghee.jpg'],
    volumes: [
      { size: '500ml', price: 520, originalPrice: 650, packaging: 'Clay-Tone Glass Jar' },
      { size: '1 Liter', price: 950, originalPrice: 1200, packaging: 'Airtight Glass Jar' },
      { size: '2 Liters', price: 1850, originalPrice: 2300, packaging: 'Airtight Glass Jars (2x1L)' }
    ],
    benefits: [
      'Rich in Calcium, Phosphorus & Healthy Fats for bone density and physical stamina',
      'Deep, long-lasting satiety and stamina for athletes, growing teenagers & heavy workouts',
      'Prepared strictly from whole curd churning, not from industrial separated malai/cream',
      'Zero preservatives, zero chemicals, pure traditional aroma'
    ],
    processHighlight: 'Traditional curd fermentation followed by slow wood-fired clarification.',
    smokePoint: '250°C',
    nutritionalInfo: {
      energy: '900 kcal / 100g',
      fat: '99.9g',
      saturatedFat: '65g',
      mufa: '26g',
      pufa: '3.5g',
      cholesterol: '210mg / 100g',
      vitamins: 'High in natural Vitamin A & Minerals'
    },
    extractionDetails: {
      method: 'Clay Pot Bilona Mathani Churning',
      temperature: 'Gentle wood flame boiling',
      rpm: 'Manual bi-directional rotation',
      seedOrigin: 'Haryana Pasturelands Murrah Cattle',
      woodType: 'Neem Churner'
    },
    labReportSummary: {
      purity: '100% Pure Buffalo Milkfat',
      adulteration: 'Zero vegetable wax / palm stearin',
      argemone: 'Negative',
      freeFattyAcid: '0.22%'
    }
  },
  {
    id: 'pure-badam-rogan-almond-oil',
    name: '100% Pure Badam Rogan (Sweet Almond Oil)',
    hindiName: 'शुद्ध बादाम रोगन (100% मीठा बादाम तेल)',
    slug: 'pure-badam-rogan-almond-oil',
    category: 'wellness-rogan',
    shortDesc: 'Single-press extra-virgin sweet almond oil from Mamra & California almonds. Edible, therapeutic & nourishing.',
    description: 'Gold standard elixir for neural health, radiant skin, and silky hair. Extracted without heat from grade-A sweet almonds (Prunus Dulcis) by Ramesh Kolhu Wale. Unlike cosmetic synthetic oils packed with mineral paraffin, RKW Badam Rogan is 100% pure food-grade. Drink 5-10 drops with warm milk at night for sharp memory and peaceful sleep, or apply topically for glowing skin and healthy scalp.',
    price: 490,
    originalPrice: 650,
    rating: 4.9,
    reviewsCount: 288,
    inStock: true,
    featured: true,
    bestSeller: true,
    image: '/images/badam_rogan.jpg',
    additionalImages: ['/images/hero.jpg'],
    volumes: [
      { size: '50ml', price: 280, originalPrice: 350, packaging: 'Amber Glass Bottle with Glass Dropper' },
      { size: '100ml', price: 490, originalPrice: 650, packaging: 'Amber Glass Bottle with Precision Dropper' },
      { size: '200ml', price: 890, originalPrice: 1190, packaging: 'Luxury Dropper Pack' }
    ],
    benefits: [
      '100% Pure & Edible: Can be taken orally with warm milk for memory and immunity',
      'Rich in Natural Biotin & Vitamin E: Deeply repairs hair cuticles and prevents dry scalp',
      'Under-eye Dark Circle Eraser: Pure gentle nourishment for delicate skin',
      'Zero liquid paraffin, zero synthetic perfume, zero chemical additives'
    ],
    processHighlight: 'Cold-pressed drop by drop through slow hydraulic wooden press to ensure all essential fatty acids remain unbroken.',
    smokePoint: '221°C',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '9g',
      mufa: '70g (Oleic Acid)',
      pufa: '21g (Linoleic Acid)',
      cholesterol: '0mg',
      vitamins: 'Exceptional Natural Vitamin E (Alpha-tocopherol)'
    },
    extractionDetails: {
      method: 'Slow Hydraulic Cold Pressing',
      temperature: '< 30°C (Ambient Room Temperature)',
      rpm: '10 RPM',
      seedOrigin: 'Grade-A Mamra & California Sweet Almonds',
      woodType: 'Food-grade stainless & teak press'
    },
    labReportSummary: {
      purity: '100% Pure Sweet Almond Oil',
      adulteration: 'Negative for Mineral Oil and Peanut Oil',
      argemone: 'Negative',
      freeFattyAcid: '0.25%'
    }
  },
  {
    id: 'wood-pressed-coconut-oil',
    name: 'Wood-Pressed Virgin Coconut Oil',
    hindiName: 'शुद्ध कच्ची घानी नारियल तेल (कोल्हू निर्मित)',
    slug: 'wood-pressed-coconut-oil',
    category: 'nut-seed-oils',
    shortDesc: 'Made from sun-dried sulfur-free copra in wooden ghani. Sweet natural coconut aroma. Raw, unrefined & unbleached.',
    description: 'Experience the pure tropical magic of Kerala sun-dried coconuts, pressed in our wooden Ghani by Ramesh Kolhu Wale without heat or chemical deodorizers. In winters, it naturally solidifies into a pristine snow-white butter, proving its unrefined purity. Ideal for South Indian delicacies, bulletproof keto coffee, baby skin massage, and deep conditioning oil bath.',
    price: 380,
    originalPrice: 475,
    rating: 4.8,
    reviewsCount: 198,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/images/coconut_oil.jpg',
    additionalImages: ['/images/hero.jpg'],
    volumes: [
      { size: '500ml', price: 210, originalPrice: 260, packaging: 'Wide-Mouth Glass Jar' },
      { size: '1 Liter', price: 380, originalPrice: 475, packaging: 'Wide-Mouth Glass Jar' },
      { size: '2 Liters', price: 720, originalPrice: 900, packaging: 'Food-Grade Tin Container' }
    ],
    benefits: [
      'High in MCTs (Medium Chain Triglycerides) & Lauric Acid: Instant energy and immunity',
      'Zero heat treatment: Retains 100% coconut enzymes and natural sweet aroma',
      'All-natural moisturizer: Heals dry skin, eczema, cradle cap and cracked heels',
      'Unrefined & raw: Natural winter solidification proves genuine cold pressed purity'
    ],
    processHighlight: 'Sulfur-free sun-dried Kerala copra pressed in neem wood Ghani at 14 RPM.',
    smokePoint: '177°C',
    nutritionalInfo: {
      energy: '892 kcal / 100g',
      fat: '99.5g',
      saturatedFat: '87g (50% Lauric Acid)',
      mufa: '6g',
      pufa: '2g',
      cholesterol: '0mg',
      vitamins: 'Natural Vitamin E and Polyphenols'
    },
    extractionDetails: {
      method: 'Lakdi Ki Ghani (Cold Wooden Press)',
      temperature: '< 35°C',
      rpm: '14 RPM',
      seedOrigin: 'Kozhikode & Malabar Sun-Dried Copra',
      woodType: 'Sacred Neem & Vagai Wood'
    },
    labReportSummary: {
      purity: '100% Virgin Coconut Oil',
      adulteration: 'Negative for Mineral Oil & Liquid Paraffin',
      argemone: 'Negative',
      freeFattyAcid: '0.15%'
    }
  },
  {
    id: 'wood-pressed-white-sesame-oil',
    name: 'Wood-Pressed White Sesame Oil (Til Ka Tel)',
    hindiName: 'सफेद तिल का शुद्ध तेल (कच्ची काष्ठ घानी)',
    slug: 'wood-pressed-white-sesame-oil',
    category: 'nut-seed-oils',
    shortDesc: 'Ayurveda’s supreme healing oil (Taila). Cold pressed from Gujarat white sesame seeds. High calcium & zinc.',
    description: 'In Charaka Samhita, sesame oil is revered as the king of all oils (Sarva Taila Pravara). Extracted slowly in Ramesh Kolhu Wale traditional wooden ghani without toasting or bleaching. Rich in natural sesamin and sesamolin, it offers exceptional anti-inflammatory benefits, calms Vata dosha, and imparts delicate nutty depth to Asian cuisine, tadkas, and daily Abhyanga oil self-massage.',
    price: 420,
    originalPrice: 520,
    rating: 4.9,
    reviewsCount: 165,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/images/sesame_oil.jpg',
    additionalImages: ['/images/process_live.jpg'],
    volumes: [
      { size: '500ml', price: 230, originalPrice: 285, packaging: 'Dark Amber Glass Bottle' },
      { size: '1 Liter', price: 420, originalPrice: 520, packaging: 'Heavy Glass Bottle' },
      { size: '2 Liters', price: 810, originalPrice: 990, packaging: 'Food-Grade Tin' }
    ],
    benefits: [
      'Ayurvedic King of Oils: The most penetrating oil for strengthening bones and joints',
      'Rich in Sesamin & Sesamolin: Exceptional natural heart and arterial antioxidant support',
      'Oil Pulling Therapy (Gandusha): Cleanses oral bacteria, whitens teeth, strengthens gums',
      'Zero blending with cheap cottonseed or palm oils'
    ],
    processHighlight: 'Cold-pressed from handpicked Saurashtra organic white sesame seeds at under 36°C.',
    smokePoint: '210°C',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '14.2g',
      mufa: '39.7g',
      pufa: '41.7g (Omega-6)',
      cholesterol: '0mg',
      vitamins: 'Natural Vitamin E, Sesamin, Calcium Trace'
    },
    extractionDetails: {
      method: 'Lakdi Ki Ghani (Slow Wooden Press)',
      temperature: '< 36°C',
      rpm: '13 RPM',
      seedOrigin: 'Saurashtra Organic Farming Clusters',
      woodType: 'Vagai & Neem Wood Pestle'
    },
    labReportSummary: {
      purity: '100% Pure Virgin White Sesame Oil',
      adulteration: 'Negative for Mineral & Synthetic Oil',
      argemone: 'Negative',
      freeFattyAcid: '0.40%'
    }
  },
  {
    id: 'wood-pressed-groundnut-oil',
    name: 'Wood-Pressed Groundnut Oil (Peanut Oil)',
    hindiName: 'मूंगफली का शुद्ध तेल (कच्ची घानी)',
    slug: 'wood-pressed-groundnut-oil',
    category: 'nut-seed-oils',
    shortDesc: 'Golden, nutty & wholesome. Cold pressed from Saurashtra red-skin peanuts. High smoke point, ideal for all daily frying.',
    description: 'The golden cooking pride of western and northern India. Pressed in our wooden Kolhu by Ramesh Kolhu Wale from sun-dried, sweet Saurashtra peanuts without high temperatures, chemical filtration or hexane solvents. It imparts a delightful, non-sticky aroma to puris, pakoras, sabzis, and everyday rotis, without burning or smoking.',
    price: 330,
    originalPrice: 410,
    rating: 4.8,
    reviewsCount: 230,
    inStock: true,
    featured: false,
    bestSeller: false,
    image: '/images/groundnut_oil.jpg',
    additionalImages: ['/images/process_live.jpg'],
    volumes: [
      { size: '500ml', price: 175, originalPrice: 220, packaging: 'Dark Amber Glass Bottle' },
      { size: '1 Liter', price: 330, originalPrice: 410, packaging: 'Heavy Glass Bottle' },
      { size: '2 Liters', price: 630, originalPrice: 790, packaging: 'Food-Grade Tin' },
      { size: '5 Liters', price: 1520, originalPrice: 1900, packaging: 'Heritage 5L Eco Tin' }
    ],
    benefits: [
      'High Smoke Point: Perfect for Indian frying, sauteing, and tempering without breaking down into toxic fumes',
      'Rich in Resveratrol: Powerful antioxidant that protects the heart and blood vessels',
      'Naturally Sweet Nutty Taste: Eliminates the greasy, heavy aftertaste of cheap commercial oils',
      'Unrefined: Filtered through natural micro-cloth, zero chemicals'
    ],
    processHighlight: 'Pressed from sun-dried, shell-cracked organic Gujarat peanuts at low RPM.',
    smokePoint: '232°C',
    nutritionalInfo: {
      energy: '884 kcal / 100g',
      fat: '100g',
      saturatedFat: '17g',
      mufa: '49g',
      pufa: '32g',
      cholesterol: '0mg',
      vitamins: 'Natural Vitamin E, Resveratrol'
    },
    extractionDetails: {
      method: 'Traditional Wooden Ghani',
      temperature: '< 38°C',
      rpm: '13 RPM',
      seedOrigin: 'Junagadh & Rajkot Organic Peanut Fields',
      woodType: 'Neem wood pestle'
    },
    labReportSummary: {
      purity: '100% Pure Virgin Groundnut Oil',
      adulteration: 'Negative for Palm, Soy & Mineral Oil',
      argemone: 'Negative',
      freeFattyAcid: '0.35%'
    }
  },
  {
    id: 'rkw-heritage-wellness-duo',
    name: 'RKW Royal Kitchen Wellness Duo (Peeli Sarson + A2 Bilona Ghee)',
    hindiName: 'आरकेडब्ल्यू रॉयल किचन वेलनेस कॉम्बो (1L पीली सरसों + 500g A2 बिलोना घी)',
    slug: 'rkw-heritage-wellness-duo',
    category: 'combos',
    shortDesc: 'The ultimate Indian kitchen wellness pair. 1L Pure Yellow Mustard Oil + 500ml Vedic A2 Gir Cow Bilona Ghee.',
    description: 'Transform your daily family nutrition with Ramesh Kolhu Wale’s signature bundle. Experience the pure joy of cooking daily meals in cold-pressed yellow mustard oil, while enriching morning rotis and bedtime milk with authentic hand-churned A2 Gir cow bilona ghee. Bundled at an exclusive family discount in our signature gift box.',
    price: 1050,
    originalPrice: 1400,
    rating: 5.0,
    reviewsCount: 184,
    inStock: true,
    featured: true,
    bestSeller: true,
    image: '/images/hero.jpg',
    additionalImages: ['/images/bilona_ghee.jpg', '/images/yellow_mustard.jpg'],
    volumes: [
      { size: 'Standard Combo Pack', price: 1050, originalPrice: 1400, packaging: '1L Glass Bottle + 500ml Glass Jar Box' },
      { size: 'Jumbo Family Pack', price: 2650, originalPrice: 3500, packaging: '2L Tin Peeli Sarson + 1L Glass Jar Ghee + Free Badam Rogan 50ml' }
    ],
    benefits: [
      'Complete Kitchen Upgrade: Replaces all harmful refined cooking oils and commercial butter',
      'Dual Power of Vedic Nutrition: Ayurvedic healing ghee + Heart-protective wood-pressed oil',
      'Includes complimentary brass pouring spout and recipe booklet of traditional remedies',
      'Extra 25% savings compared to buying individual bottles'
    ],
    processHighlight: 'Both products pressed and churned fresh every morning in our Ramesh Kolhu Wale center.',
    smokePoint: 'High Stability for all Indian cuisine',
    nutritionalInfo: {
      energy: 'Comprehensive Balanced Healthy Fats',
      fat: '100% Unadulterated Plant & Dairy Lipid Matrix',
      saturatedFat: 'Optimal Vedic Ratio',
      mufa: 'High MUFA & Omega-3',
      pufa: 'Balanced',
      cholesterol: 'Natural beneficial lipid profile',
      vitamins: 'Vitamins A, D, E, K2, CLA'
    },
    extractionDetails: {
      method: 'Wood Kolhu + Terracotta Bilona Churn',
      temperature: 'Cold extracted below 38°C',
      rpm: 'Slow speed artisanal production',
      seedOrigin: 'Certified Rajasthani Yellow Mustard & Gir Gaushala',
      woodType: 'Sacred Neem & Teak'
    },
    labReportSummary: {
      purity: '100% Guaranteed Zero Chemical Residue',
      adulteration: 'Negative for all adulterants',
      argemone: 'Negative',
      freeFattyAcid: 'Under 0.3%'
    }
  }
];

export const CATEGORIES = [
  { id: 'all', name: 'All Products', hindi: 'सभी शुद्ध उत्पाद' },
  { id: 'mustard-oils', name: 'Mustard Oils (सरसों तेल)', hindi: 'पीली व काली सरसों का तेल' },
  { id: 'bilona-ghee', name: 'Vedic Bilona Ghee', hindi: 'शुद्ध बिलोना देसी घी' },
  { id: 'nut-seed-oils', name: 'Nut & Seed Oils', hindi: 'नारियल, तिल व मूंगफली तेल' },
  { id: 'wellness-rogan', name: 'Badam Rogan & Wellness', hindi: 'शुद्ध बादाम रोगन' },
  { id: 'combos', name: 'Heritage Combos', hindi: 'किचन बचत कॉम्बो' }
];

export const FAQS = [
  {
    q: 'What is the promise of "Ramesh Kolhu Wale (RKW)"?',
    a: 'At Ramesh Kolhu Wale, we practice 100% open, transparent cold extraction. You are welcome to walk into our workshops anytime between 8 AM and 8 PM, inspect our organic raw seeds, watch them being slowly pressed in our wooden Kolhus (Lakdi ki Ghani) at under 38°C, and receive warm, fresh oil bottled right before your eyes. Ramesh Ji’s motto has always been: "शुद्धता और स्वाद, हर बूँद में विश्वास" (Purity & taste, trust in every drop).'
  },
  {
    q: 'Why should I choose Wood-Pressed (Lakdi Ki Ghani) over Refined Oils?',
    a: 'Industrial refined oils are subjected to extreme heat (>200°C) and treated with harsh chemical solvents like Hexane, caustic soda bleach, and artificial deodorizers, stripping away all natural vitamins and creating harmful trans fats. RKW wooden kolhus crush seeds slowly at room temperature (<38°C) without friction heat. This preserves the natural aroma, golden color, antioxidants, and cellular health benefits of the seeds.'
  },
  {
    q: 'What is the Vedic 5-Step Bilona Method for Desi Ghee?',
    a: 'Commercial ghee is made in seconds by heating industrial cream separated by centrifuges. In contrast, Vedic Bilona requires 5 sacred steps: 1) Boil fresh A2 Gir cow milk over slow wood fire, 2) Naturally ferment it into whole curd in clay pots, 3) Churn the curd bi-directionally using a wooden mathani to yield fresh makkhan (cultured butter), 4) Gently simmer the butter into golden aromatic ghee, and 5) Strain through natural muslin cloth into glass jars. It takes ~30 liters of pure milk to make just 1 liter of our A2 Bilona Ghee.'
  },
  {
    q: 'What is the difference between Yellow Mustard and Black Mustard Oil?',
    a: 'Yellow Mustard Oil (Pili Sarson) is milder, naturally sweeter, and has a softer aroma, making it versatile for all daily cooking, shallow frying, and dals. Black Mustard Oil (Kali Sarson) has a much stronger, pungent kick and eye-watering aroma, making it the supreme choice for traditional pickles (achaar), North Indian winter dishes, and deep therapeutic body/joint massage.'
  },
  {
    q: 'Can I visit the Ramesh Kolhu Wale workshop or get live video extraction?',
    a: 'Yes, absolutely! We are located in Delhi NCR. You can call or WhatsApp us on +91 98112 54321 to schedule a personal visit or request a live video call while your batch of oil or bilona ghee is being extracted and bottled.'
  }
];
