import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppOrderButton } from "@/components/WhatsAppOrderButton";
import Preloader from "@/components/ui/preloader";

const siteUrl = "https://rameshkolhuwale.com";

export const viewport: Viewport = {
  themeColor: "#0E2A47",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ramesh Kolhu Wale (RKW) | Pure Cold-Pressed Oils & Authentic Vedic Bilona Ghee Delhi NCR",
    template: "%s | Ramesh Kolhu Wale (RKW)",
  },
  description:
    "Ramesh Kolhu Wale (RKW) — Est. 1981. India's trusted brand for 100% pure, unrefined, chemical-free cold-pressed edible oils (Yellow & Black Mustard, Groundnut, Sesame, Coconut, Badam Rogan) extracted live and authentic A2 Vedic Bilona Desi Ghee in Delhi NCR. 4 Live Units across Delhi. Free doorstep delivery above ₹799.",
  keywords: [
    // Brand & Power Entities
    "Ramesh Kolhu Wale",
    "RKW",
    "rameshkolhuwale",
    "ramesh kolhu wale",
    "RKW Oils",
    "RKW Pure Oils",
    "RKW Edible Oils",
    "RKW Mustard Oil",
    "RKW Desi Ghee",
    "RKW Cold Pressed Oils",
    "RKW Brand",
    "Ramesh Kolhu Wale Delhi",
    "रमेश कोल्हू वाले",
    "आरकेडब्ल्यू",
    "RKW Pure Oils & Ghee",

    // High-Intent Regional & Local Searches (Near Me / Delhi NCR)
    "edible oil near me",
    "cold pressed oil near me",
    "mustard oil near me",
    "kachi ghani mustard oil near me",
    "bilona ghee near me",
    "desi cow ghee near me",
    "oil mill near me",
    "cold press oil store near me",
    "best cold pressed oil brand in Delhi",
    "pure mustard oil shop in Delhi",
    "cold pressed oil Delhi NCR",
    "live oil extraction Delhi",
    "oil mill in East Delhi",
    "oil mill in North East Delhi",
    "mustard oil Khureji Khas",
    "oil store New Ashok Nagar",
    "cold pressed oil Maujpur",
    "ghee shop Karawal Nagar",
    "pure cooking oil Laxmi Nagar",
    "cold pressed oil Noida",
    "pure oil delivery Delhi NCR",

    // Core Products & Hindi Synonyms
    "Cold Pressed Mustard Oil",
    "Yellow Mustard Oil",
    "Pili Sarson Ka Tel",
    "Black Mustard Oil",
    "Kali Sarson Ka Tel",
    "Kachi Ghani Mustard Oil",
    "Vedic Bilona Ghee",
    "A2 Desi Cow Ghee",
    "Desi Buffalo Bilona Ghee",
    "Dahi Bilona Ghee",
    "Cold Pressed Groundnut Oil",
    "Mungfali Ka Tel",
    "Cold Pressed White Sesame Oil",
    "Black Sesame Oil Til Ka Tel",
    "Cold Pressed Coconut Oil",
    "Extra Virgin Coconut Oil",
    "Pure Badam Rogan Almond Oil",
    "Mamra Almond Oil",
    "Walnut Oil Akhrot Tel",
    "Flaxseed Oil Alsi Tel",
    "Pure Cooking Oil India",
    "Chemical Free Cooking Oil",
    "Unrefined Edible Oil",
    "Wood Pressed Oil Delhi NCR",
    "Lakdi Ghani Tel Delhi",
  ],
  authors: [{ name: "Ramesh Kolhu Wale (RKW)", url: siteUrl }],
  creator: "Ramesh Kolhu Wale",
  publisher: "Ramesh Kolhu Wale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "hi-IN": "/",
    },
  },
  openGraph: {
    title: "Ramesh Kolhu Wale (RKW) | Pure Cold-Pressed Oils & Bilona Desi Ghee",
    description:
      "100% chemical-free cold-pressed oils extracted live and pure Vedic Bilona Desi Ghee. 4 Units in Delhi NCR. Free home delivery above ₹799.",
    url: siteUrl,
    siteName: "Ramesh Kolhu Wale (RKW)",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Ramesh Kolhu Wale (RKW) — Pure Traditional Cold-Pressed Oils and Bilona Ghee",
      },
      {
        url: "/logos/5.svg",
        width: 800,
        height: 350,
        alt: "Ramesh Kolhu Wale (RKW) Official Brand Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramesh Kolhu Wale (RKW) | Pure Cold-Pressed Oils & Bilona Desi Ghee",
    description:
      "Traditional cold-pressed oils & Vedic Bilona Ghee crafted in Delhi NCR since 1981. 4 live units, open all 7 days.",
    images: ["/images/hero.jpg"],
  },
  other: {
    "geo.region": "IN-DL",
    "geo.placename": "Delhi, New Delhi, Noida, Delhi NCR",
    "geo.position": "28.644681;77.28003",
    "ICBM": "28.644681, 77.28003",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googlef4e06f71158ac55c",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrg = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Brand Entity
      {
        "@type": "Brand",
        "@id": `${siteUrl}/#brand`,
        "name": "Ramesh Kolhu Wale",
        "alternateName": ["RKW", "rameshkolhuwale", "ramesh kolhu wale", "रमेश कोल्हू वाले", "RKW Pure Oils"],
        "logo": `${siteUrl}/logos/5.svg`,
        "image": `${siteUrl}/images/hero.jpg`,
        "slogan": "अनुभव चार पीढ़ियों का, स्वाद हर पीढ़ी का | 100% Pure & Live Cold Pressed Oils Since 1981",
        "description": "Ramesh Kolhu Wale (RKW) is a pioneer Indian brand producing 100% unrefined, chemical-free cold-pressed edible oils and authentic Ayurvedic Vedic Bilona Desi Ghee.",
        "url": siteUrl,
      },
      // 2. Organization Entity
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Ramesh Kolhu Wale",
        "legalName": "Ramesh Kolhu Wale",
        "alternateName": [
          "RKW",
          "rameshkolhuwale",
          "ramesh kolhu wale",
          "रमेश कोल्हू वाले",
          "RKW Pure Oils",
          "RKW Cold Pressed Oils",
          "RKW Bilona Ghee"
        ],
        "brand": {
          "@id": `${siteUrl}/#brand`
        },
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/logos/5.svg`,
          "caption": "Ramesh Kolhu Wale (RKW) Brand Logo",
          "width": 800,
          "height": 350
        },
        "image": `${siteUrl}/images/hero.jpg`,
        "description": "Manufacturer, extractor, and retailer of authentic 100% chemical-free cold-pressed oils and pure Vedic Bilona Desi Ghee in Delhi NCR since 1981. Four live extraction units across Delhi.",
        "foundingDate": "1981",
        "telephone": "+91-9217744380",
        "email": "care@rameshkolhuwale.com",
        "sameAs": [
          "https://instagram.com/rameshkolhuwale",
          "https://facebook.com/rameshkolhuwale"
        ],
        "knowsAbout": [
          "Cold Pressed Oils",
          "Wood Pressed Oils (Lakdi Ghani / Chekku)",
          "Kachi Ghani Mustard Oil",
          "Vedic A2 Bilona Desi Ghee",
          "Live Cold-Press Extraction",
          "Yellow Mustard Oil (Pili Sarson Ka Tel)",
          "Black Mustard Oil (Kali Sarson Ka Tel)",
          "Cold Pressed White & Black Sesame Oil (Til Ka Tel)",
          "Cold Pressed Groundnut Oil (Mungfali Ka Tel)",
          "Extra Virgin Cold Pressed Coconut Oil",
          "Pure Badam Rogan Almond Oil",
          "Edible Oil Lab Testing & Purity Certification"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "bestRating": "5",
          "worstRating": "1",
          "ratingCount": "2840",
          "reviewCount": "2840"
        },
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+91-9217744380",
            "contactType": "customer service",
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
          }
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "B-2, Village Khurreji Khas, West Laxmi Market, Nr. HP Petrol Pump",
          "addressLocality": "East Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110051",
          "addressCountry": "IN"
        }
      },
      // 3. WebSite with SearchAction
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Ramesh Kolhu Wale (RKW)",
        "alternateName": ["RKW", "rameshkolhuwale"],
        "publisher": {
          "@id": `${siteUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/shop?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      // 4. Speakable Specification for Voice Search & AI Assistants
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        "url": siteUrl,
        "name": "Ramesh Kolhu Wale (RKW) | Pure Cold-Pressed Oils & Bilona Ghee",
        "isPartOf": {
          "@id": `${siteUrl}/#website`
        },
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["h1", "h2", ".hero-tagline", ".speakable-content"]
        }
      },
      // Store 1: Khureji Khas Flagship Unit
      {
        "@type": "GroceryStore",
        "@id": `${siteUrl}/#unit-khureji`,
        "name": "Ramesh Kolhu Wale - Khureji Khas Unit (RKW)",
        "image": `${siteUrl}/images/hero.jpg`,
        "url": `${siteUrl}/stores`,
        "telephone": "+91-9217744381",
        "priceRange": "₹₹",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI", "Google Pay", "PhonePe", "Paytm"],
        "currenciesAccepted": "INR",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "B-2, Village Khurreji Khas, West Laxmi Market, Nr. HP Petrol Pump (Opp. Samuday Bhawan)",
          "addressLocality": "East Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110051",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.6446813,
          "longitude": 77.2800298,
        },
        "hasMap": "https://maps.app.goo.gl/y1iW6qWyyDJ5TTU7A",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "20:30",
          },
        ],
        "areaServed": [
          "Delhi",
          "East Delhi",
          "Khureji Khas",
          "Laxmi Nagar",
          "Preet Vihar",
          "Gandhi Nagar",
          "Geeta Colony",
          "Shakarpur",
          "Patparganj",
          "Mayur Vihar",
          "Delhi NCR",
        ],
      },
      // Store 2: New Ashok Nagar Unit
      {
        "@type": "GroceryStore",
        "@id": `${siteUrl}/#unit-ashok-nagar`,
        "name": "Ramesh Kolhu Wale - New Ashok Nagar Unit (RKW)",
        "image": `${siteUrl}/images/hero.jpg`,
        "url": `${siteUrl}/stores`,
        "telephone": "+91-9217744382",
        "priceRange": "₹₹",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI", "Google Pay", "PhonePe", "Paytm"],
        "currenciesAccepted": "INR",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "A-688, New Ashok Nagar, Near DPA Public School",
          "addressLocality": "East Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110096",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.594224,
          "longitude": 77.3112919,
        },
        "hasMap": "https://maps.app.goo.gl/R5WSvmgL81Yp3CPB6",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "20:30",
          },
        ],
        "areaServed": [
          "Delhi",
          "New Ashok Nagar",
          "East Delhi",
          "Mayur Vihar Phase 1",
          "Mayur Vihar Phase 3",
          "Vasundhara Enclave",
          "Noida Sector 15",
          "Noida Sector 16",
          "Noida Sector 18",
          "Delhi NCR",
        ],
      },
      // Store 3: Maujpur Unit
      {
        "@type": "GroceryStore",
        "@id": `${siteUrl}/#unit-maujpur`,
        "name": "Ramesh Kolhu Wale - Maujpur Unit (RKW)",
        "image": `${siteUrl}/images/hero.jpg`,
        "url": `${siteUrl}/stores`,
        "telephone": "+91-9217744380",
        "priceRange": "₹₹",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI", "Google Pay", "PhonePe", "Paytm"],
        "currenciesAccepted": "INR",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Main Road Maujpur",
          "addressLocality": "North East Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110053",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.6967,
          "longitude": 77.2763,
        },
        "hasMap": "https://maps.google.com/?q=Maujpur+Main+Road+Delhi+110053",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "20:30",
          },
        ],
        "areaServed": [
          "Maujpur",
          "North East Delhi",
          "Babarpur",
          "Yamuna Vihar",
          "Shahdara",
          "Seelampur",
          "Jaffrabad",
          "Delhi NCR",
        ],
      },
      // Store 4: Karawal Nagar Unit
      {
        "@type": "GroceryStore",
        "@id": `${siteUrl}/#unit-karawal-nagar`,
        "name": "Ramesh Kolhu Wale - Karawal Nagar Unit (RKW)",
        "image": `${siteUrl}/images/hero.jpg`,
        "url": `${siteUrl}/stores`,
        "telephone": "+91-9217744380",
        "priceRange": "₹₹",
        "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI", "Google Pay", "PhonePe", "Paytm"],
        "currenciesAccepted": "INR",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Karawal Nagar Road",
          "addressLocality": "North East Delhi",
          "addressRegion": "Delhi",
          "postalCode": "110094",
          "addressCountry": "IN",
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 28.713226318359375,
          "longitude": 77.26315307617188,
        },
        "hasMap": "https://www.google.com/maps?q=28.713226318359375,77.26315307617188",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "10:00",
            "closes": "20:30",
          },
        ],
        "areaServed": [
          "Karawal Nagar",
          "North East Delhi",
          "Khajuri Khas",
          "Bhajanpura",
          "Sonia Vihar",
          "Mustafabad",
          "Gokalpuri",
          "Delhi NCR",
        ],
      },
    ],
  };

  return (
    <html lang="en" className="h-full scroll-smooth scroll-pt-28" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAF8F3] text-stone-900 font-sans antialiased selection:bg-amber-300 selection:text-[#0E2A47]">
        <CartProvider>
          <Preloader />
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <CartDrawer />
          <WhatsAppOrderButton />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
